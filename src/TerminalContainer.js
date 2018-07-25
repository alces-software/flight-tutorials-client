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
  static defaultProps = {
    env: {},
    onInputLine: (line) => {},  // eslint-disable-line no-unused-vars
  }

  constructor(...args: any) {
    super(...args);
    this.state = {
      requestSessionRestart: false,
      sessionId: 0,
      showTerminalOutput: false,
    };
  }

  state: {
    requestSessionRestart: boolean,
    sessionId: number,
    showTerminalOutput: boolean,
  };

  getTerminalOutput = () => {
    if (this.terminal == null) {
      return '';
    }
    return this.terminal.getOutput();
  }

  props: {
    children: ChildrenPropType,
    columns?: number,  // eslint-disable-line react/require-default-props
    env?: {},
    onInputLine?: (string) => void,
    rows?: number,  // eslint-disable-line react/require-default-props
    socket: any,
  };

  terminal: ReactTerminal;

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

  handleShowTerminalOutput = () => {
    this.setState({ showTerminalOutput: !this.state.showTerminalOutput });
  }

  render() {
    const terminal = (
      <ReactTerminal
        columns={this.props.columns}
        env={this.props.env}
        key={this.state.sessionId}
        onInputLine={this.props.onInputLine}
        onSessionEnd={this.handleSessionEnd}
        ref={(el) => { this.terminal = el; }}
        rows={this.props.rows}
        size={{ width: 0, height: 0 }}
        socket={this.props.socket}
      />
    );

    return this.props.children({
      onSessionRestartAccepted: this.handleSessionRestartAccepted,
      onSessionRestartRequestClosed: this.handleSessionRestartRequestClosed,
      onShowTerminalOutput: this.handleShowTerminalOutput,
      requestSessionRestart: this.state.requestSessionRestart,
      showTerminalOutput: this.state.showTerminalOutput,
      getTerminalOutput: this.getTerminalOutput,
      terminal,
    });
  }
}
