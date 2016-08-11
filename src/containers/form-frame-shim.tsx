import * as React from "react";
import { connect } from "react-redux";
import { FormFrameShim } from "../components/form-frame-shim";

interface IFormFrameShimContainerStyle {
    
}

interface IFormFrameShimContainerState {
    
}

function mapStateToProps(state): IFormFrameShimContainerState {
    return {
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class FormFrameShimContainer extends React.Component<IFormFrameShimContainerStyle & IFormFrameShimContainerState, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        return <FormFrameShim />;
    }
}