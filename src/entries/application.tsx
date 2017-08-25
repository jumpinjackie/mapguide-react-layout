import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App, { IAppProps } from "../containers/app";
import { ClientKind } from "../api/common";
import configureStore from "../store/configure-store";
import { INITIAL_STATE } from "../reducers/config";

/**
 * This is the entry point to the Application component
 *
 * In the browser globals context, this is accessible via MapGuide.Application
 */
export class ApplicationViewModel {
    /**
     * @hidden
     */
    constructor() {

    }
    /**
     * Returns any extra initial state to include as part of initializing the redux store
     * 
     * Overridable by sub-classes that want to include extra initial state
     * 
     * @virtual
     * @protected
     * @returns {*} 
     * @memberof ApplicationViewModel
     */
    protected getExtraInitialState(): any { return {}; }
    /**
     * Returns any extra reducers to include as part of initializing the redux store
     * 
     * Overridable by sub-classes that want to include custom reducers
     * 
     * @virtual
     * @protected
     * @returns {*} 
     * @memberof ApplicationViewModel
     */
    protected getExtraReducers(): any { return {}; }
    /**
     * Mounts the map viewer application at the specified DOM element with the
     * given component props.
     *
     * For the viewer templates already provided, this method is already called
     * for you in the template's HTML. If you are creating your own viewer template, be
     * sure to call this method must on the template's HTML.
     *
     * @param {Element} node
     * @param {IAppProps} props
     *
     * @memberof ApplicationViewModel
     */
    public mount(node: Element, props: IAppProps) {
        const agentConf = {
            agentUri: props.agent.uri,
            agentKind: props.agent.kind || "mapagent"
        };
        const initState = { ...{ config: { ...INITIAL_STATE, ...agentConf } }, ...this.getExtraInitialState() };
        const extraReducers = this.getExtraReducers();
        const store = configureStore(initState, extraReducers);
        ReactDOM.render(<Provider store={store}>
            <App {...props} />
        </Provider>, node);
    }
}