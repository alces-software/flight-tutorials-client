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

let title1;
let title2;

function renderSelectedExample(example) {
  if (example === 'example1') {
    hideTitle(title2);
    example2.unmount();
    showTitle(title1);
    example1.render();
  } else {
    hideTitle(title1);
    example1.unmount();
    showTitle(title2);
    example2.render();
  }
}

function addExampleSelection() {
  const demo = document.querySelector('#demo');
  if (demo == null) {
    throw new Error('Cannot find #demo');
  }

  const button1 = document.createElement('button');
  const button2 = document.createElement('button');
  button1.innerHTML = 'Run example 1';
  button2.innerHTML = 'Run example 2';
  button1.onclick = () => renderSelectedExample('example1');
  button2.onclick = () => renderSelectedExample('example2');
  demo.appendChild(button1);
  demo.appendChild(button2);
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


  demo.appendChild(title1);
  demo.appendChild(title2);
}

function showTitle(t) {
  t.style.display = 'inline-block';
}

function hideTitle(t) {
  t.style.display = 'none';
}

addExampleSelection();
addTitles();
example1.createRequiredDomNodes();
example2.createRequiredDomNodes();
