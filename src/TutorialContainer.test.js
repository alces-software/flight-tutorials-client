/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react'
import { render } from 'react-dom'
import { shallow } from 'enzyme';

import TutorialContainer from './TutorialContainer';
import ReactTerminal from './ReactTerminal';

const tutorial = {
  title: 'Tutorial 1',
  description: 'Tutorial 1 description',
  firstStep: 'step1',
  steps: {
    step1: {
      title: 'Tutorial 1 step 1',
      description: 'Tutorial 1 step 1 description',
      matches: [{
        inputLine: '$ echo "step1 completed"',
        anchored: false,
        regexp: false,
        nextStep: 'step2',
      }],
    },
    step2: {
      title: 'Tutorial 1 step 2',
      description: 'Tutorial 1 step 2 description',
    }
  },
};

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(
    <TutorialContainer tutorial={tutorial} children={() => null} />,
    node
  );
});

it('calls child function with expected arguments', () => {
  const childFunctionSpy = jest.fn().mockReturnValue(null);
  const wrapper = shallow(
    <TutorialContainer tutorial={tutorial} children={childFunctionSpy} />
  );

  expect(childFunctionSpy).toHaveBeenCalledWith({
    completedSteps: [],
    currentStep: tutorial.firstStep,
    terminal: <ReactTerminal onInputLine={expect.anything()} />,
  });
});

it('updates state when given matching input', () => {
  const wrapper = shallow(
    <TutorialContainer tutorial={tutorial} children={() => null} />
  );
  const instance = wrapper.instance();

  expect(wrapper).toHaveState('completedSteps', []);
  expect(wrapper).toHaveState('currentStep', tutorial.firstStep);

  instance.handleInputLine(tutorial.steps.step1.matches[0].inputLine);

  expect(wrapper).toHaveState('completedSteps', [tutorial.firstStep]);
  expect(wrapper).toHaveState('currentStep', 'step2');
});

it('does not update state when given non-matching input', () => {
  const wrapper = shallow(
    <TutorialContainer tutorial={tutorial} children={() => null} />
  );
  const instance = wrapper.instance();

  expect(wrapper).toHaveState('completedSteps', []);
  expect(wrapper).toHaveState('currentStep', tutorial.firstStep);

  instance.handleInputLine('you shall not match');

  expect(wrapper).toHaveState('completedSteps', []);
  expect(wrapper).toHaveState('currentStep', tutorial.firstStep);
});
