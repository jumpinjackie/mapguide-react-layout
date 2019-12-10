import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    ICommand,
    IMapView,
    IMapViewer,
    ILayerManager,
    ActiveMapTool,
    RefreshMode,
    DigitizerCallback,
    Bounds,
    Coordinate2D,
    IExternalBaseLayer,
    IApplicationState,
    IViewerReducerState,
    IConfigurationReducerState,
    LayerTransparencySet,
    ActiveSelectedFeature,
    PropType
} from "../api/common";
import * as Constants from "../constants";
import { MapViewerBase } from "../components/map-viewer-base";
import * as Runtime from "../api/runtime";
import { RuntimeMap } from "../api/contracts/runtime-map";
import * as FlyoutActions from "../actions/flyout";
import { Client } from "../api/client";
import { QueryMapFeaturesResponse, FeatureSet } from '../api/contracts/query';
import { IQueryMapFeaturesOptions } from '../api/request-builder';
import { buildSelectionXml, getActiveSelectedFeatureXml } from '../api/builders/deArrayify';
import * as MapActions from "../actions/map";
import * as ModalActions from "../actions/modal";
import { DefaultComponentNames } from "../api/registry/component";
import { tr } from "../api/i18n";
import { IOLFactory, OLFactory } from "../api/ol-factory";
import { Toaster, Position, Intent } from '@blueprintjs/core';
import * as logger from "../utils/logger";
import { useActiveMapState, useActiveMapSelectionSet, useActiveMapView, useActiveMapInitialView, useActiveMapExternalBaseLayers, useActiveMapSelectableLayers, useActiveMapLayerTransparency, useActiveMapShowGroups, useActiveMapHideGroups, useActiveMapShowLayers, useActiveMapHideLayers, useActiveMapActiveSelectedFeature, useIsContextMenuOpen, useActiveMapName, useActiveMapSessionId, useActiveMapSelectableLayerNames, useViewerActiveTool, useConfiguredAgentUri, useConfiguredAgentKind, useViewerViewRotation, useViewerViewRotationEnabled, useViewerLocale, useViewerImageFormat, useViewerSelectionImageFormat, useViewerSelectionColor, useViewerActiveFeatureSelectionColor as useViewerActiveSelectedFeatureColor, useViewerPointSelectionBuffer, useViewerFeatureTooltipsEnabled, useConfiguredManualFeatureTooltips, useConfiguredLoadIndicatorPositioning, useConfiguredLoadIndicatorColor, useConfiguredCancelDigitizationKey, useConfiguredUndoLastPointKey } from './hooks';
import olInteraction from "ol/interaction/Interaction";
import olOverlay from "ol/Overlay";
import { ProjectionLike } from "ol/proj";
import olGeometry from "ol/geom/Geometry";
import olGeomPoint from "ol/geom/Point";
import olGeomLineString from "ol/geom/LineString";
import olGeomCircle from "ol/geom/Circle";
import olGeomPolygon from "ol/geom/Polygon";

export interface IMapViewerContainerProps {
    overviewMapElementSelector?: () => (Element | null);
}

interface IMapViewerContainerState {
    config: IConfigurationReducerState;
    map: RuntimeMap;
    selection: QueryMapFeaturesResponse;
    viewer: IViewerReducerState;
    currentView: IMapView;
    initialView: IMapView;
    selectableLayers: any;
    layerTransparency: LayerTransparencySet;
    showGroups: string[];
    showLayers: string[];
    hideGroups: string[];
    hideLayers: string[];
    externalBaseLayers: IExternalBaseLayer[];
    activeSelectedFeature: ActiveSelectedFeature;
    isContextMenuOpen: boolean;
}

interface MVDispatch {
    setActiveTool: (tool: ActiveMapTool) => void;
    setCurrentView: (view: IMapView) => void;
    setBusyCount: (count: number) => void;
    setMouseCoordinates: (mapName: string, coord: Coordinate2D) => void;
    invokeCommand: (cmd: ICommand, parameters?: any) => void;
    showModalComponent: (options: any) => void;
    queryMapFeatures: (mapName: string, options: MapActions.QueryMapFeatureActionOptions) => void;
    setViewRotation: (rotation: number) => void;
    setViewRotationEnabled: (enabled: boolean) => void;
    mapResized: (width: number, height: number) => void;
    setFeatureTooltipsEnabled: (enabled: boolean) => void;
    showContextMenu: (pos: [number, number]) => void;
    hideContextMenu: () => void;
}

