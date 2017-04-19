import React from 'react';
import Score from './Score';
import { connect } from 'react-redux';

class Scores extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        console.log(this.props.scores);
        return (
            <div className="options">
                <h1>Najlepsze wyniki</h1>
                <table className="scores-table">
                    <tr>
                        <th>Poz.</th>
                        <th>Imię</th>
                        <th>Punkty</th>
                    </tr>
                    {this.props.scores.map((data, index) => {
                        return (
                            <Score key={index} index={index+1} {...data}/>
                        )
                    })}
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

Scores = connect(mapStateToProps)(Scores);

export default Scores;