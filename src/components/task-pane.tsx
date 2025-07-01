import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Toolbar,
    type IItem,
    type IFlyoutMenu,
    DEFAULT_TOOLBAR_SIZE,
    TOOLBAR_BACKGROUND_COLOR
} from "./toolbar";
import { PlaceholderComponent } from "../api/registry/component";
import { tr } from "../api/i18n";
import {
    type GenericEvent,
    type IDOMElementMetrics,
    type FlyoutVisibilitySet
} from "../api/common";
import { parseComponentUri } from "../utils/url";
import { FUSION_TASKPANE_NAME, WEBLAYOUT_TASKMENU } from '../constants';
import { useElementContext } from "./elements/element-context";

export const TASK_PANE_OVERLAY_BGCOLOR = "#dee8f9";

function currentUrlDoesNotMatchMapName(currentUrl: string, mapName: string | undefined): boolean {
    const normUrl = currentUrl.toLowerCase();
    //Only invalidate if url has mapname and it doesn't match our current one
    if (normUrl.indexOf("mapname=") >= 0 && mapName) {
        return normUrl.indexOf(`mapname=${mapName.toLowerCase()}`) < 0;
    } else {
        return false;
    }
}

const TaskFrameLoadingOverlay: React.FC<{ locale: string }> = ({ locale }) => {
    const { NonIdealState, Spinner } = useElementContext();
    return <div key="taskPaneFrameLoadingOverlay" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: TASK_PANE_OVERLAY_BGCOLOR }}>
        <NonIdealState
            icon={<Spinner sizePreset="large" />}
            title={tr("TASK_PANE_LOADING", locale)}
            description={tr("TASK_PANE_LOADING_DESC", locale)} />
    </div>;
}

/**
 * TaskPane component props
 *
 * @interface ITaskPaneProps
 */
export interface ITaskPaneProps {
    currentUrl?: string;
    mapName?: string;
    session?: string;
    locale: string;
    homeAction: IItem;
    backAction: IItem;
    forwardAction: IItem;
    onUrlLoaded: (url: string) => void;
    lastUrlPushed?: boolean;
    showTaskBar: boolean;
    maxHeight?: number;
    flyoutStates?: FlyoutVisibilitySet;
    onOpenFlyout: (id: string, metrics: IDOMElementMetrics) => void;
    onCloseFlyout: (id: string) => void;
}

/**
 * A component that serves as a generic container for content or User Interface for custom functionality
 *
 * @hidden
 * @param props
 */
