// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Flight Launch.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import classNames from 'classnames';

import CardTitleLogo from './CardTitleLogo';

const titleElemFromSize = (size) => {
  switch (size) {
    case 'medium':
      return 'h4';
    case 'large':
      return 'h2';
    case 'x-large':
      return 'h1';
    default:
      return 'h4';
  }
};

const subtitleElemFromSize = (size) => {
  switch (size) {
    case 'medium':
      return 'h6';
    case 'large':
      return 'h5';
    case 'x-large':
      return 'h4';
    default:
      return 'h6';
  }
};

type PropTypes = {
  icon? : React$Element<*>,
  logoUrl? : string,
  subtitle? : string | React$Element<*>,
  subtitleSize? : 'medium' | 'large' | 'x-large',
  title : string | React$Element<*>,
  titlePopoverText? : string,
  titleSize? : 'medium' | 'large' | 'x-large',
};

const defaultProps = {
  titleSize: 'x-large',
  subtitleSize: 'x-large',
};

const CardTitle = ({
  icon,
  logoUrl,
  subtitle,
  subtitleSize,
  title,
  titlePopoverText,
  titleSize,
}: PropTypes) => {
  const HT = titleElemFromSize(titleSize);
  const HST = subtitleElemFromSize(subtitleSize);
  const logoOrIcon = logoUrl ?
    <CardTitleLogo logoUrl={logoUrl} /> :
    icon;

  let titleAttribute;
  if (titlePopoverText != null) {
    titleAttribute = { title: titlePopoverText };
  } else {
    titleAttribute = typeof title === 'string' ? { title } : null;
  }

  return (
    <div className="card-title-block">
      <div className="card-title-block-inner">
        <div className="card-title-logo-container">
          <div className="card-title-logo-helper" />
          {logoOrIcon}
        </div>
        <HT className={classNames('card-title', titleSize)} {...titleAttribute}>
          {title}
        </HT>
      </div>
      <HST className={classNames('card-subtitle', subtitleSize)}>{subtitle}</HST>
    </div>
  );
};

CardTitle.defaultProps = defaultProps;

export default CardTitle;
