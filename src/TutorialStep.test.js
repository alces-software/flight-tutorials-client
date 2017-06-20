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

import TutorialStep from './TutorialStep';

const step = {
  title: 'My step 1',
  description: 'My step 1 description',
};

const varieties = {
  currentStep: { current: true, completed: false },
  previousStep: { current: false, completed: true },
  futureStep: { current: false, completed: false },
};

Object.keys(varieties).forEach((variety) => {
  it(`renders without crashing (${variety})`, () => {
    const node = document.createElement('div');
    render(<TutorialStep {...varieties[variety]} step={step} />, node);
  });

  it(`renders correctly (${variety})`, () => {
    const tree = renderer.create(
      <TutorialStep {...varieties[variety]} step={step} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Current step', () => {
  it('includes the title', () => {
    const wrapper = shallow(
      <TutorialStep {...varieties.currentStep} step={step} />,
    );

    expect(wrapper).toIncludeText(step.title);
  });

  xit('includes the description', () => {
    const wrapper = shallow(
      <TutorialStep {...varieties.currentStep} step={step} />,
    );

    expect(wrapper).toIncludeText(step.description);
  });
});

describe('Previous steps', () => {
  it('includes the title', () => {
    const wrapper = shallow(
      <TutorialStep {...varieties.previousStep} step={step} />,
    );

    expect(wrapper).toIncludeText(step.title);
  });

  xit('includes the description', () => {
    const wrapper = shallow(
      <TutorialStep {...varieties.previousStep} step={step} />,
    );

    expect(wrapper).toIncludeText(step.description);
  });
});

describe('Future steps', () => {
  it('does not include the title', () => {
    const wrapper = shallow(
      <TutorialStep {...varieties.futureStep} step={step} />,
    );

    expect(wrapper).not.toIncludeText(step.title);
  });

  xit('does not include the description', () => {
    const wrapper = shallow(
      <TutorialStep {...varieties.futureStep} step={step} />,
    );

    expect(wrapper).not.toIncludeText(step.description);
  });
});
