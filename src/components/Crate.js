import React from 'react';
require('../styles/stage.scss');

class Crate extends React.Component {

  render () {
    return (
        <div className={`crate ${this.props.type}`} style={{left: this.props.left + 'px',
            top: this.props.top + 'px',
            display: this.props.value == 0 ? 'none': 'block'
        }}
        ></div>
    );
  }
}

export default Crate;