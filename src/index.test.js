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
import { shallow } from 'enzyme';

import Component from './';
import TutorialLoadErrorMessage from './TutorialLoadErrorMessage';
import TutorialLoadingMessage from './TutorialLoadingMessage';

function afterTutorialsLoaded(done, callback) {
  // Call in a setTimeout so that the loadTutorials promise can complete.  As
  // we've mocked `fetch`, a 0 timeout will be sufficient.
  setTimeout(() => {
    try {
      callback();
      done();
    } catch (error) {
      done.fail(error);
    }
  }, 0);
}

const renderComponent = () => (
  <Component
    socketIOUrl="http://localhost:25288/pty"
    socketIOPath="/tutorial/socket.io"
  />
);

beforeEach(() => {
  fetch.resetMocks();
});

function mockSuccessfulResponse() {
  const tutorial = {
    title: 'Tutorial 1',
    description: 'Tutorial 1 description.\n\nWith *markdown* **support**.',
    firstStep: 'step1',
    steps: {
      step1: {
        title: 'Tutorial 1 step 1',
        description: 'Tutorial 1 step 1 description',
        matches: [],
      },
    },
  };

  fetch.mockResponse(
    JSON.stringify({ tutorials: [tutorial] }),
    { status: 200, statusText: 'OK' },
  );
}

function mockFailedResponse() {
  fetch.mockResponse(
    'Not found',
    { status: 404, statusText: 'Not Found' },
  );
}

it('renders without crashing', () => {
  mockSuccessfulResponse();
  const node = document.createElement('div');
  render(renderComponent(), node);
});

it('disconnects the socket when unmounted', (done) => {
  mockSuccessfulResponse();
  const wrapper = shallow(renderComponent());
  const instance = wrapper.instance();
  // The flow type definition for `wrapper.instance()` returns a generic
  // React$Component type, not the specific TutorialContainer type.  When that
  // is fixed, we can remove this. See
  // https://github.com/flowtype/flow-typed/issues/925
  // $FlowFixMe
  const spy = jest.spyOn(instance.socket, 'disconnect');

  afterTutorialsLoaded(done, () => {
    wrapper.unmount();

    expect(spy).toHaveBeenCalled();
  });
});

it('displays a loading message whilst the tutorials are being loaded', () => {
  mockSuccessfulResponse();
  const wrapper = shallow(renderComponent());

  expect(wrapper).toContainReact(<TutorialLoadingMessage />);
});

it('displays tutorial container when tutorial is selected', (done) => {
  mockSuccessfulResponse();
  const wrapper = shallow(renderComponent());
  const instance = wrapper.instance();

  afterTutorialsLoaded(done, () => {
    // The flow type definition for `wrapper.instance()` returns a generic
    // React$Component type, not the specific TutorialContainer type.  When that
    // is fixed, we can remove this. See
    // https://github.com/flowtype/flow-typed/issues/925
    // $FlowFixMe
    instance.handleTutorialSelection(0);

    expect(wrapper.find('TutorialSelection')).not.toBePresent();
    expect(wrapper.find('TutorialContainer')).toBePresent();
  });
});

it('displays tutorial selection when no tutorial is selected', (done) => {
  mockSuccessfulResponse();
  const wrapper = shallow(renderComponent());
  const instance = wrapper.instance();

  afterTutorialsLoaded(done, () => {
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
});

it('displays an error message if the tutorials cannot be loaded', (done) => {
  mockFailedResponse();
  const wrapper = shallow(renderComponent());

  afterTutorialsLoaded(done, () => {
    expect(wrapper).toContainReact(<TutorialLoadErrorMessage />);
  });
});
