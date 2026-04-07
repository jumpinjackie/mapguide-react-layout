import type { Middleware } from '@reduxjs/toolkit';
import { ActionType } from '../constants/actions';

const FILTERED_TYPES = new Set([
    'redux-form/BLUR',
    'redux-form/CHANGE',
    'redux-form/FOCUS',
    'redux-form/TOUCH',
    ActionType.MAP_RESIZED,
    ActionType.UPDATE_MOUSE_COORDINATES,
    ActionType.MAP_SET_BUSY_COUNT,
    ActionType.ADD_LAYER_BUSY_WORKER,
    ActionType.REMOVE_LAYER_BUSY_WORKER,
]);

export const logger: Middleware = store => next => action => {
    const actionType = (action as any)?.type;
    if (FILTERED_TYPES.has(actionType)) {
        return next(action);
    }
    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();
    console.groupCollapsed(`action: ${actionType}`);
    console.log('prev state', prevState);
    console.log('action', action);
    console.log('next state', nextState);
    console.groupEnd();
    return result;
};