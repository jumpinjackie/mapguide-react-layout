import { configureStore as rtkConfigureStore, combineReducers } from '@reduxjs/toolkit';
import { promiseMiddleware } from './promise-middleware';
import { logger } from './logger';
import { rootReducer } from '../reducers/root';

/**
 * Configures and creates a Redux store with optional initial state and extra reducers.
 *
 * @param initialState - The initial state of the Redux store.
 * @param extraReducers - Optional additional reducers to be combined with the root reducer.
 * @returns The configured Redux store instance.
 * 
 * @since 0.15 - Fixed return type to no longer be `any`
 */
export function configureStore(initialState: any, extraReducers?: any) {
    const rootReducerMap = extraReducers ? { ...rootReducer, ...extraReducers } : rootReducer;
    const isDev = typeof(__DEV__) !== 'undefined' && __DEV__;
    return rtkConfigureStore({
        reducer: combineReducers(rootReducerMap),
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => {
            const base = getDefaultMiddleware({
                serializableCheck: false,
                immutableCheck: false,
            }).prepend(promiseMiddleware as any);
            return isDev ? base.concat(logger as any) : base;
        },
        devTools: isDev,
    });
}