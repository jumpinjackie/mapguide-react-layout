import Map from 'ol/Map';
import React from 'react';

const OLMapContext = React.createContext<Map | undefined>(undefined);

export const OLMapContextProvider: React.FC<{ map: Map }> = ({ map, children }) => {
    return <OLMapContext.Provider value={map}>
        {children}
    </OLMapContext.Provider>
}

export function useOLMap() {
    const map = React.useContext(OLMapContext);
    if (!map) {
        throw new Error("No OLMapContext found in parent")
    }

    return map;
}