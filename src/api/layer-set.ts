import { RefreshMode, IExternalBaseLayer, Bounds, LayerTransparencySet, LayerProperty, MgBuiltInLayers, MgLayerType, MG_LAYER_TYPE_NAME, MG_BASE_LAYER_GROUP_NAME, SourceProperty, ILayerInfo } from './common';
import { Size, BLANK_SIZE } from '../containers/map-capturer-context';
import olLayerGroup from "ol/layer/Group";
import olTileGrid from "ol/tilegrid/TileGrid";
import olSource from "ol/source/Source";
import olImageSource, { defaultImageLoadFunction } from "ol/source/Image";
import olTileImageSource from "ol/source/TileImage";
import createMapGuideSource, { isMapGuideImageSource } from "./ol-mapguide-source-factory";
import olImageStaticSource from "ol/source/ImageStatic";
import olMapGuideSource from "ol/source/ImageMapGuide";
import { LAYER_ID_BASE, LAYER_ID_MG_BASE, LAYER_ID_MG_SEL_OVERLAY, BLANK_GIF_DATA_URI } from "../constants/index";
import { restrictToRange } from "../utils/number";
import olView from "ol/View";
import * as olExtent from "ol/extent";
import olTileLayer from "ol/layer/Tile";
import olImageLayer from "ol/layer/Image";
import olLayerBase from "ol/layer/Base";
import { IMapViewerContextCallback, IMapViewerContextProps } from '../components/map-viewer-context';
import { RuntimeMap } from './contracts/runtime-map';
import * as logger from '../utils/logger';
import { createExternalSource } from '../components/external-layer-factory';
import { strIsNullOrEmpty } from '../utils/string';
import { parseUrl } from '../utils/url';
import ImageWrapper from 'ol/Image';
import { tr } from './i18n';
import olMap from "ol/Map";
import olOverviewMap from "ol/control/OverviewMap";
import { MgError } from './error';
import { setOLVectorLayerStyle } from './ol-style-helpers';
import olVectorLayer from "ol/layer/Vector";
import { getLayerInfo } from './layer-manager';
import * as olHas from "ol/has";

function mockMapGuideImageLoadFunction(image: ImageWrapper, src: string) {
    let el = document.getElementById("mg-debug-text-canvas");
    if (!el) {
        el = document.createElement("canvas");
        el.style.visibility = "hidden";
        el.id = "mg-debug-text-canvas";
        document.body.append(el);
    }
    const tCtx = (el as HTMLCanvasElement).getContext("2d");
    if (tCtx) {
        tCtx.clearRect(0, 0, tCtx.canvas.width, tCtx.canvas.height);

        const strings = [];
        const parsed = parseUrl(src);
        strings.push("[Mock MapGuide Map Image Request]");
        strings.push(`Agent: ${parsed.url}`);

        const xoff = 10;
        const yoff = 30;
        const fontSize = 14;
        let mm = tCtx.measureText(strings[0])
        let maxSize = mm.width + xoff;

        let ch = yoff + fontSize + 2;

        maxSize = Math.max(tCtx.measureText(strings[1]).width + xoff, maxSize);
        ch += (fontSize + 2);

        const keys = Object.keys(parsed.query);
        for (const k of keys) {
            if (k == "MAPNAME" || k == "SETDISPLAYWIDTH" || k == "SETDISPLAYHEIGHT" || k == "SETVIEWCENTERX" || k == "SETVIEWCENTERY" || k == "SETVIEWSCALE") {
                if (!strIsNullOrEmpty(parsed.query[k])) {
                    const s = `${k}: ${parsed.query[k]}`;
                    strings.push(s);
                    maxSize = Math.max(tCtx.measureText(s).width + xoff, maxSize);
                    ch += (fontSize + 2);
                }
            }
        }

        tCtx.canvas.width = maxSize;
        tCtx.canvas.height = ch;
        tCtx.fillStyle = "rgba(255, 0, 0, 0.5)";
        tCtx.fillRect(0, 0, maxSize, ch);

        tCtx.fillStyle = "rgba(255, 255, 0, 1.0)";
        //console.log(`Canvas size: [${tCtx.canvas.width}, ${tCtx.canvas.height}]`);
        tCtx.font = `${fontSize}px sans-serif`;

        let y = yoff;
        for (const str of strings) {
            //console.log(`Draw (${str}) at [10, ${y}]`);
            tCtx.fillText(str, 10, y);
            y += (fontSize + 1);
        }
        (image.getImage() as any).src = tCtx.canvas.toDataURL();
    }
}

