// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Flight Common.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import FontAwesome from 'react-fontawesome';
import cx from 'classnames';

type PropTypes = {
  className?: any,
  name: string,
  size?: 'lg' | '2x' | '3x' | '4x' | '5x',
};

const defaultProps = {
  className: undefined,
  size: undefined,
};

const Icon = (props : PropTypes) => {
  const classes = cx(
    'flight-icon',
    `flight-icon-${props.name}`,
    props.className,
  );
  return (
    <FontAwesome
      {...props}
      size={props.size}
      className={classes}
    />
  );
};

Icon.defaultProps = defaultProps;

export default Icon;
