// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';

import type { StepMap }  from './types';
import TutorialStep from './TutorialStep';

const TutorialSteps = ({
  completedSteps,
  currentStep,
  steps,
} : {
  completedSteps: Array<string>,
    currentStep: string,
    steps: StepMap,
}) => (
  <div>
    {
      Object.keys(steps).map(stepName => (
        <TutorialStep
          key={stepName}
          completed={completedSteps.includes(stepName)}
          current={stepName === currentStep}
          step={steps[stepName]}
        />
      ))
    }
  </div>
);

export default TutorialSteps;
