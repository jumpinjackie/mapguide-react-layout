import {
    GenericEvent,
    GenericEventHandler,
    Bounds,
    RefreshMode,
    ClientKind,
    Dictionary,
    Coordinate2D,
    ImageFormat,
    IExternalBaseLayer,
    LayerTransparencySet,
    ILayerInfo,
    ILayerManager,
    IAddFileLayerOptions,
    LayerProperty,
    MgLayerType,
    MgBuiltInLayers,
    MG_LAYER_TYPE_NAME,
    MG_BASE_LAYER_GROUP_NAME,
    LayerExtensions,
    IWmsLayerExtensions
} from "../api/common";
import { Client } from '../api/client';
import { MgError, isSessionExpiredError } from '../api/error';
import { RuntimeMap } from "../api/contracts/runtime-map";
import { tr } from "../api/i18n";
import * as ReactDOM from "react-dom";
import * as logger from '../utils/logger';
import debounce = require("lodash.debounce");
import { createExternalSource } from "./external-layer-factory";

import * as olExtent from "ol/extent";
import olMap from "ol/Map";
import olView from "ol/View";
import olOverlay from "ol/Overlay";
import olWKTFormat from "ol/format/WKT";
import olPolygon, { fromExtent } from "ol/geom/Polygon";
import olLayerBase from "ol/layer/Base";
import olTileLayer from "ol/layer/Tile";
import olImageLayer from "ol/layer/Image";
import olLayerGroup from "ol/layer/Group";
import olTileGrid from "ol/tilegrid/TileGrid";
import olSource from "ol/source/Source";
import olSourceVector from "ol/source/Vector";
import olVectorLayer from "ol/layer/Vector";
import olImageSource, { defaultImageLoadFunction } from "ol/source/Image";
import olTileImageSource from "ol/source/TileImage";
import createMapGuideSource, { isMapGuideImageSource } from "../api/ol-mapguide-source-factory";
import olOverviewMap from "ol/control/OverviewMap";
import olImageStaticSource from "ol/source/ImageStatic";
import olMapGuideSource from "ol/source/ImageMapGuide";
import { LAYER_ID_BASE, LAYER_ID_MG_BASE, LAYER_ID_MG_SEL_OVERLAY, BLANK_GIF_DATA_URI } from "../constants/index";
import { restrictToRange } from "../utils/number";
import { Size } from "../containers/map-capturer-context";
import { getSiteVersion, canUseQueryMapFeaturesV4 } from '../utils/site-version';
import OverlayPositioning from 'ol/OverlayPositioning';
import ImageWrapper from 'ol/Image';
import { createContext } from "react";
import { parseUrl } from '../utils/url';
import { strIsNullOrEmpty } from '../utils/string';
import Feature, { FeatureLike } from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import GeoJSON from "ol/format/GeoJSON";
import GPX from "ol/format/GPX";
import IGC from "ol/format/IGC";
import KML from "ol/format/KML";
import TopoJSON from "ol/format/TopoJSON";
import olWmsSource from "ol/source/ImageWMS";
import olTileWmsSource from "ol/source/TileWMS";

/**
 * @since 0.13
 */
export interface IMapDebugContext {
    mock?: boolean;
}

export const MapDebugContext = createContext<IMapDebugContext>({});

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

const HIDDEN_CLASS_NAME = "tooltip-hidden";
const BLANK_SIZE: Size = { w: 1, h: 1 };

