import * as React from "react";
import { connect } from "react-redux";
import { Navigator } from "../components/navigator";
import { QueryMapFeaturesResponse } from "../api/contracts/query";

interface INavigatorContainerStyle {
    style?: React.CSSProperties;
}

interface INavigatorContainerState {
    
}

function mapStateToProps(state): INavigatorContainerState {
    return {
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class NavigatorContainer extends React.Component<INavigatorContainerStyle & INavigatorContainerState, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        const { style } = this.props;
        return <Navigator style={style} />;
    }
}