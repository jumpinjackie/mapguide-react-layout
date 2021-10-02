import { RequestBuilder } from '../request-builder';
import { MgError } from '../error';
import { ClientKind } from '../common';
import { MapAgentRequestBuilder } from './mapagent';

/**
 * A factory method for creating request builders
 * 
 * @since 0.13
 */
export type RequestBuilderFactory = (agentUri: string, locale?: string) => RequestBuilder;

const _builders: { [kind: string]: RequestBuilderFactory } = {};

/**
 * Registers a factory for creating request builders for the given kind. This only needs to be called in the entry point of your custom viewer bundle.
 * 
 * @param kind 
 * @param factory 
 * @since 0.13
 */
export function registerRequestBuilder(kind: ClientKind, factory: RequestBuilderFactory): void {
    _builders[kind] = factory;
}

/**
 * Creates the request builder for the given kind
 * 
 * @param agentUri 
 * @param kind 
 * @since 0.13
 */
export function createRequestBuilder(agentUri: string, kind: ClientKind): RequestBuilder {
    if (_builders[kind]) {
        return _builders[kind](agentUri);
    }
    throw new MgError(`Unknown or unsupported client kind: ${kind}`);
}