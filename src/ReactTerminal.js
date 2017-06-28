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

import InputProcessor from './utils/InputProcessor';
import './styles/ReactTerminal.scss';

const debug = mkDebug('FlightTutorials:ReactTerminal');

export default class ReactTerminal extends Component {
  static defaultProps = {
    columns: 80,
    rows: 50,
  };

  componentDidMount() {
    this.terminalEl.tabIndex = 0;
    this.connectTerminal();
    this.createTerminalSession();
  }

  componentWillUnmount() {
    this.endTerminalSession();
  }

  props: {
    columns: number,
    onInputLine: (string) => void,
    rows: number,
    socket: any,
  }

  terminalEl: HTMLPreElement;
  stream: any;

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
    // this.stream.pipe(term).dom(this.terminalEl).pipe(this.stream);
    // ```
    //
    // However, we need to grab a reference to the stream of user-provided
    // input (either keys pressed or text pasted).  This can be done by taking
    // a reference to the output of `dom(...)` above, like so:
    //
    // ```
    // const userProvidedInput = this.stream.pipe(term).dom(this.terminalEl);
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
    const term = new Terminal(this.terminalEl.dataset);
    const inputProcessor = new InputProcessor(term, this.props.onInputLine);

    this.stream.on('data', (chunk) => {
      debug('Received chunk %o as string: %s', chunk, chunk.toString());
    });

    const userProvidedInput = this.stream.pipe(term).dom(this.terminalEl);
    userProvidedInput.pipe(this.stream);
    userProvidedInput.on('data', inputProcessor.handleUserProvidedData);
    term.state.on('lineremove', inputProcessor.handleLineRemove);
  }

  createTerminalSession() {
    const options = { columns: this.props.columns, rows: this.props.rows };
    ss(this.props.socket).emit('new', this.stream, options);
  }

  endTerminalSession() {
    this.stream.end();
  }

  render() {
    return (
      <div>
        <pre
          ref={(el) => { this.terminalEl = el; }}
          className="flight-ReactTerminal"
          data-columns={this.props.columns}
          data-rows={this.props.rows}
        />
      </div>
    );
  }
  }
