import * as React from "react";
import { fmt } from "../api/i18n";

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
}

function formatCoordinates(props: IMouseCoordinatesProps) {
    const { coords, decimals, format } = props;
    if (coords == null) {
        return null; //TODO: Use value indicated by EmptyText extension property
    }
    const [x, y] = coords;
    const sfmt = format || "X: {x}, Y: {y}";
    return fmt(sfmt, {
        x: `${decimals != null ? x.toFixed(decimals) : x}`,
        y: `${decimals != null ? y.toFixed(decimals) : y}`
    });
}

/**
 * Displays tracked mouse coordinates
 * @param props
 */
export const MouseCoordinates = (props: IMouseCoordinatesProps) => {
    const { coords } = props;
    return <div className="component-mouse-coordinates" style={props.style}>{formatCoordinates(props)}</div>;
};