import {
    GenericEvent,
    GenericEventHandler,
    Bounds,
    RefreshMode,
    ClientKind,
    Dictionary,
    Coordinate,
    ImageFormat,
    IExternalBaseLayer,
    LayerTransparencySet,
    ActiveSelectedFeature,
    ILayerInfo
} from "../api/common";
import { Client } from '../api/client';
import { MgError, isSessionExpiredError } from '../api/error';
import { RuntimeMap } from "../api/contracts/runtime-map";
import { tr } from "../api/i18n";
import * as ReactDOM from "react-dom";
import * as logger from '../utils/logger';
import debounce = require("lodash.debounce");
import { createExternalSource } from "./external-layer-factory";

import olExtent from "ol/extent";
import olMap from "ol/map";
import olView from "ol/view";
import olOverlay from "ol/overlay";
import olProjection from "ol/proj/projection";
import olWKTFormat from "ol/format/wkt";
import olPoint from "ol/geom/point";
import olPolygon from "ol/geom/polygon";
import olLayerBase from "ol/layer/base";
import olTileLayer from "ol/layer/tile";
import olImageLayer from "ol/layer/image";
import olLayerGroup from "ol/layer/group";
import olTileGrid from "ol/tilegrid/tilegrid";
import olSource from "ol/source/source";
import olImageSource from "ol/source/image";
import olTileImageSource from "ol/source/tileimage";
//import olMapGuideSource from "ol/source/imagemapguide";
import createMapGuideSource, { isMapGuideImageSource } from "../api/ol-mapguide-source";
import olOverviewMap from "ol/control/overviewmap";
import olImageStaticSource from "ol/source/imagestatic";
import { LAYER_ID_BASE, LAYER_ID_MG_BASE, LAYER_ID_MG_SEL_OVERLAY, BLANK_GIF_DATA_URI } from "../constants/index";
import { restrictToRange } from "../utils/number";
import { Size } from "../containers/map-capturer-context";

const HIDDEN_CLASS_NAME = "tooltip-hidden";

const BLANK_SIZE: Size = { w: 1, h: 1 };

class MouseTrackingTooltip {
    private tooltip: olOverlay;
    private tooltipElement: Element;
    private map: olMap;
    private text: string | null;
    private isContextMenuOpen: () => boolean;
    constructor(map: olMap, contextMenuTest: () => boolean) {
        this.map = map;
        this.isContextMenuOpen = contextMenuTest;
        this.map.getViewport().addEventListener("mouseout", this.onMouseOut.bind(this));
        this.tooltipElement = document.createElement("div");
        this.tooltipElement.className = 'tooltip';
        this.tooltip = new olOverlay({
            element: this.tooltipElement,
            offset: [15, 0],
            positioning: "center-left" /*ol.OverlayPositioning.CENTER_LEFT*/
        })
        this.map.addOverlay(this.tooltip);
        this.text = null;
        this.tooltipElement.classList.add(HIDDEN_CLASS_NAME);
    }
    public onMouseMove(e: GenericEvent) {
        if (this.isContextMenuOpen())
            return;
        this.tooltip.setPosition(e.coordinate);
        if (this.text)
            this.tooltipElement.classList.remove(HIDDEN_CLASS_NAME);
        else
            this.tooltipElement.classList.add(HIDDEN_CLASS_NAME);
    }
    private onMouseOut(e: GenericEvent) {
        this.tooltipElement.classList.add(HIDDEN_CLASS_NAME);
    }
    public setText(prompt: string) {
        this.text = prompt;
        this.tooltipElement.innerHTML = this.text;
    }
    public clear() {
        this.text = null;
        this.tooltipElement.innerHTML = "";
    }
    public destroy() {
        if (this.tooltipElement && this.tooltipElement.parentNode) {
            this.tooltipElement.parentNode.removeChild(this.tooltipElement);
        }
    }
}

