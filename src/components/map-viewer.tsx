import * as React from "react";
import {
    IMapViewer,
    IMapViewerProps,
    RefreshMode,
    ActiveMapTool,
    DigitizerCallback,
    MapViewerBase
} from "./map-viewer-base";
import {
    IMapView,
    IMapViewerContext,
    IApplicationContext
} from "./context";

export class MapViewer extends React.Component<IMapViewerProps, any>
    implements IMapViewer, IMapViewerContext {
    private inner: MapViewerBase;
    private fnMapViewerMounted: (component) => void;
    context: IApplicationContext;
    constructor(props) {
        super(props);
        this.fnMapViewerMounted = this.onMapViewerMounted.bind(this);
    }
    onMapViewerMounted(component) {
        this.inner = component;
    }
    render(): JSX.Element {
        return <MapViewerBase ref={this.fnMapViewerMounted} {...this.props} />;
    }
    zoomToView(x: number, y: number, scale: number): void {
        this.inner.zoomToView(x, y, scale);
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
        this.inner.setActiveTool(tool);
    }
    getActiveTool(): ActiveMapTool {
        return this.inner.getActiveTool();
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
        return this.inner.isFeatureTooltipEnabled();
    }
    setFeatureTooltipEnabled(enabled: boolean): void {
        this.inner.setFeatureTooltipEnabled(enabled);
    }
    // ---------------------- IMapViewerContext --------------------- //
    getView(): IMapView {
        return this.inner.getView();
    }
    setLayerVisibility(layerId: string, visible: boolean): void {
        this.inner.setLayerVisibility(layerId, visible);
    }
    setGroupVisibility(groupId: string, visible: boolean): void {
        this.inner.setGroupVisibility(groupId, visible);
    }
    pushView(view: IMapView) {
        this.inner.pushView(view);
    }
    popView(): IMapView {
        return this.inner.popView();
    }
}