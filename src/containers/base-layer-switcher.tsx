import * as React from "react";
import { connect } from "react-redux";
import {
    IMapView,
    IConfigurationReducerState,
    IExternalBaseLayer,
    ReduxDispatch,
    IApplicationState
} from "../api/common";
import { BaseLayerSwitcher } from "../components/base-layer-switcher";
import * as MapActions from "../actions/map";

export interface IBaseLayerSwitcherContainerProps {

}

export interface IBaseLayerSwitcherContainerState {
    mapName: string;
    locale: string;
    externalBaseLayers: IExternalBaseLayer[];
}

export interface IBaseLayerSwitcherContainerDispatch {
    setBaseLayer: (mapName: string, layerName: string) => void;
}

function mapStateToProps(state: IApplicationState): Partial<IBaseLayerSwitcherContainerState> {
    let externalBaseLayers;
    if (state.config.activeMapName) {
        externalBaseLayers = state.mapState[state.config.activeMapName].externalBaseLayers;
    }
    return {
        mapName: state.config.activeMapName,
        locale: state.config.locale,
        externalBaseLayers: externalBaseLayers
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IBaseLayerSwitcherContainerDispatch {
    return {
        setBaseLayer: (mapName: string, layerName: string) => dispatch(MapActions.setBaseLayer(mapName, layerName)),
    };
}

export type BaseLayerSwitcherContainerProps = IBaseLayerSwitcherContainerProps & Partial<IBaseLayerSwitcherContainerState> & Partial<IBaseLayerSwitcherContainerDispatch>;

@connect(mapStateToProps, mapDispatchToProps)
export class BaseLayerSwitcherContainer extends React.Component<BaseLayerSwitcherContainerProps, any> {
    private fnBaseLayerChanged: (name: string) => void;
    constructor(props: BaseLayerSwitcherContainerProps) {
        super(props);
        this.fnBaseLayerChanged = this.onBaseLayerChanged.bind(this);
    }
    private onBaseLayerChanged(layerName: string) {
        const { mapName, setBaseLayer } = this.props;
        if (setBaseLayer && mapName) {
            setBaseLayer(mapName, layerName);
        }
    }
    render(): JSX.Element {
        const { locale, externalBaseLayers } = this.props;
        if (locale && externalBaseLayers) {
            return <BaseLayerSwitcher onBaseLayerChanged={this.fnBaseLayerChanged} externalBaseLayers={externalBaseLayers} locale={locale} />;
        } else {
            return <noscript />;
        }
    }
}