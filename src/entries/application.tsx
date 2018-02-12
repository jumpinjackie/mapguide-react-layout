import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App, { IAppProps } from "../containers/app";
import { ClientKind, ReduxAction, ReduxThunkedAction, ICommand, IApplicationState } from "../api/common";
import configureStore from "../store/configure-store";
import { CONFIG_INITIAL_STATE } from "../reducers/config";
import { getCommand as getRegisteredCommand } from "../api/registry/command";

export interface IApplicationMountOptions {
    /**
     * Initial configuration settings to apply.
     */
    initialConfig: {
        manualFeatureTooltips: boolean
    }
}

/**
 * This is the entry point to the Application component
 *
 * In the browser globals context, this is accessible via MapGuide.Application
 */
export class ApplicationViewModel {
    protected _store: any;

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
     * @param {IAppProps & IApplicationMountOptions} props
     *
     * @memberof ApplicationViewModel
     */
    public mount(node: Element, props: IAppProps & IApplicationMountOptions) {
        const agentConf = {
            agentUri: props.agent.uri,
            agentKind: props.agent.kind || "mapagent"
        };
        const initState = { ...{ config: { ...CONFIG_INITIAL_STATE, ...agentConf, ...(props.initialConfig || {}) } }, ...this.getExtraInitialState() };
        const extraReducers = this.getExtraReducers();
        this._store = configureStore(initState, extraReducers);
        ReactDOM.render(<Provider store={this._store}>
            <App {...props} />
        </Provider>, node);
    }
    /**
     * Dispatches the given action
     * 
     * @param {(ReduxAction | ReduxThunkedAction)} action 
     * @memberof ApplicationViewModel
     */
    public dispatch(action: ReduxAction | ReduxThunkedAction) {
        this._store.dispatch(action);
    }
    /**
     * Gets the command registered by the specific name
     * 
     * @param {string} commandName 
     * @returns {(ICommand | undefined)} 
     * @memberof ApplicationViewModel
     */
    public getCommand(commandName: string): ICommand | undefined {
        return getRegisteredCommand(commandName);
    }
    /**
     * Returns the current application state. This state is read-only and should not be modified.
     * 
     * @returns {Readonly<IApplicationState>} 
     * @memberof ApplicationViewModel
     */
    public getState(): Readonly<IApplicationState> {
        return this._store.getState();
    }
}