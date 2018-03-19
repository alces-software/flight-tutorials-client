// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import { Button, Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import Markdown from 'react-markdown';
import styled, { css } from 'styled-components';

import type { StepMap } from './types';

const Title = styled.div`
  a:hover {
      text-decoration: none;
      cursor: inherit;
  }

  ${({ isCompleted, isCurrent }) => (isCompleted || isCurrent) && css`
    a {
      color: white;
    }
    a:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  `}
`;

const SkipButton = styled(Button)`
  margin-top: -4px;
`;

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
    const isCompleted = completedSteps.includes(stepName);
    const isCurrent = currentStep === stepName;
    const title = (
      <Title
        isCompleted={isCompleted}
        isCurrent={isCurrent}
      >
        <a
          onClick={() => expandStep(stepName)}
          role="menuitem"
          tabIndex={0}
        >
          Step {idx + 1} {step.title}
        </a>
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
      <Card key={stepName}>
        <CardHeader
          className={getColour(stepName, currentStep, completedSteps)}
        >
          {title}
        </CardHeader>
        <Collapse isOpen={isOpen(stepName, expandedStep)}>
          <CardBody>
            <Markdown escapeHtml={false} source={step.description} />
          </CardBody>
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
