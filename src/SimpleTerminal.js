import React from 'react';
import PropTypes from 'prop-types';

import SocketContainer from './SocketContainer';
import TerminalContainer from './TerminalContainer';
import TerminalLayout from './TerminalLayout';

const propTypes = {
  auth: PropTypes.object,
  columns: PropTypes.number,
  env: PropTypes.object,
  rows: PropTypes.number,
  socketIOPath: PropTypes.string.isRequired,
  socketIOUrl: PropTypes.string.isRequired,

  // A valid CSS specification of the terminal's height.  We take a string to
  // include complicated calculations e.g.,
  //
  // `calc( 100vh - 100px - 3em )`.
  terminalHeight: PropTypes.string,
};

const SimpleTerminal = ({
  auth,
  columns,
  env,
  rows,
  socketIOPath,
  socketIOUrl,
  terminalHeight,
}) => (
  <SocketContainer
    auth={auth}
    socketIOPath={socketIOPath}
    socketIOUrl={socketIOUrl}
  >
    {({
      onCloseSocketError,
      socket,
      socketError,
    }) => (
      <TerminalContainer
        columns={columns}
        env={env}
        rows={rows}
        socket={socket}
      >
        {({
          getSessionHistory,
          onSessionRestartAccepted,
          onSessionRestartRequestClosed,
          onShowSessionHistory,
          requestSessionRestart,
          showSessionHistory,
          terminal,
        }) => (
          <TerminalLayout
            getSessionHistory={getSessionHistory}
            onCloseSocketError={onCloseSocketError}
            onSessionRestartAccepted={onSessionRestartAccepted}
            onSessionRestartRequestClosed={onSessionRestartRequestClosed}
            onShowSessionHistory={onShowSessionHistory}
            requestSessionRestart={requestSessionRestart}
            sessionHistoryHeight={terminalHeight}
            showSessionHistory={showSessionHistory}
            socketError={socketError}
            terminalHeight={terminalHeight}
          >
            {terminal}
          </TerminalLayout>
        )}
      </TerminalContainer>
    )}
  </SocketContainer>
);

SimpleTerminal.propTypes = propTypes;

export default SimpleTerminal;
