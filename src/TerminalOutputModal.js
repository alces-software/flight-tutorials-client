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

export class TerminalOutputModal extends React.Component {
  props: {
    getTerminalOutput: () => string,
    onShowTerminalOutput: () => void,
    showTerminalOutput: boolean,
    terminalOutputHeight: string,
  }

  handleScrollModal = () => {
    this.pre.scrollTop = this.pre.scrollHeight;
  }

  render() {
    const {
      getTerminalOutput,
      onShowTerminalOutput,
      showTerminalOutput,
      terminalOutputHeight,
    } = this.props;
    return (
      <StandardModal
        isOpen={showTerminalOutput}
        title="Session history"
        toggle={onShowTerminalOutput}
        className="max-width-content"
        onOpened={this.handleScrollModal}
      >
        <HeightRestrictedWrapper maxHeight={terminalOutputHeight} >
          <pre
            dangerouslySetInnerHTML={{ __html: getTerminalOutput() }}
            ref={(el) => { this.pre = el; }}
          />
        </HeightRestrictedWrapper>
      </StandardModal>
    );
  }
};

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
