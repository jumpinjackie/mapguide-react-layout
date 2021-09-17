import { ICompositeSelectionLayer, ICompositeSelection } from "./common";
import { ClientSelectionLayer, ClientSelectionSet } from "./contracts/common";
import { SelectedFeature, SelectedLayer, FeatureProperty, SelectedFeatureSet, FeatureSet } from "./contracts/query";

export class CompositeSelectionLayer implements ICompositeSelectionLayer {
    private features: SelectedFeature[];
    constructor(private layer: SelectedLayer | ClientSelectionLayer) {
        this.features = [];
        if (this.isSelectedLayer(this.layer)) {
            for (const f of this.layer.Feature) {
                this.features.push(f);
            }
        } else {
            for (const f of this.layer.features) {
                const fp = [] as FeatureProperty[];
                for (const k in f) {
                    fp.push({
                        Name: k,
                        Value: f[k]
                    })
                }
                this.features.push({
                    Bounds: "",
                    Property: fp
                });
            }
        }
    }
    private isSelectedLayer(layer: SelectedLayer | ClientSelectionLayer): layer is SelectedLayer {
        return (layer as any).Feature
            && (layer as any)["@id"]
            && (layer as any)["@name"]
    }
    public getLayerId() {
        if (this.isSelectedLayer(this.layer)) {
            return this.layer["@id"];
        }
        return undefined;
    }
    public getName() {
        if (this.isSelectedLayer(this.layer)) {
            return this.layer["@name"];
        } else {
            return this.layer.name;
        }
    }
    public getFeatureAt(featureIndex: number) {
        return this.features[featureIndex];
    }
    public getFeatureCount() { return this.features.length; }
    public getLayerMetadata() {
        if (this.isSelectedLayer(this.layer)) {
            return this.layer.LayerMetadata;
        }
        return undefined;
    }
}

function isSelectedFeatureSet(ss: SelectedFeatureSet | FeatureSet): ss is SelectedFeatureSet {
    return (ss as any).SelectedLayer;
}

export class CompositeSelection implements ICompositeSelection {
    private layers: CompositeSelectionLayer[];
    constructor(mgSelection?: SelectedFeatureSet, clientSelection?: ClientSelectionSet) {
        this.layers = [];
        if (mgSelection) {
            for (const layer of mgSelection.SelectedLayer) {
                this.layers.push(new CompositeSelectionLayer(layer));
            }
        }
        if (clientSelection) {
            for (const layer of clientSelection.layers) {
                this.layers.push(new CompositeSelectionLayer(layer));
            }
        }
    }
    public getLayers() { return this.layers; }
    public getLayerCount() {
        return this.layers.length;
    }
    public getLayerAt(layerIndex: number) {
        return this.layers[layerIndex];
    }
    public getFeatureAt(layerIndex: number, featureIndex: number) {
        const layer = this.getLayerAt(layerIndex);
        return layer?.getFeatureAt(featureIndex);
    }
    public static count(mgSelection?: SelectedFeatureSet | FeatureSet, clientSelection?: ClientSelectionSet) {
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
}