// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import Markdown from 'react-markdown';

import type { TutorialType } from './types';

const TutorialInfo = ({
  tutorial,
} : {
  tutorial: TutorialType
}) => (
  <div>
    <h2>{tutorial.title}</h2>
    <Markdown source={tutorial.description} />
  </div>
);

export default TutorialInfo;
