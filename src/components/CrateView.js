import React from 'react';
import Crate from './Crate';
// require('../styles/stage.scss')

class CrateView extends React.Component {
  render () {
    return (
        <div>
          <Crate type="crate-2" left="500" top="100"></Crate>
          <Crate type="crate-1" left="540" top="200"></Crate>
          <Crate type="stone" left="500" top="300"></Crate>
        </div>
    );

  }
}

export default CrateView;