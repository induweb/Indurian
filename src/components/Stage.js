import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/actionCreators';
import KEYCODES from '../constants/keyCodes';

import WindowHeader from './WindowHeader';
import Wizard from './Wizard';
import Ball from './Ball';
import CrateView from './CrateView';
import Spell from './Spell';

require('../styles/stage.scss');

class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.keyInterval = [];

        this.gameLoop = function () {};

        //load stage data
        props.stageLoad();
    }

    keyHandler = (data, event) => {

        switch (event.keyCode) {
            case KEYCODES.UP: {
                if (this.keyInterval[KEYCODES.RIGHT]) {
                    return;
                }
                if (data) {
                    if (!this.keyInterval[KEYCODES.UP]) {
                        if (this.keyInterval[KEYCODES.DOWN]) {
                            this.clearKeyInterval(KEYCODES.DOWN);
                        }
                        this.keyInterval[KEYCODES.UP] = setInterval(()=>{
                            this.props.wizardMoveUp();
                        }, 25);
                    }
                } else {
                    this.clearKeyInterval(KEYCODES.UP);
                }
                break;
            }
            case KEYCODES.DOWN: {
                if (this.keyInterval[KEYCODES.RIGHT]) {
                    return;
                }
                if (data) {
                    if (!this.keyInterval[KEYCODES.DOWN]) {
                        if (this.keyInterval[KEYCODES.UP]) {
                            this.clearKeyInterval(KEYCODES.UP);
                        }
                        this.keyInterval[KEYCODES.DOWN] = setInterval(()=>{
                            this.props.wizardMoveDown();
                        }, 25);
                    }
                } else {
                    this.clearKeyInterval(KEYCODES.DOWN);
                }
                break;
            }
            case KEYCODES.RIGHT: {
                if (this.keyInterval[KEYCODES.DOWN]) {
                    this.clearKeyInterval(KEYCODES.DOWN);
                }
                if (this.keyInterval[KEYCODES.UP]) {
                    this.clearKeyInterval(KEYCODES.UP);
                }

                if (data) {
                    if (!this.keyInterval[KEYCODES.RIGHT]) {

                        this.keyInterval[KEYCODES.RIGHT] = setInterval(()=>{
                            this.props.spellCasting();
                        }, 25);
                    }
                } else {
                    this.clearKeyInterval(KEYCODES.RIGHT);
                    this.props.castStop();
                }
                break;
            }
        }
    };

    clearKeyInterval = (keyCode) => {
        clearInterval(this.keyInterval[keyCode]);
        this.keyInterval[keyCode] = null;
    };

    checkBorderCollision = () => {
        if (this.props.ball.positionLeft + this.props.ball.dirX <- this.props.area.minX) {
            this.props.changeDirX();
        }
        if (this.props.ball.positionTop + this.props.ball.dirY <= this.props.area.minY) {
            this.props.changeDirY();
        }
        if (this.props.ball.positionLeft + this.props.ball.dirX + this.props.ball.radius * 2 >= this.props.area.maxX) {
            this.props.changeDirX();
        }
        if (this.props.ball.positionTop + this.props.ball.dirY + this.props.ball.radius * 2 >= this.props.area.maxY) {
            this.props.changeDirY();
        }
    };

    componentWillMount(){
        document.addEventListener('keydown', this.keyHandler.bind(this, true));
        document.addEventListener('keyup', this.keyHandler.bind(this, false));
    }

    componentDidMount(){
        this.gameLoop = setInterval(() => {
            this.checkBorderCollision();
            this.props.loopTick();
        }, 20);
    }

    componentWillUnmount() {
        clearInterval(this.gameLoop);
        document.removeEventListener('keydown', this.keyHandler.bind(this, true));
        document.removeEventListener('keyup', this.keyHandler.bind(this, false));
    }

    render() {
        // console.log('pppp', this.props);
        const stageID = this.props.params.stageId;
        return (<div className="stage-container">
                    <WindowHeader>Poziom #{stageID}</WindowHeader>
                    <div className="game-area">
                        <Wizard wizardPosition={this.props.wizard.positionTop} wizardState={this.props.wizard.status} />
                        <Spell width={this.props.spell.width} top={this.props.spell.top} display={this.props.spell.display} />
                        <Ball top={this.props.ball.positionTop} left={this.props.ball.positionLeft}/>
                        <CrateView id={stageID} />
                    </div>
                 </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        wizard:state.game.wizard,
        spell: state.game.spell,
        ball: state.game.ball,
        area: state.game.area
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        stageLoad: () => dispatch(actions.loadData()),
        wizardMoveUp: () => dispatch(actions.wizardMoveUp()),
        wizardMoveDown: () => dispatch(actions.wizardMoveDown()),
        spellCasting: () => dispatch(actions.spellCasting()),
        castStop: () => dispatch(actions.castStop()),
        loopTick: () => dispatch(actions.loopTick()),
        changeDirX: () => dispatch(actions.changeDirX()),
        changeDirY: () => dispatch(actions.changeDirY())

    }
};

Stage = connect(mapStateToProps, mapDispatchToProps)(Stage);

export default Stage;