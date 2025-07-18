import * as React from "react";
import * as ReactDOM from "react-dom";
import { IMapView, IExternalBaseLayer, Dictionary, ReduxDispatch, Bounds, GenericEvent, ActiveMapTool, DigitizerCallback, LayerProperty, Size2, RefreshMode, KC_U, ILayerManager, Coordinate2D, KC_ESCAPE, IMapViewer, IMapGuideViewerSupport, ILayerInfo, ClientKind, IMapImageExportOptions } from '../../api/common';
import { MouseTrackingTooltip } from '../tooltips/mouse';
import Map from "ol/Map";
import OverviewMap, { type Options as OverviewMapOptions } from 'ol/control/OverviewMap';
import DragBox from 'ol/interaction/DragBox';
import Select from 'ol/interaction/Select';
import Draw, { GeometryFunction } from 'ol/interaction/Draw';
import { SelectedFeaturesTooltip, ISelectionPopupContentOverrideProvider, SelectionPopupContentRenderer } from '../tooltips/selected-features';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Geometry from 'ol/geom/Geometry';
import type { MapOptions } from 'ol/Map';
import Attribution from 'ol/control/Attribution';
import Rotate from 'ol/control/Rotate';
import DragRotate from 'ol/interaction/DragRotate';
import DragPan from 'ol/interaction/DragPan';
import PinchRotate from 'ol/interaction/PinchRotate';
import PinchZoom from 'ol/interaction/PinchZoom';
import KeyboardPan from 'ol/interaction/KeyboardPan';
import KeyboardZoom from 'ol/interaction/KeyboardZoom';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Circle from 'ol/geom/Circle';
import type Interaction from 'ol/interaction/Interaction';
import type Overlay from 'ol/Overlay';
import { transformExtent, ProjectionLike } from 'ol/proj';
import { LayerManager } from '../../api/layer-manager';
import type Collection from 'ol/Collection';
import * as olExtent from "ol/extent";
import * as olEasing from "ol/easing";
import type MapBrowserEvent from 'ol/MapBrowserEvent';
import { tr, DEFAULT_LOCALE } from '../../api/i18n';
import type { LayerSetGroupBase } from '../../api/layer-set-group-base';
import { assertIsDefined } from '../../utils/assert';
import { info, debug } from '../../utils/logger';
import { setCurrentView, setViewRotation, mapResized, setMouseCoordinates, setBusyCount, setViewRotationEnabled, setActiveTool, mapLayerAdded, externalLayersReady, addClientSelectedFeature, clearClientSelection } from '../../actions/map';
import { Toaster, Intent } from '@blueprintjs/core';
import { IOLFactory, OLFactory } from '../../api/ol-factory';
import type { ISubscriberProps } from '../../containers/subscriber';
import type { IInitialExternalLayer } from '../../actions/defs';
import { MapGuideMockMode } from '../mapguide-debug-context';
import LayerBase from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import type { LoadFunction as TileLoadFunction } from 'ol/Tile';
import type { LoadFunction as ImageLoadFunction } from 'ol/Image';
import { IBasicPointCircleStyle, DEFAULT_POINT_CIRCLE_STYLE, IPointIconStyle, DEFAULT_POINT_ICON_STYLE, IBasicVectorLineStyle, DEFAULT_LINE_STYLE, IBasicVectorPolygonStyle, DEFAULT_POLY_STYLE, ClusterClickAction } from '../../api/ol-style-contracts';
import { isClusteredFeature, getClusterSubFeatures } from '../../api/ol-style-helpers';
import type { OLStyleMapSet } from '../../api/ol-style-map-set';
import { QueryMapFeaturesResponse } from '../../api/contracts/query';
import { Client } from '../../api/client';
import { useReduxDispatch } from "./context";
import { ClientSelectionFeature } from "../../api/contracts/common";
import type { OLFeature, OLLayer } from "../../api/ol-types";
import { supportsTouch } from "../../utils/browser-support";

function isValidView(view: IMapView) {
    if (view.resolution) {
        return !isNaN(view.x)
            && !isNaN(view.y)
            && !isNaN(view.scale)
            && !isNaN(view.resolution);
    } else {
        return !isNaN(view.x)
            && !isNaN(view.y)
            && !isNaN(view.scale);
    }
}

export function inflateBoundsByMeters(thisProj: ProjectionLike, extent: Bounds, meters: number) {
    // We need to inflate this bbox by a known unit of measure (meters), so re-project this extent to a meter's based coordinate system (EPSG:3857)
    const webmBounds = transformExtent(extent, thisProj, "EPSG:3857");
    // Inflate the box by specified amount
    const webmBounds2 = olExtent.buffer(webmBounds, meters);
    // Re-project this extent back to the original projection
    const inflatedBounds = transformExtent(webmBounds2, "EPSG:3857", thisProj) as Bounds;
    return inflatedBounds;
}

export function recursiveFindLayer(layers: Collection<LayerBase>, predicate: (layer: LayerBase) => boolean): LayerBase | undefined {
    for (let i = 0; i < layers.getLength(); i++) {
        const layer = layers.item(i);
        if (layer instanceof LayerGroup) {
            const match = recursiveFindLayer(layer.getLayers(), predicate);
            if (match) {
                return match;
            }
        } else {
            if (predicate(layer)) {
                return layer;
            }
        }
    }
    return undefined;
}

export function isMiddleMouseDownEvent(e: MouseEvent): boolean {
    return (e && (e.which == 2 || e.button == 4));
}

