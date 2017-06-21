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
import io from 'socket.io-client';

import tutorials from '../../src/tutorials';
import TutorialContainer from '../../src/TutorialContainer';
import TutorialLayout from '../../src/TutorialLayout';
import TutorialSelection from '../../src/TutorialSelection';

const socket = io('http://localhost:3001/pty', { path: '/tutorial/socket.io' });

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
    <TutorialContainer
      tutorial={tutorial}
      socket={socket}
    >
      {({ completedSteps, currentStep, terminal }) => (
        <div>
          <button onClick={() => handleTutorialSelection(undefined)}>
            Return to list of tutorials
          </button>
          <TutorialLayout
            completedSteps={completedSteps}
            currentStep={currentStep}
            terminal={terminal}
            tutorial={tutorial}
          />
        </div>
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

export const render = () => {
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

  demo.appendChild(ex2);
};