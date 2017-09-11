// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { Button } from 'reactstrap';

import TooltipTrigger from './TooltipTrigger';
import Icon from './Icon';

type PropTypes = {
  onSelectTutorial: () => void,
};

const TutorialCardOverlay = ({ onSelectTutorial }: PropTypes) => (
  <div className="flight-cardOverlay">
    <Button
      color="link"
      onClick={onSelectTutorial}
    >
      <TooltipTrigger tooltip="Start tutorial" >
        <Icon name="search-plus" size="2x" />
      </TooltipTrigger>
    </Button>
  </div>
);

export default TutorialCardOverlay;
