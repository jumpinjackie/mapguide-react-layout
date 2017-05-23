import * as React from "react";
import { FeatureSet } from "../api/contracts/query";
import { tr, fmt } from "../api/i18n";

/**
 * SelectedFeatureCount component props
 *
 * @export
 * @interface ISelectedFeatureCountProps
 */
export interface ISelectedFeatureCountProps {
    selection: FeatureSet;
    locale?: string;
    format?: string;
    style?: React.CSSProperties;
}

function countTotalSelected(featureSet: FeatureSet): number {
    let total = 0;
    featureSet.Layer.map(layer => layer.Class.ID.length).forEach(subTotal => {
        total += subTotal;
    });
    return total;
}

/**
 * Displays the number of selected features on the map
 */
export const SelectedFeatureCount = (props: ISelectedFeatureCountProps) => {
    const format = props.format || tr("FMT_SELECTION_COUNT", props.locale);
    let label: string | undefined;
    if (props.selection.Layer.length > 0) {
        label = fmt(format, {
            total: countTotalSelected(props.selection),
            layerCount: props.selection.Layer.length
        });
    }
    return <div className="component-selected-feature-count" style={props.style}>{label}</div>;
};