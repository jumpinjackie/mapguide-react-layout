import * as React from "react";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import {
    ICommand,
    IMapView,
    IMapViewer,
    ILayerManager,
    ActiveMapTool,
    RefreshMode,
    DigitizerCallback,
    Bounds,
    Coordinate,
    ReduxDispatch,
    IExternalBaseLayer,
    IApplicationState,
    IViewerReducerState,
    IConfigurationReducerState,
    LayerTransparencySet,
    ActiveSelectedFeature
} from "../api/common";
import * as Constants from "../constants";
import { MapViewerBase } from "../components/map-viewer-base";
import * as Runtime from "../api/runtime";
import { RuntimeMap } from "../api/contracts/runtime-map";
import * as MapActions from "../actions/map";
import { IItem, IInlineMenu } from "../components/toolbar";
import { Client } from "../api/client";
import { QueryMapFeaturesResponse, FeatureSet } from '../api/contracts/query';
import { IQueryMapFeaturesOptions } from '../api/request-builder';
import { buildSelectionXml, getActiveSelectedFeatureXml } from '../api/builders/deArrayify';
import { getCommand, mapToolbarReference, } from "../api/registry/command";
import { invokeCommand, queryMapFeatures } from "../actions/map";
import { showModalComponent } from "../actions/modal";
import { DefaultComponentNames } from "../api/registry/component";
import { processMenuItems } from "../utils/menu";
import { tr } from "../api/i18n";
import { IOLFactory, OLFactory } from "../api/ol-factory";
import { Intent, Toaster, Position as BP_Pos } from "@blueprintjs/core";

export interface IMapViewerContainerProps {
    overviewMapElementSelector?: () => (Element | null);
}

export interface IMapViewerContainerState {
    config: IConfigurationReducerState;
    map: RuntimeMap;
    selection: QueryMapFeaturesResponse;
    viewer: IViewerReducerState;
    currentView: IMapView;
    initialView: IMapView;
    selectableLayers: any;
    layerTransparency: LayerTransparencySet;
    contextmenu: any;
    showGroups: string[];
    showLayers: string[];
    hideGroups: string[];
    hideLayers: string[];
    externalBaseLayers: IExternalBaseLayer[];
    activeSelectedFeature: ActiveSelectedFeature;
}

