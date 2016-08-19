import * as React from "react";
import { connect } from "react-redux";
import { MouseCoordinates } from "../components/mouse-coordinates";

interface IMouseCoordinatesContainerStyle {
    style?: React.CSSProperties;
}

interface IMouseCoordinatesContainerState {
    config?: any;
    mouse?: [number, number];
}

function mapStateToProps(state): IMouseCoordinatesContainerState {
    return {
        config: state.config.coordinates,
        mouse: state.view.mouse
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class MouseCoordinatesContainer extends React.Component<IMouseCoordinatesContainerStyle & IMouseCoordinatesContainerState, any> {
    constructor(props) {
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