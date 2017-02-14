// A reducer to remember the last dispatched action. This is primarily used by layout
// templates to listen on certain actions and be able to update their 
//
// As suggested by the creator of redux:
// https://github.com/reactjs/redux/issues/580
import { ReduxAction, ReduxThunkedAction } from "../api/common";
import { isAction } from "../utils/type-guards";
import * as Constants from "../constants";

export const NULL_ACTION = {};

export function lastAction(state = null, action: ReduxAction|ReduxThunkedAction) {
    if (isAction(action)) {
        switch (action.type) {
            case Constants.MAP_SET_BUSY_COUNT:
            case Constants.TASK_INVOKE_URL:
            case Constants.MAP_SET_SELECTION:
            case Constants.MAP_SET_MAPTIP:
            case Constants.MAP_SET_ACTIVE_TOOL:
                return action;
        }
    }
    //As we're returning a const reference subsequent dispatched actions that 
    //are not the ones listed above should give us the same branch in the eyes 
    //of redux
    return NULL_ACTION;
}