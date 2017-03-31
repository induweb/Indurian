import ACTIONS from '../constants/actions';

const initialState = {
    stages: []
};

const stagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_DATA:
            return action.payload;

        default:
            return state;
    }
};

export default stagesReducer;