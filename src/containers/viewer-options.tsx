import * as React from "react";
import { connect } from "react-redux";
import {
    ReduxDispatch,
    IApplicationState
} from "../api/common";

export interface IViewerOptionsProps {
    
}

export interface IViewerOptionsState {
    
}

export interface IViewerOptionsDispatch {
    
}

function mapStateToProps(state: IApplicationState): IViewerOptionsState {
    return {
        
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IViewerOptionsDispatch {
    return {
        
    };
}

export type ViewerOptionsProps = IViewerOptionsProps & IViewerOptionsState & IViewerOptionsDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class ViewerOptions extends React.Component<ViewerOptionsProps, any> {
    constructor(props: ViewerOptionsProps) {
        super(props);
    }
    render(): JSX.Element {
        return <div>
            <h3>Viewer Options</h3>
            <hr />
            <p>TODO: UI for various viewer options will be here</p>
        </div>;
    }
}