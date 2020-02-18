/**
 * map-viewer-base.tsx
 *
 * This is the main map viewer component that wraps the OpenLayers map viewer and its various APIs
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
 * NOTE: This component does not perfectly implement uni-directional data flow (sadly OpenLayers is fighting
 * against us in some parts, and is prone to out-of-band updates to map state that we are not properly flowing back),
 * thus it breaks certain debugging capabilities of redux such as "time travel"
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    GenericEvent,
    IMapView,
    ILayerManager,
    DigitizerCallback,
    ActiveMapTool,
    Bounds,
    Coordinate2D,
    RefreshMode,
    ClientKind,
    LayerTransparencySet,
    MapLoadIndicatorPositioning,
    KC_ESCAPE,
    KC_U,
    SelectionVariant,
    Size2,
    LayerProperty
} from "../api/common";
import debounce = require("lodash.debounce");
import { areNumbersEqual } from '../utils/number';
import { isSessionExpiredError } from '../api/error';
import { Client } from '../api/client';
import { QueryMapFeaturesResponse } from '../api/contracts/query';
import { IQueryMapFeaturesOptions } from '../api/request-builder';
import {
    CURSOR_DIGITIZE_POINT,
    CURSOR_DIGITIZE_LINE,
    CURSOR_DIGITIZE_LINESTRING,
    CURSOR_DIGITIZE_RECT,
    CURSOR_DIGITIZE_POLYGON,
    CURSOR_DIGITIZE_CIRCLE,
    CURSOR_GRABBING,
    CURSOR_GRAB,
    CURSOR_ZOOM_IN
} from "../constants/assets";
import { tr } from "../api/i18n";
import isMobile from "ismobilejs";
import { IMapViewerContextCallback, IMapViewerContextProps, MapViewerContext, MapGuideMockMode } from "./map-viewer-context";

import * as olExtent from "ol/extent";
import * as olEasing from "ol/easing";

import { MapOptions } from "ol/PluggableMap";
import Map from "ol/Map";
import View from "ol/View";
import Feature from "ol/Feature";
import Overlay from "ol/Overlay";
import WKTFormat from "ol/format/WKT";

import Interaction from "ol/interaction/Interaction";
import Draw, { GeometryFunction } from "ol/interaction/Draw";
import DragBox from "ol/interaction/DragBox";
import DragRotate from "ol/interaction/DragRotate";
import DragPan from "ol/interaction/DragPan";
import PinchRotate from "ol/interaction/PinchRotate";
import PinchZoom from "ol/interaction/PinchZoom";
import KeyboardPan from "ol/interaction/KeyboardPan";
import KeyboardZoom from "ol/interaction/KeyboardZoom";
import MouseWheelZoom from "ol/interaction/MouseWheelZoom";
import Attribution from "ol/control/Attribution";
import Rotate from "ol/control/Rotate";

import Geometry from "ol/geom/Geometry";
import Polygon, { fromExtent } from "ol/geom/Polygon";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import Circle from "ol/geom/Circle";
import { areArraysDifferent } from '../utils/array';
import GeometryType from 'ol/geom/GeometryType';
import { ProjectionLike } from 'ol/proj';
import Select from 'ol/interaction/Select';
import { MgLayerSet } from '../api/layer-set';
import { MgLayerManager } from '../api/layer-manager';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import Collection from 'ol/Collection';
import { RuntimeMap } from '../api/contracts/runtime-map';
import { warn, debug, info } from '../utils/logger';

/**
 * MapViewerBase component props
 *
 * @export
 * @interface IMapViewerBaseProps
 */
export interface IMapViewerBaseProps extends IMapViewerContextProps {
    tool: ActiveMapTool;
    view?: IMapView;
    viewRotationEnabled: boolean;
    viewRotation: number;
    stateChangeDebounceTimeout?: number;
    onRequestZoomToView?: (view: IMapView) => void;
    onMouseCoordinateChanged?: (coords: number[]) => void;
    onBusyLoading: (busyCount: number) => void;
    onRotationChanged: (newRotation: number) => void;
    onBeginDigitization: (callback: (cancelled: boolean) => void) => void;
    onMapResized?: (size: [number, number]) => void;
    overviewMapElementSelector?: () => (Element | null);
    layerTransparency: LayerTransparencySet;
    loadIndicatorPosition: MapLoadIndicatorPositioning;
    loadIndicatorColor: string;
    activeSelectedFeatureXml?: string;
    activeSelectedFeatureColor: string;
    cancelDigitizationKey?: number;
    undoLastPointKey?: number;
    isContextMenuOpen: boolean;
    onHideContextMenu?: () => void;
    onContextMenu?: (pos: [number, number]) => void;
    onOpenTooltipLink: (url: string) => void;
}

