import React from 'react';
import { Link } from 'react-router';

class StageButton extends React.Component {
  render () {
    return (
        this.props.unlocked == 'unlocked' ?
        <Link to={`/Stage/${this.props.content}`}  className={`stage-btn ${this.props.unlocked} `}>{this.props.content}</Link> :
        <div className="stage-btn locked"></div>
    );
  }
}

export default StageButton;