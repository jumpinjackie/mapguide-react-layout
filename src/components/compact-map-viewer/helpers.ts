import Interaction from 'ol/interaction/Interaction';
import { MapMessageContext } from './messages';
import type Collection from 'ol/Collection';

/**
 * Represents a class constructor for an OpenLayers Interaction.
 */
type InteractionClass = new (...args: any[]) => Interaction;

/**
 * Adds an interaction to a collection before the first occurrence of any specified interaction classes.
 *
 * If any interaction in the collection is an instance of one of the provided interaction classes,
 * the new interaction is inserted before the first such instance. Otherwise, it is appended to the end.
 *
 * @param i The interaction to add.
 * @param c The collection of interactions.
 * @param messages The message context for logging info messages.
 * @param interactionClasses The array of interaction class constructors to check against.
 * @since 0.15
 */
export function addInteractionBefore(
    i: Interaction,
    c: Collection<Interaction>,
    messages: MapMessageContext,
    interactionClasses: InteractionClass[]
) {
    let intIndex = -1;
    for (let idx = 0; idx < c.getLength(); idx++) {
        for (const interactionClass of interactionClasses) {
            if (c.item(idx) instanceof interactionClass) {
                intIndex = idx;
                break;
            }
        }
        if (intIndex >= 0) {
            break;
        }
    }
    if (intIndex >= 0) {
        c.insertAt(intIndex, i);
        messages.addInfo(`Interaction added at index ${intIndex} (new size: ${c.getLength()})`);
    } else {
        c.push(i);
    }
}

/**
 * Computes an appropriate number for a cluster style setting based on its size, using linear interpolation between min and max values.
 *
 * The cluster size is clamped between minSize and maxSize, and the resulting value is interpolated
 * between minValue and maxValue.
 *
 * @param clusterSize The size of the cluster.
 * @param minValue The minimum style value.
 * @param maxValue The maximum style value.
 * @param minSize The minimum cluster size.
 * @param maxSize The maximum cluster size.
 * @returns The computed style value.
 * @since 0.15
 */
export function computeClusterStyleValue(clusterSize: number, minValue: number, maxValue: number, minSize: number, maxSize: number) {
    const clampedSize = Math.max(minSize, Math.min(clusterSize, maxSize));
    const value = minValue + ((clampedSize - minSize) / (maxSize - minSize)) * (maxValue - minValue);
    return value;
}