/**
 * Determines if the given IMapView instances are equal or close to it
 *
 * @export
 * @param {(IMapView | undefined)} view
 * @param {(IMapView | undefined)} otherView
 * @returns {boolean}
 */
export function areViewsCloseToEqual(view: IMapView | undefined, otherView: IMapView | undefined): boolean {
    if (view && otherView) {
        return areNumbersEqual(view.x, otherView.x) &&
            areNumbersEqual(view.y, otherView.y) &&
            areNumbersEqual(view.scale, otherView.scale);
    } else {
        return false;
    }
}

/**
 * Indicates if the given runtime map instances are the same or have the same name
 *
 * @export
 * @param {RuntimeMap} map
 * @param {RuntimeMap} other
 * @returns {boolean}
 */
export function areMapsSame(map: RuntimeMap, other: RuntimeMap): boolean {
    if (map != other) {
        return map.Name == other.Name;
    }
    return true;
}

/**
 * Indicates if the given layer transparency sets are different
 * @param set 
 * @param other 
 */
export function layerTransparencyChanged(set: LayerTransparencySet, other: LayerTransparencySet): boolean {
    if ((!set && other) || (set && !other)) {
        return true;
    }
    const setLayers = Object.keys(set);
    const otherLayers = Object.keys(other);
    if (areArraysDifferent(setLayers, otherLayers))
        return true;

    for (const name of setLayers) {
        if (set[name] != other[name]) {
            return true;
        }
    }
    return false;
}

export class SessionKeepAlive {
    private getSession: () => string;
    private client: Client;
    private interval: number;
    private timeoutID: any;
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

interface IMapLoadIndicatorProps {
    loading: number;
    loaded: number;
    color: string;
    position: MapLoadIndicatorPositioning;
}

const MapLoadIndicator = (props: IMapLoadIndicatorProps) => {
    const { loaded, loading, color, position } = props;
    let visibility: "visible" | "hidden" = "visible";
    let width = (loaded / loading * 100).toFixed(1) + "%";
    if (loaded === loading) {
        visibility = "hidden";
        width = "0";
    }
    const style: React.CSSProperties = {
        position: "absolute",
        zIndex: 10,
        visibility: visibility,
        left: 0,
        height: 5,
        width: width,
        background: color,
        transition: "width 250ms"
    };
    if (position == "top") {
        style.top = 0;
    } else {
        style.bottom = 0;
    }
    return <div style={style} />;
}

export function isMiddleMouseDownEvent(e: MouseEvent): boolean {
    return (e && (e.which == 2 || e.button == 4));
}

export interface IMapViewerBaseState {
    shiftKey: boolean;
    isMouseDown: boolean;
    digitizingType: string;
    loading: number;
    loaded: number;
}

/**
 * The base map viewer component
 *
 * Since 0.12, this no longer implements ILayerManager
 * 
 * @export
 * @class MapViewerBase
 * @extends {React.Component<IMapViewerBaseProps, any>}
 */
export class MapViewerBase extends React.Component<IMapViewerBaseProps, Partial<IMapViewerBaseState>> {
    /**
     * Indicates if touch events are supported.
     */
    private _supportsTouch: boolean;
    /**
     * The internal OpenLayers map instance
     *
     * @private
     * @type {Map}
     */
    private _map: Map;
    private _wktFormat: WKTFormat;
    private _zoomSelectBox: DragBox;
    private _mapContext: MapViewerContext;
    private _client: Client;
    private _busyWorkers: number;
    private _triggerZoomRequestOnMoveEnd: boolean;
    private _keepAlive: SessionKeepAlive;
    private _select: Select;

    /**
     * This is a throttled version of _refreshOnStateChange(). Call this on any
     * modifications to pendingStateChanges
     *
     * @private
     */
    private refreshOnStateChange: (props: IMapViewerBaseProps) => void;

