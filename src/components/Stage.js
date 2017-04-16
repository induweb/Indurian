import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/actionCreators';
import KEYCODES from '../constants/keyCodes';

import WindowHeader from './WindowHeader';
import CustomWindow from './CustomWindow';
import Points from './Points';
import Lifes from './Lifes';
import Mana from './Mana';
import Health from './Health';
import Wizard from './Wizard';
import Ball from './Ball';
import CrateView from './CrateView';
import Spell from './Spell';

require('../styles/stage.scss');

class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.keyInterval = [];

        this.gameLoop = null;
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

    startGame = () => {
        this.gameLoop = setInterval(() => {
            this.checkBorderCollision();
            this.checkPaddleCollision();
            this.checkCratesCollision();
            if (this.props.mana < 188) {
                this.props.increaseMana(0.1);
            }
            this.props.loopTick();
        }, 10);
    };

    stopGame = () => {
        clearInterval(this.gameLoop);
        this.gameLoop = null;
        this.props.decreaseLife();
        if (this.props.lifes === 0) {
            this.gameOver();
        } else {
            setTimeout(()=>{
                this.props.resetBall();
            },500);
        }
        this.clearAllKeyIntervals();
    };

    pauseGame = () => {
        if (this.props.customWindow.display == 'none') {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
            this.props.showCustomWindow('pause');
        }
    };

    gameOver = () => {
        console.log('GAME OVER!');
    };

    keyHandler = (data, event) => {
        switch (event.keyCode) {
            case KEYCODES.SPACE: {
                if (!this.gameLoop && this.props.lifes > 0 && data && this.props.customWindow.display == 'none') {
                    this.startGame();
                }
                break;
            }
            case KEYCODES.ESC: {
                if (data)
                    this.pauseGame();
                break;
            }
            case KEYCODES.UP: {
                if (this.keyInterval[KEYCODES.RIGHT] || !this.gameLoop ) {
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
                if (this.keyInterval[KEYCODES.RIGHT] || !this.gameLoop ) {
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
                if (!this.gameLoop) {
                    return;
                }
                if (this.keyInterval[KEYCODES.DOWN]) {
                    this.clearKeyInterval(KEYCODES.DOWN);
                }
                if (this.keyInterval[KEYCODES.UP]) {
                    this.clearKeyInterval(KEYCODES.UP);
                }

                if (data) {
                    if (!this.keyInterval[KEYCODES.RIGHT]) {

                        this.keyInterval[KEYCODES.RIGHT] = setInterval(()=>{
                            if (this.props.mana <= 0) {
                                this.clearKeyInterval(KEYCODES.RIGHT);
                                this.props.castStop();
                                return;
                            }
                            this.props.spellCasting();
                            this.props.decreaseMana(1);
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

    clearAllKeyIntervals = () => {
        if (this.keyInterval[KEYCODES.DOWN]) {
            this.clearKeyInterval(KEYCODES.DOWN);
        }
        if (this.keyInterval[KEYCODES.UP]) {
            this.clearKeyInterval(KEYCODES.UP);
        }
        if (this.keyInterval[KEYCODES.RIGHT]) {
            this.clearKeyInterval(KEYCODES.RIGHT);
            this.props.castStop();
        }
    };

    checkBorderCollision = () => {
        if (this.props.ball.position.left + this.props.ball.dirX <= this.props.area.minX) {
            this.props.changeDirX();
            this.stopGame();
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


    checkCollision = (objectPosition, mainElementPosition) => {
        let mainElementPos = mainElementPosition || this.props.ball.position;
        let w = 0.5 * (this.width(mainElementPos) + this.width(objectPosition));
        let h = 0.5 * (this.height(mainElementPos) + this.height(objectPosition));
        let dx = this.centerX(mainElementPos) - this.centerX(objectPosition);
        let dy = this.centerY(mainElementPos) - this.centerY(objectPosition);

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

    checkSpellCollision = (objectPosition) => {
        let spellPosition = {
            top: this.props.spell.top,
            right: this.props.spell.width + 80,
            bottom: this.props.spell.top + 10,
            left: 80
        };

        return this.checkCollision(objectPosition, spellPosition);
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

                if (this.keyInterval[KEYCODES.RIGHT]) {
                    if (this.checkSpellCollision(position)) {
                        if (block.value > 1) {
                            this.props.decreaseCrateValue(block.key);
                        } else {
                            this.props.hideCrate(block.key);
                        }
                        this.props.addPoints(10);
                        this.clearKeyInterval(KEYCODES.RIGHT);
                        this.props.castStop();
                    }
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
            this.props.addPoints(10);
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
        // this.gameLoop = setInterval(() => {
        //     this.checkBorderCollision();
        //     this.checkPaddleCollision();
        //     this.checkCratesCollision();
        //     this.props.loopTick();
        // }, 10);
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
                    <CustomWindow display={this.props.customWindow.display}/>
                    <Points points={this.props.points}/>
                    <Lifes lifes={this.props.lifes}/>
                    <Mana mana={this.props.mana}/>
                    <Health health={this.props.health}/>
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
        blocks: state.game.blocks,
        lifes: state.game.lifes,
        points: state.game.points,
        mana: state.game.mana,
        health: state.game.health,
        customWindow: state.game.customWindow
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
        resetBall: () => dispatch(actions.resetBall()),
        changeDirX: () => dispatch(actions.changeDirX()),
        changeDirXWithParam: (param) => dispatch(actions.changeDirXWithParam(param)),
        changeDirY: () => dispatch(actions.changeDirY()),
        decreaseLife: () => dispatch(actions.decreaseLife()),
        changeDirYWithParam: (param) => dispatch(actions.changeDirYWithParam(param)),
        decreaseCrateValue: (id) => dispatch(actions.decreaseCrateValue(id)),
        hideCrate: (id) => dispatch(actions.hideCrate(id)),
        addPoints: (points) => dispatch(actions.addPoints(points)),
        showCustomWindow: (type) => dispatch(actions.showCustomWindow(type)),
        hideCustomWindow: () => dispatch(actions.hideCustomWindow()),
        increaseMana: (value) => dispatch(actions.increaseMana(value)),
        decreaseMana: (value) => dispatch(actions.decreaseMana(value))
    }
};

Stage = connect(mapStateToProps, mapDispatchToProps)(Stage);

export default Stage;