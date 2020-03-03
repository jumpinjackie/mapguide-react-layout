import LayerBase from "ol/layer/Base";
import { LayerProperty, IExternalBaseLayer, LayerTransparencySet, RefreshMode, Bounds, Size, ILayerInfo } from './common';
import { ILayerSetOL, IImageLayerEvents } from './layer-set-contracts';
import Feature from 'ol/Feature';
import { isMapGuideImageSource } from './ol-mapguide-source-factory';
import { getLayerInfo } from './layer-manager';
import { MgError } from './error';
import { tr } from './i18n';
import { setOLVectorLayerStyle } from './ol-style-helpers';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Source from 'ol/source/Source';
import ImageSource from 'ol/source/Image';
import ImageWMSSource from "ol/source/ImageWMS";
import TileWMSSource from "ol/source/TileWMS";
import TileImageSource from "ol/source/TileImage";
import Map from "ol/Map";
import OverviewMap from "ol/control/OverviewMap"
import View from 'ol/View';

export abstract class LayerSetGroupBase {
    protected mainSet: ILayerSetOL;
    protected overviewSet: ILayerSetOL;
    protected scratchLayer: VectorLayer;
    protected _customLayers: {
        [name: string]: {
            layer: LayerBase,
            order: number
        }
    };
    constructor(protected callback: IImageLayerEvents) {
        this._customLayers = {};
        this.scratchLayer = new VectorLayer({
            source: new VectorSource()
        });
        this.scratchLayer.set(LayerProperty.IS_SCRATCH, true);
    }
    public addScratchFeature(feat: Feature) {
        this.scratchLayer.getSource().addFeature(feat);
    }
    public clearScratchLayer() {
        this.scratchLayer.getSource().clear();
    }
    public abstract tryGetWmsSource(): ImageWMSSource | TileWMSSource | undefined;
    protected registerSourceEvents(source: Source): void {
        if (source instanceof ImageSource) {
            source.on("imageloadstart", this.callback.addImageLoading);
            //onImageError is a MapGuide-specific callback
            if (isMapGuideImageSource(source)) {
                source.on("imageloaderror", this.callback.onImageError);
            }
            source.on("imageloaderror", this.callback.addImageLoaded);
            source.on("imageloadend", this.callback.addImageLoaded);
        } else if (source instanceof TileImageSource) {
            source.on("tileloadstart", this.callback.addImageLoading);
            source.on("tileloaderror", this.callback.addImageLoaded);
            source.on("tileloadend", this.callback.addImageLoaded);
        }
    }
    
    public updateExternalBaseLayers(externalBaseLayers: IExternalBaseLayer[]) {
        this.mainSet.updateExternalBaseLayers(externalBaseLayers);
        this.overviewSet.updateExternalBaseLayers(externalBaseLayers);
    }
    public updateTransparency = (trans: LayerTransparencySet) => this.mainSet.updateTransparency(trans);
    public fitViewToExtent = () => this.mainSet.view.fit(this.mainSet.extent);
    public getView = () => this.mainSet.view;
    public getDpi = () => this.mainSet.dpi;
    public getExtent = () => this.mainSet.extent;
    public getLayersForOverviewMap = () => this.overviewSet.getLayers();
    public getProjection = () => this.mainSet.projection;
    public refreshMap = (mode: RefreshMode) => this.mainSet.refreshMap(mode);
    public showActiveSelectedFeature = (mapExtent: Bounds, size: Size, uri: string) => this.mainSet.showActiveSelectedFeature(mapExtent, size, uri);
    public getMetersPerUnit = () => this.mainSet.getMetersPerUnit();
    public scaleToResolution = (scale: number) => this.mainSet.scaleToResolution(scale);
    public resolutionToScale = (resolution: number) => this.mainSet.resolutionToScale(resolution);
    
