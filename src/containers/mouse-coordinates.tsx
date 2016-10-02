import * as React from "react";
import { connect } from "react-redux";
import { MouseCoordinates } from "../components/mouse-coordinates";

interface IMouseCoordinatesContainerProps {
    style?: React.CSSProperties;
}

interface IMouseCoordinatesContainerState {
    config?: any;
    mouse?: [number, number];
}

interface IMouseCoordinatesDispatch { }

function mapStateToProps(state: any): IMouseCoordinatesContainerState {
    return {
        config: state.config.coordinates,
        mouse: state.view.mouse
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IMouseCoordinatesDispatch {
    return {
        
    };
}

type MouseCoordinatesContainerProps = IMouseCoordinatesContainerProps & IMouseCoordinatesContainerState & IMouseCoordinatesDispatch;

@connect(mapStateToProps, mapDispatchToProps)
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