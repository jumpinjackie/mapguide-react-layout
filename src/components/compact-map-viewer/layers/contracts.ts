import type { AttributionLike } from "ol/source/Source";

/**
 * Common layer component props
 * 
 * @since 0.15
 */
export type CommonLayerProps = {
    /**
     * The name of the ayer
     */
    name: string;
    /**
     * Controls whether the layer is hidden
     */
    isHidden?: boolean;
    /**
     * The extent of this layer
     */
    extent?: [number, number, number, number];
}

/**
 * Cluster settings for vector layers
 * 
 * @since 0.15
 */
export type ClusterSettings = {
    /**
     * Distance in pixels within which features will be clustered together.
     */
    distance: number;
    /**
     * Minimum distance in pixels between clusters. Will be capped at the configured distance. By default no minimum distance is guaranteed. This config can be used to avoid overlapping icons. As a tradoff, the cluster feature's position will no longer be the center of all its features.
     */
    minDistance?: number;
    /**
     * Optional attributions
     */
    attributions?: AttributionLike;
}