export interface ILayerSetOL {
    view: olView;
    extent: olExtent.Extent;
    dpi: number;
    projection: string | undefined;
    scaleToResolution(scale: number): number;
    resolutionToScale(resolution: number): number;
    refreshMap(mode: RefreshMode): void;
    getMetersPerUnit(): number;
    getLayers(): olLayerBase[];
    getSourcesForProgressTracking(): olSource[];
    updateExternalBaseLayers(externalBaseLayers: IExternalBaseLayer[]): void;
    updateTransparency(trans: LayerTransparencySet): void;
    // ====== This is MapGuide-specific ======== //
    showActiveSelectedFeature(mapExtent: Bounds, size: Size, uri: string): void;
    update(showGroups: string[] | undefined, showLayers: string[] | undefined, hideGroups: string[] | undefined, hideLayers: string[] | undefined): void;
    updateSelectionColor(color: string): void;
}

class MgLayerSetInner implements ILayerSetOL {
    constructor(public readonly mgTiledLayers: olTileLayer[],
        public readonly externalBaseLayersGroup: olLayerGroup | undefined,
        public readonly overlay: olImageLayer,
        public readonly projection: string | undefined,
        public readonly dpi: number,
        public readonly extent: Bounds,
        private readonly inPerUnit: number,
        public readonly view: olView) { }

    public selectionOverlay: olImageLayer | undefined;
    public activeSelectedFeatureOverlay: olImageLayer | undefined;

