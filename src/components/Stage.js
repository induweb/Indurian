import React from 'react';
import WindowHeader from './WindowHeader';
import Wizard from './Wizard';
import Ball from './Ball';
import CrateView from './CrateView';
import Spell from './Spell';
require('../styles/stage.scss');

class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wizardPosition: {
                top: 175
            },
            spellPosition: {
                left: 50,
                top: -10
            },
            wizardState: 'idle'
        };

        this.interval = null;
    }

    handleKeyPressed(event){
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
                let spellPositionTop =  this.state.wizardPosition.top + 20;
                console.log(typeof this.interval);
                clearInterval(this.interval);

                if (!this.interval) {
                    this.interval = setInterval(()=>{
                        if (this.state.spellPosition.left > 800) {
                            clearInterval(this.interval);
                            this.interval = null;
                            this.setState({
                                spellPosition: {
                                    left: 60,
                                    top: -10
                                },
                                wizardState: 'idle'
                            });
                            return;
                        }
                        this.setState({
                            spellPosition: {
                                left: this.state.spellPosition.left + 5,
                                top: spellPositionTop
                            },
                            wizardState: 'attack'
                        });
                    }, 15);
                }

                break;
            }
            case 40: {
                console.log('Down');
                console.log(this);
                console.log(this.state);
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
    }

    componentWillMount(){
         console.log(this.state);
        document.addEventListener('keydown', this.handleKeyPressed.bind(this), false);
        // document.addEventListener('keyup', this.handleKeyUp, false);
    }

    componentWillUnmount() {
        // document.removeEventListener('keydown', this.handleEscKey, false);
    }

    render() {
        const stageID = this.props.params.stageId;
        return (<div className="stage-container">
                    <WindowHeader>Poziom #{stageID}</WindowHeader>
                    <div className="game-area">
                        <Wizard wizardPosition={this.state.wizardPosition} wizardState={this.state.wizardState} spellPosition={this.state.spellPosition} />
                        <Spell left={this.state.spellPosition.left} top={this.state.spellPosition.top}/>
                        <Ball />
                        <CrateView id={stageID} />
                    </div>
                 </div>
        );
    }
}

export default Stage;