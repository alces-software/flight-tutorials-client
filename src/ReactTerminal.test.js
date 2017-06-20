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
import io from 'socket.io-client';

import ReactTerminal from './ReactTerminal';

const onInputLineSpy = jest.fn();

it('renders without crashing', () => {
  const node = document.createElement('div');
  const socket = io('http://localhost:3001/pty', { path: '/tutorial/socket.io' });
  render(<ReactTerminal onInputLine={onInputLineSpy} socket={socket} />, node);
});
