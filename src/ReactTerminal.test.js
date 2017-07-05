// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import io from 'socket.io-client';
import { render } from 'react-dom';
import { mount } from 'enzyme';

import ReactTerminal from './ReactTerminal';

const onInputLineSpy = jest.fn();

function renderComponent() {
  const socket = io('http://localhost:25288/pty', { path: '/tutorial/socket.io' });
  return <ReactTerminal onInputLine={onInputLineSpy} socket={socket} />;
}

it('renders without crashing', () => {
  const node = document.createElement('div');
  const socket = io('http://localhost:25288/pty', { path: '/tutorial/socket.io' });
  render(<ReactTerminal onInputLine={onInputLineSpy} socket={socket} />, node);
});

it('ends the stream when unmounted', () => {
  const wrapper = mount(renderComponent());
  const instance = wrapper.instance();
  // The flow type definition for `wrapper.instance()` returns a generic
  // React$Component type, not the specific TutorialContainer type.  When that
  // is fixed, we can remove this. See
  // https://github.com/flowtype/flow-typed/issues/925
  // $FlowFixMe
  const spy = jest.spyOn(instance.stream, 'end');

  // wrapper.mount();
  wrapper.unmount();

  expect(spy).toHaveBeenCalled();
});

