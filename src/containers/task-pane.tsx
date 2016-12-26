import * as React from "react";
import { connect } from "react-redux";
import {
    ICommand,
    IDOMElementMetrics,
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
import { processMenuItems } from "../utils/menu";
import { tr } from "../api/i18n";
import * as FlyoutActions from "../actions/flyout";

export interface ITaskPaneContainerStyle {
    maxHeight?: number;
}

export interface ITaskPaneContainerState {
    map: RuntimeMap | null;
    taskpane: ITaskPaneReducerState;
    config: IConfigurationReducerState;
    selection: ISelectionReducerState;
}

export interface ITaskPaneDispatch {
    invokeCommand: (cmd: ICommand) => void;
    goHome: () => void;
    goForward: () => void;
    goBack: () => void;
    pushUrl: (url: string, silent?: boolean) => void;
    openFlyout: (id: string, metrics: IDOMElementMetrics) => void;
    closeFlyout: (id: string) => void;
}

function mapStateToProps(state: IApplicationState): ITaskPaneContainerState {
    //Technically speaking, this should be listening to every branch of the redux
    //store. But practically speaking, toolbar commands really only cares about 
    //the branches below
    return {
        map: state.map.state,
        taskpane: state.taskpane,
        config: state.config,
        selection: state.selection
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): ITaskPaneDispatch {
    return {
        invokeCommand: (cmd) => dispatch(invokeCommand(cmd)),
        goHome: () => dispatch(TaskPaneActions.goHome()),
        goForward: () => dispatch(TaskPaneActions.goForward()),
        goBack: () => dispatch(TaskPaneActions.goBack()),
        pushUrl: (url, silent?) => dispatch(TaskPaneActions.pushUrl(url, silent)),
        openFlyout: (id, metrics) => dispatch(FlyoutActions.openFlyout(id, metrics)),
        closeFlyout: (id) => dispatch(FlyoutActions.closeFlyout(id))
    };
}

export type TaskPaneProps = ITaskPaneContainerStyle & Partial<ITaskPaneContainerState> & Partial<ITaskPaneDispatch>;

@connect(mapStateToProps, mapDispatchToProps)
export class TaskPaneContainer extends React.Component<TaskPaneProps, any> {
    private homeAction: IItem;
    private backAction: IItem;
    private forwardAction: IItem;
    private fnUrlLoaded: (url: string) => void;
    private fnOpenFlyout: (id: string, metrics: IDOMElementMetrics) => void;
    private fnCloseFlyout: (id: string) => void;
    constructor(props: TaskPaneProps) {
        super(props);
        this.fnUrlLoaded = this.onUrlLoaded.bind(this);
        this.fnCloseFlyout = this.onCloseFlyout.bind(this);
        this.fnOpenFlyout = this.onOpenFlyout.bind(this);
        const locale = this.getLocale();
        this.homeAction = {
            icon: "icon_home.gif",
            tooltip: tr("TT_GO_HOME", locale),
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
            tooltip: tr("TT_GO_BACK", locale),
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
            tooltip: tr("TT_GO_FORWARD", locale),
            enabled: this.canGoForward.bind(this),
            invoke: () => {
                const { goForward } = this.props;
                if (goForward) {
                    goForward();
                }
            }
        };
    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : "en";
    }
    private onCloseFlyout(id: string): void {
        if (this.props.closeFlyout) {
            this.props.closeFlyout(id);
        }
    }
    private onOpenFlyout(id: string, metrics: IDOMElementMetrics): void {
        if (this.props.openFlyout) {
            this.props.openFlyout(id, metrics);
        }
    }
    private onUrlLoaded(url: string): void {
        const { taskpane, pushUrl } = this.props;
        if (taskpane) {
            const currentUrl = taskpane.navigation[taskpane.navIndex];
            if (pushUrl && !areUrlsSame(currentUrl, url)) {
                pushUrl(url);
            }
        }
    }
    private canGoHome(): boolean {
        const { taskpane, map, config } = this.props;
        if (taskpane && taskpane.initialUrl) { //An initial URL was set
            const initUrl = map && taskpane.initialUrl
                ? TaskPaneActions.ensureParameters(taskpane.initialUrl, map.Name, map.SessionId, this.getLocale())
                : taskpane.initialUrl;
            return taskpane.navigation.length > 0 //We have a navigation stack
                && !areUrlsSame(taskpane.navigation[taskpane.navIndex], initUrl); //The current URL is not initial.
        }
        return false;
    }
    private canGoBack(): boolean {
        const { taskpane } = this.props;
        if (taskpane) {
            return taskpane.navIndex > 0;
        }
        return false;
    }
    private canGoForward(): boolean {
        const { taskpane } = this.props;
        if (taskpane) {
            return taskpane.navIndex < taskpane.navigation.length - 1;
        }
        return false;
    }
    static contextTypes: React.ValidationMap<any> = {
        store: React.PropTypes.object
    };
    render(): JSX.Element {
        const { taskpane, config, map, invokeCommand, maxHeight } = this.props;
        if (taskpane && config && map) {
            if (taskpane.navigation[taskpane.navIndex]) {
                return <TaskPane currentUrl={taskpane.navigation[taskpane.navIndex]}
                                 showTaskBar={config.capabilities.hasTaskBar}
                                 lastUrlPushed={taskpane.lastUrlPushed}
                                 homeAction={this.homeAction}
                                 backAction={this.backAction}
                                 onOpenFlyout={this.fnOpenFlyout}
                                 onCloseFlyout={this.fnCloseFlyout}
                                 forwardAction={this.forwardAction}
                                 session={map.SessionId}
                                 mapName={map.Name}
                                 onUrlLoaded={this.fnUrlLoaded}
                                 maxHeight={maxHeight}
                                 locale={this.getLocale()} />;
            }
        }
        return <div />;
    }
}