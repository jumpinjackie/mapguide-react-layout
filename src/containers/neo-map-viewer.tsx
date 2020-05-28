import * as React from "react";
import * as ReactDOM from "react-dom";
import { IMapProviderContext, IViewerComponent, useViewerSideEffects } from '../components/map-providers/base';
import { CURSOR_DIGITIZE_POINT, CURSOR_DIGITIZE_LINE, CURSOR_DIGITIZE_LINESTRING, CURSOR_DIGITIZE_RECT, CURSOR_DIGITIZE_POLYGON, CURSOR_DIGITIZE_CIRCLE, CURSOR_GRABBING, CURSOR_GRAB, CURSOR_ZOOM_IN } from '../constants/assets';
import { MapLoadIndicator } from '../components/map-load-indicator';
import { ActiveMapTool, MapLoadIndicatorPositioning, GenericEvent, ReduxDispatch, ClientKind } from '../api/common';
import { MapProviderContext } from '../components/map-providers/context';
import { useConfiguredLoadIndicatorPositioning, useConfiguredLoadIndicatorColor } from './hooks';
import { isMapGuideProviderState } from '../components/map-providers/mapguide';
import { tr } from '../api/i18n';
import { useDispatch } from 'react-redux';
import "ol/ol.css";
import { QueryMapFeaturesResponse } from '../api/contracts/query';
import { ISubscriberProps, Subscriber } from './subscriber';

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
    subscribers: ISubscriberProps[];
}

class CoreMapViewer extends React.Component<ICoreMapViewerProps, ICoreMapViewerState> implements IViewerComponent {
    constructor(props: ICoreMapViewerProps) {
        super(props);
        this.state = {
            shiftKey: false,
            isMouseDown: false,
            digitizingType: undefined,
            loaded: 0,
            loading: 0,
            subscribers: []
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
    addSubscribers = (props: ISubscriberProps[]) => {
        const subscribers = [...this.state.subscribers, ...props];
        this.setState({ subscribers });
        return props.map(p => p.name);
    }
    removeSubscribers = (names: string[]) => {
        const { subscribers } = this.state;
        const ol = subscribers.length;
        const ns = subscribers.filter(s => names.indexOf(s.name) < 0);
        this.setState({ subscribers });
        return ns.length < ol;
    }
    getSubscribers(): string[] {
        return this.state.subscribers.map(s => s.name);
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
    componentWillUnmount() {
        this.props.context.detachFromComponent();
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
        const { loading, loaded, subscribers } = this.state;
        return <div className="map-viewer-component" style={style} onContextMenu={this.onContextMenu} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
            <MapLoadIndicator loaded={loaded || 0} loading={loading || 0} position={this.props.loadIndicatorPosition} color={this.props.loadIndicatorColor} />
            {subscribers.map((s, i) => <Subscriber key={`subscriber-${i}-${s.name}`} {...s} />)}
        </div>;
    }
}

export const MapViewer = () => {
    const context = React.useContext(MapProviderContext);
    const loadIndicatorPositioning = useConfiguredLoadIndicatorPositioning();
    const loadIndicatorColor = useConfiguredLoadIndicatorColor();
    const dispatch = useDispatch();
    const hookFunc = context.getHookFunction();
    const nextState = hookFunc();
    const {
        mapName,
        layers,
        initialExternalLayers,
        bgColor,
        locale
    } = nextState;
    //HACK: Still have some MG-specific state we're needing to check for here. Minor abstraction leakage.
    let agentUri: string | undefined;
    let agentKind: ClientKind | undefined;
    let selection: QueryMapFeaturesResponse | null = null;
    if (isMapGuideProviderState(nextState)) {
        agentUri = nextState.agentUri;
        agentKind = nextState.agentKind;
        selection = nextState.selection;
    }
    context.setProviderState(nextState);
    useViewerSideEffects(context, mapName, layers, initialExternalLayers, agentUri, agentKind, selection);

    if (nextState.isReady) {
        return <>
            <CoreMapViewer context={context}
                onDispatch={dispatch}
                backgroundColor={bgColor}
                loadIndicatorPosition={loadIndicatorPositioning}
                loadIndicatorColor={loadIndicatorColor} />
        </>;
    } else {
        return <div>{tr("LOADING_MSG", locale)}</div>;
    }
}