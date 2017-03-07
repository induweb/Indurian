import React from 'react';
require('../styles/stage.scss');

class Crate extends React.Component {

  render () {
    return (
        <div className={`crate ${this.props.type}`} style={{left: this.props.left + 'px', top: this.props.top + 'px'}}></div>
    );
  }
}

export default Crate;