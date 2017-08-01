import * as logger from "./logger";
export function getAssetPath(url: string | undefined): string | undefined {
    return url;
}

import { ICON_ZOOM_OUT_FIXED } from "../constants/assets";

let mRoot = ICON_ZOOM_OUT_FIXED.replace("/zoom-out-fixed.png", "/../../");

export function getAssetRoot(): string {
    return mRoot;
}

export function setAssetRoot(root: string): void {
    mRoot = root;
}

export function getRelativeIconPath(iconName: string): string {
    return `images/icons/${iconName}.png`;
}