import * as React from "react";
import { connect } from "react-redux";
import {
    ReduxDispatch,
    IApplicationState,
    IViewerReducerState,
    IConfigurationReducerState
} from "../api/common";
import * as MapActions from "../actions/map";
import { tr } from "../api/i18n";

export interface IViewerOptionsProps {

}

export interface IViewerOptionsState {
    viewer: IViewerReducerState;
    config: IConfigurationReducerState;
}

export interface IViewerOptionsDispatch {
    toggleMapTips: (enabled: boolean) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>, ownProps: IViewerOptionsProps): Partial<IViewerOptionsState> {
    return {
        viewer: state.viewer,
        config: state.config
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IViewerOptionsDispatch> {
    return {
        toggleMapTips: (enabled) => dispatch(MapActions.setFeatureTooltipsEnabled(enabled))
    };
}

export type ViewerOptionsProps = IViewerOptionsProps & Partial<IViewerOptionsState> & Partial<IViewerOptionsDispatch>;

export class ViewerOptions extends React.Component<ViewerOptionsProps, any> {
    private fnFeatureTooltipsChanged: GenericEventHandler;
    constructor(props: ViewerOptionsProps) {
        super(props);
        this.fnFeatureTooltipsChanged = this.onFeatureTooltipsChanged.bind(this);
    }
    private onFeatureTooltipsChanged(e: GenericEvent) {
        const { toggleMapTips } = this.props;
        if (toggleMapTips) {
            toggleMapTips(e.target.checked);
        }
    }
    render(): JSX.Element {
        const { viewer, config } = this.props;
        const locale = config ? config.locale : "en";
        return <div className="component-viewer-options">
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewerOptions);