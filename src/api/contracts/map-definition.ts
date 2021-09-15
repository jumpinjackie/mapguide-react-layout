import { ResourceBase } from "./common";

export interface MapLayerCommon {
    Name: string;
    Visible: boolean;
    ShowInLegend: boolean;
    ExpandInLegend: boolean;
    LegendLabel: string;
    Group: string;
}

export interface MapLayerGroup extends MapLayerCommon {

}

export interface MapLayer extends MapLayerCommon {
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
    MapLayer: MapLayer[];
    MapLayerGroup: MapLayerGroup[];
    TileSetSource?: TileSetSource;
}