import ACTIONS from '../constants/actions';

const initialState = {
    wizard: {
        positionTop: 175,
        status: 'idle',
        paddle: {
            top: 175,
            right: 105,
            bottom: 102,
            left: 102
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
            top: 210,
            bottom: 226,
            left: 120,
            right: 136
        },
        dirX: 2,
        dirY: 2
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
        case ACTIONS.CHANGE_DIR_Y:
            return {...state,
                ball: {...state.ball,
                    dirY: state.ball.dirY * -1
                }
            };

        default:
            return state;
    }
};

export default gameReducer;