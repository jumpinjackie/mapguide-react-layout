import { useOLMap } from "../context";
import OLTileLayer from 'ol/layer/Tile';
import OLXYZSource from 'ol/source/XYZ';
import React from "react";
import { CommonLayerProps } from "./contracts";
import { useMapMessage } from "../messages";
import { useLayerState } from "./common";

export type XYZLayerProps = CommonLayerProps & {
    urls: string[];
    attributions?: string[];
};

export const XYZLayer: React.FC<XYZLayerProps> = ({ name, isHidden, extent, urls, attributions }) => {
    const map = useOLMap();
    const messages = useMapMessage();
    const layer = useLayerState<OLTileLayer>(name, isHidden, extent);
    React.useEffect(() => {
        messages.addInfo("add xyz layer");
        const tileSource = new OLXYZSource({
            urls: urls,
            attributions: attributions
        });
        const tileLayer = new OLTileLayer({
            extent,
            source: tileSource
        });
        tileLayer.set("name", name);
        layer.current = tileLayer;
        map.addLayer(tileLayer);
        return () => {
            map.removeLayer(tileLayer);
            messages.addInfo("removed xyz layer");
        }
    }, []);
    return <noscript />;
};