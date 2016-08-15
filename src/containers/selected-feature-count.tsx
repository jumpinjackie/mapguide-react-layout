import * as React from "react";
import { connect } from "react-redux";
import { SelectedFeatureCount } from "../components/selected-feature-count";
import { QueryMapFeaturesResponse } from "../api/contracts/query";

interface ISelectionPanelContainerState {
    style?: React.CSSProperties;
    selection?: QueryMapFeaturesResponse;
}

function mapStateToProps(state): ISelectionPanelContainerState {
    return {
        selection: state.selection.selectionSet
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class SelectedFeatureCountContainer extends React.Component<ISelectionPanelContainerState, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        const { selection, style } = this.props;
        if (selection != null) {
            return <SelectedFeatureCount style={style} selection={selection.FeatureSet} />;
        } else {
            return <div />;
        }
    }
}