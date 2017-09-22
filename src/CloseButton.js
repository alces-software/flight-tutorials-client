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
import styled from 'styled-components';

const Btn = styled(Button)`
  position: absolute;
  width: 75px;
  height: 75px;
  background-color: transparent;
  top: 25px;
  right: 25px;
  cursor: pointer;
  outline: none !important;
`;

const Lr = styled.div`
  height: 75px;
  width: 1px;
  margin-left: 35px;
  background-color: #2C3E50;
  transform: rotate(45deg);
  z-index: 1051;
`;

const Rl = styled.div`
  height: 75px;
  width: 1px;
  background-color: #2C3E50;
  transform: rotate(90deg);
  z-index: 1052;
`;

type PropsType = {
  onClose: () => void,
};

const CloseButton = ({ onClose }: PropsType) => (
  <Btn color="link" onClick={onClose} >
    <Lr>
      <Rl />
    </Lr>
  </Btn>
);

export default CloseButton;
