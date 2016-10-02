import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IAppProps, App } from "../containers/app";
import { ClientKind } from "../api/common";
import { ClientContext } from "../api/client";
import configureStore from "../store/configure-store";
import { INITIAL_STATE } from "../reducers/config";
const assign = require("object-assign");

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
        const store = configureStore({ config: assign({}, INITIAL_STATE, agentConf) });
        ReactDOM.render(<Provider store={store}>
            <App {...props} />
        </Provider>, node);
    }
}