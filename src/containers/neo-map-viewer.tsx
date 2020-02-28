import * as React from "react";
import * as ReactDOM from "react-dom";
import { IMapProviderContext, IViewerComponent } from '../components/map-providers/base';
import { CURSOR_DIGITIZE_POINT, CURSOR_DIGITIZE_LINE, CURSOR_DIGITIZE_LINESTRING, CURSOR_DIGITIZE_RECT, CURSOR_DIGITIZE_POLYGON, CURSOR_DIGITIZE_CIRCLE, CURSOR_GRABBING, CURSOR_GRAB, CURSOR_ZOOM_IN } from '../constants/assets';
import { MapLoadIndicator } from '../components/map-load-indicator';
import { ActiveMapTool, MapLoadIndicatorPositioning, GenericEvent, ReduxDispatch, RefreshMode } from '../api/common';
import { MapProviderContext } from '../components/map-providers/context';
import { useConfiguredLoadIndicatorPositioning, useConfiguredLoadIndicatorColor, useViewerActiveTool, useActiveMapView, useViewerViewRotation, useViewerViewRotationEnabled, useActiveMapName, useViewerLocale, useActiveMapExternalBaseLayers, useConfiguredCancelDigitizationKey, useConfiguredUndoLastPointKey, useViewerImageFormat, useConfiguredAgentUri, useConfiguredAgentKind, useActiveMapState, useViewerPointSelectionBuffer, useViewerSelectionColor, useViewerSelectionImageFormat, useActiveMapSelectableLayerNames, useConfiguredManualFeatureTooltips, useActiveMapSessionId, useActiveMapLayerTransparency, useActiveMapShowGroups, useActiveMapHideGroups, useActiveMapShowLayers, useActiveMapActiveSelectedFeature, useActiveMapHideLayers, useViewerActiveFeatureSelectionColor, useActiveMapSelectionSet, useViewerFeatureTooltipsEnabled, useActiveMapLayers } from './hooks';
import { Toaster, Position } from '@blueprintjs/core';
import { IMapGuideProviderState } from '../components/map-providers/mapguide';
import { getActiveSelectedFeatureXml } from '../api/builders/deArrayify';
import { STR_EMPTY } from '../utils/string';
import { tr } from '../api/i18n';
import { useDispatch } from 'react-redux';
import { debug } from '../utils/logger';
import { setViewer, getViewer } from '../api/runtime';
import { Client } from '../api/client';

import "ol/ol.css";

interface ICoreMapViewerProps {
    context: IMapProviderContext;
    loadIndicatorPosition: MapLoadIndicatorPositioning;
    loadIndicatorColor: string;
    onContextMenu?: (pos: [number, number]) => void;
    onDispatch: ReduxDispatch;
    backgroundColor?: string;
}

interface ICoreMapViewerState {
    shiftKey: boolean;
    isMouseDown: boolean;
    digitizingType: string | undefined;
    loading: number;
    loaded: number;
}

