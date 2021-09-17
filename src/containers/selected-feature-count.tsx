import * as React from "react";
import { countSelection } from "../api/selection-count";
import { SelectedFeatureCount } from "../components/selected-feature-count";
import { useViewerLocale, useActiveMapSelectionSet, useActiveMapClientSelectionSet } from './hooks';

export interface ISelectedFeatureCountContainerProps {
    style?: React.CSSProperties;
}

export const SelectedFeatureCountContainer = (props: ISelectedFeatureCountContainerProps) => {
    const { style } = props;
    const selection = useActiveMapSelectionSet();
    const clientSelection = useActiveMapClientSelectionSet();
    const locale = useViewerLocale();
    const summary = countSelection(selection?.FeatureSet, clientSelection);
    if (summary) {
        return <SelectedFeatureCount locale={locale} style={style} summary={summary} />;
    } else {
        return <div />;
    }
}