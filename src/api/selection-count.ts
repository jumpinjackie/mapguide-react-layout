import { ClientSelectionSet } from "./contracts/common";
import { SelectedFeatureSet, FeatureSet } from "./contracts/query";

function isSelectedFeatureSet(ss: SelectedFeatureSet | FeatureSet): ss is SelectedFeatureSet {
    return (ss as any).SelectedLayer;
}

export function countSelection(mgSelection?: SelectedFeatureSet | FeatureSet, clientSelection?: ClientSelectionSet) {
    const summary = { total: 0, layerCount: 0 };
    if (mgSelection) {
        if (isSelectedFeatureSet(mgSelection)) {
            summary.layerCount = mgSelection.SelectedLayer.length;
            for (const lyr of mgSelection.SelectedLayer) {
                summary.total += lyr.Feature?.length ?? 0;
            }
        } else {
            summary.layerCount = mgSelection.Layer.length;
            for (const lyr of mgSelection.Layer) {
                summary.total += lyr.Class?.ID?.length ?? 0;
            }
        }
    }
    if (clientSelection) {
        summary.layerCount = clientSelection.layers.length;
        for (const lyr of clientSelection.layers) {
            summary.total += lyr.features?.length ?? 0;
        }
    }
    if (summary.total == 0 && summary.layerCount == 0) {
        return undefined;
    }
    return summary;
}