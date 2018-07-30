// @flow
/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { render } from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { StandardModal } from 'flight-reactware';
import SessionHistoryModal from './SessionHistoryModal';

const getSessionHistory = () => 'The terminal output';

const renderSessionHistoryModal = ({ showSessionHistory } = {}) => (
  <SessionHistoryModal
    getSessionHistory={getSessionHistory}
    onShowSessionHistory={() => {}}
    showSessionHistory={showSessionHistory}
  />
);


it('renders without crashing', () => {
  const node = document.createElement('div');
  render(renderSessionHistoryModal(), node);
});

it('renders correctly', () => {
  const tree = renderer.create(
    renderSessionHistoryModal(),
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('includes a modal', () => {
  const wrapper = shallow(renderSessionHistoryModal());

  expect(wrapper.find(StandardModal)).toBePresent();
});

it('includes the terminal ouput', () => {
  const wrapper = shallow(renderSessionHistoryModal());
  const pre = wrapper.find('pre');

  expect(pre).toHaveProp('dangerouslySetInnerHTML', { __html: getSessionHistory() });
});
