import { useOLMap } from "../context";
import OLTileLayer from 'ol/layer/Tile';
import OLXYZSource from 'ol/source/XYZ';
import React from "react";
import { CommonLayerProps } from "./contracts";

export type XYZLayerProps = CommonLayerProps & {
    urls: string[];
    attributions?: string[];
};

export const XYZLayer: React.FC<XYZLayerProps> = ({ name, urls, attributions }) => {
    const map = useOLMap();
    const layer = React.useRef<OLTileLayer | undefined>(undefined);
    const source = React.useRef<OLXYZSource | undefined>(undefined);
    React.useEffect(() => {
        console.log("add xyz layer");
        
        const tileSource = new OLXYZSource({
            urls: urls,
            attributions: attributions
        });
        source.current = tileSource;
        const tileLayer = new OLTileLayer({
            source: source.current
        });
        tileLayer.set("name", name);
        layer.current = tileLayer;
        map.addLayer(tileLayer);
        return () => {
            map.removeLayer(tileLayer);
        }
    }, []);
    return <noscript />;
};