// @flow

export type MatchType = {
  inputLine: string,
  regexp: boolean,
  nextStep: ?string,
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
