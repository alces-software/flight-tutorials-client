// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
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
  TutorialContainer,
  TutorialLayout,
  TutorialSelection,
  loadTutorials,
} from '../../src';

let socketIOUrl;
let socketIOPath;
let tutorials = [];

loadTutorials().then((ts) => {
  tutorials = ts;
  handleTutorialSelection(selectedTutorial);
});

let selectedTutorial = undefined;
function handleTutorialSelection(idx) {
  selectedTutorial = idx;
  if (selectedTutorial == null) {
    unmountTutorialContainer();
    renderTutorialSelection();
  } else {
    unmountTutorialSelection();
    renderTutorialContainer();
  }
}

function renderTutorialSelection() {
  ReactDOM.render(
    <TutorialSelection
      tutorials={tutorials}
      onSelectTutorial={handleTutorialSelection}
    />,
    document.querySelector('#tutorialSelection')
  )
}

function renderTutorialContainer() {
  if (selectedTutorial == null) {
    throw new Error('Must select a tutorial first');
  }
  const tutorial = tutorials[selectedTutorial];
  ReactDOM.render((
    <TutorialContainer tutorial={tutorial}>
      {({
        completedSteps,
        currentStep,
        expandStep,
        expandedStep,
        onInputLine,
        onSkipCurrentStep,
      }) => (
        <SocketContainer
          socketIOUrl={socketIOUrl}
          socketIOPath={socketIOPath}
        >
          {({
            onCloseSocketError,
            socket,
            socketError,
          }) => (
            <TerminalContainer onInputLine={onInputLine} socket={socket}>
              {({
                getSessionHistory,
                onSessionRestartAccepted,
                onSessionRestartRequestClosed,
                onShowSessionHistory,
                requestSessionRestart,
                showSessionHistory,
                terminal,
              }) => (
                <div>
                  <TutorialLayout
                    completedSteps={completedSteps}
                    currentStep={currentStep}
                    expandStep={expandStep}
                    expandedStep={expandedStep}
                    onShowAllTutorials={() => handleTutorialSelection(undefined)}
                    onSkipCurrentStep={onSkipCurrentStep}
                    tutorial={tutorial}
                  >
                    <TerminalLayout
                      getSessionHistory={getSessionHistory}
                      onCloseSocketError={onCloseSocketError}
                      onSessionRestartAccepted={onSessionRestartAccepted}
                      onSessionRestartRequestClosed={onSessionRestartRequestClosed}
                      onShowSessionHistory={onShowSessionHistory}
                      requestSessionRestart={requestSessionRestart}
                      socketError={socketError}
                      showSessionHistory={showSessionHistory}
                    >
                      {terminal}
                    </TerminalLayout>
                  </TutorialLayout>
                </div>
              )}
            </TerminalContainer>
          )}
        </SocketContainer>
      )}
    </TutorialContainer>),
    document.querySelector('#tutorialSelection')
  )
}

function unmountTutorialSelection() {
  ReactDOM.unmountComponentAtNode(document.querySelector('#tutorialSelection'));
}

function unmountTutorialContainer() {
  ReactDOM.unmountComponentAtNode(document.querySelector('#tutorialContainer'));
}

type RenderParams = {
  socketIOPath : string,
  socketIOUrl : string,
};

export const render = (props: RenderParams) => {
  socketIOPath = props.socketIOPath;
  socketIOUrl = props.socketIOUrl;
  handleTutorialSelection(selectedTutorial);
};

export const unmount = () => {
  selectedTutorial = undefined;
  unmountTutorialSelection();
  unmountTutorialContainer();
};

export const createRequiredDomNodes = () => {
  // Create some DOM nodes to mount our react components into.  In a real
  // application, we'd probably have these included in served the HTML, or
  // created through some HTML templating library.
  const demo = document.querySelector('#demo');
  if (demo == null) {
    throw new Error('Cannot find #demo');
  }

  const ex2 = document.createElement('div');
  ex2.id = 'example2';

  const tutorialSelectionNode = document.createElement('div');
  tutorialSelectionNode.id = 'tutorialSelection';
  ex2.appendChild(tutorialSelectionNode);

  const tutorialContainerNode = document.createElement('div');
  tutorialContainerNode.id = 'tutorialContainer';
  ex2.appendChild(tutorialContainerNode);

  if (document.body) {
    document.body.style.paddingTop = "0";
  }

  demo.appendChild(ex2);
};
