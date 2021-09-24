import { ResourceBase } from "./common";

export interface MapDefinitionLayerCommon {
    Name: string;
    Visible: boolean;
    ShowInLegend: boolean;
    ExpandInLegend: boolean;
    LegendLabel: string;
    Group: string;
}

export interface MapDefinitionLayerGroup extends MapDefinitionLayerCommon {

}

export interface MapDefinitionLayer extends MapDefinitionLayerCommon {
    ResourceId: string;
    Selectable: boolean;
}

export interface TileSetSource {
    ResourceId: string;
}

export interface MapDefinition extends ResourceBase {
    CoordinateSystem: string;
    Extents: {
        MinX: number;
        MinY: number;
        MaxX: number;
        MaxY: number;
    },
    BackgroundColor: string;
    MapLayer: MapDefinitionLayer[];
    MapLayerGroup: MapDefinitionLayerGroup[];
    TileSetSource?: TileSetSource;
}