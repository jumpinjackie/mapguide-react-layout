import React from "react";
import { useOLMap } from "../context";
import Draw from "ol/interaction/Draw";
import type { Type } from "ol/geom/Geometry";
import VectorLayer from "ol/layer/Vector";
import Snap from "ol/interaction/Snap";

export type DrawInteractionProps = {
    type: Type;
    layerName: string;
    snapToLayerObjects?: boolean;
};

export const DrawInteraction: React.FC<DrawInteractionProps> = ({ type, layerName, snapToLayerObjects }) => {
    const map = useOLMap();
    const draw = React.useRef<Draw | undefined>(undefined);
    const snap = React.useRef<Snap | undefined>(undefined);
    React.useEffect(() => {
        const layer = map.getAllLayers().find(l => l.get("name") === layerName);
        if (!layer) {
            console.warn("Layer not found", layerName);
        } else {
            if (layer instanceof VectorLayer) {
                const source = layer.getSource();
                const intDraw = new Draw({ type, source });
                map.addInteraction(intDraw);
                draw.current = intDraw;
                if (snapToLayerObjects) {
                    const intSnap = new Snap({ source });
                    map.addInteraction(intSnap);
                    snap.current = intSnap;
                }
            } else {
                console.warn("Layer is not a vector layer", layerName);
            }
        }
        return () => {
            if (draw.current) {
                map.removeInteraction(draw.current);
            }
            if (snap.current) {
                map.removeInteraction(snap.current);
            }
        };
    }, []);
    return <noscript />;
}