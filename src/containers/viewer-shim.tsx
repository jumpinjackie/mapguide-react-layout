import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import olPoint from "ol/geom/point";
import olLineString from "ol/geom/linestring";
import olPolygon from "ol/geom/polygon";
import olCircle from "ol/geom/circle";
import olGeom  from "ol/geom/geometry";
import * as Constants from "../constants";
import * as Runtime from "../api/runtime";
import * as logger from "../utils/logger";
import { MgError } from "../api/error";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { FeatureSet, SelectedFeatureSet, QueryMapFeaturesResponse } from "../api/contracts/query";
import { RuntimeMapFeatureFlags } from "../api/request-builder";
import { RefreshMode, ReduxDispatch, IApplicationState, ICommand } from "../api/common";
import * as MapActions from "../actions/map";
import * as TaskPaneActions from "../actions/taskpane";
import * as LegendActions from "../actions/legend";
import { buildSelectionXml } from "../api/builders/deArrayify";
import { FormFrameShim } from "../components/form-frame-shim";
import { getCommand, DefaultCommands, CommandConditions } from "../api/registry/command";
import { Toaster, Position, Intent, IToaster } from "@blueprintjs/core";
import { tr } from "../api/i18n";

/**
 * This class emulates a subset of the Fusion API. This represents the top-level object named "Fusion"
 */
class FusionApiShim {
    public Event: FusionEventApiShim;
    constructor(private parent: ViewerApiShim) {
        this.Event = new FusionEventApiShim();
    }

    getMapByName(name: string): FusionWidgetApiShim | undefined {
        if (this.parent.props.map && this.parent.props.map.Name == name) {
            return new FusionWidgetApiShim(this.parent);
        }
        return undefined;
    }
    getWidgetById(id: string): FusionWidgetApiShim | undefined {
        if (id == Constants.FUSION_TASKPANE_NAME ||
            id == Constants.FUSION_MAP_NAME) {
            return new FusionWidgetApiShim(this.parent);
        }
        return undefined;
    }
    registerForEvent(eventID: number, callback: (...args: any[]) => void): void {
        this.parent.registerForEvent(eventID, callback);
    }
}

class OL2Shim {
    i18n(key: string): string {
        return tr(key);
    }
}

class FusionEventApiShim {
    constructor() {

    }
    public get MAP_SELECTION_ON(): number { return 1; }
    public get MAP_SELECTION_OFF(): number { return 2; }
    public get MAP_ACTIVE_LAYER_CHANGED(): number { return 3; }
}

type FusionGeomDigitizer = (geom: any) => void;

class OL2Rect {
    constructor(private poly: olPolygon) { }
    getVertices(): ({ x: number, y: number }|undefined)[] {
        const coords = this.poly.getExtent();
        return [
            { x: coords[0], y: coords[1] },//0
            undefined,                     //1
            { x: coords[2], y: coords[3] } //2
        ]
    }
}

class OL2Geom {
    constructor(private geom: olGeom) { }
    get x(): number {
        const g = this.geom;
        if (g instanceof olPoint) {
            return g.getCoordinates()[0];
        }
        return NaN;
    }
    get y(): number {
        const g = this.geom;
        if (g instanceof olPoint) {
            return g.getCoordinates()[1];
        }
        return NaN;
    }
    getVertices(): { x: number, y: number }[] {
        const g = this.geom;
        if (g instanceof olPoint) {
            const c = g.getCoordinates();
        } else if (g instanceof olLineString) {
            return g.getCoordinates().map(c => {
                return { x: c[0], y: c[1] };
            })
        } else if (g instanceof olPolygon) {
            return g.getLinearRing(0).getCoordinates().map(c => {
                return { x: c[0], y: c[1] };
            });
        }
        return [];
    }
    get CLASS_NAME(): string {
        if (this.geom instanceof olPoint) {
            return "OpenLayers.Geometry.Point";
        } else if (this.geom instanceof olLineString) {
            return "OpenLayers.Geometry.LineString";
        } else if (this.geom instanceof olPolygon) {
            return "OpenLayers.Geometry.Polygon";
        } else {
            return "Unknown";
        }
    }
}

