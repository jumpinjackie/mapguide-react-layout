import * as React from "react";
import { connect } from "react-redux";
import {
    ReduxDispatch,
    IApplicationState,
    IMapViewerReducerState,
    IConfigurationReducerState
} from "../api/common";
import { MAP_SET_MAPTIP } from "../constants";
import { tr } from "../api/i18n";

export interface IViewerOptionsProps {

}

export interface IViewerOptionsState {
    viewer?: IMapViewerReducerState;
    config?: IConfigurationReducerState;
}

export interface IViewerOptionsDispatch {
    toggleMapTips: (enabled: boolean) => void;
}

function mapStateToProps(state: IApplicationState): IViewerOptionsState {
    return {
        viewer: state.map.viewer,
        config: state.config
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IViewerOptionsDispatch {
    return {
        toggleMapTips: (enabled: boolean) => {
            dispatch({
                type: MAP_SET_MAPTIP,
                payload: enabled
            });
        }
    };
}

export type ViewerOptionsProps = IViewerOptionsProps & IViewerOptionsState & IViewerOptionsDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class ViewerOptions extends React.Component<ViewerOptionsProps, any> {
    private fnFeatureTooltipsChanged: GenericEventHandler;
    constructor(props: ViewerOptionsProps) {
        super(props);
        this.fnFeatureTooltipsChanged = this.onFeatureTooltipsChanged.bind(this);
    }
    private onFeatureTooltipsChanged(e: GenericEvent) {
        const { toggleMapTips } = this.props;
        toggleMapTips(e.target.checked);
    }
    render(): JSX.Element {
        const { viewer, config } = this.props;
        const locale = config ? config.locale : "en";
        return <div style={{ padding: 5 }}>
            <h5>{tr("VIEWER_OPTIONS", locale)}</h5>
            <hr />
            {(() => {
                if (viewer) {
                    return <label className="pt-control pt-switch">
                        <input type="checkbox" checked={viewer.featureTooltipsEnabled} onChange={this.fnFeatureTooltipsChanged} />
                        <span className="pt-control-indicator"></span>
                        {tr("FEATURE_TOOLTIPS", locale)}
                    </label>;
                }
            })()}
        </div>;
    }
}