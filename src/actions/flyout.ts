import * as Constants from "../constants";
import { IDOMElementMetrics, ReduxAction } from "../api/common";

export function openFlyout(id: string, metrics: IDOMElementMetrics): ReduxAction {
    return {
        type: Constants.FLYOUT_OPEN,
        payload: {
            flyoutId: id,
            metrics: metrics
        }
    };
}

export function closeFlyout(id: string): ReduxAction {
    return {
        type: Constants.FLYOUT_CLOSE,
        payload: {
            flyoutId: id
        }
    };
}