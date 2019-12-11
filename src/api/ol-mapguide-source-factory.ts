import { MapGuideImageSourceOptions, IMapGuideImageSource } from "./common";
//import { MapGuideImageSource } from "./ol-mapguide-source";
import olMapGuideSource from "ol/source/ImageMapGuide";

/**
 * @hidden
 */
export function isMapGuideImageSource(arg: any): arg is IMapGuideImageSource {
    return typeof(arg.updateParams) != 'undefined';
}

/**
 * @hidden
 */
export default function createMapGuideSource(options: MapGuideImageSourceOptions): olMapGuideSource {
    //const ctor: any = MapGuideImageSource;
    //const source = new ctor(options);
    const source = new olMapGuideSource(options);
    return source;
}