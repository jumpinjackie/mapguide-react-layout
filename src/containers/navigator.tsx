import * as React from "react";
import { ICommand } from "../api/common";
import { Navigator, ZoomDirection, PanDirection } from "../components/navigator";
import { getCommand, DefaultCommands } from "../api/registry/command";
import { useViewerLocale, useActiveMapView, useActiveMapName, useViewerBusyCount } from './hooks';
import { invokeCommand, setScale } from '../actions/map';
import { useActiveMapFiniteScales } from './hooks-mapguide';
import { useMapProviderContext, useReduxDispatch } from "../components/map-providers/context";

export interface INavigatorContainerProps {
    style?: React.CSSProperties;
}

export const NavigatorContainer = (props: INavigatorContainerProps) => {
    const { style } = props;
    const dispatch = useReduxDispatch();
    const locale = useViewerLocale();
    const finiteScales = useActiveMapFiniteScales();
    const view = useActiveMapView();
    const busyCount = useViewerBusyCount();
    const activeMapName = useActiveMapName();
    const viewer = useMapProviderContext();
    const setScaleAction = (mapName: string, scale: number) => dispatch(setScale(viewer, mapName, scale));
    const invokeCommandAction = (cmd: ICommand, parameters?: any) => dispatch(invokeCommand(cmd, viewer, parameters));
    const onZoom = (direction: ZoomDirection) => {
        let cmd: ICommand | undefined;
        switch (direction) {
            case ZoomDirection.In:
                cmd = getCommand(DefaultCommands.ZoomIn);
                break;
            case ZoomDirection.Out:
                cmd = getCommand(DefaultCommands.ZoomOut);
                break;
        }
        if (cmd) {
            invokeCommandAction(cmd);
        }
    };
    const onPan = (direction: PanDirection) => {
        let cmd: ICommand | undefined;
        switch (direction) {
            case PanDirection.East:
                cmd = getCommand(DefaultCommands.PanRight);
                break;
            case PanDirection.West:
                cmd = getCommand(DefaultCommands.PanLeft);
                break;
            case PanDirection.North:
                cmd = getCommand(DefaultCommands.PanUp);
                break;
            case PanDirection.South:
                cmd = getCommand(DefaultCommands.PanDown);
                break;
        }
        if (cmd) {
            invokeCommandAction(cmd);
        }
    };
    const onRequestZoomToScale = (scale: number) => {
        if (activeMapName) {
            setScaleAction(activeMapName, scale);
        }
    };
    if (view) {
        return <Navigator style={style}
            scale={view.scale}
            finiteScaleList={finiteScales}
            locale={locale}
            busy={busyCount > 0}
            onRequestZoomToScale={onRequestZoomToScale}
            onPan={onPan}
            onZoom={onZoom} />;
    } else {
        return <div />;
    }
}