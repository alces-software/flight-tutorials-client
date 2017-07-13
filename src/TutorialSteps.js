// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import { Button, PanelGroup, Panel } from 'react-bootstrap';
import Markdown from 'react-markdown';

import type { StepMap } from './types';
import './styles/TutorialSteps.scss';

function getStyle(stepName, currentStep, completedSteps) {
  if (stepName === currentStep) {
    return 'primary';
  }
  if (completedSteps.includes(stepName)) {
    return 'success';
  }

  return 'default';
}

function canSkip(step, stepName, currentStep) {
  if (stepName !== currentStep) { return false; }
  return step.matches.some(m => m.nextStep != null);
}

const TutorialSteps = ({
  completedSteps,
  currentStep,
  expandStep,
  expandedStep,
  onSkipCurrentStep,
  steps,
} : {
  completedSteps: Array<string>,
  currentStep: string,
  expandStep: (string) => void,
  expandedStep: string,
  onSkipCurrentStep: (Event) => void,
  steps: StepMap,
}) => {
  const panels = Object.keys(steps).map((stepName, idx) => {
    const step = steps[stepName];
    const header = (
      <div className="TutorialStep-title">
        <span>Step {idx + 1} {step.title}</span>
        {
          canSkip(step, stepName, currentStep) ?
            <span className="pull-right">
              <Button onClick={onSkipCurrentStep}>Skip</Button>
            </span> :
            null
        }
      </div>
    );

    return (
      <Panel
        key={stepName}
        bsStyle={getStyle(stepName, currentStep, completedSteps)}
        eventKey={stepName}
        header={header}
      >
        <Markdown escapeHtml={false} source={step.description} />
      </Panel>
    );
  });

  return (
    <PanelGroup activeKey={expandedStep} onSelect={expandStep} accordion >
      { panels }
    </PanelGroup>
  );
};

export default TutorialSteps;
