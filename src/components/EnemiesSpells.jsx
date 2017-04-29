import React from 'react';
import EnemySpell from './EnemySpell';
import { connect } from 'react-redux';
require('../styles/enemy.scss');

class EnemiesSpells extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                {this.props.enemiesSpells.map((data, index) => {
                    return (
                        <EnemySpell key={index} {...data}/>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return {
        enemiesSpells: state.game.enemiesSpells
    }
};

EnemiesSpells = connect(mapStateToProps)(EnemiesSpells);

export default EnemiesSpells;