    public attach(map: Map, ovMapControl: OverviewMap, bSetLayers = true): void {
        // To guard against the possibility that we may be attaching layers to a map that
        // already has layers (eg. Measurements), we reverse iterate all the layers we need to
        // add and insert them to the front one-by-one, ensuring all the layers we add will be
        // at the bottom of the draw order
        const layers = map.getLayers();
        // Attach scratch layer
        layers.insertAt(0, this.scratchLayer);
        // Attach custom layers
        const customLayers = Object.keys(this._customLayers).map(k => this._customLayers[k]);
        customLayers.sort((a, b) => {
            return a.order - b.order;
        });
        for (const item of customLayers) {
            layers.insertAt(0, item.layer);
        }
        // Then the regular layers
        const allLayers = this.mainSet.getLayers();
        for (let i = allLayers.length - 1; i >= 0; i--) {
            layers.insertAt(0, allLayers[i]);
        }
        map.setView(this.mainSet.view);
        if (bSetLayers) {
            const ovMap = ovMapControl.getOverviewMap();
            const ovLayers = this.getLayersForOverviewMap();
            for (const layer of ovLayers) {
                ovMap.addLayer(layer);
            }
            //ol.View has immutable projection, so we have to replace the whole view on the OverviewMap
            const center = this.mainSet.view.getCenter();
            if (center) {
                ovMap.setView(new View({
                    center: [center[0], center[1]],
                    resolution: this.mainSet.view.getResolution(),
                    projection: this.mainSet.view.getProjection()
                }));
            } else {
                const view = new View({
                    projection: this.mainSet.view.getProjection()
                });
                ovMap.setView(view);
                view.fit(this.mainSet.extent, { size: ovMap.getSize() });
            }
        }
    }
    public detach(map: Map, ovMapControl: OverviewMap): void {
        const allLayers = this.mainSet.getLayers();
        for (const layer of allLayers) {
            map.removeLayer(layer);
        }
        //Detach custom layers
        for (const layerName in this._customLayers) {
            map.removeLayer(this._customLayers[layerName].layer);
        }
        //Detach scratch layer
        map.removeLayer(this.scratchLayer);
        const ovLayers = this.getLayersForOverviewMap();
        const ovMap = ovMapControl.getOverviewMap();
        for (const layer of ovLayers) {
            ovMap.removeLayer(layer);
        }
    }
    public getCustomLayers(map: Map): ILayerInfo[] {
        const larr = map.getLayers().getArray();
        const layers = larr
            .filter(l => this._customLayers[l.get(LayerProperty.LAYER_NAME)] != null)
            .map(l => ({
                ...getLayerInfo(l, true),
                //Smuggle these values out for debugging purposes
                isSelectable: this._customLayers[l.get(LayerProperty.LAYER_NAME)].layer.get(LayerProperty.IS_SELECTABLE) == true,
                order: this._customLayers[l.get(LayerProperty.LAYER_NAME)].order
            }));
        return layers.reverse();
    }
    public hasLayer(name: string): boolean {
        return this._customLayers[name] != null;
    }
    public addLayer<T extends LayerBase>(map: Map, name: string, layer: T, allowReplace?: boolean): ILayerInfo {
        const bAllow = !!allowReplace;
        if (this._customLayers[name]) {
            if (!bAllow) {
                throw new MgError(tr("LAYER_NAME_EXISTS", this.callback.getLocale(), { name: name }));
            } else {
                //Remove the layer that is about to be replaced first 
                map.removeLayer(this._customLayers[name].layer);
            }
        }
        map.addLayer(layer);
        this._customLayers[name] = { layer, order: map.getLayers().getArray().indexOf(layer) };
        layer.set(LayerProperty.LAYER_NAME, name);
        return {
            ...getLayerInfo(layer, true),
            //Smuggle these values out for debugging purposes
            ...{
                isSelectable: this._customLayers[name].layer.get(LayerProperty.IS_SELECTABLE) == true,
                order: this._customLayers[name].order
            }
        };
    }
    public removeLayer(map: Map, name: string): LayerBase | undefined {
        let layer: LayerBase;
        if (this._customLayers[name]) {
            layer = this._customLayers[name].layer;
            map.removeLayer(layer);
            delete this._customLayers[name];
            return layer;
        }
    }
    public getLayer<T extends LayerBase>(name: string): T | undefined {
        let layer: T | undefined;
        if (this._customLayers[name]) {
            layer = this._customLayers[name]?.layer as T;
        }
        return layer;
    }
    public apply(map: Map, layers: ILayerInfo[]): void {
        const layersByName = layers.reduce((current, layer) => {
            current[layer.name] = layer;
            return current;
        }, {} as any);
        //Apply opacity/visibility/styling and other top-level properties
        for (const layer of layers) {
            const oll = this._customLayers[layer.name]?.layer;
            if (oll) {
                oll.setVisible(layer.visible);
                oll.setOpacity(layer.opacity);
                oll.set(LayerProperty.BUSY_WORKER_COUNT, layer.busyWorkerCount);
                if (oll instanceof VectorLayer && layer.vectorStyle) {
                    setOLVectorLayerStyle(oll, layer.vectorStyle);
                }
            }
        }
        //Apply removals 
        for (const layerName in this._customLayers) {
            if (!layersByName[layerName]) {
                this.removeLayer(map, layerName);
            }
        }

        //Fix order if required
        //First item, top-most
        //Last item, bottom-most
        const cCurrentLayers = map.getLayers();
        const aCurrentLayers = cCurrentLayers.getArray();
        const currentLayers = aCurrentLayers.map(l => ({
            name: l.get(LayerProperty.LAYER_NAME),
            type: l.get(LayerProperty.LAYER_TYPE),
            isExternal: l.get(LayerProperty.IS_EXTERNAL),
            isGroup: l.get(LayerProperty.IS_GROUP),
            layer: l
        })).filter(l => l.isExternal == true);
        //console.assert(currentLayers.length == layers.length);
        //console.table(currentLayers);
        //console.table(layers);
        
        //If sizes don't match, do a full invalidation
        if (currentLayers.length != layers.length) {
            //Clear everything custom
            for (const toRemove of currentLayers) {
                map.removeLayer(toRemove.layer);
            }
            for (const rn in this._customLayers) {
                const toRemove = this._customLayers[rn];
                map.removeLayer(toRemove.layer);
            }
            //Re-add in order according to layers array
            for (let i = layers.length - 1; i >= 0; i--) {
                const item = this._customLayers[layers[i].name];
                if (item) {
                    map.addLayer(item.layer);
                    item.order = cCurrentLayers.getArray().indexOf(item.layer);
                }
            }
        } else { //Otherwise see if we need to re-order
            let bReorder = false;
            let ii = 0;
            for (let i = layers.length - 1; i >= 0; i--) {
                const layer = layers[i];
                //console.log(`Checking if layer (${layer.name}) needs re-ordering`);
                if (layer.name != currentLayers[ii].name) {
                    bReorder = true;
                    break;
                }
                ii++;
            }
            if (bReorder) {
                //console.log("Re-ordering layers");
                for (const toRemove of currentLayers) {
                    map.removeLayer(toRemove.layer);
                }
                //Re-add in order according to layers array
                for (let i = layers.length - 1; i >= 0; i--) {
                    const toAdd = currentLayers.filter(l => l.name == layers[i].name)[0];
                    map.addLayer(toAdd.layer);
                    const item = this._customLayers[layers[i].name];
                    if (item) {
                        item.order = cCurrentLayers.getArray().indexOf(toAdd.layer);
                    }
                }
            }
        }
    }
}