class MouseTrackingTooltip {
    private tooltip: olOverlay;
    private tooltipElement: HTMLElement;
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
            positioning: OverlayPositioning.CENTER_LEFT // "center-left" /*ol.OverlayPositioning.CENTER_LEFT*/
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
    private onMouseOut() {
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
    private throttledMouseMove: GenericEventHandler;
    private featureTooltipElement: HTMLElement;
    private featureTooltip: olOverlay;
    private enabled: boolean;
    private isMouseOverTooltip: boolean;
    private callback: IMapViewerContextCallback;
    constructor(map: olMap, callback: IMapViewerContextCallback) {
        this.callback = callback;
        this.wktFormat = new olWKTFormat();
        this.featureTooltipElement = document.createElement("div");
        this.featureTooltipElement.addEventListener("mouseover", () => this.isMouseOverTooltip = true);
        this.featureTooltipElement.addEventListener("mouseout", () => this.isMouseOverTooltip = false);
        this.featureTooltipElement.className = 'feature-tooltip';
        this.featureTooltip = new olOverlay({
            element: this.featureTooltipElement,
            offset: [15, 0],
            positioning: OverlayPositioning.CENTER_LEFT // "center-left" /* ol.OverlayPositioning.CENTER_LEFT */
        })
        this.map = map;
        this.map.addOverlay(this.featureTooltip);
        this.throttledMouseMove = debounce((e: GenericEvent) => {
            this.raiseQueryFromPoint(e.pixel);
        }, 1000);
        this.enabled = true;
        this.isMouseOverTooltip = false;
    }
    public raiseQueryFromPoint(pixel: [number, number]) {
        const box = this.callback.getPointSelectionBox(pixel);
        const geom = fromExtent(box);
        logger.debug(`[${new Date()}] FeatureTooltip - onMouseMove (${box[0]}, ${box[1]}) (${box[2]}, ${box[3]})`);
        this.sendTooltipQuery(geom);
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
                html += `<div><a target='taskPaneFrame' href='${res.Hyperlink}'>${tr("FEATURE_TOOLTIP_URL_HELP_TEXT", this.callback.getLocale())}</a></div>`;
            }
            this.featureTooltipElement.innerHTML = html;
            if (html == "") {
                this.featureTooltipElement.classList.add("tooltip-hidden");
            } else {
                this.featureTooltipElement.classList.remove("tooltip-hidden");
            }
        }).then(() => {
            this.callback.decrementBusyWorker();
        }).catch(err => {
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
    showGroups?: string[];
    showLayers?: string[];
    hideGroups?: string[];
    hideLayers?: string[];
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
    extent: Bounds;
    private allLayers: olLayerBase[];
    private inPerUnit: number;
    view: olView;
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
                tileLayer.set(LayerProperty.LAYER_NAME, group.ObjectId);
                tileLayer.set(LayerProperty.LAYER_TYPE, MgLayerType.Tiled);
                tileLayer.set(LayerProperty.IS_EXTERNAL, false);
                tileLayer.set(LayerProperty.IS_GROUP, false);
                tileLayer.setVisible(group.Visible);
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
        this.overlay.set(LayerProperty.LAYER_NAME, MgBuiltInLayers.Overlay);
        this.overlay.set(LayerProperty.LAYER_TYPE, MG_LAYER_TYPE_NAME);
        this.overlay.set(LayerProperty.IS_EXTERNAL, false);
        this.overlay.set(LayerProperty.IS_GROUP, false);
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
        this.overviewOverlay.set(LayerProperty.LAYER_NAME, MgBuiltInLayers.Overlay);
        this.overviewOverlay.set(LayerProperty.LAYER_TYPE, MG_LAYER_TYPE_NAME);
        this.overviewOverlay.set(LayerProperty.IS_EXTERNAL, false);
        this.overviewOverlay.set(LayerProperty.IS_GROUP, false);
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
        this.selectionOverlay.set(LayerProperty.LAYER_NAME, MgBuiltInLayers.SelectionOverlay);
        this.selectionOverlay.set(LayerProperty.LAYER_TYPE, MG_LAYER_TYPE_NAME);
        this.selectionOverlay.set(LayerProperty.IS_EXTERNAL, false)
        this.selectionOverlay.set(LayerProperty.IS_GROUP, false);
        sources.push(selectionOverlaySource);
        //NOTE: Not tracking this source atm
        this.activeSelectedFeatureOverlay = new olImageLayer({
            //OL6: need to specify a source up-front otherwise it will error blindly
            //trying to get a source out of this URL, so set up a source with an empty
            //image data URI, it will be updated if we receive a request to show an
            //active selected feature image
            source: new olImageStaticSource({
                imageExtent: this.extent,
                imageSize: [BLANK_SIZE.w, BLANK_SIZE.h],
                url: BLANK_GIF_DATA_URI
            })
        });
        this.activeSelectedFeatureOverlay.set(LayerProperty.LAYER_NAME, MgBuiltInLayers.ActiveFeatureSelectionOverlay);
        this.activeSelectedFeatureOverlay.set(LayerProperty.LAYER_TYPE, MG_LAYER_TYPE_NAME);
        this.activeSelectedFeatureOverlay.set(LayerProperty.IS_EXTERNAL, false)
        this.activeSelectedFeatureOverlay.set(LayerProperty.IS_GROUP, false);
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
                    const tl = new olTileLayer(options);
                    tl.set(LayerProperty.LAYER_TYPE, ext.kind);
                    tl.set(LayerProperty.LAYER_NAME, ext.name);
                    tl.set(LayerProperty.IS_EXTERNAL, false);
                    tl.set(LayerProperty.IS_GROUP, false);
                    return tl;
                })
            };
            this.baseLayerGroup = new olLayerGroup(groupOpts);
            this.baseLayerGroup.set(LayerProperty.LAYER_NAME, MG_BASE_LAYER_GROUP_NAME);
            this.baseLayerGroup.set(LayerProperty.IS_EXTERNAL, false);
            this.baseLayerGroup.set(LayerProperty.IS_GROUP, true);
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
            console.log(" " + layers[i].get(LayerProperty.LAYER_NAME));
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
        for (const src of sources) {
            this.registerSourceEvents(src);
        }
    }
    public setMapGuideMocking(mock: boolean) {
        for (const layer of this.allLayers) {
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
                const match = this.baseLayerGroups.filter(l => l.get(LayerProperty.LAYER_NAME) === groupId);
                if (match.length == 1) {
                    match[0].setVisible(true);
                }
            }
        }
        if (hideGroups && hideGroups.length > 0) {
            for (const groupId of hideGroups) {
                const match = this.baseLayerGroups.filter(l => l.get(LayerProperty.LAYER_NAME) === groupId);
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
        // Attach custom layers
        const customLayers = Object.values(this._customLayers);
        customLayers.sort((a, b) => {
            return a.order - b.order;
        });
        for (const item of customLayers) {
            layers.insertAt(0, item.layer);
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
            if (center) {
                ovMap.setView(new olView({
                    center: [center[0], center[1]],
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
        for (const layer of this.allLayers) {
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
    public showActiveSelectedFeature(mapExtent: Bounds, size: Size, uri: string) {
        this.activeSelectedFeatureOverlay.setSource(this.makeActiveSelectedFeatureSource(mapExtent, size, uri));
        this.activeSelectedFeatureOverlay.setVisible(true);
    }
    public getCustomLayers(map: olMap): ILayerInfo[] {
        const larr = map.getLayers().getArray();
        const layers = larr
            .filter(l => this._customLayers[l.get(LayerProperty.LAYER_NAME)] != null)
            .map(l => ({
                ...getLayerInfo(l, true),
                //Smuggle this value out for debugging purposes
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
    public getLayer<T extends olLayerBase>(map: olMap, name: string): T | undefined {
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
        //Apply opacity/visibility
        for (const layer of layers) {
            const oll = this._customLayers[layer.name]?.layer;
            if (oll) {
                oll.setVisible(layer.visible);
                oll.setOpacity(layer.opacity);
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

interface IReadFeatures {
    type: string;
    readFeatures(text: string, options: any): Feature<Geometry>[];
}

export function getLayerInfo(layer: olLayerBase, isExternal: boolean): ILayerInfo {
    let ext: LayerExtensions | undefined;
    if (layer instanceof olImageLayer || layer instanceof olTileLayer) {
        const source = layer.getSource();
        if (layer.get(LayerProperty.HAS_WMS_LEGEND) == true && (source instanceof olWmsSource || source instanceof olTileWmsSource)) {
            ext = { 
                type: "WMS",
                getLegendUrl: (res?: number) => source.getLegendUrl(res)
            } as IWmsLayerExtensions;
        }
    }
    return {
        visible: layer.getVisible(),
        name: layer.get(LayerProperty.LAYER_NAME),
        type: layer.get(LayerProperty.LAYER_TYPE),
        opacity: layer.getOpacity(),
        isExternal: isExternal,
        extensions: ext
    }
}

export class MgLayerManager implements ILayerManager {
    private _olFormats: IReadFeatures[];
    constructor(private map: olMap, private layerSet: MgLayerSet) {
        this._olFormats = [
            { type: "GeoJSON", readFeatures: (text, opts) => new GeoJSON().readFeatures(text, opts) },
            { type: "KML", readFeatures: (text, opts) => new KML().readFeatures(text, opts) },
            { type: "TopoJSON", readFeatures: (text, opts) => new TopoJSON().readFeatures(text, opts) },
            { type: "GPX", readFeatures: (text, opts) => new GPX().readFeatures(text, opts) },
            { type: "IGC", readFeatures: (text, opts) => new IGC().readFeatures(text, opts) }
        ];
    }
    getLayers(): ILayerInfo[] {
        return this.layerSet.getCustomLayers(this.map);
    }
    hasLayer(name: string): boolean {
        return this.layerSet.hasLayer(name);
    }
    addLayer<T extends olLayerBase>(name: string, layer: T, allowReplace?: boolean | undefined): T {
        return this.layerSet.addLayer(this.map, name, layer, allowReplace);
    }
    removeLayer(name: string): olLayerBase | undefined {
        return this.layerSet.removeLayer(this.map, name);
    }
    getLayer<T extends olLayerBase>(name: string): T | undefined {
        return this.layerSet.getLayer(this.map, name);
    }
    apply(layers: ILayerInfo[]): void {
        this.layerSet.apply(this.map, layers);
    }
    addLayerFromFile(options: IAddFileLayerOptions): void {
        const { file, name: layerName, locale, projection, callback } = options;
        const reader = new FileReader();
        const that = this;
        const handler = function (e: ProgressEvent<FileReader>) {
            const result = e.target?.result;
            if (result && typeof (result) == 'string') {
                let proj = projection;
                if (!proj) {
                    const view = that.map.getView();
                    proj = view.getProjection();
                }
                const formats = that._olFormats;
                let features = [] as Feature<Geometry>[];
                let loadedType: string | undefined;
                let bLoaded = false;
                for (let i = 0, ii = formats.length; i < ii; ++i) {
                    const format = formats[i];
                    try {
                        features = format.readFeatures(result, {
                            featureProjection: projection
                        });
                    } catch (e) {

                    }
                    if (features && features.length > 0) {
                        loadedType = format.type;
                        bLoaded = true;
                        break;
                    }
                }
                if (bLoaded) {
                    const source = new olSourceVector();
                    const layer = new olVectorLayer({
                        source: source
                    });
                    source.addFeatures(features);
                    layer.set(LayerProperty.LAYER_NAME, layerName);
                    layer.set(LayerProperty.LAYER_TYPE, loadedType);
                    layer.set(LayerProperty.IS_EXTERNAL, true)
                    layer.set(LayerProperty.IS_GROUP, false);
                    that.addLayer(layerName, layer);
                    callback(getLayerInfo(layer, true));
                } else {
                    callback(new Error(tr("ADD_LOCAL_FILE_LAYER_FAILURE", locale)));
                }
            } else {
                callback(new Error(tr("ADD_LOCAL_FILE_LAYER_FAILURE_NOT_TEXT", locale)));
            }
        };
        reader.addEventListener("load", handler);
        reader.readAsText(file);
    }
}

export interface IMapViewerContextCallback {
    shouldMock(): boolean | undefined;
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
    getLocale(): string | undefined;
    isFeatureTooltipEnabled(): boolean;
    getPointSelectionBox(point: Coordinate2D): Bounds;
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
        const layerSet = new MgLayerSet(props, this.callback);
        this._layerSets[props.map.Name] = layerSet;
        if (!this._activeMapName) {
            this._activeMapName = props.map.Name;
        }
        layerSet.update(props.showGroups, props.showLayers, props.hideGroups, props.hideLayers);
        return layerSet;
    }
    public initContext(layerSet: MgLayerSet, locale?: string, overviewMapElementSelector?: () => (Element | null)) {
        // HACK: className property not documented. This needs to be fixed in OL api doc.
        const overviewMapOpts: any = {
            className: 'ol-overviewmap ol-custom-overviewmap',
            layers: layerSet.getLayersForOverviewMap(),
            view: new olView({
                projection: layerSet.projection
            }),
            tipLabel: tr("OL_OVERVIEWMAP_TIP", locale),
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
        layerSet.setMapGuideMocking(!!this.callback.shouldMock());
        layerSet.attach(this._map, this._ovMap, false);
    }
    public updateOverviewMapElement(overviewMapElementSelector: () => (Element | null)) {
        const el = overviewMapElementSelector();
        if (el) {
            this._ovMap.setCollapsed(false);
            this._ovMap.setCollapsible(false);
            this._ovMap.setTarget(ReactDOM.findDOMNode(el) as any);
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
    public queryFeatureTooltip(pixel: [number, number]) {
        if (this._featureTooltip && this._featureTooltip.isEnabled()) {
            this._featureTooltip.raiseQueryFromPoint(pixel);
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
        layerSet.setMapGuideMocking(!!this.callback.shouldMock());
        layerSet.update(showGroups, showLayers, hideGroups, hideLayers);
    }
    public refreshMap(name: string, mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void {
        const layerSet = this.getLayerSet(name);
        layerSet.refreshMap(mode);
    }
    public async showSelectedFeature(mapExtent: Bounds, size: Size, map: RuntimeMap, selectionColor: string, featureXml: string | undefined) {
        const sv = getSiteVersion(map);
        // This operation requires v4.0.0 QUERYMAPFEATURES, so bail if this ain't the right version
        if (!canUseQueryMapFeaturesV4(sv)) {
            return;
        }
        const layerSet = this.getLayerSet(map.Name);
        try {
            if (featureXml) {
                const r = await this.callback.getClient().queryMapFeatures_v4({
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