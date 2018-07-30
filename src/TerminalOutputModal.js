// @flow
/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import { Button } from 'reactstrap';
import styled, { css } from 'styled-components';

import { StandardModal } from 'flight-reactware';
import Wrapper from './TerminalOutputWrapper';

const HeightRestrictedWrapper = styled(Wrapper)`
  PRE {
    max-height: 600px;
    ${({ maxHeight }) =>
      maxHeight == null ? null : css`max-height: ${maxHeight};`
    }
    max-width: 100%;
  }
`;

export const TerminalOutputModal = ({
  getTerminalOutput,
  onShowTerminalOutput,
  showTerminalOutput,
  terminalOutputHeight,
} : {
  getTerminalOutput: () => string,
  onShowTerminalOutput: () => void,
  showTerminalOutput: boolean,
  terminalOutputHeight: string,
}) => (
  /* eslint-disable react/no-danger */
  <StandardModal
    isOpen={showTerminalOutput}
    title="Terminal output"
    toggle={onShowTerminalOutput}
    className="max-width-content"
  >
    <HeightRestrictedWrapper maxHeight={terminalOutputHeight} >
      <pre dangerouslySetInnerHTML={{ __html: getTerminalOutput() }} />
    </HeightRestrictedWrapper>
  </StandardModal>
  /* eslint-enable react/no-danger */
);

export const ShowTerminalOutputButton = ({
  onShowTerminalOutput,
} : {
  onShowTerminalOutput : () => void
}) => (
  <div style={{ marginTop: '24px' }}>
    <Button
      onClick={onShowTerminalOutput}
      color="info"
    >
      Show all terminal output
    </Button>
  </div>
);
