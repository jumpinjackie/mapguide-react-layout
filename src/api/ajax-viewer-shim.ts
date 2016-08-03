import { Application } from "../components/app-layout";
import { RefreshMode } from "../components/map-viewer";
import { MgError } from "./error";
import * as logger from "../utils/logger";
import { RuntimeMap } from "./contracts/runtime-map";
import { FeatureSet } from "./contracts/query";

interface IAjaxViewerPoint {
    X: number;
    Y: number;
}

interface IAjaxViewerLayer {
    legend: string;
    name: string;
    objectid: string;
}

interface IAjaxViewerBounds {
    minx: number;
    miny: number;
    maxx: number;
    maxy: number;
}

type IAjaxViewerSelectionSet = any;

export class MapShim {
    private app: Application;
    constructor(app: Application) {
        this.app = app;
    }
    /**
     * Indicates if the map frame is ready
     * 
     * Although this not part of the "public" API, most AJAX viewer examples test for this
     * flag anyways, so we might as well emulate it here
     */
    public get mapInit(): boolean {
        return this.app.getSession() != null;
    }
    public ClearSelection(): void {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.ClearSelection()`);
    }
    public DigitizeCircle(handler): void {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.DigitizeCircle(handler)`);
    }
    public DigitizeLine(handler): void {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.DigitizeLine(handler)`);
    }
    public DigitizePoint(handler): void {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.DigitizePoint(handler)`);
    }
    public DigitizePolygon(handler): void {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.DigitizePolygon(handler)`);
    }
    public DigitizeLineString(handler): void {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.DigitizeLineString(handler)`);
    }
    public DigitizeRectangle(handler): void {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.DigitizeRectangle(handler)`);
    }
    public GetCenter(): IAjaxViewerPoint {
        const viewer = this.app.getViewer();
        if (viewer) {
            const view = viewer.getView();
            return { X: view.x, Y: view.y };
        }
        return null;
    }
    public GetLayers(onlyVisible: boolean, onlySelectable: boolean): IAjaxViewerLayer[] {
        const selLayers: IAjaxViewerLayer[] = [];
        const map: RuntimeMap = this.app.state.runtimeMap;
        const selection = this.app.state.selection;
        if (map && selection && selection.FeatureSet) {
            const fset: FeatureSet = selection.FeatureSet;
            const ids = fset.Layer.map(l => l["@id"]);
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
        return selLayers;
    }
    public GetMapHeight(): number {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetMapHeight()`);
    }
    public GetMapName(): string {
        return this.app.getMapName();
    }
    public GetMapUnitsType(): string {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetMapUnitsType()`);
    }
    public GetMapWidth(): string {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetMapWidth()`);
    }
    public GetScale(): number {
        const viewer = this.app.getViewer();
        if (viewer) {
            const view = viewer.getView();
            return view.scale;
        }
        return null;
    }
    public GetSelectedLayers(): IAjaxViewerLayer[] {
        const selLayers: IAjaxViewerLayer[] = [];
        const map: RuntimeMap = this.app.state.runtimeMap;
        const selection = this.app.state.selection;
        if (map && selection && selection.FeatureSet) {
            const fset: FeatureSet = selection.FeatureSet;
            const ids = fset.Layer.map(l => l["@id"]);
            for (const layer of map.Layer) {
                if (ids.indexOf(layer.ObjectId) >= 0) {
                    selLayers.push({ legend: layer.LegendLabel, name: layer.Name, objectid: layer.ObjectId });
                }
            }
        }
        return selLayers;
    }
    public GetSelectionXML(): string {
        return this.app.getSelectionXml();
    }
    public GetSessionId(): string {
        return this.app.getSession();
    }
    public GetSelectedBounds(): IAjaxViewerBounds {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetSelectedBounds()`);
    }
    public GetSelectedCount(): number {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetSelectedCount()`);
    }
    public GetSelectedFeatures(): IAjaxViewerSelectionSet {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetSelectedFeatures()`);
    }
    public IsDigitizing(): boolean {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.IsDigitizing()`);
    }
    public IsEnglishUnits(): boolean {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.IsEnglishUnits()`);
    }
    public IsLatLonDisplayUnits(): boolean {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.IsLatLonDisplayUnits()`);
    }
    public MapUnitsToLatLon(x: number, y: number): IAjaxViewerPoint {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.MapUnitsToLatLon(x, y)`);
    }
    public Refresh(): void {
        const viewer = this.app.getViewer();
        viewer.refreshMap(RefreshMode.LayersOnly | RefreshMode.SelectionOnly);
    }
    public ScreenToMapUnits(x: number, y: number): IAjaxViewerPoint {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.ScreenToMapUnits(x, y)`);
    }
    public SetEnglishUnits(usEnglish: boolean): void {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.SetEnglishUnits(usEnglish)`);
    }
    public SetLatLongDisplayUnits(latLon: boolean): void {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.SetLatLongDisplayUnits(latLon)`);
    }
    public SetSelectionXML(xmlSet): void {
        const viewer = this.app.getViewer();
        viewer.setSelectionXml(xmlSet);
    }
    public ZoomToView(x: number, y: number, scale: number, refresh: boolean) {
        const viewer = this.app.getViewer();
        viewer.zoomToView(x, y, scale);
    }
    //This isn't in the AJAX Viewer API reference, but there are samples referencing it!
    public ZoomToScale(scale: number): void {
        const viewer = this.app.getViewer();
        const view = viewer.getView();
        viewer.zoomToView(view.x, view.y, scale);
    }
    //Form frame
    public Submit(url: string, params: string[], frameTarget: string) {
        this.app.submitForm(url, params, frameTarget);
    }
}

/**
 * This presents a shim API that mimics the viewer API provided by the AJAX viewer  
 * 
 * @export
 * @class AjaxViewerShim
 */
export class AjaxViewerShim {
    private app: Application;
    private map: MapShim;
    constructor(app: Application) {
        this.map = new MapShim(app);
        this.app = app;
    }
    public getMapShim(): MapShim {
        return this.map;
    }
    public fullRefresh(): void {
        this.map.Refresh();
        logger.warn("TODO: Refresh legend as well");
    }
    /**
     * Installs the AJAX viewer shim APIs 
     * 
     * @static
     * @param {*} browserWindow
     * @param {Application} app
     */
    public static install(browserWindow: any, app: Application) {
        const shim = new AjaxViewerShim(app);
        const map = shim.getMapShim();
        //NOTE: A top-level window's parent is itself, what this means is we just need to emulate all the accessible
        //functions in the AJAX viewer API at the browser window. No matter how many parents the Task Pane JS walks
        //up, as long as we emulate the functions it's expecting at that particular "frame" in the browser window, 
        //things should still be fine
        
        browserWindow.GetMapFrame = browserWindow.GetMapFrame || (() => map);
        //NOTE: mapFrame is technically not part of the "public" API for the AJAX viewer, but since most examples test
        //for this in place of GetMapFrame(), we might as well emulate it here
        browserWindow.mapFrame = browserWindow.GetMapFrame();
        browserWindow.formFrame = browserWindow.mapFrame;

        browserWindow.Refresh = browserWindow.Refresh || (() => shim.fullRefresh());
        browserWindow.SetSelectionXML = browserWindow.SetSelectionXML || ((xmlSet) => map.SetSelectionXML(xmlSet));
        browserWindow.ZoomToView = browserWindow.ZoomToView || ((x, y, scale, refresh) => map.ZoomToView(x, y, scale, refresh)); 
    }
}