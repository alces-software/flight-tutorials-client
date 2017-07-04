// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import * as example1 from './example1';

function getSocketIOUrl() {
  const params = new URLSearchParams(window.location.search);
  const socketIOUrl = params.get('socketIOUrl');
  if (socketIOUrl != null && socketIOUrl !== '') {
    return socketIOUrl;
  }
  if (process.env.NODE_ENV === 'production') {
    return '/pty';
  } else {
    return 'http://localhost:3001/pty';
  }
}

example1.createRequiredDomNodes();
example1.render({ socketIOUrl: getSocketIOUrl() });
