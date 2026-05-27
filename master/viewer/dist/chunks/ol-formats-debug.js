import { $n as createOrUpdateFromFlatCoordinates, At as memoizeOne, B as WORKER_OFFSCREEN_CANVAS, Bt as EventType_default, Er as init_objectSpread2, F as IMAGE_DECODE, Gt as abstract, Ht as listenOnce, In as squaredDistance, It as extend, Kt as getUid, Ln as squaredSegmentDistance, Mt as ascending, N as CREATE_IMAGE_BITMAP, Nn as lerp, Nt as binarySearch, On as compareVersions, Pn as modulo, Q as toSize, Qn as createOrUpdateFromCoordinate, Qt as equivalent, Rn as toFixed, St as BaseObject, Tr as _objectSpread2, Tt as Target, Ut as unlistenByKey, Vt as listen, Wn as closestSquaredDistanceXY, Yn as createEmpty, Zn as createOrUpdateEmpty, _r as returnOrUpdate, b as getSharedCanvasContext2D, et as intersectsLineString, gr as isEmpty, hn as Projection, it as forEach, jn as clamp, jt as toPromise, kn as padNumber, lr as getHeight, lt as compose, mn as isEmpty$1, nn as get$1, nt as intersectsLinearRingArray, ot as linearRingsContainsXY, pn as clear, qn as containsXY, rn as getTransform, rt as intersectsLinearRingMultiArray, sr as getCenter, st as linearRingssContainsXY, tr as extend$1, tt as intersectsLineStringArray, ut as create, v as createCanvasContext2D, wr as _asyncToGenerator, xt as assert, zn as toRadians } from "./geotiff-debug.js";
import { t as Pbf } from "./ol-deps-debug.js";
//#region node_modules/ol/geom/flat/transform.js
/**
* @module ol/geom/flat/transform
*/
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {import("../../transform.js").Transform} transform Transform.
* @param {Array<number>} [dest] Destination.
* @param {number} [destinationStride] Stride of destination coordinates; if unspecified, assumed to be 2.
* @return {Array<number>} Transformed coordinates.
*/
function transform2D(flatCoordinates, offset, end, stride, transform, dest, destinationStride) {
	dest = dest ? dest : [];
	destinationStride = destinationStride ? destinationStride : 2;
	let i = 0;
	for (let j = offset; j < end; j += stride) {
		const x = flatCoordinates[j];
		const y = flatCoordinates[j + 1];
		dest[i++] = transform[0] * x + transform[2] * y + transform[4];
		dest[i++] = transform[1] * x + transform[3] * y + transform[5];
		for (let k = 2; k < destinationStride; k++) dest[i++] = flatCoordinates[j + k];
	}
	if (dest && dest.length != i) dest.length = i;
	return dest;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {number} angle Angle.
* @param {Array<number>} anchor Rotation anchor point.
* @param {Array<number>} [dest] Destination.
* @return {Array<number>} Transformed coordinates.
*/
function rotate(flatCoordinates, offset, end, stride, angle, anchor, dest) {
	dest = dest ? dest : [];
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	const anchorX = anchor[0];
	const anchorY = anchor[1];
	let i = 0;
	for (let j = offset; j < end; j += stride) {
		const deltaX = flatCoordinates[j] - anchorX;
		const deltaY = flatCoordinates[j + 1] - anchorY;
		dest[i++] = anchorX + deltaX * cos - deltaY * sin;
		dest[i++] = anchorY + deltaX * sin + deltaY * cos;
		for (let k = j + 2; k < j + stride; ++k) dest[i++] = flatCoordinates[k];
	}
	if (dest && dest.length != i) dest.length = i;
	return dest;
}
/**
* Scale the coordinates.
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {number} sx Scale factor in the x-direction.
* @param {number} sy Scale factor in the y-direction.
* @param {Array<number>} anchor Scale anchor point.
* @param {Array<number>} [dest] Destination.
* @return {Array<number>} Transformed coordinates.
*/
function scale(flatCoordinates, offset, end, stride, sx, sy, anchor, dest) {
	dest = dest ? dest : [];
	const anchorX = anchor[0];
	const anchorY = anchor[1];
	let i = 0;
	for (let j = offset; j < end; j += stride) {
		const deltaX = flatCoordinates[j] - anchorX;
		const deltaY = flatCoordinates[j + 1] - anchorY;
		dest[i++] = anchorX + sx * deltaX;
		dest[i++] = anchorY + sy * deltaY;
		for (let k = j + 2; k < j + stride; ++k) dest[i++] = flatCoordinates[k];
	}
	if (dest && dest.length != i) dest.length = i;
	return dest;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {number} deltaX Delta X.
* @param {number} deltaY Delta Y.
* @param {Array<number>} [dest] Destination.
* @return {Array<number>} Transformed coordinates.
*/
function translate(flatCoordinates, offset, end, stride, deltaX, deltaY, dest) {
	dest = dest ? dest : [];
	let i = 0;
	for (let j = offset; j < end; j += stride) {
		dest[i++] = flatCoordinates[j] + deltaX;
		dest[i++] = flatCoordinates[j + 1] + deltaY;
		for (let k = j + 2; k < j + stride; ++k) dest[i++] = flatCoordinates[k];
	}
	if (dest && dest.length != i) dest.length = i;
	return dest;
}
//#endregion
//#region node_modules/ol/geom/Geometry.js
/**
* @module ol/geom/Geometry
*/
/**
* @typedef {'XY' | 'XYZ' | 'XYM' | 'XYZM'} GeometryLayout
* The coordinate layout for geometries, indicating whether a 3rd or 4th z ('Z')
* or measure ('M') coordinate is available.
*/
/**
* @typedef {'Point' | 'LineString' | 'LinearRing' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection' | 'Circle'} Type
* The geometry type.  One of `'Point'`, `'LineString'`, `'LinearRing'`,
* `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
* `'GeometryCollection'`, or `'Circle'`.
*/
/**
* @type {import("../transform.js").Transform}
*/
var tmpTransform$1 = create();
/** @type {import('../coordinate.js').Coordinate} */
var tmpPoint = [NaN, NaN];
/**
* @classdesc
* Abstract base class; normally only used for creating subclasses and not
* instantiated in apps.
* Base class for vector geometries.
*
* To get notified of changes to the geometry, register a listener for the
* generic `change` event on your geometry instance.
*
* @abstract
* @api
*/
var Geometry = class extends BaseObject {
	constructor() {
		super();
		/**
		* @private
		* @type {import("../extent.js").Extent}
		*/
		this.extent_ = createEmpty();
		/**
		* @private
		* @type {number}
		*/
		this.extentRevision_ = -1;
		/**
		* @protected
		* @type {number}
		*/
		this.simplifiedGeometryMaxMinSquaredTolerance = 0;
		/**
		* @protected
		* @type {number}
		*/
		this.simplifiedGeometryRevision = 0;
		/**
		* Get a transformed and simplified version of the geometry.
		* @abstract
		* @param {number} revision The geometry revision.
		* @param {number} squaredTolerance Squared tolerance.
		* @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
		* @return {Geometry} Simplified geometry.
		*/
		this.simplifyTransformedInternal = memoizeOne((revision, squaredTolerance, transform) => {
			if (!transform) return this.getSimplifiedGeometry(squaredTolerance);
			const clone = this.clone();
			clone.applyTransform(transform);
			return clone.getSimplifiedGeometry(squaredTolerance);
		});
	}
	/**
	* Get a transformed and simplified version of the geometry.
	* @abstract
	* @param {number} squaredTolerance Squared tolerance.
	* @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
	* @return {Geometry} Simplified geometry.
	*/
	simplifyTransformed(squaredTolerance, transform) {
		return this.simplifyTransformedInternal(this.getRevision(), squaredTolerance, transform);
	}
	/**
	* Make a complete copy of the geometry.
	* @abstract
	* @return {!Geometry} Clone.
	*/
	clone() {
		return abstract();
	}
	/**
	* @abstract
	* @param {number} x X.
	* @param {number} y Y.
	* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
	* @param {number} minSquaredDistance Minimum squared distance.
	* @return {number} Minimum squared distance.
	*/
	closestPointXY(x, y, closestPoint, minSquaredDistance) {
		return abstract();
	}
	/**
	* @param {number} x X.
	* @param {number} y Y.
	* @return {boolean} Contains (x, y).
	*/
	containsXY(x, y) {
		return this.closestPointXY(x, y, tmpPoint, Number.MIN_VALUE) === 0;
	}
	/**
	* Return the closest point of the geometry to the passed point as
	* {@link module:ol/coordinate~Coordinate coordinate}.
	* @param {import("../coordinate.js").Coordinate} point Point.
	* @param {import("../coordinate.js").Coordinate} [closestPoint] Closest point.
	* @return {import("../coordinate.js").Coordinate} Closest point.
	* @api
	*/
	getClosestPoint(point, closestPoint) {
		closestPoint = closestPoint ? closestPoint : [NaN, NaN];
		this.closestPointXY(point[0], point[1], closestPoint, Infinity);
		return closestPoint;
	}
	/**
	* Returns true if this geometry includes the specified coordinate. If the
	* coordinate is on the boundary of the geometry, returns false.
	* @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
	* @return {boolean} Contains coordinate.
	* @api
	*/
	intersectsCoordinate(coordinate) {
		return this.containsXY(coordinate[0], coordinate[1]);
	}
	/**
	* @abstract
	* @param {import("../extent.js").Extent} extent Extent.
	* @protected
	* @return {import("../extent.js").Extent} extent Extent.
	*/
	computeExtent(extent) {
		return abstract();
	}
	/**
	* Get the extent of the geometry.
	* @param {import("../extent.js").Extent} [extent] Extent.
	* @return {import("../extent.js").Extent} extent Extent.
	* @api
	*/
	getExtent(extent) {
		if (this.extentRevision_ != this.getRevision()) {
			const extent = this.computeExtent(this.extent_);
			if (isNaN(extent[0]) || isNaN(extent[1])) createOrUpdateEmpty(extent);
			this.extentRevision_ = this.getRevision();
		}
		return returnOrUpdate(this.extent_, extent);
	}
	/**
	* Rotate the geometry around a given coordinate. This modifies the geometry
	* coordinates in place.
	* @abstract
	* @param {number} angle Rotation angle in radians.
	* @param {import("../coordinate.js").Coordinate} anchor The rotation center.
	* @api
	*/
	rotate(angle, anchor) {
		abstract();
	}
	/**
	* Scale the geometry (with an optional origin).  This modifies the geometry
	* coordinates in place.
	* @abstract
	* @param {number} sx The scaling factor in the x-direction.
	* @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
	* @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
	*     of the geometry extent).
	* @api
	*/
	scale(sx, sy, anchor) {
		abstract();
	}
	/**
	* Create a simplified version of this geometry.  For linestrings, this uses
	* the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
	* algorithm.  For polygons, a quantization-based
	* simplification is used to preserve topology.
	* @param {number} tolerance The tolerance distance for simplification.
	* @return {Geometry} A new, simplified version of the original geometry.
	* @api
	*/
	simplify(tolerance) {
		return this.getSimplifiedGeometry(tolerance * tolerance);
	}
	/**
	* Create a simplified version of this geometry using the Douglas Peucker
	* algorithm.
	* See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
	* @abstract
	* @param {number} squaredTolerance Squared tolerance.
	* @return {Geometry} Simplified geometry.
	*/
	getSimplifiedGeometry(squaredTolerance) {
		return abstract();
	}
	/**
	* Get the type of this geometry.
	* @abstract
	* @return {Type} Geometry type.
	*/
	getType() {
		return abstract();
	}
	/**
	* Apply a transform function to the coordinates of the geometry.
	* The geometry is modified in place.
	* If you do not want the geometry modified in place, first `clone()` it and
	* then use this function on the clone.
	* @abstract
	* @param {import("../proj.js").TransformFunction} transformFn Transform function.
	* Called with a flat array of geometry coordinates.
	*/
	applyTransform(transformFn) {
		abstract();
	}
	/**
	* Test if the geometry and the passed extent intersect.
	* @abstract
	* @param {import("../extent.js").Extent} extent Extent.
	* @return {boolean} `true` if the geometry and the extent intersect.
	*/
	intersectsExtent(extent) {
		return abstract();
	}
	/**
	* Translate the geometry.  This modifies the geometry coordinates in place.  If
	* instead you want a new geometry, first `clone()` this geometry.
	* @abstract
	* @param {number} deltaX Delta X.
	* @param {number} deltaY Delta Y.
	* @api
	*/
	translate(deltaX, deltaY) {
		abstract();
	}
	/**
	* Transform each coordinate of the geometry from one coordinate reference
	* system to another. The geometry is modified in place.
	* For example, a line will be transformed to a line and a circle to a circle.
	* If you do not want the geometry modified in place, first `clone()` it and
	* then use this function on the clone.
	*
	* @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
	*     string identifier or a {@link module:ol/proj/Projection~Projection} object.
	* @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
	*     string identifier or a {@link module:ol/proj/Projection~Projection} object.
	* @return {this} This geometry.  Note that original geometry is
	*     modified in place.
	* @api
	*/
	transform(source, destination) {
		/** @type {import("../proj/Projection.js").default} */
		const sourceProj = get$1(source);
		const transformFn = sourceProj.getUnits() == "tile-pixels" ? function(inCoordinates, outCoordinates, stride) {
			const pixelExtent = sourceProj.getExtent();
			const projectedExtent = sourceProj.getWorldExtent();
			const scale = getHeight(projectedExtent) / getHeight(pixelExtent);
			compose(tmpTransform$1, projectedExtent[0], projectedExtent[3], scale, -scale, 0, 0, 0);
			const transformed = transform2D(inCoordinates, 0, inCoordinates.length, stride, tmpTransform$1, outCoordinates);
			const projTransform = getTransform(sourceProj, destination);
			if (projTransform) return projTransform(transformed, transformed, stride);
			return transformed;
		} : getTransform(sourceProj, destination);
		this.applyTransform(transformFn);
		return this;
	}
};
//#endregion
//#region node_modules/ol/geom/SimpleGeometry.js
/**
* @module ol/geom/SimpleGeometry
*/
/**
* @classdesc
* Abstract base class; only used for creating subclasses; do not instantiate
* in apps, as cannot be rendered.
*
* @abstract
* @api
*/
var SimpleGeometry = class extends Geometry {
	constructor() {
		super();
		/**
		* @protected
		* @type {import("./Geometry.js").GeometryLayout}
		*/
		this.layout = "XY";
		/**
		* @protected
		* @type {number}
		*/
		this.stride = 2;
		/**
		* @protected
		* @type {Array<number>}
		*/
		this.flatCoordinates;
	}
	/**
	* @param {import("../extent.js").Extent} extent Extent.
	* @protected
	* @return {import("../extent.js").Extent} extent Extent.
	* @override
	*/
	computeExtent(extent) {
		return createOrUpdateFromFlatCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
	}
	/**
	* @abstract
	* @return {Array<*> | null} Coordinates.
	*/
	getCoordinates() {
		return abstract();
	}
	/**
	* Return the first coordinate of the geometry.
	* @return {import("../coordinate.js").Coordinate} First coordinate.
	* @api
	*/
	getFirstCoordinate() {
		return this.flatCoordinates.slice(0, this.stride);
	}
	/**
	* @return {Array<number>} Flat coordinates.
	*/
	getFlatCoordinates() {
		return this.flatCoordinates;
	}
	/**
	* Return the last coordinate of the geometry.
	* @return {import("../coordinate.js").Coordinate} Last point.
	* @api
	*/
	getLastCoordinate() {
		return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
	}
	/**
	* Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
	* @return {import("./Geometry.js").GeometryLayout} Layout.
	* @api
	*/
	getLayout() {
		return this.layout;
	}
	/**
	* Create a simplified version of this geometry using the Douglas Peucker algorithm.
	* @param {number} squaredTolerance Squared tolerance.
	* @return {SimpleGeometry} Simplified geometry.
	* @override
	*/
	getSimplifiedGeometry(squaredTolerance) {
		if (this.simplifiedGeometryRevision !== this.getRevision()) {
			this.simplifiedGeometryMaxMinSquaredTolerance = 0;
			this.simplifiedGeometryRevision = this.getRevision();
		}
		if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) return this;
		const simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
		if (simplifiedGeometry.getFlatCoordinates().length < this.flatCoordinates.length) return simplifiedGeometry;
		this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
		return this;
	}
	/**
	* @param {number} squaredTolerance Squared tolerance.
	* @return {SimpleGeometry} Simplified geometry.
	* @protected
	*/
	getSimplifiedGeometryInternal(squaredTolerance) {
		return this;
	}
	/**
	* @return {number} Stride.
	*/
	getStride() {
		return this.stride;
	}
	/**
	* @param {import("./Geometry.js").GeometryLayout} layout Layout.
	* @param {Array<number>} flatCoordinates Flat coordinates.
	*/
	setFlatCoordinates(layout, flatCoordinates) {
		this.stride = getStrideForLayout(layout);
		this.layout = layout;
		this.flatCoordinates = flatCoordinates;
	}
	/**
	* @abstract
	* @param {!Array<*>} coordinates Coordinates.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	*/
	setCoordinates(coordinates, layout) {
		abstract();
	}
	/**
	* @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
	* @param {Array<*>} coordinates Coordinates.
	* @param {number} nesting Nesting.
	* @protected
	*/
	setLayout(layout, coordinates, nesting) {
		let stride;
		if (layout) stride = getStrideForLayout(layout);
		else {
			for (let i = 0; i < nesting; ++i) {
				if (coordinates.length === 0) {
					this.layout = "XY";
					this.stride = 2;
					return;
				}
				coordinates = coordinates[0];
			}
			stride = coordinates.length;
			layout = getLayoutForStride(stride);
		}
		this.layout = layout;
		this.stride = stride;
	}
	/**
	* Apply a transform function to the coordinates of the geometry.
	* The geometry is modified in place.
	* If you do not want the geometry modified in place, first `clone()` it and
	* then use this function on the clone.
	* @param {import("../proj.js").TransformFunction} transformFn Transform function.
	* Called with a flat array of geometry coordinates.
	* @api
	* @override
	*/
	applyTransform(transformFn) {
		if (this.flatCoordinates) {
			transformFn(this.flatCoordinates, this.flatCoordinates, this.layout.startsWith("XYZ") ? 3 : 2, this.stride);
			this.changed();
		}
	}
	/**
	* Rotate the geometry around a given coordinate. This modifies the geometry
	* coordinates in place.
	* @param {number} angle Rotation angle in counter-clockwise radians.
	* @param {import("../coordinate.js").Coordinate} anchor The rotation center.
	* @api
	* @override
	*/
	rotate(angle, anchor) {
		const flatCoordinates = this.getFlatCoordinates();
		if (flatCoordinates) {
			const stride = this.getStride();
			rotate(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
			this.changed();
		}
	}
	/**
	* Scale the geometry (with an optional origin).  This modifies the geometry
	* coordinates in place.
	* @param {number} sx The scaling factor in the x-direction.
	* @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
	* @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
	*     of the geometry extent).
	* @api
	* @override
	*/
	scale(sx, sy, anchor) {
		if (sy === void 0) sy = sx;
		if (!anchor) anchor = getCenter(this.getExtent());
		const flatCoordinates = this.getFlatCoordinates();
		if (flatCoordinates) {
			const stride = this.getStride();
			scale(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
			this.changed();
		}
	}
	/**
	* Translate the geometry.  This modifies the geometry coordinates in place.  If
	* instead you want a new geometry, first `clone()` this geometry.
	* @param {number} deltaX Delta X.
	* @param {number} deltaY Delta Y.
	* @api
	* @override
	*/
	translate(deltaX, deltaY) {
		const flatCoordinates = this.getFlatCoordinates();
		if (flatCoordinates) {
			const stride = this.getStride();
			translate(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
			this.changed();
		}
	}
};
/**
* @param {number} stride Stride.
* @return {import("./Geometry.js").GeometryLayout} layout Layout.
*/
function getLayoutForStride(stride) {
	let layout;
	if (stride == 2) layout = "XY";
	else if (stride == 3) layout = "XYZ";
	else if (stride == 4) layout = "XYZM";
	return layout;
}
/**
* @param {import("./Geometry.js").GeometryLayout} layout Layout.
* @return {number} Stride.
*/
function getStrideForLayout(layout) {
	let stride;
	if (layout == "XY") stride = 2;
	else if (layout == "XYZ" || layout == "XYM") stride = 3;
	else if (layout == "XYZM") stride = 4;
	return stride;
}
/**
* @param {SimpleGeometry} simpleGeometry Simple geometry.
* @param {import("../transform.js").Transform} transform Transform.
* @param {Array<number>} [dest] Destination.
* @return {Array<number>} Transformed flat coordinates.
*/
function transformGeom2D(simpleGeometry, transform, dest) {
	const flatCoordinates = simpleGeometry.getFlatCoordinates();
	if (!flatCoordinates) return null;
	const stride = simpleGeometry.getStride();
	return transform2D(flatCoordinates, 0, flatCoordinates.length, stride, transform, dest);
}
//#endregion
//#region node_modules/ol/geom/flat/deflate.js
/**
* @module ol/geom/flat/deflate
*/
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
* @param {number} stride Stride.
* @return {number} offset Offset.
*/
function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
	for (let i = 0, ii = coordinate.length; i < ii; ++i) flatCoordinates[offset++] = coordinate[i];
	return offset;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<import("../../coordinate.js").Coordinate>} coordinates Coordinates.
* @param {number} stride Stride.
* @return {number} offset Offset.
*/
function deflateCoordinates(flatCoordinates, offset, coordinates, stride) {
	for (let i = 0, ii = coordinates.length; i < ii; ++i) {
		const coordinate = coordinates[i];
		for (let j = 0; j < stride; ++j) flatCoordinates[offset++] = coordinate[j];
	}
	return offset;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<import("../../coordinate.js").Coordinate>>} coordinatess Coordinatess.
* @param {number} stride Stride.
* @param {Array<number>} [ends] Ends.
* @return {Array<number>} Ends.
*/
function deflateCoordinatesArray(flatCoordinates, offset, coordinatess, stride, ends) {
	ends = ends ? ends : [];
	let i = 0;
	for (let j = 0, jj = coordinatess.length; j < jj; ++j) {
		const end = deflateCoordinates(flatCoordinates, offset, coordinatess[j], stride);
		ends[i++] = end;
		offset = end;
	}
	ends.length = i;
	return ends;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} coordinatesss Coordinatesss.
* @param {number} stride Stride.
* @param {Array<Array<number>>} [endss] Endss.
* @return {Array<Array<number>>} Endss.
*/
function deflateMultiCoordinatesArray(flatCoordinates, offset, coordinatesss, stride, endss) {
	endss = endss ? endss : [];
	let i = 0;
	for (let j = 0, jj = coordinatesss.length; j < jj; ++j) {
		const ends = deflateCoordinatesArray(flatCoordinates, offset, coordinatesss[j], stride, endss[i]);
		if (ends.length === 0) ends[0] = offset;
		endss[i++] = ends;
		offset = ends[ends.length - 1];
	}
	endss.length = i;
	return endss;
}
//#endregion
//#region node_modules/ol/geom/Point.js
/**
* @module ol/geom/Point
*/
/**
* @classdesc
* Point geometry.
*
* @api
*/
var Point = class Point extends SimpleGeometry {
	/**
	* @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	*/
	constructor(coordinates, layout) {
		super();
		this.setCoordinates(coordinates, layout);
	}
	/**
	* Make a complete copy of the geometry.
	* @return {!Point} Clone.
	* @api
	* @override
	*/
	clone() {
		const point = new Point(this.flatCoordinates.slice(), this.layout);
		point.applyProperties(this);
		return point;
	}
	/**
	* @param {number} x X.
	* @param {number} y Y.
	* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
	* @param {number} minSquaredDistance Minimum squared distance.
	* @return {number} Minimum squared distance.
	* @override
	*/
	closestPointXY(x, y, closestPoint, minSquaredDistance) {
		const flatCoordinates = this.flatCoordinates;
		const squaredDistance$3 = squaredDistance(x, y, flatCoordinates[0], flatCoordinates[1]);
		if (squaredDistance$3 < minSquaredDistance) {
			const stride = this.stride;
			for (let i = 0; i < stride; ++i) closestPoint[i] = flatCoordinates[i];
			closestPoint.length = stride;
			return squaredDistance$3;
		}
		return minSquaredDistance;
	}
	/**
	* Return the coordinate of the point.
	* @return {import("../coordinate.js").Coordinate} Coordinates.
	* @api
	* @override
	*/
	getCoordinates() {
		return this.flatCoordinates.slice();
	}
	/**
	* @param {import("../extent.js").Extent} extent Extent.
	* @protected
	* @return {import("../extent.js").Extent} extent Extent.
	* @override
	*/
	computeExtent(extent) {
		return createOrUpdateFromCoordinate(this.flatCoordinates, extent);
	}
	/**
	* Get the type of this geometry.
	* @return {import("./Geometry.js").Type} Geometry type.
	* @api
	* @override
	*/
	getType() {
		return "Point";
	}
	/**
	* Test if the geometry and the passed extent intersect.
	* @param {import("../extent.js").Extent} extent Extent.
	* @return {boolean} `true` if the geometry and the extent intersect.
	* @api
	* @override
	*/
	intersectsExtent(extent) {
		return containsXY(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
	}
	/**
	* @param {!Array<*>} coordinates Coordinates.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	* @api
	* @override
	*/
	setCoordinates(coordinates, layout) {
		this.setLayout(layout, coordinates, 0);
		if (!this.flatCoordinates) this.flatCoordinates = [];
		this.flatCoordinates.length = deflateCoordinate(this.flatCoordinates, 0, coordinates, this.stride);
		this.changed();
	}
};
//#endregion
//#region node_modules/ol/geom/flat/closest.js
/**
* @module ol/geom/flat/closest
*/
/**
* Returns the point on the 2D line segment flatCoordinates[offset1] to
* flatCoordinates[offset2] that is closest to the point (x, y).  Extra
* dimensions are linearly interpolated.
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset1 Offset 1.
* @param {number} offset2 Offset 2.
* @param {number} stride Stride.
* @param {number} x X.
* @param {number} y Y.
* @param {Array<number>} closestPoint Closest point.
*/
function assignClosest(flatCoordinates, offset1, offset2, stride, x, y, closestPoint) {
	const x1 = flatCoordinates[offset1];
	const y1 = flatCoordinates[offset1 + 1];
	const dx = flatCoordinates[offset2] - x1;
	const dy = flatCoordinates[offset2 + 1] - y1;
	let offset;
	if (dx === 0 && dy === 0) offset = offset1;
	else {
		const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
		if (t > 1) offset = offset2;
		else if (t > 0) {
			for (let i = 0; i < stride; ++i) closestPoint[i] = lerp(flatCoordinates[offset1 + i], flatCoordinates[offset2 + i], t);
			closestPoint.length = stride;
			return;
		} else offset = offset1;
	}
	for (let i = 0; i < stride; ++i) closestPoint[i] = flatCoordinates[offset + i];
	closestPoint.length = stride;
}
/**
* Return the squared of the largest distance between any pair of consecutive
* coordinates.
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {number} max Max squared delta.
* @return {number} Max squared delta.
*/
function maxSquaredDelta(flatCoordinates, offset, end, stride, max) {
	let x1 = flatCoordinates[offset];
	let y1 = flatCoordinates[offset + 1];
	for (offset += stride; offset < end; offset += stride) {
		const x2 = flatCoordinates[offset];
		const y2 = flatCoordinates[offset + 1];
		const squaredDelta = squaredDistance(x1, y1, x2, y2);
		if (squaredDelta > max) max = squaredDelta;
		x1 = x2;
		y1 = y2;
	}
	return max;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Ends.
* @param {number} stride Stride.
* @param {number} max Max squared delta.
* @return {number} Max squared delta.
*/
function arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max) {
	for (let i = 0, ii = ends.length; i < ii; ++i) {
		const end = ends[i];
		max = maxSquaredDelta(flatCoordinates, offset, end, stride, max);
		offset = end;
	}
	return max;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<number>>} endss Endss.
* @param {number} stride Stride.
* @param {number} max Max squared delta.
* @return {number} Max squared delta.
*/
function multiArrayMaxSquaredDelta(flatCoordinates, offset, endss, stride, max) {
	for (let i = 0, ii = endss.length; i < ii; ++i) {
		const ends = endss[i];
		max = arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max);
		offset = ends[ends.length - 1];
	}
	return max;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {number} maxDelta Max delta.
* @param {boolean} isRing Is ring.
* @param {number} x X.
* @param {number} y Y.
* @param {Array<number>} closestPoint Closest point.
* @param {number} minSquaredDistance Minimum squared distance.
* @param {Array<number>} [tmpPoint] Temporary point object.
* @return {number} Minimum squared distance.
*/
function assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint) {
	if (offset == end) return minSquaredDistance;
	let i, squaredDistance$2;
	if (maxDelta === 0) {
		squaredDistance$2 = squaredDistance(x, y, flatCoordinates[offset], flatCoordinates[offset + 1]);
		if (squaredDistance$2 < minSquaredDistance) {
			for (i = 0; i < stride; ++i) closestPoint[i] = flatCoordinates[offset + i];
			closestPoint.length = stride;
			return squaredDistance$2;
		}
		return minSquaredDistance;
	}
	tmpPoint = tmpPoint ? tmpPoint : [NaN, NaN];
	let index = offset + stride;
	while (index < end) {
		assignClosest(flatCoordinates, index - stride, index, stride, x, y, tmpPoint);
		squaredDistance$2 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
		if (squaredDistance$2 < minSquaredDistance) {
			minSquaredDistance = squaredDistance$2;
			for (i = 0; i < stride; ++i) closestPoint[i] = tmpPoint[i];
			closestPoint.length = stride;
			index += stride;
		} else index += stride * Math.max((Math.sqrt(squaredDistance$2) - Math.sqrt(minSquaredDistance)) / maxDelta | 0, 1);
	}
	if (isRing) {
		assignClosest(flatCoordinates, end - stride, offset, stride, x, y, tmpPoint);
		squaredDistance$2 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
		if (squaredDistance$2 < minSquaredDistance) {
			minSquaredDistance = squaredDistance$2;
			for (i = 0; i < stride; ++i) closestPoint[i] = tmpPoint[i];
			closestPoint.length = stride;
		}
	}
	return minSquaredDistance;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Ends.
* @param {number} stride Stride.
* @param {number} maxDelta Max delta.
* @param {boolean} isRing Is ring.
* @param {number} x X.
* @param {number} y Y.
* @param {Array<number>} closestPoint Closest point.
* @param {number} minSquaredDistance Minimum squared distance.
* @param {Array<number>} [tmpPoint] Temporary point object.
* @return {number} Minimum squared distance.
*/
function assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint) {
	tmpPoint = tmpPoint ? tmpPoint : [NaN, NaN];
	for (let i = 0, ii = ends.length; i < ii; ++i) {
		const end = ends[i];
		minSquaredDistance = assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
		offset = end;
	}
	return minSquaredDistance;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<number>>} endss Endss.
* @param {number} stride Stride.
* @param {number} maxDelta Max delta.
* @param {boolean} isRing Is ring.
* @param {number} x X.
* @param {number} y Y.
* @param {Array<number>} closestPoint Closest point.
* @param {number} minSquaredDistance Minimum squared distance.
* @param {Array<number>} [tmpPoint] Temporary point object.
* @return {number} Minimum squared distance.
*/
function assignClosestMultiArrayPoint(flatCoordinates, offset, endss, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint) {
	tmpPoint = tmpPoint ? tmpPoint : [NaN, NaN];
	for (let i = 0, ii = endss.length; i < ii; ++i) {
		const ends = endss[i];
		minSquaredDistance = assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
		offset = ends[ends.length - 1];
	}
	return minSquaredDistance;
}
//#endregion
//#region node_modules/ol/geom/flat/inflate.js
/**
* @module ol/geom/flat/inflate
*/
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {Array<import("../../coordinate.js").Coordinate>} [coordinates] Coordinates.
* @return {Array<import("../../coordinate.js").Coordinate>} Coordinates.
*/
function inflateCoordinates(flatCoordinates, offset, end, stride, coordinates) {
	coordinates = coordinates !== void 0 ? coordinates : [];
	let i = 0;
	for (let j = offset; j < end; j += stride) coordinates[i++] = flatCoordinates.slice(j, j + stride);
	coordinates.length = i;
	return coordinates;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Ends.
* @param {number} stride Stride.
* @param {Array<Array<import("../../coordinate.js").Coordinate>>} [coordinatess] Coordinatess.
* @return {Array<Array<import("../../coordinate.js").Coordinate>>} Coordinatess.
*/
function inflateCoordinatesArray(flatCoordinates, offset, ends, stride, coordinatess) {
	coordinatess = coordinatess !== void 0 ? coordinatess : [];
	let i = 0;
	for (let j = 0, jj = ends.length; j < jj; ++j) {
		const end = ends[j];
		coordinatess[i++] = inflateCoordinates(flatCoordinates, offset, end, stride, coordinatess[i]);
		offset = end;
	}
	coordinatess.length = i;
	return coordinatess;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<number>>} endss Endss.
* @param {number} stride Stride.
* @param {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} [coordinatesss]
*     Coordinatesss.
* @return {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} Coordinatesss.
*/
function inflateMultiCoordinatesArray(flatCoordinates, offset, endss, stride, coordinatesss) {
	coordinatesss = coordinatesss !== void 0 ? coordinatesss : [];
	let i = 0;
	for (let j = 0, jj = endss.length; j < jj; ++j) {
		const ends = endss[j];
		coordinatesss[i++] = ends.length === 1 && ends[0] === offset ? [] : inflateCoordinatesArray(flatCoordinates, offset, ends, stride, coordinatesss[i]);
		offset = ends[ends.length - 1];
	}
	coordinatesss.length = i;
	return coordinatesss;
}
//#endregion
//#region node_modules/ol/geom/flat/interpolate.js
/**
* @module ol/geom/flat/interpolate
*/
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {number} fraction Fraction.
* @param {Array<number>} [dest] Destination.
* @param {number} [dimension] Destination dimension (default is `2`)
* @return {Array<number>} Destination.
*/
function interpolatePoint(flatCoordinates, offset, end, stride, fraction, dest, dimension) {
	let o, t;
	const n = (end - offset) / stride;
	if (n === 1) o = offset;
	else if (n === 2) {
		o = offset;
		t = fraction;
	} else if (n !== 0) {
		let x1 = flatCoordinates[offset];
		let y1 = flatCoordinates[offset + 1];
		let length = 0;
		const cumulativeLengths = [0];
		for (let i = offset + stride; i < end; i += stride) {
			const x2 = flatCoordinates[i];
			const y2 = flatCoordinates[i + 1];
			length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
			cumulativeLengths.push(length);
			x1 = x2;
			y1 = y2;
		}
		const target = fraction * length;
		const index = binarySearch(cumulativeLengths, target);
		if (index < 0) {
			t = (target - cumulativeLengths[-index - 2]) / (cumulativeLengths[-index - 1] - cumulativeLengths[-index - 2]);
			o = offset + (-index - 2) * stride;
		} else o = offset + index * stride;
	}
	dimension = dimension > 1 ? dimension : 2;
	dest = dest ? dest : new Array(dimension);
	for (let i = 0; i < dimension; ++i) dest[i] = o === void 0 ? NaN : t === void 0 ? flatCoordinates[o + i] : lerp(flatCoordinates[o + i], flatCoordinates[o + stride + i], t);
	return dest;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {number} m M.
* @param {boolean} extrapolate Extrapolate.
* @return {import("../../coordinate.js").Coordinate|null} Coordinate.
*/
function lineStringCoordinateAtM(flatCoordinates, offset, end, stride, m, extrapolate) {
	if (end == offset) return null;
	let coordinate;
	if (m < flatCoordinates[offset + stride - 1]) {
		if (extrapolate) {
			coordinate = flatCoordinates.slice(offset, offset + stride);
			coordinate[stride - 1] = m;
			return coordinate;
		}
		return null;
	}
	if (flatCoordinates[end - 1] < m) {
		if (extrapolate) {
			coordinate = flatCoordinates.slice(end - stride, end);
			coordinate[stride - 1] = m;
			return coordinate;
		}
		return null;
	}
	if (m == flatCoordinates[offset + stride - 1]) return flatCoordinates.slice(offset, offset + stride);
	let lo = offset / stride;
	let hi = end / stride;
	while (lo < hi) {
		const mid = lo + hi >> 1;
		if (m < flatCoordinates[(mid + 1) * stride - 1]) hi = mid;
		else lo = mid + 1;
	}
	const m0 = flatCoordinates[lo * stride - 1];
	if (m == m0) return flatCoordinates.slice((lo - 1) * stride, (lo - 1) * stride + stride);
	const m1 = flatCoordinates[(lo + 1) * stride - 1];
	const t = (m - m0) / (m1 - m0);
	coordinate = [];
	for (let i = 0; i < stride - 1; ++i) coordinate.push(lerp(flatCoordinates[(lo - 1) * stride + i], flatCoordinates[lo * stride + i], t));
	coordinate.push(m);
	return coordinate;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Ends.
* @param {number} stride Stride.
* @param {number} m M.
* @param {boolean} extrapolate Extrapolate.
* @param {boolean} interpolate Interpolate.
* @return {import("../../coordinate.js").Coordinate|null} Coordinate.
*/
function lineStringsCoordinateAtM(flatCoordinates, offset, ends, stride, m, extrapolate, interpolate) {
	if (interpolate) return lineStringCoordinateAtM(flatCoordinates, offset, ends[ends.length - 1], stride, m, extrapolate);
	let coordinate;
	if (m < flatCoordinates[stride - 1]) {
		if (extrapolate) {
			coordinate = flatCoordinates.slice(0, stride);
			coordinate[stride - 1] = m;
			return coordinate;
		}
		return null;
	}
	if (flatCoordinates[flatCoordinates.length - 1] < m) {
		if (extrapolate) {
			coordinate = flatCoordinates.slice(flatCoordinates.length - stride);
			coordinate[stride - 1] = m;
			return coordinate;
		}
		return null;
	}
	for (let i = 0, ii = ends.length; i < ii; ++i) {
		const end = ends[i];
		if (offset == end) continue;
		if (m < flatCoordinates[offset + stride - 1]) return null;
		if (m <= flatCoordinates[end - 1]) return lineStringCoordinateAtM(flatCoordinates, offset, end, stride, m, false);
		offset = end;
	}
	return null;
}
//#endregion
//#region node_modules/ol/geom/flat/length.js
/**
* @module ol/geom/flat/length
*/
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @return {number} Length.
*/
function lineStringLength(flatCoordinates, offset, end, stride) {
	let x1 = flatCoordinates[offset];
	let y1 = flatCoordinates[offset + 1];
	let length = 0;
	for (let i = offset + stride; i < end; i += stride) {
		const x2 = flatCoordinates[i];
		const y2 = flatCoordinates[i + 1];
		length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
		x1 = x2;
		y1 = y2;
	}
	return length;
}
//#endregion
//#region node_modules/ol/geom/flat/simplify.js
/**
* @module ol/geom/flat/simplify
*/
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {number} squaredTolerance Squared tolerance.
* @param {Array<number>} simplifiedFlatCoordinates Simplified flat
*     coordinates.
* @param {number} simplifiedOffset Simplified offset.
* @return {number} Simplified offset.
*/
function douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
	const n = (end - offset) / stride;
	if (n < 3) {
		for (; offset < end; offset += stride) {
			simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
			simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
		}
		return simplifiedOffset;
	}
	/** @type {Array<number>} */
	const markers = new Array(n);
	markers[0] = 1;
	markers[n - 1] = 1;
	/** @type {Array<number>} */
	const stack = [offset, end - stride];
	let index = 0;
	while (stack.length > 0) {
		const last = stack.pop();
		const first = stack.pop();
		let maxSquaredDistance = 0;
		const x1 = flatCoordinates[first];
		const y1 = flatCoordinates[first + 1];
		const x2 = flatCoordinates[last];
		const y2 = flatCoordinates[last + 1];
		for (let i = first + stride; i < last; i += stride) {
			const x = flatCoordinates[i];
			const y = flatCoordinates[i + 1];
			const squaredDistance = squaredSegmentDistance(x, y, x1, y1, x2, y2);
			if (squaredDistance > maxSquaredDistance) {
				index = i;
				maxSquaredDistance = squaredDistance;
			}
		}
		if (maxSquaredDistance > squaredTolerance) {
			markers[(index - offset) / stride] = 1;
			if (first + stride < index) stack.push(first, index);
			if (index + stride < last) stack.push(index, last);
		}
	}
	for (let i = 0; i < n; ++i) if (markers[i]) {
		simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride];
		simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride + 1];
	}
	return simplifiedOffset;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Ends.
* @param {number} stride Stride.
* @param {number} squaredTolerance Squared tolerance.
* @param {Array<number>} simplifiedFlatCoordinates Simplified flat
*     coordinates.
* @param {number} simplifiedOffset Simplified offset.
* @param {Array<number>} simplifiedEnds Simplified ends.
* @return {number} Simplified offset.
*/
function douglasPeuckerArray(flatCoordinates, offset, ends, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
	for (let i = 0, ii = ends.length; i < ii; ++i) {
		const end = ends[i];
		simplifiedOffset = douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset);
		simplifiedEnds.push(simplifiedOffset);
		offset = end;
	}
	return simplifiedOffset;
}
/**
* @param {number} value Value.
* @param {number} tolerance Tolerance.
* @return {number} Rounded value.
*/
function snap(value, tolerance) {
	return tolerance * Math.round(value / tolerance);
}
/**
* Simplifies a line string using an algorithm designed by Tim Schaub.
* Coordinates are snapped to the nearest value in a virtual grid and
* consecutive duplicate coordinates are discarded.  This effectively preserves
* topology as the simplification of any subsection of a line string is
* independent of the rest of the line string.  This means that, for examples,
* the common edge between two polygons will be simplified to the same line
* string independently in both polygons.  This implementation uses a single
* pass over the coordinates and eliminates intermediate collinear points.
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {number} tolerance Tolerance.
* @param {Array<number>} simplifiedFlatCoordinates Simplified flat
*     coordinates.
* @param {number} simplifiedOffset Simplified offset.
* @return {number} Simplified offset.
*/
function quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset) {
	if (offset == end) return simplifiedOffset;
	let x1 = snap(flatCoordinates[offset], tolerance);
	let y1 = snap(flatCoordinates[offset + 1], tolerance);
	offset += stride;
	simplifiedFlatCoordinates[simplifiedOffset++] = x1;
	simplifiedFlatCoordinates[simplifiedOffset++] = y1;
	let x2, y2;
	do {
		x2 = snap(flatCoordinates[offset], tolerance);
		y2 = snap(flatCoordinates[offset + 1], tolerance);
		offset += stride;
		if (offset == end) {
			simplifiedFlatCoordinates[simplifiedOffset++] = x2;
			simplifiedFlatCoordinates[simplifiedOffset++] = y2;
			return simplifiedOffset;
		}
	} while (x2 == x1 && y2 == y1);
	while (offset < end) {
		const x3 = snap(flatCoordinates[offset], tolerance);
		const y3 = snap(flatCoordinates[offset + 1], tolerance);
		offset += stride;
		if (x3 == x2 && y3 == y2) continue;
		const dx1 = x2 - x1;
		const dy1 = y2 - y1;
		const dx2 = x3 - x1;
		const dy2 = y3 - y1;
		if (dx1 * dy2 == dy1 * dx2 && (dx1 < 0 && dx2 < dx1 || dx1 == dx2 || dx1 > 0 && dx2 > dx1) && (dy1 < 0 && dy2 < dy1 || dy1 == dy2 || dy1 > 0 && dy2 > dy1)) {
			x2 = x3;
			y2 = y3;
			continue;
		}
		simplifiedFlatCoordinates[simplifiedOffset++] = x2;
		simplifiedFlatCoordinates[simplifiedOffset++] = y2;
		x1 = x2;
		y1 = y2;
		x2 = x3;
		y2 = y3;
	}
	simplifiedFlatCoordinates[simplifiedOffset++] = x2;
	simplifiedFlatCoordinates[simplifiedOffset++] = y2;
	return simplifiedOffset;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Ends.
* @param {number} stride Stride.
* @param {number} tolerance Tolerance.
* @param {Array<number>} simplifiedFlatCoordinates Simplified flat
*     coordinates.
* @param {number} simplifiedOffset Simplified offset.
* @param {Array<number>} simplifiedEnds Simplified ends.
* @return {number} Simplified offset.
*/
function quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
	for (let i = 0, ii = ends.length; i < ii; ++i) {
		const end = ends[i];
		simplifiedOffset = quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset);
		simplifiedEnds.push(simplifiedOffset);
		offset = end;
	}
	return simplifiedOffset;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<number>>} endss Endss.
* @param {number} stride Stride.
* @param {number} tolerance Tolerance.
* @param {Array<number>} simplifiedFlatCoordinates Simplified flat
*     coordinates.
* @param {number} simplifiedOffset Simplified offset.
* @param {Array<Array<number>>} simplifiedEndss Simplified endss.
* @return {number} Simplified offset.
*/
function quantizeMultiArray(flatCoordinates, offset, endss, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEndss) {
	for (let i = 0, ii = endss.length; i < ii; ++i) {
		const ends = endss[i];
		/** @type {Array<number>} */
		const simplifiedEnds = [];
		simplifiedOffset = quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds);
		simplifiedEndss.push(simplifiedEnds);
		offset = ends[ends.length - 1];
	}
	return simplifiedOffset;
}
//#endregion
//#region node_modules/ol/geom/LineString.js
/**
* @module ol/geom/LineString
*/
/**
* @classdesc
* Linestring geometry.
*
* @api
*/
var LineString = class LineString extends SimpleGeometry {
	/**
	* @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
	*     For internal use, flat coordinates in combination with `layout` are also accepted.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	*/
	constructor(coordinates, layout) {
		super();
		/**
		* @private
		* @type {import("../coordinate.js").Coordinate|null}
		*/
		this.flatMidpoint_ = null;
		/**
		* @private
		* @type {number}
		*/
		this.flatMidpointRevision_ = -1;
		/**
		* @private
		* @type {number}
		*/
		this.maxDelta_ = -1;
		/**
		* @private
		* @type {number}
		*/
		this.maxDeltaRevision_ = -1;
		if (layout !== void 0 && !Array.isArray(coordinates[0])) this.setFlatCoordinates(layout, coordinates);
		else this.setCoordinates(coordinates, layout);
	}
	/**
	* Append the passed coordinate to the coordinates of the linestring.
	* @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
	* @api
	*/
	appendCoordinate(coordinate) {
		extend(this.flatCoordinates, coordinate);
		this.changed();
	}
	/**
	* Make a complete copy of the geometry.
	* @return {!LineString} Clone.
	* @api
	* @override
	*/
	clone() {
		const lineString = new LineString(this.flatCoordinates.slice(), this.layout);
		lineString.applyProperties(this);
		return lineString;
	}
	/**
	* @param {number} x X.
	* @param {number} y Y.
	* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
	* @param {number} minSquaredDistance Minimum squared distance.
	* @return {number} Minimum squared distance.
	* @override
	*/
	closestPointXY(x, y, closestPoint, minSquaredDistance) {
		if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) return minSquaredDistance;
		if (this.maxDeltaRevision_ != this.getRevision()) {
			this.maxDelta_ = Math.sqrt(maxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
			this.maxDeltaRevision_ = this.getRevision();
		}
		return assignClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
	}
	/**
	* Iterate over each segment, calling the provided callback.
	* If the callback returns a truthy value the function returns that
	* value immediately. Otherwise the function returns `false`.
	*
	* @param {function(this: S, import("../coordinate.js").Coordinate, import("../coordinate.js").Coordinate): T} callback Function
	*     called for each segment. The function will receive two arguments, the start and end coordinates of the segment.
	* @return {T|boolean} Value.
	* @template T,S
	* @api
	*/
	forEachSegment(callback) {
		return forEach(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, callback);
	}
	/**
	* Returns the coordinate at `m` using linear interpolation, or `null` if no
	* such coordinate exists.
	*
	* `extrapolate` controls extrapolation beyond the range of Ms in the
	* MultiLineString. If `extrapolate` is `true` then Ms less than the first
	* M will return the first coordinate and Ms greater than the last M will
	* return the last coordinate.
	*
	* @param {number} m M.
	* @param {boolean} [extrapolate] Extrapolate. Default is `false`.
	* @return {import("../coordinate.js").Coordinate|null} Coordinate.
	* @api
	*/
	getCoordinateAtM(m, extrapolate) {
		if (this.layout != "XYM" && this.layout != "XYZM") return null;
		extrapolate = extrapolate !== void 0 ? extrapolate : false;
		return lineStringCoordinateAtM(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, m, extrapolate);
	}
	/**
	* Return the coordinates of the linestring.
	* @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
	* @api
	* @override
	*/
	getCoordinates() {
		return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
	}
	/**
	* Return the coordinate at the provided fraction along the linestring.
	* The `fraction` is a number between 0 and 1, where 0 is the start of the
	* linestring and 1 is the end.
	* @param {number} fraction Fraction.
	* @param {import("../coordinate.js").Coordinate} [dest] Optional coordinate whose values will
	*     be modified. If not provided, a new coordinate will be returned.
	* @return {import("../coordinate.js").Coordinate} Coordinate of the interpolated point.
	* @api
	*/
	getCoordinateAt(fraction, dest) {
		return interpolatePoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, fraction, dest, this.stride);
	}
	/**
	* Return the length of the linestring on projected plane.
	* @return {number} Length (on projected plane).
	* @api
	*/
	getLength() {
		return lineStringLength(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
	}
	/**
	* @return {Array<number>} Flat midpoint.
	*/
	getFlatMidpoint() {
		if (this.flatMidpointRevision_ != this.getRevision()) {
			var _this$flatMidpoint_;
			this.flatMidpoint_ = this.getCoordinateAt(.5, (_this$flatMidpoint_ = this.flatMidpoint_) !== null && _this$flatMidpoint_ !== void 0 ? _this$flatMidpoint_ : void 0);
			this.flatMidpointRevision_ = this.getRevision();
		}
		return this.flatMidpoint_;
	}
	/**
	* @param {number} squaredTolerance Squared tolerance.
	* @return {LineString} Simplified LineString.
	* @protected
	* @override
	*/
	getSimplifiedGeometryInternal(squaredTolerance) {
		/** @type {Array<number>} */
		const simplifiedFlatCoordinates = [];
		simplifiedFlatCoordinates.length = douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
		return new LineString(simplifiedFlatCoordinates, "XY");
	}
	/**
	* Get the type of this geometry.
	* @return {import("./Geometry.js").Type} Geometry type.
	* @api
	* @override
	*/
	getType() {
		return "LineString";
	}
	/**
	* Test if the geometry and the passed extent intersect.
	* @param {import("../extent.js").Extent} extent Extent.
	* @return {boolean} `true` if the geometry and the extent intersect.
	* @api
	* @override
	*/
	intersectsExtent(extent) {
		return intersectsLineString(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent, this.getExtent());
	}
	/**
	* Set the coordinates of the linestring.
	* @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	* @api
	* @override
	*/
	setCoordinates(coordinates, layout) {
		this.setLayout(layout, coordinates, 1);
		if (!this.flatCoordinates) this.flatCoordinates = [];
		this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates, this.stride);
		this.changed();
	}
};
//#endregion
//#region node_modules/ol/geom/flat/area.js
/**
* @module ol/geom/flat/area
*/
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @return {number} Area.
*/
function linearRing(flatCoordinates, offset, end, stride) {
	let twiceArea = 0;
	const x0 = flatCoordinates[end - stride];
	const y0 = flatCoordinates[end - stride + 1];
	let dx1 = 0;
	let dy1 = 0;
	for (; offset < end; offset += stride) {
		const dx2 = flatCoordinates[offset] - x0;
		const dy2 = flatCoordinates[offset + 1] - y0;
		twiceArea += dy1 * dx2 - dx1 * dy2;
		dx1 = dx2;
		dy1 = dy2;
	}
	return twiceArea / 2;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Ends.
* @param {number} stride Stride.
* @return {number} Area.
*/
function linearRings(flatCoordinates, offset, ends, stride) {
	let area = 0;
	for (let i = 0, ii = ends.length; i < ii; ++i) {
		const end = ends[i];
		area += linearRing(flatCoordinates, offset, end, stride);
		offset = end;
	}
	return area;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<number>>} endss Endss.
* @param {number} stride Stride.
* @return {number} Area.
*/
function linearRingss$1(flatCoordinates, offset, endss, stride) {
	let area = 0;
	for (let i = 0, ii = endss.length; i < ii; ++i) {
		const ends = endss[i];
		area += linearRings(flatCoordinates, offset, ends, stride);
		offset = ends[ends.length - 1];
	}
	return area;
}
//#endregion
//#region node_modules/ol/geom/LinearRing.js
/**
* @module ol/geom/LinearRing
*/
/**
* @classdesc
* Linear ring geometry. Only used as part of polygon; cannot be rendered
* on its own.
*
* @api
*/
var LinearRing = class LinearRing extends SimpleGeometry {
	/**
	* @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
	*     For internal use, flat coordinates in combination with `layout` are also accepted.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	*/
	constructor(coordinates, layout) {
		super();
		/**
		* @private
		* @type {number}
		*/
		this.maxDelta_ = -1;
		/**
		* @private
		* @type {number}
		*/
		this.maxDeltaRevision_ = -1;
		if (layout !== void 0 && !Array.isArray(coordinates[0])) this.setFlatCoordinates(layout, coordinates);
		else this.setCoordinates(coordinates, layout);
	}
	/**
	* Make a complete copy of the geometry.
	* @return {!LinearRing} Clone.
	* @api
	* @override
	*/
	clone() {
		return new LinearRing(this.flatCoordinates.slice(), this.layout);
	}
	/**
	* @param {number} x X.
	* @param {number} y Y.
	* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
	* @param {number} minSquaredDistance Minimum squared distance.
	* @return {number} Minimum squared distance.
	* @override
	*/
	closestPointXY(x, y, closestPoint, minSquaredDistance) {
		if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) return minSquaredDistance;
		if (this.maxDeltaRevision_ != this.getRevision()) {
			this.maxDelta_ = Math.sqrt(maxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
			this.maxDeltaRevision_ = this.getRevision();
		}
		return assignClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
	}
	/**
	* Return the area of the linear ring on projected plane.
	* @return {number} Area (on projected plane).
	* @api
	*/
	getArea() {
		return linearRing(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
	}
	/**
	* Return the coordinates of the linear ring.
	* @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
	* @api
	* @override
	*/
	getCoordinates() {
		return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
	}
	/**
	* @param {number} squaredTolerance Squared tolerance.
	* @return {LinearRing} Simplified LinearRing.
	* @protected
	* @override
	*/
	getSimplifiedGeometryInternal(squaredTolerance) {
		/** @type {Array<number>} */
		const simplifiedFlatCoordinates = [];
		simplifiedFlatCoordinates.length = douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
		return new LinearRing(simplifiedFlatCoordinates, "XY");
	}
	/**
	* Get the type of this geometry.
	* @return {import("./Geometry.js").Type} Geometry type.
	* @api
	* @override
	*/
	getType() {
		return "LinearRing";
	}
	/**
	* Test if the geometry and the passed extent intersect.
	* @param {import("../extent.js").Extent} extent Extent.
	* @return {boolean} `true` if the geometry and the extent intersect.
	* @api
	* @override
	*/
	intersectsExtent(extent) {
		return false;
	}
	/**
	* Set the coordinates of the linear ring.
	* @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	* @api
	* @override
	*/
	setCoordinates(coordinates, layout) {
		this.setLayout(layout, coordinates, 1);
		if (!this.flatCoordinates) this.flatCoordinates = [];
		this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates, this.stride);
		this.changed();
	}
};
//#endregion
//#region node_modules/ol/geom/flat/interiorpoint.js
/**
* @module ol/geom/flat/interiorpoint
*/
/**
* Calculates a point that is likely to lie in the interior of the linear rings.
* Inspired by JTS's com.vividsolutions.jts.geom.Geometry#getInteriorPoint.
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Ends.
* @param {number} stride Stride.
* @param {Array<number>} flatCenters Flat centers.
* @param {number} flatCentersOffset Flat center offset.
* @param {Array<number>} [dest] Destination.
* @return {Array<number>} Destination point as XYM coordinate, where M is the
* length of the horizontal intersection that the point belongs to.
*/
function getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, flatCentersOffset, dest) {
	let i, ii, x, x1, x2, y1, y2;
	const y = flatCenters[flatCentersOffset + 1];
	/** @type {Array<number>} */
	const intersections = [];
	for (let r = 0, rr = ends.length; r < rr; ++r) {
		const end = ends[r];
		x1 = flatCoordinates[end - stride];
		y1 = flatCoordinates[end - stride + 1];
		for (i = offset; i < end; i += stride) {
			x2 = flatCoordinates[i];
			y2 = flatCoordinates[i + 1];
			if (y <= y1 && y2 <= y || y1 <= y && y <= y2) {
				x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
				intersections.push(x);
			}
			x1 = x2;
			y1 = y2;
		}
	}
	let pointX = NaN;
	let maxSegmentLength = -Infinity;
	intersections.sort(ascending);
	x1 = intersections[0];
	for (i = 1, ii = intersections.length; i < ii; ++i) {
		x2 = intersections[i];
		const segmentLength = Math.abs(x2 - x1);
		if (segmentLength > maxSegmentLength) {
			x = (x1 + x2) / 2;
			if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y)) {
				pointX = x;
				maxSegmentLength = segmentLength;
			}
		}
		x1 = x2;
	}
	if (isNaN(pointX)) pointX = flatCenters[flatCentersOffset];
	if (dest) {
		dest.push(pointX, y, maxSegmentLength);
		return dest;
	}
	return [
		pointX,
		y,
		maxSegmentLength
	];
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<number>>} endss Endss.
* @param {number} stride Stride.
* @param {Array<number>} flatCenters Flat centers.
* @return {Array<number>} Interior points as XYM coordinates, where M is the
* length of the horizontal intersection that the point belongs to.
*/
function getInteriorPointsOfMultiArray(flatCoordinates, offset, endss, stride, flatCenters) {
	/** @type {Array<number>} */
	let interiorPoints = [];
	for (let i = 0, ii = endss.length; i < ii; ++i) {
		const ends = endss[i];
		interiorPoints = getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, 2 * i, interiorPoints);
		offset = ends[ends.length - 1];
	}
	return interiorPoints;
}
//#endregion
//#region node_modules/ol/geom/flat/reverse.js
/**
* @module ol/geom/flat/reverse
*/
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
*/
function coordinates(flatCoordinates, offset, end, stride) {
	while (offset < end - stride) {
		for (let i = 0; i < stride; ++i) {
			const tmp = flatCoordinates[offset + i];
			flatCoordinates[offset + i] = flatCoordinates[end - stride + i];
			flatCoordinates[end - stride + i] = tmp;
		}
		offset += stride;
		end -= stride;
	}
}
//#endregion
//#region node_modules/ol/geom/flat/orient.js
/**
* @module ol/geom/flat/orient
*/
/**
* Is the linear ring oriented clockwise in a coordinate system with a bottom-left
* coordinate origin? For a coordinate system with a top-left coordinate origin,
* the ring's orientation is clockwise when this function returns false.
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @return {boolean|undefined} Is clockwise.
*/
function linearRingIsClockwise(flatCoordinates, offset, end, stride) {
	let edge = 0;
	let x1 = flatCoordinates[end - stride];
	let y1 = flatCoordinates[end - stride + 1];
	for (; offset < end; offset += stride) {
		const x2 = flatCoordinates[offset];
		const y2 = flatCoordinates[offset + 1];
		edge += (x2 - x1) * (y2 + y1);
		x1 = x2;
		y1 = y2;
	}
	return edge === 0 ? void 0 : edge > 0;
}
/**
* Determines if linear rings are oriented.  By default, left-hand orientation
* is tested (first ring must be clockwise, remaining rings counter-clockwise).
* To test for right-hand orientation, use the `right` argument.
*
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Array of end indexes.
* @param {number} stride Stride.
* @param {boolean} [right] Test for right-hand orientation
*     (counter-clockwise exterior ring and clockwise interior rings).
* @return {boolean} Rings are correctly oriented.
*/
function linearRingsAreOriented(flatCoordinates, offset, ends, stride, right) {
	right = right !== void 0 ? right : false;
	for (let i = 0, ii = ends.length; i < ii; ++i) {
		const end = ends[i];
		const isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
		if (i === 0) {
			if (right && isClockwise || !right && !isClockwise) return false;
		} else if (right && !isClockwise || !right && isClockwise) return false;
		offset = end;
	}
	return true;
}
/**
* Determines if linear rings are oriented.  By default, left-hand orientation
* is tested (first ring must be clockwise, remaining rings counter-clockwise).
* To test for right-hand orientation, use the `right` argument.
*
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<number>>} endss Array of array of end indexes.
* @param {number} stride Stride.
* @param {boolean} [right] Test for right-hand orientation
*     (counter-clockwise exterior ring and clockwise interior rings).
* @return {boolean} Rings are correctly oriented.
*/
function linearRingssAreOriented(flatCoordinates, offset, endss, stride, right) {
	for (let i = 0, ii = endss.length; i < ii; ++i) {
		const ends = endss[i];
		if (!linearRingsAreOriented(flatCoordinates, offset, ends, stride, right)) return false;
		if (ends.length) offset = ends[ends.length - 1];
	}
	return true;
}
/**
* Orient coordinates in a flat array of linear rings.  By default, rings
* are oriented following the left-hand rule (clockwise for exterior and
* counter-clockwise for interior rings).  To orient according to the
* right-hand rule, use the `right` argument.
*
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Ends.
* @param {number} stride Stride.
* @param {boolean} [right] Follow the right-hand rule for orientation.
* @return {number} End.
*/
function orientLinearRings(flatCoordinates, offset, ends, stride, right) {
	right = right !== void 0 ? right : false;
	for (let i = 0, ii = ends.length; i < ii; ++i) {
		const end = ends[i];
		const isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
		if (i === 0 ? right && isClockwise || !right && !isClockwise : right && !isClockwise || !right && isClockwise) coordinates(flatCoordinates, offset, end, stride);
		offset = end;
	}
	return offset;
}
/**
* Orient coordinates in a flat array of linear rings.  By default, rings
* are oriented following the left-hand rule (clockwise for exterior and
* counter-clockwise for interior rings).  To orient according to the
* right-hand rule, use the `right` argument.
*
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<number>>} endss Array of array of end indexes.
* @param {number} stride Stride.
* @param {boolean} [right] Follow the right-hand rule for orientation.
* @return {number} End.
*/
function orientLinearRingsArray(flatCoordinates, offset, endss, stride, right) {
	for (let i = 0, ii = endss.length; i < ii; ++i) offset = orientLinearRings(flatCoordinates, offset, endss[i], stride, right);
	return offset;
}
/**
* Return a two-dimensional endss
* @param {Array<number>} flatCoordinates Flat coordinates
* @param {Array<number>} ends Linear ring end indexes
* @return {Array<Array<number>>} Two dimensional endss array that can
* be used to construct a MultiPolygon
*/
function inflateEnds(flatCoordinates, ends) {
	const endss = [];
	let offset = 0;
	let prevEndIndex = 0;
	let startOrientation;
	for (let i = 0, ii = ends.length; i < ii; ++i) {
		const end = ends[i];
		const orientation = linearRingIsClockwise(flatCoordinates, offset, end, 2);
		if (startOrientation === void 0) startOrientation = orientation;
		if (orientation === startOrientation) endss.push(ends.slice(prevEndIndex, i + 1));
		else {
			if (endss.length === 0) continue;
			endss[endss.length - 1].push(ends[prevEndIndex]);
		}
		prevEndIndex = i + 1;
		offset = end;
	}
	return endss;
}
//#endregion
//#region node_modules/ol/geom/Polygon.js
/**
* @module ol/geom/Polygon
*/
/**
* @classdesc
* Polygon geometry.
*
* @api
*/
var Polygon = class Polygon extends SimpleGeometry {
	/**
	* @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
	*     Array of linear rings that define the polygon. The first linear ring of the
	*     array defines the outer-boundary or surface of the polygon. Each subsequent
	*     linear ring defines a hole in the surface of the polygon. A linear ring is
	*     an array of vertices' coordinates where the first coordinate and the last are
	*     equivalent. (For internal use, flat coordinates in combination with
	*     `layout` and `ends` are also accepted.)
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	* @param {Array<number>} [ends] Ends (for internal use with flat coordinates).
	*/
	constructor(coordinates, layout, ends) {
		super();
		/**
		* @type {Array<number>}
		* @private
		*/
		this.ends_ = [];
		/**
		* @private
		* @type {number}
		*/
		this.flatInteriorPointRevision_ = -1;
		/**
		* @private
		* @type {import("../coordinate.js").Coordinate|null}
		*/
		this.flatInteriorPoint_ = null;
		/**
		* @private
		* @type {number}
		*/
		this.maxDelta_ = -1;
		/**
		* @private
		* @type {number}
		*/
		this.maxDeltaRevision_ = -1;
		/**
		* @private
		* @type {number}
		*/
		this.orientedRevision_ = -1;
		/**
		* @private
		* @type {Array<number>|null}
		*/
		this.orientedFlatCoordinates_ = null;
		if (layout !== void 0 && ends) {
			this.setFlatCoordinates(layout, coordinates);
			this.ends_ = ends;
		} else this.setCoordinates(coordinates, layout);
	}
	/**
	* Append the passed linear ring to this polygon.
	* @param {LinearRing} linearRing Linear ring.
	* @api
	*/
	appendLinearRing(linearRing) {
		if (!this.flatCoordinates) this.flatCoordinates = linearRing.getFlatCoordinates().slice();
		else extend(this.flatCoordinates, linearRing.getFlatCoordinates());
		this.ends_.push(this.flatCoordinates.length);
		this.changed();
	}
	/**
	* Make a complete copy of the geometry.
	* @return {!Polygon} Clone.
	* @api
	* @override
	*/
	clone() {
		const polygon = new Polygon(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
		polygon.applyProperties(this);
		return polygon;
	}
	/**
	* @param {number} x X.
	* @param {number} y Y.
	* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
	* @param {number} minSquaredDistance Minimum squared distance.
	* @return {number} Minimum squared distance.
	* @override
	*/
	closestPointXY(x, y, closestPoint, minSquaredDistance) {
		if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) return minSquaredDistance;
		if (this.maxDeltaRevision_ != this.getRevision()) {
			this.maxDelta_ = Math.sqrt(arrayMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0));
			this.maxDeltaRevision_ = this.getRevision();
		}
		return assignClosestArrayPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
	}
	/**
	* @param {number} x X.
	* @param {number} y Y.
	* @return {boolean} Contains (x, y).
	* @override
	*/
	containsXY(x, y) {
		return linearRingsContainsXY(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, x, y);
	}
	/**
	* Return the area of the polygon on projected plane.
	* @return {number} Area (on projected plane).
	* @api
	*/
	getArea() {
		return linearRings(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
	}
	/**
	* Get the coordinate array for this geometry.  This array has the structure
	* of a GeoJSON coordinate array for polygons.
	*
	* @param {boolean} [right] Orient coordinates according to the right-hand
	*     rule (counter-clockwise for exterior and clockwise for interior rings).
	*     If `false`, coordinates will be oriented according to the left-hand rule
	*     (clockwise for exterior and counter-clockwise for interior rings).
	*     By default, coordinate orientation will depend on how the geometry was
	*     constructed.
	* @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
	* @api
	* @override
	*/
	getCoordinates(right) {
		let flatCoordinates;
		if (right !== void 0) {
			flatCoordinates = this.getOrientedFlatCoordinates().slice();
			orientLinearRings(flatCoordinates, 0, this.ends_, this.stride, right);
		} else flatCoordinates = this.flatCoordinates;
		return inflateCoordinatesArray(flatCoordinates, 0, this.ends_, this.stride);
	}
	/**
	* @return {Array<number>} Ends.
	*/
	getEnds() {
		return this.ends_;
	}
	/**
	* @return {Array<number>} Interior point.
	*/
	getFlatInteriorPoint() {
		if (this.flatInteriorPointRevision_ != this.getRevision()) {
			const flatCenter = getCenter(this.getExtent());
			this.flatInteriorPoint_ = getInteriorPointOfArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, flatCenter, 0);
			this.flatInteriorPointRevision_ = this.getRevision();
		}
		return this.flatInteriorPoint_;
	}
	/**
	* Return an interior point of the polygon.
	* @return {Point} Interior point as XYM coordinate, where M is the
	* length of the horizontal intersection that the point belongs to.
	* @api
	*/
	getInteriorPoint() {
		return new Point(this.getFlatInteriorPoint(), "XYM");
	}
	/**
	* Return the number of rings of the polygon,  this includes the exterior
	* ring and any interior rings.
	*
	* @return {number} Number of rings.
	* @api
	*/
	getLinearRingCount() {
		return this.ends_.length;
	}
	/**
	* Return the Nth linear ring of the polygon geometry. Return `null` if the
	* given index is out of range.
	* The exterior linear ring is available at index `0` and the interior rings
	* at index `1` and beyond.
	*
	* @param {number} index Index.
	* @return {LinearRing|null} Linear ring.
	* @api
	*/
	getLinearRing(index) {
		if (index < 0 || this.ends_.length <= index) return null;
		return new LinearRing(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
	}
	/**
	* Return the linear rings of the polygon.
	* @return {Array<LinearRing>} Linear rings.
	* @api
	*/
	getLinearRings() {
		const layout = this.layout;
		const flatCoordinates = this.flatCoordinates;
		const ends = this.ends_;
		const linearRings = [];
		let offset = 0;
		for (let i = 0, ii = ends.length; i < ii; ++i) {
			const end = ends[i];
			const linearRing = new LinearRing(flatCoordinates.slice(offset, end), layout);
			linearRings.push(linearRing);
			offset = end;
		}
		return linearRings;
	}
	/**
	* @return {Array<number>} Oriented flat coordinates.
	*/
	getOrientedFlatCoordinates() {
		if (this.orientedRevision_ != this.getRevision()) {
			const flatCoordinates = this.flatCoordinates;
			if (linearRingsAreOriented(flatCoordinates, 0, this.ends_, this.stride)) this.orientedFlatCoordinates_ = flatCoordinates;
			else {
				this.orientedFlatCoordinates_ = flatCoordinates.slice();
				this.orientedFlatCoordinates_.length = orientLinearRings(this.orientedFlatCoordinates_, 0, this.ends_, this.stride);
			}
			this.orientedRevision_ = this.getRevision();
		}
		return this.orientedFlatCoordinates_;
	}
	/**
	* @param {number} squaredTolerance Squared tolerance.
	* @return {Polygon} Simplified Polygon.
	* @protected
	* @override
	*/
	getSimplifiedGeometryInternal(squaredTolerance) {
		/** @type {Array<number>} */
		const simplifiedFlatCoordinates = [];
		/** @type {Array<number>} */
		const simplifiedEnds = [];
		simplifiedFlatCoordinates.length = quantizeArray(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
		return new Polygon(simplifiedFlatCoordinates, "XY", simplifiedEnds);
	}
	/**
	* Get the type of this geometry.
	* @return {import("./Geometry.js").Type} Geometry type.
	* @api
	* @override
	*/
	getType() {
		return "Polygon";
	}
	/**
	* Test if the geometry and the passed extent intersect.
	* @param {import("../extent.js").Extent} extent Extent.
	* @return {boolean} `true` if the geometry and the extent intersect.
	* @api
	* @override
	*/
	intersectsExtent(extent) {
		return intersectsLinearRingArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, extent);
	}
	/**
	* Set the coordinates of the polygon.
	* @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	* @api
	* @override
	*/
	setCoordinates(coordinates, layout) {
		this.setLayout(layout, coordinates, 2);
		if (!this.flatCoordinates) this.flatCoordinates = [];
		const ends = deflateCoordinatesArray(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
		this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
		this.changed();
	}
};
/**
* Create a polygon from an extent. The layout used is `XY`.
* @param {import("../extent.js").Extent} extent The extent.
* @return {Polygon} The polygon.
* @api
*/
function fromExtent(extent) {
	if (isEmpty(extent)) throw new Error("Cannot create polygon from empty extent");
	const minX = extent[0];
	const minY = extent[1];
	const maxX = extent[2];
	const maxY = extent[3];
	const flatCoordinates = [
		minX,
		minY,
		minX,
		maxY,
		maxX,
		maxY,
		maxX,
		minY,
		minX,
		minY
	];
	return new Polygon(flatCoordinates, "XY", [flatCoordinates.length]);
}
/**
* Create a regular polygon from a circle.
* @param {import("./Circle.js").default} circle Circle geometry.
* @param {number} [sides] Number of sides of the polygon. Default is 32.
* @param {number} [angle] Start angle for the first vertex of the polygon in
*     counter-clockwise radians. 0 means East. Default is 0.
* @return {Polygon} Polygon geometry.
* @api
*/
function fromCircle(circle, sides, angle) {
	sides = sides ? sides : 32;
	const stride = circle.getStride();
	const layout = circle.getLayout();
	const center = circle.getCenter();
	const arrayLength = stride * (sides + 1);
	const flatCoordinates = new Array(arrayLength);
	for (let i = 0; i < arrayLength; i += stride) {
		flatCoordinates[i] = 0;
		flatCoordinates[i + 1] = 0;
		for (let j = 2; j < stride; j++) flatCoordinates[i + j] = center[j];
	}
	const polygon = new Polygon(flatCoordinates, layout, [flatCoordinates.length]);
	makeRegular(polygon, center, circle.getRadius(), angle);
	return polygon;
}
/**
* Modify the coordinates of a polygon to make it a regular polygon.
* @param {Polygon} polygon Polygon geometry.
* @param {import("../coordinate.js").Coordinate} center Center of the regular polygon.
* @param {number} radius Radius of the regular polygon.
* @param {number} [angle] Start angle for the first vertex of the polygon in
*     counter-clockwise radians. 0 means East. Default is 0.
*/
function makeRegular(polygon, center, radius, angle) {
	const flatCoordinates = polygon.getFlatCoordinates();
	const stride = polygon.getStride();
	const sides = flatCoordinates.length / stride - 1;
	const startAngle = angle ? angle : 0;
	for (let i = 0; i <= sides; ++i) {
		const offset = i * stride;
		const angle = startAngle + modulo(i, sides) * 2 * Math.PI / sides;
		flatCoordinates[offset] = center[0] + radius * Math.cos(angle);
		flatCoordinates[offset + 1] = center[1] + radius * Math.sin(angle);
	}
	polygon.changed();
}
//#endregion
//#region node_modules/ol/ImageState.js
init_objectSpread2();
/**
* @module ol/ImageState
*/
/**
* @enum {number}
*/
var ImageState_default = {
	IDLE: 0,
	LOADING: 1,
	LOADED: 2,
	ERROR: 3,
	EMPTY: 4
};
//#endregion
//#region node_modules/ol/Image.js
/**
* @module ol/Image
*/
/**
* A function that takes an {@link module:ol/Image~ImageWrapper} for the image and a
* `{string}` for the src as arguments. It is supposed to make it so the
* underlying image {@link module:ol/Image~ImageWrapper#getImage} is assigned the
* content specified by the src. If not specified, the default is
*
*     function(image, src) {
*       image.getImage().src = src;
*     }
*
* Providing a custom `imageLoadFunction` can be useful to load images with
* post requests or - in general - through XHR requests, where the src of the
* image element would be set to a data URI when the content is loaded.
*
* @typedef {function(import("./Image.js").default, string): void} LoadFunction
* @api
*/
/**
* @typedef {Object} ImageObject
* @property {import("./extent.js").Extent} [extent] Extent, if different from the requested one.
* @property {import("./resolution.js").ResolutionLike} [resolution] Resolution, if different from the requested one.
* When x and y resolution are different, use the array type (`[xResolution, yResolution]`).
* @property {number} [pixelRatio] Pixel ratio, if different from the requested one.
* @property {import('./DataTile.js').ImageLike} image Image.
*/
/**
* Loader function used for image sources. Receives extent, resolution and pixel ratio as arguments.
* For images that cover any extent and resolution (static images), the loader function should not accept
* any arguments. The function returns an {@link import("./DataTile.js").ImageLike image}, an
* {@link import("./Image.js").ImageObject image object}, or a promise for the same.
* For loaders that generate images, the promise should not resolve until the image is loaded.
* If the returned image does not match the extent, resolution or pixel ratio passed to the loader,
* it has to return an {@link import("./Image.js").ImageObject image object} with the `image` and the
* correct `extent`, `resolution` and `pixelRatio`.
*
* @typedef {function(import("./extent.js").Extent, number, number, (function(HTMLImageElement, string): void)=): import("./DataTile.js").ImageLike|ImageObject|Promise<import("./DataTile.js").ImageLike|ImageObject>} Loader
* @api
*/
/**
* Loader function used for image sources. Receives extent, resolution and pixel ratio as arguments.
* The function returns a promise for an  {@link import("./Image.js").ImageObject image object}.
*
* @typedef {function(import("./extent.js").Extent, number, number, (function(HTMLImageElement, string): void)=): Promise<import("./DataTile.js").ImageLike|ImageObject>} ImageObjectPromiseLoader
*/
var ImageWrapper = class extends Target {
	/**
	* @param {import("./extent.js").Extent} extent Extent.
	* @param {number|Array<number>|undefined} resolution Resolution. If provided as array, x and y
	* resolution will be assumed.
	* @param {number} pixelRatio Pixel ratio.
	* @param {import("./ImageState.js").default|Loader} stateOrLoader State.
	*/
	constructor(extent, resolution, pixelRatio, stateOrLoader) {
		super();
		/**
		* @protected
		* @type {import("./extent.js").Extent}
		*/
		this.extent = extent;
		/**
		* @private
		* @type {number}
		*/
		this.pixelRatio_ = pixelRatio;
		/**
		* @protected
		* @type {number|Array<number>|undefined}
		*/
		this.resolution = resolution;
		/**
		* @protected
		* @type {import("./ImageState.js").default}
		*/
		this.state = typeof stateOrLoader === "function" ? ImageState_default.IDLE : stateOrLoader;
		/**
		* @private
		* @type {import('./DataTile.js').ImageLike|null}
		*/
		this.image_ = null;
		/**
		* @protected
		* @type {Loader|null}
		*/
		this.loader = typeof stateOrLoader === "function" ? stateOrLoader : null;
	}
	/**
	* @protected
	*/
	changed() {
		this.dispatchEvent(EventType_default.CHANGE);
	}
	/**
	* @return {import("./extent.js").Extent} Extent.
	*/
	getExtent() {
		return this.extent;
	}
	/**
	* @return {import('./DataTile.js').ImageLike} Image.
	*/
	getImage() {
		return this.image_;
	}
	/**
	* @return {number} PixelRatio.
	*/
	getPixelRatio() {
		return this.pixelRatio_;
	}
	/**
	* @return {number|Array<number>} Resolution.
	*/
	getResolution() {
		return this.resolution;
	}
	/**
	* @return {import("./ImageState.js").default} State.
	*/
	getState() {
		return this.state;
	}
	/**
	* Load not yet loaded URI.
	*/
	load() {
		if (this.state == ImageState_default.IDLE) {
			if (this.loader) {
				this.state = ImageState_default.LOADING;
				this.changed();
				const resolution = this.getResolution();
				const requestResolution = Array.isArray(resolution) ? resolution[0] : resolution;
				toPromise(() => this.loader(this.getExtent(), requestResolution, this.getPixelRatio())).then((image) => {
					if ("image" in image) this.image_ = image.image;
					if ("extent" in image) this.extent = image.extent;
					if ("resolution" in image) this.resolution = image.resolution;
					if ("pixelRatio" in image) this.pixelRatio_ = image.pixelRatio;
					if (image instanceof HTMLImageElement || CREATE_IMAGE_BITMAP && image instanceof ImageBitmap || image instanceof HTMLCanvasElement || image instanceof HTMLVideoElement) this.image_ = image;
					this.state = ImageState_default.LOADED;
				}).catch((error) => {
					this.state = ImageState_default.ERROR;
					console.error(error);
				}).finally(() => this.changed());
			}
		}
	}
	/**
	* @param {import('./DataTile.js').ImageLike} image The image.
	*/
	setImage(image) {
		this.image_ = image;
	}
	/**
	* @param {number|Array<number>} resolution Resolution.
	*/
	setResolution(resolution) {
		this.resolution = resolution;
	}
};
/**
* @param {import('./DataTile.js').ImageLike} image Image element.
* @param {function():any} loadHandler Load callback function.
* @param {function():any} errorHandler Error callback function.
* @return {function():void} Callback to stop listening.
*/
function listenImage(image, loadHandler, errorHandler) {
	const img = image;
	let listening = true;
	let decoding = false;
	let loaded = false;
	const listenerKeys = [listenOnce(img, EventType_default.LOAD, function() {
		loaded = true;
		if (!decoding) loadHandler();
	})];
	if (img.src && IMAGE_DECODE) {
		decoding = true;
		img.decode().then(function() {
			if (listening) loadHandler();
		}).catch(function(error) {
			if (listening) if (loaded) loadHandler();
			else errorHandler();
		});
	} else listenerKeys.push(listenOnce(img, EventType_default.ERROR, errorHandler));
	return function unlisten() {
		listening = false;
		listenerKeys.forEach(unlistenByKey);
	};
}
/**
* Loads an image.
* @param {HTMLImageElement} image Image, not yet loaded.
* @param {string} [src] `src` attribute of the image. Optional, not required if already present.
* @return {Promise<HTMLImageElement>} Promise resolving to an `HTMLImageElement`.
* @api
*/
function load(image, src) {
	return new Promise((resolve, reject) => {
		function handleLoad() {
			unlisten();
			resolve(image);
		}
		function handleError() {
			unlisten();
			reject(/* @__PURE__ */ new Error("Image load error"));
		}
		function unlisten() {
			image.removeEventListener("load", handleLoad);
			image.removeEventListener("error", handleError);
		}
		image.addEventListener("load", handleLoad);
		image.addEventListener("error", handleError);
		if (src) image.src = src;
	});
}
/**
* @param {HTMLImageElement} image Image, not yet loaded.
* @param {string} [src] `src` attribute of the image. Optional, not required if already present.
* @return {Promise<HTMLImageElement>} Promise resolving to an `HTMLImageElement`.
*/
function decodeFallback(image, src) {
	if (src) image.src = src;
	return image.src && IMAGE_DECODE ? new Promise((resolve, reject) => image.decode().then(() => resolve(image)).catch((e) => image.complete && image.width ? resolve(image) : reject(e))) : load(image);
}
/**
* Loads an image and decodes it to an `ImageBitmap` if `createImageBitmap()` is supported. Returns
* the loaded image otherwise.
* @param {HTMLImageElement} image Image, not yet loaded.
* @param {string} [src] `src` attribute of the image. Optional, not required if already present.
* @return {Promise<ImageBitmap|HTMLImageElement>} Promise resolving to an `ImageBitmap` or an
* `HTMLImageElement` if `createImageBitmap()` is not supported.
* @api
*/
function decode(image, src) {
	if (src) image.src = src;
	return image.src && IMAGE_DECODE && CREATE_IMAGE_BITMAP ? image.decode().then(() => createImageBitmap(image)).catch((e) => {
		if (image.complete && image.width) return image;
		throw e;
	}) : decodeFallback(image);
}
//#endregion
//#region node_modules/ol/color.js
/**
* @module ol/color
*/
/**
* A color represented as a short array [red, green, blue, alpha].
* red, green, and blue should be integers in the range 0..255 inclusive.
* alpha should be a float in the range 0..1 inclusive. If no alpha value is
* given then `1` will be used.
* @typedef {Array<number>} Color
* @api
*/
/**
* Color to indicate that no color should be rendered. This is meant to be used for per-reference
* comparisons only.
* @type {Color}
*/
var NO_COLOR = [
	NaN,
	NaN,
	NaN,
	0
];
var colorParseContext;
/**
* @return {CanvasRenderingContext2D} The color parse context
*/
function getColorParseContext() {
	if (!colorParseContext) colorParseContext = createCanvasContext2D(1, 1, void 0, {
		willReadFrequently: true,
		desynchronized: true
	});
	return colorParseContext;
}
var rgbModernRegEx = /^rgba?\(\s*(\d+%?)\s+(\d+%?)\s+(\d+%?)(?:\s*\/\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i;
var rgbLegacyAbsoluteRegEx = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i;
var rgbLegacyPercentageRegEx = /^rgba?\(\s*(\d+%)\s*,\s*(\d+%)\s*,\s*(\d+%)(?:\s*,\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i;
var hexRegEx = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;
/**
* @param {string} s Color component as number or percentage.
* @param {number} divider Divider for percentage.
* @return {number} Color component.
*/
function toColorComponent(s, divider) {
	return s.endsWith("%") ? Number(s.substring(0, s.length - 1)) / divider : Number(s);
}
/**
* @param {string} color Color string.
*/
function throwInvalidColor(color) {
	throw new Error("failed to parse \"" + color + "\" as color");
}
/**
* @param {string} color Color string.
* @return {Color} RGBa color array.
*/
function parseRgba(color) {
	if (color.toLowerCase().startsWith("rgb")) {
		const rgb = color.match(rgbLegacyAbsoluteRegEx) || color.match(rgbModernRegEx) || color.match(rgbLegacyPercentageRegEx);
		if (rgb) {
			const alpha = rgb[4];
			const rgbDivider = 100 / 255;
			return [
				clamp(toColorComponent(rgb[1], rgbDivider) + .5 | 0, 0, 255),
				clamp(toColorComponent(rgb[2], rgbDivider) + .5 | 0, 0, 255),
				clamp(toColorComponent(rgb[3], rgbDivider) + .5 | 0, 0, 255),
				alpha !== void 0 ? clamp(toColorComponent(alpha, 100), 0, 1) : 1
			];
		}
		throwInvalidColor(color);
	}
	if (color.startsWith("#")) {
		if (hexRegEx.test(color)) {
			const hex = color.substring(1);
			const step = hex.length <= 4 ? 1 : 2;
			const colorFromHex = [
				0,
				0,
				0,
				255
			];
			for (let i = 0, ii = hex.length; i < ii; i += step) {
				let colorComponent = parseInt(hex.substring(i, i + step), 16);
				if (step === 1) colorComponent += colorComponent << 4;
				colorFromHex[i / step] = colorComponent;
			}
			colorFromHex[3] = colorFromHex[3] / 255;
			return colorFromHex;
		}
		throwInvalidColor(color);
	}
	const context = getColorParseContext();
	context.fillStyle = "#abcdef";
	let invalidCheckFillStyle = context.fillStyle;
	context.fillStyle = color;
	if (context.fillStyle === invalidCheckFillStyle) {
		context.fillStyle = "#fedcba";
		invalidCheckFillStyle = context.fillStyle;
		context.fillStyle = color;
		if (context.fillStyle === invalidCheckFillStyle) throwInvalidColor(color);
	}
	const colorString = context.fillStyle;
	if (colorString.startsWith("#") || colorString.startsWith("rgba")) return parseRgba(colorString);
	context.clearRect(0, 0, 1, 1);
	context.fillRect(0, 0, 1, 1);
	const colorFromImage = Array.from(context.getImageData(0, 0, 1, 1).data);
	colorFromImage[3] = toFixed(colorFromImage[3] / 255, 3);
	return colorFromImage;
}
/**
* Return the color as an rgba string.
* @param {Color|string} color Color.
* @return {string} Rgba string.
* @api
*/
function asString(color) {
	if (typeof color === "string") return color;
	return toString(color);
}
/**
* @type {number}
*/
var MAX_CACHE_SIZE = 1024;
/**
* We maintain a small cache of parsed strings.  Whenever the cache grows too large,
* we delete an arbitrary set of the entries.
*
* @type {Object<string, Color>}
*/
var cache = {};
/**
* @type {number}
*/
var cacheSize = 0;
/**
* @param {Color} color A color that may or may not have an alpha channel.
* @return {Color} The input color with an alpha channel.  If the input color has
* an alpha channel, the input color will be returned unchanged.  Otherwise, a new
* array will be returned with the input color and an alpha channel of 1.
*/
function withAlpha(color) {
	if (color.length === 4) return color;
	const output = color.slice();
	output[3] = 1;
	return output;
}
/**
* @param {number} v Input value.
* @return {number} Output value.
*/
function b1(v) {
	return v > .0031308 ? Math.pow(v, 1 / 2.4) * 269.025 - 14.025 : v * 3294.6;
}
/**
* @param {number} v Input value.
* @return {number} Output value.
*/
function b2(v) {
	return v > .2068965 ? Math.pow(v, 3) : (v - 4 / 29) * (108 / 841);
}
/**
* @param {number} v Input value.
* @return {number} Output value.
*/
function a1(v) {
	return v > 10.314724 ? Math.pow((v + 14.025) / 269.025, 2.4) : v / 3294.6;
}
/**
* @param {number} v Input value.
* @return {number} Output value.
*/
function a2(v) {
	return v > .0088564 ? Math.pow(v, 1 / 3) : v / (108 / 841) + 4 / 29;
}
/**
* @param {Color} color RGBA color.
* @return {Color} LCHuv color with alpha.
*/
function rgbaToLcha(color) {
	const r = a1(color[0]);
	const g = a1(color[1]);
	const b = a1(color[2]);
	const y = a2(r * .222488403 + g * .716873169 + b * .06060791);
	const l = 500 * (a2(r * .452247074 + g * .399439023 + b * .148375274) - y);
	const q = 200 * (y - a2(r * .016863605 + g * .117638439 + b * .865350722));
	const h = Math.atan2(q, l) * (180 / Math.PI);
	return [
		116 * y - 16,
		Math.sqrt(l * l + q * q),
		h < 0 ? h + 360 : h,
		color[3]
	];
}
/**
* @param {Color} color LCHuv color with alpha.
* @return {Color} RGBA color.
*/
function lchaToRgba(color) {
	const l = (color[0] + 16) / 116;
	const c = color[1];
	const h = color[2] * Math.PI / 180;
	const y = b2(l);
	const x = b2(l + c / 500 * Math.cos(h));
	const z = b2(l - c / 200 * Math.sin(h));
	const r = b1(x * 3.021973625 - y * 1.617392459 - z * .404875592);
	const g = b1(x * -.943766287 + y * 1.916279586 + z * .027607165);
	const b = b1(x * .069407491 - y * .22898585 + z * 1.159737864);
	return [
		clamp(r + .5 | 0, 0, 255),
		clamp(g + .5 | 0, 0, 255),
		clamp(b + .5 | 0, 0, 255),
		color[3]
	];
}
/**
* @param {string} s String.
* @return {Color} Color.
*/
function fromString(s) {
	if (s === "none") return NO_COLOR;
	if (cache.hasOwnProperty(s)) return cache[s];
	if (cacheSize >= MAX_CACHE_SIZE) {
		let i = 0;
		for (const key in cache) if ((i++ & 3) === 0) {
			delete cache[key];
			--cacheSize;
		}
	}
	const color = parseRgba(s);
	if (color.length !== 4) throwInvalidColor(s);
	for (const c of color) if (isNaN(c)) throwInvalidColor(s);
	cache[s] = color;
	++cacheSize;
	return color;
}
/**
* Return the color as an array. This function maintains a cache of calculated
* arrays which means the result should not be modified.
* @param {Color|string} color Color.
* @return {Color} Color.
* @api
*/
function asArray(color) {
	if (Array.isArray(color)) return color;
	return fromString(color);
}
/**
* @param {Color} color Color.
* @return {string} String.
*/
function toString(color) {
	let r = color[0];
	if (r != (r | 0)) r = r + .5 | 0;
	let g = color[1];
	if (g != (g | 0)) g = g + .5 | 0;
	let b = color[2];
	if (b != (b | 0)) b = b + .5 | 0;
	const a = color[3] === void 0 ? 1 : Math.round(color[3] * 1e3) / 1e3;
	return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}
//#endregion
//#region node_modules/ol/style/IconImageCache.js
/**
* @module ol/style/IconImageCache
*/
/**
* @classdesc
* Singleton class. Available through {@link module:ol/style/IconImageCache.shared}.
*/
var IconImageCache = class {
	constructor() {
		/**
		* @type {!Object<string, import("./IconImage.js").default>}
		* @private
		*/
		this.cache_ = {};
		/**
		* @type {!Object<string, CanvasPattern>}
		* @private
		*/
		this.patternCache_ = {};
		/**
		* @type {number}
		* @private
		*/
		this.cacheSize_ = 0;
		/**
		* @type {number}
		* @private
		*/
		this.maxCacheSize_ = 1024;
	}
	/**
	* FIXME empty description for jsdoc
	*/
	clear() {
		this.cache_ = {};
		this.patternCache_ = {};
		this.cacheSize_ = 0;
	}
	/**
	* @return {boolean} Can expire cache.
	*/
	canExpireCache() {
		return this.cacheSize_ > this.maxCacheSize_;
	}
	/**
	* FIXME empty description for jsdoc
	*/
	expire() {
		if (this.canExpireCache()) {
			let i = 0;
			for (const key in this.cache_) {
				const iconImage = this.cache_[key];
				if ((i++ & 3) === 0 && !iconImage.hasListener()) {
					delete this.cache_[key];
					delete this.patternCache_[key];
					--this.cacheSize_;
				}
			}
		}
	}
	/**
	* @param {string} src Src.
	* @param {import("../color.js").Color|string|null} color Color.
	* @return {import("./IconImage.js").default} Icon image.
	*/
	get(src, color) {
		const key = getCacheKey(src, color);
		return key in this.cache_ ? this.cache_[key] : null;
	}
	/**
	* @param {string} src Src.
	* @param {import("../color.js").Color|string|null} color Color.
	* @return {CanvasPattern} Icon image.
	*/
	getPattern(src, color) {
		const key = getCacheKey(src, color);
		return key in this.patternCache_ ? this.patternCache_[key] : null;
	}
	/**
	* @param {string} src Src.
	* @param {import("../color.js").Color|string|null} color Color.
	* @param {import("./IconImage.js").default|null} iconImage Icon image.
	* @param {boolean} [pattern] Also cache a `'repeat'` pattern with this `iconImage`.
	*/
	set(src, color, iconImage, pattern) {
		const key = getCacheKey(src, color);
		const update = key in this.cache_;
		this.cache_[key] = iconImage;
		if (pattern) {
			if (iconImage.getImageState() === ImageState_default.IDLE) iconImage.load();
			if (iconImage.getImageState() === ImageState_default.LOADING) iconImage.ready().then(() => {
				this.patternCache_[key] = getSharedCanvasContext2D().createPattern(iconImage.getImage(1), "repeat");
			});
			else this.patternCache_[key] = getSharedCanvasContext2D().createPattern(iconImage.getImage(1), "repeat");
		}
		if (!update) ++this.cacheSize_;
	}
	/**
	* Set the cache size of the icon cache. Default is `1024`. Change this value when
	* your map uses more than 1024 different icon images and you are not caching icon
	* styles on the application level.
	* @param {number} maxCacheSize Cache max size.
	* @api
	*/
	setSize(maxCacheSize) {
		this.maxCacheSize_ = maxCacheSize;
		this.expire();
	}
};
/**
* @param {string} src Src.
* @param {import("../color.js").Color|string|null} color Color.
* @return {string} Cache key.
*/
function getCacheKey(src, color) {
	const colorString = color ? asArray(color) : "null";
	return src + ":" + colorString;
}
/**
* The {@link module:ol/style/IconImageCache~IconImageCache} for
* {@link module:ol/style/Icon~Icon} images.
* @api
*/
var shared = new IconImageCache();
//#endregion
//#region node_modules/ol/style/IconImage.js
/**
* @module ol/style/IconImage
*/
/**
* @type {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D}
*/
var taintedTestContext = null;
var IconImage = class extends Target {
	/**
	* @param {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap|null} image Image.
	* @param {string|undefined} src Src.
	* @param {import('../dom.js').ImageAttributes} imageAttributes Image attributes options.
	* @param {import("../ImageState.js").default|undefined} imageState Image state.
	* @param {import("../color.js").Color|string|null} color Color.
	*/
	constructor(image, src, imageAttributes, imageState, color) {
		super();
		/**
		* @private
		* @type {HTMLImageElement|OffscreenCanvas|HTMLCanvasElement|ImageBitmap}
		*/
		this.hitDetectionImage_ = null;
		/**
		* @private
		* @type {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap|null}
		*/
		this.image_ = image;
		/**
		* @private
		* @type {string|null}
		*/
		this.crossOrigin_ = imageAttributes === null || imageAttributes === void 0 ? void 0 : imageAttributes.crossOrigin;
		/**
		* @private
		* @type {ReferrerPolicy}
		*/
		this.referrerPolicy_ = imageAttributes === null || imageAttributes === void 0 ? void 0 : imageAttributes.referrerPolicy;
		/**
		* @private
		* @type {Object<number, HTMLCanvasElement|OffscreenCanvas>}
		*/
		this.canvas_ = {};
		/**
		* @private
		* @type {import("../color.js").Color|string|null}
		*/
		this.color_ = color;
		/**
		* @private
		* @type {import("../ImageState.js").default}
		*/
		this.imageState_ = imageState === void 0 ? ImageState_default.IDLE : imageState;
		/**
		* @private
		* @type {import("../size.js").Size|null}
		*/
		this.size_ = image && image.width && image.height ? [image.width, image.height] : null;
		/**
		* @private
		* @type {string|undefined}
		*/
		this.src_ = src;
		/**
		* @private
		*/
		this.tainted_;
		/**
		* @private
		* @type {Promise<void>|null}
		*/
		this.ready_ = null;
	}
	/**
	* @private
	*/
	initializeImage_() {
		this.image_ = new Image();
		if (this.crossOrigin_ !== null) this.image_.crossOrigin = this.crossOrigin_;
		if (this.referrerPolicy_ !== void 0) this.image_.referrerPolicy = this.referrerPolicy_;
	}
	/**
	* @private
	* @return {boolean} The image canvas is tainted.
	*/
	isTainted_() {
		if (this.tainted_ === void 0 && this.imageState_ === ImageState_default.LOADED) {
			if (!taintedTestContext) taintedTestContext = createCanvasContext2D(1, 1, void 0, { willReadFrequently: true });
			taintedTestContext.drawImage(this.image_, 0, 0);
			try {
				taintedTestContext.getImageData(0, 0, 1, 1);
				this.tainted_ = false;
			} catch (_unused) {
				taintedTestContext = null;
				this.tainted_ = true;
			}
		}
		return this.tainted_ === true;
	}
	/**
	* @private
	*/
	dispatchChangeEvent_() {
		this.dispatchEvent(EventType_default.CHANGE);
	}
	/**
	* @private
	*/
	handleImageError_() {
		this.imageState_ = ImageState_default.ERROR;
		this.dispatchChangeEvent_();
	}
	/**
	* @private
	*/
	handleImageLoad_() {
		this.imageState_ = ImageState_default.LOADED;
		this.size_ = [this.image_.width, this.image_.height];
		this.dispatchChangeEvent_();
	}
	/**
	* @param {number} pixelRatio Pixel ratio.
	* @return {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} Image or Canvas element or image bitmap.
	*/
	getImage(pixelRatio) {
		if (!this.image_) this.initializeImage_();
		this.replaceColor_(pixelRatio);
		return this.canvas_[pixelRatio] ? this.canvas_[pixelRatio] : this.image_;
	}
	/**
	* @param {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} image Image.
	*/
	setImage(image) {
		this.image_ = image;
	}
	/**
	* @param {number} pixelRatio Pixel ratio.
	* @return {number} Image or Canvas element.
	*/
	getPixelRatio(pixelRatio) {
		this.replaceColor_(pixelRatio);
		return this.canvas_[pixelRatio] ? pixelRatio : 1;
	}
	/**
	* @return {import("../ImageState.js").default} Image state.
	*/
	getImageState() {
		return this.imageState_;
	}
	/**
	* @return {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} Image element.
	*/
	getHitDetectionImage() {
		if (!this.image_) this.initializeImage_();
		if (!this.hitDetectionImage_) if (this.isTainted_()) {
			const width = this.size_[0];
			const height = this.size_[1];
			const context = createCanvasContext2D(width, height);
			context.fillRect(0, 0, width, height);
			this.hitDetectionImage_ = context.canvas;
		} else this.hitDetectionImage_ = this.image_;
		return this.hitDetectionImage_;
	}
	/**
	* Get the size of the icon (in pixels).
	* @return {import("../size.js").Size} Image size.
	*/
	getSize() {
		return this.size_;
	}
	/**
	* @return {string|undefined} Image src.
	*/
	getSrc() {
		return this.src_;
	}
	/**
	* Load not yet loaded URI.
	*/
	load() {
		if (this.imageState_ !== ImageState_default.IDLE) return;
		if (!this.image_) this.initializeImage_();
		this.imageState_ = ImageState_default.LOADING;
		try {
			if (this.src_ !== void 0)
 /** @type {HTMLImageElement} */ this.image_.src = this.src_;
		} catch (_unused2) {
			this.handleImageError_();
		}
		if (this.image_ instanceof HTMLImageElement) decodeFallback(this.image_, this.src_).then((image) => {
			this.image_ = image;
			this.handleImageLoad_();
		}).catch(this.handleImageError_.bind(this));
	}
	/**
	* @param {number} pixelRatio Pixel ratio.
	* @private
	*/
	replaceColor_(pixelRatio) {
		if (!this.color_ || this.canvas_[pixelRatio] || this.imageState_ !== ImageState_default.LOADED) return;
		const image = this.image_;
		const ctx = createCanvasContext2D(Math.ceil(image.width * pixelRatio), Math.ceil(image.height * pixelRatio));
		const canvas = ctx.canvas;
		ctx.scale(pixelRatio, pixelRatio);
		ctx.drawImage(image, 0, 0);
		ctx.globalCompositeOperation = "multiply";
		ctx.fillStyle = asString(this.color_);
		ctx.fillRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
		ctx.globalCompositeOperation = "destination-in";
		ctx.drawImage(image, 0, 0);
		this.canvas_[pixelRatio] = canvas;
	}
	/**
	* @return {Promise<void>} Promise that resolves when the image is loaded.
	*/
	ready() {
		if (!this.ready_) this.ready_ = new Promise((resolve) => {
			if (this.imageState_ === ImageState_default.LOADED || this.imageState_ === ImageState_default.ERROR) resolve();
			else {
				const onChange = () => {
					if (this.imageState_ === ImageState_default.LOADED || this.imageState_ === ImageState_default.ERROR) {
						this.removeEventListener(EventType_default.CHANGE, onChange);
						resolve();
					}
				};
				this.addEventListener(EventType_default.CHANGE, onChange);
			}
		});
		return this.ready_;
	}
};
/**
* @param {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap|null} image Image.
* @param {string|undefined} src Src.
* @param {import('../dom.js').ImageAttributes} imageAttributes Image attributes options.
* @param {import("../ImageState.js").default|undefined} imageState Image state.
* @param {import("../color.js").Color|string|null} color Color.
* @param {boolean} [pattern] Also cache a `repeat` pattern with the icon image.
* @return {IconImage} Icon image.
*/
function get(image, src, imageAttributes, imageState, color, pattern) {
	let iconImage = src === void 0 ? void 0 : shared.get(src, color);
	if (!iconImage) {
		iconImage = new IconImage(image, image && "src" in image ? image.src || void 0 : src, imageAttributes, imageState, color);
		shared.set(src, color, iconImage, pattern);
	}
	if (pattern && iconImage && !shared.getPattern(src, color)) shared.set(src, color, iconImage, pattern);
	return iconImage;
}
//#endregion
//#region node_modules/ol/colorlike.js
/**
* @module ol/colorlike
*/
/**
* @typedef {Object} PatternDescriptor
* @property {string} src Pattern image URL
* @property {import("./color.js").Color|string} [color] Color to tint the pattern with.
* @property {import("./size.js").Size} [size] Size of the desired slice from the pattern image.
* Use this together with `offset` when the pattern image is a sprite sheet.
* @property {import("./size.js").Size} [offset] Offset of the desired slice from the pattern image.
* Use this together with `size` when the pattern image is a sprite sheet.
*/
/**
* A type accepted by CanvasRenderingContext2D.fillStyle
* or CanvasRenderingContext2D.strokeStyle.
* Represents a color, [CanvasPattern](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern),
* or [CanvasGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient). The origin for
* patterns and gradients as fill style is an increment of 512 css pixels from map coordinate
* `[0, 0]`. For seamless repeat patterns, width and height of the pattern image
* must be a factor of two (2, 4, 8, ..., 512).
*
* @typedef {string|CanvasPattern|CanvasGradient} ColorLike
* @api
*/
/**
* @param {import("./color.js").Color|ColorLike|PatternDescriptor|null} color Color.
* @return {ColorLike|null} The color as an {@link ol/colorlike~ColorLike}.
* @api
*/
function asColorLike(color) {
	if (!color) return null;
	if (Array.isArray(color)) return toString(color);
	if (typeof color === "object" && "src" in color) return asCanvasPattern(color);
	return color;
}
/**
* @param {PatternDescriptor} pattern Pattern descriptor.
* @return {CanvasPattern|null} Canvas pattern or null if the pattern referenced in the
* PatternDescriptor was not found in the icon image cache.
*/
function asCanvasPattern(pattern) {
	if (!pattern.offset || !pattern.size) return shared.getPattern(pattern.src, pattern.color);
	const cacheKey = pattern.src + ":" + pattern.offset;
	const canvasPattern = shared.getPattern(cacheKey, pattern.color);
	if (canvasPattern) return canvasPattern;
	const iconImage = shared.get(pattern.src, null);
	if (iconImage.getImageState() !== ImageState_default.LOADED) return null;
	const patternCanvasContext = createCanvasContext2D(pattern.size[0], pattern.size[1]);
	patternCanvasContext.drawImage(iconImage.getImage(1), pattern.offset[0], pattern.offset[1], pattern.size[0], pattern.size[1], 0, 0, pattern.size[0], pattern.size[1]);
	get(patternCanvasContext.canvas, cacheKey, void 0, ImageState_default.LOADED, pattern.color, true);
	return shared.getPattern(cacheKey, pattern.color);
}
//#endregion
//#region node_modules/ol/css.js
/**
* @module ol/css
*/
/**
* @typedef {Object} FontParameters
* @property {string} style Style.
* @property {string} variant Variant.
* @property {string} weight Weight.
* @property {string} size Size.
* @property {string} lineHeight LineHeight.
* @property {string} family Family.
* @property {Array<string>} families Families.
*/
/**
* The CSS class for hidden feature.
*
* @const
* @type {string}
*/
var CLASS_HIDDEN = "ol-hidden";
/**
* The CSS class that we'll give the DOM elements to have them selectable.
*
* @const
* @type {string}
*/
var CLASS_SELECTABLE = "ol-selectable";
/**
* The CSS class that we'll give the DOM elements to have them unselectable.
*
* @const
* @type {string}
*/
var CLASS_UNSELECTABLE = "ol-unselectable";
/**
* The CSS class for controls.
*
* @const
* @type {string}
*/
var CLASS_CONTROL = "ol-control";
/**
* The CSS class that we'll give the DOM elements that are collapsed, i.e.
* to those elements which usually can be expanded.
*
* @const
* @type {string}
*/
var CLASS_COLLAPSED = "ol-collapsed";
/**
* From https://stackoverflow.com/questions/10135697/regex-to-parse-any-css-font
* @type {RegExp}
*/
var fontRegEx = new RegExp([
	"^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
	"(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
	"(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
	"(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
	"(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
	"(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
	"?\\s*([-,\\\"\\'\\sa-z0-9]+?)\\s*$"
].join(""), "i");
/** @type {Array<'style'|'variant'|'weight'|'size'|'lineHeight'|'family'>} */
var fontRegExMatchIndex = [
	"style",
	"variant",
	"weight",
	"size",
	"lineHeight",
	"family"
];
/** @type {Object<string|number, number>} */
var fontWeights = {
	normal: 400,
	bold: 700
};
/**
* Get the list of font families from a font spec.  Note that this doesn't work
* for font families that have commas in them.
* @param {string} fontSpec The CSS font property.
* @return {FontParameters|null} The font parameters (or null if the input spec is invalid).
*/
var getFontParameters = function(fontSpec) {
	const match = fontSpec.match(fontRegEx);
	if (!match) return null;
	const style = {
		lineHeight: "normal",
		size: "1.2em",
		style: "normal",
		weight: "400",
		variant: "normal"
	};
	for (let i = 0, ii = fontRegExMatchIndex.length; i < ii; ++i) {
		const value = match[i + 1];
		if (value !== void 0) style[fontRegExMatchIndex[i]] = typeof value === "string" ? value.trim() : value;
	}
	if (isNaN(Number(style.weight)) && style.weight in fontWeights) style.weight = fontWeights[style.weight];
	style.families = style.family.split(/,\s?/).map((f) => f.trim().replace(/^['"]|['"]$/g, ""));
	return style;
};
//#endregion
//#region node_modules/ol/render/canvas.js
/**
* @module ol/render/canvas
*/
/**
* @typedef {'Circle' | 'Image' | 'LineString' | 'Polygon' | 'Text' | 'Default'} BuilderType
*/
/**
* @typedef {Object} FillState
* @property {import("../colorlike.js").ColorLike} fillStyle FillStyle.
*/
/**
* @typedef Label
* @property {number} width Width.
* @property {number} height Height.
* @property {Array<string|number>} contextInstructions ContextInstructions.
*/
/**
* @typedef {Object} FillStrokeState
* @property {import("../colorlike.js").ColorLike} [currentFillStyle] Current FillStyle.
* @property {import("../colorlike.js").ColorLike} [currentStrokeStyle] Current StrokeStyle.
* @property {CanvasLineCap} [currentLineCap] Current LineCap.
* @property {Array<number>} currentLineDash Current LineDash.
* @property {number} [currentLineDashOffset] Current LineDashOffset.
* @property {CanvasLineJoin} [currentLineJoin] Current LineJoin.
* @property {number} [currentLineWidth] Current LineWidth.
* @property {number} [currentMiterLimit] Current MiterLimit.
* @property {number} [currentStrokeOffset] Current StrokeOffset.
* @property {number} [lastStroke] Last stroke.
* @property {import("../colorlike.js").ColorLike} [fillStyle] FillStyle.
* @property {import("../colorlike.js").ColorLike} [strokeStyle] StrokeStyle.
* @property {CanvasLineCap} [lineCap] LineCap.
* @property {Array<number>} lineDash LineDash.
* @property {number} [lineDashOffset] LineDashOffset.
* @property {CanvasLineJoin} [lineJoin] LineJoin.
* @property {number} [lineWidth] LineWidth.
* @property {number} [miterLimit] MiterLimit.
* @property {number} [strokeOffset] StrokeOffset.
* @property {number} [fillPatternScale] Fill pattern scale.
*/
/**
* @typedef {Object} StrokeState
* @property {CanvasLineCap} lineCap LineCap.
* @property {Array<number>} lineDash LineDash.
* @property {number} lineDashOffset LineDashOffset.
* @property {CanvasLineJoin} lineJoin LineJoin.
* @property {number} lineWidth LineWidth.
* @property {number} miterLimit MiterLimit.
* @property {number} [strokeOffset] StrokeOffset.
* @property {import("../colorlike.js").ColorLike} strokeStyle StrokeStyle.
*/
/**
* @typedef {Object} TextState
* @property {string} font Font.
* @property {CanvasTextAlign} [textAlign] TextAlign.
* @property {number} [repeat] Repeat.
* @property {import("../style/Text.js").TextJustify} [justify] Justify.
* @property {CanvasTextBaseline} textBaseline TextBaseline.
* @property {import("../style/Text.js").TextPlacement} [placement] Placement.
* @property {number} [maxAngle] MaxAngle.
* @property {boolean} [overflow] Overflow.
* @property {import("../style/Fill.js").default} [backgroundFill] BackgroundFill.
* @property {import("../style/Stroke.js").default} [backgroundStroke] BackgroundStroke.
* @property {import("../size.js").Size} [scale] Scale.
* @property {Array<number>} [padding] Padding.
*/
/**
* @typedef {Object} SerializableInstructions
* @property {Array<*>} instructions The rendering instructions.
* @property {Array<*>} hitDetectionInstructions The rendering hit detection instructions.
* @property {Array<number>} coordinates The array of all coordinates.
* @property {!Object<string, TextState>} [textStates] The text states (decluttering).
* @property {!Object<string, FillState>} [fillStates] The fill states (decluttering).
* @property {!Object<string, StrokeState>} [strokeStates] The stroke states (decluttering).
*/
/**
* @typedef {Object<number, import("./canvas/Executor.js").ReplayImageOrLabelArgs>} DeclutterImageWithText
*/
/**
* @const
* @type {string}
*/
var defaultFont = "10px sans-serif";
/**
* @const
* @type {string}
*/
var defaultFillStyle = "#000";
/**
* @const
* @type {CanvasLineCap}
*/
var defaultLineCap = "round";
/**
* @const
* @type {Array<number>}
*/
var defaultLineDash = [];
/**
* @const
* @type {CanvasLineJoin}
*/
var defaultLineJoin = "round";
/**
* @const
* @type {import("../colorlike.js").ColorLike}
*/
var defaultStrokeStyle = "#000";
/**
* @const
* @type {CanvasTextAlign}
*/
var defaultTextAlign = "center";
/**
* @const
* @type {CanvasTextBaseline}
*/
var defaultTextBaseline = "middle";
/**
* @const
* @type {Array<number>}
*/
var defaultPadding = [
	0,
	0,
	0,
	0
];
/**
* @type {BaseObject}
*/
var checkedFonts = new BaseObject();
/**
* @type {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D}
*/
var measureContext = null;
/**
* @type {string}
*/
var measureFont;
/**
* @type {!Object<string, number>}
*/
var textHeights = {};
var genericFontFamilies = new Set([
	"serif",
	"sans-serif",
	"monospace",
	"cursive",
	"fantasy",
	"system-ui",
	"ui-serif",
	"ui-sans-serif",
	"ui-monospace",
	"ui-rounded",
	"emoji",
	"math",
	"fangsong"
]);
/**
* @param {string} style Css font-style
* @param {string} weight Css font-weight
* @param {string} family Css font-family
* @return {string} Font key.
*/
function getFontKey(style, weight, family) {
	return `${style} ${weight} 16px "${family}"`;
}
/**
* Clears the label cache when a font becomes available.
* @param {string} fontSpec CSS font spec.
*/
var registerFont = (function() {
	const retries = 100;
	let timeout, fontFaceSet;
	/**
	* @param {string} fontSpec Css font spec
	* @return {Promise<boolean>} Font with style and weight is available
	*/
	function isAvailable(_x) {
		return _isAvailable.apply(this, arguments);
	}
	function _isAvailable() {
		_isAvailable = _asyncToGenerator(function* (fontSpec) {
			yield fontFaceSet.ready;
			const fontFaces = yield fontFaceSet.load(fontSpec);
			if (fontFaces.length === 0) return false;
			const font = getFontParameters(fontSpec);
			const checkFamily = font.families[0].toLowerCase();
			const checkWeight = font.weight;
			return fontFaces.some(
				/**
				* @param {import('../css.js').FontParameters} f Font.
				* @return {boolean} Font matches.
				*/
				(f) => {
					const family = f.family.replace(/^['"]|['"]$/g, "").toLowerCase();
					const weight = fontWeights[f.weight] || f.weight;
					return family === checkFamily && f.style === font.style && weight == checkWeight;
				}
			);
		});
		return _isAvailable.apply(this, arguments);
	}
	function check() {
		return _check.apply(this, arguments);
	}
	function _check() {
		_check = _asyncToGenerator(function* () {
			yield fontFaceSet.ready;
			let done = true;
			const checkedFontsProperties = checkedFonts.getProperties();
			const fonts = Object.keys(checkedFontsProperties).filter((key) => checkedFontsProperties[key] < retries);
			for (let i = fonts.length - 1; i >= 0; --i) {
				const font = fonts[i];
				let currentRetries = checkedFontsProperties[font];
				if (currentRetries < retries) if (yield isAvailable(font)) {
					clear(textHeights);
					checkedFonts.set(font, retries);
				} else {
					currentRetries += 10;
					checkedFonts.set(font, currentRetries, true);
					if (currentRetries < retries) done = false;
				}
			}
			timeout = void 0;
			if (!done) timeout = setTimeout(check, 100);
		});
		return _check.apply(this, arguments);
	}
	return /* @__PURE__ */ function() {
		var _ref = _asyncToGenerator(function* (fontSpec) {
			if (!fontFaceSet) fontFaceSet = WORKER_OFFSCREEN_CANVAS ? self.fonts : document.fonts;
			const font = getFontParameters(fontSpec);
			if (!font) return;
			const families = font.families;
			let needCheck = false;
			for (const family of families) {
				if (genericFontFamilies.has(family)) continue;
				const key = getFontKey(font.style, font.weight, family);
				if (checkedFonts.get(key) !== void 0) continue;
				checkedFonts.set(key, 0, true);
				needCheck = true;
			}
			if (needCheck) {
				clearTimeout(timeout);
				timeout = setTimeout(check, 100);
			}
		});
		return function(_x2) {
			return _ref.apply(this, arguments);
		};
	}();
})();
/**
* @param {string} font Font to use for measuring.
* @return {import("../size.js").Size} Measurement.
*/
var measureTextHeight = (function() {
	/**
	* @type {HTMLDivElement}
	*/
	let measureElement;
	return function(fontSpec) {
		let height = textHeights[fontSpec];
		if (height == void 0) {
			if (WORKER_OFFSCREEN_CANVAS) {
				const font = getFontParameters(fontSpec);
				const metrics = measureText(fontSpec, "Žg");
				height = (isNaN(Number(font.lineHeight)) ? 1.2 : Number(font.lineHeight)) * (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
			} else {
				if (!measureElement) {
					measureElement = document.createElement("div");
					measureElement.innerHTML = "M";
					measureElement.style.minHeight = "0";
					measureElement.style.maxHeight = "none";
					measureElement.style.height = "auto";
					measureElement.style.padding = "0";
					measureElement.style.border = "none";
					measureElement.style.position = "absolute";
					measureElement.style.display = "block";
					measureElement.style.left = "-99999px";
				}
				measureElement.style.font = fontSpec;
				document.body.appendChild(measureElement);
				height = measureElement.offsetHeight;
				document.body.removeChild(measureElement);
			}
			textHeights[fontSpec] = height;
		}
		return height;
	};
})();
/**
* @param {string} font Font.
* @param {string} text Text.
* @return {TextMetrics} Text metrics.
*/
function measureText(font, text) {
	if (!measureContext) measureContext = createCanvasContext2D(1, 1);
	if (font != measureFont) {
		measureContext.font = font;
		measureFont = measureContext.font;
	}
	return measureContext.measureText(text);
}
/**
* @param {string} font Font.
* @param {string} text Text.
* @return {number} Width.
*/
function measureTextWidth(font, text) {
	return measureText(font, text).width;
}
/**
* Measure text width using a cache.
* @param {string} font The font.
* @param {string} text The text to measure.
* @param {Object<string, number>} cache A lookup of cached widths by text.
* @return {number} The text width.
*/
function measureAndCacheTextWidth(font, text, cache) {
	if (text in cache) return cache[text];
	const width = text.split("\n").reduce((prev, curr) => Math.max(prev, measureTextWidth(font, curr)), 0);
	cache[text] = width;
	return width;
}
/**
* @param {TextState} baseStyle Base style.
* @param {Array<string>} chunks Text chunks to measure.
* @return {{width: number, height: number, widths: Array<number>, heights: Array<number>, lineWidths: Array<number>}}} Text metrics.
*/
function getTextDimensions(baseStyle, chunks) {
	const widths = [];
	const heights = [];
	const lineWidths = [];
	let width = 0;
	let lineWidth = 0;
	let height = 0;
	let lineHeight = 0;
	for (let i = 0, ii = chunks.length; i <= ii; i += 2) {
		const text = chunks[i];
		if (text === "\n" || i === ii) {
			width = Math.max(width, lineWidth);
			lineWidths.push(lineWidth);
			lineWidth = 0;
			height += lineHeight;
			lineHeight = 0;
			continue;
		}
		const font = chunks[i + 1] || baseStyle.font;
		const currentWidth = measureTextWidth(font, text);
		widths.push(currentWidth);
		lineWidth += currentWidth;
		const currentHeight = measureTextHeight(font);
		heights.push(currentHeight);
		lineHeight = Math.max(lineHeight, currentHeight);
	}
	return {
		width,
		height,
		widths,
		heights,
		lineWidths
	};
}
/**
* @param {CanvasRenderingContext2D|import("../render/canvas/ZIndexContext.js").ZIndexContextProxy} context Context.
* @param {import("../transform.js").Transform|null} transform Transform.
* @param {number} opacity Opacity.
* @param {Label|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} labelOrImage Label.
* @param {number} originX Origin X.
* @param {number} originY Origin Y.
* @param {number} w Width.
* @param {number} h Height.
* @param {number} x X.
* @param {number} y Y.
* @param {import("../size.js").Size} scale Scale.
*/
function drawImageOrLabel(context, transform, opacity, labelOrImage, originX, originY, w, h, x, y, scale) {
	context.save();
	if (opacity !== 1) if (context.globalAlpha === void 0) context.globalAlpha = (context) => context.globalAlpha *= opacity;
	else context.globalAlpha *= opacity;
	if (transform) context.transform.apply(context, transform);
	if (labelOrImage.contextInstructions) {
		context.translate(x, y);
		context.scale(scale[0], scale[1]);
		executeLabelInstructions(labelOrImage, context);
	} else if (scale[0] < 0 || scale[1] < 0) {
		context.translate(x, y);
		context.scale(scale[0], scale[1]);
		context.drawImage(labelOrImage, originX, originY, w, h, 0, 0, w, h);
	} else context.drawImage(labelOrImage, originX, originY, w, h, x, y, w * scale[0], h * scale[1]);
	context.restore();
}
/**
* @param {Label} label Label.
* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context Context.
*/
function executeLabelInstructions(label, context) {
	const contextInstructions = label.contextInstructions;
	for (let i = 0, ii = contextInstructions.length; i < ii; i += 2) if (Array.isArray(contextInstructions[i + 1])) context[contextInstructions[i]].apply(context, contextInstructions[i + 1]);
	else context[contextInstructions[i]] = contextInstructions[i + 1];
}
//#endregion
//#region node_modules/ol/style/Image.js
/**
* @module ol/style/Image
*/
/**
* @typedef {Object} Options
* @property {number} opacity Opacity.
* @property {boolean} rotateWithView If the image should get rotated with the view.
* @property {number} rotation Rotation.
* @property {number|import("../size.js").Size} scale Scale.
* @property {Array<number>} displacement Displacement.
* @property {import('../style/Style.js').DeclutterMode} declutterMode Declutter mode: `declutter`, `obstacle`, `none`.
*/
/**
* @classdesc
* A base class used for creating subclasses and not instantiated in
* apps. Base class for {@link module:ol/style/Icon~Icon}, {@link module:ol/style/Circle~CircleStyle} and
* {@link module:ol/style/RegularShape~RegularShape}.
* @abstract
* @api
*/
var ImageStyle = class ImageStyle {
	/**
	* @param {Options} options Options.
	*/
	constructor(options) {
		/**
		* @private
		* @type {number}
		*/
		this.opacity_ = options.opacity;
		/**
		* @private
		* @type {boolean}
		*/
		this.rotateWithView_ = options.rotateWithView;
		/**
		* @private
		* @type {number}
		*/
		this.rotation_ = options.rotation;
		/**
		* @private
		* @type {number|import("../size.js").Size}
		*/
		this.scale_ = options.scale;
		/**
		* @private
		* @type {import("../size.js").Size}
		*/
		this.scaleArray_ = toSize(options.scale);
		/**
		* @private
		* @type {Array<number>}
		*/
		this.displacement_ = options.displacement;
		/**
		* @private
		* @type {import('../style/Style.js').DeclutterMode}
		*/
		this.declutterMode_ = options.declutterMode;
	}
	/**
	* Clones the style.
	* @return {ImageStyle} The cloned style.
	* @api
	*/
	clone() {
		const scale = this.getScale();
		return new ImageStyle({
			opacity: this.getOpacity(),
			scale: Array.isArray(scale) ? scale.slice() : scale,
			rotation: this.getRotation(),
			rotateWithView: this.getRotateWithView(),
			displacement: this.getDisplacement().slice(),
			declutterMode: this.getDeclutterMode()
		});
	}
	/**
	* Get the symbolizer opacity.
	* @return {number} Opacity.
	* @api
	*/
	getOpacity() {
		return this.opacity_;
	}
	/**
	* Determine whether the symbolizer rotates with the map.
	* @return {boolean} Rotate with map.
	* @api
	*/
	getRotateWithView() {
		return this.rotateWithView_;
	}
	/**
	* Get the symoblizer rotation.
	* @return {number} Rotation.
	* @api
	*/
	getRotation() {
		return this.rotation_;
	}
	/**
	* Get the symbolizer scale.
	* @return {number|import("../size.js").Size} Scale.
	* @api
	*/
	getScale() {
		return this.scale_;
	}
	/**
	* Get the symbolizer scale array.
	* @return {import("../size.js").Size} Scale array.
	*/
	getScaleArray() {
		return this.scaleArray_;
	}
	/**
	* Get the displacement of the shape
	* @return {Array<number>} Shape's center displacement
	* @api
	*/
	getDisplacement() {
		return this.displacement_;
	}
	/**
	* Get the declutter mode of the shape
	* @return {import("./Style.js").DeclutterMode} Shape's declutter mode
	* @api
	*/
	getDeclutterMode() {
		return this.declutterMode_;
	}
	/**
	* Get the anchor point in pixels. The anchor determines the center point for the
	* symbolizer.
	* @abstract
	* @return {Array<number>} Anchor.
	*/
	getAnchor() {
		return abstract();
	}
	/**
	* Get the image element for the symbolizer.
	* @abstract
	* @param {number} pixelRatio Pixel ratio.
	* @return {import('../DataTile.js').ImageLike} Image element.
	*/
	getImage(pixelRatio) {
		return abstract();
	}
	/**
	* @abstract
	* @return {import('../DataTile.js').ImageLike} Image element.
	*/
	getHitDetectionImage() {
		return abstract();
	}
	/**
	* Get the image pixel ratio.
	* @param {number} pixelRatio Pixel ratio.
	* @return {number} Pixel ratio.
	*/
	getPixelRatio(pixelRatio) {
		return 1;
	}
	/**
	* @abstract
	* @return {import("../ImageState.js").default} Image state.
	*/
	getImageState() {
		return abstract();
	}
	/**
	* @abstract
	* @return {import("../size.js").Size} Image size.
	*/
	getImageSize() {
		return abstract();
	}
	/**
	* Get the origin of the symbolizer.
	* @abstract
	* @return {Array<number>} Origin.
	*/
	getOrigin() {
		return abstract();
	}
	/**
	* Get the size of the symbolizer (in pixels).
	* @abstract
	* @return {import("../size.js").Size} Size.
	*/
	getSize() {
		return abstract();
	}
	/**
	* Set the displacement.
	*
	* @param {Array<number>} displacement Displacement.
	* @api
	*/
	setDisplacement(displacement) {
		this.displacement_ = displacement;
	}
	/**
	* Set the opacity.
	*
	* @param {number} opacity Opacity.
	* @api
	*/
	setOpacity(opacity) {
		this.opacity_ = opacity;
	}
	/**
	* Set whether to rotate the style with the view.
	*
	* @param {boolean} rotateWithView Rotate with map.
	* @api
	*/
	setRotateWithView(rotateWithView) {
		this.rotateWithView_ = rotateWithView;
	}
	/**
	* Set the rotation.
	*
	* @param {number} rotation Rotation.
	* @api
	*/
	setRotation(rotation) {
		this.rotation_ = rotation;
	}
	/**
	* Set the scale.
	*
	* @param {number|import("../size.js").Size} scale Scale.
	* @api
	*/
	setScale(scale) {
		this.scale_ = scale;
		this.scaleArray_ = toSize(scale);
	}
	/**
	* @abstract
	* @param {function(import("../events/Event.js").default): void} listener Listener function.
	*/
	listenImageChange(listener) {
		abstract();
	}
	/**
	* Load not yet loaded URI.
	* @abstract
	*/
	load() {
		abstract();
	}
	/**
	* @abstract
	* @param {function(import("../events/Event.js").default): void} listener Listener function.
	*/
	unlistenImageChange(listener) {
		abstract();
	}
	/**
	* @return {Promise<void>} `false` or Promise that resolves when the style is ready to use.
	*/
	ready() {
		return Promise.resolve();
	}
};
//#endregion
//#region node_modules/ol/style/Icon.js
/**
* @module ol/style/Icon
*/
/**
* @typedef {'fraction' | 'pixels'} IconAnchorUnits
* Anchor unit can be either a fraction of the icon size or in pixels.
*/
/**
* @typedef {'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'} IconOrigin
* Icon origin. One of 'bottom-left', 'bottom-right', 'top-left', 'top-right'.
*/
/**
* @typedef {Object} Options
* @property {Array<number>} [anchor=[0.5, 0.5]] Anchor. Default value is the icon center.
* @property {IconOrigin} [anchorOrigin='top-left'] Origin of the anchor: `bottom-left`, `bottom-right`,
* `top-left` or `top-right`.
* @property {IconAnchorUnits} [anchorXUnits='fraction'] Units in which the anchor x value is
* specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
* the x value in pixels.
* @property {IconAnchorUnits} [anchorYUnits='fraction'] Units in which the anchor y value is
* specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
* the y value in pixels.
* @property {import("../color.js").Color|string} [color] Color to tint the icon. If not specified,
* the icon will be left as is.
* @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images. Note that you must provide a
* `crossOrigin` value if you want to access pixel data with the Canvas renderer.
* See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
* @property {ReferrerPolicy} [referrerPolicy] The `referrerPolicy` property for loaded images.
* @property {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} [img] Image object for the icon.
* @property {Array<number>} [displacement=[0, 0]] Displacement of the icon in pixels.
* Positive values will shift the icon right and up.
* @property {number} [opacity=1] Opacity of the icon.
* @property {number} [width] The width of the icon in pixels. This can't be used together with `scale`.
* @property {number} [height] The height of the icon in pixels. This can't be used together with `scale`.
* @property {number|import("../size.js").Size} [scale=1] Scale.
* @property {boolean} [rotateWithView=false] Whether to rotate the icon with the view.
* @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
* @property {Array<number>} [offset=[0, 0]] Offset which, together with `size` and `offsetOrigin`, defines the
* sub-rectangle to use from the original (sprite) image.
* @property {IconOrigin} [offsetOrigin='top-left'] Origin of the offset: `bottom-left`, `bottom-right`,
* `top-left` or `top-right`.
* @property {import("../size.js").Size} [size] Icon size in pixels. Used together with `offset` to define the
* sub-rectangle to use from the original (sprite) image.
* @property {string} [src] Image source URI.
* @property {import("./Style.js").DeclutterMode} [declutterMode] Declutter mode.
*/
/**
* @param {number} width The width.
* @param {number} height The height.
* @param {number|undefined} wantedWidth The wanted width.
* @param {number|undefined} wantedHeight The wanted height.
* @return {number|Array<number>} The scale.
*/
function calculateScale(width, height, wantedWidth, wantedHeight) {
	if (wantedWidth !== void 0 && wantedHeight !== void 0) return [wantedWidth / width, wantedHeight / height];
	if (wantedWidth !== void 0) return wantedWidth / width;
	if (wantedHeight !== void 0) return wantedHeight / height;
	return 1;
}
/**
* @classdesc
* Set icon style for vector features.
* @api
*/
var Icon = class Icon extends ImageStyle {
	/**
	* @param {Options} [options] Options.
	*/
	constructor(options) {
		options = options || {};
		/**
		* @type {number}
		*/
		const opacity = options.opacity !== void 0 ? options.opacity : 1;
		/**
		* @type {number}
		*/
		const rotation = options.rotation !== void 0 ? options.rotation : 0;
		/**
		* @type {number|import("../size.js").Size}
		*/
		const scale = options.scale !== void 0 ? options.scale : 1;
		/**
		* @type {boolean}
		*/
		const rotateWithView = options.rotateWithView !== void 0 ? options.rotateWithView : false;
		super({
			opacity,
			rotation,
			scale,
			displacement: options.displacement !== void 0 ? options.displacement : [0, 0],
			rotateWithView,
			declutterMode: options.declutterMode
		});
		/**
		* @private
		* @type {Array<number>}
		*/
		this.anchor_ = options.anchor !== void 0 ? options.anchor : [.5, .5];
		/**
		* @private
		* @type {Array<number>}
		*/
		this.normalizedAnchor_ = null;
		/**
		* @private
		* @type {IconOrigin}
		*/
		this.anchorOrigin_ = options.anchorOrigin !== void 0 ? options.anchorOrigin : "top-left";
		/**
		* @private
		* @type {IconAnchorUnits}
		*/
		this.anchorXUnits_ = options.anchorXUnits !== void 0 ? options.anchorXUnits : "fraction";
		/**
		* @private
		* @type {IconAnchorUnits}
		*/
		this.anchorYUnits_ = options.anchorYUnits !== void 0 ? options.anchorYUnits : "fraction";
		/**
		* @private
		* @type {?string}
		*/
		this.crossOrigin_ = options.crossOrigin !== void 0 ? options.crossOrigin : null;
		/**
		* @private
		* @type {ReferrerPolicy}
		*/
		this.referrerPolicy_ = options.referrerPolicy;
		const image = options.img !== void 0 ? options.img : null;
		let cacheKey = options.src;
		assert(!(cacheKey !== void 0 && image), "`image` and `src` cannot be provided at the same time");
		if ((cacheKey === void 0 || cacheKey.length === 0) && image) cacheKey = image.src || getUid(image);
		assert(cacheKey !== void 0 && cacheKey.length > 0, "A defined and non-empty `src` or `image` must be provided");
		assert(!((options.width !== void 0 || options.height !== void 0) && options.scale !== void 0), "`width` or `height` cannot be provided together with `scale`");
		let imageState;
		if (options.src !== void 0) imageState = ImageState_default.IDLE;
		else if (image !== void 0) if ("complete" in image) if (image.complete) imageState = image.src ? ImageState_default.LOADED : ImageState_default.IDLE;
		else imageState = ImageState_default.LOADING;
		else imageState = ImageState_default.LOADED;
		/**
		* @private
		* @type {import("../color.js").Color}
		*/
		this.color_ = options.color !== void 0 ? asArray(options.color) : null;
		/**
		* @private
		* @type {import("./IconImage.js").default}
		*/
		this.iconImage_ = get(image, cacheKey, {
			crossOrigin: this.crossOrigin_,
			referrerPolicy: this.referrerPolicy_
		}, imageState, this.color_);
		/**
		* @private
		* @type {Array<number>}
		*/
		this.offset_ = options.offset !== void 0 ? options.offset : [0, 0];
		/**
		* @private
		* @type {IconOrigin}
		*/
		this.offsetOrigin_ = options.offsetOrigin !== void 0 ? options.offsetOrigin : "top-left";
		/**
		* @private
		* @type {Array<number>}
		*/
		this.origin_ = null;
		/**
		* @private
		* @type {import("../size.js").Size}
		*/
		this.size_ = options.size !== void 0 ? options.size : null;
		/**
		* @private
		*/
		this.initialOptions_;
		/**
		* Calculate the scale if width or height were given.
		*/
		if (options.width !== void 0 || options.height !== void 0) {
			let width, height;
			if (options.size) [width, height] = options.size;
			else {
				const image = this.getImage(1);
				if (image.width && image.height) {
					width = image.width;
					height = image.height;
				} else if (image instanceof HTMLImageElement) {
					this.initialOptions_ = options;
					const onload = () => {
						this.unlistenImageChange(onload);
						if (!this.initialOptions_) return;
						const imageSize = this.iconImage_.getSize();
						this.setScale(calculateScale(imageSize[0], imageSize[1], options.width, options.height));
					};
					this.listenImageChange(onload);
					return;
				}
			}
			if (width !== void 0) this.setScale(calculateScale(width, height, options.width, options.height));
		}
	}
	/**
	* Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
	* @return {Icon} The cloned style.
	* @api
	* @override
	*/
	clone() {
		let scale, width, height;
		if (this.initialOptions_) {
			width = this.initialOptions_.width;
			height = this.initialOptions_.height;
		} else {
			scale = this.getScale();
			scale = Array.isArray(scale) ? scale.slice() : scale;
		}
		return new Icon({
			anchor: this.anchor_.slice(),
			anchorOrigin: this.anchorOrigin_,
			anchorXUnits: this.anchorXUnits_,
			anchorYUnits: this.anchorYUnits_,
			color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || void 0,
			crossOrigin: this.crossOrigin_,
			referrerPolicy: this.referrerPolicy_,
			offset: this.offset_.slice(),
			offsetOrigin: this.offsetOrigin_,
			opacity: this.getOpacity(),
			rotateWithView: this.getRotateWithView(),
			rotation: this.getRotation(),
			scale,
			width,
			height,
			size: this.size_ !== null ? this.size_.slice() : void 0,
			src: this.getSrc(),
			displacement: this.getDisplacement().slice(),
			declutterMode: this.getDeclutterMode()
		});
	}
	/**
	* Get the anchor point in pixels. The anchor determines the center point for the
	* symbolizer.
	* @return {Array<number>} Anchor.
	* @api
	* @override
	*/
	getAnchor() {
		let anchor = this.normalizedAnchor_;
		if (!anchor) {
			anchor = this.anchor_;
			const size = this.getSize();
			if (this.anchorXUnits_ == "fraction" || this.anchorYUnits_ == "fraction") {
				if (!size) return null;
				anchor = this.anchor_.slice();
				if (this.anchorXUnits_ == "fraction") anchor[0] *= size[0];
				if (this.anchorYUnits_ == "fraction") anchor[1] *= size[1];
			}
			if (this.anchorOrigin_ != "top-left") {
				if (!size) return null;
				if (anchor === this.anchor_) anchor = this.anchor_.slice();
				if (this.anchorOrigin_ == "top-right" || this.anchorOrigin_ == "bottom-right") anchor[0] = -anchor[0] + size[0];
				if (this.anchorOrigin_ == "bottom-left" || this.anchorOrigin_ == "bottom-right") anchor[1] = -anchor[1] + size[1];
			}
			this.normalizedAnchor_ = anchor;
		}
		const displacement = this.getDisplacement();
		const scale = this.getScaleArray();
		return [anchor[0] - displacement[0] / scale[0], anchor[1] + displacement[1] / scale[1]];
	}
	/**
	* Set the anchor point. The anchor determines the center point for the
	* symbolizer.
	*
	* @param {Array<number>} anchor Anchor.
	* @api
	*/
	setAnchor(anchor) {
		this.anchor_ = anchor;
		this.normalizedAnchor_ = null;
	}
	/**
	* Get the icon color.
	* @return {import("../color.js").Color} Color.
	* @api
	*/
	getColor() {
		return this.color_;
	}
	/**
	* Set the icon color.
	*
	* Warning: Repeatedly setting the color on an icon style
	* causes the icon image to be re-created each time. This can have a
	* severe performance impact.
	*
	* @param {import("../color.js").Color|string|null|undefined} color Color.
	*/
	setColor(color) {
		const nextColor = color ? asArray(color) : null;
		if (this.color_ === nextColor || this.color_ && nextColor && this.color_.length === nextColor.length && this.color_.every((value, index) => value === nextColor[index])) return;
		this.color_ = nextColor;
		const src = this.getSrc();
		const image = src !== void 0 ? null : this.getHitDetectionImage();
		const imageState = src !== void 0 ? ImageState_default.IDLE : this.iconImage_.getImageState();
		this.iconImage_ = get(image, src, {
			crossOrigin: this.crossOrigin_,
			referrerPolicy: this.referrerPolicy_
		}, imageState, this.color_);
	}
	/**
	* Get the image icon.
	* @param {number} pixelRatio Pixel ratio.
	* @return {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} Image or Canvas element. If the Icon
	* style was configured with `src` or with a not let loaded `img`, an `ImageBitmap` will be returned.
	* @api
	* @override
	*/
	getImage(pixelRatio) {
		return this.iconImage_.getImage(pixelRatio);
	}
	/**
	* Get the pixel ratio.
	* @param {number} pixelRatio Pixel ratio.
	* @return {number} The pixel ratio of the image.
	* @api
	* @override
	*/
	getPixelRatio(pixelRatio) {
		return this.iconImage_.getPixelRatio(pixelRatio);
	}
	/**
	* @return {import("../size.js").Size} Image size.
	* @override
	*/
	getImageSize() {
		return this.iconImage_.getSize();
	}
	/**
	* @return {import("../ImageState.js").default} Image state.
	* @override
	*/
	getImageState() {
		return this.iconImage_.getImageState();
	}
	/**
	* @return {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} Image element.
	* @override
	*/
	getHitDetectionImage() {
		return this.iconImage_.getHitDetectionImage();
	}
	/**
	* Get the origin of the symbolizer.
	* @return {Array<number>} Origin.
	* @api
	* @override
	*/
	getOrigin() {
		if (this.origin_) return this.origin_;
		let offset = this.offset_;
		if (this.offsetOrigin_ != "top-left") {
			const size = this.getSize();
			const iconImageSize = this.iconImage_.getSize();
			if (!size || !iconImageSize) return null;
			offset = offset.slice();
			if (this.offsetOrigin_ == "top-right" || this.offsetOrigin_ == "bottom-right") offset[0] = iconImageSize[0] - size[0] - offset[0];
			if (this.offsetOrigin_ == "bottom-left" || this.offsetOrigin_ == "bottom-right") offset[1] = iconImageSize[1] - size[1] - offset[1];
		}
		this.origin_ = offset;
		return this.origin_;
	}
	/**
	* Get the image URL.
	* @return {string|undefined} Image src.
	* @api
	*/
	getSrc() {
		return this.iconImage_.getSrc();
	}
	/**
	* Set the image URI
	* @param {string} src Image source URI
	* @api
	*/
	setSrc(src) {
		this.iconImage_ = get(null, src, {
			crossOrigin: this.crossOrigin_,
			referrerPolicy: this.referrerPolicy_
		}, ImageState_default.IDLE, this.color_);
	}
	/**
	* Get the size of the icon (in pixels).
	* @return {import("../size.js").Size} Image size.
	* @api
	* @override
	*/
	getSize() {
		return !this.size_ ? this.iconImage_.getSize() : this.size_;
	}
	/**
	* Get the width of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
	* @return {number} Icon width (in pixels).
	* @api
	*/
	getWidth() {
		const scale = this.getScaleArray();
		if (this.size_) return this.size_[0] * scale[0];
		if (this.iconImage_.getImageState() == ImageState_default.LOADED) return this.iconImage_.getSize()[0] * scale[0];
	}
	/**
	* Get the height of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
	* @return {number} Icon height (in pixels).
	* @api
	*/
	getHeight() {
		const scale = this.getScaleArray();
		if (this.size_) return this.size_[1] * scale[1];
		if (this.iconImage_.getImageState() == ImageState_default.LOADED) return this.iconImage_.getSize()[1] * scale[1];
	}
	/**
	* Set the scale.
	*
	* @param {number|import("../size.js").Size} scale Scale.
	* @api
	* @override
	*/
	setScale(scale) {
		delete this.initialOptions_;
		super.setScale(scale);
	}
	/**
	* @param {function(import("../events/Event.js").default): void} listener Listener function.
	* @override
	*/
	listenImageChange(listener) {
		this.iconImage_.addEventListener(EventType_default.CHANGE, listener);
	}
	/**
	* Load not yet loaded URI.
	* When rendering a feature with an icon style, the vector renderer will
	* automatically call this method. However, you might want to call this
	* method yourself for preloading or other purposes.
	* @api
	* @override
	*/
	load() {
		this.iconImage_.load();
	}
	/**
	* @param {function(import("../events/Event.js").default): void} listener Listener function.
	* @override
	*/
	unlistenImageChange(listener) {
		this.iconImage_.removeEventListener(EventType_default.CHANGE, listener);
	}
	/**
	* @override
	*/
	ready() {
		return this.iconImage_.ready();
	}
};
//#endregion
//#region node_modules/ol/style/RegularShape.js
/**
* @module ol/style/RegularShape
*/
/**
* Specify radius for regular polygons, or both radius and radius2 for stars.
* @typedef {Object} Options
* @property {import("./Fill.js").default} [fill] Fill style.
* @property {number} points Number of points for stars and regular polygons. In case of a polygon, the number of points
* is the number of sides.
* @property {number} radius Radius of a regular polygon.
* @property {number} [radius2] Second radius to make a star instead of a regular polygon.
* @property {number} [angle=0] Shape's angle in radians. A value of 0 will have one of the shape's points facing up.
* @property {Array<number>} [displacement=[0, 0]] Displacement of the shape in pixels.
* Positive values will shift the shape right and up.
* @property {import("./Stroke.js").default} [stroke] Stroke style.
* @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
* @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view.
* @property {number|import("../size.js").Size} [scale=1] Scale. Unless two dimensional scaling is required a better
* result may be obtained with appropriate settings for `radius` and `radius2`.
* @property {import('./Style.js').DeclutterMode} [declutterMode] Declutter mode.
*/
/**
* @typedef {Object} RenderOptions
* @property {import("../colorlike.js").ColorLike|undefined} strokeStyle StrokeStyle.
* @property {number} strokeWidth StrokeWidth.
* @property {number} size Size.
* @property {CanvasLineCap} lineCap LineCap.
* @property {Array<number>|null} lineDash LineDash.
* @property {number} lineDashOffset LineDashOffset.
* @property {CanvasLineJoin} lineJoin LineJoin.
* @property {number} miterLimit MiterLimit.
*/
/**
* @classdesc
* Set regular shape style for vector features. The resulting shape will be
* a regular polygon when `radius` is provided, or a star when both `radius` and
* `radius2` are provided.
* @api
*/
var RegularShape = class RegularShape extends ImageStyle {
	/**
	* @param {Options} options Options.
	*/
	constructor(options) {
		super({
			opacity: 1,
			rotateWithView: options.rotateWithView !== void 0 ? options.rotateWithView : false,
			rotation: options.rotation !== void 0 ? options.rotation : 0,
			scale: options.scale !== void 0 ? options.scale : 1,
			displacement: options.displacement !== void 0 ? options.displacement : [0, 0],
			declutterMode: options.declutterMode
		});
		/**
		* @private
		* @type {HTMLCanvasElement|OffscreenCanvas|null}
		*/
		this.hitDetectionCanvas_ = null;
		/**
		* @private
		* @type {import("./Fill.js").default|null}
		*/
		this.fill_ = options.fill !== void 0 ? options.fill : null;
		/**
		* @private
		* @type {Array<number>}
		*/
		this.origin_ = [0, 0];
		/**
		* @private
		* @type {number}
		*/
		this.points_ = options.points;
		/**
		* @protected
		* @type {number}
		*/
		this.radius = options.radius;
		/**
		* @private
		* @type {number|undefined}
		*/
		this.radius2_ = options.radius2;
		/**
		* @private
		* @type {number}
		*/
		this.angle_ = options.angle !== void 0 ? options.angle : 0;
		/**
		* @private
		* @type {import("./Stroke.js").default|null}
		*/
		this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
		/**
		* @private
		* @type {import("../size.js").Size}
		*/
		this.size_;
		/**
		* @private
		* @type {RenderOptions}
		*/
		this.renderOptions_;
		/**
		* @private
		*/
		this.imageState_ = this.fill_ && this.fill_.loading() ? ImageState_default.LOADING : ImageState_default.LOADED;
		if (this.imageState_ === ImageState_default.LOADING) this.ready().then(() => this.imageState_ = ImageState_default.LOADED);
		this.render();
	}
	/**
	* Clones the style.
	* @return {RegularShape} The cloned style.
	* @api
	* @override
	*/
	clone() {
		const scale = this.getScale();
		const style = new RegularShape({
			fill: this.getFill() ? this.getFill().clone() : void 0,
			points: this.getPoints(),
			radius: this.getRadius(),
			radius2: this.getRadius2(),
			angle: this.getAngle(),
			stroke: this.getStroke() ? this.getStroke().clone() : void 0,
			rotation: this.getRotation(),
			rotateWithView: this.getRotateWithView(),
			scale: Array.isArray(scale) ? scale.slice() : scale,
			displacement: this.getDisplacement().slice(),
			declutterMode: this.getDeclutterMode()
		});
		style.setOpacity(this.getOpacity());
		return style;
	}
	/**
	* Get the anchor point in pixels. The anchor determines the center point for the
	* symbolizer.
	* @return {Array<number>} Anchor.
	* @api
	* @override
	*/
	getAnchor() {
		const size = this.size_;
		const displacement = this.getDisplacement();
		const scale = this.getScaleArray();
		return [size[0] / 2 - displacement[0] / scale[0], size[1] / 2 + displacement[1] / scale[1]];
	}
	/**
	* Get the angle used in generating the shape.
	* @return {number} Shape's rotation in radians.
	* @api
	*/
	getAngle() {
		return this.angle_;
	}
	/**
	* Get the fill style for the shape.
	* @return {import("./Fill.js").default|null} Fill style.
	* @api
	*/
	getFill() {
		return this.fill_;
	}
	/**
	* Set the fill style.
	* @param {import("./Fill.js").default|null} fill Fill style.
	* @api
	*/
	setFill(fill) {
		this.fill_ = fill;
		this.render();
	}
	/**
	* @return {HTMLCanvasElement|OffscreenCanvas} Image element.
	* @override
	*/
	getHitDetectionImage() {
		if (!this.hitDetectionCanvas_) this.hitDetectionCanvas_ = this.createHitDetectionCanvas_(this.renderOptions_);
		return this.hitDetectionCanvas_;
	}
	/**
	* Get the image icon.
	* @param {number} pixelRatio Pixel ratio.
	* @return {HTMLCanvasElement|OffscreenCanvas} Image or Canvas element.
	* @api
	* @override
	*/
	getImage(pixelRatio) {
		var _this$fill_, _iconImageCache$get;
		const fillKey = (_this$fill_ = this.fill_) === null || _this$fill_ === void 0 ? void 0 : _this$fill_.getKey();
		const cacheKey = `${pixelRatio},${this.angle_},${this.radius},${this.radius2_},${this.points_},${fillKey}` + Object.values(this.renderOptions_).join(",");
		let image = (_iconImageCache$get = shared.get(cacheKey, null)) === null || _iconImageCache$get === void 0 ? void 0 : _iconImageCache$get.getImage(1);
		if (!image) {
			const renderOptions = this.renderOptions_;
			const size = Math.ceil(renderOptions.size * pixelRatio);
			const context = createCanvasContext2D(size, size);
			this.draw_(renderOptions, context, pixelRatio);
			image = context.canvas;
			const iconImage = new IconImage(image, void 0, null, ImageState_default.LOADED, null);
			shared.set(cacheKey, null, iconImage);
			createImageBitmap(image).then((imageBitmap) => {
				iconImage.setImage(imageBitmap);
			});
		}
		return image;
	}
	/**
	* Get the image pixel ratio.
	* @param {number} pixelRatio Pixel ratio.
	* @return {number} Pixel ratio.
	* @override
	*/
	getPixelRatio(pixelRatio) {
		return pixelRatio;
	}
	/**
	* @return {import("../size.js").Size} Image size.
	* @override
	*/
	getImageSize() {
		return this.size_;
	}
	/**
	* @return {import("../ImageState.js").default} Image state.
	* @override
	*/
	getImageState() {
		return this.imageState_;
	}
	/**
	* Get the origin of the symbolizer.
	* @return {Array<number>} Origin.
	* @api
	* @override
	*/
	getOrigin() {
		return this.origin_;
	}
	/**
	* Get the number of points for generating the shape.
	* @return {number} Number of points for stars and regular polygons.
	* @api
	*/
	getPoints() {
		return this.points_;
	}
	/**
	* Get the (primary) radius for the shape.
	* @return {number} Radius.
	* @api
	*/
	getRadius() {
		return this.radius;
	}
	/**
	* Set the (primary) radius for the shape.
	* @param {number} radius Radius.
	* @api
	*/
	setRadius(radius) {
		if (this.radius === radius) return;
		this.radius = radius;
		this.render();
	}
	/**
	* Get the secondary radius for the shape.
	* @return {number|undefined} Radius2.
	* @api
	*/
	getRadius2() {
		return this.radius2_;
	}
	/**
	* Set the secondary radius for the shape.
	* @param {number|undefined} radius2 Radius2.
	* @api
	*/
	setRadius2(radius2) {
		if (this.radius2_ === radius2) return;
		this.radius2_ = radius2;
		this.render();
	}
	/**
	* Get the size of the symbolizer (in pixels).
	* @return {import("../size.js").Size} Size.
	* @api
	* @override
	*/
	getSize() {
		return this.size_;
	}
	/**
	* Get the stroke style for the shape.
	* @return {import("./Stroke.js").default|null} Stroke style.
	* @api
	*/
	getStroke() {
		return this.stroke_;
	}
	/**
	* Set the stroke style.
	* @param {import("./Stroke.js").default|null} stroke Stroke style.
	* @api
	*/
	setStroke(stroke) {
		this.stroke_ = stroke;
		this.render();
	}
	/**
	* @param {function(import("../events/Event.js").default): void} listener Listener function.
	* @override
	*/
	listenImageChange(listener) {}
	/**
	* Load not yet loaded URI.
	* @override
	*/
	load() {}
	/**
	* @param {function(import("../events/Event.js").default): void} listener Listener function.
	* @override
	*/
	unlistenImageChange(listener) {}
	/**
	* Calculate additional canvas size needed for the miter.
	* @param {string} lineJoin Line join
	* @param {number} strokeWidth Stroke width
	* @param {number} miterLimit Miter limit
	* @return {number} Additional canvas size needed
	* @private
	*/
	calculateLineJoinSize_(lineJoin, strokeWidth, miterLimit) {
		if (strokeWidth === 0 || this.points_ === Infinity || lineJoin !== "bevel" && lineJoin !== "miter") return strokeWidth;
		let r1 = this.radius;
		let r2 = this.radius2_ === void 0 ? r1 : this.radius2_;
		if (r1 < r2) {
			const tmp = r1;
			r1 = r2;
			r2 = tmp;
		}
		const points = this.radius2_ === void 0 ? this.points_ : this.points_ * 2;
		const alpha = 2 * Math.PI / points;
		const a = r2 * Math.sin(alpha);
		const b = Math.sqrt(r2 * r2 - a * a);
		const d = r1 - b;
		const e = Math.sqrt(a * a + d * d);
		const miterRatio = e / a;
		if (lineJoin === "miter" && miterRatio <= miterLimit) return miterRatio * strokeWidth;
		const k = strokeWidth / 2 / miterRatio;
		const l = strokeWidth / 2 * (d / e);
		const bevelAdd = Math.sqrt((r1 + k) * (r1 + k) + l * l) - r1;
		if (this.radius2_ === void 0 || lineJoin === "bevel") return bevelAdd * 2;
		const aa = r1 * Math.sin(alpha);
		const bb = Math.sqrt(r1 * r1 - aa * aa);
		const dd = r2 - bb;
		const innerMiterRatio = Math.sqrt(aa * aa + dd * dd) / aa;
		if (innerMiterRatio <= miterLimit) {
			const innerLength = innerMiterRatio * strokeWidth / 2 - r2 - r1;
			return 2 * Math.max(bevelAdd, innerLength);
		}
		return bevelAdd * 2;
	}
	/**
	* @return {RenderOptions}  The render options
	* @protected
	*/
	createRenderOptions() {
		let lineCap = defaultLineCap;
		let lineJoin = defaultLineJoin;
		let miterLimit = 0;
		let lineDash = null;
		let lineDashOffset = 0;
		let strokeStyle;
		let strokeWidth = 0;
		if (this.stroke_) {
			var _this$stroke_$getColo, _this$stroke_$getWidt, _this$stroke_$getLine, _this$stroke_$getLine2, _this$stroke_$getLine3, _this$stroke_$getMite;
			strokeStyle = asColorLike((_this$stroke_$getColo = this.stroke_.getColor()) !== null && _this$stroke_$getColo !== void 0 ? _this$stroke_$getColo : defaultStrokeStyle);
			strokeWidth = (_this$stroke_$getWidt = this.stroke_.getWidth()) !== null && _this$stroke_$getWidt !== void 0 ? _this$stroke_$getWidt : 1;
			lineDash = this.stroke_.getLineDash();
			lineDashOffset = (_this$stroke_$getLine = this.stroke_.getLineDashOffset()) !== null && _this$stroke_$getLine !== void 0 ? _this$stroke_$getLine : 0;
			lineJoin = (_this$stroke_$getLine2 = this.stroke_.getLineJoin()) !== null && _this$stroke_$getLine2 !== void 0 ? _this$stroke_$getLine2 : defaultLineJoin;
			lineCap = (_this$stroke_$getLine3 = this.stroke_.getLineCap()) !== null && _this$stroke_$getLine3 !== void 0 ? _this$stroke_$getLine3 : defaultLineCap;
			miterLimit = (_this$stroke_$getMite = this.stroke_.getMiterLimit()) !== null && _this$stroke_$getMite !== void 0 ? _this$stroke_$getMite : 10;
		}
		const add = this.calculateLineJoinSize_(lineJoin, strokeWidth, miterLimit);
		const maxRadius = Math.max(this.radius, this.radius2_ || 0);
		const size = Math.ceil(2 * maxRadius + add);
		return {
			strokeStyle,
			strokeWidth,
			size,
			lineCap,
			lineDash,
			lineDashOffset,
			lineJoin,
			miterLimit
		};
	}
	/**
	* @protected
	*/
	render() {
		this.renderOptions_ = this.createRenderOptions();
		const size = this.renderOptions_.size;
		this.hitDetectionCanvas_ = null;
		this.size_ = [size, size];
	}
	/**
	* @private
	* @param {RenderOptions} renderOptions Render options.
	* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context The rendering context.
	* @param {number} pixelRatio The pixel ratio.
	*/
	draw_(renderOptions, context, pixelRatio) {
		context.scale(pixelRatio, pixelRatio);
		context.translate(renderOptions.size / 2, renderOptions.size / 2);
		this.createPath_(context);
		if (this.fill_) {
			let color = this.fill_.getColor();
			if (color === null) color = defaultFillStyle;
			context.fillStyle = asColorLike(color);
			context.fill();
		}
		if (renderOptions.strokeStyle) {
			context.strokeStyle = renderOptions.strokeStyle;
			context.lineWidth = renderOptions.strokeWidth;
			if (renderOptions.lineDash) {
				context.setLineDash(renderOptions.lineDash);
				context.lineDashOffset = renderOptions.lineDashOffset;
			}
			context.lineCap = renderOptions.lineCap;
			context.lineJoin = renderOptions.lineJoin;
			context.miterLimit = renderOptions.miterLimit;
			context.stroke();
		}
	}
	/**
	* @private
	* @param {RenderOptions} renderOptions Render options.
	* @return {HTMLCanvasElement|OffscreenCanvas} Canvas containing the icon
	*/
	createHitDetectionCanvas_(renderOptions) {
		let context;
		if (this.fill_) {
			let color = this.fill_.getColor();
			let opacity = 0;
			if (typeof color === "string") color = asArray(color);
			if (color === null) opacity = 1;
			else if (Array.isArray(color)) opacity = color.length === 4 ? color[3] : 1;
			if (opacity === 0) {
				context = createCanvasContext2D(renderOptions.size, renderOptions.size);
				this.drawHitDetectionCanvas_(renderOptions, context);
			}
		}
		return context ? context.canvas : this.getImage(1);
	}
	/**
	* @private
	* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context The context to draw in.
	*/
	createPath_(context) {
		let points = this.points_;
		const radius = this.radius;
		if (points === Infinity) context.arc(0, 0, radius, 0, 2 * Math.PI);
		else {
			const radius2 = this.radius2_ === void 0 ? radius : this.radius2_;
			if (this.radius2_ !== void 0) points *= 2;
			const startAngle = this.angle_ - Math.PI / 2;
			const step = 2 * Math.PI / points;
			for (let i = 0; i < points; i++) {
				const angle0 = startAngle + i * step;
				const radiusC = i % 2 === 0 ? radius : radius2;
				context.lineTo(radiusC * Math.cos(angle0), radiusC * Math.sin(angle0));
			}
			context.closePath();
		}
	}
	/**
	* @private
	* @param {RenderOptions} renderOptions Render options.
	* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context The context.
	*/
	drawHitDetectionCanvas_(renderOptions, context) {
		context.translate(renderOptions.size / 2, renderOptions.size / 2);
		this.createPath_(context);
		context.fillStyle = defaultFillStyle;
		context.fill();
		if (renderOptions.strokeStyle) {
			context.strokeStyle = renderOptions.strokeStyle;
			context.lineWidth = renderOptions.strokeWidth;
			if (renderOptions.lineDash) {
				context.setLineDash(renderOptions.lineDash);
				context.lineDashOffset = renderOptions.lineDashOffset;
			}
			context.lineJoin = renderOptions.lineJoin;
			context.miterLimit = renderOptions.miterLimit;
			context.stroke();
		}
	}
	/**
	* @override
	*/
	ready() {
		return this.fill_ ? this.fill_.ready() : Promise.resolve();
	}
};
//#endregion
//#region node_modules/ol/style/Circle.js
/**
* @module ol/style/Circle
*/
/**
* @typedef {Object} Options
* @property {import("./Fill.js").default} [fill] Fill style.
* @property {number} radius Circle radius.
* @property {import("./Stroke.js").default} [stroke] Stroke style.
* @property {Array<number>} [displacement=[0,0]] displacement
* @property {number|import("../size.js").Size} [scale=1] Scale. A two dimensional scale will produce an ellipse.
* Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `radius`.
* @property {number} [rotation=0] Rotation in radians
* (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
* @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view
* (meaningful only when used in conjunction with a two dimensional scale).
* @property {import('./Style.js').DeclutterMode} [declutterMode] Declutter mode
*/
/**
* @classdesc
* Set circle style for vector features.
* @api
*/
var CircleStyle = class CircleStyle extends RegularShape {
	/**
	* @param {Options} [options] Options.
	*/
	constructor(options) {
		options = options ? options : { radius: 5 };
		super({
			points: Infinity,
			fill: options.fill,
			radius: options.radius,
			stroke: options.stroke,
			scale: options.scale !== void 0 ? options.scale : 1,
			rotation: options.rotation !== void 0 ? options.rotation : 0,
			rotateWithView: options.rotateWithView !== void 0 ? options.rotateWithView : false,
			displacement: options.displacement !== void 0 ? options.displacement : [0, 0],
			declutterMode: options.declutterMode
		});
	}
	/**
	* Clones the style.
	* @return {CircleStyle} The cloned style.
	* @api
	* @override
	*/
	clone() {
		const scale = this.getScale();
		const style = new CircleStyle({
			fill: this.getFill() ? this.getFill().clone() : void 0,
			stroke: this.getStroke() ? this.getStroke().clone() : void 0,
			radius: this.getRadius(),
			scale: Array.isArray(scale) ? scale.slice() : scale,
			rotation: this.getRotation(),
			rotateWithView: this.getRotateWithView(),
			displacement: this.getDisplacement().slice(),
			declutterMode: this.getDeclutterMode()
		});
		style.setOpacity(this.getOpacity());
		return style;
	}
};
//#endregion
//#region node_modules/ol/style/Fill.js
/**
* @module ol/style/Fill
*/
/**
* @typedef {Object} Options
* @property {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} [color=null] A color,
* gradient or pattern.
* See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats. For polygon fills (not for {@link import("./RegularShape.js").default} fills),
* a pattern can also be provided as {@link module:ol/colorlike~PatternDescriptor}.
* Default null; if null, the Canvas/renderer default black will be used.
*/
/**
* @classdesc
* Set fill style for vector features.
* @api
*/
var Fill = class Fill {
	/**
	* @param {Options} [options] Options.
	*/
	constructor(options) {
		options = options || {};
		/**
		* @private
		* @type {import("./IconImage.js").default|null}
		*/
		this.patternImage_ = null;
		/**
		* @private
		* @type {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null}
		*/
		this.color_ = null;
		if (options.color !== void 0) this.setColor(options.color);
	}
	/**
	* Clones the style. The color is not cloned if it is a {@link module:ol/colorlike~ColorLike}.
	* @return {Fill} The cloned style.
	* @api
	*/
	clone() {
		const color = this.getColor();
		return new Fill({ color: Array.isArray(color) ? color.slice() : color || void 0 });
	}
	/**
	* Get the fill color.
	* @return {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} Color.
	* @api
	*/
	getColor() {
		return this.color_;
	}
	/**
	* Set the color.
	*
	* @param {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} color Color.
	* @api
	*/
	setColor(color) {
		if (color !== null && typeof color === "object" && "src" in color) {
			const patternImage = get(null, color.src, { crossOrigin: "anonymous" }, void 0, color.offset ? null : color.color ? color.color : null, !(color.offset && color.size));
			patternImage.ready().then(() => {
				this.patternImage_ = null;
			});
			if (patternImage.getImageState() === ImageState_default.IDLE) patternImage.load();
			if (patternImage.getImageState() === ImageState_default.LOADING) this.patternImage_ = patternImage;
		}
		this.color_ = color;
	}
	/**
	* @return {string} Key of the fill for cache lookup.
	*/
	getKey() {
		const fill = this.getColor();
		if (!fill) return "";
		return fill instanceof CanvasPattern || fill instanceof CanvasGradient ? getUid(fill) : typeof fill === "object" && "src" in fill ? fill.src + ":" + fill.offset : asArray(fill).toString();
	}
	/**
	* @return {boolean} The fill style is loading an image pattern.
	*/
	loading() {
		return !!this.patternImage_;
	}
	/**
	* @return {Promise<void>} `false` or a promise that resolves when the style is ready to use.
	*/
	ready() {
		return this.patternImage_ ? this.patternImage_.ready() : Promise.resolve();
	}
};
//#endregion
//#region node_modules/ol/style/Stroke.js
/**
* @module ol/style/Stroke
*/
/**
* @typedef {Object} Options
* @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [color] A color, gradient or pattern.
* See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
* Default null; if null, the Canvas/renderer default black will be used.
* @property {CanvasLineCap} [lineCap='round'] Line cap style: `butt`, `round`, or `square`.
* @property {CanvasLineJoin} [lineJoin='round'] Line join style: `bevel`, `round`, or `miter`.
* @property {Array<number>} [lineDash] Line dash pattern. Default is `null` (no dash).
* @property {number} [lineDashOffset=0] Line dash offset.
* @property {number} [miterLimit=10] Miter limit.
* @property {number} [offset] Line offset in pixels along the normal. A positive value offsets the line to the right,
* relative to the direction of the line. Default is `undefined` (no offset).
* @property {number} [width] Width.
*/
/**
* @classdesc
* Set stroke style for vector features.
* Note that the defaults given are the Canvas defaults, which will be used if
* option is not defined. The `get` functions return whatever was entered in
* the options; they will not return the default.
* @api
*/
var Stroke = class Stroke {
	/**
	* @param {Options} [options] Options.
	*/
	constructor(options) {
		options = options || {};
		/**
		* @private
		* @type {import("../color.js").Color|import("../colorlike.js").ColorLike}
		*/
		this.color_ = options.color !== void 0 ? options.color : null;
		/**
		* @private
		* @type {CanvasLineCap|undefined}
		*/
		this.lineCap_ = options.lineCap;
		/**
		* @private
		* @type {Array<number>|null}
		*/
		this.lineDash_ = options.lineDash !== void 0 ? options.lineDash : null;
		/**
		* @private
		* @type {number|undefined}
		*/
		this.lineDashOffset_ = options.lineDashOffset;
		/**
		* @private
		* @type {CanvasLineJoin|undefined}
		*/
		this.lineJoin_ = options.lineJoin;
		/**
		* @private
		* @type {number|undefined}
		*/
		this.miterLimit_ = options.miterLimit;
		/**
		* @private
		* @type {number|undefined}
		*/
		this.offset_ = options.offset;
		/**
		* @private
		* @type {number|undefined}
		*/
		this.width_ = options.width;
	}
	/**
	* Clones the style.
	* @return {Stroke} The cloned style.
	* @api
	*/
	clone() {
		const color = this.getColor();
		return new Stroke({
			color: Array.isArray(color) ? color.slice() : color || void 0,
			lineCap: this.getLineCap(),
			lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
			lineDashOffset: this.getLineDashOffset(),
			lineJoin: this.getLineJoin(),
			miterLimit: this.getMiterLimit(),
			offset: this.getOffset(),
			width: this.getWidth()
		});
	}
	/**
	* Get the stroke color.
	* @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
	* @api
	*/
	getColor() {
		return this.color_;
	}
	/**
	* Get the line cap type for the stroke.
	* @return {CanvasLineCap|undefined} Line cap.
	* @api
	*/
	getLineCap() {
		return this.lineCap_;
	}
	/**
	* Get the line dash style for the stroke.
	* @return {Array<number>|null} Line dash.
	* @api
	*/
	getLineDash() {
		return this.lineDash_;
	}
	/**
	* Get the line dash offset for the stroke.
	* @return {number|undefined} Line dash offset.
	* @api
	*/
	getLineDashOffset() {
		return this.lineDashOffset_;
	}
	/**
	* Get the line join type for the stroke.
	* @return {CanvasLineJoin|undefined} Line join.
	* @api
	*/
	getLineJoin() {
		return this.lineJoin_;
	}
	/**
	* Get the miter limit for the stroke.
	* @return {number|undefined} Miter limit.
	* @api
	*/
	getMiterLimit() {
		return this.miterLimit_;
	}
	/**
	* Get the line offset in pixels.
	* @return {number|undefined} Offset.
	* @api
	*/
	getOffset() {
		return this.offset_;
	}
	/**
	* Get the stroke width.
	* @return {number|undefined} Width.
	* @api
	*/
	getWidth() {
		return this.width_;
	}
	/**
	* Set the color.
	*
	* @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
	* @api
	*/
	setColor(color) {
		this.color_ = color;
	}
	/**
	* Set the line cap.
	*
	* @param {CanvasLineCap|undefined} lineCap Line cap.
	* @api
	*/
	setLineCap(lineCap) {
		this.lineCap_ = lineCap;
	}
	/**
	* Set the line dash.
	*
	* @param {Array<number>|null} lineDash Line dash.
	* @api
	*/
	setLineDash(lineDash) {
		this.lineDash_ = lineDash;
	}
	/**
	* Set the line dash offset.
	*
	* @param {number|undefined} lineDashOffset Line dash offset.
	* @api
	*/
	setLineDashOffset(lineDashOffset) {
		this.lineDashOffset_ = lineDashOffset;
	}
	/**
	* Set the line join.
	*
	* @param {CanvasLineJoin|undefined} lineJoin Line join.
	* @api
	*/
	setLineJoin(lineJoin) {
		this.lineJoin_ = lineJoin;
	}
	/**
	* Set the miter limit.
	*
	* @param {number|undefined} miterLimit Miter limit.
	* @api
	*/
	setMiterLimit(miterLimit) {
		this.miterLimit_ = miterLimit;
	}
	/**
	* Set the line offset in pixels.
	*
	* @param {number|undefined} offset Offset.
	* @api
	*/
	setOffset(offset) {
		this.offset_ = offset;
	}
	/**
	* Set the width.
	*
	* @param {number|undefined} width Width.
	* @api
	*/
	setWidth(width) {
		this.width_ = width;
	}
};
//#endregion
//#region node_modules/ol/style/Style.js
/**
* @module ol/style/Style
*/
/**
* Defines how symbols and text are decluttered on layers ith `declutter` set to `true`
* **declutter**: Overlapping symbols and text are decluttered.
* **obstacle**: Symbols and text are rendered, but serve as obstacle for subsequent attempts
*   to place a symbol or text at the same location.
* **none**: No decluttering is done.
*
* @typedef {"declutter"|"obstacle"|"none"} DeclutterMode
*/
/**
* A function that takes a {@link module:ol/Feature~Feature} and a `{number}`
* representing the view's resolution. The function should return a
* {@link module:ol/style/Style~Style} or an array of them. This way e.g. a
* vector layer can be styled. If the function returns `undefined`, the
* feature will not be rendered.
*
* @typedef {function(import("../Feature.js").FeatureLike, number):(Style|Array<Style>|void)} StyleFunction
*/
/**
* A {@link Style}, an array of {@link Style}, or a {@link StyleFunction}.
* @typedef {Style|Array<Style>|StyleFunction} StyleLike
*/
/**
* A function that takes a {@link module:ol/Feature~Feature} as argument and returns an
* {@link module:ol/geom/Geometry~Geometry} that will be rendered and styled for the feature.
*
* @typedef {function(import("../Feature.js").FeatureLike):
*     (import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined)} GeometryFunction
*/
/**
* Custom renderer function. Takes two arguments:
*
* 1. The pixel coordinates of the geometry in GeoJSON notation.
* 2. The {@link module:ol/render~State} of the layer renderer.
*
* @typedef {function((import("../coordinate.js").Coordinate|Array<import("../coordinate.js").Coordinate>|Array<Array<import("../coordinate.js").Coordinate>>|Array<Array<Array<import("../coordinate.js").Coordinate>>>),import("../render.js").State): void} RenderFunction
*/
/**
* @typedef {Object} Options
* @property {string|import("../geom/Geometry.js").default|GeometryFunction} [geometry] Feature property or geometry
* or function returning a geometry to render for this style.
* @property {import("./Fill.js").default} [fill] Fill style.
* @property {import("./Image.js").default} [image] Image style.
* @property {RenderFunction} [renderer] Custom renderer. When configured, `fill`, `stroke` and `image` will be
* ignored, and the provided function will be called with each render frame for each geometry.
* @property {RenderFunction} [hitDetectionRenderer] Custom renderer for hit detection. If provided will be used
* in hit detection rendering.
* @property {import("./Stroke.js").default} [stroke] Stroke style.
* @property {import("./Text.js").default} [text] Text style.
* @property {number} [zIndex] Z index.
*/
/**
* @classdesc
* Container for vector feature rendering styles. Any changes made to the style
* or its children through `set*()` methods will not take effect until the
* feature or layer that uses the style is re-rendered.
*
* ## Feature styles
*
* If no style is defined, the following default style is used:
* ```js
*  import {Circle, Fill, Stroke, Style} from 'ol/style.js';
*
*  const fill = new Fill({
*    color: 'rgba(255,255,255,0.4)',
*  });
*  const stroke = new Stroke({
*    color: '#3399CC',
*    width: 1.25,
*  });
*  const styles = [
*    new Style({
*      image: new Circle({
*        fill: fill,
*        stroke: stroke,
*        radius: 5,
*      }),
*      fill: fill,
*      stroke: stroke,
*    }),
*  ];
* ```
*
* A separate editing style has the following defaults:
* ```js
*  import {Circle, Fill, Stroke, Style} from 'ol/style.js';
*
*  const styles = {};
*  const white = [255, 255, 255, 1];
*  const blue = [0, 153, 255, 1];
*  const width = 3;
*  styles['Polygon'] = [
*    new Style({
*      fill: new Fill({
*        color: [255, 255, 255, 0.5],
*      }),
*    }),
*  ];
*  styles['MultiPolygon'] =
*      styles['Polygon'];
*  styles['LineString'] = [
*    new Style({
*      stroke: new Stroke({
*        color: white,
*        width: width + 2,
*      }),
*    }),
*    new Style({
*      stroke: new Stroke({
*        color: blue,
*        width: width,
*      }),
*    }),
*  ];
*  styles['MultiLineString'] = styles['LineString'];
*
*  styles['Circle'] = styles['Polygon'].concat(
*    styles['LineString']
*  );
*
*  styles['Point'] = [
*    new Style({
*      image: new Circle({
*        radius: width * 2,
*        fill: new Fill({
*          color: blue,
*        }),
*        stroke: new Stroke({
*          color: white,
*          width: width / 2,
*        }),
*      }),
*      zIndex: Infinity,
*    }),
*  ];
*  styles['MultiPoint'] =
*      styles['Point'];
*  styles['GeometryCollection'] =
*      styles['Polygon'].concat(
*          styles['LineString'],
*          styles['Point']
*      );
* ```
*
* @api
*/
var Style = class Style {
	/**
	* @param {Options} [options] Style options.
	*/
	constructor(options) {
		options = options || {};
		/**
		* @private
		* @type {string|import("../geom/Geometry.js").default|GeometryFunction|null}
		*/
		this.geometry_ = null;
		/**
		* @private
		* @type {!GeometryFunction}
		*/
		this.geometryFunction_ = defaultGeometryFunction;
		if (options.geometry !== void 0) this.setGeometry(options.geometry);
		/**
		* @private
		* @type {import("./Fill.js").default|null}
		*/
		this.fill_ = options.fill !== void 0 ? options.fill : null;
		/**
		* @private
		* @type {import("./Image.js").default|null}
		*/
		this.image_ = options.image !== void 0 ? options.image : null;
		/**
		* @private
		* @type {RenderFunction|null}
		*/
		this.renderer_ = options.renderer !== void 0 ? options.renderer : null;
		/**
		* @private
		* @type {RenderFunction|null}
		*/
		this.hitDetectionRenderer_ = options.hitDetectionRenderer !== void 0 ? options.hitDetectionRenderer : null;
		/**
		* @private
		* @type {import("./Stroke.js").default|null}
		*/
		this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
		/**
		* @private
		* @type {import("./Text.js").default|null}
		*/
		this.text_ = options.text !== void 0 ? options.text : null;
		/**
		* @private
		* @type {number|undefined}
		*/
		this.zIndex_ = options.zIndex;
	}
	/**
	* Clones the style.
	* @return {Style} The cloned style.
	* @api
	*/
	clone() {
		var _geometry, _this$getRenderer;
		let geometry = this.getGeometry();
		if (geometry && typeof geometry === "object") geometry = geometry.clone();
		return new Style({
			geometry: (_geometry = geometry) !== null && _geometry !== void 0 ? _geometry : void 0,
			fill: this.getFill() ? this.getFill().clone() : void 0,
			image: this.getImage() ? this.getImage().clone() : void 0,
			renderer: (_this$getRenderer = this.getRenderer()) !== null && _this$getRenderer !== void 0 ? _this$getRenderer : void 0,
			stroke: this.getStroke() ? this.getStroke().clone() : void 0,
			text: this.getText() ? this.getText().clone() : void 0,
			zIndex: this.getZIndex()
		});
	}
	/**
	* Get the custom renderer function that was configured with
	* {@link #setRenderer} or the `renderer` constructor option.
	* @return {RenderFunction|null} Custom renderer function.
	* @api
	*/
	getRenderer() {
		return this.renderer_;
	}
	/**
	* Sets a custom renderer function for this style. When set, `fill`, `stroke`
	* and `image` options of the style will be ignored.
	* @param {RenderFunction|null} renderer Custom renderer function.
	* @api
	*/
	setRenderer(renderer) {
		this.renderer_ = renderer;
	}
	/**
	* Sets a custom renderer function for this style used
	* in hit detection.
	* @param {RenderFunction|null} renderer Custom renderer function.
	* @api
	*/
	setHitDetectionRenderer(renderer) {
		this.hitDetectionRenderer_ = renderer;
	}
	/**
	* Get the custom renderer function that was configured with
	* {@link #setHitDetectionRenderer} or the `hitDetectionRenderer` constructor option.
	* @return {RenderFunction|null} Custom renderer function.
	* @api
	*/
	getHitDetectionRenderer() {
		return this.hitDetectionRenderer_;
	}
	/**
	* Get the geometry to be rendered.
	* @return {string|import("../geom/Geometry.js").default|GeometryFunction|null}
	* Feature property or geometry or function that returns the geometry that will
	* be rendered with this style.
	* @api
	*/
	getGeometry() {
		return this.geometry_;
	}
	/**
	* Get the function used to generate a geometry for rendering.
	* @return {!GeometryFunction} Function that is called with a feature
	* and returns the geometry to render instead of the feature's geometry.
	* @api
	*/
	getGeometryFunction() {
		return this.geometryFunction_;
	}
	/**
	* Get the fill style.
	* @return {import("./Fill.js").default|null} Fill style.
	* @api
	*/
	getFill() {
		return this.fill_;
	}
	/**
	* Set the fill style.
	* @param {import("./Fill.js").default|null} fill Fill style.
	* @api
	*/
	setFill(fill) {
		this.fill_ = fill;
	}
	/**
	* Get the image style.
	* @return {import("./Image.js").default|null} Image style.
	* @api
	*/
	getImage() {
		return this.image_;
	}
	/**
	* Set the image style.
	* @param {import("./Image.js").default} image Image style.
	* @api
	*/
	setImage(image) {
		this.image_ = image;
	}
	/**
	* Get the stroke style.
	* @return {import("./Stroke.js").default|null} Stroke style.
	* @api
	*/
	getStroke() {
		return this.stroke_;
	}
	/**
	* Set the stroke style.
	* @param {import("./Stroke.js").default|null} stroke Stroke style.
	* @api
	*/
	setStroke(stroke) {
		this.stroke_ = stroke;
	}
	/**
	* Get the text style.
	* @return {import("./Text.js").default|null} Text style.
	* @api
	*/
	getText() {
		return this.text_;
	}
	/**
	* Set the text style.
	* @param {import("./Text.js").default} text Text style.
	* @api
	*/
	setText(text) {
		this.text_ = text;
	}
	/**
	* Get the z-index for the style.
	* @return {number|undefined} ZIndex.
	* @api
	*/
	getZIndex() {
		return this.zIndex_;
	}
	/**
	* Set a geometry that is rendered instead of the feature's geometry.
	*
	* @param {string|import("../geom/Geometry.js").default|GeometryFunction|null} geometry
	*     Feature property or geometry or function returning a geometry to render
	*     for this style.
	* @api
	*/
	setGeometry(geometry) {
		if (typeof geometry === "function") this.geometryFunction_ = geometry;
		else if (typeof geometry === "string") this.geometryFunction_ = function(feature) {
			return feature.get(geometry);
		};
		else if (!geometry) this.geometryFunction_ = defaultGeometryFunction;
		else if (geometry !== void 0) this.geometryFunction_ = function() {
			return geometry;
		};
		this.geometry_ = geometry;
	}
	/**
	* Set the z-index.
	*
	* @param {number|undefined} zIndex ZIndex.
	* @api
	*/
	setZIndex(zIndex) {
		this.zIndex_ = zIndex;
	}
};
/**
* Convert the provided object into a style function.  Functions passed through
* unchanged.  Arrays of Style or single style objects wrapped in a
* new style function.
* @param {StyleFunction|Array<Style>|Style} obj
*     A style function, a single style, or an array of styles.
* @return {StyleFunction} A style function.
*/
function toFunction(obj) {
	let styleFunction;
	if (typeof obj === "function") styleFunction = obj;
	else {
		/**
		* @type {Array<Style>}
		*/
		let styles;
		if (Array.isArray(obj)) styles = obj;
		else {
			assert(typeof obj.getZIndex === "function", "Expected an `Style` or an array of `Style`");
			styles = [obj];
		}
		styleFunction = function() {
			return styles;
		};
	}
	return styleFunction;
}
/**
* @type {Array<Style>|null}
*/
var defaultStyles = null;
/**
* @param {import("../Feature.js").FeatureLike} feature Feature.
* @param {number} resolution Resolution.
* @return {Array<Style>} Style.
*/
function createDefaultStyle(feature, resolution) {
	if (!defaultStyles) {
		const fill = new Fill({ color: "rgba(255,255,255,0.4)" });
		const stroke = new Stroke({
			color: "#3399CC",
			width: 1.25
		});
		defaultStyles = [new Style({
			image: new CircleStyle({
				fill,
				stroke,
				radius: 5
			}),
			fill,
			stroke
		})];
	}
	return defaultStyles;
}
/**
* Default styles for editing features.
* @return {Object<import("../geom/Geometry.js").Type, Array<Style>>} Styles
*/
function createEditingStyle() {
	/** @type {Object<import("../geom/Geometry.js").Type, Array<Style>>} */
	const styles = {};
	const white = [
		255,
		255,
		255,
		1
	];
	const blue = [
		0,
		153,
		255,
		1
	];
	const width = 3;
	styles["Polygon"] = [new Style({ fill: new Fill({ color: [
		255,
		255,
		255,
		.5
	] }) })];
	styles["MultiPolygon"] = styles["Polygon"];
	styles["LineString"] = [new Style({ stroke: new Stroke({
		color: white,
		width: 5
	}) }), new Style({ stroke: new Stroke({
		color: blue,
		width
	}) })];
	styles["MultiLineString"] = styles["LineString"];
	styles["Circle"] = styles["Polygon"].concat(styles["LineString"]);
	styles["Point"] = [new Style({
		image: new CircleStyle({
			radius: width * 2,
			fill: new Fill({ color: blue }),
			stroke: new Stroke({
				color: white,
				width: width / 2
			})
		}),
		zIndex: Infinity
	})];
	styles["MultiPoint"] = styles["Point"];
	styles["GeometryCollection"] = styles["Polygon"].concat(styles["LineString"], styles["Point"]);
	return styles;
}
/**
* Function that is called with a feature and returns its default geometry.
* @param {import("../Feature.js").FeatureLike} feature Feature to get the geometry for.
* @return {import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined} Geometry to render.
*/
function defaultGeometryFunction(feature) {
	return feature.getGeometry();
}
//#endregion
//#region node_modules/ol/style/Text.js
/**
* @module ol/style/Text
*/
/**
* @typedef {'point' | 'line'} TextPlacement
* Default text placement is `'point'`. Note that
* `'line'` requires the underlying geometry to be a {@link module:ol/geom/LineString~LineString},
* {@link module:ol/geom/Polygon~Polygon}, {@link module:ol/geom/MultiLineString~MultiLineString} or
* {@link module:ol/geom/MultiPolygon~MultiPolygon}.
*/
/**
* @typedef {'left' | 'center' | 'right'} TextJustify
*/
/**
* The default fill color to use if no fill was set at construction time; a
* blackish `#333`.
*
* @const {string}
*/
var DEFAULT_FILL_COLOR = "#333";
/**
* @typedef {Object} Options
* @property {string} [font] Font style as CSS `font` value, see:
* https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is `'10px sans-serif'`
* @property {number} [maxAngle=Math.PI/4] When `placement` is set to `'line'`, allow a maximum angle between adjacent characters.
* The expected value is in radians, and the default is 45° (`Math.PI / 4`).
* @property {number} [offsetX=0] Horizontal text offset in pixels. A positive will shift the text right.
* @property {number} [offsetY=0] Vertical text offset in pixels. A positive will shift the text down.
* @property {boolean} [overflow=false] For polygon labels or when `placement` is set to `'line'`, allow text to exceed
* the width of the polygon at the label position or the length of the path that it follows.
* @property {TextPlacement} [placement='point'] Text placement.
* @property {number} [repeat] Repeat interval. When set, the text will be repeated at this interval, which specifies
* the distance between two text anchors in pixels. Only available when `placement` is set to `'line'`. Overrides 'textAlign'.
* @property {number|import("../size.js").Size} [scale] Scale.
* @property {boolean} [rotateWithView=false] Whether to rotate the text with the view.
* @property {boolean} [keepUpright=true] Whether the text can be rotated 180° to prevent being rendered upside down.
* @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
* @property {string|Array<string>} [text] Text content or rich text content. For plain text provide a string, which can
* contain line breaks (`\n`). For rich text provide an array of text/font tuples. A tuple consists of the text to
* render and the font to use (or `''` to use the text style's font). A line break has to be a separate tuple (i.e. `'\n', ''`).
* **Example:** `['foo', 'bold 10px sans-serif', ' bar', 'italic 10px sans-serif', ' baz', '']` will yield "**foo** *bar* baz".
* **Note:** Rich text is not supported for `placement: 'line'` or the immediate rendering API.
* @property {CanvasTextAlign} [textAlign] Text alignment. Possible values: `'left'`, `'right'`, `'center'`, `'end'` or `'start'`.
* Default is `'center'` for `placement: 'point'`. For `placement: 'line'`, the default is to let the renderer choose a
* placement where `maxAngle` is not exceeded.
* @property {TextJustify} [justify] Text justification within the text box.
* If not set, text is justified towards the `textAlign` anchor.
* Otherwise, use options `'left'`, `'center'`, or `'right'` to justify the text within the text box.
* **Note:** `justify` is ignored for immediate rendering and also for `placement: 'line'`.
* @property {CanvasTextBaseline} [textBaseline='middle'] Text base line. Possible values: `'bottom'`, `'top'`, `'middle'`, `'alphabetic'`,
* `'hanging'`, `'ideographic'`.
* @property {import("./Fill.js").default|null} [fill] Fill style. If none is provided, we'll use a dark fill-style (#333). Specify `null` for no fill.
* @property {import("./Stroke.js").default} [stroke] Stroke style.
* @property {import("./Fill.js").default} [backgroundFill] Fill style for the text background when `placement` is
* `'point'`. Default is no fill.
* @property {import("./Stroke.js").default} [backgroundStroke] Stroke style for the text background  when `placement`
* is `'point'`. Default is no stroke.
* @property {Array<number>} [padding=[0, 0, 0, 0]] Padding in pixels around the text for decluttering and background. The order of
* values in the array is `[top, right, bottom, left]`.
* @property {import('../style/Style.js').DeclutterMode} [declutterMode] Declutter mode: `declutter`, `obstacle`, `none`
*/
/**
* @classdesc
* Set text style for vector features.
* @api
*/
var Text = class Text {
	/**
	* @param {Options} [options] Options.
	*/
	constructor(options) {
		options = options || {};
		/**
		* @private
		* @type {string|undefined}
		*/
		this.font_ = options.font;
		/**
		* @private
		* @type {number|undefined}
		*/
		this.rotation_ = options.rotation;
		/**
		* @private
		* @type {boolean|undefined}
		*/
		this.rotateWithView_ = options.rotateWithView;
		/**
		* @private
		* @type {boolean|undefined}
		*/
		this.keepUpright_ = options.keepUpright;
		/**
		* @private
		* @type {number|import("../size.js").Size|undefined}
		*/
		this.scale_ = options.scale;
		/**
		* @private
		* @type {import("../size.js").Size}
		*/
		this.scaleArray_ = toSize(options.scale !== void 0 ? options.scale : 1);
		/**
		* @private
		* @type {string|Array<string>|undefined}
		*/
		this.text_ = options.text;
		/**
		* @private
		* @type {CanvasTextAlign|undefined}
		*/
		this.textAlign_ = options.textAlign;
		/**
		* @private
		* @type {TextJustify|undefined}
		*/
		this.justify_ = options.justify;
		/**
		* @private
		* @type {number|undefined}
		*/
		this.repeat_ = options.repeat;
		/**
		* @private
		* @type {CanvasTextBaseline|undefined}
		*/
		this.textBaseline_ = options.textBaseline;
		/**
		* @private
		* @type {import("./Fill.js").default|null}
		*/
		this.fill_ = options.fill !== void 0 ? options.fill : new Fill({ color: DEFAULT_FILL_COLOR });
		/**
		* @private
		* @type {number}
		*/
		this.maxAngle_ = options.maxAngle !== void 0 ? options.maxAngle : Math.PI / 4;
		/**
		* @private
		* @type {TextPlacement}
		*/
		this.placement_ = options.placement !== void 0 ? options.placement : "point";
		/**
		* @private
		* @type {boolean}
		*/
		this.overflow_ = !!options.overflow;
		/**
		* @private
		* @type {import("./Stroke.js").default|null}
		*/
		this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
		/**
		* @private
		* @type {number}
		*/
		this.offsetX_ = options.offsetX !== void 0 ? options.offsetX : 0;
		/**
		* @private
		* @type {number}
		*/
		this.offsetY_ = options.offsetY !== void 0 ? options.offsetY : 0;
		/**
		* @private
		* @type {import("./Fill.js").default|null}
		*/
		this.backgroundFill_ = options.backgroundFill ? options.backgroundFill : null;
		/**
		* @private
		* @type {import("./Stroke.js").default|null}
		*/
		this.backgroundStroke_ = options.backgroundStroke ? options.backgroundStroke : null;
		/**
		* @private
		* @type {Array<number>|null}
		*/
		this.padding_ = options.padding === void 0 ? null : options.padding;
		/**
		* @private
		* @type {import('../style/Style.js').DeclutterMode}
		*/
		this.declutterMode_ = options.declutterMode;
	}
	/**
	* Clones the style.
	* @return {Text} The cloned style.
	* @api
	*/
	clone() {
		const scale = this.getScale();
		return new Text({
			font: this.getFont(),
			placement: this.getPlacement(),
			repeat: this.getRepeat(),
			maxAngle: this.getMaxAngle(),
			overflow: this.getOverflow(),
			rotation: this.getRotation(),
			rotateWithView: this.getRotateWithView(),
			keepUpright: this.getKeepUpright(),
			scale: Array.isArray(scale) ? scale.slice() : scale,
			text: this.getText(),
			textAlign: this.getTextAlign(),
			justify: this.getJustify(),
			textBaseline: this.getTextBaseline(),
			fill: this.getFill() instanceof Fill ? this.getFill().clone() : this.getFill(),
			stroke: this.getStroke() ? this.getStroke().clone() : void 0,
			offsetX: this.getOffsetX(),
			offsetY: this.getOffsetY(),
			backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : void 0,
			backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : void 0,
			padding: this.getPadding() || void 0,
			declutterMode: this.getDeclutterMode()
		});
	}
	/**
	* Get the `overflow` configuration.
	* @return {boolean} Let text overflow the length of the path they follow.
	* @api
	*/
	getOverflow() {
		return this.overflow_;
	}
	/**
	* Get the font name.
	* @return {string|undefined} Font.
	* @api
	*/
	getFont() {
		return this.font_;
	}
	/**
	* Get the maximum angle between adjacent characters.
	* @return {number} Angle in radians.
	* @api
	*/
	getMaxAngle() {
		return this.maxAngle_;
	}
	/**
	* Get the label placement.
	* @return {TextPlacement} Text placement.
	* @api
	*/
	getPlacement() {
		return this.placement_;
	}
	/**
	* Get the repeat interval of the text.
	* @return {number|undefined} Repeat interval in pixels.
	* @api
	*/
	getRepeat() {
		return this.repeat_;
	}
	/**
	* Get the x-offset for the text.
	* @return {number} Horizontal text offset.
	* @api
	*/
	getOffsetX() {
		return this.offsetX_;
	}
	/**
	* Get the y-offset for the text.
	* @return {number} Vertical text offset.
	* @api
	*/
	getOffsetY() {
		return this.offsetY_;
	}
	/**
	* Get the fill style for the text.
	* @return {import("./Fill.js").default|null} Fill style.
	* @api
	*/
	getFill() {
		return this.fill_;
	}
	/**
	* Determine whether the text rotates with the map.
	* @return {boolean|undefined} Rotate with map.
	* @api
	*/
	getRotateWithView() {
		return this.rotateWithView_;
	}
	/**
	* Determine whether the text can be rendered upside down.
	* @return {boolean|undefined} Keep text upright.
	* @api
	*/
	getKeepUpright() {
		return this.keepUpright_;
	}
	/**
	* Get the text rotation.
	* @return {number|undefined} Rotation.
	* @api
	*/
	getRotation() {
		return this.rotation_;
	}
	/**
	* Get the text scale.
	* @return {number|import("../size.js").Size|undefined} Scale.
	* @api
	*/
	getScale() {
		return this.scale_;
	}
	/**
	* Get the symbolizer scale array.
	* @return {import("../size.js").Size} Scale array.
	*/
	getScaleArray() {
		return this.scaleArray_;
	}
	/**
	* Get the stroke style for the text.
	* @return {import("./Stroke.js").default|null} Stroke style.
	* @api
	*/
	getStroke() {
		return this.stroke_;
	}
	/**
	* Get the text to be rendered.
	* @return {string|Array<string>|undefined} Text.
	* @api
	*/
	getText() {
		return this.text_;
	}
	/**
	* Get the text alignment.
	* @return {CanvasTextAlign|undefined} Text align.
	* @api
	*/
	getTextAlign() {
		return this.textAlign_;
	}
	/**
	* Get the justification.
	* @return {TextJustify|undefined} Justification.
	* @api
	*/
	getJustify() {
		return this.justify_;
	}
	/**
	* Get the text baseline.
	* @return {CanvasTextBaseline|undefined} Text baseline.
	* @api
	*/
	getTextBaseline() {
		return this.textBaseline_;
	}
	/**
	* Get the background fill style for the text.
	* @return {import("./Fill.js").default|null} Fill style.
	* @api
	*/
	getBackgroundFill() {
		return this.backgroundFill_;
	}
	/**
	* Get the background stroke style for the text.
	* @return {import("./Stroke.js").default|null} Stroke style.
	* @api
	*/
	getBackgroundStroke() {
		return this.backgroundStroke_;
	}
	/**
	* Get the padding for the text.
	* @return {Array<number>|null} Padding.
	* @api
	*/
	getPadding() {
		return this.padding_;
	}
	/**
	* Get the declutter mode of the shape
	* @return {import("./Style.js").DeclutterMode} Shape's declutter mode
	* @api
	*/
	getDeclutterMode() {
		return this.declutterMode_;
	}
	/**
	* Set the `overflow` property.
	*
	* @param {boolean} overflow Let text overflow the path that it follows.
	* @api
	*/
	setOverflow(overflow) {
		this.overflow_ = overflow;
	}
	/**
	* Set the font.
	*
	* @param {string|undefined} font Font.
	* @api
	*/
	setFont(font) {
		this.font_ = font;
	}
	/**
	* Set the maximum angle between adjacent characters.
	*
	* @param {number} maxAngle Angle in radians.
	* @api
	*/
	setMaxAngle(maxAngle) {
		this.maxAngle_ = maxAngle;
	}
	/**
	* Set the x offset.
	*
	* @param {number} offsetX Horizontal text offset.
	* @api
	*/
	setOffsetX(offsetX) {
		this.offsetX_ = offsetX;
	}
	/**
	* Set the y offset.
	*
	* @param {number} offsetY Vertical text offset.
	* @api
	*/
	setOffsetY(offsetY) {
		this.offsetY_ = offsetY;
	}
	/**
	* Set the text placement.
	*
	* @param {TextPlacement} placement Placement.
	* @api
	*/
	setPlacement(placement) {
		this.placement_ = placement;
	}
	/**
	* Set the repeat interval of the text.
	* @param {number|undefined} [repeat] Repeat interval in pixels.
	* @api
	*/
	setRepeat(repeat) {
		this.repeat_ = repeat;
	}
	/**
	* Set whether to rotate the text with the view.
	*
	* @param {boolean} rotateWithView Rotate with map.
	* @api
	*/
	setRotateWithView(rotateWithView) {
		this.rotateWithView_ = rotateWithView;
	}
	/**
	* Set whether the text can be rendered upside down.
	*
	* @param {boolean} keepUpright Keep text upright.
	* @api
	*/
	setKeepUpright(keepUpright) {
		this.keepUpright_ = keepUpright;
	}
	/**
	* Set the fill.
	*
	* @param {import("./Fill.js").default|null} fill Fill style.
	* @api
	*/
	setFill(fill) {
		this.fill_ = fill;
	}
	/**
	* Set the rotation.
	*
	* @param {number|undefined} rotation Rotation.
	* @api
	*/
	setRotation(rotation) {
		this.rotation_ = rotation;
	}
	/**
	* Set the scale.
	*
	* @param {number|import("../size.js").Size|undefined} scale Scale.
	* @api
	*/
	setScale(scale) {
		this.scale_ = scale;
		this.scaleArray_ = toSize(scale !== void 0 ? scale : 1);
	}
	/**
	* Set the stroke.
	*
	* @param {import("./Stroke.js").default|null} stroke Stroke style.
	* @api
	*/
	setStroke(stroke) {
		this.stroke_ = stroke;
	}
	/**
	* Set the text.
	*
	* @param {string|Array<string>|undefined} text Text.
	* @api
	*/
	setText(text) {
		this.text_ = text;
	}
	/**
	* Set the text alignment.
	*
	* @param {CanvasTextAlign|undefined} textAlign Text align.
	* @api
	*/
	setTextAlign(textAlign) {
		this.textAlign_ = textAlign;
	}
	/**
	* Set the justification.
	*
	* @param {TextJustify|undefined} justify Justification.
	* @api
	*/
	setJustify(justify) {
		this.justify_ = justify;
	}
	/**
	* Set the text baseline.
	*
	* @param {CanvasTextBaseline|undefined} textBaseline Text baseline.
	* @api
	*/
	setTextBaseline(textBaseline) {
		this.textBaseline_ = textBaseline;
	}
	/**
	* Set the background fill.
	*
	* @param {import("./Fill.js").default|null} fill Fill style.
	* @api
	*/
	setBackgroundFill(fill) {
		this.backgroundFill_ = fill;
	}
	/**
	* Set the background stroke.
	*
	* @param {import("./Stroke.js").default|null} stroke Stroke style.
	* @api
	*/
	setBackgroundStroke(stroke) {
		this.backgroundStroke_ = stroke;
	}
	/**
	* Set the padding (`[top, right, bottom, left]`).
	*
	* @param {Array<number>|null} padding Padding.
	* @api
	*/
	setPadding(padding) {
		this.padding_ = padding;
	}
};
//#endregion
//#region node_modules/ol/Feature.js
/**
* @module ol/Feature
*/
/**
* @typedef {typeof Feature|typeof import("./render/Feature.js").default} FeatureClass
*/
/**
* @typedef {Feature|import("./render/Feature.js").default} FeatureLike
*/
/***
* @template Return
* @typedef {import("./Observable.js").OnSignature<import("./Observable.js").EventTypes, import("./events/Event.js").default, Return> &
*   import("./Observable.js").OnSignature<import("./ObjectEventType.js").Types|'change:geometry', import("./Object.js").ObjectEvent, Return> &
*   import("./Observable.js").CombinedOnSignature<import("./Observable.js").EventTypes|import("./ObjectEventType.js").Types
*     |'change:geometry', Return>} FeatureOnSignature
*/
/***
* @template {import("./geom/Geometry.js").default} [Geometry=import("./geom/Geometry.js").default]
* @template {Object<string, *>} [Properties=Object<string, *>]
* @typedef {Properties & { geometry?: Geometry }} ObjectWithGeometry
*/
/**
* @classdesc
* A vector object for geographic features with a geometry and other
* attribute properties, similar to the features in vector file formats like
* GeoJSON.
*
* Features can be styled individually with `setStyle`; otherwise they use the
* style of their vector layer.
*
* Note that attribute properties are set as {@link module:ol/Object~BaseObject} properties on
* the feature object, so they are observable, and have get/set accessors.
*
* Typically, a feature has a single geometry property. You can set the
* geometry using the `setGeometry` method and get it with `getGeometry`.
* It is possible to store more than one geometry on a feature using attribute
* properties. By default, the geometry used for rendering is identified by
* the property name `geometry`. If you want to use another geometry property
* for rendering, use the `setGeometryName` method to change the attribute
* property associated with the geometry for the feature.  For example:
*
* ```js
*
* import Feature from 'ol/Feature.js';
* import Polygon from 'ol/geom/Polygon.js';
* import Point from 'ol/geom/Point.js';
*
* const feature = new Feature({
*   geometry: new Polygon(polyCoords),
*   labelPoint: new Point(labelCoords),
*   name: 'My Polygon',
* });
*
* // get the polygon geometry
* const poly = feature.getGeometry();
*
* // Render the feature as a point using the coordinates from labelPoint
* feature.setGeometryName('labelPoint');
*
* // get the point geometry
* const point = feature.getGeometry();
* ```
*
* @api
* @template {import("./geom/Geometry.js").default} [Geometry=import("./geom/Geometry.js").default]
* @template {Object<string, *>} [Properties=Object<string, *>]
* @extends {BaseObject<NoInfer<Properties>>}
*/
var Feature = class Feature extends BaseObject {
	/**
	* @param {Geometry|ObjectWithGeometry<Geometry, NoInfer<Properties>>} [geometryOrProperties]
	*     You may pass a Geometry object directly, or an object literal containing
	*     properties. If you pass an object literal, you may include a Geometry
	*     associated with a `geometry` key.
	*/
	constructor(geometryOrProperties) {
		super();
		/***
		* @type {FeatureOnSignature<import("./events.js").EventsKey>}
		*/
		this.on;
		/***
		* @type {FeatureOnSignature<import("./events.js").EventsKey>}
		*/
		this.once;
		/***
		* @type {FeatureOnSignature<void>}
		*/
		this.un;
		/**
		* @private
		* @type {number|string|undefined}
		*/
		this.id_ = void 0;
		/**
		* @type {string}
		* @private
		*/
		this.geometryName_ = "geometry";
		/**
		* User provided style.
		* @private
		* @type {import("./style/Style.js").StyleLike}
		*/
		this.style_ = null;
		/**
		* @private
		* @type {import("./style/Style.js").StyleFunction|undefined}
		*/
		this.styleFunction_ = void 0;
		/**
		* @private
		* @type {?import("./events.js").EventsKey}
		*/
		this.geometryChangeKey_ = null;
		this.addChangeListener(this.geometryName_, this.handleGeometryChanged_);
		if (geometryOrProperties) if (typeof geometryOrProperties.getSimplifiedGeometry === "function") {
			const geometry = geometryOrProperties;
			this.setGeometry(geometry);
		} else {
			/** @type {?} */
			const properties = geometryOrProperties;
			this.setProperties(properties);
		}
	}
	/**
	* Clone this feature. If the original feature has a geometry it
	* is also cloned. The feature id is not set in the clone.
	* @return {Feature<Geometry>} The clone.
	* @api
	*/
	clone() {
		const clone = new Feature();
		const geometryName = this.geometryName_;
		clone.setGeometryName(geometryName);
		const properties = this.getPropertiesInternal();
		if (properties) {
			const geometry = this.getGeometry();
			for (const key in properties) if (key === geometryName && geometry) clone.set(key, geometry.clone());
			else clone.set(key, properties[key], true);
		}
		const style = this.getStyle();
		if (style) clone.setStyle(style);
		return clone;
	}
	/**
	* Get the feature's default geometry.  A feature may have any number of named
	* geometries.  The "default" geometry (the one that is rendered by default) is
	* set when calling {@link module:ol/Feature~Feature#setGeometry}.
	* @return {Geometry|undefined} The default geometry for the feature.
	* @api
	* @observable
	*/
	getGeometry() {
		return this.get(this.geometryName_);
	}
	/**
	* Get the feature identifier.  This is a stable identifier for the feature and
	* is either set when reading data from a remote source or set explicitly by
	* calling {@link module:ol/Feature~Feature#setId}.
	* @return {number|string|undefined} Id.
	* @api
	*/
	getId() {
		return this.id_;
	}
	/**
	* Get the name of the feature's default geometry.  By default, the default
	* geometry is named `geometry`.
	* @return {string} Get the property name associated with the default geometry
	*     for this feature.
	* @api
	*/
	getGeometryName() {
		return this.geometryName_;
	}
	/**
	* Get the feature's style. Will return what was provided to the
	* {@link module:ol/Feature~Feature#setStyle} method.
	* @return {import("./style/Style.js").StyleLike|undefined} The feature style.
	* @api
	*/
	getStyle() {
		return this.style_;
	}
	/**
	* Get the feature's style function.
	* @return {import("./style/Style.js").StyleFunction|undefined} Return a function
	* representing the current style of this feature.
	* @api
	*/
	getStyleFunction() {
		return this.styleFunction_;
	}
	/**
	* @private
	*/
	handleGeometryChange_() {
		this.changed();
	}
	/**
	* @private
	*/
	handleGeometryChanged_() {
		if (this.geometryChangeKey_) {
			unlistenByKey(this.geometryChangeKey_);
			this.geometryChangeKey_ = null;
		}
		const geometry = this.getGeometry();
		if (geometry) this.geometryChangeKey_ = listen(geometry, EventType_default.CHANGE, this.handleGeometryChange_, this);
		this.changed();
	}
	/**
	* Set the default geometry for the feature.  This will update the property
	* with the name returned by {@link module:ol/Feature~Feature#getGeometryName}.
	* @param {Geometry|undefined} geometry The new geometry.
	* @api
	* @observable
	*/
	setGeometry(geometry) {
		this.set(this.geometryName_, geometry);
	}
	/**
	* Set the style for the feature to override the layer style.  This can be a
	* single style object, an array of styles, or a function that takes a
	* resolution and returns an array of styles. To unset the feature style, call
	* `setStyle()` without arguments or a falsey value.
	* @param {import("./style/Style.js").StyleLike} [style] Style for this feature.
	* @api
	* @fires module:ol/events/Event~BaseEvent#event:change
	*/
	setStyle(style) {
		this.style_ = style;
		this.styleFunction_ = !style ? void 0 : createStyleFunction(style);
		this.changed();
	}
	/**
	* Set the feature id.  The feature id is considered stable and may be used when
	* requesting features or comparing identifiers returned from a remote source.
	* The feature id can be used with the
	* {@link module:ol/source/Vector~VectorSource#getFeatureById} method.
	* @param {number|string|undefined} id The feature id.
	* @api
	* @fires module:ol/events/Event~BaseEvent#event:change
	*/
	setId(id) {
		this.id_ = id;
		this.changed();
	}
	/**
	* Set the property name to be used when getting the feature's default geometry.
	* When calling {@link module:ol/Feature~Feature#getGeometry}, the value of the property with
	* this name will be returned.
	* @param {string} name The property name of the default geometry.
	* @api
	*/
	setGeometryName(name) {
		if (name === this.geometryName_) return;
		this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_);
		this.geometryName_ = name;
		this.addChangeListener(this.geometryName_, this.handleGeometryChanged_);
		this.handleGeometryChanged_();
	}
};
/**
* Convert the provided object into a feature style function.  Functions passed
* through unchanged.  Arrays of Style or single style objects wrapped
* in a new feature style function.
* @param {!import("./style/Style.js").StyleFunction|!Array<import("./style/Style.js").default>|!import("./style/Style.js").default} obj
*     A feature style function, a single style, or an array of styles.
* @return {import("./style/Style.js").StyleFunction} A style function.
*/
function createStyleFunction(obj) {
	if (typeof obj === "function") return obj;
	/**
	* @type {Array<import("./style/Style.js").default>}
	*/
	let styles;
	if (Array.isArray(obj)) styles = obj;
	else {
		assert(typeof obj.getZIndex === "function", "Expected an `ol/style/Style` or an array of `ol/style/Style.js`");
		styles = [obj];
	}
	return function() {
		return styles;
	};
}
//#endregion
//#region node_modules/ol/geom/MultiLineString.js
/**
* @module ol/geom/MultiLineString
*/
/**
* @classdesc
* Multi-linestring geometry.
*
* @api
*/
var MultiLineString = class MultiLineString extends SimpleGeometry {
	/**
	* @param {Array<Array<import("../coordinate.js").Coordinate>|LineString>|Array<number>} coordinates
	*     Coordinates or LineString geometries. (For internal use, flat coordinates in
	*     combination with `layout` and `ends` are also accepted.)
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	* @param {Array<number>} [ends] Flat coordinate ends for internal use.
	*/
	constructor(coordinates, layout, ends) {
		super();
		/**
		* @type {Array<number>}
		* @private
		*/
		this.ends_ = [];
		/**
		* @private
		* @type {number}
		*/
		this.maxDelta_ = -1;
		/**
		* @private
		* @type {number}
		*/
		this.maxDeltaRevision_ = -1;
		if (Array.isArray(coordinates[0])) this.setCoordinates(coordinates, layout);
		else if (layout !== void 0 && ends) {
			this.setFlatCoordinates(layout, coordinates);
			this.ends_ = ends;
		} else {
			const lineStrings = coordinates;
			/** @type {Array<number>} */
			const flatCoordinates = [];
			const ends = [];
			for (let i = 0, ii = lineStrings.length; i < ii; ++i) {
				const lineString = lineStrings[i];
				extend(flatCoordinates, lineString.getFlatCoordinates());
				ends.push(flatCoordinates.length);
			}
			const layout = lineStrings.length === 0 ? this.getLayout() : lineStrings[0].getLayout();
			this.setFlatCoordinates(layout, flatCoordinates);
			this.ends_ = ends;
		}
	}
	/**
	* Append the passed linestring to the multilinestring.
	* @param {LineString} lineString LineString.
	* @api
	*/
	appendLineString(lineString) {
		extend(this.flatCoordinates, lineString.getFlatCoordinates().slice());
		this.ends_.push(this.flatCoordinates.length);
		this.changed();
	}
	/**
	* Make a complete copy of the geometry.
	* @return {!MultiLineString} Clone.
	* @api
	* @override
	*/
	clone() {
		const multiLineString = new MultiLineString(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
		multiLineString.applyProperties(this);
		return multiLineString;
	}
	/**
	* @param {number} x X.
	* @param {number} y Y.
	* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
	* @param {number} minSquaredDistance Minimum squared distance.
	* @return {number} Minimum squared distance.
	* @override
	*/
	closestPointXY(x, y, closestPoint, minSquaredDistance) {
		if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) return minSquaredDistance;
		if (this.maxDeltaRevision_ != this.getRevision()) {
			this.maxDelta_ = Math.sqrt(arrayMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0));
			this.maxDeltaRevision_ = this.getRevision();
		}
		return assignClosestArrayPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
	}
	/**
	* Returns the coordinate at `m` using linear interpolation, or `null` if no
	* such coordinate exists.
	*
	* `extrapolate` controls extrapolation beyond the range of Ms in the
	* MultiLineString. If `extrapolate` is `true` then Ms less than the first
	* M will return the first coordinate and Ms greater than the last M will
	* return the last coordinate.
	*
	* `interpolate` controls interpolation between consecutive LineStrings
	* within the MultiLineString. If `interpolate` is `true` the coordinates
	* will be linearly interpolated between the last coordinate of one LineString
	* and the first coordinate of the next LineString.  If `interpolate` is
	* `false` then the function will return `null` for Ms falling between
	* LineStrings.
	*
	* @param {number} m M.
	* @param {boolean} [extrapolate] Extrapolate. Default is `false`.
	* @param {boolean} [interpolate] Interpolate. Default is `false`.
	* @return {import("../coordinate.js").Coordinate|null} Coordinate.
	* @api
	*/
	getCoordinateAtM(m, extrapolate, interpolate) {
		if (this.layout != "XYM" && this.layout != "XYZM" || this.flatCoordinates.length === 0) return null;
		extrapolate = extrapolate !== void 0 ? extrapolate : false;
		interpolate = interpolate !== void 0 ? interpolate : false;
		return lineStringsCoordinateAtM(this.flatCoordinates, 0, this.ends_, this.stride, m, extrapolate, interpolate);
	}
	/**
	* Return the coordinates of the multilinestring.
	* @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
	* @api
	* @override
	*/
	getCoordinates() {
		return inflateCoordinatesArray(this.flatCoordinates, 0, this.ends_, this.stride);
	}
	/**
	* @return {Array<number>} Ends.
	*/
	getEnds() {
		return this.ends_;
	}
	/**
	* Return the linestring at the specified index.
	* @param {number} index Index.
	* @return {LineString} LineString.
	* @api
	*/
	getLineString(index) {
		if (index < 0 || this.ends_.length <= index) return null;
		return new LineString(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
	}
	/**
	* Return the linestrings of this multilinestring.
	* @return {Array<LineString>} LineStrings.
	* @api
	*/
	getLineStrings() {
		const flatCoordinates = this.flatCoordinates;
		const ends = this.ends_;
		const layout = this.layout;
		/** @type {Array<LineString>} */
		const lineStrings = [];
		let offset = 0;
		for (let i = 0, ii = ends.length; i < ii; ++i) {
			const end = ends[i];
			const lineString = new LineString(flatCoordinates.slice(offset, end), layout);
			lineStrings.push(lineString);
			offset = end;
		}
		return lineStrings;
	}
	/**
	* Return the sum of all line string lengths
	* @return {number} Length (on projected plane).
	* @api
	*/
	getLength() {
		const ends = this.ends_;
		let start = 0;
		let length = 0;
		for (let i = 0, ii = ends.length; i < ii; ++i) {
			length += lineStringLength(this.flatCoordinates, start, ends[i], this.stride);
			start = ends[i];
		}
		return length;
	}
	/**
	* @return {Array<number>} Flat midpoints.
	*/
	getFlatMidpoints() {
		/** @type {Array<number>} */
		const midpoints = [];
		const flatCoordinates = this.flatCoordinates;
		let offset = 0;
		const ends = this.ends_;
		const stride = this.stride;
		for (let i = 0, ii = ends.length; i < ii; ++i) {
			const end = ends[i];
			extend(midpoints, interpolatePoint(flatCoordinates, offset, end, stride, .5));
			offset = end;
		}
		return midpoints;
	}
	/**
	* @param {number} squaredTolerance Squared tolerance.
	* @return {MultiLineString} Simplified MultiLineString.
	* @protected
	* @override
	*/
	getSimplifiedGeometryInternal(squaredTolerance) {
		/** @type {Array<number>} */
		const simplifiedFlatCoordinates = [];
		/** @type {Array<number>} */
		const simplifiedEnds = [];
		simplifiedFlatCoordinates.length = douglasPeuckerArray(this.flatCoordinates, 0, this.ends_, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0, simplifiedEnds);
		return new MultiLineString(simplifiedFlatCoordinates, "XY", simplifiedEnds);
	}
	/**
	* Get the type of this geometry.
	* @return {import("./Geometry.js").Type} Geometry type.
	* @api
	* @override
	*/
	getType() {
		return "MultiLineString";
	}
	/**
	* Test if the geometry and the passed extent intersect.
	* @param {import("../extent.js").Extent} extent Extent.
	* @return {boolean} `true` if the geometry and the extent intersect.
	* @api
	* @override
	*/
	intersectsExtent(extent) {
		return intersectsLineStringArray(this.flatCoordinates, 0, this.ends_, this.stride, extent);
	}
	/**
	* Set the coordinates of the multilinestring.
	* @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	* @api
	* @override
	*/
	setCoordinates(coordinates, layout) {
		this.setLayout(layout, coordinates, 2);
		if (!this.flatCoordinates) this.flatCoordinates = [];
		const ends = deflateCoordinatesArray(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
		this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
		this.changed();
	}
};
//#endregion
//#region node_modules/ol/geom/MultiPoint.js
/**
* @module ol/geom/MultiPoint
*/
/**
* @classdesc
* Multi-point geometry.
*
* @api
*/
var MultiPoint = class MultiPoint extends SimpleGeometry {
	/**
	* @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
	*     For internal use, flat coordinates in combination with `layout` are also accepted.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	*/
	constructor(coordinates, layout) {
		super();
		if (layout && !Array.isArray(coordinates[0])) this.setFlatCoordinates(layout, coordinates);
		else this.setCoordinates(coordinates, layout);
	}
	/**
	* Append the passed point to this multipoint.
	* @param {Point} point Point.
	* @api
	*/
	appendPoint(point) {
		extend(this.flatCoordinates, point.getFlatCoordinates());
		this.changed();
	}
	/**
	* Make a complete copy of the geometry.
	* @return {!MultiPoint} Clone.
	* @api
	* @override
	*/
	clone() {
		const multiPoint = new MultiPoint(this.flatCoordinates.slice(), this.layout);
		multiPoint.applyProperties(this);
		return multiPoint;
	}
	/**
	* @param {number} x X.
	* @param {number} y Y.
	* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
	* @param {number} minSquaredDistance Minimum squared distance.
	* @return {number} Minimum squared distance.
	* @override
	*/
	closestPointXY(x, y, closestPoint, minSquaredDistance) {
		if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) return minSquaredDistance;
		const flatCoordinates = this.flatCoordinates;
		const stride = this.stride;
		for (let i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
			const squaredDistance$1 = squaredDistance(x, y, flatCoordinates[i], flatCoordinates[i + 1]);
			if (squaredDistance$1 < minSquaredDistance) {
				minSquaredDistance = squaredDistance$1;
				for (let j = 0; j < stride; ++j) closestPoint[j] = flatCoordinates[i + j];
				closestPoint.length = stride;
			}
		}
		return minSquaredDistance;
	}
	/**
	* Return the coordinates of the multipoint.
	* @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
	* @api
	* @override
	*/
	getCoordinates() {
		return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
	}
	/**
	* Return the point at the specified index.
	* @param {number} index Index.
	* @return {Point} Point.
	* @api
	*/
	getPoint(index) {
		const n = this.flatCoordinates.length / this.stride;
		if (index < 0 || n <= index) return null;
		return new Point(this.flatCoordinates.slice(index * this.stride, (index + 1) * this.stride), this.layout);
	}
	/**
	* Return the points of this multipoint.
	* @return {Array<Point>} Points.
	* @api
	*/
	getPoints() {
		const flatCoordinates = this.flatCoordinates;
		const layout = this.layout;
		const stride = this.stride;
		/** @type {Array<Point>} */
		const points = [];
		for (let i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
			const point = new Point(flatCoordinates.slice(i, i + stride), layout);
			points.push(point);
		}
		return points;
	}
	/**
	* Get the type of this geometry.
	* @return {import("./Geometry.js").Type} Geometry type.
	* @api
	* @override
	*/
	getType() {
		return "MultiPoint";
	}
	/**
	* Test if the geometry and the passed extent intersect.
	* @param {import("../extent.js").Extent} extent Extent.
	* @return {boolean} `true` if the geometry and the extent intersect.
	* @api
	* @override
	*/
	intersectsExtent(extent) {
		const flatCoordinates = this.flatCoordinates;
		const stride = this.stride;
		for (let i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
			const x = flatCoordinates[i];
			const y = flatCoordinates[i + 1];
			if (containsXY(extent, x, y)) return true;
		}
		return false;
	}
	/**
	* Set the coordinates of the multipoint.
	* @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	* @api
	* @override
	*/
	setCoordinates(coordinates, layout) {
		this.setLayout(layout, coordinates, 1);
		if (!this.flatCoordinates) this.flatCoordinates = [];
		this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates, this.stride);
		this.changed();
	}
};
//#endregion
//#region node_modules/ol/geom/flat/center.js
/**
* @module ol/geom/flat/center
*/
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<number>>} endss Endss.
* @param {number} stride Stride.
* @return {Array<number>} Flat centers.
*/
function linearRingss(flatCoordinates, offset, endss, stride) {
	const flatCenters = [];
	let extent = createEmpty();
	for (let i = 0, ii = endss.length; i < ii; ++i) {
		const ends = endss[i];
		extent = createOrUpdateFromFlatCoordinates(flatCoordinates, offset, ends[0], stride);
		flatCenters.push((extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2);
		offset = ends[ends.length - 1];
	}
	return flatCenters;
}
//#endregion
//#region node_modules/ol/geom/MultiPolygon.js
/**
* @module ol/geom/MultiPolygon
*/
/**
* @classdesc
* Multi-polygon geometry.
*
* @api
*/
var MultiPolygon = class MultiPolygon extends SimpleGeometry {
	/**
	* @param {Array<Array<Array<import("../coordinate.js").Coordinate>>|Polygon>|Array<number>} coordinates Coordinates.
	*     For internal use, flat coordinates in combination with `layout` and `endss` are also accepted.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	* @param {Array<Array<number>>} [endss] Array of ends for internal use with flat coordinates.
	*/
	constructor(coordinates, layout, endss) {
		super();
		/**
		* @type {Array<Array<number>>}
		* @private
		*/
		this.endss_ = [];
		/**
		* @private
		* @type {number}
		*/
		this.flatInteriorPointsRevision_ = -1;
		/**
		* @private
		* @type {Array<number>|null}
		*/
		this.flatInteriorPoints_ = null;
		/**
		* @private
		* @type {number}
		*/
		this.maxDelta_ = -1;
		/**
		* @private
		* @type {number}
		*/
		this.maxDeltaRevision_ = -1;
		/**
		* @private
		* @type {number}
		*/
		this.orientedRevision_ = -1;
		/**
		* @private
		* @type {Array<number>|null}
		*/
		this.orientedFlatCoordinates_ = null;
		if (!endss && !Array.isArray(coordinates[0])) {
			const polygons = coordinates;
			/** @type {Array<number>} */
			const flatCoordinates = [];
			const thisEndss = [];
			for (let i = 0, ii = polygons.length; i < ii; ++i) {
				const polygon = polygons[i];
				const offset = flatCoordinates.length;
				const ends = polygon.getEnds();
				for (let j = 0, jj = ends.length; j < jj; ++j) ends[j] += offset;
				extend(flatCoordinates, polygon.getFlatCoordinates());
				thisEndss.push(ends);
			}
			layout = polygons.length === 0 ? this.getLayout() : polygons[0].getLayout();
			coordinates = flatCoordinates;
			endss = thisEndss;
		}
		if (layout !== void 0 && endss) {
			this.setFlatCoordinates(layout, coordinates);
			this.endss_ = endss;
		} else this.setCoordinates(coordinates, layout);
	}
	/**
	* Append the passed polygon to this multipolygon.
	* @param {Polygon} polygon Polygon.
	* @api
	*/
	appendPolygon(polygon) {
		/** @type {Array<number>} */
		let ends;
		if (!this.flatCoordinates) {
			this.flatCoordinates = polygon.getFlatCoordinates().slice();
			ends = polygon.getEnds().slice();
			this.endss_.push();
		} else {
			const offset = this.flatCoordinates.length;
			extend(this.flatCoordinates, polygon.getFlatCoordinates());
			ends = polygon.getEnds().slice();
			for (let i = 0, ii = ends.length; i < ii; ++i) ends[i] += offset;
		}
		this.endss_.push(ends);
		this.changed();
	}
	/**
	* Make a complete copy of the geometry.
	* @return {!MultiPolygon} Clone.
	* @api
	* @override
	*/
	clone() {
		const len = this.endss_.length;
		const newEndss = new Array(len);
		for (let i = 0; i < len; ++i) newEndss[i] = this.endss_[i].slice();
		const multiPolygon = new MultiPolygon(this.flatCoordinates.slice(), this.layout, newEndss);
		multiPolygon.applyProperties(this);
		return multiPolygon;
	}
	/**
	* @param {number} x X.
	* @param {number} y Y.
	* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
	* @param {number} minSquaredDistance Minimum squared distance.
	* @return {number} Minimum squared distance.
	* @override
	*/
	closestPointXY(x, y, closestPoint, minSquaredDistance) {
		if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) return minSquaredDistance;
		if (this.maxDeltaRevision_ != this.getRevision()) {
			this.maxDelta_ = Math.sqrt(multiArrayMaxSquaredDelta(this.flatCoordinates, 0, this.endss_, this.stride, 0));
			this.maxDeltaRevision_ = this.getRevision();
		}
		return assignClosestMultiArrayPoint(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
	}
	/**
	* @param {number} x X.
	* @param {number} y Y.
	* @return {boolean} Contains (x, y).
	* @override
	*/
	containsXY(x, y) {
		return linearRingssContainsXY(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, x, y);
	}
	/**
	* Return the area of the multipolygon on projected plane.
	* @return {number} Area (on projected plane).
	* @api
	*/
	getArea() {
		return linearRingss$1(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride);
	}
	/**
	* Get the coordinate array for this geometry.  This array has the structure
	* of a GeoJSON coordinate array for multi-polygons.
	*
	* @param {boolean} [right] Orient coordinates according to the right-hand
	*     rule (counter-clockwise for exterior and clockwise for interior rings).
	*     If `false`, coordinates will be oriented according to the left-hand rule
	*     (clockwise for exterior and counter-clockwise for interior rings).
	*     By default, coordinate orientation will depend on how the geometry was
	*     constructed.
	* @return {Array<Array<Array<import("../coordinate.js").Coordinate>>>} Coordinates.
	* @api
	* @override
	*/
	getCoordinates(right) {
		let flatCoordinates;
		if (right !== void 0) {
			flatCoordinates = this.getOrientedFlatCoordinates().slice();
			orientLinearRingsArray(flatCoordinates, 0, this.endss_, this.stride, right);
		} else flatCoordinates = this.flatCoordinates;
		return inflateMultiCoordinatesArray(flatCoordinates, 0, this.endss_, this.stride);
	}
	/**
	* @return {Array<Array<number>>} Endss.
	*/
	getEndss() {
		return this.endss_;
	}
	/**
	* @return {Array<number>} Flat interior points.
	*/
	getFlatInteriorPoints() {
		if (this.flatInteriorPointsRevision_ != this.getRevision()) {
			const flatCenters = linearRingss(this.flatCoordinates, 0, this.endss_, this.stride);
			this.flatInteriorPoints_ = getInteriorPointsOfMultiArray(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, flatCenters);
			this.flatInteriorPointsRevision_ = this.getRevision();
		}
		return this.flatInteriorPoints_;
	}
	/**
	* Return the interior points as {@link module:ol/geom/MultiPoint~MultiPoint multipoint}.
	* @return {MultiPoint} Interior points as XYM coordinates, where M is
	* the length of the horizontal intersection that the point belongs to.
	* @api
	*/
	getInteriorPoints() {
		return new MultiPoint(this.getFlatInteriorPoints().slice(), "XYM");
	}
	/**
	* @return {Array<number>} Oriented flat coordinates.
	*/
	getOrientedFlatCoordinates() {
		if (this.orientedRevision_ != this.getRevision()) {
			const flatCoordinates = this.flatCoordinates;
			if (linearRingssAreOriented(flatCoordinates, 0, this.endss_, this.stride)) this.orientedFlatCoordinates_ = flatCoordinates;
			else {
				this.orientedFlatCoordinates_ = flatCoordinates.slice();
				this.orientedFlatCoordinates_.length = orientLinearRingsArray(this.orientedFlatCoordinates_, 0, this.endss_, this.stride);
			}
			this.orientedRevision_ = this.getRevision();
		}
		return this.orientedFlatCoordinates_;
	}
	/**
	* @param {number} squaredTolerance Squared tolerance.
	* @return {MultiPolygon} Simplified MultiPolygon.
	* @protected
	* @override
	*/
	getSimplifiedGeometryInternal(squaredTolerance) {
		/** @type {Array<number>} */
		const simplifiedFlatCoordinates = [];
		/** @type {Array<Array<number>>} */
		const simplifiedEndss = [];
		simplifiedFlatCoordinates.length = quantizeMultiArray(this.flatCoordinates, 0, this.endss_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEndss);
		return new MultiPolygon(simplifiedFlatCoordinates, "XY", simplifiedEndss);
	}
	/**
	* Return the polygon at the specified index.
	* @param {number} index Index.
	* @return {Polygon} Polygon.
	* @api
	*/
	getPolygon(index) {
		if (index < 0 || this.endss_.length <= index) return null;
		let offset;
		if (index === 0) offset = 0;
		else {
			const prevEnds = this.endss_[index - 1];
			offset = prevEnds[prevEnds.length - 1];
		}
		const ends = this.endss_[index].slice();
		const end = ends[ends.length - 1];
		if (offset !== 0) for (let i = 0, ii = ends.length; i < ii; ++i) ends[i] -= offset;
		return new Polygon(this.flatCoordinates.slice(offset, end), this.layout, ends);
	}
	/**
	* Return the polygons of this multipolygon.
	* @return {Array<Polygon>} Polygons.
	* @api
	*/
	getPolygons() {
		const layout = this.layout;
		const flatCoordinates = this.flatCoordinates;
		const endss = this.endss_;
		const polygons = [];
		let offset = 0;
		for (let i = 0, ii = endss.length; i < ii; ++i) {
			const ends = endss[i].slice();
			const end = ends[ends.length - 1];
			if (offset !== 0) for (let j = 0, jj = ends.length; j < jj; ++j) ends[j] -= offset;
			const polygon = new Polygon(flatCoordinates.slice(offset, end), layout, ends);
			polygons.push(polygon);
			offset = end;
		}
		return polygons;
	}
	/**
	* Get the type of this geometry.
	* @return {import("./Geometry.js").Type} Geometry type.
	* @api
	* @override
	*/
	getType() {
		return "MultiPolygon";
	}
	/**
	* Test if the geometry and the passed extent intersect.
	* @param {import("../extent.js").Extent} extent Extent.
	* @return {boolean} `true` if the geometry and the extent intersect.
	* @api
	* @override
	*/
	intersectsExtent(extent) {
		return intersectsLinearRingMultiArray(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, extent);
	}
	/**
	* Set the coordinates of the multipolygon.
	* @param {!Array<Array<Array<import("../coordinate.js").Coordinate>>>} coordinates Coordinates.
	* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
	* @api
	* @override
	*/
	setCoordinates(coordinates, layout) {
		this.setLayout(layout, coordinates, 3);
		if (!this.flatCoordinates) this.flatCoordinates = [];
		const endss = deflateMultiCoordinatesArray(this.flatCoordinates, 0, coordinates, this.stride, this.endss_);
		if (endss.length === 0) this.flatCoordinates.length = 0;
		else {
			const lastEnds = endss[endss.length - 1];
			this.flatCoordinates.length = lastEnds.length === 0 ? 0 : lastEnds[lastEnds.length - 1];
		}
		this.changed();
	}
};
//#endregion
//#region node_modules/ol/render/Feature.js
/**
* @typedef {'Point' | 'LineString' | 'LinearRing' | 'Polygon' | 'MultiPoint' | 'MultiLineString'} Type
* The geometry type.  One of `'Point'`, `'LineString'`, `'LinearRing'`,
* `'Polygon'`, `'MultiPoint'` or 'MultiLineString'`.
*/
/**
* @type {import("../transform.js").Transform}
*/
var tmpTransform = create();
/**
* Lightweight, read-only, {@link module:ol/Feature~Feature} and {@link module:ol/geom/Geometry~Geometry} like
* structure, optimized for vector tile rendering and styling. Geometry access
* through the API is limited to getting the type and extent of the geometry.
*/
var RenderFeature = class RenderFeature {
	/**
	* @param {Type} type Geometry type.
	* @param {Array<number>} flatCoordinates Flat coordinates. These always need
	*     to be right-handed for polygons.
	* @param {Array<number>} ends Ends.
	* @param {number} stride Stride.
	* @param {Object<string, *>} properties Properties.
	* @param {number|string|undefined} id Feature id.
	*/
	constructor(type, flatCoordinates, ends, stride, properties, id) {
		/**
		* @type {import("../style/Style.js").StyleFunction|undefined}
		*/
		this.styleFunction;
		/**
		* @private
		* @type {import("../extent.js").Extent|undefined}
		*/
		this.extent_;
		/**
		* @private
		* @type {number|string|undefined}
		*/
		this.id_ = id;
		/**
		* @private
		* @type {Type}
		*/
		this.type_ = type;
		/**
		* @private
		* @type {Array<number>}
		*/
		this.flatCoordinates_ = flatCoordinates;
		/**
		* @private
		* @type {Array<number>}
		*/
		this.flatInteriorPoints_ = null;
		/**
		* @private
		* @type {Array<number>}
		*/
		this.flatMidpoints_ = null;
		/**
		* @private
		* @type {Array<number>|null}
		*/
		this.ends_ = ends || null;
		/**
		* @private
		* @type {Object<string, *>}
		*/
		this.properties_ = properties;
		/**
		* @private
		* @type {number}
		*/
		this.squaredTolerance_;
		/**
		* @private
		* @type {number}
		*/
		this.stride_ = stride;
		/**
		* @private
		* @type {RenderFeature}
		*/
		this.simplifiedGeometry_;
	}
	/**
	* Get a feature property by its key.
	* @param {string} key Key
	* @return {*} Value for the requested key.
	* @api
	*/
	get(key) {
		return this.properties_[key];
	}
	/**
	* Get the extent of this feature's geometry.
	* @return {import("../extent.js").Extent} Extent.
	* @api
	*/
	getExtent() {
		if (!this.extent_) this.extent_ = this.type_ === "Point" ? createOrUpdateFromCoordinate(this.flatCoordinates_) : createOrUpdateFromFlatCoordinates(this.flatCoordinates_, 0, this.flatCoordinates_.length, this.stride_);
		return this.extent_;
	}
	/**
	* @return {Array<number>} Flat interior points.
	*/
	getFlatInteriorPoint() {
		if (!this.flatInteriorPoints_) {
			const flatCenter = getCenter(this.getExtent());
			this.flatInteriorPoints_ = getInteriorPointOfArray(this.flatCoordinates_, 0, this.ends_, this.stride_, flatCenter, 0);
		}
		return this.flatInteriorPoints_;
	}
	/**
	* @return {Array<number>} Flat interior points.
	*/
	getFlatInteriorPoints() {
		if (!this.flatInteriorPoints_) {
			const ends = inflateEnds(this.flatCoordinates_, this.ends_);
			const flatCenters = linearRingss(this.flatCoordinates_, 0, ends, this.stride_);
			this.flatInteriorPoints_ = getInteriorPointsOfMultiArray(this.flatCoordinates_, 0, ends, this.stride_, flatCenters);
		}
		return this.flatInteriorPoints_;
	}
	/**
	* @return {Array<number>} Flat midpoint.
	*/
	getFlatMidpoint() {
		if (!this.flatMidpoints_) this.flatMidpoints_ = interpolatePoint(this.flatCoordinates_, 0, this.flatCoordinates_.length, this.stride_, .5);
		return this.flatMidpoints_;
	}
	/**
	* @return {Array<number>} Flat midpoints.
	*/
	getFlatMidpoints() {
		if (!this.flatMidpoints_) {
			this.flatMidpoints_ = [];
			const flatCoordinates = this.flatCoordinates_;
			let offset = 0;
			const ends = this.ends_;
			for (let i = 0, ii = ends.length; i < ii; ++i) {
				const end = ends[i];
				const midpoint = interpolatePoint(flatCoordinates, offset, end, this.stride_, .5);
				extend(this.flatMidpoints_, midpoint);
				offset = end;
			}
		}
		return this.flatMidpoints_;
	}
	/**
	* Get the feature identifier.  This is a stable identifier for the feature and
	* is set when reading data from a remote source.
	* @return {number|string|undefined} Id.
	* @api
	*/
	getId() {
		return this.id_;
	}
	/**
	* @return {Array<number>} Flat coordinates.
	*/
	getOrientedFlatCoordinates() {
		return this.flatCoordinates_;
	}
	/**
	* For API compatibility with {@link module:ol/Feature~Feature}, this method is useful when
	* determining the geometry type in style function (see {@link #getType}).
	* @return {RenderFeature} Feature.
	* @api
	*/
	getGeometry() {
		return this;
	}
	/**
	* @param {number} squaredTolerance Squared tolerance.
	* @return {RenderFeature} Simplified geometry.
	*/
	getSimplifiedGeometry(squaredTolerance) {
		return this;
	}
	/**
	* Get a transformed and simplified version of the geometry.
	* @param {number} squaredTolerance Squared tolerance.
	* @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
	* @return {RenderFeature} Simplified geometry.
	*/
	simplifyTransformed(squaredTolerance, transform) {
		return this;
	}
	/**
	* Get the feature properties.
	* @return {Object<string, *>} Feature properties.
	* @api
	*/
	getProperties() {
		return this.properties_;
	}
	/**
	* Get an object of all property names and values.  This has the same behavior as getProperties,
	* but is here to conform with the {@link module:ol/Feature~Feature} interface.
	* @return {Object<string, *>?} Object.
	*/
	getPropertiesInternal() {
		return this.properties_;
	}
	/**
	* @return {number} Stride.
	*/
	getStride() {
		return this.stride_;
	}
	/**
	* @return {import('../style/Style.js').StyleFunction|undefined} Style
	*/
	getStyleFunction() {
		return this.styleFunction;
	}
	/**
	* Get the type of this feature's geometry.
	* @return {Type} Geometry type.
	* @api
	*/
	getType() {
		return this.type_;
	}
	/**
	* Transform geometry coordinates from tile pixel space to projected.
	*
	* @param {import("../proj.js").ProjectionLike} projection The data projection
	*/
	transform(projection) {
		projection = get$1(projection);
		const pixelExtent = projection.getExtent();
		const projectedExtent = projection.getWorldExtent();
		if (pixelExtent && projectedExtent) {
			const scale = getHeight(projectedExtent) / getHeight(pixelExtent);
			compose(tmpTransform, projectedExtent[0], projectedExtent[3], scale, -scale, 0, 0, 0);
			transform2D(this.flatCoordinates_, 0, this.flatCoordinates_.length, this.stride_, tmpTransform, this.flatCoordinates_);
		}
	}
	/**
	* Apply a transform function to the coordinates of the geometry.
	* The geometry is modified in place.
	* If you do not want the geometry modified in place, first `clone()` it and
	* then use this function on the clone.
	* @param {import("../proj.js").TransformFunction} transformFn Transform function.
	*/
	applyTransform(transformFn) {
		transformFn(this.flatCoordinates_, this.flatCoordinates_, this.stride_);
	}
	/**
	* @return {RenderFeature} A cloned render feature.
	*/
	clone() {
		var _this$ends_;
		return new RenderFeature(this.type_, this.flatCoordinates_.slice(), (_this$ends_ = this.ends_) === null || _this$ends_ === void 0 ? void 0 : _this$ends_.slice(), this.stride_, Object.assign({}, this.properties_), this.id_);
	}
	/**
	* @return {Array<number>|null} Ends.
	*/
	getEnds() {
		return this.ends_;
	}
	/**
	* Add transform and resolution based geometry simplification to this instance.
	* @return {RenderFeature} This render feature.
	*/
	enableSimplifyTransformed() {
		this.simplifyTransformed = memoizeOne((squaredTolerance, transform) => {
			if (squaredTolerance === this.squaredTolerance_) return this.simplifiedGeometry_;
			this.simplifiedGeometry_ = this.clone();
			if (transform) this.simplifiedGeometry_.applyTransform(transform);
			const simplifiedFlatCoordinates = this.simplifiedGeometry_.getFlatCoordinates();
			let simplifiedEnds;
			switch (this.type_) {
				case "LineString":
					simplifiedFlatCoordinates.length = douglasPeucker(simplifiedFlatCoordinates, 0, this.simplifiedGeometry_.flatCoordinates_.length, this.simplifiedGeometry_.stride_, squaredTolerance, simplifiedFlatCoordinates, 0);
					simplifiedEnds = [simplifiedFlatCoordinates.length];
					break;
				case "MultiLineString":
					simplifiedEnds = [];
					simplifiedFlatCoordinates.length = douglasPeuckerArray(simplifiedFlatCoordinates, 0, this.simplifiedGeometry_.ends_, this.simplifiedGeometry_.stride_, squaredTolerance, simplifiedFlatCoordinates, 0, simplifiedEnds);
					break;
				case "Polygon":
					simplifiedEnds = [];
					simplifiedFlatCoordinates.length = quantizeArray(simplifiedFlatCoordinates, 0, this.simplifiedGeometry_.ends_, this.simplifiedGeometry_.stride_, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
					break;
				default:
			}
			if (simplifiedEnds) this.simplifiedGeometry_ = new RenderFeature(this.type_, simplifiedFlatCoordinates, simplifiedEnds, this.stride_, this.properties_, this.id_);
			this.squaredTolerance_ = squaredTolerance;
			return this.simplifiedGeometry_;
		});
		return this;
	}
};
/**
* @return {Array<number>} Flat coordinates.
*/
RenderFeature.prototype.getFlatCoordinates = RenderFeature.prototype.getOrientedFlatCoordinates;
//#endregion
//#region node_modules/ol/geom/GeometryCollection.js
/**
* @module ol/geom/GeometryCollection
*/
/**
* @classdesc
* An array of {@link module:ol/geom/Geometry~Geometry} objects.
*
* @api
*/
var GeometryCollection = class GeometryCollection extends Geometry {
	/**
	* @param {Array<Geometry>} geometries Geometries.
	*/
	constructor(geometries) {
		super();
		/**
		* @private
		* @type {Array<Geometry>}
		*/
		this.geometries_ = geometries;
		/**
		* @private
		* @type {Array<import("../events.js").EventsKey>}
		*/
		this.changeEventsKeys_ = [];
		this.listenGeometriesChange_();
	}
	/**
	* @private
	*/
	unlistenGeometriesChange_() {
		this.changeEventsKeys_.forEach(unlistenByKey);
		this.changeEventsKeys_.length = 0;
	}
	/**
	* @private
	*/
	listenGeometriesChange_() {
		const geometries = this.geometries_;
		for (let i = 0, ii = geometries.length; i < ii; ++i) this.changeEventsKeys_.push(listen(geometries[i], EventType_default.CHANGE, this.changed, this));
	}
	/**
	* Make a complete copy of the geometry.
	* @return {!GeometryCollection} Clone.
	* @api
	* @override
	*/
	clone() {
		const geometryCollection = new GeometryCollection(cloneGeometries(this.geometries_));
		geometryCollection.applyProperties(this);
		return geometryCollection;
	}
	/**
	* @param {number} x X.
	* @param {number} y Y.
	* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
	* @param {number} minSquaredDistance Minimum squared distance.
	* @return {number} Minimum squared distance.
	* @override
	*/
	closestPointXY(x, y, closestPoint, minSquaredDistance) {
		if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) return minSquaredDistance;
		const geometries = this.geometries_;
		for (let i = 0, ii = geometries.length; i < ii; ++i) minSquaredDistance = geometries[i].closestPointXY(x, y, closestPoint, minSquaredDistance);
		return minSquaredDistance;
	}
	/**
	* @param {number} x X.
	* @param {number} y Y.
	* @return {boolean} Contains (x, y).
	* @override
	*/
	containsXY(x, y) {
		const geometries = this.geometries_;
		for (let i = 0, ii = geometries.length; i < ii; ++i) if (geometries[i].containsXY(x, y)) return true;
		return false;
	}
	/**
	* @param {import("../extent.js").Extent} extent Extent.
	* @protected
	* @return {import("../extent.js").Extent} extent Extent.
	* @override
	*/
	computeExtent(extent) {
		createOrUpdateEmpty(extent);
		const geometries = this.geometries_;
		for (let i = 0, ii = geometries.length; i < ii; ++i) extend$1(extent, geometries[i].getExtent());
		return extent;
	}
	/**
	* Return the geometries that make up this geometry collection.
	* @return {Array<Geometry>} Geometries.
	* @api
	*/
	getGeometries() {
		return cloneGeometries(this.geometries_);
	}
	/**
	* @return {Array<Geometry>} Geometries.
	*/
	getGeometriesArray() {
		return this.geometries_;
	}
	/**
	* @return {Array<Geometry>} Geometries.
	*/
	getGeometriesArrayRecursive() {
		/** @type {Array<Geometry>} */
		let geometriesArray = [];
		const geometries = this.geometries_;
		for (let i = 0, ii = geometries.length; i < ii; ++i) if (geometries[i].getType() === this.getType()) geometriesArray = geometriesArray.concat(
			/** @type {GeometryCollection} */
			geometries[i].getGeometriesArrayRecursive()
		);
		else geometriesArray.push(geometries[i]);
		return geometriesArray;
	}
	/**
	* Create a simplified version of this geometry using the Douglas Peucker algorithm.
	* @param {number} squaredTolerance Squared tolerance.
	* @return {GeometryCollection} Simplified GeometryCollection.
	* @override
	*/
	getSimplifiedGeometry(squaredTolerance) {
		if (this.simplifiedGeometryRevision !== this.getRevision()) {
			this.simplifiedGeometryMaxMinSquaredTolerance = 0;
			this.simplifiedGeometryRevision = this.getRevision();
		}
		if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance < this.simplifiedGeometryMaxMinSquaredTolerance) return this;
		const simplifiedGeometries = [];
		const geometries = this.geometries_;
		let simplified = false;
		for (let i = 0, ii = geometries.length; i < ii; ++i) {
			const geometry = geometries[i];
			const simplifiedGeometry = geometry.getSimplifiedGeometry(squaredTolerance);
			simplifiedGeometries.push(simplifiedGeometry);
			if (simplifiedGeometry !== geometry) simplified = true;
		}
		if (simplified) return new GeometryCollection(simplifiedGeometries);
		this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
		return this;
	}
	/**
	* Get the type of this geometry.
	* @return {import("./Geometry.js").Type} Geometry type.
	* @api
	* @override
	*/
	getType() {
		return "GeometryCollection";
	}
	/**
	* Test if the geometry and the passed extent intersect.
	* @param {import("../extent.js").Extent} extent Extent.
	* @return {boolean} `true` if the geometry and the extent intersect.
	* @api
	* @override
	*/
	intersectsExtent(extent) {
		const geometries = this.geometries_;
		for (let i = 0, ii = geometries.length; i < ii; ++i) if (geometries[i].intersectsExtent(extent)) return true;
		return false;
	}
	/**
	* @return {boolean} Is empty.
	*/
	isEmpty() {
		return this.geometries_.length === 0;
	}
	/**
	* Rotate the geometry around a given coordinate. This modifies the geometry
	* coordinates in place.
	* @param {number} angle Rotation angle in radians.
	* @param {import("../coordinate.js").Coordinate} anchor The rotation center.
	* @api
	* @override
	*/
	rotate(angle, anchor) {
		const geometries = this.geometries_;
		for (let i = 0, ii = geometries.length; i < ii; ++i) geometries[i].rotate(angle, anchor);
		this.changed();
	}
	/**
	* Scale the geometry (with an optional origin).  This modifies the geometry
	* coordinates in place.
	* @abstract
	* @param {number} sx The scaling factor in the x-direction.
	* @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
	* @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
	*     of the geometry extent).
	* @api
	* @override
	*/
	scale(sx, sy, anchor) {
		if (!anchor) anchor = getCenter(this.getExtent());
		const geometries = this.geometries_;
		for (let i = 0, ii = geometries.length; i < ii; ++i) geometries[i].scale(sx, sy, anchor);
		this.changed();
	}
	/**
	* Set the geometries that make up this geometry collection.
	* @param {Array<Geometry>} geometries Geometries.
	* @api
	*/
	setGeometries(geometries) {
		this.setGeometriesArray(cloneGeometries(geometries));
	}
	/**
	* @param {Array<Geometry>} geometries Geometries.
	*/
	setGeometriesArray(geometries) {
		this.unlistenGeometriesChange_();
		this.geometries_ = geometries;
		this.listenGeometriesChange_();
		this.changed();
	}
	/**
	* Apply a transform function to the coordinates of the geometry.
	* The geometry is modified in place.
	* If you do not want the geometry modified in place, first `clone()` it and
	* then use this function on the clone.
	* @param {import("../proj.js").TransformFunction} transformFn Transform function.
	* Called with a flat array of geometry coordinates.
	* @api
	* @override
	*/
	applyTransform(transformFn) {
		const geometries = this.geometries_;
		for (let i = 0, ii = geometries.length; i < ii; ++i) geometries[i].applyTransform(transformFn);
		this.changed();
	}
	/**
	* Translate the geometry.  This modifies the geometry coordinates in place.  If
	* instead you want a new geometry, first `clone()` this geometry.
	* @param {number} deltaX Delta X.
	* @param {number} deltaY Delta Y.
	* @api
	* @override
	*/
	translate(deltaX, deltaY) {
		const geometries = this.geometries_;
		for (let i = 0, ii = geometries.length; i < ii; ++i) geometries[i].translate(deltaX, deltaY);
		this.changed();
	}
	/**
	* Clean up.
	* @override
	*/
	disposeInternal() {
		this.unlistenGeometriesChange_();
		super.disposeInternal();
	}
};
/**
* @param {Array<Geometry>} geometries Geometries.
* @return {Array<Geometry>} Cloned geometries.
*/
function cloneGeometries(geometries) {
	return geometries.map((geometry) => geometry.clone());
}
//#endregion
//#region node_modules/ol/format/Feature.js
/**
* @module ol/format/Feature
*/
/**
* @typedef {Object} ReadOptions
* @property {import("../proj.js").ProjectionLike} [dataProjection] Projection of the data we are reading.
* If not provided, the projection will be derived from the data (where possible) or
* the `dataProjection` of the format is assigned (where set). If the projection
* can not be derived from the data and if no `dataProjection` is set for a format,
* the features will not be reprojected.
* @property {import("../extent.js").Extent} [extent] Tile extent in map units of the tile being read.
* This is only required when reading data with tile pixels as geometry units. When configured,
* a `dataProjection` with `TILE_PIXELS` as `units` and the tile's pixel extent as `extent` needs to be
* provided.
* @property {import("../proj.js").ProjectionLike} [featureProjection] Projection of the feature geometries
* created by the format reader. If not provided, features will be returned in the
* `dataProjection`.
*/
/**
* @typedef {Object} WriteOptions
* @property {import("../proj.js").ProjectionLike} [dataProjection] Projection of the data we are writing.
* If not provided, the `dataProjection` of the format is assigned (where set).
* If no `dataProjection` is set for a format, the features will be returned
* in the `featureProjection`.
* @property {import("../proj.js").ProjectionLike} [featureProjection] Projection of the feature geometries
* that will be serialized by the format writer. If not provided, geometries are assumed
* to be in the `dataProjection` if that is set; in other words, they are not transformed.
* @property {boolean} [rightHanded] When writing geometries, follow the right-hand
* rule for linear ring orientation.  This means that polygons will have counter-clockwise
* exterior rings and clockwise interior rings.  By default, coordinates are serialized
* as they are provided at construction.  If `true`, the right-hand rule will
* be applied.  If `false`, the left-hand rule will be applied (clockwise for
* exterior and counter-clockwise for interior rings).  Note that not all
* formats support this.  The GeoJSON format does use this property when writing
* geometries.
* @property {number} [decimals] Maximum number of decimal places for coordinates.
* Coordinates are stored internally as floats, but floating-point arithmetic can create
* coordinates with a large number of decimal places, not generally wanted on output.
* Set a number here to round coordinates. Can also be used to ensure that
* coordinates read in can be written back out with the same number of decimals.
* Default is no rounding.
*/
/**
* @typedef {'arraybuffer' | 'json' | 'text' | 'xml'} Type
*/
/**
* @typedef {Object} SimpleGeometryObject
* @property {import('../geom/Geometry.js').Type} type Type.
* @property {Array<number>} flatCoordinates Flat coordinates.
* @property {Array<number>|Array<Array<number>>} [ends] Ends or endss.
* @property {import('../geom/Geometry.js').GeometryLayout} [layout] Layout.
*/
/**
* @typedef {Array<GeometryObject>} GeometryCollectionObject
*/
/**
* @typedef {SimpleGeometryObject|GeometryCollectionObject} GeometryObject
*/
/**
* @typedef {Object} FeatureObject
* @property {string|number} [id] Id.
* @property {GeometryObject} [geometry] Geometry.
* @property {Object<string, *>} [properties] Properties.
*/
/***
* @template {import('../Feature.js').FeatureLike} T
* @typedef {T extends RenderFeature ? typeof RenderFeature : typeof Feature} FeatureToFeatureClass
*/
/***
* @template {import("../Feature.js").FeatureClass} T
* @typedef {T[keyof T] extends RenderFeature ? RenderFeature : Feature} FeatureClassToFeature
*/
/**
* @classdesc
* Abstract base class; normally only used for creating subclasses and not
* instantiated in apps.
* Base class for feature formats.
* {@link module:ol/format/Feature~FeatureFormat} subclasses provide the ability to decode and encode
* {@link module:ol/Feature~Feature} objects from a variety of commonly used geospatial
* file formats.  See the documentation for each format for more details.
*
* @template {import('../Feature.js').FeatureLike} [FeatureType=import("../Feature.js").default]
* @abstract
* @api
*/
var FeatureFormat = class {
	constructor() {
		/**
		* @protected
		* @type {import("../proj/Projection.js").default|undefined}
		*/
		this.dataProjection = void 0;
		/**
		* @protected
		* @type {import("../proj/Projection.js").default|undefined}
		*/
		this.defaultFeatureProjection = void 0;
		/**
		* @protected
		* @type {FeatureToFeatureClass<FeatureType>}
		*/
		this.featureClass = Feature;
		/**
		* A list media types supported by the format in descending order of preference.
		* @type {Array<string>}
		*/
		this.supportedMediaTypes = null;
	}
	/**
	* Adds the data projection to the read options.
	* @param {Document|Element|Object|string} source Source.
	* @param {ReadOptions} [options] Options.
	* @return {ReadOptions|undefined} Options.
	* @protected
	*/
	getReadOptions(source, options) {
		if (options) {
			let dataProjection = options.dataProjection ? get$1(options.dataProjection) : this.readProjection(source);
			if (options.extent && dataProjection && dataProjection.getUnits() === "tile-pixels") {
				dataProjection = get$1(dataProjection);
				dataProjection.setWorldExtent(options.extent);
			}
			options = {
				dataProjection,
				featureProjection: options.featureProjection
			};
		}
		return this.adaptOptions(options);
	}
	/**
	* Sets the `dataProjection` on the options, if no `dataProjection`
	* is set.
	* @param {WriteOptions|ReadOptions|undefined} options
	*     Options.
	* @protected
	* @return {WriteOptions|ReadOptions|undefined}
	*     Updated options.
	*/
	adaptOptions(options) {
		return Object.assign({
			dataProjection: this.dataProjection,
			featureProjection: this.defaultFeatureProjection,
			featureClass: this.featureClass
		}, options);
	}
	/**
	* @abstract
	* @return {Type} The format type.
	*/
	getType() {
		return abstract();
	}
	/**
	* Read a single feature from a source.
	*
	* @abstract
	* @param {Document|Element|Object|string} source Source.
	* @param {ReadOptions} [options] Read options.
	* @return {FeatureType|Array<FeatureType>} Feature.
	*/
	readFeature(source, options) {
		return abstract();
	}
	/**
	* Read all features from a source.
	*
	* @abstract
	* @param {Document|Element|ArrayBuffer|Object|string} source Source.
	* @param {ReadOptions} [options] Read options.
	* @return {Array<FeatureType>} Features.
	*/
	readFeatures(source, options) {
		return abstract();
	}
	/**
	* Read a single geometry from a source.
	*
	* @abstract
	* @param {Document|Element|Object|string} source Source.
	* @param {ReadOptions} [options] Read options.
	* @return {import("../geom/Geometry.js").default} Geometry.
	*/
	readGeometry(source, options) {
		return abstract();
	}
	/**
	* Read the projection from a source.
	*
	* @abstract
	* @param {Document|Element|Object|string} source Source.
	* @return {import("../proj/Projection.js").default|undefined} Projection.
	*/
	readProjection(source) {
		return abstract();
	}
	/**
	* Encode a feature in this format.
	*
	* @abstract
	* @param {Feature} feature Feature.
	* @param {WriteOptions} [options] Write options.
	* @return {string|ArrayBuffer} Result.
	*/
	writeFeature(feature, options) {
		return abstract();
	}
	/**
	* Encode an array of features in this format.
	*
	* @abstract
	* @param {Array<Feature>} features Features.
	* @param {WriteOptions} [options] Write options.
	* @return {string|ArrayBuffer} Result.
	*/
	writeFeatures(features, options) {
		return abstract();
	}
	/**
	* Write a single geometry in this format.
	*
	* @abstract
	* @param {import("../geom/Geometry.js").default} geometry Geometry.
	* @param {WriteOptions} [options] Write options.
	* @return {string|ArrayBuffer} Result.
	*/
	writeGeometry(geometry, options) {
		return abstract();
	}
};
/**
* @template {import("../geom/Geometry.js").default|RenderFeature} T
* @param {T} geometry Geometry.
* @param {boolean} write Set to true for writing, false for reading.
* @param {WriteOptions|ReadOptions} [options] Options.
* @return {T} Transformed geometry.
*/
function transformGeometryWithOptions(geometry, write, options) {
	const featureProjection = options ? get$1(options.featureProjection) : null;
	const dataProjection = options ? get$1(options.dataProjection) : null;
	let transformed = geometry;
	if (featureProjection && dataProjection && !equivalent(featureProjection, dataProjection)) {
		if (write) transformed = geometry.clone();
		const fromProjection = write ? featureProjection : dataProjection;
		const toProjection = write ? dataProjection : featureProjection;
		if (fromProjection.getUnits() === "tile-pixels") transformed.transform(fromProjection, toProjection);
		else transformed.applyTransform(getTransform(fromProjection, toProjection));
	}
	if (write && options && options.decimals !== void 0) {
		const power = Math.pow(
			10,
			/** @type {WriteOptions} */
			options.decimals
		);
		/**
		* @param {Array<number>} coordinates Coordinates.
		* @return {Array<number>} Transformed coordinates.
		*/
		const transform = function(coordinates) {
			for (let i = 0, ii = coordinates.length; i < ii; ++i) coordinates[i] = Math.round(coordinates[i] * power) / power;
			return coordinates;
		};
		if (transformed === geometry) transformed = geometry.clone();
		transformed.applyTransform(transform);
	}
	return transformed;
}
var GeometryConstructor$1 = {
	Point,
	LineString,
	Polygon,
	MultiPoint,
	MultiLineString,
	MultiPolygon
};
function orientFlatCoordinates(flatCoordinates, ends, stride) {
	if (Array.isArray(ends[0])) {
		if (!linearRingssAreOriented(flatCoordinates, 0, ends, stride)) {
			flatCoordinates = flatCoordinates.slice();
			orientLinearRingsArray(flatCoordinates, 0, ends, stride);
		}
		return flatCoordinates;
	}
	if (!linearRingsAreOriented(flatCoordinates, 0, ends, stride)) {
		flatCoordinates = flatCoordinates.slice();
		orientLinearRings(flatCoordinates, 0, ends, stride);
	}
	return flatCoordinates;
}
/**
* @param {FeatureObject} object Feature object.
* @param {WriteOptions|ReadOptions} [options] Options.
* @return {RenderFeature|Array<RenderFeature>} Render feature.
*/
function createRenderFeature(object, options) {
	var _geometry$ends;
	const geometry = object.geometry;
	if (!geometry) return [];
	if (Array.isArray(geometry)) return geometry.map((geometry) => createRenderFeature(_objectSpread2(_objectSpread2({}, object), {}, { geometry }))).flat();
	const geometryType = geometry.type === "MultiPolygon" ? "Polygon" : geometry.type;
	if (geometryType === "GeometryCollection" || geometryType === "Circle") throw new Error("Unsupported geometry type: " + geometryType);
	const stride = geometry.layout.length;
	return transformGeometryWithOptions(new RenderFeature(geometryType, geometryType === "Polygon" ? orientFlatCoordinates(geometry.flatCoordinates, geometry.ends, stride) : geometry.flatCoordinates, (_geometry$ends = geometry.ends) === null || _geometry$ends === void 0 ? void 0 : _geometry$ends.flat(), stride, object.properties || {}, object.id).enableSimplifyTransformed(), false, options);
}
/**
* @param {GeometryObject|null} object Geometry object.
* @param {WriteOptions|ReadOptions} [options] Options.
* @return {import("../geom/Geometry.js").default} Geometry.
*/
function createGeometry(object, options) {
	if (!object) return null;
	if (Array.isArray(object)) return new GeometryCollection(object.map((geometry) => createGeometry(geometry, options)));
	const Geometry = GeometryConstructor$1[object.type];
	return transformGeometryWithOptions(new Geometry(object.flatCoordinates, object.layout || "XY", object.ends), false, options);
}
//#endregion
//#region node_modules/ol/format/JSONFeature.js
/**
* @module ol/format/JSONFeature
*/
/**
* @classdesc
* Abstract base class; normally only used for creating subclasses and not
* instantiated in apps.
* Base class for JSON feature formats.
*
* @template {import('../Feature.js').FeatureLike} [FeatureType=import("../Feature.js").default]
* @extends {FeatureFormat<FeatureType>}
* @abstract
*/
var JSONFeature = class extends FeatureFormat {
	constructor() {
		super();
	}
	/**
	* @return {import("./Feature.js").Type} Format.
	* @override
	*/
	getType() {
		return "json";
	}
	/**
	* Read a feature.  Only works for a single feature. Use `readFeatures` to
	* read a feature collection.
	*
	* @param {ArrayBuffer|Document|Element|Object|string} source Source.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @return {FeatureType|Array<FeatureType>} Feature.
	* @api
	* @override
	*/
	readFeature(source, options) {
		return this.readFeatureFromObject(getObject(source), this.getReadOptions(source, options));
	}
	/**
	* Read all features.  Works with both a single feature and a feature
	* collection.
	*
	* @param {ArrayBuffer|Document|Element|Object|string} source Source.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @return {Array<FeatureType>} Features.
	* @api
	* @override
	*/
	readFeatures(source, options) {
		return this.readFeaturesFromObject(getObject(source), this.getReadOptions(source, options));
	}
	/**
	* @abstract
	* @param {Object} object Object.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {FeatureType|Array<FeatureType>} Feature.
	*/
	readFeatureFromObject(object, options) {
		return abstract();
	}
	/**
	* @abstract
	* @param {Object} object Object.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {Array<FeatureType>} Features.
	*/
	readFeaturesFromObject(object, options) {
		return abstract();
	}
	/**
	* Read a geometry.
	*
	* @param {ArrayBuffer|Document|Element|Object|string} source Source.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @return {import("../geom/Geometry.js").default} Geometry.
	* @api
	* @override
	*/
	readGeometry(source, options) {
		return this.readGeometryFromObject(getObject(source), this.getReadOptions(source, options));
	}
	/**
	* @abstract
	* @param {Object} object Object.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {import("../geom/Geometry.js").default} Geometry.
	*/
	readGeometryFromObject(object, options) {
		return abstract();
	}
	/**
	* Read the projection.
	*
	* @param {ArrayBuffer|Document|Element|Object|string} source Source.
	* @return {import("../proj/Projection.js").default} Projection.
	* @api
	* @override
	*/
	readProjection(source) {
		return this.readProjectionFromObject(getObject(source));
	}
	/**
	* @abstract
	* @param {Object} object Object.
	* @protected
	* @return {import("../proj/Projection.js").default} Projection.
	*/
	readProjectionFromObject(object) {
		return abstract();
	}
	/**
	* Encode a feature as string.
	*
	* @param {import("../Feature.js").default} feature Feature.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {string} Encoded feature.
	* @api
	* @override
	*/
	writeFeature(feature, options) {
		return JSON.stringify(this.writeFeatureObject(feature, options));
	}
	/**
	* @abstract
	* @param {import("../Feature.js").default} feature Feature.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {Object} Object.
	*/
	writeFeatureObject(feature, options) {
		return abstract();
	}
	/**
	* Encode an array of features as string.
	*
	* @param {Array<import("../Feature.js").default>} features Features.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {string} Encoded features.
	* @api
	* @override
	*/
	writeFeatures(features, options) {
		return JSON.stringify(this.writeFeaturesObject(features, options));
	}
	/**
	* @abstract
	* @param {Array<import("../Feature.js").default>} features Features.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {Object} Object.
	*/
	writeFeaturesObject(features, options) {
		return abstract();
	}
	/**
	* Encode a geometry as string.
	*
	* @param {import("../geom/Geometry.js").default} geometry Geometry.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {string} Encoded geometry.
	* @api
	* @override
	*/
	writeGeometry(geometry, options) {
		return JSON.stringify(this.writeGeometryObject(geometry, options));
	}
	/**
	* @abstract
	* @param {import("../geom/Geometry.js").default} geometry Geometry.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {Object} Object.
	*/
	writeGeometryObject(geometry, options) {
		return abstract();
	}
};
/**
* @param {Document|Element|Object|string} source Source.
* @return {Object} Object.
*/
function getObject(source) {
	if (typeof source === "string") {
		const object = JSON.parse(source);
		return object ? object : null;
	}
	if (source !== null) return source;
	return null;
}
//#endregion
//#region node_modules/ol/format/GeoJSON.js
/**
* @module ol/format/GeoJSON
*/
/**
* @typedef {import("geojson").GeoJSON} GeoJSONObject
* @typedef {import("geojson").Feature} GeoJSONFeature
* @typedef {import("geojson").FeatureCollection} GeoJSONFeatureCollection
* @typedef {import("geojson").Geometry} GeoJSONGeometry
* @typedef {import("geojson").Point} GeoJSONPoint
* @typedef {import("geojson").LineString} GeoJSONLineString
* @typedef {import("geojson").Polygon} GeoJSONPolygon
* @typedef {import("geojson").MultiPoint} GeoJSONMultiPoint
* @typedef {import("geojson").MultiLineString} GeoJSONMultiLineString
* @typedef {import("geojson").MultiPolygon} GeoJSONMultiPolygon
* @typedef {import("geojson").GeometryCollection} GeoJSONGeometryCollection
*/
/**
* @template {import("../Feature.js").FeatureLike} [FeatureType=import("../Feature.js").default]
* @typedef {Object} Options
*
* @property {import("../proj.js").ProjectionLike} [dataProjection='EPSG:4326'] Default data projection.
* @property {import("../proj.js").ProjectionLike} [featureProjection] Projection for features read or
* written by the format.  Options passed to read or write methods will take precedence.
* @property {string} [geometryName] Geometry name to use when creating features.
* @property {boolean} [extractGeometryName=false] Certain GeoJSON providers include
* the geometry_name field in the feature GeoJSON. If set to `true` the GeoJSON reader
* will look for that field to set the geometry name. If both this field is set to `true`
* and a `geometryName` is provided, the `geometryName` will take precedence.
* @property {import('./Feature.js').FeatureToFeatureClass<FeatureType>} [featureClass] Feature class
* to be used when reading features. The default is {@link module:ol/Feature~Feature}. If performance is
* the primary concern, and features are not going to be modified or round-tripped through the format,
* consider using {@link module:ol/render/Feature~RenderFeature}
*/
/**
* @classdesc
* Feature format for reading and writing data in the GeoJSON format.
*
* @template {import('../Feature.js').FeatureLike} [FeatureType=import("../Feature.js").default]
* @extends {JSONFeature<FeatureType>}
* @api
*/
var GeoJSON = class extends JSONFeature {
	/**
	* @param {Options<FeatureType>} [options] Options.
	*/
	constructor(options) {
		options = options ? options : {};
		super();
		/**
		* @type {import("../proj/Projection.js").default}
		*/
		this.dataProjection = get$1(options.dataProjection ? options.dataProjection : "EPSG:4326");
		if (options.featureProjection)
 /**
		* @type {import("../proj/Projection.js").default}
		*/
		this.defaultFeatureProjection = get$1(options.featureProjection);
		if (options.featureClass) this.featureClass = options.featureClass;
		/**
		* Name of the geometry attribute for features.
		* @type {string|undefined}
		* @private
		*/
		this.geometryName_ = options.geometryName;
		/**
		* Look for the `geometry_name` in the feature GeoJSON
		* @type {boolean|undefined}
		* @private
		*/
		this.extractGeometryName_ = options.extractGeometryName;
		this.supportedMediaTypes = ["application/geo+json", "application/vnd.geo+json"];
	}
	/**
	* @param {Object} object Object.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {FeatureType|Array<FeatureType>} Feature.
	* @override
	*/
	readFeatureFromObject(object, options) {
		/**
		* @type {GeoJSONFeature}
		*/
		let geoJSONFeature = null;
		if (object["type"] === "Feature") geoJSONFeature = object;
		else geoJSONFeature = {
			"type": "Feature",
			"geometry": object,
			"properties": null
		};
		const geometry = readGeometryInternal(geoJSONFeature["geometry"], options);
		if (this.featureClass === RenderFeature) return createRenderFeature({
			geometry,
			id: geoJSONFeature["id"],
			properties: geoJSONFeature["properties"]
		}, options);
		const feature = new Feature();
		if (this.geometryName_) feature.setGeometryName(this.geometryName_);
		else if (this.extractGeometryName_ && geoJSONFeature["geometry_name"]) feature.setGeometryName(geoJSONFeature["geometry_name"]);
		feature.setGeometry(createGeometry(geometry, options));
		if ("id" in geoJSONFeature) feature.setId(geoJSONFeature["id"]);
		if (geoJSONFeature["properties"]) feature.setProperties(geoJSONFeature["properties"], true);
		return feature;
	}
	/**
	* @param {Object} object Object.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {Array<FeatureType>} Features.
	* @override
	*/
	readFeaturesFromObject(object, options) {
		const geoJSONObject = object;
		let features = null;
		if (geoJSONObject["type"] === "FeatureCollection") {
			const geoJSONFeatureCollection = object;
			features = [];
			const geoJSONFeatures = geoJSONFeatureCollection["features"];
			for (let i = 0, ii = geoJSONFeatures.length; i < ii; ++i) {
				const featureObject = this.readFeatureFromObject(geoJSONFeatures[i], options);
				if (!featureObject) continue;
				features.push(featureObject);
			}
		} else features = [this.readFeatureFromObject(object, options)];
		return features.flat();
	}
	/**
	* @param {GeoJSONGeometry} object Object.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {import("../geom/Geometry.js").default} Geometry.
	* @override
	*/
	readGeometryFromObject(object, options) {
		return readGeometry(object, options);
	}
	/**
	* @param {Object} object Object.
	* @protected
	* @return {import("../proj/Projection.js").default} Projection.
	* @override
	*/
	readProjectionFromObject(object) {
		const crs = object["crs"];
		let projection;
		if (crs) if (crs["type"] == "name") projection = get$1(crs["properties"]["name"]);
		else if (crs["type"] === "EPSG") projection = get$1("EPSG:" + crs["properties"]["code"]);
		else throw new Error("Unknown SRS type");
		else projection = this.dataProjection;
		return projection;
	}
	/**
	* Encode a feature as a GeoJSON Feature object.
	*
	* @param {import("../Feature.js").default} feature Feature.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {GeoJSONFeature} Object.
	* @api
	* @override
	*/
	writeFeatureObject(feature, options) {
		options = this.adaptOptions(options);
		/** @type {GeoJSONFeature} */
		const object = {
			"type": "Feature",
			geometry: null,
			properties: null
		};
		const id = feature.getId();
		if (id !== void 0) object.id = id;
		if (!feature.hasProperties()) return object;
		const properties = feature.getProperties();
		const geometry = feature.getGeometry();
		if (geometry) {
			object.geometry = writeGeometry(geometry, options);
			delete properties[feature.getGeometryName()];
		}
		if (!isEmpty$1(properties)) object.properties = properties;
		return object;
	}
	/**
	* Encode an array of features as a GeoJSON object.
	*
	* @param {Array<import("../Feature.js").default>} features Features.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {GeoJSONFeatureCollection} GeoJSON Object.
	* @api
	* @override
	*/
	writeFeaturesObject(features, options) {
		options = this.adaptOptions(options);
		const objects = [];
		for (let i = 0, ii = features.length; i < ii; ++i) objects.push(this.writeFeatureObject(features[i], options));
		return {
			type: "FeatureCollection",
			features: objects
		};
	}
	/**
	* Encode a geometry as a GeoJSON object.
	*
	* @param {import("../geom/Geometry.js").default} geometry Geometry.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {GeoJSONGeometry|GeoJSONGeometryCollection} Object.
	* @api
	* @override
	*/
	writeGeometryObject(geometry, options) {
		return writeGeometry(geometry, this.adaptOptions(options));
	}
};
/**
* @param {GeoJSONGeometry|GeoJSONGeometryCollection} object Object.
* @param {import("./Feature.js").ReadOptions} [options] Read options.
* @return {import("./Feature.js").GeometryObject} Geometry.
*/
function readGeometryInternal(object, options) {
	if (!object) return null;
	/** @type {import("./Feature.js").GeometryObject} */
	let geometry;
	switch (object["type"]) {
		case "Point":
			geometry = readPointGeometry$1(object);
			break;
		case "LineString":
			geometry = readLineStringGeometry$1(object);
			break;
		case "Polygon":
			geometry = readPolygonGeometry$1(object);
			break;
		case "MultiPoint":
			geometry = readMultiPointGeometry$1(object);
			break;
		case "MultiLineString":
			geometry = readMultiLineStringGeometry$1(object);
			break;
		case "MultiPolygon":
			geometry = readMultiPolygonGeometry$1(object);
			break;
		case "GeometryCollection":
			geometry = readGeometryCollectionGeometry(object);
			break;
		default: throw new Error("Unsupported GeoJSON type: " + object["type"]);
	}
	return geometry;
}
/**
* @param {GeoJSONGeometry|GeoJSONGeometryCollection} object Object.
* @param {import("./Feature.js").ReadOptions} [options] Read options.
* @return {import("../geom/Geometry.js").default} Geometry.
*/
function readGeometry(object, options) {
	return createGeometry(readGeometryInternal(object, options), options);
}
/**
* @param {GeoJSONGeometryCollection} object Object.
* @param {import("./Feature.js").ReadOptions} [options] Read options.
* @return {import("./Feature.js").GeometryCollectionObject} Geometry collection.
*/
function readGeometryCollectionGeometry(object, options) {
	return object["geometries"].map(
		/**
		* @param {GeoJSONGeometry} geometry Geometry.
		* @return {import("./Feature.js").GeometryObject} geometry Geometry.
		*/
		function(geometry) {
			return readGeometryInternal(geometry, options);
		}
	);
}
/**
* @param {GeoJSONPoint} object Input object.
* @return {import("./Feature.js").GeometryObject} Point geometry.
*/
function readPointGeometry$1(object) {
	const flatCoordinates = object["coordinates"];
	return {
		type: "Point",
		flatCoordinates,
		layout: getLayoutForStride(flatCoordinates.length)
	};
}
/**
* @param {GeoJSONLineString} object Object.
* @return {import("./Feature.js").GeometryObject} LineString geometry.
*/
function readLineStringGeometry$1(object) {
	var _coordinates$;
	const coordinates = object["coordinates"];
	const flatCoordinates = coordinates.flat();
	return {
		type: "LineString",
		flatCoordinates,
		ends: [flatCoordinates.length],
		layout: getLayoutForStride(((_coordinates$ = coordinates[0]) === null || _coordinates$ === void 0 ? void 0 : _coordinates$.length) || 2)
	};
}
/**
* @param {GeoJSONMultiLineString} object Object.
* @return {import("./Feature.js").GeometryObject} MultiLineString geometry.
*/
function readMultiLineStringGeometry$1(object) {
	var _coordinates$2;
	const coordinates = object["coordinates"];
	const stride = ((_coordinates$2 = coordinates[0]) === null || _coordinates$2 === void 0 || (_coordinates$2 = _coordinates$2[0]) === null || _coordinates$2 === void 0 ? void 0 : _coordinates$2.length) || 2;
	const flatCoordinates = [];
	return {
		type: "MultiLineString",
		flatCoordinates,
		ends: deflateCoordinatesArray(flatCoordinates, 0, coordinates, stride),
		layout: getLayoutForStride(stride)
	};
}
/**
* @param {GeoJSONMultiPoint} object Object.
* @return {import("./Feature.js").GeometryObject} MultiPoint geometry.
*/
function readMultiPointGeometry$1(object) {
	var _coordinates$3;
	const coordinates = object["coordinates"];
	return {
		type: "MultiPoint",
		flatCoordinates: coordinates.flat(),
		layout: getLayoutForStride(((_coordinates$3 = coordinates[0]) === null || _coordinates$3 === void 0 ? void 0 : _coordinates$3.length) || 2)
	};
}
/**
* @param {GeoJSONMultiPolygon} object Object.
* @return {import("./Feature.js").GeometryObject} MultiPolygon geometry.
*/
function readMultiPolygonGeometry$1(object) {
	var _coordinates$4;
	const coordinates = object["coordinates"];
	const flatCoordinates = [];
	const stride = ((_coordinates$4 = coordinates[0]) === null || _coordinates$4 === void 0 || (_coordinates$4 = _coordinates$4[0]) === null || _coordinates$4 === void 0 ? void 0 : _coordinates$4[0].length) || 2;
	return {
		type: "MultiPolygon",
		flatCoordinates,
		ends: deflateMultiCoordinatesArray(flatCoordinates, 0, coordinates, stride),
		layout: getLayoutForStride(stride)
	};
}
/**
* @param {GeoJSONPolygon} object Object.
* @return {import("./Feature.js").GeometryObject} Polygon.
*/
function readPolygonGeometry$1(object) {
	var _coordinates$5;
	const coordinates = object["coordinates"];
	const flatCoordinates = [];
	const stride = (_coordinates$5 = coordinates[0]) === null || _coordinates$5 === void 0 || (_coordinates$5 = _coordinates$5[0]) === null || _coordinates$5 === void 0 ? void 0 : _coordinates$5.length;
	return {
		type: "Polygon",
		flatCoordinates,
		ends: deflateCoordinatesArray(flatCoordinates, 0, coordinates, stride),
		layout: getLayoutForStride(stride)
	};
}
/**
* @param {import("../geom/Geometry.js").default} geometry Geometry.
* @param {import("./Feature.js").WriteOptions} [options] Write options.
* @return {GeoJSONGeometry} GeoJSON geometry.
*/
function writeGeometry(geometry, options) {
	geometry = transformGeometryWithOptions(geometry, true, options);
	const type = geometry.getType();
	/** @type {GeoJSONGeometry} */
	let geoJSON;
	switch (type) {
		case "Point":
			geoJSON = writePointGeometry(geometry, options);
			break;
		case "LineString":
			geoJSON = writeLineStringGeometry(geometry, options);
			break;
		case "Polygon":
			geoJSON = writePolygonGeometry(geometry, options);
			break;
		case "MultiPoint":
			geoJSON = writeMultiPointGeometry(geometry, options);
			break;
		case "MultiLineString":
			geoJSON = writeMultiLineStringGeometry(geometry, options);
			break;
		case "MultiPolygon":
			geoJSON = writeMultiPolygonGeometry(geometry, options);
			break;
		case "GeometryCollection":
			geoJSON = writeGeometryCollectionGeometry(geometry, options);
			break;
		case "Circle":
			geoJSON = {
				type: "GeometryCollection",
				geometries: []
			};
			break;
		default: throw new Error("Unsupported geometry type: " + type);
	}
	return geoJSON;
}
/**
* @param {import("../geom/GeometryCollection.js").default} geometry Geometry.
* @param {import("./Feature.js").WriteOptions} [options] Write options.
* @return {GeoJSONGeometryCollection} GeoJSON geometry collection.
*/
function writeGeometryCollectionGeometry(geometry, options) {
	options = Object.assign({}, options);
	delete options.featureProjection;
	return {
		type: "GeometryCollection",
		geometries: geometry.getGeometriesArray().map(function(geometry) {
			return writeGeometry(geometry, options);
		})
	};
}
/**
* @param {import("../geom/LineString.js").default} geometry Geometry.
* @param {import("./Feature.js").WriteOptions} [options] Write options.
* @return {GeoJSONGeometry} GeoJSON geometry.
*/
function writeLineStringGeometry(geometry, options) {
	return {
		type: "LineString",
		coordinates: geometry.getCoordinates()
	};
}
/**
* @param {import("../geom/MultiLineString.js").default} geometry Geometry.
* @param {import("./Feature.js").WriteOptions} [options] Write options.
* @return {GeoJSONGeometry} GeoJSON geometry.
*/
function writeMultiLineStringGeometry(geometry, options) {
	return {
		type: "MultiLineString",
		coordinates: geometry.getCoordinates()
	};
}
/**
* @param {import("../geom/MultiPoint.js").default} geometry Geometry.
* @param {import("./Feature.js").WriteOptions} [options] Write options.
* @return {GeoJSONGeometry} GeoJSON geometry.
*/
function writeMultiPointGeometry(geometry, options) {
	return {
		type: "MultiPoint",
		coordinates: geometry.getCoordinates()
	};
}
/**
* @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
* @param {import("./Feature.js").WriteOptions} [options] Write options.
* @return {GeoJSONGeometry} GeoJSON geometry.
*/
function writeMultiPolygonGeometry(geometry, options) {
	let right;
	if (options) right = options.rightHanded;
	return {
		type: "MultiPolygon",
		coordinates: geometry.getCoordinates(right)
	};
}
/**
* @param {import("../geom/Point.js").default} geometry Geometry.
* @param {import("./Feature.js").WriteOptions} [options] Write options.
* @return {GeoJSONGeometry} GeoJSON geometry.
*/
function writePointGeometry(geometry, options) {
	return {
		type: "Point",
		coordinates: geometry.getCoordinates()
	};
}
/**
* @param {import("../geom/Polygon.js").default} geometry Geometry.
* @param {import("./Feature.js").WriteOptions} [options] Write options.
* @return {GeoJSONGeometry} GeoJSON geometry.
*/
function writePolygonGeometry(geometry, options) {
	let right;
	if (options) right = options.rightHanded;
	return {
		type: "Polygon",
		coordinates: geometry.getCoordinates(right)
	};
}
//#endregion
//#region node_modules/ol/xml.js
/**
* @module ol/xml
*/
/**
* When using {@link module:ol/xml.makeChildAppender} or
* {@link module:ol/xml.makeSimpleNodeFactory}, the top `objectStack` item needs
* to have this structure.
* @typedef {Object} NodeStackItem
* @property {Element} node Node.
*/
/**
* @typedef {function(Element, Array<*>): void} Parser
*/
/**
* @typedef {function(Element, *, Array<*>): void} Serializer
*/
/**
* @type {string}
*/
var XML_SCHEMA_INSTANCE_URI = "http://www.w3.org/2001/XMLSchema-instance";
/**
* @param {string} namespaceURI Namespace URI.
* @param {string} qualifiedName Qualified name.
* @return {Element} Node.
*/
function createElementNS(namespaceURI, qualifiedName) {
	return getDocument().createElementNS(namespaceURI, qualifiedName);
}
/**
* Recursively grab all text content of child nodes into a single string.
* @param {Node} node Node.
* @param {boolean} normalizeWhitespace Normalize whitespace: remove all line
* breaks.
* @return {string} All text content.
* @api
*/
function getAllTextContent(node, normalizeWhitespace) {
	return getAllTextContent_(node, normalizeWhitespace, []).join("");
}
/**
* Recursively grab all text content of child nodes into a single string.
* @param {Node} node Node.
* @param {boolean} normalizeWhitespace Normalize whitespace: remove all line
* breaks.
* @param {Array<string>} accumulator Accumulator.
* @private
* @return {Array<string>} Accumulator.
*/
function getAllTextContent_(node, normalizeWhitespace, accumulator) {
	if (node.nodeType == Node.CDATA_SECTION_NODE || node.nodeType == Node.TEXT_NODE) if (normalizeWhitespace) accumulator.push(String(node.nodeValue).replace(/(\r\n|\r|\n)/g, ""));
	else accumulator.push(node.nodeValue);
	else {
		let n;
		for (n = node.firstChild; n; n = n.nextSibling) getAllTextContent_(n, normalizeWhitespace, accumulator);
	}
	return accumulator;
}
/**
* @param {Object} object Object.
* @return {boolean} Is a document.
*/
function isDocument(object) {
	return "documentElement" in object;
}
/**
* Parse an XML string to an XML Document.
* @param {string} xml XML.
* @return {Document} Document.
* @api
*/
function parse(xml) {
	return new DOMParser().parseFromString(xml, "application/xml");
}
/**
* Make an array extender function for extending the array at the top of the
* object stack.
* @param {function(this: T, Node, Array<*>): (Array<*>|undefined)} valueReader Value reader.
* @param {T} [thisArg] The object to use as `this` in `valueReader`.
* @return {Parser} Parser.
* @template T
*/
function makeArrayExtender(valueReader, thisArg) {
	return (function(node, objectStack) {
		const value = valueReader.call(thisArg !== null && thisArg !== void 0 ? thisArg : this, node, objectStack);
		if (value !== void 0) {
			const array = objectStack[objectStack.length - 1];
			extend(array, value);
		}
	});
}
/**
* Make an array pusher function for pushing to the array at the top of the
* object stack.
* @param {function(this: T, Element, Array<*>): *} valueReader Value reader.
* @param {T} [thisArg] The object to use as `this` in `valueReader`.
* @return {Parser} Parser.
* @template T
*/
function makeArrayPusher(valueReader, thisArg) {
	return (function(node, objectStack) {
		const value = valueReader.call(thisArg !== null && thisArg !== void 0 ? thisArg : this, node, objectStack);
		if (value !== void 0) objectStack[objectStack.length - 1].push(value);
	});
}
/**
* Make an object stack replacer function for replacing the object at the
* top of the stack.
* @param {function(this: T, Node, Array<*>): *} valueReader Value reader.
* @param {T} [thisArg] The object to use as `this` in `valueReader`.
* @return {Parser} Parser.
* @template T
*/
function makeReplacer(valueReader, thisArg) {
	return (function(node, objectStack) {
		const value = valueReader.call(thisArg !== null && thisArg !== void 0 ? thisArg : this, node, objectStack);
		if (value !== void 0) objectStack[objectStack.length - 1] = value;
	});
}
/**
* Make an object property pusher function for adding a property to the
* object at the top of the stack.
* @param {function(this: T, Element, Array<*>): *} valueReader Value reader.
* @param {string} [property] Property.
* @param {T} [thisArg] The object to use as `this` in `valueReader`.
* @return {Parser} Parser.
* @template T
*/
function makeObjectPropertyPusher(valueReader, property, thisArg) {
	return (function(node, objectStack) {
		const value = valueReader.call(thisArg !== null && thisArg !== void 0 ? thisArg : this, node, objectStack);
		if (value !== void 0) {
			const object = objectStack[objectStack.length - 1];
			const name = property !== void 0 ? property : node.localName;
			let array;
			if (name in object) array = object[name];
			else {
				array = [];
				object[name] = array;
			}
			array.push(value);
		}
	});
}
/**
* Make an object property setter function.
* @param {function(this: T, Element, Array<*>): *} valueReader Value reader.
* @param {string} [property] Property.
* @param {T} [thisArg] The object to use as `this` in `valueReader`.
* @return {Parser} Parser.
* @template T
*/
function makeObjectPropertySetter(valueReader, property, thisArg) {
	return (function(node, objectStack) {
		const value = valueReader.call(thisArg !== null && thisArg !== void 0 ? thisArg : this, node, objectStack);
		if (value !== void 0) {
			const object = objectStack[objectStack.length - 1];
			const name = property !== void 0 ? property : node.localName;
			object[name] = value;
		}
	});
}
/**
* Create a serializer that appends nodes written by its `nodeWriter` to its
* designated parent. The parent is the `node` of the
* {@link module:ol/xml~NodeStackItem} at the top of the `objectStack`.
* @param {function(this: T, Node, V, Array<*>): void} nodeWriter Node writer.
* @param {T} [thisArg] The object to use as `this` in `nodeWriter`.
* @return {Serializer} Serializer.
* @template T, V
*/
function makeChildAppender(nodeWriter, thisArg) {
	return (function(node, value, objectStack) {
		nodeWriter.call(thisArg !== null && thisArg !== void 0 ? thisArg : this, node, value, objectStack);
		objectStack[objectStack.length - 1].node.appendChild(node);
	});
}
/**
* Create a serializer that calls the provided `nodeWriter` from
* {@link module:ol/xml.serialize}. This can be used by the parent writer to have the
* `nodeWriter` called with an array of values when the `nodeWriter` was
* designed to serialize a single item. An example would be a LineString
* geometry writer, which could be reused for writing MultiLineString
* geometries.
* @param {function(this: T, Element, V, Array<*>): void} nodeWriter Node writer.
* @param {T} [thisArg] The object to use as `this` in `nodeWriter`.
* @return {Serializer} Serializer.
* @template T, V
*/
function makeArraySerializer(nodeWriter, thisArg) {
	let serializersNS, nodeFactory;
	return function(node, value, objectStack) {
		if (serializersNS === void 0) {
			serializersNS = {};
			const serializers = {};
			serializers[node.localName] = nodeWriter;
			serializersNS[node.namespaceURI] = serializers;
			nodeFactory = makeSimpleNodeFactory(node.localName);
		}
		serialize(serializersNS, nodeFactory, value, objectStack);
	};
}
/**
* Create a node factory which can use the `keys` passed to
* {@link module:ol/xml.serialize} or {@link module:ol/xml.pushSerializeAndPop} as node names,
* or a fixed node name. The namespace of the created nodes can either be fixed,
* or the parent namespace will be used.
* @param {string} [fixedNodeName] Fixed node name which will be used for all
*     created nodes. If not provided, the 3rd argument to the resulting node
*     factory needs to be provided and will be the nodeName.
* @param {string} [fixedNamespaceURI] Fixed namespace URI which will be used for
*     all created nodes. If not provided, the namespace of the parent node will
*     be used.
* @return {function(*, Array<*>, string=): (Node|undefined)} Node factory.
*/
function makeSimpleNodeFactory(fixedNodeName, fixedNamespaceURI) {
	return (function(value, objectStack, newNodeName) {
		const node = objectStack[objectStack.length - 1].node;
		let nodeName = fixedNodeName;
		if (nodeName === void 0) nodeName = newNodeName;
		return createElementNS(fixedNamespaceURI !== void 0 ? fixedNamespaceURI : node.namespaceURI, nodeName);
	});
}
/**
* A node factory that creates a node using the parent's `namespaceURI` and the
* `nodeName` passed by {@link module:ol/xml.serialize} or
* {@link module:ol/xml.pushSerializeAndPop} to the node factory.
* @const
* @type {function(*, Array<*>, string=): (Node|undefined)}
*/
var OBJECT_PROPERTY_NODE_FACTORY = makeSimpleNodeFactory();
/**
* Create an array of `values` to be used with {@link module:ol/xml.serialize} or
* {@link module:ol/xml.pushSerializeAndPop}, where `orderedKeys` has to be provided as
* `key` argument.
* @param {Object<string, *>} object Key-value pairs for the sequence. Keys can
*     be a subset of the `orderedKeys`.
* @param {Array<string>} orderedKeys Keys in the order of the sequence.
* @return {Array<*>} Values in the order of the sequence. The resulting array
*     has the same length as the `orderedKeys` array. Values that are not
*     present in `object` will be `undefined` in the resulting array.
*/
function makeSequence(object, orderedKeys) {
	const length = orderedKeys.length;
	const sequence = new Array(length);
	for (let i = 0; i < length; ++i) sequence[i] = object[orderedKeys[i]];
	return sequence;
}
/**
* Create a namespaced structure, using the same values for each namespace.
* This can be used as a starting point for versioned parsers, when only a few
* values are version specific.
* @param {Array<string>} namespaceURIs Namespace URIs.
* @param {T} structure Structure.
* @param {Object<string, T>} [structureNS] Namespaced structure to add to.
* @return {Object<string, T>} Namespaced structure.
* @template T
*/
function makeStructureNS(namespaceURIs, structure, structureNS) {
	structureNS = structureNS !== void 0 ? structureNS : {};
	let i, ii;
	for (i = 0, ii = namespaceURIs.length; i < ii; ++i) structureNS[namespaceURIs[i]] = structure;
	return structureNS;
}
/**
* Parse a node using the parsers and object stack.
* @param {Object<string, Object<string, Parser>>} parsersNS
*     Parsers by namespace.
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @param {*} [thisArg] The object to use as `this`.
*/
function parseNode(parsersNS, node, objectStack, thisArg) {
	let n;
	for (n = node.firstElementChild; n; n = n.nextElementSibling) {
		const parsers = parsersNS[n.namespaceURI];
		if (parsers !== void 0) {
			const parser = parsers[n.localName];
			if (parser !== void 0) parser.call(thisArg, n, objectStack);
		}
	}
}
/**
* Push an object on top of the stack, parse and return the popped object.
* @param {T} object Object.
* @param {Object<string, Object<string, Parser>>} parsersNS
*     Parsers by namespace.
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @param {*} [thisArg] The object to use as `this`.
* @return {T} Object.
* @template T
*/
function pushParseAndPop(object, parsersNS, node, objectStack, thisArg) {
	objectStack.push(object);
	parseNode(parsersNS, node, objectStack, thisArg);
	return objectStack.pop();
}
/**
* Walk through an array of `values` and call a serializer for each value.
* @param {Object<string, Object<string, Serializer>>} serializersNS
*     Namespaced serializers.
* @param {function(this: T, *, Array<*>, (string|undefined)): (Node|undefined)} nodeFactory
*     Node factory. The `nodeFactory` creates the node whose namespace and name
*     will be used to choose a node writer from `serializersNS`. This
*     separation allows us to decide what kind of node to create, depending on
*     the value we want to serialize. An example for this would be different
*     geometry writers based on the geometry type.
* @param {Array<*>} values Values to serialize. An example would be an array
*     of {@link module:ol/Feature~Feature} instances.
* @param {Array<*>} objectStack Node stack.
* @param {Array<string>} [keys] Keys of the `values`. Will be passed to the
*     `nodeFactory`. This is used for serializing object literals where the
*     node name relates to the property key. The array length of `keys` has
*     to match the length of `values`. For serializing a sequence, `keys`
*     determines the order of the sequence.
* @param {T} [thisArg] The object to use as `this` for the node factory and
*     serializers.
* @template T
*/
function serialize(serializersNS, nodeFactory, values, objectStack, keys, thisArg) {
	const length = (keys !== void 0 ? keys : values).length;
	let value, node;
	for (let i = 0; i < length; ++i) {
		value = values[i];
		if (value !== void 0) {
			node = nodeFactory.call(thisArg, value, objectStack, keys !== void 0 ? keys[i] : void 0);
			if (node !== void 0) serializersNS[node.namespaceURI][node.localName].call(thisArg, node, value, objectStack);
		}
	}
}
/**
* @param {O} object Object.
* @param {Object<string, Object<string, Serializer>>} serializersNS
*     Namespaced serializers.
* @param {function(this: T, *, Array<*>, (string|undefined)): (Node|undefined)} nodeFactory
*     Node factory. The `nodeFactory` creates the node whose namespace and name
*     will be used to choose a node writer from `serializersNS`. This
*     separation allows us to decide what kind of node to create, depending on
*     the value we want to serialize. An example for this would be different
*     geometry writers based on the geometry type.
* @param {Array<*>} values Values to serialize. An example would be an array
*     of {@link module:ol/Feature~Feature} instances.
* @param {Array<*>} objectStack Node stack.
* @param {Array<string>} [keys] Keys of the `values`. Will be passed to the
*     `nodeFactory`. This is used for serializing object literals where the
*     node name relates to the property key. The array length of `keys` has
*     to match the length of `values`. For serializing a sequence, `keys`
*     determines the order of the sequence.
* @param {T} [thisArg] The object to use as `this` for the node factory and
*     serializers.
* @return {O|undefined} Object.
* @template O, T
*/
function pushSerializeAndPop(object, serializersNS, nodeFactory, values, objectStack, keys, thisArg) {
	objectStack.push(object);
	serialize(serializersNS, nodeFactory, values, objectStack, keys, thisArg);
	return objectStack.pop();
}
var xmlSerializer_ = void 0;
/**
* @return {XMLSerializer} The XMLSerializer.
*/
function getXMLSerializer() {
	if (xmlSerializer_ === void 0 && typeof XMLSerializer !== "undefined") xmlSerializer_ = new XMLSerializer();
	return xmlSerializer_;
}
var document_ = void 0;
/**
* Get a document that should be used when creating nodes for XML serializations.
* @return {Document} The document.
*/
function getDocument() {
	if (document_ === void 0 && typeof document !== "undefined") document_ = document.implementation.createDocument("", "", null);
	return document_;
}
//#endregion
//#region node_modules/ol/format/XMLFeature.js
/**
* @module ol/format/XMLFeature
*/
/**
* @classdesc
* Abstract base class; normally only used for creating subclasses and not
* instantiated in apps.
* Base class for XML feature formats.
*
* @abstract
*/
var XMLFeature = class extends FeatureFormat {
	constructor() {
		super();
		/**
		* @type {XMLSerializer}
		* @private
		*/
		this.xmlSerializer_ = getXMLSerializer();
	}
	/**
	* @return {import("./Feature.js").Type} Format.
	* @override
	*/
	getType() {
		return "xml";
	}
	/**
	* Read a single feature.
	*
	* @param {Document|Element|Object|string} source Source.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @return {import("../Feature.js").default} Feature.
	* @api
	* @override
	*/
	readFeature(source, options) {
		if (!source) return null;
		if (typeof source === "string") {
			const doc = parse(source);
			return this.readFeatureFromDocument(doc, options);
		}
		if (isDocument(source)) return this.readFeatureFromDocument(source, options);
		return this.readFeatureFromNode(source, options);
	}
	/**
	* @param {Document} doc Document.
	* @param {import("./Feature.js").ReadOptions} [options] Options.
	* @return {import("../Feature.js").default} Feature.
	*/
	readFeatureFromDocument(doc, options) {
		const features = this.readFeaturesFromDocument(doc, options);
		if (features.length > 0) return features[0];
		return null;
	}
	/**
	* @param {Element} node Node.
	* @param {import("./Feature.js").ReadOptions} [options] Options.
	* @return {import("../Feature.js").default} Feature.
	*/
	readFeatureFromNode(node, options) {
		return null;
	}
	/**
	* Read all features from a feature collection.
	*
	* @param {Document|Element|Object|string} source Source.
	* @param {import("./Feature.js").ReadOptions} [options] Options.
	* @return {Array<import("../Feature.js").default>} Features.
	* @api
	* @override
	*/
	readFeatures(source, options) {
		if (!source) return [];
		if (typeof source === "string") {
			const doc = parse(source);
			return this.readFeaturesFromDocument(doc, options);
		}
		if (isDocument(source)) return this.readFeaturesFromDocument(source, options);
		return this.readFeaturesFromNode(source, options);
	}
	/**
	* @param {Document} doc Document.
	* @param {import("./Feature.js").ReadOptions} [options] Options.
	* @protected
	* @return {Array<import("../Feature.js").default>} Features.
	*/
	readFeaturesFromDocument(doc, options) {
		/** @type {Array<import("../Feature.js").default>} */
		const features = [];
		for (let n = doc.firstChild; n; n = n.nextSibling) if (n.nodeType == Node.ELEMENT_NODE) extend(features, this.readFeaturesFromNode(n, options));
		return features;
	}
	/**
	* @abstract
	* @param {Element} node Node.
	* @param {import("./Feature.js").ReadOptions} [options] Options.
	* @protected
	* @return {Array<import("../Feature.js").default>} Features.
	*/
	readFeaturesFromNode(node, options) {
		return abstract();
	}
	/**
	* Read a single geometry from a source.
	*
	* @param {Document|Element|Object|string} source Source.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @return {import("../geom/Geometry.js").default} Geometry.
	* @override
	*/
	readGeometry(source, options) {
		if (!source) return null;
		if (typeof source === "string") {
			const doc = parse(source);
			return this.readGeometryFromDocument(doc, options);
		}
		if (isDocument(source)) return this.readGeometryFromDocument(source, options);
		return this.readGeometryFromNode(source, options);
	}
	/**
	* @param {Document} doc Document.
	* @param {import("./Feature.js").ReadOptions} [options] Options.
	* @protected
	* @return {import("../geom/Geometry.js").default} Geometry.
	*/
	readGeometryFromDocument(doc, options) {
		return null;
	}
	/**
	* @param {Element} node Node.
	* @param {import("./Feature.js").ReadOptions} [options] Options.
	* @protected
	* @return {import("../geom/Geometry.js").default} Geometry.
	*/
	readGeometryFromNode(node, options) {
		return null;
	}
	/**
	* Read the projection from the source.
	*
	* @param {Document|Element|Object|string} source Source.
	* @return {import("../proj/Projection.js").default} Projection.
	* @api
	* @override
	*/
	readProjection(source) {
		if (!source) return null;
		if (typeof source === "string") {
			const doc = parse(source);
			return this.readProjectionFromDocument(doc);
		}
		if (isDocument(source)) return this.readProjectionFromDocument(source);
		return this.readProjectionFromNode(source);
	}
	/**
	* @param {Document} doc Document.
	* @protected
	* @return {import("../proj/Projection.js").default} Projection.
	*/
	readProjectionFromDocument(doc) {
		return this.dataProjection;
	}
	/**
	* @param {Element} node Node.
	* @protected
	* @return {import("../proj/Projection.js").default} Projection.
	*/
	readProjectionFromNode(node) {
		return this.dataProjection;
	}
	/**
	* Encode a feature as string.
	*
	* @param {import("../Feature.js").default} feature Feature.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {string} Encoded feature.
	* @override
	*/
	writeFeature(feature, options) {
		const node = this.writeFeatureNode(feature, options);
		return this.xmlSerializer_.serializeToString(node);
	}
	/**
	* @param {import("../Feature.js").default} feature Feature.
	* @param {import("./Feature.js").WriteOptions} [options] Options.
	* @protected
	* @return {Node} Node.
	*/
	writeFeatureNode(feature, options) {
		return null;
	}
	/**
	* Encode an array of features as string.
	*
	* @param {Array<import("../Feature.js").default>} features Features.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {string} Result.
	* @api
	* @override
	*/
	writeFeatures(features, options) {
		const node = this.writeFeaturesNode(features, options);
		return this.xmlSerializer_.serializeToString(node);
	}
	/**
	* @param {Array<import("../Feature.js").default>} features Features.
	* @param {import("./Feature.js").WriteOptions} [options] Options.
	* @return {Node} Node.
	*/
	writeFeaturesNode(features, options) {
		return null;
	}
	/**
	* Encode a geometry as string.
	*
	* @param {import("../geom/Geometry.js").default} geometry Geometry.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {string} Encoded geometry.
	* @override
	*/
	writeGeometry(geometry, options) {
		const node = this.writeGeometryNode(geometry, options);
		return this.xmlSerializer_.serializeToString(node);
	}
	/**
	* @param {import("../geom/Geometry.js").default} geometry Geometry.
	* @param {import("./Feature.js").WriteOptions} [options] Options.
	* @return {Node} Node.
	*/
	writeGeometryNode(geometry, options) {
		return null;
	}
};
//#endregion
//#region node_modules/ol/format/xsd.js
/**
* @module ol/format/xsd
*/
/**
* @param {Node} node Node.
* @return {boolean|undefined} Boolean.
*/
function readBoolean(node) {
	return readBooleanString(getAllTextContent(node, false));
}
/**
* @param {string} string String.
* @return {boolean|undefined} Boolean.
*/
function readBooleanString(string) {
	const m = /^\s*(true|1)|(false|0)\s*$/.exec(string);
	if (m) return m[1] !== void 0 || false;
}
/**
* @param {Node} node Node.
* @return {number|undefined} DateTime in seconds.
*/
function readDateTime(node) {
	const s = getAllTextContent(node, false);
	const dateTime = Date.parse(s);
	return isNaN(dateTime) ? void 0 : dateTime / 1e3;
}
/**
* @param {Node} node Node.
* @return {number|undefined} Decimal.
*/
function readDecimal(node) {
	return readDecimalString(getAllTextContent(node, false));
}
/**
* @param {string} string String.
* @return {number|undefined} Decimal.
*/
function readDecimalString(string) {
	const m = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(string);
	if (m) return parseFloat(m[1]);
}
/**
* @param {Node} node Node.
* @return {number|undefined} Non negative integer.
*/
function readPositiveInteger(node) {
	return readNonNegativeIntegerString(getAllTextContent(node, false));
}
/**
* @param {string} string String.
* @return {number|undefined} Non negative integer.
*/
function readNonNegativeIntegerString(string) {
	const m = /^\s*(\d+)\s*$/.exec(string);
	if (m) return parseInt(m[1], 10);
}
/**
* @param {Node} node Node.
* @return {string|undefined} String.
*/
function readString(node) {
	return getAllTextContent(node, false).trim();
}
/**
* @param {Node} node Node to append a TextNode with the boolean to.
* @param {boolean} bool Boolean.
*/
function writeBooleanTextNode(node, bool) {
	writeStringTextNode(node, bool ? "1" : "0");
}
/**
* @param {Node} node Node to append a CDATA Section with the string to.
* @param {string} string String.
*/
function writeCDATASection(node, string) {
	node.appendChild(getDocument().createCDATASection(string));
}
/**
* @param {Node} node Node to append a TextNode with the dateTime to.
* @param {number} dateTime DateTime in seconds.
*/
function writeDateTimeTextNode(node, dateTime) {
	const date = /* @__PURE__ */ new Date(dateTime * 1e3);
	const string = date.getUTCFullYear() + "-" + padNumber(date.getUTCMonth() + 1, 2) + "-" + padNumber(date.getUTCDate(), 2) + "T" + padNumber(date.getUTCHours(), 2) + ":" + padNumber(date.getUTCMinutes(), 2) + ":" + padNumber(date.getUTCSeconds(), 2) + "Z";
	node.appendChild(getDocument().createTextNode(string));
}
/**
* @param {Node} node Node to append a TextNode with the decimal to.
* @param {number} decimal Decimal.
*/
function writeDecimalTextNode(node, decimal) {
	const string = decimal.toPrecision();
	node.appendChild(getDocument().createTextNode(string));
}
/**
* @param {Node} node Node to append a TextNode with the decimal to.
* @param {number} nonNegativeInteger Non negative integer.
*/
function writeNonNegativeIntegerTextNode(node, nonNegativeInteger) {
	const string = nonNegativeInteger.toString();
	node.appendChild(getDocument().createTextNode(string));
}
var whiteSpaceStart = /^\s/;
var whiteSpaceEnd = /\s$/;
var cdataCharacters = /(\n|\t|\r|<|&| {2})/;
/**
* @param {Node} node Node to append a TextNode with the string to.
* @param {string} string String.
*/
function writeStringTextNode(node, string) {
	if (typeof string === "string" && (whiteSpaceStart.test(string) || whiteSpaceEnd.test(string) || cdataCharacters.test(string))) string.split("]]>").forEach((part, i, a) => {
		if (i < a.length - 1) part += "]]";
		if (i > 0) part = ">" + part;
		writeCDATASection(node, part);
	});
	else node.appendChild(getDocument().createTextNode(string));
}
//#endregion
//#region node_modules/ol/format/KML.js
/**
* @module ol/format/KML
*/
/**
* @typedef {Object} Vec2
* @property {number} x X coordinate.
* @property {import("../style/Icon.js").IconAnchorUnits} xunits Units of x.
* @property {number} y Y coordinate.
* @property {import("../style/Icon.js").IconAnchorUnits} yunits Units of Y.
* @property {import("../style/Icon.js").IconOrigin} [origin] Origin.
*/
/**
* @typedef {Object} GxTrackObject
* @property {Array<Array<number>>} coordinates Coordinates.
* @property {Array<number>} whens Whens.
*/
/**
* @const
* @type {Array<string>}
*/
var GX_NAMESPACE_URIS = ["http://www.google.com/kml/ext/2.2"];
/**
* @const
* @type {Array<null|string>}
*/
var NAMESPACE_URIS$2 = [
	null,
	"http://earth.google.com/kml/2.0",
	"http://earth.google.com/kml/2.1",
	"http://earth.google.com/kml/2.2",
	"http://www.opengis.net/kml/2.2"
];
/**
* @const
* @type {string}
*/
var SCHEMA_LOCATION$1 = "http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd";
/**
* @type {Object<string, import("../style/Icon.js").IconAnchorUnits>}
*/
var ICON_ANCHOR_UNITS_MAP = {
	"fraction": "fraction",
	"pixels": "pixels",
	"insetPixels": "pixels"
};
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var PLACEMARK_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"ExtendedData": extendedDataParser,
	"Region": regionParser,
	"MultiGeometry": makeObjectPropertySetter(readMultiGeometry, "geometry"),
	"LineString": makeObjectPropertySetter(readLineString, "geometry"),
	"LinearRing": makeObjectPropertySetter(readLinearRing, "geometry"),
	"Point": makeObjectPropertySetter(readPoint, "geometry"),
	"Polygon": makeObjectPropertySetter(readPolygon, "geometry"),
	"Style": makeObjectPropertySetter(readStyle$1),
	"StyleMap": placemarkStyleMapParser,
	"address": makeObjectPropertySetter(readString),
	"description": makeObjectPropertySetter(readString),
	"name": makeObjectPropertySetter(readString),
	"open": makeObjectPropertySetter(readBoolean),
	"phoneNumber": makeObjectPropertySetter(readString),
	"styleUrl": makeObjectPropertySetter(readStyleURL),
	"visibility": makeObjectPropertySetter(readBoolean)
}, makeStructureNS(GX_NAMESPACE_URIS, {
	"MultiTrack": makeObjectPropertySetter(readGxMultiTrack, "geometry"),
	"Track": makeObjectPropertySetter(readGxTrack, "geometry")
}));
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var NETWORK_LINK_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"ExtendedData": extendedDataParser,
	"Region": regionParser,
	"Link": linkParser,
	"address": makeObjectPropertySetter(readString),
	"description": makeObjectPropertySetter(readString),
	"name": makeObjectPropertySetter(readString),
	"open": makeObjectPropertySetter(readBoolean),
	"phoneNumber": makeObjectPropertySetter(readString),
	"visibility": makeObjectPropertySetter(readBoolean)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var LINK_PARSERS$1 = makeStructureNS(NAMESPACE_URIS$2, { "href": makeObjectPropertySetter(readURI) });
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var CAMERA_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	Altitude: makeObjectPropertySetter(readDecimal),
	Longitude: makeObjectPropertySetter(readDecimal),
	Latitude: makeObjectPropertySetter(readDecimal),
	Tilt: makeObjectPropertySetter(readDecimal),
	AltitudeMode: makeObjectPropertySetter(readString),
	Heading: makeObjectPropertySetter(readDecimal),
	Roll: makeObjectPropertySetter(readDecimal)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var REGION_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"LatLonAltBox": latLonAltBoxParser,
	"Lod": lodParser
});
/**
* @const
* @type {Object<string, Array<string>>}
*/
var KML_SEQUENCE = makeStructureNS(NAMESPACE_URIS$2, ["Document", "Placemark"]);
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var KML_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, {
	"Document": makeChildAppender(writeDocument),
	"Placemark": makeChildAppender(writePlacemark)
});
/**
* @type {import("../color.js").Color}
*/
var DEFAULT_COLOR;
/**
* @type {Fill|null}
*/
var DEFAULT_FILL_STYLE = null;
/**
* @type {import("../size.js").Size}
*/
var DEFAULT_IMAGE_STYLE_ANCHOR;
/**
* @type {import("../style/Icon.js").IconAnchorUnits}
*/
var DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS;
/**
* @type {import("../style/Icon.js").IconAnchorUnits}
*/
var DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS;
/**
* @type {import("../size.js").Size}
*/
var DEFAULT_IMAGE_STYLE_SIZE;
/**
* @type {string}
*/
var DEFAULT_IMAGE_STYLE_SRC;
/**
* @type {import("../style/Image.js").default|null}
*/
var DEFAULT_IMAGE_STYLE = null;
/**
* @type {string}
*/
var DEFAULT_NO_IMAGE_STYLE;
/**
* @type {Stroke|null}
*/
var DEFAULT_STROKE_STYLE = null;
/**
* @type {Stroke}
*/
var DEFAULT_TEXT_STROKE_STYLE;
/**
* @type {Text|null}
*/
var DEFAULT_TEXT_STYLE = null;
/**
* @type {Style|null}
*/
var DEFAULT_STYLE = null;
/**
* @type {Array<Style>|null}
*/
var DEFAULT_STYLE_ARRAY = null;
/**
* Function that returns the scale needed to normalize an icon image to 32 pixels.
* @param {import("../size.js").Size} size Image size.
* @return {number} Scale.
*/
function scaleForSize(size) {
	return 32 / Math.min(size[0], size[1]);
}
function createStyleDefaults() {
	DEFAULT_COLOR = [
		255,
		255,
		255,
		1
	];
	DEFAULT_FILL_STYLE = new Fill({ color: DEFAULT_COLOR });
	DEFAULT_IMAGE_STYLE_ANCHOR = [20, 2];
	DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS = "pixels";
	DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS = "pixels";
	DEFAULT_IMAGE_STYLE_SIZE = [64, 64];
	DEFAULT_IMAGE_STYLE_SRC = "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png";
	DEFAULT_IMAGE_STYLE = new Icon({
		anchor: DEFAULT_IMAGE_STYLE_ANCHOR,
		anchorOrigin: "bottom-left",
		anchorXUnits: DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS,
		anchorYUnits: DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS,
		crossOrigin: "anonymous",
		rotation: 0,
		scale: scaleForSize(DEFAULT_IMAGE_STYLE_SIZE),
		size: DEFAULT_IMAGE_STYLE_SIZE,
		src: DEFAULT_IMAGE_STYLE_SRC
	});
	DEFAULT_NO_IMAGE_STYLE = "NO_IMAGE";
	DEFAULT_STROKE_STYLE = new Stroke({
		color: DEFAULT_COLOR,
		width: 1
	});
	DEFAULT_TEXT_STROKE_STYLE = new Stroke({
		color: [
			51,
			51,
			51,
			1
		],
		width: 2
	});
	DEFAULT_TEXT_STYLE = new Text({
		font: "bold 16px Helvetica",
		fill: DEFAULT_FILL_STYLE,
		stroke: DEFAULT_TEXT_STROKE_STYLE,
		scale: .8
	});
	DEFAULT_STYLE = new Style({
		fill: DEFAULT_FILL_STYLE,
		image: DEFAULT_IMAGE_STYLE,
		text: DEFAULT_TEXT_STYLE,
		stroke: DEFAULT_STROKE_STYLE,
		zIndex: 0
	});
	DEFAULT_STYLE_ARRAY = [DEFAULT_STYLE];
}
/**
* @type {HTMLTextAreaElement}
*/
var TEXTAREA;
/**
* A function that takes a url `{string}` and returns a url `{string}`.
* Might be used to change an icon path or to substitute a
* data url obtained from a KMZ array buffer.
*
* @typedef {function(string):string} IconUrlFunction
* @api
*/
/**
* Function that returns a url unchanged.
* @param {string} href Input url.
* @return {string} Output url.
*/
function defaultIconUrlFunction(href) {
	return href;
}
/**
* @typedef {Object} Options
* @property {boolean} [extractStyles=true] Extract styles from the KML.
* @property {boolean} [showPointNames=true] Show names as labels for placemarks which contain points.
* @property {Array<Style>} [defaultStyle] Default style. The
* default default style is the same as Google Earth.
* @property {boolean} [writeStyles=true] Write styles into KML.
* @property {null|string} [crossOrigin='anonymous'] The `crossOrigin` attribute for loaded images. Note that you must provide a
* `crossOrigin` value if you want to access pixel data with the Canvas renderer.
* @property {ReferrerPolicy} [referrerPolicy] The `referrerPolicy` property for loaded images.
* @property {IconUrlFunction} [iconUrlFunction] Function that takes a url string and returns a url string.
* Might be used to change an icon path or to substitute a data url obtained from a KMZ array buffer.
*/
/**
* @classdesc
* Feature format for reading and writing data in the KML format.
*
* {@link module:ol/format/KML~KML#readFeature} will read the first feature from
* a KML source.
*
* MultiGeometries are converted into GeometryCollections if they are a mix of
* geometry types, and into MultiPoint/MultiLineString/MultiPolygon if they are
* all of the same type.
*
* @api
*/
var KML = class extends XMLFeature {
	/**
	* @param {Options} [options] Options.
	*/
	constructor(options) {
		super();
		options = options ? options : {};
		if (!DEFAULT_STYLE_ARRAY) createStyleDefaults();
		/**
		* @type {import("../proj/Projection.js").default}
		*/
		this.dataProjection = get$1("EPSG:4326");
		/**
		* @private
		* @type {Array<Style>}
		*/
		this.defaultStyle_ = options.defaultStyle ? options.defaultStyle : DEFAULT_STYLE_ARRAY;
		/**
		* @private
		* @type {boolean}
		*/
		this.extractStyles_ = options.extractStyles !== void 0 ? options.extractStyles : true;
		/**
		* @type {boolean}
		*/
		this.writeStyles_ = options.writeStyles !== void 0 ? options.writeStyles : true;
		/**
		* @private
		* @type {!Object<string, (Array<Style>|string)>}
		*/
		this.sharedStyles_ = {};
		/**
		* @private
		* @type {boolean}
		*/
		this.showPointNames_ = options.showPointNames !== void 0 ? options.showPointNames : true;
		/**
		* @type {null|string}
		*/
		this.crossOrigin_ = options.crossOrigin !== void 0 ? options.crossOrigin : "anonymous";
		/**
		* @type {ReferrerPolicy}
		*/
		this.referrerPolicy_ = options.referrerPolicy;
		/**
		* @type {IconUrlFunction}
		*/
		this.iconUrlFunction_ = options.iconUrlFunction ? options.iconUrlFunction : defaultIconUrlFunction;
		this.supportedMediaTypes = ["application/vnd.google-earth.kml+xml"];
	}
	/**
	* @param {Node} node Node.
	* @param {Array<*>} objectStack Object stack.
	* @private
	* @return {Array<Feature>|undefined} Features.
	*/
	readDocumentOrFolder_(node, objectStack) {
		/** @type {Array<Feature>} */
		const features = pushParseAndPop([], makeStructureNS(NAMESPACE_URIS$2, {
			"Document": makeArrayExtender(this.readDocumentOrFolder_, this),
			"Folder": makeArrayExtender(this.readDocumentOrFolder_, this),
			"Placemark": makeArrayPusher(this.readPlacemark_, this),
			"Style": this.readSharedStyle_.bind(this),
			"StyleMap": this.readSharedStyleMap_.bind(this)
		}), node, objectStack, this);
		if (features) return features;
	}
	/**
	* @param {Element} node Node.
	* @param {Array<*>} objectStack Object stack.
	* @private
	* @return {Feature|undefined} Feature.
	*/
	readPlacemark_(node, objectStack) {
		const object = pushParseAndPop({ "geometry": null }, PLACEMARK_PARSERS, node, objectStack, this);
		if (!object) return;
		const feature = new Feature();
		const id = node.getAttribute("id");
		if (id !== null) feature.setId(id);
		const options = objectStack[0];
		const geometry = object["geometry"];
		if (geometry) transformGeometryWithOptions(geometry, false, options);
		feature.setGeometry(geometry);
		delete object["geometry"];
		if (this.extractStyles_) {
			const style = object["Style"];
			const styleUrl = object["styleUrl"];
			const styleFunction = createFeatureStyleFunction(style, styleUrl, this.defaultStyle_, this.sharedStyles_, this.showPointNames_);
			feature.setStyle(styleFunction);
		}
		delete object["Style"];
		feature.setProperties(object, true);
		return feature;
	}
	/**
	* @param {Element} node Node.
	* @param {Array<*>} objectStack Object stack.
	* @private
	*/
	readSharedStyle_(node, objectStack) {
		const id = node.getAttribute("id");
		if (id !== null) {
			const style = readStyle$1.call(this, node, objectStack);
			if (style) {
				let styleUri;
				let baseURI = node.baseURI;
				if (!baseURI || baseURI == "about:blank") baseURI = window.location.href;
				if (baseURI) styleUri = new URL("#" + id, baseURI).href;
				else styleUri = "#" + id;
				this.sharedStyles_[styleUri] = style;
			}
		}
	}
	/**
	* @param {Element} node Node.
	* @param {Array<*>} objectStack Object stack.
	* @private
	*/
	readSharedStyleMap_(node, objectStack) {
		const id = node.getAttribute("id");
		if (id === null) return;
		const styleMapValue = readStyleMapValue.call(this, node, objectStack);
		if (!styleMapValue) return;
		let styleUri;
		let baseURI = node.baseURI;
		if (!baseURI || baseURI == "about:blank") baseURI = window.location.href;
		if (baseURI) styleUri = new URL("#" + id, baseURI).href;
		else styleUri = "#" + id;
		this.sharedStyles_[styleUri] = styleMapValue;
	}
	/**
	* @param {Element} node Node.
	* @param {import("./Feature.js").ReadOptions} [options] Options.
	* @return {import("../Feature.js").default} Feature.
	* @override
	*/
	readFeatureFromNode(node, options) {
		if (!NAMESPACE_URIS$2.includes(node.namespaceURI)) return null;
		const feature = this.readPlacemark_(node, [this.getReadOptions(node, options)]);
		if (feature) return feature;
		return null;
	}
	/**
	* @protected
	* @param {Element} node Node.
	* @param {import("./Feature.js").ReadOptions} [options] Options.
	* @return {Array<import("../Feature.js").default>} Features.
	* @override
	*/
	readFeaturesFromNode(node, options) {
		if (!NAMESPACE_URIS$2.includes(node.namespaceURI)) return [];
		let features;
		const localName = node.localName;
		if (localName == "Document" || localName == "Folder") {
			features = this.readDocumentOrFolder_(node, [this.getReadOptions(node, options)]);
			if (features) return features;
			return [];
		}
		if (localName == "Placemark") {
			const feature = this.readPlacemark_(node, [this.getReadOptions(node, options)]);
			if (feature) return [feature];
			return [];
		}
		if (localName == "kml") {
			features = [];
			for (let n = node.firstElementChild; n; n = n.nextElementSibling) {
				const fs = this.readFeaturesFromNode(n, options);
				if (fs) extend(features, fs);
			}
			return features;
		}
		return [];
	}
	/**
	* Read the name of the KML.
	*
	* @param {Document|Element|string} source Source.
	* @return {string|undefined} Name.
	* @api
	*/
	readName(source) {
		if (!source) return;
		if (typeof source === "string") {
			const doc = parse(source);
			return this.readNameFromDocument(doc);
		}
		if (isDocument(source)) return this.readNameFromDocument(source);
		return this.readNameFromNode(source);
	}
	/**
	* @param {Document} doc Document.
	* @return {string|undefined} Name.
	*/
	readNameFromDocument(doc) {
		for (let n = doc.firstChild; n; n = n.nextSibling) if (n.nodeType == Node.ELEMENT_NODE) {
			const name = this.readNameFromNode(n);
			if (name) return name;
		}
	}
	/**
	* @param {Element} node Node.
	* @return {string|undefined} Name.
	*/
	readNameFromNode(node) {
		for (let n = node.firstElementChild; n; n = n.nextElementSibling) if (NAMESPACE_URIS$2.includes(n.namespaceURI) && n.localName == "name") return readString(n);
		for (let n = node.firstElementChild; n; n = n.nextElementSibling) {
			const localName = n.localName;
			if (NAMESPACE_URIS$2.includes(n.namespaceURI) && (localName == "Document" || localName == "Folder" || localName == "Placemark" || localName == "kml")) {
				const name = this.readNameFromNode(n);
				if (name) return name;
			}
		}
	}
	/**
	* Read the network links of the KML.
	*
	* @param {Document|Element|string} source Source.
	* @return {Array<Object>} Network links.
	* @api
	*/
	readNetworkLinks(source) {
		const networkLinks = [];
		if (typeof source === "string") {
			const doc = parse(source);
			extend(networkLinks, this.readNetworkLinksFromDocument(doc));
		} else if (isDocument(source)) extend(networkLinks, this.readNetworkLinksFromDocument(source));
		else extend(networkLinks, this.readNetworkLinksFromNode(source));
		return networkLinks;
	}
	/**
	* @param {Document} doc Document.
	* @return {Array<Object>} Network links.
	*/
	readNetworkLinksFromDocument(doc) {
		const networkLinks = [];
		for (let n = doc.firstChild; n; n = n.nextSibling) if (n.nodeType == Node.ELEMENT_NODE) extend(networkLinks, this.readNetworkLinksFromNode(n));
		return networkLinks;
	}
	/**
	* @param {Element} node Node.
	* @return {Array<Object>} Network links.
	*/
	readNetworkLinksFromNode(node) {
		const networkLinks = [];
		for (let n = node.firstElementChild; n; n = n.nextElementSibling) if (NAMESPACE_URIS$2.includes(n.namespaceURI) && n.localName == "NetworkLink") {
			const obj = pushParseAndPop({}, NETWORK_LINK_PARSERS, n, []);
			networkLinks.push(obj);
		}
		for (let n = node.firstElementChild; n; n = n.nextElementSibling) {
			const localName = n.localName;
			if (NAMESPACE_URIS$2.includes(n.namespaceURI) && (localName == "Document" || localName == "Folder" || localName == "kml")) extend(networkLinks, this.readNetworkLinksFromNode(n));
		}
		return networkLinks;
	}
	/**
	* Read the regions of the KML.
	*
	* @param {Document|Element|string} source Source.
	* @return {Array<Object>} Regions.
	* @api
	*/
	readRegion(source) {
		const regions = [];
		if (typeof source === "string") {
			const doc = parse(source);
			extend(regions, this.readRegionFromDocument(doc));
		} else if (isDocument(source)) extend(regions, this.readRegionFromDocument(source));
		else extend(regions, this.readRegionFromNode(source));
		return regions;
	}
	/**
	* @param {Document} doc Document.
	* @return {Array<Object>} Region.
	*/
	readRegionFromDocument(doc) {
		const regions = [];
		for (let n = doc.firstChild; n; n = n.nextSibling) if (n.nodeType == Node.ELEMENT_NODE) extend(regions, this.readRegionFromNode(n));
		return regions;
	}
	/**
	* @param {Element} node Node.
	* @return {Array<Object>} Region.
	* @api
	*/
	readRegionFromNode(node) {
		const regions = [];
		for (let n = node.firstElementChild; n; n = n.nextElementSibling) if (NAMESPACE_URIS$2.includes(n.namespaceURI) && n.localName == "Region") {
			const obj = pushParseAndPop({}, REGION_PARSERS, n, []);
			regions.push(obj);
		}
		for (let n = node.firstElementChild; n; n = n.nextElementSibling) {
			const localName = n.localName;
			if (NAMESPACE_URIS$2.includes(n.namespaceURI) && (localName == "Document" || localName == "Folder" || localName == "kml")) extend(regions, this.readRegionFromNode(n));
		}
		return regions;
	}
	/**
	* @typedef {Object} KMLCamera Specifies the observer's viewpoint and associated view parameters.
	* @property {number} [Latitude] Latitude of the camera.
	* @property {number} [Longitude] Longitude of the camera.
	* @property {number} [Altitude] Altitude of the camera.
	* @property {string} [AltitudeMode] Floor-related altitude mode.
	* @property {number} [Heading] Horizontal camera rotation.
	* @property {number} [Tilt] Lateral camera rotation.
	* @property {number} [Roll] Vertical camera rotation.
	*/
	/**
	* Read the cameras of the KML.
	*
	* @param {Document|Element|string} source Source.
	* @return {Array<KMLCamera>} Cameras.
	* @api
	*/
	readCamera(source) {
		const cameras = [];
		if (typeof source === "string") {
			const doc = parse(source);
			extend(cameras, this.readCameraFromDocument(doc));
		} else if (isDocument(source)) extend(cameras, this.readCameraFromDocument(source));
		else extend(cameras, this.readCameraFromNode(source));
		return cameras;
	}
	/**
	* @param {Document} doc Document.
	* @return {Array<KMLCamera>} Cameras.
	*/
	readCameraFromDocument(doc) {
		const cameras = [];
		for (let n = doc.firstChild; n; n = n.nextSibling) if (n.nodeType === Node.ELEMENT_NODE) extend(cameras, this.readCameraFromNode(n));
		return cameras;
	}
	/**
	* @param {Element} node Node.
	* @return {Array<KMLCamera>} Cameras.
	* @api
	*/
	readCameraFromNode(node) {
		const cameras = [];
		for (let n = node.firstElementChild; n; n = n.nextElementSibling) if (NAMESPACE_URIS$2.includes(n.namespaceURI) && n.localName === "Camera") {
			const obj = pushParseAndPop({}, CAMERA_PARSERS, n, []);
			cameras.push(obj);
		}
		for (let n = node.firstElementChild; n; n = n.nextElementSibling) {
			const localName = n.localName;
			if (NAMESPACE_URIS$2.includes(n.namespaceURI) && (localName === "Document" || localName === "Folder" || localName === "Placemark" || localName === "kml")) extend(cameras, this.readCameraFromNode(n));
		}
		return cameras;
	}
	/**
	* Encode an array of features in the KML format as an XML node. GeometryCollections,
	* MultiPoints, MultiLineStrings, and MultiPolygons are output as MultiGeometries.
	*
	* @param {Array<Feature>} features Features.
	* @param {import("./Feature.js").WriteOptions} [options] Options.
	* @return {Node} Node.
	* @api
	* @override
	*/
	writeFeaturesNode(features, options) {
		options = this.adaptOptions(options);
		const kml = createElementNS(NAMESPACE_URIS$2[4], "kml");
		const xmlnsUri = "http://www.w3.org/2000/xmlns/";
		kml.setAttributeNS(xmlnsUri, "xmlns:gx", GX_NAMESPACE_URIS[0]);
		kml.setAttributeNS(xmlnsUri, "xmlns:xsi", XML_SCHEMA_INSTANCE_URI);
		kml.setAttributeNS(XML_SCHEMA_INSTANCE_URI, "xsi:schemaLocation", SCHEMA_LOCATION$1);
		const context = { node: kml };
		/** @type {!Object<string, (Array<Feature>|Feature|undefined)>} */
		const properties = {};
		if (features.length > 1) properties["Document"] = features;
		else if (features.length == 1) properties["Placemark"] = features[0];
		const orderedKeys = KML_SEQUENCE[kml.namespaceURI];
		pushSerializeAndPop(context, KML_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, makeSequence(properties, orderedKeys), [options], orderedKeys, this);
		return kml;
	}
};
/**
* @param {Style|undefined} foundStyle Style.
* @param {string} name Name.
* @return {Style} style Style.
*/
function createNameStyleFunction(foundStyle, name) {
	const textOffset = [0, 0];
	/** @type {CanvasTextAlign} */
	let textAlign = "start";
	const imageStyle = foundStyle.getImage();
	if (imageStyle) {
		const imageSize = imageStyle.getSize();
		if (imageSize && imageSize.length == 2) {
			const imageScale = imageStyle.getScaleArray();
			const anchor = imageStyle.getAnchor();
			textOffset[0] = imageScale[0] * (imageSize[0] - anchor[0]);
			textOffset[1] = imageScale[1] * (imageSize[1] / 2 - anchor[1]);
			textAlign = "left";
		}
	}
	let textStyle = foundStyle.getText();
	if (textStyle) {
		textStyle = textStyle.clone();
		textStyle.setFont(textStyle.getFont() || DEFAULT_TEXT_STYLE.getFont());
		textStyle.setScale(textStyle.getScale() || DEFAULT_TEXT_STYLE.getScale());
		textStyle.setFill(textStyle.getFill() || DEFAULT_TEXT_STYLE.getFill());
		textStyle.setStroke(textStyle.getStroke() || DEFAULT_TEXT_STROKE_STYLE);
	} else textStyle = DEFAULT_TEXT_STYLE.clone();
	textStyle.setText(name);
	textStyle.setOffsetX(textOffset[0]);
	textStyle.setOffsetY(textOffset[1]);
	textStyle.setTextAlign(textAlign);
	return new Style({
		image: imageStyle,
		text: textStyle
	});
}
/**
* @param {Array<Style>|undefined} style Style.
* @param {string} styleUrl Style URL.
* @param {Array<Style>} defaultStyle Default style.
* @param {!Object<string, (Array<Style>|string)>} sharedStyles Shared styles.
* @param {boolean|undefined} showPointNames true to show names for point placemarks.
* @return {import("../style/Style.js").StyleFunction} Feature style function.
*/
function createFeatureStyleFunction(style, styleUrl, defaultStyle, sharedStyles, showPointNames) {
	return (function(feature, resolution) {
		let drawName = showPointNames;
		let name = "";
		let multiGeometryPoints = [];
		if (drawName) {
			const geometry = feature.getGeometry();
			if (geometry) if (geometry instanceof GeometryCollection) {
				multiGeometryPoints = geometry.getGeometriesArrayRecursive().filter(function(geometry) {
					const type = geometry.getType();
					return type === "Point" || type === "MultiPoint";
				});
				drawName = multiGeometryPoints.length > 0;
			} else {
				const type = geometry.getType();
				drawName = type === "Point" || type === "MultiPoint";
			}
		}
		if (drawName) {
			name = feature.get("name");
			drawName = drawName && !!name;
			if (drawName && /&[^&]+;/.test(name)) {
				if (!TEXTAREA) TEXTAREA = document.createElement("textarea");
				TEXTAREA.innerHTML = name;
				name = TEXTAREA.value;
			}
		}
		let featureStyle = defaultStyle;
		if (style) featureStyle = style;
		else if (styleUrl) featureStyle = findStyle(styleUrl, defaultStyle, sharedStyles);
		if (drawName) {
			const nameStyle = createNameStyleFunction(featureStyle[0], name);
			if (multiGeometryPoints.length > 0) {
				nameStyle.setGeometry(new GeometryCollection(multiGeometryPoints));
				return [nameStyle, new Style({
					geometry: featureStyle[0].getGeometry(),
					image: null,
					fill: featureStyle[0].getFill(),
					stroke: featureStyle[0].getStroke(),
					text: null
				})].concat(featureStyle.slice(1));
			}
			return nameStyle;
		}
		return featureStyle;
	});
}
/**
* @param {Array<Style>|string|undefined} styleValue Style value.
* @param {Array<Style>} defaultStyle Default style.
* @param {!Object<string, (Array<Style>|string)>} sharedStyles
* Shared styles.
* @return {Array<Style>} Style.
*/
function findStyle(styleValue, defaultStyle, sharedStyles) {
	if (Array.isArray(styleValue)) return styleValue;
	if (typeof styleValue === "string") return findStyle(sharedStyles[styleValue], defaultStyle, sharedStyles);
	return defaultStyle;
}
/**
* @param {Node} node Node.
* @return {import("../color.js").Color|undefined} Color.
*/
function readColor(node) {
	const s = getAllTextContent(node, false);
	const m = /^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(s);
	if (m) {
		const hexColor = m[1];
		return [
			parseInt(hexColor.substr(6, 2), 16),
			parseInt(hexColor.substr(4, 2), 16),
			parseInt(hexColor.substr(2, 2), 16),
			parseInt(hexColor.substr(0, 2), 16) / 255
		];
	}
}
/**
* @param {Node} node Node.
* @return {Array<number>|undefined} Flat coordinates.
*/
function readFlatCoordinates(node) {
	let s = getAllTextContent(node, false);
	const flatCoordinates = [];
	s = s.replace(/\s*,\s*/g, ",");
	const re = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?),([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s+|,|$)(?:([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s+|$))?\s*/i;
	let m;
	while (m = re.exec(s)) {
		const x = parseFloat(m[1]);
		const y = parseFloat(m[2]);
		const z = m[3] ? parseFloat(m[3]) : 0;
		flatCoordinates.push(x, y, z);
		s = s.substr(m[0].length);
	}
	if (s !== "") return;
	return flatCoordinates;
}
/**
* @param {Node} node Node.
* @return {string} URI.
*/
function readURI(node) {
	const s = getAllTextContent(node, false).trim();
	let baseURI = node.baseURI;
	if (!baseURI || baseURI == "about:blank") baseURI = window.location.href;
	if (baseURI) return new URL(s, baseURI).href;
	return s;
}
/**
* @param {Node} node Node.
* @return {string} URI.
*/
function readStyleURL(node) {
	const s = getAllTextContent(node, false).trim().replace(/^(?!.*#)/, "#");
	let baseURI = node.baseURI;
	if (!baseURI || baseURI == "about:blank") baseURI = window.location.href;
	if (baseURI) return new URL(s, baseURI).href;
	return s;
}
/**
* @param {Element} node Node.
* @return {Vec2} Vec2.
*/
function readVec2(node) {
	const xunits = node.getAttribute("xunits");
	const yunits = node.getAttribute("yunits");
	/** @type {import('../style/Icon.js').IconOrigin} */
	let origin;
	if (xunits !== "insetPixels") if (yunits !== "insetPixels") origin = "bottom-left";
	else origin = "top-left";
	else if (yunits !== "insetPixels") origin = "bottom-right";
	else origin = "top-right";
	return {
		x: parseFloat(node.getAttribute("x")),
		xunits: ICON_ANCHOR_UNITS_MAP[xunits],
		y: parseFloat(node.getAttribute("y")),
		yunits: ICON_ANCHOR_UNITS_MAP[yunits],
		origin
	};
}
/**
* @param {Node} node Node.
* @return {number|undefined} Scale.
*/
function readScale(node) {
	return readDecimal(node);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var STYLE_MAP_PARSERS = makeStructureNS(NAMESPACE_URIS$2, { "Pair": pairDataParser });
/**
* @this {KML}
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Array<Style>|string|undefined} StyleMap.
*/
function readStyleMapValue(node, objectStack) {
	return pushParseAndPop(void 0, STYLE_MAP_PARSERS, node, objectStack, this);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var ICON_STYLE_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"Icon": makeObjectPropertySetter(readIcon),
	"color": makeObjectPropertySetter(readColor),
	"heading": makeObjectPropertySetter(readDecimal),
	"hotSpot": makeObjectPropertySetter(readVec2),
	"scale": makeObjectPropertySetter(readScale)
});
/**
* @this {KML}
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function iconStyleParser(node, objectStack) {
	const object = pushParseAndPop({}, ICON_STYLE_PARSERS, node, objectStack);
	if (!object) return;
	const styleObject = objectStack[objectStack.length - 1];
	const IconObject = "Icon" in object ? object["Icon"] : {};
	const drawIcon = !("Icon" in object) || Object.keys(IconObject).length > 0;
	let src;
	const href = IconObject["href"];
	if (href) src = href;
	else if (drawIcon) src = DEFAULT_IMAGE_STYLE_SRC;
	let anchor, anchorXUnits, anchorYUnits;
	/** @type {import('../style/Icon.js').IconOrigin|undefined} */
	let anchorOrigin = "bottom-left";
	const hotSpot = object["hotSpot"];
	if (hotSpot) {
		anchor = [hotSpot.x, hotSpot.y];
		anchorXUnits = hotSpot.xunits;
		anchorYUnits = hotSpot.yunits;
		anchorOrigin = hotSpot.origin;
	} else if (/^https?:\/\/maps\.(?:google|gstatic)\.com\//.test(src)) {
		if (src.includes("pushpin")) {
			anchor = DEFAULT_IMAGE_STYLE_ANCHOR;
			anchorXUnits = DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS;
			anchorYUnits = DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS;
		} else if (src.includes("arrow-reverse")) {
			anchor = [54, 42];
			anchorXUnits = DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS;
			anchorYUnits = DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS;
		} else if (src.includes("paddle")) {
			anchor = [32, 1];
			anchorXUnits = DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS;
			anchorYUnits = DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS;
		}
	}
	let offset;
	const x = IconObject["x"];
	const y = IconObject["y"];
	if (x !== void 0 && y !== void 0) offset = [x, y];
	let size;
	const w = IconObject["w"];
	const h = IconObject["h"];
	if (w !== void 0 && h !== void 0) size = [w, h];
	let rotation;
	const heading = object["heading"];
	if (heading !== void 0) rotation = toRadians(heading);
	const scale = object["scale"];
	const color = object["color"];
	if (drawIcon) {
		if (src == DEFAULT_IMAGE_STYLE_SRC) size = DEFAULT_IMAGE_STYLE_SIZE;
		const imageStyle = new Icon({
			anchor,
			anchorOrigin,
			anchorXUnits,
			anchorYUnits,
			crossOrigin: this.crossOrigin_,
			referrerPolicy: this.referrerPolicy_,
			offset,
			offsetOrigin: "bottom-left",
			rotation,
			scale,
			size,
			src: this.iconUrlFunction_(src),
			color
		});
		const imageScale = imageStyle.getScaleArray()[0];
		const imageSize = imageStyle.getSize();
		if (imageSize === null) {
			const imageState = imageStyle.getImageState();
			if (imageState === ImageState_default.IDLE || imageState === ImageState_default.LOADING) {
				const listener = function() {
					const imageState = imageStyle.getImageState();
					if (!(imageState === ImageState_default.IDLE || imageState === ImageState_default.LOADING)) {
						const imageSize = imageStyle.getSize();
						if (imageSize && imageSize.length == 2) {
							const resizeScale = scaleForSize(imageSize);
							imageStyle.setScale(imageScale * resizeScale);
						}
						imageStyle.unlistenImageChange(listener);
					}
				};
				imageStyle.listenImageChange(listener);
				if (imageState === ImageState_default.IDLE) imageStyle.load();
			}
		} else if (imageSize.length == 2) {
			const resizeScale = scaleForSize(imageSize);
			imageStyle.setScale(imageScale * resizeScale);
		}
		styleObject["imageStyle"] = imageStyle;
	} else styleObject["imageStyle"] = DEFAULT_NO_IMAGE_STYLE;
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var LABEL_STYLE_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"color": makeObjectPropertySetter(readColor),
	"scale": makeObjectPropertySetter(readScale)
});
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function labelStyleParser(node, objectStack) {
	const object = pushParseAndPop({}, LABEL_STYLE_PARSERS, node, objectStack);
	if (!object) return;
	const styleObject = objectStack[objectStack.length - 1];
	styleObject["textStyle"] = new Text({
		fill: new Fill({ color: "color" in object ? object["color"] : DEFAULT_COLOR }),
		scale: object["scale"]
	});
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var LINE_STYLE_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"color": makeObjectPropertySetter(readColor),
	"width": makeObjectPropertySetter(readDecimal)
});
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function lineStyleParser(node, objectStack) {
	const object = pushParseAndPop({}, LINE_STYLE_PARSERS, node, objectStack);
	if (!object) return;
	const styleObject = objectStack[objectStack.length - 1];
	styleObject["strokeStyle"] = new Stroke({
		color: "color" in object ? object["color"] : DEFAULT_COLOR,
		width: "width" in object ? object["width"] : 1
	});
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var POLY_STYLE_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"color": makeObjectPropertySetter(readColor),
	"fill": makeObjectPropertySetter(readBoolean),
	"outline": makeObjectPropertySetter(readBoolean)
});
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function polyStyleParser(node, objectStack) {
	const object = pushParseAndPop({}, POLY_STYLE_PARSERS, node, objectStack);
	if (!object) return;
	const styleObject = objectStack[objectStack.length - 1];
	styleObject["fillStyle"] = new Fill({ color: "color" in object ? object["color"] : DEFAULT_COLOR });
	const fill = object["fill"];
	if (fill !== void 0) styleObject["fill"] = fill;
	const outline = object["outline"];
	if (outline !== void 0) styleObject["outline"] = outline;
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var FLAT_LINEAR_RING_PARSERS = makeStructureNS(NAMESPACE_URIS$2, { "coordinates": makeReplacer(readFlatCoordinates) });
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Array<number>} LinearRing flat coordinates.
*/
function readFlatLinearRing(node, objectStack) {
	return pushParseAndPop(null, FLAT_LINEAR_RING_PARSERS, node, objectStack);
}
/**
* @param {Node} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function gxCoordParser(node, objectStack) {
	const coordinates = objectStack[objectStack.length - 1].coordinates;
	const s = getAllTextContent(node, false);
	const m = /^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(s);
	if (m) {
		const x = parseFloat(m[1]);
		const y = parseFloat(m[2]);
		const z = parseFloat(m[3]);
		coordinates.push([
			x,
			y,
			z
		]);
	} else coordinates.push([]);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var GX_MULTITRACK_GEOMETRY_PARSERS = makeStructureNS(GX_NAMESPACE_URIS, { "Track": makeArrayPusher(readGxTrack) });
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {MultiLineString|undefined} MultiLineString.
*/
function readGxMultiTrack(node, objectStack) {
	const lineStrings = pushParseAndPop([], GX_MULTITRACK_GEOMETRY_PARSERS, node, objectStack);
	if (!lineStrings) return;
	return new MultiLineString(lineStrings);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var GX_TRACK_PARSERS = makeStructureNS(NAMESPACE_URIS$2, { "when": whenParser }, makeStructureNS(GX_NAMESPACE_URIS, { "coord": gxCoordParser }));
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {LineString|undefined} LineString.
*/
function readGxTrack(node, objectStack) {
	const gxTrackObject = pushParseAndPop({
		coordinates: [],
		whens: []
	}, GX_TRACK_PARSERS, node, objectStack);
	if (!gxTrackObject) return;
	const flatCoordinates = [];
	const coordinates = gxTrackObject.coordinates;
	const whens = gxTrackObject.whens;
	for (let i = 0, ii = Math.min(coordinates.length, whens.length); i < ii; ++i) if (coordinates[i].length == 3) flatCoordinates.push(coordinates[i][0], coordinates[i][1], coordinates[i][2], whens[i]);
	return new LineString(flatCoordinates, "XYZM");
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var ICON_PARSERS = makeStructureNS(NAMESPACE_URIS$2, { "href": makeObjectPropertySetter(readURI) }, makeStructureNS(GX_NAMESPACE_URIS, {
	"x": makeObjectPropertySetter(readDecimal),
	"y": makeObjectPropertySetter(readDecimal),
	"w": makeObjectPropertySetter(readDecimal),
	"h": makeObjectPropertySetter(readDecimal)
}));
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object} Icon object.
*/
function readIcon(node, objectStack) {
	const iconObject = pushParseAndPop({}, ICON_PARSERS, node, objectStack);
	if (iconObject) return iconObject;
	return null;
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var GEOMETRY_FLAT_COORDINATES_PARSERS = makeStructureNS(NAMESPACE_URIS$2, { "coordinates": makeReplacer(readFlatCoordinates) });
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Array<number>} Flat coordinates.
*/
function readFlatCoordinatesFromNode(node, objectStack) {
	return pushParseAndPop(null, GEOMETRY_FLAT_COORDINATES_PARSERS, node, objectStack);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var EXTRUDE_AND_ALTITUDE_MODE_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"extrude": makeObjectPropertySetter(readBoolean),
	"tessellate": makeObjectPropertySetter(readBoolean),
	"altitudeMode": makeObjectPropertySetter(readString)
});
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {LineString|undefined} LineString.
*/
function readLineString(node, objectStack) {
	const properties = pushParseAndPop({}, EXTRUDE_AND_ALTITUDE_MODE_PARSERS, node, objectStack);
	const flatCoordinates = readFlatCoordinatesFromNode(node, objectStack);
	if (flatCoordinates) {
		const lineString = new LineString(flatCoordinates, "XYZ");
		lineString.setProperties(properties, true);
		return lineString;
	}
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Polygon|undefined} Polygon.
*/
function readLinearRing(node, objectStack) {
	const properties = pushParseAndPop({}, EXTRUDE_AND_ALTITUDE_MODE_PARSERS, node, objectStack);
	const flatCoordinates = readFlatCoordinatesFromNode(node, objectStack);
	if (flatCoordinates) {
		const polygon = new Polygon(flatCoordinates, "XYZ", [flatCoordinates.length]);
		polygon.setProperties(properties, true);
		return polygon;
	}
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var MULTI_GEOMETRY_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"LineString": makeArrayPusher(readLineString),
	"LinearRing": makeArrayPusher(readLinearRing),
	"MultiGeometry": makeArrayPusher(readMultiGeometry),
	"Point": makeArrayPusher(readPoint),
	"Polygon": makeArrayPusher(readPolygon)
});
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {import("../geom/Geometry.js").default} Geometry.
*/
function readMultiGeometry(node, objectStack) {
	const geometries = pushParseAndPop([], MULTI_GEOMETRY_PARSERS, node, objectStack);
	if (!geometries) return null;
	if (geometries.length === 0) return new GeometryCollection(geometries);
	let multiGeometry;
	let homogeneous = true;
	const type = geometries[0].getType();
	let geometry;
	for (let i = 1, ii = geometries.length; i < ii; ++i) {
		geometry = geometries[i];
		if (geometry.getType() != type) {
			homogeneous = false;
			break;
		}
	}
	if (homogeneous) {
		let layout;
		let flatCoordinates;
		if (type == "Point") {
			const point = geometries[0];
			layout = point.getLayout();
			flatCoordinates = point.getFlatCoordinates();
			for (let i = 1, ii = geometries.length; i < ii; ++i) {
				geometry = geometries[i];
				extend(flatCoordinates, geometry.getFlatCoordinates());
			}
			multiGeometry = new MultiPoint(flatCoordinates, layout);
			setCommonGeometryProperties(multiGeometry, geometries);
		} else if (type == "LineString") {
			multiGeometry = new MultiLineString(geometries);
			setCommonGeometryProperties(multiGeometry, geometries);
		} else if (type == "Polygon") {
			multiGeometry = new MultiPolygon(geometries);
			setCommonGeometryProperties(multiGeometry, geometries);
		} else if (type == "GeometryCollection" || type.startsWith("Multi")) multiGeometry = new GeometryCollection(geometries);
		else throw new Error("Unknown geometry type found");
	} else multiGeometry = new GeometryCollection(geometries);
	return multiGeometry;
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Point|undefined} Point.
*/
function readPoint(node, objectStack) {
	const properties = pushParseAndPop({}, EXTRUDE_AND_ALTITUDE_MODE_PARSERS, node, objectStack);
	const flatCoordinates = readFlatCoordinatesFromNode(node, objectStack);
	if (flatCoordinates) {
		const point = new Point(flatCoordinates, "XYZ");
		point.setProperties(properties, true);
		return point;
	}
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var FLAT_LINEAR_RINGS_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"innerBoundaryIs": innerBoundaryIsParser,
	"outerBoundaryIs": outerBoundaryIsParser
});
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Polygon|undefined} Polygon.
*/
function readPolygon(node, objectStack) {
	const properties = pushParseAndPop({}, EXTRUDE_AND_ALTITUDE_MODE_PARSERS, node, objectStack);
	const flatLinearRings = pushParseAndPop([null], FLAT_LINEAR_RINGS_PARSERS, node, objectStack);
	if (flatLinearRings && flatLinearRings[0]) {
		const flatCoordinates = flatLinearRings[0];
		const ends = [flatCoordinates.length];
		for (let i = 1, ii = flatLinearRings.length; i < ii; ++i) {
			extend(flatCoordinates, flatLinearRings[i]);
			ends.push(flatCoordinates.length);
		}
		const polygon = new Polygon(flatCoordinates, "XYZ", ends);
		polygon.setProperties(properties, true);
		return polygon;
	}
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var STYLE_PARSERS$1 = makeStructureNS(NAMESPACE_URIS$2, {
	"IconStyle": iconStyleParser,
	"LabelStyle": labelStyleParser,
	"LineStyle": lineStyleParser,
	"PolyStyle": polyStyleParser
});
/**
* @this {KML}
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Array<Style>} Style.
*/
function readStyle$1(node, objectStack) {
	const styleObject = pushParseAndPop({}, STYLE_PARSERS$1, node, objectStack, this);
	if (!styleObject) return null;
	let fillStyle = "fillStyle" in styleObject ? styleObject["fillStyle"] : DEFAULT_FILL_STYLE;
	const fill = styleObject["fill"];
	if (fill !== void 0 && !fill) fillStyle = null;
	let imageStyle;
	if ("imageStyle" in styleObject) {
		if (styleObject["imageStyle"] != DEFAULT_NO_IMAGE_STYLE) imageStyle = styleObject["imageStyle"];
	} else imageStyle = DEFAULT_IMAGE_STYLE;
	const textStyle = "textStyle" in styleObject ? styleObject["textStyle"] : DEFAULT_TEXT_STYLE;
	const strokeStyle = "strokeStyle" in styleObject ? styleObject["strokeStyle"] : DEFAULT_STROKE_STYLE;
	const outline = styleObject["outline"];
	if (outline !== void 0 && !outline) return [new Style({
		geometry: function(feature) {
			const geometry = feature.getGeometry();
			const type = geometry.getType();
			if (type === "GeometryCollection") return new GeometryCollection(geometry.getGeometriesArrayRecursive().filter(function(geometry) {
				const type = geometry.getType();
				return type !== "Polygon" && type !== "MultiPolygon";
			}));
			if (type !== "Polygon" && type !== "MultiPolygon") return geometry;
		},
		fill: fillStyle,
		image: imageStyle,
		stroke: strokeStyle,
		text: textStyle,
		zIndex: void 0
	}), new Style({
		geometry: function(feature) {
			const geometry = feature.getGeometry();
			const type = geometry.getType();
			if (type === "GeometryCollection") return new GeometryCollection(geometry.getGeometriesArrayRecursive().filter(function(geometry) {
				const type = geometry.getType();
				return type === "Polygon" || type === "MultiPolygon";
			}));
			if (type === "Polygon" || type === "MultiPolygon") return geometry;
		},
		fill: fillStyle,
		stroke: null,
		zIndex: void 0
	})];
	return [new Style({
		fill: fillStyle,
		image: imageStyle,
		stroke: strokeStyle,
		text: textStyle,
		zIndex: void 0
	})];
}
/**
* Reads an array of geometries and creates arrays for common geometry
* properties. Then sets them to the multi geometry.
* @param {MultiPoint|MultiLineString|MultiPolygon} multiGeometry A multi-geometry.
* @param {Array<import("../geom/Geometry.js").default>} geometries List of geometries.
*/
function setCommonGeometryProperties(multiGeometry, geometries) {
	const ii = geometries.length;
	const extrudes = new Array(geometries.length);
	const tessellates = new Array(geometries.length);
	const altitudeModes = new Array(geometries.length);
	let hasExtrude, hasTessellate, hasAltitudeMode;
	hasExtrude = false;
	hasTessellate = false;
	hasAltitudeMode = false;
	for (let i = 0; i < ii; ++i) {
		const geometry = geometries[i];
		extrudes[i] = geometry.get("extrude");
		tessellates[i] = geometry.get("tessellate");
		altitudeModes[i] = geometry.get("altitudeMode");
		hasExtrude = hasExtrude || extrudes[i] !== void 0;
		hasTessellate = hasTessellate || tessellates[i] !== void 0;
		hasAltitudeMode = hasAltitudeMode || altitudeModes[i];
	}
	if (hasExtrude) multiGeometry.set("extrude", extrudes);
	if (hasTessellate) multiGeometry.set("tessellate", tessellates);
	if (hasAltitudeMode) multiGeometry.set("altitudeMode", altitudeModes);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var DATA_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"displayName": makeObjectPropertySetter(readString),
	"value": makeObjectPropertySetter(readString)
});
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function dataParser(node, objectStack) {
	const name = node.getAttribute("name");
	parseNode(DATA_PARSERS, node, objectStack);
	const featureObject = objectStack[objectStack.length - 1];
	if (name && featureObject.displayName) featureObject[name] = {
		value: featureObject.value,
		displayName: featureObject.displayName,
		toString: function() {
			return featureObject.value;
		}
	};
	else if (name !== null) featureObject[name] = featureObject.value;
	else if (featureObject.displayName !== null) featureObject[featureObject.displayName] = featureObject.value;
	delete featureObject["value"];
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var EXTENDED_DATA_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"Data": dataParser,
	"SchemaData": schemaDataParser
});
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function extendedDataParser(node, objectStack) {
	parseNode(EXTENDED_DATA_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function regionParser(node, objectStack) {
	parseNode(REGION_PARSERS, node, objectStack);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var PAIR_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"Style": makeObjectPropertySetter(readStyle$1),
	"key": makeObjectPropertySetter(readString),
	"styleUrl": makeObjectPropertySetter(readStyleURL)
});
/**
* @this {KML}
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function pairDataParser(node, objectStack) {
	const pairObject = pushParseAndPop({}, PAIR_PARSERS, node, objectStack, this);
	if (!pairObject) return;
	const key = pairObject["key"];
	if (key && key == "normal") {
		const styleUrl = pairObject["styleUrl"];
		if (styleUrl) objectStack[objectStack.length - 1] = styleUrl;
		const style = pairObject["Style"];
		if (style) objectStack[objectStack.length - 1] = style;
	}
}
/**
* @this {KML}
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function placemarkStyleMapParser(node, objectStack) {
	const styleMapValue = readStyleMapValue.call(this, node, objectStack);
	if (!styleMapValue) return;
	const placemarkObject = objectStack[objectStack.length - 1];
	if (Array.isArray(styleMapValue)) placemarkObject["Style"] = styleMapValue;
	else if (typeof styleMapValue === "string") placemarkObject["styleUrl"] = styleMapValue;
	else throw new Error("`styleMapValue` has an unknown type");
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var SCHEMA_DATA_PARSERS = makeStructureNS(NAMESPACE_URIS$2, { "SimpleData": simpleDataParser });
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function schemaDataParser(node, objectStack) {
	parseNode(SCHEMA_DATA_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function simpleDataParser(node, objectStack) {
	const name = node.getAttribute("name");
	if (name !== null) {
		const data = readString(node);
		const featureObject = objectStack[objectStack.length - 1];
		featureObject[name] = data;
	}
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var LAT_LON_ALT_BOX_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"altitudeMode": makeObjectPropertySetter(readString),
	"minAltitude": makeObjectPropertySetter(readDecimal),
	"maxAltitude": makeObjectPropertySetter(readDecimal),
	"north": makeObjectPropertySetter(readDecimal),
	"south": makeObjectPropertySetter(readDecimal),
	"east": makeObjectPropertySetter(readDecimal),
	"west": makeObjectPropertySetter(readDecimal)
});
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function latLonAltBoxParser(node, objectStack) {
	const object = pushParseAndPop({}, LAT_LON_ALT_BOX_PARSERS, node, objectStack);
	if (!object) return;
	const regionObject = objectStack[objectStack.length - 1];
	regionObject["extent"] = [
		parseFloat(object["west"]),
		parseFloat(object["south"]),
		parseFloat(object["east"]),
		parseFloat(object["north"])
	];
	regionObject["altitudeMode"] = object["altitudeMode"];
	regionObject["minAltitude"] = parseFloat(object["minAltitude"]);
	regionObject["maxAltitude"] = parseFloat(object["maxAltitude"]);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var LOD_PARSERS = makeStructureNS(NAMESPACE_URIS$2, {
	"minLodPixels": makeObjectPropertySetter(readDecimal),
	"maxLodPixels": makeObjectPropertySetter(readDecimal),
	"minFadeExtent": makeObjectPropertySetter(readDecimal),
	"maxFadeExtent": makeObjectPropertySetter(readDecimal)
});
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function lodParser(node, objectStack) {
	const object = pushParseAndPop({}, LOD_PARSERS, node, objectStack);
	if (!object) return;
	const lodObject = objectStack[objectStack.length - 1];
	lodObject["minLodPixels"] = parseFloat(object["minLodPixels"]);
	lodObject["maxLodPixels"] = parseFloat(object["maxLodPixels"]);
	lodObject["minFadeExtent"] = parseFloat(object["minFadeExtent"]);
	lodObject["maxFadeExtent"] = parseFloat(object["maxFadeExtent"]);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var INNER_BOUNDARY_IS_PARSERS = makeStructureNS(NAMESPACE_URIS$2, { "LinearRing": makeArrayPusher(readFlatLinearRing) });
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function innerBoundaryIsParser(node, objectStack) {
	const innerBoundaryFlatLinearRings = pushParseAndPop([], INNER_BOUNDARY_IS_PARSERS, node, objectStack);
	if (innerBoundaryFlatLinearRings.length > 0) objectStack[objectStack.length - 1].push(...innerBoundaryFlatLinearRings);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var OUTER_BOUNDARY_IS_PARSERS = makeStructureNS(NAMESPACE_URIS$2, { "LinearRing": makeReplacer(readFlatLinearRing) });
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function outerBoundaryIsParser(node, objectStack) {
	/** @type {Array<number>|undefined} */
	const flatLinearRing = pushParseAndPop(void 0, OUTER_BOUNDARY_IS_PARSERS, node, objectStack);
	if (flatLinearRing) {
		const flatLinearRings = objectStack[objectStack.length - 1];
		flatLinearRings[0] = flatLinearRing;
	}
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function linkParser(node, objectStack) {
	parseNode(LINK_PARSERS$1, node, objectStack);
}
/**
* @param {Node} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function whenParser(node, objectStack) {
	const whens = objectStack[objectStack.length - 1].whens;
	const s = getAllTextContent(node, false);
	const when = Date.parse(s);
	whens.push(isNaN(when) ? 0 : when);
}
/**
* @param {Node} node Node to append a TextNode with the color to.
* @param {import("../color.js").Color|string} color Color.
*/
function writeColorTextNode(node, color) {
	const rgba = asArray(color);
	/** @type {Array<string|number>} */
	const abgr = [
		(rgba.length == 4 ? rgba[3] : 1) * 255,
		rgba[2],
		rgba[1],
		rgba[0]
	];
	for (let i = 0; i < 4; ++i) {
		const hex = Math.floor(abgr[i]).toString(16);
		abgr[i] = hex.length == 1 ? "0" + hex : hex;
	}
	writeStringTextNode(node, abgr.join(""));
}
/**
* @param {Node} node Node to append a TextNode with the coordinates to.
* @param {Array<number>} coordinates Coordinates.
* @param {Array<*>} objectStack Object stack.
*/
function writeCoordinatesTextNode(node, coordinates, objectStack) {
	const context = objectStack[objectStack.length - 1];
	const layout = context["layout"];
	const stride = context["stride"];
	let dimension;
	if (layout == "XY" || layout == "XYM") dimension = 2;
	else if (layout == "XYZ" || layout == "XYZM") dimension = 3;
	else throw new Error("Invalid geometry layout");
	const ii = coordinates.length;
	let text = "";
	if (ii > 0) {
		text += coordinates[0];
		for (let d = 1; d < dimension; ++d) text += "," + coordinates[d];
		for (let i = stride; i < ii; i += stride) {
			text += " " + coordinates[i];
			for (let d = 1; d < dimension; ++d) text += "," + coordinates[i + d];
		}
	}
	writeStringTextNode(node, text);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var EXTENDEDDATA_NODE_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, {
	"Data": makeChildAppender(writeDataNode),
	"value": makeChildAppender(writeDataNodeValue),
	"displayName": makeChildAppender(writeDataNodeName)
});
/**
* @param {Element} node Node.
* @param {{name: *, value: *}} pair Name value pair.
* @param {Array<*>} objectStack Object stack.
*/
function writeDataNode(node, pair, objectStack) {
	node.setAttribute("name", pair.name);
	const context = { node };
	const value = pair.value;
	if (typeof value == "object") {
		if (value !== null && value.displayName) pushSerializeAndPop(context, EXTENDEDDATA_NODE_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, [value.displayName], objectStack, ["displayName"]);
		if (value !== null && value.value) pushSerializeAndPop(context, EXTENDEDDATA_NODE_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, [value.value], objectStack, ["value"]);
	} else pushSerializeAndPop(context, EXTENDEDDATA_NODE_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, [value], objectStack, ["value"]);
}
/**
* @param {Node} node Node to append a TextNode with the name to.
* @param {string} name DisplayName.
*/
function writeDataNodeName(node, name) {
	writeStringTextNode(node, name);
}
/**
* @param {Node} node Node to append a CDATA Section with the value to.
* @param {string} value Value.
*/
function writeDataNodeValue(node, value) {
	writeStringTextNode(node, value);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var DOCUMENT_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, { "Placemark": makeChildAppender(writePlacemark) });
/**
* @const
* @param {*} value Value.
* @param {Array<*>} objectStack Object stack.
* @param {string} [nodeName] Node name.
* @return {Node|undefined} Node.
*/
var DOCUMENT_NODE_FACTORY = function(value, objectStack, nodeName) {
	const parentNode = objectStack[objectStack.length - 1].node;
	return createElementNS(parentNode.namespaceURI, "Placemark");
};
/**
* @param {Element} node Node.
* @param {Array<Feature>} features Features.
* @param {Array<*>} objectStack Object stack.
* @this {KML}
*/
function writeDocument(node, features, objectStack) {
	pushSerializeAndPop({ node }, DOCUMENT_SERIALIZERS, DOCUMENT_NODE_FACTORY, features, objectStack, void 0, this);
}
/**
* A factory for creating Data nodes.
* @const
* @type {function(*, Array<*>): (Node|undefined)}
*/
var DATA_NODE_FACTORY = makeSimpleNodeFactory("Data");
/**
* @param {Element} node Node.
* @param {{names: Array<string>, values: (Array<*>)}} namesAndValues Names and values.
* @param {Array<*>} objectStack Object stack.
*/
function writeExtendedData(node, namesAndValues, objectStack) {
	const context = { node };
	const names = namesAndValues.names;
	const values = namesAndValues.values;
	const length = names.length;
	for (let i = 0; i < length; i++) pushSerializeAndPop(context, EXTENDEDDATA_NODE_SERIALIZERS, DATA_NODE_FACTORY, [{
		name: names[i],
		value: values[i]
	}], objectStack);
}
/**
* @const
* @type {Object<string, Array<string>>}
*/
var ICON_SEQUENCE = makeStructureNS(NAMESPACE_URIS$2, ["href"], makeStructureNS(GX_NAMESPACE_URIS, [
	"x",
	"y",
	"w",
	"h"
]));
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var ICON_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, { "href": makeChildAppender(writeStringTextNode) }, makeStructureNS(GX_NAMESPACE_URIS, {
	"x": makeChildAppender(writeDecimalTextNode),
	"y": makeChildAppender(writeDecimalTextNode),
	"w": makeChildAppender(writeDecimalTextNode),
	"h": makeChildAppender(writeDecimalTextNode)
}));
/**
* @const
* @param {*} value Value.
* @param {Array<*>} objectStack Object stack.
* @param {string} [nodeName] Node name.
* @return {Node|undefined} Node.
*/
var GX_NODE_FACTORY = function(value, objectStack, nodeName) {
	return createElementNS(GX_NAMESPACE_URIS[0], "gx:" + nodeName);
};
/**
* @param {Element} node Node.
* @param {Object} icon Icon object.
* @param {Array<*>} objectStack Object stack.
*/
function writeIcon(node, icon, objectStack) {
	const context = { node };
	let orderedKeys = ICON_SEQUENCE[objectStack[objectStack.length - 1].node.namespaceURI];
	let values = makeSequence(icon, orderedKeys);
	pushSerializeAndPop(context, ICON_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, values, objectStack, orderedKeys);
	orderedKeys = ICON_SEQUENCE[GX_NAMESPACE_URIS[0]];
	values = makeSequence(icon, orderedKeys);
	pushSerializeAndPop(context, ICON_SERIALIZERS, GX_NODE_FACTORY, values, objectStack, orderedKeys);
}
/**
* @const
* @type {Object<string, Array<string>>}
*/
var ICON_STYLE_SEQUENCE = makeStructureNS(NAMESPACE_URIS$2, [
	"scale",
	"heading",
	"Icon",
	"color",
	"hotSpot"
]);
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var ICON_STYLE_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, {
	"Icon": makeChildAppender(writeIcon),
	"color": makeChildAppender(writeColorTextNode),
	"heading": makeChildAppender(writeDecimalTextNode),
	"hotSpot": makeChildAppender(writeVec2),
	"scale": makeChildAppender(writeScaleTextNode)
});
/**
* @param {Element} node Node.
* @param {import("../style/Icon.js").default} style Icon style.
* @param {Array<*>} objectStack Object stack.
*/
function writeIconStyle(node, style, objectStack) {
	const context = { node };
	const properties = {};
	const src = style.getSrc();
	const size = style.getSize();
	const iconImageSize = style.getImageSize();
	const iconProperties = { "href": src };
	if (size) {
		iconProperties["w"] = size[0];
		iconProperties["h"] = size[1];
		const anchor = style.getAnchor();
		const origin = style.getOrigin();
		if (origin && iconImageSize && origin[0] !== 0 && origin[1] !== size[1]) {
			iconProperties["x"] = origin[0];
			iconProperties["y"] = iconImageSize[1] - (origin[1] + size[1]);
		}
		if (anchor && (anchor[0] !== size[0] / 2 || anchor[1] !== size[1] / 2)) properties["hotSpot"] = {
			x: anchor[0],
			xunits: "pixels",
			y: size[1] - anchor[1],
			yunits: "pixels"
		};
	}
	properties["Icon"] = iconProperties;
	let scale = style.getScaleArray()[0];
	let imageSize = size;
	if (imageSize === null) imageSize = DEFAULT_IMAGE_STYLE_SIZE;
	if (imageSize.length == 2) {
		const resizeScale = scaleForSize(imageSize);
		scale = scale / resizeScale;
	}
	if (scale !== 1) properties["scale"] = scale;
	const rotation = style.getRotation();
	if (rotation !== 0) properties["heading"] = rotation;
	const color = style.getColor();
	if (color) properties["color"] = color;
	const orderedKeys = ICON_STYLE_SEQUENCE[objectStack[objectStack.length - 1].node.namespaceURI];
	pushSerializeAndPop(context, ICON_STYLE_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, makeSequence(properties, orderedKeys), objectStack, orderedKeys);
}
/**
* @const
* @type {Object<string, Array<string>>}
*/
var LABEL_STYLE_SEQUENCE = makeStructureNS(NAMESPACE_URIS$2, ["color", "scale"]);
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var LABEL_STYLE_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, {
	"color": makeChildAppender(writeColorTextNode),
	"scale": makeChildAppender(writeScaleTextNode)
});
/**
* @param {Element} node Node.
* @param {Text} style style.
* @param {Array<*>} objectStack Object stack.
*/
function writeLabelStyle(node, style, objectStack) {
	const context = { node };
	const properties = {};
	const fill = style.getFill();
	if (fill) properties["color"] = fill.getColor();
	const scale = style.getScale();
	if (scale && scale !== 1) properties["scale"] = scale;
	const orderedKeys = LABEL_STYLE_SEQUENCE[objectStack[objectStack.length - 1].node.namespaceURI];
	pushSerializeAndPop(context, LABEL_STYLE_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, makeSequence(properties, orderedKeys), objectStack, orderedKeys);
}
/**
* @const
* @type {Object<string, Array<string>>}
*/
var LINE_STYLE_SEQUENCE = makeStructureNS(NAMESPACE_URIS$2, ["color", "width"]);
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var LINE_STYLE_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, {
	"color": makeChildAppender(writeColorTextNode),
	"width": makeChildAppender(writeDecimalTextNode)
});
/**
* @param {Element} node Node.
* @param {Stroke} style style.
* @param {Array<*>} objectStack Object stack.
*/
function writeLineStyle(node, style, objectStack) {
	const context = { node };
	const properties = {
		"color": style.getColor(),
		"width": Number(style.getWidth()) || 1
	};
	const orderedKeys = LINE_STYLE_SEQUENCE[objectStack[objectStack.length - 1].node.namespaceURI];
	pushSerializeAndPop(context, LINE_STYLE_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, makeSequence(properties, orderedKeys), objectStack, orderedKeys);
}
/**
* @const
* @type {Object<string, string>}
*/
var GEOMETRY_TYPE_TO_NODENAME$1 = {
	"Point": "Point",
	"LineString": "LineString",
	"LinearRing": "LinearRing",
	"Polygon": "Polygon",
	"MultiPoint": "MultiGeometry",
	"MultiLineString": "MultiGeometry",
	"MultiPolygon": "MultiGeometry",
	"GeometryCollection": "MultiGeometry"
};
/**
* @const
* @param {*} value Value.
* @param {Array<*>} objectStack Object stack.
* @param {string} [nodeName] Node name.
* @return {Node|undefined} Node.
*/
var GEOMETRY_NODE_FACTORY = function(value, objectStack, nodeName) {
	if (value) {
		const parentNode = objectStack[objectStack.length - 1].node;
		return createElementNS(parentNode.namespaceURI, GEOMETRY_TYPE_TO_NODENAME$1[value.getType()]);
	}
};
/**
* A factory for creating Point nodes.
* @const
* @type {function(*, Array<*>, string=): (Node|undefined)}
*/
var POINT_NODE_FACTORY = makeSimpleNodeFactory("Point");
/**
* A factory for creating LineString nodes.
* @const
* @type {function(*, Array<*>, string=): (Node|undefined)}
*/
var LINE_STRING_NODE_FACTORY = makeSimpleNodeFactory("LineString");
/**
* A factory for creating LinearRing nodes.
* @const
* @type {function(*, Array<*>, string=): (Node|undefined)}
*/
var LINEAR_RING_NODE_FACTORY = makeSimpleNodeFactory("LinearRing");
/**
* A factory for creating Polygon nodes.
* @const
* @type {function(*, Array<*>, string=): (Node|undefined)}
*/
var POLYGON_NODE_FACTORY = makeSimpleNodeFactory("Polygon");
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var MULTI_GEOMETRY_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, {
	"LineString": makeChildAppender(writePrimitiveGeometry),
	"Point": makeChildAppender(writePrimitiveGeometry),
	"Polygon": makeChildAppender(writePolygon),
	"GeometryCollection": makeChildAppender(writeMultiGeometry)
});
/**
* @param {Element} node Node.
* @param {import("../geom/Geometry.js").default} geometry Geometry.
* @param {Array<*>} objectStack Object stack.
*/
function writeMultiGeometry(node, geometry, objectStack) {
	/** @type {import("../xml.js").NodeStackItem} */
	const context = { node };
	const type = geometry.getType();
	/** @type {Array<import("../geom/Geometry.js").default>} */
	let geometries = [];
	/** @type {function(*, Array<*>, string=): (Node|undefined)} */
	let factory;
	if (type === "GeometryCollection") {
		/** @type {GeometryCollection} */ geometry.getGeometriesArrayRecursive().forEach(function(geometry) {
			const type = geometry.getType();
			if (type === "MultiPoint") geometries = geometries.concat(
				/** @type {MultiPoint} */
				geometry.getPoints()
			);
			else if (type === "MultiLineString") geometries = geometries.concat(
				/** @type {MultiLineString} */
				geometry.getLineStrings()
			);
			else if (type === "MultiPolygon") geometries = geometries.concat(
				/** @type {MultiPolygon} */
				geometry.getPolygons()
			);
			else if (type === "Point" || type === "LineString" || type === "Polygon") geometries.push(geometry);
			else throw new Error("Unknown geometry type");
		});
		factory = GEOMETRY_NODE_FACTORY;
	} else if (type === "MultiPoint") {
		geometries = geometry.getPoints();
		factory = POINT_NODE_FACTORY;
	} else if (type === "MultiLineString") {
		geometries = geometry.getLineStrings();
		factory = LINE_STRING_NODE_FACTORY;
	} else if (type === "MultiPolygon") {
		geometries = geometry.getPolygons();
		factory = POLYGON_NODE_FACTORY;
	} else throw new Error("Unknown geometry type");
	pushSerializeAndPop(context, MULTI_GEOMETRY_SERIALIZERS, factory, geometries, objectStack);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var BOUNDARY_IS_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, { "LinearRing": makeChildAppender(writePrimitiveGeometry) });
/**
* @param {Element} node Node.
* @param {import("../geom/LinearRing.js").default} linearRing Linear ring.
* @param {Array<*>} objectStack Object stack.
*/
function writeBoundaryIs(node, linearRing, objectStack) {
	pushSerializeAndPop({ node }, BOUNDARY_IS_SERIALIZERS, LINEAR_RING_NODE_FACTORY, [linearRing], objectStack);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var PLACEMARK_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, {
	"ExtendedData": makeChildAppender(writeExtendedData),
	"MultiGeometry": makeChildAppender(writeMultiGeometry),
	"LineString": makeChildAppender(writePrimitiveGeometry),
	"LinearRing": makeChildAppender(writePrimitiveGeometry),
	"Point": makeChildAppender(writePrimitiveGeometry),
	"Polygon": makeChildAppender(writePolygon),
	"Style": makeChildAppender(writeStyle),
	"address": makeChildAppender(writeStringTextNode),
	"description": makeChildAppender(writeStringTextNode),
	"name": makeChildAppender(writeStringTextNode),
	"open": makeChildAppender(writeBooleanTextNode),
	"phoneNumber": makeChildAppender(writeStringTextNode),
	"styleUrl": makeChildAppender(writeStringTextNode),
	"visibility": makeChildAppender(writeBooleanTextNode)
});
/**
* @const
* @type {Object<string, Array<string>>}
*/
var PLACEMARK_SEQUENCE = makeStructureNS(NAMESPACE_URIS$2, [
	"name",
	"open",
	"visibility",
	"address",
	"phoneNumber",
	"description",
	"styleUrl",
	"Style"
]);
/**
* A factory for creating ExtendedData nodes.
* @const
* @type {function(*, Array<*>): (Node|undefined)}
*/
var EXTENDEDDATA_NODE_FACTORY = makeSimpleNodeFactory("ExtendedData");
/**
* FIXME currently we do serialize arbitrary/custom feature properties
* (ExtendedData).
* @param {Element} node Node.
* @param {Feature} feature Feature.
* @param {Array<*>} objectStack Object stack.
* @this {KML}
*/
function writePlacemark(node, feature, objectStack) {
	const context = { node };
	if (feature.getId()) node.setAttribute("id", feature.getId());
	const properties = feature.getProperties();
	const filter = {
		"address": 1,
		"description": 1,
		"name": 1,
		"open": 1,
		"phoneNumber": 1,
		"styleUrl": 1,
		"visibility": 1
	};
	filter[feature.getGeometryName()] = 1;
	const keys = Object.keys(properties || {}).sort().filter(function(v) {
		return !filter[v];
	});
	const styleFunction = feature.getStyleFunction();
	if (styleFunction) {
		const styles = styleFunction(feature, 0);
		if (styles) {
			const styleArray = Array.isArray(styles) ? styles : [styles];
			let pointStyles = styleArray;
			if (feature.getGeometry()) pointStyles = styleArray.filter(function(style) {
				const geometry = style.getGeometryFunction()(feature);
				if (geometry) {
					const type = geometry.getType();
					if (type === "GeometryCollection") return geometry.getGeometriesArrayRecursive().filter(function(geometry) {
						const type = geometry.getType();
						return type === "Point" || type === "MultiPoint";
					}).length;
					return type === "Point" || type === "MultiPoint";
				}
			});
			if (this.writeStyles_) {
				let lineStyles = styleArray;
				let polyStyles = styleArray;
				if (feature.getGeometry()) {
					lineStyles = styleArray.filter(function(style) {
						const geometry = style.getGeometryFunction()(feature);
						if (geometry) {
							const type = geometry.getType();
							if (type === "GeometryCollection") return geometry.getGeometriesArrayRecursive().filter(function(geometry) {
								const type = geometry.getType();
								return type === "LineString" || type === "MultiLineString";
							}).length;
							return type === "LineString" || type === "MultiLineString";
						}
					});
					polyStyles = styleArray.filter(function(style) {
						const geometry = style.getGeometryFunction()(feature);
						if (geometry) {
							const type = geometry.getType();
							if (type === "GeometryCollection") return geometry.getGeometriesArrayRecursive().filter(function(geometry) {
								const type = geometry.getType();
								return type === "Polygon" || type === "MultiPolygon";
							}).length;
							return type === "Polygon" || type === "MultiPolygon";
						}
					});
				}
				properties["Style"] = {
					pointStyles,
					lineStyles,
					polyStyles
				};
			}
			if (pointStyles.length && properties["name"] === void 0) {
				const textStyle = pointStyles[0].getText();
				if (textStyle) properties["name"] = textStyle.getText();
			}
		}
	}
	const orderedKeys = PLACEMARK_SEQUENCE[objectStack[objectStack.length - 1].node.namespaceURI];
	pushSerializeAndPop(context, PLACEMARK_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, makeSequence(properties, orderedKeys), objectStack, orderedKeys);
	if (keys.length > 0) pushSerializeAndPop(context, PLACEMARK_SERIALIZERS, EXTENDEDDATA_NODE_FACTORY, [{
		names: keys,
		values: makeSequence(properties, keys)
	}], objectStack);
	const options = objectStack[0];
	let geometry = feature.getGeometry();
	if (geometry) geometry = transformGeometryWithOptions(geometry, true, options);
	pushSerializeAndPop(context, PLACEMARK_SERIALIZERS, GEOMETRY_NODE_FACTORY, [geometry], objectStack);
}
/**
* @const
* @type {Object<string, Array<string>>}
*/
var PRIMITIVE_GEOMETRY_SEQUENCE = makeStructureNS(NAMESPACE_URIS$2, [
	"extrude",
	"tessellate",
	"altitudeMode",
	"coordinates"
]);
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var PRIMITIVE_GEOMETRY_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, {
	"extrude": makeChildAppender(writeBooleanTextNode),
	"tessellate": makeChildAppender(writeBooleanTextNode),
	"altitudeMode": makeChildAppender(writeStringTextNode),
	"coordinates": makeChildAppender(writeCoordinatesTextNode)
});
/**
* @param {Element} node Node.
* @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
* @param {Array<*>} objectStack Object stack.
*/
function writePrimitiveGeometry(node, geometry, objectStack) {
	const flatCoordinates = geometry.getFlatCoordinates();
	const context = { node };
	context["layout"] = geometry.getLayout();
	context["stride"] = geometry.getStride();
	const properties = geometry.getProperties();
	properties.coordinates = flatCoordinates;
	const orderedKeys = PRIMITIVE_GEOMETRY_SEQUENCE[objectStack[objectStack.length - 1].node.namespaceURI];
	pushSerializeAndPop(context, PRIMITIVE_GEOMETRY_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, makeSequence(properties, orderedKeys), objectStack, orderedKeys);
}
/**
* @const
* @type {Object<string, Array<string>>}
*/
var POLY_STYLE_SEQUENCE = makeStructureNS(NAMESPACE_URIS$2, [
	"color",
	"fill",
	"outline"
]);
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var POLYGON_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, {
	"outerBoundaryIs": makeChildAppender(writeBoundaryIs),
	"innerBoundaryIs": makeChildAppender(writeBoundaryIs)
});
/**
* A factory for creating innerBoundaryIs nodes.
* @const
* @type {function(*, Array<*>, string=): (Node|undefined)}
*/
var INNER_BOUNDARY_NODE_FACTORY = makeSimpleNodeFactory("innerBoundaryIs");
/**
* A factory for creating outerBoundaryIs nodes.
* @const
* @type {function(*, Array<*>, string=): (Node|undefined)}
*/
var OUTER_BOUNDARY_NODE_FACTORY = makeSimpleNodeFactory("outerBoundaryIs");
/**
* @param {Element} node Node.
* @param {Polygon} polygon Polygon.
* @param {Array<*>} objectStack Object stack.
*/
function writePolygon(node, polygon, objectStack) {
	const linearRings = polygon.getLinearRings();
	const outerRing = linearRings.shift();
	const context = { node };
	pushSerializeAndPop(context, POLYGON_SERIALIZERS, INNER_BOUNDARY_NODE_FACTORY, linearRings, objectStack);
	pushSerializeAndPop(context, POLYGON_SERIALIZERS, OUTER_BOUNDARY_NODE_FACTORY, [outerRing], objectStack);
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var POLY_STYLE_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, {
	"color": makeChildAppender(writeColorTextNode),
	"fill": makeChildAppender(writeBooleanTextNode),
	"outline": makeChildAppender(writeBooleanTextNode)
});
/**
* @param {Element} node Node.
* @param {Style} style Style.
* @param {Array<*>} objectStack Object stack.
*/
function writePolyStyle(node, style, objectStack) {
	const context = { node };
	const fill = style.getFill();
	const stroke = style.getStroke();
	const properties = {
		"color": fill ? fill.getColor() : void 0,
		"fill": fill ? void 0 : false,
		"outline": stroke ? void 0 : false
	};
	const orderedKeys = POLY_STYLE_SEQUENCE[objectStack[objectStack.length - 1].node.namespaceURI];
	pushSerializeAndPop(context, POLY_STYLE_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, makeSequence(properties, orderedKeys), objectStack, orderedKeys);
}
/**
* @param {Node} node Node to append a TextNode with the scale to.
* @param {number|undefined} scale Scale.
*/
function writeScaleTextNode(node, scale) {
	writeDecimalTextNode(node, Math.round(scale * 1e6) / 1e6);
}
/**
* @const
* @type {Object<string, Array<string>>}
*/
var STYLE_SEQUENCE = makeStructureNS(NAMESPACE_URIS$2, [
	"IconStyle",
	"LabelStyle",
	"LineStyle",
	"PolyStyle"
]);
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var STYLE_SERIALIZERS = makeStructureNS(NAMESPACE_URIS$2, {
	"IconStyle": makeChildAppender(writeIconStyle),
	"LabelStyle": makeChildAppender(writeLabelStyle),
	"LineStyle": makeChildAppender(writeLineStyle),
	"PolyStyle": makeChildAppender(writePolyStyle)
});
/**
* @param {Element} node Node.
* @param {Object<string, Array<Style>>} styles Styles.
* @param {Array<*>} objectStack Object stack.
*/
function writeStyle(node, styles, objectStack) {
	const context = { node };
	const properties = {};
	if (styles.pointStyles.length) {
		const textStyle = styles.pointStyles[0].getText();
		if (textStyle) properties["LabelStyle"] = textStyle;
		const imageStyle = styles.pointStyles[0].getImage();
		if (imageStyle && typeof imageStyle.getSrc === "function") properties["IconStyle"] = imageStyle;
	}
	if (styles.lineStyles.length) {
		const strokeStyle = styles.lineStyles[0].getStroke();
		if (strokeStyle) properties["LineStyle"] = strokeStyle;
	}
	if (styles.polyStyles.length) {
		const strokeStyle = styles.polyStyles[0].getStroke();
		if (strokeStyle && !properties["LineStyle"]) properties["LineStyle"] = strokeStyle;
		properties["PolyStyle"] = styles.polyStyles[0];
	}
	const orderedKeys = STYLE_SEQUENCE[objectStack[objectStack.length - 1].node.namespaceURI];
	pushSerializeAndPop(context, STYLE_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, makeSequence(properties, orderedKeys), objectStack, orderedKeys);
}
/**
* @param {Element} node Node to append a TextNode with the Vec2 to.
* @param {Vec2} vec2 Vec2.
*/
function writeVec2(node, vec2) {
	node.setAttribute("x", String(vec2.x));
	node.setAttribute("y", String(vec2.y));
	node.setAttribute("xunits", vec2.xunits);
	node.setAttribute("yunits", vec2.yunits);
}
//#endregion
//#region node_modules/ol/format/MVT.js
/**
* @module ol/format/MVT
*/
/**
* @template {import("../Feature.js").FeatureLike} [FeatureType=import("../render/Feature.js").default]
* @typedef {Object} Options
* @property {import('./Feature.js').FeatureToFeatureClass<FeatureType>} [featureClass] Class for features returned by
* {@link module:ol/format/MVT~MVT#readFeatures}. Set to {@link module:ol/Feature~Feature} to get full editing and geometry
* support at the cost of decreased rendering performance. The default is
* {@link module:ol/render/Feature~RenderFeature}, which is optimized for rendering and hit detection.
* @property {string} [geometryName='geometry'] Geometry name to use when creating features.
* @property {string} [layerName='layer'] Name of the feature attribute that holds the layer name.
* @property {Array<string>} [layers] Layers to read features from. If not provided, features will be read from all
* @property {string} [idProperty] Optional property that will be assigned as the feature id and removed from the properties.
* layers.
*/
/**
* @classdesc
* Feature format for reading data in the Mapbox MVT format.
*
* @template {import('../Feature.js').FeatureLike} [FeatureType=RenderFeature]
* @extends {FeatureFormat<FeatureType>}
* @api
*/
var MVT = class extends FeatureFormat {
	/**
	* @param {Options<FeatureType>} [options] Options.
	*/
	constructor(options) {
		super();
		options = options ? options : {};
		/**
		* @type {Projection}
		*/
		this.dataProjection = new Projection({
			code: "",
			units: "tile-pixels"
		});
		this.featureClass = options.featureClass ? options.featureClass : RenderFeature;
		/**
		* @private
		* @type {string|undefined}
		*/
		this.geometryName_ = options.geometryName;
		/**
		* @private
		* @type {string}
		*/
		this.layerName_ = options.layerName ? options.layerName : "layer";
		/**
		* @private
		* @type {Array<string>|null}
		*/
		this.layers_ = options.layers ? options.layers : null;
		/**
		* @private
		* @type {string}
		*/
		this.idProperty_ = options.idProperty;
		this.supportedMediaTypes = ["application/vnd.mapbox-vector-tile", "application/x-protobuf"];
	}
	/**
	* Read the raw geometry from the pbf offset stored in a raw feature's geometry
	* property.
	* @param {PBF} pbf PBF.
	* @param {Object} feature Raw feature.
	* @param {Array<number>} flatCoordinates Array to store flat coordinates in.
	* @param {Array<number>} ends Array to store ends in.
	* @private
	*/
	readRawGeometry_(pbf, feature, flatCoordinates, ends) {
		pbf.pos = feature.geometry;
		const end = pbf.readVarint() + pbf.pos;
		let cmd = 1;
		let length = 0;
		let x = 0;
		let y = 0;
		let coordsLen = 0;
		let currentEnd = 0;
		while (pbf.pos < end) {
			if (!length) {
				const cmdLen = pbf.readVarint();
				cmd = cmdLen & 7;
				length = cmdLen >> 3;
			}
			length--;
			if (cmd === 1 || cmd === 2) {
				x += pbf.readSVarint();
				y += pbf.readSVarint();
				if (cmd === 1) {
					if (coordsLen > currentEnd) {
						ends.push(coordsLen);
						currentEnd = coordsLen;
					}
				}
				flatCoordinates.push(x, y);
				coordsLen += 2;
			} else if (cmd === 7) {
				if (coordsLen > currentEnd) {
					flatCoordinates.push(flatCoordinates[currentEnd], flatCoordinates[currentEnd + 1]);
					coordsLen += 2;
				}
			} else throw new Error("Invalid command found in the PBF");
		}
		if (coordsLen > currentEnd) {
			ends.push(coordsLen);
			currentEnd = coordsLen;
		}
	}
	/**
	* @private
	* @param {PBF} pbf PBF
	* @param {Object} rawFeature Raw Mapbox feature.
	* @param {import("./Feature.js").ReadOptions} options Read options.
	* @return {FeatureType|null} Feature.
	*/
	createFeature_(pbf, rawFeature, options) {
		const type = rawFeature.type;
		if (type === 0) return null;
		let feature;
		const values = rawFeature.properties;
		let id;
		if (!this.idProperty_) id = rawFeature.id;
		else {
			id = values[this.idProperty_];
			delete values[this.idProperty_];
		}
		values[this.layerName_] = rawFeature.layer.name;
		const flatCoordinates = [];
		const ends = [];
		this.readRawGeometry_(pbf, rawFeature, flatCoordinates, ends);
		const geometryType = getGeometryType(type, ends.length);
		if (this.featureClass === RenderFeature) {
			feature = new this.featureClass(geometryType, flatCoordinates, ends, 2, values, id);
			feature.transform(options.dataProjection);
		} else {
			let geom;
			if (geometryType == "Polygon") {
				const endss = inflateEnds(flatCoordinates, ends);
				geom = endss.length > 1 ? new MultiPolygon(flatCoordinates, "XY", endss) : new Polygon(flatCoordinates, "XY", ends);
			} else geom = geometryType === "Point" ? new Point(flatCoordinates, "XY") : geometryType === "LineString" ? new LineString(flatCoordinates, "XY") : geometryType === "MultiPoint" ? new MultiPoint(flatCoordinates, "XY") : geometryType === "MultiLineString" ? new MultiLineString(flatCoordinates, "XY", ends) : null;
			const ctor = this.featureClass;
			feature = new ctor();
			if (this.geometryName_) feature.setGeometryName(this.geometryName_);
			const geometry = transformGeometryWithOptions(geom, false, options);
			feature.setGeometry(geometry);
			if (id !== void 0) feature.setId(id);
			feature.setProperties(values, true);
		}
		return feature;
	}
	/**
	* @return {import("./Feature.js").Type} Format.
	* @override
	*/
	getType() {
		return "arraybuffer";
	}
	/**
	* Read all features.
	*
	* @param {ArrayBuffer} source Source.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @return {Array<FeatureType>} Features.
	* @api
	* @override
	*/
	readFeatures(source, options) {
		const layers = this.layers_;
		options = this.adaptOptions(options);
		const dataProjection = get$1(options.dataProjection);
		dataProjection.setWorldExtent(options.extent);
		options.dataProjection = dataProjection;
		const pbf = new Pbf(source);
		const pbfLayers = pbf.readFields(layersPBFReader, {});
		const features = [];
		for (const name in pbfLayers) {
			if (layers && !layers.includes(name)) continue;
			const pbfLayer = pbfLayers[name];
			const extent = pbfLayer ? [
				0,
				0,
				pbfLayer.extent,
				pbfLayer.extent
			] : null;
			dataProjection.setExtent(extent);
			for (let i = 0, ii = pbfLayer.length; i < ii; ++i) {
				const rawFeature = readRawFeature(pbf, pbfLayer, i);
				const feature = this.createFeature_(pbf, rawFeature, options);
				if (feature !== null) features.push(feature);
			}
		}
		return features;
	}
	/**
	* Read the projection from the source.
	*
	* @param {Document|Element|Object|string} source Source.
	* @return {import("../proj/Projection.js").default} Projection.
	* @api
	* @override
	*/
	readProjection(source) {
		return this.dataProjection;
	}
	/**
	* Sets the layers that features will be read from.
	* @param {Array<string>} layers Layers.
	* @api
	*/
	setLayers(layers) {
		this.layers_ = layers;
	}
};
/**
* Reader callback for parsing layers.
* @param {number} tag The tag.
* @param {Object} layers The layers object.
* @param {PBF} pbf The PBF.
*/
function layersPBFReader(tag, layers, pbf) {
	if (tag === 3) {
		const layer = {
			keys: [],
			values: [],
			features: []
		};
		const end = pbf.readVarint() + pbf.pos;
		pbf.readFields(layerPBFReader, layer, end);
		layer.length = layer.features.length;
		if (layer.length) layers[layer.name] = layer;
	}
}
/**
* Reader callback for parsing layer.
* @param {number} tag The tag.
* @param {Object} layer The layer object.
* @param {PBF} pbf The PBF.
*/
function layerPBFReader(tag, layer, pbf) {
	if (tag === 15) layer.version = pbf.readVarint();
	else if (tag === 1) layer.name = pbf.readString();
	else if (tag === 5) layer.extent = pbf.readVarint();
	else if (tag === 2) layer.features.push(pbf.pos);
	else if (tag === 3) layer.keys.push(pbf.readString());
	else if (tag === 4) {
		let value = null;
		const end = pbf.readVarint() + pbf.pos;
		while (pbf.pos < end) {
			tag = pbf.readVarint() >> 3;
			value = tag === 1 ? pbf.readString() : tag === 2 ? pbf.readFloat() : tag === 3 ? pbf.readDouble() : tag === 4 ? pbf.readVarint64() : tag === 5 ? pbf.readVarint() : tag === 6 ? pbf.readSVarint() : tag === 7 ? pbf.readBoolean() : null;
		}
		layer.values.push(value);
	}
}
/**
* Reader callback for parsing feature.
* @param {number} tag The tag.
* @param {Object} feature The feature object.
* @param {PBF} pbf The PBF.
*/
function featurePBFReader(tag, feature, pbf) {
	if (tag == 1) feature.id = pbf.readVarint();
	else if (tag == 2) {
		const end = pbf.readVarint() + pbf.pos;
		while (pbf.pos < end) {
			const key = feature.layer.keys[pbf.readVarint()];
			const value = feature.layer.values[pbf.readVarint()];
			feature.properties[key] = value;
		}
	} else if (tag == 3) feature.type = pbf.readVarint();
	else if (tag == 4) feature.geometry = pbf.pos;
}
/**
* Read a raw feature from the pbf offset stored at index `i` in the raw layer.
* @param {PBF} pbf PBF.
* @param {Object} layer Raw layer.
* @param {number} i Index of the feature in the raw layer's `features` array.
* @return {Object} Raw feature.
*/
function readRawFeature(pbf, layer, i) {
	pbf.pos = layer.features[i];
	const end = pbf.readVarint() + pbf.pos;
	const feature = {
		layer,
		type: 0,
		properties: {}
	};
	pbf.readFields(featurePBFReader, feature, end);
	return feature;
}
/**
* @param {number} type The raw feature's geometry type
* @param {number} numEnds Number of ends of the flat coordinates of the
* geometry.
* @return {import("../render/Feature.js").Type} The geometry type.
*/
function getGeometryType(type, numEnds) {
	/** @type {import("../render/Feature.js").Type} */
	let geometryType;
	if (type === 1) geometryType = numEnds === 1 ? "Point" : "MultiPoint";
	else if (type === 2) geometryType = numEnds === 1 ? "LineString" : "MultiLineString";
	else if (type === 3) geometryType = "Polygon";
	return geometryType;
}
//#endregion
//#region node_modules/ol/format/XML.js
/**
* @module ol/format/XML
*/
/**
* @classdesc
* Generic format for reading non-feature XML data
*
* @abstract
*/
var XML = class {
	/**
	* Read the source document.
	*
	* @param {Document|Element|string} source The XML source.
	* @return {Object|null} An object representing the source.
	* @api
	*/
	read(source) {
		if (!source) return null;
		if (typeof source === "string") {
			const doc = parse(source);
			return this.readFromDocument(doc);
		}
		if (isDocument(source)) return this.readFromDocument(source);
		return this.readFromNode(source);
	}
	/**
	* @param {Document} doc Document.
	* @return {Object|null} Object
	*/
	readFromDocument(doc) {
		for (let n = doc.firstChild; n; n = n.nextSibling) if (n.nodeType == Node.ELEMENT_NODE) return this.readFromNode(n);
		return null;
	}
	/**
	* @abstract
	* @param {Element} node Node.
	* @return {Object|null} Object
	*/
	readFromNode(node) {
		abstract();
	}
};
//#endregion
//#region node_modules/ol/format/xlink.js
/**
* @module ol/format/xlink
*/
/**
* @const
* @type {string}
*/
var NAMESPACE_URI = "http://www.w3.org/1999/xlink";
/**
* @param {Element} node Node.
* @return {string|null} href.
*/
function readHref(node) {
	return node.getAttributeNS(NAMESPACE_URI, "href");
}
//#endregion
//#region node_modules/ol/format/WMSCapabilities.js
/**
* @module ol/format/WMSCapabilities
*/
init_objectSpread2();
/**
* @const
* @type {Array<null|string>}
*/
var NAMESPACE_URIS$1 = [
	null,
	"http://www.opengis.net/wms",
	"http://www.opengis.net/sld"
];
function isV13(objectStack) {
	return compareVersions(objectStack[0].version, "1.3") >= 0;
}
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var PARSERS = makeStructureNS(NAMESPACE_URIS$1, {
	"Service": makeObjectPropertySetter(readService),
	"Capability": makeObjectPropertySetter(readCapability)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var CAPABILITY_PARSERS = makeStructureNS(NAMESPACE_URIS$1, {
	"Request": makeObjectPropertySetter(readRequest),
	"Exception": makeObjectPropertySetter(readException),
	"Layer": makeObjectPropertySetter(readCapabilityLayer),
	"UserDefinedSymbolization": makeObjectPropertySetter(readUserDefinedSymbolization)
});
/**
* @typedef {Object} RootObject
* @property {string} version Version
* @property {boolean} v13 Whether version is 1.3 or higher
*/
/**
* @classdesc
* Format for reading WMS capabilities data
*
* @api
*/
var WMSCapabilities = class extends XML {
	constructor() {
		super();
		/**
		* @type {string|undefined}
		*/
		this.version = void 0;
	}
	/**
	* @param {Element} node Node.
	* @return {Object|null} Object
	* @override
	*/
	readFromNode(node) {
		this.version = node.getAttribute("version").trim();
		const wmsCapabilityObject = pushParseAndPop({ "version": this.version }, PARSERS, node, []);
		return wmsCapabilityObject ? wmsCapabilityObject : null;
	}
};
var COMMON_SERVICE_PARSERS = {
	"Name": makeObjectPropertySetter(readString),
	"Title": makeObjectPropertySetter(readString),
	"Abstract": makeObjectPropertySetter(readString),
	"KeywordList": makeObjectPropertySetter(readKeywordList),
	"OnlineResource": makeObjectPropertySetter(readHref),
	"ContactInformation": makeObjectPropertySetter(readContactInformation),
	"Fees": makeObjectPropertySetter(readString),
	"AccessConstraints": makeObjectPropertySetter(readString)
};
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var SERVICE_PARSERS = makeStructureNS(NAMESPACE_URIS$1, COMMON_SERVICE_PARSERS);
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var SERVICE_PARSERS_V13 = makeStructureNS(NAMESPACE_URIS$1, _objectSpread2(_objectSpread2({}, COMMON_SERVICE_PARSERS), {}, {
	"LayerLimit": makeObjectPropertySetter(readPositiveInteger),
	"MaxWidth": makeObjectPropertySetter(readPositiveInteger),
	"MaxHeight": makeObjectPropertySetter(readPositiveInteger)
}));
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var CONTACT_INFORMATION_PARSERS = makeStructureNS(NAMESPACE_URIS$1, {
	"ContactPersonPrimary": makeObjectPropertySetter(readContactPersonPrimary),
	"ContactPosition": makeObjectPropertySetter(readString),
	"ContactAddress": makeObjectPropertySetter(readContactAddress),
	"ContactVoiceTelephone": makeObjectPropertySetter(readString),
	"ContactFacsimileTelephone": makeObjectPropertySetter(readString),
	"ContactElectronicMailAddress": makeObjectPropertySetter(readString)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var CONTACT_PERSON_PARSERS = makeStructureNS(NAMESPACE_URIS$1, {
	"ContactPerson": makeObjectPropertySetter(readString),
	"ContactOrganization": makeObjectPropertySetter(readString)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var CONTACT_ADDRESS_PARSERS = makeStructureNS(NAMESPACE_URIS$1, {
	"AddressType": makeObjectPropertySetter(readString),
	"Address": makeObjectPropertySetter(readString),
	"City": makeObjectPropertySetter(readString),
	"StateOrProvince": makeObjectPropertySetter(readString),
	"PostCode": makeObjectPropertySetter(readString),
	"Country": makeObjectPropertySetter(readString)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var EXCEPTION_PARSERS = makeStructureNS(NAMESPACE_URIS$1, { "Format": makeArrayPusher(readString) });
var COMMON_LAYER_PARSERS = {
	"Name": makeObjectPropertySetter(readString),
	"Title": makeObjectPropertySetter(readString),
	"Abstract": makeObjectPropertySetter(readString),
	"KeywordList": makeObjectPropertySetter(readKeywordList),
	"BoundingBox": makeObjectPropertyPusher(readBoundingBox),
	"Dimension": makeObjectPropertyPusher(readDimension),
	"Attribution": makeObjectPropertySetter(readAttribution),
	"AuthorityURL": makeObjectPropertyPusher(readAuthorityURL),
	"Identifier": makeObjectPropertyPusher(readString),
	"MetadataURL": makeObjectPropertyPusher(readMetadataURL),
	"DataURL": makeObjectPropertyPusher(readFormatOnlineresource),
	"FeatureListURL": makeObjectPropertyPusher(readFormatOnlineresource),
	"Style": makeObjectPropertyPusher(readStyle),
	"Layer": makeObjectPropertyPusher(readLayer)
};
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var LAYER_PARSERS = makeStructureNS(NAMESPACE_URIS$1, _objectSpread2(_objectSpread2({}, COMMON_LAYER_PARSERS), {}, {
	"SRS": makeObjectPropertyPusher(readString),
	"Extent": makeObjectPropertySetter(readExtent),
	"ScaleHint": makeObjectPropertyPusher(readScaleHint),
	"LatLonBoundingBox": makeObjectPropertySetter((node, objectStack) => readBoundingBox(node, objectStack, false)),
	"Layer": makeObjectPropertyPusher(readLayer)
}));
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var LAYER_PARSERS_V13 = makeStructureNS(NAMESPACE_URIS$1, _objectSpread2(_objectSpread2({}, COMMON_LAYER_PARSERS), {}, {
	"CRS": makeObjectPropertyPusher(readString),
	"EX_GeographicBoundingBox": makeObjectPropertySetter(readEXGeographicBoundingBox),
	"MinScaleDenominator": makeObjectPropertySetter(readDecimal),
	"MaxScaleDenominator": makeObjectPropertySetter(readDecimal),
	"Layer": makeObjectPropertyPusher(readLayer)
}));
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var ATTRIBUTION_PARSERS = makeStructureNS(NAMESPACE_URIS$1, {
	"Title": makeObjectPropertySetter(readString),
	"OnlineResource": makeObjectPropertySetter(readHref),
	"LogoURL": makeObjectPropertySetter(readSizedFormatOnlineresource)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var EX_GEOGRAPHIC_BOUNDING_BOX_PARSERS = makeStructureNS(NAMESPACE_URIS$1, {
	"westBoundLongitude": makeObjectPropertySetter(readDecimal),
	"eastBoundLongitude": makeObjectPropertySetter(readDecimal),
	"southBoundLatitude": makeObjectPropertySetter(readDecimal),
	"northBoundLatitude": makeObjectPropertySetter(readDecimal)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var REQUEST_PARSERS = makeStructureNS(NAMESPACE_URIS$1, {
	"GetCapabilities": makeObjectPropertySetter(readOperationType),
	"GetMap": makeObjectPropertySetter(readOperationType),
	"GetFeatureInfo": makeObjectPropertySetter(readOperationType),
	"DescribeLayer": makeObjectPropertySetter(readOperationType),
	"GetLegendGraphic": makeObjectPropertySetter(readOperationType)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var OPERATIONTYPE_PARSERS = makeStructureNS(NAMESPACE_URIS$1, {
	"Format": makeObjectPropertyPusher(readString),
	"DCPType": makeObjectPropertyPusher(readDCPType)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var DCPTYPE_PARSERS = makeStructureNS(NAMESPACE_URIS$1, { "HTTP": makeObjectPropertySetter(readHTTP) });
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var HTTP_PARSERS = makeStructureNS(NAMESPACE_URIS$1, {
	"Get": makeObjectPropertySetter(readFormatOnlineresource),
	"Post": makeObjectPropertySetter(readFormatOnlineresource)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var STYLE_PARSERS = makeStructureNS(NAMESPACE_URIS$1, {
	"Name": makeObjectPropertySetter(readString),
	"Title": makeObjectPropertySetter(readString),
	"Abstract": makeObjectPropertySetter(readString),
	"LegendURL": makeObjectPropertyPusher(readSizedFormatOnlineresource),
	"StyleSheetURL": makeObjectPropertySetter(readFormatOnlineresource),
	"StyleURL": makeObjectPropertySetter(readFormatOnlineresource)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var FORMAT_ONLINERESOURCE_PARSERS = makeStructureNS(NAMESPACE_URIS$1, {
	"Format": makeObjectPropertySetter(readString),
	"OnlineResource": makeObjectPropertySetter(readHref)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var KEYWORDLIST_PARSERS = makeStructureNS(NAMESPACE_URIS$1, { "Keyword": makeArrayPusher(readString) });
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Attribution object.
*/
function readAttribution(node, objectStack) {
	return pushParseAndPop({}, ATTRIBUTION_PARSERS, node, objectStack);
}
function readUserDefinedSymbolization(node, objectStack) {
	return {
		"SupportSLD": !!readBooleanString(node.getAttribute("SupportSLD")),
		"UserLayer": !!readBooleanString(node.getAttribute("UserLayer")),
		"UserStyle": !!readBooleanString(node.getAttribute("UserStyle")),
		"RemoteWFS": !!readBooleanString(node.getAttribute("RemoteWFS")),
		"InlineFeatureData": !!readBooleanString(node.getAttribute("InlineFeatureData")),
		"RemoteWCS": !!readBooleanString(node.getAttribute("RemoteWCS"))
	};
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @param {boolean} withCrs Whether to include the CRS attribute.
* @return {Object} Bounding box object.
*/
function readBoundingBox(node, objectStack, withCrs = true) {
	const result = {
		extent: [
			readDecimalString(node.getAttribute("minx")),
			readDecimalString(node.getAttribute("miny")),
			readDecimalString(node.getAttribute("maxx")),
			readDecimalString(node.getAttribute("maxy"))
		],
		res: [readDecimalString(node.getAttribute("resx")), readDecimalString(node.getAttribute("resy"))]
	};
	if (!withCrs) return result;
	/** @type {RootObject} */
	if (isV13(objectStack)) result.crs = node.getAttribute("CRS");
	else result.srs = node.getAttribute("SRS");
	return result;
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {import("../extent.js").Extent|undefined} Bounding box object.
*/
function readEXGeographicBoundingBox(node, objectStack) {
	const geographicBoundingBox = pushParseAndPop({}, EX_GEOGRAPHIC_BOUNDING_BOX_PARSERS, node, objectStack);
	if (!geographicBoundingBox) return;
	const westBoundLongitude = geographicBoundingBox["westBoundLongitude"];
	const southBoundLatitude = geographicBoundingBox["southBoundLatitude"];
	const eastBoundLongitude = geographicBoundingBox["eastBoundLongitude"];
	const northBoundLatitude = geographicBoundingBox["northBoundLatitude"];
	if (westBoundLongitude === void 0 || southBoundLatitude === void 0 || eastBoundLongitude === void 0 || northBoundLatitude === void 0) return;
	return [
		westBoundLongitude,
		southBoundLatitude,
		eastBoundLongitude,
		northBoundLatitude
	];
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Capability object.
*/
function readCapability(node, objectStack) {
	return pushParseAndPop({}, CAPABILITY_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Service object.
*/
function readService(node, objectStack) {
	return pushParseAndPop({}, isV13(objectStack) ? SERVICE_PARSERS_V13 : SERVICE_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Contact information object.
*/
function readContactInformation(node, objectStack) {
	return pushParseAndPop({}, CONTACT_INFORMATION_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Contact person object.
*/
function readContactPersonPrimary(node, objectStack) {
	return pushParseAndPop({}, CONTACT_PERSON_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Contact address object.
*/
function readContactAddress(node, objectStack) {
	return pushParseAndPop({}, CONTACT_ADDRESS_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Array<string>|undefined} Format array.
*/
function readException(node, objectStack) {
	return pushParseAndPop([], EXCEPTION_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Layer object.
*/
function readCapabilityLayer(node, objectStack) {
	const layerObject = pushParseAndPop({}, isV13(objectStack) ? LAYER_PARSERS_V13 : LAYER_PARSERS, node, objectStack);
	if (layerObject["Layer"] === void 0) return Object.assign(layerObject, readLayer(node, objectStack));
	return layerObject;
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Layer object.
*/
function readLayer(node, objectStack) {
	const v13 = isV13(objectStack);
	const parentLayerObject = objectStack[objectStack.length - 1];
	const layerObject = pushParseAndPop({}, v13 ? LAYER_PARSERS_V13 : LAYER_PARSERS, node, objectStack);
	if (!layerObject) return;
	let queryable = readBooleanString(node.getAttribute("queryable"));
	if (queryable === void 0) queryable = parentLayerObject["queryable"];
	layerObject["queryable"] = queryable !== void 0 ? queryable : false;
	let cascaded = readNonNegativeIntegerString(node.getAttribute("cascaded"));
	if (cascaded === void 0) cascaded = parentLayerObject["cascaded"];
	layerObject["cascaded"] = cascaded;
	let opaque = readBooleanString(node.getAttribute("opaque"));
	if (opaque === void 0) opaque = parentLayerObject["opaque"];
	layerObject["opaque"] = opaque !== void 0 ? opaque : false;
	let noSubsets = readBooleanString(node.getAttribute("noSubsets"));
	if (noSubsets === void 0) noSubsets = parentLayerObject["noSubsets"];
	layerObject["noSubsets"] = noSubsets !== void 0 ? noSubsets : false;
	let fixedWidth = readDecimalString(node.getAttribute("fixedWidth"));
	if (!fixedWidth) fixedWidth = parentLayerObject["fixedWidth"];
	layerObject["fixedWidth"] = fixedWidth;
	let fixedHeight = readDecimalString(node.getAttribute("fixedHeight"));
	if (!fixedHeight) fixedHeight = parentLayerObject["fixedHeight"];
	layerObject["fixedHeight"] = fixedHeight;
	const addKeys = ["Style", "AuthorityURL"];
	if (v13) addKeys.push("CRS");
	else addKeys.push("SRS", "Dimension");
	addKeys.forEach(function(key) {
		if (key in parentLayerObject) layerObject[key] = (layerObject[key] || []).concat(parentLayerObject[key]);
	});
	const replaceKeys = ["BoundingBox", "Attribution"];
	if (v13) replaceKeys.push("Dimension", "EX_GeographicBoundingBox", "MinScaleDenominator", "MaxScaleDenominator");
	else replaceKeys.push("LatLonBoundingBox", "ScaleHint", "Extent");
	replaceKeys.forEach(function(key) {
		if (!(key in layerObject)) layerObject[key] = parentLayerObject[key];
	});
	return layerObject;
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object} Dimension object.
*/
function readDimension(node, objectStack) {
	const dimensionObject = {
		"name": node.getAttribute("name"),
		"units": node.getAttribute("units"),
		"unitSymbol": node.getAttribute("unitSymbol")
	};
	if (isV13(objectStack)) Object.assign(dimensionObject, {
		"default": node.getAttribute("default"),
		"multipleValues": readBooleanString(node.getAttribute("multipleValues")),
		"nearestValue": readBooleanString(node.getAttribute("nearestValue")),
		"current": readBooleanString(node.getAttribute("current")),
		"values": readString(node)
	});
	return dimensionObject;
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object} Extent object.
*/
function readExtent(node, objectStack) {
	return {
		"name": node.getAttribute("name"),
		"default": node.getAttribute("default"),
		"nearestValue": readBooleanString(node.getAttribute("nearestValue"))
	};
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object} ScaleHint object.
*/
function readScaleHint(node, objectStack) {
	return {
		"min": readDecimalString(node.getAttribute("min")),
		"max": readDecimalString(node.getAttribute("max"))
	};
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Online resource object.
*/
function readFormatOnlineresource(node, objectStack) {
	return pushParseAndPop({}, FORMAT_ONLINERESOURCE_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Request object.
*/
function readRequest(node, objectStack) {
	return pushParseAndPop({}, REQUEST_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} DCP type object.
*/
function readDCPType(node, objectStack) {
	return pushParseAndPop({}, DCPTYPE_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} HTTP object.
*/
function readHTTP(node, objectStack) {
	return pushParseAndPop({}, HTTP_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Operation type object.
*/
function readOperationType(node, objectStack) {
	return pushParseAndPop({}, OPERATIONTYPE_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Online resource object.
*/
function readSizedFormatOnlineresource(node, objectStack) {
	const formatOnlineresource = readFormatOnlineresource(node, objectStack);
	if (formatOnlineresource) {
		formatOnlineresource["size"] = [readNonNegativeIntegerString(node.getAttribute("width")), readNonNegativeIntegerString(node.getAttribute("height"))];
		return formatOnlineresource;
	}
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Authority URL object.
*/
function readAuthorityURL(node, objectStack) {
	const authorityObject = readFormatOnlineresource(node, objectStack);
	if (authorityObject) {
		authorityObject["name"] = node.getAttribute("name");
		return authorityObject;
	}
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Metadata URL object.
*/
function readMetadataURL(node, objectStack) {
	const metadataObject = readFormatOnlineresource(node, objectStack);
	if (metadataObject) {
		metadataObject["type"] = node.getAttribute("type");
		return metadataObject;
	}
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Object|undefined} Style object.
*/
function readStyle(node, objectStack) {
	return pushParseAndPop({}, STYLE_PARSERS, node, objectStack);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Array<string>|undefined} Keyword list.
*/
function readKeywordList(node, objectStack) {
	return pushParseAndPop([], KEYWORDLIST_PARSERS, node, objectStack);
}
//#endregion
//#region node_modules/ol/format/TopoJSON.js
/**
* @module ol/format/TopoJSON
*/
/**
* @typedef {import("topojson-specification").Topology} TopoJSONTopology
* @typedef {import("topojson-specification").GeometryCollection} TopoJSONGeometryCollection
* @typedef {import("topojson-specification").GeometryObject} TopoJSONGeometry
* @typedef {import("topojson-specification").Point} TopoJSONPoint
* @typedef {import("topojson-specification").MultiPoint} TopoJSONMultiPoint
* @typedef {import("topojson-specification").LineString} TopoJSONLineString
* @typedef {import("topojson-specification").MultiLineString} TopoJSONMultiLineString
* @typedef {import("topojson-specification").Polygon} TopoJSONPolygon
* @typedef {import("topojson-specification").MultiPolygon} TopoJSONMultiPolygon
*/
/**
* @typedef {Object} Options
* @property {import("../proj.js").ProjectionLike} [dataProjection='EPSG:4326'] Default data projection.
* @property {string} [layerName] Set the name of the TopoJSON topology
* `objects`'s children as feature property with the specified name. This means
* that when set to `'layer'`, a topology like
* ```
* {
*   "type": "Topology",
*   "objects": {
*     "example": {
*       "type": "GeometryCollection",
*       "geometries": []
*     }
*   }
* }
* ```
* will result in features that have a property `'layer'` set to `'example'`.
* When not set, no property will be added to features.
* @property {Array<string>} [layers] Names of the TopoJSON topology's
* `objects`'s children to read features from.  If not provided, features will
* be read from all children.
*/
/**
* @classdesc
* Feature format for reading data in the TopoJSON format.
*
* @api
*/
var TopoJSON = class extends JSONFeature {
	/**
	* @param {Options} [options] Options.
	*/
	constructor(options) {
		super();
		options = options ? options : {};
		/**
		* @private
		* @type {string|undefined}
		*/
		this.layerName_ = options.layerName;
		/**
		* @private
		* @type {?Array<string>}
		*/
		this.layers_ = options.layers ? options.layers : null;
		/**
		* @type {import("../proj/Projection.js").default}
		*/
		this.dataProjection = get$1(options.dataProjection ? options.dataProjection : "EPSG:4326");
	}
	/**
	* @param {Object} object Object.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {Array<Feature>} Features.
	* @override
	*/
	readFeaturesFromObject(object, options) {
		if (object.type == "Topology") {
			const topoJSONTopology = object;
			let transform, scale = null, translate = null;
			if (topoJSONTopology["transform"]) {
				transform = topoJSONTopology["transform"];
				scale = transform["scale"];
				translate = transform["translate"];
			}
			const arcs = topoJSONTopology["arcs"];
			if (transform) transformArcs(arcs, scale, translate);
			/** @type {Array<Feature>} */
			const features = [];
			const topoJSONFeatures = topoJSONTopology["objects"];
			const property = this.layerName_;
			let feature;
			for (const objectName in topoJSONFeatures) {
				if (this.layers_ && !this.layers_.includes(objectName)) continue;
				if (topoJSONFeatures[objectName].type === "GeometryCollection") {
					feature = topoJSONFeatures[objectName];
					features.push.apply(features, readFeaturesFromGeometryCollection(feature, arcs, scale, translate, property, objectName, options));
				} else {
					feature = topoJSONFeatures[objectName];
					features.push(readFeatureFromGeometry(feature, arcs, scale, translate, property, objectName, options));
				}
			}
			return features;
		}
		return [];
	}
	/**
	* @param {Object} object Object.
	* @protected
	* @return {import("../proj/Projection.js").default} Projection.
	* @override
	*/
	readProjectionFromObject(object) {
		return this.dataProjection;
	}
};
/**
* @const
* @type {Object<string, function(TopoJSONGeometry, Array, ...Array=): import("../geom/Geometry.js").default>}
*/
var GEOMETRY_READERS = {
	"Point": readPointGeometry,
	"LineString": readLineStringGeometry,
	"Polygon": readPolygonGeometry,
	"MultiPoint": readMultiPointGeometry,
	"MultiLineString": readMultiLineStringGeometry,
	"MultiPolygon": readMultiPolygonGeometry
};
/**
* Concatenate arcs into a coordinate array.
* @param {Array<number>} indices Indices of arcs to concatenate.  Negative
*     values indicate arcs need to be reversed.
* @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs (already
*     transformed).
* @return {Array<import("../coordinate.js").Coordinate>} Coordinates array.
*/
function concatenateArcs(indices, arcs) {
	/** @type {Array<import("../coordinate.js").Coordinate>} */
	const coordinates = [];
	let index;
	for (let i = 0, ii = indices.length; i < ii; ++i) {
		index = indices[i];
		if (i > 0) coordinates.pop();
		if (index >= 0) {
			const arc = arcs[index];
			for (let j = 0, jj = arc.length; j < jj; ++j) coordinates.push(arc[j].slice(0));
		} else {
			const arc = arcs[~index];
			for (let j = arc.length - 1; j >= 0; --j) coordinates.push(arc[j].slice(0));
		}
	}
	return coordinates;
}
/**
* Create a point from a TopoJSON geometry object.
*
* @param {TopoJSONPoint} object TopoJSON object.
* @param {Array<number>} scale Scale for each dimension.
* @param {Array<number>} translate Translation for each dimension.
* @return {Point} Geometry.
*/
function readPointGeometry(object, scale, translate) {
	const coordinates = object["coordinates"];
	if (scale && translate) transformVertex(coordinates, scale, translate);
	return new Point(coordinates);
}
/**
* Create a multi-point from a TopoJSON geometry object.
*
* @param {TopoJSONMultiPoint} object TopoJSON object.
* @param {Array<number>} scale Scale for each dimension.
* @param {Array<number>} translate Translation for each dimension.
* @return {MultiPoint} Geometry.
*/
function readMultiPointGeometry(object, scale, translate) {
	const coordinates = object["coordinates"];
	if (scale && translate) for (let i = 0, ii = coordinates.length; i < ii; ++i) transformVertex(coordinates[i], scale, translate);
	return new MultiPoint(coordinates);
}
/**
* Create a linestring from a TopoJSON geometry object.
*
* @param {TopoJSONLineString} object TopoJSON object.
* @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
* @return {LineString} Geometry.
*/
function readLineStringGeometry(object, arcs) {
	return new LineString(concatenateArcs(object["arcs"], arcs));
}
/**
* Create a multi-linestring from a TopoJSON geometry object.
*
* @param {TopoJSONMultiLineString} object TopoJSON object.
* @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
* @return {MultiLineString} Geometry.
*/
function readMultiLineStringGeometry(object, arcs) {
	const coordinates = [];
	for (let i = 0, ii = object["arcs"].length; i < ii; ++i) coordinates[i] = concatenateArcs(object["arcs"][i], arcs);
	return new MultiLineString(coordinates);
}
/**
* Create a polygon from a TopoJSON geometry object.
*
* @param {TopoJSONPolygon} object TopoJSON object.
* @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
* @return {Polygon} Geometry.
*/
function readPolygonGeometry(object, arcs) {
	const coordinates = [];
	for (let i = 0, ii = object["arcs"].length; i < ii; ++i) coordinates[i] = concatenateArcs(object["arcs"][i], arcs);
	return new Polygon(coordinates);
}
/**
* Create a multi-polygon from a TopoJSON geometry object.
*
* @param {TopoJSONMultiPolygon} object TopoJSON object.
* @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
* @return {MultiPolygon} Geometry.
*/
function readMultiPolygonGeometry(object, arcs) {
	const coordinates = [];
	for (let i = 0, ii = object["arcs"].length; i < ii; ++i) {
		const polyArray = object["arcs"][i];
		const ringCoords = [];
		for (let j = 0, jj = polyArray.length; j < jj; ++j) ringCoords[j] = concatenateArcs(polyArray[j], arcs);
		coordinates[i] = ringCoords;
	}
	return new MultiPolygon(coordinates);
}
/**
* Create features from a TopoJSON GeometryCollection object.
*
* @param {TopoJSONGeometryCollection} collection TopoJSON Geometry
*     object.
* @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
* @param {Array<number>} scale Scale for each dimension.
* @param {Array<number>} translate Translation for each dimension.
* @param {string|undefined} property Property to set the `GeometryCollection`'s parent
*     object to.
* @param {string} name Name of the `Topology`'s child object.
* @param {import("./Feature.js").ReadOptions} [options] Read options.
* @return {Array<Feature>} Array of features.
*/
function readFeaturesFromGeometryCollection(collection, arcs, scale, translate, property, name, options) {
	const geometries = collection["geometries"];
	const features = [];
	for (let i = 0, ii = geometries.length; i < ii; ++i) features[i] = readFeatureFromGeometry(geometries[i], arcs, scale, translate, property, name, options);
	return features;
}
/**
* Create a feature from a TopoJSON geometry object.
*
* @param {TopoJSONGeometry} object TopoJSON geometry object.
* @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
* @param {Array<number>} scale Scale for each dimension.
* @param {Array<number>} translate Translation for each dimension.
* @param {string|undefined} property Property to set the `GeometryCollection`'s parent
*     object to.
* @param {string} name Name of the `Topology`'s child object.
* @param {import("./Feature.js").ReadOptions} [options] Read options.
* @return {Feature} Feature.
*/
function readFeatureFromGeometry(object, arcs, scale, translate, property, name, options) {
	let geometry = null;
	const type = object.type;
	if (type) {
		const geometryReader = GEOMETRY_READERS[type];
		if (type === "Point" || type === "MultiPoint") geometry = geometryReader(object, scale, translate);
		else geometry = geometryReader(object, arcs);
		geometry = transformGeometryWithOptions(geometry, false, options);
	}
	const feature = new Feature({ geometry });
	if (object.id !== void 0) feature.setId(object.id);
	let properties = object.properties;
	if (property) {
		if (!properties) properties = {};
		properties[property] = name;
	}
	if (properties) feature.setProperties(properties, true);
	return feature;
}
/**
* Apply a linear transform to array of arcs.  The provided array of arcs is
* modified in place.
*
* @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
* @param {Array<number>} scale Scale for each dimension.
* @param {Array<number>} translate Translation for each dimension.
*/
function transformArcs(arcs, scale, translate) {
	for (let i = 0, ii = arcs.length; i < ii; ++i) transformArc(arcs[i], scale, translate);
}
/**
* Apply a linear transform to an arc.  The provided arc is modified in place.
*
* @param {Array<import("../coordinate.js").Coordinate>} arc Arc.
* @param {Array<number>} scale Scale for each dimension.
* @param {Array<number>} translate Translation for each dimension.
*/
function transformArc(arc, scale, translate) {
	let x = 0;
	let y = 0;
	for (let i = 0, ii = arc.length; i < ii; ++i) {
		const vertex = arc[i];
		x += vertex[0];
		y += vertex[1];
		vertex[0] = x;
		vertex[1] = y;
		transformVertex(vertex, scale, translate);
	}
}
/**
* Apply a linear transform to a vertex.  The provided vertex is modified in
* place.
*
* @param {import("../coordinate.js").Coordinate} vertex Vertex.
* @param {Array<number>} scale Scale for each dimension.
* @param {Array<number>} translate Translation for each dimension.
*/
function transformVertex(vertex, scale, translate) {
	vertex[0] = vertex[0] * scale[0] + translate[0];
	vertex[1] = vertex[1] * scale[1] + translate[1];
}
//#endregion
//#region node_modules/ol/format/GPX.js
/**
* @module ol/format/GPX
*/
/**
* @const
* @type {Array<null|string>}
*/
var NAMESPACE_URIS = [
	null,
	"http://www.topografix.com/GPX/1/0",
	"http://www.topografix.com/GPX/1/1"
];
/**
* @const
* @type {string}
*/
var SCHEMA_LOCATION = "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd";
/**
* @const
* @type {Object<string, function(Node, Array<*>): (Feature|undefined)>}
*/
var FEATURE_READER = {
	"rte": readRte,
	"trk": readTrk,
	"wpt": readWpt
};
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var GPX_PARSERS = makeStructureNS(NAMESPACE_URIS, {
	"rte": makeArrayPusher(readRte),
	"trk": makeArrayPusher(readTrk),
	"wpt": makeArrayPusher(readWpt)
});
/**
* @typedef {Object} GPXLink
* @property {string} [text] text
* @property {string} [type] type
*/
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var LINK_PARSERS = makeStructureNS(NAMESPACE_URIS, {
	"text": makeObjectPropertySetter(readString, "linkText"),
	"type": makeObjectPropertySetter(readString, "linkType")
});
/**
* @typedef {Object} GPXAuthor
* @property {string} [name] name
* @property {string} [email] email
* @property {GPXLink} [link] link
*/
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var AUTHOR_PARSERS = makeStructureNS(NAMESPACE_URIS, {
	"name": makeObjectPropertySetter(readString),
	"email": parseEmail,
	"link": parseLink
});
/**
* @typedef {Object} GPXMetadata
* @property {string} [name] name
* @property {string} [desc] desc
* @property {GPXAuthor} [author] author
* @property {GPXLink} [link] link
* @property {number} [time] time
* @property {string} [keywords] keywords
* @property {Array<number>} [bounds] bounds
* @property {Object} [extensions] extensions
*
*/
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var METADATA_PARSERS = makeStructureNS(NAMESPACE_URIS, {
	"name": makeObjectPropertySetter(readString),
	"desc": makeObjectPropertySetter(readString),
	"author": makeObjectPropertySetter(readAuthor),
	"copyright": makeObjectPropertySetter(readCopyright),
	"link": parseLink,
	"time": makeObjectPropertySetter(readDateTime),
	"keywords": makeObjectPropertySetter(readString),
	"bounds": parseBounds,
	"extensions": parseExtensions
});
/**
* @typedef {Object} GPXCopyright
* @property {string} [author] author
* @property {number} [year] year
* @property {string} [license] license
*/
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var COPYRIGHT_PARSERS = makeStructureNS(NAMESPACE_URIS, {
	"year": makeObjectPropertySetter(readPositiveInteger),
	"license": makeObjectPropertySetter(readString)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var GPX_SERIALIZERS = makeStructureNS(NAMESPACE_URIS, {
	"rte": makeChildAppender(writeRte),
	"trk": makeChildAppender(writeTrk),
	"wpt": makeChildAppender(writeWpt)
});
/**
* @typedef {Object} Options
* @property {function(Feature, Node):void} [readExtensions] Callback function
* to process `extensions` nodes. To prevent memory leaks, this callback function must
* not store any references to the node. Note that the `extensions`
* node is not allowed in GPX 1.0. Moreover, only `extensions`
* nodes from `wpt`, `rte` and `trk` can be processed, as those are
* directly mapped to a feature.
*/
/**
* @typedef {Object} LayoutOptions
* @property {boolean} [hasZ] HasZ.
* @property {boolean} [hasM] HasM.
*/
/**
* @typedef {function(Feature, Node): void} ReadExtensions
*/
/**
* @classdesc
* Feature format for reading and writing data in the GPX format.
*
* Note that {@link module:ol/format/GPX~GPX#readFeature} only reads the first
* feature of the source.
*
* When reading, routes (`<rte>`) are converted into LineString geometries, and
* tracks (`<trk>`) into MultiLineString. Any properties on route and track
* waypoints are ignored.
*
* When writing, LineString geometries are output as routes (`<rte>`), and
* MultiLineString as tracks (`<trk>`).
*
* @api
*/
var GPX = class extends XMLFeature {
	/**
	* @param {Options} [options] Options.
	*/
	constructor(options) {
		super();
		options = options ? options : {};
		/**
		* @type {import("../proj/Projection.js").default}
		*/
		this.dataProjection = get$1("EPSG:4326");
		/**
		* @type {ReadExtensions|undefined}
		* @private
		*/
		this.readExtensions_ = options.readExtensions;
	}
	/**
	* @param {Array<Feature>} features List of features.
	* @private
	*/
	handleReadExtensions_(features) {
		if (!features) features = [];
		for (let i = 0, ii = features.length; i < ii; ++i) {
			const feature = features[i];
			if (this.readExtensions_) {
				const extensionsNode = feature.get("extensionsNode_") || null;
				this.readExtensions_(feature, extensionsNode);
			}
			feature.set("extensionsNode_", void 0);
		}
	}
	/**
	* Reads a GPX file's metadata tag, reading among other things:
	*   - the name and description of this GPX
	*   - its author
	*   - the copyright associated with this GPX file
	*
	* Will return null if no metadata tag is present (or no valid source is given).
	*
	* @param {Document|Element|Object|string} source Source.
	* @return {GPXMetadata | null} Metadata
	* @api
	*/
	readMetadata(source) {
		if (!source) return null;
		if (typeof source === "string") return this.readMetadataFromDocument(parse(source));
		if (isDocument(source)) return this.readMetadataFromDocument(source);
		return this.readMetadataFromNode(source);
	}
	/**
	* @param {Document} doc Document.
	* @return {GPXMetadata | null} Metadata
	*/
	readMetadataFromDocument(doc) {
		for (let n = doc.firstChild; n; n = n.nextSibling) if (n.nodeType === Node.ELEMENT_NODE) {
			const metadata = this.readMetadataFromNode(n);
			if (metadata) return metadata;
		}
		return null;
	}
	/**
	* @param {Element} node Node.
	* @return {Object} Metadata
	*/
	readMetadataFromNode(node) {
		if (!NAMESPACE_URIS.includes(node.namespaceURI)) return null;
		for (let n = node.firstElementChild; n; n = n.nextElementSibling) if (NAMESPACE_URIS.includes(n.namespaceURI) && n.localName === "metadata") return pushParseAndPop({}, METADATA_PARSERS, n, []);
		return null;
	}
	/**
	* @param {Element} node Node.
	* @param {import("./Feature.js").ReadOptions} [options] Options.
	* @return {import("../Feature.js").default} Feature.
	* @override
	*/
	readFeatureFromNode(node, options) {
		if (!NAMESPACE_URIS.includes(node.namespaceURI)) return null;
		const featureReader = FEATURE_READER[node.localName];
		if (!featureReader) return null;
		const feature = featureReader(node, [this.getReadOptions(node, options)]);
		if (!feature) return null;
		this.handleReadExtensions_([feature]);
		return feature;
	}
	/**
	* @param {Element} node Node.
	* @param {import("./Feature.js").ReadOptions} [options] Options.
	* @return {Array<import("../Feature.js").default>} Features.
	* @override
	*/
	readFeaturesFromNode(node, options) {
		if (!NAMESPACE_URIS.includes(node.namespaceURI)) return [];
		if (node.localName == "gpx") {
			/** @type {Array<Feature>} */
			const features = pushParseAndPop([], GPX_PARSERS, node, [this.getReadOptions(node, options)]);
			if (features) {
				this.handleReadExtensions_(features);
				return features;
			}
			return [];
		}
		return [];
	}
	/**
	* Encode an array of features in the GPX format as an XML node.
	* LineString geometries are output as routes (`<rte>`), and MultiLineString
	* as tracks (`<trk>`).
	*
	* @param {Array<Feature>} features Features.
	* @param {import("./Feature.js").WriteOptions} [options] Options.
	* @return {Node} Node.
	* @api
	* @override
	*/
	writeFeaturesNode(features, options) {
		options = this.adaptOptions(options);
		const gpx = createElementNS("http://www.topografix.com/GPX/1/1", "gpx");
		gpx.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xsi", XML_SCHEMA_INSTANCE_URI);
		gpx.setAttributeNS(XML_SCHEMA_INSTANCE_URI, "xsi:schemaLocation", SCHEMA_LOCATION);
		gpx.setAttribute("version", "1.1");
		gpx.setAttribute("creator", "OpenLayers");
		pushSerializeAndPop({ node: gpx }, GPX_SERIALIZERS, GPX_NODE_FACTORY, features, [options]);
		return gpx;
	}
};
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var RTE_PARSERS = makeStructureNS(NAMESPACE_URIS, {
	"name": makeObjectPropertySetter(readString),
	"cmt": makeObjectPropertySetter(readString),
	"desc": makeObjectPropertySetter(readString),
	"src": makeObjectPropertySetter(readString),
	"link": parseLink,
	"number": makeObjectPropertySetter(readPositiveInteger),
	"extensions": parseExtensions,
	"type": makeObjectPropertySetter(readString),
	"rtept": parseRtePt
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var RTEPT_PARSERS = makeStructureNS(NAMESPACE_URIS, {
	"ele": makeObjectPropertySetter(readDecimal),
	"time": makeObjectPropertySetter(readDateTime)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var TRK_PARSERS = makeStructureNS(NAMESPACE_URIS, {
	"name": makeObjectPropertySetter(readString),
	"cmt": makeObjectPropertySetter(readString),
	"desc": makeObjectPropertySetter(readString),
	"src": makeObjectPropertySetter(readString),
	"link": parseLink,
	"number": makeObjectPropertySetter(readPositiveInteger),
	"type": makeObjectPropertySetter(readString),
	"extensions": parseExtensions,
	"trkseg": parseTrkSeg
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var TRKSEG_PARSERS = makeStructureNS(NAMESPACE_URIS, { "trkpt": parseTrkPt });
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var TRKPT_PARSERS = makeStructureNS(NAMESPACE_URIS, {
	"ele": makeObjectPropertySetter(readDecimal),
	"time": makeObjectPropertySetter(readDateTime)
});
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Parser>>}
*/
var WPT_PARSERS = makeStructureNS(NAMESPACE_URIS, {
	"ele": makeObjectPropertySetter(readDecimal),
	"time": makeObjectPropertySetter(readDateTime),
	"magvar": makeObjectPropertySetter(readDecimal),
	"geoidheight": makeObjectPropertySetter(readDecimal),
	"name": makeObjectPropertySetter(readString),
	"cmt": makeObjectPropertySetter(readString),
	"desc": makeObjectPropertySetter(readString),
	"src": makeObjectPropertySetter(readString),
	"link": parseLink,
	"sym": makeObjectPropertySetter(readString),
	"type": makeObjectPropertySetter(readString),
	"fix": makeObjectPropertySetter(readString),
	"sat": makeObjectPropertySetter(readPositiveInteger),
	"hdop": makeObjectPropertySetter(readDecimal),
	"vdop": makeObjectPropertySetter(readDecimal),
	"pdop": makeObjectPropertySetter(readDecimal),
	"ageofdgpsdata": makeObjectPropertySetter(readDecimal),
	"dgpsid": makeObjectPropertySetter(readPositiveInteger),
	"extensions": parseExtensions
});
/**
* @const
* @type {Array<string>}
*/
var LINK_SEQUENCE = ["text", "type"];
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var LINK_SERIALIZERS = makeStructureNS(NAMESPACE_URIS, {
	"text": makeChildAppender(writeStringTextNode),
	"type": makeChildAppender(writeStringTextNode)
});
/**
* @const
* @type {Object<string, Array<string>>}
*/
var RTE_SEQUENCE = makeStructureNS(NAMESPACE_URIS, [
	"name",
	"cmt",
	"desc",
	"src",
	"link",
	"number",
	"type",
	"rtept"
]);
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var RTE_SERIALIZERS = makeStructureNS(NAMESPACE_URIS, {
	"name": makeChildAppender(writeStringTextNode),
	"cmt": makeChildAppender(writeStringTextNode),
	"desc": makeChildAppender(writeStringTextNode),
	"src": makeChildAppender(writeStringTextNode),
	"link": makeChildAppender(writeLink),
	"number": makeChildAppender(writeNonNegativeIntegerTextNode),
	"type": makeChildAppender(writeStringTextNode),
	"rtept": makeArraySerializer(makeChildAppender(writeWptType))
});
/**
* @const
* @type {Object<string, Array<string>>}
*/
var RTEPT_TYPE_SEQUENCE = makeStructureNS(NAMESPACE_URIS, ["ele", "time"]);
/**
* @const
* @type {Object<string, Array<string>>}
*/
var TRK_SEQUENCE = makeStructureNS(NAMESPACE_URIS, [
	"name",
	"cmt",
	"desc",
	"src",
	"link",
	"number",
	"type",
	"trkseg"
]);
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var TRK_SERIALIZERS = makeStructureNS(NAMESPACE_URIS, {
	"name": makeChildAppender(writeStringTextNode),
	"cmt": makeChildAppender(writeStringTextNode),
	"desc": makeChildAppender(writeStringTextNode),
	"src": makeChildAppender(writeStringTextNode),
	"link": makeChildAppender(writeLink),
	"number": makeChildAppender(writeNonNegativeIntegerTextNode),
	"type": makeChildAppender(writeStringTextNode),
	"trkseg": makeArraySerializer(makeChildAppender(writeTrkSeg))
});
/**
* @const
* @type {function(*, Array<*>, string=): (Node|undefined)}
*/
var TRKSEG_NODE_FACTORY = makeSimpleNodeFactory("trkpt");
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var TRKSEG_SERIALIZERS = makeStructureNS(NAMESPACE_URIS, { "trkpt": makeChildAppender(writeWptType) });
/**
* @const
* @type {Object<string, Array<string>>}
*/
var WPT_TYPE_SEQUENCE = makeStructureNS(NAMESPACE_URIS, [
	"ele",
	"time",
	"magvar",
	"geoidheight",
	"name",
	"cmt",
	"desc",
	"src",
	"link",
	"sym",
	"type",
	"fix",
	"sat",
	"hdop",
	"vdop",
	"pdop",
	"ageofdgpsdata",
	"dgpsid"
]);
/**
* @const
* @type {Object<string, Object<string, import("../xml.js").Serializer>>}
*/
var WPT_TYPE_SERIALIZERS = makeStructureNS(NAMESPACE_URIS, {
	"ele": makeChildAppender(writeDecimalTextNode),
	"time": makeChildAppender(writeDateTimeTextNode),
	"magvar": makeChildAppender(writeDecimalTextNode),
	"geoidheight": makeChildAppender(writeDecimalTextNode),
	"name": makeChildAppender(writeStringTextNode),
	"cmt": makeChildAppender(writeStringTextNode),
	"desc": makeChildAppender(writeStringTextNode),
	"src": makeChildAppender(writeStringTextNode),
	"link": makeChildAppender(writeLink),
	"sym": makeChildAppender(writeStringTextNode),
	"type": makeChildAppender(writeStringTextNode),
	"fix": makeChildAppender(writeStringTextNode),
	"sat": makeChildAppender(writeNonNegativeIntegerTextNode),
	"hdop": makeChildAppender(writeDecimalTextNode),
	"vdop": makeChildAppender(writeDecimalTextNode),
	"pdop": makeChildAppender(writeDecimalTextNode),
	"ageofdgpsdata": makeChildAppender(writeDecimalTextNode),
	"dgpsid": makeChildAppender(writeNonNegativeIntegerTextNode)
});
/**
* @const
* @type {Object<string, string>}
*/
var GEOMETRY_TYPE_TO_NODENAME = {
	"Point": "wpt",
	"LineString": "rte",
	"MultiLineString": "trk"
};
/**
* @param {*} value Value.
* @param {Array<*>} objectStack Object stack.
* @param {string} [nodeName] Node name.
* @return {Node|undefined} Node.
*/
function GPX_NODE_FACTORY(value, objectStack, nodeName) {
	const geometry = value.getGeometry();
	if (geometry) {
		const nodeName = GEOMETRY_TYPE_TO_NODENAME[geometry.getType()];
		if (nodeName) {
			const parentNode = objectStack[objectStack.length - 1].node;
			return createElementNS(parentNode.namespaceURI, nodeName);
		}
	}
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {LayoutOptions} layoutOptions Layout options.
* @param {Element} node Node.
* @param {!Object} values Values.
* @return {Array<number>} Flat coordinates.
*/
function appendCoordinate(flatCoordinates, layoutOptions, node, values) {
	flatCoordinates.push(parseFloat(node.getAttribute("lon")), parseFloat(node.getAttribute("lat")));
	if ("ele" in values) {
		flatCoordinates.push(values["ele"]);
		delete values["ele"];
		layoutOptions.hasZ = true;
	} else flatCoordinates.push(0);
	if ("time" in values) {
		flatCoordinates.push(values["time"]);
		delete values["time"];
		layoutOptions.hasM = true;
	} else flatCoordinates.push(0);
	return flatCoordinates;
}
/**
* Choose GeometryLayout based on flags in layoutOptions and adjust flatCoordinates
* and ends arrays by shrinking them accordingly (removing unused zero entries).
*
* @param {LayoutOptions} layoutOptions Layout options.
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {Array<number>} [ends] Ends.
* @return {import("../geom/Geometry.js").GeometryLayout} Layout.
*/
function applyLayoutOptions(layoutOptions, flatCoordinates, ends) {
	/** @type {import("../geom/Geometry.js").GeometryLayout} */
	let layout = "XY";
	let stride = 2;
	if (layoutOptions.hasZ && layoutOptions.hasM) {
		layout = "XYZM";
		stride = 4;
	} else if (layoutOptions.hasZ) {
		layout = "XYZ";
		stride = 3;
	} else if (layoutOptions.hasM) {
		layout = "XYM";
		stride = 3;
	}
	if (stride !== 4) {
		for (let i = 0, ii = flatCoordinates.length / 4; i < ii; i++) {
			flatCoordinates[i * stride] = flatCoordinates[i * 4];
			flatCoordinates[i * stride + 1] = flatCoordinates[i * 4 + 1];
			if (layoutOptions.hasZ) flatCoordinates[i * stride + 2] = flatCoordinates[i * 4 + 2];
			if (layoutOptions.hasM) flatCoordinates[i * stride + 2] = flatCoordinates[i * 4 + 3];
		}
		flatCoordinates.length = flatCoordinates.length / 4 * stride;
		if (ends) for (let i = 0, ii = ends.length; i < ii; i++) ends[i] = ends[i] / 4 * stride;
	}
	return layout;
}
/**
* @param {Element} node Node.
* @param {Array<any>} objectStack Object stack.
* @return {GPXAuthor | undefined} Person object.
*/
function readAuthor(node, objectStack) {
	const values = pushParseAndPop({}, AUTHOR_PARSERS, node, objectStack);
	if (values) return values;
}
/**
* @param {Element} node Node.
* @param {Array<any>} objectStack Object stack.
* @return {GPXCopyright | undefined} Person object.
*/
function readCopyright(node, objectStack) {
	const values = pushParseAndPop({}, COPYRIGHT_PARSERS, node, objectStack);
	if (values) {
		const author = node.getAttribute("author");
		if (author !== null) values["author"] = author;
		return values;
	}
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function parseBounds(node, objectStack) {
	const values = objectStack[objectStack.length - 1];
	const minlat = node.getAttribute("minlat");
	const minlon = node.getAttribute("minlon");
	const maxlat = node.getAttribute("maxlat");
	const maxlon = node.getAttribute("maxlon");
	if (minlon !== null && minlat !== null && maxlon !== null && maxlat !== null) values["bounds"] = [[parseFloat(minlon), parseFloat(minlat)], [parseFloat(maxlon), parseFloat(maxlat)]];
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function parseEmail(node, objectStack) {
	const values = objectStack[objectStack.length - 1];
	const id = node.getAttribute("id");
	const domain = node.getAttribute("domain");
	if (id !== null && domain !== null) values["email"] = `${id}@${domain}`;
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function parseLink(node, objectStack) {
	const values = objectStack[objectStack.length - 1];
	const href = node.getAttribute("href");
	if (href !== null) values["link"] = href;
	parseNode(LINK_PARSERS, node, objectStack);
}
/**
* @param {Node} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function parseExtensions(node, objectStack) {
	const values = objectStack[objectStack.length - 1];
	values["extensionsNode_"] = node;
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function parseRtePt(node, objectStack) {
	const values = pushParseAndPop({}, RTEPT_PARSERS, node, objectStack);
	if (values) {
		const rteValues = objectStack[objectStack.length - 1];
		const flatCoordinates = rteValues["flatCoordinates"];
		const layoutOptions = rteValues["layoutOptions"];
		appendCoordinate(flatCoordinates, layoutOptions, node, values);
	}
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function parseTrkPt(node, objectStack) {
	const values = pushParseAndPop({}, TRKPT_PARSERS, node, objectStack);
	if (values) {
		const trkValues = objectStack[objectStack.length - 1];
		const flatCoordinates = trkValues["flatCoordinates"];
		const layoutOptions = trkValues["layoutOptions"];
		appendCoordinate(flatCoordinates, layoutOptions, node, values);
	}
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
*/
function parseTrkSeg(node, objectStack) {
	const values = objectStack[objectStack.length - 1];
	parseNode(TRKSEG_PARSERS, node, objectStack);
	const flatCoordinates = values["flatCoordinates"];
	values["ends"].push(flatCoordinates.length);
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Feature|undefined} Track.
*/
function readRte(node, objectStack) {
	const options = objectStack[0];
	const values = pushParseAndPop({
		"flatCoordinates": [],
		"layoutOptions": {}
	}, RTE_PARSERS, node, objectStack);
	if (!values) return;
	const flatCoordinates = values["flatCoordinates"];
	delete values["flatCoordinates"];
	const layoutOptions = values["layoutOptions"];
	delete values["layoutOptions"];
	const geometry = new LineString(flatCoordinates, applyLayoutOptions(layoutOptions, flatCoordinates));
	transformGeometryWithOptions(geometry, false, options);
	const feature = new Feature(geometry);
	feature.setProperties(values, true);
	return feature;
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Feature|undefined} Track.
*/
function readTrk(node, objectStack) {
	const options = objectStack[0];
	const values = pushParseAndPop({
		"flatCoordinates": [],
		"ends": [],
		"layoutOptions": {}
	}, TRK_PARSERS, node, objectStack);
	if (!values) return;
	const flatCoordinates = values["flatCoordinates"];
	delete values["flatCoordinates"];
	const ends = values["ends"];
	delete values["ends"];
	const layoutOptions = values["layoutOptions"];
	delete values["layoutOptions"];
	const geometry = new MultiLineString(flatCoordinates, applyLayoutOptions(layoutOptions, flatCoordinates, ends), ends);
	transformGeometryWithOptions(geometry, false, options);
	const feature = new Feature(geometry);
	feature.setProperties(values, true);
	return feature;
}
/**
* @param {Element} node Node.
* @param {Array<*>} objectStack Object stack.
* @return {Feature|undefined} Waypoint.
*/
function readWpt(node, objectStack) {
	const options = objectStack[0];
	const values = pushParseAndPop({}, WPT_PARSERS, node, objectStack);
	if (!values) return;
	const layoutOptions = {};
	const coordinates = appendCoordinate([], layoutOptions, node, values);
	const geometry = new Point(coordinates, applyLayoutOptions(layoutOptions, coordinates));
	transformGeometryWithOptions(geometry, false, options);
	const feature = new Feature(geometry);
	feature.setProperties(values, true);
	return feature;
}
/**
* @param {Element} node Node.
* @param {string} value Value for the link's `href` attribute.
* @param {Array<*>} objectStack Node stack.
*/
function writeLink(node, value, objectStack) {
	node.setAttribute("href", value);
	const properties = objectStack[objectStack.length - 1]["properties"];
	const link = [properties["linkText"], properties["linkType"]];
	pushSerializeAndPop({ node }, LINK_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, link, objectStack, LINK_SEQUENCE);
}
/**
* @param {Element} node Node.
* @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
* @param {Array<*>} objectStack Object stack.
*/
function writeWptType(node, coordinate, objectStack) {
	const context = objectStack[objectStack.length - 1];
	const namespaceURI = context.node.namespaceURI;
	const properties = context["properties"];
	node.setAttributeNS(null, "lat", String(coordinate[1]));
	node.setAttributeNS(null, "lon", String(coordinate[0]));
	switch (context["geometryLayout"]) {
		case "XYZM": if (coordinate[3] !== 0) properties["time"] = coordinate[3];
		case "XYZ":
			if (coordinate[2] !== 0) properties["ele"] = coordinate[2];
			break;
		case "XYM":
			if (coordinate[2] !== 0) properties["time"] = coordinate[2];
			break;
		default:
	}
	const orderedKeys = node.nodeName == "rtept" ? RTEPT_TYPE_SEQUENCE[namespaceURI] : WPT_TYPE_SEQUENCE[namespaceURI];
	const values = makeSequence(properties, orderedKeys);
	pushSerializeAndPop({
		node,
		"properties": properties
	}, WPT_TYPE_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, values, objectStack, orderedKeys);
}
/**
* @param {Node} node Node.
* @param {Feature} feature Feature.
* @param {Array<*>} objectStack Object stack.
*/
function writeRte(node, feature, objectStack) {
	const options = objectStack[0];
	const properties = feature.getProperties();
	const context = { node };
	context["properties"] = properties;
	const geometry = feature.getGeometry();
	if (geometry.getType() == "LineString") {
		const lineString = transformGeometryWithOptions(geometry, true, options);
		context["geometryLayout"] = lineString.getLayout();
		properties["rtept"] = lineString.getCoordinates();
	}
	const orderedKeys = RTE_SEQUENCE[objectStack[objectStack.length - 1].node.namespaceURI];
	pushSerializeAndPop(context, RTE_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, makeSequence(properties, orderedKeys), objectStack, orderedKeys);
}
/**
* @param {Element} node Node.
* @param {Feature} feature Feature.
* @param {Array<*>} objectStack Object stack.
*/
function writeTrk(node, feature, objectStack) {
	const options = objectStack[0];
	const properties = feature.getProperties();
	/** @type {import("../xml.js").NodeStackItem} */
	const context = { node };
	context["properties"] = properties;
	const geometry = feature.getGeometry();
	if (geometry.getType() == "MultiLineString") properties["trkseg"] = transformGeometryWithOptions(geometry, true, options).getLineStrings();
	const orderedKeys = TRK_SEQUENCE[objectStack[objectStack.length - 1].node.namespaceURI];
	pushSerializeAndPop(context, TRK_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, makeSequence(properties, orderedKeys), objectStack, orderedKeys);
}
/**
* @param {Element} node Node.
* @param {LineString} lineString LineString.
* @param {Array<*>} objectStack Object stack.
*/
function writeTrkSeg(node, lineString, objectStack) {
	/** @type {import("../xml.js").NodeStackItem} */
	const context = { node };
	context["geometryLayout"] = lineString.getLayout();
	context["properties"] = {};
	pushSerializeAndPop(context, TRKSEG_SERIALIZERS, TRKSEG_NODE_FACTORY, lineString.getCoordinates(), objectStack);
}
/**
* @param {Element} node Node.
* @param {Feature} feature Feature.
* @param {Array<*>} objectStack Object stack.
*/
function writeWpt(node, feature, objectStack) {
	const options = objectStack[0];
	const context = objectStack[objectStack.length - 1];
	context["properties"] = feature.getProperties();
	const geometry = feature.getGeometry();
	if (geometry.getType() == "Point") {
		const point = transformGeometryWithOptions(geometry, true, options);
		context["geometryLayout"] = point.getLayout();
		writeWptType(node, point.getCoordinates(), objectStack);
	}
}
//#endregion
//#region node_modules/ol/format/TextFeature.js
/**
* @module ol/format/TextFeature
*/
/**
* @classdesc
* Abstract base class; normally only used for creating subclasses and not
* instantiated in apps.
* Base class for text feature formats.
*
* @abstract
*/
var TextFeature = class extends FeatureFormat {
	constructor() {
		super();
	}
	/**
	* @return {import("./Feature.js").Type} Format.
	* @override
	*/
	getType() {
		return "text";
	}
	/**
	* Read the feature from the source.
	*
	* @param {Document|Element|Object|string} source Source.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @return {import("../Feature.js").default} Feature.
	* @api
	* @override
	*/
	readFeature(source, options) {
		return this.readFeatureFromText(getText(source), this.adaptOptions(options));
	}
	/**
	* @abstract
	* @param {string} text Text.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {import("../Feature.js").default} Feature.
	*/
	readFeatureFromText(text, options) {
		return abstract();
	}
	/**
	* Read the features from the source.
	*
	* @param {Document|Element|Object|string} source Source.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @return {Array<import("../Feature.js").default>} Features.
	* @api
	* @override
	*/
	readFeatures(source, options) {
		return this.readFeaturesFromText(getText(source), this.adaptOptions(options));
	}
	/**
	* @abstract
	* @param {string} text Text.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {Array<import("../Feature.js").default>} Features.
	*/
	readFeaturesFromText(text, options) {
		return abstract();
	}
	/**
	* Read the geometry from the source.
	*
	* @param {Document|Element|Object|string} source Source.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @return {import("../geom/Geometry.js").default} Geometry.
	* @api
	* @override
	*/
	readGeometry(source, options) {
		return this.readGeometryFromText(getText(source), this.adaptOptions(options));
	}
	/**
	* @abstract
	* @param {string} text Text.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {import("../geom/Geometry.js").default} Geometry.
	*/
	readGeometryFromText(text, options) {
		return abstract();
	}
	/**
	* Read the projection from the source.
	*
	* @param {Document|Element|Object|string} source Source.
	* @return {import("../proj/Projection.js").default|undefined} Projection.
	* @api
	* @override
	*/
	readProjection(source) {
		return this.readProjectionFromText(getText(source));
	}
	/**
	* @param {string} text Text.
	* @protected
	* @return {import("../proj/Projection.js").default|undefined} Projection.
	*/
	readProjectionFromText(text) {
		return this.dataProjection;
	}
	/**
	* Encode a feature as a string.
	*
	* @param {import("../Feature.js").default} feature Feature.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {string} Encoded feature.
	* @api
	* @override
	*/
	writeFeature(feature, options) {
		return this.writeFeatureText(feature, this.adaptOptions(options));
	}
	/**
	* @abstract
	* @param {import("../Feature.js").default} feature Features.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @protected
	* @return {string} Text.
	*/
	writeFeatureText(feature, options) {
		return abstract();
	}
	/**
	* Encode an array of features as string.
	*
	* @param {Array<import("../Feature.js").default>} features Features.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {string} Encoded features.
	* @api
	* @override
	*/
	writeFeatures(features, options) {
		return this.writeFeaturesText(features, this.adaptOptions(options));
	}
	/**
	* @abstract
	* @param {Array<import("../Feature.js").default>} features Features.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @protected
	* @return {string} Text.
	*/
	writeFeaturesText(features, options) {
		return abstract();
	}
	/**
	* Write a single geometry.
	*
	* @param {import("../geom/Geometry.js").default} geometry Geometry.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @return {string} Geometry.
	* @api
	* @override
	*/
	writeGeometry(geometry, options) {
		return this.writeGeometryText(geometry, this.adaptOptions(options));
	}
	/**
	* @abstract
	* @param {import("../geom/Geometry.js").default} geometry Geometry.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @protected
	* @return {string} Text.
	*/
	writeGeometryText(geometry, options) {
		return abstract();
	}
};
/**
* @param {Document|Element|Object|string} source Source.
* @return {string} Text.
*/
function getText(source) {
	if (typeof source === "string") return source;
	return "";
}
//#endregion
//#region node_modules/ol/format/IGC.js
/**
* @module ol/format/IGC
*/
/**
* @typedef {'barometric' | 'gps' | 'none'} IGCZ
* IGC altitude/z. One of 'barometric', 'gps', 'none'.
*/
/**
* @const
* @type {RegExp}
*/
var B_RECORD_RE = /^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/;
/**
* @const
* @type {RegExp}
*/
var H_RECORD_RE = /^H.([A-Z]{3}).*?:(.*)/;
/**
* @const
* @type {RegExp}
*/
var HFDTE_RECORD_RE = /^HFDTE(\d{2})(\d{2})(\d{2})/;
/**
* @const
* @type {RegExp}
*/
var HFDTEDATE_RECORD_RE = /^HFDTEDATE:(\d{2})(\d{2})(\d{2}),(\d{2})/;
/**
* A regular expression matching the newline characters `\r\n`, `\r` and `\n`.
*
* @const
* @type {RegExp}
*/
var NEWLINE_RE = /\r\n|\r|\n/;
/**
* @typedef {Object} Options
* @property {IGCZ} [altitudeMode='none'] Altitude mode. Possible
* values are `'barometric'`, `'gps'`, and `'none'`.
*/
/**
* @classdesc
* Feature format for `*.igc` flight recording files.
*
* As IGC sources contain a single feature,
* {@link module:ol/format/IGC~IGC#readFeatures} will return the feature in an
* array
*
* @api
*/
var IGC = class extends TextFeature {
	/**
	* @param {Options} [options] Options.
	*/
	constructor(options) {
		super();
		options = options ? options : {};
		/**
		* @type {import("../proj/Projection.js").default}
		*/
		this.dataProjection = get$1("EPSG:4326");
		/**
		* @private
		* @type {IGCZ}
		*/
		this.altitudeMode_ = options.altitudeMode ? options.altitudeMode : "none";
		/**
		* @private
		* @type {boolean}
		*/
		this.lad_ = false;
		/**
		* @private
		* @type {boolean}
		*/
		this.lod_ = false;
		/**
		* @private
		* @type {number}
		*/
		this.ladStart_ = 0;
		/**
		* @private
		* @type {number}
		*/
		this.ladStop_ = 0;
		/**
		* @private
		* @type {number}
		*/
		this.lodStart_ = 0;
		/**
		* @private
		* @type {number}
		*/
		this.lodStop_ = 0;
	}
	/**
	* @protected
	* @param {string} text Text.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @return {import("../Feature.js").default} Feature.
	* @override
	*/
	readFeatureFromText(text, options) {
		const altitudeMode = this.altitudeMode_;
		const lines = text.split(NEWLINE_RE);
		/** @type {Object<string, string>} */
		const properties = {};
		const flatCoordinates = [];
		let year = 2e3;
		let month = 0;
		let day = 1;
		let lastDateTime = -1;
		let i, ii;
		for (i = 0, ii = lines.length; i < ii; ++i) {
			const line = lines[i];
			let m;
			if (line.charAt(0) == "B") {
				m = B_RECORD_RE.exec(line);
				if (m) {
					const hour = parseInt(m[1], 10);
					const minute = parseInt(m[2], 10);
					const second = parseInt(m[3], 10);
					let y = parseInt(m[4], 10) + parseInt(m[5], 10) / 6e4;
					if (this.lad_) y += parseInt(line.slice(this.ladStart_, this.ladStop_), 10) / 6e4 / Math.pow(10, this.ladStop_ - this.ladStart_);
					if (m[6] == "S") y = -y;
					let x = parseInt(m[7], 10) + parseInt(m[8], 10) / 6e4;
					if (this.lod_) x += parseInt(line.slice(this.lodStart_, this.lodStop_), 10) / 6e4 / Math.pow(10, this.lodStop_ - this.lodStart_);
					if (m[9] == "W") x = -x;
					flatCoordinates.push(x, y);
					if (altitudeMode != "none") {
						let z;
						if (altitudeMode == "gps") z = parseInt(m[11], 10);
						else if (altitudeMode == "barometric") z = parseInt(m[12], 10);
						else z = 0;
						flatCoordinates.push(z);
					}
					let dateTime = Date.UTC(year, month, day, hour, minute, second);
					if (dateTime < lastDateTime) dateTime = Date.UTC(year, month, day + 1, hour, minute, second);
					flatCoordinates.push(dateTime / 1e3);
					lastDateTime = dateTime;
				}
			} else if (line.charAt(0) == "H") {
				m = HFDTEDATE_RECORD_RE.exec(line);
				if (m) {
					day = parseInt(m[1], 10);
					month = parseInt(m[2], 10) - 1;
					year = 2e3 + parseInt(m[3], 10);
				} else {
					m = HFDTE_RECORD_RE.exec(line);
					if (m) {
						day = parseInt(m[1], 10);
						month = parseInt(m[2], 10) - 1;
						year = 2e3 + parseInt(m[3], 10);
					} else {
						m = H_RECORD_RE.exec(line);
						if (m) properties[m[1]] = m[2].trim();
					}
				}
			} else if (line.charAt(0) == "I") {
				const numberAdds = parseInt(line.slice(1, 3), 10);
				for (let i = 0; i < numberAdds; i++) {
					const addCode = line.slice(7 + i * 7, 10 + i * 7);
					if (addCode === "LAD" || addCode === "LOD") {
						const addStart = parseInt(line.slice(3 + i * 7, 5 + i * 7), 10) - 1;
						const addStop = parseInt(line.slice(5 + i * 7, 7 + i * 7), 10);
						if (addCode === "LAD") {
							this.lad_ = true;
							this.ladStart_ = addStart;
							this.ladStop_ = addStop;
						} else if (addCode === "LOD") {
							this.lod_ = true;
							this.lodStart_ = addStart;
							this.lodStop_ = addStop;
						}
					}
				}
			}
		}
		if (flatCoordinates.length === 0) return null;
		const feature = new Feature(transformGeometryWithOptions(new LineString(flatCoordinates, altitudeMode == "none" ? "XYM" : "XYZM"), false, options));
		feature.setProperties(properties, true);
		return feature;
	}
	/**
	* @param {string} text Text.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {Array<Feature>} Features.
	* @override
	*/
	readFeaturesFromText(text, options) {
		const feature = this.readFeatureFromText(text, options);
		if (feature) return [feature];
		return [];
	}
};
//#endregion
//#region node_modules/ol/format/WKT.js
/**
* @module ol/format/WKT
*/
/**
* Geometry constructors
* @enum {function (new:import("../geom/Geometry.js").default, Array, import("../geom/Geometry.js").GeometryLayout)}
*/
var GeometryConstructor = {
	"POINT": Point,
	"LINESTRING": LineString,
	"POLYGON": Polygon,
	"MULTIPOINT": MultiPoint,
	"MULTILINESTRING": MultiLineString,
	"MULTIPOLYGON": MultiPolygon
};
/**
* @typedef {Object} Options
* @property {boolean} [splitCollection=false] Whether to split GeometryCollections into
* multiple features on reading.
*/
/**
* @typedef {Object} Token
* @property {number} type Type.
* @property {number|string} [value] Value.
* @property {number} position Position.
*/
/**
* @const
* @type {string}
*/
var EMPTY = "EMPTY";
/**
* @const
* @type {string}
*/
var Z = "Z";
/**
* @const
* @type {string}
*/
var M = "M";
/**
* @const
* @type {string}
*/
var ZM = "ZM";
/**
* @const
* @enum {number}
*/
var TokenType = {
	START: 0,
	TEXT: 1,
	LEFT_PAREN: 2,
	RIGHT_PAREN: 3,
	NUMBER: 4,
	COMMA: 5,
	EOF: 6
};
/**
* @type {Object<import("../geom/Geometry.js").Type, string>}
*/
var wktTypeLookup = {
	Point: "POINT",
	LineString: "LINESTRING",
	Polygon: "POLYGON",
	MultiPoint: "MULTIPOINT",
	MultiLineString: "MULTILINESTRING",
	MultiPolygon: "MULTIPOLYGON",
	GeometryCollection: "GEOMETRYCOLLECTION",
	Circle: "CIRCLE"
};
/**
* Class to tokenize a WKT string.
*/
var Lexer = class {
	/**
	* @param {string} wkt WKT string.
	*/
	constructor(wkt) {
		/**
		* @type {string}
		*/
		this.wkt = wkt;
		/**
		* @type {number}
		* @private
		*/
		this.index_ = -1;
	}
	/**
	* @param {string} c Character.
	* @return {boolean} Whether the character is alphabetic.
	* @private
	*/
	isAlpha_(c) {
		return c >= "a" && c <= "z" || c >= "A" && c <= "Z";
	}
	/**
	* @param {string} c Character.
	* @param {boolean} [decimal] Whether the string number
	*     contains a dot, i.e. is a decimal number.
	* @return {boolean} Whether the character is numeric.
	* @private
	*/
	isNumeric_(c, decimal) {
		decimal = decimal !== void 0 ? decimal : false;
		return c >= "0" && c <= "9" || c == "." && !decimal;
	}
	/**
	* @param {string} c Character.
	* @return {boolean} Whether the character is whitespace.
	* @private
	*/
	isWhiteSpace_(c) {
		return c == " " || c == "	" || c == "\r" || c == "\n";
	}
	/**
	* @return {string} Next string character.
	* @private
	*/
	nextChar_() {
		return this.wkt.charAt(++this.index_);
	}
	/**
	* Fetch and return the next token.
	* @return {Token} Next string token.
	*/
	nextToken() {
		const c = this.nextChar_();
		const position = this.index_;
		/** @type {number|string} */
		let value = c;
		let type;
		if (c == "(") type = TokenType.LEFT_PAREN;
		else if (c == ",") type = TokenType.COMMA;
		else if (c == ")") type = TokenType.RIGHT_PAREN;
		else if (this.isNumeric_(c) || c == "-") {
			type = TokenType.NUMBER;
			value = this.readNumber_();
		} else if (this.isAlpha_(c)) {
			type = TokenType.TEXT;
			value = this.readText_();
		} else if (this.isWhiteSpace_(c)) return this.nextToken();
		else if (c === "") type = TokenType.EOF;
		else throw new Error("Unexpected character: " + c);
		return {
			position,
			value,
			type
		};
	}
	/**
	* @return {number} Numeric token value.
	* @private
	*/
	readNumber_() {
		let c;
		const index = this.index_;
		let decimal = false;
		let scientificNotation = false;
		do {
			if (c == ".") decimal = true;
			else if (c == "e" || c == "E") scientificNotation = true;
			c = this.nextChar_();
		} while (this.isNumeric_(c, decimal) || !scientificNotation && (c == "e" || c == "E") || scientificNotation && (c == "-" || c == "+"));
		return parseFloat(this.wkt.substring(index, this.index_--));
	}
	/**
	* @return {string} String token value.
	* @private
	*/
	readText_() {
		let c;
		const index = this.index_;
		do
			c = this.nextChar_();
		while (this.isAlpha_(c));
		return this.wkt.substring(index, this.index_--).toUpperCase();
	}
};
/**
* Class to parse the tokens from the WKT string.
*/
var Parser = class {
	/**
	* @param {Lexer} lexer The lexer.
	*/
	constructor(lexer) {
		/**
		* @type {Lexer}
		* @private
		*/
		this.lexer_ = lexer;
		/**
		* @type {Token}
		* @private
		*/
		this.token_ = {
			position: 0,
			type: TokenType.START
		};
		/**
		* @type {import("../geom/Geometry.js").GeometryLayout}
		* @private
		*/
		this.layout_ = "XY";
	}
	/**
	* Fetch the next token form the lexer and replace the active token.
	* @private
	*/
	consume_() {
		this.token_ = this.lexer_.nextToken();
	}
	/**
	* Tests if the given type matches the type of the current token.
	* @param {TokenType} type Token type.
	* @return {boolean} Whether the token matches the given type.
	*/
	isTokenType(type) {
		return this.token_.type == type;
	}
	/**
	* If the given type matches the current token, consume it.
	* @param {TokenType} type Token type.
	* @return {boolean} Whether the token matches the given type.
	*/
	match(type) {
		const isMatch = this.isTokenType(type);
		if (isMatch) this.consume_();
		return isMatch;
	}
	/**
	* Try to parse the tokens provided by the lexer.
	* @return {import("../geom/Geometry.js").default} The geometry.
	*/
	parse() {
		this.consume_();
		return this.parseGeometry_();
	}
	/**
	* Try to parse the dimensional info.
	* @return {import("../geom/Geometry.js").GeometryLayout} The layout.
	* @private
	*/
	parseGeometryLayout_() {
		/** @type {import("../geom/Geometry.js").GeometryLayout} */
		let layout = "XY";
		const dimToken = this.token_;
		if (this.isTokenType(TokenType.TEXT)) {
			const dimInfo = dimToken.value;
			if (dimInfo === Z) layout = "XYZ";
			else if (dimInfo === M) layout = "XYM";
			else if (dimInfo === ZM) layout = "XYZM";
			if (layout !== "XY") this.consume_();
		}
		return layout;
	}
	/**
	* @return {Array<import("../geom/Geometry.js").default>} A collection of geometries.
	* @private
	*/
	parseGeometryCollectionText_() {
		if (this.match(TokenType.LEFT_PAREN)) {
			const geometries = [];
			do
				geometries.push(this.parseGeometry_());
			while (this.match(TokenType.COMMA));
			if (this.match(TokenType.RIGHT_PAREN)) return geometries;
		}
		throw new Error(this.formatErrorMessage_());
	}
	/**
	* @return {Array<number>} All values in a point.
	* @private
	*/
	parsePointText_() {
		if (this.match(TokenType.LEFT_PAREN)) {
			const coordinates = this.parsePoint_();
			if (this.match(TokenType.RIGHT_PAREN)) return coordinates;
		}
		throw new Error(this.formatErrorMessage_());
	}
	/**
	* @return {Array<Array<number>>} All points in a linestring.
	* @private
	*/
	parseLineStringText_() {
		if (this.match(TokenType.LEFT_PAREN)) {
			const coordinates = this.parsePointList_();
			if (this.match(TokenType.RIGHT_PAREN)) return coordinates;
		}
		throw new Error(this.formatErrorMessage_());
	}
	/**
	* @return {Array<Array<Array<number>>>} All points in a polygon.
	* @private
	*/
	parsePolygonText_() {
		if (this.match(TokenType.LEFT_PAREN)) {
			const coordinates = this.parseLineStringTextList_();
			if (this.match(TokenType.RIGHT_PAREN)) return coordinates;
		}
		throw new Error(this.formatErrorMessage_());
	}
	/**
	* @return {Array<Array<number>>} All points in a multipoint.
	* @private
	*/
	parseMultiPointText_() {
		if (this.match(TokenType.LEFT_PAREN)) {
			let coordinates;
			if (this.token_.type == TokenType.LEFT_PAREN) coordinates = this.parsePointTextList_();
			else coordinates = this.parsePointList_();
			if (this.match(TokenType.RIGHT_PAREN)) return coordinates;
		}
		throw new Error(this.formatErrorMessage_());
	}
	/**
	* @return {Array<Array<Array<number>>>} All linestring points
	*                                          in a multilinestring.
	* @private
	*/
	parseMultiLineStringText_() {
		if (this.match(TokenType.LEFT_PAREN)) {
			const coordinates = this.parseLineStringTextList_();
			if (this.match(TokenType.RIGHT_PAREN)) return coordinates;
		}
		throw new Error(this.formatErrorMessage_());
	}
	/**
	* @return {Array<Array<Array<Array<number>>>>} All polygon points in a multipolygon.
	* @private
	*/
	parseMultiPolygonText_() {
		if (this.match(TokenType.LEFT_PAREN)) {
			const coordinates = this.parsePolygonTextList_();
			if (this.match(TokenType.RIGHT_PAREN)) return coordinates;
		}
		throw new Error(this.formatErrorMessage_());
	}
	/**
	* @return {Array<number>} A point.
	* @private
	*/
	parsePoint_() {
		const coordinates = [];
		const dimensions = this.layout_.length;
		for (let i = 0; i < dimensions; ++i) {
			const token = this.token_;
			if (this.match(TokenType.NUMBER)) coordinates.push(token.value);
			else break;
		}
		if (coordinates.length == dimensions) return coordinates;
		throw new Error(this.formatErrorMessage_());
	}
	/**
	* @return {Array<Array<number>>} An array of points.
	* @private
	*/
	parsePointList_() {
		const coordinates = [this.parsePoint_()];
		while (this.match(TokenType.COMMA)) coordinates.push(this.parsePoint_());
		return coordinates;
	}
	/**
	* @return {Array<Array<number>>} An array of points.
	* @private
	*/
	parsePointTextList_() {
		const coordinates = [this.parsePointText_()];
		while (this.match(TokenType.COMMA)) coordinates.push(this.parsePointText_());
		return coordinates;
	}
	/**
	* @return {Array<Array<Array<number>>>} An array of points.
	* @private
	*/
	parseLineStringTextList_() {
		const coordinates = [this.parseLineStringText_()];
		while (this.match(TokenType.COMMA)) coordinates.push(this.parseLineStringText_());
		return coordinates;
	}
	/**
	* @return {Array<Array<Array<Array<number>>>>} An array of points.
	* @private
	*/
	parsePolygonTextList_() {
		const coordinates = [this.parsePolygonText_()];
		while (this.match(TokenType.COMMA)) coordinates.push(this.parsePolygonText_());
		return coordinates;
	}
	/**
	* @return {boolean} Whether the token implies an empty geometry.
	* @private
	*/
	isEmptyGeometry_() {
		const isEmpty = this.isTokenType(TokenType.TEXT) && this.token_.value == EMPTY;
		if (isEmpty) this.consume_();
		return isEmpty;
	}
	/**
	* Create an error message for an unexpected token error.
	* @return {string} Error message.
	* @private
	*/
	formatErrorMessage_() {
		return "Unexpected `" + this.token_.value + "` at position " + this.token_.position + " in `" + this.lexer_.wkt + "`";
	}
	/**
	* @return {import("../geom/Geometry.js").default} The geometry.
	* @private
	*/
	parseGeometry_() {
		const token = this.token_;
		if (this.match(TokenType.TEXT)) {
			const geomType = token.value;
			this.layout_ = this.parseGeometryLayout_();
			const isEmpty = this.isEmptyGeometry_();
			if (geomType == "GEOMETRYCOLLECTION") {
				if (isEmpty) return new GeometryCollection([]);
				return new GeometryCollection(this.parseGeometryCollectionText_());
			}
			const ctor = GeometryConstructor[geomType];
			if (!ctor) throw new Error("Invalid geometry type: " + geomType);
			let coordinates;
			if (isEmpty) if (geomType == "POINT") coordinates = [NaN, NaN];
			else coordinates = [];
			else switch (geomType) {
				case "POINT":
					coordinates = this.parsePointText_();
					break;
				case "LINESTRING":
					coordinates = this.parseLineStringText_();
					break;
				case "POLYGON":
					coordinates = this.parsePolygonText_();
					break;
				case "MULTIPOINT":
					coordinates = this.parseMultiPointText_();
					break;
				case "MULTILINESTRING":
					coordinates = this.parseMultiLineStringText_();
					break;
				case "MULTIPOLYGON":
					coordinates = this.parseMultiPolygonText_();
					break;
				default: break;
			}
			return new ctor(coordinates, this.layout_);
		}
		throw new Error(this.formatErrorMessage_());
	}
};
/**
* @classdesc
* Geometry format for reading and writing data in the `WellKnownText` (WKT)
* format.
*
* @api
*/
var WKT = class extends TextFeature {
	/**
	* @param {Options} [options] Options.
	*/
	constructor(options) {
		super();
		options = options ? options : {};
		/**
		* Split GeometryCollection into multiple features.
		* @type {boolean}
		* @private
		*/
		this.splitCollection_ = options.splitCollection !== void 0 ? options.splitCollection : false;
	}
	/**
	* Parse a WKT string.
	* @param {string} wkt WKT string.
	* @return {import("../geom/Geometry.js").default}
	*     The geometry created.
	* @private
	*/
	parse_(wkt) {
		return new Parser(new Lexer(wkt)).parse();
	}
	/**
	* @protected
	* @param {string} text Text.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @return {import("../Feature.js").default} Feature.
	* @override
	*/
	readFeatureFromText(text, options) {
		const geom = this.readGeometryFromText(text, options);
		const feature = new Feature();
		feature.setGeometry(geom);
		return feature;
	}
	/**
	* @param {string} text Text.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {Array<Feature>} Features.
	* @override
	*/
	readFeaturesFromText(text, options) {
		let geometries = [];
		const geometry = this.readGeometryFromText(text, options);
		if (this.splitCollection_ && geometry.getType() == "GeometryCollection") geometries = geometry.getGeometriesArray();
		else geometries = [geometry];
		const features = [];
		for (let i = 0, ii = geometries.length; i < ii; ++i) {
			const feature = new Feature();
			feature.setGeometry(geometries[i]);
			features.push(feature);
		}
		return features;
	}
	/**
	* @param {string} text Text.
	* @param {import("./Feature.js").ReadOptions} [options] Read options.
	* @protected
	* @return {import("../geom/Geometry.js").default} Geometry.
	* @override
	*/
	readGeometryFromText(text, options) {
		return transformGeometryWithOptions(this.parse_(text), false, options);
	}
	/**
	* @param {import("../Feature.js").default} feature Features.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @protected
	* @return {string} Text.
	* @override
	*/
	writeFeatureText(feature, options) {
		const geometry = feature.getGeometry();
		if (geometry) return this.writeGeometryText(geometry, options);
		return "";
	}
	/**
	* @param {Array<import("../Feature.js").default>} features Features.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @protected
	* @return {string} Text.
	* @override
	*/
	writeFeaturesText(features, options) {
		if (features.length == 1) return this.writeFeatureText(features[0], options);
		const geometries = [];
		for (let i = 0, ii = features.length; i < ii; ++i) geometries.push(features[i].getGeometry());
		const collection = new GeometryCollection(geometries);
		return this.writeGeometryText(collection, options);
	}
	/**
	* @param {import("../geom/Geometry.js").default} geometry Geometry.
	* @param {import("./Feature.js").WriteOptions} [options] Write options.
	* @protected
	* @return {string} Text.
	* @override
	*/
	writeGeometryText(geometry, options) {
		return encode(transformGeometryWithOptions(geometry, true, options));
	}
};
/**
* @param {Point} geom Point geometry.
* @return {string} Coordinates part of Point as WKT.
*/
function encodePointGeometry(geom) {
	const coordinates = geom.getCoordinates();
	if (coordinates.length === 0) return "";
	return coordinates.join(" ");
}
/**
* @param {MultiPoint} geom MultiPoint geometry.
* @return {string} Coordinates part of MultiPoint as WKT.
*/
function encodeMultiPointGeometry(geom) {
	const array = [];
	const components = geom.getPoints();
	for (let i = 0, ii = components.length; i < ii; ++i) array.push("(" + encodePointGeometry(components[i]) + ")");
	return array.join(",");
}
/**
* @param {GeometryCollection} geom GeometryCollection geometry.
* @return {string} Coordinates part of GeometryCollection as WKT.
*/
function encodeGeometryCollectionGeometry(geom) {
	const array = [];
	const geoms = geom.getGeometries();
	for (let i = 0, ii = geoms.length; i < ii; ++i) array.push(encode(geoms[i]));
	return array.join(",");
}
/**
* @param {LineString|import("../geom/LinearRing.js").default} geom LineString geometry.
* @return {string} Coordinates part of LineString as WKT.
*/
function encodeLineStringGeometry(geom) {
	const coordinates = geom.getCoordinates();
	const array = [];
	for (let i = 0, ii = coordinates.length; i < ii; ++i) array.push(coordinates[i].join(" "));
	return array.join(",");
}
/**
* @param {MultiLineString} geom MultiLineString geometry.
* @return {string} Coordinates part of MultiLineString as WKT.
*/
function encodeMultiLineStringGeometry(geom) {
	const array = [];
	const components = geom.getLineStrings();
	for (let i = 0, ii = components.length; i < ii; ++i) array.push("(" + encodeLineStringGeometry(components[i]) + ")");
	return array.join(",");
}
/**
* @param {Polygon} geom Polygon geometry.
* @return {string} Coordinates part of Polygon as WKT.
*/
function encodePolygonGeometry(geom) {
	const array = [];
	const rings = geom.getLinearRings();
	for (let i = 0, ii = rings.length; i < ii; ++i) array.push("(" + encodeLineStringGeometry(rings[i]) + ")");
	return array.join(",");
}
/**
* @param {MultiPolygon} geom MultiPolygon geometry.
* @return {string} Coordinates part of MultiPolygon as WKT.
*/
function encodeMultiPolygonGeometry(geom) {
	const array = [];
	const components = geom.getPolygons();
	for (let i = 0, ii = components.length; i < ii; ++i) array.push("(" + encodePolygonGeometry(components[i]) + ")");
	return array.join(",");
}
/**
* @param {import("../geom/SimpleGeometry.js").default} geom SimpleGeometry geometry.
* @return {string} Potential dimensional information for WKT type.
*/
function encodeGeometryLayout(geom) {
	const layout = geom.getLayout();
	let dimInfo = "";
	if (layout === "XYZ" || layout === "XYZM") dimInfo += Z;
	if (layout === "XYM" || layout === "XYZM") dimInfo += M;
	return dimInfo;
}
/**
* @const
* @type {Object<string, function(import("../geom/Geometry.js").default): string>}
*/
var GeometryEncoder = {
	"Point": encodePointGeometry,
	"LineString": encodeLineStringGeometry,
	"Polygon": encodePolygonGeometry,
	"MultiPoint": encodeMultiPointGeometry,
	"MultiLineString": encodeMultiLineStringGeometry,
	"MultiPolygon": encodeMultiPolygonGeometry,
	"GeometryCollection": encodeGeometryCollectionGeometry
};
/**
* Encode a geometry as WKT.
* @param {import("../geom/Geometry.js").default} geom The geometry to encode.
* @return {string} WKT string for the geometry.
*/
function encode(geom) {
	const type = geom.getType();
	const geometryEncoder = GeometryEncoder[type];
	const enc = geometryEncoder(geom);
	let wktType = wktTypeLookup[type];
	if (typeof geom.getFlatCoordinates === "function") {
		const dimInfo = encodeGeometryLayout(geom);
		if (dimInfo.length > 0) wktType += " " + dimInfo;
	}
	if (enc.length === 0) return wktType + " EMPTY";
	return wktType + "(" + enc + ")";
}
//#endregion
export { ImageWrapper as $, defaultLineJoin as A, CLASS_CONTROL as B, RegularShape as C, defaultFont as D, defaultFillStyle as E, drawImageOrLabel as F, shared as G, CLASS_SELECTABLE as H, getTextDimensions as I, fromString as J, NO_COLOR as K, measureAndCacheTextWidth as L, defaultStrokeStyle as M, defaultTextAlign as N, defaultLineCap as O, defaultTextBaseline as P, withAlpha as Q, registerFont as R, CircleStyle as S, checkedFonts as T, CLASS_UNSELECTABLE as U, CLASS_HIDDEN as V, asColorLike as W, rgbaToLcha as X, lchaToRgba as Y, toString as Z, createDefaultStyle as _, getStrideForLayout as _t, WMSCapabilities as a, fromExtent as at, Stroke as b, transform2D as bt, GeoJSON as c, LineString as ct, MultiPolygon as d, inflateCoordinates as dt, decode as et, MultiPoint as f, inflateCoordinatesArray as ft, Style as g, SimpleGeometry as gt, Text as h, deflateCoordinate as ht, TopoJSON as i, fromCircle as it, defaultPadding as j, defaultLineDash as k, GeometryCollection as l, snap as lt, Feature as m, Point as mt, IGC as n, ImageState_default as nt, MVT as o, inflateEnds as ot, MultiLineString as p, inflateMultiCoordinatesArray as pt, asArray as q, GPX as r, Polygon as rt, KML as s, LinearRing as st, WKT as t, listenImage as tt, RenderFeature as u, lineStringLength as ut, createEditingStyle as v, transformGeom2D as vt, Icon as w, Fill as x, toFunction as y, rotate as yt, CLASS_COLLAPSED as z };

//# sourceMappingURL=ol-formats-debug.js.map