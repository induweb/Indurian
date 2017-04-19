import React from 'react';
require('../styles/layout.scss');

class Crate extends React.Component {

  render () {
    return (
        <tr>
            <td>{this.props.index}.</td>
            <td>{this.props.name}</td>
            <td>{this.props.score}</td>
        </tr>
    );
  }
}

export default Crate;