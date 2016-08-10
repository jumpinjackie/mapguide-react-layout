import * as React from "react";
import { FeatureSet } from "../api/contracts/query";

interface IMouseCoordinatesProps {
    selection: FeatureSet;
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

export const SelectedFeatureCount = (props: IMouseCoordinatesProps) => {
    const fmt = props.format || "Selected {total} features in {layerCount} layers";
    const label = fmt.replace(/\{total\}/g, `${countTotalSelected(props.selection)}`)
                     .replace(/\{layerCount\}/g, `${props.selection.Layer.length}`);
    return <div className="component-selected-feature-count" style={props.style}>{label}</div>;
};