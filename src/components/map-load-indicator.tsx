import * as React from "react";
import { MapLoadIndicatorPositioning } from '../api/common';

export interface IMapLoadIndicatorProps {
    loading: number;
    loaded: number;
    color: string;
    position: MapLoadIndicatorPositioning;
}

export const MapLoadIndicator = (props: IMapLoadIndicatorProps) => {
    const { loaded, loading, color, position } = props;
    let visibility: "visible" | "hidden" = "visible";
    let width = Math.min(100, (loaded / loading * 100)).toFixed(1) + "%";
    if (loaded === loading || width == "100%") {
        visibility = "hidden";
        width = "0";
    }
    const style: React.CSSProperties = {
        position: "absolute",
        zIndex: 10,
        visibility: visibility,
        left: 0,
        height: 5,
        width: width,
        background: color,
        transition: "width 250ms"
    };
    if (position == "top") {
        style.top = 0;
    } else {
        style.bottom = 0;
    }
    return <div style={style} />;
}