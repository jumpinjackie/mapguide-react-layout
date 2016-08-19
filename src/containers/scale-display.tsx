import * as React from "react";
import { connect } from "react-redux";
import { SelectedFeatureCount } from "../components/selected-feature-count";
import { QueryMapFeaturesResponse } from "../api/contracts/query";
import { IMapView } from "../components/context";
import { getCurrentScale } from "../api/runtime";
import { Bounds } from "../components/map-viewer-base";

interface IScaleDisplayContainerState {
    style?: React.CSSProperties;
    view?: IMapView|Bounds;
}

function mapStateToProps(state): IScaleDisplayContainerState {
    return {
        view: state.view.current
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class ScaleDisplayContainer extends React.Component<IScaleDisplayContainerState, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        const { view, style } = this.props;
        if (view != null) {
            let scale = getCurrentScale(view);
            return <div className="component-scale-display" style={style}>
                Scale - 1:{scale.toFixed(2)}
            </div>;
        } else {
            return <div />;
        }
    }
}