import {
    ActiveMapTool,
    IViewerReducerState,
    ILayerInfo
} from "../api/common";
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
        case ActionType.INIT_APP:
            {
                const tool = action.payload.initialActiveTool;
                const ft = action.payload.featureTooltipsEnabled;
                let state1: Partial<IViewerReducerState> | undefined;
                if (tool != null) {
                    state1 = {
                        tool: tool
                    };
                }
                let state2: Partial<IViewerReducerState> | undefined;
                if (typeof (ft) != 'undefined') {
                    state2 = {
                        featureTooltipsEnabled: ft
                    };
                }
                return { ...state, ...state1, ...state2 };
            }
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
        case ActionType.MAP_ENABLE_SELECT_DRAGPAN:
            {
                const state1 = {
                    selectCanDragPan: action.payload
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