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
            return {...state, wizard: action.payload};

        default:
            return state;
    }
};

export default gameReducer;