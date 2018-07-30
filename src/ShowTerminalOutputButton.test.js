// @flow
/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { render } from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import ShowSessionHistoryButton from './ShowSessionHistoryButton';

const renderButton = () => (
  <ShowSessionHistoryButton
    onShowSessionHistory={() => {}}
  />
);


xit('renders without crashing', () => {
  const node = document.createElement('div');
  render(renderButton(), node);
});

xit('renders correctly', () => {
  const tree = renderer.create(
    renderButton(),
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains a Button', () => {
  const wrapper = shallow(renderButton());

  expect(wrapper.find('Button').length).toBe(1);
});

it('contains a HelpPopover', () => {
  const wrapper = shallow(renderButton());

  expect(wrapper.find('Styled(HelpPopover)').length).toBe(1);
});
