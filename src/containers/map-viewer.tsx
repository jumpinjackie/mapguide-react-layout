import * as React from "react";
import { connect } from "react-redux";
import {
    ICommand,
    IMapView,
    IMapViewer,
    ActiveMapTool,
    RefreshMode,
    DigitizerCallback,
    Bounds,
    Coordinate,
    ReduxDispatch,
    IApplicationState,
    IViewReducerState,
    ILegendReducerState,
    IMapViewerReducerState
} from "../api/common";
import { MapViewerBase } from "../components/map-viewer-base";
import * as Runtime from "../api/runtime";
import { RuntimeMap } from "../api/contracts/runtime-map";
import * as MapActions from "../actions/map";
import { IItem, IMenu } from "../components/toolbar";
import { Client } from "../api/client";
import { QueryMapFeaturesResponse, FeatureSet } from '../api/contracts/query';
import { IQueryMapFeaturesOptions } from '../api/request-builder';
import { buildSelectionXml } from '../api/builders/deArrayify';
import { getCommand, mapToolbarReference,  } from "../api/registry/command";
import { invokeCommand, queryMapFeatures } from "../actions/map";
import { showModalComponent } from "../actions/modal";
import { DefaultComponentNames } from "../api/registry/component";
import { processMenuItems } from "../utils/menu";
import { tr } from "../api/i18n";

export interface IMapViewerContainerProps {
    
}

export interface IMapViewerContainerState {
    config?: any;
    map: RuntimeMap | null;
    selection: QueryMapFeaturesResponse | null;
    view?: any;
    viewer?: IMapViewerReducerState;
    legend?: ILegendReducerState;
    contextmenu?: any;
}

export interface IMapViewerContainerDispatch {
    setCurrentView?: (view: IMapView) => void;
    setBusyCount?: (count: number) => void;
    setMouseCoordinates?: (coord: Coordinate) => void;
    invokeCommand?: (cmd: ICommand) => void;
    showModalComponent?: (options: any) => void;
    queryMapFeatures?: (options: MapActions.QueryMapFeatureActionOptions) => void;
}

