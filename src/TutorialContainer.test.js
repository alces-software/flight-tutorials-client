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

import TutorialContainer from './TutorialContainer';
import ReactTerminal from './ReactTerminal';

const tutorial = {
  title: 'Tutorial 1',
  description: 'Tutorial 1 description',
  firstStep: 'step1',
  steps: {
    step1: {
      title: 'Tutorial 1 step 1',
      description: 'Tutorial 1 step 1 description',
      matches: [{
        inputLine: '$ echo "step1 completed"',
        anchored: false,
        regexp: false,
        nextStep: 'step2',
      }],
    },
    step2: {
      title: 'Tutorial 1 step 2',
      description: 'Tutorial 1 step 2 description',
      matches: [],
    },
  },
};

// XXX Find a better way of mocking the socket than this.
const mockSocket = {};

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(
    <TutorialContainer tutorial={tutorial} children={() => <div />} socket={mockSocket} />,
    node,
  );
});

it('calls child function with expected arguments', () => {
  const childFunctionSpy = jest.fn().mockReturnValue(null);
  const wrapper = shallow(
    <TutorialContainer tutorial={tutorial} children={childFunctionSpy} socket={mockSocket} />,
  );
  const instance = wrapper.instance();

  // The flow type definition for `wrapper.instance()` returns a generic
  // React$Component type, not the specific TutorialContainer type.  When that
  // is fixed, we can remove these. See
  // https://github.com/flowtype/flow-typed/issues/925
  // $FlowFixMe
  const onSessionRestartAccepted = instance.handleSessionRestartAccepted;
  // $FlowFixMe
  const onSessionRestartRequestClosed = instance.handleSessionRestartRequestClosed;
  // $FlowFixMe
  const sessionId = instance.state.sessionId;
  // $FlowFixMe
  const onInputLine = instance.handleInputLine;
  // $FlowFixMe
  const onSessionEnd = instance.handleSessionEnd;

  expect(childFunctionSpy).toHaveBeenCalledWith({
    completedSteps: [],
    currentStep: tutorial.firstStep,
    onSessionRestartAccepted,
    onSessionRestartRequestClosed,
    requestSessionRestart: false,
    terminal: <ReactTerminal
      key={sessionId}
      ref={expect.any(Function)}
      onInputLine={onInputLine}
      onSessionEnd={onSessionEnd}
      socket={mockSocket}
    />,
    // terminal: expect.anything()
  });
});

it('updates state when given matching input', () => {
  const wrapper = shallow(
    <TutorialContainer tutorial={tutorial} children={() => <div />} socket={mockSocket} />,
  );
  const instance = wrapper.instance();

  expect(wrapper).toHaveState('completedSteps', []);
  expect(wrapper).toHaveState('currentStep', tutorial.firstStep);

  // The flow type definition for `wrapper.instance()` returns a generic
  // React$Component type, not the specific TutorialContainer type.  When that
  // is fixed, we can remove this. See
  // https://github.com/flowtype/flow-typed/issues/925
  // $FlowFixMe
  instance.handleInputLine(tutorial.steps.step1.matches[0].inputLine);

  expect(wrapper).toHaveState('completedSteps', [tutorial.firstStep]);
  expect(wrapper).toHaveState('currentStep', 'step2');
});

it('does not update state when given non-matching input', () => {
  const wrapper = shallow(
    <TutorialContainer tutorial={tutorial} children={() => <div />} socket={mockSocket} />,
  );
  const instance = wrapper.instance();

  expect(wrapper).toHaveState('completedSteps', []);
  expect(wrapper).toHaveState('currentStep', tutorial.firstStep);

  // The flow type definition for `wrapper.instance()` returns a generic
  // React$Component type, not the specific TutorialContainer type.  When that
  // is fixed, we can remove this. See
  // https://github.com/flowtype/flow-typed/issues/925
  // $FlowFixMe
  instance.handleInputLine('you shall not match');

  expect(wrapper).toHaveState('completedSteps', []);
  expect(wrapper).toHaveState('currentStep', tutorial.firstStep);
});
