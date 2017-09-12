// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import { Button, Card, CardBlock, CardHeader, Collapse } from 'reactstrap';
import Markdown from 'react-markdown';
import cx from 'classnames';
import styled from 'styled-components';

import type { StepMap } from './types';

// XXX Remove mix of classnames and styled-components.
const Title = styled.div`
  a:hover {
      text-decoration: none;
      color: inherit;
      cursor: inherit;

      .TutorialStep--completed & , .TutorialStep--current & {
          cursor: pointer;
          text-decoration: underline;
      }
  }
`;

const SkipButton = styled(Button)`
  margin-top: -4px;
`;

function getClassName(stepName, currentStep, completedSteps) {
  return cx('TutorialStep', {
    'TutorialStep--current': currentStep === stepName,
    'TutorialStep--completed': completedSteps.includes(stepName),
  });
}

function getColour(stepName, currentStep, completedSteps) {
  if (stepName === currentStep) {
    return 'card-info';
  }
  if (completedSteps.includes(stepName)) {
    return 'card-success';
  }

  return 'card-default';
}

function canSkip(step, stepName, currentStep) {
  if (stepName !== currentStep) { return false; }
  return step.matches.some(m => m.nextStep != null);
}

function isOpen(stepName, expandedStep) {
  return stepName === expandedStep;
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
      <Title>
        <a onClick={() => expandStep(stepName)}>Step {idx + 1} {step.title}</a>
        {
          canSkip(step, stepName, currentStep) ?
            <span className="pull-right">
              <SkipButton onClick={onSkipCurrentStep}>Skip</SkipButton>
            </span> :
            null
        }
      </Title>
    );

    return (
      <Card
        key={stepName}
        className={getClassName(stepName, currentStep, completedSteps)}
      >
        <CardHeader
          className={getColour(stepName, currentStep, completedSteps)}
        >
          {header}
        </CardHeader>
        <Collapse isOpen={isOpen(stepName, expandedStep)}>
          <CardBlock>
            <Markdown escapeHtml={false} source={step.description} />
          </CardBlock>
        </Collapse>
      </Card>
    );
  });

  return (
    <div>
      {panels}
    </div>
  );
};

export default TutorialSteps;
