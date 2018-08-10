// @flow
/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Tutorials.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import styled from 'styled-components';

// The font-constant is a property of the font-family selected for the
// terminal.  It is used to determine the number of columns for the terminal
// given a width in pixels.
//
// WARNING: If the font-family changes, the font-constant will need to change
// too.
export const fontConstant = 1.64;
const Wrapper = styled.div`
  PRE {
    background: black;
    color: white;
    display: inline-block;
    line-height: 1.2;
    padding-top: 5px;
    padding-left: 5px;
    padding-bottom: 5px;
    margin-bottom: 0;
    
    & > *:last-child, & > *:last-child > *:last-child {
      overflow: hidden;
    }
  }
`;

export default Wrapper;
