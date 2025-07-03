import React from 'react';
import Select, { type SelectEvent, type Options as SelectOptions } from 'ol/interaction/Select';
import { click, pointerMove } from 'ol/events/condition';
import { assertNever } from '../../../utils/never';
import type Collection from 'ol/Collection';
import type Feature from 'ol/Feature';
import { Breadcrumb } from '../breadcrumb';
import { useMapInteraction } from '../hooks';
import { useOLMap } from '../context';
import { FeatureLike } from 'ol/Feature';

/**
 * Select component properties
 *
 * @since 0.15
 */
export type SelectInteractionProps = {
    /**
     * The mode of selection.
     *
     *  - `'click'`: Select features on mouse click.
     *  - `'hover'`: Select features on mouse hover.
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
    /**
     * An optional callback that is invoked when the selection changes. This is useful if you want to
     * perform some action when the selection changes, such as updating the UI or triggering other interactions.
     */
    onSelectionChanged?: (e: SelectEvent) => void;
    /**
     * The style to apply to selected features.
     * If not specified, the default style will be used.
     */
    style?: SelectOptions['style'];
};

function modeToCondition(type: Exclude<SelectInteractionProps['mode'], undefined>) {
    switch (type) {
        case 'click':
            return click;
        case 'hover':
            return pointerMove;
        default:
            assertNever(type);
    }
}

/**
 * A component that allows vector features to be selected
 *
 * @since 0.15
 */
export const SelectInteraction: React.FC<SelectInteractionProps> = ({ mode, features, layers, style, onSelectionChanged }) => {
    const { renderDomBreadcrumbs } = useOLMap();

    function onSelect(e: SelectEvent) {
        onSelectionChanged?.(e);
    }

    useMapInteraction(
        'Select',
        map => {
            const s = new Select({
                style: style,
                condition: e => {
                    const handler = modeToCondition(mode)!;
                    if (!handler(e)) {
                        return false;
                    }
                    if (e.type === 'click') {
                        let fs: FeatureLike[] | undefined = undefined;
                        map.forEachFeatureAtPixel(e.pixel, (f, layer) => {
                            const featureData = f.get('features') as FeatureLike[] | undefined;
                            if (featureData) {
                                fs = featureData;
                            }
                        });
                        // HACK: TypeScript gave up on flow analysis because I set fs inside a forEachFeatureAtPixel callback
                        const fs2 = fs as FeatureLike[] | undefined;
                        if (fs2 && fs2.length > 1) {
                            const view = map.getView();
                            const currentZoom = view.getZoom();
                            const maxZoom = view.getMaxZoom();
                            if (currentZoom === maxZoom) {
                                // You are at the lowest possible zoom level
                                return true; // Allow selection at the lowest zoom level
                            }
                            return false; // Prevent selection if it's a cluster
                        }
                        return true; // Allow selection of individual features
                    }
                    return true;
                },
                features: features,
                layers: layer => {
                    if (Array.isArray(layers)) {
                        return layers.includes(layer.get('name'));
                    }
                    return true;
                }
            });
            s.on('select', onSelect);
            return s;
        },
        [mode, features, layers],
        undefined,
        s => {
            s.un('select', onSelect);
        }
    );

    if (renderDomBreadcrumbs) {
        // DOM breadcrumb so you know this component was indeed mounted
        return <Breadcrumb component="SelectInteraction" />;
    }
    return null;
};
