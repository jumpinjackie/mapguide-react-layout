import * as React from "react";

import { IMapProviderContext } from './context';
import { MapViewerContext } from '../map-viewer-context';
import { Client } from '../../api/client';
import { SessionKeepAlive } from '../session-keep-alive';
import { Bounds, IMapView, GenericEvent, ActiveMapTool, LayerProperty, ImageFormat, ReduxDispatch, Size2, RefreshMode, DigitizerCallback, KC_U, SelectionVariant, ILayerManager, Coordinate2D } from '../../api/common';
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
import Geometry from '@hanreev/types-ol/ol/geom/Geometry';
import { queryMapFeatures } from 'actions/map';
import { ProjectionLike } from '@hanreev/types-ol/ol/proj';
import View from '@hanreev/types-ol/ol/View';
import Point from '@hanreev/types-ol/ol/geom/Point';
import GeometryType from '@hanreev/types-ol/ol/geom/GeometryType';
import LineString from '@hanreev/types-ol/ol/geom/LineString';
import Circle from '@hanreev/types-ol/ol/geom/Circle';
import Interaction from '@hanreev/types-ol/ol/interaction/Interaction';
import Overlay from '@hanreev/types-ol/ol/Overlay';
import { MgLayerManager } from 'api/layer-manager';
import Feature from '@hanreev/types-ol/ol/Feature';
import { toStringHDMS } from '@hanreev/types-ol/ol/coordinate';
import MapBrowserEvent from '@hanreev/types-ol/ol/MapBrowserEvent';

function isMiddleMouseDownEvent(e: MouseEvent): boolean {
    return (e && (e.which == 2 || e.button == 4));
}

export interface IViewerComponent {
    isContextMenuOpen: () => boolean;
    setDigitizingType: (digitizingType: string | undefined) => void;
    onMouseCoordinateChanged: (coords: number[]) => void;
    onRequestZoomToView: (view: IMapView) => void;
    onBusyLoading: (busyCount: number) => void;
    onBeginDigitization: (callback: (cancelled: boolean) => void) => void;
    onHideContextMenu: () => void;
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
    private _comp: IViewerComponent | undefined;
    private _wktFormat: WKTFormat;
    private _zoomSelectBox: DragBox;
    private _mapContext: MapViewerContext | undefined;
    private _client: Client;
    private _busyWorkers: number;
    private _triggerZoomRequestOnMoveEnd: boolean;
    private _select: Select;
    private _dispatcher: ReduxDispatch | undefined;
    private _activeDrawInteraction: Draw | null;

    // ============= MapGuide-specific private state ============== //
    private _keepAlive: SessionKeepAlive;
    private _activeTool: ActiveMapTool | undefined;
    private _mapName: string | undefined;
    private _locale: string | undefined;
    private _pointSelectionBuffer: number | undefined;
    private _manualFeatureTooltips: boolean | undefined;
    private _featureTooltipsEnabled: boolean | undefined;
    private _sessionId: string | undefined;
    private _selectionColor: string | undefined;
    private _selectionImageFormat: ImageFormat | undefined;
    private _selectableLayerNames: string[] | undefined;
    private _cancelDigitizationKey: number | undefined;
    private _undoLastPointKey: number | undefined;

