import React from 'react';
import { Link } from 'react-router';

class StageButton extends React.Component {
  render () {
    return (
        <Link to={`/Stage/${this.props.content}`}  className="stage-btn">{this.props.content}</Link>
    );
  }
}

export default StageButton;