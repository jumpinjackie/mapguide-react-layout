import * as Constants from "../constants";
const assign = require("object-assign");

export const INITIAL_STATE = {
    agentUri: null,
    agentKind: null,
    locale: "en",
    imageFormat: "PNG",
    taskpane: {
        initialUrl: "/mapguide/phpsamples/index.php" 
    },
    coordinates: {
        decimals: 6
    }
};

export function configReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    return state;
}