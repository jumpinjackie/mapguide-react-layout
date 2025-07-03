import { useOLMap } from '../context';
import OLTileLayer from 'ol/layer/Tile';
import OLXYZSource from 'ol/source/XYZ';
import React from 'react';
import type { CommonLayerProps } from './contracts';
import { useMapMessage } from '../messages';
import { useLayerState } from './common';
import { Breadcrumb } from '../breadcrumb';

/**
 * XYZ layer component properties
 *
 * @since 0.15
 */
export type XYZLayerProps = CommonLayerProps & {
    /**
     * The XYZ tile service URL. Can specify multiple URLs for load-balancing.
     */
    urls: string[];
    /**
     * Tile layer attributions
     */
    attributions?: string[];
};

/**
 * A layer component that display image tiles from a service with an XYZ tile access scheme
 *
 * @since 0.15
 */
export const XYZLayer: React.FC<XYZLayerProps> = ({ name, isHidden, extent, urls, attributions }) => {
    const { map, renderDomBreadcrumbs } = useOLMap();
    const messages = useMapMessage();
    const layer = useLayerState<OLTileLayer>(name, isHidden, extent);
    React.useEffect(() => {
        if (!layer.current) {
            messages.addInfo('add xyz layer');
            const tileSource = new OLXYZSource({
                urls: urls,
                attributions: attributions
            });
            const tileLayer = new OLTileLayer({
                extent,
                source: tileSource
            });
            tileLayer.set('name', name);
            layer.current = tileLayer;
            map.addLayer(tileLayer);
        }
        return () => {
            if (layer.current) {
                map.removeLayer(layer.current);
                messages.addInfo('removed xyz layer');
                layer.current.dispose();
                layer.current = undefined;
            }
        };
    }, []);

    if (renderDomBreadcrumbs) {
        // DOM breadcrumb so you know this component was indeed mounted
        return <Breadcrumb component="XYZLayer" />;
    }
    return null;
};
