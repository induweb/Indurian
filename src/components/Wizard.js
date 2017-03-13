import React from 'react';
import Paddle from './Paddle';
import Spell from './Spell';
require('../styles/wizard.scss');

const Wizard = React.createClass({

  render: function() {
    console.log('wizard: ', this.props);
    return (
        <div className={`wizard wizard-${this.props.wizardState}`} style={{top: this.props.position.top + 'px'}}>
            <Spell position={this.props.spellPosition} />
            <Paddle />
        </div>
    );
  }
});

export default Wizard;