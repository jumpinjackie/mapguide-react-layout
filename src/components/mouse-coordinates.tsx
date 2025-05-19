import * as React from "react";
import { fmt } from "../api/i18n";
import { strTrim } from '../utils/string';
import DOMPurify from "dompurify";

/**
 * MouseCoordinates component props
 *
 * @export
 * @interface IMouseCoordinatesProps
 * @extends {React.Props<any>}
 */
export interface IMouseCoordinatesProps extends React.Props<any> {
    format?: string;
    coords?: [number, number];
    style?: React.CSSProperties;
    decimals?: number;
    units?: string;
}

function formatCoordinates(props: IMouseCoordinatesProps) {
    const { coords, decimals, format, units } = props;
    if (coords == null) {
        return null; //TODO: Use value indicated by EmptyText extension property
    }
    const [x, y] = coords;
    const sfmt = format || "X: {x}, Y: {y} {units}";
    const str = fmt(sfmt, {
        x: `${decimals != null ? x.toFixed(decimals) : x}`,
        y: `${decimals != null ? y.toFixed(decimals) : y}`,
        units: units || ""
    });
    return <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(strTrim(str)) }} />;
}

/**
 * Displays tracked mouse coordinates
 * @param props
 */
export const MouseCoordinates = (props: IMouseCoordinatesProps) => {
    return <div className="status-bar-component component-mouse-coordinates" style={props.style}>{formatCoordinates(props)}</div>;
};