import React from 'react';

class Lifes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="lifes-bar">
                <span>{this.props.lifes}</span>
            </div>
        );
    }
}

export default Lifes;