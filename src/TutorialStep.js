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

type PropTypes = {
  current: boolean,
  completed: boolean,
  step: { title: string, description: string }, // eslint-disable-line react/no-unused-prop-types
}

const TutorialStep = ({
  current,
  completed,
  step,
}: PropTypes) => {
  if (!current && !completed) {
    return null;
  }
  return (
    <div>
      <h3>{step.title}</h3>
      <Markdown escapeHtml={false} source={step.description} />
    </div>
  );
};

export default TutorialStep;
