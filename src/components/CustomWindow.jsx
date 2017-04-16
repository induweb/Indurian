import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/actionCreators';
import { Link } from 'react-router';

class CustomWindow extends React.Component {

    onClick = () => {
        this.props.hideCustomWindow();
    };

    render() {
        return (
            <div className="custom-window" style={{display: this.props.display}}>
                <div className="custom-window-overlay"></div>
                <div className="custom-window-content">
                    <h2>Pauza</h2>
                    <div className="buttons">
                        <button onClick={this.onClick}>Wznów</button>
                        <button>Restart</button>
                        <button>Opcje</button>
                        {/*<a href="./play">Wyjście</a>*/}
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
        showCustomWindow: (type) => dispatch(actions.showCustomWindow(type)),
        hideCustomWindow: () => dispatch(actions.hideCustomWindow())
    }
};

CustomWindow = connect(mapStateToProps, mapDispatchToProps)(CustomWindow);

export default CustomWindow;