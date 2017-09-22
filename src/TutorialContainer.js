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

import findMatch from './utils/findMatch';
import type { StepType, TutorialType } from './types';

const debug = mkDebug('FlightTutorials:TutorialContainer');

type ChildrenPropType = ({
  completedSteps : Array<string>,
  currentStep: string,
  expandStep: (string) => void,
  expandedStep: string,
  onInputLine: (string) => void,
  onSkipCurrentStep: (Event) => void,
}) => React$Element<*>;

export default class TutorialContainer extends Component {
  constructor(...args: any) {
    super(...args);
    this.state = {
      completedSteps: [],
      currentStep: this.props.tutorial.firstStep,
      expandedStep: this.props.tutorial.firstStep,
    };
  }

  state: {
    currentStep: string,
    completedSteps: Array<string>,
    expandedStep: string,
  };

  props: {
    children: ChildrenPropType,
    tutorial: TutorialType,
  };

  handleInputLine = (line: string) => {
    const match = findMatch(this.currentStep().matches, line);
    if (match == null) { return; }

    if (match.nextStep != null) {
      this.progressToStep(match.nextStep);
    }
  }

  handleSkipCurrentStep = (event: Event) => {
    event.stopPropagation();
    // We're skipping the current step.  Let's go to the first match with a
    // `nextStep` property.
    const match = this.currentStep().matches.find(m => m.nextStep != null);
    if (match != null && match.nextStep != null) {
      this.progressToStep(match.nextStep);
    }
  };

  handleExpandStep = (stepName: string) => {
    debug('Requested to expand step %s', stepName);
    const { currentStep, completedSteps } = this.state;
    if (currentStep === stepName || completedSteps.includes(stepName)) {
      this.setState({ expandedStep: stepName });
    }
  }

  progressToStep(nextStep: string) : void {
    debug('Transitioning to step %s', nextStep);
    this.setState(prevState => ({
      completedSteps: [...prevState.completedSteps, prevState.currentStep],
      currentStep: nextStep,
      expandedStep: nextStep,
    }));
  }

  currentStep() : StepType {
    return this.props.tutorial.steps[this.state.currentStep];
  }

  render() {
    return this.props.children({
      completedSteps: this.state.completedSteps,
      currentStep: this.state.currentStep,
      expandStep: this.handleExpandStep,
      expandedStep: this.state.expandedStep,
      onInputLine: this.handleInputLine,
      onSkipCurrentStep: this.handleSkipCurrentStep,
    });
  }
}
