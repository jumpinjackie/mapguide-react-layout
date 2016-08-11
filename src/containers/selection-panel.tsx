import * as React from "react";
import { connect } from "react-redux";
import { SelectionPanel } from "../components/selection-panel";
import { QueryMapFeaturesResponse } from "../api/contracts/query";


interface ISelectionPanelContainerProps {

}

interface ISelectionPanelContainerState {
    selection?: QueryMapFeaturesResponse;
}

interface ISelectionPanelContainerDispatch {

}

function mapStateToProps(state): ISelectionPanelContainerState {
    return {
        selection: state.selection.selectionSet
    };
}

function mapDispatchToProps(dispatch): ISelectionPanelContainerDispatch {
    return {
        
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class SelectionPanelContainer extends React.Component<any, any> {
    private fnZoomToSelectedFeature: (feature: any) => void;
    constructor(props) {
        super(props);
        this.fnZoomToSelectedFeature = this.onZoomToSelectedFeature.bind(this);
    }
    private onZoomToSelectedFeature(feature: any) {
        //const viewer = this.getViewer();
        //if (viewer != null) {
        //    const bbox: number[] = feature.Bounds.split(" ").map(s => parseFloat(s));
        //    viewer.zoomToExtent(bbox);
        //}
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