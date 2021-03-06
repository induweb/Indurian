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
    return {
        type: ACTIONS.LOAD_DATA,
        payload: stagesData,
        id: id,
        meta: {
            timestamp: Date.now()
        }
    };
}

export function addScore(name, points) {
    let scores = storageGetter('score');
    let newIndex = -1;
    let newScores = {
        'name': name,
        'score': points
    };

    if (scores) {
        scores.forEach((score, index) => {
            if (points >= score.score && newIndex < 0) {
                newIndex = index;
            }
        });
    } else {
        scores = [];
    }

    if (newIndex >= 0) {
        scores.splice(newIndex, 0, newScores);
    } else {
        scores = [...scores, newScores];
    }

    storageSetter('score', scores);

    return{
        type: ACTIONS.ADD_SCORE,
        payload: {
            scores: scores
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function getScores(){
    let scores = storageGetter('score');

    return{
        type: ACTIONS.ADD_SCORE,
        payload: {
            scores: scores
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function unlockStage(id){

    let stagesBlocking = storageGetter('stage');
    if (!stagesBlocking) {
        storageSetter('stage', {'1': 'unlocked'});
        stagesBlocking = storageGetter('stage');
    }

    if (!stagesBlocking[id] || stagesBlocking[id] !== 'unlocked') {
        stagesBlocking[id] = 'unlocked';
        storageSetter('stage', stagesBlocking);
    }


    return{
        type: ACTIONS.UPDATE_STAGE_BLOCK_LIST,
        payload: {
            stagesBlocking
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function checkStagesBlocking(){
    let stagesBlocking = storageGetter('stage');

    return{
        type: ACTIONS.UPDATE_STAGE_BLOCK_LIST,
        payload: {
            stagesBlocking
        },
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
            positionMove: -7,
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
            positionMove: 7,
            status: 'run'
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function decreaseEnemyHp(id, value){
    return{
        type: ACTIONS.DECREASE_ENEMY_HP,
        payload: {
            id,
            value
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function deleteEnemy(id){
    return{
        type: ACTIONS.DELETE_ENEMY,
        payload: {
            id
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function enemyAttack(id){
    return{
        type: ACTIONS.ENEMY_ATTACK,
        payload: {
            status: 'attack',
            id
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function setEnemyStatus(id, value){
    return{
        type: ACTIONS.SET_ENEMY_STATUS,
        payload: {
            status: value,
            id
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function addEnemySpell(id, counter){
    return{
        type: ACTIONS.ADD_ENEMY_SPELL,
        payload: {
            id,
            counter
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function removeEnemySpell(id){
    return{
        type: ACTIONS.REMOVE_ENEMY_SPELL,
        payload: {
            id
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function moveEnemySpell(){
    return{
        type: ACTIONS.MOVE_ENEMY_SPELL,
        meta:{
            timestamp: Date.now()
        }
    };
}

export function addCoin(id, counter){
    return{
        type: ACTIONS.ADD_COIN,
        payload: {
            id,
            counter
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function removeCoin(id){
    return{
        type: ACTIONS.REMOVE_COIN,
        payload: {
            id
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function moveCoin(){
    return{
        type: ACTIONS.MOVE_COIN,
        meta:{
            timestamp: Date.now()
        }
    };
}


export function enemyMoveUp(id){
    return{
        type: ACTIONS.ENEMY_MOVE_UP,
        payload: {
            positionMove: 0.5,
            status: 'run',
            id
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function enemyMoveDown(id){
    return{
        type: ACTIONS.ENEMY_MOVE_DOWN,
        payload: {
            positionMove: -0.5,
            status: 'run',
            id
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function enemyStop(id){
    return{
        type: ACTIONS.ENEMY_STOP,
        payload: {
            status: 'idle',
            id
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

export function addExplosion(top, left) {
    return{
        type: ACTIONS.ADD_EXPLOSION,
        payload: {
            top,
            left
        },
        meta:{
            timestamp: Date.now()
        }
    };
}

export function removeExplosion() {
    return{
        type: ACTIONS.REMOVE_EXPLOSION,
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

export function resetManaAndHp() {
    return{
        type: ACTIONS.RESET_MANA_AND_HP,
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

export function decreaseHp(value) {
    return{
        type: ACTIONS.DECREASE_HP,
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