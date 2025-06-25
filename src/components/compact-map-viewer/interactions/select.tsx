import React from "react";
import Select from 'ol/interaction/Select';
import { click, pointerMove } from 'ol/events/condition';
import { assertNever } from "../../../utils/never";
import type Collection from 'ol/Collection';
import type Feature from 'ol/Feature';
import { Breadcrumb } from "../breadcrumb";
import { useMapInteraction } from "../hooks";

/**
 * Select component properties
 * 
 * @since 0.15
 */
export type SelectInteractionProps = {
    /**
     * The mode of selection
     */
    mode: 'click' | 'hover';
    /**
     * An optional observable feature collections where selected objects are added to and removed from
     */
    features?: Collection<Feature>;
    /**
     * An optional array of layer names to limit the selection to. If not specified, all layers are considered.
     */
    layers?: string[];
};

function modeToCondition(type: SelectInteractionProps['mode']) {
    switch (type) {
        case 'click': return click;
        case 'hover': return pointerMove;
        default: assertNever(type);
    }
}

/**
 * A component that allows vector features to be selected
 * 
 * @since 0.15
 */
export const SelectInteraction: React.FC<SelectInteractionProps> = ({ mode, features, layers }) => {
    useMapInteraction(
        "Select",
        (map) =>
            new Select({
                condition: modeToCondition(mode),
                features: features,
                layers: (layer) => {
                    if (Array.isArray(layers)) {
                        return layers.includes(layer.get('name'));
                    }
                    return true;
                }
            }),
        [mode, features, layers]
    );

    // DOM breadcrumb so you know this component was indeed mounted
    return <Breadcrumb component="SelectInteraction" />;
};