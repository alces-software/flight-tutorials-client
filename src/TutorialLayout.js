// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Compute Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React, {Component} from 'react';

import ReactTerminal from './ReactTerminal';
import TutorialInfo from './TutorialInfo';
import TutorialSteps from './TutorialSteps';
import type { TutorialType }  from './types';

type PropsType = {
  completedSteps : Array<string>,
  currentStep: string,
  terminal : React$Element<*>,  // A ReactTerminal element.
  tutorial: TutorialType,
}

const TutorialLayout = ({
  completedSteps,
  currentStep,
  terminal,
  tutorial,
} : PropsType ) => (
  <div>
    {terminal}
    {<TutorialInfo tutorial={tutorial} />}
    {
      <TutorialSteps
        completedSteps={completedSteps}
        currentStep={currentStep}
        steps={tutorial.steps}
      />
    }
  </div>
);

export default TutorialLayout;
