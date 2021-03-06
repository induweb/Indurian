
const ACTIONS = {
    LOAD_DATA: Symbol('LOAD_DATA'),
    LOAD_STAGE: Symbol('LOAD_STAGE'),
    WIZARD_IDLE: Symbol('WIZARD_IDLE'),
    WIZARD_MOVE_UP: Symbol('WIZARD_MOVE_UP'),
    WIZARD_MOVE_DOWN: Symbol('WIZARD_MOVE_DOWN'),
    ENEMY_MOVE_UP: Symbol('ENEMY_MOVE_UP'),
    ENEMY_MOVE_DOWN: Symbol('ENEMY_MOVE_DOWN'),
    ENEMY_STOP: Symbol('ENEMY_STOP'),
    SPELL_CASTING: Symbol('SPELL_CASTING'),
    CAST_STOP: Symbol('CAST_STOP'),
    LOOP_TICK: Symbol('LOOP_TICK'),
    RESET_BALL: Symbol('CHANGE_DIR_X'),
    CHANGE_DIR_X: Symbol('CHANGE_DIR_X'),
    CHANGE_DIR_X_WITH_PARAM: Symbol('CHANGE_DIR_X_WITH_PARAM'),
    CHANGE_DIR_Y: Symbol('CHANGE_DIR_Y'),
    CHANGE_DIR_Y_WITH_PARAM: Symbol('CHANGE_DIR_Y_WITH_PARAM'),
    DECREASE_CRATE_VALUE: Symbol('DECREASE_CRATE_VALUE'),
    DECREASE_LIFE: Symbol('DECREASE_LIFE'),
    ADD_POINTS: Symbol('ADD_POINTS'),
    ADD_SCORE: Symbol('ADD_SCORE'),
    ADD_EXPLOSION: Symbol('ADD_EXPLOSION'),
    REMOVE_EXPLOSION: Symbol('REMOVE_EXPLOSION'),
    HIDE_CRATE: Symbol('HIDE_CRATE'),
    UPDATE_STAGE_BLOCK_LIST: Symbol('UPDATE_STAGE_BLOCK_LIST'),
    SHOW_CUSTOM_WINDOW: Symbol('SHOW_CUSTOM_WINDOW'),
    HIDE_CUSTOM_WINDOW: Symbol('HIDE_CUSTOM_WINDOW'),
    RESTART_GAME: Symbol('RESTART_GAME'),
    DECREASE_ENEMY_HP: Symbol('DECREASE_ENEMY_HP'),
    DELETE_ENEMY: Symbol('DELETE_ENEMY'),
    ENEMY_ATTACK: Symbol('ENEMY_ATTACK'),
    SET_ENEMY_STATUS: Symbol('SET_ENEMY_STATUS'),
    ADD_ENEMY_SPELL: Symbol('ADD_ENEMY_SPELL'),
    REMOVE_ENEMY_SPELL: Symbol('REMOVE_ENEMY_SPELL'),
    MOVE_ENEMY_SPELL: Symbol('MOVE_ENEMY_SPELL'),
    ADD_COIN: Symbol('ADD_COIN'),
    REMOVE_COIN: Symbol('REMOVE_COIN'),
    MOVE_COIN: Symbol('MOVE_COIN'),
    INCREASE_MANA: Symbol('INCREASE_MANA'),
    DECREASE_MANA: Symbol('DECREASE_MANA'),
    DECREASE_HP: Symbol('DECREASE_HP'),
    RESET_MANA_AND_HP: Symbol('RESET_MANA_AND_HP')
};

export default ACTIONS