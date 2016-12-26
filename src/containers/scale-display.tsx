import * as React from "react";
import { connect } from "react-redux";
import { SelectedFeatureCount } from "../components/selected-feature-count";
import { QueryMapFeaturesResponse } from "../api/contracts/query";
import {
    IMapView,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState
} from "../api/common";
import { tr } from "../api/i18n";

export interface IScaleDisplayContainerState {
    style?: React.CSSProperties;
    view: IMapView | null;
    config: IConfigurationReducerState;
}

function mapStateToProps(state: IApplicationState): IScaleDisplayContainerState {
    return {
        config: state.config,
        view: state.view.current
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch) {
    return {
        
    };
}

export type ScaleDisplayContainerProps = Partial<IScaleDisplayContainerState>;

@connect(mapStateToProps, mapDispatchToProps)
export class ScaleDisplayContainer extends React.Component<ScaleDisplayContainerProps, any> {
    constructor(props: ScaleDisplayContainerProps) {
        super(props);
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : "en";
    }
    render(): JSX.Element {
        const { view, style, config } = this.props;
        const locale = this.getLocale();
        if (view != null) {
            const label = tr("FMT_SCALE_DISPLAY", locale, {
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