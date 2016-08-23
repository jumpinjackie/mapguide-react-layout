import * as React from "react";
import { Toolbar, IItem, IMenu, DEFAULT_TOOLBAR_HEIGHT, TOOLBAR_BACKGROUND_COLOR } from "./toolbar";
import queryString = require("query-string");
const parse = require("url-parse");
import { ensureParameters } from "../actions/taskpane";

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
}
/*
function buildTaskButtons(pane: TaskPane): IItem[] {
    return [
        {
            icon: "icon_home.gif",
            tooltip: "Go Home",
            enabled: () => pane.canGoHome(),
            invoke: () => pane.goHome()
        },
        { isSeparator: true },
        {
            icon: "back.png",
            tooltip: "Go back",
            enabled: () => pane.canGoBack(),
            invoke: () => pane.goBack()
        },
        {
            icon: "forward.png",
            tooltip: "Go forward",
            enabled: () => pane.canGoForward(),
            invoke: () => pane.goForward()
        }
    ];
}
*/
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
    //_pushLoadedUrl: boolean;
    fnFrameMounted: (iframe) => void;
    fnFrameLoaded: (e) => void;
    taskButtons: IItem[];
    constructor(props: ITaskPaneProps) {
        super(props);
        /*
        this.state = {
            navIndex: -1,
            navigation: []
        };
        */
        this.taskButtons = [
            props.homeAction,
            { isSeparator: true },
            props.backAction,
            props.forwardAction
        ];
        //this.taskButtons = buildTaskButtons(this);
        //this._pushLoadedUrl = true;
        this.fnFrameLoaded = this.onFrameLoaded.bind(this);
        this.fnFrameMounted = this.onFrameMounted.bind(this);
    }
    private onFrameMounted(iframe) {
        this._iframe = iframe;
    }
    private onFrameLoaded(e) {
        const frame = e.currentTarget;
        if (frame.contentWindow) {
            this.props.onUrlLoaded(frame.contentWindow.location.href);
            /*
            if (this._pushLoadedUrl === true) {
                this.props.onUrlLoaded(frame.contentWindow.location.href);
            } else { //Reset
                this._pushLoadedUrl = true;
            }
            */
        }
    }
    /*
    private pushUrl(url: string) {
        let index = this.state.navIndex;
        const nav: string[] = this.state.navigation;
        index++;
        nav[index] = url;
        //If we slotted at a position that is not the end of the array
        //remove everything after it
        if (nav.length > index + 1) {
            nav.splice(index + 1);
        }
        this.setState({ navigation: nav, navIndex: index });
    }
    loadUrl(url: string) {
        if (this._iframe) {
            this._iframe.src = this.ensureParameters(url);
            //this._iframe.contentWindow.location.replace(url);
        }
    }
    goHome() {
        if (this.props.initialUrl && this.canGoHome()) {
            this.loadUrl(this.props.initialUrl);
        }
    }
    goForward() {
        let index = this.state.navIndex;
        const nav = this.state.navigation;
        index++;
        this.setState({ navigation: nav, navIndex: index }, () => {
            const url = nav[index];
            this._pushLoadedUrl = false;
            this.loadUrl(url);
        });
    }
    goBack() {
        let index = this.state.navIndex;
        const nav = this.state.navigation;
        index--;
        this.setState({ navigation: nav, navIndex: index }, () => {
            const url = nav[index];
            this._pushLoadedUrl = false;
            this.loadUrl(url);
        });
    }
    onBack(e) {
        this.goBack();
    }
    onForward(e) {
        this.goForward();
    }
    canGoHome() {
        return this.props.initialUrl != null //An initial URL was set
            && this.state.navigation.length > 0 //We have a navigation stack
            && this.state.navigation[this.state.navIndex] != this.ensureParameters(this.props.initialUrl); //The current URL is not initial
    }
    canGoBack() {
        const { navIndex } = this.state;
        return navIndex > 0;
    }
    canGoForward() {
        const { navigation, navIndex } = this.state;
        return navIndex < navigation.length - 1;
    }
    componentWillReceiveProps(nextProps: ITaskPaneProps) {
        
    }
    componentDidMount() {
        if (this.props.initialUrl) {
            this.loadUrl(this.props.initialUrl);
        }
    }
    */
    componentWillReceiveProps(nextProps: ITaskPaneProps) {
        if (this.props.currentUrl != nextProps.currentUrl) {
            this.loadUrl(nextProps.currentUrl);
        }
    }
    componentDidMount() {
        if (this.props.currentUrl) {
            this.loadUrl(this.props.currentUrl);
        }
    }
    loadUrl(url: string) {
        if (this._iframe) {
            this._iframe.src = ensureParameters(url, this.props.mapName, this.props.session, this.props.locale);
        }
    }
    render(): JSX.Element {
        //const { navigation, navIndex } = this.state;
        const taskMenu: IMenu = {
            label: "Tasks",
            flyoutAlign: "bottom left",
            childItems: this.props.taskMenuItems
        };
        //const currentUrl = this.ensureParameters(navIndex >= 0 ? navigation[navIndex] : this.props.initialUrl);
        return <div style={{ width: "100%", height: "100%", fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: DEFAULT_TOOLBAR_HEIGHT, backgroundColor: TOOLBAR_BACKGROUND_COLOR }}>
                <Toolbar childItems={this.taskButtons} containerStyle={{ position: "absolute", top: 0, left: 0, height: DEFAULT_TOOLBAR_HEIGHT }} />
                <Toolbar childItems={[ taskMenu ]} containerStyle={{ position: "absolute", top: 0, right: 0, height: DEFAULT_TOOLBAR_HEIGHT }} />
            </div>
            <div style={{ position: "absolute", top: DEFAULT_TOOLBAR_HEIGHT, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
                <iframe name="taskPaneFrame" ref={this.fnFrameMounted} onLoad={this.fnFrameLoaded} style={{ border: "none", width: "100%", height: "100%" }}>
                
                </iframe>
                <iframe name="scriptFrame" style={{ width: 0, height: 0, visibility: "hidden" }}></iframe>
            </div>
        </div>;
    }
}