/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import Terminal from 'terminal.js';

import InputProcessor from './InputProcessor';

let inputProcessor;
let spy;
let term;

function buildTerminal({ rows, columns }) {
  spy = jest.fn();
  term = new Terminal({ rows, columns });
  term.state.setMode('crlf', true);
  inputProcessor = new InputProcessor(term, spy);
  term.state.on('lineremove', inputProcessor.handleLineRemove);
}

function stringToCharCodes(string) {
  return string.split('').map((c, idx) => string.charCodeAt(idx));
}

function buildChunk(input) {
  return new Uint8Array(stringToCharCodes(input));
}

function sendInput(input) {
  inputProcessor.handleUserProvidedData(buildChunk(input));
  term.state.write(input);
}

function sendEnterKey() {
  inputProcessor.handleUserProvidedData(buildChunk('\r'));
  term.state.write('\n');
}

function sendFormFeed() {
  inputProcessor.handleUserProvidedData(new Uint8Array([12]));

  // Do our best to simulate what the socket.io-stream returns.
  const currentLine = term.state.getLine(term.state.cursor.y).str;
  term.state.reset();
  term.state.write(currentLine);
}

it('waits for the enter key', () => {
  buildTerminal({ rows: 50, columns: 80 });
  const input = 'echo "Hello, world."';

  sendInput(input);

  expect(spy).not.toHaveBeenCalled();
});

it('correctly handles non-wrapped lines', () => {
  buildTerminal({ rows: 50, columns: 80 });
  const input = 'echo "Hello, world."';

  sendInput(input);
  sendEnterKey();

  expect(spy).toHaveBeenCalledWith(input);
});

it('correctly handles wrapped lines', () => {
  buildTerminal({ rows: 50, columns: 80 });
  const input = 'echo This is a very long line. It exceeds the 80 chars width of the terminal. Well it does now.';

  sendInput(input);
  sendEnterKey();

  expect(spy).toHaveBeenCalledWith(input);
});

it('correctly deals with line wrapping at the bottom of the terminal', () => {
  buildTerminal({ rows: 3, columns: 20 });

  // Let's fill the first two rows.
  sendInput('0123456789');
  sendEnterKey();
  sendInput('0123456789');
  sendEnterKey();

  // We're on the last row, let's add a long line that wraps.
  const longInput = 'abcdefghijklmnopqrstuvwxyz';
  sendInput(longInput);
  sendEnterKey();

  expect(spy).toHaveBeenCalledWith(longInput);
});

it('correctly handles form feeds', () => {
  buildTerminal({ rows: 50, columns: 20 });

  // Let's fill the first two rows.
  sendInput('0123456789');
  sendEnterKey();
  sendInput('0123456789');
  sendEnterKey();

  // We're on the third row, let's add a long line that wraps.
  const longInput1 = 'abcdefghijklm';
  const longInput2 = 'nopqrstuvwxyz';
  sendInput(longInput1);
  sendFormFeed();
  sendInput(longInput2);
  sendEnterKey();

  expect(spy).toHaveBeenCalledWith(longInput1 + longInput2);
});
