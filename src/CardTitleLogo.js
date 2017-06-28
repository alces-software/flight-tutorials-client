// @flow
/*=============================================================================
 * Copyright (C) 2017 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Flight Launch.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';

class CardTitleLogo extends React.Component {
  props: {
    logoUrl?: string,
  }

  state = {
    showImage: false,
  }

  showImage = () => {
    this.setState({ showImage: true });
  }

  render() {
    const { logoUrl } = this.props;

    const style = {
      display: this.state.showImage ? 'initial' : 'none',
    };

    return (
      logoUrl ? <img
        className="card-title-logo"
        alt="Logo for card"
        src={logoUrl}
        style={style}
        onLoad={this.showImage}
      />
      : null
    );
  }
}

export default CardTitleLogo;
