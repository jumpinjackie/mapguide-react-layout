import * as React from "react";

export interface ITaskPaneProps {
    initialUrl?: string;
}

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
        <TaskButton icon="back.png" title="Go Back" onClick={props.onBack} />
        <TaskButton icon="forward.png" title="Go Forward" onClick={props.onForward} />
        <TaskMenu />
    </div>;
};

export class TaskPane extends React.Component<ITaskPaneProps, any> {
    private _iframe: HTMLIFrameElement;
    constructor(props) {
        super(props);
        this.state = {};
    }
    onFrameMounted(component) {
        this._iframe = component;
    }
    onBack(e) {
        alert("TODO: Go back");
    }
    onForward(e) {
        alert("TODO: Go forward");
    }
    render(): JSX.Element {
        return <div style={{ width: "100%", height: "100%", fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }}>
            <TaskBar onBack={this.onBack.bind(this)} onForward={this.onForward.bind(this)} />
            <div style={{ position: "absolute", top: TOOLBAR_HEIGHT, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
                <iframe ref={this.onFrameMounted.bind(this)} src={this.props.initialUrl} style={{ border: "none", width: "100%", height: "100%" }}>
                
                </iframe>
            </div>
        </div>
    }
}