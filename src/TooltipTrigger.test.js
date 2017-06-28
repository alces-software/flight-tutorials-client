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

import TooltipTrigger from './TooltipTrigger';

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(<TooltipTrigger>My children</TooltipTrigger>, node);
});

const variants = {
  'with tooltip': {
    children: <div>My children</div>,
    tooltip: 'My tooltip',
  },
  'with empty tooltip': {
    children: <div>My children</div>,
    tooltip: '',
  },
  'without tooltip': {
    children: <div>My children</div>,
  },
  'with className': {
    children: <div>My children</div>,
    className: 'myClass',
  },
  'without className': {
    children: <div>My children</div>,
  },
};

Object.keys(variants).forEach((name) => {
  it(`renders correctly ${name}`, () => {
    const props = variants[name];
    const tree = renderer.create(
      <TooltipTrigger {...props} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
