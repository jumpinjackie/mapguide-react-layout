
import { areNumbersEqual } from './number';
import { areArraysDifferent } from './array';
import { IMapView, LayerTransparencySet } from '../api/common';
import { RuntimeMap } from '../api/contracts/runtime-map';

/**
 * Determines if the given IMapView instances are equal or close to it
 *
 * @export
 * @param {(IMapView | undefined)} view
 * @param {(IMapView | undefined)} otherView
 * @returns {boolean}
 */
export function areViewsCloseToEqual(view: IMapView | undefined, otherView: IMapView | undefined): boolean {
    if (view && otherView) {
        const basePartsEqual = areNumbersEqual(view.x, otherView.x) &&
            areNumbersEqual(view.y, otherView.y) &&
            areNumbersEqual(view.scale, otherView.scale);
        if (view.resolution != null && otherView.resolution != null) {
            return basePartsEqual && areNumbersEqual(view.resolution, otherView.resolution);
        } else {
            if ((view.resolution == null && otherView.resolution != null) || (view.resolution != null && otherView.resolution == null)) {
                return false;
            } else {
                return basePartsEqual;
            }
        }
    } else {
        return false;
    }
}

/**
 * Indicates if the given runtime map instances are the same or have the same name
 *
 * @export
 * @param {RuntimeMap} map
 * @param {RuntimeMap} other
 * @returns {boolean}
 */
export function areMapsSame(map: RuntimeMap, other: RuntimeMap): boolean {
    if (map != other) {
        return map.Name == other.Name;
    }
    return true;
}

/**
 * Indicates if the given layer transparency sets are different
 * @param set 
 * @param other 
 */
export function layerTransparencyChanged(set: LayerTransparencySet | undefined, other: LayerTransparencySet | undefined): boolean {
    if ((!set && other) || (set && !other)) {
        return true;
    }
    const s = set ?? {};
    const o = other ?? {};
    const setLayers = Object.keys(s);
    const otherLayers = Object.keys(o);
    if (areArraysDifferent(setLayers, otherLayers))
        return true;

    for (const name of setLayers) {
        if (s[name] != o[name]) {
            return true;
        }
    }
    return false;
}