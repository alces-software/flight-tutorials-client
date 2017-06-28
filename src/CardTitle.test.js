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

import CardTitle from './CardTitle';

it('renders without crashing', () => {
  const node = document.createElement('div');
  render(<CardTitle title="My title" />, node);
});

const variants = {
  'default sized' : {
    title: 'My title',
    subtitle: 'My subtitle',
  },
  'large title and subtitle' : {
    title: 'My title',
    subtitle: 'My subtitle',
    titleSize: 'large',
    subtitleSize: 'large',
  },
  'x-large title and subtitle' : {
    title: 'My title',
    subtitle: 'My subtitle',
    titleSize: 'x-large',
    subtitleSize: 'x-large',
  },
  'medium title and subtitle' : {
    title: 'My title',
    subtitle: 'My subtitle',
    titleSize: 'medium',
    subtitleSize: 'medium',
  },
  'differing title and subtitle sizes' : {
    title: 'My title',
    subtitle: 'My subtitle',
    titleSize: 'x-large',
    subtitleSize: 'medium',
  },
  'with title popover text': {
    title: 'My title',
    subtitle: 'My subtitle',
    titlePopoverText: 'My title popover',
  },
  'with logo url': {
    title: 'My title',
    subtitle: 'My subtitle',
    logoUrl: 'http://localhost/my/logo.png',
  }
};

Object.keys(variants).forEach((name) => {
  it(`renders correctly: ${name}`, () => {
    const props = variants[name];
    const tree = renderer.create(
      <CardTitle {...props} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('title attribute', () => {
  it('sets a title attribute when title prop is a string', () => {
    const wrapper = shallow(
      <CardTitle title="My title" subtitle="Subtitle" />
    );

    expect(wrapper.find('.card-title')).toHaveProp('title', 'My title');
  });

  it('does not set a title attribute when title prop is a react node', () => {
    // This behaviour prevents the title being set to `[Object object]`.
    // Ideally, we'd extract the text from the title prop.
    const wrapper = shallow(
      <CardTitle title={<span>My title</span>} subtitle="Subtitle" />
    );

    expect(wrapper.find('.card-title')).not.toHaveProp('title', 'My title');
  });
});

it('does not crash when given an invalid titleSize', () => {
  const node = document.createElement('div');
  render(
    // Ignore flow error so that we can test that CardTitle will be robust
    // even if the tutorials contain bad data.
    // $FlowFixMe
    <CardTitle title="My title" subtitle="Subtitle" titleSize="not_valid" />,
    node
  );
});

it('does not crash when given an invalid subtitleSize', () => {
  const node = document.createElement('div');
  render(
    // Ignore flow error so that we can test that CardTitle will be robust
    // even if the tutorials contain bad data.
    // $FlowFixMe
    <CardTitle title="My title" subtitle="Subtitle" subtitleSize="not_valid" />,
    node
  );
});
