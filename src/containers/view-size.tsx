import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState, ReduxDispatch, UnitOfMeasure, IMapView } from "../api/common";
import { NBSP } from "../constants/index";
import { ViewSize } from "../components/view-size";

export interface IViewSizeContainerProps {

}

export interface IViewSizeContainerState {
    width: number;
    height: number;
    sizeUnits: UnitOfMeasure;
    view: IMapView;
    metersPerUnit: number;
}

export interface IViewSizeContainerDispatch {

}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IViewSizeContainerState> {
    let width;
    let height;
    let view;
    let metersPerUnit = 1.0;
    if (state.viewer.size) {
        width = state.viewer.size[0];
        height = state.viewer.size[1];
    }
    if (state.config.activeMapName) {
        const ms = state.mapState[state.config.activeMapName];
        view = ms.currentView;
        if (ms.runtimeMap) {
            metersPerUnit = ms.runtimeMap.CoordinateSystem.MetersPerUnit;
        }
    }
    return {
        width,
        height,
        view,
        metersPerUnit,
        sizeUnits: state.config.viewSizeUnits
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IViewSizeContainerDispatch> {
    return {

    };
}

export type ViewSizeContainerProps = Partial<IViewSizeContainerProps> & Partial<IViewSizeContainerState> & Partial<IViewSizeContainerDispatch>;

export class ViewSizeContainer extends React.Component<ViewSizeContainerProps, any> {
    constructor(props: ViewSizeContainerProps) {
        super(props);
    }
    render(): JSX.Element {
        const { width, height, view, sizeUnits, metersPerUnit } = this.props;
        if (width && height && metersPerUnit && view) {
            return <ViewSize width={width} height={height} view={view} metersPerUnit={metersPerUnit} units={sizeUnits || UnitOfMeasure.Unknown} />;
        } else {
            return <noscript />;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(ViewSizeContainer);