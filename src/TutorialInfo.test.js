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
import { shallow } from 'enzyme';

import TutorialInfo from './TutorialInfo';

const tutorial = {
  title: 'Tutorial 1',
  description: 'Tutorial 1 description',
  firstStep: 'step1',
  steps: {
    step1: {
      title: 'Tutorial 1 step 1',
      description: 'Tutorial 1 step 1 description',
      matches: [],
    },
  },
};

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(<TutorialInfo tutorial={tutorial} />, node);
});

it('renders correctly', () => {
  const tree = renderer.create(
    <TutorialInfo tutorial={tutorial} />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders the title', () => {
  const wrapper = shallow(
    <TutorialInfo tutorial={tutorial} />,
  );

  expect(wrapper).toIncludeText(tutorial.title);
});


// Add this test back in once we support markdown rendering of the
// description.
xit('renders the description', () => {
  const wrapper = shallow(
    <TutorialInfo tutorial={tutorial} />,
  );

  expect(wrapper).toIncludeText(tutorial.description);
});
