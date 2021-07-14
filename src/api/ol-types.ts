/** 
 * ol-types.ts
 * 
 * This module is a type "band-aid" module to reduce friction if/when we move
 * from @types/ol to typings officially bundled with a future release of OpenLayers
 * (whenever that time comes)
 */

import { Options as MGImageSourceOptions } from "ol/source/ImageMapGuide";
import Feature from "ol/Feature";
import Geometry from "ol/geom/Geometry";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import ImageSource from "ol/source/Image";
import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import TileSource from "ol/source/Tile";
import { Options as VectorLayerOptions } from "ol/layer/BaseVector";

export type OLFeature = Feature<Geometry>;
export type OLGeometryType = string;
export type OLMapGuideImageSourceOptions = MGImageSourceOptions;
export type OLVectorSource = VectorSource<Geometry>;
export type OLVectorLayer = VectorLayer<OLVectorSource>;
export type OLImageLayer = ImageLayer<ImageSource>;
export type OLTileLayer = TileLayer<TileSource>;
export type OLVectorLayerOptions = VectorLayerOptions<OLVectorSource>;