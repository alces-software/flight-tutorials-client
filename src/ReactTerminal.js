// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React, { Component } from 'react';
import Terminal from 'terminal.js';
import ss from 'socket.io-stream';
import mkDebug from 'debug';
import styled from 'styled-components';

import InputProcessor from './utils/InputProcessor';

// The font-constant is a property of the font-family selected for the
// terminal.  It is used to determine the number of columns for the terminal
// given a width in pixels.
//
// WARNING: If the font-family changes, the font-constant will need to change
// too.
const fontConstant = 1.64;
const Wrapper = styled.div`
  PRE {
    background: black;
    color: white;
    font-family: Courier, monospace;
    display: inline-block;
    
    & > *:last-child > *:last-child {
      display: contents;
    }
  }
`;

const debug = mkDebug('FlightTutorials:ReactTerminal');

export default class ReactTerminal extends Component {
  static defaultProps = {
    columns: 80,
    env: {},
    onInputLine: (line) => {},  // eslint-disable-line no-unused-vars
    rows: 50,
  };

  constructor(...args: any) {
    super(...args);
    this.needsResize = false;
  }

  componentDidMount() {
    debug('Mounted');
    this.connectTerminal();
    this.createTerminalSession();
    // FSR when restarting a terminal session, that is umounting one
    // ReactTerminal instance and mouting a new ReactTerminal instance, we
    // need a setTimeout of 150ms before we are able to focus the terminal.
    //
    // I have no idea why this would be the case.  But the worst that could
    // happen here is that the user has to click on the terminal before it
    // receives any input.
    this.focus();
    setTimeout(() => this.focus(), 150);
  }

  componentWillUpdate(nextProps: { size: { width: number, height: number }}) {
    const nextWidth = nextProps.size.width;
    const thisWidth = this.props.size.width;
    const nextHeight = nextProps.size.height;
    const thisHeight = this.props.size.height;
    if (nextWidth !== thisWidth || nextHeight !== thisHeight) {
      this.needsResize = true;
    }
  }

  componentDidUpdate() {
    if (this.needsResize) {
      this.resize();
      this.needsResize = false;
    }
  }

  componentWillUnmount() {
    debug('Unmounting');
    this.endTerminalSession();
  }

  props: {
    columns: number,
    env?: {},
    onInputLine?: (string) => void,
    onSessionEnd?: () => void,  // eslint-disable-line react/require-default-props
    rows: number,
    size: { width: number, height: number },
    socket: any,
  }

  needsResize: boolean;
  stream: any;
  term: any;
  terminalEl: HTMLPreElement;

