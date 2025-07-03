import React from 'react';
import Draw, { type Options as DrawOptions } from 'ol/interaction/Draw';
import type { Type } from 'ol/geom/Geometry';
import VectorLayer from 'ol/layer/Vector';
import type Collection from 'ol/Collection';
import type Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import { Breadcrumb } from '../breadcrumb';
import type { VectorLayerProps } from '../layers/vector';
import { useMapInteraction } from '../hooks';
import Snap from 'ol/interaction/Snap';
import { addInteractionBefore } from '../helpers';
import { useOLMap } from '../context';

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
    target: string | Collection<Feature>;
    /**
     * The style to apply to the features being drawn. If not specified, the default style will be used.
     */
    style?: VectorLayerProps['style'];
    /**
     * The key to press to undo the last point drawn. If not specified, no undo will be available.
     */
    undoLastPointKey?: string[];
    /**
     * The key to press to cancel the current drawing operation. If not specified, no cancel will be available.
     */
    cancelKey?: string[];
};

/**
 * A component that allows one to draw features on the map
 *
 * @since 0.15
 */
export const DrawInteraction: React.FC<DrawInteractionProps> = ({ type, target: drawTarget, style, cancelKey, undoLastPointKey }) => {
    const { renderDomBreadcrumbs } = useOLMap();
    const draw = useMapInteraction(
        'Draw',
        (map, messages) => {
            let target: Collection<Feature> | VectorSource | undefined = undefined;
            if (typeof drawTarget === 'string') {
                const layer = map.getAllLayers().find(l => l.get('name') === drawTarget);
                if (!layer) {
                    messages.addWarning(`Layer not found: ${drawTarget}`);
                } else {
                    if (layer instanceof VectorLayer) {
                        target = layer.getSource();
                    } else {
                        messages.addError(`Layer is not a vector layer: ${drawTarget}`);
                    }
                }
            } else {
                target = drawTarget;
            }
            if (target) {
                let dOpts: DrawOptions = { type, style: style ?? undefined };
                if (target instanceof VectorSource) {
                    dOpts.source = target;
                } else {
                    dOpts.features = target;
                }
                return new Draw(dOpts);
            }
        },
        [type, drawTarget, style],
        (i, c, messages) => {
            // Per: https://openlayers.org/en/latest/examples/snap.html
            // If a snap interaction is present, this interaction must be before it
            //
            // Basically Modify > Draw > Snap in terms of order
            addInteractionBefore(i, c, messages, [Snap]);
        }
    );

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            if (draw.current) {
                if (cancelKey && cancelKey.includes(event.key)) {
                    draw.current.abortDrawing();
                } else if (undoLastPointKey && undoLastPointKey.includes(event.key)) {
                    draw.current.removeLastPoint();
                }
            }
        },
        [cancelKey, undoLastPointKey, draw.current]
    );

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    if (renderDomBreadcrumbs) {
        // DOM breadcrumb so you know this component was indeed mounted
        return <Breadcrumb component="DrawInteraction" />;
    }
    return null;
};