    private getScaleForExtent(bounds: Bounds): number {
        assertIsDefined(this._mapContext);
        assertIsDefined(this._map);
        assertIsDefined(this._mapName);
        const activeLayerSet = this._mapContext.getLayerSet(this._mapName);
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
            switch (this._activeTool) {
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
        if (this._mapContext && this._comp) {
            this._mapContext.handleMouseTooltipMouseMove(e);
            if (this._comp.isContextMenuOpen()) {
                return;
            }
            if (!this._manualFeatureTooltips) {
                this._mapContext.handleFeatureTooltipMouseMove(e);
            }
            this._comp.onMouseCoordinateChanged?.(e.coordinate);
        }
    }
    private onMapClick(e: MapBrowserEvent) {
        if (!this._mapContext || !this._comp || !this._map) {
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
        if (this._activeTool == ActiveMapTool.WmsQueryFeatures) {
            this._mapContext.queryWmsFeatures(this._map, this.getLayerManager(), e.coordinate as Coordinate2D);
        } else {
            let vfSelected = 0;
            if (this._activeTool == ActiveMapTool.Select) {
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
                if (this._manualFeatureTooltips && this._featureTooltipsEnabled) {
                    this._mapContext.queryFeatureTooltip(px);
                } else if (this._activeTool === ActiveMapTool.Select) {
                    const ptBuffer = this._pointSelectionBuffer ?? 2;
                    const box = this.getPointSelectionBox(px, ptBuffer);
                    const geom = fromExtent(box);
                    const options = this.buildDefaultQueryOptions(geom);
                    options.maxfeatures = 1;
                    this.sendSelectionQuery(options);
                }
            } else {
                this._mapContext.showSelectedVectorFeatures(this._select.getFeatures(), px, this._locale);
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
        return this._selectableLayerNames ?? [];
    }
    private buildDefaultQueryOptions(geom: Geometry | string, reqQueryFeatures: number = 1 /* Attributes */): IQueryMapFeaturesOptions {
        assertIsDefined(this._mapName);
        assertIsDefined(this._sessionId);
        const names = this.getSelectableLayers();
        let wkt: string;
        if (typeof geom === 'string') {
            wkt = geom;
        } else {
            wkt = this._wktFormat.writeGeometry(geom);
        }
        return {
            mapname: this._mapName,
            session: this._sessionId,
            geometry: wkt,
            requestdata: reqQueryFeatures,
            layernames: names.length > 0 ? names.join(",") : undefined,
            persist: 1
        };
    }
    
    private removeActiveDrawInteraction() {
        if (this._activeDrawInteraction && this._map && this._comp) {
            this._map.removeInteraction(this._activeDrawInteraction);
            this._activeDrawInteraction = null;
            this._comp.setDigitizingType(undefined);
        }
    }
    public cancelDigitization(): void {
        if (this.isDigitizing() && this._mapContext) {
            this.removeActiveDrawInteraction();
            this._mapContext.clearMouseTooltip();
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
                this._mapContext?.clearMouseTooltip();
                if (prompt) {
                    //this._mouseTooltip.setText(prompt);
                    this._mapContext?.setMouseTooltip(prompt);
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
     * @param {*} extraState
     * @memberof MapGuideMapProviderContext
     */
    public setExtraState(extraState: any): void {

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
            condition: (e) => !this.isDigitizing() && (this._activeTool === ActiveMapTool.Select || this._activeTool === ActiveMapTool.Zoom)
        });
        this._zoomSelectBox.on("boxend", this.onZoomSelectBox.bind(this));
        const mapOptions: MapOptions = {
            target: el as any,
            //layers: layers,
            //view: view,
            controls: [
                new Attribution({
                    tipLabel: tr("OL_ATTRIBUTION_TIP", this._locale)
                }),
                new Rotate({
                    tipLabel: tr("OL_RESET_ROTATION_TIP", this._locale)
                })
            ],
            interactions: [
                this._select,
                new DragRotate(),
                new DragPan({
                    condition: (e) => {
                        const startingMiddleMouseDrag = e.type == "pointerdown" && isMiddleMouseDownEvent((e as any).originalEvent);
                        const enabled = (startingMiddleMouseDrag || this._supportsTouch || this._activeTool === ActiveMapTool.Pan);
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
        this._map.on("pointermove", this.onMouseMove.bind(this));
        //this._map.on("change:size", this.onResize.bind(this));
    }

    public scaleToResolution(scale: number): number {
        assertIsDefined(this._mapContext);
        assertIsDefined(this._mapName);
        const activeLayerSet = this._mapContext.getLayerSet(this._mapName);
        return activeLayerSet.scaleToResolution(scale);
    }

    public resolutionToScale(resolution: number): number {
        assertIsDefined(this._mapContext);
        assertIsDefined(this._mapName);
        const activeLayerSet = this._mapContext.getLayerSet(this._mapName);
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
        if (!this._mapName || !this._dispatcher || !this._comp || !this._sessionId || !this._selectionColor) {
            return;
        }
        //NOTE: A quirk of QUERYMAPFEATURES is that when passing in selection XML (instead of geometry),
        //you must set the layerattributefilter to the full bit mask otherwise certain features in the
        //selection XML will not be rendered because they may not pass the layer attribute filter
        const reqQueryFeatures = 1; //Attributes
        this.incrementBusyWorker();
        const mapName = this._mapName;
        const qOrig = {
            mapname: mapName,
            session: this._sessionId,
            persist: 1,
            featurefilter: xml,
            selectioncolor: this._selectionColor,
            selectionformat: this._selectionImageFormat ?? "PNG8",
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
            errBack:  err => {
                this.decrementBusyWorker();
                if (failure) {
                    failure(err);
                }
            }
        });
        this._dispatcher(action);
    }
    public refreshMap(mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void {
        assertIsDefined(this._mapContext);
        assertIsDefined(this._mapName);
        this._mapContext.refreshMap(this._mapName, mode);
    }
    public getMetersPerUnit(): number {
        assertIsDefined(this._mapContext);
        assertIsDefined(this._mapName);
        const activeLayerSet = this._mapContext.getLayerSet(this._mapName);
        return activeLayerSet.getMetersPerUnit();
    }
    public initialView(): void {
        assertIsDefined(this._comp);
        assertIsDefined(this._mapName);
        assertIsDefined(this._mapContext);
        const activeLayerSet = this._mapContext.getLayerSet(this._mapName);
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
        this.pushDrawInteraction("Point", draw, handler, prompt || tr("DIGITIZE_POINT_PROMPT", this._locale));
    }
    public digitizeLine(handler: DigitizerCallback<LineString>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: GeometryType.LINE_STRING, // "LineString", //ol.geom.GeometryType.LINE_STRING,
            minPoints: 2,
            maxPoints: 2
        });
        this.pushDrawInteraction("Line", draw, handler, prompt || tr("DIGITIZE_LINE_PROMPT", this._locale));
    }
    public digitizeLineString(handler: DigitizerCallback<LineString>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: GeometryType.LINE_STRING, //"LineString", //ol.geom.GeometryType.LINE_STRING,
            minPoints: 2
        });
        this.pushDrawInteraction("LineString", draw, handler, prompt || tr("DIGITIZE_LINESTRING_PROMPT", this._locale, {
            key: String.fromCharCode(this._undoLastPointKey ?? KC_U) //Pray that a sane (printable) key was bound
        }));
    }
    public digitizeCircle(handler: DigitizerCallback<Circle>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: GeometryType.CIRCLE  // "Circle" //ol.geom.GeometryType.CIRCLE
        });
        this.pushDrawInteraction("Circle", draw, handler, prompt || tr("DIGITIZE_CIRCLE_PROMPT", this._locale));
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
        this.pushDrawInteraction("Rectangle", draw, handler, prompt || tr("DIGITIZE_RECT_PROMPT", this._locale));
    }
    public digitizePolygon(handler: DigitizerCallback<Polygon>, prompt?: string): void {
        assertIsDefined(this._comp);
        const draw = new Draw({
            type: GeometryType.POLYGON //"Polygon" //ol.geom.GeometryType.POLYGON
        });
        this.pushDrawInteraction("Polygon", draw, handler, prompt || tr("DIGITIZE_POLYGON_PROMPT", this._locale, {
            key: String.fromCharCode(this._undoLastPointKey ?? KC_U) //Pray that a sane (printable) key was bound
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
        assertIsDefined(this._mapContext);
        //return this._featureTooltip.isEnabled();
        return this._mapContext.isFeatureTooltipEnabled();
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
        assertIsDefined(this._mapContext);
        assertIsDefined(this._map);
        assertIsDefined(this._mapName);
        const layerSet = this._mapContext.getLayerSet(mapName ?? this._mapName, true, this._comp as any);
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
        if (!this._mapName || !this._dispatcher || !this._comp || !this._sessionId || !this._selectionColor || (queryOpts != null && (queryOpts.layernames ?? []).length == 0)) {
            return;
        }
        this.incrementBusyWorker();
        const mapName = this._mapName;
        const qOrig: Partial<IQueryMapFeaturesOptions> = {
            mapname: mapName,
            session: this._sessionId,
            persist: 1,
            selectionvariant: "INTERSECTS",
            selectioncolor: this._selectionColor,
            selectionformat: this._selectionImageFormat ?? "PNG8",
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
            errBack:  err => {
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