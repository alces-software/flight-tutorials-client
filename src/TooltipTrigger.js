// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Flight Common.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { Tooltip } from 'reactstrap';

/* eslint-disable import/no-extraneous-dependencies */
// $FlowFixMe
import { OverlayTrigger } from 'flight-reactware';
/* eslint-enable import/no-extraneous-dependencies */

type PropTypes = {
  children : React$Element<*>,
  tooltip? : string | React$Element<*>,
  className? : string,
};

const defaultProps = {
  tooltip: '',
  className: undefined,
};

const TooltipTrigger = ({ children, tooltip, className }: PropTypes) => {
  if (tooltip == null || tooltip === '') {
    return <div style={{ display: 'inline-block' }}>{children}</div>;
  }
  const overlay = (
    <Tooltip
      className={className}
      placement="top"
      target="this-will-be-replaced-by-overlay-trigger"
    >
      {tooltip}
    </Tooltip>
  );
  return (
    <OverlayTrigger
      overlay={overlay}
      trigger={['hover', 'focus']}
    >
      {children}
    </OverlayTrigger>
  );
};

TooltipTrigger.defaultProps = defaultProps;

export default TooltipTrigger;