class FusionWidgetApiShim {
    private _activeLayer: any;
    private _toaster: IToaster;
    private _activeToast: string;

    constructor(private parent: ViewerApiShim) {
        this._toaster = Toaster.create({ position: Position.TOP, className: "mg-fusion-message-bar-toast" });
    }

    goHome(): void { //TaskPane
        this.parent.goHome();
    }
    get mapWidget(): FusionWidgetApiShim { //Map
        return this;
    }
    setActiveLayer(layer: any) { //Map
        this._activeLayer = layer;
    }
    getActiveLayer(): any { //Map
        return this._activeLayer;
    }
    clearSelection(): void { //Map
        this.parent.ClearSelection();
    }
    cancelDigitization(): void { //Map
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.cancelDigitization();
        }
    }
    query(options: any): void { //Map
        const viewer = Runtime.getViewer();
        if (viewer && this.parent.props.map) {
            const qmo = {
                mapname: this.parent.props.map.Name,
                session: this.parent.props.map.SessionId,
                selectionvariant: options.selectionType,
                maxfeatures: options.maxFeatures,
                geometry: options.geometry,
                layernames: options.layers
            };
            if (qmo.maxfeatures == 0) {
                qmo.maxfeatures = -1;
            }
            viewer.queryMapFeatures(qmo);
        }
    }
    setSelection(xml: string, zoomTo: boolean): void {
        const viewer = Runtime.getViewer();
        if (viewer) {
            //TODO: Support zoomTo
            viewer.setSelectionXml(xml, {
                layerattributefilter: 0 //Need to set this in order for requestdata to be respected
            });
        }
    }
    getSelectedLayers(): FusionSelectedLayer[] { //Map
        const layers = [] as FusionSelectedLayer[];
        const map = this.parent.props.map;
        const selectionSet = this.parent.props.selectionSet;
        if (map && map.Layer && selectionSet && selectionSet.FeatureSet) {
            for (const fl of selectionSet.FeatureSet.Layer) {
                const ml = map.Layer.filter(l => l.ObjectId == fl["@id"])[0];
                if (ml) {
                    layers.push({ legendLabel: ml.LegendLabel, layerName: ml.Name });
                }
            }
        }
        return layers;
    }
    isMapLoaded(): boolean {
        return true;
    }
    redraw(): void { //Map
        this.parent.Refresh();
    }

    reloadMap(): void { //Map
        this.parent.Refresh();
    }
    info(msg: string): void { //Map MessageBar
        this._activeToast = this._toaster.show({ iconName: "info", message: <div className="mg-fusion-message" dangerouslySetInnerHTML={{ __html: msg }} />, intent: Intent.PRIMARY });
    }
    clear(): void { //Map MessageBar
        this._toaster.dismiss(this._activeToast);
    }
    get container(): FusionWidgetApiShim {
        return this;
    }
    get ownerDocument(): Document {
        return document;
    }
    get message(): FusionWidgetApiShim { //Map
        return this;
    }
    get layerRoot(): FusionWidgetApiShim { //Map
        return this;
    }
    findLayerByAttribute(name: string, value: string) {
        const map = this.parent.props.map;
        if (map && map.Layer) {
            const ml = map.Layer.filter(lyr => {
                switch (name) {
                    case "layerName":
                        return lyr.Name == value;
                }
                return false;
            })[0];
            if (ml) {
                return { layerName: ml.Name };
            }
        }
        return null;
    }
    pixToGeoMeasure(tolerance: number) {
        const viewer = Runtime.getViewer();
        if (viewer) {
            return tolerance * viewer.getResolution();
        }
        return 0.000001; //Pull some random number
    }
    registerForEvent(eventID: number, callback: Function): void { //Widget
        this.parent.registerForEvent(eventID, callback);
    }
    deregisterForEvent(eventID: number, callback: Function): void {
        this.parent.deregisterForEvent(eventID, callback);
    }
    static toOL2Circle(circ: olCircle) {
        const c = circ.getCenter();
        return {
            x: c[0],
            y: c[1],
            r: circ.getRadius()
        };
    }
    digitizePoint(options: any, handler: FusionGeomDigitizer) {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.digitizePoint(pt => {
                handler(new OL2Geom(pt));
            });
        }
    }
    digitizeLineString(options: any, handler: FusionGeomDigitizer) {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.digitizeLineString(lstr => {
                handler(new OL2Geom(lstr));
            });
        }
    }
    digitizeRectangle(options: any, handler: FusionGeomDigitizer) {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.digitizeRectangle(rect => {
                handler(new OL2Rect(rect));
            });
        }
    }
    digitizePolygon(options: any, handler: FusionGeomDigitizer) {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.digitizePolygon(poly => {
                handler(new OL2Geom(poly));
            });
        }
    }
    digitizeCircle(options: any, handler: FusionGeomDigitizer) {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.digitizeCircle(circ => {
                handler(FusionWidgetApiShim.toOL2Circle(circ));
            });
        }
    }
}

