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
