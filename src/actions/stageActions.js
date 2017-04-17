import ACTIONS from '../constants/actions'
import stagesData from 'json-loader!../sources/data.json';

function checkLocalStorage() {
    if (typeof localStorage === typeof undefined)
    {
        return false;
    }

    try {
        sessionStorage.setItem('mod', 'mod');
        sessionStorage.removeItem('mod');
    } catch (e) {
        return false;
    }

    return true;
}

function storageSetter(key, value) {
    if (!checkLocalStorage())
        return false;
    localStorage.setItem(key, JSON.stringify(value));
}

function storageGetter(key) {
    if (!checkLocalStorage())
        return false;
    return JSON.parse(localStorage.getItem(key));
}

export function loadData(id) {
    storageSetter('stage',{1:'unlocked',2:'unlocked'});
    let stagesBlocking = storageGetter('stage');
    // console.log(stagesBlocking);
    let stages = stagesData.stages.map((stage) => {
        stage.unlocked = stagesBlocking[stage.id] == 'unlocked' ? 'unlocked' : 'locked';
        return stage;
    });
    // console.log('stages',stages);
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

export function resetBall(){
    return{
        type: ACTIONS.RESET_BALL,
        meta:{
            timestamp: Date.now()
        }
    };
}

export function decreaseLife(){
    return{
        type: ACTIONS.DECREASE_LIFE,
        meta:{
            timestamp: Date.now()
        }
    };
}

export function addPoints(points) {
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

export function increaseMana(value) {
    return{
        type: ACTIONS.INCREASE_MANA,
        payload: {
            value
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function decreaseMana(value) {
    return{
        type: ACTIONS.DECREASE_MANA,
        payload: {
            value
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

export function showCustomWindow(type){
    return{
        type: ACTIONS.SHOW_CUSTOM_WINDOW,
        payload: {
            type
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function hideCustomWindow(){
    return{
        type: ACTIONS.HIDE_CUSTOM_WINDOW,
        meta:{
            timestamp: Date.now()
        }
    };
}

export function restartGame(){
    return{
        type: ACTIONS.RESTART_GAME,
        meta:{
            timestamp: Date.now()
        }
    };
}