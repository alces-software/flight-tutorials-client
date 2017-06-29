// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import { Button } from 'react-bootstrap';

import './styles/CloseButton.scss';

type PropsType = {
  onClose: () => void,
};

const CloseButton = ({ onClose }: PropsType) => (
  <Button className="flight-CloseButton" bsStyle="link" onClick={onClose} >
    <div className="lr">
      <div className="rl" />
    </div>
  </Button>
);

export default CloseButton;
