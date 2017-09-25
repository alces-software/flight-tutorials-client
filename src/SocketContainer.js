// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import io from 'socket.io-client';

type ChildrenPropType = ({
  socket: any,
}) => React$Element<*>;

// Manages a socket.io-client socket.
//
// Eventually, this is likely to manage reconnections, failure to connect and
// other similar events.  For now it exists to avoid duplicating code between
// flight-tutorials-client and Flight Tutorials.
export default class SocketContainer extends React.Component {

  constructor(...args: any) {
    super(...args);
    this.socket = io(this.props.socketIOUrl, { path: this.props.socketIOPath });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  props: {
    children: ChildrenPropType,
    socketIOUrl: string,
    socketIOPath: string,
  }

  socket: any;

  render() {
    return this.props.children({
      socket: this.socket,
    });
  }
}
