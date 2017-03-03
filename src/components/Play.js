import React from 'react';
import StageButton from './StageButton';

class Play extends React.Component {
  render () {
    return (
      <div className="play">
        <div className="stage-list">
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32].map(function(stage){
              //added temporarily, waiting for state
                return <StageButton content={`${stage}`} key={stage}></StageButton>;
            })}
        </div>

      </div>
    );
  }
}

export default Play;