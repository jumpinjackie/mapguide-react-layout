import * as Constants from "../constants";

export function showModalComponent(options) {
    return {
        type: Constants.MODAL_SHOW_COMPONENT,
        payload: {
            name: options.name,
            component: options.id
        }
    };
}

export function hideModal(options) {
    return {
        type: Constants.MODAL_CLOSE,
        payload: options.name
    };
}