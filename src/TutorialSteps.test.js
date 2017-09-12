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
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import TutorialSteps from './TutorialSteps';

const steps = {
  step1: {
    title: 'My step 1',
    description: 'My step 1 description',
    matches: [{
      inputLine: 'echo step2',
      anchored: true,
      regexp: false,
      nextStep: 'step2',
    }],
  },
  step2: {
    title: 'My step 2',
    description: 'My step 2 description',
    matches: [{
      inputLine: 'echo step3',
      anchored: true,
      regexp: false,
      nextStep: 'step3',
    }],
  },
  step3: {
    title: 'My step 3',
    description: 'My step 3 description',
    matches: [],
  },
};

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(
    <TutorialSteps
      completedSteps={[]}
      currentStep="step1"
      expandedStep="step1"
      expandStep={() => {}}
      onSkipCurrentStep={() => {}}
      steps={steps}
    />,
    node,
  );
});

[
  { completedSteps: [], currentStep: 'step1' },
  { completedSteps: ['step1'], currentStep: 'step2' },
  { completedSteps: ['step1', 'step2'], currentStep: 'step3' },
].forEach((props) => {
  it(`renders correctly when currentStep === ${props.currentStep}`, () => {
    const tree = renderer.create(
      <TutorialSteps
        {...props}
        expandedStep={props.currentStep}
        expandStep={() => {}}
        onSkipCurrentStep={() => {}}
        steps={steps}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Panel headers', () => {
  const wrapper = shallow(
    <TutorialSteps
      completedSteps={['step1']}
      currentStep="step2"
      expandedStep="step2"
      expandStep={() => {}}
      onSkipCurrentStep={() => {}}
      steps={steps}
    />,
  );

  const headers = wrapper.find('CardHeader');

  it('completed steps are styled correctly', () => {
    expect(headers.at(0)).toHaveClassName('card-success');
  });

  it('current step styled correctly', () => {
    expect(headers.at(1)).toHaveClassName('card-info');
  });

  it('pending steps are styled correctly', () => {
    expect(headers.at(2)).toHaveClassName('card-default');
  });
});

it('renders the steps in order', () => {
  const wrapper = shallow(
    <TutorialSteps
      completedSteps={[]}
      currentStep="step1"
      expandStep={() => {}}
      expandedStep="step2"
      onSkipCurrentStep={() => {}}
      steps={steps}
    />,
  );

  const renderedSteps = wrapper.find('a');

  expect(renderedSteps.at(0)).toIncludeText(steps.step1.title);
  expect(renderedSteps.at(1)).toIncludeText(steps.step2.title);
  expect(renderedSteps.at(2)).toIncludeText(steps.step3.title);
});
