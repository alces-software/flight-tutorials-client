/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Compute Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';

const TutorialSelection = ({
  onSelectTutorial,
  tutorials,
}) => {
  const options = tutorials.map((t, idx) => <TutorialOption
    key={idx}
    tutorial={t}
    onSelectTutorial={() => onSelectTutorial(idx)}
  />);

  return (
    <div>
      <p>Which tutorial do you wish to undertake?</p>
      {options}
    </div>
  );
};

const TutorialOption = ({
  onSelectTutorial,
  tutorial,
}) => {
  return (
    <div>
      <h3>{tutorial.title}</h3>
      <div dangerouslySetInnerHTML={{__html: tutorial.description}} />
      <button onClick={onSelectTutorial}>
        Select
      </button>
    </div>
  );
};

export default TutorialSelection;
