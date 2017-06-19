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

import Component from './'

it('renders without crashing', () => {
  const node = document.createElement('div')
  render(<Component/>, node);
});

it('displays tutorial container when tutorial is selected', () => {
  const wrapper = shallow(
    <Component />
  );
  const instance = wrapper.instance();

  instance.handleTutorialSelection(0);

  expect(wrapper.find('TutorialSelection')).not.toBePresent();
  expect(wrapper.find('TutorialContainer')).toBePresent();
});

it('displays tutorial selection when no tutorial is selected', () => {
  const wrapper = shallow(
    <Component />
  );
  const instance = wrapper.instance();

  instance.handleTutorialSelection(0);
  instance.handleShowAllTutorials();

  expect(wrapper.find('TutorialSelection')).toBePresent();
  expect(wrapper.find('TutorialContainer')).not.toBePresent();
});
