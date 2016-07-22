import { MapLayer } from "../api/contracts/runtime-map";
import { IMenu } from "../components/toolbar";

export function isMenu(item: any): item is IMenu {
    return typeof(item.childItems) != 'undefined'; 
}

export function isLayer(layer: any): layer is MapLayer {
    return layer.LayerDefinition !== undefined;
}