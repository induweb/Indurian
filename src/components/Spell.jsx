import React from 'react';
require('../styles/wizard.scss');
// require('../styles/stage.scss');

class Spell extends React.Component {
  render () {
      // console.log('QQ', this.props);
    return (
        <div className="spell" style={{width: this.props.width + 'px', top: this.props.top, display: this.props.display}}><div className="before"></div><div className="after"></div></div>
    );
  }
}

export default Spell;