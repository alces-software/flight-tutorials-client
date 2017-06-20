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
import { shallow } from 'enzyme';

import Component from './'

const renderComponent = () => (
  <Component
    socketIOUrl="http://localhost:3001/pty"
    socketIOPath="/tutorial/socket.io"
  />
);

it('renders without crashing', () => {
  const node = document.createElement('div')
  render(renderComponent(), node);
});

it('displays tutorial container when tutorial is selected', () => {
  const wrapper = shallow(renderComponent());
  const instance = wrapper.instance();

  // The flow type definition for `wrapper.instance()` returns a generic
  // React$Component type, not the specific TutorialContainer type.  When that
  // is fixed, we can remove this. See
  // https://github.com/flowtype/flow-typed/issues/925
  // $FlowFixMe
  instance.handleTutorialSelection(0);

  expect(wrapper.find('TutorialSelection')).not.toBePresent();
  expect(wrapper.find('TutorialContainer')).toBePresent();
});

it('displays tutorial selection when no tutorial is selected', () => {
  const wrapper = shallow(renderComponent());
  const instance = wrapper.instance();

  // The flow type definition for `wrapper.instance()` returns a generic
  // React$Component type, not the specific TutorialContainer type.  When that
  // is fixed, we can remove this. See
  // https://github.com/flowtype/flow-typed/issues/925
  // $FlowFixMe
  instance.handleTutorialSelection(0);
  // $FlowFixMe
  instance.handleShowAllTutorials();

  expect(wrapper.find('TutorialSelection')).toBePresent();
  expect(wrapper.find('TutorialContainer')).not.toBePresent();
});
