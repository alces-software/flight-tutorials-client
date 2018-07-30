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
import { SizeMe } from 'react-sizeme';

import { ContextLink, StandardModal } from 'flight-reactware';
import ShowSessionHistoryButton from './ShowSessionHistoryButton';
import SessionHistoryModal from './SessionHistoryModal';

const CommunitySiteLink = () => (
  <ContextLink
    link={ContextLink.makeLink('Community', '/')}
    site={process.env.REACT_APP_SITE || ''}
  >
    Community Support Portal
  </ContextLink>
);

type PropsType = {
  children : React$Element<*>,  // A ReactTerminal element.
  getSessionHistory?: () => string,
  noSizeMePlaceholder?: boolean,
  onCloseSocketError: () => void,
  onSessionRestartAccepted: () => void,
  onSessionRestartRequestClosed: () => void,
  onShowSessionHistory?: () => void,
  requestSessionRestart: boolean,
  socketError: boolean,
  showSessionHistory?: boolean,
  terminalHeight?: string,
  sessionHistoryHeight?: string,
}

const TerminalLayout = ({
  children,
  getSessionHistory,
  noSizeMePlaceholder,
  onCloseSocketError,
  onSessionRestartAccepted,
  onSessionRestartRequestClosed,
  onShowSessionHistory,
  requestSessionRestart,
  socketError,
  showSessionHistory,
  terminalHeight = '100vh',
  sessionHistoryHeight = '600px',
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
    <StandardModal
      isOpen={socketError}
      size="lg"
      title="Unable to connect terminal session"
      toggle={onCloseSocketError}
    >
      Unfortunately, there was an unexpected error when attempting to connect
      the terminal.  You might try refreshing the page, or you could visit
      our{' '} <CommunitySiteLink /> {' '}for further help.
    </StandardModal>
    {
      getSessionHistory == null || onShowSessionHistory == null || showSessionHistory == null ?
        null :
        (
          <SessionHistoryModal
            getSessionHistory={getSessionHistory}
            onShowSessionHistory={onShowSessionHistory}
            showSessionHistory={showSessionHistory}
            sessionHistoryHeight={sessionHistoryHeight}
          />
        )
    }
    <SizeMe
      monitorHeight
      noPlaceholder={noSizeMePlaceholder}
      refreshRate={100}
      refreshMode="debounce"
    >
      {({ size }) => (
        <div style={{ height: terminalHeight }}>
          {React.cloneElement(children, { size })}
        </div>
      )}
    </SizeMe>
    {
      getSessionHistory == null || onShowSessionHistory == null ?
        null :
        <ShowSessionHistoryButton onShowSessionHistory={onShowSessionHistory} />
    }
  </div>
);

export default TerminalLayout;
