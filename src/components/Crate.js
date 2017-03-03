import React from 'react';
require('../styles/stage.scss');

class Crate extends React.Component {
  render () {
    return (
        <div className={`crate ${this.props.type}`}></div>
    );
  }
}

export default Crate;