export function useViewerSideEffects(context: IMapProviderContext,
    appSettings: Dictionary<string>,
    isReady: boolean,
    mapName: string | undefined,
    layers: ILayerInfo[] | undefined,
    initialExternalLayers: IInitialExternalLayer[] | undefined,
    agentUri: string | undefined = undefined,
    agentKind: ClientKind | undefined = undefined,
    selection: QueryMapFeaturesResponse | null = null) {
    const dispatch = useReduxDispatch();
    // Side-effect to pre-load external layers. Should only happen once per map name
    React.useEffect(() => {
        if (isReady) {
            if (mapName && !layers) {
                debug(`React.useEffect - Change of initial external layers for [${mapName}] (change should only happen once per mapName!)`);
                if (initialExternalLayers && initialExternalLayers.length > 0) {
                    debug(`React.useEffect - First-time loading of external layers for [${mapName}]`);
                    const layerManager = context.getLayerManager(mapName) as LayerManager;
                    for (const extLayer of initialExternalLayers) {
                        const added = layerManager.addExternalLayer(extLayer, true, appSettings);
                        if (added) {
                            dispatch(mapLayerAdded(mapName, added));
                        }
                    }
                } else {
                    //Even if no initial external layers were loaded, the layers state still needs to be set
                    //otherwise components that depend on this state (eg. External Layer Manager) will assume
                    //this is still not ready yet
                    debug(`React.useEffect - Signal that external layers are ready for [${mapName}]`);
                    dispatch(externalLayersReady(mapName));
                }
            }
        }
    }, [context, mapName, initialExternalLayers, layers, isReady]);
    // Side-effect to apply the current external layer list
    React.useEffect(() => {
        debug(`React.useEffect - Change of external layers`);
        if (context.isReady() && layers) {
            const layerManager = context.getLayerManager(mapName);
            layerManager.apply(layers);
        }
    }, [context, mapName, layers]);
    // Side-effect to set the viewer "instance" once the MapViewerBase component has been mounted.
    // Should only happen once.
    React.useEffect(() => {
        debug(`React.useEffect - Change of context and/or agent URI/kind`);
        const browserWindow: any = window;
        browserWindow.getViewer = browserWindow.getViewer || (() => context);
        if (agentUri && agentKind) {
            browserWindow.getClient = browserWindow.getClient || (() => new Client(agentUri, agentKind));
        }
        debug(`React.useEffect - Attached runtime viewer instance and installed browser global APIs`);
    }, [context, agentUri, agentKind]);
    // Side-effect to imperatively refresh the map upon selection change
    React.useEffect(() => {
        debug(`React.useEffect - Change of selection`);
        context.refreshMap(RefreshMode.SelectionOnly);
    }, [context, selection]);
}

export interface IViewerComponent {
    /**
     * @since 0.14.8
     */
    isShiftKeyDown: () => boolean;
    isContextMenuOpen: () => boolean;
    setDigitizingType: (digitizingType: string | undefined) => void;
    onDispatch: ReduxDispatch;
    onHideContextMenu: () => void;
    addImageLoading(): void;
    addImageLoaded(): void;
    addSubscribers(props: ISubscriberProps[]): string[];
    removeSubscribers(names: string[]): boolean;
    getSubscribers(): string[];
    selectCanDragPan(): boolean;
}

export interface IMapProviderState {
    activeTool: ActiveMapTool;
    view: IMapView | undefined;
    viewRotation: number;
    viewRotationEnabled: boolean;
    mapName: string | undefined;
    busyWorkers: number;
    locale: string;
    externalBaseLayers: IExternalBaseLayer[] | undefined;
    cancelDigitizationKey: number;
    undoLastPointKey: number;
    overviewMapElementSelector?: () => HTMLElement | null;
    initialExternalLayers: IInitialExternalLayer[];
}

export interface IMapProviderStateExtras {
    isReady: boolean;
    bgColor?: string;
    layers: ILayerInfo[] | undefined;
}

/**
 * Defines a mapping provider
 * 
 * @since 0.14
 */
export interface IMapProviderContext extends IMapViewer, ISelectionPopupContentOverrideProvider {
    isReady(): boolean;
    getProviderName(): string;
    isDigitizing(): boolean;
    getActiveTool(): ActiveMapTool;
    isMouseOverTooltip(): boolean;
    incrementBusyWorker(): void;
    decrementBusyWorker(): void;
    attachToComponent(el: HTMLElement, comp: IViewerComponent): void;
    detachFromComponent(): void;
    setToasterRef(ref: React.RefObject<Toaster>): void;
    setProviderState(nextState: IMapProviderState): void;
    onKeyDown(e: GenericEvent): void;
    hideAllPopups(): void;
    getHookFunction(): () => IMapProviderState & IMapProviderStateExtras;
    addCustomSelectionPopupRenderer(mapName: string | undefined, layerName: string | undefined, renderer: SelectionPopupContentRenderer): void;
}

export type WmsQueryAugmentation = (getFeatureInfoUrl: string) => string;

export abstract class BaseMapProviderContext<TState extends IMapProviderState, TLayerSetGroup extends LayerSetGroupBase> implements IMapProviderContext {
    private _toasterRef: React.RefObject<Toaster> | undefined;
    private _baseTileSourceLoaders: Dictionary<Dictionary<TileLoadFunction>>;
    private _tileSourceLoaders: Dictionary<Dictionary<TileLoadFunction>>;
    private _imageSourceLoaders: Dictionary<Dictionary<ImageLoadFunction>>;
    private _wmsQueryAugmentations: Dictionary<Dictionary<WmsQueryAugmentation>>;
    private _globalCustomSelectionPopupRenderer: SelectionPopupContentRenderer | undefined;
    private _customSelectionPopupRenderers: Dictionary<Dictionary<SelectionPopupContentRenderer>>;
    protected _state: TState;
    /**
     * Indicates if touch events are supported.
     */
    protected _supportsTouch: boolean;
    /**
     * The internal OpenLayers map instance
     *
     * @private
     * @type {Map}
     */
    protected _map: Map | undefined;
    protected _ovMap: OverviewMap | undefined;

    protected _layerSetGroups: Dictionary<TLayerSetGroup>;
    protected _mouseTooltip: MouseTrackingTooltip | undefined;
    protected _selectTooltip: SelectedFeaturesTooltip | undefined;

    protected _comp: IViewerComponent | undefined;
    protected _zoomSelectBox: DragBox | undefined;

    protected _busyWorkers: number;
    protected _triggerZoomRequestOnMoveEnd: boolean;
    protected _select: Select | undefined;
    protected _activeDrawInteraction: Draw | null;

