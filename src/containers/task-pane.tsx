import * as React from "react";
import { connect } from "react-redux";
import { IItem } from "../components/toolbar";
import { TaskPane } from "../components/task-pane";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { mapToolbarReference } from "../api/registry/command";
import { invokeCommand } from "../actions/map";
import * as TaskPaneActions from "../actions/taskpane";
import { areUrlsSame } from "../utils/url";

interface ITaskPaneContainerStyle {
    style?: React.CSSProperties;
}

interface ITaskPaneContainerState {
    map?: RuntimeMap;
    taskpane?: any;
    toolbar?: any;
    config?: any;
}

interface ITaskPaneDispatch {
    invokeCommand?: (cmd) => void;
    goHome?: () => void;
    goForward?: () => void;
    goBack?: () => void;
    pushUrl?: (url, silent?) => void;
}

function mapStateToProps(state): ITaskPaneContainerState {
    return {
        map: state.map.state,
        taskpane: state.taskpane,
        config: state.config,
        toolbar: state.toolbar["taskpane"]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        invokeCommand: (cmd) => dispatch(invokeCommand(cmd)),
        goHome: () => dispatch(TaskPaneActions.goHome()),
        goForward: () => dispatch(TaskPaneActions.goForward()),
        goBack: () => dispatch(TaskPaneActions.goBack()),
        pushUrl: (url, silent?) => dispatch(TaskPaneActions.pushUrl(url, silent))
    };
}

type TaskPaneProps = ITaskPaneContainerStyle & ITaskPaneContainerState & ITaskPaneDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class TaskPaneContainer extends React.Component<TaskPaneProps, any> {
    homeAction: IItem;
    backAction: IItem;
    forwardAction: IItem;
    fnUrlLoaded: (url: string) => void;
    constructor(props) {
        super(props);
        this.fnUrlLoaded = this.onUrlLoaded.bind(this);
        this.homeAction = {
            icon: "icon_home.gif",
            tooltip: "Go Home",
            enabled: this.canGoHome.bind(this),
            invoke: () => {
                const { goHome } = this.props;
                goHome();
            }
        };
        this.backAction = {
            icon: "back.png",
            tooltip: "Go back",
            enabled: this.canGoBack.bind(this),
            invoke: () => {
                const { goBack } = this.props;
                goBack();
            }
        };
        this.forwardAction = {
            icon: "forward.png",
            tooltip: "Go forward",
            enabled: this.canGoForward.bind(this),
            invoke: () => {
                const { goForward } = this.props;
                goForward();
            }
        };
    }
    private onUrlLoaded(url: string): void {
        const { taskpane, pushUrl } = this.props;
        const currentUrl = taskpane.navigation[taskpane.navIndex];
        if (!areUrlsSame(currentUrl, url)) {
            pushUrl(url);
        }
    }
    private canGoHome(): boolean {
        const { taskpane, map, config } = this.props;
        const initUrl = TaskPaneActions.ensureParameters(taskpane.initialUrl, map.Name, map.SessionId, config.locale);
        return taskpane.initialUrl != null //An initial URL was set
            && taskpane.navigation.length > 0 //We have a navigation stack
            && !areUrlsSame(taskpane.navigation[taskpane.navIndex], initUrl); //The current URL is not initial. 
    }
    private canGoBack(): boolean {
        const { taskpane } = this.props;
        return taskpane.navIndex > 0;
    }
    private canGoForward(): boolean {
        const { taskpane } = this.props;
        return taskpane.navIndex < taskpane.navigation.length - 1;
    }
    static contextTypes: React.ValidationMap<any> = {
        store: React.PropTypes.object
    };
    render(): JSX.Element {
        const { taskpane, config, map, style, toolbar, invokeCommand } = this.props;
        if (taskpane != null && config != null && map != null) {
            let childItems;
            if (toolbar != null && toolbar.items != null) {
                const store = (this.context as any).store;
                childItems = toolbar.items.map(tb => mapToolbarReference(tb, store, invokeCommand)).filter(tb => tb != null);
            } else {
                childItems = [];
            }
            if (taskpane.navigation[taskpane.navIndex]) {
                return <TaskPane currentUrl={taskpane.navigation[taskpane.navIndex]}
                                 lastUrlPushed={taskpane.lastUrlPushed}
                                 homeAction={this.homeAction}
                                 backAction={this.backAction}
                                 forwardAction={this.forwardAction}
                                 session={map.SessionId}
                                 mapName={map.Name}
                                 taskMenuItems={childItems}
                                 onUrlLoaded={this.fnUrlLoaded}
                                 locale={config.locale} />;
            }
        }
        return <div />;
    }
}