import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/actionCreators';
import KEYCODES from '../constants/keyCodes';

import WindowHeader from './WindowHeader';
import CustomWindow from './CustomWindow';
import Enemies from './Enemies';
import EnemiesSpells from './EnemiesSpells';
import Points from './Points';
import Lifes from './Lifes';
import Mana from './Mana';
import Coins from './Coins';
import Health from './Health';
import Wizard from './Wizard';
import Ball from './Ball';
import Explosion from './Explosion';
import CrateView from './CrateView';
import Spell from './Spell';

require('../styles/stage.scss');

class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.keyInterval = [];

        this.gameLoop = null;
        this.blocksEmpty = false;
        this.enemiesEmpty = false;
        this.spellCounter = 0;
        this.coinCounter = 0;
        this.enemyMovement = 'IDLE';
        this.side = {
            None :0,
            Left : 1,
            Top : 2,
            Right : 3,
            Bottom : 4
        };

        this.props.restartGame();
        this.stageId = props.params.stageId;
        //load stage data
        props.stageLoad(props.params.stageId);
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.params && this.stageId != nextProps.params.stageId) {
            this.stageId = nextProps.params.stageId;
            //load stage data
            this.props.stageLoad(nextProps.params.stageId);
            this.themeSound.play();
            this.spellCounter = 0;
            this.coinCounter = 0;
            this.enemiesEmpty = false;
            this.blocksEmpty = false;
            this.props.hideCustomWindow();
        }
    };

    startGame = () => {
        this.gameLoop = setInterval(() => {
            this.enemyHandler();
            this.coinsHandler();
            this.checkBorderCollision();
            this.checkPaddleCollision();
            this.checkCratesCollision();
            if (this.props.mana < 188) {
                this.props.increaseMana(0.1);
            }
            this.gameWinCheck();
            this.props.loopTick();
        }, 10);
    };

    stopGame = () => {
        clearInterval(this.gameLoop);
        this.gameLoop = null;
        this.setAllEnemiesIdle();
        this.props.decreaseLife();
        this.props.enemiesSpells.map(spell => {
            this.props.removeEnemySpell(spell.id);
        });
        this.props.coins.map(coin => {
            this.props.removeCoin(coin.id);
        });
        if (this.props.lifes === 0) {
            this.gameOver();
        } else {
            setTimeout(()=>{
                this.props.resetBall();
                this.props.resetManaAndHp();
            },1000);
        }
        this.clearAllKeyIntervals();
    };

    explosion = (posTop, posLeft) => {
        this.props.addExplosion(posTop, posLeft);
        setTimeout(() => {
            this.props.removeExplosion();
        }, 1000);
    };

    enemyHandler = () => {
        let enemiesLeft = 0;
        this.props.enemies.map((enemy) => {

            if (enemy.hp <= 0) {
                this.props.deleteEnemy(enemy.key);
                this.props.addPoints(enemy.value);
                this.orcDieSound.play();
                setTimeout(() => {
                    this.wizardLaughSound.play();
                }, 1000);
                return;
            }

            enemiesLeft++;

            if (!enemy.position) {
                return; //bug fix
            }

            let enemyPosition = {
                top: enemy.position.top + enemy.approximation.Y,
                right: enemy.position.right - enemy.approximation.X,
                bottom: enemy.position.bottom - enemy.approximation.Y,
                left: enemy.position.left + enemy.approximation.X
            };

            let collisionWithEnemy = this.checkCollision(enemyPosition);

            if (collisionWithEnemy) {

                this.props.decreaseEnemyHp(enemy.key, 10);
                this.explosion();
                this.orcHitSound.play();

                switch (collisionWithEnemy.side) {
                    case (this.side.Left):
                    case (this.side.Right):
                        this.props.changeDirX();
                        break;

                    case (this.side.Top):
                    case (this.side.Bottom):
                        this.props.changeDirY();

                        break;
                }
            }

            switch (enemy.movingType) {
                case 1:
                    if (this.enemyMovement == 'ATTACK')
                        return;

                    let random = Math.random(); //IDLE, UP, DOWN, ATTACK

                    if (random > 0.99) {
                        this.props.enemyAttack(enemy.key);
                        this.props.addEnemySpell(enemy.key, ++this.spellCounter);
                        this.orcAttackSound.play();
                        this.enemyMovement = 'ATTACK';
                        setTimeout(()=>{
                            if (random > 0.9933) {
                                this.enemyMovement = 'UP';
                            } else if (random > 0.9966 ) {
                                this.enemyMovement = 'DOWN';
                            } else {
                                this.enemyMovement = 'IDLE';
                            }
                            this.props.setEnemyStatus(enemy.key, 'idle');
                        },500);
                    } else if (random < 0.01) { //change attack

                        if (this.enemyMovement == 'IDLE') {
                            this.enemyMovement = random > 0.45 ? 'UP' : 'DOWN';
                        }

                        if (this.enemyMovement == 'UP') {
                            this.enemyMovement = 'DOWN';
                            this.props.enemyMoveDown(enemy.key);
                        } else if (this.enemyMovement == 'DOWN') {
                            this.enemyMovement = 'UP';
                            this.props.enemyMoveUp(enemy.key);
                        }
                    } else {
                        if (this.enemyMovement == 'UP') {
                            this.props.enemyMoveUp(enemy.key);
                        } else if (this.enemyMovement == 'DOWN') {
                            this.props.enemyMoveDown(enemy.key);
                        }
                    }
                    break;
            }

            switch (this.checkCharCollisionWithBorder(enemyPosition)) {
                case this.side.Top:
                    this.enemyMovement = 'DOWN';
                    this.props.enemyMoveDown(enemy.key);
                    break;
                case this.side.Bottom:
                    this.enemyMovement = 'UP';
                    this.props.enemyMoveUp(enemy.key);
                    break;
            }

            let collisionEnemyWithSpell  = this.checkSpellCollision(enemyPosition);
            if (collisionEnemyWithSpell) {
                this.props.decreaseEnemyHp(enemy.key, 10);
                this.explosion(this.props.spell.top - 10, this.props.spell.width + 80);
                this.clearKeyInterval(KEYCODES.RIGHT);
                this.props.castStop();
            }
        });

        if (this.props.enemiesSpells.length) {
            this.moveAllEnemiesSpells();
            this.props.enemiesSpells.map(spell => {
                this.checkEnemiesSpellCollisionWithBorder(spell.left, spell.id);
            });
        }


        if (enemiesLeft === 0) {
            this.enemiesEmpty = true;
        }
    };

    setAllEnemiesIdle = () => {
        this.props.enemies.map((enemy) => {
            this.props.setEnemyStatus(enemy.key, 'idle');
        });
    };

    moveAllEnemiesSpells = () => {
        this.props.moveEnemySpell();
    };

    moveAllCoins = () => {
        this.props.moveCoin();
    };

    coinsHandler = () => {
        if (this.props.coins.length) {
            this.moveAllCoins();
            this.props.coins.map(coin => {
                this.checkCoinsCollisionWithBorder(coin.left, coin.id);
            });
        }
    };

    checkCharCollisionWithBorder = (position) => {
        if (position.top <= this.props.area.minY) {
            return this.side.Top;
        }
        if (position.bottom >= this.props.area.maxY) {
            return this.side.Bottom;
        }
    };

    checkEnemiesSpellCollisionWithBorder = (spellLeft, id) => {
        if (spellLeft <= this.props.area.minX ) {
            this.props.removeEnemySpell(id);
        }
    };

    checkCoinsCollisionWithBorder = (coinLeft, id) => {
        if (coinLeft <= this.props.area.minX ) {
            this.props.removeCoin(id);
        }
    };

    pauseGame = () => {
        if (this.props.customWindow.display == 'none') {
            clearInterval(this.gameLoop);
            this.setAllEnemiesIdle();
            this.gameLoop = null;
            this.props.showCustomWindow('pause');
        }
    };

    gameOver = () => {
        this.props.showCustomWindow('gameOver');
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
                if (!this.gameLoop ) {
                    return;
                }
                if (data) {
                    if (!this.keyInterval[KEYCODES.UP]) {
                        this.clearAllKeyIntervals();
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
                if (!this.gameLoop ) {
                    return;
                }
                if (data) {
                    if (!this.keyInterval[KEYCODES.DOWN]) {
                        this.clearAllKeyIntervals();
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
                if (data) {
                    if (!this.keyInterval[KEYCODES.RIGHT]) {
                        this.clearAllKeyIntervals();
                        this.keyInterval[KEYCODES.RIGHT] = setInterval(()=>{
                            if (this.props.mana <= 0) {
                                this.clearKeyInterval(KEYCODES.RIGHT);
                                this.props.castStop();
                                return;
                            }
                            this.props.spellCasting();
                            this.props.decreaseMana(1);
                            this.wizardSpellSound.play();
                        }, 25);
                    }
                } else {
                    this.clearKeyInterval(KEYCODES.RIGHT);
                    this.props.castStop();
                }
                break;
            }
        }

        switch (this.checkCharCollisionWithBorder(this.props.wizard.paddle)) {
            case this.side.Top:
                this.clearKeyInterval(KEYCODES.UP);
                break;
            case this.side.Bottom:
                this.clearKeyInterval(KEYCODES.DOWN);
                break;
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
            this.wizardDieSound.play();
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
                return wy > -hx ? {side: this.side.Bottom, distance: distance} : {side: this.side.Left, distance: distance};
            } else {
                return wy > -hx ? {side: this.side.Right, distance: distance} : {side: this.side.Top, distance: distance};
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

            this.paddleSound.play();
            this.bounceWithAngle(this.calculateHitAngle());
        }

        this.props.enemiesSpells.map(spell => {
            let spellPosition = {
                top: spell.top + 10,
                right: spell.left + 10,
                bottom:  spell.top + 20,
                left: spell.left
            };

            let collisionWithEnemiesSpell = this.checkCollision(spellPosition,this.props.wizard.paddle);
            if (collisionWithEnemiesSpell.side) {
                this.props.decreaseHp(47);
                this.explosion(spellPosition.top - 10, spellPosition.left);
                this.wizardHitSound.play();
                this.props.removeEnemySpell(spell.id);
            }
        });

        this.props.coins.map(coin => {
            let coinPosition = {
                top: coin.top,
                right: coin.left + 25,
                bottom:  coin.top + 25,
                left: coin.left
            };

            let collisionWithCoin = this.checkCollision(coinPosition,this.props.wizard.paddle);
            if (collisionWithCoin.side) {
                this.props.addPoints(30);
                this.coinSound.play();
                this.props.removeCoin(coin.id);
            }
        });

        if (this.props.health <= 0) {
            this.stopGame();
            this.wizardDieSound.play();
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
        let blocksLeft = 0;
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

                blocksLeft++;

                if (this.keyInterval[KEYCODES.RIGHT]) {
                    if (this.checkSpellCollision(position)) {
                        if (block.value > 1) {
                            this.props.decreaseCrateValue(block.key);
                        } else {
                            this.props.hideCrate(block.key);
                            this.explosion(block.top - 10, block.left + 20);

                            this.explosionSound.pause();
                            this.explosionSound.currentTime = 0;
                            this.explosionSound.play();
                            let random = Math.random();
                            if (random > 0.7)
                                this.props.addCoin(block.key, ++this.coinCounter);
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
                this.explosion(chosenBlock.top - 10, chosenBlock.left + 20);
                this.props.hideCrate(chosenBlock.key);
                this.explosionSound.pause();
                this.explosionSound.currentTime = 0;
                this.explosionSound.play();
                let random = Math.random();
                if (random > 0.7)
                    this.props.addCoin(chosenBlock.key, ++this.coinCounter);
            }
        }

        if (blocksLeft === 0) {
            this.blocksEmpty = true;
        }
    };

    gameWinCheck = () => {
        if (this.blocksEmpty && this.enemiesEmpty) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
            this.spellCounter = 0;
            this.coinCounter = 0;
            this.enemiesEmpty = false;
            this.blocksEmpty = false;
            this.props.resetBall();
            this.clearAllKeyIntervals();
            this.props.unlockStage(parseInt(this.props.params.stageId) + 1);
            this.props.showCustomWindow('win');
            this.themeSound.pause();
            this.gameWinSound.play();
        }
    };

    loadSounds = () => {
        this.paddleSound = new Audio('../sounds/paddle.mp3');

        this.explosionSound = new Audio('../sounds/explosion.mp3');
        this.gameWinSound = new Audio('../sounds/game-win.mp3');
        this.themeSound = new Audio('../sounds/brave-soldiers.mp3');
        this.coinSound = new Audio('../sounds/coin.mp3');
        this.coinSound.volume = 0.5;
        this.themeSound.volume = 0.5;
        this.themeSound.addEventListener('ended', () => {
            this.themeSound.currentTime = 0;
            this.themeSound.play();
        }, false);
        this.wizardHitSound = new Audio('../sounds/wizard-hit.mp3');
        this.wizardDieSound = new Audio('../sounds/wizard-die.mp3');
        this.wizardLaughSound = new Audio('../sounds/wizard-laugh.mp3');
        this.wizardSpellSound = new Audio('../sounds/wizard-spell.mp3');
        this.orcHitSound = new Audio('../sounds/orc-hit.mp3');
        this.orcDieSound = new Audio('../sounds/orc-die.mp3');
        this.orcAttackSound = new Audio('../sounds/orc-attack.mp3');
    };

    componentWillMount(){
        document.addEventListener('keydown', this.keyHandler.bind(this, true));
        document.addEventListener('keyup', this.keyHandler.bind(this, false));
    }

    componentDidMount(){
        this.loadSounds();
        this.themeSound.play();
    }

    componentWillUnmount() {
        clearInterval(this.gameLoop);
        document.removeEventListener('keydown', this.keyHandler.bind(this, true));
        document.removeEventListener('keyup', this.keyHandler.bind(this, false));
        this.themeSound.pause();
        this.gameWinSound.pause();
    }

    render() {
        const stageID = this.props.params.stageId;
        return (<div className="stage-container" key={stageID}>
                    <WindowHeader>Poziom #{stageID}</WindowHeader>
                    <div className="game-area">
                        <Wizard wizardPosition={this.props.wizard.positionTop} wizardState={this.props.wizard.status} />
                        <Spell width={this.props.spell.width} top={this.props.spell.top} display={this.props.spell.display} />
                        <Ball top={this.props.ball.position.top}
                              left={this.props.ball.position.left}
                        />
                        {this.props.explosion.map((data, index) => {
                            return (
                                <Explosion key={index} explosion={data}/>
                            )
                        })}
                        <CrateView id={stageID} />
                        <Enemies id={stageID} />
                        <EnemiesSpells id={stageID} />
                        <Coins />
                    </div>
                    <CustomWindow display={this.props.customWindow.display} id={stageID}/>
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
        customWindow: state.game.customWindow,
        explosion: state.game.explosion,
        enemies: state.game.enemies,
        enemiesSpells: state.game.enemiesSpells,
        coins: state.game.coins
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        stageLoad: (id) => dispatch(actions.loadData(id)),
        wizardIdle: () => dispatch(actions.wizardIdle()),
        wizardMoveUp: () => dispatch(actions.wizardMoveUp()),
        wizardMoveDown: () => dispatch(actions.wizardMoveDown()),
        enemyMoveUp: (id) => dispatch(actions.enemyMoveUp(id)),
        enemyMoveDown: (id) => dispatch(actions.enemyMoveDown(id)),
        enemyAttack: (id) => dispatch(actions.enemyAttack(id)),
        deleteEnemy: (id) => dispatch(actions.deleteEnemy(id)),
        addEnemySpell: (id, counter) => dispatch(actions.addEnemySpell(id, counter)),
        moveEnemySpell: () => dispatch(actions.moveEnemySpell()),
        removeEnemySpell: (id) => dispatch(actions.removeEnemySpell(id)),
        addCoin: (id, counter) => dispatch(actions.addCoin(id, counter)),
        moveCoin: () => dispatch(actions.moveCoin()),
        removeCoin: (id) => dispatch(actions.removeCoin(id)),
        setEnemyStatus: (id, value) => dispatch(actions.setEnemyStatus(id, value)),
        decreaseEnemyHp: (id, value) => dispatch(actions.decreaseEnemyHp(id, value)),
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
        unlockStage: (id) => dispatch(actions.unlockStage(id)),
        addPoints: (points) => dispatch(actions.addPoints(points)),
        addExplosion: (top, left) => dispatch(actions.addExplosion(top, left)),
        removeExplosion: () => dispatch(actions.removeExplosion()),
        restartGame: () => dispatch(actions.restartGame()),
        showCustomWindow: (type) => dispatch(actions.showCustomWindow(type)),
        hideCustomWindow: () => dispatch(actions.hideCustomWindow()),
        resetManaAndHp: () => dispatch(actions.resetManaAndHp()),
        increaseMana: (value) => dispatch(actions.increaseMana(value)),
        decreaseMana: (value) => dispatch(actions.decreaseMana(value)),
        decreaseHp: (value) => dispatch(actions.decreaseHp(value))
    }
};

Stage = connect(mapStateToProps, mapDispatchToProps)(Stage);

export default Stage;