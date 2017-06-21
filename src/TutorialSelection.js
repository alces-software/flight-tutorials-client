// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';

import type { TutorialType } from './types';
import TutorialCard from './TutorialCard';

const TutorialSelection = ({
  onSelectTutorial,
  tutorials,
}: {
  onSelectTutorial: (number) => void,
  tutorials: Array<TutorialType>
}) => {
  const cards = tutorials.map((t, idx) => (<TutorialCard
    key={idx} // eslint-disable-line react/no-array-index-key
    tutorial={t}
    onSelectTutorial={() => onSelectTutorial(idx)}
  />));

  return (
    <div>
      <p>Which tutorial do you wish to undertake?</p>
      <div className="card-deck">
        {cards}
      </div>
    </div>
  );
};

export default TutorialSelection;
