import React from 'react';
import Score from './Score';
import actions from '../actions/actionCreators';
import { connect } from 'react-redux';

class Scores extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getScores();
    }

    render () {
        console.log(this.props.scores);
        return (
            <div className="options">
                <h1>Najlepsze wyniki</h1>
                <table className="scores-table">
                    <thead>
                        <tr>
                            <th>Poz.</th>
                            <th>Imię</th>
                            <th>Punkty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.scores.map((data, index) => {
                            if (index < 10) {
                                return (
                                    <Score key={index} index={index+1} {...data}/>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return {
        scores: state.game.topScores
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getScores: () => dispatch(actions.getScores())
    }
};

Scores = connect(mapStateToProps, mapDispatchToProps)(Scores);

export default Scores;