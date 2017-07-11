import * as React from "react";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import {
    ICommand,
    IDOMElementMetrics,
    ReduxDispatch,
    IApplicationState,
    ITaskPaneReducerState,
    IToolbarReducerState,
    IConfigurationReducerState,
    IBranchedMapSubState
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

export interface ITaskPaneContainerProps {
    maxHeight?: number;
}

export interface ITaskPaneContainerState {
    map: IBranchedMapSubState;
    taskpane: ITaskPaneReducerState;
    config: IConfigurationReducerState;
}

export interface ITaskPaneDispatch {
    invokeCommand: (cmd: ICommand, parameters?: any) => void;
    goHome: () => void;
    goForward: () => void;
    goBack: () => void;
    pushUrl: (url: string, silent?: boolean) => void;
    openFlyout: (id: string, metrics: IDOMElementMetrics) => void;
    closeFlyout: (id: string) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<ITaskPaneContainerState> {
    //Technically speaking, this should be listening to every branch of the redux
    //store. But practically speaking, toolbar commands really only cares about
    //the branches below
    let branch;
    if (state.config.activeMapName) {
        branch = state.mapState[state.config.activeMapName];
    }
    return {
        map: branch,
        taskpane: state.taskpane,
        config: state.config
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<ITaskPaneDispatch> {
    return {
        invokeCommand: (cmd, parameters) => dispatch(invokeCommand(cmd, parameters)),
        goHome: () => dispatch(TaskPaneActions.goHome()),
        goForward: () => dispatch(TaskPaneActions.goForward()),
        goBack: () => dispatch(TaskPaneActions.goBack()),
        pushUrl: (url, silent?) => dispatch(TaskPaneActions.pushUrl(url, silent)),
        openFlyout: (id, metrics) => dispatch(FlyoutActions.openFlyout(id, metrics)),
        closeFlyout: (id) => dispatch(FlyoutActions.closeFlyout(id))
    };
}

export type TaskPaneProps = ITaskPaneContainerProps & Partial<ITaskPaneContainerState> & Partial<ITaskPaneDispatch>;

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
            iconClass: "sprite-icons-icon_home",
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
            iconClass: "sprite-icons-back",
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
            iconClass: "sprite-icons-forward",
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
            const initUrl = map && map.runtimeMap && taskpane.initialUrl
                ? TaskPaneActions.ensureParameters(taskpane.initialUrl, map.runtimeMap.Name, map.runtimeMap.SessionId, this.getLocale())
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
    static contextTypes: PropTypes.ValidationMap<any> = {
        store: PropTypes.object
    };
    render(): JSX.Element {
        const { taskpane, config, map, invokeCommand, maxHeight } = this.props;
        if (taskpane && config && map && map.runtimeMap) {
            if (taskpane.navigation[taskpane.navIndex]) {
                return <TaskPane currentUrl={taskpane.navigation[taskpane.navIndex]}
                                 showTaskBar={config.capabilities.hasTaskBar}
                                 lastUrlPushed={taskpane.lastUrlPushed}
                                 homeAction={this.homeAction}
                                 backAction={this.backAction}
                                 onOpenFlyout={this.fnOpenFlyout}
                                 onCloseFlyout={this.fnCloseFlyout}
                                 forwardAction={this.forwardAction}
                                 session={map.runtimeMap.SessionId}
                                 mapName={map.runtimeMap.Name}
                                 onUrlLoaded={this.fnUrlLoaded}
                                 maxHeight={maxHeight}
                                 locale={this.getLocale()} />;
            }
        }
        return <noscript />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPaneContainer);