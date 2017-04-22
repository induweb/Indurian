import React from 'react';
import Crate from './Crate';
import { connect } from 'react-redux';

class CrateView extends React.Component {
    constructor(props) {
        super(props);
    }

  render () {
    return (
        <div>
            {this.props.blocks.map(data => {
                return (
                    <Crate key={data.key} {...data}/>
                )
            })}
        </div>
    );
  }

}

const mapStateToProps = (state = {}) => {
    return {
        blocks: state.game.blocks
    }
};

CrateView = connect(mapStateToProps)(CrateView);

export default CrateView;