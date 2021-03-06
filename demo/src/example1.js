// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react'
import ReactDOM from 'react-dom'

import { FlightTutorials } from '../../src'

export const createRequiredDomNodes = () => {
  // Create some DOM nodes to mount our react components into.  In a real
  // application, we'd probably have these included in served the HTML, or
  // created through some HTML templating library.
  const demo = document.querySelector('#demo');
  if (demo == null) {
    throw new Error('Cannot find #demo');
  }

  const ex1 = document.createElement('div');
  ex1.id = 'example1';

  if (document.body) {
    document.body.style.paddingTop = "0";
  }

  demo.appendChild(ex1);
};

type RenderParams = {
  socketIOPath : string,
  socketIOUrl : string,
};

export const render = ({ socketIOPath, socketIOUrl } : RenderParams) => {
  ReactDOM.render(
    <FlightTutorials
      auth={{}}
      socketIOUrl={socketIOUrl}
      socketIOPath={socketIOPath}
    />,
    document.querySelector('#example1')
  )
};

export const unmount = () => {
  ReactDOM.unmountComponentAtNode(document.querySelector('#example1'));
};
