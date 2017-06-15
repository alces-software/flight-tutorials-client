import React, {Component} from 'react';
import mkDebug from 'debug';

import ReactTerminal from './ReactTerminal';
import Tutorial from './Tutorial';
import tutorials from './tutorials';

const debug = mkDebug('FlightTutorials:index');

export default class extends Component {

  handleInputLine = (line) => {
    debug('Passing line %s to tutorial %O', line, this._tutorial);
    if (this._tutorial) {
      this._tutorial.handleInputLine(line);
    }
  }

  render() {
    return <div>
      <ReactTerminal onInputLine={this.handleInputLine} />
      <Tutorial ref={(el) => { this._tutorial = el; }} tutorial={tutorials[0]} />
    </div>
  }
}
