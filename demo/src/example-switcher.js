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

let title1;
let title2;
let title3;

function renderSelectedExample(example) {
  if (example === 'example1') {
    hideTitle(title2);
    hideTitle(title3);
    example2.unmount();
    example3.unmount();
    showTitle(title1);
    example1.render({
      socketIOPath: getSocketIOPath(),
      socketIOUrl: getSocketIOUrl()
    });
  } else if (example === 'example2') {
    hideTitle(title1);
    hideTitle(title3);
    example1.unmount();
    example3.unmount();
    showTitle(title2);
    example2.render({
      socketIOPath: getSocketIOPath(),
      socketIOUrl: getSocketIOUrl()
    });
  } else {
    hideTitle(title1);
    hideTitle(title2);
    example1.unmount();
    example2.unmount();
    showTitle(title3);
    example3.render({
      socketIOPath: getSocketIOPath(),
      socketIOUrl: getSocketIOUrl()
    });
  }
}

function addExampleSelection() {
  const demo = document.querySelector('#demo');
  if (demo == null) {
    throw new Error('Cannot find #demo');
  }

  const button1 = document.createElement('button');
  const button2 = document.createElement('button');
  const button3 = document.createElement('button');
  button1.innerHTML = 'Run example 1';
  button2.innerHTML = 'Run example 2';
  button3.innerHTML = 'Run example 3';
  button1.onclick = () => renderSelectedExample('example1');
  button2.onclick = () => renderSelectedExample('example2');
  button3.onclick = () => renderSelectedExample('example3');
  demo.appendChild(button1);
  demo.appendChild(button2);
  demo.appendChild(button3);
}

function addTitles() {
  const demo = document.querySelector('#demo');
  if (demo == null) {
    throw new Error('Cannot find #demo');
  }

  title1 = document.createElement('span');
  title1.style.display = 'none';
  title1.style.marginLeft = '5px';
  title1.style.fontWeight = 'bold';
  title1.innerHTML = 'Example 1';
  title2 = document.createElement('span');
  title2.style.display = 'none';
  title2.style.marginLeft = '5px';
  title2.style.fontWeight = 'bold';
  title2.innerHTML = 'Example 2';
  title3 = document.createElement('span');
  title3.style.display = 'none';
  title3.style.marginLeft = '5px';
  title3.style.fontWeight = 'bold';
  title3.innerHTML = 'Example 3';


  demo.appendChild(title1);
  demo.appendChild(title2);
  demo.appendChild(title3);
}

function showTitle(t) {
  t.style.display = 'inline-block';
}

function hideTitle(t) {
  t.style.display = 'none';
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
  example1.createRequiredDomNodes();
  example2.createRequiredDomNodes();
  example3.createRequiredDomNodes();
}
