import React from 'react';
require('../styles/enemy.scss');

class Crate extends React.Component {

  render () {
    return (
        <div className={`enemy ${this.props.type} orc-${this.props.status}`} style={{
            top: this.props.position.top + 'px',
            right: this.props.position.right + 'px'
        }}
        >
            <div className="enemy-status" style={{
                width: this.props.position.width + 'px',
                padding: '0 ' + this.props.approximation.X + 'px'
            }}>
                <div className="enemy-name">{this.props.name}</div>
                <div className="hp-bar">
                    <div className="hp-value" style={{
                        width: (this.props.hp / this.props.value) * 100 + '%'
                    }}></div>
                </div>
            </div>

        </div>
    );
  }
}

export default Crate;