import * as React from "react";
import configureStore from '../store/configure-store';
import App, { IAppProps } from "../containers/app";
import { Provider } from 'react-redux';
import { CONFIG_INITIAL_STATE } from '../reducers/config';
import { registerRequestBuilder } from '../api/builders/factory';
import { RequestBuilder, ICreateRuntimeMapOptions, IQueryMapFeaturesOptions, IDescribeRuntimeMapOptions } from '../api/request-builder';
import { ResourceBase } from '../api/contracts/common';
import { RuntimeMap } from '../api/contracts/runtime-map';
import { QueryMapFeaturesResponse } from '../api/contracts/query';
import { ApplicationDefinition } from '../api/contracts/fusion';
import { deArrayify } from '../api/builders/deArrayify';
import { registerLayout } from '../api/registry/layout';
const testMap: RuntimeMap = deArrayify(require("./data/test-runtime-map.json"));
const testAppDef: ApplicationDefinition = deArrayify(require("./data/test-app-def.json"));

class FakeMapAgent extends RequestBuilder {
    constructor(private uri: string, private locale?: string) {
        super(uri);
    }
    public createSession(username: string, password: string): Promise<string> {
        return Promise.resolve(testMap.SessionId);
    }
    public getServerSessionTimeout(session: string): Promise<number> {
        throw new Error("Method not implemented - getServerSessionTimeout.");
    }
    public getResource<T extends ResourceBase>(resourceId: string, args?: any): Promise<T> {
        if (resourceId.endsWith(".ApplicationDefinition")) {
            return Promise.resolve<any>(testAppDef);
        }
        throw new Error(`Method not implemented - getResource(${resourceId}).`);
    }
    public createRuntimeMap(options: ICreateRuntimeMapOptions): Promise<RuntimeMap> {
        return Promise.resolve(testMap);
    }
    public queryMapFeatures(options: IQueryMapFeaturesOptions): Promise<QueryMapFeaturesResponse> {
        throw new Error("Method not implemented - queryMapFeatures.");
    }
    public queryMapFeatures_v4(options: IQueryMapFeaturesOptions): Promise<QueryMapFeaturesResponse> {
        throw new Error("Method not implemented - queryMapFeatures_v4.");
    }
    public describeRuntimeMap(options: IDescribeRuntimeMapOptions): Promise<RuntimeMap> {
        throw new Error("Method not implemented - describeRuntimeMap.");
    }
    public getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string): string {
        throw new Error("Method not implemented - getTileTemplateUrl.");
    }
}

export interface IFakeAppProps {
    children: React.ReactNode;
}

/**
 * This component sets up a mocked application environment from which any redux container component
 * can be housed within
 */
export class FakeApp extends React.Component<IFakeAppProps> {
    private _store: any;
    constructor(props: IFakeAppProps) {
        super(props);
        registerRequestBuilder("mapagent", (uri, locale) => new FakeMapAgent(uri, locale));
        registerLayout("fake-app", () => <>{props.children}</>);
        const agentConf = {
            agentUri: "https://my-mapguide-server/mapguide/mapagent/mapagent.fcgi",
            agentKind: "mapagent"
        };
        const initState = {
            ...{
                config: {
                    ...CONFIG_INITIAL_STATE,
                    ...agentConf
                },
                mapState: {
                    Sheboygan: {
                        currentView: {
                            scale: 51439.16420267266,
                            x: -87.73025425093128,
                            y: 43.744459064634064
                        }
                    }
                }
            }
        };
        this._store = configureStore(initState);
    }
    render() {
        return <Provider store={this._store}>
            <App layout="fake-app" resourceId="Library://Test/Viewer.ApplicationDefinition" {...this.props} />
        </Provider>;
    }
}