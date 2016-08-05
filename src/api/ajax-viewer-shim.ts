import { Application } from "../components/app-layout";
import { RefreshMode } from "../components/map-viewer";
import { MgError } from "./error";
import * as logger from "../utils/logger";
import { RuntimeMap } from "./contracts/runtime-map";
import { FeatureSet, SelectedFeatureSet } from "./contracts/query";
import { RuntimeMapFeatureFlags } from "./request-builder";

class AjaxViewerLineStringOrPolygon {
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

interface IAjaxViewerRect {
    Point1: IAjaxViewerPoint;
    Point2: IAjaxViewerPoint;
}

interface IAjaxViewerCircle {
    Center: IAjaxViewerPoint;
    Radius: number;
}

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
        const viewer = this.app.getViewer();
        if (viewer) {
            viewer.clearSelection();
        }
    }
    public DigitizeCircle(handler: (circle: IAjaxViewerCircle) => void): void {
        const viewer = this.app.getViewer();
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
    public DigitizeLine(handler: (geom: AjaxViewerLineStringOrPolygon) => void): void {
        const viewer = this.app.getViewer();
        viewer.digitizeLine(line => {
            const coords = line.getCoordinates().map<IAjaxViewerPoint>(coord => {
                return {
                    X: coord[0],
                    Y: coord[1]
                }
            });
            handler(new AjaxViewerLineStringOrPolygon(coords));
        });
    }
    public DigitizePoint(handler: (geom: IAjaxViewerPoint) => void): void {
        const viewer = this.app.getViewer();
        viewer.digitizePoint(pt => {
            const coords = pt.getCoordinates();
            handler({ X: coords[0], Y: coords[1] });
        });
    }
    public DigitizePolygon(handler: (geom: AjaxViewerLineStringOrPolygon) => void): void {
        const viewer = this.app.getViewer();
        viewer.digitizePolygon(poly => {
            //Our API isn't expected to allow drawing polygons with holes, so the first (outer) ring
            //is what we're after
            const ring = poly.getLinearRing(0);
            const coords = ring.getCoordinates().map<IAjaxViewerPoint>(coord => {
                return {
                    X: coord[0],
                    Y: coord[1]
                }
            });
            handler(new AjaxViewerLineStringOrPolygon(coords));
        });
    }
    public DigitizeLineString(handler: (geom: AjaxViewerLineStringOrPolygon) => void): void {
        const viewer = this.app.getViewer();
        viewer.digitizeLineString(line => {
            const coords = line.getCoordinates().map<IAjaxViewerPoint>(coord => {
                return {
                    X: coord[0],
                    Y: coord[1]
                }
            });
            handler(new AjaxViewerLineStringOrPolygon(coords));
        });
    }
    public DigitizeRectangle(handler: (geom: IAjaxViewerRect) => void): void {
        const viewer = this.app.getViewer();
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
            })
        });
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
    public GetMetersPerUnit(): number {
        const viewer = this.app.getViewer();
        if (viewer) {
            return viewer.getMetersPerUnit();
        }
        return null;
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
        let bounds: IAjaxViewerBounds = null;
        const selection = this.app.state.selection;
        if (selection && selection.SelectedFeatures) {
            const fset: SelectedFeatureSet = selection.SelectedFeatures;
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
        const selection = this.app.state.selection;
        if (selection && selection.FeatureSet) {
            const fset: FeatureSet = selection.FeatureSet;
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
        const viewer = this.app.getViewer();
        return viewer.isDigitizing();
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
        const client = this.app.getClient();
        client.describeRuntimeMap({
            mapname: this.app.getMapName(),
            session: this.app.getSession(),
            requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups
        }).then(res => {
            //TODO: Yeah yeah, shouldn't directly mess with other component's states
            this.app.setState({ runtimeMap: res });
        }).catch(err => {
            //TODO: Yeah yeah, shouldn't directly mess with other component's states
            this.app.setState({ runtimeMap: null, error: err });
        });
    }
    public goHome(): void {
        const taskPane = this.app.getTaskPane();
        if (taskPane) {
            taskPane.goHome();
        }
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
        browserWindow.GotoHomePage = browserWindow.GotoHomePage || (() => shim.goHome());
    }
}