import * as React from "react";
import { useDispatch } from "react-redux";
import {
    IMapView,
    IMapViewer,
    ILayerManager,
    ActiveMapTool,
    RefreshMode,
    DigitizerCallback,
    Bounds,
    Coordinate2D,
    IMapGuideViewerSupport
} from "../api/common";
import { MapViewerBase } from "../components/map-viewer-base";
import { Client } from "../api/client";
import { QueryMapFeaturesResponse, FeatureSet } from '../api/contracts/query';
import { IQueryMapFeaturesOptions } from '../api/request-builder';
import { buildSelectionXml, getActiveSelectedFeatureXml } from '../api/builders/deArrayify';
import { DefaultComponentNames } from "../api/registry/component";
import { tr } from "../api/i18n";
import { IOLFactory, OLFactory } from "../api/ol-factory";
import { Toaster, Position, Intent } from '@blueprintjs/core';
import { useActiveMapSelectionSet, useActiveMapView, useActiveMapInitialView, useActiveMapExternalBaseLayers, useIsContextMenuOpen, useActiveMapName, useViewerActiveTool, useConfiguredAgentUri, useConfiguredAgentKind, useViewerViewRotation, useViewerViewRotationEnabled, useViewerLocale, useViewerImageFormat, useViewerSelectionImageFormat, useViewerSelectionColor, useViewerActiveFeatureSelectionColor as useViewerActiveSelectedFeatureColor, useViewerPointSelectionBuffer, useViewerFeatureTooltipsEnabled, useConfiguredManualFeatureTooltips, useConfiguredLoadIndicatorPositioning, useConfiguredLoadIndicatorColor, useConfiguredCancelDigitizationKey, useConfiguredUndoLastPointKey, useActiveMapLayers } from './hooks';
import olInteraction from "ol/interaction/Interaction";
import olOverlay from "ol/Overlay";
import { ProjectionLike } from "ol/proj";
import olGeometry from "ol/geom/Geometry";
import olGeomPoint from "ol/geom/Point";
import olGeomLineString from "ol/geom/LineString";
import olGeomCircle from "ol/geom/Circle";
import olGeomPolygon from "ol/geom/Polygon";
import { MapDebugContext } from '../components/map-viewer-context';
import { ISubscriberProps, Subscriber } from './subscriber';
import { ActionType } from '../constants/actions';
import { ensureParameters } from '../utils/url';
import { 
    DEFAULT_POINT_CIRCLE_STYLE,
    DEFAULT_POINT_ICON_STYLE,
    DEFAULT_LINE_STYLE,
    DEFAULT_POLY_STYLE,
    IBasicPointCircleStyle,
    IPointIconStyle,
    IBasicVectorLineStyle,
    IBasicVectorPolygonStyle
} from "../api/ol-style-helpers";
import { EMPTY_OBJECT } from '../constants';
import { getViewer, setViewer } from '../api/runtime';
import { debug } from '../utils/logger';
import { closeContextMenu, openContextMenu } from '../actions/flyout';
import { setActiveTool, setCurrentView, setBusyCount, setMouseCoordinates, QueryMapFeatureActionOptions, queryMapFeatures, setViewRotation, setViewRotationEnabled, mapResized, setFeatureTooltipsEnabled } from '../actions/map';
import { showModalComponent } from '../actions/modal';
import { useActiveMapLayerTransparency, useActiveMapShowGroups, useActiveMapHideGroups, useActiveMapShowLayers, useActiveMapHideLayers, useActiveMapActiveSelectedFeature, useActiveMapSelectableLayerNames, useActiveMapState, useActiveMapSessionId } from './hooks-mapguide';

export interface IMapViewerContainerProps {
    overviewMapElementSelector?: () => (Element | null);
}

type INonBaseMapViewer = Pick<IMapViewer & IMapGuideViewerSupport,
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
    "getActiveTool" |
    "addSubscribers" |
    "removeSubscribers" |
    "getSubscribers" |
    "dispatch">;

