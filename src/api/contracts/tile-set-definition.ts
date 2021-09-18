import { ResourceBase } from "./common";

/**
 * @since 0.14
 */
export interface BaseMapLayer {
    Name: string;
    ResourceId: string;
    Selectable: boolean;
    ShowInLegend: boolean;
    LegendLabel: string;
    ExpandInLegend: boolean;
}

/**
 * @since 0.14
 */
export interface BaseMapLayerGroup {
    Name: string;
    Visible: boolean;
    ShowInLegend: boolean;
    ExpandInLegend: boolean;
    LegendLabel: string;
    BaseMapLayer: BaseMapLayer[];
}

/**
 * @since 0.14
 */
export interface TileStoreParameters {
    TileProvider: string;
    Parameter: { Name: string, Value: string }[];
}

/**
 * @since 0.14
 */
export interface TileSetDefinition extends ResourceBase {
    Extents: {
        MinX: number;
        MinY: number;
        MaxX: number;
        MaxY: number;
    }
    TileStoreParameters: TileStoreParameters;
    BaseMapLayerGroup: BaseMapLayerGroup[];
}