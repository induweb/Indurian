import React from 'react';
import Coin from './Coin';
import { connect } from 'react-redux';
require('../styles/stage.scss');

class Coins extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.coins.map((data, index) => {
                    {/*console.log('DATA', data);*/}
                    return (
                        <Coin key={index} {...data}/>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return {
        coins: state.game.coins
    }
};

Coins = connect(mapStateToProps)(Coins);

export default Coins;