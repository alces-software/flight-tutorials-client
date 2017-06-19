/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Compute Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react'
import { render } from 'react-dom'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TutorialSelection, { TutorialOption } from './TutorialSelection';

const tutorial1 = {
  title: 'Tutorial 1',
  description: 'Tutorial 1 description',
  firstStep: 'step1',
  steps: {
    step1: {
      title: 'Tutorial 1 step 1',
      description: 'Tutorial 1 step 1 description',
    },
    step2: {
      title: 'Tutorial 1 step 2',
      description: 'Tutorial 1 step 2 description',
    }
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
    },
    step2: {
      title: 'Tutorial 2 step 2',
      description: 'Tutorial 2 step 2 description',
    }
  },
};

const tutorials = [ tutorial1, tutorial2 ];
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
    renderTutorialSelection()
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders each tutorial once', () => {
  const wrapper = shallow(renderTutorialSelection());

  expect(wrapper.find(TutorialOption).length).toEqual(2);
  expect(wrapper.find(TutorialOption).at(0)).toHaveProp('tutorial', tutorial1);
  expect(wrapper.find(TutorialOption).at(1)).toHaveProp('tutorial', tutorial2);
});

it('calls onSelectTutorial when tutorial is selected', () => {
  const wrapper = shallow(renderTutorialSelection());

  tutorials.forEach((tutorial, idx) => {
    const option = wrapper.find(TutorialOption).at(idx);
    const button = option.dive().find('button').first();

    button.simulate('click');

    expect(onSelectTutorialSpy).toHaveBeenCalledWith(idx);
  });
});
