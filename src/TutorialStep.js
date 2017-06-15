import React, {Component} from 'react';

export default class TutorialStep extends Component {
  render() {
    const { current, completed, step } = this.props;
    if (!current && !completed) {
      return null;
    }
    return (
      <div>
        <h3>{step.title}</h3>
        <div dangerouslySetInnerHTML={{__html: step.description}} />
      </div>
    );
  }
}
