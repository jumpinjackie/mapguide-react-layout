import * as React from "react";
import { connect } from "react-redux";
import { ICommand } from "../api/common";
import { Navigator, ZoomDirection, PanDirection } from "../components/navigator";
import { QueryMapFeaturesResponse } from "../api/contracts/query";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { getViewer } from "../api/runtime";
import { invokeCommand, setScale } from "../actions/map";
import { getCommand, DefaultCommands } from "../api/registry/command";
import {
    IMapView,
    IConfigurationReducerState,
    IMapViewerReducerState,
    ReduxDispatch,
    IApplicationState
} from "../api/common";

interface INavigatorContainerProps {
    style?: React.CSSProperties;
}

interface INavigatorContainerState {
    viewer: IMapViewerReducerState;
    config: IConfigurationReducerState;
    view: IMapView | null;
}

interface INavigatorContainerDispatch {
    invokeCommand?: (cmd: ICommand) => void;
    setScale?: (scale: number) => void;
}

function mapStateToProps(state: IApplicationState): INavigatorContainerState {
    return {
        config: state.config,
        viewer: state.map.viewer,
        view: state.view.current
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): INavigatorContainerDispatch {
    return {
        setScale: (scale) => dispatch(setScale(scale)),
        invokeCommand: (cmd) => dispatch(invokeCommand(cmd))
    };
}

type NavigatorContainerProps = INavigatorContainerProps & INavigatorContainerState & INavigatorContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class NavigatorContainer extends React.Component<NavigatorContainerProps, any> {
    private fnZoom: (direction: ZoomDirection) => void;
    private fnPan: (direction: PanDirection) => void;
    private fnRequestZoomToScale: (scale: number) => void;
    constructor(props: NavigatorContainerProps) {
        super(props);
        this.fnZoom = this.onZoom.bind(this);
        this.fnPan = this.onPan.bind(this);
        this.fnRequestZoomToScale = this.onRequestZoomToScale.bind(this);
    }
    private onZoom(direction: ZoomDirection) {
        let cmd: ICommand | undefined;
        switch (direction) {
            case ZoomDirection.In:
                cmd = getCommand(DefaultCommands.ZoomIn);
                break;
            case ZoomDirection.Out:
                cmd = getCommand(DefaultCommands.ZoomOut);
                break;
        }
        if (cmd && this.props.invokeCommand) {
            this.props.invokeCommand(cmd);
        }
    }
    private onPan(direction: PanDirection) {
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
        if (cmd && this.props.invokeCommand) {
            this.props.invokeCommand(cmd);
        }
    }
    private onRequestZoomToScale(scale: number) {
        if (this.props.setScale) {
            this.props.setScale(scale);
        }
    }
    render(): JSX.Element {
        const { style, viewer, view, config } = this.props;
        if (viewer != null && view != null) {
            return <Navigator style={style}
                              scale={view.scale}
                              locale={config.locale}
                              busy={viewer.busyCount > 0}
                              onRequestZoomToScale={this.fnRequestZoomToScale}
                              onPan={this.fnPan}
                              onZoom={this.fnZoom} />;
        } else {
            return <div />;
        }
    }
}