import * as React from "react";
import { useDispatch } from "react-redux";
import {
    ICommand,
    IDOMElementMetrics,
    IBranchedMapSubState,
    FlyoutVisibilitySet
} from "../api/common";
import { IItem } from "../components/toolbar";
import { TaskPane, TASK_PANE_OVERLAY_BGCOLOR } from "../components/task-pane";
import * as MapActions from "../actions/map";
import * as TaskPaneActions from "../actions/taskpane";
import { areUrlsSame, ensureParameters } from "../utils/url";
import { tr } from "../api/i18n";
import * as FlyoutActions from "../actions/flyout";
import {
    SPRITE_ICON_HOME,
    SPRITE_BACK,
    SPRITE_FORWARD
} from "../constants/assets";
import { NonIdealState } from '@blueprintjs/core';
import { useActiveMapBranch, useViewerFlyouts, useTaskPaneInitialUrl, useTaskPaneLastUrlPushed, useTaskPaneNavigationIndex, useTaskPaneNavigationStack, useConfiguredCapabilities, useViewerLocale } from './hooks';

export interface ITaskPaneContainerProps {
    maxHeight?: number;
    isResizing?: boolean;
}

interface ITaskPaneContainerState {
    map: IBranchedMapSubState | undefined;
    initialUrl: string | undefined;
    navIndex: number;
    navigationStack: string[];
    locale: string;
    flyouts: any;
    lastUrlPushed: boolean;
    hasTaskBar: boolean;
}

interface ITaskPaneDispatch {
    invokeCommand: (cmd: ICommand, parameters?: any) => void;
    goHome: () => void;
    goForward: () => void;
    goBack: () => void;
    pushUrl: (url: string, silent?: boolean) => void;
    openFlyout: (id: string, metrics: IDOMElementMetrics) => void;
    closeFlyout: (id: string) => void;
}

type TaskPaneProps = ITaskPaneContainerProps & ITaskPaneContainerState & ITaskPaneDispatch;

class TaskPaneContainerInner extends React.Component<TaskPaneProps, any> {
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
        return this.props.locale;
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
        const { navigationStack, navIndex, pushUrl } = this.props;
        const currentUrl = navigationStack[navIndex];
        if (pushUrl && !areUrlsSame(currentUrl, url)) {
            pushUrl(url);
        }
    }
    private canGoHome(): boolean {
        const { initialUrl, navigationStack, navIndex, map } = this.props;
        if (initialUrl) { //An initial URL was set
            const initUrl = map && map.runtimeMap && initialUrl
                ? ensureParameters(initialUrl, map.runtimeMap.Name, map.runtimeMap.SessionId, this.getLocale())
                : initialUrl;
            return navigationStack.length > 0 //We have a navigation stack
                && !areUrlsSame(navigationStack[navIndex], initUrl); //The current URL is not initial.
        }
        return false;
    }
    private canGoBack(): boolean {
        const { navIndex } = this.props;
        return navIndex > 0;
    }
    private canGoForward(): boolean {
        const { navigationStack, navIndex } = this.props;
        return navIndex < navigationStack.length - 1;
    }
    render(): JSX.Element {
        const { navigationStack, navIndex, hasTaskBar, lastUrlPushed, map, maxHeight, flyouts, isResizing } = this.props;
        if (map && map.runtimeMap) {
            if (navigationStack[navIndex]) {
                const flyoutStates: FlyoutVisibilitySet = {};
                if (flyouts) {
                    const ids = Object.keys(flyouts);
                    for (const fid of ids) {
                        flyoutStates[fid] = !!flyouts[fid].open;
                    }
                }
                return <div>
                    <TaskPane currentUrl={navigationStack[navIndex]}
                        showTaskBar={hasTaskBar}
                        lastUrlPushed={lastUrlPushed}
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
                                <NonIdealState
                                    icon="arrows-horizontal"
                                    description={tr("TASK_PANE_RESIZING", this.getLocale())} />
                            </div>
                        }
                    })()}
                </div>
            }
        }
        return <noscript />;
    }
}

const TaskPaneContainer = (props: ITaskPaneContainerProps) => {
    const locale = useViewerLocale();
    const map = useActiveMapBranch();
    const flyouts = useViewerFlyouts();
    const initialUrl = useTaskPaneInitialUrl();
    const lastUrlPushed = useTaskPaneLastUrlPushed();
    const navIndex = useTaskPaneNavigationIndex();
    const navigationStack = useTaskPaneNavigationStack();
    const hasTaskBar = useConfiguredCapabilities().hasTaskBar;

    const dispatch = useDispatch();
    const invokeCommand = (cmd: ICommand, parameters: any) => dispatch(MapActions.invokeCommand(cmd, parameters));
    const goHome = () => dispatch(TaskPaneActions.goHome());
    const goForward = () => dispatch(TaskPaneActions.goForward());
    const goBack = () => dispatch(TaskPaneActions.goBack());
    const pushUrl = (url: string, silent?: boolean) => dispatch(TaskPaneActions.pushUrl(url, silent));
    const openFlyout = (id: string, metrics: IDOMElementMetrics) => dispatch(FlyoutActions.openFlyout(id, metrics));
    const closeFlyout = (id: string) => dispatch(FlyoutActions.closeFlyout(id));

    return <TaskPaneContainerInner map={map}
        locale={locale}
        flyouts={flyouts}
        initialUrl={initialUrl}
        lastUrlPushed={lastUrlPushed}
        navIndex={navIndex}
        navigationStack={navigationStack}
        invokeCommand={invokeCommand}
        hasTaskBar={hasTaskBar}
        goHome={goHome}
        goForward={goForward}
        goBack={goBack}
        pushUrl={pushUrl}
        openFlyout={openFlyout}
        closeFlyout={closeFlyout}
        {...props} />;
};

export default TaskPaneContainer;