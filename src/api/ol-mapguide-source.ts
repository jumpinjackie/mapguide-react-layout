/**
 * ol-mapguide-source.ts
 * 
 * This is an emergency implementation of ol.source.ImageMapGuide as insurance should ol.source.ImageMapGuide
 * be pulled from OpenLayers in the future.
 * 
 * This is currently not the case, thus this entire module is not used
 */

import ImageSource from "ol/source/image";
import ol from "ol";
import olExtent from "ol/extent";
import olEvents from "ol/events";
import olImage from "ol/image";
import olUri from "ol/uri";
import olProjection from "ol/proj/projection";
import { MapGuideImageSourceOptions } from "./common";

// Inlining impl because ol.source.Image.defaultImageLoadFunction is not exported
function defaultImageLoadFunction(image: any, src: string) {
    image.getImage().src = src;
}

// Inlining impl because ol.extent.scaleFromCenter is not exported
/**
 * @param {ol.Extent} extent Extent.
 * @param {number} value Value.
 */
function scaleFromCenter(extent: ol.Extent, value: number) {
    const deltaX = ((extent[2] - extent[0]) / 2) * (value - 1);
    const deltaY = ((extent[3] - extent[1]) / 2) * (value - 1);
    extent[0] -= deltaX;
    extent[2] += deltaX;
    extent[1] -= deltaY;
    extent[3] += deltaY;
};

// NOTE: You may be asking ... Why is this not just a TypeScript class like 99% of the rest of the
// codebase? Simply put, I cannot verify the TS-generated class code (if I wrote MapGuideImageSource as such)
// is compatible with usage of ol.inherits

/**
 * Class constructor
 * 
 * @param options 
 */
export const MapGuideImageSource = function(options: MapGuideImageSourceOptions): void {
    ImageSource.call(this, {
        projection: options.projection,
        resolutions: options.resolutions
    });

    /**
     * @private
     * @type {?string}
     */
    this.crossOrigin_ = options.crossOrigin !== undefined ? options.crossOrigin : null;

    /**
     * @private
     * @type {number}
     */
    this.displayDpi_ = options.displayDpi !== undefined ? options.displayDpi : 96;

    /**
     * @private
     * @type {!Object}
     */
    this.params_ = options.params || {};

    /**
     * @private
     * @type {string|undefined}
     */
    this.url_ = options.url;

    /**
     * @private
     * @type {ol.ImageLoadFunctionType}
     */
    this.imageLoadFunction_ = options.imageLoadFunction !== undefined ? options.imageLoadFunction : defaultImageLoadFunction;

    /**
     * @private
     * @type {boolean}
     */
    this.hidpi_ = options.hidpi !== undefined ? options.hidpi : true;

    /**
     * @private
     * @type {number}
     */
    this.metersPerUnit_ = options.metersPerUnit !== undefined ? options.metersPerUnit : 1;

    /**
     * @private
     * @type {number}
     */
    this.ratio_ = options.ratio !== undefined ? options.ratio : 1;

    /**
     * @private
     * @type {boolean}
     */
    this.useOverlay_ = options.useOverlay !== undefined ? options.useOverlay : false;

    /**
     * @private
     * @type {ol.Image}
     */
    this.image_ = null;

    /**
     * @private
     * @type {number}
     */
    this.renderedRevision_ = 0;
}

ol.inherits(MapGuideImageSource, ImageSource);

/**
 * Get the user-provided params, i.e. those passed to the constructor through
 * the "params" option, and possibly updated using the updateParams method.
 * @return {Object} Params.
 * @api
 */
MapGuideImageSource.prototype.getParams = function () {
    return this.params_;
};


/**
 * @inheritDoc
 */