  // Connect the terminal to the socket.io-stream and setup handling of
  // user-provided input.
  connectTerminal() {
    //
    // WARNING: Here lie picky details and many possible but wrong ways of
    // doing this.
    //
    // There are quite a few details that we need to get correct here,
    // otherwise there will be unexpected errors.
    //
    // First of all, we need to correctly connect the terminal and the
    // socket-io.stream.  This can be done with the following:
    //
    // ```
    // this.stream.pipe(this.term).dom(this.terminalEl).pipe(this.stream);
    // ```
    //
    // However, we need to grab a reference to the stream of user-provided
    // input (either keys pressed or text pasted).  This can be done by taking
    // a reference to the output of `dom(...)` above, like so:
    //
    // ```
    // const userProvidedInput = this.stream.pipe(this.term).dom(this.terminalEl);
    // userProvidedInput.pipe(this.stream);
    // ```
    //
    // We can the grab any user-provided data with the following:
    //
    // ```
    // userProvidedInput.on('data', inputProcessor.handleInputData);
    // ```
    //
    // This means that our `inputProcessor.handleInputData`, processes only
    // user-provided data and not any output from the shell.
    //
    // It's worth mentioning the order in which user-provided data is
    // processed and how that affects the internal state of the terminal.
    // When a user types in the terminal the following happen in order:
    //
    //  1. The terminal processes the input such that its internal state and
    //     its visual representation include the user-provided data.  The
    //     internal state will be correct for visual ASCII chars and terminal
    //     control chars such as form feed.
    //
    //  2. `inputProcessor.handleInputData` is called with the user-provided
    //     data.  It can inspect the terminal's internal state, but that may
    //     not be correct as explained in point 4.
    //
    //  3. The data is sent across the socket.io-stream, processed by the
    //     shell, and the shell's output sent back across the
    //     socket.io-stream.
    //
    //  4. The terminal processes the shell's output, such that its internal
    //     state and its visual representation now includes any processing of
    //     the user input performed by the shell, such as line-editing,
    //     history manipulation (searching with Ctrl-R, bringing up
    //     previous lines with "UP" cursor key, etc..)
    //
    // Having `inputProcessor.handleInputData` called before the shell's
    // output is processed by the terminal places some limitations on what it
    // can do.  However, connecting to `userProvidedInput` instead of
    // connecting to `this.stream` allows us to easily distinguish
    // user-provided input from shell output. In particular, this makes it
    // much easier to:
    //
    //  1. determine when the user has pressed enter.  Otherwise we are left
    //     trying to distinguish which carriage returns ('\r') in the stream
    //     are a result of the user pressing enter and which are part of the
    //     output of the command being ran.
    //
    //  2. determine which line the user is on when they start typing a
    //     command.  This can then be used to ensure that wrapped input lines
    //     are handled correctly.  If we had connected to `this.stream`, we
    //     would be trying to distinguish which line feeds ('\n') are a result
    //     of the shell/terminal wrapping the input and which are a result of
    //     the some output provided by the shell.
    //
    debug('Connecting terminal');

    this.stream = ss.createStream({ decodeStrings: false, encoding: 'utf-8' });
    const { columns, rows } = this.calculateSize();
    this.term = new Terminal({ columns, rows });
    let inputProcessor;
    if (this.props.onInputLine) {
      inputProcessor = new InputProcessor(this.term, this.props.onInputLine);
    }

    this.stream.on('data', (chunk) => {
      debug('Received chunk %o as string: %s', chunk, chunk.toString());
    });

    this.stream.on('end', () => {
      debug('stream end');
      if (this.props.onSessionEnd) {
        this.props.onSessionEnd();
      }
    });

    const userProvidedInput = this.stream.pipe(this.term).dom(this.terminalEl);
    userProvidedInput.pipe(this.stream);
    if (inputProcessor) {
      userProvidedInput.on('data', inputProcessor.handleUserProvidedData);
      this.term.state.on('lineremove', inputProcessor.handleLineRemove);
    }
  }

  createTerminalSession() {
    const options = {
      columns: this.props.columns,
      rows: this.props.rows,
      env: {
        TERM: 'vt100',
        cw_SETTINGS_theme: 'dark',
        ...this.props.env,
      },
    };
    ss(this.props.socket).emit('new', this.stream, options);
  }

  calculateSize() {
    const styles = getComputedStyle(this.terminalEl);
    const fontSize = Number.parseInt(styles['font-size'], 10);
    const lineHeight = Number.parseInt(styles['line-height'], 10);
    const width = this.props.size.width;
    const height = this.props.size.height;

    const charsPerLine = width / (fontSize / fontConstant);
    const columns = Math.floor(charsPerLine);
    const rows = Math.floor(height / lineHeight);

    return { columns, rows, width, height };
  }

  resize() {
    const { columns, rows, width, height } = this.calculateSize();
    debug(
      'Resizing terminal to cols=%s, rows=%s (width=%spx, height=%spx)',
      columns, rows, width, height,
    );
    this.props.socket.emit('resize', this.stream.id, { columns, rows });
    this.term.state.resize({ columns, rows });
  }

  endTerminalSession() {
    this.stream.end();
  }

  focus() {
    debug('Focusing terminal, %o', this.terminalEl);
    if (this.terminalEl != null) {
      this.terminalEl.focus();
    }
  }

  render() {
    return (
      <Wrapper>
        <pre
          ref={(el) => { this.terminalEl = el; }}
          tabIndex={0}  // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        />
      </Wrapper>
    );
  }
}
