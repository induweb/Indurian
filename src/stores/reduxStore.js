import {createStore, combineReducers} from 'redux';

// import stagesReducer from '../reducers/stagesReducer';
import gameReducer from '../reducers/gameReducer';

const rootReducer = combineReducers({
    // stages: stagesReducer,
    game: gameReducer
});

const store = createStore(rootReducer, {});

export default store;