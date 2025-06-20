import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { OLMapContextProvider } from './context';
import Attribution from 'ol/control/Attribution';
import "ol/ol.css";

export type CompactViewerProps = {
    projection: string;
    initialBBOX?: [number, number, number, number];
};

/**
 * The CompactViewer is a standalone low-level, bare-bones version of the map viewer free from the appdef infrastructure
 * and MapGuide-specific concerns
 * 
 * Use this when you need a basic low-level OpenLayers viewer without the MapGuide-related setup, registration and
 * feature set 
 */
export const CompactViewer: React.FC<CompactViewerProps> = ({ projection, initialBBOX, children }) => {
    const [map, setMap] = React.useState<Map | null>(null);
    const mapElement = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        console.log("init map");
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

    return <div style={{ width: 640, height: 480, border: "1px solid black" }} ref={mapElement}>
        {map && <OLMapContextProvider map={map}>
            {children}
        </OLMapContextProvider>}
    </div>;
}
