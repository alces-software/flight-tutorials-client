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

import Card from './Card';

function renderCard(props) {
  return (
    <Card
      onClick={() => {}}
      subtitle="Card 1 subtitle"
      subtitleSize="medium"
      title="Card 1"
      titleLogoOnRight
      titleSize="large"
      {...props}
    >
      Card 1 description.
    </Card>
  );
};

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(renderCard(), node);
});

it('renders correctly without footer', () => {
  const tree = renderer.create(
    renderCard()
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
it('renders correctly with footer', () => {
  const tree = renderer.create(
    renderCard({ footer: <div>My footer</div> })
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
