// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React, {Component} from 'react';
import mkDebug from 'debug';

import TutorialContainer from './TutorialContainer';
import TutorialLayout from './TutorialLayout';
import TutorialSelection from './TutorialSelection';
import tutorials from './tutorials';

const debug = mkDebug('FlightTutorials:index');

export default class extends Component {
  props: {
    showAllTutorialsButton: boolean,
  }

  static defaultProps = {
    showAllTutorialsButton: true,
  }

  state = {
    selectedTutorial: undefined,
  };

  handleTutorialSelection = (idx: ?number) => {
    debug('Selecting tutorial at index %d', idx);
    this.setState({ selectedTutorial: idx });
  }

  handleShowAllTutorials = () => {
    this.handleTutorialSelection(undefined);
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
      <TutorialContainer tutorial={tutorial}>
        {({ completedSteps, currentStep, terminal }) => (
          <div>
            {
              this.props.showAllTutorialsButton ?
                <button onClick={this.handleShowAllTutorials}>
                  View all tutorials
                </button> :
                null
            }
            <TutorialLayout
              completedSteps={completedSteps}
              currentStep={currentStep}
              terminal={terminal}
              tutorial={tutorial}
            />
          </div>
        )}
      </TutorialContainer>
    );
  }
}
