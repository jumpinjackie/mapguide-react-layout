import { ILayerSetOL } from './layer-set-contracts';
import LayerGroup from 'ol/layer/Group';
import { Bounds, IExternalBaseLayer, RefreshMode, LayerTransparencySet, Size } from './common';
import View from 'ol/View';
import LayerBase from "ol/layer/Base";
import * as olHas from "ol/has";
import Source from 'ol/source/Source';

export abstract class BaseLayerSetOL implements ILayerSetOL {
    constructor(public readonly externalBaseLayersGroup: LayerGroup | undefined,
        public readonly projection: string | undefined,
        public readonly dpi: number,
        public readonly extent: Bounds,
        private readonly inPerUnit: number,
        public readonly view: View) {

    }
    public getMetersPerUnit(): number {
        return this.inPerUnit / 39.37
    }
    public scaleToResolution(scale: number): number {
        return (scale / this.inPerUnit / this.dpi) * olHas.DEVICE_PIXEL_RATIO;
    }
    public resolutionToScale(resolution: number): number {
        return (resolution * this.dpi * this.inPerUnit) / olHas.DEVICE_PIXEL_RATIO;
    }
    public updateExternalBaseLayers(externalBaseLayers: IExternalBaseLayer[]) {
        if (this.externalBaseLayersGroup) {
            const layers = this.externalBaseLayersGroup.getLayers();
            layers.forEach((l: LayerBase) => {
                const match = (externalBaseLayers || []).filter(el => el.name === l.get("title"));
                if (match.length == 1) {
                    l.setVisible(!!match[0].visible);
                } else {
                    l.setVisible(false);
                }
            });
        }
    }
    /**
     *
     * @virtual
     * @param {RefreshMode} mode
     * @memberof BaseLayerSetOL
     */
    refreshMap(mode: RefreshMode): void { }
    abstract getLayers(): LayerBase[];
    abstract getSourcesForProgressTracking(): Source[];
    abstract updateTransparency(trans: LayerTransparencySet): void;
    abstract showActiveSelectedFeature(mapExtent: Bounds, size: Size, uri: string): void;
    abstract update(showGroups: string[] | undefined, showLayers: string[] | undefined, hideGroups: string[] | undefined, hideLayers: string[] | undefined): void;
    abstract updateSelectionColor(color: string): void;
}