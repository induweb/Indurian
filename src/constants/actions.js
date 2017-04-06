
const ACTIONS = {
    LOAD_DATA: Symbol('LOAD_DATA'),
    LOAD_STAGE: Symbol('LOAD_STAGE'),
    WIZARD_IDLE: Symbol('WIZARD_IDLE'),
    WIZARD_MOVE_UP: Symbol('WIZARD_MOVE_UP'),
    WIZARD_MOVE_DOWN: Symbol('WIZARD_MOVE_DOWN'),
    SPELL_CASTING: Symbol('SPELL_CASTING'),
    CAST_STOP: Symbol('CAST_STOP'),
    LOOP_TICK: Symbol('LOOP_TICK'),
    CHANGE_DIR_X: Symbol('CHANGE_DIR_X'),
    CHANGE_DIR_Y: Symbol('CHANGE_DIR_Y')
};

export default ACTIONS