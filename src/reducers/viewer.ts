import * as Constants from "../constants";
import {
    ActiveMapTool,
    IViewerReducerState
} from "../api/common";

export const INITIAL_STATE: IViewerReducerState = {
    busyCount: 0,
    tool: ActiveMapTool.None,
    featureTooltipsEnabled: true
}

export function viewerReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    const payload: any = typeof(action.payload) != 'undefined' ? action.payload : {};
    switch (action.type) {
        case Constants.MAP_SET_ACTIVE_TOOL:
            {
                const state1 = {
                    tool: payload
                };
                return { ...state, ...state1 };
            }
        case Constants.MAP_SET_MAPTIP:
            {
                const state1 = {
                    featureTooltipsEnabled: payload
                };
                return { ...state, ...state1 };
            }
        case Constants.MAP_SET_BUSY_COUNT:
            {
                const state1 = {
                    busyCount: payload
                };
                return { ...state, ...state1 };
            }
    }
    return state;
}