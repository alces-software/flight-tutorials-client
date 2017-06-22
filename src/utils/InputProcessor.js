// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import mkDebug from 'debug';
import Terminal from 'terminal.js';

const debug = mkDebug('FlightTutorials:InputProcessor');

// Our InputProcessor can be in one of two states.  It is either
//
//  1. waiting for the user to start typing; or
//  2. waiting for the user to press enter;
//
type State = 'awaiting input data' | 'awaiting enter key';
const awaitingInputData : State = 'awaiting input data';
const awaitingEnterKey : State = 'awaiting enter key';

//
// Class to process user-provided input and determine which commands they are
// running.  This is a surprisingly hard problem.
//
// See the comment in ReactTerminal for an explanation of some of the issues,
// and the comment in handleUserProvidedData for an explanation of how we try
// to solve this.
//
export default class InputProcessor {
  onInputLine: string => void;
  receivedInputOnLine: ?number;
  state: State;
  term: Terminal;

  constructor(term: Terminal, onInputLine: string => void) {
    this.onInputLine = onInputLine;
    this.receivedInputOnLine = undefined;
    this.state = awaitingInputData;
    this.term = term;
  }

  // Any user-provided data is sent to this method.  If the user is typing we
  // will receive a key at a time.  If the user has pasted in some text we
  // will receive it all at once.
  //
  // The data provided, does not include any processing of that data by the
  // terminal or by the shell.  In particular, line-editing and history
  // manipulation are not reflected in this data.  However, we can use this
  // data to determine two things:
  //
  //  1. Has the user just pressed enter.
  //  2. Has the user typed anything since they last pressed enter.
  //
  // The first of those allows us to accurately, determine when we should
  // process a line.  The second of those allows us to determine which
  // terminal lines contain the command about to be processed.
  //
  // When the user presses enter, we need to determine which command they are
  // about to execute.  We cannot determine that from the user-provided data
  // as it does not include line-editing or history manipulation.  Instead we
  // can ask the terminal for the contents of the current line.
  //
  // This will provide us with the correct result as long as the command is
  // contained on a single line, that is, the command has not been wrapped by
  // the terminal.  We can deal with terminal wrapping...
  //
  // When the user first types anything (since last pressing enter), we take a
  // reference to the terminal line that they started typing on.  When the
  // user presses enter we check which line they are now on.  We can use these
  // two line numbers to determine which terminal lines we are interested in.
  // Some special handling is required for form feed charecters.
  //
  // ### Limitations
  //
  // Currently we do not deal with multi-line commands, e.g. the following two
  // commands are not treated the same.  Ideally they should be.
  //
  // ```
  // echo ben
  // ```
  //
  // ```
  // echo \
  // ben
  // ```
  //
  handleUserProvidedData = (chunk: Uint8Array) => {
    debug('Received user-provided input %o as string: %s', chunk, chunk.toString());

    if (chunk[0] === 12) {
      this.handleFormFeed();
      return;
    }

    if (this.state === awaitingInputData) {
      // The user has pressed a key, or pasted something for the first time
      // since we last processed their input.
      this.handleFirstInputData();
    }

    if (chunk[chunk.length - 1] === 13) {
      // User has pressed enter.  It's time to process their input.
      this.handleEnterKey();
    }
  }

  handleLineRemove = (lineNumber: number) => {
    if (this.receivedInputOnLine == null) {
      return;
    }

    if (lineNumber < this.receivedInputOnLine) {
      this.receivedInputOnLine -= 1;
      debug(
        'Line %d removed. Changed receivedInputOnLine to %d',
        lineNumber,
        this.receivedInputOnLine,
      );
    }
  }

  handleFormFeed() {
    // The user has pressed Ctrl-L. The screen has been cleared.  If we were
    // previously 'awaiting input data', then we still are.  If we had
    // previously 'received input data', then we need to update
    // `this.receivedInputOnLine`.
    if (this.state === awaitingEnterKey) {
      this.receivedInputOnLine = 0;
      debug(
        'Screen has been reset: receivedInputOnLine=%d ; state=%s',
        this.receivedInputOnLine,
        this.state,
      );
    }
  }

  handleFirstInputData() {
    // The user has pressed a key, or pasted something for the first time
    // since we last processed their input.
    //
    // We grab the current line that the cursor is on so that we can later
    // grab all of their input even if it wraps.
    this.receivedInputOnLine = this.term.state.cursor.y;
    this.state = awaitingEnterKey;
    debug(
      'Received first input data: line=%d ; state=%s',
      this.receivedInputOnLine,
      this.state,
    );
  }

  handleEnterKey() {
    // User has pressed enter.  It's time to process their input.
    debug('User has pressed enter');
    debug('Current terminal state:\n%s', this.term.state.toString());

    const currentLineNumber = this.term.state.cursor.y;
    const receivedInputOnLine = this.receivedInputOnLine;
    const lines = [];

    if (receivedInputOnLine == null) {
      throw new Error('this.receivedInputOnLine == null');
    }

    const numLines = currentLineNumber - receivedInputOnLine;

    debug(
      'receivedInputOnLine=%d ; currentLineNumber=%d ; interested in lines (%d,%d)',
      receivedInputOnLine,
      currentLineNumber,
      currentLineNumber - numLines,
      currentLineNumber,
    );

    for (let i = numLines; i >= 0; i -= 1) {
      const lineIdx = currentLineNumber - i;
      const line = this.term.state.getLine(lineIdx).str;
      debug('Line from terminal: "%s"', line);
      lines.push(line);
    }

    this.state = awaitingInputData;
    this.receivedInputOnLine = undefined;
    debug('Extracted lines: %O', lines);
    debug('Reset state to: %s', this.state);

    this.onInputLine(lines.join(''));
  }
}
