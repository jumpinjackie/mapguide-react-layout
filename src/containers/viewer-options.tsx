import * as React from "react";
import { connect } from "react-redux";

interface IViewerOptionsProps {
    
}

interface IViewerOptionsState {
    
}

interface IViewerOptionsDispatch {
    
}

function mapStateToProps(state: any): IViewerOptionsState {
    return {
        viewer: state.map.viewer,
        view: state.view.current
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IViewerOptionsDispatch {
    return {
        
    };
}

type ViewerOptionsProps = IViewerOptionsProps & IViewerOptionsState & IViewerOptionsDispatch;

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