class MapViewerAdapter implements IMapViewer, IMapGuideViewerSupport {
    constructor(private inner: MapViewerBase,
        private olFactory: OLFactory = new OLFactory()) { }
    private disp: INonBaseMapViewer;
    mapguideSupport() { return this; }
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
        return this.inner.getLayerManager(mapName);
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
    getSelectedFeatures() {
        return this.inner.getSelectedFeatures();
    }
    /**
     * INTERNAL API. Not for public use
     * @hidden
     */
    addImageLoading(): void {
        this.inner.addImageLoading();
    }
    /**
     * INTERNAL API. Not for public use
     * @hidden
     */
    addImageLoaded(): void {
        this.inner.addImageLoaded();
    }
    addSubscribers(props: ISubscriberProps[]): string[] {
        return this.disp.addSubscribers(props);
    }
    removeSubscribers(names: string[]): boolean {
        return this.disp.removeSubscribers(names);
    }
    getSubscribers(): string[] {
        return this.disp.getSubscribers();
    }
    dispatch(action: any): void {
        this.disp.dispatch(action);
    }
    getDefaultPointCircleStyle(): IBasicPointCircleStyle {
        return { ...DEFAULT_POINT_CIRCLE_STYLE };
    }
    getDefaultPointIconStyle(): IPointIconStyle {
        return { ...DEFAULT_POINT_ICON_STYLE };
    }
    getDefaultLineStyle(): IBasicVectorLineStyle {
        return { ...DEFAULT_LINE_STYLE };
    }
    getDefaultPolygonStyle(): IBasicVectorPolygonStyle {
        return { ...DEFAULT_POLY_STYLE };
    }
}

