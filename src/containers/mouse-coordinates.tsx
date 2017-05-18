import * as React from "react";
import { connect } from "react-redux";
import {
    Coordinate,
    ReduxDispatch,
    IApplicationState,
    ICoordinateConfiguration
} from "../api/common";
import { MouseCoordinates } from "../components/mouse-coordinates";

export interface IMouseCoordinatesContainerProps {
    style: React.CSSProperties;
}

export interface IMouseCoordinatesContainerState {
    config: ICoordinateConfiguration;
    mouse: Coordinate | null;
}

export interface IMouseCoordinatesDispatch { }

function mapStateToProps(state: Readonly<IApplicationState>, ownProps: IMouseCoordinatesContainerProps): Partial<IMouseCoordinatesContainerState> {
    return {
        config: state.config.coordinates,
        mouse: state.mouse.coords
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IMouseCoordinatesDispatch> {
    return {

    };
}

export type MouseCoordinatesContainerProps = IMouseCoordinatesContainerProps & Partial<IMouseCoordinatesContainerState> & Partial<IMouseCoordinatesDispatch>;

export class MouseCoordinatesContainer extends React.Component<MouseCoordinatesContainerProps, any> {
    constructor(props: MouseCoordinatesContainerProps) {
        super(props);
    }
    render(): JSX.Element {
        const { config, style, mouse } = this.props;
        if (config != null && mouse != null) {
            return <MouseCoordinates coords={mouse} style={style} decimals={config.decimals} />;
        } else {
            return <div />;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MouseCoordinatesContainer);