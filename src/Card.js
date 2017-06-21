/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Flight Launch.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import classNames from 'classnames';

import CardTitle from './CardTitle';

const Card = ({
  children,
  className,
  onClick,
  footer,
  subtitle,
  subtitleSize,
  title,
  titleIcon,
  titleLogoOnRight,
  titleLogoUrl,
  titlePopoverText,
  titleSize,
}) => {
  const cardClassNames = classNames('card', className, {
    'card--logo-right': titleLogoOnRight,
  });

  return (
    <div className="card-wrapper" >
      { /* eslint-disable jsx-a11y/no-static-element-interactions */ }
      <div className={cardClassNames} onClick={onClick} >
        <div className="card-block">
          <CardTitle
            title={title}
            titleSize={titleSize}
            titlePopoverText={titlePopoverText}
            subtitle={subtitle}
            subtitleSize={subtitleSize}
            logoUrl={titleLogoUrl}
            icon={titleIcon}
          />
          {children}
          {
            footer ? <div className="card-footer">
              {footer}
            </div>
            :
          null
          }
        </div>
      </div>
    </div>
  );
};


Card.Title = CardTitle;

export default Card;
