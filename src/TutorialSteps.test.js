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
    matches: [],
  },
  step2: {
    title: 'My step 2',
    description: 'My step 2 description',
    matches: [],
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
    <TutorialSteps completedSteps={[]} currentStep="step1" steps={steps} />,
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
      <TutorialSteps {...props} steps={steps} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Panel headers', () => {
  const wrapper = shallow(
    <TutorialSteps completedSteps={['step1']} currentStep={'step2'} steps={steps} />,
  );

  const panels = wrapper.find('Panel');

  it('completed steps are styled correctly', () => {
    expect(panels.at(0)).toHaveProp('bsStyle', 'success');
  });

  it('current step styled correctly', () => {
    expect(panels.at(1)).toHaveProp('bsStyle', 'primary');
  });

  it('pending steps are styled correctly', () => {
    expect(panels.at(2)).toHaveProp('bsStyle', 'default');
  });
});

it('renders the steps in order', () => {
  const wrapper = shallow(
    <TutorialSteps completedSteps={[]} currentStep="step1" steps={steps} />,
  );

  const renderedSteps = wrapper.find('Panel');

  expect(renderedSteps.at(0)).toHaveProp('eventKey', 'step1');
  expect(renderedSteps.at(1)).toHaveProp('eventKey', 'step2');
  expect(renderedSteps.at(2)).toHaveProp('eventKey', 'step3');
});
