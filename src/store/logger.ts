import * as Constants from "../constants";
const createLogger = require("redux-logger").createLogger;

const logger = createLogger({
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
            type !== Constants.UPDATE_MOUSE_COORDINATES &&
            type !== Constants.MAP_SET_BUSY_COUNT;
    },
});


export default logger;
