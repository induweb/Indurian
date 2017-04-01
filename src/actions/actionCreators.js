import * as stageActions from './stageActions';
import * as loadActions from './loadActions';

const actions = [
    stageActions,
    loadActions
];
console.log('actions', actions);

export default actions[0]