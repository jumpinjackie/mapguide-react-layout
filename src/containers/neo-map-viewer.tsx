import * as React from "react";
import { IViewerComponent, useViewerSideEffects } from '../components/map-providers/base';
import { CURSOR_DIGITIZE_POINT, CURSOR_DIGITIZE_LINE, CURSOR_DIGITIZE_LINESTRING, CURSOR_DIGITIZE_RECT, CURSOR_DIGITIZE_POLYGON, CURSOR_DIGITIZE_CIRCLE, CURSOR_GRABBING, CURSOR_GRAB, CURSOR_ZOOM_IN } from '../constants/assets';
import { MapLoadIndicator } from '../components/map-load-indicator';
import { ActiveMapTool, GenericEvent, ClientKind } from '../api/common';
import { useMapProviderContext, useReduxDispatch } from '../components/map-providers/context';
import { Toaster, Position } from '@blueprintjs/core';
import { isMapGuideProviderState } from '../components/map-providers/mapguide';
import { tr } from '../api/i18n';

import "ol/ol.css";
import { QueryMapFeaturesResponse } from '../api/contracts/query';
import { ISubscriberProps, Subscriber } from './subscriber';
import { useActiveMapClientSelectionSet, useConfiguredLoadIndicatorColor, useConfiguredLoadIndicatorPositioning, useCustomAppSettings, useViewerFlyouts, useViewerSelectCanDragPan } from "./hooks";
import { closeContextMenu, openContextMenu } from "../actions/flyout";
import { WEBLAYOUT_CONTEXTMENU } from "../constants";

/**
 * @hidden
 */
