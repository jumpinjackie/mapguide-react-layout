export function getAssetPath(url: string | undefined): string | undefined {
    return url;
}

import { ICON_ZOOM_OUT_FIXED } from "../constants/assets";

//HACK: url-loader has done some breaking things to how our icon asset imports are handled
//while this has been addressed for the main bundle build, this import is still undefined in
//the context of our jest tests. Since nothing in our jest test suite cares that this value
//be set at the moment, just use ?. as a workaround ($DEITY bless TS 3.7 for this wonderful
//syntactic addition!)
let mRoot = ICON_ZOOM_OUT_FIXED?.replace("/zoom-out-fixed.png", "/../../");

export function getAssetRoot(): string {
    return mRoot;
}

/**
 * Sets the base path for all asset URLs
 *
 * @export
 * @param {string} root The base path to set
 * @browserapi MapGuide
 */
export function setAssetRoot(root: string): void {
    mRoot = root;
}

export function getRelativeIconPath(iconName: string): string {
    return `images/icons/${iconName}.png`;
}