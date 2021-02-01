import { ActionType } from '../constants/actions';
const createLogger = require("redux-logger").createLogger;

export const logger = createLogger({
    collapsed: true,
    stateTransformer: (state: any) => {
        return state;
    },
    //Note the { type } syntax: https://github.com/Microsoft/TypeScript/issues/9657
    predicate: (getState: any, { type }: { type: string }) => {
        return type !== 'redux-form/BLUR' &&
            type !== 'redux-form/CHANGE' &&
            type !== 'redux-form/FOCUS' &&
            type !== 'redux-form/TOUCH' &&
            type !== ActionType.MAP_RESIZED &&
            type !== ActionType.UPDATE_MOUSE_COORDINATES &&
            type !== ActionType.MAP_SET_BUSY_COUNT &&
            type !== ActionType.ADD_LAYER_BUSY_WORKER &&
            type !== ActionType.REMOVE_LAYER_BUSY_WORKER;
    },
});