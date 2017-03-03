import React from 'react';
import { IndexLink } from 'react-router';

class Menu extends React.Component {
    render() {
        return (
            <nav className="bottom-nav">
                <IndexLink to="/" activeClassName="active"><span className="home-btn nav-btn"></span></IndexLink>
                <IndexLink to="/about" activeClassName="active"><span className="info-btn nav-btn"></span></IndexLink>
                <IndexLink to="/options" activeClassName="active"><span className="config-btn nav-btn"></span></IndexLink>
                <a href="https://www.facebook.com/InduWebPL/" target="_blank"><span className="fb-btn nav-btn"></span></a>
                <IndexLink to="/play" activeClassName="active"><span className="play-btn nav-btn"></span></IndexLink>
            </nav>
        );
    }
}

export default Menu;