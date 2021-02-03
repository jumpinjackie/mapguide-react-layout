import * as React from "react";
import { GenericMapProviderContext } from './generic';
import type { IMapProviderContext } from './base';
import { Provider } from "react-redux";

const MapProviderContext = React.createContext<IMapProviderContext>(new GenericMapProviderContext());

/**
 * Wraps the provider component of react-redux
 * @since 0.14
 */
export const ReduxProvider: React.FC<{ store: ReduxStoreImpl }> = ({ store, children }) => <Provider store={store}>{children}</Provider>

/**
 * @since 0.14
 */
export const MapProviderContextProvider: React.FC<{ value: IMapProviderContext }> = ({ value, children }) => {
    return <MapProviderContext.Provider value={value}>
        {children}
    </MapProviderContext.Provider>
}

/**
 * @since 0.14
 */
export function useMapProviderContext() {
    return React.useContext(MapProviderContext);
}

/**
 * @since 0.14
 */
export type ReduxStoreImpl = any;

/**
 * @since 0.14
 */
export const MapContextProvider: React.FC<{ value: IMapProviderContext, store?: ReduxStoreImpl }> = ({ value, store, children }) => {
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