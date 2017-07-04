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
  const tutorialsUrl = params.get('tutorials');
  if (tutorialsUrl != null && tutorialsUrl !== '') {
    return tutorialsUrl;
  }
  return 'default';
}

export function getTutorialsUrl() {
  const path = getTutorialsPath();
  const urlPrefix = 'https://s3-eu-west-1.amazonaws.com/alces-flight/FlightTutorials/tutorials/';
  return `${urlPrefix}${path}.json`;
}

type TutorialsPromise = Promise<Array<TutorialType>>;
export default function loadTutorials(url:string=getTutorialsUrl()) : TutorialsPromise {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json().then(j => j.tutorials);
      } else {
        return Promise.reject();
      }
    })
    .catch((error) => {
      debug('Error loading tutorials %O', error);
      return Promise.reject(error);
    });
}
