import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/actionCreators';
import { Link } from 'react-router';

class CustomWindow extends React.Component {

    constructor(props) {
        super(props);
        this.playerName = '';
    }

    backToGame = () => {
        this.props.hideCustomWindow();
    };

    restartGame = () => {
        this.props.hideCustomWindow();
        this.props.restartGame();
        this.props.stageLoad(this.props.id);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.playerName);
        // e.target.style.opacity = 0.3;
    };

    handleChange = (e) => {
        this.playerName = e.target.value;
    };

    render() {
        switch(this.props.type) {
            case 'pause':
                this.title = 'Pauza';
                break;
            case 'gameOver':
                this.title = 'Koniec gry';
                break;
        }

        return (
            <div className={`custom-window custom-window-${this.props.type}`} style={{display: this.props.display}}>
                <div className="custom-window-overlay"></div>
                <div className="custom-window-content">
                    <h2>{this.title}</h2>
                    <div className="buttons">
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="add-top-score">X. najlepszy wynik<br/>PODAJ IMIĘ:</label>
                            <input type="text" id="add-top-score" onChange={this.handleChange}/>
                        </form>
                        <button className="resume" onClick={this.backToGame}>Wznów</button>
                        <button className="restart" onClick={this.restartGame}>Restart</button>
                        <Link className="exit" to="/play">Wyjście</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return {
        type: state.game.customWindow.type
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