// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import * as example1 from './example1';

// XXX Clients need to include these styles or equivalents.
// $FlowFixMe
import '../../../flight-reactware/styles/bootstrap-theme.css';
// $FlowFixMe
import '../../../flight-reactware/styles/fonts.css';
// $FlowFixMe
import '../../../flight-reactware/styles/flight.css';

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

example1.createRequiredDomNodes();
example1.render({ socketIOUrl: getSocketIOUrl() });
