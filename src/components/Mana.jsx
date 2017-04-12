import React from 'react';

class Mana extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mana-bar">
                <span style={{left: this.props.mana + 70 + 'px'}}></span>
            </div>
        );
    }
}

export default Mana;