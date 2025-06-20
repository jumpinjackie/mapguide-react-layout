import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { promiseMiddleware } from './promise-middleware';
import { logger } from './logger';
import { rootReducer } from '../reducers/root';
import type { ReduxStoreImpl } from '../components/map-providers/context';

export function configureStore(initialState: any, extraReducers?: any): ReduxStoreImpl {
    const root = extraReducers ? combineReducers({ ...rootReducer, ...extraReducers }) : combineReducers(rootReducer);
    const store = (<any>compose)( //HACK: Something bogus about the compose() declaration
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