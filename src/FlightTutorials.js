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
import 'url-search-params-polyfill';

import SocketContainer from './SocketContainer';
import TerminalContainer from './TerminalContainer';
import TerminalLayout from './TerminalLayout';
import TutorialContainer from './TutorialContainer';
import TutorialLayout from './TutorialLayout';
import TutorialLoadErrorMessage from './TutorialLoadErrorMessage';
import TutorialLoadingMessage from './TutorialLoadingMessage';
import TutorialSelection from './TutorialSelection';
import TutorialSelectionLayout from './TutorialSelectionLayout';
import loadTutorials from './utils/loadTutorials';

const debug = mkDebug('FlightTutorials:index');

export default class extends Component {
  constructor(...args: any) {
    super(...args);
    loadTutorials().then((tutorials) => {
      this.setState({
        tutorials,
        tutorialLoading: false,
      });
    }).catch(() => {
      // XXX
      this.setState({ tutorialLoading: false });
    });
  }

  state = {
    selectedTutorial: undefined,
    tutorials: undefined,
    tutorialLoading: true,
  };

  props: {
    socketIOUrl: string,
    socketIOPath: string,
  }

  handleTutorialSelection = (idx: ?number) => {
    debug('Selecting tutorial at index %d', idx);
    this.setState({ selectedTutorial: idx });
  }

  handleShowAllTutorials = () => {
    this.handleTutorialSelection(undefined);
  }

  render() {
    if (this.state.tutorialLoading) {
      return <TutorialLoadingMessage />;
    }
    if (this.state.tutorials == null) {
      return <TutorialLoadErrorMessage />;
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
      <TutorialContainer tutorial={tutorial}>
        {({
          completedSteps,
          currentStep,
          expandStep,
          expandedStep,
          onInputLine,
          onSkipCurrentStep,
        }) => (
          <SocketContainer
            socketIOUrl={this.props.socketIOUrl}
            socketIOPath={this.props.socketIOPath}
          >
            {({
              socket,
            }) => (
              <TerminalContainer onInputLine={onInputLine} socket={socket}>
                {({
                  onSessionRestartAccepted,
                  onSessionRestartRequestClosed,
                  requestSessionRestart,
                  terminal,
                }) => (
                  <div>
                    <TutorialLayout
                      completedSteps={completedSteps}
                      currentStep={currentStep}
                      expandStep={expandStep}
                      expandedStep={expandedStep}
                      onShowAllTutorials={this.handleShowAllTutorials}
                      onSkipCurrentStep={onSkipCurrentStep}
                      tutorial={tutorial}
                    >
                      <TerminalLayout
                        onSessionRestartAccepted={onSessionRestartAccepted}
                        onSessionRestartRequestClosed={onSessionRestartRequestClosed}
                        requestSessionRestart={requestSessionRestart}
                      >
                        {terminal}
                      </TerminalLayout>
                    </TutorialLayout>
                  </div>
                )}
              </TerminalContainer>
            )}
          </SocketContainer>
        )}
      </TutorialContainer>
    );
  }
}
