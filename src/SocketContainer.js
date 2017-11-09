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
import mkDebug from 'debug';
import { DelaySpinner } from 'flight-reactware';

const debug = mkDebug('FlightTutorials:SocketContainer');

type ChildrenPropType = ({
  onCloseSocketError: () => void,
  socket: any,
  socketError: boolean,
}) => React$Element<*>;

// Manages a socket.io-client socket.
//
// Eventually, this is likely to manage reconnections, failure to connect and
// other similar events.  For now it exists to avoid duplicating code between
// flight-tutorials-client and Flight Tutorials.
export default class SocketContainer extends React.Component {

  constructor(...args: any) {
    super(...args);
    this.state = {
      status: 'connecting',
    };
    this.socket = io(this.props.socketIOUrl, { path: this.props.socketIOPath });
    this.socket.on('connect', () => {
      debug('Socket connected');
      this.setState({ status: 'connected' });
    });
    this.socket.on('connect_error', (error) => {
      debug('Socket connection error: %o', error);
      this.setState({ status: 'failed' });
    });
    this.socket.on('error', (error) => {
      debug('Socket error: %o', error);
      this.setState({ status: 'failed' });
    });
  }

  state: {
    status: 'connecting' | 'connected' | 'failed' | 'idle',
  };

  componentWillUnmount() {
    this.socket.disconnect();
  }

  props: {
    children: ChildrenPropType,
    socketIOUrl: string,
    socketIOPath: string,
  }

  socket: any;

  handleClearSocketError = () => {
    debug('Clearing socket error');
    // XXX We should do more than just hide the error message. We should try
    // and reconnect with exponential backoff or something.
    this.setState({ status: 'idle' });
  }

  render() {
    const status = this.state.status;
    if (status === 'connecting') {
      return <DelaySpinner />;
    }

    return this.props.children({
      onCloseSocketError: this.handleClearSocketError,
      socket: this.socket,
      socketError: status === 'failed',
    });
  }
}
