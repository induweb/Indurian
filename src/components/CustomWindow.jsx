import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/actionCreators';
import { Link } from 'react-router';

class CustomWindow extends React.Component {

    constructor(props) {
        super(props);
        this.playerName = '';
        this.nextStage = parseInt(this.props.id) + 1;
        this.wasSend = false;
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
        this.props.addScore(this.playerName, this.props.points);
        this.wasSend = true;
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
            case 'win':
                this.title = 'Gratulacje';
                break;
        }

        return (
            <div className={`custom-window custom-window-${this.props.type}`} style={{display: this.props.display}}>
                <div className="custom-window-overlay"></div>
                <div className="custom-window-content">
                    <h2>{this.title}</h2>
                    <div className="buttons">
                        {this.props.type == 'gameOver' && !this.wasSend ?
                            <form onSubmit={this.handleSubmit}>
                                <label htmlFor="add-top-score">X. najlepszy wynik<br/>PODAJ IMIĘ:</label>
                                <input type="text" id="add-top-score" onChange={this.handleChange}/>
                            </form> : null}

                        {this.props.type == 'gameOver' && this.wasSend ?
                            <Link className="scores-btn" to="/Scores">Wyniki</Link> : null}

                        {this.props.type == 'win' ?
                            <Link to={'/Stage/' + this.nextStage} className="next">Poziom {this.nextStage}</Link> : null}

                        {this.props.type == 'pause'? <button className="resume" onClick={this.backToGame}>Wznów</button> : null}

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
        scores: state.game.topScores,
        type: state.game.customWindow.type,
        points: state.game.points
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        restartGame: () => dispatch(actions.restartGame()),
        stageLoad: (id) => dispatch(actions.loadData(id)),
        showCustomWindow: (type) => dispatch(actions.showCustomWindow(type)),
        addScore: (name, points) => dispatch(actions.addScore(name, points)),
        hideCustomWindow: () => dispatch(actions.hideCustomWindow())
    }
};

CustomWindow = connect(mapStateToProps, mapDispatchToProps)(CustomWindow);

export default CustomWindow;