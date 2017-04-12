import ACTIONS from '../constants/actions';

const initialState = {
    stagesData: [],
    blocks: [],
    lifes: 3,
    points: 0,
    mana: 100,
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
    area: {
        minX: 0,
        minY: 0,
        maxX: 750,
        maxY: 444
    }
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_DATA:
            return {
                ...state,
                stagesData: action.payload,
                blocks: action.payload[action.id - 1].blocks
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

        case ACTIONS.ADD_POINTS:
            return {...state,
                points: state.points + action.payload.points
            };

        default:
            return state;
    }
};

export default gameReducer;