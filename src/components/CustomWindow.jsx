import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/actionCreators';
import { Link } from 'react-router';

class CustomWindow extends React.Component {

    constructor(props) {
        super(props);
    }

    backToGame = () => {
        this.props.hideCustomWindow();
    };

    restartGame = () => {
        this.props.hideCustomWindow();
        this.props.restartGame();
        this.props.stageLoad(this.props.id);
    };

    render() {
        return (
            <div className="custom-window" style={{display: this.props.display}}>
                <div className="custom-window-overlay"></div>
                <div className="custom-window-content">
                    <h2>Pauza</h2>
                    <div className="buttons">
                        <button onClick={this.backToGame}>Wznów</button>
                        <button onClick={this.restartGame}>Restart</button>
                        <Link to="/play">Wyjście</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return {
        blocks: state.game.blocks
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        restartGame: () => dispatch(actions.restartGame()),
        stageLoad: (id) => dispatch(actions.loadData(id)),
        showCustomWindow: (type) => dispatch(actions.showCustomWindow(type)),
        hideCustomWindow: () => dispatch(actions.hideCustomWindow())
    }
};

CustomWindow = connect(mapStateToProps, mapDispatchToProps)(CustomWindow);

export default CustomWindow;