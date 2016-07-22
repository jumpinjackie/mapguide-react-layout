import { Application } from "../components/app-layout";
import { MgError } from "./error";
import * as logger from "../utils/logger";

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
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetCenter())`);
    }
    public GetLayers(onlyVisible: boolean, onlySelectable: boolean): IAjaxViewerLayer[] {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetLayers(onlyVisible, onlySelectable)`);
    }
    public GetMapHeight(): number {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetMapHeight()`);
    }
    public GetMapName(): string {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetMapName()`);
    }
    public GetMapUnitsType(): string {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetMapUnitsType()`);
    }
    public GetMapWidth(): string {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetMapWidth()`);
    }
    public GetScale(): number {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetScale()`);
    }
    public GetSelectedLayers(): IAjaxViewerLayer[] {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetSelectedLayers()`);
    }
    public GetSelectionXML(): string {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetSelectionXML()`);
    }
    public GetSessionId(): string {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.GetSessionId()`);
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
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.Refresh()`);
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
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.SetSelectionXML(xmlSet)`);
    }
    public ZoomToView(x: number, y: number, scale: number, refresh: boolean) {
        throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.ZoomToView(x, ym scale, refresh)`);
    }
}

/**
 * This presents a shim API that mimics the viewer API provided by the AJAX viewer  
 * 
 * @export
 * @class AjaxViewerShim
 */
export class AjaxViewerShim {
    private map: MapShim;
    constructor(app: Application) {
        this.map = new MapShim(app);
    }
    public getMapShim(): MapShim {
        return this.map;
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
        browserWindow.GetMapFrame = browserWindow.GetMapFrame || (() => map);
        browserWindow.SetSelectionXML = browserWindow.SetSelectionXML || ((xmlSet) => map.SetSelectionXML(xmlSet));
        browserWindow.ZoomToView = browserWindow.ZoomToView || ((x, y, scale, refresh) => map.ZoomToView(x, y, scale, refresh)); 
    }
}