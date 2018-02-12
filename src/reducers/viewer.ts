import * as Constants from "../constants";
import {
    ActiveMapTool,
    IViewerReducerState
} from "../api/common";
import { AnyAction } from "redux";

export const VIEWER_INITIAL_STATE: IViewerReducerState = {
    busyCount: 0,
    size: undefined,
    tool: ActiveMapTool.None,
    featureTooltipsEnabled: true
}

export function viewerReducer(state = VIEWER_INITIAL_STATE, action: AnyAction = { type: '', payload: null }) {
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
        case Constants.MAP_RESIZED:
            {
                const state1 = {
                    size: [payload.width, payload.height]
                };
                return { ...state, ...state1 };
            }
    }
    return state;
}