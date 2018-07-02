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

type SocketStatus =
  // Waiting for the socketio connection.
  'connecting' |

  // A connection has been established; authentication is required; waiting on
  // the authentication response.
  'authenticating' |

  // A connection has been established; authentication is required;
  // authentication has been successful.  The socket is ready to use.
  'authenticated' |

  // A connection has been established; authentication is not required.  The
  // socket is ready to use.
  'connected' |

  // Either the connection failed, or authentication failed.
  'failed' |

  // The failure has been shown the user and dismissed.  We are not attempting
  // to reconnect.
  'idle'
;

// Manages a socket.io-client socket.
//
// Eventually, this is likely to manage reconnections, failure to connect and
// other similar events.  For now it exists to avoid duplicating code between
// flight-tutorials-client and Flight Launch.
export default class SocketContainer extends React.Component {

  constructor(...args: any) {
    super(...args);
    this.state = {
      status: 'connecting',
    };

    this.socket = io(this.props.socketIOUrl, { path: this.props.socketIOPath });
    this.socket.on('connect', () => {
      debug('Socket connected');
      if (this.props.jwt) {
        debug('Authentication credentials present: authenticating');
        this.setState({ status: 'authenticating' });
        this.socket.on('authenticated', () => {
          debug('Socket authenticated');
          this.setState({ status: 'authenticated' });
        });
        this.socket.on('unauthorized', (error) => {
          debug('Socket unauthorized: %O', error);
          this.setState({ status: 'failed' });
        });
        this.socket.emit('authentication', { jwt: this.props.jwt });
      } else {
        debug('Authentication credentials not present.');
        this.setState({ status: 'connected' });
      }
    });
    this.socket.on('connect_error', (error) => {
      debug('Socket connection error: %o', error);
      this.setState({ status: 'failed' });
    });
    this.socket.on('error', (error) => {
      debug('Socket error: %o', error);
      this.setState({ status: 'failed' });
    });
    this.socket.on('disconnect', (error) => {
      debug('Socket disconnected: %o', error);
      this.setState({ status: 'failed' });
    });
  }

  state: {
    status: SocketStatus,
  };

  componentWillUnmount() {
    this.socket.disconnect();
  }

  props: {
    children: ChildrenPropType,
    jwt?: string,
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

  initializing() {
    const status = this.state.status;
    return status === 'connecting' || status === 'authenticating';
  }

  render() {
    if (this.initializing()) {
      return <DelaySpinner />;
    }

    return this.props.children({
      onCloseSocketError: this.handleClearSocketError,
      socket: this.socket,
      socketError: this.state.status === 'failed',
    });
  }
}
