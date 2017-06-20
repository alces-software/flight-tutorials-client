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

const debug = mkDebug('FlightTutorials:ReactTerminal');

const terminalStyle = {
  background: 'black',
  color: 'white',
  fontFamily: 'Courier, monospace',
  display: 'inline-block',
};

const wrapperStyle = {
  width: '800px',
  float: 'right',
};

export default class ReactTerminal extends Component {
  static defaultProps = {
    columns: 80,
    rows: 50,
  };

  componentDidMount() {
    this.connectTerminal();
  }

  componentWillUnmount() {
    this.disconnectTerminal();
  }

  props: {
    columns: number,
    onInputLine: (string) => void,
    rows: number,
    socket: any,
  }

  terminalEl: HTMLPreElement;
  term: Terminal;
  stream: any;

  connectTerminal() {
    debug('Connecting terminal');
    this.terminalEl.tabIndex = 0;
    this.term = new Terminal(this.terminalEl.dataset);
    this.stream = ss.createStream({ decodeStrings: false, encoding: 'utf-8' });
    const options = { columns: this.props.columns, rows: this.props.rows };
    ss(this.props.socket).emit('new', this.stream, options);

    this.stream.on('data', (chunk) => {
      debug('Received chunk %o as string: %s', chunk, chunk.toString());
      if (chunk[0] === 13 && chunk[1] === 10) {
        debug('Chunk starts with "\\r\\n"');
        // The user has just pressed enter.  We have a line of input.
        this.handleInputLine();
      }
    });

    this.stream.pipe(this.term).dom(this.terminalEl).pipe(this.stream);
  }

  disconnectTerminal() {
    this.stream.end();
  }

  handleInputLine() {
    const line = this.term.state.getLine(this.term.state.cursor.y).str;
    debug('Input line %s', line);
    if (this.props.onInputLine) {
      this.props.onInputLine(line);
    }
  }

  render() {
    return (
      <div style={wrapperStyle}>
        <pre
          ref={(el) => { this.terminalEl = el; }}
          style={terminalStyle}
          data-columns={this.props.columns}
          data-rows={this.props.rows}
        />
      </div>
    );
  }
}
