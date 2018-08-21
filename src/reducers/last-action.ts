// A reducer to remember the last dispatched action. This is primarily used by layout
// templates to listen on certain actions and be able to update their
//
// As suggested by the creator of redux:
// https://github.com/reactjs/redux/issues/580
import { ReduxThunkedAction } from "../api/common";
import { isAction } from "../utils/type-guards";
import * as Constants from "../constants";
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';

export const NULL_ACTION = {};

export function lastAction(state = null, action: ViewerAction) {
    if (isAction(action)) {
        switch (action.type) {
            case ActionType.MAP_SET_BUSY_COUNT:
            case ActionType.TASK_INVOKE_URL:
            case ActionType.MAP_SET_SELECTION:
            case ActionType.MAP_SET_MAPTIP:
            case ActionType.MAP_SET_ACTIVE_TOOL:
                return action;
        }
    }
    //As we're returning a const reference subsequent dispatched actions that
    //are not the ones listed above should give us the same branch in the eyes
    //of redux
    return NULL_ACTION;
}