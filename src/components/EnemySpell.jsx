
import React from 'react';
require('../styles/enemy.scss');

class EnemySpell extends React.Component {

  render () {
    return (
        <div className="enemy-spell" style={{
            top: this.props.top + 'px',
            left: this.props.left + 'px'
        }}
        >

        </div>
    );
  }
}

export default EnemySpell;