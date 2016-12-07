import * as React from "react";
import { connect } from "react-redux";
import {
    IMapView,
    IConfigurationReducerState,
    IMapViewerReducerState,
    ReduxDispatch,
    IApplicationState
} from "../api/common";
import { BaseLayerSwitcher } from "../components/base-layer-switcher";
import * as MapActions from "../actions/map";

export interface IBaseLayerSwitcherContainerProps {

}

export interface IBaseLayerSwitcherContainerState {
    config?: IConfigurationReducerState;
}

export interface IBaseLayerSwitcherContainerDispatch {
    setBaseLayer?: (layerName: string) => void;
}

function mapStateToProps(state: IApplicationState): IBaseLayerSwitcherContainerState {
    return {
        config: state.config
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IBaseLayerSwitcherContainerDispatch {
    return {
        setBaseLayer: (layerName: string) => dispatch(MapActions.setBaseLayer(layerName)),
    };
}

export type BaseLayerSwitcherContainerProps = IBaseLayerSwitcherContainerProps & IBaseLayerSwitcherContainerState & IBaseLayerSwitcherContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class BaseLayerSwitcherContainer extends React.Component<BaseLayerSwitcherContainerProps, any> {
    private fnBaseLayerChanged: (name: string) => void;
    constructor(props: BaseLayerSwitcherContainerProps) {
        super(props);
        this.fnBaseLayerChanged = this.onBaseLayerChanged.bind(this);
    }
    private onBaseLayerChanged(layerName: string) {
        if (this.props.setBaseLayer) {
            this.props.setBaseLayer(layerName);
        }
    }
    render(): JSX.Element {
        const { config } = this.props;
        if (config) {
            return <BaseLayerSwitcher onBaseLayerChanged={this.fnBaseLayerChanged} externalBaseLayers={config.externalBaseLayers} />;
        } else {
            return <noscript />;
        }
    }
}