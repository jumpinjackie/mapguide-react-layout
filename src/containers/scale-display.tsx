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
    private fnFiniteScaleChanged: GenericEventHandler;
    private fnScaleKeyPressed: GenericEventHandler;
    private fnScaleInputChanged: GenericEventHandler;
    constructor(props: ScaleDisplayContainerProps) {
        super(props);
        this.fnFiniteScaleChanged = this.onFiniteScaleChanged.bind(this);
        this.fnScaleKeyPressed = this.onScaleKeyPressed.bind(this);
        this.fnScaleInputChanged = this.onScaleInputChanged.bind(this);
    }
    private onFiniteScaleChanged(e: GenericEvent) {
        if (this.props.setScale) {
            this.props.setScale(parseInt(e.target.value, 10));
        }
    }
    private onScaleKeyPressed(e: GenericEvent) {
        if (e.key == 'Enter' && this.props.setScale) {
            this.props.setScale(this.state.localScale);
        }
    }
    private onScaleInputChanged(e: GenericEvent) {
        this.setState({ localScale: parseFloat(e.target.value) });
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
        if (view != null) {
            const label = tr("FMT_SCALE_DISPLAY", locale, {
                scale: ""
            });

            if (finiteScales) {
                return <div className="component-scale-display" style={style}>
                    {label} <select className="scale-input" value={view.scale} onChange={this.fnFiniteScaleChanged}>
                        {finiteScales.map(s => {
                            return <option key={s} value={s}>{s}</option>;
                        })}
                    </select>
                </div>;
            } else {
                return <div className="component-scale-display" style={style}>
                    {label} <input className="scale-input" type="number" value={this.state.localScale} onChange={this.fnScaleInputChanged} onKeyPress={this.fnScaleKeyPressed} />
                </div>;
            }
        } else {
            return <div />;
        }
    }
}