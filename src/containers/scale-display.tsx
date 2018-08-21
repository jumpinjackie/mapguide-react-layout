import * as React from "react";
import { connect } from "react-redux";
import { SelectedFeatureCount } from "../components/selected-feature-count";
import { QueryMapFeaturesResponse } from "../api/contracts/query";
import { setScale } from "../actions/map";
import {
    IMapView,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    getCurrentView,
    getRuntimeMap
} from "../api/common";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import { ScaleDisplay } from "../components/scale-display";

export interface IScaleDisplayContainerState {
    style?: React.CSSProperties;
    view: IMapView;
    config: IConfigurationReducerState;
    finiteScales: number[] | undefined;
}

export interface IScaleDisplayContainerDispatch {
    setScale: (mapName: string, scale: number) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IScaleDisplayContainerState> {
    const map = getRuntimeMap(state);
    return {
        config: state.config,
        view: getCurrentView(state),
        finiteScales: map != null ? map.FiniteDisplayScale : undefined
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IScaleDisplayContainerDispatch> {
    return {
        setScale: (mapName, scale) => dispatch(setScale(mapName, scale))
    };
}

export type ScaleDisplayContainerProps = Partial<IScaleDisplayContainerState> & Partial<IScaleDisplayContainerDispatch>;

export class ScaleDisplayContainer extends React.Component<ScaleDisplayContainerProps, any> {
    constructor(props: ScaleDisplayContainerProps) {
        super(props);
        this.state = {};
    }
    private onScaleChanged = (scale: number) => {
        const { setScale, config } = this.props;
        if (setScale && config && config.activeMapName) {
            setScale(config.activeMapName, scale);
        }
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : DEFAULT_LOCALE;
    }
    componentDidUpdate(prevProps: ScaleDisplayContainerProps) {
        const nextProps = this.props;
        const { finiteScales, view } = nextProps;
        if (!finiteScales && view && view.scale != this.state.localScale) {
            this.setState({ localScale: view.scale });
        }
    }
    render(): JSX.Element {
        const { view, style, config, finiteScales } = this.props;
        const locale = this.getLocale();
        if (view) {
            return <ScaleDisplay onScaleChanged={this.onScaleChanged}
                                 view={view}
                                 style={style}
                                 finiteScales={finiteScales}
                                 locale={locale} />;
        } else {
            return <noscript />;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(ScaleDisplayContainer);