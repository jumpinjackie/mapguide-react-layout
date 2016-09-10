import * as React from "react";
import { fmt } from "../api/i18n";

interface IMouseCoordinatesProps extends React.Props<any> {
    format?: string;
    coords?: [number, number];
    style?: React.CSSProperties;
    decimals?: number;
}

function formatCoordinates(props: IMouseCoordinatesProps) {
    const { coords, decimals, format } = props;
    if (coords == null) {
        return null;
    }
    const sfmt = format || "X: {x}, Y: {y}";
    return fmt(sfmt, {
        x: `${decimals != null ? coords[0].toFixed(decimals) : coords[0]}`,
        y: `${decimals != null ? coords[1].toFixed(decimals) : coords[0]}`
    });
}

export const MouseCoordinates = (props: IMouseCoordinatesProps) => {
    const { coords } = props;
    return <div className="component-mouse-coordinates" style={props.style}>{formatCoordinates(props)}</div>;
};