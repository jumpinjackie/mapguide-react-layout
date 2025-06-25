import Map from 'ol/Map';
import React from 'react';

const OLMapContext = React.createContext<{ map: Map, domElement: HTMLDivElement } | undefined>(undefined);

/**
 * Provides access to the OpenLayers map object to child components
 * 
 * @since 0.15
 * @hidden
 */
export const OLMapContextProvider: React.FC<React.PropsWithChildren<{ map: Map, domElement: HTMLDivElement }>> = ({ map, domElement, children }) => {
    return <OLMapContext.Provider value={{ map, domElement }}>
        {children}
    </OLMapContext.Provider>
}

/**
 * Gets the OpenLayers map context
 * 
 * @since 0.15
 */
export function useOLMap() {
    const ctx = React.useContext(OLMapContext);
    // This should never happen because all components that provide extra layers and functionality 
    // should be rendered as child components, so you would have to be doing something wrong if you 
    // try to use this hook outside of the context of the OLMapContextProvider
    if (!ctx) {
        throw new Error("No OLMapContext found in parent")
    }

    return ctx;
}