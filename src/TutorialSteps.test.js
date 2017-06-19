/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Compute Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react'
import { render } from 'react-dom'
import { shallow } from 'enzyme';

import TutorialSteps from './TutorialSteps';

const steps = {
  step1: {
    title: 'My step 1',
    description: 'My step 1 description',
  },
  step2: {
    title: 'My step 2',
    description: 'My step 2 description',
  }
};

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(
    <TutorialSteps completedSteps={[]} currentStep="step1" steps={steps} />,
    node
  );
});

Object.keys(steps).forEach((currentStep, idx) => {
  it(`correctly determines the current step (${currentStep})`, () => {
    const wrapper = shallow(
      <TutorialSteps completedSteps={[]} currentStep={currentStep} steps={steps} />
    );

    const renderedSteps = wrapper.find('TutorialStep')

    expect(renderedSteps.at(0)).toHaveProp('current', 0 === idx);
    expect(renderedSteps.at(1)).toHaveProp('current', 1 === idx);
  });
});


it('correctly determines if a step has been completed', () => {
  const wrapper = shallow(
    <TutorialSteps completedSteps={['step1']} currentStep="step2" steps={steps} />
  );

  const renderedSteps = wrapper.find('TutorialStep')

  expect(renderedSteps.at(0)).toHaveProp('completed', true);
  expect(renderedSteps.at(1)).toHaveProp('completed', false);
});

it('renders the steps in order', () => {
  const wrapper = shallow(
    <TutorialSteps completedSteps={[]} currentStep="step1" steps={steps} />,
  );

  const renderedSteps = wrapper.find('TutorialStep')

  expect(renderedSteps.at(0)).toHaveProp('step', steps.step1);
  expect(renderedSteps.at(1)).toHaveProp('step', steps.step2);
});
