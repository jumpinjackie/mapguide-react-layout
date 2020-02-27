import * as React from "react";
import { BaseMapProviderContext, IMapProviderState } from './base';
import { GenericLayerSet } from '../../api/layer-set';
import { layerTransparencyChanged, areViewsCloseToEqual } from '../../utils/viewer-state';
import View from 'ol/View';
import { debug } from '../../utils/logger';
import { LayerSetGroupBase } from '../../api/layer-set-group-base';

export class GenericMapProviderContext extends BaseMapProviderContext<IMapProviderState, GenericLayerSet> {
    constructor() {
        super();
    }
    protected onProviderMapClick(px: [number, number]): void { }
    protected initLayerSet(nextState: IMapProviderState): LayerSetGroupBase {
        throw new Error("Method not implemented.");
    }
    public getProviderName(): string { return "Generic"; }
    public setProviderState(nextState: IMapProviderState): void {
        //
        // React (no pun intended) to prop changes
        //
        let bChangedView = false;
        //map
        if (nextState.mapName != this._state.mapName && this._map && this._ovMap) {
            const oldLayerSet = this.getLayerSet(this._state.mapName);
            const newLayerSet = this.ensureAndGetLayerSet(nextState);
            oldLayerSet.detach(this._map, this._ovMap);
            newLayerSet.attach(this._map, this._ovMap);
            //This would happen if we switch to a map we haven't visited yet
            if (!nextState.view) {
                newLayerSet.fitViewToExtent();
                bChangedView = true;
            } else {
                const layerSet = this.getLayerSet(nextState.mapName);
                this.applyView(layerSet, nextState.view);
            }
        }
        //externalBaseLayers
        if (nextState.externalBaseLayers != null &&
            nextState.externalBaseLayers.length > 0) {
            const layerSet = this.getLayerSet(nextState.mapName);
            layerSet.updateExternalBaseLayers(nextState.externalBaseLayers);
        }
        //view
        if (!areViewsCloseToEqual(nextState.view, this._state.view)) {
            const vw = nextState.view;
            if (vw != null && !bChangedView) {
                const layerSet = this.getLayerSet(nextState.mapName);
                this.applyView(layerSet, vw);
            } else {
                debug(`Skipping zoomToView as next/current views are close enough or target view is null`);
            }
        }
        //overviewMapElement
        if (nextState.overviewMapElementSelector) {
            this.updateOverviewMapElement(nextState.overviewMapElementSelector);
        }
        //viewRotation
        if (this._state.viewRotation != nextState.viewRotation) {
            this.getOLView().setRotation(nextState.viewRotation);
        }
        //viewRotationEnabled
        if (this._state.viewRotationEnabled != nextState.viewRotationEnabled) {
            if (this._map) {
                const view = this.getOLView();
                const newView = new View({
                    enableRotation: nextState.viewRotationEnabled,
                    rotation: nextState.viewRotation,
                    center: view.getCenter(),
                    resolution: view.getResolution(),
                    resolutions: view.getResolutions(),
                    minResolution: view.getMinResolution(),
                    maxResolution: view.getMaxResolution(),
                    maxZoom: view.getMaxZoom(),
                    minZoom: view.getMinZoom(),
                    //constrainRotation: view.constrainRotation(),
                    projection: view.getProjection(),
                    zoom: view.getZoom()
                });
                this._map.setView(newView);
            }
        }
        this._state = nextState;
    }
}