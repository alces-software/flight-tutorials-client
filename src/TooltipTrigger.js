// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Flight Common.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type PropTypes = {
  children : React$Element<*>,
  tooltip? : string | React$Element<*>,
  className? : string,
};

const TooltipTrigger = ({ children, tooltip, className }: PropTypes) => {
  if (tooltip == null || tooltip === '') {
    return <div style={{ display: 'inline-block' }}>{children}</div>;
  }
  return (
    <OverlayTrigger
      overlay={<Tooltip
        id="tooltip-trigger"
        className={className}
      >
        {tooltip}
      </Tooltip>}
      placement="top"
    >
      {children}
    </OverlayTrigger>
  );
};

export default TooltipTrigger;
