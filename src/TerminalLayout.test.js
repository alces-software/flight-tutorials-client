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

import { StandardModal } from 'flight-reactware';
import TerminalLayout from './TerminalLayout';

const dummyTerminal = <div>dummy terminal</div>;

const renderTerminalLayout = () => (
  <TerminalLayout
    onSessionRestartAccepted={() => {}}
    onSessionRestartRequestClosed={() => {}}
    requestSessionRestart={false}
  >
    {dummyTerminal}
  </TerminalLayout>
);

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(renderTerminalLayout(), node);
});

it('renders correctly', () => {
  const tree = renderer.create(
    renderTerminalLayout(),
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('includes a modal', () => {
  const wrapper = shallow(renderTerminalLayout());

  expect(wrapper.find(StandardModal)).toBePresent();
});

it('includes the terminal', () => {
  const wrapper = shallow(renderTerminalLayout());

  expect(wrapper).toContainReact(dummyTerminal);
});
