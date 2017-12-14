// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import styled from 'styled-components';

import StarRule from './StarRule';

const Wrapper = styled.div`
  ${props => props.singleTutorial && 'width: 592px;'}
`;

type PropTypes = {
  children : React$Element<*>,  // A TutorialSelection element.
  singleTutorial: boolean,
};

const TutorialSelectionLayout = ({
  children,
  singleTutorial,
}: PropTypes) => (
  <div>
    <h2 className="flight-tutorials-header">Flight Compute Tutorial</h2>
    <StarRule variant="primary" />
    <Wrapper singleTutorial={singleTutorial}>
      {children}
    </Wrapper>
  </div>
);

export default TutorialSelectionLayout;
