import * as Constants from "../constants";
import {
    IModalParameters,
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
 * @param {*} options Modal dialog hide options
 * @returns {ICloseModalAction}
 */
export function hideModal(options: any): ICloseModalAction {
    return {
        type: ActionType.MODAL_CLOSE,
        payload: options.name
    };
}