MapGuideImageSource.prototype.getImageInternal = function (extent: ol.Extent, resolution: number, pixelRatio: number, projection: olProjection) {
    resolution = this.findNearestResolution(resolution);
    pixelRatio = this.hidpi_ ? pixelRatio : 1;

    let image = this.image_;
    if (image &&
        this.renderedRevision_ == this.getRevision() &&
        image.getResolution() == resolution &&
        image.getPixelRatio() == pixelRatio &&
        olExtent.containsExtent(image.getExtent(), extent)) {
        return image;
    }

    if (this.ratio_ != 1) {
        extent = (extent as any).slice();
        scaleFromCenter(extent, this.ratio_);
    }
    const width = olExtent.getWidth(extent) / resolution;
    const height = olExtent.getHeight(extent) / resolution;
    const size = [width * pixelRatio, height * pixelRatio];

    if (this.url_ !== undefined) {
        const imageUrl = this.getUrl(this.url_, this.params_, extent, size, projection);
        image = new olImage(extent, resolution, pixelRatio, imageUrl, this.crossOrigin_, this.imageLoadFunction_);
        olEvents.listen(image, "change" /* ol.events.EventType.CHANGE */, this.handleImageChange, this);
    } else {
        image = null;
    }
    this.image_ = image;
    this.renderedRevision_ = this.getRevision();

    return image;
};


/**
 * Return the image load function of the source.
 * @return {ol.ImageLoadFunctionType} The image load function.
 * @api
 */
MapGuideImageSource.prototype.getImageLoadFunction = function () {
    return this.imageLoadFunction_;
};


/**
 * @param {ol.Extent} extent The map extents.
 * @param {ol.Size} size The viewport size.
 * @param {number} metersPerUnit The meters-per-unit value.
 * @param {number} dpi The display resolution.
 * @return {number} The computed map scale.
 */
function getScale(extent: ol.Extent, size: ol.Size, metersPerUnit: number, dpi: number) {
    const mcsW = olExtent.getWidth(extent);
    const mcsH = olExtent.getHeight(extent);
    const devW = size[0];
    const devH = size[1];
    const mpp = 0.0254 / dpi;
    if (devH * mcsW > devW * mcsH) {
        return mcsW * metersPerUnit / (devW * mpp); // width limited
    } else {
        return mcsH * metersPerUnit / (devH * mpp); // height limited
    }
};


/**
 * Update the user-provided params.
 * @param {Object} params Params.
 * @api
 */
MapGuideImageSource.prototype.updateParams = function (params: any) {
    this.params_ = { ...this.params_, ...params };
    this.changed();
};


/**
 * @param {string} baseUrl The mapagent url.
 * @param {Object.<string, string|number>} params Request parameters.
 * @param {ol.Extent} extent Extent.
 * @param {ol.Size} size Size.
 * @param {ol.proj.Projection} projection Projection.
 * @return {string} The mapagent map image request URL.
 */
MapGuideImageSource.prototype.getUrl = function (baseUrl: string, params: any, extent: ol.Extent, size: ol.Size, projection: olProjection) {
    const scale = getScale(extent, size, this.metersPerUnit_, this.displayDpi_);
    const center = olExtent.getCenter(extent);
    const baseParams = {
        ...{
            'OPERATION': this.useOverlay_ ? 'GETDYNAMICMAPOVERLAYIMAGE' : 'GETMAPIMAGE',
            'VERSION': '2.0.0',
            'LOCALE': 'en',
            'CLIENTAGENT': 'MapGuideImageSource source',
            'CLIP': '1',
            'SETDISPLAYDPI': this.displayDpi_,
            'SETDISPLAYWIDTH': Math.round(size[0]),
            'SETDISPLAYHEIGHT': Math.round(size[1]),
            'SETVIEWSCALE': scale,
            'SETVIEWCENTERX': center[0],
            'SETVIEWCENTERY': center[1]
        }, ...params
    };
    return olUri.appendParams(baseUrl, baseParams);
};


/**
 * Set the image load function of the MapGuide source.
 * @param {ol.ImageLoadFunctionType} imageLoadFunction Image load function.
 * @api
 */
MapGuideImageSource.prototype.setImageLoadFunction = function (imageLoadFunction: Function) {
    this.image_ = null;
    this.imageLoadFunction_ = imageLoadFunction;
    this.changed();
};