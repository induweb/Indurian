import ACTIONS from '../constants/actions';

const initialState = {
    stagesData: []
};

const stagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_DATA:
            return {
                ...state,
                stagesData: action.payload
            };

        default:
            return state;
    }
};

export default stagesReducer;