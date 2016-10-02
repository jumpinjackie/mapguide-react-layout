// A reducer to remember the last dispatched action
//
// As suggested by the creator of redux:
// https://github.com/reactjs/redux/issues/580
import { ReduxAction, ReduxThunkedAction } from "../api/common";

export function lastAction(state = null, action: ReduxAction|ReduxThunkedAction): ReduxAction|ReduxThunkedAction {
    return action;
}