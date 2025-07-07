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
import { MapBrowserEvent } from 'ol';
import Style, { createEditingStyle, StyleLike } from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';
import { extend } from 'ol/array';

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
     *  - `'never'`: Do not select features on user interaction. Use this mode if you want full programmatic control over selection.
     */
    mode: 'click' | 'hover' | 'never';
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

function neverHandler(e: MapBrowserEvent) {
    return false;
}

function modeToCondition(type: Exclude<SelectInteractionProps['mode'], undefined>) {
    switch (type) {
        case 'click':
            return click;
        case 'hover':
            return pointerMove;
        case 'never':
            return neverHandler;
        default:
            assertNever(type);
    }
}

function getDefaultStyleFunction() {
    const styles = createEditingStyle();
    extend(styles['Polygon'], styles['LineString']);
    extend(styles['GeometryCollection'], styles['LineString']);

    return (feature: FeatureLike) => {
        const fg = feature.getGeometry();
        if (!fg) {
            return null;
        }
        return styles[fg.getType()];
    };
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
                style: style ?? getDefaultStyleFunction(),
                condition: modeToCondition(mode),
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