export const MapViewer = ({ children }: { children?: React.ReactNode }) => {
    const context = useMapProviderContext();
    const toasterRef = React.useRef<Toaster>(null);
    const loadIndicatorPositioning = useConfiguredLoadIndicatorPositioning();
    const loadIndicatorColor = useConfiguredLoadIndicatorColor();
    const dispatch = useReduxDispatch();
    const hookFunc = context.getHookFunction();
    const clientSelection = useActiveMapClientSelectionSet();
    const appSettings = useCustomAppSettings();
    const nextState = hookFunc();
    const {
        mapName,
        layers,
        initialExternalLayers,
        bgColor,
        locale
    } = nextState;
    const flyouts = useViewerFlyouts();
    const [shiftKey, setShiftKey] = React.useState(false);
    const [isMouseDown, setIsMouseDown] = React.useState(false);
    const [digitizingType, setDigitizingType] = React.useState<string | undefined>(undefined);
    const [loading, setLoading] = React.useState(0);
    const [loaded, setLoaded] = React.useState(0);
    const [subscribers, setSubscribers] = React.useState<ISubscriberProps[]>([]);
    const mapViewerRef = React.useRef<HTMLDivElement>(null);
    const bContextMenuOpen = (flyouts[WEBLAYOUT_CONTEXTMENU]?.open == true);
    const bSelectCanDragPan = useViewerSelectCanDragPan();

    // HACK: Still have some MG-specific state we're needing to check for here. Minor abstraction leakage.
    let agentUri: string | undefined;
    let agentKind: ClientKind | undefined;
    let selection: QueryMapFeaturesResponse | null = null;
    if (isMapGuideProviderState(nextState)) {
        agentUri = nextState.agentUri;
        agentKind = nextState.agentKind;
        selection = nextState.selection;
    }

    // Lifecycle: componentDidMount/componentWillUnmount
    React.useEffect(() => {
        const onKeyDown = (e: GenericEvent) => {
            context.onKeyDown(e);
            setShiftKey(e.shiftKey);
        };
        const onKeyUp = (e: GenericEvent) => {
            setShiftKey(e.shiftKey);
        };
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);

        // Attach/detach to context
        const mapNode = mapViewerRef.current;
        if (mapNode) {
            context.attachToComponent(mapNode, viewerComponentApi);
        }
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);
            context.detachFromComponent();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Clear selection if clientSelection is falsy
    React.useEffect(() => {
        if (!clientSelection) {
            context.getSelectedFeatures()?.clear();
        }
    }, [clientSelection, context]);

    context.setToasterRef(toasterRef);
    context.setProviderState(nextState);

    useViewerSideEffects(
        context,
        appSettings ?? {},
        nextState.isReady,
        mapName,
        layers,
        initialExternalLayers,
        agentUri,
        agentKind,
        selection
    );

    // IViewerComponent API for context.attachToComponent
    const viewerComponentApi: IViewerComponent = React.useMemo(() => ({
        isShiftKeyDown: () => shiftKey,
        selectCanDragPan: () => bSelectCanDragPan,
        isContextMenuOpen: () => bContextMenuOpen,
        setDigitizingType,
        onBeginDigitization: (_callback: (cancelled: boolean) => void) => { },
        onHideContextMenu: () => hideContextMenuAction(),
        onOpenTooltipLink: (_url: string) => { },
        onDispatch: (action: any) => dispatch(action),
        addImageLoading: () => {
            setLoading(l => {
                context.incrementBusyWorker();
                return (l || 0) + 1;
            });
        },
        addSubscribers: (props: ISubscriberProps[]) => {
            setSubscribers(subs => [...subs, ...props]);
            return props.map(p => p.name);
        },
        removeSubscribers: (names: string[]) => {
            setSubscribers(subs => subs.filter(s => names.indexOf(s.name) < 0));
            return subscribers.filter(s => names.indexOf(s.name) < 0).length < subscribers.length;
        },
        getSubscribers: () => subscribers.map(s => s.name),
        addImageLoaded: () => {
            setLoaded(l => {
                setLoading(loadingVal => {
                    const newLoadedCount = (l || 0) + 1;
                    if (loadingVal === newLoadedCount) {
                        setLoaded(0);
                        setLoading(0);
                    } else {
                        setLoaded(newLoadedCount);
                    }
                    context.decrementBusyWorker();
                    return loadingVal;
                });
                return l;
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [shiftKey, bSelectCanDragPan, bContextMenuOpen, dispatch, context, subscribers]);

    const showContextMenuAction = (pos: [number, number]) => dispatch(openContextMenu({ x: pos[0], y: pos[1] }));
    const hideContextMenuAction = () => dispatch(closeContextMenu());
    const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        if (context.isMouseOverTooltip()) {
            return;
        }
        e.preventDefault();
        showContextMenuAction([e.clientX, e.clientY]);
    };

    // Mouse events
    const onMouseDown = () => {
        setIsMouseDown(true);
    };
    const onMouseUp = () => {
        setIsMouseDown(false);
    };

    // Cursor logic
    const tool = context.getActiveTool();
    const style: React.CSSProperties = {
        width: "100%",
        height: "100%"
    };
    if (!(appSettings?.["DISABLE_CURSORS"] == "1")) {
        if (context.isDigitizing()) {
            switch (digitizingType) {
                case "Point":
                    style.cursor = `url(${CURSOR_DIGITIZE_POINT}), auto`;
                    break;
                case "Line":
                    style.cursor = `url(${CURSOR_DIGITIZE_LINE}), auto`;
                    break;
                case "LineString":
                    style.cursor = `url(${CURSOR_DIGITIZE_LINESTRING}), auto`;
                    break;
                case "Rectangle":
                    style.cursor = `url(${CURSOR_DIGITIZE_RECT}), auto`;
                    break;
                case "Polygon":
                    style.cursor = `url(${CURSOR_DIGITIZE_POLYGON}), auto`;
                    break;
                case "Circle":
                    style.cursor = `url(${CURSOR_DIGITIZE_CIRCLE}), auto`;
                    break;
            }
        } else {
            switch (tool) {
                case ActiveMapTool.Pan:
                    style.cursor = isMouseDown
                        ? `url(${CURSOR_GRABBING}), auto`
                        : `url(${CURSOR_GRAB}), auto`;
                    break;
                case ActiveMapTool.Zoom:
                    style.cursor = `url(${CURSOR_ZOOM_IN}), auto`;
                    break;
            }
        }
    }
    if (bgColor) {
        style.backgroundColor = bgColor;
    }

    if (nextState.isReady) {
        return (
            <>
                {/* HACK: usePortal=false to workaround what I think is: https://github.com/palantir/blueprint/issues/3248 */}
                <Toaster usePortal={false} position={Position.TOP} ref={toasterRef} />
                <div
                    className="map-viewer-component"
                    ref={mapViewerRef}
                    style={style}
                    onContextMenu={onContextMenu}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                >
                    <MapLoadIndicator
                        loaded={loaded || 0}
                        loading={loading || 0}
                        position={loadIndicatorPositioning}
                        color={loadIndicatorColor}
                    />
                    {subscribers.map((s, i) => (
                        <Subscriber key={`subscriber-${i}-${s.name}`} {...s} />
                    ))}
                    {children}
                </div>
            </>
        );
    } else {
        return <div>{tr("LOADING_MSG", locale)}</div>;
    }
}