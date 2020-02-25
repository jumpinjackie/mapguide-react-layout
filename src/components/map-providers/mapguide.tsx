import * as React from "react";
import * as ReactDOM from "react-dom";

import { IMapProviderContext } from './context';
import { Client } from '../../api/client';
import { SessionKeepAlive } from '../session-keep-alive';
import { Bounds, IMapView, GenericEvent, ActiveMapTool, LayerProperty, ImageFormat, ReduxDispatch, Size2, RefreshMode, DigitizerCallback, KC_U, SelectionVariant, ILayerManager, Coordinate2D, ClientKind, IExternalBaseLayer, LayerTransparencySet, Dictionary } from '../../api/common';
import { tr } from '../../api/i18n';
import { IQueryMapFeaturesOptions } from '../../api/request-builder';
import { QueryMapFeaturesResponse } from '../../api/contracts/query';

import Map from "ol/Map";
import WKTFormat from "ol/format/WKT";
import Select from 'ol/interaction/Select';
import DragBox from 'ol/interaction/DragBox';
import Draw, { GeometryFunction } from 'ol/interaction/Draw';

import { MapOptions } from 'ol/PluggableMap';
import Attribution from 'ol/control/Attribution';
import Rotate from 'ol/control/Rotate';
import DragRotate from 'ol/interaction/DragRotate';
import DragPan from 'ol/interaction/DragPan';
import PinchRotate from 'ol/interaction/PinchRotate';
import PinchZoom from 'ol/interaction/PinchZoom';
import KeyboardPan from 'ol/interaction/KeyboardPan';
import KeyboardZoom from 'ol/interaction/KeyboardZoom';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import Polygon, { fromExtent } from 'ol/geom/Polygon';

import * as olExtent from "ol/extent";
import * as olEasing from "ol/easing";
import Geometry from 'ol/geom/Geometry';
import { queryMapFeatures } from 'actions/map';
import { ProjectionLike } from 'ol/proj';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import GeometryType from 'ol/geom/GeometryType';
import LineString from 'ol/geom/LineString';
import Circle from 'ol/geom/Circle';
import Interaction from 'ol/interaction/Interaction';
import Overlay from 'ol/Overlay';
import { MgLayerManager } from 'api/layer-manager';
import Feature from 'ol/Feature';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import debounce = require('lodash.debounce');
import { areMapsSame, layerTransparencyChanged, areViewsCloseToEqual } from 'utils/viewer-state';
import { areArraysDifferent } from 'utils/array';
import OverviewMap from 'ol/control/OverviewMap';
import { MgLayerSet } from '../../api/layer-set';
import { MouseTrackingTooltip } from '../tooltips/mouse';
import { FeatureQueryTooltip } from '../tooltips/feature';
import { SelectedFeaturesTooltip } from '../tooltips/selected-features';
import { RuntimeMap } from '../../api/contracts/runtime-map';
import { debug, warn } from '../../utils/logger';
import Collection from 'ol/Collection';
import { BLANK_SIZE, Size } from '../../containers/map-capturer-context';
import { getSiteVersion, canUseQueryMapFeaturesV4 } from '../../utils/site-version';
import { BLANK_GIF_DATA_URI } from '../../constants';
import { MapGuideMockMode } from 'components/map-viewer-context';
import { isSessionExpiredError } from 'api/error';

function isMiddleMouseDownEvent(e: MouseEvent): boolean {
    return (e && (e.which == 2 || e.button == 4));
}

export interface IProviderState {
    view: IMapView;
    viewRotation: number;
    viewRotationEnabled: boolean;
    mapName: string;
    locale: string;
    externalBaseLayers: IExternalBaseLayer[];
    overviewMapElementSelector: () => Element | null;
}

export interface IMapGuideProviderState extends IProviderState {
    imageFormat: ImageFormat;
    agentUri: string;
    agentKind: ClientKind;
    activeTool: ActiveMapTool;
    map: RuntimeMap;
    pointSelectionBuffer: number;
    manualFeatureTooltips: boolean;
    featureTooltipsEnabled: boolean;
    sessionId: string;
    selectionColor: string;
    selectionImageFormat: ImageFormat;
    selectableLayerNames: string[];
    cancelDigitizationKey: number;
    undoLastPointKey: number;
    layerTransparency: LayerTransparencySet;
    showGroups: string[];
    hideGroups: string[];
    showLayers: string[];
    hideLayers: string[];
    activeSelectedFeatureXml: string;
    activeSelectedFeatureColor: string;
}

