// @flow
/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import ReactDOM from 'react-dom';

import {
  SocketContainer,
  TerminalContainer,
  TerminalLayout,
} from '../../src';

let socketIOUrl;
let socketIOPath;

// For this demo, these need to be set to valid values here.
const siteId = 1;
const jwt = "";

const env = {
  LANG: 'en_GB.UTF-8',
};

function renderTerminal() {
  ReactDOM.render((
    <SocketContainer
      socketIOUrl={socketIOUrl}
      socketIOPath={socketIOPath}
      auth={{
        jwt: jwt,
        siteId: siteId,
      }}
    >
      {({
        onCloseSocketError,
        socket,
        socketError,
      }) => (
        <TerminalContainer
          columns={120}
          env={env}
          rows={30}
          socket={socket}
        >
          {({
            getTerminalOutput,
            onSessionRestartAccepted,
            onSessionRestartRequestClosed,
            onShowTerminalOutput,
            requestSessionRestart,
            showTerminalOutput,
            terminal,
          }) => (
            <TerminalLayout
              getTerminalOutput={getTerminalOutput}
              onCloseSocketError={onCloseSocketError}
              onSessionRestartAccepted={onSessionRestartAccepted}
              onSessionRestartRequestClosed={onSessionRestartRequestClosed}
              onShowTerminalOutput={onShowTerminalOutput}
              requestSessionRestart={requestSessionRestart}
              socketError={socketError}
              showTerminalOutput={showTerminalOutput}
              terminalHeight="calc( 100vh - 64px - 6em )"
            >
              {terminal}
            </TerminalLayout>
          )}
        </TerminalContainer>
      )}
    </SocketContainer>
  ),
    document.querySelector('#tutorial')
  )
}

function unmountTerminal() {
  ReactDOM.unmountComponentAtNode(document.querySelector('#tutorial'));
}

type RenderParams = {
  socketIOPath : string,
  socketIOUrl : string,
};

export const render = (props: RenderParams) => {
  socketIOPath = props.socketIOPath;
  socketIOUrl = props.socketIOUrl;
  renderTerminal();
};

export const unmount = () => {
  unmountTerminal();
};

export const createRequiredDomNodes = () => {
  // Create some DOM nodes to mount our react components into.  In a real
  // application, we'd probably have these included in served the HTML, or
  // created through some HTML templating library.
  const demo = document.querySelector('#demo');
  if (demo == null) {
    throw new Error('Cannot find #demo');
  }

  const ex3 = document.createElement('div');
  ex3.id = 'example3';
  ex3.style.padding = '2em';

  const tutorialNode = document.createElement('div');
  tutorialNode.id = 'tutorial';
  ex3.appendChild(tutorialNode);

  if (document.body) {
    document.body.style.paddingTop = "0";
  }

  demo.appendChild(ex3);
};
