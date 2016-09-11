import * as React from "react";
import { connect } from "react-redux";
import { SelectionPanel } from "../components/selection-panel";
import { QueryMapFeaturesResponse } from "../api/contracts/query";
import * as MapActions from "../actions/map";
import { getViewer } from "../api/runtime";
import { tr } from "../api/i18n";

interface ISelectionPanelContainerProps {

}

interface ISelectionPanelContainerState {
    config?: any;
    selection?: QueryMapFeaturesResponse;
}

interface ISelectionPanelContainerDispatch {
    setCurrentView?: (view) => void;
}

function mapStateToProps(state): ISelectionPanelContainerState {
    return {
        config: state.config,
        selection: state.selection.selectionSet
    };
}

function mapDispatchToProps(dispatch): ISelectionPanelContainerDispatch {
    return {
        setCurrentView: (view) => dispatch(MapActions.setCurrentView(view))
    };
}

type SelectionPanelContainerProps = ISelectionPanelContainerProps & ISelectionPanelContainerState & ISelectionPanelContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class SelectionPanelContainer extends React.Component<SelectionPanelContainerProps, any> {
    private fnZoomToSelectedFeature: (feature: any) => void;
    constructor(props) {
        super(props);
        this.fnZoomToSelectedFeature = this.onZoomToSelectedFeature.bind(this);
    }
    private onZoomToSelectedFeature(feature: any) {
        const bbox: any = feature.Bounds.split(" ").map(s => parseFloat(s));
        const view = getViewer().getViewForExtent(bbox);
        this.props.setCurrentView(view);
    }
    render(): JSX.Element {
        const { selection, config } = this.props;
        if (selection != null && 
            selection.SelectedFeatures != null) {
            return <SelectionPanel locale={config.locale} selection={selection.SelectedFeatures} onRequestZoomToFeature={this.fnZoomToSelectedFeature} />;
        } else {
            return <div>{tr("NO_SELECTED_FEATURES", config.locale)}</div>;
        }
    }
}