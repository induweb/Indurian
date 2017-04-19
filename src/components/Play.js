import React from 'react';
import StageButton from './StageButton';
import { connect } from 'react-redux';

import actions from '../actions/actionCreators';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.props.stageLoad();
    }

    componentDidMount() {
        this.props.checkStagesBlocking();
    }

    render () {
        let unlockedList = this.props.unlocked;
        return (
          <div className="play">
            <div className="stage-list">
                {this.props.stagesList.map(function(stage){
                    return <StageButton content={`${stage.id}`} unlocked={unlockedList[stage.id]} key={stage.id}/>;
                })}
            </div>

          </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return {
        stagesList: state.game.stagesData,
        unlocked: state.game.blockingStages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        stageLoad: (id) => dispatch(actions.loadData(id)),
        checkStagesBlocking: () => dispatch(actions.checkStagesBlocking())
    }
};

Play = connect(mapStateToProps, mapDispatchToProps)(Play);

export default Play;