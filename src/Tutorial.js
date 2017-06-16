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

import escapeRegExp from './utils/escapeRegExp';
import TutorialStep from './TutorialStep';
import type { StepType, TutorialType}  from './types';

const debug = mkDebug('FlightTutorials:Tutorial');

export default class Tutorial extends Component {
  props: {
    tutorial: TutorialType,
  };

  state: {
    currentStep: string,
    completedSteps: Array<string>,
  };

  constructor(...args: any) {
    super(...args);
    const tutorial = this.props.tutorial;
    this.state = {
      currentStep: tutorial.firstStep,
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
    const steps = Object.keys(tutorial.steps).map(stepName => {
      return <TutorialStep
        key={stepName}
        completed={this.state.completedSteps.includes(stepName)}
        current={stepName === this.state.currentStep}
        step={tutorial.steps[stepName]}
      />
    }
    );

    return (
      <div>
        <h2>{tutorial.title}</h2>
        <div dangerouslySetInnerHTML={{__html: tutorial.description}} />
        {steps}
      </div>
    );
  }
}
