import * as React from "react";
import { connect } from "react-redux";
import {
    IMapView,
    INameValuePair,
    IConfigurationReducerState,
    IExternalBaseLayer,
    ReduxDispatch,
    IApplicationState
} from "../api/common";
import { MapMenu } from "../components/map-menu";
import * as MapActions from "../actions/map";

export interface IMapMenuContainerState {
    locale: string;
    activeMapName: string;
    availableMaps: INameValuePair[];
}

export interface IMapMenuContainerDispatch {
    setActiveMap: (mapName: string) => void;
}

function mapStateToProps(state: IApplicationState): Partial<IMapMenuContainerState> {
    return {
        locale: state.config.locale,
        activeMapName: state.config.activeMapName,
        availableMaps: state.config.availableMaps
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IMapMenuContainerDispatch {
    return {
        setActiveMap: (mapName: string) => dispatch(MapActions.setActiveMap(mapName))
    }
}

export type MapMenuContainerProps = Partial<IMapMenuContainerState> & Partial<IMapMenuContainerDispatch>;

@connect(mapStateToProps, mapDispatchToProps)
export class MapMenuContainer extends React.Component<MapMenuContainerProps, any> {
    private fnActiveMapChanged: (name: string) => void;
    constructor(props: MapMenuContainerProps) {
        super(props);
        this.fnActiveMapChanged = this.onActiveMapChanged.bind(this);
    }
    private onActiveMapChanged(mapName: string) {
        const { setActiveMap } = this.props;
        if (setActiveMap) {
            setActiveMap(mapName);
        }
    }
    render(): JSX.Element {
        const { locale, activeMapName, availableMaps } = this.props;
        if (locale && activeMapName && availableMaps) {
            //TODO: Should use MapGroup id has label. For now, use map name for both
            const entries = availableMaps.map(m => {
                return { label: m.name, mapName: m.value };
            });
            return <MapMenu onActiveMapChanged={this.fnActiveMapChanged} selectedMap={activeMapName} maps={entries} locale={locale} />;
        } else {
            return <noscript />;
        }
    }
}