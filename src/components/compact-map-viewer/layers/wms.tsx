import React from "react";
import type { CommonLayerProps } from "./contracts";
import { useOLMap } from "../context";
import ImageWmsSource from 'ol/source/ImageWMS';
import ImageLayer from 'ol/layer/Image';
import TileWmsSource from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import { useMapMessage } from "../messages";
import { useLayerState } from "./common";
import type BaseLayer from "ol/layer/Base";
import type { MapBrowserEvent } from "ol";

/**
 * WMS layer component properties
 * 
 * @since 0.15
 */
export type WMSLayerProps = CommonLayerProps & {
    /**
     * The WMS service URL
     */
    url: string;
    /**
     * The WMS layer name
     */
    layerName: string;
    /**
     * Controls whether the layer should be tiled
     */
    tiled?: boolean;
    /**
     * The desired format for WMS GetFeatureInfo responses
     */
    infoFormat?: string;
    /**
     * If specified, map click events will send off WMS GetFeatureInfo requests in the format
     * indicated by infoFormat prop value. When the response is received, this specified function
     * will be called with the raw response content.
     */
    onGetFeatureInfo?: (content: string) => void;
};

/**
 * A layer component that displays features from a WMS service
 * 
 * @since 0.15
 */
export const WMSLayer: React.FC<WMSLayerProps> = ({ name, isHidden, extent, url, layerName, tiled, infoFormat, onGetFeatureInfo }) => {
    const map = useOLMap();
    const messages = useMapMessage();
    const layer = useLayerState<BaseLayer>(name, isHidden, extent);
    const wmsSource = React.useRef<TileWmsSource | ImageWmsSource | undefined>(undefined);
    function addLayer(url: string, ln: string, t?: boolean) {
        messages.addInfo("add wms layer");
        if (t) {
            const source = new TileWmsSource({
                url,
                params: { 'LAYERS': ln, 'TILED': true }
            });
            const wmsLayer = new TileLayer({
                extent,
                source
            });
            layer.current = wmsLayer;
            wmsSource.current = source;
        } else {
            const source = new ImageWmsSource({
                url,
                params: { 'LAYERS': ln }
            });
            const wmsLayer = new ImageLayer({
                extent,
                source
            });
            layer.current = wmsLayer;
            wmsSource.current = source;
        }
        layer.current.set("name", name);
        map.addLayer(layer.current);
    }

    function removeLayer() {
        if (layer.current) {
            map.removeLayer(layer.current);
            messages.addInfo("removed wms layer");
        }
    }

    React.useEffect(() => {
        addLayer(url, layerName, tiled);
        return () => {
            removeLayer();
        }
    }, [url, layerName, tiled]);

    function mapClickHandler(e: MapBrowserEvent) {
        if (wmsSource.current && onGetFeatureInfo) {
            const viewResolution = map.getView().getResolution();
            if (viewResolution) {
                const url = wmsSource.current.getFeatureInfoUrl(e.coordinate, viewResolution, map.getView().getProjection(), {
                    'INFO_FORMAT': infoFormat
                });
                if (url) {
                    fetch(url)
                        .then(r => r.text())
                        .then(content => onGetFeatureInfo(content));
                }
            }
        }
    }

    React.useEffect(() => {
        if (onGetFeatureInfo) {
            map.on('singleclick', mapClickHandler);
        } else {
            map.un('singleclick', mapClickHandler);
        }
    }, [onGetFeatureInfo]);
    return <noscript />;
};