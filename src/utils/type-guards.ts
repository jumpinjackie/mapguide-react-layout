import { InitError, IMapView, ReduxAction } from "../api/common";
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

export function isMapView(view: any): view is IMapView {
    return typeof(view.x) == 'number'
        && typeof(view.y) == 'number'
        && typeof(view.scale) == 'number';
}

export function isCoordinate(coord: any): coord is [number, number] {
    return coord instanceof Array
        && coord.length == 2
        && typeof(coord[0]) == 'number'
        && typeof(coord[1]) == 'number';
}

export function isAction(action: any): action is ReduxAction {
    return typeof(action.type) != 'undefined'
        && typeof(action.payload) != 'undefined';
}