interface FusionSelectedLayer {
    legendLabel: string;
    layerName: string;
}

/**
 * This class emulates the Fusion map widget API
 */
class FusionMapApiShim {
    constructor(private parent: ViewerApiShim, private map: RuntimeMap, private selectionSet: QueryMapFeaturesResponse | undefined) { }


}

export class AjaxViewerLineStringOrPolygon {
    private coordinates: IAjaxViewerPoint[];
    constructor(coordinates: IAjaxViewerPoint[]) {
        this.coordinates = coordinates;
    }
    public get Count(): number { return this.coordinates.length; }
    public Point(i: number): IAjaxViewerPoint {
        const pt = this.coordinates[i];
        return pt;
    }
}

export interface IAjaxViewerRect {
    Point1: IAjaxViewerPoint;
    Point2: IAjaxViewerPoint;
}

export interface IAjaxViewerCircle {
    Center: IAjaxViewerPoint;
    Radius: number;
}

export interface IAjaxViewerPoint {
    X: number;
    Y: number;
}

export interface IAjaxViewerLayer {
    legend: string;
    name: string;
    objectid: string;
}

export interface IAjaxViewerBounds {
    minx: number;
    miny: number;
    maxx: number;
    maxy: number;
}

export enum AjaxViewerMapActionCode {
    PanMode = 1,
    PanUp = 2,
    PanDown = 3,
    PanRight = 4,
    PanLeft = 5,
    ZoomMode = 6,
    ZoomIn = 7,
    ZoomOut = 8,
    ZoomRect = 9,
    ZoomSelection = 10,
    ZoomExtents = 11,
    PrevView = 12,
    NextView = 13,
    InitialView = 14,
    SelectionMode = 15,
    SelectRadius = 16,
    SelectPolygon = 17,
    ClearSelection = 19,
    RefreshMap = 20,
    CopyMap = 21,
    About = 22
}

export type IAjaxViewerSelectionSet = any;

export interface IViewerApiShimProps {

}

export interface IViewerApiShimState {
    map: RuntimeMap;
    selectionSet: QueryMapFeaturesResponse;
}

export interface IViewerApiShimDispatch {
    goHome: () => void;
    legendRefresh: () => void;
    invokeCommand: (cmd: ICommand) => void;
}

