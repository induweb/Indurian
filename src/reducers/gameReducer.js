import ACTIONS from '../constants/actions';

const initialState = {
    wizard: {
        positionTop: 175,
        status: 'idle'
    },
    spell: {
        width: 0,
        top: 0,
        display: 'none'
    },
    ball: {
        radius: 8,
        positionTop: 210,
        positionLeft: 120,
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
        case ACTIONS.WIZARD_MOVE_UP:
            return {...state, wizard: {
                positionTop: state.wizard.positionTop + action.payload.positionMove,
                status: action.payload.status
            }};
        case ACTIONS.WIZARD_MOVE_DOWN:
            return {...state, wizard: {
                positionTop: state.wizard.positionTop + action.payload.positionMove,
                status: action.payload.status
            }};
        case ACTIONS.SPELL_CASTING:
            return {...state,
                spell: {
                    width: state.spell.width + action.payload.spellWidth,
                    top: state.wizard.positionTop + 33,
                    display: action.payload.display
                },
                wizard: {...state.wizard, status: action.payload.status}
            };
        case ACTIONS.CAST_STOP:
            return {...state,
                spell: {
                    width: action.payload.width,
                    top: 0,
                    display: action.payload.display
                },
                wizard: {...state.wizard, status: action.payload.status}
            };
        case ACTIONS.LOOP_TICK:
            return {...state,
                ball: {...state.ball,
                    positionTop: state.ball.positionTop + state.ball.dirY,
                    positionLeft: state.ball.positionLeft + state.ball.dirX
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