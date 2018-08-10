// @flow
/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

import { HelpPopover } from 'flight-reactware';

const StyledHelpPopover = styled(HelpPopover)`
  vertical-align: middle;
  margin-left: 0.5em;
`;

const ShowSessionHistoryButton = ({
  onShowSessionHistory,
} : {
  onShowSessionHistory : () => void
}) => (
  <div style={{ marginTop: '36px' }}>
    <Button
      onClick={onShowSessionHistory}
      color="info"
    >
      <FontAwesome name="history" />
      {' '}Show session history
    </Button>
    <StyledHelpPopover
      content="Use this button to open a dialog that allows you to view lines
      that have scrolled off the top of the console window within this
      session"
    >
      What&apos;s this
    </StyledHelpPopover>
  </div>
);

export default ShowSessionHistoryButton;
