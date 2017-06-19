/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react'
import { render } from 'react-dom'

import ReactTerminal from './ReactTerminal';

const onInputLineSpy = jest.fn();

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(<ReactTerminal onInputLine={onInputLineSpy} />, node);
});
