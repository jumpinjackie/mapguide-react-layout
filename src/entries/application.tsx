import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App, { IAppProps } from "../containers/app";
import { ReduxThunkedAction, ICommand, IApplicationState, ReduxDispatch, IConfigurationReducerState } from "../api/common";
import configureStore from "../store/configure-store";
import { CONFIG_INITIAL_STATE } from "../reducers/config";
import { getCommand as getRegisteredCommand } from "../api/registry/command";
import { ViewerAction } from '../actions/defs';
import { Subscriber, ISubscriberProps } from '../containers/subscriber';
import { IViewerInitCommand } from '../actions/init-command';

/**
 * Extra application mount options.
 * 
 * @since 0.11
 * @export
 * @interface IApplicationMountOptions
 */
export interface IApplicationMountOptions {
    initCommandFactory: (dispatch: ReduxDispatch) => IViewerInitCommand;
    /**
     * An array of subscribers to application state
     * 
     * @since 0.13
     */
    subscribers: ISubscriberProps[];
    /**
     * Initial configuration settings to apply.
     * 
     * @since 0.11
     * @type {Partial<IConfigurationReducerState>}
     * @memberof IApplicationMountOptions
     */
    initialConfig: Partial<IConfigurationReducerState>;
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
        const subs: ISubscriberProps[] = props.subscribers ?? [];
        const agentConf = {
            agentUri: props.mapguide?.agentUri,
            agentKind: props.mapguide?.agentKind ?? "mapagent"
        };
        const initState = { ...{ config: { ...CONFIG_INITIAL_STATE, ...agentConf, ...(props.initialConfig || {}) } }, ...this.getExtraInitialState() };
        const extraReducers = this.getExtraReducers();
        this._store = configureStore(initState, extraReducers);
        const initCommand = props.initCommandFactory(this._store.dispatch);
        ReactDOM.render(<Provider store={this._store}>
            <App {...props} initCommand={initCommand} />
            {subs.map((s, i) => <Subscriber key={`subscriber-${i}-${s.name}`} {...s} />)}
        </Provider>, node);
    }
    /**
     * Dispatches the given action
     * 
     * @param {(ViewerAction | ReduxThunkedAction)} action 
     * @memberof ApplicationViewModel
     * @remarks Usage outside of the react component context should be used sparingly. In particular
     * you should avoid trying to call this method multiple times in succession. You should call this 
     * method once in response to a DOM element event (eg. A button click)
     * @alpha
     */
    public dispatch(action: ViewerAction | ReduxThunkedAction) {
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