export interface IMapViewerContainerDispatch {
    setActiveTool: (tool: ActiveMapTool) => void;
    setCurrentView: (view: IMapView) => void;
    setBusyCount: (count: number) => void;
    setMouseCoordinates: (mapName: string, coord: Coordinate) => void;
    invokeCommand: (cmd: ICommand, parameters?: any) => void;
    showModalComponent: (options: any) => void;
    queryMapFeatures: (mapName: string, options: MapActions.QueryMapFeatureActionOptions) => void;
    setViewRotation: (rotation: number) => void;
    setViewRotationEnabled: (enabled: boolean) => void;
    mapResized: (width: number, height: number) => void;
    setFeatureTooltipsEnabled: (enabled: boolean) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>, ownProps: IMapViewerContainerProps): Partial<IMapViewerContainerState> {
    let map;
    let legend;
    let selection;
    let currentView;
    let initialView;
    let selectableLayers;
    let externalBaseLayers;
    let showGroups;
    let showLayers;
    let hideGroups;
    let hideLayers;
    let layerTransparency;
    let activeSelectedFeature;
    if (state.config.activeMapName) {
        const branch = state.mapState[state.config.activeMapName];
        map = branch.runtimeMap;
        selection = branch.selectionSet;
        currentView = branch.currentView;
        initialView = branch.initialView;
        showGroups = branch.showGroups;
        showLayers = branch.showLayers;
        hideGroups = branch.hideGroups;
        hideLayers = branch.hideLayers;
        selectableLayers = branch.selectableLayers;
        externalBaseLayers = branch.externalBaseLayers;
        layerTransparency = branch.layerTransparency;
        activeSelectedFeature = branch.activeSelectedFeature;
    }
    return {
        config: state.config,
        map: map,
        currentView: currentView,
        initialView: initialView,
        viewer: state.viewer,
        selection: selection,
        selectableLayers: selectableLayers,
        contextmenu: state.toolbar.toolbars[Constants.WEBLAYOUT_CONTEXTMENU],
        showGroups: showGroups,
        showLayers: showLayers,
        hideGroups: hideGroups,
        hideLayers: hideLayers,
        externalBaseLayers: externalBaseLayers,
        layerTransparency: layerTransparency,
        activeSelectedFeature: activeSelectedFeature
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IMapViewerContainerDispatch> {
    return {
        setActiveTool: (tool) => dispatch(MapActions.setActiveTool(tool)),
        setCurrentView: (view) => dispatch(MapActions.setCurrentView(view)),
        setBusyCount: (count) => dispatch(MapActions.setBusyCount(count)),
        setMouseCoordinates: (mapName, coord) => dispatch(MapActions.setMouseCoordinates(mapName, coord)),
        invokeCommand: (cmd, parameters) => dispatch(invokeCommand(cmd, parameters)),
        showModalComponent: (options) => dispatch(showModalComponent(options)),
        queryMapFeatures: (mapName, options) => dispatch(queryMapFeatures(mapName, options)),
        setViewRotation: (rotation) => dispatch(MapActions.setViewRotation(rotation)),
        setViewRotationEnabled: (enabled) => dispatch(MapActions.setViewRotationEnabled(enabled)),
        mapResized: (width, height) => dispatch(MapActions.mapResized(width, height)),
        setFeatureTooltipsEnabled: (enabled) => dispatch(MapActions.setFeatureTooltipsEnabled(enabled))
    };
}

export type MapViewerContainerProps = IMapViewerContainerProps & Partial<IMapViewerContainerState> & Partial<IMapViewerContainerDispatch>;

export class MapViewerContainer extends React.Component<MapViewerContainerProps, any> implements IMapViewer {
    private inner: MapViewerBase;
    private olFactory: OLFactory;
    private toaster: Toaster;
    private refHandlers = {
        toaster: (ref: Toaster) => this.toaster = ref,
    };
    constructor(props: MapViewerContainerProps) {
        super(props);
        this.olFactory = new OLFactory();
    }
    static contextTypes: PropTypes.ValidationMap<any> = {
        store: PropTypes.object
    };
    private onBeginDigitization = (callback: (cancelled: boolean) => void) => {
        if (this.props.setActiveTool) {
            this.props.setActiveTool(ActiveMapTool.None);
        }
        //Could be a small timing issue here, but the active tool should generally
        //be "None" before the user clicks their first digitizing vertex/point
        callback(false);
    }
    private onMapViewerMounted = (component: MapViewerBase) => {
        this.inner = component;
    }
    private onMapResized = (size: [number, number]) => {
        if (this.props.mapResized) {
            this.props.mapResized(size[0], size[1]);
        }
    }
    private onRequestZoomToView = (view: IMapView) => {
        if (this.props.setCurrentView) {
            this.props.setCurrentView(view);
        }
    }
    private onQueryMapFeatures = (options: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void) => {
        const { config, queryMapFeatures } = this.props;
        if (queryMapFeatures && config && config.activeMapName) {
            queryMapFeatures(config.activeMapName, {
                options: options,
                append: this.inner.state.shiftKey === true,
                callback: success,
                errBack: failure
            });
        }
    }
    private onBusyLoading = (busyCount: number) => {
        if (this.props.setBusyCount) {
            this.props.setBusyCount(busyCount);
        }
    }
    private onRotationChanged = (newRotation: number) => {
        if (this.props.setViewRotation) {
            this.props.setViewRotation(newRotation);
        }
    }
    private onMouseCoordinateChanged = (coord: Coordinate) => {
        const { config, setMouseCoordinates } = this.props;
        if (setMouseCoordinates && config && config.activeMapName) {
            setMouseCoordinates(config.activeMapName, coord);
        }
    }
    private onSessionExpired = () => {
        const { showModalComponent, config } = this.props;
        if (showModalComponent && config) {
            showModalComponent({
                modal: {
                    title: tr("SESSION_EXPIRED", config.locale),
                    backdrop: true
                },
                name: DefaultComponentNames.SessionExpired,
                id: DefaultComponentNames.SessionExpired
            });
        }
    }
    componentDidUpdate(prevProps: MapViewerContainerProps) {
        const nextProps = this.props;
        if (prevProps.selection != nextProps.selection) {
            this.inner.refreshMap(RefreshMode.SelectionOnly);
        }
    }
    componentDidMount() {
        const { config } = this.props;
        if (config) {
            Runtime.setViewer(this);
            const browserWindow: any = window;
            browserWindow.getViewer = browserWindow.getViewer || Runtime.getViewer;
            const { agentUri, agentKind } = config;
            if (agentUri) {
                browserWindow.getClient = browserWindow.getClient || (() => new Client(agentUri, agentKind));
            }
        }
    }
    render(): JSX.Element | JSX.Element[] | string | number | null | false {
        const {
            map,
            selection,
            config,
            viewer,
            currentView,
            externalBaseLayers,
            initialView,
            contextmenu,
            selectableLayers,
            invokeCommand,
            layerTransparency,
            overviewMapElementSelector,
            showGroups,
            hideGroups,
            showLayers,
            hideLayers,
            activeSelectedFeature
        } = this.props;
        let locale;
        if (config) {
            locale = config.locale;
        }
        if (map && config && viewer && invokeCommand) {
            const selectableLayerNames = (map.Layer || [])
                .filter(layer => layer.Selectable && selectableLayers[layer.ObjectId] !== false)
                .map(layer => layer.Name);
            const store = (this.context as any).store;
            const items: any[] = contextmenu != null ? contextmenu.items : [];
            const cmitems = (items || []).map(tb => mapToolbarReference(tb, store, invokeCommand));
            const childItems = processMenuItems(cmitems);
            let xml;
            if (activeSelectedFeature && selection && selection.FeatureSet) {
                xml = getActiveSelectedFeatureXml(selection.FeatureSet, activeSelectedFeature);
            }
            if (config.agentUri) {
                //Praise $DEITY, we can finally return multiple JSX elements in React 16! No more DOM contortions!
                return [
                    <Toaster key="toaster" position={BP_Pos.TOP} ref={this.refHandlers.toaster} />,
                    <MapViewerBase  key="map"
                                    ref={this.onMapViewerMounted}
                                    map={map}
                                    agentUri={config.agentUri}
                                    agentKind={config.agentKind}
                                    locale={locale}
                                    externalBaseLayers={externalBaseLayers}
                                    imageFormat={config.viewer.imageFormat}
                                    selectionImageFormat={config.viewer.selectionImageFormat}
                                    selectionColor={config.viewer.selectionColor}
                                    activeSelectedFeatureColor={config.viewer.activeSelectedFeatureColor}
                                    pointSelectionBuffer={config.viewer.pointSelectionBuffer}
                                    tool={viewer.tool}
                                    viewRotation={config.viewRotation}
                                    viewRotationEnabled={config.viewRotationEnabled}
                                    featureTooltipsEnabled={viewer.featureTooltipsEnabled}
                                    manualFeatureTooltips={config.manualFeatureTooltips}
                                    showGroups={showGroups}
                                    hideGroups={hideGroups}
                                    showLayers={showLayers}
                                    hideLayers={hideLayers}
                                    view={currentView || initialView}
                                    selectableLayerNames={selectableLayerNames}
                                    contextMenu={childItems}
                                    overviewMapElementSelector={overviewMapElementSelector}
                                    loadIndicatorPosition={config.viewer.loadIndicatorPositioning}
                                    loadIndicatorColor={config.viewer.loadIndicatorColor}
                                    layerTransparency={layerTransparency || Constants.EMPTY_OBJECT}
                                    onBeginDigitization={this.onBeginDigitization}
                                    onSessionExpired={this.onSessionExpired}
                                    onBusyLoading={this.onBusyLoading}
                                    onRotationChanged={this.onRotationChanged}
                                    onMouseCoordinateChanged={this.onMouseCoordinateChanged}
                                    onQueryMapFeatures={this.onQueryMapFeatures}
                                    onRequestZoomToView={this.onRequestZoomToView}
                                    onMapResized={this.onMapResized}
                                    cancelDigitizationKey={config.cancelDigitizationKey}
                                    undoLastPointKey={config.undoLastPointKey}
                                    activeSelectedFeatureXml={xml} />
                ];
            }
        }
        return <div>{tr("LOADING_MSG", locale)}</div>;
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
    getSize(): [number, number] {
        return this.inner.getSize();
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
        if (this.props.setActiveTool) {
            this.props.setActiveTool(tool);
        }
    }
    getActiveTool(): ActiveMapTool {
        if (this.props.viewer) {
            return this.props.viewer.tool;
        }
        return ActiveMapTool.None;
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
    cancelDigitization(): void {
        this.inner.cancelDigitization();
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
        return this.inner.isFeatureTooltipEnabled();
    }
    setFeatureTooltipEnabled(enabled: boolean): void {
        if (this.props.setFeatureTooltipsEnabled) {
            this.props.setFeatureTooltipsEnabled(enabled);
        }
    }
    queryMapFeatures(options: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void): void {
        this.inner.queryMapFeatures(options, success, failure);
    }
    getSelection(): QueryMapFeaturesResponse | null {
        if (this.props.selection)
            return this.props.selection;
        return null;
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
    hasLayer(name: string): boolean {
        return this.inner.hasLayer(name);
    }
    addLayer<T extends ol.layer.Base>(name: string, layer: T, allowReplace?: boolean): T {
        return this.inner.addLayer(name, layer, allowReplace);
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
    getOLFactory(): IOLFactory {
        return this.olFactory;
    }
    getResolution(): number {
        return this.inner.getResolution();
    }
    scaleToResolution(scale: number): number {
        return this.inner.scaleToResolution(scale);
    }
    getMapName(): string {
        const { config } = this.props;
        if (config && config.activeMapName) {
            return config.activeMapName;
        }
        return "";
    }
    getSessionId(): string {
        const { map } = this.props;
        if (map) {
            return map.SessionId;
        }
        return "";
    }
    setViewRotation(rotation: number): void {
        const { setViewRotation } = this.props;
        if (setViewRotation) {
            setViewRotation(rotation);
        }
    }
    getViewRotation(): number {
        const { config } = this.props;
        if (config) {
            return config.viewRotation || 0;
        }
        return 0;
    }
    isViewRotationEnabled(): boolean {
        const { config } = this.props;
        if (config) {
            return !!config.viewRotationEnabled;
        }
        return true;
    }
    setViewRotationEnabled(enabled: boolean): void {
        const { setViewRotationEnabled } = this.props;
        if (setViewRotationEnabled) {
            setViewRotationEnabled(enabled);
        }
    }
    toastSuccess(iconName: string, message: string): string | undefined {
        return this.toaster.show({ icon: (iconName as any), message: message, intent: Intent.SUCCESS });
    }
    toastWarning(iconName: string, message: string): string | undefined {
        return this.toaster.show({ icon: (iconName as any), message: message, intent: Intent.WARNING });
    }
    toastError(iconName: string, message: string): string | undefined {
        return this.toaster.show({ icon: (iconName as any), message: message, intent: Intent.DANGER });
    }
    toastPrimary(iconName: string, message: string): string | undefined {
        return this.toaster.show({ icon: (iconName as any), message: message, intent: Intent.PRIMARY });
    }
    dismissToast(key: string): void {
        this.toaster.dismiss(key);
    }
    updateSize(): void {
        this.inner.updateSize();
    }
    getLayerManager(): ILayerManager {
        return this.inner.getLayerManager();
    }
    screenToMapUnits(x: number, y: number): [number, number] {
        return this.inner.screenToMapUnits(x, y);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapViewerContainer);