// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';
import Markdown from 'react-markdown';

import type { StepMap } from './types';

function getStyle(stepName, currentStep, completedSteps) {
  if (stepName === currentStep) {
    return 'primary';
  }
  if (completedSteps.includes(stepName)) {
    return 'success';
  }

  return 'default';
}

const TutorialSteps = ({
  completedSteps,
  currentStep,
  steps,
} : {
  completedSteps: Array<string>,
  currentStep: string,
  steps: StepMap,
}) => {
  const panels = Object.keys(steps).map((stepName, idx) => {
    const step = steps[stepName];
    return (
      <Panel
        key={stepName}
        bsStyle={getStyle(stepName, currentStep, completedSteps)}
        eventKey={stepName}
        header={`Step ${idx + 1} ${step.title}`}
      >
        <Markdown escapeHtml={false} source={step.description} />
      </Panel>
    );
  })

  return (
    <PanelGroup activeKey={currentStep} accordion >
      { panels }
    </PanelGroup>
  );
};

export default TutorialSteps;
