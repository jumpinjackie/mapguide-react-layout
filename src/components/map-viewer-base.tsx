/**
 * map-viewer-base.tsx
 * 
 * This is the main map viewer component that wraps the OpenLayers 3 map viewer and its various APIs
 * 
 * This component is designed to be as "dumb" as possible, taking as much of its viewer directives from
 * the props given to it. It carries minimal component state. Where possible, relevant state is farmed off and 
 * managed by a higher level parent component
 * 
 * This component is usually wrapped by its "smart" sibling (src/containers/map-viewer.tsx), which is
 * redux aware and is responsible for flowing map state to the redux store (so any other interested
 * components will properly update) and flowing updated props back to this component to actually 
 * carry out the requested actions
 * 
 * NOTE: This component does not perfectly implement uni-directional data flow (sadly OpenLayers 3 is fighting
 * against us in some parts, and is prone to out-of-band updates to map state that we are not properly flowing back), 
 * thus it breaks certain debugging capabilities of redux such as "time travel"
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ol from "openlayers";
import { 
    IMapView,
    IExternalBaseLayer,
    DigitizerCallback,
    ActiveMapTool,
    Bounds,
    Coordinate,
    ImageFormat,
    RefreshMode,
    ClientKind,
    NOOP
} from "../api/common";
import {
    IApplicationContext,
    APPLICATION_CONTEXT_VALIDATION_MAP
} from "./context";
import * as Contracts from '../api/contracts';
import debounce = require("lodash.debounce");
import { areNumbersEqual } from '../utils/number';
import * as logger from '../utils/logger';
import { MgError, isSessionExpiredError } from '../api/error';
import { Client } from '../api/client';
import { QueryMapFeaturesResponse, FeatureSet } from '../api/contracts/query';
import { IQueryMapFeaturesOptions } from '../api/request-builder';
import { IInlineMenu, IItem, getEnabled, getIcon } from '../components/toolbar';
import { isMenu } from '../utils/type-guards';
import { tr } from "../api/i18n";
const isMobile = require("ismobilejs");
import { MenuComponent } from "./menu";
import { ContextMenuTarget, ContextMenu } from "@blueprintjs/core";

export interface ILayerGroupVisibility {
    showLayers: string[];
    showGroups: string[];
    hideLayers: string[];
    hideGroups: string[];
}

export interface IMapViewerBaseProps {
    map: Contracts.RtMap.RuntimeMap;
    layerGroupVisibility?: ILayerGroupVisibility;
    tool: ActiveMapTool;
    view: IMapView;
    initialView?: IMapView;
    agentUri: string;
    agentKind: ClientKind;
    locale?: string;
    featureTooltipsEnabled: boolean;
    imageFormat: ImageFormat;
    selectionImageFormat?: ImageFormat;
    selectionColor?: string;
    stateChangeDebounceTimeout?: number;
    pointSelectionBuffer?: number;
    externalBaseLayers?: IExternalBaseLayer[];
    selectableLayerNames: string[];
    contextMenu?: IItem[];
    onRequestZoomToView?: (view: IMapView) => void;
    onQueryMapFeatures?: (options: Partial<IQueryMapFeaturesOptions>, callback?: (res: QueryMapFeaturesResponse) => void, errBack?: (err: any) => void) => void;
    onMouseCoordinateChanged?: (coords: number[]) => void;
    onBusyLoading: (busyCount: number) => void;
    onSessionExpired?: () => void;
    onBeginDigitization: (callback: (cancelled: boolean) => void) => void;
    overviewMapElementSelector?: () => (Element | null);
}

export function areViewsCloseToEqual(view: IMapView, otherView: IMapView): boolean {
    if (view == null && otherView != null) {
        return false;
    }
    if (view != null && otherView == null) {
        return false;
    }
    return areNumbersEqual(view.x, otherView.x) &&
           areNumbersEqual(view.y, otherView.y) &&
           areNumbersEqual(view.scale, otherView.scale);
}

const KC_ESCAPE = 27;

class SessionKeepAlive {
    private getSession: () => string;
    private client: Client;
    private interval: number;
    private timeoutID: number;
    constructor(getSession: () => string, client: Client, onSessionExpired: () => void) {
        this.getSession = getSession;
        this.client = client;
        this.client.getServerSessionTimeout(this.getSession()).then(tm => {
            this.interval = tm / 5 * 1000;  //Ping server 5 times each period. Timeout is returned in seconds.
            this.timeoutID = setTimeout(this.tick.bind(this), this.interval);
        }); 
    }
    private tick(): void {
        this.client.getServerSessionTimeout(this.getSession()).then(tm => {
            this.timeoutID = setTimeout(this.tick.bind(this), this.interval);
        });
    }
    public lastTry(): Promise<number> {
        return this.client.getServerSessionTimeout(this.getSession());
    }
}

class FeatureQueryTooltip {
    private wktFormat: ol.format.WKT;
    private map: ol.Map;
    private onRequestSelectableLayers: (() => string[]) | undefined;
    private throttledMouseMove: GenericEventHandler;
    private featureTooltipElement: Element;
    private featureTooltip: ol.Overlay;
    private enabled: boolean;
    private viewer: MapViewerBase;
    private incrementBusy: () => void;
    private decrementBusy: () => void;
    private onSessionExpired: () => void;
    constructor(map: ol.Map, viewer: MapViewerBase, incrementBusy: () => void, decrementBusy: () => void, onSessionExpired: () => void, onRequestSelectableLayers?: () => string[]) {
        this.viewer = viewer;
        this.incrementBusy = incrementBusy;
        this.decrementBusy = decrementBusy;
        this.onSessionExpired = onSessionExpired;
        this.wktFormat = new ol.format.WKT();
        this.featureTooltipElement = document.createElement("div");
        this.featureTooltipElement.className = 'feature-tooltip';
        this.featureTooltip = new ol.Overlay({
            element: this.featureTooltipElement,
            offset: [15, 0],
            positioning: "center-left" /* ol.OverlayPositioning.CENTER_LEFT */
        })
        this.map = map;
        this.map.addOverlay(this.featureTooltip);
        this.onRequestSelectableLayers = onRequestSelectableLayers;
        this.throttledMouseMove = debounce((e: GenericEvent) => {
            const coords: Coordinate = e.coordinate;
            logger.debug(`[${new Date()}] FeatureTooltip - onMouseMove (${coords[0]}, ${coords[1]})`);
            this.sendTooltipQuery(coords);
        }, 1000);
        this.enabled = true;
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
    private sendTooltipQuery(coords: Coordinate): void {
        if (!this.enabled) {
            return;
        }
        const geom = new ol.geom.Point(coords);
        //const selectedLayerNames = this.onRequestSelectableLayers();
        //if (selectedLayerNames != null && selectedLayerNames.length == 0) {
        //    return;
        //}
        const reqQueryFeatures = 4 | 8; //Tooltips and hyperlinks
        const wkt = this.wktFormat.writeGeometry(geom);
        const client = new Client(this.viewer.props.agentUri, this.viewer.props.agentKind);

        //This is probably a case of blink and you'll miss
        //
        //this.featureTooltipElement.innerHTML = "Querying tooltip data ...";
        //this.featureTooltipElement.classList.remove("tooltip-hidden");
        this.featureTooltip.setPosition(coords);
        this.incrementBusy();
        client.queryMapFeatures({
            mapname: this.viewer.props.map.Name,
            session: this.viewer.props.map.SessionId,
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
            this.decrementBusy();
        }).catch (err => {
            this.decrementBusy();
            if (isSessionExpiredError(err)) {
                this.onSessionExpired();
            }
        });
    }
}

