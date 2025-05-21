import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Toolbar,
    IItem,
    IFlyoutMenu,
    DEFAULT_TOOLBAR_SIZE,
    TOOLBAR_BACKGROUND_COLOR
} from "./toolbar";
import { PlaceholderComponent } from "../api/registry/component";
import { tr } from "../api/i18n";
import {
    GenericEvent,
    IDOMElementMetrics,
    FlyoutVisibilitySet
} from "../api/common";
import { parseComponentUri } from "../utils/url";
import { Intent, NonIdealState, Spinner } from '@blueprintjs/core';
import { FUSION_TASKPANE_NAME, WEBLAYOUT_TASKMENU } from '../constants';

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

// HACK:
//
// Having the lastUrlPushed props sounds extremely hacky, but we need a way to signal that
// the url its about to receive was pushed and should not be reloaded into the internal iframe
//
// This is because we want internal url transitions (eg. Clicking a link, submitting a form) to
// be recorded in the navigation stack so we can properly go back/forward just like a web browser.
// But we don't want these recorded URLs to accidentally trigger a re-load of the same url.

/**
 * A component that serves as a generic container for content or User Interface for custom functionality
 *
 * @class TaskPane
 * @extends {React.Component<ITaskPaneProps, any>}
 */
export class TaskPane extends React.Component<ITaskPaneProps, any> {
    private _iframe: HTMLIFrameElement;
    private taskButtons: IItem[];
    constructor(props: ITaskPaneProps) {
        super(props);
        this.taskButtons = [
            props.homeAction,
            { isSeparator: true },
            props.backAction,
            props.forwardAction
        ];
        this.state = {
            activeComponent: null,
            invalidated: false,
            frameContentLoaded: false
        };
    }
    private onCloseFlyout = (id: string) => this.props.onCloseFlyout?.(id);
    private onOpenFlyout = (id: string, metrics: IDOMElementMetrics) => this.props.onOpenFlyout?.(id, metrics);
    private onFrameMounted = (iframe: HTMLIFrameElement) => {
        this._iframe = iframe;
        if (this._iframe) {
            const el = ReactDOM.findDOMNode(this._iframe);
            //This is needed for backcompat with certain fusion widgets
            (el as any).taskPaneId = FUSION_TASKPANE_NAME;
        }
    }
    private onFrameLoaded = (e: GenericEvent) => {
        const frame = e.currentTarget;
        if (frame.contentWindow) {
            this.setState({ frameContentLoaded: true });
            this.props.onUrlLoaded(frame.contentWindow.location.href);
        }
    }
    componentDidUpdate(prevProps: ITaskPaneProps) {
        const nextProps = this.props;
        if (prevProps.currentUrl != nextProps.currentUrl) {
            if (nextProps.currentUrl && nextProps.lastUrlPushed === false) {
                this.loadUrl(nextProps.currentUrl);
            }
        }
        if (!this.state.invalidated && nextProps.currentUrl && nextProps.currentUrl.indexOf("component://") != 0 && currentUrlDoesNotMatchMapName(nextProps.currentUrl, nextProps.mapName)) {
            //TODO: If we want to be smart, we could have the TaskPane amend the currentUrl with the new map name
            this.setState({ invalidated: true });
        } else if (this.state.invalidated && nextProps.currentUrl && (nextProps.currentUrl.indexOf("component://") == 0 || !currentUrlDoesNotMatchMapName(nextProps.currentUrl, nextProps.mapName))) {
            this.setState({ invalidated: false });
        }
    }
    componentDidMount() {
        if (this.props.currentUrl) {
            this.loadUrl(this.props.currentUrl);
        }
    }
    loadUrl(url: string) {
        //TODO: Can't convert this to functional component with hooks, until this type
        //of pattern is possible
        const compUri = parseComponentUri(url);
        if (compUri) {
            this.setState({ activeComponent: compUri.name, activeComponentProps: compUri.props });
        } else {
            this.setState({ activeComponent: null, frameContentLoaded: false }, () => {
                if (this._iframe) {
                    this._iframe.contentWindow?.location.replace(url);
                }
            });
        }
    }
    render(): JSX.Element {
        const { invalidated, activeComponent } = this.state;
        const { locale, maxHeight, showTaskBar } = this.props;
        const taskMenu: IFlyoutMenu = {
            label: tr("MENU_TASKS", locale),
            flyoutAlign: "bottom left",
            flyoutId: WEBLAYOUT_TASKMENU
        };
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
            {(() => {
                if (showTaskBar === true) {
                    return <div style={taskBarStyle}>
                        <Toolbar childItems={this.taskButtons} containerStyle={{ float: "left", height: DEFAULT_TOOLBAR_SIZE }} onCloseFlyout={this.onCloseFlyout} onOpenFlyout={this.onOpenFlyout} flyoutStates={this.props.flyoutStates} />
                        <Toolbar childItems={[taskMenu]} containerStyle={{ float: "right", height: DEFAULT_TOOLBAR_SIZE }} onCloseFlyout={this.onCloseFlyout} onOpenFlyout={this.onOpenFlyout} flyoutStates={this.props.flyoutStates} />
                        <div style={{ clear: "both" }} />
                    </div>;
                }
            })()}
            <div style={taskBodyStyle}>
                {(() => {
                    if (activeComponent != null) {
                        const cpp = this.state.activeComponentProps;
                        taskComponentContainerStyle.overflowY = "auto";
                        return <div style={taskComponentContainerStyle}>
                            <PlaceholderComponent id={activeComponent} componentProps={cpp} locale={this.props.locale} />
                        </div>
                    } else {
                        const { frameContentLoaded } = this.state;
                        const components = [
                            <iframe key="taskPaneFrame" name="taskPaneFrame" ref={this.onFrameMounted} onLoad={this.onFrameLoaded} style={taskFrameStyle}>
                            </iframe>
                        ];
                        if (frameContentLoaded == false) {
                            components.push(<div key="taskPaneFrameLoadingOverlay" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: TASK_PANE_OVERLAY_BGCOLOR }}>
                                <NonIdealState 
                                    icon={<Spinner intent={Intent.NONE} size={Spinner.SIZE_LARGE} />}
                                    title={tr("TASK_PANE_LOADING", locale)}
                                    description={tr("TASK_PANE_LOADING_DESC", locale)} />
                            </div>);
                        }
                        return components;
                    }
                })()}
                <iframe name="scriptFrame" style={{ width: 0, height: 0, visibility: "hidden" }}></iframe>
            </div>
        </div>;
    }
}