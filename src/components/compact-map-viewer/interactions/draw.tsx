import React from "react";
import { useOLMap } from "../context";
import Draw, { type Options as DrawOptions } from "ol/interaction/Draw";
import type { Type } from "ol/geom/Geometry";
import VectorLayer from "ol/layer/Vector";
import Snap, { type Options as SnapOptions } from "ol/interaction/Snap";
import { useMapMessage } from "../messages";
import type Collection from "ol/Collection";
import type Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";


/**
 * Draw component properties
 * 
 * @since 0.15
 */
export type DrawInteractionProps = {
    /**
     * The type of geometry one can draw
     */
    type: Type;
    /**
     * The name of the (vector) layer that drawn features are added to or the observable
     * feature collection to save the drawn features to
     */
    drawTarget: string | Collection<Feature>;
    /**
     * If true, drawing will snap to other features on the specified layer
     */
    snapToLayerObjects?: boolean;
};

/**
 * A component that allows one to draw features on the map
 * 
 * @since 0.15
 */
export const DrawInteraction: React.FC<DrawInteractionProps> = ({ type, drawTarget, snapToLayerObjects }) => {
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

    function addDraw(source: VectorSource | Collection<Feature>, type: Type, doSnap?: boolean) {
        let dOpts: DrawOptions = { type };
        if (source instanceof VectorSource) {
            dOpts.source = source;
        } else {
            dOpts.features = source;
        }
        const intDraw = new Draw(dOpts);
        map.addInteraction(intDraw);
        messages.addInfo("added draw interaction");
        draw.current = intDraw;
        if (doSnap) {
            let sOpts: SnapOptions = {};
            if (source instanceof VectorSource) {
                sOpts.source = source;
            } else {
                sOpts.features = source;
            }
            const intSnap = new Snap(sOpts);
            map.addInteraction(intSnap);
            messages.addInfo("added snap interaction");
            snap.current = intSnap;
        }
    }

    function addInteractions(t: Type, ln: DrawInteractionProps["drawTarget"], doSnap?: boolean) {
        if (typeof (ln) === 'string') {
            const layer = map.getAllLayers().find(l => l.get("name") === ln);
            if (!layer) {
                messages.addWarning(`Layer not found: ${ln}`);
            } else {
                if (layer instanceof VectorLayer) {
                    const source = layer.getSource();
                    addDraw(source, t, doSnap);
                } else {
                    messages.addWarning(`Layer is not a vector layer: ${ln}`);
                }
            }
        } else {
            addDraw(ln, t, doSnap);
        }
    }

    React.useEffect(() => {
        removeInteractions();
        addInteractions(type, drawTarget, snapToLayerObjects);
        return () => {
            removeInteractions();
        };
    }, [type, drawTarget, snapToLayerObjects]);
    // DOM breadcrumb so you know this component was indeed mounted
    return <noscript data-map-component="DrawInteraction" />;
}