const HIDDEN_CLASS_NAME = "tooltip-hidden";

class MouseTrackingTooltip {
    private tooltip: ol.Overlay;
    private tooltipElement: Element;
    private map: ol.Map;
    private text: string | null;
    private isContextMenuOpen: () => boolean;
    constructor(map: ol.Map, contextMenuTest: () => boolean) {
        this.map = map;
        this.isContextMenuOpen = contextMenuTest;
        this.map.getViewport().addEventListener("mouseout", this.onMouseOut.bind(this));
        this.tooltipElement = document.createElement("div");
        this.tooltipElement.className = 'tooltip';
        this.tooltip = new ol.Overlay({
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

function isMiddleMouseDownEvent(e: MouseEvent) {
    return (e && (e.which == 2 || e.button == 4 ));
}

function cloneExtent(bounds: Bounds): Bounds {
    return [
        bounds[0],
        bounds[1],
        bounds[2],
        bounds[3]
    ];
}

@ContextMenuTarget
export class MapViewerBase extends React.Component<IMapViewerBaseProps, any> {
    /**
     * Indicates if touch events are supported.
     */
    private _supportsTouch: boolean;
    /**
     * The internal OpenLayers map instance
     * 
     * @private
     * @type {ol.Map}
     */
    private _map: ol.Map;
    /**
     * The MapGuide overlay image layer
     * 
     * @private
     * @type {ol.layer.Image}
     */
    private _overlay: ol.layer.Image;
    /**
     * The MapGuide selection overlay image layer
     * 
     * @private
     * @type {ol.layer.Image}
     */
    private _selectionOverlay: ol.layer.Image;
    private _ovMap: ol.control.OverviewMap;
    private _wktFormat: ol.format.WKT;
    private _inPerUnit: number;
    private _dpi: number;
    private _extent: ol.Extent;
    private _baseLayerGroup: ol.layer.Group;
    private _mgBaseLayerGroups: ol.layer.Tile[];
    private _zoomSelectBox: ol.interaction.DragBox;
    private _mouseTooltip: MouseTrackingTooltip;
    private _featureTooltip: FeatureQueryTooltip;
    private _dynamicOverlayParams: any;
    private _selectionOverlayParams: any;
    private _client: Client;
    private _busyWorkers: number;
    private _triggerZoomRequestOnMoveEnd: boolean;
    private _keepAlive: SessionKeepAlive;
    private _contextMenuOpen: boolean;

    private _customLayers: { [name: string]: ol.layer.Base; };

    private fnKeyUp: GenericEventHandler;
    private fnKeyDown: GenericEventHandler;
    /**
     * This is a throttled version of _refreshOnStateChange(). Call this on any 
     * modifications to pendingStateChanges 
     * 
     * @private
     */
    private refreshOnStateChange: () => void;

    constructor(props: IMapViewerBaseProps) {
        super(props);
        this.refreshOnStateChange = debounce(this._refreshOnStateChange.bind(this), props.stateChangeDebounceTimeout || 500);
        this._wktFormat = new ol.format.WKT();
        this.fnKeyDown = this.onKeyDown.bind(this);
        this.fnKeyUp = this.onKeyUp.bind(this);
        this._busyWorkers = 0;
        this._mgBaseLayerGroups = [];
        this._triggerZoomRequestOnMoveEnd = true;
        this._supportsTouch = isMobile.phone || isMobile.tablet;
        this._contextMenuOpen = false;
        this._customLayers = {};
        this.state = {
            shiftKey: false
        };
    }
    /**
     * DO NOT CALL DIRECTLY, call this.refreshOnStateChange() instead, which is a throttled version
     * of this method
     * @private
     */
    private _refreshOnStateChange() {
        const changes = this.props.layerGroupVisibility;
        if (changes) {
            //Send the request
            const imgSource = this._overlay.getSource() as ol.source.ImageMapGuide;
            //NOTE: Even if these group ids being shown/hidden are MG base layer groups, it still has to be
            //done as the server-side snapshot of the runtime map needs to be aware as well. This will be
            //apparent if you were to plot a runtime-map server-side that has base layer groups.
            const showGroups = changes.showGroups || [];
            const hideGroups = changes.hideGroups || [];
            imgSource.updateParams({
                showlayers: changes.showLayers || [],
                showgroups: showGroups,
                hidelayers: changes.hideLayers || [],
                hidegroups: hideGroups
            });
            //As MG base layer groups are separate ol layer instances, we have to toggle them on the clien-side as well
            const { map } = this.props;
            if (showGroups.length > 0) {
                for (const groupId of showGroups) {
                    const match = this._mgBaseLayerGroups.filter(l => l.get("name") === groupId);
                    if (match.length == 1) {
                        match[0].setVisible(true);
                    }
                }
            }
            if (hideGroups.length > 0) {
                for (const groupId of hideGroups) {
                    const match = this._mgBaseLayerGroups.filter(l => l.get("name") === groupId);
                    if (match.length == 1) {
                        match[0].setVisible(false);
                    }
                }
            }
        }
    }
    private createExternalSource(layer: IExternalBaseLayer) {
        let sourceCtor = (ol.source as any)[layer.kind];
        if (typeof(sourceCtor) == 'undefined')
            throw new MgError(`Unknown external base layer provider: ${layer.kind}`);

        if (typeof(layer.options) != 'undefined')
            return new sourceCtor(layer.options);
        else
            return new sourceCtor();
    }
    public scaleToResolution(scale: number): number {
        return scale / this._inPerUnit / this._dpi;
    }
    public resolutionToScale(resolution: number): number {
        return resolution * this._dpi * this._inPerUnit;
    }
    public getPointSelectionBox(point: Coordinate, ptBuffer: number): Bounds {
        const ll = this._map.getCoordinateFromPixel([point[0] - ptBuffer, point[1] - ptBuffer]);
        const ur = this._map.getCoordinateFromPixel([point[0] + ptBuffer, point[1] + ptBuffer]);
        return [ll[0], ll[1], ur[0], ur[1]];
    }
    private onContextMenuItemInvoked() {
        ContextMenu.hide();
    }
    public renderContextMenu(): JSX.Element {
        if (this.props.contextMenu) {
            return <MenuComponent items={this.props.contextMenu} onInvoked={this.onContextMenuItemInvoked.bind(this)} />;
        }
        return <noscript />;
    }
    private onMapClick(e: GenericEvent) {
        if (this.isDigitizing()) {
            return;
        }
        if (this.props.tool === ActiveMapTool.Select) {
            const ptBuffer = this.props.pointSelectionBuffer || 2;
            const box: Bounds | null = this.getPointSelectionBox(e.pixel, ptBuffer);
            if (box) {
                const geom = ol.geom.Polygon.fromExtent(box);
                const options = this.buildDefaultQueryOptions(geom);
                options.maxfeatures = 1;
                this.sendSelectionQuery(options);
            }
        }
    }
    private getSelectableLayers(): string[] {
        return this.props.selectableLayerNames || [];
    }
    private buildDefaultQueryOptions(geom: ol.geom.Geometry | string, reqQueryFeatures: number = 1 /* Attributes */): IQueryMapFeaturesOptions {
        const names = this.getSelectableLayers();
        let wkt: string;
        if (typeof geom === 'string') {
            wkt = geom;
        } else {
            wkt = this._wktFormat.writeGeometry(geom);
        }
        return {
            mapname: this.props.map.Name,
            session: this.props.map.SessionId,
            geometry: wkt,
            requestdata: reqQueryFeatures,
            layernames: names.length > 0 ? names.join(",") : undefined,
            persist: 1
        };
    }
    private onZoomSelectBox(e: GenericEvent) {
        const extent = this._zoomSelectBox.getGeometry();
        switch (this.props.tool) {
            case ActiveMapTool.Zoom:
                {
                    const ext = extent.getExtent();
                    this.onRequestZoomToView(this.getViewForExtent(ext));
                }
                break;
            case ActiveMapTool.Select:
                {
                    this.sendSelectionQuery(this.buildDefaultQueryOptions(extent));
                }
                break;
        }
    }
    private sendSelectionQuery(queryOpts?: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void) {
        if (queryOpts != null && queryOpts.layernames != null && queryOpts.layernames.length == 0) {
            return;
        }
        this.incrementBusyWorker();
        const qOrig: Partial<IQueryMapFeaturesOptions> = {
            mapname: this.props.map.Name,
            session: this.props.map.SessionId,
            persist: 1,
            selectionvariant: "INTERSECTS",
            selectioncolor: this.props.selectionColor,
            selectionformat: this.props.selectionImageFormat || "PNG8",
            maxfeatures: -1
        };
        const queryOptions: Partial<IQueryMapFeaturesOptions> = { ...qOrig, ...queryOpts };
        if (this.props.onQueryMapFeatures) {
            this.props.onQueryMapFeatures(queryOptions, res => {
                this.decrementBusyWorker();
                if (success) {
                    success(res);
                }
            }, err => {
                this.decrementBusyWorker();
                if (failure) {
                    failure(err);
                }
            });
        }
    }
    private zoomByDelta(delta: number) {
        const view = this._map.getView();
        if (!view) {
            return;
        }
        const currentResolution = view.getResolution();
        if (currentResolution) {
            this._map.beforeRender(ol.animation.zoom({
                resolution: currentResolution,
                duration: 250,
                easing: ol.easing.easeOut
            }));
            const newResolution = view.constrainResolution(currentResolution, delta);
            view.setResolution(newResolution);
        }
    }
    private getTileUrlFunctionForGroup(resourceId: string, groupName: string, zOrigin: number) {
        const urlTemplate = this._client.getTileTemplateUrl(resourceId, groupName, '{x}', '{y}', '{z}');
        return function (tileCoord: [number, number, number]) {
            return urlTemplate
                .replace('{z}', (zOrigin - tileCoord[0]).toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', (-tileCoord[2] - 1).toString());
        };
    }
    private _activeDrawInteraction: ol.interaction.Draw | null;
    private removeActiveDrawInteraction() {
        if (this._activeDrawInteraction) {
            this._map.removeInteraction(this._activeDrawInteraction);
            this._activeDrawInteraction = null;
        }
    }
    private cancelDigitization() {
        if (this.isDigitizing()) {
            this.removeActiveDrawInteraction();
            this._mouseTooltip.clear();
        }
    }
    private pushDrawInteraction<T extends ol.geom.Geometry>(draw: ol.interaction.Draw, handler: DigitizerCallback<T>, prompt?: string): void {
        this.props.onBeginDigitization(cancel => {
            if (!cancel) {
                this.removeActiveDrawInteraction();
                this._mouseTooltip.clear();
                if (prompt) {
                    this._mouseTooltip.setText(prompt);
                }
                this._activeDrawInteraction = draw;
                this._activeDrawInteraction.once("drawend", (e: GenericEvent) => {
                    const drawnFeature: ol.Feature = e.feature;
                    const geom: T = drawnFeature.getGeometry() as T;
                    this.cancelDigitization();
                    handler(geom);
                })
                this._map.addInteraction(this._activeDrawInteraction);
            }
        });
    }
    private onKeyDown(e: GenericEvent) {
        switch (e.keyCode) {
            case KC_ESCAPE:
                this.cancelDigitization();
                break;
        }
        this.setState({ shiftKey: e.shiftKey });
    }
    private onKeyUp(e: GenericEvent) {
        this.setState({ shiftKey: e.shiftKey });
    }
    private onMouseMove(e: GenericEvent) {
        if (this._mouseTooltip) {
            this._mouseTooltip.onMouseMove(e);
        }
        if (this._contextMenuOpen) {
            return;
        }
        if (this._featureTooltip && this._featureTooltip.isEnabled()) {
            this._featureTooltip.onMouseMove(e);
        }
        if (this.props.onMouseCoordinateChanged != null) {
            this.props.onMouseCoordinateChanged(e.coordinate);
        }
    }
    private incrementBusyWorker() {
        this._busyWorkers++;
        this.props.onBusyLoading(this._busyWorkers);
    }
    private decrementBusyWorker() {
        this._busyWorkers--;
        this.props.onBusyLoading(this._busyWorkers);
    }
    private onRequestZoomToView(view: IMapView): void {
        if (this.props.onRequestZoomToView != null) {
            this.props.onRequestZoomToView({
                x: view.x,
                y: view.y,
                scale: view.scale
            });
        }
    }
    private onImageError(e: GenericEvent) {
        this.decrementBusyWorker();
        this._keepAlive.lastTry().catch(err => {
            if (isSessionExpiredError(err)) {
                this.onSessionExpired();
            }
        });
    }
    protected createOLMap(options: olx.MapOptions): any {
        return new ol.Map(options);
    }
    // ----------------- React Lifecycle ----------------- //
    componentWillReceiveProps(nextProps: IMapViewerBaseProps) {
        // 
        // React (no pun intended) to prop changes
        //
        const props = this.props;
        if (nextProps.imageFormat != props.imageFormat) {
            logger.warn(`Unsupported change of props: imageFormat`);
        }
        if (nextProps.agentUri != props.agentUri) {
            logger.warn(`Unsupported change of props: agentUri`);
            this._client = new Client(nextProps.agentUri, nextProps.agentKind);
        }
        if (nextProps.agentKind != props.agentKind) {
            logger.warn(`Unsupported change of props: agentKind`);
            this._client = new Client(nextProps.agentUri, nextProps.agentKind);
        }
        //selectionColor
        if (nextProps.selectionColor && nextProps.selectionColor != props.selectionColor) {
            const source = this._selectionOverlay.getSource() as ol.source.ImageMapGuide;
            source.updateParams({
                SELECTIONCOLOR: nextProps.selectionColor
            });
        }
        //featureTooltipsEnabled
        if (nextProps.featureTooltipsEnabled != props.featureTooltipsEnabled) {
            this._featureTooltip.setEnabled(nextProps.featureTooltipsEnabled);
        }
        //externalBaseLayers
        if (nextProps.externalBaseLayers != null && 
            nextProps.externalBaseLayers.length > 0 &&
            this._baseLayerGroup != null) {
            const layers = this._baseLayerGroup.getLayers();
            layers.forEach((l: ol.layer.Base) => {
                const match = (nextProps.externalBaseLayers || []).filter(el => el.name === l.get("title"));
                if (match.length == 1) {
                    l.setVisible(!!match[0].visible);
                } else {
                    l.setVisible(false);
                }
            })
        }
        //layerGroupVisibility
        if (nextProps.layerGroupVisibility != props.layerGroupVisibility) {
            this.refreshOnStateChange();
        }
        //view
        if (nextProps.view != props.view) {
            const vw = nextProps.view;
            if (vw != null) {
                this._triggerZoomRequestOnMoveEnd = false;
                const view = this._map.getView();
                view.setCenter([vw.x, vw.y]);
                view.setResolution(this.scaleToResolution(vw.scale));
                this._triggerZoomRequestOnMoveEnd = true;
            } else {
                logger.info(`Skipping zoomToView as next/current views are close enough or target view is null`);
            }
        }
        //overviewMapElement
        if (nextProps.overviewMapElementSelector) {
            const el = nextProps.overviewMapElementSelector();
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
    }
    componentDidMount() {
        const { map, agentUri, imageFormat } = this.props;
        const mapNode = ReactDOM.findDOMNode(this);
        const layers = [] as ol.layer.Base[];
        this._extent = [
            map.Extents.LowerLeftCoordinate.X,
            map.Extents.LowerLeftCoordinate.Y,
            map.Extents.UpperRightCoordinate.X,
            map.Extents.UpperRightCoordinate.Y
        ];
        const finiteScales = [] as number[];
        if (map.FiniteDisplayScale) {
            for (let i = map.FiniteDisplayScale.length - 1; i >= 0; i--) {
                finiteScales.push(map.FiniteDisplayScale[i]);
            }
        }
        this._client = new Client(this.props.agentUri, this.props.agentKind);
        this._keepAlive = new SessionKeepAlive(() => this.props.map.SessionId, this._client, this.onSessionExpired.bind(this));

        //If a tile set definition is defined it takes precedence over the map definition, this enables
        //this example to work with older releases of MapGuide where no such resource type exists.
        const resourceId = map.TileSetDefinition || map.MapDefinition;
        //On MGOS 2.6 or older, tile width/height is never returned, so default to 300x300
        const tileWidth = map.TileWidth || 300;
        const tileHeight = map.TileHeight || 300;
        const metersPerUnit = map.CoordinateSystem.MetersPerUnit;
        this._dpi = map.DisplayDpi;
        let projection: string | undefined;
        const zOrigin = finiteScales.length - 1;
        this._inPerUnit = 39.37 * metersPerUnit;
        const resolutions = new Array(finiteScales.length);
        for (let i = 0; i < finiteScales.length; ++i) {
            resolutions[i] = this.scaleToResolution(finiteScales[i]);
        }

        if (map.CoordinateSystem.EpsgCode.length > 0) {
            projection = `EPSG:${map.CoordinateSystem.EpsgCode}`;
        }

        const tileGrid = new ol.tilegrid.TileGrid({
            origin: ol.extent.getTopLeft(this._extent),
            resolutions: resolutions,
            tileSize: [tileWidth, tileHeight]
        });

        const groupLayers = [] as ol.layer.Tile[];
        if (map.Group) {
            for (let i = 0; i < map.Group.length; i++) {
                const group = map.Group[i];
                if (group.Type != 2 && group.Type != 3) { //BaseMap or LinkedTileSet
                    continue;
                }
                const tileLayer = new ol.layer.Tile({
                    //name: group.Name,
                    source: new ol.source.TileImage({
                        tileGrid: tileGrid,
                        projection: projection,
                        tileUrlFunction: this.getTileUrlFunctionForGroup(resourceId, group.Name, zOrigin),
                        wrapX: false
                    })
                });
                tileLayer.set("name", group.ObjectId);
                groupLayers.push(tileLayer);
                this._mgBaseLayerGroups.push(tileLayer);
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

        this._dynamicOverlayParams = {
            MAPNAME: map.Name,
            FORMAT: this.props.imageFormat,
            SESSION: map.SessionId,
            BEHAVIOR: 2
        };

        this._selectionOverlayParams = {
            MAPNAME: map.Name,
            FORMAT: this.props.selectionImageFormat || "PNG8",
            SESSION: map.SessionId,
            SELECTIONCOLOR: this.props.selectionColor,
            BEHAVIOR: 1 | 4 //selected features + include outside current scale
        };

        this._overlay = new ol.layer.Image({
            //name: "MapGuide Dynamic Overlay",
            extent: this._extent,
            source: new ol.source.ImageMapGuide({
                projection: projection,
                url: agentUri,
                useOverlay: true,
                metersPerUnit: metersPerUnit,
                params: this._dynamicOverlayParams,
                ratio: 1
            })
        });
        this._selectionOverlay = new ol.layer.Image({
            //name: "MapGuide Dynamic Overlay",
            extent: this._extent,
            source: new ol.source.ImageMapGuide({
                projection: projection,
                url: agentUri,
                useOverlay: true,
                metersPerUnit: metersPerUnit,
                params: this._selectionOverlayParams,
                ratio: 1
            })
        });

        if (this.props.externalBaseLayers != null) {
            const groupOpts: any = {
                title: tr("EXTERNAL_BASE_LAYERS", this.props.locale),
                layers: this.props.externalBaseLayers.map(ext => {
                    const options: any = {
                        title: ext.name,
                        type: "base",
                        visible: ext.visible === true,
                        source: this.createExternalSource(ext)
                    };
                    return new ol.layer.Tile(options)
                })
            };
            this._baseLayerGroup = new ol.layer.Group(groupOpts);
            layers.push(this._baseLayerGroup);
        }

        for (let i = groupLayers.length - 1; i >= 0; i--) {
            layers.push(groupLayers[i]);
        }
        layers.push(this._overlay);
        layers.push(this._selectionOverlay);
        /*
        console.log("Draw Order:");
        for (let i = 0; i < layers.length; i++) {
            console.log(" " + layers[i].get("name"));
        }
        */
        let view: ol.View;
        if (resolutions.length == 0) {
            view = new ol.View({
                projection: projection
            });
        } else {
            view = new ol.View({
                projection: projection,
                resolutions: resolutions
            });
        }

        this._zoomSelectBox = new ol.interaction.DragBox({
            condition: (e) => !this.isDigitizing() && (this.props.tool === ActiveMapTool.Select || this.props.tool === ActiveMapTool.Zoom)
        });
        this._zoomSelectBox.on("boxend", this.onZoomSelectBox.bind(this));

        // HACK: className property not documented. This needs to be fixed in OL api doc.
        const overviewMapOpts: any = {
            className: 'ol-overviewmap ol-custom-overviewmap',
            view: new ol.View({
                projection: projection
            }),
            collapseLabel: String.fromCharCode(187), //'\u00BB',
            label: String.fromCharCode(171) //'\u00AB'
        };

        if (this.props.overviewMapElementSelector) {
            const el = this.props.overviewMapElementSelector();
            if (el) {
                overviewMapOpts.target = ReactDOM.findDOMNode(el);
                overviewMapOpts.collapsed = false;
                overviewMapOpts.collapsible = false;
            }
        }

        this._ovMap = new ol.control.OverviewMap(overviewMapOpts);

        const mapOptions: olx.MapOptions = {
            logo: false,
            target: mapNode,
            layers: layers,
            view: view,
            controls: [
                new ol.control.Attribution(),
                new ol.control.Rotate(),
                this._ovMap
            ],
            interactions: [
                new ol.interaction.DragRotate(),
                new ol.interaction.DragPan({
                    condition: (e) => {
                        const startingMiddleMouseDrag = e.type == "pointerdown" && isMiddleMouseDownEvent((e as any).originalEvent);
                        const enabled = (startingMiddleMouseDrag || this._supportsTouch || this.props.tool === ActiveMapTool.Pan);
                        //console.log(e);
                        //console.log(`Allow Pan - ${enabled} (middle mouse: ${startingMiddleMouseDrag})`);
                        return enabled;
                    }
                }),
                new ol.interaction.PinchRotate(),
                new ol.interaction.PinchZoom(),
                new ol.interaction.KeyboardPan(),
                new ol.interaction.KeyboardZoom(),
                new ol.interaction.MouseWheelZoom(),
                this._zoomSelectBox
            ]
        };
        this._map = this.createOLMap(mapOptions);
        this._map.on("pointermove", this.onMouseMove.bind(this));
        this._mouseTooltip = new MouseTrackingTooltip(this._map, () => this._contextMenuOpen);
        this._featureTooltip = new FeatureQueryTooltip(this._map, 
                                                       this,
                                                       this.incrementBusyWorker.bind(this),
                                                       this.decrementBusyWorker.bind(this),
                                                       this.onSessionExpired.bind(this),
                                                       this.getSelectableLayers.bind(this));
        this._featureTooltip.setEnabled(this.props.featureTooltipsEnabled);
        document.addEventListener("keydown", this.fnKeyDown);
        document.addEventListener("keyup", this.fnKeyUp);

        //Listen for scale changes
        const selSource = this._selectionOverlay.getSource();
        const ovSource = this._overlay.getSource();
        selSource.on("imageloadstart", this.incrementBusyWorker.bind(this));
        ovSource.on("imageloadstart", this.incrementBusyWorker.bind(this));
        selSource.on("imageloaderror", this.onImageError.bind(this));
        ovSource.on("imageloaderror", this.onImageError.bind(this));
        selSource.on("imageloadend", this.decrementBusyWorker.bind(this));
        ovSource.on("imageloadend", this.decrementBusyWorker.bind(this));

        this._map.on("click", this.onMapClick.bind(this));
        this._map.on("moveend", (e: GenericEvent) => {
            //HACK:
            //
            //What we're hoping here is that when the view has been broadcasted back up
            //and flowed back in through new view props, that the resulting zoom/pan 
            //operation in componentWillReceiveProps() is effectively a no-op as the intended
            //zoom/pan location has already been reached by this event right here
            //
            //If we look at this through Redux DevTools, we see 2 entries for Map/SET_VIEW
            //for the initial view (un-desirable), but we still only get one map image request
            //for the initial view (good!). Everything is fine after that.
            if (this._triggerZoomRequestOnMoveEnd) { 
                this.onRequestZoomToView(this.getCurrentView());
            } else {
                logger.info("Triggering zoom request on moveend suppresseed");
            }
        });
        
        if (this.props.initialView != null) {
            this.zoomToView(this.props.initialView.x, this.props.initialView.y, this.props.initialView.scale);
        } else {
            this._map.getView().fit(this._extent, this._map.getSize());
        }
    }
    render(): JSX.Element {
        const style: React.CSSProperties = { 
            width: "100%",
            height: "100%" 
        };
        if (this.props.map) {
            style.backgroundColor = `#${this.props.map.BackgroundColor.substring(2)}`;
        }
        return <div className="map-viewer-component" style={style} />;
    }
    componentWillUnmount() {

    }
    public getViewForExtent(extent: Bounds): IMapView {
        const scale = this.getScaleForExtent(extent);
        const center = ol.extent.getCenter(extent);
        return {
            x: center[0],
            y: center[1],
            scale: scale
        };
    }
    private onSessionExpired() {
        if (this.props.onSessionExpired != null) {
            this.props.onSessionExpired();
        }
    }
    private convertContextMenuItems(items: IItem[] | null | undefined): any[] {
        return (items || []).map(i => {
            if (i.isSeparator === true) {
                return '-';
            } else {
                let cb: (() => void) | undefined;
                let items: any[] | undefined;
                if (isMenu(i)) {
                    items = this.convertContextMenuItems(i.childItems)
                } else {
                    cb = () => {
                        if (getEnabled(i) && i.invoke) { //We have to do this because ol3-contextmenu current has no notion of disabled items
                            i.invoke();
                        }
                    };
                }
                return {
                    text: i.label,
                    icon: i.icon != null ? getIcon(i.icon) : null,
                    classname: getEnabled(i) === false ? "context-menu-item-disabled" : null,
                    callback: cb,
                    items: items
                }
            }
        });
    }
    private getScaleForExtent(bounds: Bounds): number {
        const mcsW = ol.extent.getWidth(bounds);
        const mcsH = ol.extent.getHeight(bounds);
        const size = this._map.getSize();
        const devW = size[0];
        const devH = size[1];
        const metersPerPixel = 0.0254 / this._dpi;
        const metersPerUnit = this.getMetersPerUnit();
        //Scale calculation code from AJAX viewer
        let mapScale: number;
        if (devH * mcsW > devW * mcsH)
            mapScale = mcsW * metersPerUnit / (devW * metersPerPixel); // width-limited
        else
            mapScale = mcsH * metersPerUnit / (devH * metersPerPixel); // height-limited
        return mapScale;
    }
    public getCurrentView(): IMapView {
        const ov = this.getOLView();
        const center = ov.getCenter();
        const scale = this.resolutionToScale(ov.getResolution());
        return {
            x: center[0],
            y: center[1],
            scale: scale
        };
    }
    public getCurrentExtent(): Bounds {
        return this._map.getView().calculateExtent(this._map.getSize());
    }
    public getOLView(): ol.View {
        return this._map.getView();
    }
    public zoomToView(x: number, y: number, scale: number): void {
        const view = this._map.getView();
        view.setCenter([x, y]);
        view.setResolution(this.scaleToResolution(scale));
    }
    public setSelectionXml(xml: string, queryOpts?: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void {
        //NOTE: A quirk of QUERYMAPFEATURES is that when passing in selection XML (instead of geometry), 
        //you must set the layerattributefilter to the full bit mask otherwise certain features in the
        //selection XML will not be rendered because they may not pass the layer attribute filter
        const reqQueryFeatures = 1; //Attributes
        this.incrementBusyWorker();
        const qOrig = {
            mapname: this.props.map.Name,
            session: this.props.map.SessionId,
            persist: 1,
            featurefilter: xml,
            selectioncolor: this.props.selectionColor,
            selectionformat: this.props.selectionImageFormat || "PNG8",
            maxfeatures: -1,
            requestdata: reqQueryFeatures
        };
        const queryOptions = { ...qOrig, ...queryOpts };
        if (this.props.onQueryMapFeatures) {
            this.props.onQueryMapFeatures(queryOptions, res => {
                this.decrementBusyWorker();
                if (success)
                    success(res);
            }, err => {
                this.decrementBusyWorker();
                if (failure)
                    failure(err);
            });
        }
    }
    public refreshMap(mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void {
        if ((mode & RefreshMode.LayersOnly) == RefreshMode.LayersOnly) {
            const imgSource = this._overlay.getSource() as ol.source.ImageMapGuide;
            imgSource.updateParams({
                seq: (new Date()).getTime()
            });
        }
        if ((mode & RefreshMode.SelectionOnly) == RefreshMode.SelectionOnly) {
            const imgSource = this._selectionOverlay.getSource() as ol.source.ImageMapGuide;
            imgSource.updateParams({
                seq: (new Date()).getTime()
            });
        }
    }
    public getMetersPerUnit(): number {
        return this._inPerUnit / 39.37;
    }
    public initialView(): void {
        this.onRequestZoomToView(this.getViewForExtent(this._extent));
    }
    public clearSelection(): void {
        this.setSelectionXml("");
    }
    public zoomDelta(delta: number): void {
        //TODO: To conform to redux uni-directional data flow, this should
        //broadcast the new desired view back up and flow it back through to this
        //component as new props
        this.zoomByDelta(delta);
    }
    public zoomToExtent(extent: Bounds): void {
        this.onRequestZoomToView(this.getViewForExtent(extent));
    }
    public isDigitizing(): boolean {
        return this._activeDrawInteraction != null;
    }
    public digitizePoint(handler: DigitizerCallback<ol.geom.Point>, prompt?: string): void {
        const draw = new ol.interaction.Draw({
            type: "Point"//ol.geom.GeometryType.POINT
        });
        this.pushDrawInteraction(draw, handler, prompt || tr("DIGITIZE_POINT_PROMPT", this.props.locale));
    }
    public digitizeLine(handler: DigitizerCallback<ol.geom.LineString>, prompt?: string): void {
        const draw = new ol.interaction.Draw({
            type: "LineString", //ol.geom.GeometryType.LINE_STRING,
            minPoints: 2,
            maxPoints: 2
        });
        this.pushDrawInteraction(draw, handler, prompt || tr("DIGITIZE_LINE_PROMPT", this.props.locale));
    }
    public digitizeLineString(handler: DigitizerCallback<ol.geom.LineString>, prompt?: string): void {
        const draw = new ol.interaction.Draw({
            type: "LineString", //ol.geom.GeometryType.LINE_STRING,
            minPoints: 2
        });
        this.pushDrawInteraction(draw, handler, prompt || tr("DIGITIZE_LINESTRING_PROMPT", this.props.locale));
    }
    public digitizeCircle(handler: DigitizerCallback<ol.geom.Circle>, prompt?: string): void {
        const draw = new ol.interaction.Draw({
            type: "Circle" //ol.geom.GeometryType.CIRCLE
        });
        this.pushDrawInteraction(draw, handler, prompt || tr("DIGITIZE_CIRCLE_PROMPT", this.props.locale));
    }
    public digitizeRectangle(handler: DigitizerCallback<ol.geom.Polygon>, prompt?: string): void {
        const geomFunc: ol.DrawGeometryFunctionType = (coordinates, geometry) => {
            if (!geometry) {
                geometry = new ol.geom.Polygon([]);
            }
            const start: any = coordinates[0];
            const end: any = coordinates[1];
            (geometry as any).setCoordinates([
                [start, [start[0], end[1]], end, [end[0], start[1]], start]
            ]);
            return geometry;
        }; 
        const draw = new ol.interaction.Draw({
            type: "LineString", //ol.geom.GeometryType.LINE_STRING,
            maxPoints: 2,
            geometryFunction: geomFunc
        });
        this.pushDrawInteraction(draw, handler, prompt || tr("DIGITIZE_RECT_PROMPT", this.props.locale));
    }
    public digitizePolygon(handler: DigitizerCallback<ol.geom.Polygon>, prompt?: string): void {
        const draw = new ol.interaction.Draw({
            type: "Polygon" //ol.geom.GeometryType.POLYGON
        });
        this.pushDrawInteraction(draw, handler, prompt || tr("DIGITIZE_POLYGON_PROMPT", this.props.locale));
    }
    public selectByGeometry(geom: ol.geom.Geometry): void {
        this.sendSelectionQuery(this.buildDefaultQueryOptions(geom));
    }
    public queryMapFeatures(options: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void {
        this.sendSelectionQuery(options, success, failure);
    }
    public isFeatureTooltipEnabled(): boolean {
        return this._featureTooltip.isEnabled();
    }
    public setFeatureTooltipEnabled(enabled: boolean): void {
        this._featureTooltip.setEnabled(enabled);
    }

    public addLayer<T extends ol.layer.Base>(name: string, layer: T): T {
        if (this._customLayers[name]) {
            throw new MgError(`A layer named ${name} already exists`);
        }
        this._map.addLayer(layer);
        this._customLayers[name] = layer;
        return layer;
    }
    public removeLayer(name: string): ol.layer.Base | undefined {
        let layer: ol.layer.Base;
        if (this._customLayers[name]) {
            layer = this._customLayers[name];
            this._map.removeLayer(layer);
            delete this._customLayers[name];
            return layer;
        }
    }
    public getLayer<T extends ol.layer.Base>(name: string, factory: () => T): T {
        let layer: T;
        if (this._customLayers[name]) {
            layer = this._customLayers[name] as T;
        } else {
            layer = factory();
            this._customLayers[name] = layer;
            this._map.addLayer(layer);
        }
        return layer;
    }
    public addInteraction<T extends ol.interaction.Interaction>(interaction: T): T {
        this._map.addInteraction(interaction);
        return interaction;
    }
    public removeInteraction<T extends ol.interaction.Interaction>(interaction: T): void {
        this._map.removeInteraction(interaction);
    }
    public addOverlay(overlay: ol.Overlay): void {
        this._map.addOverlay(overlay);
    }
    public removeOverlay(overlay: ol.Overlay): void {
        this._map.removeOverlay(overlay);
    }
    public getProjection(): ol.ProjectionLike {
        return this._map.getView().getProjection();
    }
    public addHandler(eventName: string, handler: Function) {
        this._map.on(eventName, handler);
    }
    public removeHandler(eventName: string, handler: Function) {
        this._map.un(eventName, handler);
    }
    //------------------------------------//
}