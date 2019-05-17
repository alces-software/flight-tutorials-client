// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import * as example1 from './example1';
import * as example2 from './example2';
import * as example3 from './example3';

const examples = {
  example1: {title: 'Example 1', example: example1},
  example2: {title: 'Example 2', example: example2},
  example3: {title: 'Example 3', example: example3},
};

function renderSelectedExample(example_name_to_run) {
  Object.keys(examples).forEach((ex_name) => {
    if (ex_name !== example_name_to_run) {
      const ex = examples[ex_name];
      hideTitle(ex);
      ex.example.unmount();
    }
  });
  const example_to_run = examples[example_name_to_run];
  showTitle(example_to_run);
  example_to_run.example.render({
    socketIOPath: getSocketIOPath(),
    socketIOUrl: getSocketIOUrl()
  });
}

function addExampleSelection() {
  const demo = document.querySelector('#demo');
  if (demo == null) {
    throw new Error('Cannot find #demo');
  }

  Object.keys(examples).forEach((ex_name) => {
    const ex = examples[ex_name];
    const button = document.createElement('button');
    button.innerHTML = 'Run ' + ex.title;
    button.onclick = () => renderSelectedExample(ex_name);
    demo.appendChild(button);
  });
}

function addTitles() {
  const demo = document.querySelector('#demo');
  if (demo == null) {
    throw new Error('Cannot find #demo');
  }

  Object.keys(examples).forEach((ex_name) => {
    const ex = examples[ex_name];
    const title = document.createElement('span');
    title.style.display = 'none';
    title.style.marginLeft = '5px';
    title.style.fontWeight = 'bold';
    title.innerHTML = ex.title;
    ex.titleEl = title;
    demo.appendChild(title);
  });
}

function showTitle(example) {
  example.titleEl.style.display = 'inline-block';
}

function hideTitle(example) {
  example.titleEl.style.display = 'none';
}

function getSocketIOUrl() {
  const params = new URLSearchParams(window.location.search);
  const socketIOUrl = params.get('socketIOUrl');
  if (socketIOUrl != null && socketIOUrl !== '') {
    return socketIOUrl;
  }
  if (process.env.NODE_ENV === 'production') {
    return '/pty';
  } else {
    return 'http://localhost:25288/pty';
  }
}

function getSocketIOPath() {
  const params = new URLSearchParams(window.location.search);
  const socketIOPath = params.get('socketIOPath');
  if (socketIOPath != null && socketIOPath !== '') {
    return socketIOPath;
  }
  return '/tutorials/socket.io';
}


export const render = (props: {}) => {
};

export const createRequiredDomNodes = () => {
  addExampleSelection();
  addTitles();
  Object.keys(examples).forEach((ex_name) => {
    const ex = examples[ex_name];
    ex.example.createRequiredDomNodes();
  });
}
