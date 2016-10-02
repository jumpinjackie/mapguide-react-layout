import * as Constants from "../constants";

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

export function hideModal(options: any): ReduxAction {
    return {
        type: Constants.MODAL_CLOSE,
        payload: options.name
    };
}