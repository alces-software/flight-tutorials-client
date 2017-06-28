// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';

import StarPrimary from './StarPrimary';

type PropTypes = {
  children : React$Element<*>,  // A TutorialSelection element.
};

const TutorialSelectionLayout = ({
  children,
}: PropTypes) => {
  return (
    <div className="container">
      <h2 className="flight-tutorials-header">Flight Compute Tutorial</h2>
      <StarPrimary />
      {children}
    </div>
  );
};

export default TutorialSelectionLayout;
