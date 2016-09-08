import * as React from "react";
import { Toolbar, IItem, IMenu, DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "./toolbar";
import queryString = require("query-string");
const parse = require("url-parse");
import { ensureParameters } from "../actions/taskpane";
import { PlaceholderComponent } from "../api/registry/component";
import { tr } from "../api/i18n";

export interface ITaskPaneProps {
    currentUrl?: string;
    mapName: string;
    session: string;
    locale: string;
    taskMenuItems: IItem[];
    homeAction: IItem;
    backAction: IItem;
    forwardAction: IItem;
    onUrlLoaded: (url: string) => void;
    lastUrlPushed?: boolean;
    showTaskBar: boolean;
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
    _iframe: HTMLIFrameElement;
    fnFrameMounted: (iframe) => void;
    fnFrameLoaded: (e) => void;
    taskButtons: IItem[];
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
        this.state = {
            activeComponent: null
        };
    }
    private onFrameMounted(iframe) {
        this._iframe = iframe;
    }
    private onFrameLoaded(e) {
        const frame = e.currentTarget;
        if (frame.contentWindow) {
            this.props.onUrlLoaded(frame.contentWindow.location.href);
        }
    }
    componentWillReceiveProps(nextProps: ITaskPaneProps) {
        if (this.props.currentUrl != nextProps.currentUrl) {
            if (nextProps.lastUrlPushed === false) {
                this.loadUrl(nextProps.currentUrl);
            }
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
        const taskMenu: IMenu = {
            label: tr("MENU_TASKS", this.props.locale),
            flyoutAlign: "bottom left",
            childItems: this.props.taskMenuItems
        };
        return <div style={{ width: "100%", height: "100%" }}>
            {(() => {
                if (this.props.showTaskBar === true) {
                    return <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: DEFAULT_TOOLBAR_SIZE, backgroundColor: TOOLBAR_BACKGROUND_COLOR }}>
                        <Toolbar childItems={this.taskButtons} containerStyle={{ position: "absolute", top: 0, left: 0, height: DEFAULT_TOOLBAR_SIZE }} />
                        <Toolbar childItems={[ taskMenu ]} containerStyle={{ position: "absolute", top: 0, right: 0, height: DEFAULT_TOOLBAR_SIZE }} />
                    </div>;
                }
            })()}
            <div style={{ position: "absolute", top: (this.props.showTaskBar === true ? DEFAULT_TOOLBAR_SIZE : 0), left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
                {(() => {
                    if (this.state.activeComponent != null) {
                        return <div style={{ border: "none", width: "100%", height: "100%" }}>
                            <PlaceholderComponent id={this.state.activeComponent} locale={this.props.locale} />
                        </div>
                    } else {
                        return <iframe name="taskPaneFrame" ref={this.fnFrameMounted} onLoad={this.fnFrameLoaded} style={{ border: "none", width: "100%", height: "100%" }}>
                
                        </iframe>
                    }
                })()}
                <iframe name="scriptFrame" style={{ width: 0, height: 0, visibility: "hidden" }}></iframe>
            </div>
        </div>;
    }
}