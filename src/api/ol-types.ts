/** 
 * ol-types.ts
 * 
 * This module is a type "band-aid" module to reduce friction if/when we move
 * from @types/ol to typings officially bundled with a future release of OpenLayers
 * (whenever that time comes)
 */

import { Options as MGImageSourceOptions } from "ol/source/ImageMapGuide";
import GeometryType from 'ol/geom/GeometryType';

export type OLGeometryType = GeometryType;
export type OLMapGuideImageSourceOptions = MGImageSourceOptions;