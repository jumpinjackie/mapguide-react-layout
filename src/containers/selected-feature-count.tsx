import * as React from "react";
import { SelectedFeatureCount } from "../components/selected-feature-count";
import { useViewerLocale, useActiveMapSelectionSet } from './hooks';

export interface ISelectedFeatureCountContainerProps {
    style?: React.CSSProperties;
}

export const SelectedFeatureCountContainer = (props: ISelectedFeatureCountContainerProps) => {
    const { style } = props;
    const selection = useActiveMapSelectionSet();
    const locale = useViewerLocale();
    if (selection && selection.FeatureSet) {
        return <SelectedFeatureCount locale={locale} style={style} selection={selection.FeatureSet} />;
    } else {
        return <div />;
    }
}