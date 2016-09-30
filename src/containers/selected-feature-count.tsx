import * as React from "react";
import { connect } from "react-redux";
import { SelectedFeatureCount } from "../components/selected-feature-count";
import { QueryMapFeaturesResponse } from "../api/contracts/query";

interface ISelectionPanelContainerProps {
    style?: React.CSSProperties;
}

interface ISelectionPanelContainerState {
    config?: any;
    selection?: QueryMapFeaturesResponse;
}

function mapStateToProps(state): ISelectionPanelContainerState {
    return {
        config: state.config,
        selection: state.selection.selectionSet
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

type SelectedFeatureContainerProps = ISelectionPanelContainerState & ISelectionPanelContainerProps;

@connect(mapStateToProps, mapDispatchToProps)
export class SelectedFeatureCountContainer extends React.Component<SelectedFeatureContainerProps, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        const { selection, style, config } = this.props;
        if (selection && selection.FeatureSet) {
            return <SelectedFeatureCount locale={config.locale || "en"} style={style} selection={selection.FeatureSet} />;
        } else {
            return <div />;
        }
    }
}