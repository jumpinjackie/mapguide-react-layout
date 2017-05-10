import * as Constants from "../constants";
import { ReduxAction } from "../api/common";

/**
 * Displays the specified component in a modal dialog
 *
 * @export
 * @param {*} options Modal dialog display options
 * @returns {ReduxAction}
 */
export function showModalComponent(options: any): ReduxAction {
    return {
        type: Constants.MODAL_SHOW_COMPONENT,
        payload: {
            modal: options.modal,
            name: options.name,
            component: options.id
        }
    };
}

/**
 * Displays the specified URL in a modal dialog
 *
 * @export
 * @param {*} options Modal dialog display options
 * @returns {ReduxAction}
 */
export function showModalUrl(options: any): ReduxAction {
    return {
        type: Constants.MODAL_SHOW_URL,
        payload: {
            modal: options.modal,
            name: options.name,
            url: options.url
        }
    };
}

/**
 * Hides an open modal dialog
 *
 * @export
 * @param {*} options Modal dialog hide options
 * @returns {ReduxAction}
 */
export function hideModal(options: any): ReduxAction {
    return {
        type: Constants.MODAL_CLOSE,
        payload: options.name
    };
}