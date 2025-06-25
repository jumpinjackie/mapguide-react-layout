import React from "react";
import { Breadcrumb } from "../breadcrumb";
import { useMapInteraction } from "../hooks";
import type Collection from "ol/Collection";
import type Feature from "ol/Feature";
import Snap, { type Options as SnapOptions } from "ol/interaction/Snap";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export type SnapInteractionProps = {
    /**
     * The name of the (vector) layer where snapping takes place, or an observable
     * feature collection where snapping is applied.
     */
    target: string | Collection<Feature>;
};

/**
 * A component that allows snapping to features in a vector layer or feature collection.
 */
export const SnapInteraction: React.FC<SnapInteractionProps> = ({ target: snapTarget }) => {
    useMapInteraction("Snap", (map, messages) => {
        let target: Collection<Feature> | VectorSource | undefined = undefined;
        if (typeof (snapTarget) === 'string') {
            const layer = map.getAllLayers().find(l => l.get("name") === snapTarget);
            if (!layer) {
                messages.addWarning(`Layer not found: ${snapTarget}`);
            } else {
                if (layer instanceof VectorLayer) {
                    target = layer.getSource();
                } else {
                    messages.addError(`Layer is not a vector layer: ${snapTarget}`);
                }
            }
        } else {
            target = snapTarget;
        }
        if (target) {
            const snapOptions: SnapOptions = {};
            if (target instanceof VectorSource) {
                snapOptions.source = target;
            } else {
                snapOptions.features = target;
            }
            const snap = new Snap(snapOptions);
            return snap;
        }
    }, [snapTarget]);

    // DOM breadcrumb so you know this component was indeed mounted
    return <Breadcrumb component="SnapInteraction" />;
}