function mapStateToProps(state: IApplicationState): IMapViewerContainerState {
    return {
        config: state.config,
        view: state.view,
        map: state.map.state,
        viewer: state.map.viewer,
        legend: state.legend,
        selection: state.selection.selectionSet,
        contextmenu: state.toolbar.contextmenu
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IMapViewerContainerDispatch {
    return {
        setCurrentView: (view) => dispatch(MapActions.setCurrentView(view)),
        setBusyCount: (count) => dispatch(MapActions.setBusyCount(count)),
        setMouseCoordinates: (coord) => dispatch(MapActions.setMouseCoordinates(coord)),
        invokeCommand: (cmd) => dispatch(invokeCommand(cmd)),
        showModalComponent: (options) => dispatch(showModalComponent(options)),
        queryMapFeatures: (options) => dispatch(queryMapFeatures(options))
    };
}

export type MapViewerContainerProps = IMapViewerContainerProps & IMapViewerContainerState & IMapViewerContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class MapViewerContainer extends React.Component<MapViewerContainerProps, any>
    implements IMapViewer {
    private fnMapViewerMounted: (component: MapViewerBase) => void;
    private inner: MapViewerBase;
    private fnRequestZoomToView: (view: IMapView) => void;
    private fnQueryMapFeatures: (options: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void) => void;
    private fnBusyLoading: (busyCount: number) => void;
    private fnMouseCoordinateChanged: (coord: Coordinate) => void;
    private fnSessionExpired: () => void;
    constructor(props: MapViewerContainerProps) {
        super(props);
        this.fnMapViewerMounted = this.onMapViewerMounted.bind(this);
        this.fnRequestZoomToView = this.onRequestZoomToView.bind(this);
        this.fnQueryMapFeatures = this.onQueryMapFeatures.bind(this);
        this.fnBusyLoading = this.onBusyLoading.bind(this);
        this.fnMouseCoordinateChanged = this.onMouseCoordinateChanged.bind(this);
        this.fnSessionExpired = this.onSessionExpired.bind(this);
    }
    static contextTypes: React.ValidationMap<any> = {
        store: React.PropTypes.object
    };
    private onMapViewerMounted(component: MapViewerBase) {
        this.inner = component;
    }
    private onRequestZoomToView(view: IMapView): void {
        if (this.props.setCurrentView) {
            this.props.setCurrentView(view);
        }
    }
    private onQueryMapFeatures(options: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void) {
        if (this.props.queryMapFeatures) {
            this.props.queryMapFeatures({
                options: options,
                append: this.inner.state.shiftKey === true,
                callback: success,
                errBack: failure
            });
        }
    }
    private onBusyLoading(busyCount: number) {
        if (this.props.setBusyCount) {
            this.props.setBusyCount(busyCount);
        }
    }
    private onMouseCoordinateChanged(coord: Coordinate) {
        if (this.props.setMouseCoordinates) {
            this.props.setMouseCoordinates(coord);
        }
    }
    private onSessionExpired() {
        if (this.props.showModalComponent) {
            this.props.showModalComponent({
                modal: {
                    title: tr("SESSION_EXPIRED", this.props.config.locale),
                    backdrop: true
                },
                name: DefaultComponentNames.SessionExpired,
                id: DefaultComponentNames.SessionExpired
            });
        }
    }
    componentWillReceiveProps(nextProps: MapViewerContainerProps) {
        if (this.props.selection != nextProps.selection) {
            this.inner.refreshMap(RefreshMode.SelectionOnly);
        }
    }
    componentDidMount() {
        Runtime.setViewer(this);
        const browserWindow: any = window;
        browserWindow.getViewer = browserWindow.getViewer || Runtime.getViewer;
        browserWindow.getClient = browserWindow.getClient || (() => new Client(this.props.config.agentUri, this.props.config.agentKind));
    }
    render(): JSX.Element {
        const { map, config, viewer, view, legend, contextmenu, invokeCommand } = this.props;
        if (map && config && view && viewer && legend && invokeCommand) {
            const selectableLayerNames = (map.Layer || [])
                .filter(layer => layer.Selectable && legend.selectableLayers[layer.ObjectId] !== false)
                .map(layer => layer.Name);
            const store = (this.context as any).store;
            const items: any[] = contextmenu != null ? contextmenu.items : [];
            const cmitems = items.map(tb => mapToolbarReference(tb, store, invokeCommand));
            const childItems = processMenuItems(cmitems);
            return <MapViewerBase ref={this.fnMapViewerMounted}
                                  map={map} 
                                  agentUri={config.agentUri}
                                  agentKind={config.agentKind}
                                  locale={config.locale}
                                  externalBaseLayers={config.externalBaseLayers}
                                  imageFormat={config.viewer.imageFormat}
                                  selectionImageFormat={config.viewer.selectionImageFormat}
                                  selectionColor={config.viewer.selectionColor}
                                  pointSelectionBuffer={config.viewer.pointSelectionBuffer}
                                  tool={viewer.tool}
                                  featureTooltipsEnabled={viewer.featureTooltipsEnabled}
                                  layerGroupVisibility={viewer.layerGroupVisibility}
                                  view={view.current}
                                  initialView={view.initial}
                                  selectableLayerNames={selectableLayerNames}
                                  contextMenu={childItems}
                                  onSessionExpired={this.fnSessionExpired}
                                  onBusyLoading={this.fnBusyLoading}
                                  onMouseCoordinateChanged={this.fnMouseCoordinateChanged}
                                  onQueryMapFeatures={this.fnQueryMapFeatures}
                                  onRequestZoomToView={this.fnRequestZoomToView} />;
        } else {
            return <div>{tr("LOADING_MSG", config.locale)}</div>;
        }
    }
    // ----------------- IMapViewer --------------------- //
    getViewForExtent(extent: Bounds): IMapView {
        return this.inner.getViewForExtent(extent);
    }
    getCurrentExtent(): Bounds {
        return this.inner.getCurrentExtent();
    }
    getCurrentView(): IMapView {
        return this.inner.getCurrentView();
    }
    zoomToView(x: number, y: number, scale: number): void {
        this.inner.zoomToView(x, y, scale);
    }
    setSelectionXml(xml: string, queryOpts?: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void {
        this.inner.setSelectionXml(xml, queryOpts, success, failure);
    }
    refreshMap(mode?: RefreshMode): void {
        this.inner.refreshMap(mode);
    }
    getMetersPerUnit(): number {
        return this.inner.getMetersPerUnit();
    }
    setActiveTool(tool: ActiveMapTool): void {
        this.setState({ tool: tool }); //TODO: This should dispatch
    }
    getActiveTool(): ActiveMapTool {
        return this.state.tool; //TODO: This should read from redux store
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
    queryMapFeatures(options: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void {
        this.inner.queryMapFeatures(options, success, failure);
    }
    getSelection(): QueryMapFeaturesResponse | null {
        return this.props.selection;
    }
    getSelectionXml(selection: FeatureSet, layerIds?: string[]): string {
        if (this.props.selection) {
            return buildSelectionXml(this.props.selection.FeatureSet, layerIds);
        }
        return "";
    }
    getProjection(): ol.ProjectionLike {
        return this.inner.getProjection();
    }
    addLayer<T extends ol.layer.Base>(name: string, layer: T): T {
        return this.inner.addLayer(name, layer);
    }
    removeLayer(name: string): ol.layer.Base | undefined {
        return this.inner.removeLayer(name);
    }
    getLayer<T extends ol.layer.Base>(name: string, factory: () => T): T {
        return this.inner.getLayer(name, factory);
    }
    addInteraction<T extends ol.interaction.Interaction>(interaction: T): T {
        return this.inner.addInteraction(interaction);
    }
    removeInteraction<T extends ol.interaction.Interaction>(interaction: T): void {
        this.inner.removeInteraction(interaction);
    }
    addOverlay(overlay: ol.Overlay): void {
        this.inner.addOverlay(overlay);
    }
    removeOverlay(overlay: ol.Overlay): void {
        this.inner.removeOverlay(overlay);
    }
    addHandler(eventName: string, handler: Function) {
        this.inner.addHandler(eventName, handler);
    }
    removeHandler(eventName: string, handler: Function) {
        this.inner.removeHandler(eventName, handler);
    }
}