type INonBaseMapViewer = Pick<IMapViewer,
    "toastSuccess" |
    "toastWarning" |
    "toastError" |
    "toastPrimary" |
    "dismissToast" |
    "getMapName" |
    "getSessionId" |
    "setViewRotation" |
    "getViewRotation" |
    "isViewRotationEnabled" |
    "setViewRotationEnabled" |
    "setFeatureTooltipEnabled" |
    "getSelection" |
    "getSelectionXml" |
    "setActiveTool" |
    "getActiveTool">;

class MapViewerAdapter implements IMapViewer {
    getProjection(): ProjectionLike {
        return this.inner.getProjection();
    }
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
    setSelectionXml(xml: string, queryOpts?: Partial<IQueryMapFeaturesOptions> | undefined, success?: ((res: QueryMapFeaturesResponse) => void) | undefined, failure?: ((err: Error) => void) | undefined): void {
        this.inner.setSelectionXml(xml, queryOpts, success, failure);
    }
    refreshMap(mode?: RefreshMode | undefined): void {
        this.inner.refreshMap(mode);
    }
    getMetersPerUnit(): number {
        return this.inner.getMetersPerUnit();
    }
    clearSelection(): void {
        this.inner.clearSelection();
    }
    zoomDelta(delta: number): void {
        this.inner.zoomDelta(delta);
    }
    isDigitizing(): boolean {
        return this.inner.isDigitizing();
    }
    cancelDigitization(): void {
        this.inner.cancelDigitization();
    }
    digitizePoint(handler: DigitizerCallback<olGeomPoint>, prompt?: string | undefined): void {
        this.inner.digitizePoint(handler, prompt);
    }
    digitizeLine(handler: DigitizerCallback<olGeomLineString>, prompt?: string | undefined): void {
        this.inner.digitizeLine(handler, prompt);
    }
    digitizeLineString(handler: DigitizerCallback<olGeomLineString>, prompt?: string | undefined): void {
        this.inner.digitizeLineString(handler, prompt);
    }
    digitizeCircle(handler: DigitizerCallback<olGeomCircle>, prompt?: string | undefined): void {
        this.inner.digitizeCircle(handler, prompt);
    }
    digitizeRectangle(handler: DigitizerCallback<olGeomPolygon>, prompt?: string | undefined): void {
        this.inner.digitizeRectangle(handler, prompt);
    }
    digitizePolygon(handler: DigitizerCallback<olGeomPolygon>, prompt?: string | undefined): void {
        this.inner.digitizePolygon(handler, prompt);
    }
    selectByGeometry(geom: olGeometry, selectionMethod?: "INTERSECTS" | "TOUCHES" | "WITHIN" | "ENVELOPEINTERSECTS" | undefined): void {
        this.inner.selectByGeometry(geom, selectionMethod)
    }
    queryMapFeatures(options: IQueryMapFeaturesOptions, success?: ((res: QueryMapFeaturesResponse) => void) | undefined, failure?: ((err: Error) => void) | undefined): void {
        this.inner.queryMapFeatures(options, success, failure);
    }
    zoomToExtent(extent: Bounds): void {
        this.inner.zoomToExtent(extent);
    }
    isFeatureTooltipEnabled(): boolean {
        return this.inner.isFeatureTooltipEnabled();
    }
    getLayerManager(mapName?: string | undefined): ILayerManager {
        return this.inner.getLayerManager();
    }
    addInteraction<T extends olInteraction>(interaction: T): T {
        return this.inner.addInteraction(interaction);
    }
    removeInteraction<T extends olInteraction>(interaction: T): void {
        this.inner.removeInteraction(interaction);
    }
    addOverlay(overlay: olOverlay): void {
        this.inner.addOverlay(overlay);
    }
    removeOverlay(overlay: olOverlay): void {
        this.inner.removeOverlay(overlay);
    }
    addHandler(eventName: string, handler: Function): void {
        this.inner.addHandler(eventName, handler);
    }
    removeHandler(eventName: string, handler: Function): void {
        this.inner.removeHandler(eventName, handler);
    }
    getResolution(): number {
        return this.inner.getResolution();
    }
    scaleToResolution(scale: number): number {
        return this.inner.scaleToResolution(scale);
    }

    screenToMapUnits(x: number, y: number): [number, number] {
        return this.inner.screenToMapUnits(x, y);
    }
    updateSize(): void {
        this.inner.updateSize();
    }
    constructor(private inner: MapViewerBase,
        private olFactory: OLFactory = new OLFactory()) { }
    private disp: INonBaseMapViewer;
    attachExternal(disp: INonBaseMapViewer): void {
        this.disp = disp;
    }
    toastSuccess(icon: string, message: string | JSX.Element): string | undefined {
        return this.disp.toastSuccess(icon, message);
    }
    toastWarning(icon: string, message: string | JSX.Element): string | undefined {
        return this.disp.toastWarning(icon, message);
    }
    toastError(icon: string, message: string | JSX.Element): string | undefined {
        return this.disp.toastError(icon, message);
    }
    toastPrimary(icon: string, message: string | JSX.Element): string | undefined {
        return this.disp.toastPrimary(icon, message);
    }
    dismissToast(key: string): void {
        this.disp.dismissToast(key);
    }
    getMapName(): string {
        return this.disp.getMapName();
    }
    getSessionId(): string {
        return this.disp.getSessionId();
    }
    setViewRotation(rotation: number): void {
        this.disp.setViewRotation(rotation);
    }
    getViewRotation(): number {
        return this.disp.getViewRotation();
    }
    isViewRotationEnabled(): boolean {
        return this.disp.isViewRotationEnabled();
    }
    setViewRotationEnabled(enabled: boolean): void {
        this.disp.setViewRotationEnabled(enabled);
    }
    getOLFactory(): IOLFactory {
        return this.olFactory;
    }
    setFeatureTooltipEnabled(enabled: boolean): void {
        this.disp.setFeatureTooltipEnabled(enabled);
    }
    getSelection(): QueryMapFeaturesResponse | null {
        return this.disp.getSelection();
    }
    getSelectionXml(selection: FeatureSet, layerIds?: string[] | undefined): string {
        return this.disp.getSelectionXml(selection, layerIds);
    }
    setActiveTool(tool: ActiveMapTool): void {
        this.disp.setActiveTool(tool);
    }
    getActiveTool(): ActiveMapTool {
        return this.disp.getActiveTool();
    }
    initialView(): void {
        this.inner.initialView();
    }
}

const MapViewerContainer = (props: IMapViewerContainerProps) => {
    const { overviewMapElementSelector } = props;
    const toasterRef = React.useRef<Toaster>(null);
    const innerRef = React.useRef<MapViewerBase>(null);
    const locale = useViewerLocale();
    const map = useActiveMapState();
    const selection = useActiveMapSelectionSet();
    const currentView = useActiveMapView();
    const initialView = useActiveMapInitialView();
    const externalBaseLayers = useActiveMapExternalBaseLayers();
    const selectableLayers = useActiveMapSelectableLayers();
    const layerTransparency = useActiveMapLayerTransparency();
    const showGroups = useActiveMapShowGroups();
    const hideGroups = useActiveMapHideGroups();
    const showLayers = useActiveMapShowLayers();
    const hideLayers = useActiveMapHideLayers();
    const activeSelectedFeature = useActiveMapActiveSelectedFeature();
    const isContextMenuOpen = useIsContextMenuOpen();
    const activeMapName = useActiveMapName();
    const sessionId = useActiveMapSessionId();
    const selectableLayerNames = useActiveMapSelectableLayerNames();
    const tool = useViewerActiveTool();
    const agentUri = useConfiguredAgentUri();
    const agentKind = useConfiguredAgentKind();
    const viewRotation = useViewerViewRotation();
    const viewRotationEnabled = useViewerViewRotationEnabled();
    const imageFormat = useViewerImageFormat();
    const selectionImageFormat = useViewerSelectionImageFormat();
    const selectionColor = useViewerSelectionColor();
    const activeSelectedFeatureColor = useViewerActiveSelectedFeatureColor();
    const pointSelectionBuffer = useViewerPointSelectionBuffer();
    const featureTooltipsEnabled = useViewerFeatureTooltipsEnabled();
    const manualFeatureTooltips = useConfiguredManualFeatureTooltips();
    const loadIndicatorPositioning = useConfiguredLoadIndicatorPositioning();
    const loadIndicatorColor = useConfiguredLoadIndicatorColor();
    const cancelDigitizationKey = useConfiguredCancelDigitizationKey();
    const undoLastPointKey = useConfiguredUndoLastPointKey();
    const dispatch = useDispatch();
    const setActiveTool: PropType<MVDispatch, "setActiveTool"> = (tool) => dispatch(MapActions.setActiveTool(tool));
    const setCurrentView: PropType<MVDispatch, "setCurrentView"> = (view) => dispatch(MapActions.setCurrentView(view));
    const setBusyCount: PropType<MVDispatch, "setBusyCount"> = (count) => dispatch(MapActions.setBusyCount(count));
    const setMouseCoordinates: PropType<MVDispatch, "setMouseCoordinates"> = (mapName, coord) => dispatch(MapActions.setMouseCoordinates(mapName, coord));
    const showModalComponent: PropType<MVDispatch, "showModalComponent"> = (options) => dispatch(ModalActions.showModalComponent(options));
    const queryMapFeatures: PropType<MVDispatch, "queryMapFeatures"> = (mapName, options) => dispatch(MapActions.queryMapFeatures(mapName, options));
    const setViewRotation: PropType<MVDispatch, "setViewRotation"> = (rotation) => dispatch(MapActions.setViewRotation(rotation));
    const setViewRotationEnabled: PropType<MVDispatch, "setViewRotationEnabled"> = (enabled) => dispatch(MapActions.setViewRotationEnabled(enabled));
    const mapResized: PropType<MVDispatch, "mapResized"> = (width, height) => dispatch(MapActions.mapResized(width, height));
    const setFeatureTooltipsEnabled: PropType<MVDispatch, "setFeatureTooltipsEnabled"> = (enabled) => dispatch(MapActions.setFeatureTooltipsEnabled(enabled));
    const showContextMenu: PropType<MVDispatch, "showContextMenu"> = (pos) => dispatch(FlyoutActions.openContextMenu({ x: pos[0], y: pos[1] }));
    const hideContextMenu: PropType<MVDispatch, "hideContextMenu"> = () => dispatch(FlyoutActions.closeContextMenu());
    // Side-effect to set the viewer "instance" once the MapViewerBase component has been mounted.
    // Should only happen once.
    React.useEffect(() => {
        logger.debug(`React.useEffect - Change of innerRef.current`);
        const innerViewer = innerRef.current;
        if (innerViewer) {
            const adapter = new MapViewerAdapter(innerViewer);
            Runtime.setViewer(adapter);
            const browserWindow: any = window;
            browserWindow.getViewer = browserWindow.getViewer || Runtime.getViewer;
            if (agentUri) {
                browserWindow.getClient = browserWindow.getClient || (() => new Client(agentUri, agentKind));
            }
            logger.debug(`React.useEffect - Attached runtime viewer instance and installed browser global APIs`);
        }
    }, [innerRef, agentUri, agentKind]);
    // Side-effect to imperatively refresh the map upon selection change
    React.useEffect(() => {
        logger.debug(`React.useEffect - Change of selection`);
        innerRef.current?.refreshMap(RefreshMode.SelectionOnly);
    }, [selection]);
    // Side-effect to attach an updated "external" map viewer API to the current
    // viewer "instance" upon change of any key map state
    React.useEffect(() => {
        logger.debug(`React.useEffect - Change of any of [toasterRef.current, map, selection, viewer, config]`);
        const adapter = Runtime.getViewer() as MapViewerAdapter;
        if (adapter && sessionId && activeMapName) {
            const external: INonBaseMapViewer = {
                dismissToast: key => toasterRef.current?.dismiss(key),
                toastSuccess: (iconName, message) => toasterRef.current?.show({ icon: (iconName as any), message: message, intent: Intent.SUCCESS }),
                toastWarning: (iconName, message) => toasterRef.current?.show({ icon: (iconName as any), message: message, intent: Intent.WARNING }),
                toastError: (iconName, message) => toasterRef.current?.show({ icon: (iconName as any), message: message, intent: Intent.DANGER }),
                toastPrimary: (iconName, message) => toasterRef.current?.show({ icon: (iconName as any), message: message, intent: Intent.PRIMARY }),
                setViewRotation: setViewRotation,
                setViewRotationEnabled: setViewRotationEnabled,
                getViewRotation: () => viewRotation,
                isViewRotationEnabled: () => viewRotationEnabled,
                getSessionId: () => sessionId,
                getMapName: () => activeMapName,
                setActiveTool: setActiveTool,
                getActiveTool: () => tool,
                setFeatureTooltipEnabled: setFeatureTooltipsEnabled,
                getSelection: () => selection,
                getSelectionXml: (s, layerIds) => buildSelectionXml(s, layerIds)
            };
            adapter.attachExternal(external);
            logger.debug(`Attached updated external "API" to runtime viewer instance`);
        }
    }, [toasterRef, sessionId, activeMapName, selection, tool, viewRotation, viewRotationEnabled]);

    const onBeginDigitization = (callback: (cancelled: boolean) => void) => {
        setActiveTool?.(ActiveMapTool.None);
        //Could be a small timing issue here, but the active tool should generally
        //be "None" before the user clicks their first digitizing vertex/point
        callback(false);
    };
    const onMapResized = (size: [number, number]) => mapResized?.(size[0], size[1]);
    const onRequestZoomToView = (view: IMapView) => setCurrentView?.(view);
    const onQueryMapFeatures = (options: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void) => {
        if (activeMapName) {
            queryMapFeatures?.(activeMapName, {
                options: options,
                //append: this.inner.state.shiftKey === true,
                callback: success,
                errBack: failure
            });
        }
    };
    const onBusyLoading = (busyCount: number) => setBusyCount?.(busyCount);
    const onRotationChanged = (newRotation: number) => setViewRotation?.(newRotation);
    const onMouseCoordinateChanged = (coord: Coordinate2D) => {
        if (activeMapName) {
            setMouseCoordinates?.(activeMapName, coord);
        }
    };
    const onSessionExpired = () => {
        showModalComponent?.({
            modal: {
                title: tr("SESSION_EXPIRED", locale),
                backdrop: true
            },
            name: DefaultComponentNames.SessionExpired,
            id: DefaultComponentNames.SessionExpired
        });
    };
    const onHideContextMenu = () => hideContextMenu?.();
    const onContextMenu = (pos: [number, number]) => showContextMenu?.(pos);
    /*
    const store = (this.context as any).store;
    const items: any[] = contextmenu != null ? contextmenu.items : [];
    const cmitems = (items || []).map(tb => mapToolbarReference(tb, store, invokeCommand));
    const childItems = processMenuItems(cmitems);
    */
    let xml;
    if (activeSelectedFeature && selection && selection.FeatureSet) {
        xml = getActiveSelectedFeatureXml(selection.FeatureSet, activeSelectedFeature);
    }
    if (map && agentUri) {
        return <>
            {/* HACK: usePortal=false to workaround what I think is: https://github.com/palantir/blueprint/issues/3248 */}
            <Toaster usePortal={false} position={Position.TOP} ref={toasterRef} />
            <MapViewerBase ref={innerRef}
                map={map}
                agentUri={agentUri}
                agentKind={agentKind}
                locale={locale}
                externalBaseLayers={externalBaseLayers}
                imageFormat={imageFormat}
                selectionImageFormat={selectionImageFormat}
                selectionColor={selectionColor}
                activeSelectedFeatureColor={activeSelectedFeatureColor}
                pointSelectionBuffer={pointSelectionBuffer}
                tool={tool}
                viewRotation={viewRotation}
                viewRotationEnabled={viewRotationEnabled}
                featureTooltipsEnabled={featureTooltipsEnabled}
                manualFeatureTooltips={manualFeatureTooltips}
                showGroups={showGroups}
                hideGroups={hideGroups}
                showLayers={showLayers}
                hideLayers={hideLayers}
                view={currentView || initialView}
                selectableLayerNames={selectableLayerNames}
                overviewMapElementSelector={overviewMapElementSelector}
                loadIndicatorPosition={loadIndicatorPositioning}
                loadIndicatorColor={loadIndicatorColor}
                layerTransparency={layerTransparency || Constants.EMPTY_OBJECT}
                onBeginDigitization={onBeginDigitization}
                onSessionExpired={onSessionExpired}
                onBusyLoading={onBusyLoading}
                onRotationChanged={onRotationChanged}
                onMouseCoordinateChanged={onMouseCoordinateChanged}
                onQueryMapFeatures={onQueryMapFeatures}
                onRequestZoomToView={onRequestZoomToView}
                onMapResized={onMapResized}
                cancelDigitizationKey={cancelDigitizationKey}
                undoLastPointKey={undoLastPointKey}
                activeSelectedFeatureXml={xml}
                onContextMenu={onContextMenu}
                onHideContextMenu={onHideContextMenu}
                isContextMenuOpen={!!isContextMenuOpen} />
        </>;
    }
    return <div>{tr("LOADING_MSG", locale)}</div>;
};

export default MapViewerContainer;