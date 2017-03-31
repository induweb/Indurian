import React from 'react';
import Crate from './Crate';
import { connect } from 'react-redux';
// import stagesData from 'json-loader!../sources/data.json';
// require('../styles/stage.scss')

class CrateView extends React.Component {
  render () {
      let stageData = this.props.stages[this.props.id - 1];
    return (
        <div>
            {stageData.blocks.map(data => ( <Crate {...data}/> ))}
        </div>
    );

  }
}

const mapStateToProps = (state = {}) => {
    return {
        stages:state.stages
    }
};

CrateView = connect(mapStateToProps)(CrateView);

export default CrateView;