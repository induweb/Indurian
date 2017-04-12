import ACTIONS from '../constants/actions'
import stagesData from 'json-loader!../sources/data.json';

export function loadData(id) {
    return {
        type: ACTIONS.LOAD_DATA,
        payload: stagesData.stages,
        id: id,
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

export function wizardIdle(){
    return{
        type: ACTIONS.WIZARD_IDLE,
        payload: {
            status: 'idle'
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function wizardMoveUp(){
    return{
        type: ACTIONS.WIZARD_MOVE_UP,
        payload: {
            positionMove: -5,
            status: 'run'
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function wizardMoveDown(){
    return{
        type: ACTIONS.WIZARD_MOVE_DOWN,
        payload: {
            positionMove: 5,
            status: 'run'
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function spellCasting(){
    return{
        type: ACTIONS.SPELL_CASTING,
        payload: {
            spellWidth: 10,
            status: 'attack',
            display: 'block'
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function castStop(){
    return{
        type: ACTIONS.CAST_STOP,
        payload: {
            width: 0,
            status: 'idle',
            display: 'none'
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function loopTick(){
    return{
        type: ACTIONS.LOOP_TICK,
        payload: {
            // width: 0,
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function changeDirX(){
    return{
        type: ACTIONS.CHANGE_DIR_X,
        payload: {
            // width: 0,
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function changeDirY(){
    return{
        type: ACTIONS.CHANGE_DIR_Y,
        payload: {
            // width: 0,
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function changeDirXWithParam(param){
    return{
        type: ACTIONS.CHANGE_DIR_X_WITH_PARAM,
        payload: {
            param
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function changeDirYWithParam(param){
    return{
        type: ACTIONS.CHANGE_DIR_Y_WITH_PARAM,
        payload: {
            param
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function decreaseCrateValue(id){
    return{
        type: ACTIONS.DECREASE_CRATE_VALUE,
        payload: {
            id
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function addPoints(points){
    return{
        type: ACTIONS.ADD_POINTS,
        payload: {
            points
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function hideCrate(id){
    return{
        type: ACTIONS.HIDE_CRATE,
        payload: {
            id
        },
        meta:{
            timestamp: Date.now()
        }
    };
}