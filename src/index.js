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

import './styles/main.scss';
import TutorialContainer from './TutorialContainer';
import TutorialLayout from './TutorialLayout';
import TutorialSelection from './TutorialSelection';
import TutorialSelectionLayout from './TutorialSelectionLayout';
import loadTutorials from './utils/loadTutorials';

const debug = mkDebug('FlightTutorials:index');

export default class extends Component {
  constructor(...args: any) {
    super(...args);
    this.socket = io(this.props.socketIOUrl, { path: this.props.socketIOPath });
    loadTutorials().then((tutorials) => {
      this.setState({
        tutorials,
        tutorialLoading: false,
        tutorials: tutorials,
      });
    }).catch(() => {
      this.setState({ tutorialLoading: false });
    });
  }

  state = {
    selectedTutorial: undefined,
    tutorials: undefined,
    tutorialLoading: true,
  };

  componentWillUnmount() {
    this.socket.disconnect();
  }

  props: {
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
    if (this.state.tutorialLoading == null) {
      return null;
    }
    if (this.state.tutorials == null) {
      return (
        <div>
          <p>Unfortunately, we haven&apos;t been able to load any tutorials.</p>
        </div>
      );
    }
    if (this.state.selectedTutorial == null) {
      return (
        <TutorialSelectionLayout
          singleTutorial={this.state.tutorials.length === 1}
        >
          <TutorialSelection
            tutorials={this.state.tutorials}
            onSelectTutorial={this.handleTutorialSelection}
          />
        </TutorialSelectionLayout>
      );
    }

    const tutorial = this.state.tutorials[this.state.selectedTutorial];

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
