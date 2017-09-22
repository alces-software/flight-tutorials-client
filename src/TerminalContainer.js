// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React, { Component } from 'react';
import mkDebug from 'debug';

import ReactTerminal from './ReactTerminal';

const debug = mkDebug('FlightTutorials:TerminalContainer');

type ChildrenPropType = ({
  onSessionRestartAccepted: () => void,
  onSessionRestartRequestClosed: () => void,
  requestSessionRestart: boolean,
  terminal : React$Element<*>,  // A ReactTerminal element.
}) => React$Element<*>;

export default class TerminalContainer extends Component {
  constructor(...args: any) {
    super(...args);
    this.state = {
      requestSessionRestart: false,
      sessionId: 0,
    };
  }

  state: {
    requestSessionRestart: boolean,
    sessionId: number,
  };

  props: {
    children: ChildrenPropType,
    onInputLine?: (string) => void,
    socket: any,
  };

  handleSessionEnd = () => {
    debug('Session eneded. Requesting restart');
    this.setState({ requestSessionRestart: true });
  }

  handleSessionRestartAccepted = () => {
    debug('Restarting session');
    this.setState(state => ({
      ...state,
      sessionId: state.sessionId + 1,
      requestSessionRestart: false,
    }));
  }

  handleSessionRestartRequestClosed = () => {
    debug('Closing session restart request.');
    this.setState({ requestSessionRestart: false });
  }

  render() {
    const terminal = (
      <ReactTerminal
        key={this.state.sessionId}
        onInputLine={this.props.onInputLine}
        onSessionEnd={this.handleSessionEnd}
        socket={this.props.socket}
      />
    );

    return this.props.children({
      onSessionRestartAccepted: this.handleSessionRestartAccepted,
      onSessionRestartRequestClosed: this.handleSessionRestartRequestClosed,
      requestSessionRestart: this.state.requestSessionRestart,
      terminal,
    });
  }
}
