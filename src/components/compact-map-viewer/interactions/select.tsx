import React from "react";
import { useOLMap } from "../context";
import Select from 'ol/interaction/Select';
import { click, pointerMove } from 'ol/events/condition';
import { assertNever } from "../../../utils/never";
import type Collection from 'ol/Collection';
import type Feature from 'ol/Feature';
import { useMapMessage } from "../messages";

export type SelectInteractionProps = {
    mode: 'click' | 'hover';
    features?: Collection<Feature>;
};

function modeToCondition(type: SelectInteractionProps['mode']) {
    switch (type) {
        case 'click': return click;
        case 'hover': return pointerMove;
        default: assertNever(type);
    }
}

export const SelectInteraction: React.FC<SelectInteractionProps> = ({ mode, features }) => {
    const map = useOLMap();
    const messages = useMapMessage();
    const select = React.useRef<Select | undefined>(undefined);

    function addInteractions(m: SelectInteractionProps["mode"]) {
        const intSelect = new Select({
            condition: modeToCondition(m),
            features: features
        });
        select.current = intSelect;
        map.addInteraction(intSelect);
        messages.addInfo("added select interaction");
    }

    function removeInteractions() {
        if (select.current) {
            map.removeInteraction(select.current);
            messages.addInfo("removed select interaction");
        }
    }

    React.useEffect(() => {
        addInteractions(mode);
        return () => {
            removeInteractions();
        }
    }, [mode]);
    return <noscript />;
};