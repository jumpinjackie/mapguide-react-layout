import * as Constants from "../constants";
const assign = require("object-assign");

const INITIAL_STATE = {
    selectionSet: null,
    layerIndex: -1,
    featureIndex: -1
};

export function selectionReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {

    }
    return state;
}