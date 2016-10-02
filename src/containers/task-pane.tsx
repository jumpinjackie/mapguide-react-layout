import * as React from "react";
import { connect } from "react-redux";
import {
    ICommand,
    ReduxDispatch,
    IApplicationState,
    ITaskPaneReducerState,
    IToolbarReducerState,
    IConfigurationReducerState,
    ISelectionReducerState
} from "../api/common";
import { IItem } from "../components/toolbar";
import { TaskPane } from "../components/task-pane";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { mapToolbarReference } from "../api/registry/command";
import { invokeCommand } from "../actions/map";
import * as TaskPaneActions from "../actions/taskpane";
import { areUrlsSame } from "../utils/url";
import { tr } from "../api/i18n";

export interface ITaskPaneContainerStyle {
    style?: React.CSSProperties;
}

export interface ITaskPaneContainerState {
    map: RuntimeMap | null;
    taskpane: ITaskPaneReducerState;
    toolbar: IToolbarReducerState;
    config: IConfigurationReducerState;
    selection: ISelectionReducerState;
}

export interface ITaskPaneDispatch {
    invokeCommand?: (cmd: ICommand) => void;
    goHome?: () => void;
    goForward?: () => void;
    goBack?: () => void;
    pushUrl?: (url: string, silent?: boolean) => void;
}

function mapStateToProps(state: IApplicationState): ITaskPaneContainerState {
    //Technically speaking, this should be listening to every branch of the redux
    //store. But practically speaking, toolbar commands really only cares about 
    //the branches below
    return {
        map: state.map.state,
        taskpane: state.taskpane,
        config: state.config,
        selection: state.selection,
        toolbar: state.toolbar["taskpane"]
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): ITaskPaneDispatch {
    return {
        invokeCommand: (cmd) => dispatch(invokeCommand(cmd)),
        goHome: () => dispatch(TaskPaneActions.goHome()),
        goForward: () => dispatch(TaskPaneActions.goForward()),
        goBack: () => dispatch(TaskPaneActions.goBack()),
        pushUrl: (url, silent?) => dispatch(TaskPaneActions.pushUrl(url, silent))
    };
}

export type TaskPaneProps = ITaskPaneContainerStyle & ITaskPaneContainerState & ITaskPaneDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class TaskPaneContainer extends React.Component<TaskPaneProps, any> {
    homeAction: IItem;
    backAction: IItem;
    forwardAction: IItem;
    fnUrlLoaded: (url: string) => void;
    constructor(props: TaskPaneProps) {
        super(props);
        this.fnUrlLoaded = this.onUrlLoaded.bind(this);
        this.homeAction = {
            icon: "icon_home.gif",
            tooltip: tr("TT_GO_HOME", this.props.config.locale),
            enabled: this.canGoHome.bind(this),
            invoke: () => {
                const { goHome } = this.props;
                if (goHome) {
                    goHome();
                }
            }
        };
        this.backAction = {
            icon: "back.png",
            tooltip: tr("TT_GO_BACK", this.props.config.locale),
            enabled: this.canGoBack.bind(this),
            invoke: () => {
                const { goBack } = this.props;
                if (goBack) {
                    goBack();
                }
            }
        };
        this.forwardAction = {
            icon: "forward.png",
            tooltip: tr("TT_GO_FORWARD", this.props.config.locale),
            enabled: this.canGoForward.bind(this),
            invoke: () => {
                const { goForward } = this.props;
                if (goForward) {
                    goForward();
                }
            }
        };
    }
    private onUrlLoaded(url: string): void {
        const { taskpane, pushUrl } = this.props;
        const currentUrl = taskpane.navigation[taskpane.navIndex];
        if (pushUrl && !areUrlsSame(currentUrl, url)) {
            pushUrl(url);
        }
    }
    private canGoHome(): boolean {
        const { taskpane, map, config } = this.props;
        if (taskpane.initialUrl) { //An initial URL was set
            const initUrl = map && taskpane.initialUrl
                ? TaskPaneActions.ensureParameters(taskpane.initialUrl, map.Name, map.SessionId, config.locale)
                : taskpane.initialUrl;
            return taskpane.navigation.length > 0 //We have a navigation stack
                && !areUrlsSame(taskpane.navigation[taskpane.navIndex], initUrl); //The current URL is not initial.
        }
        return false;
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
        if (taskpane && config && map) {
            let childItems: IItem[];
            if (toolbar && toolbar.items && invokeCommand) {
                const store = (this.context as any).store;
                childItems = (toolbar.items as any[])
                    .map(tb => mapToolbarReference(tb, store, invokeCommand))
                    .filter((tb): tb is IItem => tb != null);
            } else {
                childItems = [];
            }
            if (taskpane.navigation[taskpane.navIndex]) {
                return <TaskPane currentUrl={taskpane.navigation[taskpane.navIndex]}
                                 showTaskBar={config.capabilities.hasTaskBar}
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