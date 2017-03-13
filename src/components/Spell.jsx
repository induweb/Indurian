import React from 'react';
require('../styles/stage.scss');

class Spell extends React.Component {
  render () {
      // console.log('QQ', this.props);
    return (
        <div className="spell" style={{left: this.props.position + 'px'}}></div>
    );
  }
}

export default Spell;