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

import ReactTerminal from './ReactTerminal';
import escapeRegExp from './utils/escapeRegExp';
import type { StepType, TutorialType } from './types';

const debug = mkDebug('FlightTutorials:TutorialContainer');

type ChildrenPropType = ({
  completedSteps : Array<string>,
  currentStep: string,
  terminal : React$Element<*>,  // A ReactTerminal element.
}) => React$Element<*>;

export default class TutorialContainer extends Component {
  props: {
    children: ChildrenPropType,
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
    const terminal = <ReactTerminal onInputLine={this.handleInputLine} />;

    return this.props.children({
      completedSteps: this.state.completedSteps,
      currentStep: this.state.currentStep,
      terminal: terminal,
    });
  }
}
