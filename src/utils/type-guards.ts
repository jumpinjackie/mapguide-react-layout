import { MapLayer } from "../api/contracts/runtime-map";

export function isLayer(layer: any): layer is MapLayer {
    return layer.LayerDefinition !== undefined;
}