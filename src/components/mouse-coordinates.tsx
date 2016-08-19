import * as React from "react";

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
    const fmt = format || "X: {x}, Y: {y}";
    return fmt.replace(/\{x\}/g, `${decimals != null ? coords[0].toFixed(decimals) : coords[0]}`)
              .replace(/\{y\}/g, `${decimals != null ? coords[1].toFixed(decimals) : coords[0]}`);
}

export const MouseCoordinates = (props: IMouseCoordinatesProps) => {
    const { coords } = props;
    return <div className="component-mouse-coordinates" style={props.style}>{formatCoordinates(props)}</div>;
};