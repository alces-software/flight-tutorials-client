// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

import { StandardModal } from 'flight-reactware';

import CloseButton from './CloseButton';
import TutorialInfo from './TutorialInfo';
import TutorialSteps from './TutorialSteps';
import StarRule from './StarRule';
import type { TutorialType } from './types';

type PropsType = {
  children : React$Element<*>,  // A TerminalLayout element.
  completedSteps : Array<string>,
  currentStep: string,
  expandStep: (string) => void,
  expandedStep: string,
  onShowAllTutorials: () => void,
  onSkipCurrentStep: (Event) => void,
  tutorial: TutorialType,
}

const TutorialLayout = ({
  children,
  completedSteps,
  currentStep,
  expandStep,
  expandedStep,
  onShowAllTutorials,
  onSkipCurrentStep,
  tutorial,
} : PropsType) => (
  <div>
    <CloseButton onClose={onShowAllTutorials} />
    <div className="container">
      <h2 className="flight-tutorials-header">Flight Compute Tutorial</h2>
      <StarRule variant="primary" />
    </div>
    <Container fluid >
      <Row>
        <Col xs={12} sm={12} md={4} lg={{ size: 4, offset: 1 }} >
          <TutorialInfo tutorial={tutorial} />
          <TutorialSteps
            completedSteps={completedSteps}
            currentStep={currentStep}
            expandStep={expandStep}
            expandedStep={expandedStep}
            onSkipCurrentStep={onSkipCurrentStep}
            steps={tutorial.steps}
          />
        </Col>
        <Col xs={12} sm={12} md={8} lg={7} >
          {children}
        </Col>
      </Row>
    </Container>
  </div>
);

export default TutorialLayout;
