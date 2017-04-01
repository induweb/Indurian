import ACTIONS from '../constants/actions'
import stagesData from 'json-loader!../sources/data.json';

export function loadData() {
    return {
        type: ACTIONS.LOAD_DATA,
        payload: stagesData.stages,
        meta: {
            timestamp: Date.now()
        }
    };
}

export function loadStage(){
    return{
        type: ACTIONS.LOAD_STAGE,
        payload: {},
        meta:{
            timestamp: Date.now()
        }
    };
}

export function wizardMoveUp(){
    return{
        type: ACTIONS.WIZARD_MOVE_UP,
        payload: {
            positionTop: 150,
            state: 'attack'
        },
        meta:{
            timestamp: Date.now()
        }
    };
}