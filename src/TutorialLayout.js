// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import TutorialInfo from './TutorialInfo';
import TutorialSteps from './TutorialSteps';
import StarPrimary from './StarPrimary';
import type { TutorialType } from './types';

type PropsType = {
  completedSteps : Array<string>,
  currentStep: string,
  onShowAllTutorials: () => void,
  terminal : React$Element<*>,  // A ReactTerminal element.
  tutorial: TutorialType,
}

const TutorialLayout = ({
  completedSteps,
  currentStep,
  onShowAllTutorials,
  terminal,
  tutorial,
} : PropsType) => (
  <div>
    <div style={{float: 'right'}} onClick={onShowAllTutorials} >X</div>
    <div className="container">
      <h2 className="flight-tutorials-header">Flight Compute Tutorial</h2>
      <StarPrimary />
    </div>
    <Grid fluid >
      <Row>
        <Col xs={12} sm={12} md={4} lg={4} lgOffset={1} >
          <TutorialInfo tutorial={tutorial} />
          <TutorialSteps
            completedSteps={completedSteps}
            currentStep={currentStep}
            steps={tutorial.steps}
          />
        </Col>
        <Col xs={12} sm={12} md={8} lg={7} >
          {terminal}
        </Col>
      </Row>
    </Grid>
  </div>
);

export default TutorialLayout;
