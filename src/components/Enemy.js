import React from 'react';
require('../styles/enemy.scss');

class Crate extends React.Component {

  render () {
    return (
        <div className={`enemy ${this.props.type} orc-${this.props.status}`} style={{left: this.props.left + 'px',
            top: this.props.position.top + 'px',
            right: this.props.position.right + 'px'
        }}
        ></div>
    );
  }
}

export default Crate;