import Interaction from "ol/interaction/Interaction";
import React from "react";
import type Map from "ol/Map";
import { useOLMap } from "./context";
import { MapMessageContext, useMapMessage } from "./messages";
import type Collection from "ol/Collection";

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
export function useResourceRefInit<T>(
    setup: () => T,
    teardown: (obj: T) => void
): [T | undefined, boolean] {
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
        }
    }, []);
    return [resourceRef.current, isReady];
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
 * @returns A mutable ref object containing the current interaction instance, or `undefined` if not set.
 */
export function useMapInteraction<T extends Interaction>(
    name: string,
    createInteraction: (map: Map, messages: MapMessageContext) => T | undefined,
    dependencies: React.DependencyList,
    addInteraction?: (interaction: T, collection: Collection<Interaction>, messages: MapMessageContext) => void
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
                interactionRef.current.dispose();
                interactionRef.current = undefined;
            }
        };
    }, dependencies);

    return interactionRef;
}