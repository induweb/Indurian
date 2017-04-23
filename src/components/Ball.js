import React from 'react';
require('../styles/ball.scss');

class Ball extends React.Component {
  render () {
    return (<div>
          <div className="ball normal-ball" style={{left: this.props.left + 'px', top: this.props.top + 'px'}}></div>
        </div>
    );
  }
}

export default Ball;