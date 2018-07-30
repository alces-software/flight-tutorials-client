// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

/* eslint-disable react/no-children-prop */

import React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';

import TerminalContainer from './TerminalContainer';
import ReactTerminal from './ReactTerminal';

// XXX Find a better way of mocking the socket than this.
const mockSocket = {};

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(
    <TerminalContainer
      children={() => <div />}
      onInputLine={() => {}}
      socket={mockSocket}
    />,
    node,
  );
});

it('calls child function with expected arguments', () => {
  const childFunctionSpy = jest.fn().mockReturnValue(<div />);
  const onInputLine = () => {};
  const wrapper = shallow(
    <TerminalContainer
      children={childFunctionSpy}
      onInputLine={onInputLine}
      socket={mockSocket}
    />,
  );
  const instance = wrapper.instance();

  // The flow type definition for `wrapper.instance()` returns a generic
  // React$Component type, not the specific TerminalContainer type.  When that
  // is fixed, we can remove these. See
  // https://github.com/flowtype/flow-typed/issues/925
  // $FlowFixMe
  const onSessionRestartAccepted = instance.handleSessionRestartAccepted;
  // $FlowFixMe
  const onSessionRestartRequestClosed = instance.handleSessionRestartRequestClosed;
  // $FlowFixMe
  const sessionId = instance.state.sessionId;
  // $FlowFixMe
  const onSessionEnd = instance.handleSessionEnd;
  // $FlowFixMe
  const onShowSessionHistory = instance.handleShowSessionHistory;
  // $FlowFixMe
  const getSessionHistory = instance.getSessionHistory;

  expect(childFunctionSpy).toHaveBeenCalledWith({
    getSessionHistory,
    onSessionRestartAccepted,
    onSessionRestartRequestClosed,
    onShowSessionHistory,
    requestSessionRestart: false,
    showSessionHistory: false,
    terminal: <ReactTerminal
      key={sessionId}
      onInputLine={onInputLine}
      onSessionEnd={onSessionEnd}
      ref={expect.any(Function)}
      size={{ width: 0, height: 0 }}
      socket={mockSocket}
    />,
    // terminal: expect.anything()
  });
});

it('updates state when given matching input', () => {
  const wrapper = shallow(
    <TerminalContainer
      children={() => <div />}
      onInputLine={() => {}}
      socket={mockSocket}
    />,
  );
  const instance = wrapper.instance();

  expect(wrapper).toHaveState('requestSessionRestart', false);
  expect(wrapper).toHaveState('sessionId', 0);

  // The flow type definition for `wrapper.instance()` returns a generic
  // React$Component type, not the specific TerminalContainer type.  When that
  // is fixed, we can remove this. See
  // https://github.com/flowtype/flow-typed/issues/925
  // $FlowFixMe
  instance.handleSessionEnd();

  expect(wrapper).toHaveState('requestSessionRestart', true);
  expect(wrapper).toHaveState('sessionId', 0);

  // The flow type definition for `wrapper.instance()` returns a generic
  // React$Component type, not the specific TerminalContainer type.  When that
  // is fixed, we can remove this. See
  // https://github.com/flowtype/flow-typed/issues/925
  // $FlowFixMe
  instance.handleSessionRestartAccepted();

  expect(wrapper).toHaveState('requestSessionRestart', false);
  expect(wrapper).toHaveState('sessionId', 1);
});
