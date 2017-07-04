/* eslint-disable import/no-extraneous-dependencies */
import 'jest-enzyme';
import mockFetch from 'jest-fetch-mock';
/* eslint-enable import/no-extraneous-dependencies */

global.fetch = mockFetch;
