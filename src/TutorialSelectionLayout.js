// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import cx from 'classnames';
import styled from 'styled-components';

import StarRule from './StarRule';

// XXX Remove mixed use of classnames and styled-components.
const Wrapper = styled.div`
  .single-tutorial {
    width: 592px;
  }
`;

type PropTypes = {
  children : React$Element<*>,  // A TutorialSelection element.
  singleTutorial: boolean,
};

const TutorialSelectionLayout = ({
  children,
  singleTutorial,
}: PropTypes) => {
  const className = cx('container', {
    'single-tutorial': singleTutorial,
  });

  return (
    <Wrapper>
      <h2 className="flight-tutorials-header">Flight Compute Tutorial</h2>
      <StarRule variant="primary" />
      <div className={className}>
        {children}
      </div>
    </Wrapper>
  );
};

export default TutorialSelectionLayout;