export interface IViewerComponent {
    isContextMenuOpen: () => boolean;
    setDigitizingType: (digitizingType: string | undefined) => void;
    onMouseCoordinateChanged: (coords: number[]) => void;
    onRequestZoomToView: (view: IMapView) => void;
    onBusyLoading: (busyCount: number) => void;
    onBeginDigitization: (callback: (cancelled: boolean) => void) => void;
    onHideContextMenu: () => void;
    onOpenTooltipLink: (url: string) => void;
    addImageLoading(): void;
    addImageLoaded(): void;
}

export class MapGuideMapProviderContext {
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
    private _map: Map | undefined;
    private _ovMap: OverviewMap | undefined;

    private _layerSets: Dictionary<MgLayerSet>;
    private _mouseTooltip: MouseTrackingTooltip;
    private _featureTooltip: FeatureQueryTooltip;
    private _selectTooltip: SelectedFeaturesTooltip;

    private _comp: IViewerComponent | undefined;
    private _wktFormat: WKTFormat;
    private _zoomSelectBox: DragBox;
    private _client: Client;
    private _busyWorkers: number;
    private _triggerZoomRequestOnMoveEnd: boolean;
    private _select: Select;
    private _dispatcher: ReduxDispatch | undefined;
    private _activeDrawInteraction: Draw | null;

    /**
     * This is a throttled version of _refreshOnStateChange(). Call this on any
     * modifications to pendingStateChanges
     *
     * @private
     */
    private refreshOnStateChange: (mapName: string,
                                   showGroups: string[] | undefined,
                                   showLayers: string[] | undefined,
                                   hideGroups: string[] | undefined,
                                   hideLayers: string[] | undefined) => void;

    private _state: IMapGuideProviderState;

    // ============= MapGuide-specific private state ============== //
    private _keepAlive: SessionKeepAlive;
    // ============================================================= //

    constructor() {
        this.refreshOnStateChange = debounce(this._refreshOnStateChange.bind(this), 500);
        this._layerSets = {};
    }

