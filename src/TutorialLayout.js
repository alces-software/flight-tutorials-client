// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Compute Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React, {Component} from 'react';

import ReactTerminal from './ReactTerminal';
import TutorialInfo from './TutorialInfo';
import TutorialSteps from './TutorialSteps';

type PropsType = {
  onShowAllTutorials: () => void,
  showAllTutorialsButton: boolean,
  steps : React$Element<*>,  // A TutorialSteps element.
  terminal : React$Element<*>,  // A ReactTerminal element.
  tutorialInfo : React$Element<*>,  // A TutorialInfo element.
}

const TutorialLayout = ({
  onShowAllTutorials,
  showAllTutorialsButton,
  steps,
  terminal,
  tutorialInfo,
} : PropsType ) => (
  <div>
    {
      showAllTutorialsButton ?
        <button onClick={onShowAllTutorials}>
          View all tutorials
        </button> :
        null
    }
    {terminal}
    {tutorialInfo}
    {steps}
  </div>
);

export default TutorialLayout;
