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
    units?: string | JSX.Element;
}

function formatCoordinates(props: IMouseCoordinatesProps) {
    const { coords, decimals, format, units } = props;
    if (coords == null) {
        return null; //TODO: Use value indicated by EmptyText extension property
    }
    const [x, y] = coords;
    const sfmt = format || "X: {x}, Y: {y}";
    const str = fmt(sfmt, {
        x: `${decimals != null ? x.toFixed(decimals) : x}`,
        y: `${decimals != null ? y.toFixed(decimals) : y}`
    });

    //units may be JSX, so we have to manually interpolate that by returning
    //an array of mixed strings and JSX elements. Doesn't matter to React, it
    //knows what to do
    const items = [];
    const tokens = str.split("{units}");
    if (tokens.length > 0) {
        items.push(tokens[0]);
        for (let i = 1; i < tokens.length; i++) {
            items.push(units);
            items.push(tokens[i]);
        }
    }
    return items;
}

/**
 * Displays tracked mouse coordinates
 * @param props
 */
export const MouseCoordinates = (props: IMouseCoordinatesProps) => {
    const { coords } = props;
    return <div className="component-mouse-coordinates" style={props.style}>{formatCoordinates(props)}</div>;
};