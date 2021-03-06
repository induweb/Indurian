import React from 'react';
import Paddle from './Paddle';
// import Spell from './Spell';
require('../styles/wizard.scss');
{/*<Spell left={this.props.spellPosition} top={this.props.wizardPosition.top}/>*/}

class Wizard extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (<div>
                <div className={`wizard wizard-${this.props.wizardState}`} style={{top: this.props.wizardPosition + 'px'}}>
                    <Paddle />
                </div>
            </div>
    );
  }
}

export default Wizard;