import * as React from "react";
import { configureStore } from '../store/configure-store';
import { App, IAppProps } from "../containers/app";
import { Provider } from 'react-redux';
import { CONFIG_INITIAL_STATE } from '../reducers/config';
import { registerRequestBuilder } from '../api/builders/factory';
import { RequestBuilder, ICreateRuntimeMapOptions, IQueryMapFeaturesOptions, IDescribeRuntimeMapOptions, QueryFeaturesSet } from '../api/request-builder';
import { ResourceBase } from '../api/contracts/common';
import { RuntimeMap } from '../api/contracts/runtime-map';
import { QueryMapFeaturesResponse } from '../api/contracts/query';
import { ApplicationDefinition } from '../api/contracts/fusion';
import { deArrayify } from '../api/builders/deArrayify';
import { registerLayout } from '../api/registry/layout';
import { IConfigurationReducerState, IViewerReducerState, ClientKind } from '../api/common';
import { MapGuideViewerInitCommand } from '../actions/init-mapguide';
import { IViewerInitCommand } from '../actions/init-command';
import { MapProviderContext } from '../components/map-providers/context';
import { MapGuideMapProviderContext } from '../components/map-providers/mapguide';
import { MapGuideMockMode } from '../components/mapguide-debug-context';
const testMapSheboygan: RuntimeMap = deArrayify(require("./data/test-runtime-map-sheboygan.json"));
const testMapRedding: RuntimeMap = deArrayify(require("./data/test-runtime-map-redding.json"));
const testMapMelbourne: RuntimeMap = deArrayify(require("./data/test-runtime-map-melbourne.json"));
const testAppDef: ApplicationDefinition = deArrayify(require("./data/test-app-def.json"));

const PROVIDER_IMPL = new MapGuideMapProviderContext();

class FakeMapAgent extends RequestBuilder {
    constructor(private uri: string, private locale?: string) {
        super(uri);
    }
    public createSession(username: string, password: string): Promise<string> {
        return Promise.resolve(testMapSheboygan.SessionId);
    }
    public getServerSessionTimeout(session: string): Promise<number> {
        return Promise.resolve(10000);
    }
    public getResource<T extends ResourceBase>(resourceId: string, args?: any): Promise<T> {
        if (resourceId.endsWith(".ApplicationDefinition")) {
            return Promise.resolve<any>(testAppDef);
        }
        throw new Error(`Method not implemented - getResource(${resourceId}).`);
    }
    public createRuntimeMap(options: ICreateRuntimeMapOptions): Promise<RuntimeMap> {
        switch (options.mapDefinition) {
            case "Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition":
                return Promise.resolve(testMapSheboygan);
            case "Library://Redding/Maps/Redding.MapDefinition":
                return Promise.resolve(testMapRedding);
            case "Library://Samples/Melbourne/Maps/Melbourne.MapDefinition":
                return Promise.resolve(testMapMelbourne);
        }
        return Promise.reject(`Unknown test map: ${options.mapDefinition}`);
    }
    public queryMapFeatures(options: IQueryMapFeaturesOptions): Promise<QueryMapFeaturesResponse> {
        return Promise.resolve({});
    }
    public queryMapFeatures_v4(options: IQueryMapFeaturesOptions): Promise<QueryMapFeaturesResponse> {
        return Promise.resolve({});
    }
    public describeRuntimeMap(options: IDescribeRuntimeMapOptions): Promise<RuntimeMap> {
        switch (options.mapname) {
            case "Sheboygan":
                return Promise.resolve(testMapSheboygan);
            case "Redding":
                return Promise.resolve(testMapRedding);
            case "Melbourne":
                return Promise.resolve(testMapMelbourne);
        }
        return Promise.reject(`Unknown test map state: ${options.mapname}`);
    }
    public getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string): string {
        throw new Error("Method not implemented - getTileTemplateUrl.");
    }
}

export interface IFakeAppProps {
    templateLayout?: () => React.ReactNode;
    mgMockMode: MapGuideMockMode;
    children?: React.ReactNode;
}

/**
 * This component sets up a mocked application environment from which any redux container component
 * can be housed within
 */
export class FakeApp extends React.Component<IFakeAppProps> {
    private _store: any;
    private _agentUri: string;
    private _agentKind: ClientKind;
    private _initCommand: IViewerInitCommand;
    constructor(props: IFakeAppProps) {
        super(props);
        registerRequestBuilder("mapagent", (uri, locale) => new FakeMapAgent(uri, locale));
        registerLayout("fake-app", () => <>{props.children}</>);
        this._agentUri = "https://my-mapguide-server/mapguide/mapagent/mapagent.fcgi";
        this._agentKind = "mapagent";
        const initState = {
            ...{
                config: {
                    ...CONFIG_INITIAL_STATE,
                    ...{
                        agentKind: this._agentKind,
                        agentUri: this._agentUri
                    },
                } as IConfigurationReducerState,
                mapState: {
                    Sheboygan: {
                        currentView: {
                            scale: 51439.16420267266,
                            x: -87.73025425093128,
                            y: 43.744459064634064
                        }
                    }
                },
                viewer: {
                    featureTooltipsEnabled: false
                } as IViewerReducerState
            }
        };
        this._store = configureStore(initState);
        this._initCommand = new MapGuideViewerInitCommand(this._store.dispatch);
        PROVIDER_IMPL.setMockMode(props.mgMockMode);
    }
    render() {
        return <MapProviderContext.Provider value={PROVIDER_IMPL}>
            <Provider store={this._store}>
                <App initCommand={this._initCommand}
                    mapguide={{
                        fusionRoot: ".",
                        agentUri: this._agentUri,
                        agentKind: this._agentKind,
                        initialElementVisibility: {
                            //Doesn't matter for the fake app, but this has to be true for the purpose of not breaking the reducer when no physical components are present
                            taskpane: true,
                            legend: true,
                            selection: true
                        }
                    }}
                    layout={this.props.templateLayout ?? "fake-app"}
                    resourceId="Library://Test/Viewer.ApplicationDefinition"
                    {...this.props} />
            </Provider>
        </MapProviderContext.Provider>;
    }
}