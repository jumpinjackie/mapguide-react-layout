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
    IBranchedMapSubState,
    FlyoutVisibilitySet
} from "../api/common";
import { IItem } from "../components/toolbar";
import { TaskPane, TASK_PANE_OVERLAY_BGCOLOR } from "../components/task-pane";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { mapToolbarReference } from "../api/registry/command";
import { invokeCommand } from "../actions/map";
import * as TaskPaneActions from "../actions/taskpane";
import { areUrlsSame, ensureParameters } from "../utils/url";
import { processMenuItems } from "../utils/menu";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import * as FlyoutActions from "../actions/flyout";
import {
    SPRITE_ICON_HOME,
    SPRITE_BACK,
    SPRITE_FORWARD
} from "../constants/assets";

export interface ITaskPaneContainerProps {
    maxHeight?: number;
    isResizing?: boolean;
}

export interface ITaskPaneContainerState {
    map: IBranchedMapSubState;
    taskpane: ITaskPaneReducerState;
    config: IConfigurationReducerState;
    flyouts: any;
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
        config: state.config,
        flyouts: state.toolbar.flyouts
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
    constructor(props: TaskPaneProps) {
        super(props);
        const locale = this.getLocale();
        this.homeAction = {
            iconClass: SPRITE_ICON_HOME,
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
            iconClass: SPRITE_BACK,
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
            iconClass: SPRITE_FORWARD,
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
        return this.props.config ? this.props.config.locale : DEFAULT_LOCALE;
    }
    private onCloseFlyout = (id: string) => {
        if (this.props.closeFlyout) {
            this.props.closeFlyout(id);
        }
    }
    private onOpenFlyout = (id: string, metrics: IDOMElementMetrics) => {
        if (this.props.openFlyout) {
            this.props.openFlyout(id, metrics);
        }
    }
    private onUrlLoaded = (url: string) => {
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
                ? ensureParameters(taskpane.initialUrl, map.runtimeMap.Name, map.runtimeMap.SessionId, this.getLocale())
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
        const { taskpane, config, map, invokeCommand, maxHeight, flyouts, isResizing } = this.props;
        if (taskpane && config && map && map.runtimeMap) {
            if (taskpane.navigation[taskpane.navIndex]) {
                const flyoutStates: FlyoutVisibilitySet = {};
                if (flyouts) {
                    const ids = Object.keys(flyouts);
                    for (const fid of ids) {
                        flyoutStates[fid] = !!flyouts[fid].open;
                    }
                }
                return <div>
                    <TaskPane currentUrl={taskpane.navigation[taskpane.navIndex]}
                              showTaskBar={config.capabilities.hasTaskBar}
                              lastUrlPushed={taskpane.lastUrlPushed}
                              homeAction={this.homeAction}
                              backAction={this.backAction}
                              onOpenFlyout={this.onOpenFlyout}
                              onCloseFlyout={this.onCloseFlyout}
                              forwardAction={this.forwardAction}
                              session={map.runtimeMap.SessionId}
                              mapName={map.runtimeMap.Name}
                              onUrlLoaded={this.onUrlLoaded}
                              maxHeight={maxHeight}
                              flyoutStates={flyoutStates}
                              locale={this.getLocale()} />
                    {(() => {
                        if (isResizing == true) {
                            return <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: TASK_PANE_OVERLAY_BGCOLOR }}>
                                <div className="pt-non-ideal-state">
                                    <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                                        <span className="pt-icon pt-icon-arrows-horizontal"></span>
                                    </div>
                                    <div className="pt-non-ideal-state-description">
                                        {tr("TASK_PANE_RESIZING", this.getLocale())}
                                    </div>
                                </div>
                            </div>
                        }
                    })()}
                </div>
            }
        }
        return <noscript />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(TaskPaneContainer);