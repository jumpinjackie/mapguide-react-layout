import * as React from "react";
import { connect } from "react-redux";
import { SelectionPanel } from "../components/selection-panel";
import { QueryMapFeaturesResponse, SelectedFeature } from "../api/contracts/query";
import * as MapActions from "../actions/map";
import { getViewer } from "../api/runtime";
import { tr } from "../api/i18n";
import {
    IMapView,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    getSelectionSet
} from "../api/common";

export interface ISelectionPanelContainerProps {
    maxHeight?: number;
}

export interface ISelectionPanelContainerState {
    config: IConfigurationReducerState,
    selection: QueryMapFeaturesResponse;
}

export interface ISelectionPanelContainerDispatch {
    setCurrentView: (view: IMapView) => void;
}

function mapStateToProps(state: IApplicationState, ownProps: ISelectionPanelContainerProps): Partial<ISelectionPanelContainerState> {
    return {
        config: state.config,
        selection: getSelectionSet(state)
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<ISelectionPanelContainerDispatch> {
    return {
        setCurrentView: (view) => dispatch(MapActions.setCurrentView(view))
    };
}

export type SelectionPanelContainerProps = ISelectionPanelContainerProps & Partial<ISelectionPanelContainerState> & Partial<ISelectionPanelContainerDispatch>;

class SelectionPanelContainer extends React.Component<SelectionPanelContainerProps, any> {
    private fnZoomToSelectedFeature: (feature: SelectedFeature) => void;
    constructor(props: SelectionPanelContainerProps) {
        super(props);
        this.fnZoomToSelectedFeature = this.onZoomToSelectedFeature.bind(this);
    }
    private onZoomToSelectedFeature(feature: SelectedFeature) {
        const bbox: any = feature.Bounds.split(" ").map(s => parseFloat(s));
        const viewer = getViewer();
        if (viewer && this.props.setCurrentView) {
            const view = viewer.getViewForExtent(bbox);
            this.props.setCurrentView(view);
        }
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : "en";
    }
    render(): JSX.Element {
        const { selection, config, maxHeight } = this.props;
        const locale = this.getLocale();
        if (selection != null &&
            selection.SelectedFeatures != null) {
            return <SelectionPanel locale={locale} selection={selection.SelectedFeatures} onRequestZoomToFeature={this.fnZoomToSelectedFeature} maxHeight={maxHeight} />;
        } else {
            return <div className="pt-callout pt-intent-primary pt-icon-info-sign">
                <p className="selection-panel-no-selection">{tr("NO_SELECTED_FEATURES", locale)}</p>
            </div>;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionPanelContainer);