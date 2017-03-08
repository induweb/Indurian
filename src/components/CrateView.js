import React from 'react';
import Crate from './Crate';
import stagesData from 'json-loader!../sources/data.json';
// require('../styles/stage.scss')

class CrateView extends React.Component {
  render () {
      let stageData = stagesData.stages[this.props.id - 1];
    return (
        <div>
            {stageData.blocks.map(data => ( <Crate {...data}></Crate> ))}
        </div>
    );

  }
}

export default CrateView;