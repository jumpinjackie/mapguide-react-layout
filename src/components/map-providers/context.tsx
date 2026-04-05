import * as React from "react";
import type { IMapProviderContext, IReduxStoreRef } from './base';
import { Provider, useDispatch, useSelector } from "react-redux";
import type { IApplicationState } from "../../api/common";
import type { configureStore } from "../../store/configure-store";

const MapProviderContext = React.createContext<IMapProviderContext>({} as any);

/**
 * Wraps the provider component of react-redux
 * 
 * @since 0.14
 */
export const ReduxProvider: React.FC<React.PropsWithChildren<{ store: ReduxStoreImpl }>> = ({ store, children }) => <Provider store={store}>{children}</Provider>

/**
 * Wraps useDispatch from react-redux
 * 
 * @since 0.14
 */
export function useReduxDispatch() {
    return useDispatch();
}

/**
 * Fetches the requested sub-section of the application state
 * 
 * @since 0.14
 */
export function useAppState<TState>(selector: (state: IApplicationState) => TState, equalityFn?: (left: TState, right: TState) => boolean) {
    return useSelector<IApplicationState, TState>(selector, equalityFn);
}

/**
 * @since 0.14
 */
export const MapProviderContextProvider: React.FC<React.PropsWithChildren<{ value: IMapProviderContext }>> = ({ value, children }) => {
    return <MapProviderContext.Provider value={value}>
        {children}
    </MapProviderContext.Provider>
}

/**
 * Obtains the current map provider context, which provides imperative access to the current map
 * 
 * @since 0.14
 */
export function useMapProviderContext() {
    return React.useContext(MapProviderContext);
}

/**
 * @since 0.14
 * @since 0.15 - No longer an alias of `any`
 */
export type ReduxStoreImpl = ReturnType<typeof configureStore>;

/**
 * @since 0.14
 */
export const MapContextProvider: React.FC<React.PropsWithChildren<{ value: IMapProviderContext, store?: ReduxStoreImpl }>> = ({ value, store, children }) => {
    // Inject the Redux store reference into the provider so it can lazily initialize
    // secondary map layer set groups on demand (e.g. for the map swipe feature).
    React.useEffect(() => {
        // Cast is safe: the redux-toolkit-enhanced store dispatch accepts ViewerAction/ReduxThunkedAction
        // at runtime, but TypeScript sees Dispatch<AnyAction> which is not structurally identical to ReduxDispatch.
        value.setReduxStore(store as IReduxStoreRef | undefined);
        return () => {
            value.setReduxStore(undefined);
        };
    }, [value, store]);
    let inner = children;
    if (store) {
        inner = <ReduxProvider store={store}>
            {children}
        </ReduxProvider>;
    }
    return <MapProviderContextProvider value={value}>
        {inner}
    </MapProviderContextProvider>
};