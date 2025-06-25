import type Collection from "ol/Collection";
import type Feature from "ol/Feature";
import type Map from "ol/Map";
import Modify, { type Options as ModifyOptions } from "ol/interaction/Modify";
import VectorLayer from "ol/layer/Vector";
import React from "react";
import { Breadcrumb } from "../breadcrumb";
import { useMapInteraction } from "../hooks";
import Snap from "ol/interaction/Snap";
import { addInteractionBefore } from "../helpers";
import Draw from "ol/interaction/Draw";

/**
 * ModifyInteraction component properties
 * 
 * @since 0.15
 */
export type ModifyInteractionProps = {
    /**
     * The name of the (vector) layer that this interaction can modify features in or the observable
     * feature collection that this interaction can modify.
     */
    target: string | Collection<Feature>;
};

export const ModifyInteraction: React.FC<ModifyInteractionProps> = ({ target: modifyTarget }) => {
    const createModifyInteraction = React.useCallback((map: Map) => {
        let options: ModifyOptions = {};
        if (typeof modifyTarget === "string") {
            const layer = map.getAllLayers().find(l => l.get("name") === modifyTarget);
            if (layer instanceof VectorLayer) {
                options.source = layer.getSource();
            }
        } else {
            options.features = modifyTarget;
        }
        return new Modify(options);
    }, [modifyTarget]);

    useMapInteraction("Modify", createModifyInteraction, [modifyTarget], (i, c, messages) => {
        // Per: https://openlayers.org/en/latest/examples/snap.html
        // If a snap interaction is present, this interaction must be before it
        //
        // Basically Modify > Draw > Snap in terms of order
        addInteractionBefore(i, c, messages, [Draw, Snap]);
    });

    // DOM breadcrumb so you know this component was indeed mounted
    return <Breadcrumb component="ModifyInteraction" />;
};