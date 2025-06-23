import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { OLMapContextProvider } from './context';
import Attribution from 'ol/control/Attribution';
import { MapMessageContextProvider } from './messages';

import "ol/ol.css";

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
    const [map, setMap] = React.useState<Map | null>(null);
    const mapElement = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
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
        setMap(initialMap);
        return () => initialMap.setTarget(undefined);
    }, []);

    return <div style={style} ref={mapElement}>
        {map && <OLMapContextProvider map={map}>
            <MapMessageContextProvider>
                {children}
            </MapMessageContextProvider>
        </OLMapContextProvider>}
    </div>;
}