    constructor(private olFactory: OLFactory = new OLFactory()) {
        this._busyWorkers = 0;
        this._layerSetGroups = {};
        this._tileSourceLoaders = {};
        this._imageSourceLoaders = {};
        this._wmsQueryAugmentations = {};
        this._triggerZoomRequestOnMoveEnd = true;
        this._supportsTouch = supportsTouch();
        const baseInitialState: IMapProviderState = {
            activeTool: ActiveMapTool.None,
            view: undefined,
            viewRotation: 0,
            viewRotationEnabled: true,
            locale: DEFAULT_LOCALE,
            cancelDigitizationKey: KC_ESCAPE,
            undoLastPointKey: KC_U,
            busyWorkers: 0,
            mapName: undefined,
            externalBaseLayers: undefined,
            initialExternalLayers: []
        };
        this._state = {
            ...baseInitialState,
            ...this.getInitialProviderState()
        } as TState;
    }

    /**
     * Exports an image of the current map view
     *
     * @param {IMapImageExportOptions} options
     * @since 0.14
     */
    public exportImage(options: IMapImageExportOptions): void {
        if (this._map) {
            const map = this._map;
            map.once('rendercomplete', function () {
                const mapCanvas = document.createElement('canvas');
                if (options.size) {
                    const [w, h] = options.size;
                    mapCanvas.width = w;
                    mapCanvas.height = h;
                } else {
                    const size = map.getSize();
                    if (size) {
                        mapCanvas.width = size[0];
                        mapCanvas.height = size[1];
                    }
                }
                const mapContext = mapCanvas.getContext('2d');
                if (mapContext) {
                    const canvasSelector = '.ol-layer canvas, .external-vector-layer canvas';
                    Array.prototype.forEach.call(document.querySelectorAll(canvasSelector), function (canvas: HTMLCanvasElement) {
                        if (canvas.width > 0) {
                            const parentNode = canvas.parentNode;
                            const opacity = (parentNode as any)?.style?.opacity ?? "";
                            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                            const transform = canvas.style.transform;
                            // Get the transform parameters from the style's transform matrix
                            const matrix = transform.match(/^matrix\(([^\(]*)\)$/)?.[1]?.split(',')?.map(Number);
                            if (matrix) {
                                // Apply the transform to the export map context
                                CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
                                mapContext.drawImage(canvas, 0, 0);
                            }
                        }
                    });
                    options.callback(mapCanvas.toDataURL(options.exportMimeType));
                }
            });
            map.renderSync();
        }
    }

    /**
     * Adds a custom tile load function for a given base image tile layer.
     * 
     * NOTE: Unlike other load function registrations this must be done before the viewer is mounted. New load functions added at runtime will not be recognized
     * @param mapName
     * @param layerName The base layer this function should apply for
     * @param func The custom tile load function
     * @since 0.14
     */
    addBaseTileLoadFunction(mapName: string, layerName: string, func: TileLoadFunction) {
        if (!this._baseTileSourceLoaders) {
            this._baseTileSourceLoaders = {};
        }
        if (!this._baseTileSourceLoaders[mapName]) {
            this._baseTileSourceLoaders[mapName] = {};
        }
        this._baseTileSourceLoaders[mapName][layerName] = func;
    }

    /**
     * Adds a custom tile load function for a given overlay image tile layer
     * @param mapName
     * @param layerName The layer this function should apply for
     * @param func The custom tile load function
     * @since 0.14
     */
    addTileLoadFunction(mapName: string, layerName: string, func: TileLoadFunction) {
        if (!this._tileSourceLoaders) {
            this._tileSourceLoaders = {};
        }
        if (!this._tileSourceLoaders[mapName]) {
            this._tileSourceLoaders[mapName] = {};
        }
        this._tileSourceLoaders[mapName][layerName] = func;
    }

    /**
     * Adds a custom image load function for a given overlay image layer
     * @param mapName
     * @param layerName The layer this function should apply for
     * @param func The custom tile load function
     * @since 0.14
     */
    addImageLoadFunction(mapName: string, layerName: string, func: ImageLoadFunction) {
        if (!this._imageSourceLoaders) {
            this._imageSourceLoaders = {};
        }
        if (!this._imageSourceLoaders[mapName]) {
            this._imageSourceLoaders[mapName] = {};
        }
        this._imageSourceLoaders[mapName][layerName] = func;
    }

    /**
     * Adds a WMS query augmentation for the given WMS overlay layer
     * @param mapName
     * @param layerName The layer this function should apply for
     * @param func The WMS query augmentation
     * @since 0.14
     */
    addWmsQueryAugmentation(mapName: string, layerName: string, func: WmsQueryAugmentation) {
        if (!this._wmsQueryAugmentations) {
            this._wmsQueryAugmentations = {};
        }
        if (!this._wmsQueryAugmentations[mapName]) {
            this._wmsQueryAugmentations[mapName] = {};
        }
        this._wmsQueryAugmentations[mapName][layerName] = func;
    }

    public addCustomSelectionPopupRenderer(mapName: string | undefined, layerName: string | undefined, renderer: SelectionPopupContentRenderer) {
        if (mapName && layerName) {
            if (!this._customSelectionPopupRenderers) {
                this._customSelectionPopupRenderers = {};
            }
            if (!this._customSelectionPopupRenderers[mapName]) {
                this._customSelectionPopupRenderers[mapName] = {};
            }
            this._customSelectionPopupRenderers[mapName][layerName] = renderer;
        } else {
            this._globalCustomSelectionPopupRenderer = renderer;
        }
    }

    public getSelectionPopupRenderer(layerName: string): SelectionPopupContentRenderer | undefined {
        if (!this._customSelectionPopupRenderers) {
            this._customSelectionPopupRenderers = {};
        }
        const { mapName } = this._state;
        if (mapName) {
            if (!this._customSelectionPopupRenderers[mapName]) {
                this._customSelectionPopupRenderers[mapName] = {};
            }
            const r = this._customSelectionPopupRenderers[mapName][layerName];
            if (r) {
                return r;
            }
        }

        if (this._globalCustomSelectionPopupRenderer) {
            return this._globalCustomSelectionPopupRenderer;
        }

        return undefined;
    }

    /**
     * @virtual
     */
    public hideAllPopups() {
        this._mouseTooltip?.clear();
        this._selectTooltip?.hide();
    }

    public isReady(): boolean { return !!(this._map && this._comp); }

    //#region IMapViewer
    /**
     * @virtual
     * @returns {(IMapGuideViewerSupport | undefined)}
     *
     */
    mapguideSupport(): IMapGuideViewerSupport | undefined {
        return undefined;
    }
    setActiveTool(tool: ActiveMapTool): void {
        this._comp?.onDispatch(setActiveTool(tool));
    }
    getOLFactory(): IOLFactory {
        return this.olFactory;
    }
    getMapName(): string {
        return this._state.mapName!;
    }
    setViewRotation(rotation: number): void {
        this._comp?.onDispatch(setViewRotation(rotation));
    }
    getViewRotation(): number {
        return this._state.viewRotation;
    }
    isViewRotationEnabled(): boolean {
        return this._state.viewRotationEnabled;
    }
    setViewRotationEnabled(enabled: boolean): void {
        this._comp?.onDispatch(setViewRotationEnabled(enabled));
    }
    toastSuccess(iconName: string, message: string | JSX.Element): string | undefined {
        return this._toasterRef?.current?.show({ icon: (iconName as any), message: message, intent: Intent.SUCCESS });
    }
    toastWarning(iconName: string, message: string | JSX.Element): string | undefined {
        return this._toasterRef?.current?.show({ icon: (iconName as any), message: message, intent: Intent.WARNING });
    }
    toastError(iconName: string, message: string | JSX.Element): string | undefined {
        return this._toasterRef?.current?.show({ icon: (iconName as any), message: message, intent: Intent.DANGER });
    }
    toastPrimary(iconName: string, message: string | JSX.Element): string | undefined {
        return this._toasterRef?.current?.show({ icon: (iconName as any), message: message, intent: Intent.PRIMARY });
    }
    dismissToast(key: string): void {
        this._toasterRef?.current?.dismiss(key);
    }
    addImageLoading(): void {
        this._comp?.addImageLoading();
    }
    addImageLoaded(): void {
        this._comp?.addImageLoaded();
    }
    addSubscribers(props: ISubscriberProps[]): string[] {
        return this._comp?.addSubscribers(props) ?? [];
    }
    removeSubscribers(names: string[]): boolean {
        return this._comp?.removeSubscribers(names) ?? false;
    }
    getSubscribers(): string[] {
        return this._comp?.getSubscribers() ?? [];
    }
    dispatch(action: any): void {
        this._comp?.onDispatch(action);
    }
    getDefaultPointCircleStyle(): IBasicPointCircleStyle {
        return { ...DEFAULT_POINT_CIRCLE_STYLE };
    }
    getDefaultPointIconStyle(): IPointIconStyle {
        return { ...DEFAULT_POINT_ICON_STYLE };
    }
    getDefaultLineStyle(): IBasicVectorLineStyle {
        return { ...DEFAULT_LINE_STYLE };
    }
    getDefaultPolygonStyle(): IBasicVectorPolygonStyle {
        return { ...DEFAULT_POLY_STYLE };
    }
    //#endregion

    public abstract getHookFunction(): () => IMapProviderState & IMapProviderStateExtras;
    protected getBaseTileSourceLoaders(mapName: string): Dictionary<TileLoadFunction> {
        return this._baseTileSourceLoaders?.[mapName] ?? {};
    }
    protected getTileSourceLoaders(mapName: string): Dictionary<TileLoadFunction> {
        return this._tileSourceLoaders?.[mapName] ?? {};
    }
    protected getImageSourceLoaders(mapName: string): Dictionary<ImageLoadFunction> {
        return this._imageSourceLoaders?.[mapName] ?? {};
    }

    protected abstract getInitialProviderState(): Omit<TState, keyof IMapProviderState>;
    //#region IMapViewerContextCallback
    protected getMockMode(): MapGuideMockMode | undefined { return undefined; }
    protected addFeatureToHighlight(feat: OLFeature | undefined, bAppend: boolean): void {
        if (this._state.mapName) {
            // Features have to belong to layer in order to be visible and have the highlight style, 
            // so in addition to adding this new feature to the OL select observable collection, we 
            // need to also add the feature to a scratch vector layer dedicated for this purpose
            const layerSet = this.getLayerSetGroup(this._state.mapName);
            if (layerSet) {
                const sf = this._select?.getFeatures();
                if (sf) {
                    if (!bAppend) {
                        sf.clear();
                    }

                    if (feat) {
                        sf.push(feat);
                    }
                }
            }
        }
    }
    //#endregion

    //#region Map Context
    protected getScaleForExtent(bounds: Bounds): number {
        assertIsDefined(this._map);
        assertIsDefined(this._state.mapName);
        const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
        assertIsDefined(activeLayerSet);
        const size = this._map.getSize();
        assertIsDefined(size);
        const mcsW = olExtent.getWidth(bounds);
        const mcsH = olExtent.getHeight(bounds);
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
    public getViewForExtent(extent: Bounds): IMapView {
        assertIsDefined(this._map);

        let scale, center;
        // If this is a zero-width/height extent, we need to "inflate" it to something small
        // so that we do not enter an infinite loop due to attempting to get a x/y/scale from
        // a zero-width/height extent.
        //
        // This generally happens if we want to zoom to the bounds of a selected point
        if (olExtent.getWidth(extent) == 0 || olExtent.getHeight(extent) == 0) {
            const thisProj = this.getProjection();
            // Inflate the box by 20 meters
            const inflatedBounds = inflateBoundsByMeters(thisProj, extent, 20);
            // Now we can safely extract the scale/center
            scale = this.getScaleForExtent(inflatedBounds);
            center = olExtent.getCenter(inflatedBounds);
        } else {
            scale = this.getScaleForExtent(extent);
            center = olExtent.getCenter(extent);
        }

        return {
            x: center[0],
            y: center[1],
            scale: scale,
            resolution: this._map.getView().getResolution()
        };
    }
    protected onZoomSelectBox(e: GenericEvent) {
        if (this._comp) {
            const extent = this._zoomSelectBox?.getGeometry();
            if (!extent) {
                return;
            }
            switch (this._state.activeTool) {
                case ActiveMapTool.Zoom:
                    {
                        const ext: any = extent.getExtent();
                        this._comp.onDispatch(setCurrentView(this.getViewForExtent(ext)));
                    }
                    break;
                case ActiveMapTool.Select:
                    {
                        this.selectFeaturesByExtent(extent);
                    }
                    break;
            }
        }
    }
    /**
     * @virtual
     * @protected
     * @param {GenericEvent} e
     * @returns
     *
     */
    protected onMouseMove(e: GenericEvent) {
        if (this._comp) {
            this.handleMouseTooltipMouseMove(e);
            this.handleHighlightHover(e);
            if (this._comp.isContextMenuOpen()) {
                return;
            }
            if (this._state.mapName) {
                this._comp.onDispatch(setMouseCoordinates(this._state.mapName, e.coord));
            }
        }
    }
    public incrementBusyWorker() {
        this._busyWorkers++;
        this._comp?.onDispatch(setBusyCount(this._busyWorkers));
    }
    public decrementBusyWorker() {
        this._busyWorkers--;
        this._comp?.onDispatch(setBusyCount(this._busyWorkers));
    }
    protected applyView(layerSet: LayerSetGroupBase, vw: IMapView) {
        this._triggerZoomRequestOnMoveEnd = false;
        layerSet.getView().setCenter([vw.x, vw.y]);
        //Don't use this.scaleToResolution() as that uses this.props to determine
        //applicable layer set, but we already have that here
        const res = layerSet.scaleToResolution(vw.scale);
        layerSet.getView().setResolution(res);
        this._triggerZoomRequestOnMoveEnd = true;
    }
    protected removeActiveDrawInteraction() {
        if (this._activeDrawInteraction && this._map && this._comp) {
            this._map.removeInteraction(this._activeDrawInteraction);
            this._activeDrawInteraction = null;
            this._comp.setDigitizingType(undefined);
        }
    }

    public getActiveTool(): ActiveMapTool { return this._state.activeTool; }

    public cancelDigitization(): void {
        if (this.isDigitizing()) {
            this.removeActiveDrawInteraction();
            this.clearMouseTooltip();
            //this._mouseTooltip.clear();
        }
    }
    private onBeginDigitization = (callback: (cancelled: boolean) => void) => {
        this._comp?.onDispatch(setActiveTool(ActiveMapTool.None));
        //Could be a small timing issue here, but the active tool should generally
        //be "None" before the user clicks their first digitizing vertex/point
        callback(false);
    };
    protected pushDrawInteraction<T extends Geometry>(digitizingType: string, draw: Draw, handler: DigitizerCallback<T>, prompt?: string): void {
        assertIsDefined(this._comp);
        this.onBeginDigitization(cancel => {
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
                    const drawnFeature: OLFeature = e.feature;
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
     *
     */
    protected selectFeaturesByExtent(geom: Polygon) { }

    protected zoomByDelta(delta: number) {
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
    protected ensureAndGetLayerSetGroup(nextState: TState) {
        assertIsDefined(nextState.mapName);
        let layerSet = this._layerSetGroups[nextState.mapName];
        if (!layerSet) {
            layerSet = this.initLayerSet(nextState);
            this._layerSetGroups[nextState.mapName] = layerSet;
        }
        return layerSet;
    }
    //public getLayerSet(name: string, bCreate: boolean = false, props?: IMapViewerContextProps): MgLayerSet {
    public getLayerSetGroup(name: string | undefined): TLayerSetGroup | undefined {
        let layerSet: TLayerSetGroup | undefined;
        if (name) {
            layerSet = this._layerSetGroups[name];
            /*
            if (!layerSet && props && bCreate) {
                layerSet = this.initLayerSet(props);
                this._layerSets[props.map.Name] = layerSet;
                this._activeMapName = props.map.Name;
            }
            */
        }
        return layerSet;
    }
    /**
     * @virtual
     * @readonly
     *
     */
    public isMouseOverTooltip() { return this._selectTooltip?.isMouseOver ?? false; }
    protected clearMouseTooltip(): void {
        this._mouseTooltip?.clear();
    }
    protected setMouseTooltip(text: string) {
        this._mouseTooltip?.setText(text);
    }
    protected handleMouseTooltipMouseMove(e: GenericEvent) {
        this._mouseTooltip?.onMouseMove?.(e);
    }
    private _highlightedFeature: OLFeature | undefined;
    private isLayerHoverable(layer: OLLayer) {
        return !(layer?.get(LayerProperty.IS_HOVER_HIGHLIGHT) == true)
            && !(layer?.get(LayerProperty.IS_WMS_SELECTION_OVERLAY) == true)
            && !(layer?.get(LayerProperty.IS_HEATMAP) == true)
            && !(layer?.get(LayerProperty.IS_MEASURE) == true)
            && !(layer?.get(LayerProperty.DISABLE_HOVER) == true);
    }
    protected handleHighlightHover(e: GenericEvent) {
        if (e.dragging) {
            return;
        }
        if (this._state.busyWorkers > 0) {
            //console.log("Skip highlight hover due to busyWorkers > 0");
            return;
        }
        if (this._state.mapName && this._map) {
            const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
            if (activeLayerSet) {
                const pixel = this._map.getEventPixel(e.originalEvent);
                if (pixel) {
                    const featureToLayerMap = [] as [OLFeature, OLLayer][];
                    this._map.forEachFeatureAtPixel(pixel, (feature, layer) => {
                        if (this.isLayerHoverable(layer) && feature instanceof Feature) {
                            featureToLayerMap.push([feature, layer]);
                        }
                    });
                    const feature = featureToLayerMap.length ? featureToLayerMap[0][0] : undefined;

                    //const featuresAtPixel = this._map?.getFeaturesAtPixel(pixel);
                    //const feature = featuresAtPixel?.length ? featuresAtPixel[0] : undefined;
                    if (feature != this._highlightedFeature && feature instanceof Feature) {
                        if (this._highlightedFeature) {
                            activeLayerSet.removeHighlightedFeature(this._highlightedFeature);
                        }
                        if (feature) {
                            activeLayerSet.addHighlightedFeature(feature);
                        }
                        this._highlightedFeature = feature;
                    }
                }
            }
        }
    }
    protected hideSelectedVectorFeaturesTooltip() {
        this._selectTooltip?.hide();
    }
    protected showSelectedVectorFeatures(features: Collection<OLFeature>, pixel: [number, number], featureToLayerMap: [OLFeature, OLLayer][], locale?: string) {
        this._selectTooltip?.showSelectedVectorFeatures(features, pixel, featureToLayerMap, locale);
    }
    protected async queryWmsFeatures(mapName: string | undefined, coord: Coordinate2D, bAppendMode: boolean) {
        if (mapName && this._map) {
            const activeLayerSet = this.getLayerSetGroup(mapName);
            const layerMgr = this.getLayerManager(mapName);
            const res = this._map.getView().getResolution();
            if (res && this._selectTooltip) {
                return await this._selectTooltip.queryWmsFeatures(activeLayerSet, layerMgr, coord, res, bAppendMode, {
                    getLocale: () => this._state.locale,
                    addClientSelectedFeature: (feat, layer) => this.addClientSelectedFeature(feat, layer),
                    addFeatureToHighlight: (feat, bAppend) => this.addFeatureToHighlight(feat, bAppend),
                    getWmsRequestAugmentations: () => this._wmsQueryAugmentations[mapName] ?? {}
                });
            }
        }
        return false;
    }
    /**
     * @virtual
     * @protected
     * @param {GenericEvent} e
     *
     */
    protected onImageError(e: GenericEvent) { }

    private addClientSelectedFeature(f: OLFeature, l: LayerBase) {
        if (this._select)
            this._select.getFeatures().push(f);
        if (this._state.mapName) {
            const features = f.get("features");
            let theFeature: OLFeature;
            //Are we clustered?
            if (Array.isArray(features)) {
                // Only proceeed with dispatch if single item array
                if (features.length == 1) {
                    theFeature = features[0];
                } else {
                    return;
                }
            } else {
                theFeature = f;
            }
            const p = { ...theFeature.getProperties() };
            delete p[theFeature.getGeometryName()];
            const feat: ClientSelectionFeature = {
                bounds: theFeature.getGeometry()?.getExtent() as Bounds,
                properties: p
            };
            this.dispatch(addClientSelectedFeature(this._state.mapName, l.get(LayerProperty.LAYER_NAME), feat));
        }
    }

    private clearClientSelectedFeatures() {
        if (this._select)
            this._select.getFeatures().clear();
        if (this._state.mapName) {
            this.dispatch(clearClientSelection(this._state.mapName));
        }
    }

    protected onMapClick(e: MapBrowserEvent<any>) {
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

        //TODO: Our selected feature tooltip only shows properties of a single feature
        //and displays upon said feature being selected. As a result, although we can
        //(and should) allow for multiple features to be selected, we need to figure
        //out the proper UI for such a case before we enable multiple selection.
        const bAppendMode = false;

        const featureToLayerMap = [] as [OLFeature, OLLayer][];
        if ((this._state.activeTool == ActiveMapTool.Select) && this._select) {
            if (!bAppendMode) {
                this.clearClientSelectedFeatures();
            }
            this._map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
                if (featureToLayerMap.length == 0) { //See TODO above
                    if (layer.get(LayerProperty.IS_SELECTABLE) == true && feature instanceof Feature) {
                        featureToLayerMap.push([feature, layer]);
                    }
                }
            });
            if (this._select && featureToLayerMap.length == 1) {
                const [f, l] = featureToLayerMap[0];
                if (isClusteredFeature(f) && getClusterSubFeatures(f).length > 1 && (l.get(LayerProperty.VECTOR_STYLE) as OLStyleMapSet)?.getClusterClickAction() == ClusterClickAction.ZoomToClusterExtents) {
                    const zoomBounds = getClusterSubFeatures(f).reduce((bounds, currentFeatures) => {
                        const g = currentFeatures.getGeometry();
                        if (g) {
                            return olExtent.extend(bounds, g.getExtent());
                        } else {
                            return bounds;
                        }
                    }, olExtent.createEmpty()) as Bounds;

                    // Inflate the bounds by 20 meters so that the new view has some "breathing space" and you don't see points
                    // of the cluster on the edge of the view
                    const inflatedBounds = inflateBoundsByMeters(this.getProjection(), zoomBounds, 20);
                    this.zoomToExtent(inflatedBounds);
                } else {
                    this.addClientSelectedFeature(f, l);
                }
            }
        }
        // We'll only fall through the normal map selection query route if no 
        // vector features were selected as part of this click
        const px = e.pixel as [number, number];
        if (featureToLayerMap.length == 0) {
            this.hideSelectedVectorFeaturesTooltip();
            if (this._state.activeTool == ActiveMapTool.Select) {
                this.queryWmsFeatures(this._state.mapName, e.coordinate as Coordinate2D, bAppendMode).then(madeSelection => {
                    if (!madeSelection) {
                        this.onProviderMapClick(px);
                    } else {
                        console.log("Made WMS selection. Skipping provider click event");
                    }
                })
            } else {
                this.onProviderMapClick(px);
            }
        } else {
            if (this._select) {
                if (!bAppendMode) {
                    if (this._state.mapName) {
                        const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
                        activeLayerSet?.clearWmsSelectionOverlay();
                    }
                }
                this.showSelectedVectorFeatures(this._select.getFeatures(), px, featureToLayerMap, this._state.locale);
            }
        }
    }
    protected abstract onProviderMapClick(px: [number, number]): void;
    protected abstract initLayerSet(nextState: TState): TLayerSetGroup;
    public abstract getProviderName(): string;

    protected initContext(layerSet: TLayerSetGroup, locale?: string, overviewMapElementSelector?: () => (HTMLElement | null)) {
        if (this._map) {
            const overviewMapOpts: OverviewMapOptions = {
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
                    overviewMapOpts.target = el;
                    overviewMapOpts.collapsed = false;
                    overviewMapOpts.collapsible = false;
                }
            }
            this._ovMap = new OverviewMap(overviewMapOpts);
            this._map.addControl(this._ovMap);
            this.onBeforeAttachingLayerSetGroup(layerSet);
            layerSet.attach(this._map, this._ovMap, false);
        }
    }
    //#endregion

    /**
     * @virtual
     * @protected
     * @param {TLayerSetGroup} layerSetGroup
     *
     */
    protected onBeforeAttachingLayerSetGroup(layerSetGroup: TLayerSetGroup): void { }
    public setToasterRef(ref: React.RefObject<Toaster>) {
        this._toasterRef = ref;
    }
    public abstract setProviderState(nextState: TState): void;

    public onKeyDown(e: GenericEvent) {
        const cancelKey = this._state.cancelDigitizationKey ?? KC_ESCAPE;
        const undoKey = this._state.undoLastPointKey ?? KC_U;
        if (e.keyCode == cancelKey) {
            this.cancelDigitization();
        } else if (e.keyCode == undoKey && this._activeDrawInteraction) {
            this._activeDrawInteraction.removeLastPoint();
        }
    }

    public isDigitizing(): boolean {
        if (!this._map)
            return false;
        const activeDraw = this._map.getInteractions().getArray().filter(inter => inter instanceof Draw)[0];
        return activeDraw != null;
    }

    public detachFromComponent(): void {
        this._comp = undefined;
        this._select?.dispose();
        this._select = undefined;

        if (this._boundZoomSelectBox) {
            this._zoomSelectBox?.un("boxend", this._boundZoomSelectBox as any);
            this._boundZoomSelectBox = undefined;
        }
        if (this._boundClick) {
            this._map?.un("click", this._boundClick as any);
            this._boundClick = undefined;
        }
        if (this._boundMouseMove) {
            this._map?.un("pointermove", this._boundMouseMove as any);
            this._boundMouseMove = undefined;
        }
        if (this._boundResize) {
            this._map?.un("change:size", this._boundResize as any);
            this._boundResize = undefined;
        }
        if (this._boundMoveEnd) {
            this._map?.un("moveend", this._boundMoveEnd as any);
            this._boundMoveEnd = undefined;
        }

        this._zoomSelectBox?.dispose();
        this._zoomSelectBox = undefined;
        this._activeDrawInteraction?.dispose();
        this._activeDrawInteraction = null;
        this._selectTooltip?.dispose();
        this._selectTooltip = undefined;
        this._mouseTooltip?.dispose()
        this._mouseTooltip = undefined;
        this._map?.setTarget(undefined);
        this._ovMap?.setMap(undefined as any); //HACK: Typings workaround
        this._map = undefined;
        this._ovMap = undefined;
        debug(`Map provider context detached from component and reset to initial state`);
    }

    private onMoveEnd(e: GenericEvent) {
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
            const cv = this.getCurrentView();
            if (isValidView(cv)) {
                this._comp?.onDispatch(setCurrentView(cv));
            } else {
                console.warn("Attempt to set invalid view",cv);
            }
        } else {
            info("Triggering zoom request on moveend suppresseed");
        }
        if (e.frameState.viewState.rotation != this._state.viewRotation) {
            this._comp?.onDispatch(setViewRotation(e.frameState.viewState.rotation));
        }
    }

    private _boundZoomSelectBox: Function | undefined;
    private _boundMouseMove: Function | undefined;
    private _boundResize: Function | undefined;
    private _boundClick: Function | undefined;
    private _boundMoveEnd: Function | undefined;

    /**
     * @virtual
     * @param {HTMLElement} el
     * @param {IViewerComponent} comp
     *
     */
    public attachToComponent(el: HTMLElement, comp: IViewerComponent): void {
        this._comp = comp;
        this._select = new Select({
            condition: (e) => false,
            layers: (layer) => layer.get(LayerProperty.IS_SELECTABLE) == true || layer.get(LayerProperty.IS_SCRATCH) == true
        });
        this._zoomSelectBox = new DragBox({
            condition: (e) => {
                // DragBox needs to be suppressed if the select tool can drag pan
                if (this._state.activeTool == ActiveMapTool.Select && this._comp?.selectCanDragPan() === true) {
                    return false;
                }
                const startingMiddleMouseDrag = e.type == "pointerdown" && isMiddleMouseDownEvent((e as any).originalEvent);
                return !this.isDigitizing() && !startingMiddleMouseDrag && (this._state.activeTool === ActiveMapTool.Select || this._state.activeTool === ActiveMapTool.Zoom)
            }
        });
        this._boundZoomSelectBox = this.onZoomSelectBox.bind(this);
        this._boundMouseMove = this.onMouseMove.bind(this);
        this._boundResize = this.onResize.bind(this);
        this._boundClick = this.onMapClick.bind(this);
        this._boundMoveEnd = this.onMoveEnd.bind(this);

        this._zoomSelectBox.on("boxend", this._boundZoomSelectBox as any);
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
                        // We'll allow for select tool to pan if instructed from above
                        if (this._state.activeTool == ActiveMapTool.Select && this._comp?.selectCanDragPan() === true) {
                            return true;
                        }
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
        const activeLayerSet = this.ensureAndGetLayerSetGroup(this._state);
        this.initContext(activeLayerSet, this._state.locale, this._state.overviewMapElementSelector);
        this._mouseTooltip = new MouseTrackingTooltip(this._map, this._comp.isContextMenuOpen);
        this._selectTooltip = new SelectedFeaturesTooltip(this._map, this);
        this._map.on("pointermove", this._boundMouseMove as any);
        this._map.on("change:size", this._boundResize as any);
        this._map.on("click", this._boundClick as any);
        this._map.on("moveend", this._boundMoveEnd as any);

        if (this._state.view) {
            const { x, y, scale } = this._state.view;
            this.zoomToView(x, y, scale);
        } else {
            const extents = activeLayerSet.getExtent();
            this._map.getView().fit(extents);
        }
        this.onResize(this._map.getSize());
    }
    private onResize = (e: GenericEvent) => {
        if (this._map) {
            const size = this._map.getSize();
            if (size) {
                const [w, h] = size;
                this._comp?.onDispatch(mapResized(w, h));
            }
        }
    }
    public scaleToResolution(scale: number): number {
        assertIsDefined(this._state.mapName);
        const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
        assertIsDefined(activeLayerSet);
        return activeLayerSet.scaleToResolution(scale);
    }

    public resolutionToScale(resolution: number): number {
        assertIsDefined(this._state.mapName);
        const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
        assertIsDefined(activeLayerSet);
        return activeLayerSet.resolutionToScale(resolution);
    }

    public getCurrentView(): IMapView {
        const ov = this.getOLView();
        const center = ov.getCenter();
        const resolution = ov.getResolution();
        const scale = this.resolutionToScale(resolution!);
        return {
            x: center![0],
            y: center![1],
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
    /**
     * @virtual
     * @param {RefreshMode} [mode=RefreshMode.LayersOnly | RefreshMode.SelectionOnly]
     *
     */
    public refreshMap(mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void { }
    public getMetersPerUnit(): number {
        assertIsDefined(this._state.mapName);
        const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
        assertIsDefined(activeLayerSet);
        return activeLayerSet.getMetersPerUnit();
    }
    public initialView(): void {
        assertIsDefined(this._comp);
        assertIsDefined(this._state.mapName);
        const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
        assertIsDefined(activeLayerSet);
        this._comp.onDispatch(setCurrentView(this.getViewForExtent(activeLayerSet.getExtent())));
    }

    public zoomDelta(delta: number): void {
        //TODO: To conform to redux uni-directional data flow, this should
        //broadcast the new desired view back up and flow it back through to this
        //component as new props
        this.zoomByDelta(delta);
    }
    public zoomToExtent(extent: Bounds): void {
        this._comp?.onDispatch(setCurrentView(this.getViewForExtent(extent)));
    }
    public digitizePoint(handler: DigitizerCallback<Point>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: "Point"
        });
        this.pushDrawInteraction("Point", draw, handler, prompt || tr("DIGITIZE_POINT_PROMPT", this._state.locale));
    }
    public digitizeLine(handler: DigitizerCallback<LineString>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: "LineString",
            minPoints: 2,
            maxPoints: 2
        });
        this.pushDrawInteraction("Line", draw, handler, prompt || tr("DIGITIZE_LINE_PROMPT", this._state.locale));
    }
    public digitizeLineString(handler: DigitizerCallback<LineString>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: "LineString",
            minPoints: 2
        });
        this.pushDrawInteraction("LineString", draw, handler, prompt || tr("DIGITIZE_LINESTRING_PROMPT", this._state.locale, {
            key: String.fromCharCode(this._state.undoLastPointKey ?? KC_U) //Pray that a sane (printable) key was bound
        }));
    }
    public digitizeCircle(handler: DigitizerCallback<Circle>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: "Circle"
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
            type: "LineString",
            maxPoints: 2,
            geometryFunction: geomFunc
        });
        this.pushDrawInteraction("Rectangle", draw, handler, prompt || tr("DIGITIZE_RECT_PROMPT", this._state.locale));
    }
    public digitizePolygon(handler: DigitizerCallback<Polygon>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: "Polygon"
        });
        this.pushDrawInteraction("Polygon", draw, handler, prompt || tr("DIGITIZE_POLYGON_PROMPT", this._state.locale, {
            key: String.fromCharCode(this._state.undoLastPointKey ?? KC_U) //Pray that a sane (printable) key was bound
        }));
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
        this._map?.on(eventName as any, handler as any);
    }
    public removeHandler(eventName: string, handler: Function) {
        this._map?.un(eventName as any, handler as any);
    }
    public updateSize() {
        this._map?.updateSize();
    }
    protected getLayerManagerForLayerSet(layerSet: TLayerSetGroup) {
        assertIsDefined(this._map);
        return new LayerManager(this._map, layerSet);
    }
    public getLayerManager(mapName?: string): ILayerManager {
        assertIsDefined(this._map);
        assertIsDefined(this._state.mapName);
        const layerSet = this.ensureAndGetLayerSetGroup(this._state); // this.getLayerSet(mapName ?? this._state.mapName, true, this._comp as any);
        return this.getLayerManagerForLayerSet(layerSet);
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
        return this._select?.getFeatures();
    }
    public getPointSelectionBox(point: Coordinate2D, ptBuffer: number): Bounds {
        assertIsDefined(this._map);
        const pt1 = this._map.getCoordinateFromPixel([point[0] - ptBuffer, point[1] - ptBuffer]);
        const pt2 = this._map.getCoordinateFromPixel([point[0] + ptBuffer, point[1] + ptBuffer]);
        const minX = Math.min(pt1[0], pt2[0]);
        const minY = Math.min(pt1[1], pt2[1]);
        const maxX = Math.max(pt1[0], pt2[0]);
        const maxY = Math.min(pt1[1], pt2[1]);
        return [minX, minY, maxX, maxY];
    }
    public getResolution(): number | undefined {
        assertIsDefined(this._map)
        return this._map.getView().getResolution();
    }
    public updateOverviewMapElement(overviewMapElementSelector: () => (HTMLElement | null)) {
        if (this._ovMap) {
            const el = overviewMapElementSelector();
            if (el) {
                this._ovMap.setCollapsed(false);
                this._ovMap.setCollapsible(false);
                this._ovMap.setTarget(el);
            } else {
                this._ovMap.setCollapsed(true);
                this._ovMap.setCollapsible(true);
                this._ovMap.setTarget(null as any);
            }
        }
    }
}