export const TaskPane: React.FC<ITaskPaneProps> = (props) => {
    const {
        currentUrl,
        mapName,
        locale,
        homeAction,
        backAction,
        forwardAction,
        onUrlLoaded,
        lastUrlPushed,
        showTaskBar,
        maxHeight,
        flyoutStates,
        onOpenFlyout,
        onCloseFlyout
    } = props;

    const [activeComponent, setActiveComponent] = React.useState<string | null>(null);
    const [activeComponentProps, setActiveComponentProps] = React.useState<any>(null);
    const [invalidated, setInvalidated] = React.useState(false);
    const [frameContentLoaded, setFrameContentLoaded] = React.useState(false);
    const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

    const taskButtons: IItem[] = React.useMemo(() => [
        homeAction,
        { isSeparator: true },
        backAction,
        forwardAction
    ], [homeAction, backAction, forwardAction]);

    const handleCloseFlyout = React.useCallback((id: string) => {
        onCloseFlyout?.(id);
    }, [onCloseFlyout]);

    const handleOpenFlyout = React.useCallback((id: string, metrics: IDOMElementMetrics) => {
        onOpenFlyout?.(id, metrics);
    }, [onOpenFlyout]);

    const handleFrameMounted = React.useCallback((iframe: HTMLIFrameElement | null) => {
        iframeRef.current = iframe;
        if (iframe) {
            // This is needed for backcompat with certain fusion widgets
            (iframe as any).taskPaneId = FUSION_TASKPANE_NAME;
        }
    }, []);

    const handleFrameLoaded = React.useCallback((e: GenericEvent) => {
        const frame = e.currentTarget as HTMLIFrameElement;
        if (frame.contentWindow) {
            setFrameContentLoaded(true);
            onUrlLoaded(frame.contentWindow.location.href);
        }
    }, [onUrlLoaded]);

    // Effect for loading URL on mount and when currentUrl changes
    React.useEffect(() => {
        if (currentUrl && lastUrlPushed === false) {
            loadUrl(currentUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUrl, lastUrlPushed]);

    // Effect for invalidation logic
    React.useEffect(() => {
        if (!invalidated && currentUrl && currentUrl.indexOf("component://") !== 0 && currentUrlDoesNotMatchMapName(currentUrl, mapName)) {
            setInvalidated(true);
        } else if (invalidated && currentUrl && (currentUrl.indexOf("component://") === 0 || !currentUrlDoesNotMatchMapName(currentUrl, mapName))) {
            setInvalidated(false);
        }
    }, [currentUrl, mapName, invalidated]);

    // Effect for initial load
    React.useEffect(() => {
        if (currentUrl && activeComponent === null) {
            loadUrl(currentUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadUrl = React.useCallback((url: string) => {
        const compUri = parseComponentUri(url);
        if (compUri) {
            setActiveComponent(compUri.name);
            setActiveComponentProps(compUri.props);
        } else {
            setActiveComponent(null);
            setFrameContentLoaded(false);
            setActiveComponentProps(null);
            setTimeout(() => {
                if (iframeRef.current) {
                    iframeRef.current.contentWindow?.location.replace(url);
                }
            }, 0);
        }
    }, []);

    const taskMenu: IFlyoutMenu = React.useMemo(() => ({
        label: tr("MENU_TASKS", locale),
        flyoutAlign: "bottom left",
        flyoutId: WEBLAYOUT_TASKMENU
    }), [locale]);

    const rootStyle: React.CSSProperties = {};
    const taskBarStyle: React.CSSProperties = {
        height: DEFAULT_TOOLBAR_SIZE,
        backgroundColor: TOOLBAR_BACKGROUND_COLOR
    };
    const taskBodyStyle: React.CSSProperties = {};
    const taskFrameStyle: React.CSSProperties = {
        border: "none"
    };
    const taskComponentContainerStyle: React.CSSProperties = {
        border: "none"
    };
    if (!maxHeight) {
        rootStyle.width = "100%";
        rootStyle.height = "100%";

        taskBarStyle.position = "absolute";
        taskBarStyle.top = 0;
        taskBarStyle.left = 0;
        taskBarStyle.right = 0;

        taskBodyStyle.position = "absolute";
        taskBodyStyle.top = (showTaskBar === true ? DEFAULT_TOOLBAR_SIZE : 0);
        taskBodyStyle.left = 0;
        taskBodyStyle.right = 0;
        taskBodyStyle.bottom = 0;
        taskBodyStyle.overflow = "hidden";

        taskFrameStyle.width = "100%";
        taskFrameStyle.height = "100%";

        taskComponentContainerStyle.width = "100%";
        taskComponentContainerStyle.height = "100%";
    } else {
        taskFrameStyle.width = "100%";
        taskFrameStyle.height = (showTaskBar === true ? (maxHeight - DEFAULT_TOOLBAR_SIZE) : maxHeight);

        taskComponentContainerStyle.width = "100%";
        taskComponentContainerStyle.maxHeight = (showTaskBar === true ? (maxHeight - DEFAULT_TOOLBAR_SIZE) : maxHeight);
        taskComponentContainerStyle.overflowY = "auto";
    }

    return <div style={rootStyle}>
        {showTaskBar === true && (
            <div style={taskBarStyle}>
                <Toolbar childItems={taskButtons} containerStyle={{ float: "left", height: DEFAULT_TOOLBAR_SIZE }} onCloseFlyout={handleCloseFlyout} onOpenFlyout={handleOpenFlyout} flyoutStates={flyoutStates} />
                <Toolbar childItems={[taskMenu]} containerStyle={{ float: "right", height: DEFAULT_TOOLBAR_SIZE }} onCloseFlyout={handleCloseFlyout} onOpenFlyout={handleOpenFlyout} flyoutStates={flyoutStates} />
                <div style={{ clear: "both" }} />
            </div>
        )}
        <div style={taskBodyStyle}>
            {activeComponent != null ? (
                <div style={{ ...taskComponentContainerStyle, overflowY: "auto" }}>
                    <PlaceholderComponent id={activeComponent} componentProps={activeComponentProps} locale={locale} />
                </div>
            ) : (
                (() => {
                    const components = [
                        <iframe key="taskPaneFrame" name="taskPaneFrame" ref={handleFrameMounted} onLoad={handleFrameLoaded} style={taskFrameStyle} />
                    ];
                    if (frameContentLoaded === false) {
                        components.push(<TaskFrameLoadingOverlay key="loading-overlay" locale={locale} />);
                    }
                    return components;
                })()
            )}
            <iframe name="scriptFrame" style={{ width: 0, height: 0, visibility: "hidden" }}></iframe>
        </div>
    </div>;
};