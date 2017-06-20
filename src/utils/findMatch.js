// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import mkDebug from 'debug';

import escapeRegExp from './escapeRegExp';
import type { MatchType } from '../types';

const debug = mkDebug('FlightTutorials:findMatch');

function findMatch(matches: Array<MatchType>, line: string) : ?MatchType {
  for (let i=0; i < matches.length; i++) {
    const match = matches[i];
    var re;
    if (match.regexp) {
      re = new RegExp(match.inputLine);
    } else {
      re = new RegExp(escapeRegExp(match.inputLine));
    }
    debug('Checking line against %s', re);

    if (line.match(re)) {
      debug('Line matched');
      return match;
    }
  };
  debug('No match found');
  return undefined;
}

export default findMatch;
