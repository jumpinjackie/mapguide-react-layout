/*

Originally copied from: https://github.com/Viglino/ol-ext/blob/master/src/legend/Legend.js

BSD 3-Clause License

Copyright (c) 2016-2021, Jean-Marc Viglino, IGN-France
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 */

import { DEVICE_PIXEL_RATIO as ol_has_DEVICE_PIXEL_RATIO } from 'ol/has';
import { toContext as ol_render_toContext } from 'ol/render';
import ol_Feature from 'ol/Feature';
import ol_render_Feature from 'ol/render/Feature';
import ol_geom_Point from 'ol/geom/Point';
import ol_geom_LineString from 'ol/geom/LineString';
import ol_geom_Polygon from 'ol/geom/Polygon';
import { extend as ol_extent_extend } from 'ol/extent';
import { Size2 } from '../../api/common';
import Style, { StyleFunction } from 'ol/style/Style';
import { OLFeature } from '../../api/ol-types';

export type olLegendItemOptions = {
    onload?: Function;
    margin?: number;
    size?: Size2;
    lineHeight?: number;
    style?: Style | Style[] | ((feat: ol_render_Feature | OLFeature) => (Style | Style[]));
    typeGeom?: any; //"Point" | "MultiPoint" | "LineString" | "MultiLineString" | "Polygon" | "MultiPolygon" | typeof ol_geom_Point | typeof ol_geom_LineString | typeof ol_geom_Polygon;
    feature?: OLFeature;
    properties?: { [x: string]: any };
};

const DEFAULT_SIZE = [16, 16];

/** Get a symbol image for a given legend item
 * @param {olLegendItemOptions} item 
 * @param {Canvas|undefined} canvas a canvas to draw in, if none creat one
 * @param {int|undefined} row row number to draw in canvas, default 0
 */
export function getLegendImage(item: olLegendItemOptions, canvas: HTMLCanvasElement | undefined = undefined, row: number | undefined = 0) {
    item = item || {};
    if (typeof (item.margin) === 'undefined') item.margin = 10;
    const size = item.size || DEFAULT_SIZE;
    item.onload = item.onload || function () {
        setTimeout(function () {
            getLegendImage(item, canvas, row);
        }, 100);
    };
    const width = size[0] + 2 * item.margin;
    const height = item.lineHeight || (size[1] + 2 * item.margin);
    const ratio = ol_has_DEVICE_PIXEL_RATIO;
    if (!canvas) {
        row = 0;
        canvas = document.createElement('canvas');
        canvas.width = width * ratio;
        canvas.height = height * ratio;
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.save();
        const vectorContext = ol_render_toContext(ctx, { pixelRatio: ratio });

        let typeGeom = item.typeGeom;
        let style: any;
        let feature = item.feature;
        if (!feature && typeGeom) {
            if (/Point/.test(typeGeom)) feature = new ol_Feature(new ol_geom_Point([0, 0]));
            else if (/LineString/.test(typeGeom)) feature = new ol_Feature(new ol_geom_LineString([0, 0]));
            else feature = new ol_Feature(new ol_geom_Polygon([[[0, 0]]]));
            if (item.properties) feature.setProperties(item.properties);
        }
        if (feature) {
            style = feature.getStyle();
            if (typeof (style) === 'function') style = style(feature);
            if (!style) {
                style = typeof (item.style) === 'function' ? item.style(feature) : item.style || [];
            }
            typeGeom = feature.getGeometry().getType();
        } else {
            style = [];
        }
        if (!(style instanceof Array)) style = [style];

        let cx = width / 2;
        let cy = height / 2;
        const sx = size[0] / 2;
        const sy = size[1] / 2;
        let i, s;
        // Get point offset
        if (typeGeom === 'Point') {
            let extent = null;
            for (i = 0; s = style[i]; i++) {
                const img = s.getImage();
                // Refresh legend on image load
                if (img) {
                    const imgElt = img.getImage();
                    // Check image is loaded
                    if (imgElt && imgElt.complete && !imgElt.naturalWidth) {
                        if (typeof (item.onload) === 'function') {
                            imgElt.addEventListener('load', function () {
                                setTimeout(function () {
                                    item.onload?.()
                                }, 100);
                            });
                        }
                        img.load();
                    }
                    // Check anchor to center the image
                    if (img.getAnchor) {
                        const anchor = img.getAnchor();
                        if (anchor) {
                            const si = img.getSize();
                            const dx = anchor[0] - si[0];
                            const dy = anchor[1] - si[1];
                            if (!extent) {
                                extent = [dx, dy, dx + si[0], dy + si[1]];
                            } else {
                                ol_extent_extend(extent, [dx, dy, dx + si[0], dy + si[1]]);
                            }
                        }
                    }
                }
            }
            if (extent) {
                cx = cx + (extent[2] + extent[0]) / 2;
                cy = cy + (extent[3] + extent[1]) / 2;
            }
        }

        // Draw image
        cy += (row * height) || 0;
        for (i = 0; s = style[i]; i++) {
            vectorContext.setStyle(s);
            switch (typeGeom) {
                case ol_geom_Point:
                case 'Point':
                case 'MultiPoint':
                    vectorContext.drawGeometry(new ol_geom_Point([cx, cy]));
                    break;
                case ol_geom_LineString:
                case 'LineString':
                case 'MultiLineString':
                    ctx.save();
                    ctx.rect(item.margin * ratio, 0, size[0] * ratio, canvas.height);
                    ctx.clip();
                    vectorContext.drawGeometry(new ol_geom_LineString([[cx - sx, cy], [cx + sx, cy]]));
                    ctx.restore();
                    break;
                case ol_geom_Polygon:
                case 'Polygon':
                case 'MultiPolygon':
                    vectorContext.drawGeometry(new ol_geom_Polygon([[[cx - sx, cy - sy], [cx + sx, cy - sy], [cx + sx, cy + sy], [cx - sx, cy + sy], [cx - sx, cy - sy]]]));
                    break;
            }
        }

        ctx.restore();
    }
    return canvas;
};