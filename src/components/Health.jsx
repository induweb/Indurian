import React from 'react';

class Health extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="health-bar">
                <span style={{left: this.props.health + 70 + 'px'}}></span>
            </div>
        );
    }
}

export default Health;