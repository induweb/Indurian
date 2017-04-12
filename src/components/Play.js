import React from 'react';
import StageButton from './StageButton';
import { connect } from 'react-redux';

import actions from '../actions/actionCreators';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.props.stageLoad();
    }

    render () {
        console.log(this.props.stagesList);
        return (
          <div className="play">
            <div className="stage-list">
                {this.props.stagesList.map(function(stage){
                    return <StageButton content={`${stage.id}`} key={stage.id}></StageButton>;
                })}
            </div>

          </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return {
        stagesList: state.game.stagesData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        stageLoad: (id) => dispatch(actions.loadData(id))
    }
};

Play = connect(mapStateToProps, mapDispatchToProps)(Play);

export default Play;