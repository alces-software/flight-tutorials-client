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

import ReactTerminal from './ReactTerminal';
import TutorialInfo from './TutorialInfo';
import TutorialLayout from './TutorialLayout';
import TutorialSteps from './TutorialSteps';
import escapeRegExp from './utils/escapeRegExp';
import type { StepType, TutorialType } from './types';

const debug = mkDebug('FlightTutorials:TutorialContainer');

export default class TutorialContainer extends Component {
  props: {
    onShowAllTutorials: () => void,
    showAllTutorialsButton: boolean,
    tutorial: TutorialType,
  };

  state: {
    currentStep: string,
    completedSteps: Array<string>,
  };

  constructor(...args: any) {
    super(...args);
    this.state = {
      currentStep: this.props.tutorial.firstStep,
      completedSteps: [],
    };
  }

  handleInputLine = (line: string) => {
    const matches = this.currentStep().matches;

    for (let i=0; i < matches.length; i++) {
      const match = matches[i];
      var re;
      if (match.regexp) {
        re = new RegExp(match.inputLine);
      } else {
        re = new RegExp(escapeRegExp(match.inputLine));
      }
      debug('Checking line against %s', re);

      if (line.match(re)) {
        debug('Line matched');
        if (match.nextStep != null) {
          debug('Transitioning to step %s', match.nextStep);
          this.setState((prevState) => {
            return {
              completedSteps: [ ...prevState.completedSteps, prevState.currentStep ],
              currentStep: match.nextStep,
            };
          });
        }
        break;
      }
    };
  }

  currentStep() : StepType {
    return this.props.tutorial.steps[this.state.currentStep];
  }


  render() {
    const tutorial = this.props.tutorial;

    const terminal = <ReactTerminal onInputLine={this.handleInputLine} />;
    const tutorialInfo = <TutorialInfo tutorial={tutorial} />;
    const steps = (
      <TutorialSteps
        completedSteps={this.state.completedSteps}
        currentStep={this.state.currentStep}
        steps={this.props.tutorial.steps}
      />
    );

    return (
      <TutorialLayout
        terminal={terminal}
        tutorialInfo={tutorialInfo}
        steps={steps}
        showAllTutorialsButton={this.props.showAllTutorialsButton}
        onShowAllTutorials={this.props.onShowAllTutorials}
      />
    );
  }
}
