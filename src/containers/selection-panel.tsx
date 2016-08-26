import * as React from "react";
import { connect } from "react-redux";
import { SelectionPanel } from "../components/selection-panel";
import { QueryMapFeaturesResponse } from "../api/contracts/query";
import * as MapActions from "../actions/map";
import { getViewer } from "../api/runtime";

interface ISelectionPanelContainerProps {

}

interface ISelectionPanelContainerState {
    selection?: QueryMapFeaturesResponse;
}

interface ISelectionPanelContainerDispatch {
    setCurrentView?: (view) => void;
}

function mapStateToProps(state): ISelectionPanelContainerState {
    return {
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
        const { selection } = this.props;
        if (selection != null && 
            selection.SelectedFeatures != null) {
            return <SelectionPanel selection={selection.SelectedFeatures} onRequestZoomToFeature={this.fnZoomToSelectedFeature} />;
        } else {
            return <div>No selected features</div>;
        }
    }
}