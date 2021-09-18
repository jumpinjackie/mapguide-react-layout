import {
    IModalComponentDisplayOptions,
    IModalDisplayOptions
} from "../api/common";
import { ActionType } from '../constants/actions';
import { ICloseModalAction, IShowModalUrlAction, IShowComponentInModalAction } from './defs';

/**
 * Displays the specified component in a modal dialog
 *
 * @export
 * @param {*} options Modal dialog display options
 * @returns {IShowComponentInModalAction}
 */
export function showModalComponent(options: IModalComponentDisplayOptions): IShowComponentInModalAction {
    return {
        type: ActionType.MODAL_SHOW_COMPONENT,
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
 * @returns {IShowModalUrlAction}
 */
export function showModalUrl(options: IModalDisplayOptions): IShowModalUrlAction {
    return {
        type: ActionType.MODAL_SHOW_URL,
        payload: {
            ...options
        }
    };
}

/**
 * Hides an open modal dialog
 *
 * @export
 * @param name The name of the modal to hide
 * @returns {ICloseModalAction}
 */
export function hideModal(name: string): ICloseModalAction {
    return {
        type: ActionType.MODAL_CLOSE,
        payload: name
    };
}