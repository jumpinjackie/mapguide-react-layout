import * as Constants from "../constants";
const createLogger = require('redux-logger');

const logger = createLogger({
    collapsed: true,
    stateTransformer: (state) => {
        return state;
    },
    predicate: (getState, { type }) => {
        return type !== 'redux-form/BLUR' &&
            type !== 'redux-form/CHANGE' &&
            type !== 'redux-form/FOCUS' &&
            type !== 'redux-form/TOUCH' &&
            type !== Constants.UPDATE_MOUSE_COORDINATES &&
            type !== Constants.MAP_SET_BUSY_COUNT;
    },
});


export default logger;
