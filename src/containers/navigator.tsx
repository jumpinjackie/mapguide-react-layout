import * as React from "react";
import { connect } from "react-redux";
import { Navigator } from "../components/navigator";
import { QueryMapFeaturesResponse } from "../api/contracts/query";

interface INavigatorContainerStyle {
    style?: React.CSSProperties;
}

interface INavigatorContainerState {
    viewer?: any;
}

function mapStateToProps(state): INavigatorContainerState {
    return {
        viewer: state.map.viewer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class NavigatorContainer extends React.Component<INavigatorContainerStyle & INavigatorContainerState, any> {
    private fnZoom: (direction) => void;
    private fnPan: (direction) => void;
    constructor(props) {
        super(props);
        this.fnZoom = this.onZoom;
        this.fnPan = this.onPan;
    }
    onZoom(direction) {

    }
    onPan(direction) {

    }
    render(): JSX.Element {
        const { style, viewer } = this.props;
        return <Navigator style={style} busy={viewer.busyCount > 0} onPan={this.fnPan} onZoom={this.fnZoom} />;
    }
}