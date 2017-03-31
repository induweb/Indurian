import ACTIONS from '../constants/actions';

const initialState = {
    positionTop: 175,
    state: 'idle'
};

const wizardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_STAGE:
            return action.payload;

        default:
            return state;
    }
};

export default wizardReducer;