    public getMetersPerUnit(): number {
        return this.inPerUnit / 39.37
    }
    public scaleToResolution(scale: number): number {
        return (scale / this.inPerUnit / this.dpi) * olHas.DEVICE_PIXEL_RATIO;
    }
    public resolutionToScale(resolution: number): number {
        return (resolution * this.dpi * this.inPerUnit) / olHas.DEVICE_PIXEL_RATIO;
    }
    public getSourcesForProgressTracking(): olSource[] {
        const sources: olSource[] = [];
        if (this.externalBaseLayersGroup) {
            const bls = this.externalBaseLayersGroup.getLayersArray();
            for (const bl of bls) {
                if (bl instanceof olImageLayer || bl instanceof olTileLayer) {
                    sources.push(bl.getSource());
                }
            }
        }
        for (let i = this.mgTiledLayers.length - 1; i >= 0; i--) {
            sources.push(this.mgTiledLayers[i].getSource());
        }
        sources.push(this.overlay.getSource());
        if (this.selectionOverlay) {
            sources.push(this.selectionOverlay.getSource());
        }
        if (this.activeSelectedFeatureOverlay) {
            sources.push(this.activeSelectedFeatureOverlay.getSource());
        }
        return sources;
    }
    public getLayers(): olLayerBase[] {
        const layers: olLayerBase[] = [];
        if (this.externalBaseLayersGroup) {
            layers.push(this.externalBaseLayersGroup);
        }
        for (let i = this.mgTiledLayers.length - 1; i >= 0; i--) {
            layers.push(this.mgTiledLayers[i]);
        }
        layers.push(this.overlay);
        if (this.selectionOverlay) {
            layers.push(this.selectionOverlay);
        }
        if (this.activeSelectedFeatureOverlay) {
            layers.push(this.activeSelectedFeatureOverlay);
        }
        return layers;
    }
    public update(showGroups: string[] | undefined, showLayers: string[] | undefined, hideGroups: string[] | undefined, hideLayers: string[] | undefined) {
        //Send the request
        const imgSource = this.overlay.getSource() as any; //olMapGuideSource;
        //NOTE: Even if these group ids being shown/hidden are MG base layer groups, it still has to be
        //done as the server-side snapshot of the runtime map needs to be aware as well. This will be
        //apparent if you were to plot a runtime-map server-side that has base layer groups.
        imgSource.updateParams({
            showlayers: showLayers,
            showgroups: showGroups,
            hidelayers: hideLayers,
            hidegroups: hideGroups
        });
        //As MG base layer groups are separate ol layer instances, we have to toggle them on the client-side as well
        if (showGroups && showGroups.length > 0) {
            for (const groupId of showGroups) {
                const match = this.mgTiledLayers.filter(l => l.get(LayerProperty.LAYER_NAME) === groupId);
                if (match.length == 1) {
                    match[0].setVisible(true);
                }
            }
        }
        if (hideGroups && hideGroups.length > 0) {
            for (const groupId of hideGroups) {
                const match = this.mgTiledLayers.filter(l => l.get(LayerProperty.LAYER_NAME) === groupId);
                if (match.length == 1) {
                    match[0].setVisible(false);
                }
            }
        }
    }
    public updateSelectionColor(color: string) {
        if (this.selectionOverlay) {
            const source = this.selectionOverlay.getSource() as any; // olMapGuideSource;
            source.updateParams({
                SELECTIONCOLOR: color
            });
        }
    }
    public updateExternalBaseLayers(externalBaseLayers: IExternalBaseLayer[]) {
        if (this.externalBaseLayersGroup) {
            const layers = this.externalBaseLayersGroup.getLayers();
            layers.forEach((l: olLayerBase) => {
                const match = (externalBaseLayers || []).filter(el => el.name === l.get("title"));
                if (match.length == 1) {
                    l.setVisible(!!match[0].visible);
                } else {
                    l.setVisible(false);
                }
            });
        }
    }
    public updateTransparency(trans: LayerTransparencySet) {
        //If no external layers defined, this won't be set
        if (this.externalBaseLayersGroup) {
            if (LAYER_ID_BASE in trans) {
                this.externalBaseLayersGroup.setOpacity(restrictToRange(trans[LAYER_ID_BASE], 0, 1.0));
            } else {
                this.externalBaseLayersGroup.setOpacity(1.0);
            }
        }

        if (LAYER_ID_MG_BASE in trans) {
            const opacity = restrictToRange(trans[LAYER_ID_MG_BASE], 0, 1.0);
            this.overlay.setOpacity(opacity);
            for (const group of this.mgTiledLayers) {
                group.setOpacity(opacity);
            }
        } else {
            this.overlay.setOpacity(1.0);
            for (const group of this.mgTiledLayers) {
                group.setOpacity(1.0);
            }
        }

        if (this.selectionOverlay) {
            if (LAYER_ID_MG_SEL_OVERLAY in trans) {
                this.selectionOverlay.setOpacity(restrictToRange(trans[LAYER_ID_MG_SEL_OVERLAY], 0, 1.0));
            } else {
                this.selectionOverlay.setOpacity(1.0);
            }
        }
    }
    public refreshMap(mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void {
        if ((mode & RefreshMode.LayersOnly) == RefreshMode.LayersOnly) {
            const imgSource = this.overlay.getSource() as any; // olMapGuideSource;
            imgSource.updateParams({
                seq: (new Date()).getTime()
            });
        }
        if (this.selectionOverlay) {
            if ((mode & RefreshMode.SelectionOnly) == RefreshMode.SelectionOnly) {
                const imgSource = this.selectionOverlay.getSource() as any; // olMapGuideSource;
                imgSource.updateParams({
                    seq: (new Date()).getTime()
                });
            }
        }
    }
    private makeActiveSelectedFeatureSource(mapExtent: Bounds, size: Size, url: string = BLANK_GIF_DATA_URI) {
        return new olImageStaticSource({
            imageExtent: mapExtent,
            imageSize: [size.w, size.h],
            url: url
        });
    }
    public showActiveSelectedFeature(mapExtent: Bounds, size: Size, uri: string) {
        if (this.activeSelectedFeatureOverlay) {
            this.activeSelectedFeatureOverlay.setSource(this.makeActiveSelectedFeatureSource(mapExtent, size, uri));
            this.activeSelectedFeatureOverlay.setVisible(true);
        }
    }
}

class MgInnerLayerSetFactory {
    private dynamicOverlayParams: any;
    private staticOverlayParams: any;
    private selectionOverlayParams: any;
    constructor(private callback: IMapViewerContextCallback,
        private map: RuntimeMap,
        private agentUri: string,
        imageFormat: string,
        selectionImageFormat: string | undefined,
        selectionColor: string | undefined) {
        this.dynamicOverlayParams = {
            MAPNAME: map.Name,
            FORMAT: imageFormat,
            SESSION: map.SessionId,
            BEHAVIOR: 2
        };
        this.staticOverlayParams = {
            MAPDEFINITION: map.MapDefinition,
            FORMAT: imageFormat,
            CLIENTAGENT: "ol.source.ImageMapGuide for OverviewMap",
            USERNAME: "Anonymous",
            VERSION: "3.0.0"
        };
        this.selectionOverlayParams = {
            MAPNAME: map.Name,
            FORMAT: selectionImageFormat || "PNG8",
            SESSION: map.SessionId,
            SELECTIONCOLOR: selectionColor,
            BEHAVIOR: 1 | 4 //selected features + include outside current scale
        };
    }
    private getTileUrlFunctionForGroup(resourceId: string, groupName: string, zOrigin: number) {
        const urlTemplate = this.callback.getClient().getTileTemplateUrl(resourceId, groupName, '{x}', '{y}', '{z}');
        return function (tileCoord: [number, number, number]) {
            return urlTemplate
                .replace('{z}', (zOrigin - tileCoord[0]).toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', (-tileCoord[2] - 1).toString());
        };
    }
    public create(locale: string | undefined,
        externalBaseLayers: IExternalBaseLayer[] | undefined,
        isNotForOverviewMap: boolean): ILayerSetOL {
        const { map, agentUri } = this;
        //If a tile set definition is defined it takes precedence over the map definition, this enables
        //this example to work with older releases of MapGuide where no such resource type exists.
        const resourceId = map.TileSetDefinition || map.MapDefinition;
        //On MGOS 2.6 or older, tile width/height is never returned, so default to 300x300
        const tileWidth = map.TileWidth || 300;
        const tileHeight = map.TileHeight || 300;
        const metersPerUnit = map.CoordinateSystem.MetersPerUnit;
        const finiteScales = [] as number[];
        if (map.FiniteDisplayScale) {
            for (let i = map.FiniteDisplayScale.length - 1; i >= 0; i--) {
                finiteScales.push(map.FiniteDisplayScale[i]);
            }
        }
        const extent: olExtent.Extent = [
            map.Extents.LowerLeftCoordinate.X,
            map.Extents.LowerLeftCoordinate.Y,
            map.Extents.UpperRightCoordinate.X,
            map.Extents.UpperRightCoordinate.Y
        ];
        const dpi = map.DisplayDpi;
        const inPerUnit = 39.37 * map.CoordinateSystem.MetersPerUnit;
        const resolutions = new Array(finiteScales.length);
        let projection: string | undefined;
        for (let i = 0; i < finiteScales.length; ++i) {
            resolutions[i] = finiteScales[i] / inPerUnit / dpi;
        }

        if (map.CoordinateSystem.EpsgCode.length > 0) {
            projection = `EPSG:${map.CoordinateSystem.EpsgCode}`;
        }

        const tileGrid = new olTileGrid({
            origin: olExtent.getTopLeft(extent),
            resolutions: resolutions,
            tileSize: [tileWidth, tileHeight]
        });

        const zOrigin = finiteScales.length - 1;
        const mgTiledLayers = [];

        //const groupLayers = [] as olTileLayer[];
        if (map.Group) {
            for (let i = 0; i < map.Group.length; i++) {
                const group = map.Group[i];
                if (group.Type != 2 && group.Type != 3) { //BaseMap or LinkedTileSet
                    continue;
                }
                const tileSource = new olTileImageSource({
                    tileGrid: tileGrid,
                    projection: projection,
                    tileUrlFunction: this.getTileUrlFunctionForGroup(resourceId, group.Name, zOrigin),
                    wrapX: false
                });
                const tileLayer = new olTileLayer({
                    //name: group.Name,
                    source: tileSource
                });
                tileLayer.set(LayerProperty.LAYER_NAME, group.ObjectId);
                tileLayer.set(LayerProperty.LAYER_TYPE, MgLayerType.Tiled);
                tileLayer.set(LayerProperty.IS_EXTERNAL, false);
                tileLayer.set(LayerProperty.IS_GROUP, false);
                tileLayer.setVisible(group.Visible);
                //groupLayers.push(tileLayer);
                mgTiledLayers.push(tileLayer);
            }
        }
        /*
        if (groupLayers.length > 0) {
            groupLayers.push(
                new ol.layer.Tile({
                    source: new ol.source.TileDebug({
                        tileGrid: tileGrid,
                        projection: projection,
                        tileUrlFunction: function(tileCoord) {
                            return urlTemplate.replace('{z}', (zOrigin - tileCoord[0]).toString())
                                .replace('{x}', tileCoord[1].toString())
                                .replace('{y}', (-tileCoord[2] - 1).toString());
                        },
                        wrapX: false
                    })
                })
            );
        }
        */
        const overlay = this.createMgOverlayLayer(MgBuiltInLayers.Overlay, agentUri, metersPerUnit, projection, isNotForOverviewMap, isNotForOverviewMap ? this.dynamicOverlayParams : this.staticOverlayParams);

        let selectionOverlay: olImageLayer | undefined;
        let activeSelectedFeatureOverlay: olImageLayer | undefined;
        if (isNotForOverviewMap) {
            selectionOverlay = this.createMgOverlayLayer(MgBuiltInLayers.SelectionOverlay, agentUri, metersPerUnit, projection, isNotForOverviewMap, this.selectionOverlayParams);
        }
        if (isNotForOverviewMap) {
            //NOTE: Not tracking this source atm
            activeSelectedFeatureOverlay = new olImageLayer({
                //OL6: need to specify a source up-front otherwise it will error blindly
                //trying to get a source out of this URL, so set up a source with an empty
                //image data URI, it will be updated if we receive a request to show an
                //active selected feature image
                source: new olImageStaticSource({
                    imageExtent: extent,
                    imageSize: [BLANK_SIZE.w, BLANK_SIZE.h],
                    url: BLANK_GIF_DATA_URI
                })
            });
            activeSelectedFeatureOverlay.set(LayerProperty.LAYER_NAME, MgBuiltInLayers.ActiveFeatureSelectionOverlay);
            activeSelectedFeatureOverlay.set(LayerProperty.LAYER_TYPE, MG_LAYER_TYPE_NAME);
            activeSelectedFeatureOverlay.set(LayerProperty.IS_EXTERNAL, false)
            activeSelectedFeatureOverlay.set(LayerProperty.IS_GROUP, false);
        }
        let externalBaseLayersGroup: olLayerGroup | undefined;
        //NOTE: Don't bother adding external base layers for overview map as the main map in the
        //overview is rendered with GETMAPIMAGE and not GETDYNAMICMAPOVERLAYIMAGE meaning the background
        //is opaque and you won't be able to see the base layers underneath anyways.
        if (isNotForOverviewMap && externalBaseLayers != null) {
            const groupOpts: any = {
                title: tr("EXTERNAL_BASE_LAYERS", locale),
                layers: externalBaseLayers.map(ext => {
                    const tl = this.createExternalBaseLayer(ext);
                    return tl;
                })
            };
            externalBaseLayersGroup = new olLayerGroup(groupOpts);
            externalBaseLayersGroup.set(LayerProperty.LAYER_NAME, MG_BASE_LAYER_GROUP_NAME);
            externalBaseLayersGroup.set(LayerProperty.IS_EXTERNAL, false);
            externalBaseLayersGroup.set(LayerProperty.IS_GROUP, true);
        }

        logger.debug(`Creating OL view with projection ${projection} and ${resolutions.length} resolutions`);
        let view: olView;
        if (resolutions.length == 0) {
            view = new olView({
                projection: projection
            });
        } else {
            view = new olView({
                projection: projection,
                resolutions: resolutions
            });
        }

        const layerSet = new MgLayerSetInner(mgTiledLayers,
            externalBaseLayersGroup,
            overlay,
            projection,
            dpi,
            extent,
            inPerUnit,
            view);
        layerSet.selectionOverlay = selectionOverlay;
        layerSet.activeSelectedFeatureOverlay = activeSelectedFeatureOverlay;
        return layerSet;
    }
    private createExternalBaseLayer(ext: IExternalBaseLayer) {
        const extSource = createExternalSource(ext);
        const options: any = {
            title: ext.name,
            type: "base",
            visible: ext.visible === true,
            source: extSource
        };
        const tl = new olTileLayer(options);
        tl.set(LayerProperty.LAYER_TYPE, ext.kind);
        tl.set(LayerProperty.LAYER_NAME, ext.name);
        tl.set(LayerProperty.IS_EXTERNAL, false);
        tl.set(LayerProperty.IS_GROUP, false);
        return tl;
    }
    private createMgOverlayLayer(layerName: string, agentUri: string, metersPerUnit: number, projection: string | undefined, useImageOverlayOp: boolean, params: any): olImageLayer {
        const overlaySource = createMapGuideSource({
            projection: projection,
            url: agentUri,
            useOverlay: useImageOverlayOp,
            metersPerUnit: metersPerUnit,
            params: params,
            ratio: 1
        });
        const layer = new olImageLayer({
            //name: "MapGuide Dynamic Overlay",
            source: overlaySource
        });
        layer.set(LayerProperty.LAYER_NAME, layerName);
        layer.set(LayerProperty.LAYER_TYPE, MG_LAYER_TYPE_NAME);
        layer.set(LayerProperty.IS_EXTERNAL, false);
        layer.set(LayerProperty.IS_GROUP, false);
        return layer;
    }
}

export class MgLayerSet {
    private mainSet: ILayerSetOL;
    private overviewSet: ILayerSetOL;

