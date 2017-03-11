import React from 'react';
import Paddle from './Paddle';
require('../styles/wizard.scss');

const Wizard = React.createClass({

  render: function() {
    console.log('wizard: ', this.props.position);
    return (
        <div className="wizard wizard-idle" style={{top: this.props.position.top + 'px'}}>

          <Paddle></Paddle>
        </div>
    );
  }
});

export default Wizard;