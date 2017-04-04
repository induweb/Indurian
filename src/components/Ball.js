import React from 'react';
require('../styles/ball.scss');

class Ball extends React.Component {
  render () {
    return (
        <div className="ball normal-ball" style={{left: this.props.left + 'px', top: this.props.top + 'px'}}></div>
    );
  }
}

export default Ball;