    //#region IMapViewerContextCallback
    private onSessionExpired() {

    }
    private getMockMode() { return MapGuideMockMode.DoNotRender; }
    private addFeatureToHighlight(feat: Feature | undefined, bAppend: boolean): void {
        // Features have to belong to layer in order to be visible and have the highlight style, 
        // so in addition to adding this new feature to the OL select observable collection, we 
        // need to also add the feature to a scratch vector layer dedicated for this purpose
        const layerSet = this.getLayerSet(this._state.mapName);
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
    //#endregion

    //#region Map Context
    public initLayerSet(mapName: string,
                        showGroups: string[] | undefined,
                        showLayers: string[] | undefined,
                        hideGroups: string[] | undefined,
                        hideLayers: string[] | undefined): MgLayerSet {
        const layerSet = new MgLayerSet(this._state, {
            getMockMode: () => this.getMockMode(),
            incrementBusyWorker: () => this.incrementBusyWorker(),
            decrementBusyWorker: () => this.decrementBusyWorker(),
            addImageLoading: () => this._comp?.addImageLoading(),
            addImageLoaded: () => this._comp?.addImageLoaded(),
            onImageError: (e) => this.onImageError(e),
            onSessionExpired: () => this.onSessionExpired(),
            getSelectableLayers: () => this.getSelectableLayers(),
            getClient: () => this._client,
            isContextMenuOpen: () => this._comp?.isContextMenuOpen() ?? false,
            getAgentUri: () => this._state.agentUri,
            getAgentKind: () => this._state.agentKind,
            getMapName: () => this._state.mapName,
            getSessionId: () => this._state.sessionId,
            getLocale: () => this._state.locale,
            isFeatureTooltipEnabled: () => this.isFeatureTooltipEnabled(),
            getPointSelectionBox: (pt) => this.getPointSelectionBox(pt, this._state.pointSelectionBuffer),
            openTooltipLink: (url) => this._comp?.onOpenTooltipLink(url),
            addFeatureToHighlight: (feat, bAppend) => this.addFeatureToHighlight(feat, bAppend)
        });
        this._layerSets[mapName] = layerSet;
        layerSet.update(showGroups, showLayers, hideGroups, hideLayers);
        return layerSet;
    }
    public initContext(layerSet: MgLayerSet, locale?: string, overviewMapElementSelector?: () => (Element | null)) {
        if (this._map) {
            // HACK: className property not documented. This needs to be fixed in OL api doc.
            const overviewMapOpts: any = {
                className: 'ol-overviewmap ol-custom-overviewmap',
                layers: layerSet.getLayersForOverviewMap(),
                view: new View({
                    projection: layerSet.getProjection()
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
            this._ovMap = new OverviewMap(overviewMapOpts);
            this._map.addControl(this._ovMap);
            layerSet.setMapGuideMocking(this.getMockMode());
            layerSet.attach(this._map, this._ovMap, false);
        }
    }
    public updateOverviewMapElement(overviewMapElementSelector: () => (Element | null)) {
        if (this._ovMap) {
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
    }
    private ensureAndGetLayerSet(nextState: IMapGuideProviderState) {
        let layerSet = this._layerSets[nextState.mapName];
        if (!layerSet) {
            layerSet = this.initLayerSet(nextState.mapName, nextState.showGroups, nextState.showLayers, nextState.hideGroups, nextState.hideLayers);
            this._layerSets[nextState.mapName] = layerSet;
        }
        return layerSet;
    }
    //public getLayerSet(name: string, bCreate: boolean = false, props?: IMapViewerContextProps): MgLayerSet {
    public getLayerSet(name: string): MgLayerSet {
        let layerSet = this._layerSets[name];
        /*
        if (!layerSet && props && bCreate) {
            layerSet = this.initLayerSet(props);
            this._layerSets[props.map.Name] = layerSet;
            this._activeMapName = props.map.Name;
        }
        */
        return layerSet;
    }
    public get isMouseOverTooltip() { return this._featureTooltip.isMouseOver || this._selectTooltip.isMouseOver; }
    private clearMouseTooltip(): void {
        this._mouseTooltip.clear();
    }
    private setMouseTooltip(text: string) {
        this._mouseTooltip.setText(text);
    }
    private handleMouseTooltipMouseMove(e: GenericEvent) {
        this._mouseTooltip?.onMouseMove?.(e);
    }
    private hideSelectedVectorFeaturesTooltip() {
        this._selectTooltip?.hide();
    }
    private showSelectedVectorFeatures(features: Collection<Feature>, pixel: [number, number], locale?: string) {
        this._selectTooltip?.showSelectedVectorFeatures(features, pixel, locale);
    }
    private queryWmsFeatures(layerMgr: ILayerManager, coord: Coordinate2D) {
        if (this._map) {
            const res = this._map.getView().getResolution();
            this._selectTooltip?.queryWmsFeatures(layerMgr, coord, res, {
                getLocale: () => this._state.locale,
                addFeatureToHighlight: (feat, bAppend) => this.addFeatureToHighlight(feat, bAppend)
            });
        }
    }
    private queryFeatureTooltip(pixel: [number, number]) {
        if (this._featureTooltip && this._featureTooltip.isEnabled()) {
            this._featureTooltip.raiseQueryFromPoint(pixel);
        }
    }
    private handleFeatureTooltipMouseMove(e: GenericEvent) {
        if (this._featureTooltip && this._featureTooltip.isEnabled()) {
            this._featureTooltip.onMouseMove(e);
        }
    }
    private enableFeatureTooltips(enabled: boolean): void {
        this._featureTooltip.setEnabled(enabled);
    }
    private refreshMapInternal(name: string, mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void {
        const layerSet = this.getLayerSet(name);
        layerSet.refreshMap(mode);
    }
    private async showSelectedFeature(mapExtent: Bounds, size: Size, map: RuntimeMap, selectionColor: string, featureXml: string | undefined) {
        const sv = getSiteVersion(map);
        // This operation requires v4.0.0 QUERYMAPFEATURES, so bail if this ain't the right version
        if (!canUseQueryMapFeaturesV4(sv)) {
            return;
        }
        const layerSet = this.getLayerSet(map.Name);
        try {
            if (featureXml) {
                const r = await this._client.queryMapFeatures_v4({
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
    //#endregion

    /**
     * DO NOT CALL DIRECTLY, call this.refreshOnStateChange() instead, which is a throttled version
     * of this method
     * @private
     */
    private _refreshOnStateChange(mapName: string,
                                  showGroups: string[] | undefined,
                                  showLayers: string[] | undefined,
                                  hideGroups: string[] | undefined,
                                  hideLayers: string[] | undefined) {
        if (showGroups || showLayers || hideGroups || hideLayers) {
            //this.refreshOnStateChange(map, showGroups, showLayers, hideGroups, hideLayers);
            const layerSet = this.getLayerSet(mapName);
            layerSet.setMapGuideMocking(this.getMockMode());
            layerSet.update(showGroups, showLayers, hideGroups, hideLayers);
        }
    }

    private getScaleForExtent(bounds: Bounds): number {
        assertIsDefined(this._map);
        const activeLayerSet = this.getLayerSet(this._state.mapName);
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
    private getViewForExtent(extent: Bounds): IMapView {
        assertIsDefined(this._map);
        const scale = this.getScaleForExtent(extent);
        const center = olExtent.getCenter(extent);
        return {
            x: center[0],
            y: center[1],
            scale: scale,
            resolution: this._map.getView().getResolution()
        };
    }
    private onZoomSelectBox(e: GenericEvent) {
        if (this._comp) {
            const extent = this._zoomSelectBox.getGeometry();
            switch (this._state.activeTool) {
                case ActiveMapTool.Zoom:
                    {
                        const ext: any = extent.getExtent();
                        this._comp.onRequestZoomToView(this.getViewForExtent(ext));
                    }
                    break;
                case ActiveMapTool.Select:
                    {
                        //this.sendSelectionQuery(this.buildDefaultQueryOptions(extent));
                        this.selectFeaturesByExtent(extent);
                    }
                    break;
            }
        }
    }
    private onMouseMove(e: GenericEvent) {
        if (this._comp) {
            this.handleMouseTooltipMouseMove(e);
            if (this._comp.isContextMenuOpen()) {
                return;
            }
            if (!this._state.manualFeatureTooltips) {
                this.handleFeatureTooltipMouseMove(e);
            }
            this._comp.onMouseCoordinateChanged?.(e.coordinate);
        }
    }
    private onImageError(e: GenericEvent) {
        this._keepAlive.lastTry().catch(err => {
            if (isSessionExpiredError(err)) {
                this.onSessionExpired();
            }
        });
    }
    private onMapClick(e: MapBrowserEvent) {
        if (!this._comp || !this._map) {
            return;
        }

        if (this._comp.isContextMenuOpen()) {
            // We're going on the assumption that due to element placement
            // if this event is fired, it meant that the user clicked outside
            // the context menu, otherwise the context menu itself would've handled
            // the event
            this._comp.onHideContextMenu?.();
        }
        if (this.isDigitizing()) {
            return;
        }
        if (this._state.activeTool == ActiveMapTool.WmsQueryFeatures) {
            this.queryWmsFeatures(this.getLayerManager(), e.coordinate as Coordinate2D);
        } else {
            let vfSelected = 0;
            if (this._state.activeTool == ActiveMapTool.Select) {
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
                this.hideSelectedVectorFeaturesTooltip();
                if (this._state.manualFeatureTooltips && this._state.featureTooltipsEnabled) {
                    this.queryFeatureTooltip(px);
                } else if (this._state.activeTool === ActiveMapTool.Select) {
                    const ptBuffer = this._state.pointSelectionBuffer ?? 2;
                    const box = this.getPointSelectionBox(px, ptBuffer);
                    const geom = fromExtent(box);
                    const options = this.buildDefaultQueryOptions(geom);
                    options.maxfeatures = 1;
                    this.sendSelectionQuery(options);
                }
            } else {
                this.showSelectedVectorFeatures(this._select.getFeatures(), px, this._state.locale);
            }
        }
    }
    private incrementBusyWorker() {
        this._busyWorkers++;
        this._comp?.onBusyLoading?.(this._busyWorkers);
    }
    private decrementBusyWorker() {
        this._busyWorkers--;
        this._comp?.onBusyLoading?.(this._busyWorkers);
    }
    private getSelectableLayers(): string[] {
        return this._state.selectableLayerNames ?? [];
    }
    private buildDefaultQueryOptions(geom: Geometry | string, reqQueryFeatures: number = 1 /* Attributes */): IQueryMapFeaturesOptions {
        assertIsDefined(this._state.sessionId);
        const names = this.getSelectableLayers();
        let wkt: string;
        if (typeof geom === 'string') {
            wkt = geom;
        } else {
            wkt = this._wktFormat.writeGeometry(geom);
        }
        return {
            mapname: this._state.mapName,
            session: this._state.sessionId,
            geometry: wkt,
            requestdata: reqQueryFeatures,
            layernames: names.length > 0 ? names.join(",") : undefined,
            persist: 1
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
    private removeActiveDrawInteraction() {
        if (this._activeDrawInteraction && this._map && this._comp) {
            this._map.removeInteraction(this._activeDrawInteraction);
            this._activeDrawInteraction = null;
            this._comp.setDigitizingType(undefined);
        }
    }
    public cancelDigitization(): void {
        if (this.isDigitizing()) {
            this.removeActiveDrawInteraction();
            this.clearMouseTooltip();
            //this._mouseTooltip.clear();
        }
    }
    private pushDrawInteraction<T extends Geometry>(digitizingType: string, draw: Draw, handler: DigitizerCallback<T>, prompt?: string): void {
        assertIsDefined(this._comp);
        this._comp.onBeginDigitization(cancel => {
            if (!cancel) {
                assertIsDefined(this._map);
                assertIsDefined(this._comp);
                this.removeActiveDrawInteraction();
                //this._mouseTooltip.clear();
                this.clearMouseTooltip();
                if (prompt) {
                    //this._mouseTooltip.setText(prompt);
                    this.setMouseTooltip(prompt);
                }
                this._activeDrawInteraction = draw;
                this._activeDrawInteraction.once("drawend", (e: GenericEvent) => {
                    const drawnFeature: Feature = e.feature;
                    const geom: T = drawnFeature.getGeometry() as T;
                    this.cancelDigitization();
                    handler(geom);
                })
                this._map.addInteraction(this._activeDrawInteraction);
                this._comp.setDigitizingType(digitizingType);
            }
        });
    }

    /**
     * @virtual
     * @protected
     * @param {Polygon} geom
     * @memberof MapGuideMapProviderContext
     */
    protected selectFeaturesByExtent(geom: Polygon) {
        this.sendSelectionQuery(this.buildDefaultQueryOptions(geom));
    }

    /**
     * Sets the redux dispatcher function
     *
     * @param {ReduxDispatch} dispatch
     * @memberof MapGuideMapProviderContext
     */
    public setDispatcher(dispatch: ReduxDispatch) {
        this._dispatcher = dispatch;
    }

    /**
     *
     * @virtual
     * @param {IMapGuideProviderState} nextState
     * @memberof MapGuideMapProviderContext
     */
    public setProviderState(nextState: IMapGuideProviderState): void {
        //
        // React (no pun intended) to prop changes
        //
        if (nextState.imageFormat != this._state.imageFormat) {
            warn(`Unsupported change of props: imageFormat`);
        }
        if (nextState.agentUri != this._state.agentUri) {
            warn(`Unsupported change of props: agentUri`);
            this._client = new Client(nextState.agentUri, nextState.agentKind);
        }
        if (nextState.agentKind != this._state.agentKind) {
            warn(`Unsupported change of props: agentKind`);
            this._client = new Client(nextState.agentUri, nextState.agentKind);
        }
        let bChangedView = false;
        //map
        if (nextState.mapName != this._state.mapName && this._map && this._ovMap) {
            const oldLayerSet = this.getLayerSet(this._state.mapName);
            const newLayerSet = this.ensureAndGetLayerSet(nextState);
            oldLayerSet.detach(this._map, this._ovMap);
            newLayerSet.setMapGuideMocking(this.getMockMode());
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
        //selectionColor
        if (nextState.selectionColor && nextState.selectionColor != this._state.selectionColor) {
            const layerSet = this.getLayerSet(nextState.mapName);
            layerSet.updateSelectionColor(nextState.selectionColor);
        }
        //featureTooltipsEnabled
        if (nextState.featureTooltipsEnabled != this._state.featureTooltipsEnabled) {
            this.enableFeatureTooltips(nextState.featureTooltipsEnabled);
        }
        //externalBaseLayers
        if (nextState.externalBaseLayers != null &&
            nextState.externalBaseLayers.length > 0) {
            const layerSet = this.getLayerSet(nextState.mapName);
            layerSet.updateExternalBaseLayers(nextState.externalBaseLayers);
        }
        //Layer transparency
        if (layerTransparencyChanged(nextState.layerTransparency, this._state.layerTransparency)) {
            const layerSet = this.getLayerSet(nextState.mapName);
            layerSet.updateTransparency(nextState.layerTransparency);
        }
        //Layer/Group visibility
        if (areArraysDifferent(nextState.showGroups, this._state.showGroups) ||
            areArraysDifferent(nextState.hideGroups, this._state.hideGroups) ||
            areArraysDifferent(nextState.showLayers, this._state.showLayers) ||
            areArraysDifferent(nextState.hideLayers, this._state.hideLayers)) {
            this.refreshOnStateChange(nextState.mapName, nextState.showGroups, nextState.showLayers, nextState.hideGroups, nextState.hideLayers);
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
        //activeSelectedFeatureXml
        if (this._state.activeSelectedFeatureXml != nextState.activeSelectedFeatureXml) {
            if (this._map) {
                const ms = this._map.getSize();
                const view = this.getOLView();
                const me: any = view.calculateExtent(ms);
                const size = { w: ms[0], h: ms[1] };
                this.showSelectedFeature(me, size, nextState.map, nextState.activeSelectedFeatureColor, nextState.activeSelectedFeatureXml);
            }
        }

        this._state = nextState;
    }

    public isDigitizing(): boolean {
        if (!this._map)
            return false;
        const activeDraw = this._map.getInteractions().getArray().filter(inter => inter instanceof Draw)[0];
        return activeDraw != null;
    }

    public attachToComponent(el: HTMLElement, comp: IViewerComponent): void {
        this._comp = comp;
        this._select = new Select({
            condition: (e) => false,
            layers: (layer) => layer.get(LayerProperty.IS_SELECTABLE) == true || layer.get(LayerProperty.IS_SCRATCH) == true
        });
        this._zoomSelectBox = new DragBox({
            condition: (e) => !this.isDigitizing() && (this._state.activeTool === ActiveMapTool.Select || this._state.activeTool === ActiveMapTool.Zoom)
        });
        this._zoomSelectBox.on("boxend", this.onZoomSelectBox.bind(this));
        const mapOptions: MapOptions = {
            target: el as any,
            //layers: layers,
            //view: view,
            controls: [
                new Attribution({
                    tipLabel: tr("OL_ATTRIBUTION_TIP", this._state.locale)
                }),
                new Rotate({
                    tipLabel: tr("OL_RESET_ROTATION_TIP", this._state.locale)
                })
            ],
            interactions: [
                this._select,
                new DragRotate(),
                new DragPan({
                    condition: (e) => {
                        const startingMiddleMouseDrag = e.type == "pointerdown" && isMiddleMouseDownEvent((e as any).originalEvent);
                        const enabled = (startingMiddleMouseDrag || this._supportsTouch || this._state.activeTool === ActiveMapTool.Pan);
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
        this._map = new Map(mapOptions);
        this._mouseTooltip = new MouseTrackingTooltip(this._map, this._comp.isContextMenuOpen);
        this._featureTooltip = new FeatureQueryTooltip(this._map, {
            incrementBusyWorker: () => this.incrementBusyWorker(),
            decrementBusyWorker: () => this.decrementBusyWorker(),
            onSessionExpired: () => this.onSessionExpired(),
            getAgentUri: () => this._state.agentUri,
            getAgentKind: () => this._state.agentKind,
            getMapName: () => this._state.mapName,
            getSessionId: () => this._state.sessionId,
            getLocale: () => this._state.locale,
            getPointSelectionBox: (pt) => this.getPointSelectionBox(pt, this._state.pointSelectionBuffer),
            openTooltipLink: (url) => this._comp?.onOpenTooltipLink(url)
        });
        this._selectTooltip = new SelectedFeaturesTooltip(this._map);
        this._featureTooltip.setEnabled(false); //initTooltipEnabled);
        this._map.on("pointermove", this.onMouseMove.bind(this));
        //this._map.on("change:size", this.onResize.bind(this));
    }

    public scaleToResolution(scale: number): number {
        const activeLayerSet = this.getLayerSet(this._state.mapName);
        return activeLayerSet.scaleToResolution(scale);
    }

    public resolutionToScale(resolution: number): number {
        const activeLayerSet = this.getLayerSet(this._state.mapName);
        return activeLayerSet.resolutionToScale(resolution);
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
        assertIsDefined(this._map);
        return this._map.getView().calculateExtent(this._map.getSize()) as Bounds;
    }
    public getSize(): Size2 {
        assertIsDefined(this._map);
        return this._map.getSize() as Size2;
    }
    public getOLView(): View {
        assertIsDefined(this._map);
        return this._map.getView();
    }
    public zoomToView(x: number, y: number, scale: number): void {
        if (this._map) {
            const view = this._map.getView();
            view.setCenter([x, y]);
            view.setResolution(this.scaleToResolution(scale));
        }
    }
    public setSelectionXml(xml: string, queryOpts?: Partial<IQueryMapFeaturesOptions>, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void {
        if (!this._state.mapName || !this._dispatcher || !this._comp || !this._state.sessionId || !this._state.selectionColor) {
            return;
        }
        //NOTE: A quirk of QUERYMAPFEATURES is that when passing in selection XML (instead of geometry),
        //you must set the layerattributefilter to the full bit mask otherwise certain features in the
        //selection XML will not be rendered because they may not pass the layer attribute filter
        const reqQueryFeatures = 1; //Attributes
        this.incrementBusyWorker();
        const mapName = this._state.mapName;
        const qOrig = {
            mapname: mapName,
            session: this._state.sessionId,
            persist: 1,
            featurefilter: xml,
            selectioncolor: this._state.selectionColor,
            selectionformat: this._state.selectionImageFormat ?? "PNG8",
            maxfeatures: -1,
            requestdata: reqQueryFeatures
        };
        const queryOptions = { ...qOrig, ...queryOpts };
        const action = queryMapFeatures(mapName, {
            options: queryOptions,
            callback: res => {
                this.decrementBusyWorker();
                if (success) {
                    success(res);
                }
            },
            errBack: err => {
                this.decrementBusyWorker();
                if (failure) {
                    failure(err);
                }
            }
        });
        this._dispatcher(action);
    }
    public refreshMap(mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void {
        assertIsDefined(this._state.mapName);
        this.refreshMapInternal(this._state.mapName, mode);
    }
    public getMetersPerUnit(): number {
        assertIsDefined(this._state.mapName);
        const activeLayerSet = this.getLayerSet(this._state.mapName);
        return activeLayerSet.getMetersPerUnit();
    }
    public initialView(): void {
        assertIsDefined(this._comp);
        assertIsDefined(this._state.mapName);
        const activeLayerSet = this.getLayerSet(this._state.mapName);
        this._comp.onRequestZoomToView(this.getViewForExtent(activeLayerSet.getExtent()));
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
        this._comp?.onRequestZoomToView(this.getViewForExtent(extent));
    }
    public digitizePoint(handler: DigitizerCallback<Point>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: GeometryType.POINT // "Point"//ol.geom.GeometryType.POINT
        });
        this.pushDrawInteraction("Point", draw, handler, prompt || tr("DIGITIZE_POINT_PROMPT", this._state.locale));
    }
    public digitizeLine(handler: DigitizerCallback<LineString>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: GeometryType.LINE_STRING, // "LineString", //ol.geom.GeometryType.LINE_STRING,
            minPoints: 2,
            maxPoints: 2
        });
        this.pushDrawInteraction("Line", draw, handler, prompt || tr("DIGITIZE_LINE_PROMPT", this._state.locale));
    }
    public digitizeLineString(handler: DigitizerCallback<LineString>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: GeometryType.LINE_STRING, //"LineString", //ol.geom.GeometryType.LINE_STRING,
            minPoints: 2
        });
        this.pushDrawInteraction("LineString", draw, handler, prompt || tr("DIGITIZE_LINESTRING_PROMPT", this._state.locale, {
            key: String.fromCharCode(this._state.undoLastPointKey ?? KC_U) //Pray that a sane (printable) key was bound
        }));
    }
    public digitizeCircle(handler: DigitizerCallback<Circle>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: GeometryType.CIRCLE  // "Circle" //ol.geom.GeometryType.CIRCLE
        });
        this.pushDrawInteraction("Circle", draw, handler, prompt || tr("DIGITIZE_CIRCLE_PROMPT", this._state.locale));
    }
    public digitizeRectangle(handler: DigitizerCallback<Polygon>, prompt?: string): void {
        assertIsDefined(this._comp);
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
        this.pushDrawInteraction("Rectangle", draw, handler, prompt || tr("DIGITIZE_RECT_PROMPT", this._state.locale));
    }
    public digitizePolygon(handler: DigitizerCallback<Polygon>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: GeometryType.POLYGON //"Polygon" //ol.geom.GeometryType.POLYGON
        });
        this.pushDrawInteraction("Polygon", draw, handler, prompt || tr("DIGITIZE_POLYGON_PROMPT", this._state.locale, {
            key: String.fromCharCode(this._state.undoLastPointKey ?? KC_U) //Pray that a sane (printable) key was bound
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
        return this._featureTooltip.isEnabled();
    }
    public addInteraction<T extends Interaction>(interaction: T): T {
        assertIsDefined(this._map);
        this._map.addInteraction(interaction);
        return interaction;
    }
    public removeInteraction<T extends Interaction>(interaction: T): void {
        this._map?.removeInteraction(interaction);
    }
    public addOverlay(overlay: Overlay): void {
        this._map?.addOverlay(overlay);
    }
    public removeOverlay(overlay: Overlay): void {
        this._map?.removeOverlay(overlay);
    }
    public getProjection(): ProjectionLike {
        assertIsDefined(this._map);
        return this._map.getView().getProjection();
    }
    public addHandler(eventName: string, handler: Function) {
        this._map?.on(eventName, handler as any);
    }
    public removeHandler(eventName: string, handler: Function) {
        this._map?.un(eventName, handler as any);
    }
    public updateSize() {
        this._map?.updateSize();
    }
    public getLayerManager(mapName?: string): ILayerManager {
        assertIsDefined(this._map);
        assertIsDefined(this._state.mapName);
        const layerSet = this.ensureAndGetLayerSet(this._state); // this.getLayerSet(mapName ?? this._state.mapName, true, this._comp as any);
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
    public getPointSelectionBox(point: Coordinate2D, ptBuffer: number): Bounds {
        assertIsDefined(this._map);
        const ll = this._map.getCoordinateFromPixel([point[0] - ptBuffer, point[1] - ptBuffer]);
        const ur = this._map.getCoordinateFromPixel([point[0] + ptBuffer, point[1] + ptBuffer]);
        return [ll[0], ll[1], ur[0], ur[1]];
    }
    public getResolution(): number {
        assertIsDefined(this._map)
        return this._map.getView().getResolution();
    }
    // ================= MapGuide-specific =================== //

    private zoomByDelta(delta: number) {
        assertIsDefined(this._map);
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

    private sendSelectionQuery(queryOpts?: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void) {
        if (!this._state.mapName || !this._dispatcher || !this._comp || !this._state.sessionId || !this._state.selectionColor || (queryOpts != null && (queryOpts.layernames ?? []).length == 0)) {
            return;
        }
        this.incrementBusyWorker();
        const mapName = this._state.mapName;
        const qOrig: Partial<IQueryMapFeaturesOptions> = {
            mapname: mapName,
            session: this._state.sessionId,
            persist: 1,
            selectionvariant: "INTERSECTS",
            selectioncolor: this._state.selectionColor,
            selectionformat: this._state.selectionImageFormat ?? "PNG8",
            maxfeatures: -1
        };
        const queryOptions: IQueryMapFeaturesOptions = { ...qOrig, ...queryOpts } as IQueryMapFeaturesOptions;
        const action = queryMapFeatures(mapName, {
            options: queryOptions,
            callback: res => {
                this.decrementBusyWorker();
                if (success) {
                    success(res);
                }
            },
            errBack: err => {
                this.decrementBusyWorker();
                if (failure) {
                    failure(err);
                }
            }
        });
        this._dispatcher(action);
    }
}

/**
 * MapGuide context provider
 * @since 0.14
 */
export const MAPGUIDE_PROVIDER: IMapProviderContext = {
    providerName: "MapGuide"
};