// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import StandardModal from 'flight-common/lib/components/StandardModal';

import CloseButton from './CloseButton';
import TutorialInfo from './TutorialInfo';
import TutorialSteps from './TutorialSteps';
import StarRule from './StarRule';
import type { TutorialType } from './types';

type PropsType = {
  completedSteps : Array<string>,
  currentStep: string,
  expandStep: (string) => void,
  expandedStep: string,
  onSessionRestartAccepted: () => void,
  onSessionRestartRequestClosed: () => void,
  onShowAllTutorials: () => void,
  onSkipCurrentStep: (Event) => void,
  terminal : React$Element<*>,  // A ReactTerminal element.
  tutorial: TutorialType,
  requestSessionRestart: boolean,
}

const TutorialLayout = ({
  completedSteps,
  currentStep,
  expandStep,
  expandedStep,
  onSessionRestartAccepted,
  onSessionRestartRequestClosed,
  onShowAllTutorials,
  onSkipCurrentStep,
  requestSessionRestart,
  terminal,
  tutorial,
} : PropsType) => (
  <div>
    <CloseButton onClose={onShowAllTutorials} />
    <div className="container">
      <h2 className="flight-tutorials-header">Flight Compute Tutorial</h2>
      <StarRule variant="primary" />
    </div>
    <Grid fluid >
      <Row>
        <Col xs={12} sm={12} md={4} lg={4} lgOffset={1} >
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
          <StandardModal
            buttons={
              <Button
                bsStyle="success"
                onClick={onSessionRestartAccepted}
              >
                Restart
              </Button>
            }
            show={requestSessionRestart}
            onHide={onSessionRestartRequestClosed}
            title="Your terminal session has been terminated"
          >
            Your terminal session has been terminated. Would you like to
            restart it?
          </StandardModal>
          {terminal}
        </Col>
      </Row>
    </Grid>
  </div>
);

export default TutorialLayout;
