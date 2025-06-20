import React from "react";
import { CommonLayerProps } from "./contracts";
import { useOLMap } from "../context";
import ImageWmsSource from 'ol/source/ImageWMS';
import ImageLayer from 'ol/layer/Image';
import TileWmsSource from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import { useMapMessage } from "../messages";
import { useLayerState } from "./common";
import BaseLayer from "ol/layer/Base";

export type WMSLayerProps = CommonLayerProps & {
    url: string;
    layerName: string;
    tiled?: boolean;
};

export const WMSLayer: React.FC<WMSLayerProps> = ({ name, isHidden, extent, url, layerName, tiled }) => {
    const map = useOLMap();
    const messages = useMapMessage();
    const layer = useLayerState<BaseLayer>(name, isHidden, extent);
    function addLayer(url: string, ln: string, t?: boolean) {
        messages.addInfo("add wms layer");
        if (t) {
            const source = new TileWmsSource({
                url,
                params: {'LAYERS': ln, 'TILED': true}
            });
            const wmsLayer = new TileLayer({
                extent,
                source
            });
            layer.current = wmsLayer;
        } else {
            const source = new ImageWmsSource({
                url,
                params: {'LAYERS': ln}
            });
            const wmsLayer = new ImageLayer({
                extent,
                source
            });
            layer.current = wmsLayer;
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
    return <noscript />;
};