class CoreMapViewer extends React.Component<ICoreMapViewerProps, ICoreMapViewerState> implements IViewerComponent {
    constructor(props: ICoreMapViewerProps) {
        super(props);
        this.state = {
            shiftKey: false,
            isMouseDown: false,
            digitizingType: undefined,
            loaded: 0,
            loading: 0
        }
    }
    //#region IViewerComponent
    isContextMenuOpen = () => false;
    setDigitizingType = (digitizingType: string | undefined) => this.setState({ digitizingType });
    onBeginDigitization = (callback: (cancelled: boolean) => void) => { };
    onHideContextMenu = () => { };
    onOpenTooltipLink = (url: string) => { };
    onDispatch = (action: any) => this.props.onDispatch(action);
    addImageLoading(): void {
        const { loading } = this.state;
        const newLoading = (loading || 0) + 1;
        this.setState({ loading: newLoading });
        this.props.context.incrementBusyWorker();
    }
    addImageLoaded(): void {
        const { loaded, loading } = this.state;
        const newLoadedCount = (loaded || 0) + 1;
        if (loading === newLoadedCount) {
            this.setState({ loaded: 0, loading: 0 });
        } else {
            this.setState({ loaded: newLoadedCount });
        }
        this.props.context.decrementBusyWorker();
    }
    //#endregion
    private onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        if (this.props.context.isMouseOverTooltip()) {
            return;
        }
        e.preventDefault();
        //console.log(`Open context menu at (${e.clientX}, ${e.clientY})`);
        this.props.onContextMenu?.([e.clientX, e.clientY]);
    }
    private onKeyDown = (e: GenericEvent) => {
        this.props.context.onKeyDown(e);
        this.setState({ shiftKey: e.shiftKey });
    }
    private onKeyUp = (e: GenericEvent) => {
        this.setState({ shiftKey: e.shiftKey });
    }
    private onMouseDown = (e: GenericEvent) => {
        if (!this.state.isMouseDown) {
            this.setState({
                isMouseDown: true
            });
        }
    }
    private onMouseUp = (e: GenericEvent) => {
        if (this.state.isMouseDown) {
            this.setState({
                isMouseDown: false
            });
        }
    }
    componentDidMount() {
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        const mapNode: any = ReactDOM.findDOMNode(this);
        this.props.context.attachToComponent(mapNode, this);
    }
    render(): JSX.Element {
        const { context, backgroundColor } = this.props;
        const { isMouseDown } = this.state;
        const tool = context.getActiveTool();
        const style: React.CSSProperties = {
            width: "100%",
            height: "100%"
        };
        if (context.isDigitizing()) {
            const dtype = this.state.digitizingType;
            switch (dtype) {
                case "Point":
                    style.cursor = `url(${CURSOR_DIGITIZE_POINT}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
                case "Line":
                    style.cursor = `url(${CURSOR_DIGITIZE_LINE}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
                case "LineString":
                    style.cursor = `url(${CURSOR_DIGITIZE_LINESTRING}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
                case "Rectangle":
                    style.cursor = `url(${CURSOR_DIGITIZE_RECT}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
                case "Polygon":
                    style.cursor = `url(${CURSOR_DIGITIZE_POLYGON}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
                case "Circle":
                    style.cursor = `url(${CURSOR_DIGITIZE_CIRCLE}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
            }
        } else {
            switch (tool) {
                case ActiveMapTool.Pan:
                    if (isMouseDown) {
                        style.cursor = `url(${CURSOR_GRABBING}), auto`;
                        //console.log(`cursor: ${style.cursor}`);
                    } else {
                        style.cursor = `url(${CURSOR_GRAB}), auto`;
                        //console.log(`cursor: ${style.cursor}`);
                    }
                    break;
                case ActiveMapTool.Zoom:
                    style.cursor = `url(${CURSOR_ZOOM_IN}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                    break;
            }
        }
        if (backgroundColor) {
            style.backgroundColor = backgroundColor;
            //style.backgroundColor = `#${map.BackgroundColor.substring(2)}`;
        }
        const { loading, loaded } = this.state;
        return <div className="map-viewer-component" style={style} onContextMenu={this.onContextMenu} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
            <MapLoadIndicator loaded={loaded || 0} loading={loading || 0} position={this.props.loadIndicatorPosition} color={this.props.loadIndicatorColor} />
        </div>;
    }
}

export const MgMapViewer = () => {
    const context = React.useContext(MapProviderContext);
    const toasterRef = React.useRef<Toaster>(null);
    const loadIndicatorPositioning = useConfiguredLoadIndicatorPositioning();
    const loadIndicatorColor = useConfiguredLoadIndicatorColor();
    const activeTool = useViewerActiveTool();
    const view = useActiveMapView();
    const viewRotation = useViewerViewRotation();
    const viewRotationEnabled = useViewerViewRotationEnabled();
    const mapName = useActiveMapName();
    const locale = useViewerLocale();
    const externalBaseLayers = useActiveMapExternalBaseLayers();
    const cancelDigitizationKey = useConfiguredCancelDigitizationKey();
    const undoLastPointKey = useConfiguredUndoLastPointKey();
    const layers = useActiveMapLayers();
    // ============== MapGuide-specific ================== //
    const imageFormat = useViewerImageFormat();
    const agentUri = useConfiguredAgentUri();
    const agentKind = useConfiguredAgentKind();
    const map = useActiveMapState();
    const pointSelectionBuffer = useViewerPointSelectionBuffer();
    const featureTooltipsEnabled = useViewerFeatureTooltipsEnabled();
    const manualFeatureTooltips = useConfiguredManualFeatureTooltips();
    const sessionId = useActiveMapSessionId();
    const selectionColor = useViewerSelectionColor();
    const selectionImageFormat = useViewerSelectionImageFormat();
    const selectableLayerNames = useActiveMapSelectableLayerNames();
    const layerTransparency = useActiveMapLayerTransparency();
    const showGroups = useActiveMapShowGroups();
    const hideGroups = useActiveMapHideGroups();
    const showLayers = useActiveMapShowLayers();
    const hideLayers = useActiveMapHideLayers();
    const activeSelectedFeature = useActiveMapActiveSelectedFeature();
    const activeSelectedFeatureColor = useViewerActiveFeatureSelectionColor();
    const selection = useActiveMapSelectionSet();
    const dispatch = useDispatch();

    let bgColor: string | undefined;
    if (map) {
        bgColor = `#${map.BackgroundColor.substring(2)}`;
    }
    let activeSelectedFeatureXml;
    if (activeSelectedFeature && selection && selection.FeatureSet) {
        activeSelectedFeatureXml = getActiveSelectedFeatureXml(selection.FeatureSet, activeSelectedFeature);
    }

    const nextState: IMapGuideProviderState = {
        activeTool,
        view,
        viewRotation,
        viewRotationEnabled,
        mapName,
        locale,
        externalBaseLayers,
        cancelDigitizationKey,
        undoLastPointKey,
        // =========== MapGuide-specific ============== //
        imageFormat,
        agentUri,
        agentKind,
        map,
        pointSelectionBuffer,
        featureTooltipsEnabled,
        manualFeatureTooltips,
        sessionId,
        selectionColor,
        selectionImageFormat,
        selectableLayerNames,
        layerTransparency,
        showGroups: showGroups ?? [],
        hideGroups: hideGroups ?? [],
        showLayers: showLayers ?? [],
        hideLayers: hideLayers ?? [],
        activeSelectedFeatureXml: activeSelectedFeatureXml ?? STR_EMPTY,
        activeSelectedFeatureColor,
        selection
    };
    context.setProviderState(nextState);

    // Side-effect to apply the current external layer list
    React.useEffect(() => {
        if (layers) {
            const layerManager = context.getLayerManager();
            layerManager.apply(layers);
        }
    }, [context, layers]);
    // Side-effect to set the viewer "instance" once the MapViewerBase component has been mounted.
    // Should only happen once.
    React.useEffect(() => {
        debug(`React.useEffect - Change of innerRef.current`);
        setViewer(context);
        const browserWindow: any = window;
        browserWindow.getViewer = browserWindow.getViewer || getViewer;
        if (agentUri) {
            browserWindow.getClient = browserWindow.getClient || (() => new Client(agentUri, agentKind));
        }
        debug(`React.useEffect - Attached runtime viewer instance and installed browser global APIs`);
    }, [context, agentUri, agentKind]);
    // Side-effect to imperatively refresh the map upon selection change
    React.useEffect(() => {
        debug(`React.useEffect - Change of selection`);
        context.refreshMap(RefreshMode.SelectionOnly);
    }, [context, selection]);

    if (agentUri && map && sessionId && layerTransparency) {
        return <>
            {/* HACK: usePortal=false to workaround what I think is: https://github.com/palantir/blueprint/issues/3248 */}
            <Toaster usePortal={false} position={Position.TOP} ref={toasterRef} />
            <CoreMapViewer context={context}
                onDispatch={dispatch}
                backgroundColor={bgColor}
                loadIndicatorPosition={loadIndicatorPositioning}
                loadIndicatorColor={loadIndicatorColor} />
        </>;
    } else {
        return <div>{tr("LOADING_MSG", locale)}</div>;
    }
};

export const GenericMapViewer = () => {
    const context = React.useContext(MapProviderContext);
};