import React from 'react';
import View from 'ol/View';
import { useOLMap } from '../context';
import { Breadcrumb } from '../breadcrumb';
import type Map from 'ol/Map';
import type { ObjectEvent } from 'ol/Object';

/**
 * Props for the ViewListener component
 * 
 * @since 0.15
 */
export type ViewListenerProps = {
    /**
     * Callback that is invoked when the map view changes
     *
     * This is invoked when the map view changes, such as when the user pans or zooms the map.
     *
     * @param map - The OpenLayers map instance
     * @param view - The OpenLayers view instance that changed
     */
    onMapViewChanged?: (map: Map, view: View) => void;
};

/**
 * A React component that listens to OpenLayers map view changes and provides callbacks
 * 
 * This component attaches to the map view's 'change' event and invokes the provided callback
 * whenever the view changes (e.g., through panning, zooming, or programmatic updates).
 * It renders a debug breadcrumb when DOM breadcrumbs are enabled, otherwise renders nothing.
 * 
 * @example
 * ```tsx
 * <ViewListener 
 *   onMapViewChanged={(map, view) => {
 *     console.log('View changed:', view.getCenter(), view.getZoom());
 *   }}
 * />
 * ```
 * 
 * @since 0.15
 */
export const ViewListener: React.FC<ViewListenerProps> = ({ onMapViewChanged }) => {
    const { map, renderDomBreadcrumbs } = useOLMap();

    React.useEffect(() => {
        const view = map.getView();
        
        function onChangeOfView(e: ObjectEvent) {
            if (e.target instanceof View) {
                onMapViewChanged?.(map, e.target);
            }
        }

        view.on('change', onChangeOfView);
        return () => {
            view.un('change', onChangeOfView);
        };
    }, [map, onMapViewChanged]);

    if (renderDomBreadcrumbs) {
        // DOM breadcrumb so you know this component was indeed mounted
        return <Breadcrumb component="ViewListener" />;
    }
    return null;
};
