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

import ReactTerminal from './ReactTerminal';
import findMatch from './utils/findMatch';
import type { StepType, TutorialType } from './types';

const debug = mkDebug('FlightTutorials:TutorialContainer');

type ChildrenPropType = ({
  completedSteps : Array<string>,
  currentStep: string,
  onSessionRestartAccepted: () => void,
  onSessionRestartRequestClosed: () => void,
  requestSessionRestart: boolean,
  terminal : React$Element<*>,  // A ReactTerminal element.
}) => React$Element<*>;

export default class TutorialContainer extends Component {
  constructor(...args: any) {
    super(...args);
    this.state = {
      currentStep: this.props.tutorial.firstStep,
      completedSteps: [],
      requestSessionRestart: false,
      sessionId: 0,
    };
  }

  state: {
    currentStep: string,
    completedSteps: Array<string>,
    requestSessionRestart: boolean,
    sessionId: number,
  };

  props: {
    children: ChildrenPropType,
    socket: any,
    tutorial: TutorialType,
  };

  terminal: ReactTerminal;

  handleInputLine = (line: string) => {
    const match = findMatch(this.currentStep().matches, line);
    if (match == null) { return; }

    if (match.nextStep != null) {
      debug('Transitioning to step %s', match.nextStep);
      this.setState(prevState => ({
        completedSteps: [...prevState.completedSteps, prevState.currentStep],
        currentStep: match.nextStep,
      }));
    }
  }

  handleSessionEnd = () => {
    debug('Session eneded. Requesting restart');
    this.setState({ requestSessionRestart: true });
  }

  handleSessionRestartAccepted = () => {
    debug('Restarting session');
    this.setState(state => ({
      ...state,
      sessionId: state.sessionId + 1,
      requestSessionRestart: false,
    }));
  }

  handleSessionRestartRequestClosed = () => {
    debug('Closing session restart request.');
    this.setState({ requestSessionRestart: false });
    this.terminal.focus();
  }

  currentStep() : StepType {
    return this.props.tutorial.steps[this.state.currentStep];
  }


  render() {
    const terminal = (
      <ReactTerminal
        key={this.state.sessionId}
        ref={(term) => { this.terminal = term; }}
        onInputLine={this.handleInputLine}
        onSessionEnd={this.handleSessionEnd}
        socket={this.props.socket}
      />
    );

    return this.props.children({
      completedSteps: this.state.completedSteps,
      currentStep: this.state.currentStep,
      onSessionRestartAccepted: this.handleSessionRestartAccepted,
      onSessionRestartRequestClosed: this.handleSessionRestartRequestClosed,
      requestSessionRestart: this.state.requestSessionRestart,
      terminal,
    });
  }
}
