import * as React from "react";
import { connect } from "react-redux";
import { SelectedFeatureCount } from "../components/selected-feature-count";
import { QueryMapFeaturesResponse } from "../api/contracts/query";
import { IMapView } from "../components/context";

interface IScaleDisplayContainerState {
    style?: React.CSSProperties;
    view?: IMapView;
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
            return <div className="component-scale-display" style={style}>
                Scale - 1:{view.scale.toFixed(2)}
            </div>;
        } else {
            return <div />;
        }
    }
}