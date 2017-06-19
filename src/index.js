// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Compute Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React, {Component} from 'react';
import mkDebug from 'debug';

import TutorialContainer from './TutorialContainer';
import TutorialSelection from './TutorialSelection';
import tutorials from './tutorials';

const debug = mkDebug('FlightTutorials:index');

export default class extends Component {
  state = {
    selectedTutorial: undefined,
  };

  handleTutorialSelection = (idx: ?number) => {
    this.setState({ selectedTutorial: idx });
  }

  render() {
    if (this.state.selectedTutorial == null) {
      return (
        <TutorialSelection
          tutorials={tutorials}
          onSelectTutorial={this.handleTutorialSelection}
        />
      );
    }

    const tutorial = tutorials[this.state.selectedTutorial];
    return (
      <TutorialContainer tutorial={tutorial} />
    );
  }
}
