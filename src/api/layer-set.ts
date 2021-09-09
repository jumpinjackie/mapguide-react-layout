import { RefreshMode, IExternalBaseLayer, Bounds, LayerTransparencySet, LayerProperty, MgBuiltInLayers, MgLayerType, MG_LAYER_TYPE_NAME, MG_BASE_LAYER_GROUP_NAME, ILayerInfo, ImageFormat, GenericEvent, ClientKind, Coordinate2D, Size, BLANK_SIZE, Dictionary } from './common';
import LayerGroup from "ol/layer/Group";
import TileGrid from "ol/tilegrid/TileGrid";
import AbstractSource from "ol/source/Source";
import TileImageSource from "ol/source/TileImage";
import { createMapGuideSource } from "./ol-mapguide-source-factory";
import ImageStaticSource from "ol/source/ImageStatic";
import { restrictToRange } from "../utils/number";
import View from "ol/View";
import * as olExtent from "ol/extent";
import TileLayer from "ol/layer/Tile";
import ImageLayer from "ol/layer/Image";
import LayerBase from "ol/layer/Base";
import { RuntimeMap } from './contracts/runtime-map';
import { createExternalSource } from '../components/external-layer-factory';
import { strIsNullOrEmpty } from '../utils/string';
import { parseUrl } from '../utils/url';
import ImageWrapper from 'ol/Image';
import { tr } from './i18n';
import * as olHas from "ol/has";
import Feature from "ol/Feature";
import { debug } from '../utils/logger';
import { Client } from './client';
import { ILayerSetOL, IImageLayerEvents } from './layer-set-contracts';
import Geometry from 'ol/geom/Geometry';
import UrlTile from 'ol/source/UrlTile';
import { LoadFunction as TileLoadFunction } from 'ol/Tile';
import { MapGuideMockMode } from '../components/mapguide-debug-context';
import { BLANK_GIF_DATA_URI, LAYER_ID_BASE, LAYER_ID_MG_BASE, LAYER_ID_MG_SEL_OVERLAY } from '../constants';
import { OLImageLayer, OLTileLayer } from './ol-types';

export function blankImageLoadFunction(image: ImageWrapper) {
    (image.getImage() as any).src = BLANK_GIF_DATA_URI;
}

