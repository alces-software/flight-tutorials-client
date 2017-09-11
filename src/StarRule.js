// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';

// import './styles/StarPrimary.scss';

type PropTypes = {
  variant: 'primary' | 'light',
};

const StarRule = ({ variant }: PropTypes) => (
  <hr className={`star-${variant}`} />
);

export default StarRule;
