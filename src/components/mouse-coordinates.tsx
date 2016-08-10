import * as React from "react";

interface IMouseCoordinatesProps extends React.Props<any> {
    format?: string;
    style?: React.CSSProperties;
    decimals?: number;
}

export class MouseCoordinates extends React.Component<IMouseCoordinatesProps, any> {
    constructor(props: IMouseCoordinatesProps) {
        super(props);
        this.state = {
            coords: null
        };
    }
    formatCoordinates(coords) {
        if (coords == null) {
            return null;
        }
        const fmt = this.props.format || "X: {x}, Y: {y}";
        const { decimals } = this.props;
        return fmt.replace(/\{x\}/g, `${decimals != null ? coords[0].toFixed(decimals) : coords[0]}`)
                  .replace(/\{y\}/g, `${decimals != null ? coords[1].toFixed(decimals) : coords[0]}`);
    }
    render(): JSX.Element {
        const { coords } = this.state;
        return <div className="component-mouse-coordinates" style={this.props.style}>{this.formatCoordinates(coords)}</div>;
    }
}