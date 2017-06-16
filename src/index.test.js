/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Compute Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Component from './'

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('renders without crashing', () => {
    render(<Component/>, node);
  });

  it('displays a welcome message', () => {
    render(<Component/>, node, () => {
      expect(node.innerHTML).toContain('Welcome to React components')
    })
  })
})
