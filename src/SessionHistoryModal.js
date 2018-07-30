// @flow
/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

import React from 'react';
import styled, { css } from 'styled-components';
import { StandardModal } from 'flight-reactware';

import Wrapper from './TerminalOutputWrapper';

const HeightRestrictedWrapper = styled(Wrapper)`
  PRE {
    max-height: 600px;
    ${({ maxHeight }) => (
      maxHeight == null ? null : css`max-height: ${maxHeight};`
    )}
    max-width: 100%;
  }
`;

export default class SessionHistoryModal extends React.Component {
  props: {
    getSessionHistory: () => string,
    onShowSessionHistory: () => void,
    showSessionHistory: boolean,
    // eslint-disable-next-line react/require-default-props
    sessionHistoryHeight?: string,
  }

  outputEl: HTMLPreElement;

  handleScrollModal = () => {
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  render() {
    const {
      getSessionHistory,
      onShowSessionHistory,
      showSessionHistory,
      sessionHistoryHeight,
    } = this.props;
    return (
      <StandardModal
        isOpen={showSessionHistory}
        title="Session history"
        toggle={onShowSessionHistory}
        className="max-width-content"
        onOpened={this.handleScrollModal}
      >
        <HeightRestrictedWrapper maxHeight={sessionHistoryHeight} >
          <pre
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: getSessionHistory() }}
            ref={(el) => { this.outputEl = el; }}
          />
        </HeightRestrictedWrapper>
      </StandardModal>
    );
  }
}
