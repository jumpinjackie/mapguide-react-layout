import * as React from "react";
import { connect } from "react-redux";
import { SelectedFeatureCount } from "../components/selected-feature-count";
import { QueryMapFeaturesResponse } from "../api/contracts/query";
import { IMapView } from "../api/common";
import { tr } from "../api/i18n";

interface IScaleDisplayContainerState {
    style?: React.CSSProperties;
    view?: IMapView;
    config?: any;
}

function mapStateToProps(state: any): IScaleDisplayContainerState {
    return {
        config: state.config,
        view: state.view.current
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch) {
    return {
        
    };
}

type ScaleDisplayContainerProps = IScaleDisplayContainerState;

@connect(mapStateToProps, mapDispatchToProps)
export class ScaleDisplayContainer extends React.Component<ScaleDisplayContainerProps, any> {
    constructor(props: ScaleDisplayContainerProps) {
        super(props);
    }
    render(): JSX.Element {
        const { view, style, config } = this.props;
        if (view != null) {
            const label = tr("FMT_SCALE_DISPLAY", config.locale, {
                scale: view.scale.toFixed(2)
            });
            return <div className="component-scale-display" style={style}>
                {label}
            </div>;
        } else {
            return <div />;
        }
    }
}