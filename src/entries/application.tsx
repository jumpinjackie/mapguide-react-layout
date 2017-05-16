import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App, { IAppProps } from "../containers/app";
import { ClientKind } from "../api/common";
import configureStore from "../store/configure-store";
import { INITIAL_STATE } from "../reducers/config";

/**
 * This is the entry point to the Application component
 */
export class ApplicationViewModel {
    constructor() {

    }
    public mount(node: Element, props: IAppProps) {
        const agentConf = {
            agentUri: props.agent.uri,
            agentKind: props.agent.kind || "mapagent"
        };
        const store = configureStore({ config: { ...INITIAL_STATE, ...agentConf } });
        ReactDOM.render(<Provider store={store}>
            <App {...props} />
        </Provider>, node);
    }
}