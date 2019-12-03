import * as React from "react";
import { useDispatch } from "react-redux";
import { ICommand } from "../api/common";
import { Navigator, ZoomDirection, PanDirection } from "../components/navigator";
import * as MapActions from "../actions/map";
import { getCommand, DefaultCommands } from "../api/registry/command";
import { useViewerLocale, useActiveMapFiniteScales, useActiveMapView, useActiveMapName, useViewerBusyCount } from './hooks';

export interface INavigatorContainerProps {
    style?: React.CSSProperties;
}

const NavigatorContainer = (props: INavigatorContainerProps) => {
    const { style } = props;
    const dispatch = useDispatch();
    const locale = useViewerLocale();
    const finiteScales = useActiveMapFiniteScales();
    const view = useActiveMapView();
    const busyCount = useViewerBusyCount();;
    const activeMapName = useActiveMapName();
    const setScale = (mapName: string, scale: number) => dispatch(MapActions.setScale(mapName, scale));
    const invokeCommand = (cmd: ICommand, parameters?: any) => dispatch(MapActions.invokeCommand(cmd, parameters));
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
            invokeCommand(cmd);
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
            invokeCommand(cmd);
        }
    };
    const onRequestZoomToScale = (scale: number) => {
        if (activeMapName) {
            setScale(activeMapName, scale);
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

export default NavigatorContainer;