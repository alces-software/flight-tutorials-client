// @flow
import React, {Component} from 'react';
import mkDebug from 'debug';

import ReactTerminal from './ReactTerminal';
import Tutorial from './Tutorial';
import TutorialSelection from './TutorialSelection';
import tutorials from './tutorials';

const debug = mkDebug('FlightTutorials:index');

export default class extends Component {
  _tutorial: Tutorial;

  state = {
    selectedTutorial: undefined,
  };

  handleTutorialSelection = (idx: ?number) => {
    this.setState({ selectedTutorial: idx });
  }

  handleInputLine = (line: string) => {
    debug('Passing line %s to tutorial %O', line, this._tutorial);
    if (this._tutorial) {
      this._tutorial.handleInputLine(line);
    }
  }

  render() {
    if (this.state.selectedTutorial == null) {
      return (
        <TutorialSelection
          tutorials={tutorials}
          onSelectTutorial={this.handleTutorialSelection}
        />
      );
    } else {
      const tutorial = tutorials[this.state.selectedTutorial];
      return (
        <div>
          <button onClick={() => this.handleTutorialSelection(undefined)}>
            View all tutorials
          </button>
          <ReactTerminal onInputLine={this.handleInputLine} />
          <Tutorial ref={(el) => { this._tutorial = el; }} tutorial={tutorial} />
        </div>
      );
    }
  }
}
