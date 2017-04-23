import React from 'react';
require('../styles/ball.scss');

class Explosion extends React.Component {
  render () {
    return (<div className="explosion" style={{
              left: this.props.explosion.left - 46 + 'px',
              top: this.props.explosion.top - 25 + 'px',
              display: this.props.explosion.display
          }}>
            <div className="sprites"></div>
          </div>
    );
  }
}

export default Explosion;