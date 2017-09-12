// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import styled, { css } from 'styled-components';

type PropTypes = {
  variant: 'primary' | 'light',
};

const StarRule = styled.hr`
  padding: 0;
  border: none;
  border-top: solid 5px;
  text-align: center;
  max-width: 250px;
  margin: 25px auto 30px;

  ${props => props.variant === 'primary' && css`
    border-color: #2C3E50;
    &:after {
      background-color: #fff;
      color: #2C3E50;
    }
  `}

  &:after {
    content: "\f005";
    font-family: FontAwesome;
    display: inline-block;
    position: relative;
    top: -.8em;
    font-size: 2em;
    padding: 0 .25em;
  }
`;

export default StarRule;
