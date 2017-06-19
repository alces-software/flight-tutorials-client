// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Compute Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

export type MatchType = {
  inputLine: string,
  regexp: boolean,
  nextStep?: string,
};

export type StepType = {
  title: string,
  description: string,
  matches: Array<MatchType>,
};

export type TutorialType = {
  title: string,
  description: string,
  firstStep: string,
  steps: { [string]: StepType },
};