import React, {Component} from 'react';
import Terminal from 'terminal.js';
import ss from 'socket.io-stream';
import io from 'socket.io-client';
import mkDebug from 'debug';

const debug = mkDebug('FlightTutorials:ReactTerminal');

const terminalStyle = {
  background: 'black',
  color: 'white',
  'fontFamily': 'Courier, monospace',
  display: 'inline-block',
};

const wrapperStyle = {
  width: '800px',
  float: 'right',
};

const socket = io('http://localhost:3001/pty', {path: "/tutorial/socket.io"});

export default class ReactTerminal extends Component {
  componentDidMount() {
    this.connectTerminal();
  }

  componentWillUnmount() {
    // XXX
    // this.disconnectTerminal();
  }

  connectTerminal() {
    debug('Connecting terminal');
    this._terminalEl.tabindex = 0;
    this._term = new Terminal(this._terminalEl.dataset);
    this._stream = ss.createStream({decodeStrings: false, encoding: 'utf-8'});
    ss(socket).emit('new', this._stream, this._terminalEl.dataset);

    this._stream.on("data", (chunk, ev) => {
      debug('Received chunk %o as string: %s', chunk, chunk.toString());
      if (chunk[0] == 13) {
        debug('Chunk starts with "\\r"');
        // The user has just pressed enter.  We have a line of input.
        this.handleInputLine();
      }
    })

    this._stream.pipe(this._term).dom(this._terminalEl).pipe(this._stream);
  }

  handleInputLine() {
    const line = this._term.state.getLine(this._term.state.cursor.y).str;
    debug('Input line %s', line);
    if (this.props.onInputLine) {
      this.props.onInputLine(line);
    }
  }

  render() {
    return (
      <div style={wrapperStyle}>
        <pre
          ref={(el) => { this._terminalEl = el; } }
          style={terminalStyle}
          data-columns="80"
          data-rows="50"
        />
      </div>
    );
  }
}
