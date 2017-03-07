import React from 'react';
import Crate from './Crate';
import stagesData from 'json-loader!../sources/data.json';
// require('../styles/stage.scss')

class CrateView extends React.Component {
  render () {
      let stageData = stagesData.stages[this.props.id - 1];
    return (
        <div>
            {stageData.blocks.map(function(data){
                return <Crate type={data.type} left={data.left} top={data.top} key={data.id}></Crate>
            })}
        </div>
    );

  }
}

export default CrateView;