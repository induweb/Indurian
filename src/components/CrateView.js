import React from 'react';
import Crate from './Crate';
// require('../styles/stage.scss')

class CrateView extends React.Component {
  render () {
    return (
        <div>
          <Crate type="crate-2"></Crate>
          <Crate type="crate-1"></Crate>
          <Crate type="stone"></Crate>
        </div>
    );

  }
}

export default CrateView;