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

import TutorialCard from './TutorialCard';

const tutorial = {
  title: 'Tutorial 1',
  description: 'Tutorial 1 description.\n\nWith *markdown* **support**.',
  firstStep: 'step1',
  steps: {
    step1: {
      title: 'Tutorial 1 step 1',
      description: 'Tutorial 1 step 1 description',
      matches: [],
    },
  },
};

function renderCard() {
  return (
    <TutorialCard
      onSelectTutorial={() => {}}
      tutorial={tutorial}
    />
  );
}

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(renderCard(), node);
});

it('renders correctly', () => {
  const tree = renderer.create(
    renderCard(),
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

