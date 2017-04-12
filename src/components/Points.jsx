import React from 'react';

class Points extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="points-bar">
                <span>{this.props.points}</span>
            </div>
        );
    }
}

export default Points;