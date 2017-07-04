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

function afterTutorialsLoaded(callback) {
  // Call in a setTimeout so that the loadTutorials promise can complete.  As
  // we've mocked `fetch`, a 0 timeout will be sufficient.
  setTimeout(callback, 0);
}

const renderComponent = () => (
  <Component
    socketIOUrl="http://localhost:3001/pty"
    socketIOPath="/tutorial/socket.io"
  />
);

beforeEach(() => {
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

  fetch.resetMocks();
  fetch.mockResponse(
    JSON.stringify({ tutorials: [tutorial] }),
    { status: 200, statusText: 'OK' },
  );
});

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(renderComponent(), node);
});

it('disconnects the socket when unmounted', (done) => {
  const wrapper = shallow(renderComponent());
  const instance = wrapper.instance();
  // The flow type definition for `wrapper.instance()` returns a generic
  // React$Component type, not the specific TutorialContainer type.  When that
  // is fixed, we can remove this. See
  // https://github.com/flowtype/flow-typed/issues/925
  // $FlowFixMe
  const spy = jest.spyOn(instance.socket, 'disconnect');

  afterTutorialsLoaded(() => {
    wrapper.unmount();

    expect(spy).toHaveBeenCalled();
    done();
  });
});

it('displays tutorial container when tutorial is selected', (done) => {
  const wrapper = shallow(renderComponent());
  const instance = wrapper.instance();

  afterTutorialsLoaded(() => {
    // The flow type definition for `wrapper.instance()` returns a generic
    // React$Component type, not the specific TutorialContainer type.  When that
    // is fixed, we can remove this. See
    // https://github.com/flowtype/flow-typed/issues/925
    // $FlowFixMe
    instance.handleTutorialSelection(0);

    expect(wrapper.find('TutorialSelection')).not.toBePresent();
    expect(wrapper.find('TutorialContainer')).toBePresent();

    done();
  });
});

it('displays tutorial selection when no tutorial is selected', (done) => {
  const wrapper = shallow(renderComponent());
  const instance = wrapper.instance();

  afterTutorialsLoaded(() => {
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

    done();
  });
});
