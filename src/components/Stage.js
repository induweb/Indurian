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
        this.side = {
            None :0,
            Left : 1,
            Top : 2,
            Right : 3,
            Bottom : 4
        };

        //load stage data
        props.stageLoad(props.params.stageId);
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
        this.props.wizardIdle();
    };

    checkBorderCollision = () => {
        if (this.props.ball.position.left + this.props.ball.dirX <= this.props.area.minX) {
            this.props.changeDirX();
        }
        if (this.props.ball.position.top + this.props.ball.dirY <= this.props.area.minY) {
            this.props.changeDirY();
        }
        if (this.props.ball.position.right + this.props.ball.dirX >= this.props.area.maxX) {
            this.props.changeDirX();
        }
        if (this.props.ball.position.bottom + this.props.ball.dirY >= this.props.area.maxY) {
            this.props.changeDirY();
        }
    };

    centerX(objectPosition) {
        return (objectPosition.left + objectPosition.right) / 2;
    }

    centerY(objectPosition) {
        return (objectPosition.top + objectPosition.bottom) / 2;
    }

    width(objectPosition) {
        return objectPosition.right - objectPosition.left;
    }

    height(objectPosition) {
        return objectPosition.bottom - objectPosition.top;
    }


    checkCollision = (objectPosition) => {

        let w = 0.5 * (this.width(this.props.ball.position) + this.width(objectPosition));
        let h = 0.5 * (this.height(this.props.ball.position) + this.height(objectPosition));
        let dx = this.centerX(this.props.ball.position) - this.centerX(objectPosition);
        let dy = this.centerY(this.props.ball.position) - this.centerY(objectPosition);

        if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
            let wy = w * dy;
            let hx = h * dx;
            let distance = Math.abs(dx) + Math.abs(dy);

            if (wy > hx) {
                return wy > -hx ? {side: this.side.Top, distance: distance} : {side: this.side.Left, distance: distance};
            } else {
                return wy > -hx ? {side: this.side.Right, distance: distance} : {side: this.side.Bottom, distance: distance};
            }
        } else {
            return this.side.None;
        }
    };

    bounceWithAngle = (angle) => {
        angle = angle * (Math.PI / 180);
        // this.props.changeDirX();
        this.props.changeDirXWithParam(Math.sin(angle) * 4); //ball speed param
        this.props.changeDirYWithParam(-Math.cos(angle) * 4); //ball speed param
    };

    calculateHitAngle = () => {
        let ball = this.props.ball;
        let paddlePosition = this.props.wizard.paddle;

        let ballY = this.centerY(ball.position);
        let hitSpot = ballY - paddlePosition.bottom;
        let maxPaddle = this.height(paddlePosition) + ball.radius;
        let minPaddle = -ball.radius;
        let paddleRange = maxPaddle - minPaddle;

        let minAngle = 60;
        let maxAngle = 120;
        let angleRange = maxAngle - minAngle;

        return (((this.height(paddlePosition) - Math.abs(hitSpot)) * angleRange) / paddleRange) + minAngle;
    };

    checkPaddleCollision = () => {
        if (this.checkCollision(this.props.wizard.paddle).side) {
            this.bounceWithAngle(this.calculateHitAngle());
        }
    };

    checkCratesCollision = () => {
        let blocks = this.props.blocks;
        let closestBlock = {
            distance: 9999
        };
        let chosenBlock;
        let wasHit = false;
        blocks.forEach((block)=> {
            if (block.value !== 0) {

                let position = {
                    top: block.top,
                    right: block.left + 40,
                    bottom: block.top + 40,
                    left: block.left
                };

                let collision = this.checkCollision(position);

                if (collision.distance < closestBlock.distance) {
                    closestBlock = collision;
                    chosenBlock = block;
                }
            }
        });

        switch (closestBlock.side) {
            case (this.side.Left):
            case (this.side.Right):
                this.props.changeDirX();
                wasHit = true;
                break;

            case (this.side.Top):
            case (this.side.Bottom):
                this.props.changeDirY();
                wasHit = true;
                break;
        }

        if (wasHit) {
            if (chosenBlock.value > 1) {
                this.props.decreaseCrateValue(chosenBlock.key);
            } else {
                this.props.hideCrate(chosenBlock.key);
            }
        }
    };

    componentWillMount(){
        document.addEventListener('keydown', this.keyHandler.bind(this, true));
        document.addEventListener('keyup', this.keyHandler.bind(this, false));
    }

    componentDidMount(){
        this.gameLoop = setInterval(() => {
            this.checkBorderCollision();
            this.checkPaddleCollision();
            this.checkCratesCollision();
            this.props.loopTick();
        }, 10);
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
                        <Ball top={this.props.ball.position.top} left={this.props.ball.position.left}/>
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
        area: state.game.area,
        blocks: state.game.blocks
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        stageLoad: (id) => dispatch(actions.loadData(id)),
        wizardIdle: () => dispatch(actions.wizardIdle()),
        wizardMoveUp: () => dispatch(actions.wizardMoveUp()),
        wizardMoveDown: () => dispatch(actions.wizardMoveDown()),
        spellCasting: () => dispatch(actions.spellCasting()),
        castStop: () => dispatch(actions.castStop()),
        loopTick: () => dispatch(actions.loopTick()),
        changeDirX: () => dispatch(actions.changeDirX()),
        changeDirXWithParam: (param) => dispatch(actions.changeDirXWithParam(param)),
        changeDirY: () => dispatch(actions.changeDirY()),
        changeDirYWithParam: (param) => dispatch(actions.changeDirYWithParam(param)),
        decreaseCrateValue: () => dispatch(actions.decreaseCrateValue()),
        hideCrate: (id) => dispatch(actions.hideCrate(id))
    }
};

Stage = connect(mapStateToProps, mapDispatchToProps)(Stage);

export default Stage;