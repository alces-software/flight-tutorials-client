// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import type { TutorialType } from './types';

const TutorialInfo = ({
  tutorial,
} : {
  tutorial: TutorialType
}) => (
  <div>
    <h2>{tutorial.title}</h2>
    <div dangerouslySetInnerHTML={{ __html: tutorial.description }} />
  </div>
);

export default TutorialInfo;
