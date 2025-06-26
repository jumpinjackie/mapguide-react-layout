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
import type { EventsKey } from "ol/events";
import { unByKey } from "ol/Observable";

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

    /**
     * Optional callback that is invoked when features are modified.
     * This is useful if you want to perform additional actions after the modification, such as updating state or triggering other side effects.
     * 
     * @param features The collection of features that were modified.
     */
    onFeaturesModified?: (features: Collection<Feature>) => void;
};

export const ModifyInteraction: React.FC<ModifyInteractionProps> = ({ target: modifyTarget, onFeaturesModified }) => {
    const evtKey = React.useRef<EventsKey | undefined>(undefined);
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
        const m = new Modify(options);
        evtKey.current = m.on("modifyend", (e) => {
            onFeaturesModified?.(e.features);
        });
        return m;
    }, [modifyTarget]);

    useMapInteraction("Modify", createModifyInteraction, [modifyTarget], (i, c, messages) => {
        // Per: https://openlayers.org/en/latest/examples/snap.html
        // If a snap interaction is present, this interaction must be before it
        //
        // Basically Modify > Draw > Snap in terms of order
        addInteractionBefore(i, c, messages, [Draw, Snap]);
    }, m => {
        if (evtKey.current) {
            unByKey(evtKey.current);
        }
    });

    // DOM breadcrumb so you know this component was indeed mounted
    return <Breadcrumb component="ModifyInteraction" />;
};