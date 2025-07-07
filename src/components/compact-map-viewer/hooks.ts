import Interaction from 'ol/interaction/Interaction';
import Control from 'ol/control/Control';
import React from 'react';
import type Map from 'ol/Map';
import { useOLMap } from './context';
import { MapMessageContext, useMapMessage } from './messages';
import Collection, { type CollectionEvent } from 'ol/Collection';
import Feature from 'ol/Feature';

/**
 * A custom React hook that initializes a resource with a setup function and cleans it up with a teardown function.
 * The hook returns the resource (or `undefined` if not yet initialized) and a boolean indicating readiness.
 *
 * @template T The type of the resource to be managed.
 * @param setup - A function that creates and returns the resource.
 * @param teardown - A function that cleans up the resource.
 * @returns A tuple containing the resource (or `undefined`) and a boolean indicating if the resource is ready.
 *
 * @example
 * const [resource, isReady] = useResourceRefInit(
 *   () => createResource(),
 *   (res) => cleanupResource(res)
 * );
 *
 * @since 0.15
 */
export function useResourceRefInit<T>(setup: () => T, teardown: (obj: T) => void): [T | undefined, boolean] {
    const resourceRef = React.useRef<T | undefined>(undefined);
    const [isReady, setIsReady] = React.useState(false);
    React.useEffect(() => {
        resourceRef.current = setup();
        setIsReady(true);
        return () => {
            if (resourceRef.current) {
                teardown(resourceRef.current);
                setIsReady(false);
                resourceRef.current = undefined;
            }
        };
    }, []);
    return [resourceRef.current, isReady];
}

/**
 * Event handler function type for OpenLayers Collection events with Feature items.
 * 
 * @param event - The collection event containing information about the added/removed feature.
 * 
 * @since 0.15
 */
export type CollectionEventHandler = (event: CollectionEvent<Feature>) => void;

/**
 * Configuration arguments for the useFeatureCollection hook.
 * 
 * @since 0.15
 */
export type CollectionHookArgs = {
    /**
     * Optional array of features to initialize the collection with.
     */
    initialFeatures?: Feature[];
    /**
     * Event handler function called when features are added to the collection.
     */
    addHandler: CollectionEventHandler;
    /**
     * Event handler function called when features are removed from the collection.
     */
    removeHandler: CollectionEventHandler;
}

/**
 * Configuration arguments for the useTrackedFeatureCollection hook.
 * 
 * This extends the CollectionHookArgs to include additional properties for tracking features.
 * 
 * @since 0.15
 */
export type TrackedCollectionHookArgs = CollectionHookArgs & {
    /**
     * Function to process features when they are about to be added to the collection.
     * 
     * If not specified, the default behavior is to add the feature inside the given event as-is.
     */
    processFeatureToAdd?: (event: CollectionEvent<Feature>) => Feature[];
    /**
     * Function to process features when they are about to be removed from the collection.
     * 
     * If not specified, the default behavior is to remove the feature inside the given event as-is.
     */
    processFeatureToRemove?: (event: CollectionEvent<Feature>) => Feature[];
};

/**
 * A custom React hook for managing an OpenLayers Feature Collection with event handlers.
 * 
 * This hook creates and manages a Collection of OpenLayers Features with automatic event handler
 * registration and cleanup. It handles the lifecycle of the collection, ensuring proper setup
 * and teardown of event listeners when the component mounts and unmounts.
 * 
 * @param args - Configuration object containing initial features and event handlers.
 * @returns A tuple containing the Feature Collection (or undefined) and a boolean indicating readiness.
 * 
 * @example
 * ```typescript
 * const [collection, isReady] = useFeatureCollection({
 *   initialFeatures: [feature1, feature2],
 *   addHandler: (event) => console.log('Feature added:', event.element),
 *   removeHandler: (event) => console.log('Feature removed:', event.element)
 * });
 * ```
 * 
 * @since 0.15
 */
