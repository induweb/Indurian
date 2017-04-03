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

        default:
            return state;
    }
};

export default gameReducer;