/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Launch.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';

import Card from './Card';
import Markdown from 'react-markdown';
import Overlay from './TutorialCardOverlay';
import './styles/TutorialCard.scss';

const TutorialCard = ({
  onSelectTutorial,
  tutorial,
}) => (
  <Card
    className="TutorialCard"
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
  </Card>
);

export default TutorialCard;