    private callback: IMapViewerContextCallback;
    private _customLayers: {
        [name: string]: {
            layer: olLayerBase,
            order: number
        }
    };
    constructor(props: IMapViewerContextProps, callback: IMapViewerContextCallback) {
        this.callback = callback;
        this._customLayers = {};
        const factory = new MgInnerLayerSetFactory(callback, props.map, props.agentUri, props.imageFormat, props.selectionImageFormat, props.selectionColor);

        //NOTE: MapGuide does not like concurrent map rendering operations of the same mapname/session pair, which
        //this will do when the MG overlay is shared between the main viewer and the overview map. This is probably
        //because the concurrent requests both have SET[X/Y/SCALE/DPI/etc] parameters attached, so there is concurrent
        //requests to modify and persist the runtime map state (in addition to the rendering) and there is most likely
        //server-side lock contention to safely update the map state. Long story short: re-using the main overlay for the
        //OverviewMap control IS A BAD THING. Same thing happens with selection overlays
        //
        //As of OL6, this unwanted behavior from shared layers extends to all layer types, so what this means is that
        //we have to create 2 sets of layers, one for the main map and one for the overview map. We CANNOT and DO NOT share
        //any of these layer instances between the main map and the overview map!

        this.mainSet = factory.create(props.locale, props.externalBaseLayers, true);
        this.overviewSet = factory.create(props.locale, props.externalBaseLayers, false);
        const progressNotifySources = this.mainSet.getSourcesForProgressTracking();
        /*
        console.log("Draw Order:");
        for (let i = 0; i < layers.length; i++) {
            console.log(" " + layers[i].get(LayerProperty.LAYER_NAME));
        }
        */

        for (const src of progressNotifySources) {
            const suppress: boolean | undefined = src.get(SourceProperty.SUPPRESS_LOAD_EVENTS);
            if (!(suppress == true))
                this.registerSourceEvents(src);
        }
    }

