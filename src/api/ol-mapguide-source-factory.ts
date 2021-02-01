import { IMapGuideImageSource } from "./common";
//import { MapGuideImageSource } from "./ol-mapguide-source";
import olMapGuideSource from "ol/source/ImageMapGuide";
import { OLMapGuideImageSourceOptions } from './ol-types';

/**
 * @hidden
 */
export function isMapGuideImageSource(arg: any): arg is IMapGuideImageSource {
    return typeof(arg.updateParams) != 'undefined';
}

/**
 * @hidden
 */
export function createMapGuideSource(options: OLMapGuideImageSourceOptions): olMapGuideSource {
    //const ctor: any = MapGuideImageSource;
    //const source = new ctor(options);
    const source = new olMapGuideSource(options);
    return source;
}