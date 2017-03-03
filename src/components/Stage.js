import React from 'react';
import Wizard from './Wizard';
import Ball from './Ball';
import Paddle from './Paddle';
import CrateView from './CrateView';
require('../styles/stage.scss');

class Stage extends React.Component {

    _handleKeyPressed(event){
        // console.log(event.keyCode);
        switch (event.keyCode) {
            case 27: {
                console.log('Escape');
                break;
            }
            case 37: {
                console.log('Left');
                break;
            }
            case 38: {
                console.log('Up');
                break;
            }
            case 39: {
                console.log('Right');
                break;
            }
            case 40: {
                console.log('Down');
                break;
            }
            case 32: {
                console.log('Space');
                break;
            }
            case 65: {
                console.log('A');
                break;
            }
            case 83: {
                console.log('S');
                break;
            }
            case 68: {
                console.log('D');
                break;
            }
        }
    }

    componentWillMount(){
        document.addEventListener('keydown', this._handleKeyPressed, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleEscKey, false);
    }

  render () {

    return (<div className="stage-container">
          <div className="game-area">
            <p>{`Stage id is: ${this.props.params.stageId}`}</p>
            <Wizard></Wizard>
            <Ball></Ball>
            <Paddle></Paddle>
              <CrateView ></CrateView>
          </div>

        </div>
    );
  }
}

export default Stage;