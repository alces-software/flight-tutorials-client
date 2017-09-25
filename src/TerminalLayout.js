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

import { StandardModal } from 'flight-reactware';

type PropsType = {
  children : React$Element<*>,  // A ReactTerminal element.
  onSessionRestartAccepted: () => void,
  onSessionRestartRequestClosed: () => void,
  requestSessionRestart: boolean,
}

const TerminalLayout = ({
  children,
  onSessionRestartAccepted,
  onSessionRestartRequestClosed,
  requestSessionRestart,
} : PropsType) => (
  <div>
    <StandardModal
      buttons={
        <Button
          color="success"
          onClick={onSessionRestartAccepted}
        >
          Restart
        </Button>
      }
      isOpen={requestSessionRestart}
      title="Your terminal session has been terminated"
      toggle={onSessionRestartRequestClosed}
    >
      Your terminal session has been terminated. Would you like to
      restart it?
    </StandardModal>
    {children}
  </div>
);

export default TerminalLayout;
