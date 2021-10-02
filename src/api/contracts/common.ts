/**
 * common.ts
 * 
 * Common contracts and type aliases
 */

import type { Bounds } from "../common";

/**
 * A MapGuide resource identifier
 */
export type ResourceIdentifier = string;

/**
 * A version string
 */
export type Version = string;

/**
 * A color string
 */
export type Color = string;

/**
 * A string that defines a MIME type
 */
export type MimeType = string;

/**
 * A string that defines a FDO filter
 */
export type FdoFilter = string;

/**
 * A string that defines base64 content
 */
export type Base64Content = string;

/**
 * Base interface for strongly-typed resources
 */
export interface ResourceBase {
    
}

/**
 * A site version response
 * 
 * @since 0.14
 */
export interface SiteVersionResponse {
    Version: string;
}

/**
 * Defines a client-side selected vector feature
 * 
 * @since 0.14
 */
export interface ClientSelectionFeature {
    /**
     * The bounds of this feature (for zooming into)
     */
    bounds?: Bounds;
    /**
     * The attributes of this feature
     */
    properties: any;
}

/**
 * Defines a layer of selected client-side vector features
 * 
 * @since 0.14
 */
export interface ClientSelectionLayer {
    /**
     * The name of the layer
     */
    name: string;
    /**
     * The selected features in this layer
     */
    features: ClientSelectionFeature[];
}

/**
 * A client-side vector feature selection set
 * 
 * @since 0.14
 */
export interface ClientSelectionSet {
    /**
     * The layers in this selection set
     */
    layers: ClientSelectionLayer[];
}