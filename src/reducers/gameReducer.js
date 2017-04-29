import ACTIONS from '../constants/actions';

const initialState = {
    stagesData: [],
    blocks: [],
    blockingStages: {
        1: 'unlocked'
    },
    lifes: 3,
    points: 0,
    mana: 188,
    health: 100,
    wizard: {
        positionTop: 175,
        status: 'idle',
        paddle: {
            top: 175,
            right: 105,
            bottom: 248,
            left: 101
        }
    },
    spell: {
        width: 0,
        top: 0,
        display: 'none'
    },
    ball: {
        radius: 8,
        position: {
            top: 205,
            bottom: 221,
            left: 120,
            right: 136
        },
        dirX: 3,
        dirY: 3
    },
    explosion: [],
    enemies: [],
    enemiesSpells: [],
    area: {
        minX: 0,
        minY: 0,
        maxX: 750,
        maxY: 444
    },
    customWindow: {
        display: 'none',
        type: ''
    },
    topScores: []
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_DATA:
            return {
                ...state,
                stagesData: action.payload.stages,
                blocks: action.id ? action.payload.stages[action.id - 1].blocks : [],
                enemies: action.id ? action.payload.stages[action.id - 1].enemies : []
            };

        case ACTIONS.UPDATE_STAGE_BLOCK_LIST:
            return {...state,
                blockingStages: action.payload.stagesBlocking ? action.payload.stagesBlocking : initialState.blockingStages
            };

        case ACTIONS.WIZARD_IDLE:
            return {...state, wizard: {...state.wizard, status: action.payload.status}};

        case ACTIONS.WIZARD_MOVE_UP:
            return {...state, wizard: {
                positionTop: state.wizard.positionTop + action.payload.positionMove,
                status: action.payload.status,
                paddle: {
                    ...state.wizard.paddle,
                    top: state.wizard.positionTop + action.payload.positionMove,
                    bottom: state.wizard.positionTop + action.payload.positionMove + 73
                }
            }};

        case ACTIONS.WIZARD_MOVE_DOWN:
            return {...state, wizard: {
                positionTop: state.wizard.positionTop + action.payload.positionMove,
                status: action.payload.status,
                paddle: {
                    ...state.wizard.paddle,
                    top: state.wizard.positionTop + action.payload.positionMove,
                    bottom: state.wizard.positionTop + action.payload.positionMove + 73
                }
            }};

        case ACTIONS.DECREASE_ENEMY_HP:

            let newStateEnemiesDecreaseHp = {
                ...state.enemies[action.payload.id],
                hp: state.enemies[action.payload.id].hp - action.payload.value
            };
            let indexEnemyDecreaseHp = action.payload.id;
            let enemiesDecreaseHp = [ ...state.enemies.slice(0,indexEnemyDecreaseHp), newStateEnemiesDecreaseHp, ...state.enemies.slice(indexEnemyDecreaseHp+1, state.enemies.length)];

            return {...state,
                enemies: enemiesDecreaseHp
            };

        case ACTIONS.DELETE_ENEMY:

            let indexEnemyDelete = action.payload.id;
            let enemiesDelete = [ ...state.enemies.slice(0,indexEnemyDelete - 1), ...state.enemies.slice(indexEnemyDelete+1, state.enemies.length)];

            return {...state,
                enemies: enemiesDelete
            };

        case ACTIONS.ENEMY_ATTACK:
            let newStateEnemiesAttack = {
                ...state.enemies[action.payload.id],
                status: action.payload.status
            };
            let indexEnemyAttack = action.payload.id;
            let enemiesAttack = [ ...state.enemies.slice(0,indexEnemyAttack), newStateEnemiesAttack, ...state.enemies.slice(indexEnemyAttack+1, state.enemies.length)];

            return {...state,
                enemies: enemiesAttack
            };

        case ACTIONS.SET_ENEMY_STATUS:
            let newStateEnemiesStatus = {
                ...state.enemies[action.payload.id],
                status: action.payload.status
            };
            let indexEnemyStatus = action.payload.id;
            let enemiesStatus = [ ...state.enemies.slice(0,indexEnemyStatus), newStateEnemiesStatus, ...state.enemies.slice(indexEnemyStatus+1, state.enemies.length)];

            return {...state,
                enemies: enemiesStatus
            };


        case ACTIONS.ENEMY_MOVE_UP:

            let newStateEnemiesMoveUp = {
                ...state.enemies[action.payload.id],
                position: {
                    ...state.enemies[action.payload.id].position,
                    top: state.enemies[action.payload.id].position.top - action.payload.positionMove,
                    bottom: state.enemies[action.payload.id].position.bottom - action.payload.positionMove
                },
                status: action.payload.status
            };
            let indexEnemyMoveUp = action.payload.id;
            let enemiesMoveUp = [ ...state.enemies.slice(0,indexEnemyMoveUp), newStateEnemiesMoveUp, ...state.enemies.slice(indexEnemyMoveUp+1, state.enemies.length)];

            return {...state,
                enemies: enemiesMoveUp
            };

        case ACTIONS.ENEMY_MOVE_DOWN:

            let newStateEnemiesMoveDown = {
                ...state.enemies[action.payload.id],
                position: {
                    ...state.enemies[action.payload.id].position,
                    top: state.enemies[action.payload.id].position.top - action.payload.positionMove,
                    bottom: state.enemies[action.payload.id].position.bottom - action.payload.positionMove
                },
                status: action.payload.status
            };
            let indexEnemyMoveDown = action.payload.id;
            let enemiesMoveDown = [ ...state.enemies.slice(0,indexEnemyMoveDown), newStateEnemiesMoveDown, ...state.enemies.slice(indexEnemyMoveDown+1, state.enemies.length)];

            return {...state,
                enemies: enemiesMoveDown
            };

        case ACTIONS.SPELL_CASTING:
            return {...state,
                spell: {
                    width: state.spell.width + action.payload.spellWidth,
                    top: state.wizard.positionTop + 33,
                    display: action.payload.display
                },
                wizard: {
                    ...state.wizard,
                    status: action.payload.status
                }
            };
        case ACTIONS.CAST_STOP:
            return {...state,
                spell: {
                    width: action.payload.width,
                    top: 0,
                    display: action.payload.display
                },
                wizard: {
                    ...state.wizard,
                    status: action.payload.status
                }
            };
        case ACTIONS.LOOP_TICK:
            return {...state,
                ball: {...state.ball,
                    position: {
                        top: state.ball.position.top + state.ball.dirY,
                        bottom: state.ball.position.top + state.ball.dirY + 16,
                        left: state.ball.position.left + state.ball.dirX,
                        right: state.ball.position.left + state.ball.dirX + 16
                    }
                }
            };
        case ACTIONS.CHANGE_DIR_X:
            return {...state,
                ball: {...state.ball,
                    dirX: state.ball.dirX * -1
                }
            };
        case ACTIONS.CHANGE_DIR_X_WITH_PARAM:
            return {...state,
                ball: {...state.ball,
                    dirX:  action.payload.param
                }
            };
        case ACTIONS.CHANGE_DIR_Y:
            return {...state,
                ball: {...state.ball,
                    dirY: state.ball.dirY * -1
                }
            };
        case ACTIONS.CHANGE_DIR_Y_WITH_PARAM:
            return {...state,
                ball: {...state.ball,
                    dirY:  action.payload.param
                }
            };
        case ACTIONS.HIDE_CRATE:
            let newStateHideCrate = {
                ...state.blocks[action.payload.id],
                value: 0
            };
            let indexHideCrate = action.payload.id;
            let blocksHideCrate = [ ...state.blocks.slice(0,indexHideCrate), newStateHideCrate, ...state.blocks.slice(indexHideCrate+1, state.blocks.length)];

            return {...state,
                blocks: blocksHideCrate
            };

        case ACTIONS.DECREASE_CRATE_VALUE:
            let newStateDecrease = {
                ...state.blocks[action.payload.id],
                value: state.blocks[action.payload.id].value - 1
            };
            let indexDecrease = action.payload.id;
            let blocksDecrease = [ ...state.blocks.slice(0,indexDecrease), newStateDecrease, ...state.blocks.slice(indexDecrease+1, state.blocks.length)];

            return {...state,
                blocks: blocksDecrease
            };

        case ACTIONS.ADD_EXPLOSION:
            return {...state,
                explosion: [...state.explosion, {
                    left: action.payload.left || state.ball.position.left,
                    top: action.payload.top || state.ball.position.top,
                    display: 'block'
                }]
            };

        case ACTIONS.ADD_ENEMY_SPELL:
            return {...state,
                enemiesSpells: [...state.enemiesSpells, {
                    left: state.enemies[action.payload.id].position.left,
                    top: state.enemies[action.payload.id].position.top + 60,
                    display: 'block'
                }]
            };

        case ACTIONS.MOVE_ENEMY_SPELL:
            let newEnemiesSpells = state.enemiesSpells.map(spell => {
                return {
                    left: spell.left - 4,
                    top: spell.top
                }
            });
            return {...state,
                enemiesSpells: newEnemiesSpells
            };

        case ACTIONS.REMOVE_ENEMY_SPELL:
            return {...state,
                enemiesSpells: [...state.enemiesSpells.slice(1, state.enemiesSpells.length)]
            };

        case ACTIONS.REMOVE_EXPLOSION:
            return {...state,
                explosion: [...state.explosion.slice(1, state.explosion.length)]
            };

        case ACTIONS.ADD_POINTS:
            return {...state,
                points: state.points + action.payload.points
            };

        case ACTIONS.INCREASE_MANA:
            return {...state,
                mana: state.mana + action.payload.value
            };

        case ACTIONS.ADD_SCORE:
            return {...state,
                topScores: action.payload.scores ? action.payload.scores : initialState.topScores
            };

        case ACTIONS.DECREASE_MANA:
            return {...state,
                mana: state.mana - action.payload.value
            };

        case ACTIONS.DECREASE_LIFE:
            return {...state,
                lifes: state.lifes - 1,
                wizard: {
                    ...state.wizard,
                    status: 'die'
                }
            };

        case ACTIONS.SHOW_CUSTOM_WINDOW:
            return {...state,
                customWindow: {
                    display: 'block',
                    type: action.payload.type
                }
            };

        case ACTIONS.HIDE_CUSTOM_WINDOW:
            return {...state,
                customWindow: {
                    display: 'none',
                    type: ''
                }
            };

        case ACTIONS.RESET_BALL:
            return {...state,
                ball: {
                    radius: 8,
                    position: {
                        top: 205,
                        bottom: 221,
                        left: 120,
                        right: 136
                    },
                    dirX: 3,
                    dirY: 3
                },
                wizard: {
                    positionTop: 175,
                    status: 'idle',
                    paddle: {
                        top: 175,
                        right: 105,
                        bottom: 248,
                        left: 101
                    }
                }
            };

        case ACTIONS.RESTART_GAME:
            return initialState;

        default:
            return state;
    }
};

export default gameReducer;