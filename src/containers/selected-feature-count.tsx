import * as React from "react";
import { connect } from "react-redux";
import {
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState
} from "../api/common";
import { SelectedFeatureCount } from "../components/selected-feature-count";
import { QueryMapFeaturesResponse } from "../api/contracts/query";

export interface ISelectionPanelContainerProps {
    style?: React.CSSProperties;
}

export interface ISelectionPanelContainerState {
    config: IConfigurationReducerState;
    selection: QueryMapFeaturesResponse | null;
}

function mapStateToProps(state: IApplicationState): ISelectionPanelContainerState {
    return {
        config: state.config,
        selection: state.selection.selectionSet
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch) {
    return {
        
    };
}

export type SelectedFeatureContainerProps = ISelectionPanelContainerState & ISelectionPanelContainerProps;

@connect(mapStateToProps, mapDispatchToProps)
export class SelectedFeatureCountContainer extends React.Component<SelectedFeatureContainerProps, any> {
    constructor(props: SelectedFeatureContainerProps) {
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