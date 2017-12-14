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
import FontAwesome from 'react-fontawesome';
import { CardOverlay as ReactwareCardOverlay, TooltipTrigger } from 'flight-reactware';

export { ReactwareCardOverlay };

type PropTypes = {
  onSelectTutorial: () => void,
};

const TutorialCardOverlay = ({ onSelectTutorial }: PropTypes) => (
  <ReactwareCardOverlay>
    <Button
      color="link"
      onClick={onSelectTutorial}
    >
      <TooltipTrigger tooltip="Start tutorial" >
        <FontAwesome
          name="search-plus"
          size="2x"
        />
      </TooltipTrigger>
    </Button>
  </ReactwareCardOverlay>
);

export default TutorialCardOverlay;
