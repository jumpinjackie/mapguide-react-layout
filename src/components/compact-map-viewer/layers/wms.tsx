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
     * Any extra params to pass in for WMS requests
     */
    customParams?: Record<string, string>;
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
export const WMSLayer: React.FC<WMSLayerProps> = ({ name, isHidden, extent, url, layerName, customParams, tiled, infoFormat, onGetFeatureInfo }) => {
    const map = useOLMap();
    const messages = useMapMessage();
    const layer = useLayerState<BaseLayer>(name, isHidden, extent);
    const wmsSource = React.useRef<TileWmsSource | ImageWmsSource | undefined>(undefined);

    function addTiled(wmsUrl: string, ln: string, ext?: [number, number, number, number], insertAtIndex?: number) {
        const source = new TileWmsSource({
            url: wmsUrl,
            params: { 'LAYERS': ln, 'TILED': true }
        });
        const wmsLayer = new TileLayer({
            extent: ext,
            source
        });
        layer.current = wmsLayer;
        wmsSource.current = source;

        if (typeof (insertAtIndex) != 'undefined') {
            messages.addInfo(`Inserting tiled wms layer at index: ${insertAtIndex}`);
            const layers = map.getLayerGroup().getLayers();
            layers.insertAt(insertAtIndex, layer.current);
        } else {
            messages.addInfo("add tiled wms layer");
            map.addLayer(layer.current);
        }
    }

    function shallowCompare(obj1: any, obj2: any) {
        return Object.keys(obj1).length === Object.keys(obj2).length &&
            Object.keys(obj1).every(key => obj1[key] === obj2[key]);
    }

    function updateLayerProperties(wmsUrl: string, ln: string, cParms?: Record<string, string>) {
        if (wmsSource.current) {
            const parms = wmsSource.current.getParams();
            const newParms = {
                ...parms,
                ...cParms,
                LAYERS: ln
            }
            if (!shallowCompare(parms, newParms)) {
                messages.addInfo("Apply new WMS request params");
                wmsSource.current.setParams(newParms);
            }

            const oldUrl = wmsSource.current.get("url");
            if (oldUrl != wmsUrl) {
                messages.addInfo("Apply new WMS url");
                wmsSource.current?.set("url", wmsUrl);
            }
        } else {
            messages.addWarning("No WMS source attached. Doing nothing");
        }
    }

    function addUntiled(wmsUrl: string, ln: string, ext?: [number, number, number, number], insertAtIndex?: number) {
        const source = new ImageWmsSource({
            url: wmsUrl,
            params: { 'LAYERS': ln }
        });
        const wmsLayer = new ImageLayer({
            extent: ext,
            source
        });
        layer.current = wmsLayer;
        wmsSource.current = source;

        if (typeof (insertAtIndex) != 'undefined') {
            messages.addInfo(`Inserting untiled wms layer at index: ${insertAtIndex}`);
            const layers = map.getLayerGroup().getLayers();
            layers.insertAt(insertAtIndex, layer.current);
        } else {
            messages.addInfo("add untiled wms layer");
            map.addLayer(layer.current);
        }
    }

    function addOrUpdateLayer(wmsUrl: string, ln: string, cParms?: Record<string, string>, t?: boolean, ext?: [number, number, number, number]) {
        if (t) { // Tiled
            if (layer.current) {
                if (layer.current instanceof ImageLayer && wmsSource.current instanceof ImageWmsSource) {
                    removeLayer();
                    addTiled(wmsUrl, ln, ext);
                } else {
                    updateLayerProperties(wmsUrl, ln, cParms);
                }
            } else {
                addTiled(wmsUrl, ln);
            }
        } else {
            if (layer.current) {
                if (layer.current instanceof TileLayer && wmsSource.current instanceof TileWmsSource) {
                    removeLayer();
                    addUntiled(wmsUrl, ln, ext);
                } else {
                    updateLayerProperties(wmsUrl, ln, cParms);
                }
            } else {
                addUntiled(wmsUrl, ln);
            }
        }
    }

    function removeLayer() {
        if (layer.current) {
            map.removeLayer(layer.current);
            messages.addInfo("removed wms layer");
            layer.current = undefined;
        }
        if (wmsSource.current) {
            wmsSource.current.dispose();
            messages.addInfo("disposed wms source");
            wmsSource.current = undefined;
        }
    }

    React.useEffect(() => {
        addOrUpdateLayer(url, layerName, customParams, tiled, extent);
        return () => {
            removeLayer();
        }
    }, [url, layerName, customParams, tiled, extent]);

    const memoizedMapClickHandler = React.useCallback((e: MapBrowserEvent) => {
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
    }, [onGetFeatureInfo, infoFormat]);

    React.useEffect(() => {
        map.on('singleclick', memoizedMapClickHandler);
        //console.log("attached click handler");
        return () => {
            map.un('singleclick', memoizedMapClickHandler);
            //console.log("detached click handler");
        }
    }, [memoizedMapClickHandler]);
    // DOM breadcrumb so you know this component was indeed mounted
    return <noscript data-map-component="WMSLayer" />;
};