export function mockMapGuideImageLoadFunction(image: ImageWrapper, src: string) {
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

export enum MgLayerSetMode {
    Stateless,
    Stateful,
    OverviewMap
}

class MgLayerSetOL implements ILayerSetOL {
    constructor(public readonly mgTiledLayers: OLTileLayer[],
        public readonly externalBaseLayersGroup: LayerGroup | undefined,
        public readonly overlay: OLImageLayer,
        public readonly projection: string | undefined,
        public readonly dpi: number,
        public readonly extent: Bounds,
        private readonly inPerUnit: number,
        public readonly view: View) { }

    public selectionOverlay: OLImageLayer | undefined;
    public activeSelectedFeatureOverlay: OLImageLayer | undefined;

    public getMetersPerUnit(): number {
        return this.inPerUnit / 39.37
    }
    public scaleToResolution(scale: number): number {
        return (scale / this.inPerUnit / this.dpi) * olHas.DEVICE_PIXEL_RATIO;
    }
    public resolutionToScale(resolution: number): number {
        return (resolution * this.dpi * this.inPerUnit) / olHas.DEVICE_PIXEL_RATIO;
    }
    public getSourcesForProgressTracking(): AbstractSource[] {
        const sources: AbstractSource[] = [];
        if (this.externalBaseLayersGroup) {
            const bls = this.externalBaseLayersGroup.getLayersArray();
            for (const bl of bls) {
                if (bl instanceof ImageLayer || bl instanceof TileLayer) {
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
    public getLayers(): LayerBase[] {
        const layers: LayerBase[] = [];
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
        return new ImageStaticSource({
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

export interface IMapViewerContextCallback {
    getMockMode(): MapGuideMockMode | undefined;
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
    openTooltipLink(url: string): void;
    addFeatureToHighlight(feat: Feature<Geometry> | undefined, bAppend: boolean): void;
    getBaseTileLoaders(): Dictionary<TileLoadFunction>;
}

export class MgInnerLayerSetFactory {
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
            const z = tileCoord[0];
            const x = tileCoord[1];
            const y = tileCoord[2]; //NOTE: tileCoord format changed in OL 6.0, no longer need to negate and subtract by 1
            return urlTemplate
                .replace('{z}', (zOrigin - z).toString())
                .replace('{x}', x.toString())
                .replace('{y}', (y).toString());
        };
    }
    public create(locale: string | undefined,
        externalBaseLayers: IExternalBaseLayer[] | undefined,
        mode: MgLayerSetMode): ILayerSetOL {
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

        const tileGrid = new TileGrid({
            origin: olExtent.getTopLeft(extent),
            resolutions: resolutions,
            tileSize: [tileWidth, tileHeight]
        });

        const zOrigin = finiteScales.length - 1;
        const mgTiledLayers = [];

        //const groupLayers = [] as TileLayer[];
        if (map.Group) {
            for (let i = 0; i < map.Group.length; i++) {
                const group = map.Group[i];
                if (group.Type != 2 && group.Type != 3) { //BaseMap or LinkedTileSet
                    continue;
                }
                const tileSource = new TileImageSource({
                    tileGrid: tileGrid,
                    projection: projection,
                    tileUrlFunction: this.getTileUrlFunctionForGroup(resourceId, group.Name, zOrigin),
                    wrapX: false
                });
                const tileLayer = new TileLayer({
                    //name: group.Name,
                    source: tileSource
                });
                tileLayer.set(LayerProperty.LAYER_NAME, group.ObjectId);
                tileLayer.set(LayerProperty.LAYER_DISPLAY_NAME, group.ObjectId);
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
                            const z = tileCoord[0];
                            const x = tileCoord[1];
                            const y = tileCoord[2]; //NOTE: tileCoord format changed in OL 6.0, no longer need to negate and subtract by 1
                            return urlTemplate
                                .replace('{z}', (zOrigin - z).toString())
                                .replace('{x}', x.toString())
                                .replace('{y}', (y).toString());
                        },
                        wrapX: false
                    })
                })
            );
        }
        */
        const overlay = this.createMgOverlayLayer(MgBuiltInLayers.Overlay, agentUri, metersPerUnit, projection, mode == MgLayerSetMode.Stateful, mode == MgLayerSetMode.Stateful ? this.dynamicOverlayParams : this.staticOverlayParams);

        let selectionOverlay: OLImageLayer | undefined;
        let activeSelectedFeatureOverlay: OLImageLayer | undefined;
        if (mode == MgLayerSetMode.Stateful) {
            selectionOverlay = this.createMgOverlayLayer(MgBuiltInLayers.SelectionOverlay, agentUri, metersPerUnit, projection, true, this.selectionOverlayParams);
        }
        if (mode == MgLayerSetMode.Stateful) {
            //NOTE: Not tracking this source atm
            activeSelectedFeatureOverlay = new ImageLayer({
                //OL6: need to specify a source up-front otherwise it will error blindly
                //trying to get a source out of this URL, so set up a source with an empty
                //image data URI, it will be updated if we receive a request to show an
                //active selected feature image
                source: new ImageStaticSource({
                    imageExtent: extent,
                    imageSize: [BLANK_SIZE.w, BLANK_SIZE.h],
                    url: BLANK_GIF_DATA_URI
                })
            });
            activeSelectedFeatureOverlay.set(LayerProperty.LAYER_NAME, MgBuiltInLayers.ActiveFeatureSelectionOverlay);
            activeSelectedFeatureOverlay.set(LayerProperty.LAYER_DISPLAY_NAME, MgBuiltInLayers.ActiveFeatureSelectionOverlay);
            activeSelectedFeatureOverlay.set(LayerProperty.LAYER_TYPE, MG_LAYER_TYPE_NAME);
            activeSelectedFeatureOverlay.set(LayerProperty.IS_EXTERNAL, false)
            activeSelectedFeatureOverlay.set(LayerProperty.IS_GROUP, false);
        }
        let externalBaseLayersGroup: LayerGroup | undefined;
        //NOTE: Don't bother adding external base layers for overview map as the main map in the
        //overview is rendered with GETMAPIMAGE and not GETDYNAMICMAPOVERLAYIMAGE meaning the background
        //is opaque and you won't be able to see the base layers underneath anyways.
        if (mode != MgLayerSetMode.OverviewMap && externalBaseLayers != null) {
            const groupOpts: any = {
                title: tr("EXTERNAL_BASE_LAYERS", locale),
                layers: externalBaseLayers.map(ext => {
                    const tl = this.createExternalBaseLayer(ext);
                    return tl;
                })
            };
            externalBaseLayersGroup = new LayerGroup(groupOpts);
            externalBaseLayersGroup.set(LayerProperty.LAYER_NAME, MG_BASE_LAYER_GROUP_NAME);
            externalBaseLayersGroup.set(LayerProperty.LAYER_DISPLAY_NAME, MG_BASE_LAYER_GROUP_NAME);
            externalBaseLayersGroup.set(LayerProperty.IS_EXTERNAL, false);
            externalBaseLayersGroup.set(LayerProperty.IS_GROUP, true);
        }

        debug(`Creating OL view with projection ${projection} and ${resolutions.length} resolutions`);
        let view: View;
        if (resolutions.length == 0) {
            view = new View({
                projection: projection
            });
        } else {
            view = new View({
                projection: projection,
                resolutions: resolutions
            });
        }

        const layerSet = new MgLayerSetOL(mgTiledLayers,
            externalBaseLayersGroup,
            overlay,
            projection,
            dpi,
            extent as Bounds,
            inPerUnit,
            view);
        layerSet.selectionOverlay = selectionOverlay;
        layerSet.activeSelectedFeatureOverlay = activeSelectedFeatureOverlay;
        return layerSet;
    }
    private createExternalBaseLayer(ext: IExternalBaseLayer) {
        const extSource = createExternalSource(ext);
        if (extSource instanceof UrlTile) {
            const loaders = this.callback.getBaseTileLoaders();
            if (loaders[ext.name])
                extSource.setTileLoadFunction(loaders[ext.name]);
        }
        const options: any = {
            title: ext.name,
            type: "base",
            visible: ext.visible === true,
            source: extSource
        };
        const tl = new TileLayer(options);
        tl.set(LayerProperty.LAYER_TYPE, ext.kind);
        tl.set(LayerProperty.LAYER_NAME, ext.name);
        tl.set(LayerProperty.LAYER_DISPLAY_NAME, ext.name);
        tl.set(LayerProperty.IS_EXTERNAL, false);
        tl.set(LayerProperty.IS_GROUP, false);
        return tl;
    }
    private createMgOverlayLayer(layerName: string, agentUri: string, metersPerUnit: number, projection: string | undefined, useImageOverlayOp: boolean, params: any): OLImageLayer {
        const overlaySource = createMapGuideSource({
            projection: projection,
            url: agentUri,
            useOverlay: useImageOverlayOp,
            metersPerUnit: metersPerUnit,
            params: params,
            ratio: 1,
            // For mobile devices with retina/hidpi displays, the default 96 DPI produces
            // really low quality map images. For such devices, the DPI should be some
            // function of the device pixel ratio reported. As this value can be fractional
            // round it down to the nearest integer
            displayDpi: Math.floor(olHas.DEVICE_PIXEL_RATIO) * 96
        });
        const layer = new ImageLayer({
            //name: "MapGuide Dynamic Overlay",
            source: overlaySource
        });
        layer.set(LayerProperty.LAYER_NAME, layerName);
        layer.set(LayerProperty.LAYER_DISPLAY_NAME, layerName);
        layer.set(LayerProperty.LAYER_TYPE, MG_LAYER_TYPE_NAME);
        layer.set(LayerProperty.IS_EXTERNAL, false);
        layer.set(LayerProperty.IS_GROUP, false);
        return layer;
    }
}

export interface IMgLayerSetProps {
    map: RuntimeMap;
    /**
     * Use stateless GETMAP requests for map rendering
     * @since 0.14
     */
    stateless?: boolean;
    imageFormat: ImageFormat;
    selectionImageFormat?: ImageFormat;
    selectionColor?: string;
    agentUri: string;
    externalBaseLayers?: IExternalBaseLayer[];
    locale?: string;
}

export interface IMgLayerSetCallback extends IImageLayerEvents {
    getMockMode(): MapGuideMockMode | undefined;
    incrementBusyWorker(): void;
    decrementBusyWorker(): void;
    onSessionExpired(): void;
    getSelectableLayers(): string[];
    getClient(): Client;
    isContextMenuOpen(): boolean;
    getAgentUri(): string;
    getAgentKind(): ClientKind;
    getMapName(): string;
    getSessionId(): string;
    isFeatureTooltipEnabled(): boolean;
    getPointSelectionBox(point: Coordinate2D): Bounds;
    openTooltipLink(url: string): void;
    addFeatureToHighlight(feat: Feature<Geometry> | undefined, bAppend: boolean): void;
}



