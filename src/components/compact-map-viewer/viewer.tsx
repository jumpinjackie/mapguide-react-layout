import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { OLMapContextProvider } from './context';
import Attribution from 'ol/control/Attribution';
import { MapMessageContextProvider } from './messages';
import { useResourceRefInit } from './hooks';
import { isEmpty } from 'ol/extent';
import 'ol/ol.css';

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
     * The minimum permitted zoom level of this map.
     */
    minZoom?: number;
    /**
     * The maximum permitted zoom level of this map.
     */
    maxZoom?: number;
    /**
     * The minimum permitted resolution of this map.
     */
    minResolution?: number;
    /**
     * The maximum permitted resolution of this map.
     */
    maxResolution?: number;
    /**
     * The initial view of this map, in the specified projection
     */
    initialBBOX?: [number, number, number, number];
    /**
     * If true, child components will render a visually-hidden DOM breadcrumb element that can be used to verify
     * the component was mounted
     */
    renderDomBreadcrumbs?: boolean;
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
export const CompactViewer: React.FC<React.PropsWithChildren<CompactViewerProps>> = ({
    style,
    projection,
    initialBBOX,
    renderDomBreadcrumbs,
    minResolution,
    maxResolution,
    minZoom,
    maxZoom,
    children
}) => {
    const mapElement = React.useRef<HTMLDivElement>(null);
    const [map, isReady] = useResourceRefInit<Map>(
        () => {
            const initialMap = new Map({
                target: mapElement.current!,
                layers: [],
                controls: [
                    new Attribution({
                        collapsible: true
                    })
                ],
                view: new View({
                    projection,
                    minResolution,
                    maxResolution,
                    minZoom,
                    maxZoom
                })
            });
            if (initialBBOX && !isEmpty(initialBBOX)) {
                initialMap.getView().fit(initialBBOX);
            }
            return initialMap;
        },
        m => {
            m.setTarget(undefined);
            m.dispose();
        }
    );

    return (
        <div style={style} ref={mapElement}>
            {isReady && map && (
                <OLMapContextProvider map={map} domElement={mapElement.current!} renderDomBreadcrumbs={renderDomBreadcrumbs ?? false}>
                    <MapMessageContextProvider>{children}</MapMessageContextProvider>
                </OLMapContextProvider>
            )}
        </div>
    );
};