    constructor(props: IMapViewerBaseProps) {
        super(props);
        this.refreshOnStateChange = debounce(this._refreshOnStateChange.bind(this), props.stateChangeDebounceTimeout || 500);
        this._wktFormat = new WKTFormat();
        this._busyWorkers = 0;
        this._triggerZoomRequestOnMoveEnd = true;
        const ism = isMobile(navigator.userAgent);
        this._supportsTouch = ism.phone || ism.tablet;
        this.state = {
            shiftKey: false,
            isMouseDown: false,
            digitizingType: undefined,
            loaded: 0,
            loading: 0
        };
    }
    /**
     * DO NOT CALL DIRECTLY, call this.refreshOnStateChange() instead, which is a throttled version
     * of this method
     * @private
     */
    private _refreshOnStateChange(props: IMapViewerBaseProps) {
        const { map, showGroups, showLayers, hideGroups, hideLayers } = props;
        if (showGroups || showLayers || hideGroups || hideLayers) {
            this._mapContext.refreshOnStateChange(map, showGroups, showLayers, hideGroups, hideLayers);
        }
    }
    public scaleToResolution(scale: number): number {
        const activeLayerSet = this._mapContext.getLayerSet(this.props.map.Name);
        return activeLayerSet.scaleToResolution(scale);
    }
    public resolutionToScale(resolution: number): number {
        const activeLayerSet = this._mapContext.getLayerSet(this.props.map.Name);
        return activeLayerSet.resolutionToScale(resolution);
    }
    public getPointSelectionBox(point: Coordinate2D, ptBuffer: number): Bounds {
        const ll = this._map.getCoordinateFromPixel([point[0] - ptBuffer, point[1] - ptBuffer]);
        const ur = this._map.getCoordinateFromPixel([point[0] + ptBuffer, point[1] + ptBuffer]);
        return [ll[0], ll[1], ur[0], ur[1]];
    }
    public getResolution(): number {
        return this._map.getView().getResolution();
    }
    private onMapClick(e: MapBrowserEvent) {
        if (this.props.isContextMenuOpen) {
            // We're going on the assumption that due to element placement
            // if this event is fired, it meant that the user clicked outside
            // the context menu, otherwise the context menu itself would've handled
            // the event
            this.props.onHideContextMenu?.();
        }
        if (this.isDigitizing()) {
            return;
        }
        if (this.props.tool == ActiveMapTool.WmsQueryFeatures) {
            this._mapContext.queryWmsFeatures(this._map, this.getLayerManager(), e.coordinate as Coordinate2D);
        } else {
            let vfSelected = 0;
            if (this.props.tool == ActiveMapTool.Select) {
                /*
                //Shift+Click is the default OL selection append mode, so if no shift key
                //pressed, clear the existing selection
                if (!this.state.shiftKey) {
                    this._select.getFeatures().clear();
                }
                */
                //TODO: Our selected feature tooltip only shows properties of a single feature
                //and displays upon said feature being selected. As a result, although we can
                //(and should) allow for multiple features to be selected, we need to figure
                //out the proper UI for such a case before we enable multiple selection.
                this._select.getFeatures().clear();
                this._map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
                    if (vfSelected == 0) { //See TODO above
                        if (layer.get(LayerProperty.IS_SELECTABLE) == true && feature instanceof Feature) {
                            this._select.getFeatures().push(feature);
                            vfSelected++;
                        }
                    }
                });
            }
            // We'll only fall through the normal map selection query route if no 
            // vector features were selected as part of this click
            const px = e.pixel as [number, number];
            if (vfSelected == 0) {
                this._mapContext.hideSelectedVectorFeaturesTooltip();
                if (this.props.manualFeatureTooltips && this.props.featureTooltipsEnabled) {
                    this._mapContext.queryFeatureTooltip(px);
                } else if (this.props.tool === ActiveMapTool.Select) {
                    const ptBuffer = this.props.pointSelectionBuffer || 2;
                    const box = this.getPointSelectionBox(px, ptBuffer);
                    const geom = fromExtent(box);
                    const options = this.buildDefaultQueryOptions(geom);
                    options.maxfeatures = 1;
                    this.sendSelectionQuery(options);
                }
            } else {
                this._mapContext.showSelectedVectorFeatures(this._select.getFeatures(), px, this.props.locale);
            }
        }
    }
    private getSelectableLayers(): string[] {
        return this.props.selectableLayerNames || [];
    }
    private buildDefaultQueryOptions(geom: Geometry | string, reqQueryFeatures: number = 1 /* Attributes */): IQueryMapFeaturesOptions {
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
                    const ext: any = extent.getExtent();
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
        if (queryOpts != null && (queryOpts.layernames ?? []).length == 0) {
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
        this.props.onQueryMapFeatures?.(queryOptions, res => {
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
    private zoomByDelta(delta: number) {
        const view = this._map.getView();
        if (!view) {
            return;
        }
        const currentZoom = view.getZoom();
        if (currentZoom !== undefined) {
            const newZoom = view.getConstrainedZoom(currentZoom + delta);
            if (view.getAnimating()) {
                view.cancelAnimations();
            }
            view.animate({
                zoom: newZoom,
                duration: 250,
                easing: olEasing.easeOut
            });
        }
    }
    private _activeDrawInteraction: Draw | null;
    private removeActiveDrawInteraction() {
        if (this._activeDrawInteraction) {
            this._map.removeInteraction(this._activeDrawInteraction);
            this._activeDrawInteraction = null;
            this.setState({ digitizingType: undefined });
        }
    }
    public cancelDigitization(): void {
        if (this.isDigitizing()) {
            this.removeActiveDrawInteraction();
            this._mapContext.clearMouseTooltip();
            //this._mouseTooltip.clear();
        }
    }
    private pushDrawInteraction<T extends Geometry>(digitizingType: string, draw: Draw, handler: DigitizerCallback<T>, prompt?: string): void {
        this.props.onBeginDigitization(cancel => {
            if (!cancel) {
                this.removeActiveDrawInteraction();
                //this._mouseTooltip.clear();
                this._mapContext.clearMouseTooltip();
                if (prompt) {
                    //this._mouseTooltip.setText(prompt);
                    this._mapContext.setMouseTooltip(prompt);
                }
                this._activeDrawInteraction = draw;
                this._activeDrawInteraction.once("drawend", (e: GenericEvent) => {
                    const drawnFeature: Feature = e.feature;
                    const geom: T = drawnFeature.getGeometry() as T;
                    this.cancelDigitization();
                    handler(geom);
                })
                this._map.addInteraction(this._activeDrawInteraction);
                this.setState({ digitizingType: digitizingType });
            }
        });
    }
    private onResize = (e: GenericEvent) => this.props.onMapResized?.(this._map.getSize() as Size2);
    private onKeyDown = (e: GenericEvent) => {
        const cancelKey = this.props.cancelDigitizationKey || KC_ESCAPE;
        const undoKey = this.props.undoLastPointKey || KC_U;
        if (e.keyCode == cancelKey) {
            this.cancelDigitization();
        } else if (e.keyCode == undoKey && this._activeDrawInteraction) {
            this._activeDrawInteraction.removeLastPoint();
        }
        this.setState({ shiftKey: e.shiftKey });
    }
    private onKeyUp = (e: GenericEvent) => {
        this.setState({ shiftKey: e.shiftKey });
    }
    private onMouseDown = (e: GenericEvent) => {
        if (!this.state.isMouseDown) {
            this.setState({
                isMouseDown: true
            });
        }
    }
    private onMouseUp = (e: GenericEvent) => {
        if (this.state.isMouseDown) {
            this.setState({
                isMouseDown: false
            });
        }
    }
    private onMouseMove(e: GenericEvent) {
        this._mapContext.handleMouseTooltipMouseMove(e);
        if (this.props.isContextMenuOpen) {
            return;
        }
        if (!this.props.manualFeatureTooltips) {
            this._mapContext.handleFeatureTooltipMouseMove(e);
        }
        this.props.onMouseCoordinateChanged?.(e.coordinate);
    }
    /**
     * @hidden
     */
    public addImageLoading() {
        const { loading } = this.state;
        const newLoading = (loading || 0) + 1;
        this.setState({ loading: newLoading });
        this.incrementBusyWorker();
    }
    /**
     * @hidden
     */
    public addImageLoaded() {
        const { loaded, loading } = this.state;
        const newLoadedCount = (loaded || 0) + 1;
        if (loading === newLoadedCount) {
            this.setState({ loaded: 0, loading: 0 });
        } else {
            this.setState({ loaded: newLoadedCount });
        }
        this.decrementBusyWorker();
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
        this.props.onRequestZoomToView?.({
            x: view.x,
            y: view.y,
            scale: view.scale,
            resolution: view.resolution
        });
    }
    private onImageError(e: GenericEvent) {
        this._keepAlive.lastTry().catch(err => {
            if (isSessionExpiredError(err)) {
                this.onSessionExpired();
            }
        });
    }
    protected createOLMap(options: MapOptions): any {
        return new Map(options);
    }
    private getCallback(): IMapViewerContextCallback {
        return {
            getMockMode: () => this.props.mock,
            incrementBusyWorker: this.incrementBusyWorker.bind(this),
            decrementBusyWorker: this.decrementBusyWorker.bind(this),
            addImageLoaded: this.addImageLoaded.bind(this),
            addImageLoading: this.addImageLoading.bind(this),
            onImageError: this.onImageError.bind(this),
            onSessionExpired: this.onSessionExpired.bind(this),
            getSelectableLayers: this.getSelectableLayers.bind(this),
            getClient: () => this._client,
            isContextMenuOpen: () => this.props.isContextMenuOpen,
            getAgentUri: () => this.props.agentUri,
            getAgentKind: () => this.props.agentKind,
            getMapName: () => this.props.map.Name,
            getSessionId: () => this.props.map.SessionId,
            getLocale: () => this.props.locale,
            isFeatureTooltipEnabled: this.isFeatureTooltipEnabled.bind(this),
            getPointSelectionBox: (point) => this.getPointSelectionBox(point, this.props.pointSelectionBuffer || 2),
            openTooltipLink: (url) => this.props.onOpenTooltipLink(url),
            addFeatureToHighlight: (feat, bAppend) => {
                // Features have to belong to layer in order to be visible and have the highlight style, 
                // so in addition to adding this new feature to the OL select observable collection, we 
                // need to also add the feature to a scratch vector layer dedicated for this purpose
                const layerSet = this._mapContext.getLayerSet(this.props.map.Name);
                const sf = this._select.getFeatures();
                if (!bAppend) {
                    sf.clear();
                    layerSet.clearScratchLayer();
                }
                
                if (feat) {
                    layerSet.addScratchFeature(feat);
                    sf.push(feat);
                }
            }
        };
    }
    private applyView(layerSet: MgLayerSet, vw: IMapView) {
        this._triggerZoomRequestOnMoveEnd = false;
        layerSet.getView().setCenter([vw.x, vw.y]);
        //Don't use this.scaleToResolution() as that uses this.props to determine
        //applicable layer set, but we already have that here
        const res = layerSet.scaleToResolution(vw.scale);
        layerSet.getView().setResolution(res);
        this._triggerZoomRequestOnMoveEnd = true;
    }
    // ----------------- React Lifecycle ----------------- //
    componentDidUpdate(prevProps: IMapViewerBaseProps) {
        //
        // React (no pun intended) to prop changes
        //
        const props = prevProps;
        const nextProps = this.props;
        if (nextProps.imageFormat != props.imageFormat) {
            warn(`Unsupported change of props: imageFormat`);
        }
        if (nextProps.agentUri != props.agentUri) {
            warn(`Unsupported change of props: agentUri`);
            this._client = new Client(nextProps.agentUri, nextProps.agentKind);
        }
        if (nextProps.agentKind != props.agentKind) {
            warn(`Unsupported change of props: agentKind`);
            this._client = new Client(nextProps.agentUri, nextProps.agentKind);
        }
        let bChangedView = false;
        //map
        if (!areMapsSame(nextProps.map, props.map)) {
            const oldLayerSet = this._mapContext.getLayerSet(props.map.Name);
            const newLayerSet = this._mapContext.getLayerSet(nextProps.map.Name, true, nextProps);
            const ovMap = this._mapContext.getOverviewMap();
            oldLayerSet.detach(this._map, ovMap);
            newLayerSet.setMapGuideMocking(props.mock);
            newLayerSet.attach(this._map, ovMap);
            //This would happen if we switch to a map we haven't visited yet
            if (!nextProps.view) {
                newLayerSet.fitViewToExtent();
                bChangedView = true;
            } else {
                const layerSet = this._mapContext.getLayerSet(nextProps.map.Name);
                this.applyView(layerSet, nextProps.view);
            }
        }
        //selectionColor
        if (nextProps.selectionColor && nextProps.selectionColor != props.selectionColor) {
            const layerSet = this._mapContext.getLayerSet(nextProps.map.Name);
            layerSet.updateSelectionColor(nextProps.selectionColor);
        }
        //featureTooltipsEnabled
        if (nextProps.featureTooltipsEnabled != props.featureTooltipsEnabled) {
            this._mapContext.enableFeatureTooltips(nextProps.featureTooltipsEnabled);
        }
        //externalBaseLayers
        if (nextProps.externalBaseLayers != null &&
            nextProps.externalBaseLayers.length > 0) {
            const layerSet = this._mapContext.getLayerSet(nextProps.map.Name);
            layerSet.updateExternalBaseLayers(nextProps.externalBaseLayers);
        }
        //Layer transparency
        if (layerTransparencyChanged(nextProps.layerTransparency, props.layerTransparency)) {
            const layerSet = this._mapContext.getLayerSet(nextProps.map.Name);
            layerSet.updateTransparency(nextProps.layerTransparency);
        }
        //Layer/Group visibility
        if (areArraysDifferent(nextProps.showGroups, props.showGroups) ||
            areArraysDifferent(nextProps.hideGroups, props.hideGroups) ||
            areArraysDifferent(nextProps.showLayers, props.showLayers) ||
            areArraysDifferent(nextProps.hideLayers, props.hideLayers)) {
            this.refreshOnStateChange(nextProps);
        }
        //view
        if (!areViewsCloseToEqual(nextProps.view, props.view)) {
            const vw = nextProps.view;
            if (vw != null && !bChangedView) {
                const layerSet = this._mapContext.getLayerSet(nextProps.map.Name);
                this.applyView(layerSet, vw);
            } else {
                debug(`Skipping zoomToView as next/current views are close enough or target view is null`);
            }
        }
        //overviewMapElement
        if (nextProps.overviewMapElementSelector) {
            this._mapContext.updateOverviewMapElement(nextProps.overviewMapElementSelector);
        }
        //viewRotation
        if (prevProps.viewRotation != nextProps.viewRotation) {
            this.getOLView().setRotation(nextProps.viewRotation);
        }
        //viewRotationEnabled
        if (prevProps.viewRotationEnabled != nextProps.viewRotationEnabled) {
            const view = this.getOLView();
            const newView = new View({
                enableRotation: nextProps.viewRotationEnabled,
                rotation: nextProps.viewRotation,
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
        //activeSelectedFeatureXml
        if (prevProps.activeSelectedFeatureXml != nextProps.activeSelectedFeatureXml) {
            const ms = this._map.getSize();
            const view = this.getOLView();
            const me: any = view.calculateExtent(ms);
            const size = { w: ms[0], h: ms[1] };
            this._mapContext.showSelectedFeature(me, size, nextProps.map, nextProps.activeSelectedFeatureColor, nextProps.activeSelectedFeatureXml);
        }
    }
    componentDidMount() {
        const { locale } = this.props;
        const mapNode = ReactDOM.findDOMNode(this);
        this._select = new Select({
            condition: (e) => false,
            layers: (layer) => layer.get(LayerProperty.IS_SELECTABLE) == true || layer.get(LayerProperty.IS_SCRATCH) == true
        });
        this._client = new Client(this.props.agentUri, this.props.agentKind);
        this._keepAlive = new SessionKeepAlive(() => this.props.map.SessionId, this._client, this.onSessionExpired.bind(this));
        this._zoomSelectBox = new DragBox({
            condition: (e) => !this.isDigitizing() && (this.props.tool === ActiveMapTool.Select || this.props.tool === ActiveMapTool.Zoom)
        });
        this._zoomSelectBox.on("boxend", this.onZoomSelectBox.bind(this));
        const mapOptions: MapOptions = {
            target: mapNode as any,
            //layers: layers,
            //view: view,
            controls: [
                new Attribution({
                    tipLabel: tr("OL_ATTRIBUTION_TIP", locale)
                }),
                new Rotate({
                    tipLabel: tr("OL_RESET_ROTATION_TIP", locale)
                })
            ],
            interactions: [
                this._select,
                new DragRotate(),
                new DragPan({
                    condition: (e) => {
                        const startingMiddleMouseDrag = e.type == "pointerdown" && isMiddleMouseDownEvent((e as any).originalEvent);
                        const enabled = (startingMiddleMouseDrag || this._supportsTouch || this.props.tool === ActiveMapTool.Pan);
                        //console.log(e);
                        //console.log(`Allow Pan - ${enabled} (middle mouse: ${startingMiddleMouseDrag})`);
                        return enabled;
                    }
                }),
                new PinchRotate(),
                new PinchZoom(),
                new KeyboardPan(),
                new KeyboardZoom(),
                new MouseWheelZoom(),
                this._zoomSelectBox
            ]
        };
        this._map = this.createOLMap(mapOptions);
        this._map.on("pointermove", this.onMouseMove.bind(this));
        this._map.on("change:size", this.onResize.bind(this));
        const callback = this.getCallback();
        this._mapContext = new MapViewerContext(this._map, callback, this.props.featureTooltipsEnabled);
        const activeLayerSet = this._mapContext.initLayerSet(this.props);
        this._mapContext.initContext(activeLayerSet, locale, this.props.overviewMapElementSelector);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);

        this._map.on("click", this.onMapClick.bind(this));
        this._map.on("moveend", (e: GenericEvent) => {
            //HACK:
            //
            //What we're hoping here is that when the view has been broadcasted back up
            //and flowed back in through new view props, that the resulting zoom/pan
            //operation in componentDidUpdate() is effectively a no-op as the intended
            //zoom/pan location has already been reached by this event right here
            //
            //If we look at this through Redux DevTools, we see 2 entries for Map/SET_VIEW
            //for the initial view (un-desirable), but we still only get one map image request
            //for the initial view (good!). Everything is fine after that.
            if (this._triggerZoomRequestOnMoveEnd) {
                this.onRequestZoomToView(this.getCurrentView());
            } else {
                info("Triggering zoom request on moveend suppresseed");
            }
            if (e.frameState.viewState.rotation != this.props.viewRotation) {
                this.props.onRotationChanged?.(e.frameState.viewState.rotation);
            }
        });

        if (this.props.view != null) {
            this.zoomToView(this.props.view.x, this.props.view.y, this.props.view.scale);
        } else {
            this._map.getView().fit(activeLayerSet.getExtent());
        }
        this.onResize(this._map.getSize());
    }
    private onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        if (this._mapContext.isMouseOverTooltip) {
            return;
        }
        e.preventDefault();
        //console.log(`Open context menu at (${e.clientX}, ${e.clientY})`);
        this.props.onContextMenu?.([e.clientX, e.clientY]);
    }
    render(): JSX.Element {
        const { map, tool } = this.props;
        const { isMouseDown } = this.state;
        const style: React.CSSProperties = {
            width: "100%",
            height: "100%"
        };
        if (this.isDigitizing()) {
            const dtype = this.state.digitizingType;
            switch (dtype) {
                case "Point":
                    style.cursor = `url(${CURSOR_DIGITIZE_POINT}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
                case "Line":
                    style.cursor = `url(${CURSOR_DIGITIZE_LINE}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
                case "LineString":
                    style.cursor = `url(${CURSOR_DIGITIZE_LINESTRING}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
                case "Rectangle":
                    style.cursor = `url(${CURSOR_DIGITIZE_RECT}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
                case "Polygon":
                    style.cursor = `url(${CURSOR_DIGITIZE_POLYGON}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
                case "Circle":
                    style.cursor = `url(${CURSOR_DIGITIZE_CIRCLE}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
            }
        } else {
            switch (tool) {
                case ActiveMapTool.Pan:
                    if (isMouseDown) {
                        style.cursor = `url(${CURSOR_GRABBING}), auto`;
                        //console.log(`cursor: ${style.cursor}`);
                    } else {
                        style.cursor = `url(${CURSOR_GRAB}), auto`;
                        //console.log(`cursor: ${style.cursor}`);
                    }
                    break;
                case ActiveMapTool.Zoom:
                    style.cursor = `url(${CURSOR_ZOOM_IN}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
            }
        }
        if (map) {
            style.backgroundColor = `#${map.BackgroundColor.substring(2)}`;
        }
        const { loading, loaded } = this.state;
        return <div className="map-viewer-component" style={style} onContextMenu={this.onContextMenu} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
            <MapLoadIndicator loaded={loaded || 0} loading={loading || 0} position={this.props.loadIndicatorPosition} color={this.props.loadIndicatorColor} />
        </div>;
    }
    public getViewForExtent(extent: Bounds): IMapView {
        const scale = this.getScaleForExtent(extent);
        const center = olExtent.getCenter(extent);
        return {
            x: center[0],
            y: center[1],
            scale: scale,
            resolution: this.getResolution()
        };
    }
    private onSessionExpired = () => this.props.onSessionExpired?.();
    private getScaleForExtent(bounds: Bounds): number {
        const activeLayerSet = this._mapContext.getLayerSet(this.props.map.Name);
        const mcsW = olExtent.getWidth(bounds);
        const mcsH = olExtent.getHeight(bounds);
        const size = this._map.getSize();
        const devW = size[0];
        const devH = size[1];
        const metersPerPixel = 0.0254 / activeLayerSet.getDpi();
        const metersPerUnit = activeLayerSet.getMetersPerUnit();
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
        const resolution = ov.getResolution();
        const scale = this.resolutionToScale(resolution);
        return {
            x: center[0],
            y: center[1],
            scale: scale,
            resolution: resolution
        };
    }
    public getCurrentExtent(): Bounds {
        return this._map.getView().calculateExtent(this._map.getSize()) as Bounds;
    }
    public getSize(): Size2 {
        return this._map.getSize() as Size2;
    }
    public getOLView(): View {
        return this._map.getView();
    }
    public zoomToView(x: number, y: number, scale: number): void {
        const view = this._map.getView();
        view.setCenter([x, y]);
        view.setResolution(this.scaleToResolution(scale));
    }
    public setSelectionXml(xml: string, queryOpts?: Partial<IQueryMapFeaturesOptions>, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void {
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
        this.props.onQueryMapFeatures?.(queryOptions, res => {
            this.decrementBusyWorker();
            if (success)
                success(res);
        }, err => {
            this.decrementBusyWorker();
            if (failure)
                failure(err);
        });
    }
    public refreshMap(mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void {
        this._mapContext.refreshMap(this.props.map.Name, mode);
    }
    public getMetersPerUnit(): number {
        const activeLayerSet = this._mapContext.getLayerSet(this.props.map.Name);
        return activeLayerSet.getMetersPerUnit();
    }
    public initialView(): void {
        const activeLayerSet = this._mapContext.getLayerSet(this.props.map.Name);
        this.onRequestZoomToView(this.getViewForExtent(activeLayerSet.getExtent()));
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
        if (this._map == null)
            return false;
        const activeDraw = this._map.getInteractions().getArray().filter(inter => inter instanceof Draw)[0];
        return activeDraw != null;
    }
    public digitizePoint(handler: DigitizerCallback<Point>, prompt?: string): void {
        const draw = new Draw({
            type: GeometryType.POINT // "Point"//ol.geom.GeometryType.POINT
        });
        this.pushDrawInteraction("Point", draw, handler, prompt || tr("DIGITIZE_POINT_PROMPT", this.props.locale));
    }
    public digitizeLine(handler: DigitizerCallback<LineString>, prompt?: string): void {
        const draw = new Draw({
            type: GeometryType.LINE_STRING, // "LineString", //ol.geom.GeometryType.LINE_STRING,
            minPoints: 2,
            maxPoints: 2
        });
        this.pushDrawInteraction("Line", draw, handler, prompt || tr("DIGITIZE_LINE_PROMPT", this.props.locale));
    }
    public digitizeLineString(handler: DigitizerCallback<LineString>, prompt?: string): void {
        const draw = new Draw({
            type: GeometryType.LINE_STRING, //"LineString", //ol.geom.GeometryType.LINE_STRING,
            minPoints: 2
        });
        this.pushDrawInteraction("LineString", draw, handler, prompt || tr("DIGITIZE_LINESTRING_PROMPT", this.props.locale, {
            key: String.fromCharCode(this.props.undoLastPointKey || KC_U) //Pray that a sane (printable) key was bound
        }));
    }
    public digitizeCircle(handler: DigitizerCallback<Circle>, prompt?: string): void {
        const draw = new Draw({
            type: GeometryType.CIRCLE  // "Circle" //ol.geom.GeometryType.CIRCLE
        });
        this.pushDrawInteraction("Circle", draw, handler, prompt || tr("DIGITIZE_CIRCLE_PROMPT", this.props.locale));
    }
    public digitizeRectangle(handler: DigitizerCallback<Polygon>, prompt?: string): void {
        const geomFunc: GeometryFunction = (coordinates, geometry) => {
            if (!geometry) {
                geometry = new Polygon([]);
            }
            const start: any = coordinates[0];
            const end: any = coordinates[1];
            (geometry as any).setCoordinates([
                [start, [start[0], end[1]], end, [end[0], start[1]], start]
            ]);
            return geometry;
        };
        const draw = new Draw({
            type: GeometryType.LINE_STRING, //"LineString", //ol.geom.GeometryType.LINE_STRING,
            maxPoints: 2,
            geometryFunction: geomFunc
        });
        this.pushDrawInteraction("Rectangle", draw, handler, prompt || tr("DIGITIZE_RECT_PROMPT", this.props.locale));
    }
    public digitizePolygon(handler: DigitizerCallback<Polygon>, prompt?: string): void {
        const draw = new Draw({
            type: GeometryType.POLYGON //"Polygon" //ol.geom.GeometryType.POLYGON
        });
        this.pushDrawInteraction("Polygon", draw, handler, prompt || tr("DIGITIZE_POLYGON_PROMPT", this.props.locale, {
            key: String.fromCharCode(this.props.undoLastPointKey || KC_U) //Pray that a sane (printable) key was bound
        }));
    }
    public selectByGeometry(geom: Geometry, selectionMethod?: SelectionVariant): void {
        const options = this.buildDefaultQueryOptions(geom);
        if (selectionMethod) {
            options.selectionvariant = selectionMethod;
        }
        this.sendSelectionQuery(options);
    }
    public queryMapFeatures(options: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void {
        this.sendSelectionQuery(options, success, failure);
    }
    public isFeatureTooltipEnabled(): boolean {
        //return this._featureTooltip.isEnabled();
        return this._mapContext.isFeatureTooltipEnabled();
    }
    public addInteraction<T extends Interaction>(interaction: T): T {
        this._map.addInteraction(interaction);
        return interaction;
    }
    public removeInteraction<T extends Interaction>(interaction: T): void {
        this._map.removeInteraction(interaction);
    }
    public addOverlay(overlay: Overlay): void {
        this._map.addOverlay(overlay);
    }
    public removeOverlay(overlay: Overlay): void {
        this._map.removeOverlay(overlay);
    }
    public getProjection(): ProjectionLike {
        return this._map.getView().getProjection();
    }
    public addHandler(eventName: string, handler: Function) {
        this._map.on(eventName, handler as any);
    }
    public removeHandler(eventName: string, handler: Function) {
        this._map.un(eventName, handler as any);
    }
    public updateSize() {
        this._map.updateSize();
    }
    public getLayerManager(mapName?: string): ILayerManager {
        const layerSet = this._mapContext.getLayerSet(mapName || this.props.map.Name, true, this.props);
        return new MgLayerManager(this._map, layerSet);
    }
    public screenToMapUnits(x: number, y: number): [number, number] {
        let bAllowOutsideWindow = false;
        const [mapDevW, mapDevH] = this.getSize();
        const [extX1, extY1, extX2, extY2] = this.getCurrentExtent();
        if (!bAllowOutsideWindow) {
            if (x > mapDevW - 1) x = mapDevW - 1;
            else if (x < 0) x = 0;

            if (y > mapDevH - 1) y = mapDevH - 1;
            else if (y < 0) y = 0;
        }
        x = extX1 + (extX2 - extX1) * (x / mapDevW);
        y = extY1 - (extY1 - extY2) * (y / mapDevH);
        return [x, y];
    }
    public getSelectedFeatures() {
        return this._select.getFeatures();
    }
    //------------------------------------//
}