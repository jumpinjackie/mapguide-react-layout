import * as React from "react";
import {
    IExternalBaseLayer,
    IMapViewer,
    RefreshMode,
    ActiveMapTool,
    DigitizerCallback,
    MapViewerBase
} from "./map-viewer-base";
import * as Contracts from '../api/contracts';
import { ClientKind } from '../api/client';
import { areNumbersEqual } from '../utils/number';
import * as logger from '../utils/logger';
import { MgError } from '../api/error';
import {
    IMapView,
    IMapViewerContext,
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
    onViewChanged?: (view: IMapView) => void;
    onRequestSelectableLayers?: () => string[];
    onSelectionChange?: (selectionSet: any) => void;
    onMouseCoordinateChanged?: (coords: number[]) => void;
}

export class MapViewer extends React.Component<IMapViewerProps, any>
    implements IMapViewer, IMapViewerContext {
    private inner: MapViewerBase;
    private fnMapViewerMounted: (component) => void;
    private fnViewChanged: (view: IMapView) => void;
    context: IApplicationContext;
    constructor(props) {
        super(props);
        this.fnMapViewerMounted = this.onMapViewerMounted.bind(this);
        this.fnViewChanged = this.onViewChanged.bind(this);
        this.state = this.buildInitialState(props);
    }
    private onMapViewerMounted(component) {
        this.inner = component;
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
                              onViewChanged={this.fnViewChanged}
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
    private onViewChanged(view: IMapView): void {
        const state = this._pushView(view);
        state.view = {
            x: view.x,
            y: view.y,
            scale: view.scale
        };
        this.setState(state);
        this.props.onViewChanged(view);
    }
    private _pushView(view: IMapView): any {
        const currentView = this.getView();
        //Short-circuit: Don't bother recording identical or insignificantly different views
        if (currentView != null &&
            areNumbersEqual(view.x, currentView.x) &&
            areNumbersEqual(view.y, currentView.y) &&
            areNumbersEqual(view.scale, currentView.scale)) {
            //logger.debug(`New view (${view.x}, ${view.y}, ${view.scale}) is same or near-identical to previous view (${currentView.x}, ${currentView.y}, ${currentView.scale}). Not pushing to nav stack`);
            return this.state;
        }
        const state = this.state;
        state.navigationStack.push(view);
        return state;
    }
    // ----------------- IMapViewer --------------------- //
    zoomToView(x: number, y: number, scale: number): void {        
        this.onViewChanged({ x: x, y: y, scale: scale });
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
    zoomToExtent(extent: number[]): void {
        this.inner.zoomToExtent(extent);
    }
    isFeatureTooltipEnabled(): boolean {
        return this.state.featureTooltipsEnabled;
    }
    setFeatureTooltipEnabled(enabled: boolean): void {
        this.setState({ featureTooltipsEnabled: enabled });
    }
    // ---------------------- IMapViewerContext --------------------- //
    public getView(): IMapView {
        const stack = this.state.navigationStack;
        if (stack && stack.length > 0) {
            return stack[stack.length - 1];
        } else {
            return null;
        }
    }
    public pushView(view: IMapView): void {
        const state = this._pushView(view);
        this.setState(state);
        if (this.props.onViewChanged != null) {
            this.props.onViewChanged(view);
        }
    }
    public popView(): IMapView {
        const state = this.state;
        const view = state.navigationStack.pop();
        this.setState(state);
        return view;
    }
    public setLayerVisibility(layerId: string, visible: boolean): void {
        const changes = assign({}, this.state.layerGroupVisibility);
        if (visible) {
            //Remove from hidelayers if previously set
            changes.hideLayers = changes.hideLayers.filter(id => id != layerId);
            changes.showLayers.push(layerId);
        } else {
            //Remove from showlayers if previously set
            changes.showLayers = changes.showLayers.filter(id => id != layerId);
            changes.hideLayers.push(layerId);
        }
        this.setState({ layerGroupVisibility: changes });
        //this.refreshOnStateChange();
    }
    public setGroupVisibility(groupId: string, visible: boolean): void {
        const changes = assign({}, this.state.layerGroupVisibility);
        if (visible) {
            //Remove from hideGroups if previously set
            changes.hideGroups = changes.hideGroups.filter(id => id != groupId);
            changes.showGroups.push(groupId);
        } else {
            //Remove from showGroups if previously set
            changes.showGroups = changes.showGroups.filter(id => id != groupId);
            changes.hideGroups.push(groupId);
        }
        this.setState({ layerGroupVisibility: changes });
        //this.refreshOnStateChange();
    }
}