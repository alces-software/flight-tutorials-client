// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React, { Component } from 'react';
import mkDebug from 'debug';
import io from 'socket.io-client';

import TutorialContainer from './TutorialContainer';
import TutorialLayout from './TutorialLayout';
import TutorialSelection from './TutorialSelection';
import tutorials from './tutorials';

const debug = mkDebug('FlightTutorials:index');

export default class extends Component {
  static defaultProps = {
    showAllTutorialsButton: true,
  }

  constructor(...args: any) {
    super(...args);
    this.socket = io(this.props.socketIOUrl, { path: this.props.socketIOPath });
  }

  state = {
    selectedTutorial: undefined,
  };

  props: {
    showAllTutorialsButton: boolean,
    socketIOUrl: string,
    socketIOPath: string,
  }

  socket: any;

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
      <TutorialContainer tutorial={tutorial} socket={this.socket}>
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
