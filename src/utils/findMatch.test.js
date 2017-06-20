/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import findMatch from './findMatch';

const matches = [{
  inputLine: '$ echo "step1 completed"',
  regexp: false,
  nextStep: 'step2',
},{
  inputLine: '$ echo "step1 skipped"',
  regexp: false,
  nextStep: 'step2',
},{
  inputLine: '\\$ *echo *["\']step1 regexed["\']',
  regexp: true,
  nextStep: 'step2',
}];


it('finds the correct match 1', () => {
  const foundMatch = findMatch(matches, '$ echo "step1 completed"');

  expect(foundMatch).toBe(matches[0]);
});

it('finds the correct match 2', () => {
  const foundMatch = findMatch(matches, '$ echo "step1 skipped"');

  expect(foundMatch).toBe(matches[1]);
});

[
  '$ echo "step1 regexed"',
  '$   echo   "step1 regexed"',
  "$   echo   'step1 regexed'",
].forEach(s => {
  it(`supports regexes (${s})`, () => {
    const foundMatch = findMatch(matches, s);

    expect(foundMatch).toBe(matches[2]);
  });
});

it('returns undefined if no match is found', () => {
  const foundMatch = findMatch(matches, 'You shall not match');

  expect(foundMatch).toBe(undefined);
});
