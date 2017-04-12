import React from 'react';

class Health extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="health-bar">
                {/*<H2Header>{this.props.children}</H2Header>*/}
            </div>
        );
    }
}

export default Health;