class FeatureQueryTooltip {
    private wktFormat: olWKTFormat;
    private map: olMap;
    private onRequestSelectableLayers: (() => string[]) | undefined;
    private throttledMouseMove: GenericEventHandler;
    private featureTooltipElement: Element;
    private featureTooltip: olOverlay;
    private enabled: boolean;
    private isMouseOverTooltip: boolean;
    private callback: IMapViewerContextCallback;
    constructor(map: olMap, callback: IMapViewerContextCallback) {
        this.callback = callback;
        this.wktFormat = new olWKTFormat();
        this.featureTooltipElement = document.createElement("div");
        this.featureTooltipElement.addEventListener("mouseover", e => this.isMouseOverTooltip = true);
        this.featureTooltipElement.addEventListener("mouseout", e => this.isMouseOverTooltip = false);
        this.featureTooltipElement.className = 'feature-tooltip';
        this.featureTooltip = new olOverlay({
            element: this.featureTooltipElement,
            offset: [15, 0],
            positioning: "center-left" /* ol.OverlayPositioning.CENTER_LEFT */
        })
        this.map = map;
        this.map.addOverlay(this.featureTooltip);
        this.throttledMouseMove = debounce((e: GenericEvent) => {
            const box = this.callback.getPointSelectionBox(e.pixel);
            const geom = olPolygon.fromExtent(box);
            const coords: Coordinate = e.coordinate;
            logger.debug(`[${new Date()}] FeatureTooltip - onMouseMove (${box[0]}, ${box[1]}) (${box[2]}, ${box[3]})`);
            this.sendTooltipQuery(geom);
        }, 1000);
        this.enabled = true;
        this.isMouseOverTooltip = false;
    }
    public onMouseMove(e: GenericEvent) {
        this.throttledMouseMove(e);
    }
    public isEnabled(): boolean {
        return this.enabled;
    }
    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        if (!this.enabled) {
            this.featureTooltipElement.innerHTML = "";
            this.featureTooltipElement.classList.add("tooltip-hidden");
        }
    }
    private sendTooltipQuery(geom: olPolygon): void {
        if (!this.enabled) {
            return;
        }
        if (this.isMouseOverTooltip) {
            logger.debug(`Mouse over tooltip. Doing nothing`);
            return;
        }
        //const selectedLayerNames = this.onRequestSelectableLayers();
        //if (selectedLayerNames != null && selectedLayerNames.length == 0) {
        //    return;
        //}
        const reqQueryFeatures = 4 | 8; //Tooltips and hyperlinks
        const wkt = this.wktFormat.writeGeometry(geom);
        const client = new Client(this.callback.getAgentUri(), this.callback.getAgentKind());

        //This is probably a case of blink and you'll miss
        //
        //this.featureTooltipElement.innerHTML = "Querying tooltip data ...";
        //this.featureTooltipElement.classList.remove("tooltip-hidden");
        const coords = olExtent.getCenter(geom.getExtent());
        this.featureTooltip.setPosition(coords);
        this.callback.incrementBusyWorker();
        client.queryMapFeatures({
            mapname: this.callback.getMapName(),
            session: this.callback.getSessionId(),
            //layernames: selectedLayerNames != null ? selectedLayerNames.join(",") : null,
            geometry: wkt,
            persist: 0,
            selectionvariant: "INTERSECTS",
            maxfeatures: 1,
            requestdata: reqQueryFeatures,
            layerattributefilter: 5
        }).then(res => {
            let html = "";
            if (res.Tooltip) {
                html += `<div class='feature-tooltip-body'>${res.Tooltip.replace(/\\n/g, "<br/>")}</div>`;
            }
            if (res.Hyperlink) {
                html += `<div><a href='${res.Hyperlink}'>Click for more information</a></div>`;
            }
            this.featureTooltipElement.innerHTML = html;
            if (html == "") {
                this.featureTooltipElement.classList.add("tooltip-hidden");
            } else {
                this.featureTooltipElement.classList.remove("tooltip-hidden");
            }
        }).then(res => {
            this.callback.decrementBusyWorker();
        }).catch (err => {
            this.callback.decrementBusyWorker();
            if (isSessionExpiredError(err)) {
                this.callback.onSessionExpired();
            }
        });
    }
}