function mapStateToProps(state: IApplicationState): Partial<IViewerApiShimState> {
    let map;
    let selectionSet;
    if (state.config.activeMapName) {
        map = state.mapState[state.config.activeMapName].runtimeMap;
        selectionSet = state.mapState[state.config.activeMapName].selectionSet;
    }
    return {
        map: map,
        selectionSet: selectionSet
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IViewerApiShimDispatch {
    return {
        goHome: () => dispatch(TaskPaneActions.goHome()),
        legendRefresh: () => dispatch(LegendActions.refresh()),
        invokeCommand: (cmd) => dispatch(MapActions.invokeCommand(cmd))
    };
}

export type ViewerApiShimProps = IViewerApiShimProps & Partial<IViewerApiShimState> & Partial<IViewerApiShimDispatch>;

export type SelectionHandlerCallback = (mapName: string, selection: QueryMapFeaturesResponse | undefined) => void;

@connect(mapStateToProps, mapDispatchToProps)
export class ViewerApiShim extends React.Component<ViewerApiShimProps, any> {
    private fnFormFrameMounted: (component: FormFrameShim) => void;
    private userSelectionHandlers: SelectionHandlerCallback[];
    private us: boolean;
    private formFrame: FormFrameShim;
    private ol2API: OL2Shim;
    private fusionAPI: FusionApiShim;
    private fusionEventHandlers: { [id: number]: Function[] };
    constructor(props: ViewerApiShimProps) {
        super(props);
        this.us = true;
        this.fnFormFrameMounted = this.onFormFrameMounted.bind(this);
        this.userSelectionHandlers = [];
        this.fusionEventHandlers = {};
        this.ol2API = new OL2Shim();
        this.fusionAPI = new FusionApiShim(this);
    }
    private onFormFrameMounted(form: FormFrameShim) {
        this.formFrame = form;
    }
    // ------------------------ Fusion API support ----------------------- //
    public registerForEvent(eventID: number, callback: Function): void {
        logger.debug(`Fusion registerForEvent - ${eventID}`);
        if (!this.fusionEventHandlers[eventID]) {
            this.fusionEventHandlers[eventID] = [];
        }
        this.fusionEventHandlers[eventID].push(callback);
    }
    public deregisterForEvent(eventID: number, callback: Function): void {
        logger.debug(`Fusion deregisterForEvent - ${eventID}`);
        if (this.fusionEventHandlers[eventID]) {
            const funcs = this.fusionEventHandlers[eventID].filter(f => f != callback);
            this.fusionEventHandlers[eventID] = funcs;
        } else {
            logger.debug(`No callbacks registered for fusion event - ${eventID}`);
        }
    }
    private fusionSelectionHandler(mapName: string, selection: QueryMapFeaturesResponse | undefined) {
        const eventID = selection ? this.fusionAPI.Event.MAP_SELECTION_ON : this.fusionAPI.Event.MAP_SELECTION_OFF;
        if (this.fusionEventHandlers[eventID]) {
            for (const cb of this.fusionEventHandlers[eventID]) {
                cb();
            }
        }
    }
    // ------------------------ Map Frame -------------------------------- //

    /**
     * Indicates if the map frame is ready
     *
     * Although this not part of the "public" API, most AJAX viewer examples test for this
     * flag anyways, so we might as well emulate it here
     */
    public get mapInit(): boolean {
        if (this.props.map) {
            return this.props.map.SessionId != null;
        }
        return false;
    }
    public ExecuteMapAction(code: AjaxViewerMapActionCode) {
        let cmdName: string;
        switch (code) {
            case AjaxViewerMapActionCode.About:
                cmdName = DefaultCommands.About;
                break;
            case AjaxViewerMapActionCode.ClearSelection:
                cmdName = DefaultCommands.ClearSelection;
                break;
            case AjaxViewerMapActionCode.InitialView:
                cmdName = DefaultCommands.ZoomExtents;
                break;
            case AjaxViewerMapActionCode.NextView:
                cmdName = DefaultCommands.NextView;
                break;
            case AjaxViewerMapActionCode.PanDown:
                cmdName = DefaultCommands.PanDown;
                break;
            case AjaxViewerMapActionCode.PanLeft:
                cmdName = DefaultCommands.PanLeft;
                break;
            case AjaxViewerMapActionCode.PanMode:
                cmdName = DefaultCommands.Pan;
                break;
            case AjaxViewerMapActionCode.PanRight:
                cmdName = DefaultCommands.PanRight;
                break;
            case AjaxViewerMapActionCode.PanUp:
                cmdName = DefaultCommands.PanUp;
                break;
            case AjaxViewerMapActionCode.PrevView:
                cmdName = DefaultCommands.PreviousView;
                break;
            case AjaxViewerMapActionCode.RefreshMap:
                cmdName = DefaultCommands.RefreshMap;
                break;
            case AjaxViewerMapActionCode.SelectionMode:
                cmdName = DefaultCommands.Select;
                break;
            case AjaxViewerMapActionCode.SelectPolygon:
                cmdName = DefaultCommands.SelectPolygon;
                break;
            case AjaxViewerMapActionCode.SelectRadius:
                cmdName = DefaultCommands.SelectRadius;
                break;
            case AjaxViewerMapActionCode.ZoomExtents:
                cmdName = DefaultCommands.ZoomExtents;
                break;
            case AjaxViewerMapActionCode.ZoomIn:
                cmdName = DefaultCommands.ZoomIn;
                break;
            case AjaxViewerMapActionCode.ZoomMode:
                cmdName = DefaultCommands.Zoom;
                break;
            case AjaxViewerMapActionCode.ZoomOut:
                cmdName = DefaultCommands.ZoomOut;
                break;
            case AjaxViewerMapActionCode.ZoomRect:
                cmdName = DefaultCommands.Zoom;
                break;
            case AjaxViewerMapActionCode.ZoomSelection:
                cmdName = DefaultCommands.ZoomToSelection;
                break;
            default:
                logger.warn(`Unknown command code: ${code}`);
                return;
        }
        const cmd = getCommand(cmdName);
        if (cmd && this.props.invokeCommand) {
            this.props.invokeCommand(cmd);
        }
    }
    public ClearSelection(): void {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.clearSelection();
        }
    }
    public DigitizeCircle(handler: (circle: IAjaxViewerCircle) => void): void {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.digitizeCircle(circle => {
                const center = circle.getCenter();
                const radius = circle.getRadius();
                handler({
                    Center: {
                        X: center[0],
                        Y: center[1]
                    },
                    Radius: radius
                });
            });
        }
    }
    public DigitizeLine(handler: (geom: AjaxViewerLineStringOrPolygon) => void): void {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.digitizeLine(line => {
                const coords = line.getCoordinates().map<IAjaxViewerPoint>(coord => {
                    return {
                        X: coord[0],
                        Y: coord[1]
                    };
                });
                handler(new AjaxViewerLineStringOrPolygon(coords));
            });
        }
    }
    public DigitizePoint(handler: (geom: IAjaxViewerPoint) => void): void {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.digitizePoint(pt => {
                const coords = pt.getCoordinates();
                handler({ X: coords[0], Y: coords[1] });
            });
        }
    }
    public DigitizePolygon(handler: (geom: AjaxViewerLineStringOrPolygon) => void): void {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.digitizePolygon(poly => {
                //Our API isn't expected to allow drawing polygons with holes, so the first (outer) ring
                //is what we're after
                const ring = poly.getLinearRing(0);
                const coords = ring.getCoordinates().map<IAjaxViewerPoint>(coord => {
                    return {
                        X: coord[0],
                        Y: coord[1]
                    };
                });
                handler(new AjaxViewerLineStringOrPolygon(coords));
            });
        }
    }
    public DigitizeLineString(handler: (geom: AjaxViewerLineStringOrPolygon) => void): void {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.digitizeLineString(line => {
                const coords = line.getCoordinates().map<IAjaxViewerPoint>(coord => {
                    return {
                        X: coord[0],
                        Y: coord[1]
                    };
                });
                handler(new AjaxViewerLineStringOrPolygon(coords));
            });
        }
    }
    public DigitizeRectangle(handler: (geom: IAjaxViewerRect) => void): void {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.digitizeRectangle(rect => {
                const extent = rect.getExtent();
                handler({
                    Point1: {
                        X: extent[0],
                        Y: extent[1]
                    },
                    Point2: {
                        X: extent[2],
                        Y: extent[3]
                    }
                });
            });
        }
    }
    public GetCenter(): IAjaxViewerPoint | null {
        const viewer = Runtime.getViewer();
        if (viewer) {
            const view = viewer.getCurrentView();
            return { X: view.x, Y: view.y };
        }
        return null;
    }
    public GetLayers(onlyVisible: boolean, onlySelectable: boolean): IAjaxViewerLayer[] {
        const selLayers: IAjaxViewerLayer[] = [];
        const { map, selectionSet } = this.props;
        if (map && selectionSet && selectionSet.FeatureSet) {
            const fset: FeatureSet = selectionSet.FeatureSet;
            const ids = fset.Layer.map(l => l["@id"]);
            if (map.Layer) {
                for (const layer of map.Layer) {
                    if (ids.indexOf(layer.ObjectId) >= 0) {
                        if (onlyVisible === true && layer.Visible === true) {
                            selLayers.push({ legend: layer.LegendLabel, name: layer.Name, objectid: layer.ObjectId });
                        }
                        if (onlySelectable === true && layer.Selectable === true) {
                            selLayers.push({ legend: layer.LegendLabel, name: layer.Name, objectid: layer.ObjectId });
                        }
                    }
                }
            }
        }
        return selLayers;
    }
    public GetMetersPerUnit(): number | null {
        const viewer = Runtime.getViewer();
        if (viewer) {
            return viewer.getMetersPerUnit();
        }
        return null;
    }
    public GetMapHeight(): number {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetMapHeight()`);
    }
    public GetMapName(): string | undefined {
        if (this.props.map) {
            return this.props.map.Name;
        }
        return undefined;
    }
    public GetMapUnitsType(): string {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetMapUnitsType()`);
    }
    public GetMapWidth(): string {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetMapWidth()`);
    }
    public GetScale(): number | null {
        const viewer = Runtime.getViewer();
        if (viewer) {
            const view = viewer.getCurrentView();
            return view.scale;
        }
        return null;
    }
    public GetSelectedLayers(): IAjaxViewerLayer[] {
        const selLayers: IAjaxViewerLayer[] = [];
        const { map, selectionSet } = this.props;
        if (map && selectionSet && selectionSet.FeatureSet) {
            const fset: FeatureSet = selectionSet.FeatureSet;
            const ids = fset.Layer.map(l => l["@id"]);
            if (map.Layer) {
                for (const layer of map.Layer) {
                    if (ids.indexOf(layer.ObjectId) >= 0) {
                        selLayers.push({ legend: layer.LegendLabel, name: layer.Name, objectid: layer.ObjectId });
                    }
                }
            }
        }
        return selLayers;
    }
    public GetSelectionXML(): string {
        const { selectionSet } = this.props;
        if (!selectionSet || !selectionSet.FeatureSet) {
            return "";
        } else {
            return buildSelectionXml(selectionSet.FeatureSet);
        }
    }
    public GetSessionId(): string | undefined {
        if (this.props.map) {
            return this.props.map.SessionId;
        }
        return undefined;
    }
    public GetSelectedBounds(): IAjaxViewerBounds | null {
        let bounds: IAjaxViewerBounds | null = null;
        const { selectionSet } = this.props;
        if (selectionSet && selectionSet.SelectedFeatures) {
            const fset: SelectedFeatureSet = selectionSet.SelectedFeatures;
            fset.SelectedLayer.forEach(layer => {
                layer.Feature.forEach(feature => {
                    const bbox = feature.Bounds.split(" ").map(s => parseFloat(s));
                    if (bounds == null) {
                        bounds = { minx: bbox[0], miny: bbox[1], maxx: bbox[2], maxy: bbox[3] };
                    } else {
                        if (bbox[0] < bounds.minx)
                            bounds.minx = bbox[0];
                        if (bbox[1] < bounds.miny)
                            bounds.miny = bbox[1];
                        if (bbox[2] > bounds.maxx)
                            bounds.maxx = bbox[2];
                        if (bbox[3] > bounds.maxy)
                            bounds.maxy = bbox[3];
                    }
                });
            });
        }
        return bounds;
    }
    public GetSelectedCount(): number {
        let count = 0;
        const { selectionSet } = this.props;
        if (selectionSet && selectionSet.FeatureSet) {
            const fset: FeatureSet = selectionSet.FeatureSet;
            fset.Layer.forEach(layer => {
                layer.Class.ID.forEach(element => {
                    count++;
                });
            });
        }
        return count;
    }
    public GetSelectedFeatures(): IAjaxViewerSelectionSet {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetSelectedFeatures()`);
    }
    public IsDigitizing(): boolean {
        const viewer = Runtime.getViewer();
        if (viewer) {
            return viewer.isDigitizing();
        } else {
            return false;
        }
    }
    public IsEnglishUnits(): boolean {
        return this.us;
    }
    public IsLatLongDisplayUnits(): boolean {
        return true; //This is what the AJAX viewer returns
    }
    public MapUnitsToLatLon(x: number, y: number): IAjaxViewerPoint {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.MapUnitsToLatLon(x, y)`);
    }
    public Refresh(): void {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.refreshMap(RefreshMode.LayersOnly | RefreshMode.SelectionOnly);
        }
        if (this.props.legendRefresh) {
            this.props.legendRefresh();
        }
    }
    public ScreenToMapUnits(x: number, y: number): IAjaxViewerPoint {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.ScreenToMapUnits(x, y)`);
    }
    public SetEnglishUnits(usEnglish: boolean): void {
        this.us = usEnglish;
    }
    public SetLatLongDisplayUnits(latLon: boolean): void {
        //This is what the AJAX viewer does
    }
    public SetSelectionXML(xmlSet: string): void {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.setSelectionXml(xmlSet);
        }
    }
    public ZoomToView(x: number, y: number, scale: number, refresh: boolean) {
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.zoomToView(x, y, scale);
        }
    }
    //This isn't in the AJAX Viewer API reference, but there are samples referencing it!
    public ZoomToScale(scale: number): void {
        const viewer = Runtime.getViewer();
        if (viewer) {
            const view = viewer.getCurrentView();
            viewer.zoomToView(view.x, view.y, scale);
        }
    }
    //Form frame
    public Submit(url: string, params: string[], frameTarget: string) {
        this.formFrame.submit(url, params, frameTarget);
    }

    public goHome(): void {
        if (this.props.goHome) {
            this.props.goHome();
        }
        //const taskPane = this.app.getTaskPane();
        //if (taskPane) {
        //    taskPane.goHome();
        //}
    }

    private RegisterSelectionHandler(handler: SelectionHandlerCallback): number {
        this.userSelectionHandlers.push(handler);
        return this.userSelectionHandlers.length;
    }

    private UnregisterSelectionHandler(handler: SelectionHandlerCallback): number {
        this.userSelectionHandlers = this.userSelectionHandlers.filter(h => h != handler);
        return this.userSelectionHandlers.length;
    }

    private installShims(browserWindow: any) {
        browserWindow.Fusion = this.fusionAPI;
        browserWindow.OpenLayers = this.ol2API;

        browserWindow.GetMapFrame = browserWindow.GetMapFrame || (() => this);
        //NOTE: mapFrame is technically not part of the "public" API for the AJAX viewer, but since most examples test
        //for this in place of GetMapFrame(), we might as well emulate it here
        browserWindow.mapFrame = browserWindow.GetMapFrame();
        browserWindow.formFrame = browserWindow.mapFrame;

        browserWindow.ExecuteMapAction = browserWindow.ExecuteMapAction || ((code: any) => this.ExecuteMapAction(code));
        browserWindow.Refresh = browserWindow.Refresh || (() => this.Refresh());
        browserWindow.SetSelectionXML = browserWindow.SetSelectionXML || ((xmlSet: string) => this.SetSelectionXML(xmlSet));
        browserWindow.ZoomToView = browserWindow.ZoomToView || ((x: number, y: number, scale: number, refresh: boolean) => this.ZoomToView(x, y, scale, refresh));
        browserWindow.GotoHomePage = browserWindow.GotoHomePage || (() => this.goHome());

        // ======= Extended Viewer API ========== //
        browserWindow.GetViewerInterface = browserWindow.GetViewerInterface || (() => Runtime.getViewer());
        browserWindow.RegisterSelectionHandler = browserWindow.RegisterSelectionHandler || ((handler: SelectionHandlerCallback) => this.RegisterSelectionHandler(handler));
        browserWindow.UnregisterSelectionHandler = browserWindow.UnregisterSelectionHandler || ((handler: SelectionHandlerCallback) => this.UnregisterSelectionHandler(handler));
    }
    componentDidMount() {
        //Install shims into browser window
        let browserWindow: any = window;
        this.installShims(browserWindow);
        this.installShims(window.parent);

        this.RegisterSelectionHandler((mapName: string, selection: QueryMapFeaturesResponse | undefined) => {
            this.fusionSelectionHandler(mapName, selection);
        });
    }
    componentWillReceiveProps(nextProps: ViewerApiShimProps) {
        if (nextProps.map) {
            for (const handler of this.userSelectionHandlers) {
                handler(nextProps.map.Name, nextProps.selectionSet);
            }
        }
    }
    render(): JSX.Element {
        //This is for all intents and purposes, a "background" component. There is no real DOM representation
        return <div>
            <FormFrameShim ref={this.fnFormFrameMounted} />
        </div>;
    }
}