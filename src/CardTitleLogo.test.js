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
import { shallow } from 'enzyme';

import CardTitleLogo from './CardTitleLogo';

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(<CardTitleLogo logoUrl="http://localhost/my/logo.png" />, node);
});

it('renders correctly', () => {
  const tree = renderer.create(
    <CardTitleLogo logoUrl="http://localhost/my/logo.png" />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly if not given a logoUrl', () => {
  const tree = renderer.create(
    <CardTitleLogo />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('hides the logo initially', () => {
  const wrapper = shallow(
    <CardTitleLogo logoUrl="http://localhost/my/logo.png" />,
  );

  expect(wrapper).toHaveStyle('display', 'none');
});

it('shows the logo once it has loaded', () => {
  const wrapper = shallow(
    <CardTitleLogo logoUrl="http://localhost/my/logo.png" />,
  );

  wrapper.prop('onLoad')();

  expect(wrapper).toHaveStyle('display', 'initial');
});
