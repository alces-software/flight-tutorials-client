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

import StarRule from './StarRule';
import './styles/TutorialSelectionLayout.scss';

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
    <div className="TutorialSelectionLayout">
      <h2 className="flight-tutorials-header">Flight Compute Tutorial</h2>
      <StarRule variant="primary" />
      <div className={className}>
        {children}
      </div>
    </div>
  );
};

export default TutorialSelectionLayout;
