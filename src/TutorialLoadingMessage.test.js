// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { render } from 'react-dom';
import renderer from 'react-test-renderer';

import TutorialLoadingMessage from './TutorialLoadingMessage';

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(<TutorialLoadingMessage />, node);
});

it('renders correctly', () => {
  const tree = renderer.create(
    <TutorialLoadingMessage />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
