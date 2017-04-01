import ACTIONS from '../constants/actions';

const initialState = {
    wizard: {
        positionTop: 175,
        state: 'idle'
    }
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.WIZARD_MOVE_UP:
            return {...state, wizard: {
                positionTop: state.wizard.positionTop + action.payload.positionMove,
                state: action.payload.state
            }};
        case ACTIONS.WIZARD_MOVE_DOWN:
            return {...state, wizard: {
                positionTop: state.wizard.positionTop + action.payload.positionMove,
                state: action.payload.state
            }};

        default:
            return state;
    }
};

export default gameReducer;