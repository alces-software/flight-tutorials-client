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
import TutorialSelectionLayout from './TutorialSelectionLayout';
import TutorialSelection from './TutorialSelection';
import tutorials from './tutorials';
import './styles/main.scss';

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
        <TutorialSelectionLayout>
          <TutorialSelection
            tutorials={tutorials}
            onSelectTutorial={this.handleTutorialSelection}
          />
        </TutorialSelectionLayout>
      );
    }

    const tutorial = tutorials[this.state.selectedTutorial];

    return (
      <TutorialContainer tutorial={tutorial} socket={this.socket}>
        {({ completedSteps, currentStep, terminal }) => (
          <div>
            <TutorialLayout
              completedSteps={completedSteps}
              currentStep={currentStep}
              onShowAllTutorials={this.handleShowAllTutorials}
              terminal={terminal}
              tutorial={tutorial}
            />
          </div>
        )}
      </TutorialContainer>
    );
  }
}
