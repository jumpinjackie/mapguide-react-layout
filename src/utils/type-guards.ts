import { MapLayer } from "../api/contracts/runtime-map";
import { IInlineMenu, IFlyoutMenu } from "../components/toolbar";

export function isMenuRef(item: any): item is IFlyoutMenu {
    return typeof(item.flyoutId) != 'undefined';
}

export function isMenu(item: any): item is IInlineMenu {
    return typeof(item.childItems) != 'undefined'; 
}

export function isLayer(layer: any): layer is MapLayer {
    return layer.LayerDefinition !== undefined;
}