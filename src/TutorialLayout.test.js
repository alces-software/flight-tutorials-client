// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react'
import { render } from 'react-dom'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TutorialInfo from './TutorialInfo';
import TutorialLayout from './TutorialLayout';
import TutorialStep from './TutorialStep'
import TutorialSteps from './TutorialSteps'

const steps = {
  step1: {
    title: 'My step 1',
    description: 'My step 1 description',
    matches: [],
  },
  step2: {
    title: 'My step 2',
    description: 'My step 2 description',
    matches: [],
  }
};

const tutorial = {
  title: 'My tutorial',
  description: 'My tutorial description',
  firstStep: 'step1',
  steps: steps,
};

const completedSteps = ['step1'];
const currentStep = 'step2';
const dummyTerminal = <div>dummy terminal</div>;

const renderTutorialLayout = () => (
  <TutorialLayout
    completedSteps={completedSteps}
    currentStep={currentStep}
    onShowAllTutorials={() => {}}
    showAllTutorialsButton
    terminal={dummyTerminal}
    tutorial={tutorial}
  />
);

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(renderTutorialLayout(), node);
});

it('renders correctly', () => {
  const tree = renderer.create(
    renderTutorialLayout()
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('includes an overview of the tutorial', () => {
  const wrapper = shallow(renderTutorialLayout());

  expect(wrapper).toContainReact(<TutorialInfo tutorial={tutorial} />);
});

it('includes the tutorial steps', () => {
  const wrapper = shallow(renderTutorialLayout());

  expect(wrapper).toContainReact(<TutorialSteps
    completedSteps={completedSteps}
    currentStep={currentStep}
    steps={steps}
  />);
});

it('includes the terminal', () => {
  const wrapper = shallow(renderTutorialLayout());

  expect(wrapper).toContainReact(dummyTerminal);
});
