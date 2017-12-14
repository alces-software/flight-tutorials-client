// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Launch.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';
import {
  Card,
  CardBlock,
  CardText,
} from 'reactstrap';
import { CardTitleBlock } from 'flight-reactware';

import Overlay, { ReactwareCardOverlay } from './TutorialCardOverlay';
import type { TutorialType } from './types';

const cardWidth = '560px';
const cardHeight = '425px';

type PropTypes = {
  className: string,
  onSelectTutorial: () => void,
  tutorial: TutorialType,
};

const TutorialCard = styled(({
  className,
  onSelectTutorial,
  tutorial,
}: PropTypes) => (
  <Card
    className={className}
    onClick={onSelectTutorial}
  >
    <CardBlock>
      <CardTitleBlock
        logoOnRight
        logoSrc={tutorial.logoUrl}
        subtitle={tutorial.subtitle}
        subtitleSize="medium"
        title={tutorial.title}
        titleSize="large"
      />
      <CardText>
        <Markdown source={tutorial.description} />
      </CardText>
    </CardBlock>
    <Overlay onSelectTutorial={onSelectTutorial} />
  </Card>
))`
  width: ${cardWidth};
  height: ${cardHeight};
  &:hover ${ReactwareCardOverlay} {
    opacity: 1;
  }
`;

export default TutorialCard;
