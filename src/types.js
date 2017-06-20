// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

export type MatchType = {
  inputLine: string,
  anchored: boolean | { start: boolean, end: boolean },
  regexp: boolean,
  nextStep?: string,
};

export type StepType = {
  title: string,
  description: string,
  matches: Array<MatchType>,
};

export type StepMap = {
  [string]: StepType,
};

export type TutorialType = {
  title: string,
  description: string,
  firstStep: string,
  steps: StepMap,
};
