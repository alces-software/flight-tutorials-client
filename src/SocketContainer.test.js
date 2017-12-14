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
import io from 'socket.io-client';

import Component from './SocketContainer';

function afterComponentHasMounted(done, callback) {
  // Call in a setTimeout so that the component has time to mount.  A timeout
  // of 0 will be sufficient.
  setTimeout(() => {
    try {
      callback();
      done();
    } catch (error) {
      done.fail(error);
    }
  }, 0);
}

const socketIOUrl = 'http://localhost:25288/pty';
const socketIOPath = '/terminal/socket.io';

const renderComponent = (children) => {
  if (children == null) {
    // eslint-disable-next-line no-param-reassign
    children = jest.fn().mockReturnValue(<div />);
  }
  return (
    <Component
      socketIOUrl={socketIOUrl}
      socketIOPath={socketIOPath}
    >
      {children}
    </Component>
  );
};

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

  afterComponentHasMounted(done, () => {
    wrapper.unmount();

    expect(spy).toHaveBeenCalled();
  });
});

xit('calls child function with expected arguments', () => {
  const childFunctionSpy = jest.fn().mockReturnValue(<div />);
  shallow(renderComponent(childFunctionSpy));
  const Socket = io(socketIOUrl, { path: socketIOPath }).constructor;

  expect(childFunctionSpy).toHaveBeenCalledWith({
    socket: expect.any(Socket),
  });
});
