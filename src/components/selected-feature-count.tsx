import * as React from "react";
import { tr, fmt } from "../api/i18n";

/**
 * SelectedFeatureCount component props
 *
 * @interface ISelectedFeatureCountProps
 */
export interface ISelectedFeatureCountProps {
    summary?: {
        total: number;
        layerCount: number;
    },
    locale?: string;
    format?: string;
    style?: React.CSSProperties;
}

/**
 * Displays the number of selected features on the map
 */
export const SelectedFeatureCount = (props: ISelectedFeatureCountProps) => {
    const format = props.format || tr("FMT_SELECTION_COUNT", props.locale);
    let label: string | undefined;
    if (props.summary) {
        label = fmt(format, props.summary);
    }
    return <div className="status-bar-component component-selected-feature-count" style={props.style}>{label}</div>;
};