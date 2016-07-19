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

class Client implements Request.IMapGuideClient {
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
    
    public getResource<T extends Contracts.Resource.ResourceBase>(resourceId: Contracts.Common.ResourceIdentifier): PromiseLike<T> {
        return this.builder.getResource<T>(resourceId);
    }
    
    public createRuntimeMap(options: Request.ICreateRuntimeMapOptions): PromiseLike<Contracts.RtMap.RuntimeMap> {
        return this.builder.createRuntimeMap(options);
    }

    public describeRuntimeMap(options: Request.IDescribeRuntimeMapOptions): PromiseLike<Contracts.RtMap.RuntimeMap> {
        return this.builder.describeRuntimeMap(options);
    }
    
    public queryMapFeatures(options: Request.IQueryMapFeaturesOptions): PromiseLike<Contracts.Query.QueryMapFeaturesResponse> {
        return this.builder.queryMapFeatures(options);
    }

    public getTileTemplateUrl(resourceId: string, groupName: string, xPlaceholder: string, yPlaceholder: string, zPlaceholder: string): string {
        return this.builder.getTileTemplateUrl(resourceId, groupName, xPlaceholder, yPlaceholder, zPlaceholder);
    }
}