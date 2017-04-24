import React from 'react';
import Enemy from './Enemy';
import { connect } from 'react-redux';
require('../styles/enemy.scss');

class Enemies extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                {this.props.enemies.map(data => {
                    {/*console.log('DATA', data);*/}
                    return (
                        <Enemy key={data.key} {...data}/>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return {
        enemies: state.game.enemies
    }
};

Enemies = connect(mapStateToProps)(Enemies);

export default Enemies;