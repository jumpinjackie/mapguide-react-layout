import {
    InitError,
    IMapView,
    IModalDisplayOptions,
    IModalComponentDisplayOptions
} from "../api/common";
import { MapLayer } from "../api/contracts/runtime-map";
import { IInlineMenu, IFlyoutMenu, IComponentFlyoutItem } from "../components/toolbar";
import { ViewerAction } from '../actions/defs';

/**
 * Indicates if the given argument is an IModalDisplayOptions
 *
 * @export
 * @param {*} arg
 * @returns {arg is IModalDisplayOptions}
 */
export function isModalDisplayOptions(arg: any): arg is IModalDisplayOptions {
    return typeof(arg.url) != 'undefined';
}

/**
 * Indicates if the given argument is an IModalComponentDisplayOptions
 *
 * @export
 * @param {*} arg
 * @returns {arg is IModalComponentDisplayOptions}
 */
export function isModalComponentDisplayOptions(arg: any): arg is IModalComponentDisplayOptions {
    return typeof(arg.component) != 'undefined';
}

/**
 * Indicates if the given argument is an Error object
 *
 * @export
 * @param {*} err
 * @returns {err is Error}
 */
export function isError(err: any): err is Error {
    return err instanceof Error;
}

/**
 * Indicates if the given argument is an InitError object
 *
 * @export
 * @param {*} item
 * @returns {item is InitError}
 */
export function isInitError(item: any): item is InitError {
    return typeof (item.message) != 'undefined' && typeof (item.stack) != undefined;
}

/**
 * Indicates if the given arguemnt has the shape of an IFlyoutMenu
 *
 * @export
 * @param {*} item
 * @returns {item is IFlyoutMenu}
 */
export function isMenuRef(item: any): item is IFlyoutMenu {
    return typeof (item.flyoutId) != 'undefined';
}

/**
 * Indicates if the given argument has the shape of an IComponentFlyoutItem
 *
 * @export
 * @param {*} item
 * @returns {item is IComponentFlyoutItem}
 */
export function isComponentFlyout(item: any): item is IComponentFlyoutItem {
    return typeof (item.componentName) != 'undefined';
}

/**
 * Indicates if the given argument has the shape of an IInlineMenu
 *
 * @export
 * @param {*} item
 * @returns {item is IInlineMenu}
 */
export function isMenu(item: any): item is IInlineMenu {
    return typeof (item.childItems) != 'undefined';
}

/**
 * Indicates if the given argument is a MapLayer object
 *
 * @export
 * @param {*} layer
 * @returns {layer is MapLayer}
 */
export function isLayer(layer: any): layer is MapLayer {
    return layer.LayerDefinition !== undefined;
}

/**
 * Indicates if the given argument has the shape of an IMapView
 *
 * @export
 * @param {*} view
 * @returns {view is IMapView}
 */
export function isMapView(view: any): view is IMapView {
    return typeof (view.x) == 'number'
        && typeof (view.y) == 'number'
        && typeof (view.scale) == 'number';
}

/**
 * Indicates if the given argument is a coordinate pair
 *
 * @export
 * @param {*} coord
 * @returns {coord is [number, number]}
 */
export function isCoordinate(coord: any): coord is [number, number] {
    return coord instanceof Array
        && coord.length == 2
        && typeof (coord[0]) == 'number'
        && typeof (coord[1]) == 'number';
}

/**
 * Indicates if the given argument has the shape of a ViewerAction
 *
 * @export
 * @param {*} action
 * @returns {action is ViewerAction}
 */
export function isAction(action: any): action is ViewerAction {
    return typeof (action.type) != 'undefined'
        && typeof (action.payload) != 'undefined';
}