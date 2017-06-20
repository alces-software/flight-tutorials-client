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

function getAnchorage(anchorage) {
  if (anchorage === true) {
    return { start: true, end: true };
  } else if (anchorage === false) {
    return { start: false, end: false };
  } else {
    return anchorage
  }
}

function findMatch(matches: Array<MatchType>, line: string) : ?MatchType {
  debug('Finding match for line %s', line);
  for (let i=0; i < matches.length; i++) {
    const match = matches[i];
    debug('Processing match %O', match);
    let processedInputLine;
    if (match.regexp) {
      processedInputLine = match.inputLine;
    } else {
      processedInputLine = escapeRegExp(match.inputLine);
    }
    const anchorage = getAnchorage(match.anchored);
    if (anchorage.start) {
      processedInputLine = `\\$[ \t]*${processedInputLine}`;
    }
    if (anchorage.end) {
      processedInputLine = `${processedInputLine}[ \t]*$`;
    }
    const re = new RegExp(processedInputLine);
    debug('Checking line against regexp %s', re);

    if (line.match(re)) {
      debug('Line matched');
      return match;
    }
  };
  debug('No match found');
  return undefined;
}

export default findMatch;
