/**
 * common.ts
 * 
 * Common contracts and type aliases
 */

import type { Bounds } from "../common";

export type ResourceIdentifier = string;

export type Version = string;

export type Color = string;

export type MimeType = string;

export type FdoFilter = string;

export type Base64Content = string;

export interface ResourceBase {
    
}

/**
 * @since 0.14
 */
export interface SiteVersionResponse {
    Version: string;
}

/**
 * @since 0.14
 */
export interface ClientSelectionFeature {
    bounds?: Bounds;
    properties: any;
}

/**
 * @since 0.14
 */
export interface ClientSelectionLayer {
    name: string;
    features: ClientSelectionFeature[];
}

/**
 * @since 0.14
 */
export interface ClientSelectionSet {
    layers: ClientSelectionLayer[];
}