    public setMapGuideMocking(mock: boolean) {
        const allLayers = this.mainSet.getLayers();
        for (const layer of allLayers) {
            if (layer instanceof olImageLayer) {
                const source = layer.getSource();
                if (source instanceof olMapGuideSource) {
                    if (mock) {
                        source.setImageLoadFunction(mockMapGuideImageLoadFunction);
                    } else {
                        source.setImageLoadFunction(defaultImageLoadFunction);
                    }
                }
            }
        }
    }
    private registerSourceEvents(source: olSource): void {
        if (source instanceof olImageSource) {
            source.on("imageloadstart", this.callback.addImageLoading);
            //onImageError is a MapGuide-specific callback
            if (isMapGuideImageSource(source)) {
                source.on("imageloaderror", this.callback.onImageError);
            }
            source.on("imageloaderror", this.callback.addImageLoaded);
            source.on("imageloadend", this.callback.addImageLoaded);
        } else if (source instanceof olTileImageSource) {
            source.on("tileloadstart", this.callback.addImageLoading);
            source.on("tileloaderror", this.callback.addImageLoaded);
            source.on("tileloadend", this.callback.addImageLoaded);
        }
    }
    public updateSelectionColor = (color: string) => this.mainSet.updateSelectionColor(color);
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
    public update = (showGroups: string[] | undefined, showLayers: string[] | undefined, hideGroups: string[] | undefined, hideLayers: string[] | undefined) => this.mainSet.update(showGroups, showLayers, hideGroups, hideLayers);
    public attach(map: olMap, ovMapControl: olOverviewMap, bSetLayers = true): void {
        // To guard against the possibility that we may be attaching layers to a map that
        // already has layers (eg. Measurements), we reverse iterate all the layers we need to
        // add and insert them to the front one-by-one, ensuring all the layers we add will be
        // at the bottom of the draw order
        const layers = map.getLayers();
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
                ovMap.setView(new olView({
                    center: [center[0], center[1]],
                    resolution: this.mainSet.view.getResolution(),
                    projection: this.mainSet.view.getProjection()
                }));
            } else {
                const view = new olView({
                    projection: this.mainSet.view.getProjection()
                });
                ovMap.setView(view);
                view.fit(this.mainSet.extent, { size: ovMap.getSize() });
            }
        }
    }
    public detach(map: olMap, ovMapControl: olOverviewMap): void {
        const allLayers = this.mainSet.getLayers();
        for (const layer of allLayers) {
            map.removeLayer(layer);
        }
        //Detach custom layers
        for (const layerName in this._customLayers) {
            map.removeLayer(this._customLayers[layerName].layer);
        }
        const ovLayers = this.getLayersForOverviewMap();
        const ovMap = ovMapControl.getOverviewMap();
        for (const layer of ovLayers) {
            ovMap.removeLayer(layer);
        }
    }

    public getCustomLayers(map: olMap): ILayerInfo[] {
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
    public addLayer<T extends olLayerBase>(map: olMap, name: string, layer: T, allowReplace?: boolean): T {
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
        return layer;
    }
    public removeLayer(map: olMap, name: string): olLayerBase | undefined {
        let layer: olLayerBase;
        if (this._customLayers[name]) {
            layer = this._customLayers[name].layer;
            map.removeLayer(layer);
            delete this._customLayers[name];
            return layer;
        }
    }
    public getLayer<T extends olLayerBase>(name: string): T | undefined {
        let layer: T | undefined;
        if (this._customLayers[name]) {
            layer = this._customLayers[name]?.layer as T;
        }
        return layer;
    }
    public apply(map: olMap, layers: ILayerInfo[]): void {
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
                if (oll instanceof olVectorLayer && layer.vectorStyle) {
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