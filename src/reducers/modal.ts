import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';
import { DEFAULT_MODAL_POSITION, DEFAULT_MODAL_SIZE, IModalParameters, IModalReducerState } from '../api/common';
import update from "immutability-helper";

function tryRestoreModalSizeAndPosition(modal: IModalParameters, prevModal?: Partial<Pick<IModalParameters, "size" | "position">>) {
    if (prevModal?.position) {
        modal.position = prevModal.position;
    } else if (!modal.position) {
        modal.position = DEFAULT_MODAL_POSITION;
    }
    if (prevModal?.size) {
        modal.size = prevModal.size;
    } else if (!modal.size) {
        modal.size = DEFAULT_MODAL_SIZE;
    }
}

export const MODAL_INITIAL_STATE: IModalReducerState = {};

export function modalReducer(state = MODAL_INITIAL_STATE, action: ViewerAction): IModalReducerState {
    switch (action.type) {
        case ActionType.MODAL_SHOW_COMPONENT:
            {
                const newModal = action.payload.modal;
                tryRestoreModalSizeAndPosition(newModal, state[action.payload.name]?.modal);
                const newData: any = {};
                newData[action.payload.name] = {
                    modal: newModal,
                    component: action.payload.component,
                    componentProps: action.payload.componentProps
                };
                return { ...state, ...newData };
            }
        case ActionType.MODAL_UPDATE:
            {
                const newData: any = {};
                newData[action.payload.name] = {
                    modal: {
                        "$merge": {
                            size: [action.payload.args.width, action.payload.args.height],
                            position: [action.payload.args.x, action.payload.args.y]
                        }
                    }
                }
                const newState = update(state, newData);
                return newState;
            }
        case ActionType.MODAL_SHOW_URL:
            {
                const { modal: newModal, ...rest } = action.payload;
                tryRestoreModalSizeAndPosition(newModal, state[action.payload.name]?.modal);
                const newData: any = {};
                newData[action.payload.name] = {
                    modal: newModal,
                    ...rest
                };
                return { ...state, ...newData };
            }
        case ActionType.MODAL_CLOSE:
            {
                let newState = { ...state };
                delete newState[action.payload].modal.backdrop;
                delete newState[action.payload].modal.overflowYScroll;
                delete newState[action.payload].modal.title;
                // Delete all non-modal properties
                for (const k in newState[action.payload]) {
                    if (k != "modal") {
                        delete (newState[action.payload] as any)[k];
                    }
                }
                return newState;
            }
    }
    return state;
}