import React from 'react';
require('../styles/enemy.scss');

class Enemy extends React.Component {

  render () {
    return (
        <div className="coin" style={{
            top: this.props.top + 'px',
            left: this.props.left + 'px'
        }}>

        </div>
    );
  }
}

export default Enemy;