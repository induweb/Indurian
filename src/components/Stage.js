import React from 'react';
import WindowHeader from './WindowHeader';
import Wizard from './Wizard';
import Ball from './Ball';
import CrateView from './CrateView';
require('../styles/stage.scss');

const Stage = React.createClass({

    getInitialState: function() {
        return {
            wizardPosition: {
                top: 175
            }
        }
    },

    handleKeyPressed: function(event){
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
                this.setState({
                   wizardPosition: {
                       top: this.state.wizardPosition.top - 5
                   }
                });
                console.log('stage: ',this.state);
                break;
            }
            case 39: {
                console.log('Right');
                break;
            }
            case 40: {
                console.log('Down');
                this.setState({
                    wizardPosition: {
                        top: this.state.wizardPosition.top + 5
                    }
                });
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
    },

    componentWillMount: function(){
        document.addEventListener('keydown', this.handleKeyPressed, false);
    },

    componentWillUnmount: function() {
        document.removeEventListener('keydown', this.handleEscKey, false);
    },

  render: function () {
    const stageID = this.props.params.stageId;

    return (<div className="stage-container">
                <WindowHeader>Poziom #{stageID}</WindowHeader>
                <div className="game-area">
                    <Wizard position={this.state.wizardPosition} />
                    <Ball />
                    <CrateView id={stageID} />
                </div>
             </div>
    );
  }
});

export default Stage;