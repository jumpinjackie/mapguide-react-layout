import { extend } from "ol/extent";
import { ICompositeSelectionLayer, ICompositeSelection, Bounds } from "./common";
import { ClientSelectionLayer, ClientSelectionSet } from "./contracts/common";
import { SelectedFeature, SelectedLayer, FeatureProperty, SelectedFeatureSet } from "./contracts/query";

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
                for (const k in f.properties) {
                    fp.push({
                        Name: k,
                        Value: f.properties[k]
                    })
                }
                const fb = f.bounds ? f.bounds.join(" ") : undefined;
                this.features.push({
                    Bounds: fb,
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
    /**
     * Gets the combined bounds of all selected features
     * 
     * @returns The combined bounds of all selected features in the projection of the current map view
     */
    public getBounds(): Bounds | undefined {
        let bounds: Bounds | undefined;
        if (this.isSelectedLayer(this.layer)) {
            this.layer.Feature.forEach(feat => {
                const b: Bounds | undefined = feat.Bounds 
                    ? (feat.Bounds.split(" ").map(s => parseFloat(s)) as Bounds)
                    : undefined;
                if (b) {
                    if (!bounds) {
                        bounds = b;
                    } else {
                        bounds = extend(bounds, b) as Bounds;
                    }
                }
            });
        } else {
            for (const f of this.layer.features) {
                if (f.bounds) {
                    if (bounds == null) {
                        bounds = f.bounds;
                    } else {
                        bounds = extend(bounds, f.bounds) as Bounds;
                    }
                }
            }
        }
        return bounds;
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
    public getBounds(): Bounds | undefined {
        if (this.layers.length == 0) {
            return undefined;
        }
        let bounds: Bounds | undefined;
        for (const lyr of this.layers) {
            let layerBounds = lyr.getBounds();
            if (layerBounds) {
                if (bounds) {
                    bounds = extend(bounds, layerBounds) as Bounds;
                } else {
                    bounds = layerBounds;
                }
            }
        }
        return bounds;
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
}