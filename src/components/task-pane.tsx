import * as React from "react";
import { Toolbar, IItem, IMenu, DEFAULT_TOOLBAR_HEIGHT, TOOLBAR_BACKGROUND_COLOR } from "./toolbar";
import { 
    IApplicationContext,
    APPLICATION_CONTEXT_VALIDATION_MAP
} from "./context";
import queryString = require("query-string");
const parse = require("url-parse");

export interface ITaskPaneProps {
    initialUrl?: string;
}

function buildTaskMenu(): IItem[] {
    const taskMenu: IMenu = {
        label: "Tasks",
        childItems: []
    };
    return [ taskMenu ];
}

function buildTaskButtons(pane: TaskPane): IItem[] {
    return [
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

export class TaskPane extends React.Component<ITaskPaneProps, any> {
    taskMenu: IItem[];
    taskButtons: IItem[];
    constructor(props) {
        super(props);
        this.state = {
            navIndex: -1,
            navigation: []
        };
        this.taskMenu = buildTaskMenu();
        this.taskButtons = buildTaskButtons(this);
    }
    static contextTypes = APPLICATION_CONTEXT_VALIDATION_MAP;
    context: IApplicationContext;
    private ensureParameters(url: string): string {
        if (url == null)
            return null;
        const parsed = parse(url);
        const params = queryString.parse(parsed.query);
        let bNeedMapName = true;
        let bNeedSession = true;
        let bNeedLocale = true;
        for (const key in params) {
            const name = key.toLowerCase();
            switch (name) {
                case "session":
                    bNeedSession = false;
                    break;
                case "mapname":
                    bNeedMapName = false;
                    break;
                case "locale":
                    bNeedLocale = false;
                    break;
            }
        }
        if (bNeedMapName) {
            params.MAPNAME = this.context.getMapName();
        }
        if (bNeedSession) {
            params.SESSION = this.context.getSession();
        }
        if (bNeedLocale) {
            params.LOCALE = this.context.getLocale();
        }
        parsed.query = queryString.stringify(params);
        return parsed.toString();
    }
    loadUrl(url: string) {
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
    goForward() {
        let index = this.state.navIndex;
        const nav = this.state.navigation;
        index++;
        this.setState({ navigation: nav, navIndex: index });
    }
    goBack() {
        let index = this.state.navIndex;
        const nav = this.state.navigation;
        index--;
        this.setState({ navigation: nav, navIndex: index });
    }
    onBack(e) {
        this.goBack();
    }
    onForward(e) {
        this.goForward();
    }
    canGoBack() {
        const { navIndex } = this.state;
        return navIndex >= 0;
    }
    canGoForward() {
        const { navigation, navIndex } = this.state;
        return navIndex < navigation.length - 1;
    }
    render(): JSX.Element {
        const { navigation, navIndex } = this.state;
        const currentUrl = this.ensureParameters(navIndex >= 0 ? navigation[navIndex] : this.props.initialUrl);
        return <div style={{ width: "100%", height: "100%", fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: DEFAULT_TOOLBAR_HEIGHT, backgroundColor: TOOLBAR_BACKGROUND_COLOR }}>
                <Toolbar childItems={this.taskButtons} containerStyle={{ position: "absolute", top: 0, left: 0, height: DEFAULT_TOOLBAR_HEIGHT }} />
                <Toolbar childItems={this.taskMenu} containerStyle={{ position: "absolute", top: 0, right: 0, height: DEFAULT_TOOLBAR_HEIGHT }} />
            </div>
            <div style={{ position: "absolute", top: DEFAULT_TOOLBAR_HEIGHT, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
                <iframe src={currentUrl} style={{ border: "none", width: "100%", height: "100%" }}>
                
                </iframe>
            </div>
        </div>;
    }
}