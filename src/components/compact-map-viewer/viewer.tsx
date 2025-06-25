import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { OLMapContextProvider } from './context';
import Attribution from 'ol/control/Attribution';
import { MapMessageContextProvider } from './messages';

import "ol/ol.css";
import { useResourceRefInit } from './hooks';

/**
 * Compact viewer properties
 * 
 * @since 0.15
 */
export type CompactViewerProps = {
    /**
     * Optional style to set on the root DOM element
     */
    style?: React.CSSProperties;
    /**
     * The projection of the map view. Any layers you add to this map not in this projection will be re-projected to it.
     */
    projection: string;
    /**
     * The initial view of this map, in the specified projection
     */
    initialBBOX?: [number, number, number, number];
};

/**
 * The CompactViewer is a standalone low-level, bare-bones version of the map viewer free from the appdef infrastructure
 * and MapGuide-specific concerns
 * 
 * Use this when you need a basic low-level OpenLayers viewer without the MapGuide-related setup, registration and
 * feature set 
 * 
 * @since 0.15
 */
export const CompactViewer: React.FC<React.PropsWithChildren<CompactViewerProps>> = ({ style, projection, initialBBOX, children }) => {
    const mapElement = React.useRef<HTMLDivElement>(null);
    const [map, isReady] = useResourceRefInit<Map>(() => {
        const initialMap = new Map({
            target: mapElement.current!,
            layers: [],
            controls: [
                new Attribution({
                    collapsible: true
                })
            ],
            view: new View({
                projection
            })
        });
        if (initialBBOX) {
            initialMap.getView().fit(initialBBOX);
        }
        return initialMap;
    }, m => {
        m.setTarget(undefined);
        m.dispose();
    })

    return <div style={style} ref={mapElement}>
        {isReady && map && <OLMapContextProvider map={map} domElement={mapElement.current!}>
            <MapMessageContextProvider>
                {children}
            </MapMessageContextProvider>
        </OLMapContextProvider>}
    </div>;
}
