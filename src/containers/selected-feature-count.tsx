import * as React from "react";
import { connect } from "react-redux";
import {
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    getSelectionSet
} from "../api/common";
import { SelectedFeatureCount } from "../components/selected-feature-count";
import { QueryMapFeaturesResponse } from "../api/contracts/query";
import { DEFAULT_LOCALE } from "../api/i18n";

export interface ISelectedFeatureCountContainerProps {
    style?: React.CSSProperties;
}

export interface ISelectedFeatureCountContainerState {
    config: IConfigurationReducerState;
    selection: QueryMapFeaturesResponse;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<ISelectedFeatureCountContainerState> {
    return {
        config: state.config,
        selection: getSelectionSet(state)
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch) {
    return {

    };
}

export type SelectedFeatureContainerProps = ISelectedFeatureCountContainerProps & Partial<ISelectedFeatureCountContainerState>;

export class SelectedFeatureCountContainer extends React.Component<SelectedFeatureContainerProps, any> {
    constructor(props: SelectedFeatureContainerProps) {
        super(props);
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : DEFAULT_LOCALE;
    }
    render(): JSX.Element {
        const { selection, style, config } = this.props;
        const locale = this.getLocale();
        if (selection && selection.FeatureSet) {
            return <SelectedFeatureCount locale={locale} style={style} selection={selection.FeatureSet} />;
        } else {
            return <div />;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(SelectedFeatureCountContainer);