import * as Constants from "../constants";
import { IDOMElementMetrics, ReduxAction } from "../api/common";

/**
 * Opens the specified flyout menu
 *
 * @export
 * @param {string} id
 * @param {IDOMElementMetrics} metrics
 * @returns {ReduxAction}
 */
export function openFlyout(id: string, metrics: IDOMElementMetrics): ReduxAction {
    return {
        type: Constants.FLYOUT_OPEN,
        payload: {
            flyoutId: id,
            metrics: metrics
        }
    };
}

/**
 * Closes the specified flyout menu
 *
 * @export
 * @param {string} id
 * @returns {ReduxAction}
 */
export function closeFlyout(id: string): ReduxAction {
    return {
        type: Constants.FLYOUT_CLOSE,
        payload: {
            flyoutId: id
        }
    };
}

/**
 * Load the specified component in the given flyout with the given component props
 *
 * @export
 * @param {string} id
 * @param {IDOMElementMetrics} metrics
 * @param {string} name
 * @param {*} props
 * @returns {ReduxAction}
 */
export function openComponent(id: string, metrics: IDOMElementMetrics, name: string, props: any): ReduxAction {
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

/**
 * Closes the component in the given flyout
 *
 * @export
 * @param {string} id
 * @returns {ReduxAction}
 */
export function closeComponent(id: string): ReduxAction {
    return {
        type: Constants.COMPONENT_CLOSE,
        payload: {
            flyoutId: id
        }
    };
}