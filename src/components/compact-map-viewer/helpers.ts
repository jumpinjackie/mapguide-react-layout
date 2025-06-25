import Interaction from "ol/interaction/Interaction";
import { MapMessageContext } from "./messages";
import { Collection } from "ol";

type InteractionClass = new (...args: any[]) => Interaction;

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
        messages.addInfo(
            `Interaction added at index ${intIndex} (new size: ${c.getLength()})`
        );
    } else {
        c.push(i);
    }
}
