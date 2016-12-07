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

export function openComponent(id: string, metrics: IDOMElementMetrics, name: string, props: string): ReduxAction {
    return {
        type: Constants.COMPONENT_OPEN,
        payload: {
            flyoutId: id,
            metrics: metrics,
            name: name,
            props: props
        }
    };
}

export function closeComponent(id: string): ReduxAction {
    return {
        type: Constants.COMPONENT_CLOSE,
        payload: {
            flyoutId: id
        }
    };
}