import * as Constants from "../constants";
import {
    IModalParameters,
    IModalComponentDisplayOptions,
    IModalDisplayOptions,
    ReduxAction
} from "../api/common";

/**
 * Displays the specified component in a modal dialog
 *
 * @export
 * @param {*} options Modal dialog display options
 * @returns {ReduxAction}
 */
export function showModalComponent(options: IModalComponentDisplayOptions): ReduxAction {
    return {
        type: Constants.MODAL_SHOW_COMPONENT,
        payload: {
            ...options
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
export function showModalUrl(options: IModalDisplayOptions): ReduxAction {
    return {
        type: Constants.MODAL_SHOW_URL,
        payload: {
            ...options
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