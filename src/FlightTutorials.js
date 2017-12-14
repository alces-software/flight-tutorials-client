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
import DefaultTutorialLayout from './TutorialLayout';
import DefaultTutorialLoadErrorMessage from './TutorialLoadErrorMessage';
import DefaultTutorialLoadingMessage from './TutorialLoadingMessage';
import DefaultTutorialSelection from './TutorialSelection';
import DefaultTutorialSelectionLayout from './TutorialSelectionLayout';
import loadTutorials from './utils/loadTutorials';

const debug = mkDebug('FlightTutorials:index');

export default class extends Component {
  static defaultProps = {
    TutorialLayout: DefaultTutorialLayout,
    TutorialLoadingMessage: DefaultTutorialLoadingMessage,
    TutorialLoadErrorMessage: DefaultTutorialLoadErrorMessage,
    TutorialSelectionLayout: DefaultTutorialSelectionLayout,
    TutorialSelection: DefaultTutorialSelection,
  };

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
    // eslint-disable-next-line react/require-default-props
    columns?: number,
    // eslint-disable-next-line react/require-default-props
    rows?: number,
    socketIOUrl: string,
    socketIOPath: string,
    TutorialLayout?: any,
    TutorialLoadingMessage?: any,
    TutorialLoadErrorMessage?: any,
    TutorialSelectionLayout?: any,
    TutorialSelection?: any,
  }

  handleTutorialSelection = (idx: ?number) => {
    debug('Selecting tutorial at index %d', idx);
    this.setState({ selectedTutorial: idx });
  }

  handleShowAllTutorials = () => {
    this.handleTutorialSelection(undefined);
  }

  render() {
    const {
      TutorialLayout,
      TutorialLoadingMessage,
      TutorialLoadErrorMessage,
      TutorialSelectionLayout,
      TutorialSelection,
    } = this.props;

    if (this.state.tutorialLoading) {
      // $FlowFixMe
      return <TutorialLoadingMessage />;
    }
    if (this.state.tutorials == null) {
      // $FlowFixMe
      return <TutorialLoadErrorMessage />;
    }
    if (this.state.selectedTutorial == null) {
      return (
        // $FlowFixMe
        <TutorialSelectionLayout
          singleTutorial={this.state.tutorials.length === 1}
        >
          {/* // $FlowFixMe */}
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
              onCloseSocketError,
              socket,
              socketError,
            }) => (
              <TerminalContainer
                columns={this.props.columns}
                rows={this.props.rows}
                onInputLine={onInputLine}
                socket={socket}
              >
                {({
                  onSessionRestartAccepted,
                  onSessionRestartRequestClosed,
                  requestSessionRestart,
                  terminal,
                }) => (
                  <div>
                    {/* // $FlowFixMe */}
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
                        onCloseSocketError={onCloseSocketError}
                        onSessionRestartAccepted={onSessionRestartAccepted}
                        onSessionRestartRequestClosed={onSessionRestartRequestClosed}
                        requestSessionRestart={requestSessionRestart}
                        socketError={socketError}
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