export function useFeatureCollection(args: CollectionHookArgs) {
    const res = useResourceRefInit(
        () => {
            const features = new Collection<Feature>(args.initialFeatures);
            features.on('add', args.addHandler);
            features.on('remove', args.removeHandler);
            return features;
        },
        c => {
            c.un('add', args.addHandler);
            c.un('remove', args.removeHandler);
        }
    );
    return res;
}

/**
 * A custom React hook for managing an OpenLayers Feature Collection with automatic feature tracking.
 * 
 * This hook extends the basic feature collection functionality by maintaining a synchronized React state
 * array of all features in the collection. It provides optional custom processing for features when they
 * are added or removed, making it useful for scenarios like cluster feature management
 * 
 * The hook automatically handles:
 * - Feature collection lifecycle management
 * - Event listener registration and cleanup
 * - State synchronization between OpenLayers collection and React state
 * - Custom feature processing during add/remove operations
 * 
 * @param args - Configuration object containing initial features, event handlers, and optional processors.
 * @returns A tuple containing the Feature Collection (or undefined), readiness boolean, and tracked features array.
 * 
 * @example
 * ```typescript
 * // Basic usage with default feature processing
 * const [collection, isReady, trackedFeatures] = useTrackedFeatureCollection({
 *   initialFeatures: [feature1, feature2],
 *   addHandler: (event) => console.log('Feature added:', event.element),
 *   removeHandler: (event) => console.log('Feature removed:', event.element)
 * });
 * 
 * // Advanced usage with custom feature processing (e.g., for cluster features)
 * const [collection, isReady, trackedFeatures] = useTrackedFeatureCollection({
 *   initialFeatures: [],
 *   addHandler: (event) => console.log('Cluster added'),
 *   removeHandler: (event) => console.log('Cluster removed'),
 *   processFeatureToAdd: (event) => {
 *     // Extract individual features from a cluster
 *     const clusterFeature = event.element;
 *     return clusterFeature.get('features') || [clusterFeature];
 *   },
 *   processFeatureToRemove: (event) => {
 *     // Extract individual features from a cluster for removal
 *     const clusterFeature = event.element;
 *     return clusterFeature.get('features') || [clusterFeature];
 *   }
 * });
 * 
 * // Access tracked features in render
 * console.log(`Currently tracking ${trackedFeatures.length} features`);
 * ```
 * 
 * @since 0.15
 */
export function useTrackedFeatureCollection(args: TrackedCollectionHookArgs): [Collection<Feature> | undefined, boolean, Feature[]] {
    // This is a react-observable "proxy" of the above collection. We need this as changes to the above collection will
    // not trigger re-rendering. We will use collection events to keep this in sync. Even if this wasn't a clustered layer
    // (which requires "unpacking" the cluster features), this "proxy" copy would still be necessary to trigger re-rendering
    const [trackedFeatures, setTrackedFeatures] = React.useState<Feature[]>([]);

    function onFeatureAdded(event: CollectionEvent<Feature>) {
        const clusterFeatures = args.processFeatureToAdd ? args.processFeatureToAdd(event) : [event.element];
        args.addHandler?.(event)
        setTrackedFeatures(oldArray => [...oldArray, ...clusterFeatures]);
    }

    function onFeatureRemoved(event: CollectionEvent<Feature>) {
        const clusterFeatures = args.processFeatureToRemove ? args.processFeatureToRemove(event) : [event.element];
        args.removeHandler?.(event);
        setTrackedFeatures(oldArray => oldArray.filter(f => !clusterFeatures.includes(f)));
    }

    const [features, isReady] = useResourceRefInit(
        () => {
            const features = new Collection<Feature>(args.initialFeatures);
            features.on('add', onFeatureAdded);
            features.on('remove', onFeatureRemoved);
            return features;
        },
        c => {
            c.un('add', onFeatureAdded);
            c.un('remove', onFeatureRemoved);
        }
    );
    return [features, isReady, trackedFeatures];
}

