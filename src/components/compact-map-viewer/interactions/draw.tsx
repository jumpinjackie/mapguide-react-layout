import React from "react";
import { useOLMap } from "../context";
import Draw from "ol/interaction/Draw";
import type { Type } from "ol/geom/Geometry";
import VectorLayer from "ol/layer/Vector";
import Snap from "ol/interaction/Snap";
import { useMapMessage } from "../messages";

export type DrawInteractionProps = {
    type: Type;
    layerName: string;
    snapToLayerObjects?: boolean;
};

export const DrawInteraction: React.FC<DrawInteractionProps> = ({ type, layerName, snapToLayerObjects }) => {
    const map = useOLMap();
    const messages = useMapMessage();
    const draw = React.useRef<Draw | undefined>(undefined);
    const snap = React.useRef<Snap | undefined>(undefined);

    function removeInteractions() {
        if (draw.current) {
            map.removeInteraction(draw.current);
            messages.addInfo("removed draw interaction");
        }
        if (snap.current) {
            map.removeInteraction(snap.current);
            messages.addInfo("removed snap interaction");
        }
    }

    function addInteractions(t: Type, ln: string, doSnap?: boolean) {
        const layer = map.getAllLayers().find(l => l.get("name") === ln);
        if (!layer) {
            messages.addWarning(`Layer not found: ${ln}`);
        } else {
            if (layer instanceof VectorLayer) {
                const source = layer.getSource();
                const intDraw = new Draw({ type: t, source });
                map.addInteraction(intDraw);
                messages.addInfo("added draw interaction");
                draw.current = intDraw;
                if (doSnap) {
                    const intSnap = new Snap({ source });
                    map.addInteraction(intSnap);
                    messages.addInfo("added snap interaction");
                    snap.current = intSnap;
                }
            } else {
                messages.addWarning(`Layer is not a vector layer: ${layerName}`);
            }
        }
    }

    React.useEffect(() => {
        removeInteractions();
        addInteractions(type, layerName, snapToLayerObjects);
        return () => {
            removeInteractions();
        };
    }, [type, layerName, snapToLayerObjects]);
    return <noscript />;
}