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
import { MgLayerSet, LayerSetBase } from '../../api/layer-set';
import { MouseTrackingTooltip } from '../tooltips/mouse';
import { FeatureQueryTooltip } from '../tooltips/feature';
import { SelectedFeaturesTooltip } from '../tooltips/selected-features';
import { RuntimeMap } from '../../api/contracts/runtime-map';
import { debug, warn } from '../../utils/logger';
import Collection from 'ol/Collection';
import { BLANK_SIZE, Size } from '../../containers/map-capturer-context';
import { getSiteVersion, canUseQueryMapFeaturesV4 } from '../../utils/site-version';
import { BLANK_GIF_DATA_URI } from '../../constants';
import { MapGuideMockMode } from '../map-viewer-context';
import { isSessionExpiredError } from '../../api/error';
import { BaseMapProviderContext, IMapProviderState, IViewerComponent } from './base';

export interface IMapGuideProviderState extends IMapProviderState {
    imageFormat: ImageFormat;
    agentUri: string;
    agentKind: ClientKind;
    map: RuntimeMap;
    pointSelectionBuffer: number;
    manualFeatureTooltips: boolean;
    featureTooltipsEnabled: boolean;
    sessionId: string;
    selectionColor: string;
    selectionImageFormat: ImageFormat;
    selectableLayerNames: string[];
    layerTransparency: LayerTransparencySet;
    showGroups: string[];
    hideGroups: string[];
    showLayers: string[];
    hideLayers: string[];
    activeSelectedFeatureXml: string;
    activeSelectedFeatureColor: string;
}

export class MapGuideMapProviderContext extends BaseMapProviderContext<IMapGuideProviderState> {
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

    

    // ============= MapGuide-specific private state ============== //
    private _client: Client;
    private _keepAlive: SessionKeepAlive;
    private _featureTooltip: FeatureQueryTooltip;
    private _wktFormat: WKTFormat;
    // ============================================================= //

    constructor() {
        super();
        this.refreshOnStateChange = debounce(this._refreshOnStateChange.bind(this), 500);
    }

    //#region IMapViewerContextCallback
    private onSessionExpired() {

    }
    protected onProviderMapClick(px: [number, number]): void {
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
    }
    //#endregion

    //#region Map Context
    /**
     * @override
     * @protected
     * @param {GenericEvent} e
     * @returns
     * @memberof BaseMapProviderContext
     */
    protected onMouseMove(e: GenericEvent) {
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
            if (layerSet instanceof MgLayerSet) {
                layerSet.setMapGuideMocking(this.getMockMode());
                layerSet.update(showGroups, showLayers, hideGroups, hideLayers);
            }
        }
    }
    /**
     * @override
     * @protected
     * @param {GenericEvent} e
     * @memberof MapGuideMapProviderContext
     */
    protected onImageError(e: GenericEvent) {
        this._keepAlive.lastTry().catch(err => {
            if (isSessionExpiredError(err)) {
                this.onSessionExpired();
            }
        });
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
     * @override
     * @protected
     */
    protected initLayerSet(nextState: IMapGuideProviderState): LayerSetBase {
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
        this._layerSets[nextState.mapName] = layerSet;
        layerSet.update(nextState.showGroups, nextState.showLayers, nextState.hideGroups, nextState.hideLayers);
        return layerSet;
    }

    /**
     * @override
     * @readonly
     * @memberof MapGuideMapProviderContext
     */
    public get isMouseOverTooltip() { return this._featureTooltip.isMouseOver || this._selectTooltip.isMouseOver; }

    /**
     * @override
     * @param {HTMLElement} el
     * @param {IViewerComponent} comp
     * @memberof MapGuideMapProviderContext
     */
    public attachToComponent(el: HTMLElement, comp: IViewerComponent): void {
        super.attachToComponent(el, comp);
        this._featureTooltip = new FeatureQueryTooltip(this._map!, {
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
        this._featureTooltip.setEnabled(false); //initTooltipEnabled);
    }
    /**
     * @override
     * @param {RefreshMode} [mode=RefreshMode.LayersOnly | RefreshMode.SelectionOnly]
     * @memberof MapGuideMapProviderContext
     */
    public refreshMap(mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void {
        assertIsDefined(this._state.mapName);
        this.refreshMapInternal(this._state.mapName, mode);
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
            if (newLayerSet instanceof MgLayerSet) {
                newLayerSet.setMapGuideMocking(this.getMockMode());
            }
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
    
    public clearSelection(): void {
        this.setSelectionXml("");
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

    // ================= MapGuide-specific =================== //

    

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