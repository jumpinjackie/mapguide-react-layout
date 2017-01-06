import * as React from "react";
import { connect } from "react-redux";
import { SelectedFeatureCount } from "../components/selected-feature-count";
import { QueryMapFeaturesResponse } from "../api/contracts/query";
import { setScale } from "../actions/map";
import {
    IMapView,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState
} from "../api/common";
import { tr } from "../api/i18n";
import { ScaleDisplay } from "../components/scale-display";

export interface IScaleDisplayContainerState {
    style?: React.CSSProperties;
    view: IMapView | null;
    config: IConfigurationReducerState;
    finiteScales: number[] | null | undefined;
}

export interface IScaleDisplayContainerDispatch {
    setScale: (scale: number) => void;
}

function mapStateToProps(state: IApplicationState): IScaleDisplayContainerState {
    return {
        config: state.config,
        view: state.view.current,
        finiteScales: state.map.state != null ? state.map.state.FiniteDisplayScale : undefined
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IScaleDisplayContainerDispatch {
    return {
        setScale: (scale) => dispatch(setScale(scale))
    };
}

export type ScaleDisplayContainerProps = Partial<IScaleDisplayContainerState> & Partial<IScaleDisplayContainerDispatch>;

@connect(mapStateToProps, mapDispatchToProps)
export class ScaleDisplayContainer extends React.Component<ScaleDisplayContainerProps, any> {
    private fnScaleChanged: (scale: number) => void;
    constructor(props: ScaleDisplayContainerProps) {
        super(props);
        this.fnScaleChanged = this.onScaleChanged.bind(this);
    }
    private onScaleChanged(scale: number) {
        if (this.props.setScale) {
            this.props.setScale(scale);
        }
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : "en";
    }
    componentWillReceiveProps(nextProps: ScaleDisplayContainerProps) {
        const { finiteScales, view } = nextProps;
        if (!finiteScales && view) {
            this.setState({ localScale: view.scale });
        }
    }
    render(): JSX.Element {
        const { view, style, config, finiteScales } = this.props;
        const locale = this.getLocale();
        if (view) {
            return <ScaleDisplay onScaleChanged={this.fnScaleChanged}
                                 view={view} 
                                 style={style} 
                                 finiteScales={finiteScales} 
                                 locale={locale} />;
        } else {
            return <noscript />;
        }
    }
}