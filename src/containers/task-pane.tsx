import * as React from "react";
import { connect } from "react-redux";
import { TaskPane } from "../components/task-pane";
import { RuntimeMap } from "../api/contracts/runtime-map";

interface ITaskPaneContainerStyle {
    style?: React.CSSProperties;
}

interface ITaskPaneContainerState {
    map?: RuntimeMap;
    config?: any;
}

function mapStateToProps(state): ITaskPaneContainerState {
    return {
        map: state.map.state,
        config: state.config.taskpane
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class TaskPaneContainer extends React.Component<ITaskPaneContainerStyle & ITaskPaneContainerState, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        const { config, map, style } = this.props;
        if (config != null && map != null) {
            return <TaskPane initialUrl={config.initialUrl}
                             session={map.SessionId}
                             mapName={map.Name} 
                             locale={config.locale} />;
        } else {
            return <div />;
        }
    }
}