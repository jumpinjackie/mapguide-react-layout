import * as Constants from "../constants";
import {
    ActiveMapTool,
    IViewerReducerState
} from "../api/common";
import { AnyAction } from "redux";
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';

export const VIEWER_INITIAL_STATE: IViewerReducerState = {
    busyCount: 0,
    size: undefined,
    tool: ActiveMapTool.None,
    featureTooltipsEnabled: true
}

export function viewerReducer(state = VIEWER_INITIAL_STATE, action: ViewerAction) {
    switch (action.type) {
        case ActionType.MAP_SET_ACTIVE_TOOL:
            {
                const state1 = {
                    tool: action.payload
                };
                return { ...state, ...state1 };
            }
        case ActionType.MAP_SET_MAPTIP:
            {
                const state1 = {
                    featureTooltipsEnabled: action.payload
                };
                return { ...state, ...state1 };
            }
        case ActionType.MAP_SET_BUSY_COUNT:
            {
                const state1 = {
                    busyCount: action.payload
                };
                return { ...state, ...state1 };
            }
        case ActionType.MAP_RESIZED:
            {
                const state1 = {
                    size: [action.payload.width, action.payload.height]
                };
                return { ...state, ...state1 };
            }
    }
    return state;
}