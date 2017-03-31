import {createStore, combineReducers} from 'redux';

import stagesReducer from '../reducers/stagesReducer';

const rootReducer = combineReducers({
    stages: stagesReducer
});

const store = createStore(rootReducer, {});

export default store;