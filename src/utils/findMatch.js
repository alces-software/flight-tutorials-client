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
    let processedInputLine;
    if (match.regexp) {
      processedInputLine = match.inputLine;
    } else {
      processedInputLine = escapeRegExp(match.inputLine);
    }
    if (match.anchored) {
      processedInputLine = `\\$[ \t]*${processedInputLine}[ \t]*$`;
    }
    const re = new RegExp(processedInputLine);
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
