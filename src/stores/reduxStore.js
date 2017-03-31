import {createStore, combineReducers} from 'redux';

import stagesReducer from '../reducers/stagesReducer';
import wizardReducer from '../reducers/wizardReducer';

const rootReducer = combineReducers({
    stages: stagesReducer,
    wizard: wizardReducer
});

const store = createStore(rootReducer, {});

export default store;