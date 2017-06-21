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

import TutorialSelection from './TutorialSelection';
import TutorialCard from './TutorialCard';

const tutorial1 = {
  title: 'Tutorial 1',
  description: 'Tutorial 1 description',
  firstStep: 'step1',
  steps: {
    step1: {
      title: 'Tutorial 1 step 1',
      description: 'Tutorial 1 step 1 description',
      matches: [],
    },
    step2: {
      title: 'Tutorial 1 step 2',
      description: 'Tutorial 1 step 2 description',
      matches: [],
    },
  },
};

const tutorial2 = {
  title: 'Tutorial 2',
  description: 'Tutorial 2 description',
  firstStep: 'step1',
  steps: {
    step1: {
      title: 'Tutorial 2 step 1',
      description: 'Tutorial 2 step 1 description',
      matches: [],
    },
    step2: {
      title: 'Tutorial 2 step 2',
      description: 'Tutorial 2 step 2 description',
      matches: [],
    },
  },
};

const tutorials = [tutorial1, tutorial2];
const onSelectTutorialSpy = jest.fn();

const renderTutorialSelection = () => (
  <TutorialSelection
    onSelectTutorial={onSelectTutorialSpy}
    tutorials={tutorials}
  />
);

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(renderTutorialSelection(), node);
});

it('renders correctly', () => {
  const tree = renderer.create(
    renderTutorialSelection(),
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders each tutorial once', () => {
  const wrapper = shallow(renderTutorialSelection());

  expect(wrapper.find(TutorialCard).length).toEqual(2);
  expect(wrapper.find(TutorialCard).at(0)).toHaveProp('tutorial', tutorial1);
  expect(wrapper.find(TutorialCard).at(1)).toHaveProp('tutorial', tutorial2);
});

it('calls onSelectTutorial when tutorial is selected', () => {
  const wrapper = shallow(renderTutorialSelection());

  tutorials.forEach((tutorial, idx) => {
    const option = wrapper.find(TutorialCard).at(idx);
    const button = option.dive().find('button').first();

    button.simulate('click');

    expect(onSelectTutorialSpy).toHaveBeenCalledWith(idx);
  });
});
