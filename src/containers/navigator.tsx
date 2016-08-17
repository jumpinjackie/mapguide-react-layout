import * as React from "react";
import { connect } from "react-redux";
import { Navigator, ZoomDirection, PanDirection } from "../components/navigator";
import { QueryMapFeaturesResponse } from "../api/contracts/query";
import { getViewer } from "../api/runtime";
import { invokeCommand } from "../actions/map";
import { getCommand, DefaultCommands } from "../api/command-registry";

interface INavigatorContainerProps {
    style?: React.CSSProperties;
}

interface INavigatorContainerState {
    viewer?: any;
}

interface INavigatorContainerDispatch {
    invokeCommand?: (cmd) => void;
}

function mapStateToProps(state): INavigatorContainerState {
    return {
        viewer: state.map.viewer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        invokeCommand: (cmd) => dispatch(invokeCommand(cmd))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class NavigatorContainer extends React.Component<INavigatorContainerProps & INavigatorContainerState & INavigatorContainerDispatch, any> {
    private fnZoom: (direction) => void;
    private fnPan: (direction) => void;
    constructor(props) {
        super(props);
        this.fnZoom = this.onZoom.bind(this);
        this.fnPan = this.onPan.bind(this);
    }
    private onZoom(direction) {
        let cmd;
        switch (direction) {
            case ZoomDirection.In:
                cmd = getCommand(DefaultCommands.ZoomIn);
                break;
            case ZoomDirection.Out:
                cmd = getCommand(DefaultCommands.ZoomOut);
                break;
        }
        if (cmd != null)
            this.props.invokeCommand(cmd);
    }
    private onPan(direction) {

    }
    render(): JSX.Element {
        const { style, viewer } = this.props;
        return <Navigator style={style} busy={viewer.busyCount > 0} onPan={this.fnPan} onZoom={this.fnZoom} />;
    }
}