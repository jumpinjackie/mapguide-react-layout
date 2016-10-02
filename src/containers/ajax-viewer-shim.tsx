import * as React from "react";
import { connect } from "react-redux";
import * as Runtime from "../api/runtime";
import * as logger from "../utils/logger";
import { MgError } from "../api/error";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { FeatureSet, SelectedFeatureSet } from "../api/contracts/query";
import { RuntimeMapFeatureFlags } from "../api/request-builder";
import { RefreshMode } from "../api/common";
import * as MapActions from "../actions/map";
import * as TaskPaneActions from "../actions/taskpane";
import * as LegendActions from "../actions/legend";
import { buildSelectionXml } from "../api/builders/deArrayify";
import { FormFrameShim } from "../components/form-frame-shim";

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

interface IAjaxViewerShimProps {

}

interface IAjaxViewerShimState {
    map?: any;
    selection?: any;
}

interface IAjaxViewerShimDispatch {
    goHome?: () => void;
    legendRefresh?: () => void;
}

function mapStateToProps(state: any): IAjaxViewerShimState {
    return {
        map: state.map.state,
        selection: state.selection
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IAjaxViewerShimDispatch {
    return {
        goHome: () => dispatch(TaskPaneActions.goHome()),
        legendRefresh: () => dispatch(LegendActions.refresh())
    };
}

type AjaxViewerShimProps = IAjaxViewerShimProps & IAjaxViewerShimState & IAjaxViewerShimDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class AjaxViewerShim extends React.Component<AjaxViewerShimProps, any> {
    private fnFormFrameMounted: (component: FormFrameShim) => void;
    private us: boolean;
    private formFrame: FormFrameShim;
    constructor(props: AjaxViewerShimProps) {
        super(props);
        this.us = true;
        this.fnFormFrameMounted = this.onFormFrameMounted.bind(this);
    }
    private onFormFrameMounted(form: FormFrameShim) {
        this.formFrame = form;
    }
    // ------------------------ Map Frame -------------------------------- //

    /**
     * Indicates if the map frame is ready
     * 
     * Although this not part of the "public" API, most AJAX viewer examples test for this
     * flag anyways, so we might as well emulate it here
     */
    public get mapInit(): boolean {
        return this.props.map != null && this.props.map.SessionId != null;
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
        const map: RuntimeMap = this.props.map;
        const selection = this.props.selection.selectionSet;
        if (map && selection && selection.FeatureSet) {
            const fset: FeatureSet = selection.FeatureSet;
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
    public GetMapName(): string {
        return this.props.map.Name;
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
        const map: RuntimeMap = this.props.map;
        const selection = this.props.selection.selectionSet;
        if (map && selection && selection.FeatureSet) {
            const fset: FeatureSet = selection.FeatureSet;
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
        const { selection } = this.props;
        if (!selection || !selection.selectionSet || !selection.selectionSet.FeatureSet) {
            return "";
        } else {
            return buildSelectionXml(selection.selectionSet.FeatureSet);
        }
    }
    public GetSessionId(): string {
        return this.props.map.SessionId;
    }
    public GetSelectedBounds(): IAjaxViewerBounds | null {
        let bounds: IAjaxViewerBounds | null = null;
        const selection = this.props.selection.selectionSet;
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
        const selection = this.props.selection.selectionSet;
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
    componentDidMount() {
        //Install shims into browser window
        let browserWindow: any = window;
        browserWindow.GetMapFrame = browserWindow.GetMapFrame || (() => this);
        //NOTE: mapFrame is technically not part of the "public" API for the AJAX viewer, but since most examples test
        //for this in place of GetMapFrame(), we might as well emulate it here
        browserWindow.mapFrame = browserWindow.GetMapFrame();
        browserWindow.formFrame = browserWindow.mapFrame;

        browserWindow.Refresh = browserWindow.Refresh || (() => this.Refresh());
        browserWindow.SetSelectionXML = browserWindow.SetSelectionXML || ((xmlSet: string) => this.SetSelectionXML(xmlSet));
        browserWindow.ZoomToView = browserWindow.ZoomToView || ((x: number, y: number, scale: number, refresh: boolean) => this.ZoomToView(x, y, scale, refresh));
        browserWindow.GotoHomePage = browserWindow.GotoHomePage || (() => this.goHome());
    }
    render(): JSX.Element {
        //This is for all intents and purposes, a "background" component. There is no real DOM representation
        return <div>
            <FormFrameShim ref={this.fnFormFrameMounted} />
        </div>;
    }
}