/**
 * A custom React hook for managing an OpenLayers map interaction lifecycle.
 *
 * This hook creates an interaction using the provided factory function, adds it to the map,
 * and ensures it is properly removed and disposed of when the component unmounts or dependencies change.
 * It also logs informational messages when the interaction is added or removed.
 *
 * @template T - The type of the interaction, extending `Interaction`.
 * @param name - A descriptive name for the interaction, used in log messages.
 * @param createInteraction - A function that takes an OpenLayers `Map` instance and returns an interaction of type `T`.
 * @param dependencies - A list of dependencies that determine when the effect should re-run.
 * @param addInteraction - An optional function to add the interaction to a collection of interactions.
 * @param teardown - An optional function to clean up the interaction (such as de-registering any event listeners) when it is removed.
 * @returns A mutable ref object containing the current interaction instance, or `undefined` if not set.
 */
export function useMapInteraction<T extends Interaction>(
    name: string,
    createInteraction: (map: Map, messages: MapMessageContext) => T | undefined,
    dependencies: React.DependencyList,
    addInteraction?: (interaction: T, collection: Collection<Interaction>, messages: MapMessageContext) => void,
    teardown?: (interaction: T) => void
) {
    const { map } = useOLMap();
    const messages = useMapMessage();
    const interactionRef = React.useRef<T | undefined>(undefined);

    React.useEffect(() => {
        const interaction = createInteraction(map, messages);
        if (interaction) {
            interactionRef.current = interaction;
            if (addInteraction) {
                addInteraction(interaction, map.getInteractions(), messages);
            } else {
                map.addInteraction(interaction);
            }
            messages.addInfo(`added interaction: ${name}`);
            //console.log("Current interaction list", map.getInteractions());;
        }
        return () => {
            if (interactionRef.current) {
                map.removeInteraction(interactionRef.current);
                messages.addInfo(`removed interaction: ${name}`);
                teardown?.(interactionRef.current);
                interactionRef.current.dispose();
                interactionRef.current = undefined;
            }
        };
    }, dependencies);

    return interactionRef;
}

/**
 * A custom React hook for managing the lifecycle of an OpenLayers map control.
 *
 * This hook creates, adds, and cleans up a map control instance, handling its addition to the map,
 * optional custom addition logic, and teardown. It also provides a ref to the control instance.
 *
 * @template T - The type of the control, extending `Control`.
 * @param name - A human-readable name for the control, used in log messages.
 * @param createControl - A function that creates and returns the control instance, given the map and message context.
 * @param dependencies - A list of dependencies that determine when the effect should re-run.
 * @param addControl - (Optional) A function to add the control to the map's control collection, allowing custom logic.
 * @param teardown - (Optional) A function to perform additional teardown logic when the control is removed.
 * @returns A React ref object containing the control instance, or `undefined` if not created.
 */
export function useMapControl<T extends Control>(
    name: string,
    createControl: (map: Map, messages: MapMessageContext) => T | undefined,
    dependencies: React.DependencyList,
    addControl?: (control: T, collection: Collection<Control>, messages: MapMessageContext) => void,
    teardown?: (control: T) => void
) {
    const { map } = useOLMap();
    const messages = useMapMessage();
    const controlRef = React.useRef<T | undefined>(undefined);

    React.useEffect(() => {
        const interaction = createControl(map, messages);
        if (interaction) {
            controlRef.current = interaction;
            if (addControl) {
                addControl(interaction, map.getControls(), messages);
            } else {
                map.addControl(interaction);
            }
            messages.addInfo(`added control: ${name}`);
            //console.log("Current interaction list", map.getInteractions());;
        }
        return () => {
            if (controlRef.current) {
                map.removeControl(controlRef.current);
                messages.addInfo(`removed control: ${name}`);
                teardown?.(controlRef.current);
                controlRef.current.dispose();
                controlRef.current = undefined;
            }
        };
    }, dependencies);

    return controlRef;
}
