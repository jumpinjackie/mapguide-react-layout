import * as React from "react";

interface IMouseCoordinatesProps {
    format?: string;
    coords: number[];
    style?: React.CSSProperties;
    decimals?: number;
}

export class MouseCoordinates extends React.Component<IMouseCoordinatesProps, any> {
    constructor(props: IMouseCoordinatesProps) {
        super(props);
    }
    formatCoordinates() {
        const fmt = this.props.format || "X: {x}, Y: {y}";
        const { coords, decimals } = this.props;
        return fmt.replace(/\{x\}/g, `${decimals != null ? coords[0].toFixed(decimals) : coords[0]}`)
                  .replace(/\{y\}/g, `${decimals != null ? coords[1].toFixed(decimals) : coords[0]}`);
    }
    render(): JSX.Element {
        return <div className="component-mouse-coordinates" style={this.props.style}>{this.formatCoordinates()}</div>;
    }
}