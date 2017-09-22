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

import Card from './Card';
import Overlay from './TutorialCardOverlay';
import type { TutorialType } from './types';

const cardWidth = '560px';
const cardHeight = '425px';

const StyledCard = styled(Card)`
  width: ${cardWidth};
  height: ${cardHeight};
`;

type PropTypes = {
  onSelectTutorial: () => void,
  tutorial: TutorialType,
};

const TutorialCard = ({
  onSelectTutorial,
  tutorial,
}: PropTypes) => (
  <StyledCard
    onClick={onSelectTutorial}
    subtitle={tutorial.subtitle}
    subtitleSize="medium"
    title={tutorial.title}
    titleLogoOnRight
    titleLogoUrl={tutorial.logoUrl}
    titleSize="large"
  >
    <Markdown source={tutorial.description} />
    <Overlay onSelectTutorial={onSelectTutorial} />
  </StyledCard>
);

export default TutorialCard;
