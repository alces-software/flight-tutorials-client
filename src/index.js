import React, {Component} from 'react';
import Terminal from 'terminal.js';
import ss from 'socket.io-stream';
import io from 'socket.io-client';

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
    this._terminal.tabindex = 0;
    this._term = new Terminal(this._terminal.dataset);
    this._stream = ss.createStream({decodeStrings: false, encoding: 'utf-8'});
    ss(socket).emit('new', this._stream, this._terminal.dataset);


    let state = 0

    this._stream.on("data", (chunk, ev) => {
      console.log(chunk)
      // if (chunk.length <= 2 && chunk[0] == 13) {
      if (chunk[0] == 13) {
        let line = this._term.state.getLine(this._term.state.cursor.y).str
        console.log('line:', line);  // eslint-disable-line no-console
        if (state == 0 && line.match(/\$ echo "Hello, world\."$/)) {
          console.log("wow! a crazy user! reward them!")
          // document.getElementsByClassName('pegamoose')[0].style="display: block;";
          state += 1
        } else if (state == 1 && line.match(/\$ sinfo$/)) {
          // document.getElementsByClassName('pegamoose2')[0].style="display: block;";
        }
      }
    })


    this._stream.pipe(this._term).dom(this._terminal).pipe(this._stream);
  }

  render() {
    return <div>
      <h2>Welcome to React components</h2>

      <div style={wrapperStyle}>
        <pre
          ref={(el) => { this._terminal = el; } }
          style={terminalStyle}
          data-columns="80"
          data-rows="50"
        />
      </div>
    </div>
  }
}
