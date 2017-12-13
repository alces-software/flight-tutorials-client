// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import 'url-search-params-polyfill';

import loadTutorials, { getTutorialsUrl } from './loadTutorials';

describe('getTutorialsUrl', () => {
  function setWindowLocationSearch(search) {
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: search,
    });
  }

  it('returns the default tutorials url by default', () => {
    const url = getTutorialsUrl();

    expect(url).toEqual(
      'https://s3-eu-west-1.amazonaws.com/alces-flight/FlightTutorials/tutorials/default.json',
    );
  });

  it('returns the default tutorials url when tutorials is null', () => {
    setWindowLocationSearch('?tutorials');
    const url = getTutorialsUrl();

    expect(url).toEqual(
      'https://s3-eu-west-1.amazonaws.com/alces-flight/FlightTutorials/tutorials/default.json',
    );
  });

  it('returns the default tutorials url when tutorials is empty', () => {
    setWindowLocationSearch('?tutorials=');
    const url = getTutorialsUrl();

    expect(url).toEqual(
      'https://s3-eu-west-1.amazonaws.com/alces-flight/FlightTutorials/tutorials/default.json',
    );
  });

  xit('allows specifying the tutorials via window.location.search', () => {
    setWindowLocationSearch('?tutorials=custom');
    const url = getTutorialsUrl();

    // expect(searchSpy).toHaveBeenCalled();
    expect(url).toEqual(
      'https://s3-eu-west-1.amazonaws.com/alces-flight/FlightTutorials/tutorials/custom.json',
    );
  });
});

describe('loadTutorials', () => {
  const tutorial = {
    title: 'Tutorial 1',
    description: 'Tutorial 1 description.\n\nWith *markdown* **support**.',
    firstStep: 'step1',
    steps: {
      step1: {
        title: 'Tutorial 1 step 1',
        description: 'Tutorial 1 step 1 description',
        matches: [],
      },
    },
  };

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('resolves with the tutorials', () => {
    fetch.mockResponse(
      JSON.stringify({ tutorials: [tutorial] }),
      { status: 200, statusText: 'OK' },
    );

    const promise = loadTutorials();

    return expect(promise).resolves.toEqual([tutorial]);
  });

  it('rejects if the tutorials cannot be loaded', () => {
    fetch.mockResponse(
      'Not Found',
      { status: 404, statusText: 'Not Found' },
    );

    const promise = loadTutorials();

    return expect(promise).rejects.toEqual(undefined);
  });
});
