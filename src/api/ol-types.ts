/** 
 * ol-types.ts
 * 
 * This module is a type "band-aid" module to reduce friction if/when we move
 * from @types/ol to typings officially bundled with a future release of OpenLayers
 * (whenever that time comes)
 */

import type { Options as MGImageSourceOptions } from "ol/source/ImageMapGuide";
import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import type VectorLayer from "ol/layer/Vector";
import type VectorSource from "ol/source/Vector";
import type ImageSource from "ol/source/Image";
import type ImageLayer from "ol/layer/Image";
import type TileLayer from "ol/layer/Tile";
import type TileSource from "ol/source/Tile";
import type { Options as VectorLayerOptions } from "ol/layer/BaseVector";
import Source from "ol/source/Source";
import Layer from "ol/layer/Layer";

export type OLLayer = Layer<Source, any>;
export type OLFeature = Feature<Geometry>;
export type OLGeometryType = string;
export type OLMapGuideImageSourceOptions = MGImageSourceOptions;
export type OLVectorSource = VectorSource<Geometry>;
export type OLVectorLayer = VectorLayer<OLVectorSource>;
export type OLImageLayer = ImageLayer<ImageSource>;
export type OLTileLayer = TileLayer<TileSource>;
export type OLVectorLayerOptions = VectorLayerOptions<OLVectorSource>;