import React from "react";
import { useOLMap } from "../context";
import Select from 'ol/interaction/Select';
import { click, pointerMove } from 'ol/events/condition';
import { assertNever } from "../../../utils/never";
import type Collection from 'ol/Collection';
import type Feature from 'ol/Feature';

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
    const select = React.useRef<Select | undefined>(undefined);
    React.useEffect(() => {
        const intSelect = new Select({
            condition: modeToCondition(mode),
            features: features
        });
        select.current = intSelect;
        map.addInteraction(intSelect);
        return () => {
            map.removeInteraction(intSelect);
        }
    }, []);
    return <noscript />;
};