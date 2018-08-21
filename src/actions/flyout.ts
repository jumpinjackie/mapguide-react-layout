import * as Constants from "../constants";
import { IDOMElementMetrics, ReduxAction } from "../api/common";
import {
    IOpenFlyoutAction, 
    ICloseFlyoutAction,
    IOpenComponentInFlyoutAction,
    ICloseComponentInFlyoutAction
} from "./defs";
import { ActionType } from '../constants/actions';

/**
 * Opens the specified flyout menu
 *
 * @export
 * @param {string} id
 * @param {IDOMElementMetrics} metrics
 * @returns {ReduxAction}
 */
export function openFlyout(id: string, metrics: IDOMElementMetrics): IOpenFlyoutAction {
    return {
        type: ActionType.FLYOUT_OPEN,
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
export function closeFlyout(id: string): ICloseFlyoutAction {
    return {
        type: ActionType.FLYOUT_CLOSE,
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
export function openComponent(id: string, metrics: IDOMElementMetrics, name: string, props: any): IOpenComponentInFlyoutAction {
    return {
        type: ActionType.COMPONENT_OPEN,
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
export function closeComponent(id: string): ICloseComponentInFlyoutAction {
    return {
        type: ActionType.COMPONENT_CLOSE,
        payload: {
            flyoutId: id
        }
    };
}