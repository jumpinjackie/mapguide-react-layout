import { InitError } from "../api/common";
import { MapLayer } from "../api/contracts/runtime-map";
import { IInlineMenu, IFlyoutMenu, IComponentFlyoutItem } from "../components/toolbar";

export function isError(err: any): err is Error {
    return err instanceof Error;
}

export function isInitError(item: any): item is InitError {
    return typeof(item.message) != 'undefined' && typeof(item.stack) != undefined;
}

export function isMenuRef(item: any): item is IFlyoutMenu {
    return typeof(item.flyoutId) != 'undefined';
}

export function isComponentFlyout(item: any): item is IComponentFlyoutItem {
    return typeof(item.componentName) != 'undefined';
}

export function isMenu(item: any): item is IInlineMenu {
    return typeof(item.childItems) != 'undefined'; 
}

export function isLayer(layer: any): layer is MapLayer {
    return layer.LayerDefinition !== undefined;
}