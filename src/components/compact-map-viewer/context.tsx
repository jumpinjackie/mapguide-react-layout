import Map from 'ol/Map';
import React from 'react';

const OLMapContext = React.createContext<Map | undefined>(undefined);

/**
 * Provides access to the OpenLayers map object to child components
 * 
 * @since 0.15
 */
export const OLMapContextProvider: React.FC<React.PropsWithChildren<{ map: Map }>> = ({ map, children }) => {
    return <OLMapContext.Provider value={map}>
        {children}
    </OLMapContext.Provider>
}

/**
 * Gets the OpenLayers map object
 * 
 * @since 0.15
 */
export function useOLMap() {
    const map = React.useContext(OLMapContext);
    if (!map) {
        throw new Error("No OLMapContext found in parent")
    }

    return map;
}