export interface IMapViewerContextProps {
    map: RuntimeMap;
    imageFormat: ImageFormat;
    selectionImageFormat?: ImageFormat;
    selectionColor?: string;
    agentUri: string;
    externalBaseLayers?: IExternalBaseLayer[];
    locale?: string;
}

export class MgLayerSet {
    private baseLayerGroups: olTileLayer[];
    private overlay: olImageLayer;
    private overviewOverlay: olImageLayer;
    private selectionOverlay: olImageLayer;
    private activeSelectedFeatureOverlay: olImageLayer;
    private baseLayerGroup: olLayerGroup;
    private dynamicOverlayParams: any;
    private staticOverlayParams: any;
    private selectionOverlayParams: any;
    projection: string;
    dpi: number;
    extent: ol.Extent;
    private allLayers: olLayerBase[];
    private inPerUnit: number;
    private resourceId: string;
    view: olView;
    private callback: IMapViewerContextCallback;
    private _customLayers: { [name: string]: olLayerBase; };
    constructor(props: IMapViewerContextProps, callback: IMapViewerContextCallback) {
        this.callback = callback;
        this._customLayers = {};
        const map = props.map;

        //If a tile set definition is defined it takes precedence over the map definition, this enables
        //this example to work with older releases of MapGuide where no such resource type exists.
        const resourceId = map.TileSetDefinition || map.MapDefinition;
        //On MGOS 2.6 or older, tile width/height is never returned, so default to 300x300
        const tileWidth = map.TileWidth || 300;
        const tileHeight = map.TileHeight || 300;
        const metersPerUnit = map.CoordinateSystem.MetersPerUnit;

        this.dynamicOverlayParams = {
            MAPNAME: map.Name,
            FORMAT: props.imageFormat,
            SESSION: map.SessionId,
            BEHAVIOR: 2
        };
        this.staticOverlayParams = {
            MAPDEFINITION: map.MapDefinition,
            FORMAT: props.imageFormat,
            CLIENTAGENT: "ol.source.ImageMapGuide for OverviewMap",
            USERNAME: "Anonymous",
            VERSION: "3.0.0"
        };
        this.selectionOverlayParams = {
            MAPNAME: map.Name,
            FORMAT: props.selectionImageFormat || "PNG8",
            SESSION: map.SessionId,
            SELECTIONCOLOR: props.selectionColor,
            BEHAVIOR: 1 | 4 //selected features + include outside current scale
        };
        this.baseLayerGroups = [];
        this.extent = [
            map.Extents.LowerLeftCoordinate.X,
            map.Extents.LowerLeftCoordinate.Y,
            map.Extents.UpperRightCoordinate.X,
            map.Extents.UpperRightCoordinate.Y
        ];
        this.allLayers = [];
        this.dpi = map.DisplayDpi;
        this.inPerUnit = 39.37 * map.CoordinateSystem.MetersPerUnit;

        const finiteScales = [] as number[];
        if (map.FiniteDisplayScale) {
            for (let i = map.FiniteDisplayScale.length - 1; i >= 0; i--) {
                finiteScales.push(map.FiniteDisplayScale[i]);
            }
        }
        const zOrigin = finiteScales.length - 1;
        const resolutions = new Array(finiteScales.length);
        for (let i = 0; i < finiteScales.length; ++i) {
            resolutions[i] = this.scaleToResolution(finiteScales[i]);
        }

        if (map.CoordinateSystem.EpsgCode.length > 0) {
            this.projection = `EPSG:${map.CoordinateSystem.EpsgCode}`;
        }

        const tileGrid = new olTileGrid({
            origin: olExtent.getTopLeft(this.extent),
            resolutions: resolutions,
            tileSize: [tileWidth, tileHeight]
        });

        const sources = [] as olSource[];

        const groupLayers = [] as olTileLayer[];
        if (map.Group) {
            for (let i = 0; i < map.Group.length; i++) {
                const group = map.Group[i];
                if (group.Type != 2 && group.Type != 3) { //BaseMap or LinkedTileSet
                    continue;
                }
                const tileSource = new olTileImageSource({
                    tileGrid: tileGrid,
                    projection: this.projection,
                    tileUrlFunction: this.getTileUrlFunctionForGroup(resourceId, group.Name, zOrigin),
                    wrapX: false
                });
                const tileLayer = new olTileLayer({
                    //name: group.Name,
                    source: tileSource
                });
                sources.push(tileSource);
                tileLayer.set("name", group.ObjectId);
                groupLayers.push(tileLayer);
                this.baseLayerGroups.push(tileLayer);
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

        const overlaySource = createMapGuideSource({
            projection: this.projection,
            url: props.agentUri,
            useOverlay: true,
            metersPerUnit: metersPerUnit,
            params: this.dynamicOverlayParams,
            ratio: 1
        });
        sources.push(overlaySource);
        this.overlay = new olImageLayer({
            //name: "MapGuide Dynamic Overlay",
            source: overlaySource
        });
        const overviewOverlaySource = createMapGuideSource({
            projection: this.projection,
            url: props.agentUri,
            useOverlay: false,
            metersPerUnit: metersPerUnit,
            params: this.staticOverlayParams,
            ratio: 1
        });
        this.overviewOverlay = new olImageLayer({
            //name: "MapGuide Dynamic Overlay",
            source: overviewOverlaySource
        });
        sources.push(overviewOverlaySource);
        const selectionOverlaySource = createMapGuideSource({
            projection: this.projection,
            url: props.agentUri,
            useOverlay: true,
            metersPerUnit: metersPerUnit,
            params: this.selectionOverlayParams,
            ratio: 1
        });
        this.selectionOverlay = new olImageLayer({
            //name: "MapGuide Dynamic Overlay",
            source: selectionOverlaySource
        });
        sources.push(selectionOverlaySource);
        //NOTE: Not tracking this source atm
        this.activeSelectedFeatureOverlay = new olImageLayer();
        if (props.externalBaseLayers != null) {
            const groupOpts: any = {
                title: tr("EXTERNAL_BASE_LAYERS", props.locale),
                layers: props.externalBaseLayers.map(ext => {
                    const extSource = createExternalSource(ext);
                    const options: any = {
                        title: ext.name,
                        type: "base",
                        visible: ext.visible === true,
                        source: extSource
                    };
                    sources.push(extSource);
                    return new olTileLayer(options)
                })
            };
            this.baseLayerGroup = new olLayerGroup(groupOpts);
            this.allLayers.push(this.baseLayerGroup);
        }

        for (let i = groupLayers.length - 1; i >= 0; i--) {
            this.allLayers.push(groupLayers[i]);
        }
        this.allLayers.push(this.overlay);
        this.allLayers.push(this.selectionOverlay);
        this.allLayers.push(this.activeSelectedFeatureOverlay);
        /*
        console.log("Draw Order:");
        for (let i = 0; i < layers.length; i++) {
            console.log(" " + layers[i].get("name"));
        }
        */
        logger.debug(`Creating OL view with projection ${this.projection} and ${resolutions.length} resolutions`);
        if (resolutions.length == 0) {
            this.view = new olView({
                projection: this.projection
            });
        } else {
            this.view = new olView({
                projection: this.projection,
                resolutions: resolutions
            });
        }

        //Listen for scale changes
        const selSource = this.selectionOverlay.getSource();
        const ovSource = this.overlay.getSource();
        
        for (const src of sources) {
            this.registerSourceEvents(src);
        }
    }
    private makeActiveSelectedFeatureSource(mapExtent: Bounds, size: Size, url: string = BLANK_GIF_DATA_URI) {
        return new olImageStaticSource({
            imageExtent: mapExtent,
            imageSize: [size.w, size.h],
            url: url
        });
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
    public getLayersForOverviewMap(): olLayerBase[] {
        //NOTE: MapGuide does not like concurrent map rendering operations of the same mapname/session pair, which
        //this will do when the MG overlay is shared between the main viewer and the overview map. This is probably
        //because the concurrent requests both have SET[X/Y/SCALE/DPI/etc] parameters attached, so there is concurrent
        //requests to modify and persist the runtime map state (in addition to the rendering) and there is most likely
        //server-side lock contention to safely update the map state. Long story short: re-using the main overlay for the
        //OverviewMap control IS A BAD THING. Same thing happens with selection overlays.
        //
        //So as a workaround, we setup a secondary ol.layer.Image that uses the stateless version of the rendering
        //operation (GETMAPIMAGE), and when setting up the OverviewMap control (ie. This method is called), we give them
        //back the full layer set, with the selection overlay omitted (I doubt anyone really cares that selections don't render
        //on the tiny overview map) and the main overlay substituted with the stateless version.
        const layers = [];
        for (const layer of this.allLayers) {
            if (layer == this.selectionOverlay) {
                continue;
            }
            if (layer == this.overlay) {
                layers.push(this.overviewOverlay);
            } else {
                layers.push(layer);
            }
        }
        return layers;
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
    public getMetersPerUnit(): number {
        return this.inPerUnit / 39.37
    }
    public scaleToResolution(scale: number): number {
        return scale / this.inPerUnit / this.dpi;
    }
    public resolutionToScale(resolution: number): number {
        return resolution * this.dpi * this.inPerUnit;
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
                const match = this.baseLayerGroups.filter(l => l.get("name") === groupId);
                if (match.length == 1) {
                    match[0].setVisible(true);
                }
            }
        }
        if (hideGroups && hideGroups.length > 0) {
            for (const groupId of hideGroups) {
                const match = this.baseLayerGroups.filter(l => l.get("name") === groupId);
                if (match.length == 1) {
                    match[0].setVisible(false);
                }
            }
        }
    }
    public updateSelectionColor(color: string) {
        const source = this.selectionOverlay.getSource() as any; // olMapGuideSource;
        source.updateParams({
            SELECTIONCOLOR: color
        });
    }
    public updateExternalBaseLayers(externalBaseLayers: IExternalBaseLayer[]) {
        const layers = this.baseLayerGroup.getLayers();
        layers.forEach((l: olLayerBase) => {
            const match = (externalBaseLayers || []).filter(el => el.name === l.get("title"));
            if (match.length == 1) {
                l.setVisible(!!match[0].visible);
            } else {
                l.setVisible(false);
            }
        })
    }
    public updateTransparency(trans: LayerTransparencySet) {
        //If no external layers defined, this won't be set
        if (this.baseLayerGroup) {
            if (LAYER_ID_BASE in trans) {
                this.baseLayerGroup.setOpacity(restrictToRange(trans[LAYER_ID_BASE], 0, 1.0));
            } else {
                this.baseLayerGroup.setOpacity(1.0);
            }
        }

        if (LAYER_ID_MG_BASE in trans) {
            const opacity = restrictToRange(trans[LAYER_ID_MG_BASE], 0, 1.0);
            this.overlay.setOpacity(opacity);
            for (const group of this.baseLayerGroups) {
                group.setOpacity(opacity);
            }
        } else {
            this.overlay.setOpacity(1.0);
            for (const group of this.baseLayerGroups) {
                group.setOpacity(1.0);
            }
        }

        if (LAYER_ID_MG_SEL_OVERLAY in trans) {
            this.selectionOverlay.setOpacity(restrictToRange(trans[LAYER_ID_MG_SEL_OVERLAY], 0, 1.0));
        } else {
            this.selectionOverlay.setOpacity(1.0);
        }
    }
    public refreshMap(mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void {
        if ((mode & RefreshMode.LayersOnly) == RefreshMode.LayersOnly) {
            const imgSource = this.overlay.getSource() as any; // olMapGuideSource;
            imgSource.updateParams({
                seq: (new Date()).getTime()
            });
        }
        if ((mode & RefreshMode.SelectionOnly) == RefreshMode.SelectionOnly) {
            const imgSource = this.selectionOverlay.getSource() as any; // olMapGuideSource;
            imgSource.updateParams({
                seq: (new Date()).getTime()
            });
        }
    }
    public attach(map: olMap, ovMapControl: olOverviewMap, bSetLayers = true): void {
        // To guard against the possibility that we may be attaching layers to a map that
        // already has layers (eg. Measurements), we reverse iterate all the layers we need to
        // add and insert them to the front one-by-one, ensuring all the layers we add will be
        // at the bottom of the draw order
        const layers = map.getLayers();
        for (let i = this.allLayers.length - 1; i >= 0; i--) {
            layers.insertAt(0, this.allLayers[i]);
        }
        map.setView(this.view);
        if (bSetLayers) {
            const ovMap = ovMapControl.getOverviewMap();
            const ovLayers = this.getLayersForOverviewMap();
            for (const layer of ovLayers) {
                ovMap.addLayer(layer);
            }
            //ol.View has immutable projection, so we have to replace the whole view on the OverviewMap
            const center = this.view.getCenter();
            const resolution = this.view.getResolution();
            if (center) {
                ovMap.setView(new olView({
                    center: [ center[0], center[1] ],
                    resolution: this.view.getResolution(),
                    projection: this.view.getProjection()
                }));
            } else {
                const view = new olView({
                    projection: this.view.getProjection()
                });
                ovMap.setView(view);
                view.fit(this.extent, { size: ovMap.getSize() });
            }
        }
    }
    public detach(map: olMap, ovMapControl: olOverviewMap): void {
        const ovLayers = this.getLayersForOverviewMap();
        for (const layer of this.allLayers) {
            map.removeLayer(layer);
        }
        const ovMap = ovMapControl.getOverviewMap();
        for (const layer of ovLayers) {
            ovMap.removeLayer(layer);
        }
    }
    public showActiveSelectedFeature(mapExtent: Bounds, size: Size, uri: string) {
        this.activeSelectedFeatureOverlay.setSource(this.makeActiveSelectedFeatureSource(mapExtent, size, uri));
        this.activeSelectedFeatureOverlay.setVisible(true);
    }
    public getCustomLayers(): ILayerInfo[] {
        return Object.keys(this._customLayers).map(n => ({ name: n, type: this._customLayers[n].get("LAYER_TYPE") }));
    }
    public hasLayer(name: string): boolean {
        return this._customLayers[name] != null;
    }
    public addLayer<T extends olLayerBase>(map: olMap, name: string, layer: T, allowReplace?: boolean): T {
        const bAllow = !!allowReplace;
        if (this._customLayers[name]) {
            if (!bAllow) {
                throw new MgError(`A layer named ${name} already exists`); //LOCALIZEME
            } else {
                //Remove the layer that is about to be replaced first 
                map.removeLayer(this._customLayers[name]);
            }
        }
        this._customLayers[name] = layer;
        map.addLayer(layer);
        return layer;
    }
    public removeLayer(map: olMap, name: string): olLayerBase | undefined {
        let layer: olLayerBase;
        if (this._customLayers[name]) {
            layer = this._customLayers[name];
            map.removeLayer(layer);
            delete this._customLayers[name];
            return layer;
        }
    }
    public getLayer<T extends olLayerBase>(map: olMap, name: string, factory: () => T): T {
        let layer: T;
        if (this._customLayers[name]) {
            layer = this._customLayers[name] as T;
        } else {
            layer = factory();
            this._customLayers[name] = layer;
            map.addLayer(layer);
        }
        return layer;
    }
    public moveUp(map: olMap, name: string): number {
        const lyr = this._customLayers[name];
        if (lyr) {
            const layers = map.getLayers();
            const arr = layers.getArray();
            const idx = arr.indexOf(lyr);
            if (idx > 0) {
                layers.remove(lyr);
                layers.setAt(idx - 1, lyr);
                return idx - 1;
            }
        }
        return -1;
    }
    public moveDown(map: olMap, name: string): number {
        const lyr = this._customLayers[name];
        if (lyr) {
            const layers = map.getLayers();
            const arr = layers.getArray();
            const idx = arr.indexOf(lyr);
            if (idx < arr.length - 1) {
                layers.remove(lyr);
                layers.setAt(idx + 1, lyr);
                return idx + 1;
            }
        }
        return -1;
    }
}

export interface IMapViewerContextCallback {
    incrementBusyWorker(): void;
    decrementBusyWorker(): void;
    addImageLoading(): void;
    addImageLoaded(): void;
    onImageError(e: GenericEvent): void;
    onSessionExpired(): void;
    getSelectableLayers(): string[];
    getClient(): Client;
    isContextMenuOpen(): boolean;
    getAgentUri(): string;
    getAgentKind(): ClientKind;
    getMapName(): string;
    getSessionId(): string;
    isFeatureTooltipEnabled(): boolean;
    getPointSelectionBox(point: Coordinate): Bounds;
}

/**
 * Provides contextual information for a map viewer
 *
 * @export
 * @class MapViewerContext
 */
export class MapViewerContext {
    private _activeMapName: string;
    private _layerSets: Dictionary<MgLayerSet>;
    private _mouseTooltip: MouseTrackingTooltip;
    private _featureTooltip: FeatureQueryTooltip;
    private _map: olMap;
    private _ovMap: olOverviewMap;
    private callback: IMapViewerContextCallback;
    constructor(map: olMap, callback: IMapViewerContextCallback) {
        this.callback = callback;
        this._map = map;
        this._layerSets = {};
        this._mouseTooltip = new MouseTrackingTooltip(this._map, this.callback.isContextMenuOpen);
        this._featureTooltip = new FeatureQueryTooltip(this._map, callback);
        //HACK: To avoid chicken-egg problem, we call this.isFeatureTooltipEnabled() instead
        //of callback.isFeatureTooltipEnabled() even though its impl merely forwards to this
        this._featureTooltip.setEnabled(this.isFeatureTooltipEnabled());
    }
    public initLayerSet(props: IMapViewerContextProps): MgLayerSet {
        const map = props.map;
        const layerSet = new MgLayerSet(props, this.callback);
        this._layerSets[props.map.Name] = layerSet;
        if (!this._activeMapName) {
            this._activeMapName = props.map.Name;
        }
        return layerSet;
    }
    public initContext(layerSet: MgLayerSet, overviewMapElementSelector?: () => (Element | null)) {
        // HACK: className property not documented. This needs to be fixed in OL api doc.
        const overviewMapOpts: any = {
            className: 'ol-overviewmap ol-custom-overviewmap',
            layers: layerSet.getLayersForOverviewMap(),
            view: new olView({
                projection: layerSet.projection
            }),
            collapseLabel: String.fromCharCode(187), //'\u00BB',
            label: String.fromCharCode(171) //'\u00AB'
        };

        if (overviewMapElementSelector) {
            const el = overviewMapElementSelector();
            if (el) {
                overviewMapOpts.target = ReactDOM.findDOMNode(el);
                overviewMapOpts.collapsed = false;
                overviewMapOpts.collapsible = false;
            }
        }
        this._ovMap = new olOverviewMap(overviewMapOpts);
        this._map.addControl(this._ovMap);
        layerSet.attach(this._map, this._ovMap, false);
    }
    public updateOverviewMapElement(overviewMapElementSelector: () => (Element | null)) {
        const el = overviewMapElementSelector();
        if (el) {
            this._ovMap.setCollapsed(false);
            this._ovMap.setCollapsible(false);
            this._ovMap.setTarget(ReactDOM.findDOMNode(el));
        } else {
            this._ovMap.setCollapsed(true);
            this._ovMap.setCollapsible(true);
            this._ovMap.setTarget(null as any);
        }
    }
    public getOverviewMap(): olOverviewMap {
        return this._ovMap;
    }
    public getLayerSet(name: string, bCreate: boolean = false, props?: IMapViewerContextProps): MgLayerSet {
        let layerSet = this._layerSets[name];
        if (!layerSet && props && bCreate) {
            layerSet = this.initLayerSet(props);
            this._layerSets[props.map.Name] = layerSet;
            this._activeMapName = props.map.Name;
        }
        return layerSet;
    }
    public clearMouseTooltip(): void {
        this._mouseTooltip.clear();
    }
    public setMouseTooltip(text: string) {
        this._mouseTooltip.setText(text);
    }
    public handleMouseTooltipMouseMove(e: GenericEvent) {
        if (this._mouseTooltip) {
            this._mouseTooltip.onMouseMove(e);
        }
    }
    public handleFeatureTooltipMouseMove(e: GenericEvent) {
        if (this._featureTooltip && this._featureTooltip.isEnabled()) {
            this._featureTooltip.onMouseMove(e);
        }
    }
    public isFeatureTooltipEnabled(): boolean {
        return this._featureTooltip.isEnabled();
    }
    public enableFeatureTooltips(enabled: boolean): void {
        this._featureTooltip.setEnabled(enabled);
    }
    public refreshOnStateChange(map: RuntimeMap, showGroups: string[] | undefined, showLayers: string[] | undefined, hideGroups: string[] | undefined, hideLayers: string[] | undefined): void {
        const layerSet = this.getLayerSet(map.Name);
        layerSet.update(showGroups, showLayers, hideGroups, hideLayers);
    }
    public refreshMap(name: string, mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void {
        const layerSet = this.getLayerSet(name);
        layerSet.refreshMap(mode);
    }
    public async showSelectedFeature(mapExtent: Bounds, size: Size, map: RuntimeMap, selectionColor: string, featureXml: string | undefined) {
        const layerSet = this.getLayerSet(map.Name);
        try {
            if (featureXml) {
                const r = await this.callback.getClient().queryMapFeatures({
                    mapname: map.Name,
                    session: map.SessionId,
                    selectionformat: "PNG",
                    featurefilter: featureXml,
                    selectioncolor: selectionColor,
                    requestdata: 2, //Inline selection
                    layerattributefilter: 0,
                    persist: 0 //IMPORTANT: This is a transient selection
                });
                if (r.InlineSelectionImage) {
                    const dataUri = `data:${r.InlineSelectionImage.MimeType};base64,${r.InlineSelectionImage.Content}`;
                    layerSet.showActiveSelectedFeature(mapExtent, size, dataUri);
                } else {
                    layerSet.showActiveSelectedFeature(mapExtent, BLANK_SIZE, BLANK_GIF_DATA_URI);
                }
            } else {
                layerSet.showActiveSelectedFeature(mapExtent, BLANK_SIZE, BLANK_GIF_DATA_URI);
            }
        } catch (e) {
            layerSet.showActiveSelectedFeature(mapExtent, BLANK_SIZE, BLANK_GIF_DATA_URI);
        }
    }
}