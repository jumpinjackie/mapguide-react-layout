import * as Request from './request-builder';
import { MgError } from './error';
import { MapAgentRequestBuilder } from './builders/mapagent';
import * as Contracts from './contracts';

/**
 * The type of client
 */
export type ClientKind = "mapagent" | "mapguide-rest";

export class ClientContext {
    private agentUri: string;
    private kind: ClientKind;
    private client: Request.IMapGuideClient;
    constructor(agentUri: string, kind: ClientKind = "mapagent") {
        this.agentUri = agentUri;
        this.kind = kind;
        this.client = new Client(this.agentUri, kind);
    }
    public get agent(): Request.IMapGuideClient {
        return this.client;
    }
}

export class Client implements Request.IMapGuideClient {
    private builder: Request.RequestBuilder;
    constructor(agentUri: string, kind: ClientKind) {
        switch (kind) {
            case "mapagent":
                this.builder = new MapAgentRequestBuilder(agentUri);
                break;
            default:
                throw new MgError(`Unknown or unsupported client kind: ${kind}`);
        }
    }

    public get<T>(url: string): Promise<T> {
        const builder = this.builder;
        if (builder instanceof MapAgentRequestBuilder) {
            return builder.get<T>(url);
        }
        throw new MgError("Not supported");
    }

    public post<T>(url: string, data: any): Promise<T> {
        const builder = this.builder;
        if (builder instanceof MapAgentRequestBuilder) {
            return builder.post<T>(url, data);
        }
        throw new MgError("Not supported");
    }
    
    public getResource<T extends Contracts.Resource.ResourceBase>(resourceId: Contracts.Common.ResourceIdentifier): Request.IPromise<T> {
        return this.builder.getResource<T>(resourceId);
    }
    
    public createRuntimeMap(options: Request.ICreateRuntimeMapOptions): Request.IPromise<Contracts.RtMap.RuntimeMap> {
        return this.builder.createRuntimeMap(options);
    }

    public describeRuntimeMap(options: Request.IDescribeRuntimeMapOptions): Request.IPromise<Contracts.RtMap.RuntimeMap> {
        return this.builder.describeRuntimeMap(options);
    }
    
    public queryMapFeatures(options: Request.IQueryMapFeaturesOptions): Request.IPromise<Contracts.Query.QueryMapFeaturesResponse> {
        return this.builder.queryMapFeatures(options);
    }

    public getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string): string {
        return this.builder.getTileTemplateUrl(resourceId, groupName, xPlaceholder, yPlaceholder, zPlaceholder);
    }
}