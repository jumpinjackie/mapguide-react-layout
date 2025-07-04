import Interaction from "ol/interaction/Interaction";
import Control from "ol/control/Control";
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