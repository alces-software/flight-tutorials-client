// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import mkDebug from 'debug';

import type { TutorialType } from '../types';

const debug = mkDebug('FlightTutorials:loadTutorials');

function getTutorialsPath() {
  const params = new URLSearchParams(window.location.search);
  const path = params.get('tutorials');
  if (path != null && path !== '') {
    return path;
  }
  return 'default';
}

// XXX Perhaps, we should have the client determine if it wants to cache this
// value or not.
let tutorialsPath;
export function getTutorialsUrl() {
  if (tutorialsPath == null) {
    tutorialsPath = getTutorialsPath();
  }
  const urlPrefix = 'https://s3-eu-west-1.amazonaws.com/alces-flight/FlightTutorials/tutorials/';
  return `${urlPrefix}${tutorialsPath}.json`;
}

type TutorialsPromise = Promise<Array<TutorialType>>;
export default function loadTutorials(url:string=getTutorialsUrl()) : TutorialsPromise {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json().then(j => j.tutorials);
      }
      return Promise.reject();
    })
    .catch((error) => {
      debug('Error loading tutorials %O', error);
      return Promise.reject(error);
    });
}
