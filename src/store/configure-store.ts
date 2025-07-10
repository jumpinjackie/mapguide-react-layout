import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
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
    const root = extraReducers ? combineReducers({ ...rootReducer, ...extraReducers }) : combineReducers(rootReducer);
    const store = compose(
        _getMiddleware(),
        ..._getEnhancers()
    )(createStore)(root, initialState);
    return store;
}

function _getMiddleware() {
    let middleware = [
        promiseMiddleware,
        thunk,
    ];

    if (typeof(__DEV__) !== 'undefined' && __DEV__) {
        middleware = [...middleware, logger];
    }

    return applyMiddleware(...middleware);
}

function _getEnhancers() {
    let enhancers = [] as any[];
    if (typeof(__DEV__) !== 'undefined' && __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers = [...enhancers, window.__REDUX_DEVTOOLS_EXTENSION__()];
    }
    return enhancers;
}