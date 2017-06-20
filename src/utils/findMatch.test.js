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
  anchored: false,
  regexp: false,
  nextStep: 'step2',
}, {
  inputLine: '$ echo "step1 skipped"',
  anchored: false,
  regexp: false,
  nextStep: 'step2',
}, {
  inputLine: '\\$ *echo *["\']step1 regexed["\']',
  anchored: false,
  regexp: true,
  nextStep: 'step2',
}, {
  inputLine: 'echo "step1 anchored"',
  anchored: true,
  regexp: false,
  nextStep: 'step2',
}, {
  inputLine: 'echo "step1 anchored start only"',
  anchored: {
    start: true,
    end: false,
  },
  regexp: false,
  nextStep: 'step2',
}, {
  inputLine: 'echo "step1 anchored end only"',
  anchored: {
    start: false,
    end: true,
  },
  regexp: false,
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
].forEach((s) => {
  it(`supports regexes (${s})`, () => {
    const foundMatch = findMatch(matches, s);

    expect(foundMatch).toBe(matches[2]);
  });
});

describe('when anchored', () => {
  describe('=== true', () => {
    const expectedMatch = matches[3];
    const matchingInput = 'echo "step1 anchored"';
    const extraInput = 'echo "extra stuff"';

    it('matches when the line directly follows the prompt', () => {
      const foundMatch = findMatch(matches, `$ \t${matchingInput}`);

      expect(foundMatch).toBe(expectedMatch);
    });

    it('does not match when the line does not directly follow the prompt', () => {
      const foundMatch = findMatch(matches, `$ ${extraInput}; ${matchingInput}`);

      expect(foundMatch).toBe(undefined);
    });

    it('matches when there is no trailing content', () => {
      const foundMatch = findMatch(matches, `$ ${matchingInput} \t`);

      expect(foundMatch).toBe(expectedMatch);
    });

    it('does not match when there is trailing content', () => {
      const foundMatch = findMatch(matches, `$ ${matchingInput}; ${extraInput}`);

      expect(foundMatch).toBe(undefined);
    });
  });

  describe('=== { start: true, end: false }', () => {
    const expectedMatch = matches[4];
    const matchingInput = 'echo "step1 anchored start only"';
    const extraInput = 'echo "extra stuff"';

    it('matches when the line directly follows the prompt', () => {
      const foundMatch = findMatch(matches, `$ \t${matchingInput}`);

      expect(foundMatch).toBe(expectedMatch);
    });

    it('does not match when the line does not directly follow the prompt', () => {
      const foundMatch = findMatch(matches, `$ ${extraInput}; ${matchingInput}`);

      expect(foundMatch).toBe(undefined);
    });

    it('matches when there is no trailing content', () => {
      const foundMatch = findMatch(matches, `$ ${matchingInput} \t`);

      expect(foundMatch).toBe(expectedMatch);
    });

    it('matches when there is trailing content', () => {
      const foundMatch = findMatch(matches, `$ ${matchingInput}; ${extraInput}`);

      expect(foundMatch).toBe(expectedMatch);
    });
  });

  describe('=== { start: false, end: true }', () => {
    const expectedMatch = matches[5];
    const matchingInput = 'echo "step1 anchored end only"';
    const extraInput = 'echo "extra stuff"';

    it('matches when the line directly follows the prompt', () => {
      const foundMatch = findMatch(matches, `$ \t${matchingInput}`);

      expect(foundMatch).toBe(expectedMatch);
    });

    it('matches when the line does not directly follow the prompt', () => {
      const foundMatch = findMatch(matches, `$ ${extraInput}; ${matchingInput}`);

      expect(foundMatch).toBe(expectedMatch);
    });

    it('matches when there is no trailing content', () => {
      const foundMatch = findMatch(matches, `$ ${matchingInput} \t`);

      expect(foundMatch).toBe(expectedMatch);
    });

    it('does not matches when there is trailing content', () => {
      const foundMatch = findMatch(matches, `$ ${matchingInput}; ${extraInput}`);

      expect(foundMatch).toBe(undefined);
    });
  });
});

it('returns undefined if no match is found', () => {
  const foundMatch = findMatch(matches, 'You shall not match');

  expect(foundMatch).toBe(undefined);
});
