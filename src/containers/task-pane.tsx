import * as React from "react";
import {
    IDOMElementMetrics,
    FlyoutVisibilitySet
} from "../api/common";
import { IItem } from "../components/toolbar";
import { TaskPane, TASK_PANE_OVERLAY_BGCOLOR } from "../components/task-pane";
import { areUrlsSame, ensureParameters } from "../utils/url";
import { tr } from "../api/i18n";
import { useActiveMapBranch, useViewerFlyouts, useTaskPaneInitialUrl, useTaskPaneLastUrlPushed, useTaskPaneNavigationIndex, useTaskPaneNavigationStack, useConfiguredCapabilities, useViewerLocale } from './hooks';
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
    const goHomeAction = () => dispatch(goHome());
    const goForwardAction = () => dispatch(goForward());
    const goBackAction = () => dispatch(goBack());
    const pushUrlAction = (url: string, silent?: boolean) => dispatch(pushUrl(url, silent));
    const openFlyoutAction = (id: string, metrics: IDOMElementMetrics) => dispatch(openFlyout(id, metrics));
    const closeFlyoutAction = (id: string) => dispatch(closeFlyout(id));

    // --- Begin logic from TaskPaneContainerInner ---
    const getLocale = React.useCallback(() => locale, [locale]);
    const canGoHome = React.useCallback(() => {
        if (initialUrl) {
            const initUrl = map?.mapguide?.runtimeMap && initialUrl
                ? ensureParameters(initialUrl, map?.mapguide?.runtimeMap?.Name, map?.mapguide?.runtimeMap?.SessionId, getLocale())
                : initialUrl;
            return navigationStack.length > 0 && !areUrlsSame(navigationStack[navIndex], initUrl);
        }
        return false;
    }, [initialUrl, map, navigationStack, navIndex, getLocale]);
    const canGoBack = React.useCallback(() => navIndex > 0, [navIndex]);
    const canGoForward = React.useCallback(() => navIndex < navigationStack.length - 1, [navIndex, navigationStack]);

    const homeAction: IItem = React.useMemo(() => ({
        bpIconName: "home",
        tooltip: tr("TT_GO_HOME", locale),
        enabled: canGoHome,
        invoke: goHomeAction
    }), [locale, canGoHome, goHomeAction]);
    const backAction: IItem = React.useMemo(() => ({
        bpIconName: "arrow-left",
        tooltip: tr("TT_GO_BACK", locale),
        enabled: canGoBack,
        invoke: goBackAction
    }), [locale, canGoBack, goBackAction]);
    const forwardAction: IItem = React.useMemo(() => ({
        bpIconName: "arrow-right",
        tooltip: tr("TT_GO_FORWARD", locale),
        enabled: canGoForward,
        invoke: goForwardAction
    }), [locale, canGoForward, goForwardAction]);

    const onCloseFlyout = React.useCallback((id: string) => closeFlyoutAction(id), [closeFlyoutAction]);
    const onOpenFlyout = React.useCallback((id: string, metrics: IDOMElementMetrics) => openFlyoutAction(id, metrics), [openFlyoutAction]);
    const onUrlLoaded = React.useCallback((url: string) => {
        const currentUrl = navigationStack[navIndex];
        if (!areUrlsSame(currentUrl, url)) {
            pushUrlAction(url);
        }
    }, [navigationStack, navIndex, pushUrlAction]);
    // --- End logic from TaskPaneContainerInner ---

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
                homeAction={homeAction}
                backAction={backAction}
                onOpenFlyout={onOpenFlyout}
                onCloseFlyout={onCloseFlyout}
                forwardAction={forwardAction}
                session={map?.mapguide?.runtimeMap?.SessionId}
                mapName={map?.mapguide?.runtimeMap?.Name}
                onUrlLoaded={onUrlLoaded}
                maxHeight={props.maxHeight}
                flyoutStates={flyoutStates}
                locale={getLocale()} />
            {props.isResizing === true && (
                <TaskPaneResizingPlaceholder locale={getLocale()} />
            )}
        </div>;
    }
    return <noscript />;
};