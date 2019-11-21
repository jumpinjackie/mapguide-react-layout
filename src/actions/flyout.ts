import { IDOMElementMetrics } from "../api/common";
import {
    IOpenFlyoutAction, 
    ICloseFlyoutAction,
    IOpenComponentInFlyoutAction,
    ICloseComponentInFlyoutAction,
    IOpenContextMenuAction,
    ICloseContextMenuAction
} from "./defs";
import { ActionType } from '../constants/actions';

/**
 * Opens the context menu at the specific position
 * 
 * @param position The client x/y position
 * @since 0.13
 */
export function openContextMenu(position: { x: number, y: number }): IOpenContextMenuAction {
    return {
        type: ActionType.CONTEXT_MENU_OPEN,
        payload: {
            ...position
        }
    };
}

/**
 * Closes the context menu
 * 
 * @since 0.13
 */
export function closeContextMenu(): ICloseContextMenuAction {
    return {
        type: ActionType.CONTEXT_MENU_CLOSE
    };
}

/**
 * Opens the specified flyout menu
 *
 * @export
 * @param {string} id
 * @param {IDOMElementMetrics} metrics
 * @returns {IOpenFlyoutAction}
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
 * @returns {ICloseFlyoutAction}
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
 * @returns {IOpenComponentInFlyoutAction}
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
 * @returns {ICloseComponentInFlyoutAction}
 */
export function closeComponent(id: string): ICloseComponentInFlyoutAction {
    return {
        type: ActionType.COMPONENT_CLOSE,
        payload: {
            flyoutId: id
        }
    };
}