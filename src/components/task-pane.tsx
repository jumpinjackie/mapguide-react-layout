import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Constants from "../constants";
import { Toolbar, IItem, IFlyoutMenu, DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "./toolbar";
import queryString = require("query-string");
const parse = require("url-parse");
import { ensureParameters } from "../actions/taskpane";
import { PlaceholderComponent } from "../api/registry/component";
import { tr } from "../api/i18n";
import { IDOMElementMetrics } from "../api/common";

function currentUrlDoesNotMatchMapName(currentUrl: string, mapName: string): boolean {
    const normUrl = currentUrl.toLowerCase();
    //Only invalidate if url has mapname and it doesn't match our current one
    if (normUrl.indexOf("mapname=") >= 0) {
        return normUrl.indexOf(`mapname=${mapName.toLowerCase()}`) < 0;
    } else {
        return false;
    }
}

export interface ITaskPaneProps {
    currentUrl?: string;
    mapName: string;
    session: string;
    locale: string;
    homeAction: IItem;
    backAction: IItem;
    forwardAction: IItem;
    onUrlLoaded: (url: string) => void;
    lastUrlPushed?: boolean;
    showTaskBar: boolean;
    maxHeight?: number;
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

// FIXME:
//
// While the current iframe works the way we want and we have a nice navigation
// stack to go forward/back, the iframe is also putting real entries into our
// browser's history, meaning hitting the actual browser back/forward buttons can
// throw the internal navigation stack out of whack!
//
// There is a solution to this: Replace the current iframe with a new iframe with
// the new URL (http://stackoverflow.com/questions/821359/reload-an-iframe-without-adding-to-the-history)
//
// However, I suspect this doesn't work in React because of the virtual DOM retaining
// the old iframe element. How can we get React to make a new iframe for each URL?

export class TaskPane extends React.Component<ITaskPaneProps, any> {
    private _iframe: HTMLIFrameElement;
    private fnFrameMounted: (iframe: HTMLIFrameElement) => void;
    private fnFrameLoaded: GenericEventHandler;
    private taskButtons: IItem[];
    private fnOpenFlyout: (id: string, metrics: IDOMElementMetrics) => void;
    private fnCloseFlyout: (id: string) => void;
    constructor(props: ITaskPaneProps) {
        super(props);
        this.taskButtons = [
            props.homeAction,
            { isSeparator: true },
            props.backAction,
            props.forwardAction
        ];
        this.fnFrameLoaded = this.onFrameLoaded.bind(this);
        this.fnFrameMounted = this.onFrameMounted.bind(this);
        this.fnCloseFlyout = this.onCloseFlyout.bind(this);
        this.fnOpenFlyout = this.onOpenFlyout.bind(this);
        this.state = {
            activeComponent: null,
            invalidated: false
        };
    }
    private onCloseFlyout(id: string): void {
        if (this.props.onCloseFlyout) {
            this.props.onCloseFlyout(id);
        }
    }
    private onOpenFlyout(id: string, metrics: IDOMElementMetrics): void {
        if (this.props.onOpenFlyout) {
            this.props.onOpenFlyout(id, metrics);
        }
    }
    private onFrameMounted(iframe: HTMLIFrameElement) {
        this._iframe = iframe;
        if (this._iframe) {
            const el = ReactDOM.findDOMNode(this._iframe);
            //This is needed for backcompat with certain fusion widgets
            (el as any).taskPaneId = Constants.FUSION_TASKPANE_NAME;
        }
    }
    private onFrameLoaded(e: GenericEvent) {
        const frame = e.currentTarget;
        if (frame.contentWindow) {
            this.props.onUrlLoaded(frame.contentWindow.location.href);
        }
    }
    componentWillReceiveProps(nextProps: ITaskPaneProps) {
        if (this.props.currentUrl != nextProps.currentUrl) {
            if (nextProps.currentUrl && nextProps.lastUrlPushed === false) {
                this.loadUrl(nextProps.currentUrl);
            }
        }
        if (!this.state.invalidated && nextProps.currentUrl && nextProps.currentUrl.indexOf("component://") != 0 && currentUrlDoesNotMatchMapName(nextProps.currentUrl, nextProps.mapName)) {
            //TODO: If we want to be smart, we could have the TaskPane amend the currentUrl with the new map name
            this.setState({ invalidated: true });
        } else if (nextProps.currentUrl && (nextProps.currentUrl.indexOf("component://") == 0 || !currentUrlDoesNotMatchMapName(nextProps.currentUrl, nextProps.mapName))) {
            this.setState({ invalidated: false });
        }
    }
    componentDidMount() {
        if (this.props.currentUrl) {
            this.loadUrl(this.props.currentUrl);
        }
    }
    loadUrl(url: string) {
        if (url.indexOf("component://") >= 0) {
            this.setState({ activeComponent: url.substring(12) });
        } else {
            this.setState({ activeComponent: null}, () => {
                if (this._iframe) {
                    this._iframe.src = ensureParameters(url, this.props.mapName, this.props.session, this.props.locale);
                }
            });
        }
    }
    render(): JSX.Element {
        const { invalidated } = this.state;
        const taskMenu: IFlyoutMenu = {
            label: tr("MENU_TASKS", this.props.locale),
            flyoutAlign: "bottom left",
            flyoutId: Constants.WEBLAYOUT_TASKMENU
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
        if (!this.props.maxHeight) {
            rootStyle.width = "100%";
            rootStyle.height = "100%";

            taskBarStyle.position = "absolute";
            taskBarStyle.top = 0;
            taskBarStyle.left = 0;
            taskBarStyle.right = 0;

            taskBodyStyle.position = "absolute";
            taskBodyStyle.top = (this.props.showTaskBar === true ? DEFAULT_TOOLBAR_SIZE : 0);
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
            taskFrameStyle.height = (this.props.showTaskBar === true ? (this.props.maxHeight - DEFAULT_TOOLBAR_SIZE) : this.props.maxHeight);

            taskComponentContainerStyle.width = "100%";
            taskComponentContainerStyle.maxHeight = (this.props.showTaskBar === true ? (this.props.maxHeight - DEFAULT_TOOLBAR_SIZE) : this.props.maxHeight);
            taskComponentContainerStyle.overflowY = "auto";
        }
        return <div style={rootStyle}>
            {(() => {
                if (this.props.showTaskBar === true) {
                    return <div style={taskBarStyle}>
                        <Toolbar childItems={this.taskButtons} containerStyle={{ float: "left", height: DEFAULT_TOOLBAR_SIZE }} onCloseFlyout={this.fnCloseFlyout} onOpenFlyout={this.fnOpenFlyout} />
                        <Toolbar childItems={[ taskMenu ]} containerStyle={{ float: "right", height: DEFAULT_TOOLBAR_SIZE }} onCloseFlyout={this.fnCloseFlyout} onOpenFlyout={this.fnOpenFlyout} />
                        <div style={{ clear: "both" }} />
                    </div>;
                }
            })()}
            <div style={taskBodyStyle}>
                {(() => {
                    if (invalidated === true) {
                        return <div className="pt-callout pt-intent-warning">
                            <h5>{tr("TASK_PANE_CONTENT_FOR_INACTIVE_MAP_TITLE", this.props.locale)}</h5>
                            {tr("TASK_PANE_CONTENT_FOR_INACTIVE_MAP_WARNING", this.props.locale)}
                        </div>;
                    }
                })()}
                {(() => {
                    if (this.state.activeComponent != null) {
                        return <div className={(invalidated === true ? "invalidated-task-pane" : undefined)} style={taskComponentContainerStyle}>
                            <PlaceholderComponent id={this.state.activeComponent} locale={this.props.locale} />
                        </div>
                    } else {
                        return <iframe className={(invalidated === true ? "invalidated-task-pane" : undefined)} name="taskPaneFrame" ref={this.fnFrameMounted} onLoad={this.fnFrameLoaded} style={taskFrameStyle}>

                        </iframe>
                    }
                })()}
                <iframe name="scriptFrame" style={{ width: 0, height: 0, visibility: "hidden" }}></iframe>
            </div>
        </div>;
    }
}