const MapViewerContainer = (props: IMapViewerContainerProps) => {
    const { overviewMapElementSelector } = props;
    const toasterRef = React.useRef<Toaster>(null);
    const innerRef = React.useRef<MapViewerBase>(null);
    const mapDebugContext = React.useContext(MapDebugContext);
    const locale = useViewerLocale();
    const map = useActiveMapState();
    const selection = useActiveMapSelectionSet();
    const currentView = useActiveMapView();
    const initialView = useActiveMapInitialView();
    const externalBaseLayers = useActiveMapExternalBaseLayers();
    const layerTransparency = useActiveMapLayerTransparency();
    const layers = useActiveMapLayers();
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
    const [subscribers, setSubscribers] = React.useState<ISubscriberProps[]>([]);

    const addSubscribers = (props: ISubscriberProps[]) => {
        const ns = [...subscribers, ...props];
        setSubscribers(ns);
        return props.map(p => p.name);
    };
    const removeSubscribers = (names: string[]) => {
        const ol = subscribers.length;
        const ns = subscribers.filter(s => names.indexOf(s.name) < 0);
        setSubscribers(ns);
        return ns.length < ol;
    };
    const setActiveToolAction = (tool: ActiveMapTool) => dispatch(setActiveTool(tool));
    const setCurrentViewAction = (view: IMapView) => dispatch(setCurrentView(view));
    const setBusyCountAction = (count: number) => dispatch(setBusyCount(count));
    const setMouseCoordinatesAction = (mapName: string, coord: Coordinate2D) => dispatch(setMouseCoordinates(mapName, coord));
    const showModalComponentAction = (options: any) => dispatch(showModalComponent(options));
    const queryMapFeaturesAction = (mapName: string, options: QueryMapFeatureActionOptions) => dispatch(queryMapFeatures(mapName, options));
    const setViewRotationAction = (rotation: number) => dispatch(setViewRotation(rotation));
    const setViewRotationEnabledAction = (enabled: boolean) => dispatch(setViewRotationEnabled(enabled));
    const mapResizedAction = (width: number, height: number) => dispatch(mapResized(width, height));
    const setFeatureTooltipsEnabledAction = (enabled: boolean) => dispatch(setFeatureTooltipsEnabled(enabled));
    const showContextMenuAction = (pos: [number, number]) => dispatch(openContextMenu({ x: pos[0], y: pos[1] }));
    const hideContextMenuAction = () => dispatch(closeContextMenu());
    // Side-effect to apply the current external layer list
    React.useEffect(() => {
        const innerViewer = innerRef.current;
        if (innerViewer && layers) {
            const layerManager = innerViewer.getLayerManager();
            layerManager.apply(layers);
        }
    }, [layers]);
    // Side-effect to set the viewer "instance" once the MapViewerBase component has been mounted.
    // Should only happen once.
    React.useEffect(() => {
        debug(`React.useEffect - Change of innerRef.current`);
        const innerViewer = innerRef.current;
        if (innerViewer) {
            const adapter = new MapViewerAdapter(innerViewer);
            setViewer(adapter);
            const browserWindow: any = window;
            browserWindow.getViewer = browserWindow.getViewer || getViewer;
            if (agentUri) {
                browserWindow.getClient = browserWindow.getClient || (() => new Client(agentUri, agentKind));
            }
            debug(`React.useEffect - Attached runtime viewer instance and installed browser global APIs`);
        }
    }, [innerRef, agentUri, agentKind]);
    // Side-effect to imperatively refresh the map upon selection change
    React.useEffect(() => {
        debug(`React.useEffect - Change of selection`);
        innerRef.current?.refreshMap(RefreshMode.SelectionOnly);
    }, [selection]);
    // Side-effect to attach an updated "external" map viewer API to the current
    // viewer "instance" upon change of any key map state
    React.useEffect(() => {
        debug(`React.useEffect - Change of any of [toasterRef.current, map, selection, viewer, config]`);
        const adapter = getViewer() as MapViewerAdapter;
        if (adapter && sessionId && activeMapName) {
            const external: INonBaseMapViewer = {
                dismissToast: key => toasterRef.current?.dismiss(key),
                toastSuccess: (iconName, message) => toasterRef.current?.show({ icon: (iconName as any), message: message, intent: Intent.SUCCESS }),
                toastWarning: (iconName, message) => toasterRef.current?.show({ icon: (iconName as any), message: message, intent: Intent.WARNING }),
                toastError: (iconName, message) => toasterRef.current?.show({ icon: (iconName as any), message: message, intent: Intent.DANGER }),
                toastPrimary: (iconName, message) => toasterRef.current?.show({ icon: (iconName as any), message: message, intent: Intent.PRIMARY }),
                setViewRotation: setViewRotationAction,
                setViewRotationEnabled: setViewRotationEnabledAction,
                getViewRotation: () => viewRotation,
                isViewRotationEnabled: () => viewRotationEnabled,
                getSessionId: () => sessionId,
                getMapName: () => activeMapName,
                setActiveTool: setActiveToolAction,
                getActiveTool: () => tool,
                setFeatureTooltipEnabled: setFeatureTooltipsEnabledAction,
                getSelection: () => selection,
                getSelectionXml: (s, layerIds) => buildSelectionXml(s, layerIds),
                addSubscribers: (props) => addSubscribers(props),
                removeSubscribers: (name) => removeSubscribers(name),
                getSubscribers: () => subscribers.map(s => s.name),
                dispatch: (action) => dispatch(action)
            };
            adapter.attachExternal(external);
            debug(`Attached updated external "API" to runtime viewer instance`);
        }
    }, [toasterRef, sessionId, activeMapName, selection, tool, viewRotation, viewRotationEnabled]);

    const onBeginDigitization = (callback: (cancelled: boolean) => void) => {
        setActiveToolAction?.(ActiveMapTool.None);
        //Could be a small timing issue here, but the active tool should generally
        //be "None" before the user clicks their first digitizing vertex/point
        callback(false);
    };
    const onMapResized = (size: [number, number]) => mapResizedAction?.(size[0], size[1]);
    const onRequestZoomToView = (view: IMapView) => setCurrentViewAction?.(view);
    const onQueryMapFeatures = (options: IQueryMapFeaturesOptions, success?: (res: QueryMapFeaturesResponse) => void, failure?: (err: Error) => void) => {
        if (activeMapName) {
            queryMapFeaturesAction?.(activeMapName, {
                options: options,
                //append: this.inner.state.shiftKey === true,
                callback: success,
                errBack: failure
            });
        }
    };
    const onBusyLoading = (busyCount: number) => setBusyCountAction?.(busyCount);
    const onRotationChanged = (newRotation: number) => setViewRotationAction?.(newRotation);
    const onMouseCoordinateChanged = (coord: Coordinate2D) => {
        if (activeMapName) {
            setMouseCoordinatesAction?.(activeMapName, coord);
        }
    };
    const onSessionExpired = () => {
        showModalComponentAction?.({
            modal: {
                title: tr("SESSION_EXPIRED", locale),
                backdrop: true
            },
            name: DefaultComponentNames.SessionExpired,
            id: DefaultComponentNames.SessionExpired
        });
    };
    const onHideContextMenu = () => hideContextMenuAction?.();
    const onContextMenu = (pos: [number, number]) => showContextMenuAction?.(pos);
    const onOpenTooltipLink = (url: string) => {
        let fixedUrl = url;
        if (activeMapName && sessionId) {
            fixedUrl = ensureParameters(url, activeMapName, sessionId, locale);
        }
        dispatch({
            type: ActionType.TASK_INVOKE_URL,
            payload: {
                url: fixedUrl
            }
        });
    };
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
                mock={mapDebugContext.mock}
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
                layerTransparency={layerTransparency || EMPTY_OBJECT}
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
                isContextMenuOpen={!!isContextMenuOpen}
                onOpenTooltipLink={onOpenTooltipLink} />
            {subscribers.map((s, i) => <Subscriber key={`subscriber-${i}-${s.name}`} {...s} />)}
        </>;
    }
    return <div>{tr("LOADING_MSG", locale)}</div>;
};

export default MapViewerContainer;