import * as React from "react";
import { Toolbar, IItem, IMenu, DEFAULT_TOOLBAR_HEIGHT } from "./toolbar";

export interface ITaskPaneProps {
    initialUrl?: string;
}

/*
function getIcon(relPath: string): string {
    return `stdicons/${relPath}`;
}

const TOOLBAR_HEIGHT = 32;

const TaskMenu = (props) => {
    return <div style={{ position: "absolute", right: 0, display: "inline-block", height: TOOLBAR_HEIGHT, padding: ((TOOLBAR_HEIGHT - 16) / 2) }} title={props.title} onClick={props.onClick}>
        <img style={{ verticalAlign: "middle", lineHeight: TOOLBAR_HEIGHT }} src={getIcon("ui-menu.png")} /> Tasks
    </div>;
}

const TaskButton = (props) => {
    return <div style={{ display: "inline-block", height: TOOLBAR_HEIGHT, padding: ((TOOLBAR_HEIGHT - 16) / 2) }} title={props.title} onClick={props.onClick}>
        <img style={{ verticalAlign: "middle", lineHeight: TOOLBAR_HEIGHT }} src={getIcon(props.icon)} />
    </div>;
};

const TaskBar = (props) => {
    return <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: TOOLBAR_HEIGHT }}>
        <TaskButton enabled={props.canGoBack} icon="back.png" title="Go Back" onClick={props.onBack} />
        <TaskButton enabled={props.canGoForward} icon="forward.png" title="Go Forward" onClick={props.onForward} />
        <TaskMenu />
    </div>;
};
*/

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
        const currentUrl = navIndex >= 0 ? navigation[navIndex] : this.props.initialUrl;
        return <div style={{ width: "100%", height: "100%", fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }}>
            <Toolbar childItems={this.taskButtons} containerStyle={{ position: "absolute", top: 0, left: 0, height: DEFAULT_TOOLBAR_HEIGHT }} />
            <Toolbar childItems={this.taskMenu} containerStyle={{ position: "absolute", top: 0, right: 0, height: DEFAULT_TOOLBAR_HEIGHT }} />
            <div style={{ position: "absolute", top: DEFAULT_TOOLBAR_HEIGHT, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
                <iframe src={currentUrl} style={{ border: "none", width: "100%", height: "100%" }}>
                
                </iframe>
            </div>
        </div>
    }
}