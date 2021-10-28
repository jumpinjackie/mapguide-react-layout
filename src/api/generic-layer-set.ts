import { BaseLayerSetOL } from './base-layer-set';
import LayerGroup from 'ol/layer/Group';
import { Bounds, LayerTransparencySet, Size } from './common';
import View from 'ol/View';
import Source from 'ol/source/Source';
import LayerBase from "ol/layer/Base";
import TileLayer from "ol/layer/Tile";
import ImageLayer from "ol/layer/Image";
import { ProjectionLike } from 'ol/proj';
import { LAYER_ID_BASE, LAYER_ID_MG_BASE } from '../constants';
import { restrictToRange } from '../utils/number';

export const DEFAULT_METERS_PER_UNIT = 1.0;
const M_TO_IN = 39.37;
const DEFAULT_DPI = 96;

/**
 * @hidden
 */
export class GenericLayerSetOL extends BaseLayerSetOL {
    constructor(view: View,
        public subjectLayer: LayerBase | undefined,
        extent: Bounds,
        externalBaseLayersGroup: LayerGroup | undefined,
        projection: ProjectionLike,
        metersPerUnit: number = DEFAULT_METERS_PER_UNIT,
        dpi: number = DEFAULT_DPI) {
        super(externalBaseLayersGroup, projection, dpi, extent, M_TO_IN * metersPerUnit, view);
    }
    getLayers(): LayerBase[] {
        const layers: LayerBase[] = [];
        if (this.externalBaseLayersGroup) {
            layers.push(this.externalBaseLayersGroup);
        }
        if (this.subjectLayer) {
            layers.push(this.subjectLayer);
        }
        return layers;
    }
    getSourcesForProgressTracking(): Source[] {
        const sources: Source[] = [];
        if (this.externalBaseLayersGroup) {
            const bls = this.externalBaseLayersGroup.getLayersArray();
            for (const bl of bls) {
                if (bl instanceof ImageLayer || bl instanceof TileLayer) {
                    sources.push(bl.getSource());
                }
            }
        }
        if (this.subjectLayer instanceof ImageLayer) {
            sources.push(this.subjectLayer.getSource())
        } else if (this.subjectLayer instanceof TileLayer) {
            sources.push(this.subjectLayer.getSource())
        }
        return sources;
    }
    updateTransparency(trans: LayerTransparencySet): void {
        //If no external layers defined, this won't be set
        if (this.externalBaseLayersGroup) {
            if (LAYER_ID_BASE in trans) {
                this.externalBaseLayersGroup.setOpacity(restrictToRange(trans[LAYER_ID_BASE], 0, 1.0));
            } else {
                this.externalBaseLayersGroup.setOpacity(1.0);
            }
        }

        if (this.subjectLayer) {
            if (LAYER_ID_MG_BASE in trans) {
                const opacity = restrictToRange(trans[LAYER_ID_MG_BASE], 0, 1.0);
                this.subjectLayer.setOpacity(opacity);
            } else {
                this.subjectLayer.setOpacity(1.0);
            }
        }
    }
    showActiveSelectedFeature(mapExtent: Bounds, size: Size, uri: string): void {
        //throw new Error("Method not implemented.");
    }
    update(showGroups: string[] | undefined, showLayers: string[] | undefined, hideGroups: string[] | undefined, hideLayers: string[] | undefined): void {
        //throw new Error("Method not implemented.");
    }
    updateSelectionColor(color: string): void {
        //throw new Error("Method not implemented.");
    }
}