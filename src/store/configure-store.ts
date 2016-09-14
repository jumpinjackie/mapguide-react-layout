import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './promise-middleware';
import logger from './logger';
import rootReducer from '../reducers';
const persistState = require('redux-localstorage');

function configureStore(initialState) {
    const store = compose(
        _getMiddleware(),
        ..._getEnhancers()
    )(createStore)(rootReducer, initialState);

    _enableHotLoader(store);
    return store;
}

function _getMiddleware() {
    let middleware = [
        promiseMiddleware,
        thunk,
    ];

    if (__DEV__) {
        middleware = [...middleware, logger];
    }

    return applyMiddleware(...middleware);
}

function _getEnhancers() {
    let enhancers = [
        persistState('session', _getStorageConfig()),
    ];

    if (__DEV__ && window.devToolsExtension) {
        enhancers = [...enhancers, window.devToolsExtension()];
    }

    return enhancers;
}

function _enableHotLoader(store) {
    if (__DEV__ && module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
}

function _getStorageConfig() {
    return {
        key: 'react-redux-seed',
        serialize: (store) => {
            return store && store.session 
                ? JSON.stringify(store.session)
                : store;
        },
        deserialize: (state) => ({
            session: state ? JSON.parse(state) : {}
        }),
    };
}

export default configureStore;
