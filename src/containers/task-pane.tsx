import * as React from "react";
import {
    ICommand,
    IDOMElementMetrics,
    IBranchedMapSubState,
    FlyoutVisibilitySet
} from "../api/common";
import { IItem } from "../components/toolbar";
import { TaskPane, TASK_PANE_OVERLAY_BGCOLOR } from "../components/task-pane";
import { areUrlsSame, ensureParameters } from "../utils/url";
import { tr } from "../api/i18n";
import { useActiveMapBranch, useViewerFlyouts, useTaskPaneInitialUrl, useTaskPaneLastUrlPushed, useTaskPaneNavigationIndex, useTaskPaneNavigationStack, useConfiguredCapabilities, useViewerLocale } from './hooks';
import { invokeCommand } from '../actions/map';
import { goHome, goForward, goBack, pushUrl } from '../actions/taskpane';
import { openFlyout, closeFlyout } from '../actions/flyout';
import { useReduxDispatch } from "../components/map-providers/context";
import { useElementContext } from "../components/elements/element-context";

const TaskPaneResizingPlaceholder: React.FC<{ locale: string }> = ({ locale }) => {
    const { NonIdealState } = useElementContext();
    return <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: TASK_PANE_OVERLAY_BGCOLOR }}>
        <NonIdealState
            icon="arrows-horizontal"
            description={tr("TASK_PANE_RESIZING", locale)} />
    </div>;
}

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
            bpIconName: "home",
            tooltip: tr("TT_GO_HOME", locale),
            enabled: this.canGoHome,
            invoke: () => this.props.goHome?.()
        };
        this.backAction = {
            bpIconName: "arrow-left",
            tooltip: tr("TT_GO_BACK", locale),
            enabled: this.canGoBack,
            invoke: () => this.props.goBack?.()
        };
        this.forwardAction = {
            bpIconName: "arrow-right",
            tooltip: tr("TT_GO_FORWARD", locale),
            enabled: this.canGoForward,
            invoke: () => this.props.goForward?.()
        };
    }
    private getLocale(): string {
        return this.props.locale;
    }
    private onCloseFlyout = (id: string) => this.props.closeFlyout?.(id);
    private onOpenFlyout = (id: string, metrics: IDOMElementMetrics) => this.props.openFlyout?.(id, metrics);
    private onUrlLoaded = (url: string) => {
        const { navigationStack, navIndex, pushUrl } = this.props;
        const currentUrl = navigationStack[navIndex];
        if (!areUrlsSame(currentUrl, url)) {
            pushUrl?.(url);
        }
    }
    private canGoHome = (): boolean => {
        const { initialUrl, navigationStack, navIndex, map } = this.props;
        if (initialUrl) { //An initial URL was set
            const initUrl = map?.mapguide?.runtimeMap && initialUrl
                ? ensureParameters(initialUrl, map?.mapguide?.runtimeMap?.Name, map?.mapguide?.runtimeMap?.SessionId, this.getLocale())
                : initialUrl;
            return navigationStack.length > 0 //We have a navigation stack
                && !areUrlsSame(navigationStack[navIndex], initUrl); //The current URL is not initial.
        }
        return false;
    }
    private canGoBack = (): boolean => {
        const { navIndex } = this.props;
        return navIndex > 0;
    }
    private canGoForward = (): boolean => {
        const { navigationStack, navIndex } = this.props;
        return navIndex < navigationStack.length - 1;
    }
    render(): JSX.Element {
        const { navigationStack, navIndex, hasTaskBar, lastUrlPushed, map, maxHeight, flyouts, isResizing } = this.props;
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
                    session={map?.mapguide?.runtimeMap?.SessionId}
                    mapName={map?.mapguide?.runtimeMap?.Name}
                    onUrlLoaded={this.onUrlLoaded}
                    maxHeight={maxHeight}
                    flyoutStates={flyoutStates}
                    locale={this.getLocale()} />
                {(() => {
                    if (isResizing == true) {
                        return <TaskPaneResizingPlaceholder locale={this.getLocale()} />;
                    }
                })()}
            </div>;
        }
        return <noscript />;
    }
}

export const TaskPaneContainer = (props: ITaskPaneContainerProps) => {
    const locale = useViewerLocale();
    const map = useActiveMapBranch();
    const flyouts = useViewerFlyouts();
    const initialUrl = useTaskPaneInitialUrl();
    const lastUrlPushed = useTaskPaneLastUrlPushed();
    const navIndex = useTaskPaneNavigationIndex();
    const navigationStack = useTaskPaneNavigationStack();
    const hasTaskBar = useConfiguredCapabilities().hasTaskBar;

    const dispatch = useReduxDispatch();
    const invokeCommandAction = (cmd: ICommand, parameters: any) => dispatch(invokeCommand(cmd, parameters));
    const goHomeAction = () => dispatch(goHome());
    const goForwardAction = () => dispatch(goForward());
    const goBackAction = () => dispatch(goBack());
    const pushUrlAction = (url: string, silent?: boolean) => dispatch(pushUrl(url, silent));
    const openFlyoutAction = (id: string, metrics: IDOMElementMetrics) => dispatch(openFlyout(id, metrics));
    const closeFlyoutAction = (id: string) => dispatch(closeFlyout(id));

    return <TaskPaneContainerInner map={map}
        locale={locale}
        flyouts={flyouts}
        initialUrl={initialUrl}
        lastUrlPushed={lastUrlPushed}
        navIndex={navIndex}
        navigationStack={navigationStack}
        invokeCommand={invokeCommandAction}
        hasTaskBar={hasTaskBar}
        goHome={goHomeAction}
        goForward={goForwardAction}
        goBack={goBackAction}
        pushUrl={pushUrlAction}
        openFlyout={openFlyoutAction}
        closeFlyout={closeFlyoutAction}
        {...props} />;
};