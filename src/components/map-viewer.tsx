import * as React from "react";
import {
    IExternalBaseLayer,
    IMapViewer,
    RefreshMode,
    ActiveMapTool,
    DigitizerCallback,
    MapViewerBase,
    Bounds,
    Coordinate,
    isBounds
} from "./map-viewer-base";
import * as Contracts from '../api/contracts';
import { ClientKind } from '../api/client';
import { areNumbersEqual } from '../utils/number';
import * as logger from '../utils/logger';
import { MgError } from '../api/error';
import {
    IMapView,
    IApplicationContext
} from "./context";
const assign = require("object-assign");

interface IMapViewerProps {
    map: Contracts.RtMap.RuntimeMap;
    agentUri: string;
    agentKind: ClientKind;
    imageFormat: "PNG" | "PNG8" | "JPG" | "GIF";
    selectionColor?: string;
    stateChangeDebounceTimeout?: number;
    pointSelectionBuffer?: number;
    externalBaseLayers?: IExternalBaseLayer[];
    onRequestZoomToView?: (view: IMapView|Bounds) => void;
    onRequestSelectableLayers?: () => string[];
    onSelectionChange?: (selectionSet: any) => void;
    onMouseCoordinateChanged?: (coords: number[]) => void;
}

export class MapViewer extends React.Component<IMapViewerProps, any>
    implements IMapViewer {
    private inner: MapViewerBase;
    private fnMapViewerMounted: (component) => void;
    private fnRequestZoomToView: (view: IMapView|Bounds) => void;
    private fnBusyLoading: (busyCount) => void;
    constructor(props) {
        super(props);
        this.fnMapViewerMounted = this.onMapViewerMounted.bind(this);
        this.fnRequestZoomToView = this.onRequestZoomToView.bind(this);
        this.fnBusyLoading = this.onBusyLoading.bind(this);
        this.state = this.buildInitialState(props);
    }
    private onMapViewerMounted(component) {
        this.inner = component;
    }
    private onBusyLoading(busyCount) {

    }
    render(): JSX.Element {
        return <MapViewerBase ref={this.fnMapViewerMounted}
                              tool={this.state.tool}
                              map={this.state.map}
                              view={this.state.view}
                              layerGroupVisibility={this.state.layerGroupVisibility}
                              featureTooltipsEnabled={this.state.featureTooltipsEnabled}
                              agentUri={this.props.agentUri}
                              agentKind={this.props.agentKind}
                              imageFormat={this.props.imageFormat}
                              selectionColor={this.state.selectionColor}
                              stateChangeDebounceTimeout={this.props.stateChangeDebounceTimeout}
                              pointSelectionBuffer={this.props.pointSelectionBuffer}
                              externalBaseLayers={this.props.externalBaseLayers}
                              onBusyLoading={this.fnBusyLoading}
                              onRequestZoomToView={this.fnRequestZoomToView}
                              onRequestSelectableLayers={this.props.onRequestSelectableLayers}
                              onSelectionChange={this.props.onSelectionChange}
                              onMouseCoordinateChanged={this.props.onMouseCoordinateChanged} />;
    }
    private buildInitialState(props: IMapViewerProps) {
        const layerMap: any = {};
        const groupMap: any = {};
        return {
            tool: ActiveMapTool.None,
            map: props.map,
            view: [
                props.map.Extents.LowerLeftCoordinate.X,
                props.map.Extents.LowerLeftCoordinate.Y,
                props.map.Extents.UpperRightCoordinate.X,
                props.map.Extents.UpperRightCoordinate.Y
            ],
            selectionColor: props.selectionColor || "0xFF000000", //default to blue
            featureTooltipsEnabled: false,
            navigationStack: [],
            layerGroupVisibility: {
                showLayers: [],
                showGroups: [],
                hideLayers: [],
                hideGroups: []
            }
        };
    }
    private onRequestZoomToView(view: IMapView|Bounds): void {
        const state = this._pushView(view);
        state.view = view;
        this.setState(state);
        this.props.onRequestZoomToView(view);
    }
    private _pushView(view: IMapView|Bounds): any {
        const currentView = this.getView();
        //Short-circuit: Don't bother recording identical or insignificantly different views
        if (currentView != null) {
            if (isBounds(currentView) && isBounds(view)) {
                if (areNumbersEqual(view[0], currentView[0]) &&
                    areNumbersEqual(view[1], currentView[1]) &&
                    areNumbersEqual(view[2], currentView[2]) &&
                    areNumbersEqual(view[3], currentView[3])) {
                    //logger.debug(`New view (${view.x}, ${view.y}, ${view.scale}) is same or near-identical to previous view (${currentView.x}, ${currentView.y}, ${currentView.scale}). Not pushing to nav stack`);
                    return this.state;
                }
            } else if (!isBounds(currentView) && !isBounds(view)) {
                if (areNumbersEqual(view.x, currentView.x) &&
                    areNumbersEqual(view.y, currentView.y) &&
                    areNumbersEqual(view.scale, currentView.scale)) {
                    //logger.debug(`New view (${view.x}, ${view.y}, ${view.scale}) is same or near-identical to previous view (${currentView.x}, ${currentView.y}, ${currentView.scale}). Not pushing to nav stack`);
                    return this.state;
                }
            }
        }
        const state = this.state;
        state.navigationStack.push(view);
        return state;
    }
    // ----------------- IMapViewer --------------------- //
    getScaleForExtent(bounds: Bounds): number {
        return this.inner.getScaleForExtent(bounds);
    }
    getCurrentExtent(): Bounds {
        return this.inner.getCurrentExtent();
    }
    getCurrentView(): IMapView {
        return this.inner.getCurrentView();
    }
    zoomToView(x: number, y: number, scale: number): void {
        this.onRequestZoomToView({ x: x, y: y, scale: scale });
    }
    setSelectionXml(xml: string): void {
        this.inner.setSelectionXml(xml);
    }
    refreshMap(mode?: RefreshMode): void {
        this.inner.refreshMap(mode);
    }
    getMetersPerUnit(): number {
        return this.inner.getMetersPerUnit();
    }
    setActiveTool(tool: ActiveMapTool): void {
        this.setState({ tool: tool });
    }
    getActiveTool(): ActiveMapTool {
        return this.state.tool;
    }
    initialView(): void {
        this.inner.initialView();
    }
    clearSelection(): void {
        this.inner.clearSelection();
    }
    zoomDelta(delta: number): void {
        this.inner.zoomDelta(delta);
    }
    isDigitizing(): boolean {
        return this.isDigitizing();
    }
    digitizePoint(handler: DigitizerCallback<ol.geom.Point>, prompt?: string): void {
        this.inner.digitizePoint(handler, prompt);
    }
    digitizeLine(handler: DigitizerCallback<ol.geom.LineString>, prompt?: string): void {
        this.inner.digitizeLine(handler, prompt);
    }
    digitizeLineString(handler: DigitizerCallback<ol.geom.LineString>, prompt?: string): void {
        this.inner.digitizeLineString(handler, prompt);
    }
    digitizeCircle(handler: DigitizerCallback<ol.geom.Circle>, prompt?: string): void {
        this.inner.digitizeCircle(handler, prompt);
    }
    digitizeRectangle(handler: DigitizerCallback<ol.geom.Polygon>, prompt?: string): void {
        this.inner.digitizeRectangle(handler, prompt);
    }
    digitizePolygon(handler: DigitizerCallback<ol.geom.Polygon>, prompt?: string): void {
        this.inner.digitizePolygon(handler, prompt);
    }
    selectByGeometry(geom: ol.geom.Geometry): void {
        this.inner.selectByGeometry(geom);
    }
    zoomToExtent(extent: Bounds): void {
        this.inner.zoomToExtent(extent);
    }
    isFeatureTooltipEnabled(): boolean {
        return this.state.featureTooltipsEnabled;
    }
    setFeatureTooltipEnabled(enabled: boolean): void {
        this.setState({ featureTooltipsEnabled: enabled });
    }
    // ---------------------- IMapViewerContext --------------------- //
    public getView(): IMapView|Bounds {
        const stack = this.state.navigationStack;
        if (stack && stack.length > 0) {
            return stack[stack.length - 1];
        } else {
            return null;
        }
    }
}