import { a as __toESM, n as __esmMin, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-debug.js";
import { a as inflate_1, n as ZSTDDecoder, r as require_LercDecode, t as ZSTDDecoder$1 } from "./geotiff-codecs-debug.js";
import { a as getFloat16, i as getAttribute, n as browser_default, r as findTagsByName, t as QuickLRU } from "./geotiff-deps-debug.js";
//#region \0@oxc-project+runtime@0.132.0/helpers/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
var init_typeof = __esmMin((() => {}));
//#endregion
//#region \0@oxc-project+runtime@0.132.0/helpers/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var init_toPrimitive = __esmMin((() => {
	init_typeof();
}));
//#endregion
//#region \0@oxc-project+runtime@0.132.0/helpers/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
var init_toPropertyKey = __esmMin((() => {
	init_typeof();
	init_toPrimitive();
}));
//#endregion
//#region \0@oxc-project+runtime@0.132.0/helpers/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
var init_defineProperty = __esmMin((() => {
	init_toPropertyKey();
}));
//#endregion
//#region \0@oxc-project+runtime@0.132.0/helpers/objectSpread2.js
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var init_objectSpread2 = __esmMin((() => {
	init_defineProperty();
}));
//#endregion
//#region \0@oxc-project+runtime@0.132.0/helpers/asyncToGenerator.js
function asyncGeneratorStep(n, t, e, r, o, a, c) {
	try {
		var i = n[a](c), u = i.value;
	} catch (n) {
		e(n);
		return;
	}
	i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
	return function() {
		var t = this, e = arguments;
		return new Promise(function(r, o) {
			var a = n.apply(t, e);
			function _next(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
			}
			function _throw(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
			}
			_next(void 0);
		});
	};
}
//#endregion
//#region \0vite/preload-helper.js
init_objectSpread2();
var scriptRel = "modulepreload";
var assetsURL = function(dep, importerUrl) {
	return new URL(dep, importerUrl).href;
};
var seen = {};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		const links = document.getElementsByTagName("link");
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = (cspNonceMeta === null || cspNonceMeta === void 0 ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta === null || cspNonceMeta === void 0 ? void 0 : cspNonceMeta.getAttribute("nonce"));
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		promise = allSettled(deps.map((dep) => {
			dep = assetsURL(dep, importerUrl);
			if (dep in seen) return;
			seen[dep] = true;
			const isCss = dep.endsWith(".css");
			const cssSelector = isCss ? "[rel=\"stylesheet\"]" : "";
			if (!!importerUrl) for (let i = links.length - 1; i >= 0; i--) {
				const link = links[i];
				if (link.href === dep && (!isCss || link.rel === "stylesheet")) return;
			}
			else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
			const link = document.createElement("link");
			link.rel = isCss ? "stylesheet" : scriptRel;
			if (!isCss) link.as = "script";
			link.crossOrigin = "";
			link.href = dep;
			if (cspNonce) link.setAttribute("nonce", cspNonce);
			document.head.appendChild(link);
			if (isCss) return new Promise((res, rej) => {
				link.addEventListener("load", res);
				link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
			});
		}));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
//#endregion
//#region node_modules/ol/console.js
/**
* @module ol/console
*/
/**
* @typedef {'info'|'warn'|'error'|'none'} Level
*/
/**
* @type {Object<Level, number>}
*/
var levels = {
	info: 1,
	warn: 2,
	error: 3,
	none: 4
};
/**
* @type {number}
*/
var level = levels.info;
/**
* @param  {...any} args Arguments to log
*/
function warn(...args) {
	if (level > levels.warn) return;
	console.warn(...args);
}
/**
* @param  {...any} args Arguments to log
*/
function error(...args) {
	if (level > levels.error) return;
	console.error(...args);
}
//#endregion
//#region node_modules/ol/extent/Relationship.js
/**
* @module ol/extent/Relationship
*/
/**
* Relationship to an extent.
* @enum {number}
*/
var Relationship_default = {
	UNKNOWN: 0,
	INTERSECTING: 1,
	ABOVE: 2,
	RIGHT: 4,
	BELOW: 8,
	LEFT: 16
};
//#endregion
//#region node_modules/ol/extent.js
/**
* @module ol/extent
*/
/**
* An array of numbers representing an extent: `[minx, miny, maxx, maxy]`.
* @typedef {Array<number>} Extent
* @api
*/
/**
* Extent corner.
* @typedef {'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'} Corner
*/
/**
* Build an extent that includes all given coordinates.
*
* @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
* @return {Extent} Bounding extent.
* @api
*/
function boundingExtent(coordinates) {
	const extent = createEmpty();
	for (let i = 0, ii = coordinates.length; i < ii; ++i) extendCoordinate(extent, coordinates[i]);
	return extent;
}
/**
* @param {Array<number>} xs Xs.
* @param {Array<number>} ys Ys.
* @param {Extent} [dest] Destination extent.
* @private
* @return {Extent} Extent.
*/
function _boundingExtentXYs(xs, ys, dest) {
	return createOrUpdate$2(Math.min.apply(null, xs), Math.min.apply(null, ys), Math.max.apply(null, xs), Math.max.apply(null, ys), dest);
}
/**
* Return extent increased by the provided value.
* @param {Extent} extent Extent.
* @param {number} value The amount by which the extent should be buffered.
* @param {Extent} [dest] Extent.
* @return {Extent} Extent.
* @api
*/
function buffer(extent, value, dest) {
	if (dest) {
		dest[0] = extent[0] - value;
		dest[1] = extent[1] - value;
		dest[2] = extent[2] + value;
		dest[3] = extent[3] + value;
		return dest;
	}
	return [
		extent[0] - value,
		extent[1] - value,
		extent[2] + value,
		extent[3] + value
	];
}
/**
* Creates a clone of an extent.
*
* @param {Extent} extent Extent to clone.
* @param {Extent} [dest] Extent.
* @return {Extent} The clone.
*/
function clone(extent, dest) {
	if (dest) {
		dest[0] = extent[0];
		dest[1] = extent[1];
		dest[2] = extent[2];
		dest[3] = extent[3];
		return dest;
	}
	return extent.slice();
}
/**
* @param {Extent} extent Extent.
* @param {number} x X.
* @param {number} y Y.
* @return {number} Closest squared distance.
*/
function closestSquaredDistanceXY(extent, x, y) {
	let dx, dy;
	if (x < extent[0]) dx = extent[0] - x;
	else if (extent[2] < x) dx = x - extent[2];
	else dx = 0;
	if (y < extent[1]) dy = extent[1] - y;
	else if (extent[3] < y) dy = y - extent[3];
	else dy = 0;
	return dx * dx + dy * dy;
}
/**
* Check if the passed coordinate is contained or on the edge of the extent.
*
* @param {Extent} extent Extent.
* @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
* @return {boolean} The coordinate is contained in the extent.
* @api
*/
function containsCoordinate(extent, coordinate) {
	return containsXY(extent, coordinate[0], coordinate[1]);
}
/**
* Check if one extent contains another.
*
* An extent is deemed contained if it lies completely within the other extent,
* including if they share one or more edges.
*
* @param {Extent} extent1 Extent 1.
* @param {Extent} extent2 Extent 2.
* @return {boolean} The second extent is contained by or on the edge of the
*     first.
* @api
*/
function containsExtent(extent1, extent2) {
	return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
}
/**
* Check if the passed coordinate is contained or on the edge of the extent.
*
* @param {Extent} extent Extent.
* @param {number} x X coordinate.
* @param {number} y Y coordinate.
* @return {boolean} The x, y values are contained in the extent.
* @api
*/
function containsXY(extent, x, y) {
	return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
}
/**
* Get the relationship between a coordinate and extent.
* @param {Extent} extent The extent.
* @param {import("./coordinate.js").Coordinate} coordinate The coordinate.
* @return {import("./extent/Relationship.js").default} The relationship (bitwise compare with
*     import("./extent/Relationship.js").Relationship).
*/
function coordinateRelationship(extent, coordinate) {
	const minX = extent[0];
	const minY = extent[1];
	const maxX = extent[2];
	const maxY = extent[3];
	const x = coordinate[0];
	const y = coordinate[1];
	let relationship = Relationship_default.UNKNOWN;
	if (x < minX) relationship = relationship | Relationship_default.LEFT;
	else if (x > maxX) relationship = relationship | Relationship_default.RIGHT;
	if (y < minY) relationship = relationship | Relationship_default.BELOW;
	else if (y > maxY) relationship = relationship | Relationship_default.ABOVE;
	if (relationship === Relationship_default.UNKNOWN) relationship = Relationship_default.INTERSECTING;
	return relationship;
}
/**
* Create an empty extent.
* @return {Extent} Empty extent.
* @api
*/
function createEmpty() {
	return [
		Infinity,
		Infinity,
		-Infinity,
		-Infinity
	];
}
/**
* Create a new extent or update the provided extent.
* @param {number} minX Minimum X.
* @param {number} minY Minimum Y.
* @param {number} maxX Maximum X.
* @param {number} maxY Maximum Y.
* @param {Extent} [dest] Destination extent.
* @return {Extent} Extent.
*/
function createOrUpdate$2(minX, minY, maxX, maxY, dest) {
	if (dest) {
		dest[0] = minX;
		dest[1] = minY;
		dest[2] = maxX;
		dest[3] = maxY;
		return dest;
	}
	return [
		minX,
		minY,
		maxX,
		maxY
	];
}
/**
* Create a new empty extent or make the provided one empty.
* @param {Extent} [dest] Extent.
* @return {Extent} Extent.
*/
function createOrUpdateEmpty(dest) {
	return createOrUpdate$2(Infinity, Infinity, -Infinity, -Infinity, dest);
}
/**
* @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
* @param {Extent} [dest] Extent.
* @return {Extent} Extent.
*/
function createOrUpdateFromCoordinate(coordinate, dest) {
	const x = coordinate[0];
	const y = coordinate[1];
	return createOrUpdate$2(x, y, x, y, dest);
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {Extent} [dest] Extent.
* @return {Extent} Extent.
*/
function createOrUpdateFromFlatCoordinates(flatCoordinates, offset, end, stride, dest) {
	return extendFlatCoordinates(createOrUpdateEmpty(dest), flatCoordinates, offset, end, stride);
}
/**
* Determine if two extents are equivalent.
* @param {Extent} extent1 Extent 1.
* @param {Extent} extent2 Extent 2.
* @return {boolean} The two extents are equivalent.
* @api
*/
function equals$2(extent1, extent2) {
	return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
}
/**
* Modify an extent to include another extent.
* @param {Extent} extent1 The extent to be modified.
* @param {Extent} extent2 The extent that will be included in the first.
* @return {Extent} A reference to the first (extended) extent.
* @api
*/
function extend$1(extent1, extent2) {
	if (extent2[0] < extent1[0]) extent1[0] = extent2[0];
	if (extent2[2] > extent1[2]) extent1[2] = extent2[2];
	if (extent2[1] < extent1[1]) extent1[1] = extent2[1];
	if (extent2[3] > extent1[3]) extent1[3] = extent2[3];
	return extent1;
}
/**
* @param {Extent} extent Extent.
* @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
*/
function extendCoordinate(extent, coordinate) {
	if (coordinate[0] < extent[0]) extent[0] = coordinate[0];
	if (coordinate[0] > extent[2]) extent[2] = coordinate[0];
	if (coordinate[1] < extent[1]) extent[1] = coordinate[1];
	if (coordinate[1] > extent[3]) extent[3] = coordinate[1];
}
/**
* @param {Extent} extent Extent.
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @return {Extent} Extent.
*/
function extendFlatCoordinates(extent, flatCoordinates, offset, end, stride) {
	for (; offset < end; offset += stride) extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
	return extent;
}
/**
* @param {Extent} extent Extent.
* @param {number} x X.
* @param {number} y Y.
*/
function extendXY(extent, x, y) {
	extent[0] = Math.min(extent[0], x);
	extent[1] = Math.min(extent[1], y);
	extent[2] = Math.max(extent[2], x);
	extent[3] = Math.max(extent[3], y);
}
/**
* This function calls `callback` for each corner of the extent. If the
* callback returns a truthy value the function returns that value
* immediately. Otherwise the function returns `false`.
* @param {Extent} extent Extent.
* @param {function(import("./coordinate.js").Coordinate): S} callback Callback.
* @return {S|boolean} Value.
* @template S
*/
function forEachCorner(extent, callback) {
	let val;
	val = callback(getBottomLeft(extent));
	if (val) return val;
	val = callback(getBottomRight(extent));
	if (val) return val;
	val = callback(getTopRight(extent));
	if (val) return val;
	val = callback(getTopLeft(extent));
	if (val) return val;
	return false;
}
/**
* Get the size of an extent.
* @param {Extent} extent Extent.
* @return {number} Area.
* @api
*/
function getArea$1(extent) {
	let area = 0;
	if (!isEmpty$1(extent)) area = getWidth(extent) * getHeight(extent);
	return area;
}
/**
* Get the bottom left coordinate of an extent.
* @param {Extent} extent Extent.
* @return {import("./coordinate.js").Coordinate} Bottom left coordinate.
* @api
*/
function getBottomLeft(extent) {
	return [extent[0], extent[1]];
}
/**
* Get the bottom right coordinate of an extent.
* @param {Extent} extent Extent.
* @return {import("./coordinate.js").Coordinate} Bottom right coordinate.
* @api
*/
function getBottomRight(extent) {
	return [extent[2], extent[1]];
}
/**
* Get the center coordinate of an extent.
* @param {Extent} extent Extent.
* @return {import("./coordinate.js").Coordinate} Center.
* @api
*/
function getCenter(extent) {
	return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
}
/**
* Get a corner coordinate of an extent.
* @param {Extent} extent Extent.
* @param {Corner} corner Corner.
* @return {import("./coordinate.js").Coordinate} Corner coordinate.
*/
function getCorner(extent, corner) {
	let coordinate;
	if (corner === "bottom-left") coordinate = getBottomLeft(extent);
	else if (corner === "bottom-right") coordinate = getBottomRight(extent);
	else if (corner === "top-left") coordinate = getTopLeft(extent);
	else if (corner === "top-right") coordinate = getTopRight(extent);
	else throw new Error("Invalid corner");
	return coordinate;
}
/**
* @param {import("./coordinate.js").Coordinate} center Center.
* @param {number} resolution Resolution.
* @param {number} rotation Rotation.
* @param {import("./size.js").Size} size Size.
* @param {Extent} [dest] Destination extent.
* @return {Extent} Extent.
*/
function getForViewAndSize(center, resolution, rotation, size, dest) {
	const [x0, y0, x1, y1, x2, y2, x3, y3] = getRotatedViewport(center, resolution, rotation, size);
	return createOrUpdate$2(Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3), Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3), dest);
}
/**
* @param {import("./coordinate.js").Coordinate} center Center.
* @param {number} resolution Resolution.
* @param {number} rotation Rotation.
* @param {import("./size.js").Size} size Size.
* @return {Array<number>} Linear ring representing the viewport.
*/
function getRotatedViewport(center, resolution, rotation, size) {
	const dx = resolution * size[0] / 2;
	const dy = resolution * size[1] / 2;
	const cosRotation = Math.cos(rotation);
	const sinRotation = Math.sin(rotation);
	const xCos = dx * cosRotation;
	const xSin = dx * sinRotation;
	const yCos = dy * cosRotation;
	const ySin = dy * sinRotation;
	const x = center[0];
	const y = center[1];
	return [
		x - xCos + ySin,
		y - xSin - yCos,
		x - xCos - ySin,
		y - xSin + yCos,
		x + xCos - ySin,
		y + xSin + yCos,
		x + xCos + ySin,
		y + xSin - yCos,
		x - xCos + ySin,
		y - xSin - yCos
	];
}
/**
* Get the height of an extent.
* @param {Extent} extent Extent.
* @return {number} Height.
* @api
*/
function getHeight(extent) {
	return extent[3] - extent[1];
}
/**
* Get the intersection of two extents.
* @param {Extent} extent1 Extent 1.
* @param {Extent} extent2 Extent 2.
* @param {Extent} [dest] Optional extent to populate with intersection.
* @return {Extent} Intersecting extent.
* @api
*/
function getIntersection(extent1, extent2, dest) {
	const intersection = dest ? dest : createEmpty();
	if (intersects(extent1, extent2)) {
		if (extent1[0] > extent2[0]) intersection[0] = extent1[0];
		else intersection[0] = extent2[0];
		if (extent1[1] > extent2[1]) intersection[1] = extent1[1];
		else intersection[1] = extent2[1];
		if (extent1[2] < extent2[2]) intersection[2] = extent1[2];
		else intersection[2] = extent2[2];
		if (extent1[3] < extent2[3]) intersection[3] = extent1[3];
		else intersection[3] = extent2[3];
	} else createOrUpdateEmpty(intersection);
	return intersection;
}
/**
* Get the top left coordinate of an extent.
* @param {Extent} extent Extent.
* @return {import("./coordinate.js").Coordinate} Top left coordinate.
* @api
*/
function getTopLeft(extent) {
	return [extent[0], extent[3]];
}
/**
* Get the top right coordinate of an extent.
* @param {Extent} extent Extent.
* @return {import("./coordinate.js").Coordinate} Top right coordinate.
* @api
*/
function getTopRight(extent) {
	return [extent[2], extent[3]];
}
/**
* Get the width of an extent.
* @param {Extent} extent Extent.
* @return {number} Width.
* @api
*/
function getWidth(extent) {
	return extent[2] - extent[0];
}
/**
* Determine if one extent intersects another.
* @param {Extent} extent1 Extent 1.
* @param {Extent} extent2 Extent.
* @return {boolean} The two extents intersect.
* @api
*/
function intersects(extent1, extent2) {
	return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
}
/**
* Determine if an extent is empty.
* @param {Extent} extent Extent.
* @return {boolean} Is empty.
* @api
*/
function isEmpty$1(extent) {
	return extent[2] < extent[0] || extent[3] < extent[1];
}
/**
* @param {Extent} extent Extent.
* @param {Extent} [dest] Extent.
* @return {Extent} Extent.
*/
function returnOrUpdate(extent, dest) {
	if (dest) {
		dest[0] = extent[0];
		dest[1] = extent[1];
		dest[2] = extent[2];
		dest[3] = extent[3];
		return dest;
	}
	return extent;
}
/**
* @param {Extent} extent Extent.
* @param {number} value Value.
*/
function scaleFromCenter(extent, value) {
	const deltaX = (extent[2] - extent[0]) / 2 * (value - 1);
	const deltaY = (extent[3] - extent[1]) / 2 * (value - 1);
	extent[0] -= deltaX;
	extent[2] += deltaX;
	extent[1] -= deltaY;
	extent[3] += deltaY;
}
/**
* Determine if the segment between two coordinates intersects (crosses,
* touches, or is contained by) the provided extent.
* @param {Extent} extent The extent.
* @param {import("./coordinate.js").Coordinate} start Segment start coordinate.
* @param {import("./coordinate.js").Coordinate} end Segment end coordinate.
* @return {boolean} The segment intersects the extent.
*/
function intersectsSegment(extent, start, end) {
	let intersects = false;
	const startRel = coordinateRelationship(extent, start);
	const endRel = coordinateRelationship(extent, end);
	if (startRel === Relationship_default.INTERSECTING || endRel === Relationship_default.INTERSECTING) intersects = true;
	else {
		const minX = extent[0];
		const minY = extent[1];
		const maxX = extent[2];
		const maxY = extent[3];
		const startX = start[0];
		const startY = start[1];
		const endX = end[0];
		const endY = end[1];
		const slope = (endY - startY) / (endX - startX);
		let x, y;
		if (!!(endRel & Relationship_default.ABOVE) && !(startRel & Relationship_default.ABOVE)) {
			x = endX - (endY - maxY) / slope;
			intersects = x >= minX && x <= maxX;
		}
		if (!intersects && !!(endRel & Relationship_default.RIGHT) && !(startRel & Relationship_default.RIGHT)) {
			y = endY - (endX - maxX) * slope;
			intersects = y >= minY && y <= maxY;
		}
		if (!intersects && !!(endRel & Relationship_default.BELOW) && !(startRel & Relationship_default.BELOW)) {
			x = endX - (endY - minY) / slope;
			intersects = x >= minX && x <= maxX;
		}
		if (!intersects && !!(endRel & Relationship_default.LEFT) && !(startRel & Relationship_default.LEFT)) {
			y = endY - (endX - minX) * slope;
			intersects = y >= minY && y <= maxY;
		}
	}
	return intersects;
}
/**
* Apply a transform function to the extent.
* @param {Extent} extent Extent.
* @param {import("./proj.js").TransformFunction} transformFn Transform function.
* Called with `[minX, minY, maxX, maxY]` extent coordinates.
* @param {Extent} [dest] Destination extent.
* @param {number} [stops] Number of stops per side used for the transform.
* By default only the corners are used.
* @return {Extent} Extent.
* @api
*/
function applyTransform(extent, transformFn, dest, stops) {
	if (isEmpty$1(extent)) return createOrUpdateEmpty(dest);
	let coordinates = [];
	if (stops > 1) {
		const width = extent[2] - extent[0];
		const height = extent[3] - extent[1];
		for (let i = 0; i < stops; ++i) coordinates.push(extent[0] + width * i / stops, extent[1], extent[2], extent[1] + height * i / stops, extent[2] - width * i / stops, extent[3], extent[0], extent[3] - height * i / stops);
	} else coordinates = [
		extent[0],
		extent[1],
		extent[2],
		extent[1],
		extent[2],
		extent[3],
		extent[0],
		extent[3]
	];
	transformFn(coordinates, coordinates, 2);
	const xs = [];
	const ys = [];
	for (let i = 0, l = coordinates.length; i < l; i += 2) {
		xs.push(coordinates[i]);
		ys.push(coordinates[i + 1]);
	}
	return _boundingExtentXYs(xs, ys, dest);
}
/**
* Modifies the provided extent in-place to be within the real world
* extent.
*
* @param {Extent} extent Extent.
* @param {import("./proj/Projection.js").default} projection Projection
* @return {Extent} The extent within the real world extent.
*/
function wrapX$2(extent, projection) {
	const projectionExtent = projection.getExtent();
	const center = getCenter(extent);
	if (projection.canWrapX() && (center[0] < projectionExtent[0] || center[0] >= projectionExtent[2])) {
		const worldWidth = getWidth(projectionExtent);
		const offset = Math.floor((center[0] - projectionExtent[0]) / worldWidth) * worldWidth;
		extent[0] -= offset;
		extent[2] -= offset;
	}
	return extent;
}
/**
* Fits the extent to the real world
*
* If the extent does not cross the anti meridian, this will return the extent in an array
* If the extent crosses the anti meridian, the extent will be sliced, so each part fits within the
* real world
*
*
* @param {Extent} extent Extent.
* @param {import("./proj/Projection.js").default} projection Projection
* @param {boolean} [multiWorld] Return all worlds
* @return {Array<Extent>} The extent within the real world extent.
*/
function wrapAndSliceX(extent, projection, multiWorld) {
	if (projection.canWrapX()) {
		const projectionExtent = projection.getExtent();
		if (!isFinite(extent[0]) || !isFinite(extent[2])) return [[
			projectionExtent[0],
			extent[1],
			projectionExtent[2],
			extent[3]
		]];
		wrapX$2(extent, projection);
		const worldWidth = getWidth(projectionExtent);
		if (getWidth(extent) > worldWidth && !multiWorld) return [[
			projectionExtent[0],
			extent[1],
			projectionExtent[2],
			extent[3]
		]];
		if (extent[0] < projectionExtent[0]) return [[
			extent[0] + worldWidth,
			extent[1],
			projectionExtent[2],
			extent[3]
		], [
			projectionExtent[0],
			extent[1],
			extent[2],
			extent[3]
		]];
		if (extent[2] > projectionExtent[2]) return [[
			extent[0],
			extent[1],
			projectionExtent[2],
			extent[3]
		], [
			projectionExtent[0],
			extent[1],
			extent[2] - worldWidth,
			extent[3]
		]];
	}
	return [extent];
}
//#endregion
//#region node_modules/ol/math.js
/**
* @module ol/math
*/
/**
* Takes a number and clamps it to within the provided bounds.
* @param {number} value The input number.
* @param {number} min The minimum value to return.
* @param {number} max The maximum value to return.
* @return {number} The input number if it is within bounds, or the nearest
*     number within the bounds.
*/
function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}
/**
* Returns the square of the closest distance between the point (x, y) and the
* line segment (x1, y1) to (x2, y2).
* @param {number} x X.
* @param {number} y Y.
* @param {number} x1 X1.
* @param {number} y1 Y1.
* @param {number} x2 X2.
* @param {number} y2 Y2.
* @return {number} Squared distance.
*/
function squaredSegmentDistance(x, y, x1, y1, x2, y2) {
	const dx = x2 - x1;
	const dy = y2 - y1;
	if (dx !== 0 || dy !== 0) {
		const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
		if (t > 1) {
			x1 = x2;
			y1 = y2;
		} else if (t > 0) {
			x1 += dx * t;
			y1 += dy * t;
		}
	}
	return squaredDistance$1(x, y, x1, y1);
}
/**
* Returns the square of the distance between the points (x1, y1) and (x2, y2).
* @param {number} x1 X1.
* @param {number} y1 Y1.
* @param {number} x2 X2.
* @param {number} y2 Y2.
* @return {number} Squared distance.
*/
function squaredDistance$1(x1, y1, x2, y2) {
	const dx = x2 - x1;
	const dy = y2 - y1;
	return dx * dx + dy * dy;
}
/**
* Solves system of linear equations using Gaussian elimination method.
*
* @param {Array<Array<number>>} mat Augmented matrix (n x n + 1 column)
*                                     in row-major order.
* @return {Array<number>|null} The resulting vector.
*/
function solveLinearSystem(mat) {
	const n = mat.length;
	for (let i = 0; i < n; i++) {
		let maxRow = i;
		let maxEl = Math.abs(mat[i][i]);
		for (let r = i + 1; r < n; r++) {
			const absValue = Math.abs(mat[r][i]);
			if (absValue > maxEl) {
				maxEl = absValue;
				maxRow = r;
			}
		}
		if (maxEl === 0) return null;
		const tmp = mat[maxRow];
		mat[maxRow] = mat[i];
		mat[i] = tmp;
		for (let j = i + 1; j < n; j++) {
			const coef = -mat[j][i] / mat[i][i];
			for (let k = i; k < n + 1; k++) if (i == k) mat[j][k] = 0;
			else mat[j][k] += coef * mat[i][k];
		}
	}
	const x = new Array(n);
	for (let l = n - 1; l >= 0; l--) {
		x[l] = mat[l][n] / mat[l][l];
		for (let m = l - 1; m >= 0; m--) mat[m][n] -= mat[m][l] * x[l];
	}
	return x;
}
/**
* Converts radians to to degrees.
*
* @param {number} angleInRadians Angle in radians.
* @return {number} Angle in degrees.
*/
function toDegrees(angleInRadians) {
	return angleInRadians * 180 / Math.PI;
}
/**
* Converts degrees to radians.
*
* @param {number} angleInDegrees Angle in degrees.
* @return {number} Angle in radians.
*/
function toRadians(angleInDegrees) {
	return angleInDegrees * Math.PI / 180;
}
/**
* Returns the modulo of a / b, depending on the sign of b.
*
* @param {number} a Dividend.
* @param {number} b Divisor.
* @return {number} Modulo.
*/
function modulo(a, b) {
	const r = a % b;
	return r * b < 0 ? r + b : r;
}
/**
* Calculates the linearly interpolated value of x between a and b.
*
* @param {number} a Number
* @param {number} b Number
* @param {number} x Value to be interpolated.
* @return {number} Interpolated value.
*/
function lerp$1(a, b, x) {
	return a + x * (b - a);
}
/**
* Returns a number with a limited number of decimal digits.
* @param {number} n The input number.
* @param {number} decimals The maximum number of decimal digits.
* @return {number} The input number with a limited number of decimal digits.
*/
function toFixed(n, decimals) {
	const factor = Math.pow(10, decimals);
	return Math.round(n * factor) / factor;
}
/**
* Rounds a number to the nearest integer value considering only the given number
* of decimal digits (with rounding on the final digit).
* @param {number} n The input number.
* @param {number} decimals The maximum number of decimal digits.
* @return {number} The nearest integer.
*/
function round(n, decimals) {
	return Math.round(toFixed(n, decimals));
}
/**
* Rounds a number to the next smaller integer considering only the given number
* of decimal digits (with rounding on the final digit).
* @param {number} n The input number.
* @param {number} decimals The maximum number of decimal digits.
* @return {number} The next smaller integer.
*/
function floor(n, decimals) {
	return Math.floor(toFixed(n, decimals));
}
/**
* Rounds a number to the next bigger integer considering only the given number
* of decimal digits (with rounding on the final digit).
* @param {number} n The input number.
* @param {number} decimals The maximum number of decimal digits.
* @return {number} The next bigger integer.
*/
function ceil(n, decimals) {
	return Math.ceil(toFixed(n, decimals));
}
/**
* Wraps a number between some minimum and maximum values.
* @param {number} n The number to wrap.
* @param {number} min The minimum of the range (inclusive).
* @param {number} max The maximum of the range (exclusive).
* @return {number} The wrapped number.
*/
function wrap(n, min, max) {
	if (n >= min && n < max) return n;
	const range = max - min;
	return ((n - min) % range + range) % range + min;
}
//#endregion
//#region node_modules/ol/string.js
/**
* @module ol/string
*/
/**
* @param {number} number Number to be formatted
* @param {number} width The desired width
* @param {number} [precision] Precision of the output string (i.e. number of decimal places)
* @return {string} Formatted string
*/
function padNumber(number, width, precision) {
	const numberString = precision !== void 0 ? number.toFixed(precision) : "" + number;
	let decimal = numberString.indexOf(".");
	decimal = decimal === -1 ? numberString.length : decimal;
	return decimal > width ? numberString : new Array(1 + width - decimal).join("0") + numberString;
}
/**
* Adapted from https://github.com/omichelsen/compare-versions/blob/master/index.js
* @param {string|number} v1 First version
* @param {string|number} v2 Second version
* @return {number} Value
*/
function compareVersions(v1, v2) {
	const s1 = ("" + v1).split(".");
	const s2 = ("" + v2).split(".");
	for (let i = 0; i < Math.max(s1.length, s2.length); i++) {
		const n1 = parseInt(s1[i] || "0", 10);
		const n2 = parseInt(s2[i] || "0", 10);
		if (n1 > n2) return 1;
		if (n2 > n1) return -1;
	}
	return 0;
}
//#endregion
//#region node_modules/ol/coordinate.js
/**
* @module ol/coordinate
*/
/**
* An array of numbers representing an `xy`, `xyz` or `xyzm` coordinate.
* Example: `[16, 48]`.
* @typedef {Array<number>} Coordinate
* @api
*/
/**
* A function that takes a {@link module:ol/coordinate~Coordinate} and
* transforms it into a `{string}`.
*
* @typedef {function((Coordinate|undefined)): string} CoordinateFormat
* @api
*/
/**
* Add `delta` to `coordinate`. `coordinate` is modified in place and returned
* by the function.
*
* Example:
*
*     import {add} from 'ol/coordinate.js';
*
*     const coord = [7.85, 47.983333];
*     add(coord, [-2, 4]);
*     // coord is now [5.85, 51.983333]
*
* @param {Coordinate} coordinate Coordinate.
* @param {Coordinate} delta Delta.
* @return {Coordinate} The input coordinate adjusted by
* the given delta.
* @api
*/
function add$2(coordinate, delta) {
	coordinate[0] += +delta[0];
	coordinate[1] += +delta[1];
	return coordinate;
}
/**
* Calculates the point closest to the passed coordinate on the passed circle.
*
* @param {Coordinate} coordinate The coordinate.
* @param {import("./geom/Circle.js").default} circle The circle.
* @return {Coordinate} Closest point on the circumference.
*/
function closestOnCircle(coordinate, circle) {
	const r = circle.getRadius();
	const center = circle.getCenter();
	const x0 = center[0];
	const y0 = center[1];
	const x1 = coordinate[0];
	const y1 = coordinate[1];
	let dx = x1 - x0;
	const dy = y1 - y0;
	if (dx === 0 && dy === 0) dx = 1;
	const d = Math.sqrt(dx * dx + dy * dy);
	return [x0 + r * dx / d, y0 + r * dy / d];
}
/**
* Calculates the point closest to the passed coordinate on the passed segment.
* This is the foot of the perpendicular of the coordinate to the segment when
* the foot is on the segment, or the closest segment coordinate when the foot
* is outside the segment.
*
* @param {Coordinate} coordinate The coordinate.
* @param {Array<Coordinate>} segment The two coordinates
* of the segment.
* @return {Coordinate} The foot of the perpendicular of
* the coordinate to the segment.
*/
function closestOnSegment(coordinate, segment) {
	const x0 = coordinate[0];
	const y0 = coordinate[1];
	const start = segment[0];
	const end = segment[1];
	const x1 = start[0];
	const y1 = start[1];
	const x2 = end[0];
	const y2 = end[1];
	const dx = x2 - x1;
	const dy = y2 - y1;
	const along = dx === 0 && dy === 0 ? 0 : (dx * (x0 - x1) + dy * (y0 - y1)) / (dx * dx + dy * dy || 0);
	let x, y;
	if (along <= 0) {
		x = x1;
		y = y1;
	} else if (along >= 1) {
		x = x2;
		y = y2;
	} else {
		x = x1 + along * dx;
		y = y1 + along * dy;
	}
	return [x, y];
}
/**
* @param {Coordinate} coordinate1 First coordinate.
* @param {Coordinate} coordinate2 Second coordinate.
* @return {boolean} The two coordinates are equal.
*/
function equals$1(coordinate1, coordinate2) {
	let equals = true;
	for (let i = coordinate1.length - 1; i >= 0; --i) if (coordinate1[i] != coordinate2[i]) {
		equals = false;
		break;
	}
	return equals;
}
/**
* Rotate `coordinate` by `angle`. `coordinate` is modified in place and
* returned by the function.
*
* Example:
*
*     import {rotate} from 'ol/coordinate.js';
*
*     const coord = [7.85, 47.983333];
*     const rotateRadians = Math.PI / 2; // 90 degrees
*     rotate(coord, rotateRadians);
*     // coord is now [-47.983333, 7.85]
*
* @param {Coordinate} coordinate Coordinate.
* @param {number} angle Angle in radian.
* @return {Coordinate} Coordinate.
* @api
*/
function rotate$1(coordinate, angle) {
	const cosAngle = Math.cos(angle);
	const sinAngle = Math.sin(angle);
	const x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
	const y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
	coordinate[0] = x;
	coordinate[1] = y;
	return coordinate;
}
/**
* Scale `coordinate` by `scale`. `coordinate` is modified in place and returned
* by the function.
*
* Example:
*
*     import {scale as scaleCoordinate} from 'ol/coordinate.js';
*
*     const coord = [7.85, 47.983333];
*     const scale = 1.2;
*     scaleCoordinate(coord, scale);
*     // coord is now [9.42, 57.5799996]
*
* @param {Coordinate} coordinate Coordinate.
* @param {number} scale Scale factor.
* @return {Coordinate} Coordinate.
*/
function scale$3(coordinate, scale) {
	coordinate[0] *= scale;
	coordinate[1] *= scale;
	return coordinate;
}
/**
* @param {Coordinate} coord1 First coordinate.
* @param {Coordinate} coord2 Second coordinate.
* @return {number} Squared distance between coord1 and coord2.
*/
function squaredDistance(coord1, coord2) {
	const dx = coord1[0] - coord2[0];
	const dy = coord1[1] - coord2[1];
	return dx * dx + dy * dy;
}
/**
* @param {Coordinate} coord1 First coordinate.
* @param {Coordinate} coord2 Second coordinate.
* @return {number} Distance between coord1 and coord2.
*/
function distance(coord1, coord2) {
	return Math.sqrt(squaredDistance(coord1, coord2));
}
/**
* Calculate the squared distance from a coordinate to a line segment.
*
* @param {Coordinate} coordinate Coordinate of the point.
* @param {Array<Coordinate>} segment Line segment (2
* coordinates).
* @return {number} Squared distance from the point to the line segment.
*/
function squaredDistanceToSegment(coordinate, segment) {
	return squaredDistance(coordinate, closestOnSegment(coordinate, segment));
}
/**
* Modifies the provided coordinate in-place to be within the real world
* extent. The lower projection extent boundary is inclusive, the upper one
* exclusive.
*
* @param {Coordinate} coordinate Coordinate.
* @param {import("./proj/Projection.js").default} projection Projection.
* @return {Coordinate} The coordinate within the real world extent.
*/
function wrapX$1(coordinate, projection) {
	if (projection.canWrapX()) {
		const worldWidth = getWidth(projection.getExtent());
		const worldsAway = getWorldsAway(coordinate, projection, worldWidth);
		if (worldsAway) coordinate[0] -= worldsAway * worldWidth;
	}
	return coordinate;
}
/**
* @param {Coordinate} coordinate Coordinate.
* @param {import("./proj/Projection.js").default} projection Projection.
* @param {number} [sourceExtentWidth] Width of the source extent.
* @return {number} Offset in world widths.
*/
function getWorldsAway(coordinate, projection, sourceExtentWidth) {
	const projectionExtent = projection.getExtent();
	let worldsAway = 0;
	if (projection.canWrapX() && (coordinate[0] < projectionExtent[0] || coordinate[0] > projectionExtent[2])) {
		sourceExtentWidth = sourceExtentWidth || getWidth(projectionExtent);
		worldsAway = Math.floor((coordinate[0] - projectionExtent[0]) / sourceExtentWidth);
	}
	return worldsAway;
}
/**
* Compute the angle between p0pA and p0pB
* @param {Coordinate} p0 Point 0
* @param {Coordinate} pA Point A
* @param {Coordinate} pB Point B
* @return {number} a value in [0, 2PI]
*/
function angleBetween(p0, pA, pB) {
	const lenA = Math.sqrt((pA[0] - p0[0]) * (pA[0] - p0[0]) + (pA[1] - p0[1]) * (pA[1] - p0[1]));
	const tangentA = [(pA[0] - p0[0]) / lenA, (pA[1] - p0[1]) / lenA];
	const orthoA = [-tangentA[1], tangentA[0]];
	const lenB = Math.sqrt((pB[0] - p0[0]) * (pB[0] - p0[0]) + (pB[1] - p0[1]) * (pB[1] - p0[1]));
	const tangentB = [(pB[0] - p0[0]) / lenB, (pB[1] - p0[1]) / lenB];
	let angle = lenA === 0 || lenB === 0 ? 0 : Math.acos(clamp(tangentB[0] * tangentA[0] + tangentB[1] * tangentA[1], -1, 1));
	angle = Math.max(angle, 1e-5);
	return !(tangentB[0] * orthoA[0] + tangentB[1] * orthoA[1] > 0) ? Math.PI * 2 - angle : angle;
}
//#endregion
//#region node_modules/ol/proj/Units.js
/**
* @module ol/proj/Units
*/
/**
* @typedef {'radians' | 'degrees' | 'ft' | 'm' | 'pixels' | 'tile-pixels' | 'us-ft'} Units
* Projection units.
*/
/**
* See http://duff.ess.washington.edu/data/raster/drg/docs/geotiff.txt
* @type {Object<number, Units>}
*/
var unitByCode = {
	"9001": "m",
	"9002": "ft",
	"9003": "us-ft",
	"9101": "radians",
	"9102": "degrees"
};
/**
* @param {number} code Unit code.
* @return {Units} Units.
*/
function fromCode(code) {
	return unitByCode[code];
}
/**
* @typedef {Object} MetersPerUnitLookup
* @property {number} radians Radians
* @property {number} degrees Degrees
* @property {number} ft  Feet
* @property {number} m Meters
* @property {number} us-ft US feet
*/
/**
* Meters per unit lookup table.
* @const
* @type {MetersPerUnitLookup}
* @api
*/
var METERS_PER_UNIT$1 = {
	"radians": 6370997 / (2 * Math.PI),
	"degrees": 2 * Math.PI * 6370997 / 360,
	"ft": .3048,
	"m": 1,
	"us-ft": 1200 / 3937
};
//#endregion
//#region node_modules/ol/proj/Projection.js
/**
* @module ol/proj/Projection
*/
/**
* The function is called with a `number` view resolution and a
* {@link module:ol/coordinate~Coordinate} as arguments, and returns the `number` resolution
* in projection units at the passed coordinate.
* @typedef {function(number, import("../coordinate.js").Coordinate):number} GetPointResolution
* @api
*/
/**
* @typedef {Object} Options
* @property {string} code The SRS identifier code, e.g. `EPSG:4326`.
* @property {import("./Units.js").Units} [units] Units. Required unless a
* proj4 projection is defined for `code`.
* @property {import("../extent.js").Extent} [extent] The validity extent for the SRS.
* @property {string} [axisOrientation='enu'] The axis orientation as specified in Proj4.
* @property {boolean} [global=false] Whether the projection is valid for the whole globe.
* @property {number} [metersPerUnit] The meters per unit for the SRS.
* If not provided, the `units` are used to get the meters per unit from the {@link METERS_PER_UNIT}
* lookup table.
* @property {import("../extent.js").Extent} [worldExtent] The world extent for the SRS.
* @property {GetPointResolution} [getPointResolution]
* Function to determine resolution at a point. The function is called with a
* `number` view resolution and a {@link module:ol/coordinate~Coordinate} as arguments, and returns
* the `number` resolution in projection units at the passed coordinate. If this is `undefined`,
* the default {@link module:ol/proj.getPointResolution} function will be used.
*/
/**
* @classdesc
* In most cases, you should not need to create instances of this class.
* Instead, where projection information is required, you can use a string
* projection code or identifier (e.g. `EPSG:4326`) instead of a projection
* instance.
*
* The library includes support for transforming coordinates between the following
* projections:
*
*  WGS 84 / Geographic - Using codes `EPSG:4326`, `CRS:84`, `urn:ogc:def:crs:EPSG:6.6:4326`,
*    `urn:ogc:def:crs:OGC:1.3:CRS84`, `urn:ogc:def:crs:OGC:2:84`, `http://www.opengis.net/gml/srs/epsg.xml#4326`,
*    or `urn:x-ogc:def:crs:EPSG:4326`
*  WGS 84 / Spherical Mercator - Using codes `EPSG:3857`, `EPSG:102100`, `EPSG:102113`, `EPSG:900913`,
*    `urn:ogc:def:crs:EPSG:6.18:3:3857`, or `http://www.opengis.net/gml/srs/epsg.xml#3857`
*  WGS 84 / UTM zones - Using codes `EPSG:32601` through `EPSG:32660` for northern zones
*    and `EPSG:32701` through `EPSG:32760` for southern zones. Note that the built-in UTM transforms
*    are lower accuracy (with errors on the order of 0.1 m) than those that you might get in a
*    library like [proj4js](https://github.com/proj4js/proj4js).
*
* For additional projection support, or to use higher accuracy transforms than the built-in ones, you can use
* the [proj4js](https://github.com/proj4js/proj4js) library. With `proj4js`, after adding any new projection
* definitions, call the {@link module:ol/proj/proj4.register} function.
*
* You can use the {@link module:ol/proj.get} function to retrieve a projection instance
* for one of the registered projections.
*
* @api
*/
var Projection = class {
	/**
	* @param {Options} options Projection options.
	*/
	constructor(options) {
		/**
		* @private
		* @type {string}
		*/
		this.code_ = options.code;
		/**
		* Units of projected coordinates. When set to `TILE_PIXELS`, a
		* `this.extent_` and `this.worldExtent_` must be configured properly for each
		* tile.
		* @private
		* @type {import("./Units.js").Units}
		*/
		this.units_ = options.units;
		/**
		* Validity extent of the projection in projected coordinates. For projections
		* with `TILE_PIXELS` units, this is the extent of the tile in
		* tile pixel space.
		* @private
		* @type {import("../extent.js").Extent}
		*/
		this.extent_ = options.extent !== void 0 ? options.extent : null;
		/**
		* Extent of the world in EPSG:4326. For projections with
		* `TILE_PIXELS` units, this is the extent of the tile in
		* projected coordinate space.
		* @private
		* @type {import("../extent.js").Extent}
		*/
		this.worldExtent_ = options.worldExtent !== void 0 ? options.worldExtent : null;
		/**
		* @private
		* @type {string}
		*/
		this.axisOrientation_ = options.axisOrientation !== void 0 ? options.axisOrientation : "enu";
		/**
		* @private
		* @type {boolean}
		*/
		this.global_ = options.global !== void 0 ? options.global : false;
		/**
		* @private
		* @type {boolean}
		*/
		this.canWrapX_ = !!(this.global_ && this.extent_);
		/**
		* @private
		* @type {GetPointResolution|undefined}
		*/
		this.getPointResolutionFunc_ = options.getPointResolution;
		/**
		* @private
		* @type {import("../tilegrid/TileGrid.js").default}
		*/
		this.defaultTileGrid_ = null;
		/**
		* @private
		* @type {number|undefined}
		*/
		this.metersPerUnit_ = options.metersPerUnit;
	}
	/**
	* @return {boolean} The projection is suitable for wrapping the x-axis
	*/
	canWrapX() {
		return this.canWrapX_;
	}
	/**
	* Get the code for this projection, e.g. 'EPSG:4326'.
	* @return {string} Code.
	* @api
	*/
	getCode() {
		return this.code_;
	}
	/**
	* Get the validity extent for this projection.
	* @return {import("../extent.js").Extent} Extent.
	* @api
	*/
	getExtent() {
		return this.extent_;
	}
	/**
	* Get the units of this projection.
	* @return {import("./Units.js").Units} Units.
	* @api
	*/
	getUnits() {
		return this.units_;
	}
	/**
	* Get the amount of meters per unit of this projection.  If the projection is
	* not configured with `metersPerUnit` or a units identifier, the return is
	* `undefined`.
	* @return {number|undefined} Meters.
	* @api
	*/
	getMetersPerUnit() {
		return this.metersPerUnit_ || METERS_PER_UNIT$1[this.units_];
	}
	/**
	* Get the world extent for this projection.
	* @return {import("../extent.js").Extent} Extent.
	* @api
	*/
	getWorldExtent() {
		return this.worldExtent_;
	}
	/**
	* Get the axis orientation of this projection.
	* Example values are:
	* enu - the default easting, northing, elevation.
	* neu - northing, easting, up - useful for "lat/long" geographic coordinates,
	*     or south orientated transverse mercator.
	* wnu - westing, northing, up - some planetary coordinate systems have
	*     "west positive" coordinate systems
	* @return {string} Axis orientation.
	* @api
	*/
	getAxisOrientation() {
		return this.axisOrientation_;
	}
	/**
	* Is this projection a global projection which spans the whole world?
	* @return {boolean} Whether the projection is global.
	* @api
	*/
	isGlobal() {
		return this.global_;
	}
	/**
	* Set if the projection is a global projection which spans the whole world
	* @param {boolean} global Whether the projection is global.
	* @api
	*/
	setGlobal(global) {
		this.global_ = global;
		this.canWrapX_ = !!(global && this.extent_);
	}
	/**
	* @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
	*/
	getDefaultTileGrid() {
		return this.defaultTileGrid_;
	}
	/**
	* @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
	*/
	setDefaultTileGrid(tileGrid) {
		this.defaultTileGrid_ = tileGrid;
	}
	/**
	* Set the validity extent for this projection.
	* @param {import("../extent.js").Extent} extent Extent.
	* @api
	*/
	setExtent(extent) {
		this.extent_ = extent;
		this.canWrapX_ = !!(this.global_ && extent);
	}
	/**
	* Set the world extent for this projection.
	* @param {import("../extent.js").Extent} worldExtent World extent
	*     [minlon, minlat, maxlon, maxlat].
	* @api
	*/
	setWorldExtent(worldExtent) {
		this.worldExtent_ = worldExtent;
	}
	/**
	* Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
	* for this projection.
	* @param {function(number, import("../coordinate.js").Coordinate):number} func Function
	* @api
	*/
	setGetPointResolution(func) {
		this.getPointResolutionFunc_ = func;
	}
	/**
	* Get the custom point resolution function for this projection (if set).
	* @return {GetPointResolution|undefined} The custom point
	* resolution function (if set).
	*/
	getPointResolutionFunc() {
		return this.getPointResolutionFunc_;
	}
};
//#endregion
//#region node_modules/ol/proj/epsg3857.js
/**
* @module ol/proj/epsg3857
*/
/**
* Radius of WGS84 sphere
*
* @const
* @type {number}
*/
var RADIUS$1 = 6378137;
/**
* @const
* @type {number}
*/
var HALF_SIZE = Math.PI * RADIUS$1;
/**
* @const
* @type {import("../extent.js").Extent}
*/
var EXTENT$1 = [
	-HALF_SIZE,
	-HALF_SIZE,
	HALF_SIZE,
	HALF_SIZE
];
/**
* @const
* @type {import("../extent.js").Extent}
*/
var WORLD_EXTENT = [
	-180,
	-85,
	180,
	85
];
/**
* Maximum safe value in y direction
* @const
* @type {number}
*/
var MAX_SAFE_Y = RADIUS$1 * Math.log(Math.tan(Math.PI / 2));
/**
* @classdesc
* Projection object for web/spherical Mercator (EPSG:3857).
*/
var EPSG3857Projection = class extends Projection {
	/**
	* @param {string} code Code.
	*/
	constructor(code) {
		super({
			code,
			units: "m",
			extent: EXTENT$1,
			global: true,
			worldExtent: WORLD_EXTENT,
			getPointResolution: function(resolution, point) {
				return resolution / Math.cosh(point[1] / RADIUS$1);
			}
		});
	}
};
/**
* Projections equal to EPSG:3857.
*
* @const
* @type {Array<import("./Projection.js").default>}
*/
var PROJECTIONS$1 = [
	new EPSG3857Projection("EPSG:3857"),
	new EPSG3857Projection("EPSG:102100"),
	new EPSG3857Projection("EPSG:102113"),
	new EPSG3857Projection("EPSG:900913"),
	new EPSG3857Projection("http://www.opengis.net/def/crs/EPSG/0/3857"),
	new EPSG3857Projection("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
/**
* Transformation from EPSG:4326 to EPSG:3857.
*
* @param {Array<number>} input Input array of coordinate values.
* @param {Array<number>} [output] Output array of coordinate values.
* @param {number} [dimension] Dimension (default is `2`).
* @param {number} [stride] Stride (default is `dimension`).
* @return {Array<number>} Output array of coordinate values.
*/
function fromEPSG4326(input, output, dimension, stride) {
	var _stride;
	const length = input.length;
	dimension = dimension > 1 ? dimension : 2;
	stride = (_stride = stride) !== null && _stride !== void 0 ? _stride : dimension;
	if (output === void 0) if (dimension > 2) output = input.slice();
	else output = new Array(length);
	for (let i = 0; i < length; i += stride) {
		output[i] = HALF_SIZE * input[i] / 180;
		let y = RADIUS$1 * Math.log(Math.tan(Math.PI * (+input[i + 1] + 90) / 360));
		if (y > MAX_SAFE_Y) y = MAX_SAFE_Y;
		else if (y < -MAX_SAFE_Y) y = -MAX_SAFE_Y;
		output[i + 1] = y;
	}
	return output;
}
/**
* Transformation from EPSG:3857 to EPSG:4326.
*
* @param {Array<number>} input Input array of coordinate values.
* @param {Array<number>} [output] Output array of coordinate values.
* @param {number} [dimension] Dimension (default is `2`).
* @param {number} [stride] Stride (default is `dimension`).
* @return {Array<number>} Output array of coordinate values.
*/
function toEPSG4326(input, output, dimension, stride) {
	var _stride2;
	const length = input.length;
	dimension = dimension > 1 ? dimension : 2;
	stride = (_stride2 = stride) !== null && _stride2 !== void 0 ? _stride2 : dimension;
	if (output === void 0) if (dimension > 2) output = input.slice();
	else output = new Array(length);
	for (let i = 0; i < length; i += stride) {
		output[i] = 180 * input[i] / HALF_SIZE;
		output[i + 1] = 360 * Math.atan(Math.exp(input[i + 1] / RADIUS$1)) / Math.PI - 90;
	}
	return output;
}
//#endregion
//#region node_modules/ol/proj/epsg4326.js
/**
* @module ol/proj/epsg4326
*/
/**
* Semi-major radius of the WGS84 ellipsoid.
*
* @const
* @type {number}
*/
var RADIUS = 6378137;
/**
* Extent of the EPSG:4326 projection which is the whole world.
*
* @const
* @type {import("../extent.js").Extent}
*/
var EXTENT = [
	-180,
	-90,
	180,
	90
];
/**
* @const
* @type {number}
*/
var METERS_PER_UNIT = Math.PI * RADIUS / 180;
/**
* @classdesc
* Projection object for WGS84 geographic coordinates (EPSG:4326).
*
* Note that OpenLayers does not strictly comply with the EPSG definition.
* The EPSG registry defines 4326 as a CRS for Latitude,Longitude (y,x).
* OpenLayers treats EPSG:4326 as a pseudo-projection, with x,y coordinates.
*/
var EPSG4326Projection = class extends Projection {
	/**
	* @param {string} code Code.
	* @param {string} [axisOrientation] Axis orientation.
	*/
	constructor(code, axisOrientation) {
		super({
			code,
			units: "degrees",
			extent: EXTENT,
			axisOrientation,
			global: true,
			metersPerUnit: METERS_PER_UNIT,
			worldExtent: EXTENT
		});
	}
};
/**
* Projections equal to EPSG:4326.
*
* @const
* @type {Array<import("./Projection.js").default>}
*/
var PROJECTIONS = [
	new EPSG4326Projection("CRS:84"),
	new EPSG4326Projection("EPSG:4326", "neu"),
	new EPSG4326Projection("urn:ogc:def:crs:OGC:1.3:CRS84"),
	new EPSG4326Projection("urn:ogc:def:crs:OGC:2:84"),
	new EPSG4326Projection("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
	new EPSG4326Projection("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
	new EPSG4326Projection("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];
//#endregion
//#region node_modules/ol/proj/projections.js
/**
* @module ol/proj/projections
*/
/**
* @type {Object<string, import("./Projection.js").default>}
*/
var cache = {};
/**
* Get a cached projection by code.
* @param {string} code The code for the projection.
* @return {import("./Projection.js").default|null} The projection (if cached).
*/
function get$2(code) {
	return cache[code] || cache[code.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
/**
* Add a projection to the cache.
* @param {string} code The projection code.
* @param {import("./Projection.js").default} projection The projection to cache.
*/
function add$1(code, projection) {
	cache[code] = projection;
}
//#endregion
//#region node_modules/ol/obj.js
/**
* @module ol/obj
*/
/**
* Removes all properties from an object.
* @param {Object<string, unknown>} object The object to clear.
*/
function clear(object) {
	for (const property in object) delete object[property];
}
/**
* Determine if an object has any properties.
* @param {Object} object The object to check.
* @return {boolean} The object is empty.
*/
function isEmpty(object) {
	let property;
	for (property in object) return false;
	return !property;
}
//#endregion
//#region node_modules/ol/proj/transforms.js
/**
* @private
* @type {!Object<string, Object<string, import("../proj.js").TransformFunction>>}
*/
var transforms = {};
/**
* Registers a conversion function to convert coordinates from the source
* projection to the destination projection.
*
* @param {import("./Projection.js").default} source Source.
* @param {import("./Projection.js").default} destination Destination.
* @param {import("../proj.js").TransformFunction} transformFn Transform.
*/
function add(source, destination, transformFn) {
	const sourceCode = source.getCode();
	const destinationCode = destination.getCode();
	if (!(sourceCode in transforms)) transforms[sourceCode] = {};
	transforms[sourceCode][destinationCode] = transformFn;
}
/**
* Get a transform given a source code and a destination code.
* @param {string} sourceCode The code for the source projection.
* @param {string} destinationCode The code for the destination projection.
* @return {import("../proj.js").TransformFunction|null} The transform function (if found).
*/
function get$1(sourceCode, destinationCode) {
	if (sourceCode in transforms && destinationCode in transforms[sourceCode]) return transforms[sourceCode][destinationCode];
	return null;
}
//#endregion
//#region node_modules/ol/proj/utm.js
/**
* @module ol/proj/utm
*/
/**
* Adapted from https://github.com/Turbo87/utm
* Copyright (c) 2012-2017 Tobias Bieniek
*
* The functions here provide approximate transforms to and from UTM.
* They are not appropriate for use beyond the validity extend of a UTM
* zone, and the accuracy of the transform decreases toward the zone
* edges.
*/
/**
* @typedef {Object} UTMZone
* @property {number} number The zone number (1 - 60).
* @property {boolean} north The northern hemisphere.
*/
var K0 = .9996;
var E = .00669438;
var E2 = E * E;
var E3 = E2 * E;
var E_P2 = E / (1 - E);
var SQRT_E = Math.sqrt(1 - E);
var _E = (1 - SQRT_E) / (1 + SQRT_E);
var _E2 = _E * _E;
var _E3 = _E2 * _E;
var _E4 = _E3 * _E;
var _E5 = _E4 * _E;
var M1 = 1 - E / 4 - 3 * E2 / 64 - 5 * E3 / 256;
var M2 = .002514607064228144;
var M3 = 26390466021299826e-22;
var M4 = 35 * E3 / 3072;
var P2 = 3 / 2 * _E - 27 / 32 * _E3 + 269 / 512 * _E5;
var P3 = 21 / 16 * _E2 - 55 / 32 * _E4;
var P4 = 151 / 96 * _E3 - 417 / 128 * _E5;
var P5 = 1097 / 512 * _E4;
var R = 6378137;
/**
* @param {number} easting Easting value of coordinate.
* @param {number} northing Northing value of coordinate.
* @param {UTMZone} zone The UTM zone.
* @return {import("../coordinate.js").Coordinate} The transformed coordinate.
*/
function toLonLat(easting, northing, zone) {
	const x = easting - 5e5;
	const mu = (zone.north ? northing : northing - 1e7) / K0 / (R * M1);
	const pRad = mu + P2 * Math.sin(2 * mu) + P3 * Math.sin(4 * mu) + P4 * Math.sin(6 * mu) + P5 * Math.sin(8 * mu);
	const pSin = Math.sin(pRad);
	const pSin2 = pSin * pSin;
	const pCos = Math.cos(pRad);
	const pTan = pSin / pCos;
	const pTan2 = pTan * pTan;
	const pTan4 = pTan2 * pTan2;
	const epSin = 1 - E * pSin2;
	const n = R / Math.sqrt(1 - E * pSin2);
	const r = (1 - E) / epSin;
	const c = E_P2 * Math.pow(pCos, 2);
	const c2 = c * c;
	const d = x / (n * K0);
	const d2 = d * d;
	const d3 = d2 * d;
	const d4 = d3 * d;
	const d5 = d4 * d;
	const d6 = d5 * d;
	const latitude = pRad - pTan / r * (d2 / 2 - d4 / 24 * (5 + 3 * pTan2 + 10 * c - 4 * c2 - 9 * E_P2)) + d6 / 720 * (61 + 90 * pTan2 + 298 * c + 45 * pTan4 - 252 * E_P2 - 3 * c2);
	let longitude = (d - d3 / 6 * (1 + 2 * pTan2 + c) + d5 / 120 * (5 - 2 * c + 28 * pTan2 - 3 * c2 + 8 * E_P2 + 24 * pTan4)) / pCos;
	longitude = wrap(longitude + toRadians(zoneToCentralLongitude(zone.number)), -Math.PI, Math.PI);
	return [toDegrees(longitude), toDegrees(latitude)];
}
var MIN_LATITUDE = -80;
var MAX_LATITUDE = 84;
var MIN_LONGITUDE = -180;
var MAX_LONGITUDE = 180;
/**
* @param {number} longitude The longitude.
* @param {number} latitude The latitude.
* @param {UTMZone} zone The UTM zone.
* @return {import('../coordinate.js').Coordinate} The UTM coordinate.
*/
function fromLonLat$1(longitude, latitude, zone) {
	longitude = wrap(longitude, MIN_LONGITUDE, MAX_LONGITUDE);
	if (latitude < MIN_LATITUDE) latitude = MIN_LATITUDE;
	else if (latitude > MAX_LATITUDE) latitude = MAX_LATITUDE;
	const latRad = toRadians(latitude);
	const latSin = Math.sin(latRad);
	const latCos = Math.cos(latRad);
	const latTan = latSin / latCos;
	const latTan2 = latTan * latTan;
	const latTan4 = latTan2 * latTan2;
	const lonRad = toRadians(longitude);
	const centralLonRad = toRadians(zoneToCentralLongitude(zone.number));
	const n = R / Math.sqrt(1 - E * Math.pow(latSin, 2));
	const c = E_P2 * Math.pow(latCos, 2);
	const a = latCos * wrap(lonRad - centralLonRad, -Math.PI, Math.PI);
	const a2 = a * a;
	const a3 = a2 * a;
	const a4 = a3 * a;
	const a5 = a4 * a;
	const a6 = a5 * a;
	const m = R * (M1 * latRad - M2 * Math.sin(2 * latRad) + M3 * Math.sin(4 * latRad) - M4 * Math.sin(6 * latRad));
	const easting = K0 * n * (a + a3 / 6 * (1 - latTan2 + c) + a5 / 120 * (5 - 18 * latTan2 + latTan4 + 72 * c - 58 * E_P2)) + 5e5;
	let northing = K0 * (m + n * latTan * (a2 / 2 + a4 / 24 * (5 - latTan2 + 9 * c + 4 * Math.pow(c, 2)) + a6 / 720 * (61 - 58 * latTan2 + latTan4 + 600 * c - 330 * E_P2)));
	if (!zone.north) northing += 1e7;
	return [easting, northing];
}
/**
* @param {number} zone The zone number.
* @return {number} The central longitude in degrees.
*/
function zoneToCentralLongitude(zone) {
	return (zone - 1) * 6 - 180 + 3;
}
/**
* @type {Array<RegExp>}
*/
var epsgRegExes = [
	/^EPSG:(\d+)$/,
	/^urn:ogc:def:crs:EPSG::(\d+)$/,
	/^http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/0\/(\d+)$/
];
/**
* @param {string} code The projection code.
* @return {UTMZone|null} The UTM zone info (or null if not UTM).
*/
function zoneFromCode(code) {
	let epsgId = 0;
	for (const re of epsgRegExes) {
		const match = code.match(re);
		if (match) {
			epsgId = parseInt(match[1]);
			break;
		}
	}
	if (!epsgId) return null;
	let number = 0;
	let north = false;
	if (epsgId > 32700 && epsgId < 32761) number = epsgId - 32700;
	else if (epsgId > 32600 && epsgId < 32661) {
		north = true;
		number = epsgId - 32600;
	}
	if (!number) return null;
	return {
		number,
		north
	};
}
/**
* @param {function(number, number, UTMZone): import('../coordinate.js').Coordinate} transformer The transformer.
* @param {UTMZone} zone The UTM zone.
* @return {import('../proj.js').TransformFunction} The transform function.
*/
function makeTransformFunction(transformer, zone) {
	return function(input, output, dimension, stride) {
		var _stride;
		const length = input.length;
		dimension = dimension > 1 ? dimension : 2;
		stride = (_stride = stride) !== null && _stride !== void 0 ? _stride : dimension;
		if (!output) if (dimension > 2) output = input.slice();
		else output = new Array(length);
		for (let i = 0; i < length; i += stride) {
			const x = input[i];
			const y = input[i + 1];
			const coord = transformer(x, y, zone);
			output[i] = coord[0];
			output[i + 1] = coord[1];
		}
		return output;
	};
}
/**
* @param {string} code The projection code.
* @return {import('./Projection.js').default|null} A projection or null if unable to create one.
*/
function makeProjection(code) {
	if (!zoneFromCode(code)) return null;
	return new Projection({
		code,
		units: "m"
	});
}
/**
* @param {import('./Projection.js').default} projection The projection.
* @return {import('../proj.js').Transforms|null} The transforms lookup or null if unable to handle projection.
*/
function makeTransforms(projection) {
	const zone = zoneFromCode(projection.getCode());
	if (!zone) return null;
	return {
		forward: makeTransformFunction(fromLonLat$1, zone),
		inverse: makeTransformFunction(toLonLat, zone)
	};
}
/**
* Get the great circle distance (in meters) between two geographic coordinates.
* @param {Array} c1 Starting coordinate.
* @param {Array} c2 Ending coordinate.
* @param {number} [radius] The sphere radius to use.  Defaults to the Earth's
*     mean radius using the WGS84 ellipsoid.
* @return {number} The great circle distance between the points (in meters).
* @api
*/
function getDistance(c1, c2, radius) {
	radius = radius || 6371008.8;
	const lat1 = toRadians(c1[1]);
	const lat2 = toRadians(c2[1]);
	const deltaLatBy2 = (lat2 - lat1) / 2;
	const deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;
	const a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
	return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
/**
* Returns the spherical area for a list of coordinates.
*
* [Reference](https://trs.jpl.nasa.gov/handle/2014/40409)
* Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
* Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
* Laboratory, Pasadena, CA, June 2007
*
* @param {Array<import("./coordinate.js").Coordinate>} coordinates List of coordinates of a linear
* ring. If the ring is oriented clockwise, the area will be positive,
* otherwise it will be negative.
* @param {number} radius The sphere radius.
* @return {number} Area (in square meters).
*/
function getAreaInternal(coordinates, radius) {
	let area = 0;
	const len = coordinates.length;
	let x1 = coordinates[len - 1][0];
	let y1 = coordinates[len - 1][1];
	for (let i = 0; i < len; i++) {
		const x2 = coordinates[i][0];
		const y2 = coordinates[i][1];
		area += toRadians(x2 - x1) * (2 + Math.sin(toRadians(y1)) + Math.sin(toRadians(y2)));
		x1 = x2;
		y1 = y2;
	}
	return area * radius * radius / 2;
}
/**
* Get the spherical area of a geometry.  This is the area (in meters) assuming
* that polygon edges are segments of great circles on a sphere.
* @param {import("./geom/Geometry.js").default} geometry A geometry.
* @param {SphereMetricOptions} [options] Options for the area
*     calculation.  By default, geometries are assumed to be in 'EPSG:3857'.
*     You can change this by providing a `projection` option.
* @return {number} The spherical area (in square meters).
* @api
*/
function getArea(geometry, options) {
	options = options || {};
	const radius = options.radius || 6371008.8;
	const projection = options.projection || "EPSG:3857";
	const type = geometry.getType();
	if (type !== "GeometryCollection") geometry = geometry.clone().transform(projection, "EPSG:4326");
	let area = 0;
	let coordinates, coords, i, ii, j, jj;
	switch (type) {
		case "Point":
		case "MultiPoint":
		case "LineString":
		case "MultiLineString":
		case "LinearRing": break;
		case "Polygon":
			coordinates = geometry.getCoordinates();
			area = Math.abs(getAreaInternal(coordinates[0], radius));
			for (i = 1, ii = coordinates.length; i < ii; ++i) area -= Math.abs(getAreaInternal(coordinates[i], radius));
			break;
		case "MultiPolygon":
			coordinates = geometry.getCoordinates();
			for (i = 0, ii = coordinates.length; i < ii; ++i) {
				coords = coordinates[i];
				area += Math.abs(getAreaInternal(coords[0], radius));
				for (j = 1, jj = coords.length; j < jj; ++j) area -= Math.abs(getAreaInternal(coords[j], radius));
			}
			break;
		case "GeometryCollection": {
			const geometries = geometry.getGeometries();
			for (i = 0, ii = geometries.length; i < ii; ++i) area += getArea(geometries[i], options);
			break;
		}
		default: throw new Error("Unsupported geometry type: " + type);
	}
	return area;
}
//#endregion
//#region node_modules/ol/proj.js
/**
* @module ol/proj
*/
/**
* The ol/proj module stores:
* a list of {@link module:ol/proj/Projection~Projection}
* objects, one for each projection supported by the application
* a list of transform functions needed to convert coordinates in one projection
* into another.
*
* The static functions are the methods used to maintain these.
* Each transform function can handle not only simple coordinate pairs, but also
* large arrays of coordinates such as vector geometries.
*
* When loaded, the library adds projection objects for EPSG:4326 (WGS84
* geographic coordinates) and EPSG:3857 (Web or Spherical Mercator, as used
* for example by Bing Maps or OpenStreetMap), together with the relevant
* transform functions.
*
* Additional transforms may be added by using the http://proj4js.org/
* library (version 2.2 or later). You can use the full build supplied by
* Proj4js, or create a custom build to support those projections you need; see
* the Proj4js website for how to do this. You also need the Proj4js definitions
* for the required projections. These definitions can be obtained from
* https://spatialreference.org/, and are a JS function, so can be loaded in a
* script tag (as in the examples) or pasted into your application.
*
* After all required projection definitions are added to proj4's registry (by
* using `proj4.defs()`), simply call `register(proj4)` from the `ol/proj/proj4`
* package. Existing transforms are not changed by this function. See
* examples/wms-image-custom-proj for an example of this.
*
* Additional projection definitions can be registered with `proj4.defs()` any
* time. Just make sure to call `register(proj4)` again; for example, with user-supplied data where you don't
* know in advance what projections are needed, you can initially load minimal
* support and then load whichever are requested.
*
* Note that Proj4js does not support projection extents. If you want to add
* one for creating default tile grids, you can add it after the Projection
* object has been created with `setExtent`, for example,
* `get('EPSG:1234').setExtent(extent)`.
*
* In addition to Proj4js support, any transform functions can be added with
* {@link module:ol/proj.addCoordinateTransforms}. To use this, you must first create
* a {@link module:ol/proj/Projection~Projection} object for the new projection and add it with
* {@link module:ol/proj.addProjection}. You can then add the forward and inverse
* functions with {@link module:ol/proj.addCoordinateTransforms}. See
* examples/wms-custom-proj for an example of this.
*
* Note that if no transforms are needed and you only need to define the
* projection, just add a {@link module:ol/proj/Projection~Projection} with
* {@link module:ol/proj.addProjection}. See examples/wms-no-proj for an example of
* this.
*/
/**
* A projection as {@link module:ol/proj/Projection~Projection}, SRS identifier
* string or undefined.
* @typedef {Projection|string|undefined} ProjectionLike
* @api
*/
/**
* @typedef {Object} Transforms
* @property {TransformFunction} forward The forward transform (from geographic).
* @property {TransformFunction} inverse The inverse transform (to geographic).
*/
/**
* @type {Array<function(Projection): Transforms|null>}
*/
var transformFactories = [makeTransforms];
/**
* @type {Array<function(string): Projection|null>}
*/
var projectionFactories = [makeProjection];
var showCoordinateWarning = true;
/**
* @param {boolean} [disable] Disable console info about `useGeographic()`
*/
function disableCoordinateWarning(disable) {
	showCoordinateWarning = !(disable === void 0 ? true : disable);
}
/**
* @param {Array<number>} input Input coordinate array.
* @param {Array<number>} [output] Output array of coordinate values.
* @return {Array<number>} Output coordinate array (new array, same coordinate
*     values).
*/
function cloneTransform(input, output) {
	if (output !== void 0) {
		for (let i = 0, ii = input.length; i < ii; ++i) output[i] = input[i];
		output = output;
	} else output = input.slice();
	return output;
}
/**
* Add a Projection object to the list of supported projections that can be
* looked up by their code.
*
* @param {Projection} projection Projection instance.
* @api
*/
function addProjection(projection) {
	add$1(projection.getCode(), projection);
	add(projection, projection, cloneTransform);
}
/**
* @param {Array<Projection>} projections Projections.
*/
function addProjections(projections) {
	projections.forEach(addProjection);
}
/**
* Fetches a Projection object for the code specified.
*
* @param {ProjectionLike} projectionLike Either a code string which is
*     a combination of authority and identifier such as "EPSG:4326", or an
*     existing projection object, or undefined.
* @return {Projection|null} Projection object, or null if not in list.
* @api
*/
function get(projectionLike) {
	if (!(typeof projectionLike === "string")) return projectionLike;
	const projection = get$2(projectionLike);
	if (projection) return projection;
	for (const makeProjection of projectionFactories) {
		const projection = makeProjection(projectionLike);
		if (projection) return projection;
	}
	return null;
}
/**
* Get the resolution of the point in degrees or distance units.
* For projections with degrees as the unit this will simply return the
* provided resolution. For other projections the point resolution is
* by default estimated by transforming the `point` pixel to EPSG:4326,
* measuring its width and height on the normal sphere,
* and taking the average of the width and height.
* A custom function can be provided for a specific projection, either
* by setting the `getPointResolution` option in the
* {@link module:ol/proj/Projection~Projection} constructor or by using
* {@link module:ol/proj/Projection~Projection#setGetPointResolution} to change an existing
* projection object.
* @param {ProjectionLike} projection The projection.
* @param {number} resolution Nominal resolution in projection units.
* @param {import("./coordinate.js").Coordinate} point Point to find adjusted resolution at.
* @param {import("./proj/Units.js").Units} [units] Units to get the point resolution in.
* Default is the projection's units.
* @return {number} Point resolution.
* @api
*/
function getPointResolution(projection, resolution, point, units) {
	projection = get(projection);
	let pointResolution;
	const getter = projection.getPointResolutionFunc();
	if (getter) {
		pointResolution = getter(resolution, point);
		if (units && units !== projection.getUnits()) {
			const metersPerUnit = projection.getMetersPerUnit();
			if (metersPerUnit) pointResolution = pointResolution * metersPerUnit / METERS_PER_UNIT$1[units];
		}
	} else {
		const projUnits = projection.getUnits();
		if (projUnits == "degrees" && !units || units == "degrees") pointResolution = resolution;
		else {
			const toEPSG4326 = getTransformFromProjections(projection, get("EPSG:4326"));
			if (!toEPSG4326 && projUnits !== "degrees") pointResolution = resolution * projection.getMetersPerUnit();
			else {
				let vertices = [
					point[0] - resolution / 2,
					point[1],
					point[0] + resolution / 2,
					point[1],
					point[0],
					point[1] - resolution / 2,
					point[0],
					point[1] + resolution / 2
				];
				vertices = toEPSG4326(vertices, vertices, 2);
				pointResolution = (getDistance(vertices.slice(0, 2), vertices.slice(2, 4)) + getDistance(vertices.slice(4, 6), vertices.slice(6, 8))) / 2;
			}
			const metersPerUnit = units ? METERS_PER_UNIT$1[units] : projection.getMetersPerUnit();
			if (metersPerUnit !== void 0) pointResolution /= metersPerUnit;
		}
	}
	return pointResolution;
}
/**
* Registers transformation functions that don't alter coordinates. Those allow
* to transform between projections with equal meaning.
*
* @param {Array<Projection>} projections Projections.
* @api
*/
function addEquivalentProjections(projections) {
	addProjections(projections);
	projections.forEach(function(source) {
		projections.forEach(function(destination) {
			if (source !== destination) add(source, destination, cloneTransform);
		});
	});
}
/**
* Registers transformation functions to convert coordinates in any projection
* in projection1 to any projection in projection2.
*
* @param {Array<Projection>} projections1 Projections with equal
*     meaning.
* @param {Array<Projection>} projections2 Projections with equal
*     meaning.
* @param {TransformFunction} forwardTransform Transformation from any
*   projection in projection1 to any projection in projection2.
* @param {TransformFunction} inverseTransform Transform from any projection
*   in projection2 to any projection in projection1..
*/
function addEquivalentTransforms(projections1, projections2, forwardTransform, inverseTransform) {
	projections1.forEach(function(projection1) {
		projections2.forEach(function(projection2) {
			add(projection1, projection2, forwardTransform);
			add(projection2, projection1, inverseTransform);
		});
	});
}
/**
* @param {Projection|string|undefined} projection Projection.
* @param {string} defaultCode Default code.
* @return {Projection} Projection.
*/
function createProjection(projection, defaultCode) {
	if (!projection) return get(defaultCode);
	if (typeof projection === "string") return get(projection);
	return projection;
}
/**
* Creates a {@link module:ol/proj~TransformFunction} from a simple 2D coordinate transform
* function.
* @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} coordTransform Coordinate
*     transform.
* @return {TransformFunction} Transform function.
*/
function createTransformFromCoordinateTransform(coordTransform) {
	return (function(input, output, dimension, stride) {
		var _stride;
		const length = input.length;
		dimension = dimension !== void 0 ? dimension : 2;
		stride = (_stride = stride) !== null && _stride !== void 0 ? _stride : dimension;
		output = output !== void 0 ? output : new Array(length);
		for (let i = 0; i < length; i += stride) {
			const point = coordTransform(input.slice(i, i + dimension));
			const pointLength = point.length;
			for (let j = 0, jj = stride; j < jj; ++j) output[i + j] = j >= pointLength ? input[i + j] : point[j];
		}
		return output;
	});
}
/**
* Registers coordinate transform functions to convert coordinates between the
* source projection and the destination projection.
* The forward and inverse functions convert coordinate pairs; this function
* converts these into the functions used internally which also handle
* extents and coordinate arrays.
*
* @param {ProjectionLike} source Source projection.
* @param {ProjectionLike} destination Destination projection.
* @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} forward The forward transform
*     function (that is, from the source projection to the destination
*     projection) that takes a {@link module:ol/coordinate~Coordinate} as argument and returns
*     the transformed {@link module:ol/coordinate~Coordinate}.
* @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} inverse The inverse transform
*     function (that is, from the destination projection to the source
*     projection) that takes a {@link module:ol/coordinate~Coordinate} as argument and returns
*     the transformed {@link module:ol/coordinate~Coordinate}. If the transform function can only
*     transform less dimensions than the input coordinate, it is supposeed to return a coordinate
*     with only the length it can transform. The other dimensions will be taken unchanged from the
*     source.
* @api
*/
function addCoordinateTransforms(source, destination, forward, inverse) {
	const sourceProj = get(source);
	const destProj = get(destination);
	add(sourceProj, destProj, createTransformFromCoordinateTransform(forward));
	add(destProj, sourceProj, createTransformFromCoordinateTransform(inverse));
}
/**
* Transforms a coordinate from longitude/latitude to a different projection.
* @param {import("./coordinate.js").Coordinate} coordinate Coordinate as longitude and latitude, i.e.
*     an array with longitude as 1st and latitude as 2nd element.
* @param {ProjectionLike} [projection] Target projection. The
*     default is Web Mercator, i.e. 'EPSG:3857'.
* @return {import("./coordinate.js").Coordinate} Coordinate projected to the target projection.
* @api
*/
function fromLonLat(coordinate, projection) {
	disableCoordinateWarning();
	return transform(coordinate, "EPSG:4326", projection !== void 0 ? projection : "EPSG:3857");
}
/**
* Checks if two projections are the same, that is every coordinate in one
* projection does represent the same geographic point as the same coordinate in
* the other projection.
*
* @param {Projection} projection1 Projection 1.
* @param {Projection} projection2 Projection 2.
* @return {boolean} Equivalent.
* @api
*/
function equivalent$1(projection1, projection2) {
	if (projection1 === projection2) return true;
	const equalUnits = projection1.getUnits() === projection2.getUnits();
	if (projection1.getCode() === projection2.getCode()) return equalUnits;
	return getTransformFromProjections(projection1, projection2) === cloneTransform && equalUnits;
}
/**
* Searches in the list of transform functions for the function for converting
* coordinates from the source projection to the destination projection.
*
* @param {Projection} source Source Projection object.
* @param {Projection} destination Destination Projection
*     object.
* @return {TransformFunction|null} Transform function.
*/
function getTransformFromProjections(source, destination) {
	const sourceCode = source.getCode();
	const destinationCode = destination.getCode();
	let transformFunc = get$1(sourceCode, destinationCode);
	if (transformFunc) return transformFunc;
	/**
	* @type {Transforms|null}
	*/
	let sourceTransforms = null;
	/**
	* @type {Transforms|null}
	*/
	let destinationTransforms = null;
	for (const makeTransforms of transformFactories) {
		if (!sourceTransforms) sourceTransforms = makeTransforms(source);
		if (!destinationTransforms) destinationTransforms = makeTransforms(destination);
	}
	if (!sourceTransforms && !destinationTransforms) return null;
	const intermediateCode = "EPSG:4326";
	if (!destinationTransforms) {
		const toDestination = get$1(intermediateCode, destinationCode);
		if (toDestination) transformFunc = composeTransformFuncs(sourceTransforms.inverse, toDestination);
	} else if (!sourceTransforms) {
		const fromSource = get$1(sourceCode, intermediateCode);
		if (fromSource) transformFunc = composeTransformFuncs(fromSource, destinationTransforms.forward);
	} else transformFunc = composeTransformFuncs(sourceTransforms.inverse, destinationTransforms.forward);
	if (transformFunc) {
		addProjection(source);
		addProjection(destination);
		add(source, destination, transformFunc);
	}
	return transformFunc;
}
/**
* @param {TransformFunction} t1 The first transform function.
* @param {TransformFunction} t2 The second transform function.
* @return {TransformFunction} The composed transform function.
*/
function composeTransformFuncs(t1, t2) {
	return function(input, output, dimensions, stride) {
		output = t1(input, output, dimensions, stride);
		return t2(output, output, dimensions, stride);
	};
}
/**
* Given the projection-like objects, searches for a transformation
* function to convert a coordinates array from the source projection to the
* destination projection.
*
* @param {ProjectionLike} source Source.
* @param {ProjectionLike} destination Destination.
* @return {TransformFunction} Transform function.
* @api
*/
function getTransform(source, destination) {
	return getTransformFromProjections(get(source), get(destination));
}
/**
* Transforms a coordinate from source projection to destination projection.
* This returns a new coordinate (and does not modify the original). If there
* is no available transform between the two projection, the function will throw
* an error.
*
* See {@link module:ol/proj.transformExtent} for extent transformation.
* See the transform method of {@link module:ol/geom/Geometry~Geometry} and its
* subclasses for geometry transforms.
*
* @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
* @param {ProjectionLike} source Source projection-like.
* @param {ProjectionLike} destination Destination projection-like.
* @return {import("./coordinate.js").Coordinate} Coordinate.
* @api
*/
function transform(coordinate, source, destination) {
	const transformFunc = getTransform(source, destination);
	if (!transformFunc) {
		const sourceCode = get(source).getCode();
		const destinationCode = get(destination).getCode();
		throw new Error(`No transform available between ${sourceCode} and ${destinationCode}`);
	}
	return transformFunc(coordinate, void 0, coordinate.length);
}
/**
* Transforms an extent from source projection to destination projection.  This
* returns a new extent (and does not modify the original).
*
* @param {import("./extent.js").Extent} extent The extent to transform.
* @param {ProjectionLike} source Source projection-like.
* @param {ProjectionLike} destination Destination projection-like.
* @param {number} [stops] Number of stops per side used for the transform.
* By default only the corners are used.
* @return {import("./extent.js").Extent} The transformed extent.
* @api
*/
function transformExtent(extent, source, destination, stops) {
	return applyTransform(extent, getTransform(source, destination), void 0, stops);
}
/**
* @type {Projection|null}
*/
var userProjection = null;
/**
* Get the projection for coordinates supplied from and returned by API methods.
* @return {Projection|null} The user projection (or null if not set).
* @api
*/
function getUserProjection() {
	return userProjection;
}
/**
* Return a coordinate transformed into the user projection.  If no user projection
* is set, the original coordinate is returned.
* @param {Array<number>} coordinate Input coordinate.
* @param {ProjectionLike} sourceProjection The input coordinate projection.
* @return {Array<number>} The input coordinate in the user projection.
*/
function toUserCoordinate(coordinate, sourceProjection) {
	if (!userProjection) return coordinate;
	return transform(coordinate, sourceProjection, userProjection);
}
/**
* Return a coordinate transformed from the user projection.  If no user projection
* is set, the original coordinate is returned.
* @param {Array<number>} coordinate Input coordinate.
* @param {ProjectionLike} destProjection The destination projection.
* @return {Array<number>} The input coordinate transformed.
*/
function fromUserCoordinate(coordinate, destProjection) {
	if (!userProjection) {
		if (showCoordinateWarning && !equals$1(coordinate, [0, 0]) && coordinate[0] >= -180 && coordinate[0] <= 180 && coordinate[1] >= -90 && coordinate[1] <= 90) {
			showCoordinateWarning = false;
			warn("Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates.");
		}
		return coordinate;
	}
	return transform(coordinate, userProjection, destProjection);
}
/**
* Return an extent transformed into the user projection.  If no user projection
* is set, the original extent is returned.
* @param {import("./extent.js").Extent} extent Input extent.
* @param {ProjectionLike} sourceProjection The input extent projection.
* @return {import("./extent.js").Extent} The input extent in the user projection.
*/
function toUserExtent(extent, sourceProjection) {
	if (!userProjection) return extent;
	return transformExtent(extent, sourceProjection, userProjection);
}
/**
* Return an extent transformed from the user projection.  If no user projection
* is set, the original extent is returned.
* @param {import("./extent.js").Extent} extent Input extent.
* @param {ProjectionLike} destProjection The destination projection.
* @return {import("./extent.js").Extent} The input extent transformed.
*/
function fromUserExtent(extent, destProjection) {
	if (!userProjection) return extent;
	return transformExtent(extent, userProjection, destProjection);
}
/**
* Return the resolution in user projection units per pixel. If no user projection
* is set, or source or user projection are missing units, the original resolution
* is returned.
* @param {number} resolution Resolution in input projection units per pixel.
* @param {ProjectionLike} sourceProjection The input projection.
* @return {number} Resolution in user projection units per pixel.
*/
function toUserResolution(resolution, sourceProjection) {
	if (!userProjection) return resolution;
	const sourceMetersPerUnit = get(sourceProjection).getMetersPerUnit();
	const userMetersPerUnit = userProjection.getMetersPerUnit();
	return sourceMetersPerUnit && userMetersPerUnit ? resolution * sourceMetersPerUnit / userMetersPerUnit : resolution;
}
/**
* Creates a safe coordinate transform function from a coordinate transform function.
* "Safe" means that it can handle wrapping of x-coordinates for global projections,
* and that coordinates exceeding the source projection validity extent's range will be
* clamped to the validity range.
* @param {Projection} sourceProj Source projection.
* @param {Projection} destProj Destination projection.
* @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} transform Transform function (source to destination).
* @return {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} Safe transform function (source to destination).
*/
function createSafeCoordinateTransform(sourceProj, destProj, transform) {
	return function(coord) {
		let transformed, worldsAway;
		if (sourceProj.canWrapX()) {
			const sourceExtent = sourceProj.getExtent();
			const sourceExtentWidth = getWidth(sourceExtent);
			coord = coord.slice(0);
			worldsAway = getWorldsAway(coord, sourceProj, sourceExtentWidth);
			if (worldsAway) coord[0] = coord[0] - worldsAway * sourceExtentWidth;
			coord[0] = clamp(coord[0], sourceExtent[0], sourceExtent[2]);
			coord[1] = clamp(coord[1], sourceExtent[1], sourceExtent[3]);
			transformed = transform(coord);
		} else transformed = transform(coord);
		if (worldsAway && destProj.canWrapX()) transformed[0] += worldsAway * getWidth(destProj.getExtent());
		return transformed;
	};
}
/**
* Add transforms to and from EPSG:4326 and EPSG:3857.  This function is called
* by when this module is executed and should only need to be called again after
* `clearAllProjections()` is called (e.g. in tests).
*/
function addCommon() {
	addEquivalentProjections(PROJECTIONS$1);
	addEquivalentProjections(PROJECTIONS);
	addEquivalentTransforms(PROJECTIONS, PROJECTIONS$1, fromEPSG4326, toEPSG4326);
}
addCommon();
//#endregion
//#region node_modules/ol/proj/proj4.js
/**
* @module ol/proj/proj4
*/
/**
* @type {import("proj4")|null}
*/
var registered = null;
/**
* Make projections defined in proj4 (with `proj4.defs()`) available in
* OpenLayers. Requires proj4 >= 2.8.0.
*
* This function should be called whenever changes are made to the proj4
* registry, e.g. after calling `proj4.defs()`. Existing transforms will not be
* modified by this function.
*
* @param {import("proj4")} proj4 Proj4.
* @api
*/
function register(proj4) {
	registered = proj4;
	const projCodes = Object.keys(proj4.defs);
	const len = projCodes.length;
	let i, j;
	for (i = 0; i < len; ++i) {
		const code = projCodes[i];
		if (!get$2(code)) {
			const def = proj4.defs(code);
			let units = def.units;
			if (!units && def.projName === "longlat") units = "degrees";
			addProjection(new Projection({
				code,
				axisOrientation: def.axis,
				metersPerUnit: def.to_meter,
				units
			}));
		}
	}
	for (i = 0; i < len; ++i) {
		const code1 = projCodes[i];
		const proj1 = get$2(code1);
		for (j = 0; j < len; ++j) {
			const code2 = projCodes[j];
			const proj2 = get$2(code2);
			if (!get$1(code1, code2)) if (proj4.defs[code1] === proj4.defs[code2]) addEquivalentProjections([proj1, proj2]);
			else {
				const transform = proj4(code1, code2);
				addCoordinateTransforms(proj1, proj2, createSafeCoordinateTransform(proj1, proj2, transform.forward), createSafeCoordinateTransform(proj2, proj1, transform.inverse));
			}
		}
	}
}
/**
* @param {string} code The projection code.
* @return {Promise<string>} The WKT definition.
*/
var projLookup = /* @__PURE__ */ function() {
	var _ref = _asyncToGenerator(function* (code) {
		if (typeof code !== "string" || !code.includes(":")) throw new Error("Invalid code");
		const [authority, num] = code.toLowerCase().split(":", 2);
		const response = yield fetch(`https://spatialreference.org/ref/${authority}/${num}/ogcwkt/`);
		if (!response.ok) throw new Error(`Unexpected response from spatialreference.org: ${response.status}`);
		return response.text();
	});
	return function projLookup(_x) {
		return _ref.apply(this, arguments);
	};
}();
/**
* Get a projection from a projection code (i.e., authority:number).
* This function fetches the projection definition from the
* https://spatialreference.org website, registers this definition for use with
* proj4, and returns a configured projection.  You must call import proj4 and
* call {@link module:ol/proj/proj4.register} before using this function.
*
* If the projection definition is already registered with proj4, it will not
* be fetched again (so it is ok to call this function multiple times with the
* same code).
*
* @param {string} code The projection code (e.g., 'EPSG:4326' or 'OGC:CRS84').
* @return {Promise<Projection>} The projection.
* @api
*/
function fromProjectionCode(_x2) {
	return _fromProjectionCode.apply(this, arguments);
}
function _fromProjectionCode() {
	_fromProjectionCode = _asyncToGenerator(function* (code) {
		const proj4 = registered;
		if (!proj4) throw new Error("Proj4 must be registered first with register(proj4)");
		if (proj4.defs(code)) return get$2(code);
		proj4.defs(code, yield projLookup(code));
		register(proj4);
		return get$2(code);
	});
	return _fromProjectionCode.apply(this, arguments);
}
//#endregion
//#region \0@oxc-project+runtime@0.132.0/helpers/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (e.includes(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var init_objectWithoutPropertiesLoose = __esmMin((() => {}));
//#endregion
//#region \0@oxc-project+runtime@0.132.0/helpers/objectWithoutProperties.js
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var s = Object.getOwnPropertySymbols(e);
		for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
var init_objectWithoutProperties = __esmMin((() => {
	init_objectWithoutPropertiesLoose();
}));
//#endregion
//#region node_modules/ol/util.js
init_objectWithoutProperties();
/**
* @module ol/util
*/
/**
* @return {never} Any return.
*/
function abstract() {
	throw new Error("Unimplemented abstract method.");
}
/**
* Counter for getUid.
* @type {number}
* @private
*/
var uidCounter_ = 0;
/**
* Gets a unique ID for an object. This mutates the object so that further calls
* with the same object as a parameter returns the same value. Unique IDs are generated
* as a strictly increasing sequence. Adapted from goog.getUid.
*
* @param {Object} obj The object to get the unique ID for.
* @return {string} The unique ID for the object.
* @api
*/
function getUid(obj) {
	return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}
//#endregion
//#region node_modules/ol/ObjectEventType.js
/**
* @module ol/ObjectEventType
*/
/**
* @enum {string}
*/
var ObjectEventType_default = { 
/**
* Triggered when a property is changed.
* @event module:ol/Object.ObjectEvent#propertychange
* @api
*/
PROPERTYCHANGE: "propertychange" };
/**
* @typedef {'propertychange'} Types
*/
//#endregion
//#region node_modules/ol/events.js
/**
* @module ol/events
*/
/**
* Key to use with {@link module:ol/Observable.unByKey}.
* @typedef {Object} EventsKey
* @property {ListenerFunction} listener Listener.
* @property {import("./events/Target.js").EventTargetLike} target Target.
* @property {string} type Type.
* @api
*/
/**
* Listener function. This function is called with an event object as argument.
* When the function returns `false`, event propagation will stop.
*
* @typedef {function((Event|import("./events/Event.js").default)): (void|boolean)} ListenerFunction
* @api
*/
/**
* @typedef {Object} ListenerObject
* @property {ListenerFunction} handleEvent HandleEvent listener function.
*/
/**
* @typedef {ListenerFunction|ListenerObject} Listener
*/
/**
* Registers an event listener on an event target. Inspired by
* https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
*
* This function efficiently binds a `listener` to a `this` object, and returns
* a key for use with {@link module:ol/events.unlistenByKey}.
*
* @param {import("./events/Target.js").EventTargetLike} target Event target.
* @param {string} type Event type.
* @param {ListenerFunction} listener Listener.
* @param {Object} [thisArg] Object referenced by the `this` keyword in the
*     listener. Default is the `target`.
* @param {boolean} [once] If true, add the listener as one-off listener.
* @return {EventsKey} Unique key for the listener.
*/
function listen(target, type, listener, thisArg, once) {
	if (once) {
		const originalListener = listener;
		/**
		* @param {Event|import('./events/Event.js').default} event The event
		* @return {void|boolean} When the function returns `false`, event propagation will stop.
		* @this {typeof target}
		*/
		listener = function(event) {
			target.removeEventListener(type, listener);
			return originalListener.call(thisArg !== null && thisArg !== void 0 ? thisArg : this, event);
		};
	} else if (thisArg && thisArg !== target) listener = listener.bind(thisArg);
	const eventsKey = {
		target,
		type,
		listener
	};
	target.addEventListener(type, listener);
	return eventsKey;
}
/**
* Registers a one-off event listener on an event target. Inspired by
* https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
*
* This function efficiently binds a `listener` as self-unregistering listener
* to a `this` object, and returns a key for use with
* {@link module:ol/events.unlistenByKey} in case the listener needs to be
* unregistered before it is called.
*
* When {@link module:ol/events.listen} is called with the same arguments after this
* function, the self-unregistering listener will be turned into a permanent
* listener.
*
* @param {import("./events/Target.js").EventTargetLike} target Event target.
* @param {string} type Event type.
* @param {ListenerFunction} listener Listener.
* @param {Object} [thisArg] Object referenced by the `this` keyword in the
*     listener. Default is the `target`.
* @return {EventsKey} Key for unlistenByKey.
*/
function listenOnce(target, type, listener, thisArg) {
	return listen(target, type, listener, thisArg, true);
}
/**
* Unregisters event listeners on an event target. Inspired by
* https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
*
* The argument passed to this function is the key returned from
* {@link module:ol/events.listen} or {@link module:ol/events.listenOnce}.
*
* @param {EventsKey} key The key.
*/
function unlistenByKey(key) {
	if (key && key.target) {
		key.target.removeEventListener(key.type, key.listener);
		clear(key);
	}
}
//#endregion
//#region node_modules/ol/events/EventType.js
/**
* @module ol/events/EventType
*/
/**
* @enum {string}
* @const
*/
var EventType_default = {
	/**
	* Generic change event. Triggered when the revision counter is increased.
	* @event module:ol/events/Event~BaseEvent#change
	* @api
	*/
	CHANGE: "change",
	/**
	* Generic error event. Triggered when an error occurs.
	* @event module:ol/events/Event~BaseEvent#error
	* @api
	*/
	ERROR: "error",
	BLUR: "blur",
	CLEAR: "clear",
	CONTEXTMENU: "contextmenu",
	CLICK: "click",
	DBLCLICK: "dblclick",
	DRAGENTER: "dragenter",
	DRAGOVER: "dragover",
	DROP: "drop",
	FOCUS: "focus",
	KEYDOWN: "keydown",
	KEYPRESS: "keypress",
	LOAD: "load",
	RESIZE: "resize",
	TOUCHMOVE: "touchmove",
	WHEEL: "wheel"
};
//#endregion
//#region node_modules/ol/Disposable.js
/**
* @module ol/Disposable
*/
/**
* @classdesc
* Objects that need to clean up after themselves.
*/
var Disposable = class {
	constructor() {
		/**
		* The object has already been disposed.
		* @type {boolean}
		* @protected
		*/
		this.disposed = false;
	}
	/**
	* Clean up.
	*/
	dispose() {
		if (!this.disposed) {
			this.disposed = true;
			this.disposeInternal();
		}
	}
	/**
	* Extension point for disposable objects.
	* @protected
	*/
	disposeInternal() {}
};
//#endregion
//#region node_modules/ol/array.js
/**
* @module ol/array
*/
/**
* Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
* https://github.com/darkskyapp/binary-search
*
* @param {Array<*>} haystack Items to search through.
* @param {*} needle The item to look for.
* @param {Function} [comparator] Comparator function.
* @return {number} The index of the item if found, -1 if not.
*/
function binarySearch(haystack, needle, comparator) {
	let mid, cmp;
	comparator = comparator || ascending;
	let low = 0;
	let high = haystack.length;
	let found = false;
	while (low < high) {
		mid = low + (high - low >> 1);
		cmp = +comparator(haystack[mid], needle);
		if (cmp < 0) low = mid + 1;
		else {
			high = mid;
			found = !cmp;
		}
	}
	return found ? low : ~low;
}
/**
* Compare function sorting arrays in ascending order.  Safe to use for numeric values.
* @param {*} a The first object to be compared.
* @param {*} b The second object to be compared.
* @return {number} A negative number, zero, or a positive number as the first
*     argument is less than, equal to, or greater than the second.
*/
function ascending(a, b) {
	return a > b ? 1 : a < b ? -1 : 0;
}
/**
* Compare function sorting arrays in descending order.  Safe to use for numeric values.
* @param {*} a The first object to be compared.
* @param {*} b The second object to be compared.
* @return {number} A negative number, zero, or a positive number as the first
*     argument is greater than, equal to, or less than the second.
*/
function descending(a, b) {
	return a < b ? 1 : a > b ? -1 : 0;
}
/**
* {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution} can use a function
* of this type to determine which nearest resolution to use.
*
* This function takes a `{number}` representing a value between two array entries,
* a `{number}` representing the value of the nearest higher entry and
* a `{number}` representing the value of the nearest lower entry
* as arguments and returns a `{number}`. If a negative number or zero is returned
* the lower value will be used, if a positive number is returned the higher value
* will be used.
* @typedef {function(number, number, number): number} NearestDirectionFunction
* @api
*/
/**
* @param {Array<number>} arr Array in descending order.
* @param {number} target Target.
* @param {number|NearestDirectionFunction} direction
*    0 means return the nearest,
*    > 0 means return the largest nearest,
*    < 0 means return the smallest nearest.
* @return {number} Index.
*/
function linearFindNearest(arr, target, direction) {
	if (arr[0] <= target) return 0;
	const n = arr.length;
	if (target <= arr[n - 1]) return n - 1;
	if (typeof direction === "function") {
		for (let i = 1; i < n; ++i) {
			const candidate = arr[i];
			if (candidate === target) return i;
			if (candidate < target) {
				if (direction(target, arr[i - 1], candidate) > 0) return i - 1;
				return i;
			}
		}
		return n - 1;
	}
	if (direction > 0) {
		for (let i = 1; i < n; ++i) if (arr[i] < target) return i - 1;
		return n - 1;
	}
	if (direction < 0) {
		for (let i = 1; i < n; ++i) if (arr[i] <= target) return i;
		return n - 1;
	}
	for (let i = 1; i < n; ++i) {
		if (arr[i] == target) return i;
		if (arr[i] < target) {
			if (arr[i - 1] - target < target - arr[i]) return i - 1;
			return i;
		}
	}
	return n - 1;
}
/**
* @param {Array<*>} arr Array.
* @param {number} begin Begin index.
* @param {number} end End index.
*/
function reverseSubArray(arr, begin, end) {
	while (begin < end) {
		const tmp = arr[begin];
		arr[begin] = arr[end];
		arr[end] = tmp;
		++begin;
		--end;
	}
}
/**
* @param {Array<VALUE>} arr The array to modify.
* @param {!Array<VALUE>|VALUE} data The elements or arrays of elements to add to arr.
* @template VALUE
*/
function extend(arr, data) {
	const extension = Array.isArray(data) ? data : [data];
	const length = extension.length;
	for (let i = 0; i < length; i++) arr[arr.length] = extension[i];
}
/**
* @param {Array<any>|Uint8ClampedArray} arr1 The first array to compare.
* @param {Array<any>|Uint8ClampedArray} arr2 The second array to compare.
* @return {boolean} Whether the two arrays are equal.
*/
function equals(arr1, arr2) {
	const len1 = arr1.length;
	if (len1 !== arr2.length) return false;
	for (let i = 0; i < len1; i++) if (arr1[i] !== arr2[i]) return false;
	return true;
}
/**
* @param {Array<*>} arr The array to test.
* @param {Function} [func] Comparison function.
* @param {boolean} [strict] Strictly sorted (default false).
* @return {boolean} Return index.
*/
function isSorted(arr, func, strict) {
	const compare = func || ascending;
	return arr.every(function(currentVal, index) {
		if (index === 0) return true;
		const res = compare(arr[index - 1], currentVal);
		return !(res > 0 || strict && res === 0);
	});
}
//#endregion
//#region node_modules/ol/functions.js
/**
* @module ol/functions
*/
/**
* Always returns true.
* @return {boolean} true.
*/
function TRUE() {
	return true;
}
/**
* Always returns false.
* @return {boolean} false.
*/
function FALSE() {
	return false;
}
/**
* A reusable function, used e.g. as a default for callbacks.
*
* @return {void} Nothing.
*/
function VOID() {}
/**
* Wrap a function in another function that remembers the last return.  If the
* returned function is called twice in a row with the same arguments and the same
* this object, it will return the value from the first call in the second call.
*
* @param {function(...any): ReturnType} fn The function to memoize.
* @return {function(...any): ReturnType} The memoized function.
* @template ReturnType
*/
function memoizeOne(fn) {
	/** @type {ReturnType} */
	let lastResult;
	/** @type {Array<any>|undefined} */
	let lastArgs;
	let lastThis;
	/**
	* @this {*} Only need to know if `this` changed, don't care what type
	* @return {ReturnType} Memoized value
	*/
	return function() {
		const nextArgs = Array.prototype.slice.call(arguments);
		if (!lastArgs || this !== lastThis || !equals(nextArgs, lastArgs)) {
			lastThis = this;
			lastArgs = nextArgs;
			lastResult = fn.apply(this, arguments);
		}
		return lastResult;
	};
}
/**
* @template T
* @param {function(): (T | Promise<T>)} getter A function that returns a value or a promise for a value.
* @return {Promise<T>} A promise for the value.
*/
function toPromise(getter) {
	function promiseGetter() {
		let value;
		try {
			value = getter();
		} catch (err) {
			return Promise.reject(err);
		}
		if (value instanceof Promise) return value;
		return Promise.resolve(value);
	}
	return promiseGetter();
}
//#endregion
//#region node_modules/ol/events/Event.js
/**
* @module ol/events/Event
*/
/**
* @classdesc
* Stripped down implementation of the W3C DOM Level 2 Event interface.
* See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
*
* This implementation only provides `type` and `target` properties, and
* `stopPropagation` and `preventDefault` methods. It is meant as base class
* for higher level events defined in the library, and works with
* {@link module:ol/events/Target~Target}.
*/
var BaseEvent = class {
	/**
	* @param {string} type Type.
	*/
	constructor(type) {
		/**
		* @type {boolean}
		*/
		this.propagationStopped;
		/**
		* @type {boolean}
		*/
		this.defaultPrevented;
		/**
		* The event type.
		* @type {string}
		* @api
		*/
		this.type = type;
		/**
		* The event target.
		* @type {Object}
		* @api
		*/
		this.target = null;
	}
	/**
	* Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
	* will be fired.
	* @api
	*/
	preventDefault() {
		this.defaultPrevented = true;
	}
	/**
	* Stop event propagation.
	* @api
	*/
	stopPropagation() {
		this.propagationStopped = true;
	}
};
//#endregion
//#region node_modules/ol/events/Target.js
/**
* @module ol/events/Target
*/
/**
* @typedef {EventTarget|Target} EventTargetLike
*/
/**
* @classdesc
* A simplified implementation of the W3C DOM Level 2 EventTarget interface.
* See https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget.
*
* There are two important simplifications compared to the specification:
*
* 1. The handling of `useCapture` in `addEventListener` and
*    `removeEventListener`. There is no real capture model.
* 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
*    There is no event target hierarchy. When a listener calls
*    `stopPropagation` or `preventDefault` on an event object, it means that no
*    more listeners after this one will be called. Same as when the listener
*    returns false.
*/
var Target = class extends Disposable {
	/**
	* @param {*} [target] Default event target for dispatched events.
	*/
	constructor(target) {
		super();
		/**
		* @private
		* @type {*}
		*/
		this.eventTarget_ = target;
		/**
		* @private
		* @type {Object<string, number>|null}
		*/
		this.pendingRemovals_ = null;
		/**
		* @private
		* @type {Object<string, number>|null}
		*/
		this.dispatching_ = null;
		/**
		* @private
		* @type {Object<string, Array<import("../events.js").Listener>>|null}
		*/
		this.listeners_ = null;
	}
	/**
	* @param {string} type Type.
	* @param {import("../events.js").Listener} listener Listener.
	*/
	addEventListener(type, listener) {
		if (!type || !listener) return;
		const listeners = this.listeners_ || (this.listeners_ = {});
		const listenersForType = listeners[type] || (listeners[type] = []);
		if (!listenersForType.includes(listener)) listenersForType.push(listener);
	}
	/**
	* Dispatches an event and calls all listeners listening for events
	* of this type. The event parameter can either be a string or an
	* Object with a `type` property.
	*
	* @param {import("./Event.js").default|string} event Event object.
	* @return {boolean|undefined} `false` if anyone called preventDefault on the
	*     event object or if any of the listeners returned false.
	* @api
	*/
	dispatchEvent(event) {
		const isString = typeof event === "string";
		const type = isString ? event : event.type;
		const listeners = this.listeners_ && this.listeners_[type];
		if (!listeners) return;
		const evt = isString ? new BaseEvent(event) : event;
		if (!evt.target) evt.target = this.eventTarget_ || this;
		const dispatching = this.dispatching_ || (this.dispatching_ = {});
		const pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});
		if (!(type in dispatching)) {
			dispatching[type] = 0;
			pendingRemovals[type] = 0;
		}
		++dispatching[type];
		let propagate;
		for (let i = 0, ii = listeners.length; i < ii; ++i) {
			if ("handleEvent" in listeners[i]) propagate = listeners[i].handleEvent(evt);
			else propagate = listeners[i].call(this, evt);
			if (propagate === false || evt.propagationStopped) {
				propagate = false;
				break;
			}
		}
		if (--dispatching[type] === 0) {
			let pr = pendingRemovals[type];
			delete pendingRemovals[type];
			while (pr--) this.removeEventListener(type, VOID);
			delete dispatching[type];
		}
		return propagate;
	}
	/**
	* Clean up.
	* @override
	*/
	disposeInternal() {
		this.listeners_ && clear(this.listeners_);
	}
	/**
	* Get the listeners for a specified event type. Listeners are returned in the
	* order that they will be called in.
	*
	* @param {string} type Type.
	* @return {Array<import("../events.js").Listener>|undefined} Listeners.
	*/
	getListeners(type) {
		return this.listeners_ && this.listeners_[type] || void 0;
	}
	/**
	* @param {string} [type] Type. If not provided,
	*     `true` will be returned if this event target has any listeners.
	* @return {boolean} Has listeners.
	*/
	hasListener(type) {
		if (!this.listeners_) return false;
		return type ? type in this.listeners_ : Object.keys(this.listeners_).length > 0;
	}
	/**
	* @param {string} type Type.
	* @param {import("../events.js").Listener} listener Listener.
	*/
	removeEventListener(type, listener) {
		if (!this.listeners_) return;
		const listeners = this.listeners_[type];
		if (!listeners) return;
		const index = listeners.indexOf(listener);
		if (index !== -1) if (this.pendingRemovals_ && type in this.pendingRemovals_) {
			listeners[index] = VOID;
			++this.pendingRemovals_[type];
		} else {
			listeners.splice(index, 1);
			if (listeners.length === 0) delete this.listeners_[type];
		}
	}
};
//#endregion
//#region node_modules/ol/Observable.js
/**
* @module ol/Observable
*/
/***
* @template {string} Type
* @template {Event|import("./events/Event.js").default} EventClass
* @template Return
* @typedef {(type: Type, listener: (event: EventClass) => ?) => Return} OnSignature
*/
/***
* @template {string} Type
* @template Return
* @typedef {(type: Type[], listener: (event: Event|import("./events/Event.js").default) => ?) => Return extends void ? void : Return[]} CombinedOnSignature
*/
/**
* @typedef {'change'|'error'} EventTypes
*/
/***
* @template Return
* @typedef {OnSignature<EventTypes, import("./events/Event.js").default, Return> & CombinedOnSignature<EventTypes, Return>} ObservableOnSignature
*/
/**
* @classdesc
* Abstract base class; normally only used for creating subclasses and not
* instantiated in apps.
* An event target providing convenient methods for listener registration
* and unregistration. A generic `change` event is always available through
* {@link module:ol/Observable~Observable#changed}.
*
* @fires import("./events/Event.js").default
* @api
*/
var Observable = class extends Target {
	constructor() {
		super();
		this.on = this.onInternal;
		this.once = this.onceInternal;
		this.un = this.unInternal;
		/**
		* @private
		* @type {number}
		*/
		this.revision_ = 0;
	}
	/**
	* Increases the revision counter and dispatches a 'change' event.
	* @api
	*/
	changed() {
		++this.revision_;
		this.dispatchEvent(EventType_default.CHANGE);
	}
	/**
	* Get the version number for this object.  Each time the object is modified,
	* its version number will be incremented.
	* @return {number} Revision.
	* @api
	*/
	getRevision() {
		return this.revision_;
	}
	/**
	* @param {string|Array<string>} type Type.
	* @param {function((Event|import("./events/Event.js").default)): ?} listener Listener.
	* @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
	* @protected
	*/
	onInternal(type, listener) {
		if (Array.isArray(type)) {
			const len = type.length;
			const keys = new Array(len);
			for (let i = 0; i < len; ++i) keys[i] = listen(this, type[i], listener);
			return keys;
		}
		return listen(this, type, listener);
	}
	/**
	* @param {string|Array<string>} type Type.
	* @param {function((Event|import("./events/Event.js").default)): ?} listener Listener.
	* @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
	* @protected
	*/
	onceInternal(type, listener) {
		let key;
		if (Array.isArray(type)) {
			const len = type.length;
			key = new Array(len);
			for (let i = 0; i < len; ++i) key[i] = listenOnce(this, type[i], listener);
		} else key = listenOnce(this, type, listener);
		/** @type {Object} */ listener.ol_key = key;
		return key;
	}
	/**
	* Unlisten for a certain type of event.
	* @param {string|Array<string>} type Type.
	* @param {function((Event|import("./events/Event.js").default)): ?} listener Listener.
	* @protected
	*/
	unInternal(type, listener) {
		const key = listener.ol_key;
		if (key) unByKey(key);
		else if (Array.isArray(type)) for (let i = 0, ii = type.length; i < ii; ++i) this.removeEventListener(type[i], listener);
		else this.removeEventListener(type, listener);
	}
};
/**
* Listen for a certain type of event.
* @function
* @param {string|Array<string>} type The event type or array of event types.
* @param {function((Event|import("./events/Event.js").default)): ?} listener The listener function.
* @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
*     called with an array of event types as the first argument, the return
*     will be an array of keys.
* @api
*/
Observable.prototype.on;
/**
* Listen once for a certain type of event.
* @function
* @param {string|Array<string>} type The event type or array of event types.
* @param {function((Event|import("./events/Event.js").default)): ?} listener The listener function.
* @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
*     called with an array of event types as the first argument, the return
*     will be an array of keys.
* @api
*/
Observable.prototype.once;
/**
* Unlisten for a certain type of event.
* @function
* @param {string|Array<string>} type The event type or array of event types.
* @param {function((Event|import("./events/Event.js").default)): ?} listener The listener function.
* @api
*/
Observable.prototype.un;
/**
* Removes an event listener using the key returned by `on()` or `once()`.
* @param {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} key The key returned by `on()`
*     or `once()` (or an array of keys).
* @api
*/
function unByKey(key) {
	if (Array.isArray(key)) for (let i = 0, ii = key.length; i < ii; ++i) unlistenByKey(key[i]);
	else unlistenByKey(key);
}
//#endregion
//#region node_modules/ol/Object.js
/**
* @module ol/Object
*/
/**
* @classdesc
* Events emitted by {@link module:ol/Object~BaseObject} instances are instances of this type.
*/
var ObjectEvent = class extends BaseEvent {
	/**
	* @param {string} type The event type.
	* @param {string} key The property name.
	* @param {*} oldValue The old value for `key`.
	*/
	constructor(type, key, oldValue) {
		super(type);
		/**
		* The name of the property whose value is changing.
		* @type {string}
		* @api
		*/
		this.key = key;
		/**
		* The old value. To get the new value use `e.target.get(e.key)` where
		* `e` is the event object.
		* @type {*}
		* @api
		*/
		this.oldValue = oldValue;
	}
};
/***
* @template Return
* @typedef {import("./Observable.js").OnSignature<import("./Observable.js").EventTypes, import("./events/Event.js").default, Return> &
*    import("./Observable.js").OnSignature<import("./ObjectEventType.js").Types, ObjectEvent, Return> &
*    import("./Observable.js").CombinedOnSignature<import("./Observable.js").EventTypes|import("./ObjectEventType.js").Types, Return>} ObjectOnSignature
*/
/**
* @classdesc
* Abstract base class; normally only used for creating subclasses and not
* instantiated in apps.
* Most non-trivial classes inherit from this.
*
* This extends {@link module:ol/Observable~Observable} with observable
* properties, where each property is observable as well as the object as a
* whole.
*
* Classes that inherit from this have pre-defined properties, to which you can
* add your owns. The pre-defined properties are listed in this documentation as
* 'Observable Properties', and have their own accessors; for example,
* {@link module:ol/Map~Map} has a `target` property, accessed with
* `getTarget()` and changed with `setTarget()`. Not all properties are however
* settable. There are also general-purpose accessors `get()` and `set()`. For
* example, `get('target')` is equivalent to `getTarget()`.
*
* The `set` accessors trigger a change event, and you can monitor this by
* registering a listener. For example, {@link module:ol/View~View} has a
* `center` property, so `view.on('change:center', function(evt) {...});` would
* call the function whenever the value of the center property changes. Within
* the function, `evt.target` would be the view, so `evt.target.getCenter()`
* would return the new center.
*
* You can add your own observable properties with
* `object.set('prop', 'value')`, and retrieve that with `object.get('prop')`.
* You can listen for changes on that property value with
* `object.on('change:prop', listener)`. You can get a list of all
* properties with {@link module:ol/Object~BaseObject#getProperties}.
*
* Note that the observable properties are separate from standard JS properties.
* You can, for example, give your map object a title with
* `map.title='New title'` and with `map.set('title', 'Another title')`. The
* first will be a `hasOwnProperty`; the second will appear in
* `getProperties()`. Only the second is observable.
*
* Properties can be deleted by using the unset method. E.g.
* object.unset('foo').
*
* @fires ObjectEvent
* @template {Object<string, *>} [Properties=Object<string, *>]
* @api
*/
var BaseObject = class extends Observable {
	/**
	* @param {NoInfer<Properties>} [values] An object with key-value pairs.
	*/
	constructor(values) {
		super();
		/***
		* @type {ObjectOnSignature<import("./events.js").EventsKey>}
		*/
		this.on;
		/***
		* @type {ObjectOnSignature<import("./events.js").EventsKey>}
		*/
		this.once;
		/***
		* @type {ObjectOnSignature<void>}
		*/
		this.un;
		getUid(this);
		/**
		* @private
		* @type {Partial<NoInfer<Properties>>|null}
		*/
		this.values_ = null;
		if (values !== void 0) this.setProperties(values);
	}
	/**
	* Gets a value.
	* @param {string} key Key name.
	* @return {*} Value.
	* @api
	*/
	get(key) {
		let value;
		if (this.values_ && this.values_.hasOwnProperty(key)) value = this.values_[key];
		return value;
	}
	/**
	* Get a list of object property names.
	* @return {Array<string>} List of property names.
	* @api
	*/
	getKeys() {
		return this.values_ && Object.keys(this.values_) || [];
	}
	/**
	* Get an object of all property names and values.
	* @return {NoInfer<Properties>} Object.
	* @api
	*/
	getProperties() {
		return this.values_ && Object.assign({}, this.values_) || {};
	}
	/**
	* Get an object of all property names and values.
	* @return {Partial<NoInfer<Properties>>?} Object.
	*/
	getPropertiesInternal() {
		return this.values_;
	}
	/**
	* @return {boolean} The object has properties.
	*/
	hasProperties() {
		return !!this.values_;
	}
	/**
	* @param {string} key Key name.
	* @param {*} oldValue Old value.
	*/
	notify(key, oldValue) {
		let eventType;
		eventType = `change:${key}`;
		if (this.hasListener(eventType)) this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
		eventType = ObjectEventType_default.PROPERTYCHANGE;
		if (this.hasListener(eventType)) this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
	}
	/**
	* @param {string} key Key name.
	* @param {import("./events.js").Listener} listener Listener.
	*/
	addChangeListener(key, listener) {
		this.addEventListener(`change:${key}`, listener);
	}
	/**
	* @param {string} key Key name.
	* @param {import("./events.js").Listener} listener Listener.
	*/
	removeChangeListener(key, listener) {
		this.removeEventListener(`change:${key}`, listener);
	}
	/**
	* Sets a value.
	* @param {string} key Key name.
	* @param {*} value Value.
	* @param {boolean} [silent] Update without triggering an event.
	* @api
	*/
	set(key, value, silent) {
		const values = this.values_ || (this.values_ = {});
		if (silent) values[key] = value;
		else {
			const oldValue = values[key];
			values[key] = value;
			if (oldValue !== value) this.notify(key, oldValue);
		}
	}
	/**
	* Sets a collection of key-value pairs.  Note that this changes any existing
	* properties and adds new ones (it does not remove any existing properties).
	* @param {Partial<NoInfer<Properties>>} values Values.
	* @param {boolean} [silent] Update without triggering an event.
	* @api
	*/
	setProperties(values, silent) {
		for (const key in values) this.set(key, values[key], silent);
	}
	/**
	* Apply any properties from another object without triggering events.
	* @param {BaseObject} source The source object.
	* @protected
	*/
	applyProperties(source) {
		if (!source.values_) return;
		Object.assign(this.values_ || (this.values_ = {}), source.values_);
	}
	/**
	* Unsets a property.
	* @param {string} key Key name.
	* @param {boolean} [silent] Unset without triggering an event.
	* @api
	*/
	unset(key, silent) {
		if (this.values_ && key in this.values_) {
			const oldValue = this.values_[key];
			delete this.values_[key];
			if (isEmpty(this.values_)) this.values_ = null;
			if (!silent) this.notify(key, oldValue);
		}
	}
};
//#endregion
//#region node_modules/ol/asserts.js
/**
* @module ol/asserts
*/
/**
* @param {*} assertion Assertion we expected to be truthy.
* @param {string} errorMessage Error message.
*/
function assert(assertion, errorMessage) {
	if (!assertion) throw new Error(errorMessage);
}
//#endregion
//#region node_modules/ol/transform.js
/**
* @module ol/transform
*/
/**
* An array representing an affine 2d transformation for use with
* {@link module:ol/transform} functions. The array has 6 elements.
* @typedef {!Array<number>} Transform
* @api
*/
/**
* Collection of affine 2d transformation functions. The functions work on an
* array of 6 elements. The element order is compatible with the [SVGMatrix
* interface](https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix) and is
* a subset (elements a to f) of a 3×3 matrix:
* ```
* [ a c e ]
* [ b d f ]
* [ 0 0 1 ]
* ```
*/
/**
* @private
* @type {Transform}
*/
var tmp_ = new Array(6);
/**
* Create an identity transform.
* @return {!Transform} Identity transform.
*/
function create$2() {
	return [
		1,
		0,
		0,
		1,
		0,
		0
	];
}
/**
* Resets the given transform to an identity transform.
* @param {!Transform} transform Transform.
* @return {!Transform} Transform.
*/
function reset(transform) {
	return set(transform, 1, 0, 0, 1, 0, 0);
}
/**
* Multiply the underlying matrices of two transforms and return the result in
* the first transform.
* @param {!Transform} transform1 Transform parameters of matrix 1.
* @param {!Transform} transform2 Transform parameters of matrix 2.
* @return {!Transform} transform1 multiplied with transform2.
*/
function multiply(transform1, transform2) {
	const a1 = transform1[0];
	const b1 = transform1[1];
	const c1 = transform1[2];
	const d1 = transform1[3];
	const e1 = transform1[4];
	const f1 = transform1[5];
	const a2 = transform2[0];
	const b2 = transform2[1];
	const c2 = transform2[2];
	const d2 = transform2[3];
	const e2 = transform2[4];
	const f2 = transform2[5];
	transform1[0] = a1 * a2 + c1 * b2;
	transform1[1] = b1 * a2 + d1 * b2;
	transform1[2] = a1 * c2 + c1 * d2;
	transform1[3] = b1 * c2 + d1 * d2;
	transform1[4] = a1 * e2 + c1 * f2 + e1;
	transform1[5] = b1 * e2 + d1 * f2 + f1;
	return transform1;
}
/**
* Set the transform components a-f on a given transform.
* @param {!Transform} transform Transform.
* @param {number} a The a component of the transform.
* @param {number} b The b component of the transform.
* @param {number} c The c component of the transform.
* @param {number} d The d component of the transform.
* @param {number} e The e component of the transform.
* @param {number} f The f component of the transform.
* @return {!Transform} Matrix with transform applied.
*/
function set(transform, a, b, c, d, e, f) {
	transform[0] = a;
	transform[1] = b;
	transform[2] = c;
	transform[3] = d;
	transform[4] = e;
	transform[5] = f;
	return transform;
}
/**
* Set transform on one matrix from another matrix.
* @param {!Transform} transform1 Matrix to set transform to.
* @param {!Transform} transform2 Matrix to set transform from.
* @return {!Transform} transform1 with transform from transform2 applied.
*/
function setFromArray(transform1, transform2) {
	transform1[0] = transform2[0];
	transform1[1] = transform2[1];
	transform1[2] = transform2[2];
	transform1[3] = transform2[3];
	transform1[4] = transform2[4];
	transform1[5] = transform2[5];
	return transform1;
}
/**
* Transforms the given coordinate with the given transform returning the
* resulting, transformed coordinate. The coordinate will be modified in-place.
*
* @param {Transform} transform The transformation.
* @param {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} coordinate The coordinate to transform.
* @return {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} return coordinate so that operations can be
*     chained together.
*/
function apply(transform, coordinate) {
	const x = coordinate[0];
	const y = coordinate[1];
	coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
	coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
	return coordinate;
}
/**
* Applies rotation to the given transform.
* @param {!Transform} transform Transform.
* @param {number} angle Angle in radians.
* @return {!Transform} The rotated transform.
*/
function rotate(transform, angle) {
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	return multiply(transform, set(tmp_, cos, sin, -sin, cos, 0, 0));
}
/**
* Applies scale to a given transform.
* @param {!Transform} transform Transform.
* @param {number} x Scale factor x.
* @param {number} y Scale factor y.
* @return {!Transform} The scaled transform.
*/
function scale$2(transform, x, y) {
	return multiply(transform, set(tmp_, x, 0, 0, y, 0, 0));
}
/**
* Applies translation to the given transform.
* @param {!Transform} transform Transform.
* @param {number} dx Translation x.
* @param {number} dy Translation y.
* @return {!Transform} The translated transform.
*/
function translate$1(transform, dx, dy) {
	return multiply(transform, set(tmp_, 1, 0, 0, 1, dx, dy));
}
/**
* Creates a composite transform given an initial translation, scale, rotation, and
* final translation (in that order only, not commutative).
* @param {!Transform} transform The transform (will be modified in place).
* @param {number} dx1 Initial translation x.
* @param {number} dy1 Initial translation y.
* @param {number} sx Scale factor x.
* @param {number} sy Scale factor y.
* @param {number} angle Rotation (in counter-clockwise radians).
* @param {number} dx2 Final translation x.
* @param {number} dy2 Final translation y.
* @return {!Transform} The composite transform.
*/
function compose(transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
	const sin = Math.sin(angle);
	const cos = Math.cos(angle);
	transform[0] = sx * cos;
	transform[1] = sy * sin;
	transform[2] = -sx * sin;
	transform[3] = sy * cos;
	transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
	transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
	return transform;
}
/**
* Invert the given transform.
* @param {!Transform} target Transform to be set as the inverse of
*     the source transform.
* @param {!Transform} source The source transform to invert.
* @return {!Transform} The inverted (target) transform.
*/
function makeInverse(target, source) {
	const det = determinant(source);
	assert(det !== 0, "Transformation matrix cannot be inverted");
	const a = source[0];
	const b = source[1];
	const c = source[2];
	const d = source[3];
	const e = source[4];
	const f = source[5];
	target[0] = d / det;
	target[1] = -b / det;
	target[2] = -c / det;
	target[3] = a / det;
	target[4] = (c * f - d * e) / det;
	target[5] = -(a * f - b * e) / det;
	return target;
}
/**
* Returns the determinant of the given matrix.
* @param {!Transform} mat Matrix.
* @return {number} Determinant.
*/
function determinant(mat) {
	return mat[0] * mat[3] - mat[1] * mat[2];
}
/**
* @type {Array}
*/
var matrixPrecision = [
	1e5,
	1e5,
	1e5,
	1e5,
	2,
	2
];
/**
* A matrix string version of the transform.  This can be used
* for CSS transforms.
* @param {!Transform} mat Matrix.
* @return {string} The transform as a string.
*/
function toString(mat) {
	return "matrix(" + mat.join(", ") + ")";
}
/**
* Create a transform from a CSS transform matrix string.
* @param {string} cssTransform The CSS string to parse.
* @return {!Transform} The transform.
*/
function fromString(cssTransform) {
	return cssTransform.substring(7, cssTransform.length - 1).split(",").map(parseFloat);
}
/**
* Compare two matrices for equality.
* @param {!string} cssTransform1 A CSS transform matrix string.
* @param {!string} cssTransform2 A CSS transform matrix string.
* @return {boolean} The two matrices are equal.
*/
function equivalent(cssTransform1, cssTransform2) {
	const mat1 = fromString(cssTransform1);
	const mat2 = fromString(cssTransform2);
	for (let i = 0; i < 6; ++i) if (Math.round((mat1[i] - mat2[i]) * matrixPrecision[i]) !== 0) return false;
	return true;
}
//#endregion
//#region node_modules/ol/geom/flat/contains.js
/**
* @module ol/geom/flat/contains
*/
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {import("../../extent.js").Extent} extent Extent.
* @return {boolean} Contains extent.
*/
function linearRingContainsExtent(flatCoordinates, offset, end, stride, extent) {
	return !forEachCorner(
		extent,
		/**
		* @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
		* @return {boolean} Contains (x, y).
		*/
		function(coordinate) {
			return !linearRingContainsXY(flatCoordinates, offset, end, stride, coordinate[0], coordinate[1]);
		}
	);
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {number} x X.
* @param {number} y Y.
* @return {boolean} Contains (x, y).
*/
function linearRingContainsXY(flatCoordinates, offset, end, stride, x, y) {
	let wn = 0;
	let x1 = flatCoordinates[end - stride];
	let y1 = flatCoordinates[end - stride + 1];
	for (; offset < end; offset += stride) {
		const x2 = flatCoordinates[offset];
		const y2 = flatCoordinates[offset + 1];
		if (y1 <= y) {
			if (y2 > y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) > 0) wn++;
		} else if (y2 <= y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) < 0) wn--;
		x1 = x2;
		y1 = y2;
	}
	return wn !== 0;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Ends.
* @param {number} stride Stride.
* @param {number} x X.
* @param {number} y Y.
* @return {boolean} Contains (x, y).
*/
function linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y) {
	if (ends.length === 0) return false;
	if (!linearRingContainsXY(flatCoordinates, offset, ends[0], stride, x, y)) return false;
	for (let i = 1, ii = ends.length; i < ii; ++i) if (linearRingContainsXY(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) return false;
	return true;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<number>>} endss Endss.
* @param {number} stride Stride.
* @param {number} x X.
* @param {number} y Y.
* @return {boolean} Contains (x, y).
*/
function linearRingssContainsXY(flatCoordinates, offset, endss, stride, x, y) {
	if (endss.length === 0) return false;
	for (let i = 0, ii = endss.length; i < ii; ++i) {
		const ends = endss[i];
		if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y)) return true;
		offset = ends[ends.length - 1];
	}
	return false;
}
//#endregion
//#region node_modules/ol/geom/flat/segments.js
/**
* @module ol/geom/flat/segments
*/
/**
* This function calls `callback` for each segment of the flat coordinates
* array. If the callback returns a truthy value the function returns that
* value immediately. Otherwise the function returns `false`.
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {function(import("../../coordinate.js").Coordinate, import("../../coordinate.js").Coordinate): T} callback Function
*     called for each segment.
* @return {T|boolean} Value.
* @template T
*/
function forEach(flatCoordinates, offset, end, stride, callback) {
	let ret;
	offset += stride;
	for (; offset < end; offset += stride) {
		ret = callback(flatCoordinates.slice(offset - stride, offset), flatCoordinates.slice(offset, offset + stride));
		if (ret) return ret;
	}
	return false;
}
/**
* Calculate the intersection point of two line segments.
* Reference: https://stackoverflow.com/a/72474223/2389327
* @param {Array<import("../../coordinate.js").Coordinate>} segment1 The first line segment as an array of two points.
* @param {Array<import("../../coordinate.js").Coordinate>} segment2 The second line segment as an array of two points.
* @return {import("../../coordinate.js").Coordinate|undefined} The intersection point or `undefined` if no intersection.
*/
function getIntersectionPoint(segment1, segment2) {
	const [a, b] = segment1;
	const [c, d] = segment2;
	const t = ((a[0] - c[0]) * (c[1] - d[1]) - (a[1] - c[1]) * (c[0] - d[0])) / ((a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0]));
	const u = ((a[0] - c[0]) * (a[1] - b[1]) - (a[1] - c[1]) * (a[0] - b[0])) / ((a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0]));
	if (0 <= t && t <= 1 && 0 <= u && u <= 1) return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
}
//#endregion
//#region node_modules/ol/geom/flat/intersectsextent.js
/**
* @module ol/geom/flat/intersectsextent
*/
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {import("../../extent.js").Extent} extent Extent.
* @param {import('../../extent.js').Extent} [coordinatesExtent] Coordinates extent
* @return {boolean} True if the geometry and the extent intersect.
*/
function intersectsLineString(flatCoordinates, offset, end, stride, extent, coordinatesExtent) {
	var _coordinatesExtent;
	coordinatesExtent = (_coordinatesExtent = coordinatesExtent) !== null && _coordinatesExtent !== void 0 ? _coordinatesExtent : extendFlatCoordinates(createEmpty(), flatCoordinates, offset, end, stride);
	if (!intersects(extent, coordinatesExtent)) return false;
	if (coordinatesExtent[0] >= extent[0] && coordinatesExtent[2] <= extent[2] || coordinatesExtent[1] >= extent[1] && coordinatesExtent[3] <= extent[3]) return true;
	return forEach(
		flatCoordinates,
		offset,
		end,
		stride,
		/**
		* @param {import("../../coordinate.js").Coordinate} point1 Start point.
		* @param {import("../../coordinate.js").Coordinate} point2 End point.
		* @return {boolean} `true` if the segment and the extent intersect,
		*     `false` otherwise.
		*/
		function(point1, point2) {
			return intersectsSegment(extent, point1, point2);
		}
	);
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Ends.
* @param {number} stride Stride.
* @param {import("../../extent.js").Extent} extent Extent.
* @return {boolean} True if the geometry and the extent intersect.
*/
function intersectsLineStringArray(flatCoordinates, offset, ends, stride, extent) {
	for (let i = 0, ii = ends.length; i < ii; ++i) {
		if (intersectsLineString(flatCoordinates, offset, ends[i], stride, extent)) return true;
		offset = ends[i];
	}
	return false;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {number} end End.
* @param {number} stride Stride.
* @param {import("../../extent.js").Extent} extent Extent.
* @return {boolean} True if the geometry and the extent intersect.
*/
function intersectsLinearRing(flatCoordinates, offset, end, stride, extent) {
	if (intersectsLineString(flatCoordinates, offset, end, stride, extent)) return true;
	if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[0], extent[1])) return true;
	if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[0], extent[3])) return true;
	if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[2], extent[1])) return true;
	if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[2], extent[3])) return true;
	return false;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<number>} ends Ends.
* @param {number} stride Stride.
* @param {import("../../extent.js").Extent} extent Extent.
* @return {boolean} True if the geometry and the extent intersect.
*/
function intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent) {
	if (!intersectsLinearRing(flatCoordinates, offset, ends[0], stride, extent)) return false;
	if (ends.length === 1) return true;
	for (let i = 1, ii = ends.length; i < ii; ++i) if (linearRingContainsExtent(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
		if (!intersectsLineString(flatCoordinates, ends[i - 1], ends[i], stride, extent)) return false;
	}
	return true;
}
/**
* @param {Array<number>} flatCoordinates Flat coordinates.
* @param {number} offset Offset.
* @param {Array<Array<number>>} endss Endss.
* @param {number} stride Stride.
* @param {import("../../extent.js").Extent} extent Extent.
* @return {boolean} True if the geometry and the extent intersect.
*/
function intersectsLinearRingMultiArray(flatCoordinates, offset, endss, stride, extent) {
	for (let i = 0, ii = endss.length; i < ii; ++i) {
		const ends = endss[i];
		if (intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent)) return true;
		offset = ends[ends.length - 1];
	}
	return false;
}
//#endregion
//#region node_modules/ol/TileRange.js
/**
* @module ol/TileRange
*/
/**
* A representation of a contiguous block of tiles.  A tile range is specified
* by its min/max tile coordinates and is inclusive of coordinates.
*/
var TileRange = class {
	/**
	* @param {number} minX Minimum X.
	* @param {number} maxX Maximum X.
	* @param {number} minY Minimum Y.
	* @param {number} maxY Maximum Y.
	*/
	constructor(minX, maxX, minY, maxY) {
		/**
		* @type {number}
		*/
		this.minX = minX;
		/**
		* @type {number}
		*/
		this.maxX = maxX;
		/**
		* @type {number}
		*/
		this.minY = minY;
		/**
		* @type {number}
		*/
		this.maxY = maxY;
	}
	/**
	* @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
	* @return {boolean} Contains tile coordinate.
	*/
	contains(tileCoord) {
		return this.containsXY(tileCoord[1], tileCoord[2]);
	}
	/**
	* @param {TileRange} tileRange Tile range.
	* @return {boolean} Contains.
	*/
	containsTileRange(tileRange) {
		return this.minX <= tileRange.minX && tileRange.maxX <= this.maxX && this.minY <= tileRange.minY && tileRange.maxY <= this.maxY;
	}
	/**
	* @param {number} x Tile coordinate x.
	* @param {number} y Tile coordinate y.
	* @return {boolean} Contains coordinate.
	*/
	containsXY(x, y) {
		return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
	}
	/**
	* @param {TileRange} tileRange Tile range.
	* @return {boolean} Equals.
	*/
	equals(tileRange) {
		return this.minX == tileRange.minX && this.minY == tileRange.minY && this.maxX == tileRange.maxX && this.maxY == tileRange.maxY;
	}
	/**
	* @param {TileRange} tileRange Tile range.
	*/
	extend(tileRange) {
		if (tileRange.minX < this.minX) this.minX = tileRange.minX;
		if (tileRange.maxX > this.maxX) this.maxX = tileRange.maxX;
		if (tileRange.minY < this.minY) this.minY = tileRange.minY;
		if (tileRange.maxY > this.maxY) this.maxY = tileRange.maxY;
	}
	/**
	* @return {number} Height.
	*/
	getHeight() {
		return this.maxY - this.minY + 1;
	}
	/**
	* @return {import("./size.js").Size} Size.
	*/
	getSize() {
		return [this.getWidth(), this.getHeight()];
	}
	/**
	* @return {number} Width.
	*/
	getWidth() {
		return this.maxX - this.minX + 1;
	}
	/**
	* @param {TileRange} tileRange Tile range.
	* @return {boolean} Intersects.
	*/
	intersects(tileRange) {
		return this.minX <= tileRange.maxX && this.maxX >= tileRange.minX && this.minY <= tileRange.maxY && this.maxY >= tileRange.minY;
	}
};
/**
* @param {number} minX Minimum X.
* @param {number} maxX Maximum X.
* @param {number} minY Minimum Y.
* @param {number} maxY Maximum Y.
* @param {TileRange} [tileRange] TileRange.
* @return {TileRange} Tile range.
*/
function createOrUpdate$1(minX, maxX, minY, maxY, tileRange) {
	if (tileRange !== void 0) {
		tileRange.minX = minX;
		tileRange.maxX = maxX;
		tileRange.minY = minY;
		tileRange.maxY = maxY;
		return tileRange;
	}
	return new TileRange(minX, maxX, minY, maxY);
}
//#endregion
//#region node_modules/ol/size.js
/**
* Determines if a size has a positive area.
* @param {Size} size The size to test.
* @return {boolean} The size has a positive area.
*/
function hasArea(size) {
	return size[0] > 0 && size[1] > 0;
}
/**
* Returns a size scaled by a ratio. The result will be an array of integers.
* @param {Size} size Size.
* @param {number} ratio Ratio.
* @param {Size} [dest] Optional reusable size array.
* @return {Size} The scaled size.
*/
function scale$1(size, ratio, dest) {
	if (dest === void 0) dest = [0, 0];
	dest[0] = size[0] * ratio + .5 | 0;
	dest[1] = size[1] * ratio + .5 | 0;
	return dest;
}
/**
* Returns an `Size` array for the passed in number (meaning: square) or
* `Size` array.
* (meaning: non-square),
* @param {number|Size} size Width and height.
* @param {Size} [dest] Optional reusable size array.
* @return {Size} Size.
* @api
*/
function toSize(size, dest) {
	if (Array.isArray(size)) return size;
	if (dest === void 0) dest = [size, size];
	else {
		dest[0] = size;
		dest[1] = size;
	}
	return dest;
}
//#endregion
//#region node_modules/ol/tilecoord.js
/**
* @module ol/tilecoord
*/
/**
* An array of three numbers representing the location of a tile in a tile
* grid. The order is `z` (zoom level), `x` (column), and `y` (row).
* @typedef {Array<number>} TileCoord
* @api
*/
/**
* @param {number} z Z.
* @param {number} x X.
* @param {number} y Y.
* @param {TileCoord} [tileCoord] Tile coordinate.
* @return {TileCoord} Tile coordinate.
*/
function createOrUpdate(z, x, y, tileCoord) {
	if (tileCoord !== void 0) {
		tileCoord[0] = z;
		tileCoord[1] = x;
		tileCoord[2] = y;
		return tileCoord;
	}
	return [
		z,
		x,
		y
	];
}
/**
* @param {number} z Z.
* @param {number} x X.
* @param {number} y Y.
* @return {string} Key.
*/
function getKeyZXY(z, x, y) {
	return z + "/" + x + "/" + y;
}
/**
* Get the key for a tile coord.
* @param {TileCoord} tileCoord The tile coord.
* @return {string} Key.
*/
function getKey(tileCoord) {
	return getKeyZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
}
/**
* @param {import("./source/Tile.js").default} source The tile source.
* @param {string} sourceKey The source key.
* @param {number} z The tile z level.
* @param {number} x The tile x level.
* @param {number} y The tile y level.
* @return {string} The cache key.
*/
function getCacheKey(source, sourceKey, z, x, y) {
	return `${getUid(source)},${sourceKey},${getKeyZXY(z, x, y)}`;
}
/**
* @param {TileCoord} tileCoord Tile coord.
* @return {number} Hash.
*/
function hash(tileCoord) {
	return hashZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
}
/**
* @param {number} z The tile z coordinate.
* @param {number} x The tile x coordinate.
* @param {number} y The tile y coordinate.
* @return {number} Hash.
*/
function hashZXY(z, x, y) {
	return (x << z) + y;
}
/**
* @param {TileCoord} tileCoord Tile coordinate.
* @param {!import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
* @return {boolean} Tile coordinate is within extent and zoom level range.
*/
function withinExtentAndZ(tileCoord, tileGrid) {
	const z = tileCoord[0];
	const x = tileCoord[1];
	const y = tileCoord[2];
	if (tileGrid.getMinZoom() > z || z > tileGrid.getMaxZoom()) return false;
	const tileRange = tileGrid.getFullTileRange(z);
	if (!tileRange) return true;
	return tileRange.containsXY(x, y);
}
//#endregion
//#region node_modules/ol/tilegrid/TileGrid.js
/**
* @module ol/tilegrid/TileGrid
*/
/**
* @private
* @type {import("../tilecoord.js").TileCoord}
*/
var tmpTileCoord = [
	0,
	0,
	0
];
/**
* Number of decimal digits to consider in integer values when rounding.
* @type {number}
*/
var DECIMALS = 5;
/**
* @typedef {Object} Options
* @property {import("../extent.js").Extent} [extent] Extent for the tile grid. No tiles outside this
* extent will be requested by {@link module:ol/source/Tile~TileSource} sources. When no `origin` or
* `origins` are configured, the `origin` will be set to the top-left corner of the extent.
* @property {number} [minZoom=0] Minimum zoom.
* @property {import("../coordinate.js").Coordinate} [origin] The tile grid origin, i.e. where the `x`
* and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left to right and downwards. If not
* specified, `extent` or `origins` must be provided.
* @property {Array<import("../coordinate.js").Coordinate>} [origins] Tile grid origins, i.e. where
* the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If given, the array length
* should match the length of the `resolutions` array, i.e. each resolution can have a different
* origin. Tile coordinates increase left to right and downwards. If not specified, `extent` or
* `origin` must be provided.
* @property {!Array<number>} resolutions Resolutions. The array index of each resolution needs
* to match the zoom level. This means that even if a `minZoom` is configured, the resolutions
* array will have a length of `maxZoom + 1`.
* @property {Array<import("../size.js").Size>} [sizes] Number of tile rows and columns
* of the grid for each zoom level. If specified the values
* define each zoom level's extent together with the `origin` or `origins`.
* A grid `extent` can be configured in addition, and will further limit the extent
* for which tile requests are made by sources. If the bottom-left corner of
* an extent is used as `origin` or `origins`, then the `y` value must be
* negative because OpenLayers tile coordinates use the top left as the origin.
* @property {number|import("../size.js").Size} [tileSize] Tile size.
* Default is `[256, 256]`.
* @property {Array<number|import("../size.js").Size>} [tileSizes] Tile sizes. If given, the array length
* should match the length of the `resolutions` array, i.e. each resolution can have a different
* tile size.
*/
/**
* @classdesc
* Base class for setting the grid pattern for sources accessing tiled-image
* servers.
* @api
*/
var TileGrid = class {
	/**
	* @param {Options} options Tile grid options.
	*/
	constructor(options) {
		/**
		* @protected
		* @type {number}
		*/
		this.minZoom = options.minZoom !== void 0 ? options.minZoom : 0;
		/**
		* @private
		* @type {!Array<number>}
		*/
		this.resolutions_ = options.resolutions;
		assert(isSorted(
			this.resolutions_,
			/**
			* @param {number} a First resolution
			* @param {number} b Second resolution
			* @return {number} Comparison result
			*/
			(a, b) => b - a,
			true
		), "`resolutions` must be sorted in descending order");
		let zoomFactor;
		if (!options.origins) {
			for (let i = 0, ii = this.resolutions_.length - 1; i < ii; ++i) if (!zoomFactor) zoomFactor = this.resolutions_[i] / this.resolutions_[i + 1];
			else if (this.resolutions_[i] / this.resolutions_[i + 1] !== zoomFactor) {
				zoomFactor = void 0;
				break;
			}
		}
		/**
		* @private
		* @type {number|undefined}
		*/
		this.zoomFactor_ = zoomFactor;
		/**
		* @protected
		* @type {number}
		*/
		this.maxZoom = this.resolutions_.length - 1;
		/**
		* @private
		* @type {import("../coordinate.js").Coordinate|null}
		*/
		this.origin_ = options.origin !== void 0 ? options.origin : null;
		/**
		* @private
		* @type {Array<import("../coordinate.js").Coordinate>}
		*/
		this.origins_ = null;
		if (options.origins !== void 0) {
			this.origins_ = options.origins;
			assert(this.origins_.length == this.resolutions_.length, "Number of `origins` and `resolutions` must be equal");
		}
		const extent = options.extent;
		if (extent !== void 0 && !this.origin_ && !this.origins_) this.origin_ = getTopLeft(extent);
		assert(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, "Either `origin` or `origins` must be configured, never both");
		/**
		* @private
		* @type {Array<number|import("../size.js").Size>}
		*/
		this.tileSizes_ = null;
		if (options.tileSizes !== void 0) {
			this.tileSizes_ = options.tileSizes;
			assert(this.tileSizes_.length == this.resolutions_.length, "Number of `tileSizes` and `resolutions` must be equal");
		}
		/**
		* @private
		* @type {number|import("../size.js").Size}
		*/
		this.tileSize_ = options.tileSize !== void 0 ? options.tileSize : !this.tileSizes_ ? 256 : null;
		assert(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, "Either `tileSize` or `tileSizes` must be configured, never both");
		/**
		* @private
		* @type {import("../extent.js").Extent}
		*/
		this.extent_ = extent !== void 0 ? extent : null;
		/**
		* @private
		* @type {Array<import("../TileRange.js").default>}
		*/
		this.fullTileRanges_ = null;
		/**
		* @private
		* @type {import("../size.js").Size}
		*/
		this.tmpSize_ = [0, 0];
		/**
		* @private
		* @type {import("../extent.js").Extent}
		*/
		this.tmpExtent_ = [
			0,
			0,
			0,
			0
		];
		if (options.sizes !== void 0) this.fullTileRanges_ = options.sizes.map((size, z) => {
			const tileRange = new TileRange(Math.min(0, size[0]), Math.max(size[0] - 1, -1), Math.min(0, size[1]), Math.max(size[1] - 1, -1));
			if (extent) {
				const restrictedTileRange = this.getTileRangeForExtentAndZ(extent, z);
				tileRange.minX = Math.max(restrictedTileRange.minX, tileRange.minX);
				tileRange.maxX = Math.min(restrictedTileRange.maxX, tileRange.maxX);
				tileRange.minY = Math.max(restrictedTileRange.minY, tileRange.minY);
				tileRange.maxY = Math.min(restrictedTileRange.maxY, tileRange.maxY);
			}
			return tileRange;
		});
		else if (extent) this.calculateTileRanges_(extent);
	}
	/**
	* Call a function with each tile coordinate for a given extent and zoom level.
	*
	* @param {import("../extent.js").Extent} extent Extent.
	* @param {number} zoom Integer zoom level.
	* @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
	* @api
	*/
	forEachTileCoord(extent, zoom, callback) {
		const tileRange = this.getTileRangeForExtentAndZ(extent, zoom);
		for (let i = tileRange.minX, ii = tileRange.maxX; i <= ii; ++i) for (let j = tileRange.minY, jj = tileRange.maxY; j <= jj; ++j) callback([
			zoom,
			i,
			j
		]);
	}
	/**
	* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
	* @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
	* @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
	* @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
	* @return {boolean} Callback succeeded.
	*/
	forEachTileCoordParentTileRange(tileCoord, callback, tempTileRange, tempExtent) {
		let tileRange, x, y;
		let tileCoordExtent = null;
		let z = tileCoord[0] - 1;
		if (this.zoomFactor_ === 2) {
			x = tileCoord[1];
			y = tileCoord[2];
		} else tileCoordExtent = this.getTileCoordExtent(tileCoord, tempExtent);
		while (z >= this.minZoom) {
			if (x !== void 0 && y !== void 0) {
				x = Math.floor(x / 2);
				y = Math.floor(y / 2);
				tileRange = createOrUpdate$1(x, x, y, y, tempTileRange);
			} else tileRange = this.getTileRangeForExtentAndZ(tileCoordExtent, z, tempTileRange);
			if (callback(z, tileRange)) return true;
			--z;
		}
		return false;
	}
	/**
	* Get the extent for this tile grid, if it was configured.
	* @return {import("../extent.js").Extent} Extent.
	* @api
	*/
	getExtent() {
		return this.extent_;
	}
	/**
	* Get the maximum zoom level for the grid.
	* @return {number} Max zoom.
	* @api
	*/
	getMaxZoom() {
		return this.maxZoom;
	}
	/**
	* Get the minimum zoom level for the grid.
	* @return {number} Min zoom.
	* @api
	*/
	getMinZoom() {
		return this.minZoom;
	}
	/**
	* Get the origin for the grid at the given zoom level.
	* @param {number} z Integer zoom level.
	* @return {import("../coordinate.js").Coordinate} Origin.
	* @api
	*/
	getOrigin(z) {
		if (this.origin_) return this.origin_;
		return this.origins_[z];
	}
	/**
	* Get the list of origins for the grid.
	* @return {Array<import("../coordinate.js").Coordinate>|null} Origin.
	*/
	getOrigins() {
		return this.origins_;
	}
	/**
	* Get the resolution for the given zoom level.
	* @param {number} z Integer zoom level.
	* @return {number} Resolution.
	* @api
	*/
	getResolution(z) {
		return this.resolutions_[z];
	}
	/**
	* Get the list of resolutions for the tile grid.
	* @return {Array<number>} Resolutions.
	* @api
	*/
	getResolutions() {
		return this.resolutions_;
	}
	/**
	* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
	* @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
	* @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
	* @return {import("../TileRange.js").default|null} Tile range.
	*/
	getTileCoordChildTileRange(tileCoord, tempTileRange, tempExtent) {
		if (tileCoord[0] < this.maxZoom) {
			if (this.zoomFactor_ === 2) {
				const minX = tileCoord[1] * 2;
				const minY = tileCoord[2] * 2;
				return createOrUpdate$1(minX, minX + 1, minY, minY + 1, tempTileRange);
			}
			const tileCoordExtent = this.getTileCoordExtent(tileCoord, tempExtent || this.tmpExtent_);
			return this.getTileRangeForExtentAndZ(tileCoordExtent, tileCoord[0] + 1, tempTileRange);
		}
		return null;
	}
	/**
	* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
	* @param {number} z Integer zoom level.
	* @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
	* @return {import("../TileRange.js").default|null} Tile range.
	*/
	getTileRangeForTileCoordAndZ(tileCoord, z, tempTileRange) {
		if (z > this.maxZoom || z < this.minZoom) return null;
		const tileCoordZ = tileCoord[0];
		const tileCoordX = tileCoord[1];
		const tileCoordY = tileCoord[2];
		if (z === tileCoordZ) return createOrUpdate$1(tileCoordX, tileCoordY, tileCoordX, tileCoordY, tempTileRange);
		if (this.zoomFactor_) {
			const factor = Math.pow(this.zoomFactor_, z - tileCoordZ);
			const minX = Math.floor(tileCoordX * factor);
			const minY = Math.floor(tileCoordY * factor);
			if (z < tileCoordZ) return createOrUpdate$1(minX, minX, minY, minY, tempTileRange);
			return createOrUpdate$1(minX, Math.floor(factor * (tileCoordX + 1)) - 1, minY, Math.floor(factor * (tileCoordY + 1)) - 1, tempTileRange);
		}
		const tileCoordExtent = this.getTileCoordExtent(tileCoord, this.tmpExtent_);
		return this.getTileRangeForExtentAndZ(tileCoordExtent, z, tempTileRange);
	}
	/**
	* Get a tile range for the given extent and integer zoom level.
	* @param {import("../extent.js").Extent} extent Extent.
	* @param {number} z Integer zoom level.
	* @param {import("../TileRange.js").default} [tempTileRange] Temporary tile range object.
	* @return {import("../TileRange.js").default} Tile range.
	*/
	getTileRangeForExtentAndZ(extent, z, tempTileRange) {
		this.getTileCoordForXYAndZ_(extent[0], extent[3], z, false, tmpTileCoord);
		const minX = tmpTileCoord[1];
		const minY = tmpTileCoord[2];
		this.getTileCoordForXYAndZ_(extent[2], extent[1], z, true, tmpTileCoord);
		const maxX = tmpTileCoord[1];
		const maxY = tmpTileCoord[2];
		return createOrUpdate$1(minX, maxX, minY, maxY, tempTileRange);
	}
	/**
	* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
	* @return {import("../coordinate.js").Coordinate} Tile center.
	*/
	getTileCoordCenter(tileCoord) {
		const origin = this.getOrigin(tileCoord[0]);
		const resolution = this.getResolution(tileCoord[0]);
		const tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
		return [origin[0] + (tileCoord[1] + .5) * tileSize[0] * resolution, origin[1] - (tileCoord[2] + .5) * tileSize[1] * resolution];
	}
	/**
	* Get the extent of a tile coordinate.
	*
	* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
	* @param {import("../extent.js").Extent} [tempExtent] Temporary extent object.
	* @return {import("../extent.js").Extent} Extent.
	* @api
	*/
	getTileCoordExtent(tileCoord, tempExtent) {
		const origin = this.getOrigin(tileCoord[0]);
		const resolution = this.getResolution(tileCoord[0]);
		const tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
		const minX = origin[0] + tileCoord[1] * tileSize[0] * resolution;
		const minY = origin[1] - (tileCoord[2] + 1) * tileSize[1] * resolution;
		return createOrUpdate$2(minX, minY, minX + tileSize[0] * resolution, minY + tileSize[1] * resolution, tempExtent);
	}
	/**
	* Get the tile coordinate for the given map coordinate and resolution.  This
	* method considers that coordinates that intersect tile boundaries should be
	* assigned the higher tile coordinate.
	*
	* @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
	* @param {number} resolution Resolution.
	* @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
	* @return {import("../tilecoord.js").TileCoord} Tile coordinate.
	* @api
	*/
	getTileCoordForCoordAndResolution(coordinate, resolution, opt_tileCoord) {
		return this.getTileCoordForXYAndResolution_(coordinate[0], coordinate[1], resolution, false, opt_tileCoord);
	}
	/**
	* Note that this method should not be called for resolutions that correspond
	* to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
	* @param {number} x X.
	* @param {number} y Y.
	* @param {number} resolution Resolution (for a non-integer zoom level).
	* @param {boolean} reverseIntersectionPolicy Instead of letting edge
	*     intersections go to the higher tile coordinate, let edge intersections
	*     go to the lower tile coordinate.
	* @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
	* @return {import("../tilecoord.js").TileCoord} Tile coordinate.
	* @private
	*/
	getTileCoordForXYAndResolution_(x, y, resolution, reverseIntersectionPolicy, opt_tileCoord) {
		const z = this.getZForResolution(resolution);
		const scale = resolution / this.getResolution(z);
		const origin = this.getOrigin(z);
		const tileSize = toSize(this.getTileSize(z), this.tmpSize_);
		let tileCoordX = scale * (x - origin[0]) / resolution / tileSize[0];
		let tileCoordY = scale * (origin[1] - y) / resolution / tileSize[1];
		if (reverseIntersectionPolicy) {
			tileCoordX = ceil(tileCoordX, DECIMALS) - 1;
			tileCoordY = ceil(tileCoordY, DECIMALS) - 1;
		} else {
			tileCoordX = floor(tileCoordX, DECIMALS);
			tileCoordY = floor(tileCoordY, DECIMALS);
		}
		return createOrUpdate(z, tileCoordX, tileCoordY, opt_tileCoord);
	}
	/**
	* Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
	* they should have separate implementations.  This method is for integer zoom
	* levels.  The other method should only be called for resolutions corresponding
	* to non-integer zoom levels.
	* @param {number} x Map x coordinate.
	* @param {number} y Map y coordinate.
	* @param {number} z Integer zoom level.
	* @param {boolean} reverseIntersectionPolicy Instead of letting edge
	*     intersections go to the higher tile coordinate, let edge intersections
	*     go to the lower tile coordinate.
	* @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
	* @return {import("../tilecoord.js").TileCoord} Tile coordinate.
	* @private
	*/
	getTileCoordForXYAndZ_(x, y, z, reverseIntersectionPolicy, opt_tileCoord) {
		const origin = this.getOrigin(z);
		const resolution = this.getResolution(z);
		const tileSize = toSize(this.getTileSize(z), this.tmpSize_);
		let tileCoordX = (x - origin[0]) / resolution / tileSize[0];
		let tileCoordY = (origin[1] - y) / resolution / tileSize[1];
		if (reverseIntersectionPolicy) {
			tileCoordX = ceil(tileCoordX, DECIMALS) - 1;
			tileCoordY = ceil(tileCoordY, DECIMALS) - 1;
		} else {
			tileCoordX = floor(tileCoordX, DECIMALS);
			tileCoordY = floor(tileCoordY, DECIMALS);
		}
		return createOrUpdate(z, tileCoordX, tileCoordY, opt_tileCoord);
	}
	/**
	* Get a tile coordinate given a map coordinate and zoom level.
	* @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
	* @param {number} z Integer zoom level, e.g. the result of a `getZForResolution()` method call
	* @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
	* @return {import("../tilecoord.js").TileCoord} Tile coordinate.
	* @api
	*/
	getTileCoordForCoordAndZ(coordinate, z, opt_tileCoord) {
		return this.getTileCoordForXYAndZ_(coordinate[0], coordinate[1], z, false, opt_tileCoord);
	}
	/**
	* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
	* @return {number} Tile resolution.
	*/
	getTileCoordResolution(tileCoord) {
		return this.resolutions_[tileCoord[0]];
	}
	/**
	* Get the tile size for a zoom level. The type of the return value matches the
	* `tileSize` or `tileSizes` that the tile grid was configured with. To always
	* get an {@link import("../size.js").Size}, run the result through {@link module:ol/size.toSize}.
	* @param {number} z Z.
	* @return {number|import("../size.js").Size} Tile size.
	* @api
	*/
	getTileSize(z) {
		if (this.tileSize_) return this.tileSize_;
		return this.tileSizes_[z];
	}
	/**
	* @param {number} z Zoom level.
	* @return {import("../TileRange.js").default|null} Extent tile range for the specified zoom level.
	*/
	getFullTileRange(z) {
		if (!this.fullTileRanges_) return this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, z) : null;
		return this.fullTileRanges_[z];
	}
	/**
	* @param {number} resolution Resolution.
	* @param {number|import("../array.js").NearestDirectionFunction} [opt_direction]
	*     If 0, the nearest resolution will be used.
	*     If 1, the nearest higher resolution (lower Z) will be used. If -1, the
	*     nearest lower resolution (higher Z) will be used. Default is 0.
	*     Use a {@link module:ol/array~NearestDirectionFunction} for more precise control.
	*
	* For example to change tile Z at the midpoint of zoom levels
	* ```js
	* function(value, high, low) {
	*   return value - low * Math.sqrt(high / low);
	* }
	* ```
	* @return {number} Z.
	* @api
	*/
	getZForResolution(resolution, opt_direction) {
		return clamp(linearFindNearest(this.resolutions_, resolution, opt_direction || 0), this.minZoom, this.maxZoom);
	}
	/**
	* The tile with the provided tile coordinate intersects the given viewport.
	* @param {import('../tilecoord.js').TileCoord} tileCoord Tile coordinate.
	* @param {Array<number>} viewport Viewport as returned from {@link module:ol/extent.getRotatedViewport}.
	* @return {boolean} The tile with the provided tile coordinate intersects the given viewport.
	*/
	tileCoordIntersectsViewport(tileCoord, viewport) {
		return intersectsLinearRing(viewport, 0, viewport.length, 2, this.getTileCoordExtent(tileCoord));
	}
	/**
	* @param {!import("../extent.js").Extent} extent Extent for this tile grid.
	* @private
	*/
	calculateTileRanges_(extent) {
		const length = this.resolutions_.length;
		const fullTileRanges = new Array(length);
		for (let z = this.minZoom; z < length; ++z) fullTileRanges[z] = this.getTileRangeForExtentAndZ(extent, z);
		this.fullTileRanges_ = fullTileRanges;
	}
};
//#endregion
//#region node_modules/ol/tilegrid.js
/**
* @module ol/tilegrid
*/
/**
* @param {import("./proj/Projection.js").default} projection Projection.
* @return {!TileGrid} Default tile grid for the
* passed projection.
*/
function getForProjection(projection) {
	let tileGrid = projection.getDefaultTileGrid();
	if (!tileGrid) {
		tileGrid = createForProjection(projection);
		projection.setDefaultTileGrid(tileGrid);
	}
	return tileGrid;
}
/**
* @param {TileGrid} tileGrid Tile grid.
* @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
* @param {import("./proj/Projection.js").default} projection Projection.
* @return {import("./tilecoord.js").TileCoord} Tile coordinate.
*/
function wrapX(tileGrid, tileCoord, projection) {
	const z = tileCoord[0];
	const center = tileGrid.getTileCoordCenter(tileCoord);
	const projectionExtent = extentFromProjection(projection);
	if (!containsCoordinate(projectionExtent, center)) {
		const worldWidth = getWidth(projectionExtent);
		const worldsAway = Math.ceil((projectionExtent[0] - center[0]) / worldWidth);
		center[0] += worldWidth * worldsAway;
		return tileGrid.getTileCoordForCoordAndZ(center, z);
	}
	return tileCoord;
}
/**
* @param {import("./extent.js").Extent} extent Extent.
* @param {number} [maxZoom] Maximum zoom level (default is
*     DEFAULT_MAX_ZOOM).
* @param {number|import("./size.js").Size} [tileSize] Tile size (default uses
*     DEFAULT_TILE_SIZE).
* @param {import("./extent.js").Corner} [corner] Extent corner (default is `'top-left'`).
* @return {!TileGrid} TileGrid instance.
*/
function createForExtent(extent, maxZoom, tileSize, corner) {
	corner = corner !== void 0 ? corner : "top-left";
	const resolutions = resolutionsFromExtent(extent, maxZoom, tileSize);
	return new TileGrid({
		extent,
		origin: getCorner(extent, corner),
		resolutions,
		tileSize
	});
}
/**
* @typedef {Object} XYZOptions
* @property {import("./extent.js").Extent} [extent] Extent for the tile grid. The origin for an XYZ tile grid is the
* top-left corner of the extent. If `maxResolution` is not provided the zero level of the grid is defined by the resolution
* at which one tile fits in the provided extent. If not provided, the extent of the EPSG:3857 projection is used.
* @property {number} [maxResolution] Resolution at level zero.
* @property {number} [maxZoom] Maximum zoom. The default is `42`. This determines the number of levels
* in the grid set. For example, a `maxZoom` of 21 means there are 22 levels in the grid set.
* @property {number} [minZoom=0] Minimum zoom.
* @property {number|import("./size.js").Size} [tileSize=[256, 256]] Tile size in pixels.
*/
/**
* Creates a tile grid with a standard XYZ tiling scheme.
* @param {XYZOptions} [options] Tile grid options.
* @return {!TileGrid} Tile grid instance.
* @api
*/
function createXYZ(options) {
	const xyzOptions = options || {};
	const extent = xyzOptions.extent || get("EPSG:3857").getExtent();
	return new TileGrid({
		extent,
		minZoom: xyzOptions.minZoom,
		tileSize: xyzOptions.tileSize,
		resolutions: resolutionsFromExtent(extent, xyzOptions.maxZoom, xyzOptions.tileSize, xyzOptions.maxResolution)
	});
}
/**
* Create a resolutions array from an extent.  A zoom factor of 2 is assumed.
* @param {import("./extent.js").Extent} extent Extent.
* @param {number} [maxZoom] Maximum zoom level (default is
*     DEFAULT_MAX_ZOOM).
* @param {number|import("./size.js").Size} [tileSize] Tile size (default uses
*     DEFAULT_TILE_SIZE).
* @param {number} [maxResolution] Resolution at level zero.
* @return {!Array<number>} Resolutions array.
*/
function resolutionsFromExtent(extent, maxZoom, tileSize, maxResolution) {
	maxZoom = maxZoom !== void 0 ? maxZoom : 42;
	tileSize = toSize(tileSize !== void 0 ? tileSize : 256);
	const height = getHeight(extent);
	const width = getWidth(extent);
	maxResolution = maxResolution > 0 ? maxResolution : Math.max(width / tileSize[0], height / tileSize[1]);
	const length = maxZoom + 1;
	const resolutions = new Array(length);
	for (let z = 0; z < length; ++z) resolutions[z] = maxResolution / Math.pow(2, z);
	return resolutions;
}
/**
* @param {import("./proj.js").ProjectionLike} projection Projection.
* @param {number} [maxZoom] Maximum zoom level (default is
*     DEFAULT_MAX_ZOOM).
* @param {number|import("./size.js").Size} [tileSize] Tile size (default uses
*     DEFAULT_TILE_SIZE).
* @param {import("./extent.js").Corner} [corner] Extent corner (default is `'top-left'`).
* @return {!TileGrid} TileGrid instance.
*/
function createForProjection(projection, maxZoom, tileSize, corner) {
	return createForExtent(extentFromProjection(projection), maxZoom, tileSize, corner);
}
/**
* Generate a tile grid extent from a projection.  If the projection has an
* extent, it is used.  If not, a global extent is assumed.
* @param {import("./proj.js").ProjectionLike} projection Projection.
* @return {import("./extent.js").Extent} Extent.
*/
function extentFromProjection(projection) {
	projection = get(projection);
	let extent = projection.getExtent();
	if (!extent) {
		const half = 180 * METERS_PER_UNIT$1.degrees / projection.getMetersPerUnit();
		extent = createOrUpdate$2(-half, -half, half, half);
	}
	return extent;
}
//#endregion
//#region node_modules/ol/has.js
/**
* @module ol/has
*/
var ua = typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined" ? navigator.userAgent.toLowerCase() : "";
/**
* https://bugs.webkit.org/show_bug.cgi?id=237906
* @type {boolean}
*/
var SAFARI_BUG_237906 = ua.includes("safari") && !ua.includes("chrom") && (ua.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(ua));
/**
* User agent string says we are dealing with a WebKit engine.
* @type {boolean}
*/
var WEBKIT = ua.includes("webkit") && !ua.includes("edge");
/**
* User agent string says we are dealing with a Mac as platform.
* @type {boolean}
*/
var MAC = ua.includes("macintosh");
/**
* The ratio between physical pixels and device-independent pixels
* (dips) on the device (`window.devicePixelRatio`).
* @const
* @type {number}
* @api
*/
var DEVICE_PIXEL_RATIO = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
/**
* The execution context is a worker with OffscreenCanvas available.
* @const
* @type {boolean}
*/
var WORKER_OFFSCREEN_CANVAS = typeof WorkerGlobalScope !== "undefined" && typeof OffscreenCanvas !== "undefined" && self instanceof WorkerGlobalScope;
/**
* Image.prototype.decode() is supported.
* @type {boolean}
*/
var IMAGE_DECODE = typeof Image !== "undefined" && Image.prototype.decode;
/**
* createImageBitmap() is supported.
* @type {boolean}
*/
var CREATE_IMAGE_BITMAP = typeof createImageBitmap === "function";
/**
* @type {boolean}
*/
var PASSIVE_EVENT_LISTENERS = (function() {
	let passive = false;
	try {
		const options = Object.defineProperty({}, "passive", { get: function() {
			passive = true;
		} });
		window.addEventListener("_", null, options);
		window.removeEventListener("_", null, options);
	} catch (_unused) {}
	return passive;
})();
//#endregion
//#region node_modules/ol/TileState.js
/**
* @module ol/TileState
*/
/**
* @enum {number}
*/
var TileState_default = {
	IDLE: 0,
	LOADING: 1,
	LOADED: 2,
	/**
	* Indicates that tile loading failed
	* @type {number}
	*/
	ERROR: 3,
	EMPTY: 4
};
//#endregion
//#region node_modules/ol/easing.js
/**
* @module ol/easing
*/
/**
* Start slow and speed up.
* @param {number} t Input between 0 and 1.
* @return {number} Output between 0 and 1.
* @api
*/
function easeIn(t) {
	return Math.pow(t, 3);
}
/**
* Start fast and slow down.
* @param {number} t Input between 0 and 1.
* @return {number} Output between 0 and 1.
* @api
*/
function easeOut(t) {
	return 1 - easeIn(1 - t);
}
/**
* Start slow, speed up, and then slow down again.
* @param {number} t Input between 0 and 1.
* @return {number} Output between 0 and 1.
* @api
*/
function inAndOut(t) {
	return 3 * t * t - 2 * t * t * t;
}
/**
* Maintain a constant speed over time.
* @param {number} t Input between 0 and 1.
* @return {number} Output between 0 and 1.
* @api
*/
function linear(t) {
	return t;
}
//#endregion
//#region node_modules/ol/Tile.js
/**
* @module ol/Tile
*/
/**
* A function that takes a {@link module:ol/Tile~Tile} for the tile and a
* `{string}` for the url as arguments. The default is
* ```js
* source.setTileLoadFunction(function(tile, src) {
*   tile.getImage().src = src;
* });
* ```
* For more fine grained control, the load function can use fetch or XMLHttpRequest and involve
* error handling:
*
* ```js
* import TileState from 'ol/TileState.js';
*
* source.setTileLoadFunction(function(tile, src) {
*   const xhr = new XMLHttpRequest();
*   xhr.responseType = 'blob';
*   xhr.addEventListener('loadend', function (evt) {
*     const data = this.response;
*     if (data !== undefined) {
*       tile.getImage().src = URL.createObjectURL(data);
*     } else {
*       tile.setState(TileState.ERROR);
*     }
*   });
*   xhr.addEventListener('error', function () {
*     tile.setState(TileState.ERROR);
*   });
*   xhr.open('GET', src);
*   xhr.send();
* });
* ```
*
* @typedef {function(Tile, string): void} LoadFunction
* @api
*/
/**
* {@link module:ol/source/Tile~TileSource} sources use a function of this type to get
* the url that provides a tile for a given tile coordinate.
*
* This function takes a {@link module:ol/tilecoord~TileCoord} for the tile
* coordinate, a `{number}` representing the pixel ratio and a
* {@link module:ol/proj/Projection~Projection} for the projection  as arguments
* and returns a `{string}` representing the tile URL, or undefined if no tile
* should be requested for the passed tile coordinate.
*
* @typedef {function(import("./tilecoord.js").TileCoord, number,
*           import("./proj/Projection.js").default): (string|undefined)} UrlFunction
* @api
*/
/**
* @typedef {Object} Options
* @property {number} [transition=250] A duration for tile opacity
* transitions in milliseconds. A duration of 0 disables the opacity transition.
* @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
* the nearest neighbor is used when resampling.
* @api
*/
/**
* @classdesc
* Base class for tiles.
*
* @abstract
*/
var Tile = class extends Target {
	/**
	* @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
	* @param {import("./TileState.js").default} state State.
	* @param {Options} [options] Tile options.
	*/
	constructor(tileCoord, state, options) {
		super();
		options = options ? options : {};
		/**
		* @type {import("./tilecoord.js").TileCoord}
		*/
		this.tileCoord = tileCoord;
		/**
		* @protected
		* @type {import("./TileState.js").default}
		*/
		this.state = state;
		/**
		* A key assigned to the tile. This is used in conjunction with a source key
		* to determine if a cached version of this tile may be used by the renderer.
		* @type {string}
		*/
		this.key = "";
		/**
		* The duration for the opacity transition.
		* @private
		* @type {number}
		*/
		this.transition_ = options.transition === void 0 ? 250 : options.transition;
		/**
		* Lookup of start times for rendering transitions.  If the start time is
		* equal to -1, the transition is complete.
		* @private
		* @type {Object<string, number>}
		*/
		this.transitionStarts_ = {};
		/**
		* @type {boolean}
		*/
		this.interpolate = !!options.interpolate;
	}
	/**
	* @protected
	*/
	changed() {
		this.dispatchEvent(EventType_default.CHANGE);
	}
	/**
	* Called by the tile cache when the tile is removed from the cache due to expiry
	*/
	release() {
		this.setState(TileState_default.EMPTY);
	}
	/**
	* @return {string} Key.
	*/
	getKey() {
		return this.key + "/" + this.tileCoord;
	}
	/**
	* Get the tile coordinate for this tile.
	* @return {import("./tilecoord.js").TileCoord} The tile coordinate.
	* @api
	*/
	getTileCoord() {
		return this.tileCoord;
	}
	/**
	* @return {import("./TileState.js").default} State.
	*/
	getState() {
		return this.state;
	}
	/**
	* Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
	* it is important to set the state correctly to {@link module:ol/TileState~ERROR}
	* when the tile cannot be loaded. Otherwise the tile cannot be removed from
	* the tile queue and will block other requests.
	* @param {import("./TileState.js").default} state State.
	* @api
	*/
	setState(state) {
		if (this.state === TileState_default.EMPTY) return;
		if (this.state !== TileState_default.ERROR && this.state > state) throw new Error("Tile load sequence violation");
		this.state = state;
		this.changed();
	}
	/**
	* Load the image or retry if loading previously failed.
	* Loading is taken care of by the tile queue, and calling this method is
	* only needed for preloading or for reloading in case of an error.
	* @abstract
	* @api
	*/
	load() {
		abstract();
	}
	/**
	* Get the alpha value for rendering.
	* @param {string} id An id for the renderer.
	* @param {number} time The render frame time.
	* @return {number} A number between 0 and 1.
	*/
	getAlpha(id, time) {
		if (!this.transition_) return 1;
		let start = this.transitionStarts_[id];
		if (!start) {
			start = time;
			this.transitionStarts_[id] = start;
		} else if (start === -1) return 1;
		const delta = time - start + 1e3 / 60;
		if (delta >= this.transition_) return 1;
		return easeIn(delta / this.transition_);
	}
	/**
	* Determine if a tile is in an alpha transition.  A tile is considered in
	* transition if tile.getAlpha() has not yet been called or has been called
	* and returned 1.
	* @param {string} id An id for the renderer.
	* @return {boolean} The tile is in transition.
	*/
	inTransition(id) {
		if (!this.transition_) return false;
		return this.transitionStarts_[id] !== -1;
	}
	/**
	* Mark a transition as complete.
	* @param {string} id An id for the renderer.
	*/
	endTransition(id) {
		if (this.transition_) this.transitionStarts_[id] = -1;
	}
	/**
	* @override
	*/
	disposeInternal() {
		this.release();
		super.disposeInternal();
	}
};
//#endregion
//#region node_modules/ol/dom.js
init_defineProperty();
/**
* @module ol/dom
*/
/**
* @typedef {Object} ImageAttributes
* @property {string|null} [crossOrigin] Cross origin.
* @property {ReferrerPolicy} [referrerPolicy]  Referrer policy.
*/
/**
* Create an html canvas element and returns its 2d context.
* @param {number} [width] Canvas width.
* @param {number} [height] Canvas height.
* @param {Array<HTMLCanvasElement|OffscreenCanvas>} [canvasPool] Canvas pool to take existing canvas from.
* @param {CanvasRenderingContext2DSettings} [settings] CanvasRenderingContext2DSettings
* @return {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} The context.
*/
function createCanvasContext2D(width, height, canvasPool, settings) {
	/** @type {HTMLCanvasElement|OffscreenCanvas} */
	let canvas;
	if (canvasPool && canvasPool.length) canvas = canvasPool.shift();
	else if (WORKER_OFFSCREEN_CANVAS) canvas = new class extends OffscreenCanvas {
		constructor(..._args) {
			super(..._args);
			_defineProperty(this, "style", {});
		}
	}(width !== null && width !== void 0 ? width : 300, height !== null && height !== void 0 ? height : 150);
	else canvas = document.createElement("canvas");
	if (width) canvas.width = width;
	if (height) canvas.height = height;
	return canvas.getContext("2d", settings);
}
/**
* @type {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D}
*/
var sharedCanvasContext;
/**
* @return {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} Shared canvas context.
*/
function getSharedCanvasContext2D() {
	if (!sharedCanvasContext) sharedCanvasContext = createCanvasContext2D(1, 1);
	return sharedCanvasContext;
}
/**
* Releases canvas memory to avoid exceeding memory limits in Safari.
* See https://pqina.nl/blog/total-canvas-memory-use-exceeds-the-maximum-limit/
* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context Context.
*/
function releaseCanvas(context) {
	const canvas = context.canvas;
	canvas.width = 1;
	canvas.height = 1;
	context.clearRect(0, 0, 1, 1);
}
/**
* Get the current computed width for the given element including margin,
* padding and border.
* Equivalent to jQuery's `$(el).outerWidth(true)`.
* @param {!HTMLElement} element Element.
* @return {number} The width.
*/
function outerWidth(element) {
	let width = element.offsetWidth;
	const style = getComputedStyle(element);
	width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
	return width;
}
/**
* Get the current computed height for the given element including margin,
* padding and border.
* Equivalent to jQuery's `$(el).outerHeight(true)`.
* @param {!HTMLElement} element Element.
* @return {number} The height.
*/
function outerHeight(element) {
	let height = element.offsetHeight;
	const style = getComputedStyle(element);
	height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
	return height;
}
/**
* @param {Node} newNode Node to replace old node
* @param {Node} oldNode The node to be replaced
*/
function replaceNode(newNode, oldNode) {
	const parent = oldNode.parentNode;
	if (parent) parent.replaceChild(newNode, oldNode);
}
/**
* @param {Node} node The node to remove the children from.
*/
function removeChildren(node) {
	while (node.lastChild) node.lastChild.remove();
}
/**
* Transform the children of a parent node so they match the
* provided list of children.  This function aims to efficiently
* remove, add, and reorder child nodes while maintaining a simple
* implementation (it is not guaranteed to minimize DOM operations).
* @param {Node} node The parent node whose children need reworking.
* @param {Array<Node>} children The desired children.
*/
function replaceChildren(node, children) {
	const oldChildren = node.childNodes;
	for (let i = 0;; ++i) {
		const oldChild = oldChildren[i];
		const newChild = children[i];
		if (!oldChild && !newChild) break;
		if (oldChild === newChild) continue;
		if (!oldChild) {
			node.appendChild(newChild);
			continue;
		}
		if (!newChild) {
			node.removeChild(oldChild);
			--i;
			continue;
		}
		node.insertBefore(newChild, oldChild);
	}
}
/**
* Creates a minimal structure that mocks a DIV to be used by the composite and
* layer renderer in a worker environment
* @return {HTMLDivElement} mocked DIV
*/
function createMockDiv() {
	return new Proxy({
		/**
		* @type {Array<HTMLElement>}
		*/
		childNodes: [],
		/**
		* @param {HTMLElement} node html node.
		* @return {HTMLElement} html node.
		*/
		appendChild: function(node) {
			this.childNodes.push(node);
			return node;
		},
		/**
		* dummy function, as this structure is not supposed to have a parent.
		*/
		remove: function() {},
		/**
		* @param {HTMLElement} node html node.
		* @return {HTMLElement} html node.
		*/
		removeChild: function(node) {
			const index = this.childNodes.indexOf(node);
			if (index === -1) throw new Error("Node to remove was not found");
			this.childNodes.splice(index, 1);
			return node;
		},
		/**
		* @param {HTMLElement} newNode new html node.
		* @param {HTMLElement} referenceNode reference html node.
		* @return {HTMLElement} new html node.
		*/
		insertBefore: function(newNode, referenceNode) {
			const index = this.childNodes.indexOf(referenceNode);
			if (index === -1) throw new Error("Reference node not found");
			this.childNodes.splice(index, 0, newNode);
			return newNode;
		},
		style: {}
	}, { get(target, prop, receiver) {
		if (prop === "firstElementChild") return target.childNodes.length > 0 ? target.childNodes[0] : null;
		return Reflect.get(target, prop, receiver);
	} });
}
/***
* @param {*} obj The object to check.
* @return {obj is (HTMLCanvasElement | OffscreenCanvas)} The object is a canvas.
*/
function isCanvas(obj) {
	return typeof HTMLCanvasElement !== "undefined" && obj instanceof HTMLCanvasElement || typeof OffscreenCanvas !== "undefined" && obj instanceof OffscreenCanvas;
}
//#endregion
//#region node_modules/ol/reproj.js
/**
* @module ol/reproj
*/
var brokenDiagonalRendering_;
/**
* @type {Array<HTMLCanvasElement|OffscreenCanvas>}
*/
var canvasPool = [];
/**
* This draws a small triangle into a canvas by setting the triangle as the clip region
* and then drawing a (too large) rectangle
*
* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} ctx The context in which to draw the triangle
* @param {number} u1 The x-coordinate of the second point. The first point is 0,0.
* @param {number} v1 The y-coordinate of the second point.
* @param {number} u2 The x-coordinate of the third point.
* @param {number} v2 The y-coordinate of the third point.
*/
function drawTestTriangle(ctx, u1, v1, u2, v2) {
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(u1, v1);
	ctx.lineTo(u2, v2);
	ctx.closePath();
	ctx.save();
	ctx.clip();
	ctx.fillRect(0, 0, Math.max(u1, u2) + 1, Math.max(v1, v2));
	ctx.restore();
}
/**
* Given the data from getImageData, see if the right values appear at the provided offset.
* Returns true if either the color or transparency is off
*
* @param {Uint8ClampedArray} data The data returned from getImageData
* @param {number} offset The pixel offset from the start of data.
* @return {boolean} true if the diagonal rendering is broken
*/
function verifyBrokenDiagonalRendering(data, offset) {
	return Math.abs(data[offset * 4] - 210) > 2 || Math.abs(data[offset * 4 + 3] - .75 * 255) > 2;
}
/**
* Determines if the current browser configuration can render triangular clip regions correctly.
* This value is cached so the function is only expensive the first time called.
* Firefox on Windows (as of now) does not if HWA is enabled. See https://bugzilla.mozilla.org/show_bug.cgi?id=1606976
* Chrome works, and everything seems to work on OSX and Android. This function caches the
* result. I suppose that it is conceivably possible that a browser might flip modes while the app is
* running, but lets hope not.
*
* @return {boolean} true if the Diagonal Rendering is broken.
*/
function isBrokenDiagonalRendering() {
	if (brokenDiagonalRendering_ === void 0) {
		const ctx = createCanvasContext2D(6, 6, canvasPool);
		ctx.globalCompositeOperation = "lighter";
		ctx.fillStyle = "rgba(210, 0, 0, 0.75)";
		drawTestTriangle(ctx, 4, 5, 4, 0);
		drawTestTriangle(ctx, 4, 5, 0, 5);
		const data = ctx.getImageData(0, 0, 3, 3).data;
		brokenDiagonalRendering_ = verifyBrokenDiagonalRendering(data, 0) || verifyBrokenDiagonalRendering(data, 4) || verifyBrokenDiagonalRendering(data, 8);
		releaseCanvas(ctx);
		canvasPool.push(ctx.canvas);
	}
	return brokenDiagonalRendering_;
}
/**
* Calculates ideal resolution to use from the source in order to achieve
* pixel mapping as close as possible to 1:1 during reprojection.
* The resolution is calculated regardless of what resolutions
* are actually available in the dataset (TileGrid, Image, ...).
*
* @param {import("./proj/Projection.js").default} sourceProj Source projection.
* @param {import("./proj/Projection.js").default} targetProj Target projection.
* @param {import("./coordinate.js").Coordinate} targetCenter Target center.
* @param {number} targetResolution Target resolution.
* @return {number} The best resolution to use. Can be +-Infinity, NaN or 0.
*/
function calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution) {
	const sourceCenter = transform(targetCenter, targetProj, sourceProj);
	let sourceResolution = getPointResolution(targetProj, targetResolution, targetCenter);
	const targetMetersPerUnit = targetProj.getMetersPerUnit();
	if (targetMetersPerUnit !== void 0) sourceResolution *= targetMetersPerUnit;
	const sourceMetersPerUnit = sourceProj.getMetersPerUnit();
	if (sourceMetersPerUnit !== void 0) sourceResolution /= sourceMetersPerUnit;
	const sourceExtent = sourceProj.getExtent();
	if (!sourceExtent || containsCoordinate(sourceExtent, sourceCenter)) {
		const compensationFactor = getPointResolution(sourceProj, sourceResolution, sourceCenter) / sourceResolution;
		if (isFinite(compensationFactor) && compensationFactor > 0) sourceResolution /= compensationFactor;
	}
	return sourceResolution;
}
/**
* Calculates ideal resolution to use from the source in order to achieve
* pixel mapping as close as possible to 1:1 during reprojection.
* The resolution is calculated regardless of what resolutions
* are actually available in the dataset (TileGrid, Image, ...).
*
* @param {import("./proj/Projection.js").default} sourceProj Source projection.
* @param {import("./proj/Projection.js").default} targetProj Target projection.
* @param {import("./extent.js").Extent} targetExtent Target extent
* @param {number} targetResolution Target resolution.
* @return {number} The best resolution to use. Can be +-Infinity, NaN or 0.
*/
function calculateSourceExtentResolution(sourceProj, targetProj, targetExtent, targetResolution) {
	let sourceResolution = calculateSourceResolution(sourceProj, targetProj, getCenter(targetExtent), targetResolution);
	if (!isFinite(sourceResolution) || sourceResolution <= 0) forEachCorner(targetExtent, function(corner) {
		sourceResolution = calculateSourceResolution(sourceProj, targetProj, corner, targetResolution);
		return isFinite(sourceResolution) && sourceResolution > 0;
	});
	return sourceResolution;
}
/**
* @typedef {Object} ImageExtent
* @property {import("./extent.js").Extent} extent Extent.
* @property {import("./extent.js").Extent} [clipExtent] Clip extent.
* @property {import('./DataTile.js').ImageLike} image Image.
*/
/**
* Renders the source data into new canvas based on the triangulation.
*
* @param {number} width Width of the canvas.
* @param {number} height Height of the canvas.
* @param {number} pixelRatio Pixel ratio.
* @param {number} sourceResolution Source resolution.
* @param {import("./extent.js").Extent} sourceExtent Extent of the data source.
* @param {number} targetResolution Target resolution.
* @param {import("./extent.js").Extent} targetExtent Target extent.
* @param {import("./reproj/Triangulation.js").default} triangulation Calculated triangulation.
* @param {Array<ImageExtent>} sources Array of sources.
* @param {number} gutter Gutter of the sources.
* @param {boolean} [renderEdges] Render reprojection edges.
* @param {boolean} [interpolate] Use linear interpolation when resampling.
* @param {boolean} [drawSingle] Draw single source images directly without stitchContext.
* @param {boolean} [clipExtent] Clip stitchContext to sourceExtent.
* @return {HTMLCanvasElement|OffscreenCanvas} Canvas with reprojected data.
*/
function render$1(width, height, pixelRatio, sourceResolution, sourceExtent, targetResolution, targetExtent, triangulation, sources, gutter, renderEdges, interpolate, drawSingle, clipExtent) {
	const context = createCanvasContext2D(Math.round(pixelRatio * width), Math.round(pixelRatio * height), canvasPool);
	if (!interpolate) context.imageSmoothingEnabled = false;
	if (sources.length === 0) return context.canvas;
	context.scale(pixelRatio, pixelRatio);
	function pixelRound(value) {
		return Math.round(value * pixelRatio) / pixelRatio;
	}
	context.globalCompositeOperation = "lighter";
	const sourceDataExtent = createEmpty();
	sources.forEach(function(src, i, arr) {
		extend$1(sourceDataExtent, src.extent);
	});
	let stitchContext;
	const stitchScale = pixelRatio / sourceResolution;
	const inverseScale = (interpolate ? 1 : 1 + Math.pow(2, -24)) / stitchScale;
	if (!drawSingle || sources.length !== 1 || gutter !== 0) {
		stitchContext = createCanvasContext2D(Math.round(getWidth(sourceDataExtent) * stitchScale), Math.round(getHeight(sourceDataExtent) * stitchScale), canvasPool);
		if (!interpolate) stitchContext.imageSmoothingEnabled = false;
		if (sourceExtent && clipExtent) {
			const xPos = (sourceExtent[0] - sourceDataExtent[0]) * stitchScale;
			const yPos = -(sourceExtent[3] - sourceDataExtent[3]) * stitchScale;
			const width = getWidth(sourceExtent) * stitchScale;
			const height = getHeight(sourceExtent) * stitchScale;
			stitchContext.rect(xPos, yPos, width, height);
			stitchContext.clip();
		}
		sources.forEach(function(src, i, arr) {
			if (src.image.width > 0 && src.image.height > 0) {
				if (src.clipExtent) {
					stitchContext.save();
					const xPos = (src.clipExtent[0] - sourceDataExtent[0]) * stitchScale;
					const yPos = -(src.clipExtent[3] - sourceDataExtent[3]) * stitchScale;
					const width = getWidth(src.clipExtent) * stitchScale;
					const height = getHeight(src.clipExtent) * stitchScale;
					stitchContext.rect(interpolate ? xPos : Math.round(xPos), interpolate ? yPos : Math.round(yPos), interpolate ? width : Math.round(xPos + width) - Math.round(xPos), interpolate ? height : Math.round(yPos + height) - Math.round(yPos));
					stitchContext.clip();
				}
				const xPos = (src.extent[0] - sourceDataExtent[0]) * stitchScale;
				const yPos = -(src.extent[3] - sourceDataExtent[3]) * stitchScale;
				const srcWidth = getWidth(src.extent) * stitchScale;
				const srcHeight = getHeight(src.extent) * stitchScale;
				stitchContext.drawImage(src.image, gutter, gutter, src.image.width - 2 * gutter, src.image.height - 2 * gutter, interpolate ? xPos : Math.round(xPos), interpolate ? yPos : Math.round(yPos), interpolate ? srcWidth : Math.round(xPos + srcWidth) - Math.round(xPos), interpolate ? srcHeight : Math.round(yPos + srcHeight) - Math.round(yPos));
				if (src.clipExtent) stitchContext.restore();
			}
		});
	}
	const targetTopLeft = getTopLeft(targetExtent);
	triangulation.getTriangles().forEach(function(triangle, i, arr) {
		const source = triangle.source;
		const target = triangle.target;
		let x0 = source[0][0], y0 = source[0][1];
		let x1 = source[1][0], y1 = source[1][1];
		let x2 = source[2][0], y2 = source[2][1];
		const u0 = pixelRound((target[0][0] - targetTopLeft[0]) / targetResolution);
		const v0 = pixelRound(-(target[0][1] - targetTopLeft[1]) / targetResolution);
		const u1 = pixelRound((target[1][0] - targetTopLeft[0]) / targetResolution);
		const v1 = pixelRound(-(target[1][1] - targetTopLeft[1]) / targetResolution);
		const u2 = pixelRound((target[2][0] - targetTopLeft[0]) / targetResolution);
		const v2 = pixelRound(-(target[2][1] - targetTopLeft[1]) / targetResolution);
		const sourceNumericalShiftX = x0;
		const sourceNumericalShiftY = y0;
		x0 = 0;
		y0 = 0;
		x1 -= sourceNumericalShiftX;
		y1 -= sourceNumericalShiftY;
		x2 -= sourceNumericalShiftX;
		y2 -= sourceNumericalShiftY;
		const affineCoefs = solveLinearSystem([
			[
				x1,
				y1,
				0,
				0,
				u1 - u0
			],
			[
				x2,
				y2,
				0,
				0,
				u2 - u0
			],
			[
				0,
				0,
				x1,
				y1,
				v1 - v0
			],
			[
				0,
				0,
				x2,
				y2,
				v2 - v0
			]
		]);
		if (!affineCoefs) return;
		context.save();
		context.beginPath();
		if (isBrokenDiagonalRendering() || !interpolate) {
			context.moveTo(u1, v1);
			const steps = 4;
			const ud = u0 - u1;
			const vd = v0 - v1;
			for (let step = 0; step < steps; step++) {
				context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound(step * vd / (steps - 1)));
				if (step != steps - 1) context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound((step + 1) * vd / (steps - 1)));
			}
			context.lineTo(u2, v2);
		} else {
			context.moveTo(u1, v1);
			context.lineTo(u0, v0);
			context.lineTo(u2, v2);
		}
		context.clip();
		context.transform(affineCoefs[0], affineCoefs[2], affineCoefs[1], affineCoefs[3], u0, v0);
		context.translate(sourceDataExtent[0] - sourceNumericalShiftX, sourceDataExtent[3] - sourceNumericalShiftY);
		let image;
		if (stitchContext) {
			image = stitchContext.canvas;
			context.scale(inverseScale, -inverseScale);
		} else {
			const source = sources[0];
			const extent = source.extent;
			image = source.image;
			context.scale(getWidth(extent) / image.width, -getHeight(extent) / image.height);
		}
		context.drawImage(image, 0, 0);
		context.restore();
	});
	if (stitchContext) {
		releaseCanvas(stitchContext);
		canvasPool.push(stitchContext.canvas);
	}
	if (renderEdges) {
		context.save();
		context.globalCompositeOperation = "source-over";
		context.strokeStyle = "black";
		context.lineWidth = 1;
		triangulation.getTriangles().forEach(function(triangle, i, arr) {
			const target = triangle.target;
			const u0 = (target[0][0] - targetTopLeft[0]) / targetResolution;
			const v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution;
			const u1 = (target[1][0] - targetTopLeft[0]) / targetResolution;
			const v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution;
			const u2 = (target[2][0] - targetTopLeft[0]) / targetResolution;
			const v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution;
			context.beginPath();
			context.moveTo(u1, v1);
			context.lineTo(u0, v0);
			context.lineTo(u2, v2);
			context.closePath();
			context.stroke();
		});
		context.restore();
	}
	return context.canvas;
}
//#endregion
//#region node_modules/ol/reproj/Triangulation.js
/**
* @module ol/reproj/Triangulation
*/
/**
* Single triangle; consists of 3 source points and 3 target points.
* @typedef {Object} Triangle
* @property {Array<import("../coordinate.js").Coordinate>} source Source.
* @property {Array<import("../coordinate.js").Coordinate>} target Target.
*/
/**
* Maximum number of subdivision steps during raster reprojection triangulation.
* Prevents high memory usage and large number of proj4 calls (for certain
* transformations and areas). At most `2*(2^this)` triangles are created for
* each triangulated extent (tile/image).
* @type {number}
*/
var MAX_SUBDIVISION = 10;
/**
* Maximum allowed size of triangle relative to world width. When transforming
* corners of world extent between certain projections, the resulting
* triangulation seems to have zero error and no subdivision is performed. If
* the triangle width is more than this (relative to world width; 0-1),
* subdivison is forced (up to `MAX_SUBDIVISION`). Default is `0.25`.
* @type {number}
*/
var MAX_TRIANGLE_WIDTH = .25;
/**
* @classdesc
* Class containing triangulation of the given target extent.
* Used for determining source data and the reprojection itself.
*/
var Triangulation = class {
	/**
	* @param {import("../proj/Projection.js").default} sourceProj Source projection.
	* @param {import("../proj/Projection.js").default} targetProj Target projection.
	* @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
	* @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
	* @param {number} errorThreshold Acceptable error (in source units).
	* @param {?number} destinationResolution The (optional) resolution of the destination.
	* @param {import("../transform.js").Transform} [sourceMatrix] Source transform matrix.
	*/
	constructor(sourceProj, targetProj, targetExtent, maxSourceExtent, errorThreshold, destinationResolution, sourceMatrix) {
		/**
		* @type {import("../proj/Projection.js").default}
		* @private
		*/
		this.sourceProj_ = sourceProj;
		/**
		* @type {import("../proj/Projection.js").default}
		* @private
		*/
		this.targetProj_ = targetProj;
		/** @type {!Object<string, import("../coordinate.js").Coordinate>} */
		let transformInvCache = {};
		const transformInv = sourceMatrix ? createTransformFromCoordinateTransform((input) => apply(sourceMatrix, transform(input, this.targetProj_, this.sourceProj_))) : getTransform(this.targetProj_, this.sourceProj_);
		/**
		* @param {import("../coordinate.js").Coordinate} c A coordinate.
		* @return {import("../coordinate.js").Coordinate} Transformed coordinate.
		* @private
		*/
		this.transformInv_ = function(c) {
			const key = c[0] + "/" + c[1];
			if (!transformInvCache[key]) transformInvCache[key] = transformInv(c);
			return transformInvCache[key];
		};
		/**
		* @type {import("../extent.js").Extent}
		* @private
		*/
		this.maxSourceExtent_ = maxSourceExtent;
		/**
		* @type {number}
		* @private
		*/
		this.errorThresholdSquared_ = errorThreshold * errorThreshold;
		/**
		* @type {Array<Triangle>}
		* @private
		*/
		this.triangles_ = [];
		/**
		* Indicates that the triangulation crosses edge of the source projection.
		* @type {boolean}
		* @private
		*/
		this.wrapsXInSource_ = false;
		/**
		* @type {boolean}
		* @private
		*/
		this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!maxSourceExtent && !!this.sourceProj_.getExtent() && getWidth(maxSourceExtent) >= getWidth(this.sourceProj_.getExtent());
		/**
		* @type {?number}
		* @private
		*/
		this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? getWidth(this.sourceProj_.getExtent()) : null;
		/**
		* @type {?number}
		* @private
		*/
		this.targetWorldWidth_ = this.targetProj_.getExtent() ? getWidth(this.targetProj_.getExtent()) : null;
		const destinationTopLeft = getTopLeft(targetExtent);
		const destinationTopRight = getTopRight(targetExtent);
		const destinationBottomRight = getBottomRight(targetExtent);
		const destinationBottomLeft = getBottomLeft(targetExtent);
		const sourceTopLeft = this.transformInv_(destinationTopLeft);
		const sourceTopRight = this.transformInv_(destinationTopRight);
		const sourceBottomRight = this.transformInv_(destinationBottomRight);
		const sourceBottomLeft = this.transformInv_(destinationBottomLeft);
		const maxSubdivision = MAX_SUBDIVISION + (destinationResolution ? Math.max(0, Math.ceil(Math.log2(getArea$1(targetExtent) / (destinationResolution * destinationResolution * 256 * 256)))) : 0);
		this.addQuad_(destinationTopLeft, destinationTopRight, destinationBottomRight, destinationBottomLeft, sourceTopLeft, sourceTopRight, sourceBottomRight, sourceBottomLeft, maxSubdivision);
		if (this.wrapsXInSource_) {
			let leftBound = Infinity;
			this.triangles_.forEach(function(triangle, i, arr) {
				leftBound = Math.min(leftBound, triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]);
			});
			this.triangles_.forEach((triangle) => {
				if (Math.max(triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]) - leftBound > this.sourceWorldWidth_ / 2) {
					const newTriangle = [
						[triangle.source[0][0], triangle.source[0][1]],
						[triangle.source[1][0], triangle.source[1][1]],
						[triangle.source[2][0], triangle.source[2][1]]
					];
					if (newTriangle[0][0] - leftBound > this.sourceWorldWidth_ / 2) newTriangle[0][0] -= this.sourceWorldWidth_;
					if (newTriangle[1][0] - leftBound > this.sourceWorldWidth_ / 2) newTriangle[1][0] -= this.sourceWorldWidth_;
					if (newTriangle[2][0] - leftBound > this.sourceWorldWidth_ / 2) newTriangle[2][0] -= this.sourceWorldWidth_;
					const minX = Math.min(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
					if (Math.max(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]) - minX < this.sourceWorldWidth_ / 2) triangle.source = newTriangle;
				}
			});
		}
		transformInvCache = {};
	}
	/**
	* Adds triangle to the triangulation.
	* @param {import("../coordinate.js").Coordinate} a The target a coordinate.
	* @param {import("../coordinate.js").Coordinate} b The target b coordinate.
	* @param {import("../coordinate.js").Coordinate} c The target c coordinate.
	* @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
	* @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
	* @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
	* @private
	*/
	addTriangle_(a, b, c, aSrc, bSrc, cSrc) {
		this.triangles_.push({
			source: [
				aSrc,
				bSrc,
				cSrc
			],
			target: [
				a,
				b,
				c
			]
		});
	}
	/**
	* Adds quad (points in clock-wise order) to the triangulation
	* (and reprojects the vertices) if valid.
	* Performs quad subdivision if needed to increase precision.
	*
	* @param {import("../coordinate.js").Coordinate} a The target a coordinate.
	* @param {import("../coordinate.js").Coordinate} b The target b coordinate.
	* @param {import("../coordinate.js").Coordinate} c The target c coordinate.
	* @param {import("../coordinate.js").Coordinate} d The target d coordinate.
	* @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
	* @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
	* @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
	* @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
	* @param {number} maxSubdivision Maximal allowed subdivision of the quad.
	* @private
	*/
	addQuad_(a, b, c, d, aSrc, bSrc, cSrc, dSrc, maxSubdivision) {
		const sourceQuadExtent = boundingExtent([
			aSrc,
			bSrc,
			cSrc,
			dSrc
		]);
		const sourceCoverageX = this.sourceWorldWidth_ ? getWidth(sourceQuadExtent) / this.sourceWorldWidth_ : null;
		const sourceWorldWidth = this.sourceWorldWidth_;
		const wrapsX = this.sourceProj_.canWrapX() && sourceCoverageX > .5 && sourceCoverageX < 1;
		let needsSubdivision = false;
		if (maxSubdivision > 0) {
			if (this.targetProj_.isGlobal() && this.targetWorldWidth_) needsSubdivision = getWidth(boundingExtent([
				a,
				b,
				c,
				d
			])) / this.targetWorldWidth_ > MAX_TRIANGLE_WIDTH || needsSubdivision;
			if (!wrapsX && this.sourceProj_.isGlobal() && sourceCoverageX) needsSubdivision = sourceCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
		}
		if (!needsSubdivision && this.maxSourceExtent_) {
			if (isFinite(sourceQuadExtent[0]) && isFinite(sourceQuadExtent[1]) && isFinite(sourceQuadExtent[2]) && isFinite(sourceQuadExtent[3])) {
				if (!intersects(sourceQuadExtent, this.maxSourceExtent_)) return;
			}
		}
		let isNotFinite = 0;
		if (!needsSubdivision) {
			if (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) || !isFinite(bSrc[0]) || !isFinite(bSrc[1]) || !isFinite(cSrc[0]) || !isFinite(cSrc[1]) || !isFinite(dSrc[0]) || !isFinite(dSrc[1])) if (maxSubdivision > 0) needsSubdivision = true;
			else {
				isNotFinite = (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) ? 8 : 0) + (!isFinite(bSrc[0]) || !isFinite(bSrc[1]) ? 4 : 0) + (!isFinite(cSrc[0]) || !isFinite(cSrc[1]) ? 2 : 0) + (!isFinite(dSrc[0]) || !isFinite(dSrc[1]) ? 1 : 0);
				if (isNotFinite != 1 && isNotFinite != 2 && isNotFinite != 4 && isNotFinite != 8) return;
			}
		}
		if (maxSubdivision > 0) {
			if (!needsSubdivision) {
				const center = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
				const centerSrc = this.transformInv_(center);
				let dx;
				if (wrapsX) dx = (modulo(aSrc[0], sourceWorldWidth) + modulo(cSrc[0], sourceWorldWidth)) / 2 - modulo(centerSrc[0], sourceWorldWidth);
				else dx = (aSrc[0] + cSrc[0]) / 2 - centerSrc[0];
				const dy = (aSrc[1] + cSrc[1]) / 2 - centerSrc[1];
				needsSubdivision = dx * dx + dy * dy > this.errorThresholdSquared_;
			}
			if (needsSubdivision) {
				if (Math.abs(a[0] - c[0]) <= Math.abs(a[1] - c[1])) {
					const bc = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
					const bcSrc = this.transformInv_(bc);
					const da = [(d[0] + a[0]) / 2, (d[1] + a[1]) / 2];
					const daSrc = this.transformInv_(da);
					this.addQuad_(a, b, bc, da, aSrc, bSrc, bcSrc, daSrc, maxSubdivision - 1);
					this.addQuad_(da, bc, c, d, daSrc, bcSrc, cSrc, dSrc, maxSubdivision - 1);
				} else {
					const ab = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
					const abSrc = this.transformInv_(ab);
					const cd = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2];
					const cdSrc = this.transformInv_(cd);
					this.addQuad_(a, ab, cd, d, aSrc, abSrc, cdSrc, dSrc, maxSubdivision - 1);
					this.addQuad_(ab, b, c, cd, abSrc, bSrc, cSrc, cdSrc, maxSubdivision - 1);
				}
				return;
			}
		}
		if (wrapsX) {
			if (!this.canWrapXInSource_) return;
			this.wrapsXInSource_ = true;
		}
		if ((isNotFinite & 11) == 0) this.addTriangle_(a, c, d, aSrc, cSrc, dSrc);
		if ((isNotFinite & 14) == 0) this.addTriangle_(a, c, b, aSrc, cSrc, bSrc);
		if (isNotFinite) {
			if ((isNotFinite & 13) == 0) this.addTriangle_(b, d, a, bSrc, dSrc, aSrc);
			if ((isNotFinite & 7) == 0) this.addTriangle_(b, d, c, bSrc, dSrc, cSrc);
		}
	}
	/**
	* Calculates extent of the `source` coordinates from all the triangles.
	*
	* @return {import("../extent.js").Extent} Calculated extent.
	*/
	calculateSourceExtent() {
		const extent = createEmpty();
		this.triangles_.forEach(function(triangle, i, arr) {
			const src = triangle.source;
			extendCoordinate(extent, src[0]);
			extendCoordinate(extent, src[1]);
			extendCoordinate(extent, src[2]);
		});
		return extent;
	}
	/**
	* @return {Array<Triangle>} Array of the calculated triangles.
	*/
	getTriangles() {
		return this.triangles_;
	}
};
//#endregion
//#region node_modules/ol/reproj/common.js
/**
* @module ol/reproj/common
*/
/**
* Default maximum allowed threshold  (in pixels) for reprojection
* triangulation.
* @type {number}
*/
var ERROR_THRESHOLD = .5;
//#endregion
//#region node_modules/ol/source/Source.js
/**
* @module ol/source/Source
*/
/**
* @typedef {'undefined' | 'loading' | 'ready' | 'error'} State
* State of the source, one of 'undefined', 'loading', 'ready' or 'error'.
*/
/**
* A function that takes a {@link import("../View.js").ViewStateLayerStateExtent} and returns a string or
* an array of strings representing source attributions.
*
* @typedef {function(import("../View.js").ViewStateLayerStateExtent): (string|Array<string>)} Attribution
*/
/**
* A type that can be used to provide attribution information for data sources.
*
* It represents either
* a simple string (e.g. `'© Acme Inc.'`)
* an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
* a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
*
* @typedef {string|Array<string>|Attribution} AttributionLike
*/
/**
* @typedef {Object} Options
* @property {AttributionLike} [attributions] Attributions.
* @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
* @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
* @property {import("./Source.js").State} [state='ready'] State.
* @property {boolean} [wrapX=false] WrapX.
* @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
* the nearest neighbor is used when resampling.
*/
/**
* @classdesc
* Abstract base class; normally only used for creating subclasses and not
* instantiated in apps.
* Base class for {@link module:ol/layer/Layer~Layer} sources.
*
* A generic `change` event is triggered when the state of the source changes.
* @abstract
* @api
*/
var Source = class extends BaseObject {
	/**
	* @param {Options} options Source options.
	*/
	constructor(options) {
		var _options$attributions;
		super();
		/**
		* @protected
		* @type {import("../proj/Projection.js").default|null}
		*/
		this.projection = get(options.projection);
		/**
		* @private
		* @type {?Attribution}
		*/
		this.attributions_ = adaptAttributions(options.attributions);
		/**
		* @private
		* @type {boolean}
		*/
		this.attributionsCollapsible_ = (_options$attributions = options.attributionsCollapsible) !== null && _options$attributions !== void 0 ? _options$attributions : true;
		/**
		* This source is currently loading data. Sources that defer loading to the
		* map's tile queue never set this to a `truthy` value.
		* @type {boolean|number}
		*/
		this.loading = false;
		/**
		* @private
		* @type {import("./Source.js").State}
		*/
		this.state_ = options.state !== void 0 ? options.state : "ready";
		/**
		* @private
		* @type {boolean}
		*/
		this.wrapX_ = options.wrapX !== void 0 ? options.wrapX : false;
		/**
		* @private
		* @type {boolean}
		*/
		this.interpolate_ = !!options.interpolate;
		/**
		* @protected
		* @type {function(import("../View.js").ViewOptions):void}
		*/
		this.viewResolver = null;
		/**
		* @protected
		* @type {function(Error):void}
		*/
		this.viewRejector = null;
		const self = this;
		/**
		* @private
		* @type {Promise<import("../View.js").ViewOptions>}
		*/
		this.viewPromise_ = new Promise(function(resolve, reject) {
			self.viewResolver = resolve;
			self.viewRejector = reject;
		});
	}
	/**
	* Get the attribution function for the source.
	* @return {?Attribution} Attribution function.
	* @api
	*/
	getAttributions() {
		return this.attributions_;
	}
	/**
	* @return {boolean} Attributions are collapsible.
	* @api
	*/
	getAttributionsCollapsible() {
		return this.attributionsCollapsible_;
	}
	/**
	* Get the projection of the source.
	* @return {import("../proj/Projection.js").default|null} Projection.
	* @api
	*/
	getProjection() {
		return this.projection;
	}
	/**
	* @param {import("../proj/Projection.js").default} [projection] Projection.
	* @return {Array<number>|null} Resolutions.
	*/
	getResolutions(projection) {
		return null;
	}
	/**
	* @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
	*/
	getView() {
		return this.viewPromise_;
	}
	/**
	* Get the state of the source, see {@link import("./Source.js").State} for possible states.
	* @return {import("./Source.js").State} State.
	* @api
	*/
	getState() {
		return this.state_;
	}
	/**
	* @return {boolean|undefined} Wrap X.
	*/
	getWrapX() {
		return this.wrapX_;
	}
	/**
	* @return {boolean} Use linear interpolation when resampling.
	*/
	getInterpolate() {
		return this.interpolate_;
	}
	/**
	* Refreshes the source. The source will be cleared, and data from the server will be reloaded.
	* @api
	*/
	refresh() {
		this.changed();
	}
	/**
	* Set the attributions of the source.
	* @param {AttributionLike|undefined} attributions Attributions.
	*     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
	*     or `undefined`.
	* @api
	*/
	setAttributions(attributions) {
		this.attributions_ = adaptAttributions(attributions);
		this.changed();
	}
	/**
	* Set the state of the source.
	* @param {import("./Source.js").State} state State.
	*/
	setState(state) {
		this.state_ = state;
		this.changed();
	}
};
/**
* Turns the attributions option into an attributions function.
* @param {AttributionLike|undefined} attributionLike The attribution option.
* @return {Attribution|null} An attribution function (or null).
*/
function adaptAttributions(attributionLike) {
	if (!attributionLike) return null;
	if (typeof attributionLike === "function") return attributionLike;
	if (!Array.isArray(attributionLike)) attributionLike = [attributionLike];
	return (frameState) => attributionLike;
}
//#endregion
//#region node_modules/ol/source/Tile.js
/**
* @module ol/source/Tile
*/
/***
* @template Return
* @typedef {import("../Observable.js").OnSignature<import("../Observable.js").EventTypes, import("../events/Event.js").default, Return> &
*   import("../Observable.js").OnSignature<import("../ObjectEventType.js").Types, import("../Object.js").ObjectEvent, Return> &
*   import("../Observable.js").OnSignature<import("./TileEventType.js").TileSourceEventTypes, TileSourceEvent, Return> &
*   import("../Observable.js").CombinedOnSignature<import("../Observable.js").EventTypes|import("../ObjectEventType.js").Types|
*     import("./TileEventType.js").TileSourceEventTypes, Return>} TileSourceOnSignature
*/
/**
* @typedef {Object} Options
* @property {import("./Source.js").AttributionLike} [attributions] Attributions.
* @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
* @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
* @property {number} [tilePixelRatio] TilePixelRatio.
* @property {import("../proj.js").ProjectionLike} [projection] Projection.
* @property {import("./Source.js").State} [state] State.
* @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
* @property {boolean} [wrapX=false] WrapX.
* @property {number} [transition] Transition.
* @property {string} [key] Key.
* @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
* @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
* the nearest neighbor is used when resampling.
*/
/**
* @classdesc
* Abstract base class; normally only used for creating subclasses and not
* instantiated in apps.
* Base class for sources providing images divided into a tile grid.
*
* @template {import("../Tile.js").default} [TileType=import("../Tile.js").default]
* @abstract
* @api
*/
var TileSource = class extends Source {
	/**
	* @param {Options} options SourceTile source options.
	*/
	constructor(options) {
		super({
			attributions: options.attributions,
			attributionsCollapsible: options.attributionsCollapsible,
			projection: options.projection,
			state: options.state,
			wrapX: options.wrapX,
			interpolate: options.interpolate
		});
		/***
		* @type {TileSourceOnSignature<import("../events.js").EventsKey>}
		*/
		this.on;
		/***
		* @type {TileSourceOnSignature<import("../events.js").EventsKey>}
		*/
		this.once;
		/***
		* @type {TileSourceOnSignature<void>}
		*/
		this.un;
		/**
		* @private
		* @type {number}
		*/
		this.tilePixelRatio_ = options.tilePixelRatio !== void 0 ? options.tilePixelRatio : 1;
		/**
		* @type {import("../tilegrid/TileGrid.js").default|null}
		* @protected
		*/
		this.tileGrid = options.tileGrid !== void 0 ? options.tileGrid : null;
		const tileSize = [256, 256];
		if (this.tileGrid) toSize(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), tileSize);
		/**
		* @protected
		* @type {import("../size.js").Size}
		*/
		this.tmpSize = [0, 0];
		/**
		* @private
		* @type {string}
		*/
		this.key_ = options.key || getUid(this);
		/**
		* @protected
		* @type {import("../Tile.js").Options}
		*/
		this.tileOptions = {
			transition: options.transition,
			interpolate: options.interpolate
		};
		/**
		* zDirection hint, read by the renderer. Indicates which resolution should be used
		* by a renderer if the views resolution does not match any resolution of the tile source.
		* If 0, the nearest resolution will be used. If 1, the nearest lower resolution
		* will be used. If -1, the nearest higher resolution will be used.
		* @type {number|import("../array.js").NearestDirectionFunction}
		*/
		this.zDirection = options.zDirection ? options.zDirection : 0;
	}
	/**
	* @param {import("../proj/Projection.js").default} projection Projection.
	* @return {number} Gutter.
	*/
	getGutterForProjection(projection) {
		return 0;
	}
	/**
	* Return the key to be used for all tiles in the source.
	* @return {string} The key for all tiles.
	*/
	getKey() {
		return this.key_;
	}
	/**
	* Set the value to be used as the key for all tiles in the source.
	* @param {string} key The key for tiles.
	* @protected
	*/
	setKey(key) {
		if (this.key_ !== key) {
			this.key_ = key;
			this.changed();
		}
	}
	/**
	* @param {import("../proj/Projection.js").default} [projection] Projection.
	* @return {Array<number>|null} Resolutions.
	* @override
	*/
	getResolutions(projection) {
		const tileGrid = projection ? this.getTileGridForProjection(projection) : this.tileGrid;
		if (!tileGrid) return null;
		return tileGrid.getResolutions();
	}
	/**
	* @abstract
	* @param {number} z Tile coordinate z.
	* @param {number} x Tile coordinate x.
	* @param {number} y Tile coordinate y.
	* @param {number} pixelRatio Pixel ratio.
	* @param {import("../proj/Projection.js").default} projection Projection.
	* @param {import("../structs/LRUCache.js").default<import("../Tile.js").default>} [tileCache] Tile cache.
	* @return {TileType|null} Tile.
	*/
	getTile(z, x, y, pixelRatio, projection, tileCache) {
		return abstract();
	}
	/**
	* Return the tile grid of the tile source.
	* @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
	* @api
	*/
	getTileGrid() {
		return this.tileGrid;
	}
	/**
	* @param {import("../proj/Projection.js").default} projection Projection.
	* @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
	*/
	getTileGridForProjection(projection) {
		if (!this.tileGrid) return getForProjection(projection);
		return this.tileGrid;
	}
	/**
	* Get the tile pixel ratio for this source. Subclasses may override this
	* method, which is meant to return a supported pixel ratio that matches the
	* provided `pixelRatio` as close as possible.
	* @param {number} pixelRatio Pixel ratio.
	* @return {number} Tile pixel ratio.
	*/
	getTilePixelRatio(pixelRatio) {
		return this.tilePixelRatio_;
	}
	/**
	* @param {number} z Z.
	* @param {number} pixelRatio Pixel ratio.
	* @param {import("../proj/Projection.js").default} projection Projection.
	* @return {import("../size.js").Size} Tile size.
	*/
	getTilePixelSize(z, pixelRatio, projection) {
		const tileGrid = this.getTileGridForProjection(projection);
		const tilePixelRatio = this.getTilePixelRatio(pixelRatio);
		const tileSize = toSize(tileGrid.getTileSize(z), this.tmpSize);
		if (tilePixelRatio == 1) return tileSize;
		return scale$1(tileSize, tilePixelRatio, this.tmpSize);
	}
	/**
	* Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
	* is outside the resolution and extent range of the tile grid, `null` will be
	* returned.
	* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
	* @param {import("../proj/Projection.js").default} [projection] Projection.
	* @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
	*     null if no tile URL should be created for the passed `tileCoord`.
	*/
	getTileCoordForTileUrlFunction(tileCoord, projection) {
		const gridProjection = projection !== void 0 ? projection : this.getProjection();
		const tileGrid = projection !== void 0 ? this.getTileGridForProjection(gridProjection) : this.tileGrid || this.getTileGridForProjection(gridProjection);
		if (this.getWrapX() && gridProjection.isGlobal()) tileCoord = wrapX(tileGrid, tileCoord, gridProjection);
		return withinExtentAndZ(tileCoord, tileGrid) ? tileCoord : null;
	}
	/**
	* Remove all cached reprojected tiles from the source. The next render cycle will create new tiles.
	* @api
	*/
	clear() {}
	/**
	* @override
	*/
	refresh() {
		this.clear();
		super.refresh();
	}
};
/**
* @classdesc
* Events emitted by {@link module:ol/source/Tile~TileSource} instances are instances of this
* type.
*/
var TileSourceEvent = class extends BaseEvent {
	/**
	* @param {string} type Type.
	* @param {import("../Tile.js").default} tile The tile.
	*/
	constructor(type, tile) {
		super(type);
		/**
		* The tile related to the event.
		* @type {import("../Tile.js").default}
		* @api
		*/
		this.tile = tile;
	}
};
//#endregion
//#region node_modules/ol/source/TileEventType.js
/**
* @module ol/source/TileEventType
*/
/**
* @enum {string}
*/
var TileEventType_default = {
	/**
	* Triggered when a tile starts loading.
	* @event module:ol/source/Tile.TileSourceEvent#tileloadstart
	* @api
	*/
	TILELOADSTART: "tileloadstart",
	/**
	* Triggered when a tile finishes loading, either when its data is loaded,
	* or when loading was aborted because the tile is no longer needed.
	* @event module:ol/source/Tile.TileSourceEvent#tileloadend
	* @api
	*/
	TILELOADEND: "tileloadend",
	/**
	* Triggered if tile loading results in an error. Note that this is not the
	* right place to re-fetch tiles. See {@link module:ol/ImageTile~ImageTile#load}
	* for details.
	* @event module:ol/source/Tile.TileSourceEvent#tileloaderror
	* @api
	*/
	TILELOADERROR: "tileloaderror"
};
/**
* @typedef {'tileloadstart'|'tileloadend'|'tileloaderror'} TileSourceEventTypes
*/
//#endregion
//#region node_modules/ol/DataTile.js
/**
* @module ol/DataTile
*/
/**
* @typedef {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|HTMLVideoElement|ImageBitmap} ImageLike
*/
/**
* @typedef {Uint8Array|Uint8ClampedArray|Float32Array|DataView} ArrayLike
*/
/**
* Data that can be used with a DataTile.
* @typedef {ArrayLike|ImageLike} Data
*/
/**
* @param {Data} data Tile data.
* @return {ImageLike|null} The image-like data.
*/
function asImageLike(data) {
	return data instanceof Image || data instanceof HTMLCanvasElement || data instanceof HTMLVideoElement || data instanceof ImageBitmap ? data : null;
}
/**
* @param {Data} data Tile data.
* @return {ArrayLike|null} The array-like data.
*/
function asArrayLike(data) {
	return data instanceof Uint8Array || data instanceof Uint8ClampedArray || data instanceof Float32Array || data instanceof DataView ? data : null;
}
/**
* This is set as the cancellation reason when a tile is disposed.
*/
var disposedError = /* @__PURE__ */ new Error("disposed");
/**
* @type {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D|null}
*/
var sharedContext = null;
/**
* @param {ImageLike} image The image.
* @return {Uint8ClampedArray} The data.
*/
function toArray(image) {
	if (!sharedContext) sharedContext = createCanvasContext2D(image.width, image.height, void 0, { willReadFrequently: true });
	const canvas = sharedContext.canvas;
	const width = image.width;
	if (canvas.width !== width) canvas.width = width;
	const height = image.height;
	if (canvas.height !== height) canvas.height = height;
	sharedContext.clearRect(0, 0, width, height);
	sharedContext.drawImage(image, 0, 0);
	return sharedContext.getImageData(0, 0, width, height).data;
}
/**
* @type {import('./size.js').Size}
*/
var defaultSize = [256, 256];
/**
* @typedef {Object} Options
* @property {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
* @property {function(): Promise<Data>} loader Data loader.  For loaders that generate images,
* the promise should not resolve until the image is loaded.
* @property {number} [transition=250] A duration for tile opacity
* transitions in milliseconds. A duration of 0 disables the opacity transition.
* @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
* the nearest neighbor is used when resampling.
* @property {import('./size.js').Size} [size=[256, 256]] Tile size.
* @property {AbortController} [controller] An abort controller.
* @api
*/
var DataTile = class extends Tile {
	/**
	* @param {Options} options Tile options.
	*/
	constructor(options) {
		const state = TileState_default.IDLE;
		super(options.tileCoord, state, {
			transition: options.transition,
			interpolate: options.interpolate
		});
		/**
		* @type {function(): Promise<Data>}
		* @private
		*/
		this.loader_ = options.loader;
		/**
		* @type {Data}
		* @private
		*/
		this.data_ = null;
		/**
		* @type {Error}
		* @private
		*/
		this.error_ = null;
		/**
		* @type {import('./size.js').Size|null}
		* @private
		*/
		this.size_ = options.size || null;
		/**
		* @type {AbortController|null}
		* @private
		*/
		this.controller_ = options.controller || null;
	}
	/**
	* Get the tile size.
	* @return {import('./size.js').Size} Tile size.
	*/
	getSize() {
		if (this.size_) return this.size_;
		const imageData = asImageLike(this.data_);
		if (imageData) return [imageData.width, imageData.height];
		return defaultSize;
	}
	/**
	* Get the data for the tile.
	* @return {Data} Tile data.
	* @api
	*/
	getData() {
		return this.data_;
	}
	/**
	* Get any loading error.
	* @return {Error} Loading error.
	* @api
	*/
	getError() {
		return this.error_;
	}
	/**
	* Load the tile data.
	* @api
	* @override
	*/
	load() {
		if (this.state !== TileState_default.IDLE && this.state !== TileState_default.ERROR) return;
		this.state = TileState_default.LOADING;
		this.changed();
		const self = this;
		this.loader_().then(function(data) {
			self.data_ = data;
			self.state = TileState_default.LOADED;
			self.changed();
		}).catch(function(error) {
			self.error_ = error;
			self.state = TileState_default.ERROR;
			self.changed();
		});
	}
	/**
	* Clean up.
	* @override
	*/
	disposeInternal() {
		if (this.controller_) {
			this.controller_.abort(disposedError);
			this.controller_ = null;
		}
		super.disposeInternal();
	}
};
//#endregion
//#region node_modules/ol/vec/mat4.js
/**
* @module ol/vec/mat4
*/
/** @typedef {Array<number>} Mat4 */
/**
* @return {Mat4} "4x4 matrix representing a 3D identity transform."
*/
function create$1() {
	return [
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	];
}
/**
* @param {Mat4} mat4 Flattened 4x4 matrix receiving the result.
* @param {import("../transform.js").Transform} transform Transformation matrix.
* @return {Mat4} "2D transformation matrix as flattened 4x4 matrix."
*/
function fromTransform(mat4, transform) {
	mat4[0] = transform[0];
	mat4[1] = transform[1];
	mat4[4] = transform[2];
	mat4[5] = transform[3];
	mat4[12] = transform[4];
	mat4[13] = transform[5];
	return mat4;
}
/**
* Generates a orthogonal projection matrix with the given bounds
*
* @param {number} left Left bound of the frustum
* @param {number} right Right bound of the frustum
* @param {number} bottom Bottom bound of the frustum
* @param {number} top Top bound of the frustum
* @param {number} near Near bound of the frustum
* @param {number} far Far bound of the frustum
* @param {Mat4} [out] mat4 frustum matrix will be written into
* @return {Mat4} out
*/
function orthographic(left, right, bottom, top, near, far, out) {
	var _out;
	out = (_out = out) !== null && _out !== void 0 ? _out : create$1();
	const lr = 1 / (left - right), bt = 1 / (bottom - top), nf = 1 / (near - far);
	out[0] = -2 * lr;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = -2 * bt;
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[10] = 2 * nf;
	out[11] = 0;
	out[12] = (left + right) * lr;
	out[13] = (top + bottom) * bt;
	out[14] = (far + near) * nf;
	out[15] = 1;
	return out;
}
/**
* Scales the mat4 by the dimensions in the given vec3
*
* @param {Mat4} m The matrix to scale.
* @param {number} x How much to scale in the x direction.
* @param {number} y How much to scale in the y direction.
* @param {number} z How much to scale in the z direction.
* @param {Mat4} [out] The matrix to write to.
* @return {Mat4} out
*/
function scale(m, x, y, z, out) {
	var _out2;
	out = (_out2 = out) !== null && _out2 !== void 0 ? _out2 : create$1();
	out[0] = m[0] * x;
	out[1] = m[1] * x;
	out[2] = m[2] * x;
	out[3] = m[3] * x;
	out[4] = m[4] * y;
	out[5] = m[5] * y;
	out[6] = m[6] * y;
	out[7] = m[7] * y;
	out[8] = m[8] * z;
	out[9] = m[9] * z;
	out[10] = m[10] * z;
	out[11] = m[11] * z;
	out[12] = m[12];
	out[13] = m[13];
	out[14] = m[14];
	out[15] = m[15];
	return out;
}
/**
* Translate a matrix.
*
* @param {Mat4} m the matrix to translate
* @param {number} x How much to translate in the x direction.
* @param {number} y How much to translate in the y direction.
* @param {number} z How much to translate in the z direction.
* @param {Mat4} [out] the receiving matrix
* @return {Mat4} out
*/
function translate(m, x, y, z, out) {
	var _out3;
	out = (_out3 = out) !== null && _out3 !== void 0 ? _out3 : create$1();
	let a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;
	if (m === out) {
		out[12] = m[0] * x + m[4] * y + m[8] * z + m[12];
		out[13] = m[1] * x + m[5] * y + m[9] * z + m[13];
		out[14] = m[2] * x + m[6] * y + m[10] * z + m[14];
		out[15] = m[3] * x + m[7] * y + m[11] * z + m[15];
	} else {
		a00 = m[0];
		a01 = m[1];
		a02 = m[2];
		a03 = m[3];
		a10 = m[4];
		a11 = m[5];
		a12 = m[6];
		a13 = m[7];
		a20 = m[8];
		a21 = m[9];
		a22 = m[10];
		a23 = m[11];
		out[0] = a00;
		out[1] = a01;
		out[2] = a02;
		out[3] = a03;
		out[4] = a10;
		out[5] = a11;
		out[6] = a12;
		out[7] = a13;
		out[8] = a20;
		out[9] = a21;
		out[10] = a22;
		out[11] = a23;
		out[12] = a00 * x + a10 * y + a20 * z + m[12];
		out[13] = a01 * x + a11 * y + a21 * z + m[13];
		out[14] = a02 * x + a12 * y + a22 * z + m[14];
		out[15] = a03 * x + a13 * y + a23 * z + m[15];
	}
	return out;
}
/**
* @param {number} x x translation.
* @param {number} y y translation.
* @param {number} z z translation.
* @param {Mat4} [out] optional matrix to store result
* @return {Mat4} out
*/
function translation(x, y, z, out) {
	var _out4;
	out = (_out4 = out) !== null && _out4 !== void 0 ? _out4 : create$1();
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = 1;
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[10] = 1;
	out[11] = 0;
	out[12] = x;
	out[13] = y;
	out[14] = z;
	out[15] = 1;
	return out;
}
//#endregion
//#region node_modules/ol/webgl/Canvas.js
/**
* @module ol/webgl/Canvas
*/
var VERTEX_SHADER = `
  attribute vec4 a_position;
  attribute vec4 a_texcoord;

  uniform mat4 u_matrix;
  uniform mat4 u_textureMatrix;

  varying vec2 v_texcoord;

  void main() {
    gl_Position = u_matrix * a_position;
    vec2 texcoord = (u_textureMatrix * a_texcoord).xy;
    v_texcoord = texcoord;
  }
`;
var FRAGMENT_SHADER = `
  precision mediump float;

  varying vec2 v_texcoord;

  uniform sampler2D u_texture;

  void main() {
    if (
      v_texcoord.x < 0.0 ||
      v_texcoord.y < 0.0 ||
      v_texcoord.x > 1.0 ||
      v_texcoord.y > 1.0
    ) {
      discard;
    }
    gl_FragColor = texture2D(u_texture, v_texcoord);
  }
`;
/** @typedef {import("../transform.js").Transform} Matrix */
/**
* Canvas-like operations implemented in webgl.
*/
var Canvas = class {
	/**
	* @param {WebGLRenderingContext} gl Context to render in.
	*/
	constructor(gl) {
		/**
		* @private
		* @type {WebGLRenderingContext}
		*/
		this.gl_ = gl;
		/**
		* @private
		* @type {WebGLProgram}
		*/
		this.program_ = createProgram(gl, FRAGMENT_SHADER, VERTEX_SHADER);
		this.positionLocation = gl.getAttribLocation(this.program_, "a_position");
		this.texcoordLocation = gl.getAttribLocation(this.program_, "a_texcoord");
		this.matrixLocation = gl.getUniformLocation(this.program_, "u_matrix");
		this.textureMatrixLocation = gl.getUniformLocation(this.program_, "u_textureMatrix");
		this.textureLocation = gl.getUniformLocation(this.program_, "u_texture");
		this.positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		this.positions = [
			0,
			0,
			0,
			1,
			1,
			0,
			1,
			0,
			0,
			1,
			1,
			1
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
		this.texcoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
		this.texcoords = [
			0,
			0,
			0,
			1,
			1,
			0,
			1,
			0,
			0,
			1,
			1,
			1
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texcoords), gl.STATIC_DRAW);
	}
	/**
	* 2dContext drawImage call implemented in webgl.
	* Unlike images, textures do not have a width and height associated
	* with them so we'll pass in the width and height of the texture.
	*
	* @param {WebGLTexture} tex Image to draw.
	* @param {number} texWidth Image width.
	* @param {number} texHeight Image height.
	* @param {number} srcX Top-left x-point to read src image.
	* @param {number} srcY Top-left y-point to read src image.
	* @param {number} [srcWidth] Width of source to read.
	* @param {number} [srcHeight] Height of source to read.
	* @param {number} [dstX] Top-left x-point of destination.
	* @param {number} [dstY] Top-left y-point of destination.
	* @param {number} [dstWidth] Width of written image in destination.
	* @param {number} [dstHeight] Height of written image in destination.
	* @param {number} [width] Width of canvas.
	* @param {number} [height] Height of canvas.
	*/
	drawImage(tex, texWidth, texHeight, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight, width, height) {
		const gl = this.gl_;
		if (dstX === void 0) dstX = srcX;
		if (dstY === void 0) dstY = srcY;
		if (srcWidth === void 0) srcWidth = texWidth;
		if (srcHeight === void 0) srcHeight = texHeight;
		if (dstWidth === void 0) dstWidth = srcWidth;
		if (dstHeight === void 0) dstHeight = srcHeight;
		if (width === void 0) width = gl.canvas.width;
		if (height === void 0) height = gl.canvas.height;
		gl.bindTexture(gl.TEXTURE_2D, tex);
		gl.useProgram(this.program_);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		gl.enableVertexAttribArray(this.positionLocation);
		gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
		gl.enableVertexAttribArray(this.texcoordLocation);
		gl.vertexAttribPointer(this.texcoordLocation, 2, gl.FLOAT, false, 0, 0);
		let matrix = orthographic(0, width, 0, height, -1, 1);
		matrix = translate(matrix, dstX, dstY, 0);
		matrix = scale(matrix, dstWidth, dstHeight, 1);
		gl.uniformMatrix4fv(this.matrixLocation, false, matrix);
		let texMatrix = translation(srcX / texWidth, srcY / texHeight, 0);
		texMatrix = scale(texMatrix, srcWidth / texWidth, srcHeight / texHeight, 1);
		gl.uniformMatrix4fv(this.textureMatrixLocation, false, texMatrix);
		gl.uniform1i(this.textureLocation, 0);
		gl.drawArrays(gl.TRIANGLES, 0, this.positions.length / 2);
	}
};
/**
* @param {WebGLRenderingContext} gl Rendering Context.
* @param {GLenum} type Type of shader.
* @param {string} source source of shader.
* @return {WebGLShader} [progam] The program.
*/
function createShader(gl, type, source) {
	const shader = gl.createShader(type);
	if (shader === null) throw new Error("Shader compilation failed");
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		const log = gl.getShaderInfoLog(shader);
		if (log === null) throw new Error("Shader info log creation failed");
		throw new Error(log);
	}
	return shader;
}
/**
* @param {WebGLRenderingContext} gl Rendering Context.
* @param {string} fragmentSource Fragment shader source.
* @param {string} vertexSource Vertex shader source.
* @return {WebGLProgram} [progam] The program.
*/
function createProgram(gl, fragmentSource, vertexSource) {
	const program = gl.createProgram();
	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
	if (program === null) throw new Error("Program creation failed");
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		if (gl.getProgramInfoLog(program) === null) throw new Error("Program info log creation failed");
		throw new Error();
	}
	return program;
}
//#endregion
//#region node_modules/ol/reproj/glreproj.js
/**
* @module ol/reproj/glreproj
*/
var EDGE_VERTEX_SHADER = `
  attribute vec4 a_position;

  uniform mat4 u_matrix;

  void main() {
     gl_Position = u_matrix * a_position;
  }
`;
var EDGE_FRAGMENT_SHADER = `
  precision mediump float;

  uniform vec4 u_val;
  void main() {
     gl_FragColor = u_val;
  }
`;
var TRIANGLE_VERTEX_SHADER = `
  attribute vec4 a_position;
  attribute vec2 a_texcoord;

  varying vec2 v_texcoord;

  uniform mat4 u_matrix;

  void main() {
     gl_Position = u_matrix * a_position;
     v_texcoord = a_texcoord;
  }
`;
var TRIANGLE_FRAGMENT_SHADER = `
  precision mediump float;

  varying vec2 v_texcoord;

  uniform sampler2D u_texture;

  void main() {
    if (v_texcoord.x < 0.0 || v_texcoord.x > 1.0 || v_texcoord.y < 0.0 || v_texcoord.y > 1.0) {
      discard;
    }
    gl_FragColor = texture2D(u_texture, v_texcoord);
  }
`;
/**
* Create an html canvas element and returns its webgl context.
* @param {number} [width] Canvas width.
* @param {number} [height] Canvas height.
* @param {Array<HTMLCanvasElement | OffscreenCanvas>} [canvasPool] Canvas pool to take existing canvas from.
* @param {WebGLContextAttributes} [settings] CanvasRenderingContext2DSettings
* @return {WebGLRenderingContext} The context.
*/
function createCanvasContextWebGL(width, height, canvasPool, settings) {
	/** @type {HTMLCanvasElement|OffscreenCanvas} */
	let canvas;
	if (canvasPool && canvasPool.length) canvas = canvasPool.shift();
	else if (WORKER_OFFSCREEN_CANVAS) canvas = new OffscreenCanvas(width || 300, height || 300);
	else canvas = document.createElement("canvas");
	if (width) canvas.width = width;
	if (height) canvas.height = height;
	return canvas.getContext("webgl", settings);
}
/**
* Releases canvas memory to avoid exceeding memory limits in Safari.
* See https://pqina.nl/blog/total-canvas-memory-use-exceeds-the-maximum-limit/
* @param {WebGLRenderingContext} gl Context.
*/
function releaseGLCanvas(gl) {
	const canvas = gl.canvas;
	canvas.width = 1;
	canvas.height = 1;
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
}
/**
* @type {Array<HTMLCanvasElement | OffscreenCanvas>}
*/
var canvasGLPool = [];
/**
* @typedef {Object} ImageExtent
* @property {import("../extent.js").Extent} extent Extent.
* @property {import("../extent.js").Extent} [clipExtent] Clip extent.
* @property {WebGLTexture} texture Texture.
* @property {number} width Width of texture.
* @property {number} height Height of texture.
*/
/**
* Renders the source data into new canvas based on the triangulation.
*
* @param {WebGLRenderingContext} gl the context to render in.
* @param {number} width_ Width of the canvas.
* @param {number} height_ Height of the canvas.
* @param {number} pixelRatio Pixel ratio.
* @param {number} sourceResolution Source resolution.
* @param {number} targetResolution Target resolution.
* @param {import("../extent.js").Extent} targetExtent Target extent (tile).
* @param {import("../reproj/Triangulation.js").default} triangulation Calculated triangulation.
* @param {Array<ImageExtent>} sources Array of sources.
* @param {number} gutter Gutter of the sources.
* @param {number} dataType What kind of data is the textures, must be gl.FLOAT or gl.UNSIGNED_BYTE
* TODO: Allow setting renderEdges value in the data as this is done in "data-space".
* @param {boolean | Array<number>} [renderEdges] Render reprojection edges.
* @param {boolean} [interpolate] Use linear interpolation when resampling.
* @param {boolean} [drawSingle] Draw single source images directly without stitchTexture.
* @return {{framebuffer: WebGLFramebuffer, width: number, height: number, texture: WebGLTexture}} Canvas with reprojected data.
*/
function render(gl, width_, height_, pixelRatio, sourceResolution, targetResolution, targetExtent, triangulation, sources, gutter, dataType, renderEdges, interpolate, drawSingle) {
	const width = Math.round(pixelRatio * width_);
	const height = Math.round(pixelRatio * height_);
	gl.canvas.width = width;
	gl.canvas.height = height;
	/** @type {WebGLFramebuffer | null} */
	let resultFrameBuffer;
	/** @type {WebGLTexture | null} */
	let resultTexture;
	resultTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, resultTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	if (interpolate) {
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	} else {
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	}
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, dataType, null);
	resultFrameBuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, resultFrameBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, resultTexture, 0);
	if (resultFrameBuffer === null) throw new Error("Could not create framebuffer");
	if (resultTexture === null) throw new Error("Could not create texture");
	if (sources.length === 0) return {
		width,
		height,
		framebuffer: resultFrameBuffer,
		texture: resultTexture
	};
	const sourceDataExtent = createEmpty();
	sources.forEach(function(src, i, arr) {
		extend$1(sourceDataExtent, src.extent);
	});
	/** @type {WebGLTexture | null} */
	let stitchTexture;
	/** @type {number} */
	let stitchWidth;
	/** @type {number} */
	let stitchHeight;
	const stitchScale = 1 / sourceResolution;
	if (!drawSingle || sources.length !== 1 || gutter !== 0) {
		stitchTexture = gl.createTexture();
		if (resultTexture === null) throw new Error("Could not create texture");
		stitchWidth = Math.round(getWidth(sourceDataExtent) * stitchScale);
		stitchHeight = Math.round(getHeight(sourceDataExtent) * stitchScale);
		const maxTexSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
		const largeSide = Math.max(stitchWidth, stitchHeight);
		const scaleFactor = largeSide > maxTexSize ? maxTexSize / largeSide : 1;
		const stitchWidthFixed = Math.round(stitchWidth * scaleFactor);
		const stitchHeightFixed = Math.round(stitchHeight * scaleFactor);
		gl.bindTexture(gl.TEXTURE_2D, stitchTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		if (interpolate) {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		} else {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		}
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, stitchWidthFixed, stitchHeightFixed, 0, gl.RGBA, dataType, null);
		const fb = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, stitchTexture, 0);
		const webGLCanvas = new Canvas(gl);
		sources.forEach(function(src, i, arr) {
			const xPos = (src.extent[0] - sourceDataExtent[0]) * stitchScale * scaleFactor;
			const yPos = -(src.extent[3] - sourceDataExtent[3]) * stitchScale * scaleFactor;
			const srcWidth = getWidth(src.extent) * stitchScale * scaleFactor;
			const srcHeight = getHeight(src.extent) * stitchScale * scaleFactor;
			gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
			gl.viewport(0, 0, stitchWidthFixed, stitchHeightFixed);
			if (src.clipExtent) {
				const xPos = (src.clipExtent[0] - sourceDataExtent[0]) * stitchScale * scaleFactor;
				const yPos = -(src.clipExtent[3] - sourceDataExtent[3]) * stitchScale * scaleFactor;
				const width = getWidth(src.clipExtent) * stitchScale * scaleFactor;
				const height = getHeight(src.clipExtent) * stitchScale * scaleFactor;
				gl.enable(gl.SCISSOR_TEST);
				gl.scissor(interpolate ? xPos : Math.round(xPos), interpolate ? yPos : Math.round(yPos), interpolate ? width : Math.round(xPos + width) - Math.round(xPos), interpolate ? height : Math.round(yPos + height) - Math.round(yPos));
			}
			webGLCanvas.drawImage(src.texture, src.width, src.height, gutter, gutter, src.width - 2 * gutter, src.height - 2 * gutter, interpolate ? xPos : Math.round(xPos), interpolate ? yPos : Math.round(yPos), interpolate ? srcWidth : Math.round(xPos + srcWidth) - Math.round(xPos), interpolate ? srcHeight : Math.round(yPos + srcHeight) - Math.round(yPos), stitchWidthFixed, stitchHeightFixed);
			gl.disable(gl.SCISSOR_TEST);
		});
		gl.deleteFramebuffer(fb);
	} else {
		stitchTexture = sources[0].texture;
		stitchWidth = sources[0].width;
		stitchHeight = sources[0].width;
	}
	const targetTopLeft = getTopLeft(targetExtent);
	const sourceTopLeft = getTopLeft(sourceDataExtent);
	const getUVs = (target) => {
		const u0 = (target[0][0] - targetTopLeft[0]) / targetResolution * pixelRatio;
		const v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution * pixelRatio;
		return {
			u1: (target[1][0] - targetTopLeft[0]) / targetResolution * pixelRatio,
			v1: -(target[1][1] - targetTopLeft[1]) / targetResolution * pixelRatio,
			u0,
			v0,
			u2: (target[2][0] - targetTopLeft[0]) / targetResolution * pixelRatio,
			v2: -(target[2][1] - targetTopLeft[1]) / targetResolution * pixelRatio
		};
	};
	gl.bindFramebuffer(gl.FRAMEBUFFER, resultFrameBuffer);
	gl.viewport(0, 0, width, height);
	{
		/** @type {Array<number>} */
		const vertices = [];
		/** @type {Array<number>} */
		const texcoords = [];
		const triProgram = createProgram(gl, TRIANGLE_FRAGMENT_SHADER, TRIANGLE_VERTEX_SHADER);
		gl.useProgram(triProgram);
		const textureLocation = gl.getUniformLocation(triProgram, "u_texture");
		gl.bindTexture(gl.TEXTURE_2D, stitchTexture);
		gl.uniform1i(textureLocation, 0);
		triangulation.getTriangles().forEach(function(triangle, i, arr) {
			const source = triangle.source;
			const target = triangle.target;
			const { u1, v1, u0, v0, u2, v2 } = getUVs(target);
			const su0 = (source[0][0] - sourceTopLeft[0]) / sourceResolution / stitchWidth;
			const sv0 = -(source[0][1] - sourceTopLeft[1]) / sourceResolution / stitchHeight;
			const su1 = (source[1][0] - sourceTopLeft[0]) / sourceResolution / stitchWidth;
			const sv1 = -(source[1][1] - sourceTopLeft[1]) / sourceResolution / stitchHeight;
			const su2 = (source[2][0] - sourceTopLeft[0]) / sourceResolution / stitchWidth;
			const sv2 = -(source[2][1] - sourceTopLeft[1]) / sourceResolution / stitchHeight;
			vertices.push(u1, v1, u0, v0, u2, v2);
			texcoords.push(su1, sv1, su0, sv0, su2, sv2);
		});
		const matrix = orthographic(0, width, height, 0, -1, 1);
		const matrixLocation = gl.getUniformLocation(triProgram, "u_matrix");
		gl.uniformMatrix4fv(matrixLocation, false, matrix);
		const positionLocation = gl.getAttribLocation(triProgram, "a_position");
		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(positionLocation);
		const texcoordLocation = gl.getAttribLocation(triProgram, "a_texcoord");
		const texcoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
		gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(texcoordLocation);
		gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
	}
	if (renderEdges) {
		const edgeProgram = createProgram(gl, EDGE_FRAGMENT_SHADER, EDGE_VERTEX_SHADER);
		gl.useProgram(edgeProgram);
		const matrix = orthographic(0, width, height, 0, -1, 1);
		const matrixLocation = gl.getUniformLocation(edgeProgram, "u_matrix");
		gl.uniformMatrix4fv(matrixLocation, false, matrix);
		const burnval = Array.isArray(renderEdges) ? renderEdges : [
			0,
			0,
			0,
			255
		];
		const burnvalLocation = gl.getUniformLocation(edgeProgram, "u_val");
		gl.uniform4fv(burnvalLocation, burnval);
		const positionLocation = gl.getAttribLocation(edgeProgram, "a_position");
		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(positionLocation);
		/** @type {Array<number>} */
		const lines = triangulation.getTriangles().reduce(function(lines, triangle) {
			const target = triangle.target;
			const { u1, v1, u0, v0, u2, v2 } = getUVs(target);
			return lines.concat([
				u1,
				v1,
				u0,
				v0,
				u0,
				v0,
				u2,
				v2,
				u2,
				v2,
				u1,
				v1
			]);
		}, []);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lines), gl.STATIC_DRAW);
		gl.drawArrays(gl.LINES, 0, lines.length / 2);
	}
	return {
		width,
		height,
		framebuffer: resultFrameBuffer,
		texture: resultTexture
	};
}
//#endregion
//#region node_modules/ol/reproj/DataTile.js
/**
* @module ol/reproj/DataTile
*/
/**
* @typedef {function(number, number, number, number) : import("../DataTile.js").default} TileGetter
*/
/**
* @typedef {Object} TileOffset
* @property {DataTile} tile Tile.
* @property {number} offset Offset.
*/
/**
* @typedef {Object} Options
* @property {import("../proj/Projection.js").default} sourceProj Source projection.
* @property {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
* @property {import("../proj/Projection.js").default} targetProj Target projection.
* @property {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
* @property {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
* @property {import("../tilecoord.js").TileCoord} [wrappedTileCoord] Coordinate of the tile wrapped in X.
* @property {number} pixelRatio Pixel ratio.
* @property {number} gutter Gutter of the source tiles.
* @property {TileGetter} getTileFunction Function returning source tiles (z, x, y, pixelRatio).
* @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
* the nearest neighbor is used when resampling.
* @property {number} [errorThreshold] Acceptable reprojection error (in px).
* @property {number} [transition=250] A duration for tile opacity
* transitions in milliseconds. A duration of 0 disables the opacity transition.
* @property {import("../transform.js").Transform} [transformMatrix] Source transform matrix.
* @property {boolean} [renderEdges] Render reprojection edges.
*/
/**
* @classdesc
* Class encapsulating single reprojected data tile.
* See {@link module:ol/source/DataTile~DataTileSource}.
*
*/
var ReprojDataTile = class extends DataTile {
	/**
	* @param {Options} options Tile options.
	*/
	constructor(options) {
		super({
			tileCoord: options.tileCoord,
			loader: () => Promise.resolve(new Uint8ClampedArray(4)),
			interpolate: options.interpolate,
			transition: options.transition
		});
		/**
		* @private
		* @type {boolean | Array<number>}
		*/
		this.renderEdges_ = options.renderEdges !== void 0 ? options.renderEdges : false;
		/**
		* @private
		* @type {number}
		*/
		this.pixelRatio_ = options.pixelRatio;
		/**
		* @private
		* @type {number}
		*/
		this.gutter_ = options.gutter;
		/**
		* @type {import("../DataTile.js").Data}
		* @private
		*/
		this.reprojData_ = null;
		/**
		* @type {Error}
		* @private
		*/
		this.reprojError_ = null;
		/**
		* @type {import('../size.js').Size}
		* @private
		*/
		this.reprojSize_ = void 0;
		/**
		* @private
		* @type {import("../tilegrid/TileGrid.js").default}
		*/
		this.sourceTileGrid_ = options.sourceTileGrid;
		/**
		* @private
		* @type {import("../tilegrid/TileGrid.js").default}
		*/
		this.targetTileGrid_ = options.targetTileGrid;
		/**
		* @private
		* @type {import("../tilecoord.js").TileCoord}
		*/
		this.wrappedTileCoord_ = options.wrappedTileCoord || options.tileCoord;
		/**
		* @private
		* @type {!Array<TileOffset>}
		*/
		this.sourceTiles_ = [];
		/**
		* @private
		* @type {?Array<import("../events.js").EventsKey>}
		*/
		this.sourcesListenerKeys_ = null;
		/**
		* @private
		* @type {number}
		*/
		this.sourceZ_ = 0;
		const sourceProj = options.sourceProj;
		const sourceProjExtent = sourceProj.getExtent();
		const sourceTileGridExtent = options.sourceTileGrid.getExtent();
		/**
		* @private
		* @type {import("../extent.js").Extent}
		*/
		this.clipExtent_ = sourceProj.canWrapX() ? sourceTileGridExtent ? getIntersection(sourceProjExtent, sourceTileGridExtent) : sourceProjExtent : sourceTileGridExtent;
		const targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
		const maxTargetExtent = this.targetTileGrid_.getExtent();
		let maxSourceExtent = this.sourceTileGrid_.getExtent();
		const limitedTargetExtent = maxTargetExtent ? getIntersection(targetExtent, maxTargetExtent) : targetExtent;
		if (getArea$1(limitedTargetExtent) === 0) {
			this.state = TileState_default.EMPTY;
			return;
		}
		if (sourceProjExtent) if (!maxSourceExtent) maxSourceExtent = sourceProjExtent;
		else maxSourceExtent = getIntersection(maxSourceExtent, sourceProjExtent);
		const targetResolution = this.targetTileGrid_.getResolution(this.wrappedTileCoord_[0]);
		const targetProj = options.targetProj;
		const sourceResolution = calculateSourceExtentResolution(sourceProj, targetProj, limitedTargetExtent, targetResolution);
		if (!isFinite(sourceResolution) || sourceResolution <= 0) {
			this.state = TileState_default.EMPTY;
			return;
		}
		const errorThresholdInPixels = options.errorThreshold !== void 0 ? options.errorThreshold : ERROR_THRESHOLD;
		/**
		* @private
		* @type {!import("./Triangulation.js").default}
		*/
		this.triangulation_ = new Triangulation(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution, options.transformMatrix);
		if (this.triangulation_.getTriangles().length === 0) {
			this.state = TileState_default.EMPTY;
			return;
		}
		this.sourceZ_ = this.sourceTileGrid_.getZForResolution(sourceResolution);
		let sourceExtent = this.triangulation_.calculateSourceExtent();
		if (maxSourceExtent) if (sourceProj.canWrapX()) {
			sourceExtent[1] = clamp(sourceExtent[1], maxSourceExtent[1], maxSourceExtent[3]);
			sourceExtent[3] = clamp(sourceExtent[3], maxSourceExtent[1], maxSourceExtent[3]);
		} else sourceExtent = getIntersection(sourceExtent, maxSourceExtent);
		if (!getArea$1(sourceExtent)) this.state = TileState_default.EMPTY;
		else {
			let worldWidth = 0;
			let worldsAway = 0;
			if (sourceProj.canWrapX()) {
				worldWidth = getWidth(sourceProjExtent);
				worldsAway = Math.floor((sourceExtent[0] - sourceProjExtent[0]) / worldWidth);
			}
			wrapAndSliceX(sourceExtent.slice(), sourceProj, true).forEach((extent) => {
				const sourceRange = this.sourceTileGrid_.getTileRangeForExtentAndZ(extent, this.sourceZ_);
				const getTile = options.getTileFunction;
				for (let srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) for (let srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
					const tile = getTile(this.sourceZ_, srcX, srcY, this.pixelRatio_);
					if (tile) {
						const offset = worldsAway * worldWidth;
						this.sourceTiles_.push({
							tile,
							offset
						});
					}
				}
				++worldsAway;
			});
			if (this.sourceTiles_.length === 0) this.state = TileState_default.EMPTY;
		}
	}
	/**
	* Get the tile size.
	* @return {import('../size.js').Size} Tile size.
	* @override
	*/
	getSize() {
		return this.reprojSize_;
	}
	/**
	* Get the data for the tile.
	* @return {import("../DataTile.js").Data} Tile data.
	* @override
	*/
	getData() {
		return this.reprojData_;
	}
	/**
	* Get any loading error.
	* @return {Error} Loading error.
	* @override
	*/
	getError() {
		return this.reprojError_;
	}
	/**
	* @private
	*/
	reproject_() {
		const dataSources = [];
		let imageLike = false;
		this.sourceTiles_.forEach((source) => {
			var _this$clipExtent_;
			const tile = source.tile;
			if (!tile || tile.getState() !== TileState_default.LOADED) return;
			const size = tile.getSize();
			const gutter = this.gutter_;
			/**
			* @type {import("../DataTile.js").ArrayLike}
			*/
			let tileData;
			const arrayData = asArrayLike(tile.getData());
			if (arrayData) tileData = arrayData;
			else {
				imageLike = true;
				tileData = toArray(asImageLike(tile.getData()));
			}
			const pixelSize = [size[0] + 2 * gutter, size[1] + 2 * gutter];
			const isFloat = tileData instanceof Float32Array;
			const pixelCount = pixelSize[0] * pixelSize[1];
			const DataType = isFloat ? Float32Array : Uint8ClampedArray;
			const tileDataR = new DataType(tileData.buffer);
			const bytesPerElement = DataType.BYTES_PER_ELEMENT;
			const bytesPerPixel = bytesPerElement * tileDataR.length / pixelCount;
			const bytesPerRow = tileDataR.byteLength / pixelSize[1];
			const bandCount = Math.floor(bytesPerRow / bytesPerElement / pixelSize[0]);
			const extent = this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord);
			extent[0] += source.offset;
			extent[2] += source.offset;
			const clipExtent = (_this$clipExtent_ = this.clipExtent_) === null || _this$clipExtent_ === void 0 ? void 0 : _this$clipExtent_.slice();
			if (clipExtent) {
				clipExtent[0] += source.offset;
				clipExtent[2] += source.offset;
			}
			dataSources.push({
				extent,
				clipExtent,
				data: tileDataR,
				dataType: DataType,
				bytesPerPixel,
				pixelSize,
				bandCount
			});
		});
		this.sourceTiles_.length = 0;
		if (dataSources.length === 0) {
			this.state = TileState_default.ERROR;
			this.changed();
			return;
		}
		const z = this.wrappedTileCoord_[0];
		const size = this.targetTileGrid_.getTileSize(z);
		const targetWidth = typeof size === "number" ? size : size[0];
		const targetHeight = typeof size === "number" ? size : size[1];
		const outWidth = Math.round(targetWidth * this.pixelRatio_);
		const outHeight = Math.round(targetHeight * this.pixelRatio_);
		const targetResolution = this.targetTileGrid_.getResolution(z);
		const sourceResolution = this.sourceTileGrid_.getResolution(this.sourceZ_);
		const targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
		const bandCount = dataSources[0].bandCount;
		const dataR = new dataSources[0].dataType(bandCount * outWidth * outHeight);
		const gl = createCanvasContextWebGL(outWidth, outHeight, canvasGLPool, {
			premultipliedAlpha: false,
			antialias: false
		});
		let willInterpolate;
		const format = gl.RGBA;
		let textureType;
		if (dataSources[0].dataType == Float32Array) {
			textureType = gl.FLOAT;
			gl.getExtension("WEBGL_color_buffer_float");
			gl.getExtension("OES_texture_float");
			gl.getExtension("EXT_float_blend");
			willInterpolate = gl.getExtension("OES_texture_float_linear") !== null && this.interpolate;
		} else {
			textureType = gl.UNSIGNED_BYTE;
			willInterpolate = this.interpolate;
		}
		const BANDS_PR_REPROJ = 4;
		const reprojs = Math.ceil(bandCount / BANDS_PR_REPROJ);
		for (let reproj = reprojs - 1; reproj >= 0; --reproj) {
			const sources = [];
			for (let i = 0, len = dataSources.length; i < len; ++i) {
				const dataSource = dataSources[i];
				const pixelSize = dataSource.pixelSize;
				const width = pixelSize[0];
				const height = pixelSize[1];
				const data = new dataSource.dataType(BANDS_PR_REPROJ * width * height);
				const dataS = dataSource.data;
				let offset = reproj * BANDS_PR_REPROJ;
				for (let j = 0, len = data.length; j < len; j += BANDS_PR_REPROJ) {
					data[j] = dataS[offset];
					data[j + 1] = dataS[offset + 1];
					data[j + 2] = dataS[offset + 2];
					data[j + 3] = dataS[offset + 3];
					offset += bandCount;
				}
				const texture = gl.createTexture();
				gl.bindTexture(gl.TEXTURE_2D, texture);
				if (willInterpolate) {
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				} else {
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				}
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, textureType, data);
				sources.push({
					extent: dataSource.extent,
					clipExtent: dataSource.clipExtent,
					texture,
					width,
					height
				});
			}
			const { framebuffer, width, height } = render(gl, targetWidth, targetHeight, this.pixelRatio_, sourceResolution, targetResolution, targetExtent, this.triangulation_, sources, this.gutter_, textureType, this.renderEdges_, willInterpolate);
			const rows = width;
			const cols = height * BANDS_PR_REPROJ;
			const data = new dataSources[0].dataType(rows * cols);
			gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
			gl.readPixels(0, 0, width, height, gl.RGBA, textureType, data);
			let offset = reproj * BANDS_PR_REPROJ;
			for (let i = 0, len = data.length; i < len; i += BANDS_PR_REPROJ) {
				const flipY = (rows - 1 - (i / cols | 0)) * cols + i % cols;
				dataR[offset] = data[flipY];
				dataR[offset + 1] = data[flipY + 1];
				dataR[offset + 2] = data[flipY + 2];
				dataR[offset + 3] = data[flipY + 3];
				offset += bandCount;
			}
		}
		releaseGLCanvas(gl);
		canvasGLPool.push(gl.canvas);
		if (imageLike) {
			const context = createCanvasContext2D(targetWidth, targetHeight);
			const imageData = new ImageData(dataR, targetWidth);
			context.putImageData(imageData, 0, 0);
			this.reprojData_ = context.canvas;
		} else this.reprojData_ = dataR;
		this.reprojSize_ = [outWidth, outHeight];
		this.state = TileState_default.LOADED;
		this.changed();
	}
	/**
	* Load not yet loaded URI.
	* @override
	*/
	load() {
		if (this.state !== TileState_default.IDLE && this.state !== TileState_default.ERROR) return;
		this.state = TileState_default.LOADING;
		this.changed();
		let leftToLoad = 0;
		this.sourcesListenerKeys_ = [];
		this.sourceTiles_.forEach(({ tile }) => {
			const state = tile.getState();
			if (state !== TileState_default.IDLE && state !== TileState_default.LOADING) return;
			leftToLoad++;
			const sourceListenKey = listen(tile, EventType_default.CHANGE, () => {
				const state = tile.getState();
				if (state == TileState_default.LOADED || state == TileState_default.ERROR || state == TileState_default.EMPTY) {
					unlistenByKey(sourceListenKey);
					leftToLoad--;
					if (leftToLoad === 0) {
						this.unlistenSources_();
						this.reproject_();
					}
				}
			});
			this.sourcesListenerKeys_.push(sourceListenKey);
		});
		if (leftToLoad === 0) setTimeout(this.reproject_.bind(this), 0);
		else this.sourceTiles_.forEach(function({ tile }) {
			if (tile.getState() == TileState_default.IDLE) tile.load();
		});
	}
	/**
	* @private
	*/
	unlistenSources_() {
		this.sourcesListenerKeys_.forEach(unlistenByKey);
		this.sourcesListenerKeys_ = null;
	}
};
//#endregion
//#region node_modules/ol/source/DataTile.js
/**
* @module ol/source/DataTile
*/
/**
* @typedef {'anonymous'|'use-credentials'} CrossOriginAttribute
*/
/**
* @typedef {Object} LoaderOptions
* @property {AbortSignal} signal An abort controller signal.
* @property {CrossOriginAttribute} [crossOrigin] The cross-origin attribute for images.
* @property {ReferrerPolicy} [referrerPolicy] The `referrerPolicy` property for images.
* @property {number} [maxY] The maximum y coordinate at the given z level.  Will be undefined if the
* underlying tile grid does not have a known extent.
*/
/**
* Data tile loading function.  The function is called with z, x, and y tile coordinates and
* returns {@link import("../DataTile.js").Data data} for a tile or a promise for the same.
* @typedef {function(number, number, number, LoaderOptions) : (import("../DataTile.js").Data|Promise<import("../DataTile.js").Data>)} Loader
*/
/**
* @typedef {Object} Options
* @property {Loader} [loader] Data loader.  Called with z, x, and y tile coordinates.
* Returns {@link import("../DataTile.js").Data data} for a tile or a promise for the same.
* For loaders that generate images, the promise should not resolve until the image is loaded.
* @property {import("./Source.js").AttributionLike} [attributions] Attributions.
* @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
* @property {number} [maxZoom=42] Optional max zoom level. Not used if `tileGrid` is provided.
* @property {number} [minZoom=0] Optional min zoom level. Not used if `tileGrid` is provided.
* @property {number|import("../size.js").Size} [tileSize=[256, 256]] The pixel width and height of the source tiles.
* This may be different than the rendered pixel size if a `tileGrid` is provided.
* @property {number} [gutter=0] The size in pixels of the gutter around data tiles to ignore.
* This allows artifacts of rendering at tile edges to be ignored.
* Supported data should be wider and taller than the tile size by a value of `2 x gutter`.
* @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
* @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Tile projection.
* @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
* @property {import("./Source.js").State} [state] The source state.
* @property {boolean} [wrapX=false] Render tiles beyond the antimeridian.
* @property {number} [transition] Transition time when fading in new tiles (in milliseconds).
* @property {number} [bandCount=4] Number of bands represented in the data.
* @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
* the nearest neighbor is used when resampling.
* @property {CrossOriginAttribute} [crossOrigin='anonymous'] The crossOrigin property to pass to loaders for image data.
* @property {ReferrerPolicy} [referrerPolicy] The `referrerPolicy` property for loaded images.
* @property {string} [key] Key for use in caching tiles.
* @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
* Choose whether to use tiles with a higher or lower zoom level when between integer
* zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
*/
/**
* @classdesc
* A source for typed array data tiles.
*
* @fires import("./Tile.js").TileSourceEvent
* @template {import("../Tile.js").default} [TileType=DataTile]
* @extends TileSource<TileType>
* @api
*/
var DataTileSource = class extends TileSource {
	/**
	* @param {Options} options DataTile source options.
	*/
	constructor(options) {
		const projection = options.projection === void 0 ? "EPSG:3857" : options.projection;
		let tileGrid = options.tileGrid;
		if (tileGrid === void 0 && projection) tileGrid = createXYZ({
			extent: extentFromProjection(projection),
			maxResolution: options.maxResolution,
			maxZoom: options.maxZoom,
			minZoom: options.minZoom,
			tileSize: options.tileSize
		});
		super({
			cacheSize: .1,
			attributions: options.attributions,
			attributionsCollapsible: options.attributionsCollapsible,
			projection,
			tileGrid,
			state: options.state,
			wrapX: options.wrapX,
			transition: options.transition,
			interpolate: options.interpolate,
			key: options.key,
			zDirection: options.zDirection
		});
		/**
		* @private
		* @type {number}
		*/
		this.gutter_ = options.gutter !== void 0 ? options.gutter : 0;
		/**
		* @private
		* @type {import('../size.js').Size|null}
		*/
		this.tileSize_ = options.tileSize ? toSize(options.tileSize) : null;
		/**
		* @private
		* @type {Array<import('../size.js').Size>|null}
		*/
		this.tileSizes_ = null;
		/**
		* @private
		* @type {!Object<string, boolean>}
		*/
		this.tileLoadingKeys_ = {};
		/**
		* @private
		*/
		this.loader_ = options.loader;
		/**
		* @private
		*/
		this.handleTileChange_ = this.handleTileChange_.bind(this);
		/**
		* @type {number}
		*/
		this.bandCount = options.bandCount === void 0 ? 4 : options.bandCount;
		/**
		* The 1-based band index for the nodata alpha band.
		* @type {number|undefined}
		*/
		this.nodataBandIndex;
		/**
		* @private
		* @type {!Object<string, import("../tilegrid/TileGrid.js").default>}
		*/
		this.tileGridForProjection_ = {};
		/**
		* @private
		* @type {CrossOriginAttribute}
		*/
		this.crossOrigin_ = options.crossOrigin || "anonymous";
		/**
		* @private
		* @type {ReferrerPolicy}
		*/
		this.referrerPolicy_ = options.referrerPolicy;
		/**
		* @type {import("../transform.js").Transform|null}
		*/
		this.transformMatrix = null;
	}
	/**
	* Set the source tile sizes.  The length of the array is expected to match the number of
	* levels in the tile grid.
	* @protected
	* @param {Array<import('../size.js').Size>} tileSizes An array of tile sizes.
	*/
	setTileSizes(tileSizes) {
		this.tileSizes_ = tileSizes;
	}
	/**
	* Get the source tile size at the given zoom level.  This may be different than the rendered tile
	* size.
	* @protected
	* @param {number} z Tile zoom level.
	* @return {import('../size.js').Size} The source tile size.
	*/
	getTileSize(z) {
		if (this.tileSizes_) return this.tileSizes_[z];
		if (this.tileSize_) return this.tileSize_;
		const tileGrid = this.getTileGrid();
		return tileGrid ? toSize(tileGrid.getTileSize(z)) : [256, 256];
	}
	/**
	* @param {import("../proj/Projection.js").default} projection Projection.
	* @return {number} Gutter.
	* @override
	*/
	getGutterForProjection(projection) {
		const thisProj = this.getProjection();
		if ((!thisProj || equivalent$1(thisProj, projection)) && !this.transformMatrix) return this.gutter_;
		return 0;
	}
	/**
	* @param {Loader} loader The data loader.
	* @protected
	*/
	setLoader(loader) {
		this.loader_ = loader;
	}
	/**
	* @param {number} z Tile coordinate z.
	* @param {number} x Tile coordinate x.
	* @param {number} y Tile coordinate y.
	* @param {import("../proj/Projection.js").default} targetProj The output projection.
	* @param {import("../proj/Projection.js").default} sourceProj The input projection.
	* @param {import("../structs/LRUCache.js").default<import("../Tile.js").default>} [tileCache] Tile cache.
	* @return {!TileType} Tile.
	*/
	getReprojTile_(z, x, y, targetProj, sourceProj, tileCache) {
		const sourceTileGrid = this.tileGrid || this.getTileGridForProjection(sourceProj || targetProj);
		const reprojTilePixelRatio = Math.max.apply(null, sourceTileGrid.getResolutions().map((r, z) => {
			const tileSize = toSize(sourceTileGrid.getTileSize(z));
			const textureSize = this.getTileSize(z);
			return Math.max(textureSize[0] / tileSize[0], textureSize[1] / tileSize[1]);
		}));
		const targetTileGrid = this.getTileGridForProjection(targetProj);
		const tileCoord = [
			z,
			x,
			y
		];
		const wrappedTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, targetProj);
		const tile = new ReprojDataTile(Object.assign({
			sourceProj: sourceProj || targetProj,
			sourceTileGrid,
			targetProj,
			targetTileGrid,
			tileCoord,
			wrappedTileCoord,
			pixelRatio: reprojTilePixelRatio,
			gutter: this.gutter_,
			getTileFunction: (z, x, y, pixelRatio) => this.getTile(z, x, y, pixelRatio, void 0, tileCache),
			transformMatrix: this.transformMatrix
		}, this.tileOptions));
		tile.key = this.getKey();
		return tile;
	}
	/**
	* @param {number} z Tile coordinate z.
	* @param {number} x Tile coordinate x.
	* @param {number} y Tile coordinate y.
	* @param {number} pixelRatio Pixel ratio.
	* @param {import("../proj/Projection.js").default} [projection] Projection.
	* @param {import("../structs/LRUCache.js").default<import("../Tile.js").default>} [tileCache] Tile cache.
	* @return {TileType|null} Tile (or null if outside source extent).
	* @override
	*/
	getTile(z, x, y, pixelRatio, projection, tileCache) {
		var _this$getTileGrid;
		const sourceProjection = this.getProjection();
		if (projection && (sourceProjection && !equivalent$1(sourceProjection, projection) || this.transformMatrix)) return this.getReprojTile_(z, x, y, projection, sourceProjection, tileCache);
		const size = this.getTileSize(z);
		const sourceLoader = this.loader_;
		const controller = new AbortController();
		/**
		* @type {LoaderOptions}
		*/
		const loaderOptions = {
			signal: controller.signal,
			crossOrigin: this.crossOrigin_,
			referrerPolicy: this.referrerPolicy_
		};
		const tileCoord = this.getTileCoordForTileUrlFunction([
			z,
			x,
			y
		]);
		if (!tileCoord) return null;
		const key = this.getKey();
		const cacheKey = getCacheKey(this, key, z, x, y);
		if (tileCache && tileCache.containsKey(cacheKey)) return tileCache.get(cacheKey);
		const requestZ = tileCoord[0];
		const requestX = tileCoord[1];
		const requestY = tileCoord[2];
		const range = (_this$getTileGrid = this.getTileGrid()) === null || _this$getTileGrid === void 0 ? void 0 : _this$getTileGrid.getFullTileRange(requestZ);
		if (range) loaderOptions.maxY = range.getHeight() - 1;
		function loader() {
			return toPromise(function() {
				return sourceLoader(requestZ, requestX, requestY, loaderOptions);
			});
		}
		const tile = new DataTile(Object.assign({
			tileCoord: [
				z,
				x,
				y
			],
			loader,
			size,
			controller
		}, this.tileOptions));
		tile.key = this.getKey();
		tile.addEventListener(EventType_default.CHANGE, this.handleTileChange_);
		tileCache === null || tileCache === void 0 || tileCache.set(cacheKey, tile);
		return tile;
	}
	/**
	* Handle tile change events.
	* @param {import("../events/Event.js").default} event Event.
	*/
	handleTileChange_(event) {
		const tile = event.target;
		const uid = getUid(tile);
		const tileState = tile.getState();
		let type;
		if (tileState == TileState_default.LOADING) {
			this.tileLoadingKeys_[uid] = true;
			type = TileEventType_default.TILELOADSTART;
		} else if (uid in this.tileLoadingKeys_) {
			delete this.tileLoadingKeys_[uid];
			type = tileState == TileState_default.ERROR ? TileEventType_default.TILELOADERROR : tileState == TileState_default.LOADED ? TileEventType_default.TILELOADEND : void 0;
		}
		if (type) this.dispatchEvent(new TileSourceEvent(type, tile));
	}
	/**
	* @param {import("../proj/Projection.js").default} projection Projection.
	* @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
	* @override
	*/
	getTileGridForProjection(projection) {
		const thisProj = this.getProjection();
		if (this.tileGrid && (!thisProj || equivalent$1(thisProj, projection)) && !this.transformMatrix) return this.tileGrid;
		const projKey = getUid(projection);
		if (!(projKey in this.tileGridForProjection_)) if (this.tileGrid && thisProj && !equivalent$1(thisProj, projection)) {
			const sourceResolutions = this.tileGrid.getResolutions();
			const sourceFinestRes = sourceResolutions[sourceResolutions.length - 1];
			const sourceMetersPerUnit = thisProj.getMetersPerUnit() || 1;
			const targetMetersPerUnit = projection.getMetersPerUnit() || 1;
			const targetFinestRes = sourceFinestRes * sourceMetersPerUnit / targetMetersPerUnit;
			const extent = extentFromProjection(projection);
			const tileSize = 256;
			const maxResolution = Math.max(getWidth(extent) / tileSize, getHeight(extent) / tileSize);
			const maxZoom = Math.max(0, Math.ceil(Math.log2(maxResolution / targetFinestRes)) + 1);
			this.tileGridForProjection_[projKey] = createForProjection(projection, maxZoom);
		} else this.tileGridForProjection_[projKey] = getForProjection(projection);
		return this.tileGridForProjection_[projKey];
	}
	/**
	* Sets the tile grid to use when reprojecting the tiles to the given
	* projection instead of the default tile grid for the projection.
	*
	* This can be useful when the default tile grid cannot be created
	* (e.g. projection has no extent defined) or
	* for optimization reasons (custom tile size, resolutions, ...).
	*
	* @param {import("../proj.js").ProjectionLike} projection Projection.
	* @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
	* @api
	*/
	setTileGridForProjection(projection, tilegrid) {
		const proj = get(projection);
		if (proj) {
			const projKey = getUid(proj);
			if (!(projKey in this.tileGridForProjection_)) this.tileGridForProjection_[projKey] = tilegrid;
		}
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/predictor.js
/**
* @param {Uint8Array|Uint16Array|Uint32Array} row
* @param {number} stride
*/
function decodeRowAcc(row, stride) {
	let length = row.length - stride;
	let offset = 0;
	do {
		for (let i = stride; i > 0; i--) {
			row[offset + stride] += row[offset];
			offset++;
		}
		length -= stride;
	} while (length > 0);
}
/**
* @param {Uint8Array} row
* @param {number} stride
* @param {number} bytesPerSample
*/
function decodeRowFloatingPoint(row, stride, bytesPerSample) {
	let index = 0;
	let count = row.length;
	const wc = count / bytesPerSample;
	while (count > stride) {
		for (let i = stride; i > 0; --i) {
			row[index + stride] += row[index];
			++index;
		}
		count -= stride;
	}
	const copy = row.slice();
	for (let i = 0; i < wc; ++i) for (let b = 0; b < bytesPerSample; ++b) row[bytesPerSample * i + b] = copy[(bytesPerSample - b - 1) * wc + i];
}
/**
* @param {ArrayBufferLike} block
* @param {number} predictor
* @param {number} width
* @param {number} height
* @param {number[]} bitsPerSample
* @param {number} planarConfiguration
* @returns
*/
function applyPredictor(block, predictor, width, height, bitsPerSample, planarConfiguration) {
	if (!predictor || predictor === 1) return block;
	for (let i = 0; i < bitsPerSample.length; ++i) {
		if (bitsPerSample[i] % 8 !== 0) throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");
		if (bitsPerSample[i] !== bitsPerSample[0]) throw new Error("When decoding with predictor, all samples must have the same size.");
	}
	const bytesPerSample = bitsPerSample[0] / 8;
	const stride = planarConfiguration === 2 ? 1 : bitsPerSample.length;
	for (let i = 0; i < height; ++i) {
		if (i * stride * width * bytesPerSample >= block.byteLength) break;
		let row;
		if (predictor === 2) {
			switch (bitsPerSample[0]) {
				case 8:
					row = new Uint8Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample);
					break;
				case 16:
					row = new Uint16Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 2);
					break;
				case 32:
					row = new Uint32Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 4);
					break;
				default: throw new Error(`Predictor 2 not allowed with ${bitsPerSample[0]} bits per sample.`);
			}
			decodeRowAcc(row, stride);
		} else if (predictor === 3) {
			row = new Uint8Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample);
			decodeRowFloatingPoint(row, stride, bytesPerSample);
		}
	}
	return block;
}
//#endregion
//#region node_modules/geotiff/dist-module/compression/basedecoder.js
/**
* @typedef {Object} BaseDecoderParameters
* @property {number} tileWidth
* @property {number} tileHeight
* @property {number} predictor
* @property {number|number[]|import('../geotiff.js').TypedArray} bitsPerSample
* @property {number} planarConfiguration
* @property {number} [samplesPerPixel]
*/
var BaseDecoder = class {
	/**
	* @param {BaseDecoderParameters} parameters
	*/
	constructor(parameters) {
		this.parameters = parameters;
	}
	/**
	* @abstract
	* @param {ArrayBufferLike} _buffer
	* @returns {Promise<ArrayBufferLike>|ArrayBufferLike}
	*/
	decodeBlock(_buffer) {
		throw new Error("decodeBlock not implemented");
	}
	/**
	* @param {ArrayBufferLike} buffer
	* @returns {Promise<ArrayBufferLike>}
	*/
	decode(buffer) {
		var _this = this;
		return _asyncToGenerator(function* () {
			const decoded = yield _this.decodeBlock(buffer);
			const { tileWidth, tileHeight, predictor, bitsPerSample, planarConfiguration } = _this.parameters;
			if (predictor !== 1) return applyPredictor(decoded, predictor, tileWidth, tileHeight, Array.isArray(bitsPerSample) || ArrayBuffer.isView(bitsPerSample) ? Array.from(bitsPerSample) : [bitsPerSample], planarConfiguration);
			return decoded;
		})();
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/compression/deflate.js
var deflate_exports = /* @__PURE__ */ __exportAll({ default: () => DeflateDecoder });
var DeflateDecoder = class extends BaseDecoder {
	/** @param {ArrayBuffer} buffer */
	decodeBlock(buffer) {
		return inflate_1(new Uint8Array(buffer)).buffer;
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/compression/jpeg.js
var jpeg_exports = /* @__PURE__ */ __exportAll({ default: () => JpegDecoder });
var dctZigZag = new Int32Array([
	0,
	1,
	8,
	16,
	9,
	2,
	3,
	10,
	17,
	24,
	32,
	25,
	18,
	11,
	4,
	5,
	12,
	19,
	26,
	33,
	40,
	48,
	41,
	34,
	27,
	20,
	13,
	6,
	7,
	14,
	21,
	28,
	35,
	42,
	49,
	56,
	57,
	50,
	43,
	36,
	29,
	22,
	15,
	23,
	30,
	37,
	44,
	51,
	58,
	59,
	52,
	45,
	38,
	31,
	39,
	46,
	53,
	60,
	61,
	54,
	47,
	55,
	62,
	63
]);
var dctCos1 = 4017;
var dctSin1 = 799;
var dctCos3 = 3406;
var dctSin3 = 2276;
var dctCos6 = 1567;
var dctSin6 = 3784;
var dctSqrt2 = 5793;
var dctSqrt1d2 = 2896;
/** @typedef {(number|HuffmanNode)[]} HuffmanNode */
/** @typedef {{children: HuffmanNode, index: number}} Code */
/**
* @typedef {Object} JpegComponent
* @property {number} h
* @property {number} v
* @property {number} [quantizationIdx]
* @property {Int32Array} [quantizationTable]
* @property {number} blocksPerLine
* @property {number} blocksPerColumn
* @property {Int32Array[][]} blocks
* @property {HuffmanNode} [huffmanTableDC]
* @property {HuffmanNode} [huffmanTableAC]
* @property {number} [pred]
*/
/**
* @typedef {Object} JpegFrame
* @property {boolean} extended
* @property {boolean} progressive
* @property {number} precision
* @property {number} scanLines
* @property {number} samplesPerLine
* @property {Object.<string, JpegComponent>} components
* @property {number[]} componentsOrder
* @property {number} maxH
* @property {number} maxV
* @property {number} mcusPerLine
* @property {number} mcusPerColumn
*/
/**
* @param {Uint8Array<ArrayBuffer>} codeLengths
* @param {Uint8Array<ArrayBuffer>} values
* @returns {HuffmanNode}
*/
function buildHuffmanTable(codeLengths, values) {
	let k = 0;
	/** @type {Array<Code>} */
	const code = [];
	let length = 16;
	while (length > 0 && !codeLengths[length - 1]) --length;
	code.push({
		children: [],
		index: 0
	});
	/** @type {Code|undefined} */
	let p = code[0];
	/** @type {Code|undefined} */
	let q;
	for (let i = 0; i < length; i++) {
		for (let j = 0; j < codeLengths[i]; j++) {
			p = code.pop();
			if (!p) throw new Error("buildHuffmanTable: codeLength mismatch");
			p.children[p.index] = values[k];
			while (p.index > 0) {
				p = code.pop();
				if (!p) throw new Error("buildHuffmanTable: codeLength mismatch");
			}
			p.index++;
			code.push(p);
			while (code.length <= i) {
				code.push(q = {
					children: [],
					index: 0
				});
				p.children[p.index] = q.children;
				p = q;
			}
			k++;
		}
		if (i + 1 < length) {
			code.push(q = {
				children: [],
				index: 0
			});
			p.children[p.index] = q.children;
			p = q;
		}
	}
	return code[0].children;
}
/**
* @param {Uint8Array} data
* @param {number} initialOffset
* @param {JpegFrame} frame
* @param {JpegComponent[]} components
* @param {number} resetInterval
* @param {number} spectralStart
* @param {number} spectralEnd
* @param {number} successivePrev
* @param {number} successive
*/
function decodeScan(data, initialOffset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive) {
	const { mcusPerLine, progressive } = frame;
	if (components.length > 1 && (mcusPerLine === void 0 || frame.mcusPerColumn === void 0)) throw new Error("Missing MCU dimensions");
	if (components.length === 1 && (components[0].blocksPerLine === void 0 || components[0].blocksPerColumn === void 0)) throw new Error("Missing block dimensions");
	const startOffset = initialOffset;
	let offset = initialOffset;
	let bitsData = 0;
	let bitsCount = 0;
	function readBit() {
		if (bitsCount > 0) {
			bitsCount--;
			return bitsData >> bitsCount & 1;
		}
		bitsData = data[offset++];
		if (bitsData === 255) {
			const nextByte = data[offset++];
			if (nextByte) throw new Error(`unexpected marker: ${(bitsData << 8 | nextByte).toString(16)}`);
		}
		bitsCount = 7;
		return bitsData >>> 7;
	}
	/** @param {HuffmanNode|undefined} tree */
	function decodeHuffman(tree) {
		if (!tree) throw new Error("Huffman table not found");
		let node = tree;
		let bit;
		while ((bit = readBit()) !== null) {
			const next = node[bit];
			if (typeof next === "number") return next;
			if (typeof next !== "object") throw new Error("invalid huffman sequence");
			node = next;
		}
		return null;
	}
	/** @param {number} initialLength */
	function receive(initialLength) {
		let length = initialLength;
		let n = 0;
		while (length > 0) {
			const bit = readBit();
			if (bit === null) return;
			n = n << 1 | bit;
			--length;
		}
		return n;
	}
	/** @param {number} length */
	function receiveAndExtend(length) {
		const n = receive(length);
		if (n === void 0) return;
		if (n >= 1 << length - 1) return n;
		return n + (-1 << length) + 1;
	}
	/**
	* @param {JpegComponent} component
	* @param {Int32Array} zz
	*/
	function decodeBaseline(component, zz) {
		const t = decodeHuffman(component.huffmanTableDC);
		if (t === null) throw new Error("Huffman error");
		const diff = t === 0 ? 0 : receiveAndExtend(t);
		if (diff === void 0) throw new Error("Unexpected end of stream");
		if (component.pred === void 0) component.pred = 0;
		component.pred += diff;
		zz[0] = component.pred;
		let k = 1;
		while (k < 64) {
			const rs = decodeHuffman(component.huffmanTableAC);
			if (rs === null) throw new Error("Unexpected end of data in AC coefficient decoding");
			const s = rs & 15;
			const r = rs >> 4;
			if (s === 0) {
				if (r < 15) break;
				k += 16;
			} else {
				k += r;
				const z = dctZigZag[k];
				const val = receiveAndExtend(s);
				if (val === void 0) throw new Error("Unexpected end of stream");
				zz[z] = val;
				k++;
			}
		}
	}
	/**
	* @param {JpegComponent} component
	* @param {Int32Array} zz
	*/
	function decodeDCFirst(component, zz) {
		const t = decodeHuffman(component.huffmanTableDC);
		if (t === null) throw new Error("Huffman error");
		const value = receiveAndExtend(t);
		if (value === void 0) throw new Error("Unexpected end of data in DC coefficient decoding");
		const diff = t === 0 ? 0 : value << successive;
		if (component.pred === void 0) component.pred = 0;
		component.pred += diff;
		zz[0] = component.pred;
	}
	/**
	* @param {JpegComponent} _
	* @param {Int32Array} zz
	*/
	function decodeDCSuccessive(_, zz) {
		const bit = readBit();
		if (bit === null) throw new Error("Unexpected end of data in DC coefficient decoding");
		zz[0] |= bit << successive;
	}
	let eobrun = 0;
	/**
	* @param {JpegComponent} component
	* @param {Int32Array} zz
	*/
	function decodeACFirst(component, zz) {
		if (eobrun > 0) {
			eobrun--;
			return;
		}
		let k = spectralStart;
		const e = spectralEnd;
		while (k <= e) {
			const rs = decodeHuffman(component.huffmanTableAC);
			if (rs === null) throw new Error("Unexpected end of data in AC coefficient decoding");
			const s = rs & 15;
			const r = rs >> 4;
			if (s === 0) {
				if (r < 15) {
					const value = receive(r);
					if (value === void 0) throw new Error("Unexpected end of data in AC coefficient decoding");
					eobrun = value + (1 << r) - 1;
					break;
				}
				k += 16;
			} else {
				k += r;
				const z = dctZigZag[k];
				const value = receiveAndExtend(s);
				if (value === void 0) throw new Error("Unexpected end of data in AC coefficient decoding");
				zz[z] = value * (1 << successive);
				k++;
			}
		}
	}
	let successiveACState = 0;
	/** @type {number} */
	let successiveACNextValue;
	/**
	* @param {JpegComponent} component
	* @param {Int32Array} zz
	*/
	function decodeACSuccessive(component, zz) {
		let k = spectralStart;
		const e = spectralEnd;
		let r = 0;
		while (k <= e) {
			const z = dctZigZag[k];
			const direction = zz[z] < 0 ? -1 : 1;
			switch (successiveACState) {
				case 0: {
					const rs = decodeHuffman(component.huffmanTableAC);
					if (rs === null) throw new Error("Unexpected end of data in AC coefficient decoding");
					const s = rs & 15;
					r = rs >> 4;
					if (s === 0) if (r < 15) {
						const value = receive(r);
						if (value === void 0) throw new Error("Unexpected end of data in AC coefficient decoding");
						eobrun = value + (1 << r);
						successiveACState = 4;
					} else {
						r = 16;
						successiveACState = 1;
					}
					else {
						if (s !== 1) throw new Error("invalid ACn encoding");
						const nextVal = receiveAndExtend(s);
						if (nextVal === void 0) throw new Error("Unexpected end of data in AC coefficient decoding");
						successiveACNextValue = nextVal;
						successiveACState = r ? 2 : 3;
					}
					continue;
				}
				case 1:
				case 2:
					if (zz[z]) {
						const bit = readBit();
						if (bit === null) throw new Error("Unexpected end of data in AC coefficient decoding");
						zz[z] += (bit << successive) * direction;
					} else {
						r--;
						if (r === 0) successiveACState = successiveACState === 2 ? 3 : 0;
					}
					break;
				case 3:
					if (zz[z]) {
						const bit = readBit();
						if (bit === null) throw new Error("Unexpected end of data in AC coefficient decoding");
						zz[z] += (bit << successive) * direction;
					} else {
						zz[z] = successiveACNextValue << successive;
						successiveACState = 0;
					}
					break;
				case 4:
					if (zz[z]) {
						const bit = readBit();
						if (bit === null) throw new Error("Unexpected end of data in AC coefficient decoding");
						zz[z] += (bit << successive) * direction;
					}
					break;
				default: break;
			}
			k++;
		}
		if (successiveACState === 4) {
			eobrun--;
			if (eobrun === 0) successiveACState = 0;
		}
	}
	/**
	* @param {JpegComponent} component
	* @param {function} decodeFunction
	* @param {number} mcu
	* @param {number} row
	* @param {number} col
	*/
	function decodeMcu(component, decodeFunction, mcu, row, col) {
		const mcuRow = mcu / mcusPerLine | 0;
		const mcuCol = mcu % mcusPerLine;
		const blockRow = mcuRow * component.v + row;
		const blockCol = mcuCol * component.h + col;
		if (!component.blocks) throw new Error("Missing blocks");
		decodeFunction(component, component.blocks[blockRow][blockCol]);
	}
	/**
	* @param {JpegComponent} component
	* @param {function} decodeFunction
	* @param {number} mcu
	*/
	function decodeBlock(component, decodeFunction, mcu) {
		const blockRow = mcu / component.blocksPerLine | 0;
		const blockCol = mcu % component.blocksPerLine;
		if (!component.blocks) throw new Error("Missing blocks");
		decodeFunction(component, component.blocks[blockRow][blockCol]);
	}
	const componentsLength = components.length;
	let component;
	let i;
	let j;
	let k;
	let n;
	let decodeFn;
	if (progressive) if (spectralStart === 0) decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
	else decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
	else decodeFn = decodeBaseline;
	let mcu = 0;
	let marker;
	let mcuExpected;
	if (componentsLength === 1) mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
	else mcuExpected = mcusPerLine * frame.mcusPerColumn;
	const usedResetInterval = resetInterval || mcuExpected;
	while (mcu < mcuExpected) {
		for (i = 0; i < componentsLength; i++) components[i].pred = 0;
		eobrun = 0;
		if (componentsLength === 1) {
			component = components[0];
			for (n = 0; n < usedResetInterval; n++) {
				decodeBlock(component, decodeFn, mcu);
				mcu++;
			}
		} else for (n = 0; n < usedResetInterval; n++) {
			for (i = 0; i < componentsLength; i++) {
				component = components[i];
				const { h, v } = component;
				for (j = 0; j < v; j++) for (k = 0; k < h; k++) decodeMcu(component, decodeFn, mcu, j, k);
			}
			mcu++;
			if (mcu === mcuExpected) break;
		}
		bitsCount = 0;
		marker = data[offset] << 8 | data[offset + 1];
		if (marker < 65280) throw new Error("marker was not found");
		if (marker >= 65488 && marker <= 65495) offset += 2;
		else break;
	}
	return offset - startOffset;
}
/**
* @param {JpegComponent} component
*/
function buildComponentData(component) {
	const lines = [];
	const { blocksPerLine, blocksPerColumn } = component;
	if (!blocksPerLine || !blocksPerColumn || !component.blocks) throw new Error("Missing component data");
	const samplesPerLine = blocksPerLine << 3;
	const R = new Int32Array(64);
	const r = new Uint8Array(64);
	/**
	* @param {Int32Array} zz
	* @param {Uint8Array} dataOut
	* @param {Int32Array} dataIn
	*/
	function quantizeAndInverse(zz, dataOut, dataIn) {
		const qt = component.quantizationTable;
		if (!qt) throw new Error("No quantization table found");
		let v0;
		let v1;
		let v2;
		let v3;
		let v4;
		let v5;
		let v6;
		let v7;
		let t;
		const p = dataIn;
		let i;
		for (i = 0; i < 64; i++) p[i] = zz[i] * qt[i];
		for (i = 0; i < 8; ++i) {
			const row = 8 * i;
			if (p[1 + row] === 0 && p[2 + row] === 0 && p[3 + row] === 0 && p[4 + row] === 0 && p[5 + row] === 0 && p[6 + row] === 0 && p[7 + row] === 0) {
				t = dctSqrt2 * p[0 + row] + 512 >> 10;
				p[0 + row] = t;
				p[1 + row] = t;
				p[2 + row] = t;
				p[3 + row] = t;
				p[4 + row] = t;
				p[5 + row] = t;
				p[6 + row] = t;
				p[7 + row] = t;
				continue;
			}
			v0 = dctSqrt2 * p[0 + row] + 128 >> 8;
			v1 = dctSqrt2 * p[4 + row] + 128 >> 8;
			v2 = p[2 + row];
			v3 = p[6 + row];
			v4 = dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128 >> 8;
			v7 = dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128 >> 8;
			v5 = p[3 + row] << 4;
			v6 = p[5 + row] << 4;
			t = v0 - v1 + 1 >> 1;
			v0 = v0 + v1 + 1 >> 1;
			v1 = t;
			t = v2 * dctSin6 + v3 * dctCos6 + 128 >> 8;
			v2 = v2 * dctCos6 - v3 * dctSin6 + 128 >> 8;
			v3 = t;
			t = v4 - v6 + 1 >> 1;
			v4 = v4 + v6 + 1 >> 1;
			v6 = t;
			t = v7 + v5 + 1 >> 1;
			v5 = v7 - v5 + 1 >> 1;
			v7 = t;
			t = v0 - v3 + 1 >> 1;
			v0 = v0 + v3 + 1 >> 1;
			v3 = t;
			t = v1 - v2 + 1 >> 1;
			v1 = v1 + v2 + 1 >> 1;
			v2 = t;
			t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
			v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
			v7 = t;
			t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
			v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
			v6 = t;
			p[0 + row] = v0 + v7;
			p[7 + row] = v0 - v7;
			p[1 + row] = v1 + v6;
			p[6 + row] = v1 - v6;
			p[2 + row] = v2 + v5;
			p[5 + row] = v2 - v5;
			p[3 + row] = v3 + v4;
			p[4 + row] = v3 - v4;
		}
		for (i = 0; i < 8; ++i) {
			const col = i;
			if (p[8 + col] === 0 && p[16 + col] === 0 && p[24 + col] === 0 && p[32 + col] === 0 && p[40 + col] === 0 && p[48 + col] === 0 && p[56 + col] === 0) {
				t = dctSqrt2 * dataIn[i + 0] + 8192 >> 14;
				p[0 + col] = t;
				p[8 + col] = t;
				p[16 + col] = t;
				p[24 + col] = t;
				p[32 + col] = t;
				p[40 + col] = t;
				p[48 + col] = t;
				p[56 + col] = t;
				continue;
			}
			v0 = dctSqrt2 * p[0 + col] + 2048 >> 12;
			v1 = dctSqrt2 * p[32 + col] + 2048 >> 12;
			v2 = p[16 + col];
			v3 = p[48 + col];
			v4 = dctSqrt1d2 * (p[8 + col] - p[56 + col]) + 2048 >> 12;
			v7 = dctSqrt1d2 * (p[8 + col] + p[56 + col]) + 2048 >> 12;
			v5 = p[24 + col];
			v6 = p[40 + col];
			t = v0 - v1 + 1 >> 1;
			v0 = v0 + v1 + 1 >> 1;
			v1 = t;
			t = v2 * dctSin6 + v3 * dctCos6 + 2048 >> 12;
			v2 = v2 * dctCos6 - v3 * dctSin6 + 2048 >> 12;
			v3 = t;
			t = v4 - v6 + 1 >> 1;
			v4 = v4 + v6 + 1 >> 1;
			v6 = t;
			t = v7 + v5 + 1 >> 1;
			v5 = v7 - v5 + 1 >> 1;
			v7 = t;
			t = v0 - v3 + 1 >> 1;
			v0 = v0 + v3 + 1 >> 1;
			v3 = t;
			t = v1 - v2 + 1 >> 1;
			v1 = v1 + v2 + 1 >> 1;
			v2 = t;
			t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
			v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
			v7 = t;
			t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
			v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
			v6 = t;
			p[0 + col] = v0 + v7;
			p[56 + col] = v0 - v7;
			p[8 + col] = v1 + v6;
			p[48 + col] = v1 - v6;
			p[16 + col] = v2 + v5;
			p[40 + col] = v2 - v5;
			p[24 + col] = v3 + v4;
			p[32 + col] = v3 - v4;
		}
		for (i = 0; i < 64; ++i) {
			const sample = 128 + (p[i] + 8 >> 4);
			if (sample < 0) dataOut[i] = 0;
			else if (sample > 255) dataOut[i] = 255;
			else dataOut[i] = sample;
		}
	}
	for (let blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
		const scanLine = blockRow << 3;
		for (let i = 0; i < 8; i++) lines.push(new Uint8Array(samplesPerLine));
		for (let blockCol = 0; blockCol < blocksPerLine; blockCol++) {
			quantizeAndInverse(component.blocks[blockRow][blockCol], r, R);
			let offset = 0;
			const sample = blockCol << 3;
			for (let j = 0; j < 8; j++) {
				const line = lines[scanLine + j];
				for (let i = 0; i < 8; i++) line[sample + i] = r[offset++];
			}
		}
	}
	return lines;
}
var JpegStreamReader = class {
	constructor() {
		this.jfif = null;
		this.adobe = null;
		/** @type {number} */
		this.resetInterval = 0;
		/** @type {Int32Array[]} */
		this.quantizationTables = [];
		/** @type {HuffmanNode[]} */
		this.huffmanTablesAC = [];
		/** @type {HuffmanNode[]} */
		this.huffmanTablesDC = [];
		/** @type {JpegFrame[]} */
		this.frames = [];
	}
	resetFrames() {
		this.frames = [];
	}
	/** @param {Uint8Array} data */
	parse(data) {
		let offset = 0;
		function readUint16() {
			const value = data[offset] << 8 | data[offset + 1];
			offset += 2;
			return value;
		}
		function readDataBlock() {
			const length = readUint16();
			const array = data.subarray(offset, offset + length - 2);
			offset += array.length;
			return array;
		}
		/** @param {JpegFrame} frame */
		function prepareComponents(frame) {
			let maxH = 0;
			let maxV = 0;
			let component;
			let componentId;
			for (componentId in frame.components) if (frame.components.hasOwnProperty(componentId)) {
				component = frame.components[componentId];
				if (maxH < component.h) maxH = component.h;
				if (maxV < component.v) maxV = component.v;
			}
			const mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / maxH);
			const mcusPerColumn = Math.ceil(frame.scanLines / 8 / maxV);
			for (componentId in frame.components) if (frame.components.hasOwnProperty(componentId)) {
				component = frame.components[componentId];
				const blocksPerLine = Math.ceil(Math.ceil(frame.samplesPerLine / 8) * component.h / maxH);
				const blocksPerColumn = Math.ceil(Math.ceil(frame.scanLines / 8) * component.v / maxV);
				const blocksPerLineForMcu = mcusPerLine * component.h;
				const blocksPerColumnForMcu = mcusPerColumn * component.v;
				const blocks = [];
				for (let i = 0; i < blocksPerColumnForMcu; i++) {
					const row = [];
					for (let j = 0; j < blocksPerLineForMcu; j++) row.push(new Int32Array(64));
					blocks.push(row);
				}
				component.blocksPerLine = blocksPerLine;
				component.blocksPerColumn = blocksPerColumn;
				component.blocks = blocks;
			}
			frame.maxH = maxH;
			frame.maxV = maxV;
			frame.mcusPerLine = mcusPerLine;
			frame.mcusPerColumn = mcusPerColumn;
		}
		let fileMarker = readUint16();
		if (fileMarker !== 65496) throw new Error("SOI not found");
		fileMarker = readUint16();
		while (fileMarker !== 65497) {
			switch (fileMarker) {
				case 65280: break;
				case 65504:
				case 65505:
				case 65506:
				case 65507:
				case 65508:
				case 65509:
				case 65510:
				case 65511:
				case 65512:
				case 65513:
				case 65514:
				case 65515:
				case 65516:
				case 65517:
				case 65518:
				case 65519:
				case 65534: {
					const appData = readDataBlock();
					if (fileMarker === 65504) {
						if (appData[0] === 74 && appData[1] === 70 && appData[2] === 73 && appData[3] === 70 && appData[4] === 0) this.jfif = {
							version: {
								major: appData[5],
								minor: appData[6]
							},
							densityUnits: appData[7],
							xDensity: appData[8] << 8 | appData[9],
							yDensity: appData[10] << 8 | appData[11],
							thumbWidth: appData[12],
							thumbHeight: appData[13],
							thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
						};
					}
					if (fileMarker === 65518) {
						if (appData[0] === 65 && appData[1] === 100 && appData[2] === 111 && appData[3] === 98 && appData[4] === 101 && appData[5] === 0) this.adobe = {
							version: appData[6],
							flags0: appData[7] << 8 | appData[8],
							flags1: appData[9] << 8 | appData[10],
							transformCode: appData[11]
						};
					}
					break;
				}
				case 65499: {
					const quantizationTablesEnd = readUint16() + offset - 2;
					while (offset < quantizationTablesEnd) {
						const quantizationTableSpec = data[offset++];
						const tableData = new Int32Array(64);
						if (quantizationTableSpec >> 4 === 0) for (let j = 0; j < 64; j++) {
							const z = dctZigZag[j];
							tableData[z] = data[offset++];
						}
						else if (quantizationTableSpec >> 4 === 1) for (let j = 0; j < 64; j++) {
							const z = dctZigZag[j];
							tableData[z] = readUint16();
						}
						else throw new Error("DQT: invalid table spec");
						this.quantizationTables[quantizationTableSpec & 15] = tableData;
					}
					break;
				}
				case 65472:
				case 65473:
				case 65474: {
					readUint16();
					/** @type {JpegFrame} */
					const frame = {
						extended: fileMarker === 65473,
						progressive: fileMarker === 65474,
						precision: data[offset++],
						scanLines: readUint16(),
						samplesPerLine: readUint16(),
						/** @type {Object.<string, JpegComponent>} */
						components: {},
						/** @type {number[]} */
						componentsOrder: [],
						maxH: 0,
						maxV: 0,
						mcusPerLine: 0,
						mcusPerColumn: 0
					};
					const componentsCount = data[offset++];
					let componentId;
					for (let i = 0; i < componentsCount; i++) {
						componentId = data[offset];
						const h = data[offset + 1] >> 4;
						const v = data[offset + 1] & 15;
						const qId = data[offset + 2];
						frame.componentsOrder.push(componentId);
						frame.components[componentId] = {
							h,
							v,
							quantizationIdx: qId,
							blocksPerLine: 0,
							blocksPerColumn: 0,
							blocks: []
						};
						offset += 3;
					}
					prepareComponents(frame);
					this.frames.push(frame);
					break;
				}
				case 65476: {
					const huffmanLength = readUint16();
					for (let i = 2; i < huffmanLength;) {
						const huffmanTableSpec = data[offset++];
						const codeLengths = new Uint8Array(16);
						let codeLengthSum = 0;
						for (let j = 0; j < 16; j++, offset++) {
							codeLengths[j] = data[offset];
							codeLengthSum += codeLengths[j];
						}
						const huffmanValues = new Uint8Array(codeLengthSum);
						for (let j = 0; j < codeLengthSum; j++, offset++) huffmanValues[j] = data[offset];
						i += 17 + codeLengthSum;
						if (huffmanTableSpec >> 4 === 0) this.huffmanTablesDC[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
						else this.huffmanTablesAC[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
					}
					break;
				}
				case 65501:
					readUint16();
					this.resetInterval = readUint16();
					break;
				case 65498: {
					readUint16();
					const selectorsCount = data[offset++];
					const components = [];
					const frame = this.frames[0];
					for (let i = 0; i < selectorsCount; i++) {
						const component = frame.components[data[offset++]];
						const tableSpec = data[offset++];
						component.huffmanTableDC = this.huffmanTablesDC[tableSpec >> 4];
						component.huffmanTableAC = this.huffmanTablesAC[tableSpec & 15];
						components.push(component);
					}
					const spectralStart = data[offset++];
					const spectralEnd = data[offset++];
					const successiveApproximation = data[offset++];
					const processed = decodeScan(data, offset, frame, components, this.resetInterval, spectralStart, spectralEnd, successiveApproximation >> 4, successiveApproximation & 15);
					offset += processed;
					break;
				}
				case 65535:
					if (data[offset] !== 255) offset--;
					break;
				default:
					if (data[offset - 3] === 255 && data[offset - 2] >= 192 && data[offset - 2] <= 254) {
						offset -= 3;
						break;
					}
					throw new Error(`unknown JPEG marker ${fileMarker.toString(16)}`);
			}
			fileMarker = readUint16();
		}
	}
	getResult() {
		const { frames } = this;
		if (this.frames.length === 0) throw new Error("no frames were decoded");
		else if (this.frames.length > 1) console.warn("more than one frame is not supported");
		for (let i = 0; i < this.frames.length; i++) {
			const cp = this.frames[i].components;
			for (const j of Object.keys(cp)) {
				const qIdx = cp[j].quantizationIdx;
				if (typeof qIdx === "number") {
					cp[j].quantizationTable = this.quantizationTables[qIdx];
					delete cp[j].quantizationIdx;
				}
			}
		}
		const frame = frames[0];
		if (!frame.maxH || !frame.maxV) throw new Error("Invalid frame dimensions");
		const { components, componentsOrder } = frame;
		const outComponents = [];
		const width = frame.samplesPerLine;
		const height = frame.scanLines;
		for (let i = 0; i < componentsOrder.length; i++) {
			const component = components[componentsOrder[i]];
			outComponents.push({
				lines: buildComponentData(component),
				scaleX: component.h / frame.maxH,
				scaleY: component.v / frame.maxV
			});
		}
		const out = new Uint8Array(width * height * outComponents.length);
		let oi = 0;
		for (let y = 0; y < height; ++y) for (let x = 0; x < width; ++x) for (let i = 0; i < outComponents.length; ++i) {
			const component = outComponents[i];
			out[oi] = component.lines[0 | y * component.scaleY][0 | x * component.scaleX];
			++oi;
		}
		return out;
	}
};
var JpegDecoder = class extends BaseDecoder {
	/**
	* @param {import('./basedecoder.js').BaseDecoderParameters & { JPEGTables?: Uint8Array }} parameters
	*/
	constructor(parameters) {
		super(parameters);
		this.reader = new JpegStreamReader();
		if (parameters.JPEGTables) this.reader.parse(parameters.JPEGTables);
	}
	/** @param {ArrayBuffer} buffer */
	decodeBlock(buffer) {
		this.reader.resetFrames();
		this.reader.parse(new Uint8Array(buffer));
		return this.reader.getResult().buffer;
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/globals.js
var import_LercDecode = /* @__PURE__ */ __toESM(require_LercDecode(), 1);
/** @import {TypedArray} from './geotiff.js' */
var fieldTypes = {
	BYTE: 1,
	ASCII: 2,
	SHORT: 3,
	LONG: 4,
	RATIONAL: 5,
	SBYTE: 6,
	UNDEFINED: 7,
	SSHORT: 8,
	SLONG: 9,
	SRATIONAL: 10,
	FLOAT: 11,
	DOUBLE: 12,
	IFD: 13,
	LONG8: 16,
	SLONG8: 17,
	IFD8: 18
};
/** @typedef {keyof fieldTypes} FieldTypeName */
/** @typedef {fieldTypes[keyof typeof fieldTypes]} FieldType */
/** @typedef {Record<FieldTypeName, number>} FieldTypeSizes */
var fieldTypeSizes = {
	[fieldTypes.BYTE]: 1,
	[fieldTypes.ASCII]: 1,
	[fieldTypes.SBYTE]: 1,
	[fieldTypes.UNDEFINED]: 1,
	[fieldTypes.SHORT]: 2,
	[fieldTypes.SSHORT]: 2,
	[fieldTypes.LONG]: 4,
	[fieldTypes.SLONG]: 4,
	[fieldTypes.FLOAT]: 4,
	[fieldTypes.IFD]: 4,
	[fieldTypes.RATIONAL]: 8,
	[fieldTypes.SRATIONAL]: 8,
	[fieldTypes.DOUBLE]: 8,
	[fieldTypes.LONG8]: 8,
	[fieldTypes.SLONG8]: 8,
	[fieldTypes.IFD8]: 8
};
/** @typedef {fieldTypeSizes[keyof typeof fieldTypeSizes]} FieldTypeSize */
/**
* Get the byte size for a given field type.
* @param {FieldType} fieldType The TIFF field type constant
* @returns {number} The size in bytes
* @throws {RangeError} If the field type is invalid
*/
function getFieldTypeSize(fieldType) {
	const size = fieldTypeSizes[fieldType];
	if (size === void 0) throw new RangeError(`Invalid field type: ${fieldType}`);
	return size;
}
/**
* @typedef {Object} TagDictionaryEntry
* @property {number} tag
* @property {string} [name]
* @property {number} [type]
* @property {boolean} [isArray]
* @property {boolean} [eager]
*/
var tagDictionary = {
	NewSubfileType: {
		tag: 254,
		type: fieldTypes.LONG,
		eager: true
	},
	SubfileType: {
		tag: 255,
		type: fieldTypes.SHORT,
		eager: true
	},
	ImageWidth: {
		tag: 256,
		type: fieldTypes.SHORT,
		eager: true
	},
	ImageLength: {
		tag: 257,
		type: fieldTypes.SHORT,
		eager: true
	},
	BitsPerSample: {
		tag: 258,
		type: fieldTypes.SHORT,
		isArray: true,
		eager: true
	},
	Compression: {
		tag: 259,
		type: fieldTypes.SHORT,
		eager: true
	},
	PhotometricInterpretation: {
		tag: 262,
		type: fieldTypes.SHORT,
		eager: true
	},
	Threshholding: {
		tag: 263,
		type: fieldTypes.SHORT
	},
	CellWidth: {
		tag: 264,
		type: fieldTypes.SHORT
	},
	CellLength: {
		tag: 265,
		type: fieldTypes.SHORT
	},
	FillOrder: {
		tag: 266,
		type: fieldTypes.SHORT
	},
	DocumentName: {
		tag: 269,
		type: fieldTypes.ASCII
	},
	ImageDescription: {
		tag: 270,
		type: fieldTypes.ASCII
	},
	Make: {
		tag: 271,
		type: fieldTypes.ASCII
	},
	Model: {
		tag: 272,
		type: fieldTypes.ASCII
	},
	StripOffsets: {
		tag: 273,
		type: fieldTypes.SHORT,
		isArray: true
	},
	Orientation: {
		tag: 274,
		type: fieldTypes.SHORT
	},
	SamplesPerPixel: {
		tag: 277,
		type: fieldTypes.SHORT,
		eager: true
	},
	RowsPerStrip: {
		tag: 278,
		type: fieldTypes.SHORT,
		eager: true
	},
	StripByteCounts: {
		tag: 279,
		type: fieldTypes.LONG,
		isArray: true
	},
	MinSampleValue: {
		tag: 280,
		type: fieldTypes.SHORT,
		isArray: true
	},
	MaxSampleValue: {
		tag: 281,
		type: fieldTypes.SHORT,
		isArray: true
	},
	XResolution: {
		tag: 282,
		type: fieldTypes.RATIONAL
	},
	YResolution: {
		tag: 283,
		type: fieldTypes.RATIONAL
	},
	PlanarConfiguration: {
		tag: 284,
		type: fieldTypes.SHORT,
		eager: true
	},
	PageName: {
		tag: 285,
		type: fieldTypes.ASCII
	},
	XPosition: {
		tag: 286,
		type: fieldTypes.RATIONAL
	},
	YPosition: {
		tag: 287,
		type: fieldTypes.RATIONAL
	},
	FreeOffsets: {
		tag: 288,
		type: fieldTypes.LONG
	},
	FreeByteCounts: {
		tag: 289,
		type: fieldTypes.LONG
	},
	GrayResponseUnit: {
		tag: 290,
		type: fieldTypes.SHORT
	},
	GrayResponseCurve: {
		tag: 291,
		type: fieldTypes.SHORT,
		isArray: true
	},
	T4Options: {
		tag: 292,
		type: fieldTypes.LONG
	},
	T6Options: {
		tag: 293,
		type: fieldTypes.LONG
	},
	ResolutionUnit: {
		tag: 296,
		type: fieldTypes.SHORT
	},
	PageNumber: {
		tag: 297,
		type: fieldTypes.SHORT,
		isArray: true
	},
	TransferFunction: {
		tag: 301,
		type: fieldTypes.SHORT,
		isArray: true
	},
	Software: {
		tag: 305,
		type: fieldTypes.ASCII
	},
	DateTime: {
		tag: 306,
		type: fieldTypes.ASCII
	},
	Artist: {
		tag: 315,
		type: fieldTypes.ASCII
	},
	HostComputer: {
		tag: 316,
		type: fieldTypes.ASCII
	},
	Predictor: {
		tag: 317,
		type: fieldTypes.SHORT
	},
	WhitePoint: {
		tag: 318,
		type: fieldTypes.RATIONAL,
		isArray: true
	},
	PrimaryChromaticities: {
		tag: 319,
		type: fieldTypes.RATIONAL,
		isArray: true
	},
	ColorMap: {
		tag: 320,
		type: fieldTypes.SHORT,
		isArray: true
	},
	HalftoneHints: {
		tag: 321,
		type: fieldTypes.SHORT,
		isArray: true
	},
	TileWidth: {
		tag: 322,
		type: fieldTypes.SHORT,
		eager: true
	},
	TileLength: {
		tag: 323,
		type: fieldTypes.SHORT,
		eager: true
	},
	TileOffsets: {
		tag: 324,
		type: fieldTypes.LONG,
		isArray: true
	},
	TileByteCounts: {
		tag: 325,
		type: fieldTypes.SHORT,
		isArray: true
	},
	InkSet: {
		tag: 332,
		type: fieldTypes.SHORT
	},
	InkNames: {
		tag: 333,
		type: fieldTypes.ASCII
	},
	NumberOfInks: {
		tag: 334,
		type: fieldTypes.SHORT
	},
	DotRange: {
		tag: 336,
		type: fieldTypes.BYTE,
		isArray: true
	},
	TargetPrinter: {
		tag: 337,
		type: fieldTypes.ASCII
	},
	ExtraSamples: {
		tag: 338,
		type: fieldTypes.BYTE,
		isArray: true,
		eager: true
	},
	SampleFormat: {
		tag: 339,
		type: fieldTypes.SHORT,
		isArray: true,
		eager: true
	},
	SMinSampleValue: {
		tag: 340,
		isArray: true
	},
	SMaxSampleValue: {
		tag: 341,
		isArray: true
	},
	TransferRange: {
		tag: 342,
		type: fieldTypes.SHORT,
		isArray: true
	},
	JPEGProc: {
		tag: 512,
		type: fieldTypes.SHORT
	},
	JPEGInterchangeFormat: {
		tag: 513,
		type: fieldTypes.LONG
	},
	JPEGInterchangeFormatLngth: {
		tag: 514,
		type: fieldTypes.LONG
	},
	JPEGRestartInterval: {
		tag: 515,
		type: fieldTypes.SHORT
	},
	JPEGLosslessPredictors: {
		tag: 517,
		type: fieldTypes.SHORT,
		isArray: true
	},
	JPEGPointTransforms: {
		tag: 518,
		type: fieldTypes.SHORT,
		isArray: true
	},
	JPEGQTables: {
		tag: 519,
		type: fieldTypes.LONG,
		isArray: true
	},
	JPEGDCTables: {
		tag: 520,
		type: fieldTypes.LONG,
		isArray: true
	},
	JPEGACTables: {
		tag: 521,
		type: fieldTypes.LONG,
		isArray: true
	},
	YCbCrCoefficients: {
		tag: 529,
		type: fieldTypes.RATIONAL,
		isArray: true
	},
	YCbCrSubSampling: {
		tag: 530,
		type: fieldTypes.SHORT,
		isArray: true
	},
	YCbCrPositioning: {
		tag: 531,
		type: fieldTypes.SHORT
	},
	ReferenceBlackWhite: {
		tag: 532,
		type: fieldTypes.LONG,
		isArray: true
	},
	Copyright: {
		tag: 33432,
		type: fieldTypes.ASCII
	},
	BadFaxLines: { tag: 326 },
	CleanFaxData: { tag: 327 },
	ClipPath: { tag: 343 },
	ConsecutiveBadFaxLines: { tag: 328 },
	Decode: { tag: 433 },
	DefaultImageColor: { tag: 434 },
	Indexed: { tag: 346 },
	JPEGTables: {
		tag: 347,
		isArray: true,
		eager: true
	},
	StripRowCounts: {
		tag: 559,
		isArray: true
	},
	SubIFDs: {
		tag: 330,
		isArray: true
	},
	XClipPathUnits: { tag: 344 },
	YClipPathUnits: { tag: 345 },
	ApertureValue: { tag: 37378 },
	ColorSpace: { tag: 40961 },
	DateTimeDigitized: { tag: 36868 },
	DateTimeOriginal: { tag: 36867 },
	ExifIFD: {
		tag: 34665,
		name: "Exif IFD",
		type: fieldTypes.LONG
	},
	ExifVersion: { tag: 36864 },
	ExposureTime: { tag: 33434 },
	FileSource: { tag: 41728 },
	Flash: { tag: 37385 },
	FlashpixVersion: { tag: 40960 },
	FNumber: { tag: 33437 },
	ImageUniqueID: { tag: 42016 },
	LightSource: { tag: 37384 },
	MakerNote: { tag: 37500 },
	ShutterSpeedValue: { tag: 37377 },
	UserComment: { tag: 37510 },
	IPTC: { tag: 33723 },
	CZ_LSMINFO: { tag: 34412 },
	ICCProfile: {
		tag: 34675,
		name: "ICC Profile"
	},
	XMP: { tag: 700 },
	GDAL_METADATA: { tag: 42112 },
	GDAL_NODATA: {
		tag: 42113,
		type: fieldTypes.ASCII,
		eager: true
	},
	Photoshop: { tag: 34377 },
	ModelPixelScale: {
		tag: 33550,
		type: fieldTypes.DOUBLE,
		isArray: true,
		eager: true
	},
	ModelTiepoint: {
		tag: 33922,
		type: fieldTypes.DOUBLE,
		isArray: true,
		eager: true
	},
	ModelTransformation: {
		tag: 34264,
		type: fieldTypes.DOUBLE,
		isArray: true,
		eager: true
	},
	GeoKeyDirectory: {
		tag: 34735,
		type: fieldTypes.SHORT,
		isArray: true,
		eager: true
	},
	GeoDoubleParams: {
		tag: 34736,
		type: fieldTypes.DOUBLE,
		isArray: true,
		eager: true
	},
	GeoAsciiParams: {
		tag: 34737,
		type: fieldTypes.ASCII,
		eager: true
	},
	LercParameters: {
		tag: 50674,
		eager: true
	}
};
/** @typedef {keyof typeof tagDictionary} TagName */
/** @typedef {typeof tagDictionary[keyof typeof tagDictionary]['tag']} Tag */
/**
* @typedef {Extract<keyof typeof tagDictionary,
*   { [K in keyof typeof tagDictionary]: (typeof tagDictionary)[K] extends { eager: true }
*   ? K : never }[keyof typeof tagDictionary]>} EagerTagName
*/
/**
* @typedef {Extract<Tag, { [K in keyof typeof tagDictionary]: (typeof tagDictionary)[K] extends { eager: true }
*   ? (typeof tagDictionary)[K]['tag'] : never }[keyof typeof tagDictionary]>} EagerTag
*/
/** @typedef {Extract<typeof tagDictionary[keyof typeof tagDictionary], {type: any}>['type']} TagType */
/**
* @template {number} T
* @typedef {T extends 2 ? string : number} GeoTiffPrimitive
*/
/**
* @template {TagName} T
* @typedef {typeof tagDictionary[T]} TagDef
*/
/**
* @typedef {{
*   1: number;
*   2: string;
*   3: number;
*   4: number;
*   5: number;
*   6: number;
*   7: ArrayBuffer;
*   8: number;
*   9: number;
*   10: number;
*   11: number;
*   12: number;
*   16: number;
*   17: number;
*   18: number;
* }} FieldTypeMap
*/
/**
* @template {TagName} T
* @typedef {TagDef<T> extends { isArray: true }
*   ? (TagDef<T> extends { type: typeof fieldTypes.DOUBLE } ? number[] :
*      TagDef<T> extends { type: typeof fieldTypes.ASCII } ? string[] :
*      TagDef<T> extends { type: typeof fieldTypes.BYTE | typeof fieldTypes.SBYTE | typeof fieldTypes.UNDEFINED }
*        ? Uint8Array | Int8Array :
*      (number[] | TypedArray))
*   : (TagDef<T> extends { type: keyof FieldTypeMap } ? FieldTypeMap[TagDef<T>['type']] : any)} TagValue
*/
/**
* Maps tag names to their numeric values
* @type {Record<string, number>}
*/
var tags = {};
/**
* Maps tag numbers to their definitions
* @type {Record<number, { tag: number, name: string, type: string|number|undefined, isArray: boolean, eager: boolean }>}
*/
var tagDefinitions = {};
/**
* Registers a new field tag
* @param {number} tag the numeric tiff tag
* @param {string} name the name of the tag that will be reported in the IFD
* @param {keyof fieldTypes|number|undefined} type the tags data type
* @param {Boolean} isArray whether the tag is an array
* @param {boolean} [eager=false] whether to eagerly fetch deferred fields.
*                                 When false (default), tags are loaded lazily on-demand.
*                                 When true, all tags are loaded immediately during parsing.
*/
function registerTag(tag, name, type, isArray = false, eager = false) {
	tags[name] = tag;
	tagDefinitions[tag] = {
		tag,
		name,
		type: typeof type === "string" ? fieldTypes[type] : type,
		isArray,
		eager
	};
}
for (const [key, value] of Object.entries(tagDictionary)) {
	const entry = value;
	registerTag(entry.tag, entry.name || key, entry.type, entry.isArray, entry.eager);
}
/**
* @param {number|string} tagIdentifier The field tag ID or name
* @returns {number} the resolved tag ID
*/
function resolveTag(tagIdentifier) {
	if (typeof tagIdentifier === "number") return tagIdentifier;
	return tags[tagIdentifier];
}
var photometricInterpretations = {
	WhiteIsZero: 0,
	BlackIsZero: 1,
	RGB: 2,
	Palette: 3,
	TransparencyMask: 4,
	CMYK: 5,
	YCbCr: 6,
	CIELab: 8,
	ICCLab: 9
};
var ExtraSamplesValues = {
	Unspecified: 0,
	Assocalpha: 1,
	Unassalpha: 2
};
var LercParameters = {
	Version: 0,
	AddCompression: 1
};
var LercAddCompression = {
	None: 0,
	Deflate: 1,
	Zstandard: 2
};
var geoKeyNames = {
	1024: "GTModelTypeGeoKey",
	1025: "GTRasterTypeGeoKey",
	1026: "GTCitationGeoKey",
	2048: "GeographicTypeGeoKey",
	2049: "GeogCitationGeoKey",
	2050: "GeogGeodeticDatumGeoKey",
	2051: "GeogPrimeMeridianGeoKey",
	2052: "GeogLinearUnitsGeoKey",
	2053: "GeogLinearUnitSizeGeoKey",
	2054: "GeogAngularUnitsGeoKey",
	2055: "GeogAngularUnitSizeGeoKey",
	2056: "GeogEllipsoidGeoKey",
	2057: "GeogSemiMajorAxisGeoKey",
	2058: "GeogSemiMinorAxisGeoKey",
	2059: "GeogInvFlatteningGeoKey",
	2060: "GeogAzimuthUnitsGeoKey",
	2061: "GeogPrimeMeridianLongGeoKey",
	2062: "GeogTOWGS84GeoKey",
	3072: "ProjectedCSTypeGeoKey",
	3073: "PCSCitationGeoKey",
	3074: "ProjectionGeoKey",
	3075: "ProjCoordTransGeoKey",
	3076: "ProjLinearUnitsGeoKey",
	3077: "ProjLinearUnitSizeGeoKey",
	3078: "ProjStdParallel1GeoKey",
	3079: "ProjStdParallel2GeoKey",
	3080: "ProjNatOriginLongGeoKey",
	3081: "ProjNatOriginLatGeoKey",
	3082: "ProjFalseEastingGeoKey",
	3083: "ProjFalseNorthingGeoKey",
	3084: "ProjFalseOriginLongGeoKey",
	3085: "ProjFalseOriginLatGeoKey",
	3086: "ProjFalseOriginEastingGeoKey",
	3087: "ProjFalseOriginNorthingGeoKey",
	3088: "ProjCenterLongGeoKey",
	3089: "ProjCenterLatGeoKey",
	3090: "ProjCenterEastingGeoKey",
	3091: "ProjCenterNorthingGeoKey",
	3092: "ProjScaleAtNatOriginGeoKey",
	3093: "ProjScaleAtCenterGeoKey",
	3094: "ProjAzimuthAngleGeoKey",
	3095: "ProjStraightVertPoleLongGeoKey",
	3096: "ProjRectifiedGridAngleGeoKey",
	4096: "VerticalCSTypeGeoKey",
	4097: "VerticalCitationGeoKey",
	4098: "VerticalDatumGeoKey",
	4099: "VerticalUnitsGeoKey"
};
/** @typedef {geoKeyNames[keyof typeof geoKeyNames]} GeoKeyName */
/**
* @type {Record<GeoKeyName, number>}
*/
var geoKeys = {};
for (const [key, name] of Object.entries(geoKeyNames)) geoKeys[name] = parseInt(key, 10);
//#endregion
//#region node_modules/geotiff/dist-module/compression/lerc.js
var lerc_exports = /* @__PURE__ */ __exportAll({
	default: () => LercDecoder,
	zstd: () => zstd$1
});
/**
* @typedef {import('./basedecoder.js').BaseDecoderParameters & { LercParameters?: any }} LercDecoderParameters
*/
var zstd$1 = new ZSTDDecoder();
var LercDecoder = class extends BaseDecoder {
	/**
	* @param {ArrayBufferLike} buffer
	* @returns {ArrayBufferLike}
	*/
	decodeBlock(buffer) {
		var _params$LercParameter;
		const addCompression = (_params$LercParameter = this.parameters.LercParameters) === null || _params$LercParameter === void 0 ? void 0 : _params$LercParameter[LercParameters.AddCompression];
		/** @type {ArrayBufferLike} */
		let decoded = buffer;
		switch (addCompression) {
			case LercAddCompression.None: break;
			case LercAddCompression.Deflate:
				decoded = inflate_1(new Uint8Array(decoded)).buffer;
				break;
			case LercAddCompression.Zstandard:
				decoded = zstd$1.decode(new Uint8Array(decoded)).buffer;
				break;
			default: throw new Error(`Unsupported LERC additional compression method identifier: ${addCompression}`);
		}
		return import_LercDecode.default.decode(decoded, { returnPixelInterleavedDims: this.parameters.planarConfiguration === 1 }).pixels[0].buffer;
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/compression/lzw.js
var lzw_exports = /* @__PURE__ */ __exportAll({ default: () => LZWDecoder });
var MIN_BITS = 9;
var CLEAR_CODE = 256;
var EOI_CODE = 257;
var MAX_BYTELENGTH = 12;
/**
* @param {Uint8Array} array
* @param {number} position
* @param {number} length
* @returns {number}
*/
function getByte(array, position, length) {
	const d = position % 8;
	const a = Math.floor(position / 8);
	const de = 8 - d;
	const ef = position + length - (a + 1) * 8;
	let fg = 8 * (a + 2) - (position + length);
	const dg = (a + 2) * 8 - position;
	fg = Math.max(0, fg);
	if (a >= array.length) {
		console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)");
		return EOI_CODE;
	}
	let chunk1 = array[a] & Math.pow(2, 8 - d) - 1;
	chunk1 <<= length - de;
	let chunks = chunk1;
	if (a + 1 < array.length) {
		let chunk2 = array[a + 1] >>> fg;
		chunk2 <<= Math.max(0, length - dg);
		chunks += chunk2;
	}
	if (ef > 8 && a + 2 < array.length) {
		const hi = (a + 3) * 8 - (position + length);
		const chunk3 = array[a + 2] >>> hi;
		chunks += chunk3;
	}
	return chunks;
}
/**
* @template T
* @param {Array<T>} dest
* @param {Array<T>} source
* @returns {Array<T>}
*/
function appendReversed(dest, source) {
	for (let i = source.length - 1; i >= 0; i--) dest.push(source[i]);
	return dest;
}
/**
* @param {ArrayBuffer} input
*/
function decompress(input) {
	const dictionaryIndex = new Uint16Array(4093);
	const dictionaryChar = new Uint8Array(4093);
	for (let i = 0; i <= 257; i++) {
		dictionaryIndex[i] = 4096;
		dictionaryChar[i] = i;
	}
	let dictionaryLength = 258;
	let byteLength = MIN_BITS;
	let position = 0;
	function initDictionary() {
		dictionaryLength = 258;
		byteLength = MIN_BITS;
	}
	/** @param {Uint8Array} array */
	function getNext(array) {
		const byte = getByte(array, position, byteLength);
		position += byteLength;
		return byte;
	}
	/**
	* @param {number} i
	* @param {number} c
	*/
	function addToDictionary(i, c) {
		dictionaryChar[dictionaryLength] = c;
		dictionaryIndex[dictionaryLength] = i;
		dictionaryLength++;
		return dictionaryLength - 1;
	}
	/** @param {number} n */
	function getDictionaryReversed(n) {
		const rev = [];
		for (let i = n; i !== 4096; i = dictionaryIndex[i]) rev.push(dictionaryChar[i]);
		return rev;
	}
	const result = [];
	initDictionary();
	const array = new Uint8Array(input);
	let code = getNext(array);
	let oldCode;
	while (code !== EOI_CODE) {
		if (code === CLEAR_CODE) {
			initDictionary();
			code = getNext(array);
			while (code === CLEAR_CODE) code = getNext(array);
			if (code === EOI_CODE) break;
			else if (code > CLEAR_CODE) throw new Error(`corrupted code at scanline ${code}`);
			else {
				appendReversed(result, getDictionaryReversed(code));
				oldCode = code;
			}
		} else if (code < dictionaryLength) {
			const val = getDictionaryReversed(code);
			appendReversed(result, val);
			if (oldCode !== void 0) addToDictionary(oldCode, val[val.length - 1]);
			oldCode = code;
		} else {
			if (oldCode === void 0) throw new Error(`Invalid LZW code: ${code} with no previous code`);
			const oldVal = getDictionaryReversed(oldCode);
			if (!oldVal) throw new Error(`Bogus entry. Not in dictionary, ${oldCode} / ${dictionaryLength}, position: ${position}`);
			appendReversed(result, oldVal);
			result.push(oldVal[oldVal.length - 1]);
			addToDictionary(oldCode, oldVal[oldVal.length - 1]);
			oldCode = code;
		}
		if (dictionaryLength + 1 >= Math.pow(2, byteLength)) if (byteLength === MAX_BYTELENGTH) oldCode = void 0;
		else byteLength++;
		code = getNext(array);
	}
	return new Uint8Array(result);
}
var LZWDecoder = class extends BaseDecoder {
	/** @param {ArrayBuffer} buffer */
	decodeBlock(buffer) {
		return decompress(buffer).buffer;
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/compression/packbits.js
var packbits_exports = /* @__PURE__ */ __exportAll({ default: () => PackbitsDecoder });
var PackbitsDecoder = class extends BaseDecoder {
	/** @param {ArrayBuffer} buffer */
	decodeBlock(buffer) {
		const dataView = new DataView(buffer);
		const out = [];
		for (let i = 0; i < buffer.byteLength; ++i) {
			let header = dataView.getInt8(i);
			if (header < 0) {
				const next = dataView.getUint8(i + 1);
				header = -header;
				for (let j = 0; j <= header; ++j) out.push(next);
				i += 1;
			} else {
				for (let j = 0; j <= header; ++j) out.push(dataView.getUint8(i + j + 1));
				i += header + 1;
			}
		}
		return new Uint8Array(out).buffer;
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/compression/raw.js
var raw_exports = /* @__PURE__ */ __exportAll({ default: () => RawDecoder });
var RawDecoder = class extends BaseDecoder {
	/** @param {ArrayBuffer} buffer */
	decodeBlock(buffer) {
		return buffer;
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/compression/webimage.js
var webimage_exports = /* @__PURE__ */ __exportAll({ default: () => WebImageDecoder });
/**
* class WebImageDecoder
*
* This decoder uses the browsers image decoding facilities to read image
* formats like WebP when supported.
*/
var WebImageDecoder = class extends BaseDecoder {
	/**
	* @param {import('./basedecoder.js').BaseDecoderParameters} parameters
	*/
	constructor(parameters) {
		super(parameters);
		if (typeof createImageBitmap === "undefined") throw new Error("Cannot decode WebImage as `createImageBitmap` is not available");
		else if (typeof document === "undefined" && typeof OffscreenCanvas === "undefined") throw new Error("Cannot decode WebImage as neither `document` nor `OffscreenCanvas` is not available");
	}
	/** @param {ArrayBuffer} buffer */
	decodeBlock(buffer) {
		var _this = this;
		return _asyncToGenerator(function* () {
			const blob = new Blob([buffer]);
			const imageBitmap = yield createImageBitmap(blob);
			let canvas;
			if (typeof document !== "undefined") {
				canvas = document.createElement("canvas");
				canvas.width = imageBitmap.width;
				canvas.height = imageBitmap.height;
			} else canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
			const ctx = canvas.getContext("2d");
			ctx.drawImage(imageBitmap, 0, 0);
			const imageData = ctx.getImageData(0, 0, imageBitmap.width, imageBitmap.height).data;
			const samplesPerPixel = _this.parameters.samplesPerPixel || 4;
			if (samplesPerPixel === 4) return imageData.buffer;
			else if (samplesPerPixel === 3) {
				const rgb = new Uint8ClampedArray(imageBitmap.width * imageBitmap.height * 3);
				for (let i = 0, j = 0; i < rgb.length; i += 3, j += 4) {
					rgb[i] = imageData[j];
					rgb[i + 1] = imageData[j + 1];
					rgb[i + 2] = imageData[j + 2];
				}
				return rgb.buffer;
			} else throw new Error(`Unsupported SamplesPerPixel value: ${samplesPerPixel}`);
		})();
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/compression/zstd.js
var zstd_exports = /* @__PURE__ */ __exportAll({
	default: () => ZstdDecoder,
	zstd: () => zstd
});
var zstd = new ZSTDDecoder$1();
var ZstdDecoder = class extends BaseDecoder {
	/** @param {ArrayBuffer} buffer */
	decodeBlock(buffer) {
		return zstd.decode(new Uint8Array(buffer)).buffer;
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/rgb.js
function fromWhiteIsZero(raster, max) {
	const { width, height } = raster;
	const rgbRaster = new Uint8Array(width * height * 3);
	let value;
	for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
		value = 256 - raster[i] / max * 256;
		rgbRaster[j] = value;
		rgbRaster[j + 1] = value;
		rgbRaster[j + 2] = value;
	}
	return rgbRaster;
}
function fromBlackIsZero(raster, max) {
	const { width, height } = raster;
	const rgbRaster = new Uint8Array(width * height * 3);
	let value;
	for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
		value = raster[i] / max * 256;
		rgbRaster[j] = value;
		rgbRaster[j + 1] = value;
		rgbRaster[j + 2] = value;
	}
	return rgbRaster;
}
function fromPalette(raster, colorMap) {
	const { width, height } = raster;
	const rgbRaster = new Uint8Array(width * height * 3);
	const greenOffset = colorMap.length / 3;
	const blueOffset = colorMap.length / 3 * 2;
	for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
		const mapIndex = raster[i];
		rgbRaster[j] = colorMap[mapIndex] / 65536 * 256;
		rgbRaster[j + 1] = colorMap[mapIndex + greenOffset] / 65536 * 256;
		rgbRaster[j + 2] = colorMap[mapIndex + blueOffset] / 65536 * 256;
	}
	return rgbRaster;
}
function fromCMYK(cmykRaster) {
	const { width, height } = cmykRaster;
	const rgbRaster = new Uint8Array(width * height * 3);
	for (let i = 0, j = 0; i < cmykRaster.length; i += 4, j += 3) {
		const c = cmykRaster[i];
		const m = cmykRaster[i + 1];
		const y = cmykRaster[i + 2];
		const k = cmykRaster[i + 3];
		rgbRaster[j] = 255 * ((255 - c) / 256) * ((255 - k) / 256);
		rgbRaster[j + 1] = 255 * ((255 - m) / 256) * ((255 - k) / 256);
		rgbRaster[j + 2] = 255 * ((255 - y) / 256) * ((255 - k) / 256);
	}
	return rgbRaster;
}
function fromYCbCr(yCbCrRaster) {
	const { width, height } = yCbCrRaster;
	const rgbRaster = new Uint8ClampedArray(width * height * 3);
	for (let i = 0, j = 0; i < yCbCrRaster.length; i += 3, j += 3) {
		const y = yCbCrRaster[i];
		const cb = yCbCrRaster[i + 1];
		const cr = yCbCrRaster[i + 2];
		rgbRaster[j] = y + 1.402 * (cr - 128);
		rgbRaster[j + 1] = y - .34414 * (cb - 128) - .71414 * (cr - 128);
		rgbRaster[j + 2] = y + 1.772 * (cb - 128);
	}
	return rgbRaster;
}
var Xn = .95047;
var Yn = 1;
var Zn = 1.08883;
function fromCIELab(cieLabRaster) {
	const { width, height } = cieLabRaster;
	const rgbRaster = new Uint8Array(width * height * 3);
	for (let i = 0, j = 0; i < cieLabRaster.length; i += 3, j += 3) {
		const L = cieLabRaster[i + 0];
		const a_ = cieLabRaster[i + 1] << 24 >> 24;
		const b_ = cieLabRaster[i + 2] << 24 >> 24;
		let y = (L + 16) / 116;
		let x = a_ / 500 + y;
		let z = y - b_ / 200;
		let r;
		let g;
		let b;
		x = Xn * (x * x * x > .008856 ? x * x * x : (x - 16 / 116) / 7.787);
		y = Yn * (y * y * y > .008856 ? y * y * y : (y - 16 / 116) / 7.787);
		z = Zn * (z * z * z > .008856 ? z * z * z : (z - 16 / 116) / 7.787);
		r = x * 3.2406 + y * -1.5372 + z * -.4986;
		g = x * -.9689 + y * 1.8758 + z * .0415;
		b = x * .0557 + y * -.204 + z * 1.057;
		r = r > .0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - .055 : 12.92 * r;
		g = g > .0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - .055 : 12.92 * g;
		b = b > .0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - .055 : 12.92 * b;
		rgbRaster[j] = Math.max(0, Math.min(1, r)) * 255;
		rgbRaster[j + 1] = Math.max(0, Math.min(1, g)) * 255;
		rgbRaster[j + 2] = Math.max(0, Math.min(1, b)) * 255;
	}
	return rgbRaster;
}
//#endregion
//#region node_modules/geotiff/dist-module/compression/index.js
/** @import BaseDecoder, {BaseDecoderParameters} from "./basedecoder.js" */
/**
* @typedef {Object} RegistryEntry
* @property {function():Promise<typeof BaseDecoder>} importFn
* @property {function(import("../imagefiledirectory.js").ImageFileDirectory):Promise<BaseDecoderParameters>} decoderParameterFn
* @property {boolean} preferWorker
*/
/** @type {Map<number | undefined, RegistryEntry>} */
var registry = /* @__PURE__ */ new Map();
/**
* Default decoder parameter retrieval function
* @param {import("../imagefiledirectory.js").ImageFileDirectory} fileDirectory
* @returns {Promise<BaseDecoderParameters>}
*/
function defaultDecoderParameterFn(_x) {
	return _defaultDecoderParameterFn.apply(this, arguments);
}
function _defaultDecoderParameterFn() {
	_defaultDecoderParameterFn = _asyncToGenerator(function* (fileDirectory) {
		const isTiled = !fileDirectory.hasTag("StripOffsets");
		return {
			tileWidth: isTiled ? yield fileDirectory.loadValue("TileWidth") : yield fileDirectory.loadValue("ImageWidth"),
			tileHeight: isTiled ? yield fileDirectory.loadValue("TileLength") : (yield fileDirectory.loadValue("RowsPerStrip")) || (yield fileDirectory.loadValue("ImageLength")),
			planarConfiguration: yield fileDirectory.loadValue("PlanarConfiguration"),
			bitsPerSample: yield fileDirectory.loadValue("BitsPerSample"),
			predictor: (yield fileDirectory.loadValue("Predictor")) || 1
		};
	});
	return _defaultDecoderParameterFn.apply(this, arguments);
}
/**
* Register a decoder for a specific compression method or a range of compressions
* @param {(number|undefined|(number|undefined)[])} cases ids of the compression methods to register for
* @param {function():Promise<typeof BaseDecoder>} importFn the function to import the decoder
* @param {function(import("../imagefiledirectory.js").ImageFileDirectory):Promise<BaseDecoderParameters>} decoderParameterFn
* @param {boolean} preferWorker_ Whether to prefer running the decoder in a worker
*/
function addDecoder(cases, importFn, decoderParameterFn = defaultDecoderParameterFn, preferWorker_ = true) {
	if (!Array.isArray(cases)) cases = [cases];
	cases.forEach((c) => {
		registry.set(c, {
			importFn,
			decoderParameterFn,
			preferWorker: preferWorker_
		});
	});
}
/**
* Get the required decoder parameters for a specific compression method
* @param {number|undefined} compression
* @param {import('../imagefiledirectory.js').ImageFileDirectory} fileDirectory
*/
function getDecoderParameters(_x2, _x3) {
	return _getDecoderParameters.apply(this, arguments);
}
function _getDecoderParameters() {
	_getDecoderParameters = _asyncToGenerator(function* (compression, fileDirectory) {
		if (!registry.has(compression)) throw new Error(`Unknown compression method identifier: ${compression}`);
		const { decoderParameterFn } = registry.get(compression);
		return decoderParameterFn(fileDirectory);
	});
	return _getDecoderParameters.apply(this, arguments);
}
/**
* Get a decoder for a specific compression and parameters
* @param {number} compression the compression method identifier
* @param {BaseDecoderParameters} decoderParameters the parameters for the decoder
* @returns {Promise<import('./basedecoder.js').default>}
*/
function getDecoder(_x4, _x5) {
	return _getDecoder.apply(this, arguments);
}
function _getDecoder() {
	_getDecoder = _asyncToGenerator(function* (compression, decoderParameters) {
		if (!registry.has(compression)) throw new Error(`Unknown compression method identifier: ${compression}`);
		const { importFn } = registry.get(compression);
		return new (yield importFn())(decoderParameters);
	});
	return _getDecoder.apply(this, arguments);
}
/**
* Whether to prefer running the decoder in a worker
* @param {number|undefined} compression the compression method identifier
* @returns {boolean}
*/
function preferWorker(compression) {
	if (!registry.has(compression)) throw new Error(`Unknown compression method identifier: ${compression}`);
	return registry.get(compression).preferWorker;
}
var defaultDecoderDefinitions = [
	{
		cases: [void 0, 1],
		importFn: () => __vitePreload(() => Promise.resolve().then(() => raw_exports).then((m) => m.default), void 0, import.meta.url),
		preferWorker: false
	},
	{
		cases: 5,
		importFn: () => __vitePreload(() => Promise.resolve().then(() => lzw_exports).then((m) => m.default), void 0, import.meta.url)
	},
	{
		cases: 6,
		importFn: () => {
			throw new Error("old style JPEG compression is not supported.");
		}
	},
	{
		cases: 7,
		importFn: () => __vitePreload(() => Promise.resolve().then(() => jpeg_exports).then((m) => m.default), void 0, import.meta.url),
		/**
		* @param {import("../imagefiledirectory.js").ImageFileDirectory} fileDirectory
		*/
		decoderParameterFn: function() {
			var _ref = _asyncToGenerator(function* (fileDirectory) {
				return _objectSpread2(_objectSpread2({}, yield defaultDecoderParameterFn(fileDirectory)), {}, { JPEGTables: yield fileDirectory.loadValue("JPEGTables") });
			});
			return function decoderParameterFn(_x6) {
				return _ref.apply(this, arguments);
			};
		}()
	},
	{
		cases: [8, 32946],
		importFn: () => __vitePreload(() => Promise.resolve().then(() => deflate_exports).then((m) => m.default), void 0, import.meta.url)
	},
	{
		cases: 32773,
		importFn: () => __vitePreload(() => Promise.resolve().then(() => packbits_exports).then((m) => m.default), void 0, import.meta.url)
	},
	{
		cases: 34887,
		importFn: () => __vitePreload(() => Promise.resolve().then(() => lerc_exports).then(function() {
			var _ref2 = _asyncToGenerator(function* (m) {
				yield m.zstd.init();
				return m;
			});
			return function(_x7) {
				return _ref2.apply(this, arguments);
			};
		}()), void 0, import.meta.url).then((m) => m.default),
		/**
		* @param {import("../imagefiledirectory.js").ImageFileDirectory} fileDirectory
		*/
		decoderParameterFn: function() {
			var _ref3 = _asyncToGenerator(function* (fileDirectory) {
				return _objectSpread2(_objectSpread2({}, yield defaultDecoderParameterFn(fileDirectory)), {}, { LercParameters: yield fileDirectory.loadValue("LercParameters") });
			});
			return function decoderParameterFn(_x8) {
				return _ref3.apply(this, arguments);
			};
		}()
	},
	{
		cases: 5e4,
		importFn: () => __vitePreload(() => Promise.resolve().then(() => zstd_exports).then(function() {
			var _ref4 = _asyncToGenerator(function* (m) {
				yield m.zstd.init();
				return m;
			});
			return function(_x9) {
				return _ref4.apply(this, arguments);
			};
		}()), void 0, import.meta.url).then((m) => m.default)
	},
	{
		cases: 50001,
		importFn: () => __vitePreload(() => Promise.resolve().then(() => webimage_exports).then((m) => m.default), void 0, import.meta.url),
		/**
		* @param {import("../imagefiledirectory.js").ImageFileDirectory} fileDirectory
		*/
		decoderParameterFn: function() {
			var _ref5 = _asyncToGenerator(function* (fileDirectory) {
				return _objectSpread2(_objectSpread2({}, yield defaultDecoderParameterFn(fileDirectory)), {}, { samplesPerPixel: Number(yield fileDirectory.loadValue("SamplesPerPixel")) || 4 });
			});
			return function decoderParameterFn(_x10) {
				return _ref5.apply(this, arguments);
			};
		}(),
		preferWorker: false
	}
];
for (const decoderDefinition of defaultDecoderDefinitions) {
	const { cases, importFn, decoderParameterFn, preferWorker: preferWorker_ } = decoderDefinition;
	addDecoder(cases, importFn, decoderParameterFn, preferWorker_);
}
//#endregion
//#region node_modules/geotiff/dist-module/resample.js
/**
* @module resample
*/
/**
* @param {import("./geotiff.js").TypedArray} array
* @param {number} width
* @param {number} height
* @param {number} [samplesPerPixel=1]
*/
function copyNewSize(array, width, height, samplesPerPixel = 1) {
	return new (Object.getPrototypeOf(array)).constructor(width * height * samplesPerPixel);
}
/**
* Resample the input arrays using nearest neighbor value selection.
* @param {import("./geotiff.js").TypedArray[]} valueArrays The input arrays to resample
* @param {number} inWidth The width of the input rasters
* @param {number} inHeight The height of the input rasters
* @param {number} outWidth The desired width of the output rasters
* @param {number} outHeight The desired height of the output rasters
* @returns {import("./geotiff.js").TypedArray[]} The resampled rasters
*/
function resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight) {
	const relX = inWidth / outWidth;
	const relY = inHeight / outHeight;
	return valueArrays.map((array) => {
		const newArray = copyNewSize(array, outWidth, outHeight);
		for (let y = 0; y < outHeight; ++y) {
			const cy = Math.min(Math.round(relY * y), inHeight - 1);
			for (let x = 0; x < outWidth; ++x) {
				const cx = Math.min(Math.round(relX * x), inWidth - 1);
				const value = array[cy * inWidth + cx];
				newArray[y * outWidth + x] = value;
			}
		}
		return newArray;
	});
}
/**
* @param {number} v0
* @param {number} v1
* @param {number} t
*/
function lerp(v0, v1, t) {
	return (1 - t) * v0 + t * v1;
}
/**
* Resample the input arrays using bilinear interpolation.
* @param {import("./geotiff.js").TypedArray[]} valueArrays The input arrays to resample
* @param {number} inWidth The width of the input rasters
* @param {number} inHeight The height of the input rasters
* @param {number} outWidth The desired width of the output rasters
* @param {number} outHeight The desired height of the output rasters
* @returns {import("./geotiff.js").TypedArray[]} The resampled rasters
*/
function resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight) {
	const relX = inWidth / outWidth;
	const relY = inHeight / outHeight;
	return valueArrays.map((array) => {
		const newArray = copyNewSize(array, outWidth, outHeight);
		for (let y = 0; y < outHeight; ++y) {
			const rawY = relY * y;
			const yl = Math.floor(rawY);
			const yh = Math.min(Math.ceil(rawY), inHeight - 1);
			for (let x = 0; x < outWidth; ++x) {
				const rawX = relX * x;
				const tx = rawX % 1;
				const xl = Math.floor(rawX);
				const xh = Math.min(Math.ceil(rawX), inWidth - 1);
				const ll = array[yl * inWidth + xl];
				const hl = array[yl * inWidth + xh];
				const lh = array[yh * inWidth + xl];
				const hh = array[yh * inWidth + xh];
				const value = lerp(lerp(ll, hl, tx), lerp(lh, hh, tx), rawY % 1);
				newArray[y * outWidth + x] = value;
			}
		}
		return newArray;
	});
}
/**
* Resample the input arrays using the selected resampling method.
* @param {import("./geotiff.js").TypedArray[]} valueArrays The input arrays to resample
* @param {number} inWidth The width of the input rasters
* @param {number} inHeight The height of the input rasters
* @param {number} outWidth The desired width of the output rasters
* @param {number} outHeight The desired height of the output rasters
* @param {string} [method = 'nearest'] The desired resampling method
* @returns {import("./geotiff.js").TypedArray[]} The resampled rasters
*/
function resample(valueArrays, inWidth, inHeight, outWidth, outHeight, method = "nearest") {
	switch (method.toLowerCase()) {
		case "nearest": return resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight);
		case "bilinear":
		case "linear": return resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight);
		default: throw new Error(`Unsupported resampling method: '${method}'`);
	}
}
/**
* Resample the pixel interleaved input array using nearest neighbor value selection.
* @param {import("./geotiff.js").TypedArray} valueArray The input array to resample
* @param {number} inWidth The width of the input rasters
* @param {number} inHeight The height of the input rasters
* @param {number} outWidth The desired width of the output rasters
* @param {number} outHeight The desired height of the output rasters
* @param {number} samples The number of samples per pixel for pixel
*                         interleaved data
* @returns {import("./geotiff.js").TypedArray} The resampled raster
*/
function resampleNearestInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
	const relX = inWidth / outWidth;
	const relY = inHeight / outHeight;
	const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);
	for (let y = 0; y < outHeight; ++y) {
		const cy = Math.min(Math.round(relY * y), inHeight - 1);
		for (let x = 0; x < outWidth; ++x) {
			const cx = Math.min(Math.round(relX * x), inWidth - 1);
			for (let i = 0; i < samples; ++i) {
				const value = valueArray[cy * inWidth * samples + cx * samples + i];
				newArray[y * outWidth * samples + x * samples + i] = value;
			}
		}
	}
	return newArray;
}
/**
* Resample the pixel interleaved input array using bilinear interpolation.
* @param {import("./geotiff.js").TypedArray} valueArray The input array to resample
* @param {number} inWidth The width of the input rasters
* @param {number} inHeight The height of the input rasters
* @param {number} outWidth The desired width of the output rasters
* @param {number} outHeight The desired height of the output rasters
* @param {number} samples The number of samples per pixel for pixel
*                         interleaved data
* @returns {import("./geotiff.js").TypedArray} The resampled raster
*/
function resampleBilinearInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
	const relX = inWidth / outWidth;
	const relY = inHeight / outHeight;
	const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);
	for (let y = 0; y < outHeight; ++y) {
		const rawY = relY * y;
		const yl = Math.floor(rawY);
		const yh = Math.min(Math.ceil(rawY), inHeight - 1);
		for (let x = 0; x < outWidth; ++x) {
			const rawX = relX * x;
			const tx = rawX % 1;
			const xl = Math.floor(rawX);
			const xh = Math.min(Math.ceil(rawX), inWidth - 1);
			for (let i = 0; i < samples; ++i) {
				const ll = valueArray[yl * inWidth * samples + xl * samples + i];
				const hl = valueArray[yl * inWidth * samples + xh * samples + i];
				const lh = valueArray[yh * inWidth * samples + xl * samples + i];
				const hh = valueArray[yh * inWidth * samples + xh * samples + i];
				const value = lerp(lerp(ll, hl, tx), lerp(lh, hh, tx), rawY % 1);
				newArray[y * outWidth * samples + x * samples + i] = value;
			}
		}
	}
	return newArray;
}
/**
* Resample the pixel interleaved input array using the selected resampling method.
* @param {import("./geotiff.js").TypedArray} valueArray The input array to resample
* @param {number} inWidth The width of the input rasters
* @param {number} inHeight The height of the input rasters
* @param {number} outWidth The desired width of the output rasters
* @param {number} outHeight The desired height of the output rasters
* @param {number} samples The number of samples per pixel for pixel
*                                 interleaved data
* @param {string} [method = 'nearest'] The desired resampling method
* @returns {import("./geotiff.js").TypedArray} The resampled rasters
*/
function resampleInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples, method = "nearest") {
	switch (method.toLowerCase()) {
		case "nearest": return resampleNearestInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples);
		case "bilinear":
		case "linear": return resampleBilinearInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples);
		default: throw new Error(`Unsupported resampling method: '${method}'`);
	}
}
//#endregion
//#region node_modules/geotiff/dist-module/geotiffimage.js
/** @module geotiffimage */
/** @import {DecoderWorker, TypedArray} from "./geotiff.js" */
/** @import {ReadRasterResult} from "./geotiff.js" */
/** @import {ReadRastersOptions} from "./geotiff.js" */
/** @import {ReadRGBOptions} from "./geotiff.js" */
/**
* @param {Array<number>|TypedArray} array
* @param {number} start
* @param {number} end
* @returns {number}
*/
function sum(array, start, end) {
	let s = 0;
	for (let i = start; i < end; ++i) s += array[i];
	return s;
}
/**
* @param {1|2|3} format
* @param {number} bitsPerSample
* @param {number|ArrayBufferLike} sizeOrData
* @returns {TypedArray}
*/
function arrayForType(format, bitsPerSample, sizeOrData) {
	let TypedArrayConstructor;
	switch (format) {
		case 1:
			if (bitsPerSample <= 8) TypedArrayConstructor = Uint8Array;
			else if (bitsPerSample <= 16) TypedArrayConstructor = Uint16Array;
			else if (bitsPerSample <= 32) TypedArrayConstructor = Uint32Array;
			break;
		case 2:
			if (bitsPerSample === 8) TypedArrayConstructor = Int8Array;
			else if (bitsPerSample === 16) TypedArrayConstructor = Int16Array;
			else if (bitsPerSample === 32) TypedArrayConstructor = Int32Array;
			break;
		case 3:
			switch (bitsPerSample) {
				case 16:
				case 32:
					TypedArrayConstructor = Float32Array;
					break;
				case 64:
					TypedArrayConstructor = Float64Array;
					break;
				default: break;
			}
			break;
		default: break;
	}
	if (TypedArrayConstructor) {
		if (typeof sizeOrData === "number") return new TypedArrayConstructor(sizeOrData);
		else if (sizeOrData instanceof ArrayBuffer) return new TypedArrayConstructor(sizeOrData);
	}
	throw Error("Unsupported data format/bitsPerSample");
}
/**
* @param {1|2|3} format
* @param {number} bitsPerSample
* @returns {boolean}
*/
function needsNormalization(format, bitsPerSample) {
	if ((format === 1 || format === 2) && bitsPerSample <= 32 && bitsPerSample % 8 === 0) return false;
	else if (format === 3 && (bitsPerSample === 16 || bitsPerSample === 32 || bitsPerSample === 64)) return false;
	return true;
}
/**
* @param {ArrayBufferLike} inBuffer
* @param {1|2|3} format
* @param {1|2} planarConfiguration
* @param {number} samplesPerPixel
* @param {number} bitsPerSample
* @param {number} tileWidth
* @param {number} tileHeight
* @returns {ArrayBufferLike}
*/
function normalizeArray(inBuffer, format, planarConfiguration, samplesPerPixel, bitsPerSample, tileWidth, tileHeight) {
	const view = new DataView(inBuffer);
	const outSize = planarConfiguration === 2 ? tileHeight * tileWidth : tileHeight * tileWidth * samplesPerPixel;
	const samplesToTransfer = planarConfiguration === 2 ? 1 : samplesPerPixel;
	const outArray = arrayForType(format, bitsPerSample, outSize);
	const bitMask = parseInt("1".repeat(bitsPerSample), 2);
	if (format === 1) {
		let pixelBitSkip;
		if (planarConfiguration === 1) pixelBitSkip = samplesPerPixel * bitsPerSample;
		else pixelBitSkip = bitsPerSample;
		let bitsPerLine = tileWidth * pixelBitSkip;
		if ((bitsPerLine & 7) !== 0) bitsPerLine = bitsPerLine + 7 & -8;
		for (let y = 0; y < tileHeight; ++y) {
			const lineBitOffset = y * bitsPerLine;
			for (let x = 0; x < tileWidth; ++x) {
				const pixelBitOffset = lineBitOffset + x * samplesToTransfer * bitsPerSample;
				for (let i = 0; i < samplesToTransfer; ++i) {
					const bitOffset = pixelBitOffset + i * bitsPerSample;
					const outIndex = (y * tileWidth + x) * samplesToTransfer + i;
					const byteOffset = Math.floor(bitOffset / 8);
					const innerBitOffset = bitOffset % 8;
					if (innerBitOffset + bitsPerSample <= 8) outArray[outIndex] = view.getUint8(byteOffset) >> 8 - bitsPerSample - innerBitOffset & bitMask;
					else if (innerBitOffset + bitsPerSample <= 16) outArray[outIndex] = view.getUint16(byteOffset) >> 16 - bitsPerSample - innerBitOffset & bitMask;
					else if (innerBitOffset + bitsPerSample <= 24) outArray[outIndex] = (view.getUint16(byteOffset) << 8 | view.getUint8(byteOffset + 2)) >> 24 - bitsPerSample - innerBitOffset & bitMask;
					else outArray[outIndex] = view.getUint32(byteOffset) >> 32 - bitsPerSample - innerBitOffset & bitMask;
				}
			}
		}
	} else if (format === 3) {}
	return outArray.buffer;
}
/**
* GeoTIFF sub-file image.
*/
var GeoTIFFImage = class {
	/**
	* @constructor
	* @param {import("./imagefiledirectory.js").ImageFileDirectory} fileDirectory The parsed file directory
	* @param {Boolean} littleEndian Whether the file is encoded in little or big endian
	* @param {Boolean} cache Whether or not decoded tiles shall be cached
	* @param {import('./source/basesource.js').BaseSource} source The datasource to read from
	*/
	constructor(fileDirectory, littleEndian, cache, source) {
		var _fileDirectory$getVal;
		this.fileDirectory = fileDirectory;
		this.littleEndian = littleEndian;
		/** @type {Array<Promise<ArrayBufferLike>>|null} */
		this.tiles = cache ? [] : null;
		this.isTiled = !fileDirectory.hasTag("StripOffsets");
		const planarConfiguration = (_fileDirectory$getVal = fileDirectory.getValue("PlanarConfiguration")) !== null && _fileDirectory$getVal !== void 0 ? _fileDirectory$getVal : 1;
		if (planarConfiguration !== 1 && planarConfiguration !== 2) throw new Error("Invalid planar configuration.");
		/** @type {1 | 2} */
		this.planarConfiguration = planarConfiguration;
		this.source = source;
	}
	/**
	* Returns the associated parsed file directory.
	* @returns {import("./imagefiledirectory.js").ImageFileDirectory} the parsed file directory
	*/
	getFileDirectory() {
		return this.fileDirectory;
	}
	/**
	* Returns the associated parsed geo keys.
	* @returns {Partial<Record<import('./globals.js').GeoKeyName, *>>|null} the parsed geo keys
	*/
	getGeoKeys() {
		return this.fileDirectory.parseGeoKeyDirectory();
	}
	/**
	* Returns the width of the image.
	* @returns {Number} the width of the image
	*/
	getWidth() {
		return this.fileDirectory.getValue("ImageWidth") || 0;
	}
	/**
	* Returns the height of the image.
	* @returns {Number} the height of the image
	*/
	getHeight() {
		return this.fileDirectory.getValue("ImageLength") || 0;
	}
	/**
	* Returns the number of samples per pixel.
	* @returns {number} the number of samples per pixel
	*/
	getSamplesPerPixel() {
		var _this$fileDirectory$g;
		return (_this$fileDirectory$g = this.fileDirectory.getValue("SamplesPerPixel")) !== null && _this$fileDirectory$g !== void 0 ? _this$fileDirectory$g : 1;
	}
	/**
	* Returns the width of each tile.
	* @returns {number} the width of each tile
	*/
	getTileWidth() {
		return this.isTiled ? this.fileDirectory.getValue("TileWidth") || 0 : this.getWidth();
	}
	/**
	* Returns the height of each tile.
	* @returns {number} the height of each tile
	*/
	getTileHeight() {
		if (this.isTiled) return this.fileDirectory.getValue("TileLength") || 0;
		const rowsPerStrip = this.fileDirectory.hasTag("RowsPerStrip") && this.fileDirectory.getValue("RowsPerStrip");
		if (rowsPerStrip) return Math.min(rowsPerStrip, this.getHeight());
		return this.getHeight();
	}
	getBlockWidth() {
		return this.getTileWidth();
	}
	/**
	* @param {number} y
	* @returns {number}
	*/
	getBlockHeight(y) {
		if (this.isTiled || (y + 1) * this.getTileHeight() <= this.getHeight()) return this.getTileHeight();
		else return this.getHeight() - y * this.getTileHeight();
	}
	/**
	* Calculates the number of bytes for each pixel across all samples. Only full
	* bytes are supported, an exception is thrown when this is not the case.
	* @returns {Number} the bytes per pixel
	*/
	getBytesPerPixel() {
		let bytes = 0;
		const bitsPerSample = this.fileDirectory.getValue("BitsPerSample") || [];
		for (let i = 0; i < bitsPerSample.length; ++i) bytes += this.getSampleByteSize(i);
		return bytes;
	}
	/**
	* @param {number} i
	* @returns {number}
	*/
	getSampleByteSize(i) {
		const bitsPerSample = this.fileDirectory.getValue("BitsPerSample") || [];
		if (i >= bitsPerSample.length) throw new RangeError(`Sample index ${i} is out of range.`);
		return Math.ceil(bitsPerSample[i] / 8);
	}
	/**
	* @param {number} sampleIndex
	* @returns {(this: DataView, byteOffset: number, littleEndian: boolean) => number}
	*/
	getReaderForSample(sampleIndex) {
		const sampleFormat = this.fileDirectory.getValue("SampleFormat");
		const format = sampleFormat ? sampleFormat[sampleIndex] : 1;
		const bitsPerSample = (this.fileDirectory.getValue("BitsPerSample") || [])[sampleIndex];
		switch (format) {
			case 1:
				if (bitsPerSample <= 8) return DataView.prototype.getUint8;
				else if (bitsPerSample <= 16) return DataView.prototype.getUint16;
				else if (bitsPerSample <= 32) return DataView.prototype.getUint32;
				break;
			case 2:
				if (bitsPerSample <= 8) return DataView.prototype.getInt8;
				else if (bitsPerSample <= 16) return DataView.prototype.getInt16;
				else if (bitsPerSample <= 32) return DataView.prototype.getInt32;
				break;
			case 3:
				switch (bitsPerSample) {
					case 16: return function(offset, littleEndian) {
						return getFloat16(this, offset, littleEndian);
					};
					case 32: return DataView.prototype.getFloat32;
					case 64: return DataView.prototype.getFloat64;
					default: break;
				}
				break;
			default: break;
		}
		throw Error("Unsupported data format/bitsPerSample");
	}
	getSampleFormat(sampleIndex = 0) {
		const sampleFormat = this.fileDirectory.getValue("SampleFormat");
		return sampleFormat ? sampleFormat[sampleIndex] : 1;
	}
	getBitsPerSample(sampleIndex = 0) {
		const bitsPerSample = this.fileDirectory.getValue("BitsPerSample");
		return bitsPerSample ? bitsPerSample[sampleIndex] : 0;
	}
	/**
	* @param {number} sampleIndex
	* @param {number|ArrayBufferLike} sizeOrData
	* @returns {TypedArray}
	*/
	getArrayForSample(sampleIndex, sizeOrData) {
		return arrayForType(this.getSampleFormat(sampleIndex), this.getBitsPerSample(sampleIndex), sizeOrData);
	}
	/**
	* Returns the decoded strip or tile.
	* @param {Number} x the strip or tile x-offset
	* @param {Number} y the tile y-offset (0 for stripped images)
	* @param {Number} sample the sample to get for separated samples
	* @param {DecoderWorker|import("./geotiff.js").BaseDecoder} poolOrDecoder the decoder or decoder pool
	* @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
	*                               to be aborted
	* @returns {Promise.<{x: number, y: number, sample: number, data: ArrayBufferLike}>} the decoded strip or tile
	*/
	getTileOrStrip(x, y, sample, poolOrDecoder, signal) {
		var _this = this;
		return _asyncToGenerator(function* () {
			const numTilesPerRow = Math.ceil(_this.getWidth() / _this.getTileWidth());
			const numTilesPerCol = Math.ceil(_this.getHeight() / _this.getTileHeight());
			let index;
			const { tiles } = _this;
			if (_this.planarConfiguration === 1) index = y * numTilesPerRow + x;
			else if (_this.planarConfiguration === 2) index = sample * numTilesPerRow * numTilesPerCol + y * numTilesPerRow + x;
			if (index === void 0) throw new Error("Could not determine tile or strip index.");
			let offset;
			let byteCount;
			if (_this.isTiled) {
				offset = Number(yield _this.fileDirectory.loadValueIndexed("TileOffsets", index));
				byteCount = Number(yield _this.fileDirectory.loadValueIndexed("TileByteCounts", index));
			} else {
				offset = Number(yield _this.fileDirectory.loadValueIndexed("StripOffsets", index));
				byteCount = Number(yield _this.fileDirectory.loadValueIndexed("StripByteCounts", index));
			}
			if (byteCount === 0) {
				const nPixels = _this.getBlockHeight(y) * _this.getTileWidth();
				const bytesPerPixel = _this.planarConfiguration === 2 ? _this.getSampleByteSize(sample) : _this.getBytesPerPixel();
				const data = new ArrayBuffer(nPixels * bytesPerPixel);
				_this.getArrayForSample(sample, data).fill(_this.getGDALNoData() || 0);
				return {
					x,
					y,
					sample,
					data
				};
			}
			const slice = (yield _this.source.fetch([{
				offset,
				length: byteCount
			}], signal))[0];
			let request;
			if (tiles === null || !tiles[index]) {
				request = _asyncToGenerator(function* () {
					let data = yield poolOrDecoder.decode(slice);
					const sampleFormat = _this.getSampleFormat();
					const bitsPerSample = _this.getBitsPerSample();
					if (needsNormalization(sampleFormat, bitsPerSample)) data = normalizeArray(data, sampleFormat, _this.planarConfiguration, _this.getSamplesPerPixel(), bitsPerSample, _this.getTileWidth(), _this.getBlockHeight(y));
					return data;
				})();
				if (tiles !== null) tiles[index] = request;
			} else request = tiles[index];
			return {
				x,
				y,
				sample,
				data: yield request
			};
		})();
	}
	/**
	* Internal read function.
	* @private
	* @param {Array<number>} imageWindow The image window in pixel coordinates
	* @param {Array<number>} samples The selected samples (0-based indices)
	* @param {TypedArray|TypedArray[]} valueArrays The array(s) to write into
	* @param {boolean|undefined} interleave Whether or not to write in an interleaved manner
	* @param {DecoderWorker|import("./geotiff.js").BaseDecoder} poolOrDecoder the decoder or decoder pool
	* @param {number} [width] the width of window to be read into
	* @param {number} [height] the height of window to be read into
	* @param {string} [resampleMethod] the resampling method to be used when interpolating
	* @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
	*                               to be aborted
	* @returns {Promise<ReadRasterResult>}
	*/
	_readRaster(imageWindow, samples, valueArrays, interleave, poolOrDecoder, width, height, resampleMethod, signal) {
		var _this2 = this;
		return _asyncToGenerator(function* () {
			const tileWidth = _this2.getTileWidth();
			const tileHeight = _this2.getTileHeight();
			const imageWidth = _this2.getWidth();
			const imageHeight = _this2.getHeight();
			const minXTile = Math.max(Math.floor(imageWindow[0] / tileWidth), 0);
			const maxXTile = Math.min(Math.ceil(imageWindow[2] / tileWidth), Math.ceil(imageWidth / tileWidth));
			const minYTile = Math.max(Math.floor(imageWindow[1] / tileHeight), 0);
			const maxYTile = Math.min(Math.ceil(imageWindow[3] / tileHeight), Math.ceil(imageHeight / tileHeight));
			const windowWidth = imageWindow[2] - imageWindow[0];
			let bytesPerPixel = _this2.getBytesPerPixel();
			/** @type {Array<number>} */
			const srcSampleOffsets = [];
			/** @type {Array<(this: DataView, byteOffset: number, littleEndian: boolean) => number>} */
			const sampleReaders = [];
			for (let i = 0; i < samples.length; ++i) {
				if (_this2.planarConfiguration === 1) {
					const bitsPerSample = yield _this2.fileDirectory.loadValue("BitsPerSample");
					if (typeof bitsPerSample !== "object") throw new Error("Expected BitsPerSample to be an array or typed array.");
					srcSampleOffsets.push(sum(bitsPerSample, 0, samples[i]) / 8);
				} else srcSampleOffsets.push(0);
				sampleReaders.push(_this2.getReaderForSample(samples[i]));
			}
			const promises = [];
			const { littleEndian } = _this2;
			for (let yTile = minYTile; yTile < maxYTile; ++yTile) for (let xTile = minXTile; xTile < maxXTile; ++xTile) {
				let getPromise;
				if (_this2.planarConfiguration === 1) getPromise = _this2.getTileOrStrip(xTile, yTile, 0, poolOrDecoder, signal);
				for (let sampleIndex = 0; sampleIndex < samples.length; ++sampleIndex) {
					const si = sampleIndex;
					const sample = samples[sampleIndex];
					if (_this2.planarConfiguration === 2) {
						bytesPerPixel = _this2.getSampleByteSize(sample);
						getPromise = _this2.getTileOrStrip(xTile, yTile, sample, poolOrDecoder, signal);
					}
					if (!getPromise) throw new Error("Could not get tile or strip data.");
					const promise = getPromise.then((tile) => {
						const buffer = tile.data;
						const dataView = new DataView(buffer);
						const blockHeight = _this2.getBlockHeight(tile.y);
						const firstLine = tile.y * tileHeight;
						const firstCol = tile.x * tileWidth;
						const lastLine = firstLine + blockHeight;
						const lastCol = (tile.x + 1) * tileWidth;
						const reader = sampleReaders[si];
						const ymax = Math.min(blockHeight, blockHeight - (lastLine - imageWindow[3]), imageHeight - firstLine);
						const xmax = Math.min(tileWidth, tileWidth - (lastCol - imageWindow[2]), imageWidth - firstCol);
						for (let y = Math.max(0, imageWindow[1] - firstLine); y < ymax; ++y) for (let x = Math.max(0, imageWindow[0] - firstCol); x < xmax; ++x) {
							const pixelOffset = (y * tileWidth + x) * bytesPerPixel;
							const value = reader.call(dataView, pixelOffset + srcSampleOffsets[si], littleEndian);
							let windowCoordinate;
							if (interleave) {
								windowCoordinate = (y + firstLine - imageWindow[1]) * windowWidth * samples.length + (x + firstCol - imageWindow[0]) * samples.length + si;
								valueArrays[windowCoordinate] = value;
							} else {
								windowCoordinate = (y + firstLine - imageWindow[1]) * windowWidth + x + firstCol - imageWindow[0];
								/** @type {TypedArray} */ valueArrays[si][windowCoordinate] = value;
							}
						}
					});
					promises.push(promise);
				}
			}
			yield Promise.all(promises);
			if (width && imageWindow[2] - imageWindow[0] !== width || height && imageWindow[3] - imageWindow[1] !== height) {
				let resampled;
				if (interleave) resampled = resampleInterleaved(valueArrays, imageWindow[2] - imageWindow[0], imageWindow[3] - imageWindow[1], width, height, samples.length, resampleMethod);
				else resampled = resample(valueArrays, imageWindow[2] - imageWindow[0], imageWindow[3] - imageWindow[1], width, height, resampleMethod);
				const resampledWithDimensions = resampled;
				resampledWithDimensions.width = width !== null && width !== void 0 ? width : imageWindow[2] - imageWindow[0];
				resampledWithDimensions.height = height !== null && height !== void 0 ? height : imageWindow[3] - imageWindow[1];
				return resampledWithDimensions;
			}
			const valueArraysWithDimensions = valueArrays;
			valueArraysWithDimensions.width = width || imageWindow[2] - imageWindow[0];
			valueArraysWithDimensions.height = height || imageWindow[3] - imageWindow[1];
			return valueArraysWithDimensions;
		})();
	}
	/**
	* @overload
	* @param {ReadRastersOptions & {interleave: true}} options optional parameters
	* @returns {Promise<import("./geotiff.js").TypedArrayWithDimensions>} the decoded arrays as a promise
	*/
	/**
	* @overload
	* @param {ReadRastersOptions & {interleave: false}} options optional parameters
	* @returns {Promise<import("./geotiff.js").TypedArrayArrayWithDimensions>} the decoded arrays as a promise
	*/
	/**
	* @overload
	* @param {ReadRastersOptions & {interleave: boolean}} options optional parameters
	* @returns {Promise<ReadRasterResult>} the decoded arrays as a promise
	*/
	/**
	* @overload
	* @param {ReadRastersOptions} [options={}] optional parameters
	* @returns {Promise<import("./geotiff.js").TypedArrayArrayWithDimensions>} the decoded arrays as a promise
	*/
	/**
	* Reads raster data from the image. This function reads all selected samples
	* into separate arrays of the correct type for that sample or into a single
	* combined array when `interleave` is set. When provided, only a subset
	* of the raster is read for each sample.
	*
	* @param {ReadRastersOptions} [options={}] optional parameters
	* @returns {Promise<ReadRasterResult>} the decoded arrays as a promise
	*/
	readRasters() {
		var _this3 = this;
		return _asyncToGenerator(function* (options = {}) {
			const { window: wnd, samples = [], pool = null, width, height, resampleMethod, fillValue, signal } = options;
			const interleave = "interleave" in options && options.interleave;
			const imageWindow = wnd || [
				0,
				0,
				_this3.getWidth(),
				_this3.getHeight()
			];
			if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) throw new Error("Invalid subsets");
			const numPixels = (imageWindow[2] - imageWindow[0]) * (imageWindow[3] - imageWindow[1]);
			const samplesPerPixel = _this3.getSamplesPerPixel();
			if (!samples || !samples.length) for (let i = 0; i < samplesPerPixel; ++i) samples.push(i);
			else for (let i = 0; i < samples.length; ++i) if (samples[i] >= samplesPerPixel) return Promise.reject(/* @__PURE__ */ new RangeError(`Invalid sample index '${samples[i]}'.`));
			/** @type {TypedArray|TypedArray[]} */
			let valueArrays;
			if (interleave) {
				const { fileDirectory } = _this3;
				const sampleFormat = fileDirectory.getValue("SampleFormat");
				const format = sampleFormat ? Math.max.apply(null, Array.from(sampleFormat)) : 1;
				if (format !== 1 && format !== 2 && format !== 3) throw new Error("Unsupported sample format for interleaved data. Must be 1, 2, or 3.");
				const bitsPerSample_ = fileDirectory.getValue("BitsPerSample");
				valueArrays = arrayForType(format, bitsPerSample_ ? Math.max.apply(null, Array.from(bitsPerSample_)) : 8, numPixels * samples.length);
				if (fillValue) {
					if (Array.isArray(fillValue)) throw new Error("When reading interleaved data, fillValue must be a single number.");
					valueArrays.fill(fillValue);
				}
			} else {
				valueArrays = [];
				for (let i = 0; i < samples.length; ++i) {
					const valueArray = _this3.getArrayForSample(samples[i], numPixels);
					if (Array.isArray(fillValue) && i < fillValue.length) valueArray.fill(fillValue[i]);
					else if (fillValue && !Array.isArray(fillValue)) valueArray.fill(fillValue);
					valueArrays.push(valueArray);
				}
			}
			const compression = _this3.fileDirectory.getValue("Compression") || 1;
			const decoderParameters = yield getDecoderParameters(compression, _this3.fileDirectory);
			const poolOrDecoder = pool ? pool.bindParameters(compression, decoderParameters) : yield getDecoder(compression, decoderParameters);
			return yield _this3._readRaster(imageWindow, samples, valueArrays, interleave, poolOrDecoder, width, height, resampleMethod, signal);
		}).apply(this, arguments);
	}
	/**
	* @overload
	* @param {ReadRGBOptions & {interleave: true}} options optional parameters
	* @returns {Promise<import("./geotiff.js").TypedArrayWithDimensions>} the RGB array as a Promise
	*/
	/**
	* @overload
	* @param {ReadRGBOptions & {interleave: false}} options optional parameters
	* @returns {Promise<import("./geotiff.js").TypedArrayArrayWithDimensions>} the RGB array as a Promise
	*/
	/**
	* @overload
	* @param {ReadRGBOptions & {interleave: boolean}} options optional parameters
	* @returns {Promise<ReadRasterResult>} the RGB array as a Promise
	*/
	/**
	* @overload
	* @param {ReadRGBOptions} [options={}] optional parameters
	* @returns {Promise<import("./geotiff.js").TypedArrayArrayWithDimensions>} the RGB array as a Promise
	*/
	/**
	* Reads raster data from the image as RGB.
	* Colorspaces other than RGB will be transformed to RGB, color maps expanded.
	* When no other method is applicable, the first sample is used to produce a
	* grayscale image.
	* When provided, only a subset of the raster is read for each sample.
	*
	* @param {ReadRGBOptions} [options] optional parameters
	* @returns {Promise<ReadRasterResult>} the RGB array as a Promise
	*/
	readRGB() {
		var _this4 = this;
		return _asyncToGenerator(function* (options = {}) {
			var _ref;
			const { window, pool = null, width, height, resampleMethod, enableAlpha = false, signal } = options;
			const interleave = (_ref = "interleave" in options && options.interleave) !== null && _ref !== void 0 ? _ref : false;
			const imageWindow = window || [
				0,
				0,
				_this4.getWidth(),
				_this4.getHeight()
			];
			if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) throw new Error("Invalid subsets");
			const pi = _this4.fileDirectory.getValue("PhotometricInterpretation");
			if (pi === photometricInterpretations.RGB) {
				let s = [
					0,
					1,
					2
				];
				const extraSamples = _this4.fileDirectory.getValue("ExtraSamples");
				if (extraSamples && extraSamples[0] !== ExtraSamplesValues.Unspecified && enableAlpha) {
					s = [];
					const bitsPerSample = _this4.fileDirectory.getValue("BitsPerSample") || [];
					for (let i = 0; i < bitsPerSample.length; i += 1) s.push(i);
				}
				return _this4.readRasters({
					window,
					interleave,
					samples: s,
					pool,
					width,
					height,
					resampleMethod,
					signal
				});
			}
			let samples;
			switch (pi) {
				case photometricInterpretations.WhiteIsZero:
				case photometricInterpretations.BlackIsZero:
				case photometricInterpretations.Palette:
					samples = [0];
					break;
				case photometricInterpretations.CMYK:
					samples = [
						0,
						1,
						2,
						3
					];
					break;
				case photometricInterpretations.YCbCr:
				case photometricInterpretations.CIELab:
					samples = [
						0,
						1,
						2
					];
					break;
				default: throw new Error("Invalid or unsupported photometric interpretation.");
			}
			const subOptions = {
				window: imageWindow,
				/** @type {true} */
				interleave: true,
				samples,
				pool,
				width,
				height,
				resampleMethod,
				signal
			};
			const { fileDirectory } = _this4;
			const raster = yield _this4.readRasters(subOptions);
			const max = Math.pow(2, _this4.getBitsPerSample(0));
			let data;
			switch (pi) {
				case photometricInterpretations.WhiteIsZero:
					data = fromWhiteIsZero(raster, max);
					break;
				case photometricInterpretations.BlackIsZero:
					data = fromBlackIsZero(raster, max);
					break;
				case photometricInterpretations.Palette:
					data = fromPalette(raster, yield fileDirectory.loadValue("ColorMap"));
					break;
				case photometricInterpretations.CMYK:
					data = fromCMYK(raster);
					break;
				case photometricInterpretations.YCbCr:
					data = fromYCbCr(raster);
					break;
				case photometricInterpretations.CIELab:
					data = fromCIELab(raster);
					break;
				default: throw new Error("Unsupported photometric interpretation.");
			}
			if (!interleave) {
				const red = new Uint8Array(data.length / 3);
				const green = new Uint8Array(data.length / 3);
				const blue = new Uint8Array(data.length / 3);
				for (let i = 0, j = 0; i < data.length; i += 3, ++j) {
					red[j] = data[i];
					green[j] = data[i + 1];
					blue[j] = data[i + 2];
				}
				data = [
					red,
					green,
					blue
				];
			}
			const dataWithDimensions = data;
			dataWithDimensions.width = raster.width;
			dataWithDimensions.height = raster.height;
			return dataWithDimensions;
		}).apply(this, arguments);
	}
	/**
	* Returns an array of tiepoints.
	* @returns {Promise<Array<{i: number, j: number, k: number, x: number, y: number, z: number}>>} the tiepoints
	*/
	getTiePoints() {
		var _this5 = this;
		return _asyncToGenerator(function* () {
			if (!_this5.fileDirectory.hasTag("ModelTiepoint")) return [];
			const modelTiePoint = yield _this5.fileDirectory.loadValue("ModelTiepoint");
			if (typeof modelTiePoint !== "object") throw new Error("Expected ModelTiepoint to be an array or typed array.");
			const tiePoints = [];
			for (let i = 0; i < modelTiePoint.length; i += 6) tiePoints.push({
				i: modelTiePoint[i],
				j: modelTiePoint[i + 1],
				k: modelTiePoint[i + 2],
				x: modelTiePoint[i + 3],
				y: modelTiePoint[i + 4],
				z: modelTiePoint[i + 5]
			});
			return tiePoints;
		})();
	}
	/**
	* Returns the parsed GDAL metadata items.
	*
	* If sample is passed to null, dataset-level metadata will be returned.
	* Otherwise only metadata specific to the provided sample will be returned.
	*
	* @param {number|null} [sample=null] The sample index.
	* @returns {Promise<Record<string, unknown>|null>} The GDAL metadata items
	*/
	getGDALMetadata(sample = null) {
		var _this6 = this;
		return _asyncToGenerator(function* () {
			/** @type {Record<string, unknown>} */
			const metadata = {};
			if (!_this6.fileDirectory.hasTag("GDAL_METADATA")) return null;
			/** @type {Array<{inner: unknown}>} */
			let items = findTagsByName(yield _this6.fileDirectory.loadValue("GDAL_METADATA"), "Item");
			if (sample === null) items = items.filter((item) => getAttribute(item, "sample") === void 0);
			else items = items.filter((item) => Number(getAttribute(item, "sample")) === sample);
			for (let i = 0; i < items.length; ++i) {
				const item = items[i];
				metadata[getAttribute(item, "name")] = item.inner;
			}
			return metadata;
		})();
	}
	/**
	* Returns the GDAL nodata value
	* @returns {number|null}
	*/
	getGDALNoData() {
		const string = this.fileDirectory.hasTag("GDAL_NODATA") && this.fileDirectory.getValue("GDAL_NODATA");
		if (!string) return null;
		return Number(string.substring(0, string.length - 1));
	}
	/**
	* Returns the image origin as a XYZ-vector. When the image has no affine
	* transformation, then an exception is thrown.
	* @returns {Array<number>} The origin as a vector
	*/
	getOrigin() {
		const tiePoints = this.fileDirectory.getValue("ModelTiepoint");
		const modelTransformation = this.fileDirectory.getValue("ModelTransformation");
		if (tiePoints && tiePoints.length === 6) return [
			tiePoints[3],
			tiePoints[4],
			tiePoints[5]
		];
		if (modelTransformation) return [
			modelTransformation[3],
			modelTransformation[7],
			modelTransformation[11]
		];
		throw new Error("The image does not have an affine transformation.");
	}
	/**
	* Returns the image resolution as a XYZ-vector. When the image has no affine
	* transformation, then an exception is thrown.
	* @param {GeoTIFFImage|null} [referenceImage=null] A reference image to calculate the resolution from
	*                                             in cases when the current image does not have the
	*                                             required tags on its own.
	* @returns {Array<number>} The resolution as a vector
	*/
	getResolution(referenceImage = null) {
		const modelPixelScale = this.fileDirectory.getValue("ModelPixelScale");
		const modelTransformation = this.fileDirectory.getValue("ModelTransformation");
		if (modelPixelScale) return [
			modelPixelScale[0],
			-modelPixelScale[1],
			modelPixelScale[2]
		];
		if (modelTransformation) {
			if (modelTransformation[1] === 0 && modelTransformation[4] === 0) return [
				modelTransformation[0],
				-modelTransformation[5],
				modelTransformation[10]
			];
			return [
				Math.sqrt(modelTransformation[0] * modelTransformation[0] + modelTransformation[4] * modelTransformation[4]),
				-Math.sqrt(modelTransformation[1] * modelTransformation[1] + modelTransformation[5] * modelTransformation[5]),
				modelTransformation[10]
			];
		}
		if (referenceImage) {
			const [refResX, refResY, refResZ] = referenceImage.getResolution();
			return [
				refResX * referenceImage.getWidth() / this.getWidth(),
				refResY * referenceImage.getHeight() / this.getHeight(),
				refResZ * referenceImage.getWidth() / this.getWidth()
			];
		}
		throw new Error("The image does not have an affine transformation.");
	}
	/**
	* Returns whether or not the pixels of the image depict an area (or point).
	* @returns {Boolean} Whether the pixels are a point
	*/
	pixelIsArea() {
		var _this$getGeoKeys;
		return ((_this$getGeoKeys = this.getGeoKeys()) === null || _this$getGeoKeys === void 0 ? void 0 : _this$getGeoKeys.GTRasterTypeGeoKey) === 1;
	}
	/**
	* Returns the image bounding box as an array of 4 values: min-x, min-y,
	* max-x and max-y. When the image has no affine transformation, then an
	* exception is thrown.
	* @param {boolean} [tilegrid=false] If true return extent for a tilegrid
	*                                   without adjustment for ModelTransformation.
	* @returns {Array<number>} The bounding box
	*/
	getBoundingBox(tilegrid = false) {
		const height = this.getHeight();
		const width = this.getWidth();
		const modelTransformation = this.fileDirectory.getValue("ModelTransformation");
		if (modelTransformation && !tilegrid) {
			const [a, b, , d, e, f, , h] = modelTransformation;
			const projected = [
				[0, 0],
				[0, height],
				[width, 0],
				[width, height]
			].map(([I, J]) => [d + a * I + b * J, h + e * I + f * J]);
			const xs = projected.map((pt) => pt[0]);
			const ys = projected.map((pt) => pt[1]);
			return [
				Math.min(...xs),
				Math.min(...ys),
				Math.max(...xs),
				Math.max(...ys)
			];
		} else {
			const origin = this.getOrigin();
			const resolution = this.getResolution();
			const x1 = origin[0];
			const y1 = origin[1];
			const x2 = x1 + resolution[0] * width;
			const y2 = y1 + resolution[1] * height;
			return [
				Math.min(x1, x2),
				Math.min(y1, y2),
				Math.max(x1, x2),
				Math.max(y1, y2)
			];
		}
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/dataview64.js
var DataView64 = class {
	/**
	* @param {ArrayBufferLike} arrayBuffer
	*/
	constructor(arrayBuffer) {
		this._dataView = new DataView(arrayBuffer);
	}
	get buffer() {
		return this._dataView.buffer;
	}
	/**
	* @param {number} offset
	* @param {boolean} littleEndian
	* @returns {number}
	*/
	getUint64(offset, littleEndian) {
		const left = this.getUint32(offset, littleEndian);
		const right = this.getUint32(offset + 4, littleEndian);
		let combined;
		if (littleEndian) {
			combined = left + Math.pow(2, 32) * right;
			if (!Number.isSafeInteger(combined)) throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
			return combined;
		}
		combined = Math.pow(2, 32) * left + right;
		if (!Number.isSafeInteger(combined)) throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
		return combined;
	}
	/**
	* Adapted from https://stackoverflow.com/a/55338384/8060591
	* @param {number} offset
	* @param {boolean} littleEndian
	* @returns {number}
	*/
	getInt64(offset, littleEndian) {
		let value = 0;
		const isNegative = (this._dataView.getUint8(offset + (littleEndian ? 7 : 0)) & 128) > 0;
		let carrying = true;
		for (let i = 0; i < 8; i++) {
			let byte = this._dataView.getUint8(offset + (littleEndian ? i : 7 - i));
			if (isNegative) if (carrying) {
				if (byte !== 0) {
					byte = ~(byte - 1) & 255;
					carrying = false;
				}
			} else byte = ~byte & 255;
			value += byte * Math.pow(256, i);
		}
		if (isNegative) value = -value;
		return value;
	}
	/**
	* @param {number} offset
	* @returns {number}
	*/
	getUint8(offset) {
		return this._dataView.getUint8(offset);
	}
	/**
	* @param {number} offset
	* @returns {number}
	*/
	getInt8(offset) {
		return this._dataView.getInt8(offset);
	}
	/**
	* @param {number} offset
	* @param {boolean} littleEndian
	* @returns {number}
	*/
	getUint16(offset, littleEndian) {
		return this._dataView.getUint16(offset, littleEndian);
	}
	/**
	* @param {number} offset
	* @param {boolean} littleEndian
	* @returns {number}
	*/
	getInt16(offset, littleEndian) {
		return this._dataView.getInt16(offset, littleEndian);
	}
	/**
	* @param {number} offset
	* @param {boolean} littleEndian
	* @returns {number}
	*/
	getUint32(offset, littleEndian) {
		return this._dataView.getUint32(offset, littleEndian);
	}
	/**
	* @param {number} offset
	* @param {boolean} littleEndian
	* @returns {number}
	*/
	getInt32(offset, littleEndian) {
		return this._dataView.getInt32(offset, littleEndian);
	}
	/**
	* @param {number} offset
	* @param {boolean} littleEndian
	* @returns {number}
	*/
	getFloat16(offset, littleEndian) {
		return getFloat16(this._dataView, offset, littleEndian);
	}
	/**
	* @param {number} offset
	* @param {boolean} littleEndian
	* @returns {number}
	*/
	getFloat32(offset, littleEndian) {
		return this._dataView.getFloat32(offset, littleEndian);
	}
	/**
	* @param {number} offset
	* @param {boolean} littleEndian
	* @returns {number}
	*/
	getFloat64(offset, littleEndian) {
		return this._dataView.getFloat64(offset, littleEndian);
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/dataslice.js
var DataSlice = class {
	/**
	* @param {ArrayBufferLike} arrayBuffer
	* @param {number} sliceOffset
	* @param {boolean} littleEndian
	* @param {boolean} bigTiff
	*/
	constructor(arrayBuffer, sliceOffset, littleEndian, bigTiff) {
		this._dataView = new DataView(arrayBuffer);
		this._sliceOffset = sliceOffset;
		this._littleEndian = littleEndian;
		this._bigTiff = bigTiff;
	}
	get sliceOffset() {
		return this._sliceOffset;
	}
	get sliceTop() {
		return this._sliceOffset + this.buffer.byteLength;
	}
	get littleEndian() {
		return this._littleEndian;
	}
	get bigTiff() {
		return this._bigTiff;
	}
	get buffer() {
		return this._dataView.buffer;
	}
	/**
	* @param {number} offset
	* @param {number} length
	* @returns {boolean}
	*/
	covers(offset, length) {
		return this.sliceOffset <= offset && this.sliceTop >= offset + length;
	}
	/**
	* @param {number} offset
	* @returns {number}
	*/
	readUint8(offset) {
		return this._dataView.getUint8(offset - this._sliceOffset);
	}
	/**
	* @param {number} offset
	* @returns {number}
	*/
	readInt8(offset) {
		return this._dataView.getInt8(offset - this._sliceOffset);
	}
	/**
	* @param {number} offset
	* @returns {number}
	*/
	readUint16(offset) {
		return this._dataView.getUint16(offset - this._sliceOffset, this._littleEndian);
	}
	/**
	* @param {number} offset
	* @returns {number}
	*/
	readInt16(offset) {
		return this._dataView.getInt16(offset - this._sliceOffset, this._littleEndian);
	}
	/**
	* @param {number} offset
	* @returns {number}
	*/
	readUint32(offset) {
		return this._dataView.getUint32(offset - this._sliceOffset, this._littleEndian);
	}
	/**
	* @param {number} offset
	* @returns {number}
	*/
	readInt32(offset) {
		return this._dataView.getInt32(offset - this._sliceOffset, this._littleEndian);
	}
	/**
	* @param {number} offset
	* @returns {number}
	*/
	readFloat32(offset) {
		return this._dataView.getFloat32(offset - this._sliceOffset, this._littleEndian);
	}
	/**
	* @param {number} offset
	* @returns {number}
	*/
	readFloat64(offset) {
		return this._dataView.getFloat64(offset - this._sliceOffset, this._littleEndian);
	}
	/**
	* @param {number} offset
	* @returns {number}
	*/
	readUint64(offset) {
		const left = this.readUint32(offset);
		const right = this.readUint32(offset + 4);
		let combined;
		if (this._littleEndian) {
			combined = left + Math.pow(2, 32) * right;
			if (!Number.isSafeInteger(combined)) throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
			return combined;
		}
		combined = Math.pow(2, 32) * left + right;
		if (!Number.isSafeInteger(combined)) throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
		return combined;
	}
	/**
	* Adapted from https://stackoverflow.com/a/55338384/8060591
	* @param {number} offset
	* @returns {number}
	*/
	readInt64(offset) {
		let value = 0;
		const isNegative = (this._dataView.getUint8(offset + (this._littleEndian ? 7 : 0)) & 128) > 0;
		let carrying = true;
		for (let i = 0; i < 8; i++) {
			let byte = this._dataView.getUint8(offset + (this._littleEndian ? i : 7 - i));
			if (isNegative) if (carrying) {
				if (byte !== 0) {
					byte = ~(byte - 1) & 255;
					carrying = false;
				}
			} else byte = ~byte & 255;
			value += byte * Math.pow(256, i);
		}
		if (isNegative) value = -value;
		return value;
	}
	/**
	* @param {number} offset
	* @returns {number}
	*/
	readOffset(offset) {
		if (this._bigTiff) return this.readUint64(offset);
		return this.readUint32(offset);
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/worker/create.js
function create() {
	const source = "const A=new Map;async function I(A){const I=!A.hasTag(\"StripOffsets\");return{tileWidth:I?await A.loadValue(\"TileWidth\"):await A.loadValue(\"ImageWidth\"),tileHeight:I?await A.loadValue(\"TileLength\"):await A.loadValue(\"RowsPerStrip\")||await A.loadValue(\"ImageLength\"),planarConfiguration:await A.loadValue(\"PlanarConfiguration\"),bitsPerSample:await A.loadValue(\"BitsPerSample\"),predictor:await A.loadValue(\"Predictor\")||1}}function g(g,B,C=I,Q=!0){Array.isArray(g)||(g=[g]),g.forEach((I=>{A.set(I,{importFn:B,decoderParameterFn:C,preferWorker:Q})}))}const B=[{cases:[void 0,1],importFn:()=>Promise.resolve().then((function(){return e})).then((A=>A.default)),preferWorker:!1},{cases:5,importFn:()=>Promise.resolve().then((function(){return a})).then((A=>A.default))},{cases:6,importFn:()=>{throw new Error(\"old style JPEG compression is not supported.\")}},{cases:7,importFn:()=>Promise.resolve().then((function(){return w})).then((A=>A.default)),decoderParameterFn:async A=>({...await I(A),JPEGTables:await A.loadValue(\"JPEGTables\")})},{cases:[8,32946],importFn:()=>Promise.resolve().then((function(){return Qg})).then((A=>A.default))},{cases:32773,importFn:()=>Promise.resolve().then((function(){return ig})).then((A=>A.default))},{cases:34887,importFn:()=>Promise.resolve().then((function(){return Rg})).then((async A=>(await A.zstd.init(),A))).then((A=>A.default)),decoderParameterFn:async A=>({...await I(A),LercParameters:await A.loadValue(\"LercParameters\")})},{cases:5e4,importFn:()=>Promise.resolve().then((function(){return Jg})).then((async A=>(await A.zstd.init(),A))).then((A=>A.default))},{cases:50001,importFn:()=>Promise.resolve().then((function(){return Hg})).then((A=>A.default)),decoderParameterFn:async A=>({...await I(A),samplesPerPixel:Number(await A.loadValue(\"SamplesPerPixel\"))||4}),preferWorker:!1}];for(const A of B){const{cases:I,importFn:B,decoderParameterFn:C,preferWorker:Q}=A;g(I,B,C,Q)}const C=globalThis;function Q(A,I){let g=A.length-I,B=0;do{for(let g=I;g>0;g--)A[B+I]+=A[B],B++;g-=I}while(g>0)}function E(A,I,g){let B=0,C=A.length;const Q=C/g;for(;C>I;){for(let g=I;g>0;--g)A[B+I]+=A[B],++B;C-=I}const E=A.slice();for(let I=0;I<Q;++I)for(let B=0;B<g;++B)A[g*I+B]=E[(g-B-1)*Q+I]}C.addEventListener(\"message\",(async I=>{const{compression:g,decoderParameters:B,buffer:Q,...E}=I.data;try{const I=await async function(I,g){if(!A.has(I))throw new Error(`Unknown compression method identifier: ${I}`);const{importFn:B}=A.get(I);return new(await B())(g)}(g,B),i=await I.decode(Q);C.postMessage({decoded:i,...E},[i])}catch(A){A instanceof Error?C.postMessage({error:A.message,...E}):C.postMessage({error:String(A),...E})}}));class i{constructor(A){this.parameters=A}decodeBlock(A){throw new Error(\"decodeBlock not implemented\")}async decode(A){const I=await this.decodeBlock(A),{tileWidth:g,tileHeight:B,predictor:C,bitsPerSample:i,planarConfiguration:e}=this.parameters;if(1!==C){return function(A,I,g,B,C,i){if(!I||1===I)return A;for(let A=0;A<C.length;++A){if(C[A]%8!=0)throw new Error(\"When decoding with predictor, only multiple of 8 bits are supported.\");if(C[A]!==C[0])throw new Error(\"When decoding with predictor, all samples must have the same size.\")}const e=C[0]/8,t=2===i?1:C.length;for(let i=0;i<B&&!(i*t*g*e>=A.byteLength);++i){let B;if(2===I){switch(C[0]){case 8:B=new Uint8Array(A,i*t*g*e,t*g*e);break;case 16:B=new Uint16Array(A,i*t*g*e,t*g*e/2);break;case 32:B=new Uint32Array(A,i*t*g*e,t*g*e/4);break;default:throw new Error(`Predictor 2 not allowed with ${C[0]} bits per sample.`)}Q(B,t)}else 3===I&&(B=new Uint8Array(A,i*t*g*e,t*g*e),E(B,t,e))}return A}(I,C,g,B,Array.isArray(i)||ArrayBuffer.isView(i)?Array.from(i):[i],e)}return I}}var e=Object.freeze({__proto__:null,default:class extends i{decodeBlock(A){return A}}});function t(A,I){for(let g=I.length-1;g>=0;g--)A.push(I[g]);return A}function o(A){const I=new Uint16Array(4093),g=new Uint8Array(4093);for(let A=0;A<=257;A++)I[A]=4096,g[A]=A;let B=258,C=9,Q=0;function E(){B=258,C=9}function i(A){const I=function(A,I,g){const B=I%8,C=Math.floor(I/8),Q=8-B,E=I+g-8*(C+1);let i=8*(C+2)-(I+g);const e=8*(C+2)-I;if(i=Math.max(0,i),C>=A.length)return console.warn(\"ran off the end of the buffer before finding EOI_CODE (end on input code)\"),257;let t=A[C]&2**(8-B)-1;t<<=g-Q;let o=t;if(C+1<A.length){let I=A[C+1]>>>i;I<<=Math.max(0,g-e),o+=I}if(E>8&&C+2<A.length){const B=8*(C+3)-(I+g);o+=A[C+2]>>>B}return o}(A,Q,C);return Q+=C,I}function e(A,C){return g[B]=C,I[B]=A,B++,B-1}function o(A){const B=[];for(let C=A;4096!==C;C=I[C])B.push(g[C]);return B}const a=[];E();const s=new Uint8Array(A);let r,D=i(s);for(;257!==D;){if(256===D){for(E(),D=i(s);256===D;)D=i(s);if(257===D)break;if(D>256)throw new Error(`corrupted code at scanline ${D}`);t(a,o(D)),r=D}else if(D<B){const A=o(D);t(a,A),void 0!==r&&e(r,A[A.length-1]),r=D}else{if(void 0===r)throw new Error(`Invalid LZW code: ${D} with no previous code`);const A=o(r);if(!A)throw new Error(`Bogus entry. Not in dictionary, ${r} / ${B}, position: ${Q}`);t(a,A),a.push(A[A.length-1]),e(r,A[A.length-1]),r=D}B+1>=2**C&&(12===C?r=void 0:C++),D=i(s)}return new Uint8Array(a)}var a=Object.freeze({__proto__:null,default:class extends i{decodeBlock(A){return o(A).buffer}}});const s=new Int32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]);function r(A,I){let g=0;const B=[];let C=16;for(;C>0&&!A[C-1];)--C;B.push({children:[],index:0});let Q,E=B[0];for(let i=0;i<C;i++){for(let C=0;C<A[i];C++){if(E=B.pop(),!E)throw new Error(\"buildHuffmanTable: codeLength mismatch\");for(E.children[E.index]=I[g];E.index>0;)if(E=B.pop(),!E)throw new Error(\"buildHuffmanTable: codeLength mismatch\");for(E.index++,B.push(E);B.length<=i;)B.push(Q={children:[],index:0}),E.children[E.index]=Q.children,E=Q;g++}i+1<C&&(B.push(Q={children:[],index:0}),E.children[E.index]=Q.children,E=Q)}return B[0].children}function D(A,I,g,B,C,Q,E,i,e){const{mcusPerLine:t,progressive:o}=g;if(B.length>1&&(void 0===t||void 0===g.mcusPerColumn))throw new Error(\"Missing MCU dimensions\");if(1===B.length&&(void 0===B[0].blocksPerLine||void 0===B[0].blocksPerColumn))throw new Error(\"Missing block dimensions\");const a=I;let r=I,D=0,n=0;function h(){if(n>0)return n--,D>>n&1;if(D=A[r++],255===D){const I=A[r++];if(I)throw new Error(`unexpected marker: ${(D<<8|I).toString(16)}`)}return n=7,D>>>7}function w(A){if(!A)throw new Error(\"Huffman table not found\");let I,g=A;for(;null!==(I=h());){const A=g[I];if(\"number\"==typeof A)return A;if(\"object\"!=typeof A)throw new Error(\"invalid huffman sequence\");g=A}return null}function y(A){let I=A,g=0;for(;I>0;){const A=h();if(null===A)return;g=g<<1|A,--I}return g}function G(A){const I=y(A);if(void 0!==I)return I>=1<<A-1?I:I+(-1<<A)+1}let S=0;let c,N=0;function d(A,I,g,B,C){const Q=g%t,E=(g/t|0)*A.v+B,i=Q*A.h+C;if(!A.blocks)throw new Error(\"Missing blocks\");I(A,A.blocks[E][i])}function l(A,I,g){const B=g/A.blocksPerLine|0,C=g%A.blocksPerLine;if(!A.blocks)throw new Error(\"Missing blocks\");I(A,A.blocks[B][C])}const k=B.length;let F,R,L,U,f,Y;Y=o?0===Q?0===i?function(A,I){const g=w(A.huffmanTableDC);if(null===g)throw new Error(\"Huffman error\");const B=G(g);if(void 0===B)throw new Error(\"Unexpected end of data in DC coefficient decoding\");const C=0===g?0:B<<e;void 0===A.pred&&(A.pred=0),A.pred+=C,I[0]=A.pred}:function(A,I){const g=h();if(null===g)throw new Error(\"Unexpected end of data in DC coefficient decoding\");I[0]|=g<<e}:0===i?function(A,I){if(S>0)return void S--;let g=Q;const B=E;for(;g<=B;){const B=w(A.huffmanTableAC);if(null===B)throw new Error(\"Unexpected end of data in AC coefficient decoding\");const C=15&B,Q=B>>4;if(0===C){if(Q<15){const A=y(Q);if(void 0===A)throw new Error(\"Unexpected end of data in AC coefficient decoding\");S=A+(1<<Q)-1;break}g+=16}else{g+=Q;const A=s[g],B=G(C);if(void 0===B)throw new Error(\"Unexpected end of data in AC coefficient decoding\");I[A]=B*(1<<e),g++}}}:function(A,I){let g=Q;const B=E;let C=0;for(;g<=B;){const B=s[g],Q=I[B]<0?-1:1;switch(N){case 0:{const I=w(A.huffmanTableAC);if(null===I)throw new Error(\"Unexpected end of data in AC coefficient decoding\");const g=15&I;if(C=I>>4,0===g)if(C<15){const A=y(C);if(void 0===A)throw new Error(\"Unexpected end of data in AC coefficient decoding\");S=A+(1<<C),N=4}else C=16,N=1;else{if(1!==g)throw new Error(\"invalid ACn encoding\");const A=G(g);if(void 0===A)throw new Error(\"Unexpected end of data in AC coefficient decoding\");c=A,N=C?2:3}continue}case 1:case 2:if(I[B]){const A=h();if(null===A)throw new Error(\"Unexpected end of data in AC coefficient decoding\");I[B]+=(A<<e)*Q}else C--,0===C&&(N=2===N?3:0);break;case 3:if(I[B]){const A=h();if(null===A)throw new Error(\"Unexpected end of data in AC coefficient decoding\");I[B]+=(A<<e)*Q}else I[B]=c<<e,N=0;break;case 4:if(I[B]){const A=h();if(null===A)throw new Error(\"Unexpected end of data in AC coefficient decoding\");I[B]+=(A<<e)*Q}}g++}4===N&&(S--,0===S&&(N=0))}:function(A,I){const g=w(A.huffmanTableDC);if(null===g)throw new Error(\"Huffman error\");const B=0===g?0:G(g);if(void 0===B)throw new Error(\"Unexpected end of stream\");void 0===A.pred&&(A.pred=0),A.pred+=B,I[0]=A.pred;let C=1;for(;C<64;){const g=w(A.huffmanTableAC);if(null===g)throw new Error(\"Unexpected end of data in AC coefficient decoding\");const B=15&g,Q=g>>4;if(0===B){if(Q<15)break;C+=16}else{C+=Q;const A=s[C],g=G(B);if(void 0===g)throw new Error(\"Unexpected end of stream\");I[A]=g,C++}}};let K,u,M=0;u=1===k?B[0].blocksPerLine*B[0].blocksPerColumn:t*g.mcusPerColumn;const J=C||u;for(;M<u;){for(R=0;R<k;R++)B[R].pred=0;if(S=0,1===k)for(F=B[0],f=0;f<J;f++)l(F,Y,M),M++;else for(f=0;f<J;f++){for(R=0;R<k;R++){F=B[R];const{h:A,v:I}=F;for(L=0;L<I;L++)for(U=0;U<A;U++)d(F,Y,M,L,U)}if(M++,M===u)break}if(n=0,K=A[r]<<8|A[r+1],K<65280)throw new Error(\"marker was not found\");if(!(K>=65488&&K<=65495))break;r+=2}return r-a}function n(A){const I=[],{blocksPerLine:g,blocksPerColumn:B}=A;if(!g||!B||!A.blocks)throw new Error(\"Missing component data\");const C=g<<3,Q=new Int32Array(64),E=new Uint8Array(64);function i(I,g,B){const C=A.quantizationTable;if(!C)throw new Error(\"No quantization table found\");let Q,E,i,e,t,o,a,s,r;const D=B;let n;for(n=0;n<64;n++)D[n]=I[n]*C[n];for(n=0;n<8;++n){const A=8*n;0!==D[1+A]||0!==D[2+A]||0!==D[3+A]||0!==D[4+A]||0!==D[5+A]||0!==D[6+A]||0!==D[7+A]?(Q=5793*D[0+A]+128>>8,E=5793*D[4+A]+128>>8,i=D[2+A],e=D[6+A],t=2896*(D[1+A]-D[7+A])+128>>8,s=2896*(D[1+A]+D[7+A])+128>>8,o=D[3+A]<<4,a=D[5+A]<<4,r=Q-E+1>>1,Q=Q+E+1>>1,E=r,r=3784*i+1567*e+128>>8,i=1567*i-3784*e+128>>8,e=r,r=t-a+1>>1,t=t+a+1>>1,a=r,r=s+o+1>>1,o=s-o+1>>1,s=r,r=Q-e+1>>1,Q=Q+e+1>>1,e=r,r=E-i+1>>1,E=E+i+1>>1,i=r,r=2276*t+3406*s+2048>>12,t=3406*t-2276*s+2048>>12,s=r,r=799*o+4017*a+2048>>12,o=4017*o-799*a+2048>>12,a=r,D[0+A]=Q+s,D[7+A]=Q-s,D[1+A]=E+a,D[6+A]=E-a,D[2+A]=i+o,D[5+A]=i-o,D[3+A]=e+t,D[4+A]=e-t):(r=5793*D[0+A]+512>>10,D[0+A]=r,D[1+A]=r,D[2+A]=r,D[3+A]=r,D[4+A]=r,D[5+A]=r,D[6+A]=r,D[7+A]=r)}for(n=0;n<8;++n){const A=n;0!==D[8+A]||0!==D[16+A]||0!==D[24+A]||0!==D[32+A]||0!==D[40+A]||0!==D[48+A]||0!==D[56+A]?(Q=5793*D[0+A]+2048>>12,E=5793*D[32+A]+2048>>12,i=D[16+A],e=D[48+A],t=2896*(D[8+A]-D[56+A])+2048>>12,s=2896*(D[8+A]+D[56+A])+2048>>12,o=D[24+A],a=D[40+A],r=Q-E+1>>1,Q=Q+E+1>>1,E=r,r=3784*i+1567*e+2048>>12,i=1567*i-3784*e+2048>>12,e=r,r=t-a+1>>1,t=t+a+1>>1,a=r,r=s+o+1>>1,o=s-o+1>>1,s=r,r=Q-e+1>>1,Q=Q+e+1>>1,e=r,r=E-i+1>>1,E=E+i+1>>1,i=r,r=2276*t+3406*s+2048>>12,t=3406*t-2276*s+2048>>12,s=r,r=799*o+4017*a+2048>>12,o=4017*o-799*a+2048>>12,a=r,D[0+A]=Q+s,D[56+A]=Q-s,D[8+A]=E+a,D[48+A]=E-a,D[16+A]=i+o,D[40+A]=i-o,D[24+A]=e+t,D[32+A]=e-t):(r=5793*B[n+0]+8192>>14,D[0+A]=r,D[8+A]=r,D[16+A]=r,D[24+A]=r,D[32+A]=r,D[40+A]=r,D[48+A]=r,D[56+A]=r)}for(n=0;n<64;++n){const A=128+(D[n]+8>>4);g[n]=A<0?0:A>255?255:A}}for(let e=0;e<B;e++){const B=e<<3;for(let A=0;A<8;A++)I.push(new Uint8Array(C));for(let C=0;C<g;C++){i(A.blocks[e][C],E,Q);let g=0;const t=C<<3;for(let A=0;A<8;A++){const C=I[B+A];for(let A=0;A<8;A++)C[t+A]=E[g++]}}}return I}class h{constructor(){this.jfif=null,this.adobe=null,this.resetInterval=0,this.quantizationTables=[],this.huffmanTablesAC=[],this.huffmanTablesDC=[],this.frames=[]}resetFrames(){this.frames=[]}parse(A){let I=0;function g(){const g=A[I]<<8|A[I+1];return I+=2,g}function B(){const B=g(),C=A.subarray(I,I+B-2);return I+=C.length,C}function C(A){let I,g,B=0,C=0;for(g in A.components)A.components.hasOwnProperty(g)&&(I=A.components[g],B<I.h&&(B=I.h),C<I.v&&(C=I.v));const Q=Math.ceil(A.samplesPerLine/8/B),E=Math.ceil(A.scanLines/8/C);for(g in A.components)if(A.components.hasOwnProperty(g)){I=A.components[g];const i=Math.ceil(Math.ceil(A.samplesPerLine/8)*I.h/B),e=Math.ceil(Math.ceil(A.scanLines/8)*I.v/C),t=Q*I.h,o=E*I.v,a=[];for(let A=0;A<o;A++){const A=[];for(let I=0;I<t;I++)A.push(new Int32Array(64));a.push(A)}I.blocksPerLine=i,I.blocksPerColumn=e,I.blocks=a}A.maxH=B,A.maxV=C,A.mcusPerLine=Q,A.mcusPerColumn=E}let Q=g();if(65496!==Q)throw new Error(\"SOI not found\");for(Q=g();65497!==Q;){switch(Q){case 65280:break;case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:{const A=B();65504===Q&&74===A[0]&&70===A[1]&&73===A[2]&&70===A[3]&&0===A[4]&&(this.jfif={version:{major:A[5],minor:A[6]},densityUnits:A[7],xDensity:A[8]<<8|A[9],yDensity:A[10]<<8|A[11],thumbWidth:A[12],thumbHeight:A[13],thumbData:A.subarray(14,14+3*A[12]*A[13])}),65518===Q&&65===A[0]&&100===A[1]&&111===A[2]&&98===A[3]&&101===A[4]&&0===A[5]&&(this.adobe={version:A[6],flags0:A[7]<<8|A[8],flags1:A[9]<<8|A[10],transformCode:A[11]});break}case 65499:{const B=g()+I-2;for(;I<B;){const B=A[I++],C=new Int32Array(64);if(B>>4==0)for(let g=0;g<64;g++){C[s[g]]=A[I++]}else{if(B>>4!=1)throw new Error(\"DQT: invalid table spec\");for(let A=0;A<64;A++){C[s[A]]=g()}}this.quantizationTables[15&B]=C}break}case 65472:case 65473:case 65474:{g();const B={extended:65473===Q,progressive:65474===Q,precision:A[I++],scanLines:g(),samplesPerLine:g(),components:{},componentsOrder:[],maxH:0,maxV:0,mcusPerLine:0,mcusPerColumn:0},E=A[I++];let i;for(let g=0;g<E;g++){i=A[I];const g=A[I+1]>>4,C=15&A[I+1],Q=A[I+2];B.componentsOrder.push(i),B.components[i]={h:g,v:C,quantizationIdx:Q,blocksPerLine:0,blocksPerColumn:0,blocks:[]},I+=3}C(B),this.frames.push(B);break}case 65476:{const B=g();for(let g=2;g<B;){const B=A[I++],C=new Uint8Array(16);let Q=0;for(let g=0;g<16;g++,I++)C[g]=A[I],Q+=C[g];const E=new Uint8Array(Q);for(let g=0;g<Q;g++,I++)E[g]=A[I];g+=17+Q,B>>4==0?this.huffmanTablesDC[15&B]=r(C,E):this.huffmanTablesAC[15&B]=r(C,E)}break}case 65501:g(),this.resetInterval=g();break;case 65498:{g();const B=A[I++],C=[],Q=this.frames[0];for(let g=0;g<B;g++){const g=Q.components[A[I++]],B=A[I++];g.huffmanTableDC=this.huffmanTablesDC[B>>4],g.huffmanTableAC=this.huffmanTablesAC[15&B],C.push(g)}const E=A[I++],i=A[I++],e=A[I++],t=D(A,I,Q,C,this.resetInterval,E,i,e>>4,15&e);I+=t;break}case 65535:255!==A[I]&&I--;break;default:if(255===A[I-3]&&A[I-2]>=192&&A[I-2]<=254){I-=3;break}throw new Error(`unknown JPEG marker ${Q.toString(16)}`)}Q=g()}}getResult(){const{frames:A}=this;if(0===this.frames.length)throw new Error(\"no frames were decoded\");this.frames.length>1&&console.warn(\"more than one frame is not supported\");for(let A=0;A<this.frames.length;A++){const I=this.frames[A].components;for(const A of Object.keys(I)){const g=I[A].quantizationIdx;\"number\"==typeof g&&(I[A].quantizationTable=this.quantizationTables[g],delete I[A].quantizationIdx)}}const I=A[0];if(!I.maxH||!I.maxV)throw new Error(\"Invalid frame dimensions\");const{components:g,componentsOrder:B}=I,C=[],Q=I.samplesPerLine,E=I.scanLines;for(let A=0;A<B.length;A++){const Q=g[B[A]];C.push({lines:n(Q),scaleX:Q.h/I.maxH,scaleY:Q.v/I.maxV})}const i=new Uint8Array(Q*E*C.length);let e=0;for(let A=0;A<E;++A)for(let I=0;I<Q;++I)for(let g=0;g<C.length;++g){const B=C[g];i[e]=B.lines[0|A*B.scaleY][0|I*B.scaleX],++e}return i}}var w=Object.freeze({__proto__:null,default:class extends i{constructor(A){super(A),this.reader=new h,A.JPEGTables&&this.reader.parse(A.JPEGTables)}decodeBlock(A){return this.reader.resetFrames(),this.reader.parse(new Uint8Array(A)),this.reader.getResult().buffer}}});\n/*! pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */function y(A){let I=A.length;for(;--I>=0;)A[I]=0}const G=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),S=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),c=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),N=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=new Array(576);y(d);const l=new Array(60);y(l);const k=new Array(512);y(k);const F=new Array(256);y(F);const R=new Array(29);y(R);const L=new Array(30);function U(A,I,g,B,C){this.static_tree=A,this.extra_bits=I,this.extra_base=g,this.elems=B,this.max_length=C,this.has_stree=A&&A.length}let f,Y,K;function u(A,I){this.dyn_tree=A,this.max_code=0,this.stat_desc=I}y(L);const M=A=>A<256?k[A]:k[256+(A>>>7)],J=(A,I)=>{A.pending_buf[A.pending++]=255&I,A.pending_buf[A.pending++]=I>>>8&255},H=(A,I,g)=>{A.bi_valid>16-g?(A.bi_buf|=I<<A.bi_valid&65535,J(A,A.bi_buf),A.bi_buf=I>>16-A.bi_valid,A.bi_valid+=g-16):(A.bi_buf|=I<<A.bi_valid&65535,A.bi_valid+=g)},p=(A,I,g)=>{H(A,g[2*I],g[2*I+1])},m=(A,I)=>{let g=0;do{g|=1&A,A>>>=1,g<<=1}while(--I>0);return g>>>1},q=(A,I,g)=>{const B=new Array(16);let C,Q,E=0;for(C=1;C<=15;C++)B[C]=E=E+g[C-1]<<1;for(Q=0;Q<=I;Q++){let I=A[2*Q+1];0!==I&&(A[2*Q]=m(B[I]++,I))}},b=A=>{let I;for(I=0;I<286;I++)A.dyn_ltree[2*I]=0;for(I=0;I<30;I++)A.dyn_dtree[2*I]=0;for(I=0;I<19;I++)A.bl_tree[2*I]=0;A.dyn_ltree[512]=1,A.opt_len=A.static_len=0,A.last_lit=A.matches=0},x=A=>{A.bi_valid>8?J(A,A.bi_buf):A.bi_valid>0&&(A.pending_buf[A.pending++]=A.bi_buf),A.bi_buf=0,A.bi_valid=0},O=(A,I,g,B)=>{const C=2*I,Q=2*g;return A[C]<A[Q]||A[C]===A[Q]&&B[I]<=B[g]},T=(A,I,g)=>{const B=A.heap[g];let C=g<<1;for(;C<=A.heap_len&&(C<A.heap_len&&O(I,A.heap[C+1],A.heap[C],A.depth)&&C++,!O(I,B,A.heap[C],A.depth));)A.heap[g]=A.heap[C],g=C,C<<=1;A.heap[g]=B},_=(A,I,g)=>{let B,C,Q,E,i=0;if(0!==A.last_lit)do{B=A.pending_buf[A.d_buf+2*i]<<8|A.pending_buf[A.d_buf+2*i+1],C=A.pending_buf[A.l_buf+i],i++,0===B?p(A,C,I):(Q=F[C],p(A,Q+256+1,I),E=G[Q],0!==E&&(C-=R[Q],H(A,C,E)),B--,Q=M(B),p(A,Q,g),E=S[Q],0!==E&&(B-=L[Q],H(A,B,E)))}while(i<A.last_lit);p(A,256,I)},Z=(A,I)=>{const g=I.dyn_tree,B=I.stat_desc.static_tree,C=I.stat_desc.has_stree,Q=I.stat_desc.elems;let E,i,e,t=-1;for(A.heap_len=0,A.heap_max=573,E=0;E<Q;E++)0!==g[2*E]?(A.heap[++A.heap_len]=t=E,A.depth[E]=0):g[2*E+1]=0;for(;A.heap_len<2;)e=A.heap[++A.heap_len]=t<2?++t:0,g[2*e]=1,A.depth[e]=0,A.opt_len--,C&&(A.static_len-=B[2*e+1]);for(I.max_code=t,E=A.heap_len>>1;E>=1;E--)T(A,g,E);e=Q;do{E=A.heap[1],A.heap[1]=A.heap[A.heap_len--],T(A,g,1),i=A.heap[1],A.heap[--A.heap_max]=E,A.heap[--A.heap_max]=i,g[2*e]=g[2*E]+g[2*i],A.depth[e]=(A.depth[E]>=A.depth[i]?A.depth[E]:A.depth[i])+1,g[2*E+1]=g[2*i+1]=e,A.heap[1]=e++,T(A,g,1)}while(A.heap_len>=2);A.heap[--A.heap_max]=A.heap[1],((A,I)=>{const g=I.dyn_tree,B=I.max_code,C=I.stat_desc.static_tree,Q=I.stat_desc.has_stree,E=I.stat_desc.extra_bits,i=I.stat_desc.extra_base,e=I.stat_desc.max_length;let t,o,a,s,r,D,n=0;for(s=0;s<=15;s++)A.bl_count[s]=0;for(g[2*A.heap[A.heap_max]+1]=0,t=A.heap_max+1;t<573;t++)o=A.heap[t],s=g[2*g[2*o+1]+1]+1,s>e&&(s=e,n++),g[2*o+1]=s,o>B||(A.bl_count[s]++,r=0,o>=i&&(r=E[o-i]),D=g[2*o],A.opt_len+=D*(s+r),Q&&(A.static_len+=D*(C[2*o+1]+r)));if(0!==n){do{for(s=e-1;0===A.bl_count[s];)s--;A.bl_count[s]--,A.bl_count[s+1]+=2,A.bl_count[e]--,n-=2}while(n>0);for(s=e;0!==s;s--)for(o=A.bl_count[s];0!==o;)a=A.heap[--t],a>B||(g[2*a+1]!==s&&(A.opt_len+=(s-g[2*a+1])*g[2*a],g[2*a+1]=s),o--)}})(A,I),q(g,t,A.bl_count)},P=(A,I,g)=>{let B,C,Q=-1,E=I[1],i=0,e=7,t=4;for(0===E&&(e=138,t=3),I[2*(g+1)+1]=65535,B=0;B<=g;B++)C=E,E=I[2*(B+1)+1],++i<e&&C===E||(i<t?A.bl_tree[2*C]+=i:0!==C?(C!==Q&&A.bl_tree[2*C]++,A.bl_tree[32]++):i<=10?A.bl_tree[34]++:A.bl_tree[36]++,i=0,Q=C,0===E?(e=138,t=3):C===E?(e=6,t=3):(e=7,t=4))},v=(A,I,g)=>{let B,C,Q=-1,E=I[1],i=0,e=7,t=4;for(0===E&&(e=138,t=3),B=0;B<=g;B++)if(C=E,E=I[2*(B+1)+1],!(++i<e&&C===E)){if(i<t)do{p(A,C,A.bl_tree)}while(0!=--i);else 0!==C?(C!==Q&&(p(A,C,A.bl_tree),i--),p(A,16,A.bl_tree),H(A,i-3,2)):i<=10?(p(A,17,A.bl_tree),H(A,i-3,3)):(p(A,18,A.bl_tree),H(A,i-11,7));i=0,Q=C,0===E?(e=138,t=3):C===E?(e=6,t=3):(e=7,t=4)}};let j=!1;const W=(A,I,g,B)=>{H(A,0+(B?1:0),3),((A,I,g,B)=>{x(A),B&&(J(A,g),J(A,~g)),A.pending_buf.set(A.window.subarray(I,I+g),A.pending),A.pending+=g})(A,I,g,!0)};var V=(A,I,g,B)=>{let C,Q,E=0;A.level>0?(2===A.strm.data_type&&(A.strm.data_type=(A=>{let I,g=4093624447;for(I=0;I<=31;I++,g>>>=1)if(1&g&&0!==A.dyn_ltree[2*I])return 0;if(0!==A.dyn_ltree[18]||0!==A.dyn_ltree[20]||0!==A.dyn_ltree[26])return 1;for(I=32;I<256;I++)if(0!==A.dyn_ltree[2*I])return 1;return 0})(A)),Z(A,A.l_desc),Z(A,A.d_desc),E=(A=>{let I;for(P(A,A.dyn_ltree,A.l_desc.max_code),P(A,A.dyn_dtree,A.d_desc.max_code),Z(A,A.bl_desc),I=18;I>=3&&0===A.bl_tree[2*N[I]+1];I--);return A.opt_len+=3*(I+1)+5+5+4,I})(A),C=A.opt_len+3+7>>>3,Q=A.static_len+3+7>>>3,Q<=C&&(C=Q)):C=Q=g+5,g+4<=C&&-1!==I?W(A,I,g,B):4===A.strategy||Q===C?(H(A,2+(B?1:0),3),_(A,d,l)):(H(A,4+(B?1:0),3),((A,I,g,B)=>{let C;for(H(A,I-257,5),H(A,g-1,5),H(A,B-4,4),C=0;C<B;C++)H(A,A.bl_tree[2*N[C]+1],3);v(A,A.dyn_ltree,I-1),v(A,A.dyn_dtree,g-1)})(A,A.l_desc.max_code+1,A.d_desc.max_code+1,E+1),_(A,A.dyn_ltree,A.dyn_dtree)),b(A),B&&x(A)},z={_tr_init:A=>{j||((()=>{let A,I,g,B,C;const Q=new Array(16);for(g=0,B=0;B<28;B++)for(R[B]=g,A=0;A<1<<G[B];A++)F[g++]=B;for(F[g-1]=B,C=0,B=0;B<16;B++)for(L[B]=C,A=0;A<1<<S[B];A++)k[C++]=B;for(C>>=7;B<30;B++)for(L[B]=C<<7,A=0;A<1<<S[B]-7;A++)k[256+C++]=B;for(I=0;I<=15;I++)Q[I]=0;for(A=0;A<=143;)d[2*A+1]=8,A++,Q[8]++;for(;A<=255;)d[2*A+1]=9,A++,Q[9]++;for(;A<=279;)d[2*A+1]=7,A++,Q[7]++;for(;A<=287;)d[2*A+1]=8,A++,Q[8]++;for(q(d,287,Q),A=0;A<30;A++)l[2*A+1]=5,l[2*A]=m(A,5);f=new U(d,G,257,286,15),Y=new U(l,S,0,30,15),K=new U(new Array(0),c,0,19,7)})(),j=!0),A.l_desc=new u(A.dyn_ltree,f),A.d_desc=new u(A.dyn_dtree,Y),A.bl_desc=new u(A.bl_tree,K),A.bi_buf=0,A.bi_valid=0,b(A)},_tr_stored_block:W,_tr_flush_block:V,_tr_tally:(A,I,g)=>(A.pending_buf[A.d_buf+2*A.last_lit]=I>>>8&255,A.pending_buf[A.d_buf+2*A.last_lit+1]=255&I,A.pending_buf[A.l_buf+A.last_lit]=255&g,A.last_lit++,0===I?A.dyn_ltree[2*g]++:(A.matches++,I--,A.dyn_ltree[2*(F[g]+256+1)]++,A.dyn_dtree[2*M(I)]++),A.last_lit===A.lit_bufsize-1),_tr_align:A=>{H(A,2,3),p(A,256,d),(A=>{16===A.bi_valid?(J(A,A.bi_buf),A.bi_buf=0,A.bi_valid=0):A.bi_valid>=8&&(A.pending_buf[A.pending++]=255&A.bi_buf,A.bi_buf>>=8,A.bi_valid-=8)})(A)}};var X=(A,I,g,B)=>{let C=65535&A|0,Q=A>>>16&65535|0,E=0;for(;0!==g;){E=g>2e3?2e3:g,g-=E;do{C=C+I[B++]|0,Q=Q+C|0}while(--E);C%=65521,Q%=65521}return C|Q<<16|0};const $=new Uint32Array((()=>{let A,I=[];for(var g=0;g<256;g++){A=g;for(var B=0;B<8;B++)A=1&A?3988292384^A>>>1:A>>>1;I[g]=A}return I})());var AA=(A,I,g,B)=>{const C=$,Q=B+g;A^=-1;for(let g=B;g<Q;g++)A=A>>>8^C[255&(A^I[g])];return-1^A},IA={2:\"need dictionary\",1:\"stream end\",0:\"\",\"-1\":\"file error\",\"-2\":\"stream error\",\"-3\":\"data error\",\"-4\":\"insufficient memory\",\"-5\":\"buffer error\",\"-6\":\"incompatible version\"},gA={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:BA,_tr_stored_block:CA,_tr_flush_block:QA,_tr_tally:EA,_tr_align:iA}=z,{Z_NO_FLUSH:eA,Z_PARTIAL_FLUSH:tA,Z_FULL_FLUSH:oA,Z_FINISH:aA,Z_BLOCK:sA,Z_OK:rA,Z_STREAM_END:DA,Z_STREAM_ERROR:nA,Z_DATA_ERROR:hA,Z_BUF_ERROR:wA,Z_DEFAULT_COMPRESSION:yA,Z_FILTERED:GA,Z_HUFFMAN_ONLY:SA,Z_RLE:cA,Z_FIXED:NA,Z_DEFAULT_STRATEGY:dA,Z_UNKNOWN:lA,Z_DEFLATED:kA}=gA,FA=(A,I)=>(A.msg=IA[I],I),RA=A=>(A<<1)-(A>4?9:0),LA=A=>{let I=A.length;for(;--I>=0;)A[I]=0};let UA=(A,I,g)=>(I<<A.hash_shift^g)&A.hash_mask;const fA=A=>{const I=A.state;let g=I.pending;g>A.avail_out&&(g=A.avail_out),0!==g&&(A.output.set(I.pending_buf.subarray(I.pending_out,I.pending_out+g),A.next_out),A.next_out+=g,I.pending_out+=g,A.total_out+=g,A.avail_out-=g,I.pending-=g,0===I.pending&&(I.pending_out=0))},YA=(A,I)=>{QA(A,A.block_start>=0?A.block_start:-1,A.strstart-A.block_start,I),A.block_start=A.strstart,fA(A.strm)},KA=(A,I)=>{A.pending_buf[A.pending++]=I},uA=(A,I)=>{A.pending_buf[A.pending++]=I>>>8&255,A.pending_buf[A.pending++]=255&I},MA=(A,I,g,B)=>{let C=A.avail_in;return C>B&&(C=B),0===C?0:(A.avail_in-=C,I.set(A.input.subarray(A.next_in,A.next_in+C),g),1===A.state.wrap?A.adler=X(A.adler,I,C,g):2===A.state.wrap&&(A.adler=AA(A.adler,I,C,g)),A.next_in+=C,A.total_in+=C,C)},JA=(A,I)=>{let g,B,C=A.max_chain_length,Q=A.strstart,E=A.prev_length,i=A.nice_match;const e=A.strstart>A.w_size-262?A.strstart-(A.w_size-262):0,t=A.window,o=A.w_mask,a=A.prev,s=A.strstart+258;let r=t[Q+E-1],D=t[Q+E];A.prev_length>=A.good_match&&(C>>=2),i>A.lookahead&&(i=A.lookahead);do{if(g=I,t[g+E]===D&&t[g+E-1]===r&&t[g]===t[Q]&&t[++g]===t[Q+1]){Q+=2,g++;do{}while(t[++Q]===t[++g]&&t[++Q]===t[++g]&&t[++Q]===t[++g]&&t[++Q]===t[++g]&&t[++Q]===t[++g]&&t[++Q]===t[++g]&&t[++Q]===t[++g]&&t[++Q]===t[++g]&&Q<s);if(B=258-(s-Q),Q=s-258,B>E){if(A.match_start=I,E=B,B>=i)break;r=t[Q+E-1],D=t[Q+E]}}}while((I=a[I&o])>e&&0!=--C);return E<=A.lookahead?E:A.lookahead},HA=A=>{const I=A.w_size;let g,B,C,Q,E;do{if(Q=A.window_size-A.lookahead-A.strstart,A.strstart>=I+(I-262)){A.window.set(A.window.subarray(I,I+I),0),A.match_start-=I,A.strstart-=I,A.block_start-=I,B=A.hash_size,g=B;do{C=A.head[--g],A.head[g]=C>=I?C-I:0}while(--B);B=I,g=B;do{C=A.prev[--g],A.prev[g]=C>=I?C-I:0}while(--B);Q+=I}if(0===A.strm.avail_in)break;if(B=MA(A.strm,A.window,A.strstart+A.lookahead,Q),A.lookahead+=B,A.lookahead+A.insert>=3)for(E=A.strstart-A.insert,A.ins_h=A.window[E],A.ins_h=UA(A,A.ins_h,A.window[E+1]);A.insert&&(A.ins_h=UA(A,A.ins_h,A.window[E+3-1]),A.prev[E&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=E,E++,A.insert--,!(A.lookahead+A.insert<3)););}while(A.lookahead<262&&0!==A.strm.avail_in)},pA=(A,I)=>{let g,B;for(;;){if(A.lookahead<262){if(HA(A),A.lookahead<262&&I===eA)return 1;if(0===A.lookahead)break}if(g=0,A.lookahead>=3&&(A.ins_h=UA(A,A.ins_h,A.window[A.strstart+3-1]),g=A.prev[A.strstart&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=A.strstart),0!==g&&A.strstart-g<=A.w_size-262&&(A.match_length=JA(A,g)),A.match_length>=3)if(B=EA(A,A.strstart-A.match_start,A.match_length-3),A.lookahead-=A.match_length,A.match_length<=A.max_lazy_match&&A.lookahead>=3){A.match_length--;do{A.strstart++,A.ins_h=UA(A,A.ins_h,A.window[A.strstart+3-1]),g=A.prev[A.strstart&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=A.strstart}while(0!=--A.match_length);A.strstart++}else A.strstart+=A.match_length,A.match_length=0,A.ins_h=A.window[A.strstart],A.ins_h=UA(A,A.ins_h,A.window[A.strstart+1]);else B=EA(A,0,A.window[A.strstart]),A.lookahead--,A.strstart++;if(B&&(YA(A,!1),0===A.strm.avail_out))return 1}return A.insert=A.strstart<2?A.strstart:2,I===aA?(YA(A,!0),0===A.strm.avail_out?3:4):A.last_lit&&(YA(A,!1),0===A.strm.avail_out)?1:2},mA=(A,I)=>{let g,B,C;for(;;){if(A.lookahead<262){if(HA(A),A.lookahead<262&&I===eA)return 1;if(0===A.lookahead)break}if(g=0,A.lookahead>=3&&(A.ins_h=UA(A,A.ins_h,A.window[A.strstart+3-1]),g=A.prev[A.strstart&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=A.strstart),A.prev_length=A.match_length,A.prev_match=A.match_start,A.match_length=2,0!==g&&A.prev_length<A.max_lazy_match&&A.strstart-g<=A.w_size-262&&(A.match_length=JA(A,g),A.match_length<=5&&(A.strategy===GA||3===A.match_length&&A.strstart-A.match_start>4096)&&(A.match_length=2)),A.prev_length>=3&&A.match_length<=A.prev_length){C=A.strstart+A.lookahead-3,B=EA(A,A.strstart-1-A.prev_match,A.prev_length-3),A.lookahead-=A.prev_length-1,A.prev_length-=2;do{++A.strstart<=C&&(A.ins_h=UA(A,A.ins_h,A.window[A.strstart+3-1]),g=A.prev[A.strstart&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=A.strstart)}while(0!=--A.prev_length);if(A.match_available=0,A.match_length=2,A.strstart++,B&&(YA(A,!1),0===A.strm.avail_out))return 1}else if(A.match_available){if(B=EA(A,0,A.window[A.strstart-1]),B&&YA(A,!1),A.strstart++,A.lookahead--,0===A.strm.avail_out)return 1}else A.match_available=1,A.strstart++,A.lookahead--}return A.match_available&&(B=EA(A,0,A.window[A.strstart-1]),A.match_available=0),A.insert=A.strstart<2?A.strstart:2,I===aA?(YA(A,!0),0===A.strm.avail_out?3:4):A.last_lit&&(YA(A,!1),0===A.strm.avail_out)?1:2};function qA(A,I,g,B,C){this.good_length=A,this.max_lazy=I,this.nice_length=g,this.max_chain=B,this.func=C}const bA=[new qA(0,0,0,0,((A,I)=>{let g=65535;for(g>A.pending_buf_size-5&&(g=A.pending_buf_size-5);;){if(A.lookahead<=1){if(HA(A),0===A.lookahead&&I===eA)return 1;if(0===A.lookahead)break}A.strstart+=A.lookahead,A.lookahead=0;const B=A.block_start+g;if((0===A.strstart||A.strstart>=B)&&(A.lookahead=A.strstart-B,A.strstart=B,YA(A,!1),0===A.strm.avail_out))return 1;if(A.strstart-A.block_start>=A.w_size-262&&(YA(A,!1),0===A.strm.avail_out))return 1}return A.insert=0,I===aA?(YA(A,!0),0===A.strm.avail_out?3:4):(A.strstart>A.block_start&&(YA(A,!1),A.strm.avail_out),1)})),new qA(4,4,8,4,pA),new qA(4,5,16,8,pA),new qA(4,6,32,32,pA),new qA(4,4,16,16,mA),new qA(8,16,32,32,mA),new qA(8,16,128,128,mA),new qA(8,32,128,256,mA),new qA(32,128,258,1024,mA),new qA(32,258,258,4096,mA)];function xA(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=kA,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),LA(this.dyn_ltree),LA(this.dyn_dtree),LA(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),LA(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),LA(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const OA=A=>{if(!A||!A.state)return FA(A,nA);A.total_in=A.total_out=0,A.data_type=lA;const I=A.state;return I.pending=0,I.pending_out=0,I.wrap<0&&(I.wrap=-I.wrap),I.status=I.wrap?42:113,A.adler=2===I.wrap?0:1,I.last_flush=eA,BA(I),rA},TA=A=>{const I=OA(A);var g;return I===rA&&((g=A.state).window_size=2*g.w_size,LA(g.head),g.max_lazy_match=bA[g.level].max_lazy,g.good_match=bA[g.level].good_length,g.nice_match=bA[g.level].nice_length,g.max_chain_length=bA[g.level].max_chain,g.strstart=0,g.block_start=0,g.lookahead=0,g.insert=0,g.match_length=g.prev_length=2,g.match_available=0,g.ins_h=0),I},_A=(A,I,g,B,C,Q)=>{if(!A)return nA;let E=1;if(I===yA&&(I=6),B<0?(E=0,B=-B):B>15&&(E=2,B-=16),C<1||C>9||g!==kA||B<8||B>15||I<0||I>9||Q<0||Q>NA)return FA(A,nA);8===B&&(B=9);const i=new xA;return A.state=i,i.strm=A,i.wrap=E,i.gzhead=null,i.w_bits=B,i.w_size=1<<i.w_bits,i.w_mask=i.w_size-1,i.hash_bits=C+7,i.hash_size=1<<i.hash_bits,i.hash_mask=i.hash_size-1,i.hash_shift=~~((i.hash_bits+3-1)/3),i.window=new Uint8Array(2*i.w_size),i.head=new Uint16Array(i.hash_size),i.prev=new Uint16Array(i.w_size),i.lit_bufsize=1<<C+6,i.pending_buf_size=4*i.lit_bufsize,i.pending_buf=new Uint8Array(i.pending_buf_size),i.d_buf=1*i.lit_bufsize,i.l_buf=3*i.lit_bufsize,i.level=I,i.strategy=Q,i.method=g,TA(A)};var ZA={deflateInit:(A,I)=>_A(A,I,kA,15,8,dA),deflateInit2:_A,deflateReset:TA,deflateResetKeep:OA,deflateSetHeader:(A,I)=>A&&A.state?2!==A.state.wrap?nA:(A.state.gzhead=I,rA):nA,deflate:(A,I)=>{let g,B;if(!A||!A.state||I>sA||I<0)return A?FA(A,nA):nA;const C=A.state;if(!A.output||!A.input&&0!==A.avail_in||666===C.status&&I!==aA)return FA(A,0===A.avail_out?wA:nA);C.strm=A;const Q=C.last_flush;if(C.last_flush=I,42===C.status)if(2===C.wrap)A.adler=0,KA(C,31),KA(C,139),KA(C,8),C.gzhead?(KA(C,(C.gzhead.text?1:0)+(C.gzhead.hcrc?2:0)+(C.gzhead.extra?4:0)+(C.gzhead.name?8:0)+(C.gzhead.comment?16:0)),KA(C,255&C.gzhead.time),KA(C,C.gzhead.time>>8&255),KA(C,C.gzhead.time>>16&255),KA(C,C.gzhead.time>>24&255),KA(C,9===C.level?2:C.strategy>=SA||C.level<2?4:0),KA(C,255&C.gzhead.os),C.gzhead.extra&&C.gzhead.extra.length&&(KA(C,255&C.gzhead.extra.length),KA(C,C.gzhead.extra.length>>8&255)),C.gzhead.hcrc&&(A.adler=AA(A.adler,C.pending_buf,C.pending,0)),C.gzindex=0,C.status=69):(KA(C,0),KA(C,0),KA(C,0),KA(C,0),KA(C,0),KA(C,9===C.level?2:C.strategy>=SA||C.level<2?4:0),KA(C,3),C.status=113);else{let I=kA+(C.w_bits-8<<4)<<8,g=-1;g=C.strategy>=SA||C.level<2?0:C.level<6?1:6===C.level?2:3,I|=g<<6,0!==C.strstart&&(I|=32),I+=31-I%31,C.status=113,uA(C,I),0!==C.strstart&&(uA(C,A.adler>>>16),uA(C,65535&A.adler)),A.adler=1}if(69===C.status)if(C.gzhead.extra){for(g=C.pending;C.gzindex<(65535&C.gzhead.extra.length)&&(C.pending!==C.pending_buf_size||(C.gzhead.hcrc&&C.pending>g&&(A.adler=AA(A.adler,C.pending_buf,C.pending-g,g)),fA(A),g=C.pending,C.pending!==C.pending_buf_size));)KA(C,255&C.gzhead.extra[C.gzindex]),C.gzindex++;C.gzhead.hcrc&&C.pending>g&&(A.adler=AA(A.adler,C.pending_buf,C.pending-g,g)),C.gzindex===C.gzhead.extra.length&&(C.gzindex=0,C.status=73)}else C.status=73;if(73===C.status)if(C.gzhead.name){g=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>g&&(A.adler=AA(A.adler,C.pending_buf,C.pending-g,g)),fA(A),g=C.pending,C.pending===C.pending_buf_size)){B=1;break}B=C.gzindex<C.gzhead.name.length?255&C.gzhead.name.charCodeAt(C.gzindex++):0,KA(C,B)}while(0!==B);C.gzhead.hcrc&&C.pending>g&&(A.adler=AA(A.adler,C.pending_buf,C.pending-g,g)),0===B&&(C.gzindex=0,C.status=91)}else C.status=91;if(91===C.status)if(C.gzhead.comment){g=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>g&&(A.adler=AA(A.adler,C.pending_buf,C.pending-g,g)),fA(A),g=C.pending,C.pending===C.pending_buf_size)){B=1;break}B=C.gzindex<C.gzhead.comment.length?255&C.gzhead.comment.charCodeAt(C.gzindex++):0,KA(C,B)}while(0!==B);C.gzhead.hcrc&&C.pending>g&&(A.adler=AA(A.adler,C.pending_buf,C.pending-g,g)),0===B&&(C.status=103)}else C.status=103;if(103===C.status&&(C.gzhead.hcrc?(C.pending+2>C.pending_buf_size&&fA(A),C.pending+2<=C.pending_buf_size&&(KA(C,255&A.adler),KA(C,A.adler>>8&255),A.adler=0,C.status=113)):C.status=113),0!==C.pending){if(fA(A),0===A.avail_out)return C.last_flush=-1,rA}else if(0===A.avail_in&&RA(I)<=RA(Q)&&I!==aA)return FA(A,wA);if(666===C.status&&0!==A.avail_in)return FA(A,wA);if(0!==A.avail_in||0!==C.lookahead||I!==eA&&666!==C.status){let g=C.strategy===SA?((A,I)=>{let g;for(;;){if(0===A.lookahead&&(HA(A),0===A.lookahead)){if(I===eA)return 1;break}if(A.match_length=0,g=EA(A,0,A.window[A.strstart]),A.lookahead--,A.strstart++,g&&(YA(A,!1),0===A.strm.avail_out))return 1}return A.insert=0,I===aA?(YA(A,!0),0===A.strm.avail_out?3:4):A.last_lit&&(YA(A,!1),0===A.strm.avail_out)?1:2})(C,I):C.strategy===cA?((A,I)=>{let g,B,C,Q;const E=A.window;for(;;){if(A.lookahead<=258){if(HA(A),A.lookahead<=258&&I===eA)return 1;if(0===A.lookahead)break}if(A.match_length=0,A.lookahead>=3&&A.strstart>0&&(C=A.strstart-1,B=E[C],B===E[++C]&&B===E[++C]&&B===E[++C])){Q=A.strstart+258;do{}while(B===E[++C]&&B===E[++C]&&B===E[++C]&&B===E[++C]&&B===E[++C]&&B===E[++C]&&B===E[++C]&&B===E[++C]&&C<Q);A.match_length=258-(Q-C),A.match_length>A.lookahead&&(A.match_length=A.lookahead)}if(A.match_length>=3?(g=EA(A,1,A.match_length-3),A.lookahead-=A.match_length,A.strstart+=A.match_length,A.match_length=0):(g=EA(A,0,A.window[A.strstart]),A.lookahead--,A.strstart++),g&&(YA(A,!1),0===A.strm.avail_out))return 1}return A.insert=0,I===aA?(YA(A,!0),0===A.strm.avail_out?3:4):A.last_lit&&(YA(A,!1),0===A.strm.avail_out)?1:2})(C,I):bA[C.level].func(C,I);if(3!==g&&4!==g||(C.status=666),1===g||3===g)return 0===A.avail_out&&(C.last_flush=-1),rA;if(2===g&&(I===tA?iA(C):I!==sA&&(CA(C,0,0,!1),I===oA&&(LA(C.head),0===C.lookahead&&(C.strstart=0,C.block_start=0,C.insert=0))),fA(A),0===A.avail_out))return C.last_flush=-1,rA}return I!==aA?rA:C.wrap<=0?DA:(2===C.wrap?(KA(C,255&A.adler),KA(C,A.adler>>8&255),KA(C,A.adler>>16&255),KA(C,A.adler>>24&255),KA(C,255&A.total_in),KA(C,A.total_in>>8&255),KA(C,A.total_in>>16&255),KA(C,A.total_in>>24&255)):(uA(C,A.adler>>>16),uA(C,65535&A.adler)),fA(A),C.wrap>0&&(C.wrap=-C.wrap),0!==C.pending?rA:DA)},deflateEnd:A=>{if(!A||!A.state)return nA;const I=A.state.status;return 42!==I&&69!==I&&73!==I&&91!==I&&103!==I&&113!==I&&666!==I?FA(A,nA):(A.state=null,113===I?FA(A,hA):rA)},deflateSetDictionary:(A,I)=>{let g=I.length;if(!A||!A.state)return nA;const B=A.state,C=B.wrap;if(2===C||1===C&&42!==B.status||B.lookahead)return nA;if(1===C&&(A.adler=X(A.adler,I,g,0)),B.wrap=0,g>=B.w_size){0===C&&(LA(B.head),B.strstart=0,B.block_start=0,B.insert=0);let A=new Uint8Array(B.w_size);A.set(I.subarray(g-B.w_size,g),0),I=A,g=B.w_size}const Q=A.avail_in,E=A.next_in,i=A.input;for(A.avail_in=g,A.next_in=0,A.input=I,HA(B);B.lookahead>=3;){let A=B.strstart,I=B.lookahead-2;do{B.ins_h=UA(B,B.ins_h,B.window[A+3-1]),B.prev[A&B.w_mask]=B.head[B.ins_h],B.head[B.ins_h]=A,A++}while(--I);B.strstart=A,B.lookahead=2,HA(B)}return B.strstart+=B.lookahead,B.block_start=B.strstart,B.insert=B.lookahead,B.lookahead=0,B.match_length=B.prev_length=2,B.match_available=0,A.next_in=E,A.input=i,A.avail_in=Q,B.wrap=C,rA},deflateInfo:\"pako deflate (from Nodeca project)\"};const PA=(A,I)=>Object.prototype.hasOwnProperty.call(A,I);var vA=function(A){const I=Array.prototype.slice.call(arguments,1);for(;I.length;){const g=I.shift();if(g){if(\"object\"!=typeof g)throw new TypeError(g+\"must be non-object\");for(const I in g)PA(g,I)&&(A[I]=g[I])}}return A},jA=A=>{let I=0;for(let g=0,B=A.length;g<B;g++)I+=A[g].length;const g=new Uint8Array(I);for(let I=0,B=0,C=A.length;I<C;I++){let C=A[I];g.set(C,B),B+=C.length}return g};let WA=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(A){WA=!1}const VA=new Uint8Array(256);for(let A=0;A<256;A++)VA[A]=A>=252?6:A>=248?5:A>=240?4:A>=224?3:A>=192?2:1;VA[254]=VA[254]=1;var zA=A=>{if(\"function\"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(A);let I,g,B,C,Q,E=A.length,i=0;for(C=0;C<E;C++)g=A.charCodeAt(C),55296==(64512&g)&&C+1<E&&(B=A.charCodeAt(C+1),56320==(64512&B)&&(g=65536+(g-55296<<10)+(B-56320),C++)),i+=g<128?1:g<2048?2:g<65536?3:4;for(I=new Uint8Array(i),Q=0,C=0;Q<i;C++)g=A.charCodeAt(C),55296==(64512&g)&&C+1<E&&(B=A.charCodeAt(C+1),56320==(64512&B)&&(g=65536+(g-55296<<10)+(B-56320),C++)),g<128?I[Q++]=g:g<2048?(I[Q++]=192|g>>>6,I[Q++]=128|63&g):g<65536?(I[Q++]=224|g>>>12,I[Q++]=128|g>>>6&63,I[Q++]=128|63&g):(I[Q++]=240|g>>>18,I[Q++]=128|g>>>12&63,I[Q++]=128|g>>>6&63,I[Q++]=128|63&g);return I},XA=(A,I)=>{const g=I||A.length;if(\"function\"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(A.subarray(0,I));let B,C;const Q=new Array(2*g);for(C=0,B=0;B<g;){let I=A[B++];if(I<128){Q[C++]=I;continue}let E=VA[I];if(E>4)Q[C++]=65533,B+=E-1;else{for(I&=2===E?31:3===E?15:7;E>1&&B<g;)I=I<<6|63&A[B++],E--;E>1?Q[C++]=65533:I<65536?Q[C++]=I:(I-=65536,Q[C++]=55296|I>>10&1023,Q[C++]=56320|1023&I)}}return((A,I)=>{if(I<65534&&A.subarray&&WA)return String.fromCharCode.apply(null,A.length===I?A:A.subarray(0,I));let g=\"\";for(let B=0;B<I;B++)g+=String.fromCharCode(A[B]);return g})(Q,C)},$A=(A,I)=>{(I=I||A.length)>A.length&&(I=A.length);let g=I-1;for(;g>=0&&128==(192&A[g]);)g--;return g<0||0===g?I:g+VA[A[g]]>I?g:I};var AI=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg=\"\",this.state=null,this.data_type=2,this.adler=0};const II=Object.prototype.toString,{Z_NO_FLUSH:gI,Z_SYNC_FLUSH:BI,Z_FULL_FLUSH:CI,Z_FINISH:QI,Z_OK:EI,Z_STREAM_END:iI,Z_DEFAULT_COMPRESSION:eI,Z_DEFAULT_STRATEGY:tI,Z_DEFLATED:oI}=gA;function aI(A){this.options=vA({level:eI,method:oI,chunkSize:16384,windowBits:15,memLevel:8,strategy:tI},A||{});let I=this.options;I.raw&&I.windowBits>0?I.windowBits=-I.windowBits:I.gzip&&I.windowBits>0&&I.windowBits<16&&(I.windowBits+=16),this.err=0,this.msg=\"\",this.ended=!1,this.chunks=[],this.strm=new AI,this.strm.avail_out=0;let g=ZA.deflateInit2(this.strm,I.level,I.method,I.windowBits,I.memLevel,I.strategy);if(g!==EI)throw new Error(IA[g]);if(I.header&&ZA.deflateSetHeader(this.strm,I.header),I.dictionary){let A;if(A=\"string\"==typeof I.dictionary?zA(I.dictionary):\"[object ArrayBuffer]\"===II.call(I.dictionary)?new Uint8Array(I.dictionary):I.dictionary,g=ZA.deflateSetDictionary(this.strm,A),g!==EI)throw new Error(IA[g]);this._dict_set=!0}}aI.prototype.push=function(A,I){const g=this.strm,B=this.options.chunkSize;let C,Q;if(this.ended)return!1;for(Q=I===~~I?I:!0===I?QI:gI,\"string\"==typeof A?g.input=zA(A):\"[object ArrayBuffer]\"===II.call(A)?g.input=new Uint8Array(A):g.input=A,g.next_in=0,g.avail_in=g.input.length;;)if(0===g.avail_out&&(g.output=new Uint8Array(B),g.next_out=0,g.avail_out=B),(Q===BI||Q===CI)&&g.avail_out<=6)this.onData(g.output.subarray(0,g.next_out)),g.avail_out=0;else{if(C=ZA.deflate(g,Q),C===iI)return g.next_out>0&&this.onData(g.output.subarray(0,g.next_out)),C=ZA.deflateEnd(this.strm),this.onEnd(C),this.ended=!0,C===EI;if(0!==g.avail_out){if(Q>0&&g.next_out>0)this.onData(g.output.subarray(0,g.next_out)),g.avail_out=0;else if(0===g.avail_in)break}else this.onData(g.output)}return!0},aI.prototype.onData=function(A){this.chunks.push(A)},aI.prototype.onEnd=function(A){A===EI&&(this.result=jA(this.chunks)),this.chunks=[],this.err=A,this.msg=this.strm.msg};var sI=function(A,I){let g,B,C,Q,E,i,e,t,o,a,s,r,D,n,h,w,y,G,S,c,N,d,l,k;const F=A.state;g=A.next_in,l=A.input,B=g+(A.avail_in-5),C=A.next_out,k=A.output,Q=C-(I-A.avail_out),E=C+(A.avail_out-257),i=F.dmax,e=F.wsize,t=F.whave,o=F.wnext,a=F.window,s=F.hold,r=F.bits,D=F.lencode,n=F.distcode,h=(1<<F.lenbits)-1,w=(1<<F.distbits)-1;A:do{r<15&&(s+=l[g++]<<r,r+=8,s+=l[g++]<<r,r+=8),y=D[s&h];I:for(;;){if(G=y>>>24,s>>>=G,r-=G,G=y>>>16&255,0===G)k[C++]=65535&y;else{if(!(16&G)){if(0==(64&G)){y=D[(65535&y)+(s&(1<<G)-1)];continue I}if(32&G){F.mode=12;break A}A.msg=\"invalid literal/length code\",F.mode=30;break A}S=65535&y,G&=15,G&&(r<G&&(s+=l[g++]<<r,r+=8),S+=s&(1<<G)-1,s>>>=G,r-=G),r<15&&(s+=l[g++]<<r,r+=8,s+=l[g++]<<r,r+=8),y=n[s&w];g:for(;;){if(G=y>>>24,s>>>=G,r-=G,G=y>>>16&255,!(16&G)){if(0==(64&G)){y=n[(65535&y)+(s&(1<<G)-1)];continue g}A.msg=\"invalid distance code\",F.mode=30;break A}if(c=65535&y,G&=15,r<G&&(s+=l[g++]<<r,r+=8,r<G&&(s+=l[g++]<<r,r+=8)),c+=s&(1<<G)-1,c>i){A.msg=\"invalid distance too far back\",F.mode=30;break A}if(s>>>=G,r-=G,G=C-Q,c>G){if(G=c-G,G>t&&F.sane){A.msg=\"invalid distance too far back\",F.mode=30;break A}if(N=0,d=a,0===o){if(N+=e-G,G<S){S-=G;do{k[C++]=a[N++]}while(--G);N=C-c,d=k}}else if(o<G){if(N+=e+o-G,G-=o,G<S){S-=G;do{k[C++]=a[N++]}while(--G);if(N=0,o<S){G=o,S-=G;do{k[C++]=a[N++]}while(--G);N=C-c,d=k}}}else if(N+=o-G,G<S){S-=G;do{k[C++]=a[N++]}while(--G);N=C-c,d=k}for(;S>2;)k[C++]=d[N++],k[C++]=d[N++],k[C++]=d[N++],S-=3;S&&(k[C++]=d[N++],S>1&&(k[C++]=d[N++]))}else{N=C-c;do{k[C++]=k[N++],k[C++]=k[N++],k[C++]=k[N++],S-=3}while(S>2);S&&(k[C++]=k[N++],S>1&&(k[C++]=k[N++]))}break}}break}}while(g<B&&C<E);S=r>>3,g-=S,r-=S<<3,s&=(1<<r)-1,A.next_in=g,A.next_out=C,A.avail_in=g<B?B-g+5:5-(g-B),A.avail_out=C<E?E-C+257:257-(C-E),F.hold=s,F.bits=r};const rI=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),DI=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),nI=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),hI=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var wI=(A,I,g,B,C,Q,E,i)=>{const e=i.bits;let t,o,a,s,r,D,n=0,h=0,w=0,y=0,G=0,S=0,c=0,N=0,d=0,l=0,k=null,F=0;const R=new Uint16Array(16),L=new Uint16Array(16);let U,f,Y,K=null,u=0;for(n=0;n<=15;n++)R[n]=0;for(h=0;h<B;h++)R[I[g+h]]++;for(G=e,y=15;y>=1&&0===R[y];y--);if(G>y&&(G=y),0===y)return C[Q++]=20971520,C[Q++]=20971520,i.bits=1,0;for(w=1;w<y&&0===R[w];w++);for(G<w&&(G=w),N=1,n=1;n<=15;n++)if(N<<=1,N-=R[n],N<0)return-1;if(N>0&&(0===A||1!==y))return-1;for(L[1]=0,n=1;n<15;n++)L[n+1]=L[n]+R[n];for(h=0;h<B;h++)0!==I[g+h]&&(E[L[I[g+h]]++]=h);if(0===A?(k=K=E,D=19):1===A?(k=rI,F-=257,K=DI,u-=257,D=256):(k=nI,K=hI,D=-1),l=0,h=0,n=w,r=Q,S=G,c=0,a=-1,d=1<<G,s=d-1,1===A&&d>852||2===A&&d>592)return 1;for(;;){U=n-c,E[h]<D?(f=0,Y=E[h]):E[h]>D?(f=K[u+E[h]],Y=k[F+E[h]]):(f=96,Y=0),t=1<<n-c,o=1<<S,w=o;do{o-=t,C[r+(l>>c)+o]=U<<24|f<<16|Y|0}while(0!==o);for(t=1<<n-1;l&t;)t>>=1;if(0!==t?(l&=t-1,l+=t):l=0,h++,0==--R[n]){if(n===y)break;n=I[g+E[h]]}if(n>G&&(l&s)!==a){for(0===c&&(c=G),r+=w,S=n-c,N=1<<S;S+c<y&&(N-=R[S+c],!(N<=0));)S++,N<<=1;if(d+=1<<S,1===A&&d>852||2===A&&d>592)return 1;a=l&s,C[a]=G<<24|S<<16|r-Q|0}}return 0!==l&&(C[r+l]=n-c<<24|64<<16|0),i.bits=G,0};const{Z_FINISH:yI,Z_BLOCK:GI,Z_TREES:SI,Z_OK:cI,Z_STREAM_END:NI,Z_NEED_DICT:dI,Z_STREAM_ERROR:lI,Z_DATA_ERROR:kI,Z_MEM_ERROR:FI,Z_BUF_ERROR:RI,Z_DEFLATED:LI}=gA,UI=A=>(A>>>24&255)+(A>>>8&65280)+((65280&A)<<8)+((255&A)<<24);function fI(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const YI=A=>{if(!A||!A.state)return lI;const I=A.state;return A.total_in=A.total_out=I.total=0,A.msg=\"\",I.wrap&&(A.adler=1&I.wrap),I.mode=1,I.last=0,I.havedict=0,I.dmax=32768,I.head=null,I.hold=0,I.bits=0,I.lencode=I.lendyn=new Int32Array(852),I.distcode=I.distdyn=new Int32Array(592),I.sane=1,I.back=-1,cI},KI=A=>{if(!A||!A.state)return lI;const I=A.state;return I.wsize=0,I.whave=0,I.wnext=0,YI(A)},uI=(A,I)=>{let g;if(!A||!A.state)return lI;const B=A.state;return I<0?(g=0,I=-I):(g=1+(I>>4),I<48&&(I&=15)),I&&(I<8||I>15)?lI:(null!==B.window&&B.wbits!==I&&(B.window=null),B.wrap=g,B.wbits=I,KI(A))},MI=(A,I)=>{if(!A)return lI;const g=new fI;A.state=g,g.window=null;const B=uI(A,I);return B!==cI&&(A.state=null),B};let JI,HI,pI=!0;const mI=A=>{if(pI){JI=new Int32Array(512),HI=new Int32Array(32);let I=0;for(;I<144;)A.lens[I++]=8;for(;I<256;)A.lens[I++]=9;for(;I<280;)A.lens[I++]=7;for(;I<288;)A.lens[I++]=8;for(wI(1,A.lens,0,288,JI,0,A.work,{bits:9}),I=0;I<32;)A.lens[I++]=5;wI(2,A.lens,0,32,HI,0,A.work,{bits:5}),pI=!1}A.lencode=JI,A.lenbits=9,A.distcode=HI,A.distbits=5},qI=(A,I,g,B)=>{let C;const Q=A.state;return null===Q.window&&(Q.wsize=1<<Q.wbits,Q.wnext=0,Q.whave=0,Q.window=new Uint8Array(Q.wsize)),B>=Q.wsize?(Q.window.set(I.subarray(g-Q.wsize,g),0),Q.wnext=0,Q.whave=Q.wsize):(C=Q.wsize-Q.wnext,C>B&&(C=B),Q.window.set(I.subarray(g-B,g-B+C),Q.wnext),(B-=C)?(Q.window.set(I.subarray(g-B,g),0),Q.wnext=B,Q.whave=Q.wsize):(Q.wnext+=C,Q.wnext===Q.wsize&&(Q.wnext=0),Q.whave<Q.wsize&&(Q.whave+=C))),0};var bI={inflateReset:KI,inflateReset2:uI,inflateResetKeep:YI,inflateInit:A=>MI(A,15),inflateInit2:MI,inflate:(A,I)=>{let g,B,C,Q,E,i,e,t,o,a,s,r,D,n,h,w,y,G,S,c,N,d,l=0;const k=new Uint8Array(4);let F,R;const L=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(!A||!A.state||!A.output||!A.input&&0!==A.avail_in)return lI;g=A.state,12===g.mode&&(g.mode=13),E=A.next_out,C=A.output,e=A.avail_out,Q=A.next_in,B=A.input,i=A.avail_in,t=g.hold,o=g.bits,a=i,s=e,d=cI;A:for(;;)switch(g.mode){case 1:if(0===g.wrap){g.mode=13;break}for(;o<16;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(2&g.wrap&&35615===t){g.check=0,k[0]=255&t,k[1]=t>>>8&255,g.check=AA(g.check,k,2,0),t=0,o=0,g.mode=2;break}if(g.flags=0,g.head&&(g.head.done=!1),!(1&g.wrap)||(((255&t)<<8)+(t>>8))%31){A.msg=\"incorrect header check\",g.mode=30;break}if((15&t)!==LI){A.msg=\"unknown compression method\",g.mode=30;break}if(t>>>=4,o-=4,N=8+(15&t),0===g.wbits)g.wbits=N;else if(N>g.wbits){A.msg=\"invalid window size\",g.mode=30;break}g.dmax=1<<g.wbits,A.adler=g.check=1,g.mode=512&t?10:12,t=0,o=0;break;case 2:for(;o<16;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(g.flags=t,(255&g.flags)!==LI){A.msg=\"unknown compression method\",g.mode=30;break}if(57344&g.flags){A.msg=\"unknown header flags set\",g.mode=30;break}g.head&&(g.head.text=t>>8&1),512&g.flags&&(k[0]=255&t,k[1]=t>>>8&255,g.check=AA(g.check,k,2,0)),t=0,o=0,g.mode=3;case 3:for(;o<32;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}g.head&&(g.head.time=t),512&g.flags&&(k[0]=255&t,k[1]=t>>>8&255,k[2]=t>>>16&255,k[3]=t>>>24&255,g.check=AA(g.check,k,4,0)),t=0,o=0,g.mode=4;case 4:for(;o<16;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}g.head&&(g.head.xflags=255&t,g.head.os=t>>8),512&g.flags&&(k[0]=255&t,k[1]=t>>>8&255,g.check=AA(g.check,k,2,0)),t=0,o=0,g.mode=5;case 5:if(1024&g.flags){for(;o<16;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}g.length=t,g.head&&(g.head.extra_len=t),512&g.flags&&(k[0]=255&t,k[1]=t>>>8&255,g.check=AA(g.check,k,2,0)),t=0,o=0}else g.head&&(g.head.extra=null);g.mode=6;case 6:if(1024&g.flags&&(r=g.length,r>i&&(r=i),r&&(g.head&&(N=g.head.extra_len-g.length,g.head.extra||(g.head.extra=new Uint8Array(g.head.extra_len)),g.head.extra.set(B.subarray(Q,Q+r),N)),512&g.flags&&(g.check=AA(g.check,B,r,Q)),i-=r,Q+=r,g.length-=r),g.length))break A;g.length=0,g.mode=7;case 7:if(2048&g.flags){if(0===i)break A;r=0;do{N=B[Q+r++],g.head&&N&&g.length<65536&&(g.head.name+=String.fromCharCode(N))}while(N&&r<i);if(512&g.flags&&(g.check=AA(g.check,B,r,Q)),i-=r,Q+=r,N)break A}else g.head&&(g.head.name=null);g.length=0,g.mode=8;case 8:if(4096&g.flags){if(0===i)break A;r=0;do{N=B[Q+r++],g.head&&N&&g.length<65536&&(g.head.comment+=String.fromCharCode(N))}while(N&&r<i);if(512&g.flags&&(g.check=AA(g.check,B,r,Q)),i-=r,Q+=r,N)break A}else g.head&&(g.head.comment=null);g.mode=9;case 9:if(512&g.flags){for(;o<16;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(t!==(65535&g.check)){A.msg=\"header crc mismatch\",g.mode=30;break}t=0,o=0}g.head&&(g.head.hcrc=g.flags>>9&1,g.head.done=!0),A.adler=g.check=0,g.mode=12;break;case 10:for(;o<32;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}A.adler=g.check=UI(t),t=0,o=0,g.mode=11;case 11:if(0===g.havedict)return A.next_out=E,A.avail_out=e,A.next_in=Q,A.avail_in=i,g.hold=t,g.bits=o,dI;A.adler=g.check=1,g.mode=12;case 12:if(I===GI||I===SI)break A;case 13:if(g.last){t>>>=7&o,o-=7&o,g.mode=27;break}for(;o<3;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}switch(g.last=1&t,t>>>=1,o-=1,3&t){case 0:g.mode=14;break;case 1:if(mI(g),g.mode=20,I===SI){t>>>=2,o-=2;break A}break;case 2:g.mode=17;break;case 3:A.msg=\"invalid block type\",g.mode=30}t>>>=2,o-=2;break;case 14:for(t>>>=7&o,o-=7&o;o<32;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if((65535&t)!=(t>>>16^65535)){A.msg=\"invalid stored block lengths\",g.mode=30;break}if(g.length=65535&t,t=0,o=0,g.mode=15,I===SI)break A;case 15:g.mode=16;case 16:if(r=g.length,r){if(r>i&&(r=i),r>e&&(r=e),0===r)break A;C.set(B.subarray(Q,Q+r),E),i-=r,Q+=r,e-=r,E+=r,g.length-=r;break}g.mode=12;break;case 17:for(;o<14;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(g.nlen=257+(31&t),t>>>=5,o-=5,g.ndist=1+(31&t),t>>>=5,o-=5,g.ncode=4+(15&t),t>>>=4,o-=4,g.nlen>286||g.ndist>30){A.msg=\"too many length or distance symbols\",g.mode=30;break}g.have=0,g.mode=18;case 18:for(;g.have<g.ncode;){for(;o<3;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}g.lens[L[g.have++]]=7&t,t>>>=3,o-=3}for(;g.have<19;)g.lens[L[g.have++]]=0;if(g.lencode=g.lendyn,g.lenbits=7,F={bits:g.lenbits},d=wI(0,g.lens,0,19,g.lencode,0,g.work,F),g.lenbits=F.bits,d){A.msg=\"invalid code lengths set\",g.mode=30;break}g.have=0,g.mode=19;case 19:for(;g.have<g.nlen+g.ndist;){for(;l=g.lencode[t&(1<<g.lenbits)-1],h=l>>>24,w=l>>>16&255,y=65535&l,!(h<=o);){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(y<16)t>>>=h,o-=h,g.lens[g.have++]=y;else{if(16===y){for(R=h+2;o<R;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(t>>>=h,o-=h,0===g.have){A.msg=\"invalid bit length repeat\",g.mode=30;break}N=g.lens[g.have-1],r=3+(3&t),t>>>=2,o-=2}else if(17===y){for(R=h+3;o<R;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}t>>>=h,o-=h,N=0,r=3+(7&t),t>>>=3,o-=3}else{for(R=h+7;o<R;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}t>>>=h,o-=h,N=0,r=11+(127&t),t>>>=7,o-=7}if(g.have+r>g.nlen+g.ndist){A.msg=\"invalid bit length repeat\",g.mode=30;break}for(;r--;)g.lens[g.have++]=N}}if(30===g.mode)break;if(0===g.lens[256]){A.msg=\"invalid code -- missing end-of-block\",g.mode=30;break}if(g.lenbits=9,F={bits:g.lenbits},d=wI(1,g.lens,0,g.nlen,g.lencode,0,g.work,F),g.lenbits=F.bits,d){A.msg=\"invalid literal/lengths set\",g.mode=30;break}if(g.distbits=6,g.distcode=g.distdyn,F={bits:g.distbits},d=wI(2,g.lens,g.nlen,g.ndist,g.distcode,0,g.work,F),g.distbits=F.bits,d){A.msg=\"invalid distances set\",g.mode=30;break}if(g.mode=20,I===SI)break A;case 20:g.mode=21;case 21:if(i>=6&&e>=258){A.next_out=E,A.avail_out=e,A.next_in=Q,A.avail_in=i,g.hold=t,g.bits=o,sI(A,s),E=A.next_out,C=A.output,e=A.avail_out,Q=A.next_in,B=A.input,i=A.avail_in,t=g.hold,o=g.bits,12===g.mode&&(g.back=-1);break}for(g.back=0;l=g.lencode[t&(1<<g.lenbits)-1],h=l>>>24,w=l>>>16&255,y=65535&l,!(h<=o);){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(w&&0==(240&w)){for(G=h,S=w,c=y;l=g.lencode[c+((t&(1<<G+S)-1)>>G)],h=l>>>24,w=l>>>16&255,y=65535&l,!(G+h<=o);){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}t>>>=G,o-=G,g.back+=G}if(t>>>=h,o-=h,g.back+=h,g.length=y,0===w){g.mode=26;break}if(32&w){g.back=-1,g.mode=12;break}if(64&w){A.msg=\"invalid literal/length code\",g.mode=30;break}g.extra=15&w,g.mode=22;case 22:if(g.extra){for(R=g.extra;o<R;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}g.length+=t&(1<<g.extra)-1,t>>>=g.extra,o-=g.extra,g.back+=g.extra}g.was=g.length,g.mode=23;case 23:for(;l=g.distcode[t&(1<<g.distbits)-1],h=l>>>24,w=l>>>16&255,y=65535&l,!(h<=o);){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(0==(240&w)){for(G=h,S=w,c=y;l=g.distcode[c+((t&(1<<G+S)-1)>>G)],h=l>>>24,w=l>>>16&255,y=65535&l,!(G+h<=o);){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}t>>>=G,o-=G,g.back+=G}if(t>>>=h,o-=h,g.back+=h,64&w){A.msg=\"invalid distance code\",g.mode=30;break}g.offset=y,g.extra=15&w,g.mode=24;case 24:if(g.extra){for(R=g.extra;o<R;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}g.offset+=t&(1<<g.extra)-1,t>>>=g.extra,o-=g.extra,g.back+=g.extra}if(g.offset>g.dmax){A.msg=\"invalid distance too far back\",g.mode=30;break}g.mode=25;case 25:if(0===e)break A;if(r=s-e,g.offset>r){if(r=g.offset-r,r>g.whave&&g.sane){A.msg=\"invalid distance too far back\",g.mode=30;break}r>g.wnext?(r-=g.wnext,D=g.wsize-r):D=g.wnext-r,r>g.length&&(r=g.length),n=g.window}else n=C,D=E-g.offset,r=g.length;r>e&&(r=e),e-=r,g.length-=r;do{C[E++]=n[D++]}while(--r);0===g.length&&(g.mode=21);break;case 26:if(0===e)break A;C[E++]=g.length,e--,g.mode=21;break;case 27:if(g.wrap){for(;o<32;){if(0===i)break A;i--,t|=B[Q++]<<o,o+=8}if(s-=e,A.total_out+=s,g.total+=s,s&&(A.adler=g.check=g.flags?AA(g.check,C,s,E-s):X(g.check,C,s,E-s)),s=e,(g.flags?t:UI(t))!==g.check){A.msg=\"incorrect data check\",g.mode=30;break}t=0,o=0}g.mode=28;case 28:if(g.wrap&&g.flags){for(;o<32;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(t!==(4294967295&g.total)){A.msg=\"incorrect length check\",g.mode=30;break}t=0,o=0}g.mode=29;case 29:d=NI;break A;case 30:d=kI;break A;case 31:return FI;default:return lI}return A.next_out=E,A.avail_out=e,A.next_in=Q,A.avail_in=i,g.hold=t,g.bits=o,(g.wsize||s!==A.avail_out&&g.mode<30&&(g.mode<27||I!==yI))&&qI(A,A.output,A.next_out,s-A.avail_out),a-=A.avail_in,s-=A.avail_out,A.total_in+=a,A.total_out+=s,g.total+=s,g.wrap&&s&&(A.adler=g.check=g.flags?AA(g.check,C,s,A.next_out-s):X(g.check,C,s,A.next_out-s)),A.data_type=g.bits+(g.last?64:0)+(12===g.mode?128:0)+(20===g.mode||15===g.mode?256:0),(0===a&&0===s||I===yI)&&d===cI&&(d=RI),d},inflateEnd:A=>{if(!A||!A.state)return lI;let I=A.state;return I.window&&(I.window=null),A.state=null,cI},inflateGetHeader:(A,I)=>{if(!A||!A.state)return lI;const g=A.state;return 0==(2&g.wrap)?lI:(g.head=I,I.done=!1,cI)},inflateSetDictionary:(A,I)=>{const g=I.length;let B,C,Q;return A&&A.state?(B=A.state,0!==B.wrap&&11!==B.mode?lI:11===B.mode&&(C=1,C=X(C,I,g,0),C!==B.check)?kI:(Q=qI(A,I,g,g),Q?(B.mode=31,FI):(B.havedict=1,cI))):lI},inflateInfo:\"pako inflate (from Nodeca project)\"};var xI=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name=\"\",this.comment=\"\",this.hcrc=0,this.done=!1};const OI=Object.prototype.toString,{Z_NO_FLUSH:TI,Z_FINISH:_I,Z_OK:ZI,Z_STREAM_END:PI,Z_NEED_DICT:vI,Z_STREAM_ERROR:jI,Z_DATA_ERROR:WI,Z_MEM_ERROR:VI}=gA;function zI(A){this.options=vA({chunkSize:65536,windowBits:15,to:\"\"},A||{});const I=this.options;I.raw&&I.windowBits>=0&&I.windowBits<16&&(I.windowBits=-I.windowBits,0===I.windowBits&&(I.windowBits=-15)),!(I.windowBits>=0&&I.windowBits<16)||A&&A.windowBits||(I.windowBits+=32),I.windowBits>15&&I.windowBits<48&&0==(15&I.windowBits)&&(I.windowBits|=15),this.err=0,this.msg=\"\",this.ended=!1,this.chunks=[],this.strm=new AI,this.strm.avail_out=0;let g=bI.inflateInit2(this.strm,I.windowBits);if(g!==ZI)throw new Error(IA[g]);if(this.header=new xI,bI.inflateGetHeader(this.strm,this.header),I.dictionary&&(\"string\"==typeof I.dictionary?I.dictionary=zA(I.dictionary):\"[object ArrayBuffer]\"===OI.call(I.dictionary)&&(I.dictionary=new Uint8Array(I.dictionary)),I.raw&&(g=bI.inflateSetDictionary(this.strm,I.dictionary),g!==ZI)))throw new Error(IA[g])}function XI(A,I){const g=new zI(I);if(g.push(A),g.err)throw g.msg||IA[g.err];return g.result}zI.prototype.push=function(A,I){const g=this.strm,B=this.options.chunkSize,C=this.options.dictionary;let Q,E,i;if(this.ended)return!1;for(E=I===~~I?I:!0===I?_I:TI,\"[object ArrayBuffer]\"===OI.call(A)?g.input=new Uint8Array(A):g.input=A,g.next_in=0,g.avail_in=g.input.length;;){for(0===g.avail_out&&(g.output=new Uint8Array(B),g.next_out=0,g.avail_out=B),Q=bI.inflate(g,E),Q===vI&&C&&(Q=bI.inflateSetDictionary(g,C),Q===ZI?Q=bI.inflate(g,E):Q===WI&&(Q=vI));g.avail_in>0&&Q===PI&&g.state.wrap>0&&0!==A[g.next_in];)bI.inflateReset(g),Q=bI.inflate(g,E);switch(Q){case jI:case WI:case vI:case VI:return this.onEnd(Q),this.ended=!0,!1}if(i=g.avail_out,g.next_out&&(0===g.avail_out||Q===PI))if(\"string\"===this.options.to){let A=$A(g.output,g.next_out),I=g.next_out-A,C=XA(g.output,A);g.next_out=I,g.avail_out=B-I,I&&g.output.set(g.output.subarray(A,A+I),0),this.onData(C)}else this.onData(g.output.length===g.next_out?g.output:g.output.subarray(0,g.next_out));if(Q!==ZI||0!==i){if(Q===PI)return Q=bI.inflateEnd(this.strm),this.onEnd(Q),this.ended=!0,!0;if(0===g.avail_in)break}}return!0},zI.prototype.onData=function(A){this.chunks.push(A)},zI.prototype.onEnd=function(A){A===ZI&&(\"string\"===this.options.to?this.result=this.chunks.join(\"\"):this.result=jA(this.chunks)),this.chunks=[],this.err=A,this.msg=this.strm.msg};var $I={Inflate:zI,inflate:XI,inflateRaw:function(A,I){return(I=I||{}).raw=!0,XI(A,I)},ungzip:XI,constants:gA};const{Inflate:Ag,inflate:Ig,inflateRaw:gg,ungzip:Bg}=$I;var Cg=Ig;var Qg=Object.freeze({__proto__:null,default:class extends i{decodeBlock(A){return Cg(new Uint8Array(A)).buffer}}});var Eg,ig=Object.freeze({__proto__:null,default:class extends i{decodeBlock(A){const I=new DataView(A),g=[];for(let B=0;B<A.byteLength;++B){let A=I.getInt8(B);if(A<0){const C=I.getUint8(B+1);A=-A;for(let I=0;I<=A;++I)g.push(C);B+=1}else{for(let C=0;C<=A;++C)g.push(I.getUint8(B+C+1));B+=A+1}}return new Uint8Array(g).buffer}}}),eg={exports:{}};Eg=eg,\n/* Copyright 2015-2021 Esri. Licensed under the Apache License, Version 2.0 (the \"License\"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 @preserve */\nfunction(){var A,I,g,B,C,Q,E,i,e,t,o,a,s,r,D,n,h=(A={defaultNoDataValue:-34027999387901484e22,decode:function(Q,E){var i=(E=E||{}).encodedMaskData||null===E.encodedMaskData,e=C(Q,E.inputOffset||0,i),t=null!==E.noDataValue?E.noDataValue:A.defaultNoDataValue,o=I(e,E.pixelType||Float32Array,E.encodedMaskData,t,E.returnMask),a={width:e.width,height:e.height,pixelData:o.resultPixels,minValue:o.minValue,maxValue:e.pixels.maxValue,noDataValue:t};return o.resultMask&&(a.maskData=o.resultMask),E.returnEncodedMask&&e.mask&&(a.encodedMaskData=e.mask.bitset?e.mask.bitset:null),E.returnFileInfo&&(a.fileInfo=g(e),E.computeUsedBitDepths&&(a.fileInfo.bitDepths=B(e))),a}},I=function(A,I,g,B,C){var E,i,e,t=0,o=A.pixels.numBlocksX,a=A.pixels.numBlocksY,s=Math.floor(A.width/o),r=Math.floor(A.height/a),D=2*A.maxZError,n=Number.MAX_VALUE;g=g||(A.mask?A.mask.bitset:null),i=new I(A.width*A.height),C&&g&&(e=new Uint8Array(A.width*A.height));for(var h,w,y=new Float32Array(s*r),G=0;G<=a;G++){var S=G!==a?r:A.height%a;if(0!==S)for(var c=0;c<=o;c++){var N=c!==o?s:A.width%o;if(0!==N){var d,l,k,F,R=G*A.width*r+c*s,L=A.width-N,U=A.pixels.blocks[t];if(U.encoding<2?(0===U.encoding?d=U.rawData:(Q(U.stuffedData,U.bitsPerPixel,U.numValidPixels,U.offset,D,y,A.pixels.maxValue),d=y),l=0):k=2===U.encoding?0:U.offset,g)for(w=0;w<S;w++){for(7&R&&(F=g[R>>3],F<<=7&R),h=0;h<N;h++)7&R||(F=g[R>>3]),128&F?(e&&(e[R]=1),n=n>(E=U.encoding<2?d[l++]:k)?E:n,i[R++]=E):(e&&(e[R]=0),i[R++]=B),F<<=1;R+=L}else if(U.encoding<2)for(w=0;w<S;w++){for(h=0;h<N;h++)n=n>(E=d[l++])?E:n,i[R++]=E;R+=L}else for(n=n>k?k:n,w=0;w<S;w++){for(h=0;h<N;h++)i[R++]=k;R+=L}if(1===U.encoding&&l!==U.numValidPixels)throw\"Block and Mask do not match\";t++}}}return{resultPixels:i,resultMask:e,minValue:n}},g=function(A){return{fileIdentifierString:A.fileIdentifierString,fileVersion:A.fileVersion,imageType:A.imageType,height:A.height,width:A.width,maxZError:A.maxZError,eofOffset:A.eofOffset,mask:A.mask?{numBlocksX:A.mask.numBlocksX,numBlocksY:A.mask.numBlocksY,numBytes:A.mask.numBytes,maxValue:A.mask.maxValue}:null,pixels:{numBlocksX:A.pixels.numBlocksX,numBlocksY:A.pixels.numBlocksY,numBytes:A.pixels.numBytes,maxValue:A.pixels.maxValue,noDataValue:A.noDataValue}}},B=function(A){for(var I=A.pixels.numBlocksX*A.pixels.numBlocksY,g={},B=0;B<I;B++){var C=A.pixels.blocks[B];0===C.encoding?g.float32=!0:1===C.encoding?g[C.bitsPerPixel]=!0:g[0]=!0}return Object.keys(g)},C=function(A,I,g){var B={},C=new Uint8Array(A,I,10);if(B.fileIdentifierString=String.fromCharCode.apply(null,C),\"CntZImage\"!==B.fileIdentifierString.trim())throw\"Unexpected file identifier string: \"+B.fileIdentifierString;I+=10;var Q=new DataView(A,I,24);if(B.fileVersion=Q.getInt32(0,!0),B.imageType=Q.getInt32(4,!0),B.height=Q.getUint32(8,!0),B.width=Q.getUint32(12,!0),B.maxZError=Q.getFloat64(16,!0),I+=24,!g)if(Q=new DataView(A,I,16),B.mask={},B.mask.numBlocksY=Q.getUint32(0,!0),B.mask.numBlocksX=Q.getUint32(4,!0),B.mask.numBytes=Q.getUint32(8,!0),B.mask.maxValue=Q.getFloat32(12,!0),I+=16,B.mask.numBytes>0){var E=new Uint8Array(Math.ceil(B.width*B.height/8)),i=(Q=new DataView(A,I,B.mask.numBytes)).getInt16(0,!0),e=2,t=0;do{if(i>0)for(;i--;)E[t++]=Q.getUint8(e++);else{var o=Q.getUint8(e++);for(i=-i;i--;)E[t++]=o}i=Q.getInt16(e,!0),e+=2}while(e<B.mask.numBytes);if(-32768!==i||t<E.length)throw\"Unexpected end of mask RLE encoding\";B.mask.bitset=E,I+=B.mask.numBytes}else 0==(B.mask.numBytes|B.mask.numBlocksY|B.mask.maxValue)&&(B.mask.bitset=new Uint8Array(Math.ceil(B.width*B.height/8)));Q=new DataView(A,I,16),B.pixels={},B.pixels.numBlocksY=Q.getUint32(0,!0),B.pixels.numBlocksX=Q.getUint32(4,!0),B.pixels.numBytes=Q.getUint32(8,!0),B.pixels.maxValue=Q.getFloat32(12,!0),I+=16;var a=B.pixels.numBlocksX,s=B.pixels.numBlocksY,r=a+(B.width%a>0?1:0),D=s+(B.height%s>0?1:0);B.pixels.blocks=new Array(r*D);for(var n=0,h=0;h<D;h++)for(var w=0;w<r;w++){var y=0,G=A.byteLength-I;Q=new DataView(A,I,Math.min(10,G));var S={};B.pixels.blocks[n++]=S;var c=Q.getUint8(0);if(y++,S.encoding=63&c,S.encoding>3)throw\"Invalid block encoding (\"+S.encoding+\")\";if(2!==S.encoding){if(0!==c&&2!==c){if(c>>=6,S.offsetType=c,2===c)S.offset=Q.getInt8(1),y++;else if(1===c)S.offset=Q.getInt16(1,!0),y+=2;else{if(0!==c)throw\"Invalid block offset type\";S.offset=Q.getFloat32(1,!0),y+=4}if(1===S.encoding)if(c=Q.getUint8(y),y++,S.bitsPerPixel=63&c,c>>=6,S.numValidPixelsType=c,2===c)S.numValidPixels=Q.getUint8(y),y++;else if(1===c)S.numValidPixels=Q.getUint16(y,!0),y+=2;else{if(0!==c)throw\"Invalid valid pixel count type\";S.numValidPixels=Q.getUint32(y,!0),y+=4}}var N;if(I+=y,3!==S.encoding)if(0===S.encoding){var d=(B.pixels.numBytes-1)/4;if(d!==Math.floor(d))throw\"uncompressed block has invalid length\";N=new ArrayBuffer(4*d),new Uint8Array(N).set(new Uint8Array(A,I,4*d));var l=new Float32Array(N);S.rawData=l,I+=4*d}else if(1===S.encoding){var k=Math.ceil(S.numValidPixels*S.bitsPerPixel/8),F=Math.ceil(k/4);N=new ArrayBuffer(4*F),new Uint8Array(N).set(new Uint8Array(A,I,k)),S.stuffedData=new Uint32Array(N),I+=k}}else I++}return B.eofOffset=I,B},Q=function(A,I,g,B,C,Q,E){var i,e,t,o=(1<<I)-1,a=0,s=0,r=Math.ceil((E-B)/C),D=4*A.length-Math.ceil(I*g/8);for(A[A.length-1]<<=8*D,i=0;i<g;i++){if(0===s&&(t=A[a++],s=32),s>=I)e=t>>>s-I&o,s-=I;else{var n=I-s;e=(t&o)<<n&o,e+=(t=A[a++])>>>(s=32-n)}Q[i]=e<r?B+e*C:E}return Q},A),w=(E=function(A,I,g,B,C,Q,E,i){var e,t,o,a,s,r=(1<<g)-1,D=0,n=0,h=4*A.length-Math.ceil(g*B/8);if(A[A.length-1]<<=8*h,C)for(e=0;e<B;e++)0===n&&(o=A[D++],n=32),n>=g?(t=o>>>n-g&r,n-=g):(t=(o&r)<<(a=g-n)&r,t+=(o=A[D++])>>>(n=32-a)),I[e]=C[t];else for(s=Math.ceil((i-Q)/E),e=0;e<B;e++)0===n&&(o=A[D++],n=32),n>=g?(t=o>>>n-g&r,n-=g):(t=(o&r)<<(a=g-n)&r,t+=(o=A[D++])>>>(n=32-a)),I[e]=t<s?Q+t*E:i},i=function(A,I,g,B,C,Q){var E,i=(1<<I)-1,e=0,t=0,o=0,a=0,s=0,r=[],D=4*A.length-Math.ceil(I*g/8);A[A.length-1]<<=8*D;var n=Math.ceil((Q-B)/C);for(t=0;t<g;t++)0===a&&(E=A[e++],a=32),a>=I?(s=E>>>a-I&i,a-=I):(s=(E&i)<<(o=I-a)&i,s+=(E=A[e++])>>>(a=32-o)),r[t]=s<n?B+s*C:Q;return r.unshift(B),r},e=function(A,I,g,B,C,Q,E,i){var e,t,o,a,s=(1<<g)-1,r=0,D=0,n=0;if(C)for(e=0;e<B;e++)0===D&&(o=A[r++],D=32,n=0),D>=g?(t=o>>>n&s,D-=g,n+=g):(t=o>>>n&s,D=32-(a=g-D),t|=((o=A[r++])&(1<<a)-1)<<g-a,n=a),I[e]=C[t];else{var h=Math.ceil((i-Q)/E);for(e=0;e<B;e++)0===D&&(o=A[r++],D=32,n=0),D>=g?(t=o>>>n&s,D-=g,n+=g):(t=o>>>n&s,D=32-(a=g-D),t|=((o=A[r++])&(1<<a)-1)<<g-a,n=a),I[e]=t<h?Q+t*E:i}return I},t=function(A,I,g,B,C,Q){var E,i=(1<<I)-1,e=0,t=0,o=0,a=0,s=0,r=0,D=[],n=Math.ceil((Q-B)/C);for(t=0;t<g;t++)0===a&&(E=A[e++],a=32,r=0),a>=I?(s=E>>>r&i,a-=I,r+=I):(s=E>>>r&i,a=32-(o=I-a),s|=((E=A[e++])&(1<<o)-1)<<I-o,r=o),D[t]=s<n?B+s*C:Q;return D.unshift(B),D},o=function(A,I,g,B){var C,Q,E,i,e=(1<<g)-1,t=0,o=0,a=4*A.length-Math.ceil(g*B/8);for(A[A.length-1]<<=8*a,C=0;C<B;C++)0===o&&(E=A[t++],o=32),o>=g?(Q=E>>>o-g&e,o-=g):(Q=(E&e)<<(i=g-o)&e,Q+=(E=A[t++])>>>(o=32-i)),I[C]=Q;return I},a=function(A,I,g,B){var C,Q,E,i,e=(1<<g)-1,t=0,o=0,a=0;for(C=0;C<B;C++)0===o&&(E=A[t++],o=32,a=0),o>=g?(Q=E>>>a&e,o-=g,a+=g):(Q=E>>>a&e,o=32-(i=g-o),Q|=((E=A[t++])&(1<<i)-1)<<g-i,a=i),I[C]=Q;return I},s={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(A){for(var I=65535,g=65535,B=A.length,C=Math.floor(B/2),Q=0;C;){var E=C>=359?359:C;C-=E;do{I+=A[Q++]<<8,g+=I+=A[Q++]}while(--E);I=(65535&I)+(I>>>16),g=(65535&g)+(g>>>16)}return 1&B&&(g+=I+=A[Q]<<8),((g=(65535&g)+(g>>>16))<<16|(I=(65535&I)+(I>>>16)))>>>0},readHeaderInfo:function(A,I){var g=I.ptr,B=new Uint8Array(A,g,6),C={};if(C.fileIdentifierString=String.fromCharCode.apply(null,B),0!==C.fileIdentifierString.lastIndexOf(\"Lerc2\",0))throw\"Unexpected file identifier string (expect Lerc2 ): \"+C.fileIdentifierString;g+=6;var Q,E=new DataView(A,g,8),i=E.getInt32(0,!0);if(C.fileVersion=i,g+=4,i>=3&&(C.checksum=E.getUint32(4,!0),g+=4),E=new DataView(A,g,12),C.height=E.getUint32(0,!0),C.width=E.getUint32(4,!0),g+=8,i>=4?(C.numDims=E.getUint32(8,!0),g+=4):C.numDims=1,E=new DataView(A,g,40),C.numValidPixel=E.getUint32(0,!0),C.microBlockSize=E.getInt32(4,!0),C.blobSize=E.getInt32(8,!0),C.imageType=E.getInt32(12,!0),C.maxZError=E.getFloat64(16,!0),C.zMin=E.getFloat64(24,!0),C.zMax=E.getFloat64(32,!0),g+=40,I.headerInfo=C,I.ptr=g,i>=3&&(Q=i>=4?52:48,this.computeChecksumFletcher32(new Uint8Array(A,g-Q,C.blobSize-14))!==C.checksum))throw\"Checksum failed.\";return!0},checkMinMaxRanges:function(A,I){var g=I.headerInfo,B=this.getDataTypeArray(g.imageType),C=g.numDims*this.getDataTypeSize(g.imageType),Q=this.readSubArray(A,I.ptr,B,C),E=this.readSubArray(A,I.ptr+C,B,C);I.ptr+=2*C;var i,e=!0;for(i=0;i<g.numDims;i++)if(Q[i]!==E[i]){e=!1;break}return g.minValues=Q,g.maxValues=E,e},readSubArray:function(A,I,g,B){var C;if(g===Uint8Array)C=new Uint8Array(A,I,B);else{var Q=new ArrayBuffer(B);new Uint8Array(Q).set(new Uint8Array(A,I,B)),C=new g(Q)}return C},readMask:function(A,I){var g,B,C=I.ptr,Q=I.headerInfo,E=Q.width*Q.height,i=Q.numValidPixel,e=new DataView(A,C,4),t={};if(t.numBytes=e.getUint32(0,!0),C+=4,(0===i||E===i)&&0!==t.numBytes)throw\"invalid mask\";if(0===i)g=new Uint8Array(Math.ceil(E/8)),t.bitset=g,B=new Uint8Array(E),I.pixels.resultMask=B,C+=t.numBytes;else if(t.numBytes>0){g=new Uint8Array(Math.ceil(E/8));var o=(e=new DataView(A,C,t.numBytes)).getInt16(0,!0),a=2,s=0,r=0;do{if(o>0)for(;o--;)g[s++]=e.getUint8(a++);else for(r=e.getUint8(a++),o=-o;o--;)g[s++]=r;o=e.getInt16(a,!0),a+=2}while(a<t.numBytes);if(-32768!==o||s<g.length)throw\"Unexpected end of mask RLE encoding\";B=new Uint8Array(E);var D=0,n=0;for(n=0;n<E;n++)7&n?(D=g[n>>3],D<<=7&n):D=g[n>>3],128&D&&(B[n]=1);I.pixels.resultMask=B,t.bitset=g,C+=t.numBytes}return I.ptr=C,I.mask=t,!0},readDataOneSweep:function(A,I,g,B){var C,Q=I.ptr,E=I.headerInfo,i=E.numDims,e=E.width*E.height,t=E.imageType,o=E.numValidPixel*s.getDataTypeSize(t)*i,a=I.pixels.resultMask;if(g===Uint8Array)C=new Uint8Array(A,Q,o);else{var r=new ArrayBuffer(o);new Uint8Array(r).set(new Uint8Array(A,Q,o)),C=new g(r)}if(C.length===e*i)I.pixels.resultPixels=B?s.swapDimensionOrder(C,e,i,g,!0):C;else{I.pixels.resultPixels=new g(e*i);var D=0,n=0,h=0,w=0;if(i>1){if(B){for(n=0;n<e;n++)if(a[n])for(w=n,h=0;h<i;h++,w+=e)I.pixels.resultPixels[w]=C[D++]}else for(n=0;n<e;n++)if(a[n])for(w=n*i,h=0;h<i;h++)I.pixels.resultPixels[w+h]=C[D++]}else for(n=0;n<e;n++)a[n]&&(I.pixels.resultPixels[n]=C[D++])}return Q+=o,I.ptr=Q,!0},readHuffmanTree:function(A,I){var g=this.HUFFMAN_LUT_BITS_MAX,B=new DataView(A,I.ptr,16);if(I.ptr+=16,B.getInt32(0,!0)<2)throw\"unsupported Huffman version\";var C=B.getInt32(4,!0),Q=B.getInt32(8,!0),E=B.getInt32(12,!0);if(Q>=E)return!1;var i=new Uint32Array(E-Q);s.decodeBits(A,I,i);var e,t,o,a,D=[];for(e=Q;e<E;e++)D[t=e-(e<C?0:C)]={first:i[e-Q],second:null};var n=A.byteLength-I.ptr,h=Math.ceil(n/4),w=new ArrayBuffer(4*h);new Uint8Array(w).set(new Uint8Array(A,I.ptr,n));var y,G=new Uint32Array(w),S=0,c=0;for(y=G[0],e=Q;e<E;e++)(a=D[t=e-(e<C?0:C)].first)>0&&(D[t].second=y<<S>>>32-a,32-S>=a?32===(S+=a)&&(S=0,y=G[++c]):(S+=a-32,y=G[++c],D[t].second|=y>>>32-S));var N=0,d=0,l=new r;for(e=0;e<D.length;e++)void 0!==D[e]&&(N=Math.max(N,D[e].first));d=N>=g?g:N;var k,F,R,L,U,f=[];for(e=Q;e<E;e++)if((a=D[t=e-(e<C?0:C)].first)>0)if(k=[a,t],a<=d)for(F=D[t].second<<d-a,R=1<<d-a,o=0;o<R;o++)f[F|o]=k;else for(F=D[t].second,U=l,L=a-1;L>=0;L--)F>>>L&1?(U.right||(U.right=new r),U=U.right):(U.left||(U.left=new r),U=U.left),0!==L||U.val||(U.val=k[1]);return{decodeLut:f,numBitsLUTQick:d,numBitsLUT:N,tree:l,stuffedData:G,srcPtr:c,bitPos:S}},readHuffman:function(A,I,g,B){var C,Q,E,i,e,t,o,a,r,D=I.headerInfo.numDims,n=I.headerInfo.height,h=I.headerInfo.width,w=h*n,y=this.readHuffmanTree(A,I),G=y.decodeLut,S=y.tree,c=y.stuffedData,N=y.srcPtr,d=y.bitPos,l=y.numBitsLUTQick,k=y.numBitsLUT,F=0===I.headerInfo.imageType?128:0,R=I.pixels.resultMask,L=0;d>0&&(N++,d=0);var U,f=c[N],Y=1===I.encodeMode,K=new g(w*D),u=K;if(D<2||Y){for(U=0;U<D;U++)if(D>1&&(u=new g(K.buffer,w*U,w),L=0),I.headerInfo.numValidPixel===h*n)for(a=0,t=0;t<n;t++)for(o=0;o<h;o++,a++){if(Q=0,e=i=f<<d>>>32-l,32-d<l&&(e=i|=c[N+1]>>>64-d-l),G[e])Q=G[e][1],d+=G[e][0];else for(e=i=f<<d>>>32-k,32-d<k&&(e=i|=c[N+1]>>>64-d-k),C=S,r=0;r<k;r++)if(!(C=i>>>k-r-1&1?C.right:C.left).left&&!C.right){Q=C.val,d=d+r+1;break}d>=32&&(d-=32,f=c[++N]),E=Q-F,Y?(E+=o>0?L:t>0?u[a-h]:L,E&=255,u[a]=E,L=E):u[a]=E}else for(a=0,t=0;t<n;t++)for(o=0;o<h;o++,a++)if(R[a]){if(Q=0,e=i=f<<d>>>32-l,32-d<l&&(e=i|=c[N+1]>>>64-d-l),G[e])Q=G[e][1],d+=G[e][0];else for(e=i=f<<d>>>32-k,32-d<k&&(e=i|=c[N+1]>>>64-d-k),C=S,r=0;r<k;r++)if(!(C=i>>>k-r-1&1?C.right:C.left).left&&!C.right){Q=C.val,d=d+r+1;break}d>=32&&(d-=32,f=c[++N]),E=Q-F,Y?(o>0&&R[a-1]?E+=L:t>0&&R[a-h]?E+=u[a-h]:E+=L,E&=255,u[a]=E,L=E):u[a]=E}}else for(a=0,t=0;t<n;t++)for(o=0;o<h;o++)if(a=t*h+o,!R||R[a])for(U=0;U<D;U++,a+=w){if(Q=0,e=i=f<<d>>>32-l,32-d<l&&(e=i|=c[N+1]>>>64-d-l),G[e])Q=G[e][1],d+=G[e][0];else for(e=i=f<<d>>>32-k,32-d<k&&(e=i|=c[N+1]>>>64-d-k),C=S,r=0;r<k;r++)if(!(C=i>>>k-r-1&1?C.right:C.left).left&&!C.right){Q=C.val,d=d+r+1;break}d>=32&&(d-=32,f=c[++N]),E=Q-F,u[a]=E}I.ptr=I.ptr+4*(N+1)+(d>0?4:0),I.pixels.resultPixels=K,D>1&&!B&&(I.pixels.resultPixels=s.swapDimensionOrder(K,w,D,g))},decodeBits:function(A,I,g,B,C){var Q=I.headerInfo,s=Q.fileVersion,r=0,D=A.byteLength-I.ptr>=5?5:A.byteLength-I.ptr,n=new DataView(A,I.ptr,D),h=n.getUint8(0);r++;var w=h>>6,y=0===w?4:3-w,G=(32&h)>0,S=31&h,c=0;if(1===y)c=n.getUint8(r),r++;else if(2===y)c=n.getUint16(r,!0),r+=2;else{if(4!==y)throw\"Invalid valid pixel count type\";c=n.getUint32(r,!0),r+=4}var N,d,l,k,F,R,L,U,f,Y=2*Q.maxZError,K=Q.numDims>1?Q.maxValues[C]:Q.zMax;if(G){for(I.counter.lut++,U=n.getUint8(r),r++,k=Math.ceil((U-1)*S/8),F=Math.ceil(k/4),d=new ArrayBuffer(4*F),l=new Uint8Array(d),I.ptr+=r,l.set(new Uint8Array(A,I.ptr,k)),L=new Uint32Array(d),I.ptr+=k,f=0;U-1>>>f;)f++;k=Math.ceil(c*f/8),F=Math.ceil(k/4),d=new ArrayBuffer(4*F),(l=new Uint8Array(d)).set(new Uint8Array(A,I.ptr,k)),N=new Uint32Array(d),I.ptr+=k,R=s>=3?t(L,S,U-1,B,Y,K):i(L,S,U-1,B,Y,K),s>=3?e(N,g,f,c,R):E(N,g,f,c,R)}else I.counter.bitstuffer++,f=S,I.ptr+=r,f>0&&(k=Math.ceil(c*f/8),F=Math.ceil(k/4),d=new ArrayBuffer(4*F),(l=new Uint8Array(d)).set(new Uint8Array(A,I.ptr,k)),N=new Uint32Array(d),I.ptr+=k,s>=3?null==B?a(N,g,f,c):e(N,g,f,c,!1,B,Y,K):null==B?o(N,g,f,c):E(N,g,f,c,!1,B,Y,K))},readTiles:function(A,I,g,B){var C=I.headerInfo,Q=C.width,E=C.height,i=Q*E,e=C.microBlockSize,t=C.imageType,o=s.getDataTypeSize(t),a=Math.ceil(Q/e),r=Math.ceil(E/e);I.pixels.numBlocksY=r,I.pixels.numBlocksX=a,I.pixels.ptr=0;var D,n,h,w,y,G,S,c,N,d,l=0,k=0,F=0,R=0,L=0,U=0,f=0,Y=0,K=0,u=0,M=0,J=0,H=0,p=0,m=0,q=new g(e*e),b=E%e||e,x=Q%e||e,O=C.numDims,T=I.pixels.resultMask,_=I.pixels.resultPixels,Z=C.fileVersion>=5?14:15,P=C.zMax;for(F=0;F<r;F++)for(L=F!==r-1?e:b,R=0;R<a;R++)for(u=F*Q*e+R*e,M=Q-(U=R!==a-1?e:x),c=0;c<O;c++){if(O>1?(d=_,u=F*Q*e+R*e,_=new g(I.pixels.resultPixels.buffer,i*c*o,i),P=C.maxValues[c]):d=null,f=A.byteLength-I.ptr,n={},m=0,Y=(D=new DataView(A,I.ptr,Math.min(10,f))).getUint8(0),m++,N=C.fileVersion>=5?4&Y:0,K=Y>>6&255,(Y>>2&Z)!=(R*e>>3&Z))throw\"integrity issue\";if(N&&0===c)throw\"integrity issue\";if((y=3&Y)>3)throw I.ptr+=m,\"Invalid block encoding (\"+y+\")\";if(2!==y)if(0===y){if(N)throw\"integrity issue\";if(I.counter.uncompressed++,I.ptr+=m,J=(J=L*U*o)<(H=A.byteLength-I.ptr)?J:H,h=new ArrayBuffer(J%o==0?J:J+o-J%o),new Uint8Array(h).set(new Uint8Array(A,I.ptr,J)),w=new g(h),p=0,T)for(l=0;l<L;l++){for(k=0;k<U;k++)T[u]&&(_[u]=w[p++]),u++;u+=M}else for(l=0;l<L;l++){for(k=0;k<U;k++)_[u++]=w[p++];u+=M}I.ptr+=p*o}else if(G=s.getDataTypeUsed(N&&t<6?4:t,K),S=s.getOnePixel(n,m,G,D),m+=s.getDataTypeSize(G),3===y)if(I.ptr+=m,I.counter.constantoffset++,T)for(l=0;l<L;l++){for(k=0;k<U;k++)T[u]&&(_[u]=N?Math.min(P,d[u]+S):S),u++;u+=M}else for(l=0;l<L;l++){for(k=0;k<U;k++)_[u]=N?Math.min(P,d[u]+S):S,u++;u+=M}else if(I.ptr+=m,s.decodeBits(A,I,q,S,c),m=0,N)if(T)for(l=0;l<L;l++){for(k=0;k<U;k++)T[u]&&(_[u]=q[m++]+d[u]),u++;u+=M}else for(l=0;l<L;l++){for(k=0;k<U;k++)_[u]=q[m++]+d[u],u++;u+=M}else if(T)for(l=0;l<L;l++){for(k=0;k<U;k++)T[u]&&(_[u]=q[m++]),u++;u+=M}else for(l=0;l<L;l++){for(k=0;k<U;k++)_[u++]=q[m++];u+=M}else{if(N)if(T)for(l=0;l<L;l++)for(k=0;k<U;k++)T[u]&&(_[u]=d[u]),u++;else for(l=0;l<L;l++)for(k=0;k<U;k++)_[u]=d[u],u++;I.counter.constant++,I.ptr+=m}}O>1&&!B&&(I.pixels.resultPixels=s.swapDimensionOrder(I.pixels.resultPixels,i,O,g))},formatFileInfo:function(A){return{fileIdentifierString:A.headerInfo.fileIdentifierString,fileVersion:A.headerInfo.fileVersion,imageType:A.headerInfo.imageType,height:A.headerInfo.height,width:A.headerInfo.width,numValidPixel:A.headerInfo.numValidPixel,microBlockSize:A.headerInfo.microBlockSize,blobSize:A.headerInfo.blobSize,maxZError:A.headerInfo.maxZError,pixelType:s.getPixelType(A.headerInfo.imageType),eofOffset:A.eofOffset,mask:A.mask?{numBytes:A.mask.numBytes}:null,pixels:{numBlocksX:A.pixels.numBlocksX,numBlocksY:A.pixels.numBlocksY,maxValue:A.headerInfo.zMax,minValue:A.headerInfo.zMin,noDataValue:A.noDataValue}}},constructConstantSurface:function(A,I){var g=A.headerInfo.zMax,B=A.headerInfo.zMin,C=A.headerInfo.maxValues,Q=A.headerInfo.numDims,E=A.headerInfo.height*A.headerInfo.width,i=0,e=0,t=0,o=A.pixels.resultMask,a=A.pixels.resultPixels;if(o)if(Q>1){if(I)for(i=0;i<Q;i++)for(t=i*E,g=C[i],e=0;e<E;e++)o[e]&&(a[t+e]=g);else for(e=0;e<E;e++)if(o[e])for(t=e*Q,i=0;i<Q;i++)a[t+Q]=C[i]}else for(e=0;e<E;e++)o[e]&&(a[e]=g);else if(Q>1&&B!==g)if(I)for(i=0;i<Q;i++)for(t=i*E,g=C[i],e=0;e<E;e++)a[t+e]=g;else for(e=0;e<E;e++)for(t=e*Q,i=0;i<Q;i++)a[t+i]=C[i];else for(e=0;e<E*Q;e++)a[e]=g},getDataTypeArray:function(A){var I;switch(A){case 0:I=Int8Array;break;case 1:I=Uint8Array;break;case 2:I=Int16Array;break;case 3:I=Uint16Array;break;case 4:I=Int32Array;break;case 5:I=Uint32Array;break;case 6:default:I=Float32Array;break;case 7:I=Float64Array}return I},getPixelType:function(A){var I;switch(A){case 0:I=\"S8\";break;case 1:I=\"U8\";break;case 2:I=\"S16\";break;case 3:I=\"U16\";break;case 4:I=\"S32\";break;case 5:I=\"U32\";break;case 6:default:I=\"F32\";break;case 7:I=\"F64\"}return I},isValidPixelValue:function(A,I){if(null==I)return!1;var g;switch(A){case 0:g=I>=-128&&I<=127;break;case 1:g=I>=0&&I<=255;break;case 2:g=I>=-32768&&I<=32767;break;case 3:g=I>=0&&I<=65536;break;case 4:g=I>=-2147483648&&I<=2147483647;break;case 5:g=I>=0&&I<=4294967296;break;case 6:g=I>=-34027999387901484e22&&I<=34027999387901484e22;break;case 7:g=I>=-17976931348623157e292&&I<=17976931348623157e292;break;default:g=!1}return g},getDataTypeSize:function(A){var I=0;switch(A){case 0:case 1:I=1;break;case 2:case 3:I=2;break;case 4:case 5:case 6:I=4;break;case 7:I=8;break;default:I=A}return I},getDataTypeUsed:function(A,I){var g=A;switch(A){case 2:case 4:g=A-I;break;case 3:case 5:g=A-2*I;break;case 6:g=0===I?A:1===I?2:1;break;case 7:g=0===I?A:A-2*I+1;break;default:g=A}return g},getOnePixel:function(A,I,g,B){var C=0;switch(g){case 0:C=B.getInt8(I);break;case 1:C=B.getUint8(I);break;case 2:C=B.getInt16(I,!0);break;case 3:C=B.getUint16(I,!0);break;case 4:C=B.getInt32(I,!0);break;case 5:C=B.getUInt32(I,!0);break;case 6:C=B.getFloat32(I,!0);break;case 7:C=B.getFloat64(I,!0);break;default:throw\"the decoder does not understand this pixel type\"}return C},swapDimensionOrder:function(A,I,g,B,C){var Q=0,E=0,i=0,e=0,t=A;if(g>1)if(t=new B(I*g),C)for(Q=0;Q<I;Q++)for(e=Q,i=0;i<g;i++,e+=I)t[e]=A[E++];else for(Q=0;Q<I;Q++)for(e=Q,i=0;i<g;i++,e+=I)t[E++]=A[e];return t}},r=function(A,I,g){this.val=A,this.left=I,this.right=g},{decode:function(A,I){var g=(I=I||{}).noDataValue,B=0,C={};C.ptr=I.inputOffset||0,C.pixels={},s.readHeaderInfo(A,C);var Q=C.headerInfo,E=Q.fileVersion,i=s.getDataTypeArray(Q.imageType);if(E>5)throw\"unsupported lerc version 2.\"+E;s.readMask(A,C),Q.numValidPixel===Q.width*Q.height||C.pixels.resultMask||(C.pixels.resultMask=I.maskData);var e=Q.width*Q.height;C.pixels.resultPixels=new i(e*Q.numDims),C.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0};var t,o=!I.returnPixelInterleavedDims;if(0!==Q.numValidPixel)if(Q.zMax===Q.zMin)s.constructConstantSurface(C,o);else if(E>=4&&s.checkMinMaxRanges(A,C))s.constructConstantSurface(C,o);else{var a=new DataView(A,C.ptr,2),r=a.getUint8(0);if(C.ptr++,r)s.readDataOneSweep(A,C,i,o);else if(E>1&&Q.imageType<=1&&Math.abs(Q.maxZError-.5)<1e-5){var D=a.getUint8(1);if(C.ptr++,C.encodeMode=D,D>2||E<4&&D>1)throw\"Invalid Huffman flag \"+D;D?s.readHuffman(A,C,i,o):s.readTiles(A,C,i,o)}else s.readTiles(A,C,i,o)}C.eofOffset=C.ptr,I.inputOffset?(t=C.headerInfo.blobSize+I.inputOffset-C.ptr,Math.abs(t)>=1&&(C.eofOffset=I.inputOffset+C.headerInfo.blobSize)):(t=C.headerInfo.blobSize-C.ptr,Math.abs(t)>=1&&(C.eofOffset=C.headerInfo.blobSize));var n={width:Q.width,height:Q.height,pixelData:C.pixels.resultPixels,minValue:Q.zMin,maxValue:Q.zMax,validPixelCount:Q.numValidPixel,dimCount:Q.numDims,dimStats:{minValues:Q.minValues,maxValues:Q.maxValues},maskData:C.pixels.resultMask};if(C.pixels.resultMask&&s.isValidPixelValue(Q.imageType,g)){var h=C.pixels.resultMask;for(B=0;B<e;B++)h[B]||(n.pixelData[B]=g);n.noDataValue=g}return C.noDataValue=g,I.returnFileInfo&&(n.fileInfo=s.formatFileInfo(C)),n},getBandCount:function(A){for(var I=0,g=0,B={ptr:0,pixels:{}};g<A.byteLength-58;)s.readHeaderInfo(A,B),g+=B.headerInfo.blobSize,I++,B.ptr=g;return I}}),y=(D=new ArrayBuffer(4),n=new Uint8Array(D),new Uint32Array(D)[0]=1,1===n[0]),G={decode:function(A,I){if(!y)throw\"Big endian system is not supported.\";var g,B,C=(I=I||{}).inputOffset||0,Q=new Uint8Array(A,C,10),E=String.fromCharCode.apply(null,Q);if(\"CntZImage\"===E.trim())g=h,B=1;else{if(\"Lerc2\"!==E.substring(0,5))throw\"Unexpected file identifier string: \"+E;g=w,B=2}for(var i,e,t,o,a,s,r=0,D=A.byteLength-10,n=[],G={width:0,height:0,pixels:[],pixelType:I.pixelType,mask:null,statistics:[]},S=0;C<D;){var c=g.decode(A,{inputOffset:C,encodedMaskData:i,maskData:t,returnMask:0===r,returnEncodedMask:0===r,returnFileInfo:!0,returnPixelInterleavedDims:I.returnPixelInterleavedDims,pixelType:I.pixelType||null,noDataValue:I.noDataValue||null});C=c.fileInfo.eofOffset,t=c.maskData,0===r&&(i=c.encodedMaskData,G.width=c.width,G.height=c.height,G.dimCount=c.dimCount||1,G.pixelType=c.pixelType||c.fileInfo.pixelType,G.mask=t),B>1&&(t&&n.push(t),c.fileInfo.mask&&c.fileInfo.mask.numBytes>0&&S++),r++,G.pixels.push(c.pixelData),G.statistics.push({minValue:c.minValue,maxValue:c.maxValue,noDataValue:c.noDataValue,dimStats:c.dimStats})}if(B>1&&S>1){for(s=G.width*G.height,G.bandMasks=n,(t=new Uint8Array(s)).set(n[0]),o=1;o<n.length;o++)for(e=n[o],a=0;a<s;a++)t[a]=t[a]&e[a];G.maskData=t}return G}};Eg.exports?Eg.exports=G:this.Lerc=G}();var tg=eg.exports;let og,ag,sg;const rg={env:{emscripten_notify_memory_growth:A=>{sg=new Uint8Array(ag.exports.memory.buffer)}}};const Dg=\"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AikACDcACCAHIDo3AAAgEUEZSA0BIARBGGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgCkkNAAsMAQsCQAJAIAUoAswCIhEgBUHgAWogJUEHcUEMbGoiDygCACICaiIHIBxLDQAgCSAPKAIEIgogAmoiBmogG0sNACAGQSBqIBQgCWtNDQELIAUgDygCCDYCoAEgBSAPKQIANwOYASAJIBQgBUGYAWogBUHMAmogHCALIBcgIhAgIQYMAQsgAiAJaiEEIA8oAgghFSARKQAAITogCSARKQAINwAIIAkgOjcAAAJAIAJBEUkNACARKQAQITogCSARKQAYNwAYIAkgOjcAECACQRBrQRFIDQAgEUEQaiECIAlBIGohEgNAIAIpABAhOiASIAIpABg3AAggEiA6NwAAIAIpACAhOiASIAIpACg3ABggEiA6NwAQIAJBIGohAiASQSBqIhIgBEkNAAsLIAQgFWshAiAFIAc2AswCIAQgC2sgFUkEQCAVIAQgF2tLDQwgIiAiIAIgC2siD2oiByAKak8EQCAKRQ0CIAQgByAK/AoAAAwCC0EAIA9rIgIEQCAEIAcgAvwKAAALIAogD2ohCiAEIA9rIQQgCyECCyAVQRBPBEAgAikAACE6IAQgAikACDcACCAEIDo3AAAgCkERSA0BIAQgCmohByAEQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAELAkAgFUEHTQRAIAQgAi0AADoAACAEIAItAAE6AAEgBCACLQACOgACIAQgAi0AAzoAAyAEIAIgFUECdCIHQeAaaigCAGoiAigAADYABCACIAdBgBtqKAIAayECDAELIAQgAikAADcAAAsgCkEJSQ0AIAQgCmohDyAEQQhqIgcgAkEIaiICa0EPTARAA0AgByACKQAANwAAIAJBCGohAiAHQQhqIgcgD0kNAAwCCwALIAIpAAAhOiAHIAIpAAg3AAggByA6NwAAIApBGUgNACAEQRhqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIA9JDQALCyAGQYh/SwRAIAYhAwwLCyAFQeABaiAlQQdxQQxsaiICIA02AgggAiAMNgIEIAIgEDYCAAsgBiAJaiEJICVBAWohJSAQIC1qIAxqIS0MAQsLIAUoArABIAUoArQBRw0HIAUoAqwBQSBHDQcgDiAoayEQA0ACQCAOIBBMBEBBACECA0AgAkEDRg0CIDIgAkECdCIDaiADICZqKAIANgIAIAJBAWohAgwACwALIAVB4AFqIBBBB3FBDGxqIQoCfwJAIAgoAoTsAUECRgRAIAUoAswCIg8gCigCACIEaiIHIAgoAoDsASICSwRAIAIgD0cEQCACIA9rIgIgFCAJa0sNCyAJIA8gAhAfIAogBCACayIENgIAIAIgCWohCQsgBSAWNgLMAiAIQQA2AoTsAQJAAkACQCAEQYCABEoNACAJIAooAgQiDSAEaiIGaiAbSw0AIAZBIGogFCAJa00NAQsgBSAKKAIINgJQIAUgCikCADcDSCAJIBQgBUHIAGogBUHMAmogGSALIBcgIhAgIQYMAQsgBCAWaiEHIAQgCWohDCAKKAIIIQogFikAACE6IAkgFikACDcACCAJIDo3AAACQCAEQRFJDQAgHikAACE6IAkgHikACDcAGCAJIDo3ABAgBEEQa0ERSA0AIAlBIGohAiAeIQQDQCAEKQAQITogAiAEKQAYNwAIIAIgOjcAACAEKQAgITogAiAEKQAoNwAYIAIgOjcAECAEQSBqIQQgAkEgaiICIAxJDQALCyAMIAprIQIgBSAHNgLMAiAMIAtrIApJBEAgCiAMIBdrSw0PICIgIiACIAtrIgdqIgQgDWpPBEAgDUUNAiAMIAQgDfwKAAAMAgtBACAHayICBEAgDCAEIAL8CgAACyAHIA1qIQ0gDCAHayEMIAshAgsgCkEQTwRAIAIpAAAhOiAMIAIpAAg3AAggDCA6NwAAIA1BEUgNASAMIA1qIQcgDEEQaiEEA0AgAikAECE6IAQgAikAGDcACCAEIDo3AAAgAikAICE6IAQgAikAKDcAGCAEIDo3ABAgAkEgaiECIARBIGoiBCAHSQ0ACwwBCwJAIApBB00EQCAMIAItAAA6AAAgDCACLQABOgABIAwgAi0AAjoAAiAMIAItAAM6AAMgDCACIApBAnQiBEHgGmooAgBqIgIoAAA2AAQgAiAEQYAbaigCAGshAgwBCyAMIAIpAAA3AAALIA1BCUkNACAMIA1qIQcgDEEIaiIEIAJBCGoiAmtBD0wEQANAIAQgAikAADcAACACQQhqIQIgBEEIaiIEIAdJDQAMAgsACyACKQAAITogBCACKQAINwAIIAQgOjcAACANQRlIDQAgDEEYaiEEA0AgAikAECE6IAQgAikAGDcACCAEIDo3AAAgAikAICE6IAQgAikAKDcAGCAEIDo3ABAgAkEgaiECIARBIGoiBCAHSQ0ACwsgBkGJf08EQCAGIQMMDgsgGSEcIAYgCWoMAwsgB0EgayECAkACQCAHIBxLDQAgCSAKKAIEIhIgBGoiDGogAksNACAMQSBqIBQgCWtNDQELIAUgCigCCDYCYCAFIAopAgA3A1ggCSAUIAIgBUHYAGogBUHMAmogHCALIBcgIhAhIQwMAgsgBCAJaiEGIAooAgghCiAPKQAAITogCSAPKQAINwAIIAkgOjcAAAJAIARBEUkNACAPKQAQITogCSAPKQAYNwAYIAkgOjcAECAEQRBrQRFIDQAgD0EQaiECIAlBIGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgBkkNAAsLIAYgCmshAiAFIAc2AswCIAYgC2sgCkkEQCAKIAYgF2tLDQ0gIiAiIAIgC2siB2oiBCASak8EQCASRQ0DIAYgBCAS/AoAAAwDC0EAIAdrIgIEQCAGIAQgAvwKAAALIAcgEmohEiAGIAdrIQYgCyECCyAKQRBPBEAgAikAACE6IAYgAikACDcACCAGIDo3AAAgEkERSA0CIAYgEmohByAGQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAILAkAgCkEHTQRAIAYgAi0AADoAACAGIAItAAE6AAEgBiACLQACOgACIAYgAi0AAzoAAyAGIAIgCkECdCIEQeAaaigCAGoiAigAADYABCACIARBgBtqKAIAayECDAELIAYgAikAADcAAAsgEkEJSQ0BIAYgEmohByAGQQhqIgQgAkEIaiICa0EPTARAA0AgBCACKQAANwAAIAJBCGohAiAE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\",ng={BYTE:1,ASCII:2,SHORT:3,LONG:4,RATIONAL:5,SBYTE:6,UNDEFINED:7,SSHORT:8,SLONG:9,SRATIONAL:10,FLOAT:11,DOUBLE:12,IFD:13,LONG8:16,SLONG8:17,IFD8:18},hg={NewSubfileType:{tag:254,type:ng.LONG,eager:!0},SubfileType:{tag:255,type:ng.SHORT,eager:!0},ImageWidth:{tag:256,type:ng.SHORT,eager:!0},ImageLength:{tag:257,type:ng.SHORT,eager:!0},BitsPerSample:{tag:258,type:ng.SHORT,isArray:!0,eager:!0},Compression:{tag:259,type:ng.SHORT,eager:!0},PhotometricInterpretation:{tag:262,type:ng.SHORT,eager:!0},Threshholding:{tag:263,type:ng.SHORT},CellWidth:{tag:264,type:ng.SHORT},CellLength:{tag:265,type:ng.SHORT},FillOrder:{tag:266,type:ng.SHORT},DocumentName:{tag:269,type:ng.ASCII},ImageDescription:{tag:270,type:ng.ASCII},Make:{tag:271,type:ng.ASCII},Model:{tag:272,type:ng.ASCII},StripOffsets:{tag:273,type:ng.SHORT,isArray:!0},Orientation:{tag:274,type:ng.SHORT},SamplesPerPixel:{tag:277,type:ng.SHORT,eager:!0},RowsPerStrip:{tag:278,type:ng.SHORT,eager:!0},StripByteCounts:{tag:279,type:ng.LONG,isArray:!0},MinSampleValue:{tag:280,type:ng.SHORT,isArray:!0},MaxSampleValue:{tag:281,type:ng.SHORT,isArray:!0},XResolution:{tag:282,type:ng.RATIONAL},YResolution:{tag:283,type:ng.RATIONAL},PlanarConfiguration:{tag:284,type:ng.SHORT,eager:!0},PageName:{tag:285,type:ng.ASCII},XPosition:{tag:286,type:ng.RATIONAL},YPosition:{tag:287,type:ng.RATIONAL},FreeOffsets:{tag:288,type:ng.LONG},FreeByteCounts:{tag:289,type:ng.LONG},GrayResponseUnit:{tag:290,type:ng.SHORT},GrayResponseCurve:{tag:291,type:ng.SHORT,isArray:!0},T4Options:{tag:292,type:ng.LONG},T6Options:{tag:293,type:ng.LONG},ResolutionUnit:{tag:296,type:ng.SHORT},PageNumber:{tag:297,type:ng.SHORT,isArray:!0},TransferFunction:{tag:301,type:ng.SHORT,isArray:!0},Software:{tag:305,type:ng.ASCII},DateTime:{tag:306,type:ng.ASCII},Artist:{tag:315,type:ng.ASCII},HostComputer:{tag:316,type:ng.ASCII},Predictor:{tag:317,type:ng.SHORT},WhitePoint:{tag:318,type:ng.RATIONAL,isArray:!0},PrimaryChromaticities:{tag:319,type:ng.RATIONAL,isArray:!0},ColorMap:{tag:320,type:ng.SHORT,isArray:!0},HalftoneHints:{tag:321,type:ng.SHORT,isArray:!0},TileWidth:{tag:322,type:ng.SHORT,eager:!0},TileLength:{tag:323,type:ng.SHORT,eager:!0},TileOffsets:{tag:324,type:ng.LONG,isArray:!0},TileByteCounts:{tag:325,type:ng.SHORT,isArray:!0},InkSet:{tag:332,type:ng.SHORT},InkNames:{tag:333,type:ng.ASCII},NumberOfInks:{tag:334,type:ng.SHORT},DotRange:{tag:336,type:ng.BYTE,isArray:!0},TargetPrinter:{tag:337,type:ng.ASCII},ExtraSamples:{tag:338,type:ng.BYTE,isArray:!0,eager:!0},SampleFormat:{tag:339,type:ng.SHORT,isArray:!0,eager:!0},SMinSampleValue:{tag:340,isArray:!0},SMaxSampleValue:{tag:341,isArray:!0},TransferRange:{tag:342,type:ng.SHORT,isArray:!0},JPEGProc:{tag:512,type:ng.SHORT},JPEGInterchangeFormat:{tag:513,type:ng.LONG},JPEGInterchangeFormatLngth:{tag:514,type:ng.LONG},JPEGRestartInterval:{tag:515,type:ng.SHORT},JPEGLosslessPredictors:{tag:517,type:ng.SHORT,isArray:!0},JPEGPointTransforms:{tag:518,type:ng.SHORT,isArray:!0},JPEGQTables:{tag:519,type:ng.LONG,isArray:!0},JPEGDCTables:{tag:520,type:ng.LONG,isArray:!0},JPEGACTables:{tag:521,type:ng.LONG,isArray:!0},YCbCrCoefficients:{tag:529,type:ng.RATIONAL,isArray:!0},YCbCrSubSampling:{tag:530,type:ng.SHORT,isArray:!0},YCbCrPositioning:{tag:531,type:ng.SHORT},ReferenceBlackWhite:{tag:532,type:ng.LONG,isArray:!0},Copyright:{tag:33432,type:ng.ASCII},BadFaxLines:{tag:326},CleanFaxData:{tag:327},ClipPath:{tag:343},ConsecutiveBadFaxLines:{tag:328},Decode:{tag:433},DefaultImageColor:{tag:434},Indexed:{tag:346},JPEGTables:{tag:347,isArray:!0,eager:!0},StripRowCounts:{tag:559,isArray:!0},SubIFDs:{tag:330,isArray:!0},XClipPathUnits:{tag:344},YClipPathUnits:{tag:345},ApertureValue:{tag:37378},ColorSpace:{tag:40961},DateTimeDigitized:{tag:36868},DateTimeOriginal:{tag:36867},ExifIFD:{tag:34665,name:\"Exif IFD\",type:ng.LONG},ExifVersion:{tag:36864},ExposureTime:{tag:33434},FileSource:{tag:41728},Flash:{tag:37385},FlashpixVersion:{tag:40960},FNumber:{tag:33437},ImageUniqueID:{tag:42016},LightSource:{tag:37384},MakerNote:{tag:37500},ShutterSpeedValue:{tag:37377},UserComment:{tag:37510},IPTC:{tag:33723},CZ_LSMINFO:{tag:34412},ICCProfile:{tag:34675,name:\"ICC Profile\"},XMP:{tag:700},GDAL_METADATA:{tag:42112},GDAL_NODATA:{tag:42113,type:ng.ASCII,eager:!0},Photoshop:{tag:34377},ModelPixelScale:{tag:33550,type:ng.DOUBLE,isArray:!0,eager:!0},ModelTiepoint:{tag:33922,type:ng.DOUBLE,isArray:!0,eager:!0},ModelTransformation:{tag:34264,type:ng.DOUBLE,isArray:!0,eager:!0},GeoKeyDirectory:{tag:34735,type:ng.SHORT,isArray:!0,eager:!0},GeoDoubleParams:{tag:34736,type:ng.DOUBLE,isArray:!0,eager:!0},GeoAsciiParams:{tag:34737,type:ng.ASCII,eager:!0},LercParameters:{tag:50674,eager:!0}},wg={},yg={};function Gg(A,I,g,B=!1,C=!1){wg[I]=A,yg[A]={tag:A,name:I,type:\"string\"==typeof g?ng[g]:g,isArray:B,eager:C}}for(const[A,I]of Object.entries(hg)){const g=I;Gg(g.tag,g.name||A,g.type,g.isArray,g.eager)}const Sg=1,cg=0,Ng=1,dg=2,lg={1024:\"GTModelTypeGeoKey\",1025:\"GTRasterTypeGeoKey\",1026:\"GTCitationGeoKey\",2048:\"GeographicTypeGeoKey\",2049:\"GeogCitationGeoKey\",2050:\"GeogGeodeticDatumGeoKey\",2051:\"GeogPrimeMeridianGeoKey\",2052:\"GeogLinearUnitsGeoKey\",2053:\"GeogLinearUnitSizeGeoKey\",2054:\"GeogAngularUnitsGeoKey\",2055:\"GeogAngularUnitSizeGeoKey\",2056:\"GeogEllipsoidGeoKey\",2057:\"GeogSemiMajorAxisGeoKey\",2058:\"GeogSemiMinorAxisGeoKey\",2059:\"GeogInvFlatteningGeoKey\",2060:\"GeogAzimuthUnitsGeoKey\",2061:\"GeogPrimeMeridianLongGeoKey\",2062:\"GeogTOWGS84GeoKey\",3072:\"ProjectedCSTypeGeoKey\",3073:\"PCSCitationGeoKey\",3074:\"ProjectionGeoKey\",3075:\"ProjCoordTransGeoKey\",3076:\"ProjLinearUnitsGeoKey\",3077:\"ProjLinearUnitSizeGeoKey\",3078:\"ProjStdParallel1GeoKey\",3079:\"ProjStdParallel2GeoKey\",3080:\"ProjNatOriginLongGeoKey\",3081:\"ProjNatOriginLatGeoKey\",3082:\"ProjFalseEastingGeoKey\",3083:\"ProjFalseNorthingGeoKey\",3084:\"ProjFalseOriginLongGeoKey\",3085:\"ProjFalseOriginLatGeoKey\",3086:\"ProjFalseOriginEastingGeoKey\",3087:\"ProjFalseOriginNorthingGeoKey\",3088:\"ProjCenterLongGeoKey\",3089:\"ProjCenterLatGeoKey\",3090:\"ProjCenterEastingGeoKey\",3091:\"ProjCenterNorthingGeoKey\",3092:\"ProjScaleAtNatOriginGeoKey\",3093:\"ProjScaleAtCenterGeoKey\",3094:\"ProjAzimuthAngleGeoKey\",3095:\"ProjStraightVertPoleLongGeoKey\",3096:\"ProjRectifiedGridAngleGeoKey\",4096:\"VerticalCSTypeGeoKey\",4097:\"VerticalCitationGeoKey\",4098:\"VerticalDatumGeoKey\",4099:\"VerticalUnitsGeoKey\"},kg={};for(const[A,I]of Object.entries(lg))kg[I]=parseInt(A,10);const Fg=new class{init(){return og||(og=\"undefined\"!=typeof fetch?fetch(`data:application/wasm;base64,${Dg}`).then((A=>A.arrayBuffer())).then((A=>WebAssembly.instantiate(A,rg))).then(this._init):WebAssembly.instantiate(Buffer.from(Dg,\"base64\"),rg).then(this._init),og)}_init(A){ag=A.instance,rg.env.emscripten_notify_memory_growth(0)}decode(A,I=0){if(!ag)throw new Error(\"ZSTDDecoder: Await .init() before decoding.\");const g=A.byteLength,B=ag.exports.malloc(g);sg.set(A,B),I=I||Number(ag.exports.ZSTD_findDecompressedSize(B,g));const C=ag.exports.malloc(I),Q=ag.exports.ZSTD_decompress(C,I,B,g),E=sg.slice(C,C+Q);return ag.exports.free(B),ag.exports.free(C),E}};var Rg=Object.freeze({__proto__:null,zstd:Fg,default:class extends i{decodeBlock(A){const I=this.parameters.LercParameters?.[Sg];let g=A;switch(I){case cg:break;case Ng:g=Cg(new Uint8Array(g)).buffer;break;case dg:g=Fg.decode(new Uint8Array(g)).buffer;break;default:throw new Error(`Unsupported LERC additional compression method identifier: ${I}`)}return tg.decode(g,{returnPixelInterleavedDims:1===this.parameters.planarConfiguration}).pixels[0].buffer}}});let Lg,Ug,fg,Yg;const Kg={env:{emscripten_notify_memory_growth:A=>{fg=new Uint8Array(Ug.exports.memory.buffer),Yg=new DataView(fg.buffer)}}};const ug=\"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QQhyIQBBACEDA0AgACADTQ0DIANBQGshAwwACwALQWwhCiAOIA5B/ABqIA5B+ABqIAUgBhAGIgJBiH9LDQEgDigCeCIDIARLDQEgACAOIA4oAnwgByAIIAMgDRAlIAEgADYCACACIQoMAQtBbCEKCyAOQYABaiQAIAoLcAEEfyAAQgA3AgAgAgRAIAFBCmohBiABKAIEIQRBACECQQAhAQNAIAEgBHZFBEAgAiAGIAFBA3RqLQAAIgUgAiAFSxshAiABQQFqIQEgAyAFQRZLaiEDDAELCyAAIAI2AgQgACADQQggBGt0NgIACwuuAQEEfyABIAIoAgQiAyABKAIEaiIENgIEIAAgA0ECdEGwGWooAgAgASgCAEEAIARrdnE2AgACQCAEQSFPBEAgAUGwGjYCCAwBCyABKAIIIgMgASgCEE8EQCABEAwMAQsgAyABKAIMIgVGDQAgASADIAMgBWsgBEEDdiIGIAMgBmsgBUkbIgNrIgU2AgggASAEIANBA3RrNgIEIAEgBSgAADYCAAsgACACQQhqNgIEC40CAgN/AX4gACACaiEEAkACQCACQQhOBEAgACABayICQXlIDQELA0AgACAETw0CIAAgAS0AADoAACAAQQFqIQAgAUEBaiEBDAALAAsCQAJAIAJBb0sNACAAIARBIGsiAksNACABKQAAIQYgACABKQAINwAIIAAgBjcAACACIABrIgVBEU4EQCAAQRBqIQAgASEDA0AgAykAECEGIAAgAykAGDcACCAAIAY3AAAgAykAICEGIAAgAykAKDcAGCAAIAY3ABAgA0EgaiEDIABBIGoiACACSQ0ACwsgASAFaiEBDAELIAAhAgsDQCACIARPDQEgAiABLQAAOgAAIAJBAWohAiABQQFqIQEMAAsACwvfAQEGf0G6fyEKAkAgAigCBCIIIAIoAgAiCWoiDSABIABrSw0AQWwhCiAJIAQgAygCACILa0sNACAAIAlqIgQgAigCCCIMayECIAAgAUEgayIBIAsgCUEAEDMgAyAJIAtqNgIAAkACQCAEIAVrIAxPBEAgAiEFDAELIAwgBCAGa0sNAiAHIAcgAiAFayIDaiICIAhqTwRAIAhFDQIgBCACIAj8CgAADAILQQAgA2siAARAIAQgAiAA/AoAAAsgAyAIaiEIIAQgA2shBAsgBCABIAUgCEEBEDML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\",Mg=new class{init(){return Lg||(Lg=\"undefined\"!=typeof fetch?fetch(`data:application/wasm;base64,${ug}`).then((A=>A.arrayBuffer())).then((A=>WebAssembly.instantiate(A,Kg))).then(this._init):WebAssembly.instantiate(Buffer.from(ug,\"base64\"),Kg).then(this._init),Lg)}_init(A){Ug=A.instance,Kg.env.emscripten_notify_memory_growth(0)}decode(A,I=0){if(!Ug)throw new Error(\"ZSTDDecoder: Await .init() before decoding.\");const g=A.byteLength,B=Ug.exports.malloc(g);if(fg.set(A,B),0===I&&(I=Number(Ug.exports.ZSTD_findDecompressedSize(B,g))),-1===I){Ug.exports.free(B);const I=[];for(const g of this.decodeStreaming([A]))I.push(g);if(1===I.length)return I[0];const g=I.reduce(((A,I)=>A+I.byteLength),0),C=new Uint8Array(g);let Q=0;for(const A of I)C.set(A,Q),Q+=A.byteLength;return C}const C=Ug.exports.malloc(I),Q=Ug.exports.ZSTD_decompress(C,I,B,g),E=fg.slice(C,C+Q);return Ug.exports.free(B),Ug.exports.free(C),E}*decodeStreaming(A){if(!Ug)throw new Error(\"ZSTDDecoder: Await .init() before decoding.\");const I=Ug.exports.ZSTD_DStreamInSize(),g=Ug.exports.malloc(I),B=Ug.exports.ZSTD_DStreamOutSize(),C=Ug.exports.malloc(B),Q=Ug.exports.ZSTD_createDCtx(),E=Ug.exports.malloc(12),i=Ug.exports.malloc(12);let e=0;for(const I of A){const A=Ug.exports.malloc(I.byteLength);for(fg.set(I,A),Yg.setInt32(E,A,!0),Yg.setInt32(E+4,I.byteLength,!0),Yg.setInt32(E+4+4,0,!0);Yg.getUint32(E+4+4,!0)<Yg.getUint32(E+4,!0);){Yg.setInt32(i,C,!0),Yg.setInt32(i+4,B,!0),Yg.setInt32(i+4+4,0,!0),e=Ug.exports.ZSTD_decompressStream(Q,i,E);const A=Yg.getUint32(i+4+4,!0);yield fg.slice(C,C+A)}Ug.exports.free(A)}if(Ug.exports.ZSTD_freeDCtx(Q),Ug.exports.free(g),Ug.exports.free(C),Ug.exports.free(E),Ug.exports.free(i),0!==e)throw new Error(\"Incomplete stream, more data expected.\")}};var Jg=Object.freeze({__proto__:null,zstd:Mg,default:class extends i{decodeBlock(A){return Mg.decode(new Uint8Array(A)).buffer}}});var Hg=Object.freeze({__proto__:null,default:class extends i{constructor(A){if(super(A),\"undefined\"==typeof createImageBitmap)throw new Error(\"Cannot decode WebImage as `createImageBitmap` is not available\");if(\"undefined\"==typeof document&&\"undefined\"==typeof OffscreenCanvas)throw new Error(\"Cannot decode WebImage as neither `document` nor `OffscreenCanvas` is not available\")}async decodeBlock(A){const I=new Blob([A]),g=await createImageBitmap(I);let B;\"undefined\"!=typeof document?(B=document.createElement(\"canvas\"),B.width=g.width,B.height=g.height):B=new OffscreenCanvas(g.width,g.height);const C=B.getContext(\"2d\");C.drawImage(g,0,0);const Q=C.getImageData(0,0,g.width,g.height).data,E=this.parameters.samplesPerPixel||4;if(4===E)return Q.buffer;if(3===E){const A=new Uint8ClampedArray(g.width*g.height*3);for(let I=0,g=0;I<A.length;I+=3,g+=4)A[I]=Q[g],A[I+1]=Q[g+1],A[I+2]=Q[g+2];return A.buffer}throw new Error(`Unsupported SamplesPerPixel value: ${E}`)}}});";
	return new browser_default(typeof Buffer !== "undefined" ? "data:application/javascript;base64," + Buffer.from(source, "binary").toString("base64") : URL.createObjectURL(new Blob([source], { type: "application/javascript" })));
}
//#endregion
//#region node_modules/geotiff/dist-module/pool.js
init_objectSpread2();
var _excluded$1 = ["jobId", "error"];
var defaultPoolSize = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 2 : 2;
/**
* @module pool
*/
/**
* Wrapper for a worker that can submit jobs to the worker and receive responses.
*/
var WorkerWrapper = class {
	/**
	* @param {Worker} worker the worker to wrap
	*/
	constructor(worker) {
		/** @type {Worker} */
		this.worker = worker;
		this.worker.addEventListener("message", (e) => this._onWorkerMessage(e));
		this.jobIdCounter = 0;
		this.jobs = /* @__PURE__ */ new Map();
	}
	/**
	* Get a new job id
	* @returns {Number} the new job id
	*/
	newJobId() {
		return this.jobIdCounter++;
	}
	/**
	* Get the number of jobs currently running
	* @returns {Number} the number of jobs currently running
	*/
	getJobCount() {
		return this.jobs.size;
	}
	/** @param {MessageEvent} e */
	_onWorkerMessage(e) {
		const _e$data = e.data, { jobId, error } = _e$data, result = _objectWithoutProperties(_e$data, _excluded$1);
		const job = this.jobs.get(jobId);
		this.jobs.delete(jobId);
		if (error) job.reject(new Error(error));
		else job.resolve(result);
	}
	/**
	* Submit a job to the worker
	* @param {Record<string, unknown>} message the message to send to the worker. A "jobId" property will be added to this object.
	* @param {Array<Transferable>} [transferables] an optional array of transferable objects to transfer to the worker.
	* @returns {Promise<{decoded: ArrayBuffer}>} a promise that gets resolved/rejected when a message with the same jobId is
	* received from the worker.
	*/
	submitJob(message, transferables) {
		const jobId = this.newJobId();
		let resolve;
		let reject;
		const promise = new Promise((_resolve, _reject) => {
			resolve = _resolve;
			reject = _reject;
		});
		this.jobs.set(jobId, {
			resolve,
			reject
		});
		if (transferables) this.worker.postMessage(_objectSpread2(_objectSpread2({}, message), {}, { jobId }), transferables);
		else this.worker.postMessage(_objectSpread2(_objectSpread2({}, message), {}, { jobId }));
		return promise;
	}
	terminate() {
		this.worker.terminate();
	}
};
var finalizationRegistry = new FinalizationRegistry((worker) => {
	worker.terminate();
});
/**
* Pool for workers to decode chunks of the images.
*/
var Pool = class {
	/**
	* @constructor
	* @param {Number} [size] The size of the pool. Defaults to the number of CPUs
	*                      available. When this parameter is `null` or 0, then the
	*                      decoding will be done in the main thread.
	* @param {function(): Worker} [createWorker] A function that creates the decoder worker.
	* Defaults to a worker with all decoders that ship with geotiff.js. The `createWorker()`
	* function is expected to return a `Worker` compatible with Web Workers. For code that
	* runs in Node, [web-worker](https://www.npmjs.com/package/web-worker) is a good choice.
	*
	* A worker that uses a custom lzw decoder would look like this `my-custom-worker.js` file:
	* ```js
	* import { addDecoder, getDecoder } from 'geotiff';
	* addDecoder(5, () => import ('./my-custom-lzw').then((m) => m.default));
	* self.addEventListener('message', async (e) => {
	*   const { id, fileDirectory, buffer } = e.data;
	*   const decoder = await getDecoder(fileDirectory);
	*   const decoded = await decoder.decode(fileDirectory, buffer);
	*   self.postMessage({ decoded, id }, [decoded]);
	* });
	* ```
	* The way the above code is built into a worker by the `createWorker()` function
	* depends on the used bundler. For most bundlers, something like this will work:
	* ```js
	* function createWorker() {
	*   return new Worker(new URL('./my-custom-worker.js', import.meta.url));
	* }
	* ```
	*/
	constructor(size = defaultPoolSize, createWorker = create) {
		this.workerWrappers = null;
		if (size) this.workerWrappers = _asyncToGenerator(function* () {
			const workerWrappers = [];
			for (let i = 0; i < size; i++) {
				const worker = createWorker();
				const wrapper = new WorkerWrapper(worker);
				workerWrappers.push(wrapper);
				finalizationRegistry.register(wrapper, worker, wrapper);
			}
			return workerWrappers;
		})();
	}
	/**
	* @param {number} compression
	* @param {import('./compression/basedecoder.js').BaseDecoderParameters} decoderParameters
	* @returns {import('./geotiff.js').DecoderWorker}
	*/
	bindParameters(compression, decoderParameters) {
		var _this = this;
		return { decode: function() {
			var _ref = _asyncToGenerator(function* (buffer) {
				if (preferWorker(compression) && _this.workerWrappers) {
					const { decoded } = yield (yield _this.workerWrappers).reduce((a, b) => {
						return a.getJobCount() < b.getJobCount() ? a : b;
					}).submitJob({
						compression,
						decoderParameters,
						buffer
					}, [buffer]);
					return decoded;
				} else return (yield getDecoder(compression, decoderParameters)).decode(buffer);
			});
			return function decode(_x) {
				return _ref.apply(this, arguments);
			};
		}() };
	}
	destroy() {
		var _this2 = this;
		return _asyncToGenerator(function* () {
			if (_this2.workerWrappers) {
				(yield _this2.workerWrappers).forEach((worker) => {
					worker.terminate();
				});
				_this2.workerWrappers = null;
			}
		})();
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/source/httputils.js
var CRLFCRLF = "\r\n\r\n";
/**
* Shim for 'Object.fromEntries'
* @template T
* @param {Array<[string, T]>} items
* @return {Record<string, T>}
*/
function itemsToObject(items) {
	if (typeof Object.fromEntries !== "undefined") return Object.fromEntries(items);
	/** @type {Record<string, T>} */
	const obj = {};
	for (const [key, value] of items) obj[key.toLowerCase()] = value;
	return obj;
}
/**
* Parse HTTP headers from a given string.
* @param {string} text the text to parse the headers from
* @returns {Record<string, string>} the parsed headers with lowercase keys
*/
function parseHeaders(text) {
	return itemsToObject(text.split("\r\n").map((line) => {
		const kv = line.split(":").map((str) => str.trim());
		kv[0] = kv[0].toLowerCase();
		return kv;
	}));
}
/**
* Parse a 'Content-Type' header value to the content-type and parameters
* @param {string|undefined} rawContentType the raw string to parse from
* @returns {{type: string|null, params: Record<string, string>}}
*     the parsed content type with the fields: type and params
*/
function parseContentType(rawContentType) {
	if (!rawContentType) return {
		type: null,
		params: {}
	};
	const [type, ...rawParams] = rawContentType.split(";").map((s) => s.trim());
	return {
		type,
		params: itemsToObject(rawParams.map((param) => param.split("=")))
	};
}
/**
* Parse a 'Content-Range' header value to its start, end, and total parts
* @param {string|undefined} rawContentRange the raw string to parse from
* @returns {{start: number, end: number, total: number}} the parsed parts
*/
function parseContentRange(rawContentRange) {
	let start = NaN;
	let end = NaN;
	let total = NaN;
	if (rawContentRange) [, start, end, total] = (rawContentRange.match(/bytes (\d+)-(\d+)\/(\d+)/) || []).map(Number);
	return {
		start,
		end,
		total
	};
}
/**
* Parses a list of byteranges from the given 'multipart/byteranges' HTTP response.
* Each item in the list has the following properties:
* - headers: the HTTP headers
* - data: the sliced ArrayBuffer for that specific part
* - offset: the offset of the byterange within its originating file
* - length: the length of the byterange
* @param {ArrayBuffer} responseArrayBuffer the response to be parsed and split
* @param {string} boundary the boundary string used to split the sections
* @returns {Array<{headers: Record<string, string>, data: ArrayBuffer, offset: number, length: number, fileSize: number}>}
*     the parsed byteranges
*/
function parseByteRanges(responseArrayBuffer, boundary) {
	let offset = -1;
	const decoder = new TextDecoder("ascii");
	const out = [];
	const startBoundary = `--${boundary}`;
	const endBoundary = `${startBoundary}--`;
	for (let i = 0; i < 10; ++i) if (decoder.decode(new Uint8Array(responseArrayBuffer, i, startBoundary.length)) === startBoundary) offset = i;
	if (offset === -1) throw new Error("Could not find initial boundary");
	while (offset < responseArrayBuffer.byteLength) {
		const text = decoder.decode(new Uint8Array(responseArrayBuffer, offset, Math.min(startBoundary.length + 1024, responseArrayBuffer.byteLength - offset)));
		if (text.length === 0 || text.startsWith(endBoundary)) break;
		if (!text.startsWith(startBoundary)) throw new Error("Part does not start with boundary");
		const innerText = text.substr(startBoundary.length + 2);
		if (innerText.length === 0) break;
		const endOfHeaders = innerText.indexOf(CRLFCRLF);
		const headers = parseHeaders(innerText.substr(0, endOfHeaders));
		const { start, end, total } = parseContentRange(headers["content-range"]);
		const startOfData = offset + startBoundary.length + endOfHeaders + 4;
		const length = end + 1 - start;
		out.push({
			headers,
			data: responseArrayBuffer.slice(startOfData, startOfData + length),
			offset: start,
			length,
			fileSize: total
		});
		offset = startOfData + length + 4;
	}
	return out;
}
//#endregion
//#region node_modules/geotiff/dist-module/source/basesource.js
/**
* @typedef {Object} Slice
* @property {number} offset
* @property {number} length
*/
/** @typedef {Slice & {data: ArrayBufferLike}} SliceWithData */
var BaseSource = class {
	/**
	* @param {Array<Slice>} slices
	* @param {AbortSignal} [signal]
	* @returns {Promise<ArrayBufferLike[]>}
	*/
	fetch(slices, signal) {
		var _this = this;
		return _asyncToGenerator(function* () {
			return Promise.all(slices.map(function() {
				var _ref = _asyncToGenerator(function* (slice) {
					return (yield _this.fetchSlice(slice, signal)).data;
				});
				return function(_x) {
					return _ref.apply(this, arguments);
				};
			}()));
		})();
	}
	/**
	* @param {Slice} slice
	* @param {AbortSignal} [_signal]
	* @returns {Promise<SliceWithData>}
	*/
	fetchSlice(slice, _signal) {
		return _asyncToGenerator(function* () {
			throw new Error(`fetching of slice ${slice} not possible, not implemented`);
		})();
	}
	/**
	* Returns the filesize if already determined and null otherwise
	* @returns {number|null}
	*/
	get fileSize() {
		return null;
	}
	close() {
		return _asyncToGenerator(function* () {})();
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/utils.js
/**
* Promisified wrapper around 'setTimeout' to allow 'await'
* @param {number} [milliseconds]
* @returns {Promise<void>}
*/
function wait(_x) {
	return _wait.apply(this, arguments);
}
function _wait() {
	_wait = _asyncToGenerator(function* (milliseconds) {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	});
	return _wait.apply(this, arguments);
}
function zip(a, b) {
	const A = Array.isArray(a) ? a : Array.from(a);
	const B = Array.isArray(b) ? b : Array.from(b);
	return A.map((k, i) => [k, B[i]]);
}
var AbortError = class AbortError extends Error {
	constructor(...args) {
		super(...args);
		if (Error.captureStackTrace) Error.captureStackTrace(this, AbortError);
		this.name = "AbortError";
		this.signal = void 0;
	}
};
var CustomAggregateError = class extends Error {
	constructor(errors, message) {
		super(message);
		this.errors = errors;
		this.message = message;
		this.name = "AggregateError";
	}
};
var AggregateError = CustomAggregateError;
//#endregion
//#region node_modules/geotiff/dist-module/source/blockedsource.js
init_objectSpread2();
var Block = class {
	/**
	*
	* @param {number} offset
	* @param {number} length
	* @param {ArrayBuffer} data
	*/
	constructor(offset, length, data) {
		this.offset = offset;
		this.length = length;
		this.data = data;
	}
	/**
	* @returns {number} the top byte border
	*/
	get top() {
		return this.offset + this.length;
	}
};
var BlockGroup = class {
	/**
	*
	* @param {number} offset
	* @param {number} length
	* @param {number[]} blockIds
	*/
	constructor(offset, length, blockIds) {
		this.offset = offset;
		this.length = length;
		this.blockIds = blockIds;
	}
};
var BlockedSource = class extends BaseSource {
	/**
	*
	* @param {BaseSource} source The underlying source that shall be blocked and cached
	* @param {Object} options
	* @param {number} [options.blockSize=65536] Block size.
	* @param {number} [options.cacheSize=100] The number of blocks to cache.
	*/
	constructor(source, { blockSize = 65536, cacheSize = 100 } = {}) {
		super();
		this.source = source;
		this.blockSize = blockSize;
		this.blockCache = new QuickLRU({
			maxSize: cacheSize,
			onEviction: (blockId, block) => {
				this.evictedBlocks.set(blockId, block);
			}
		});
		/** @type {Map<number, Block>} */
		this.evictedBlocks = /* @__PURE__ */ new Map();
		this.blockRequests = /* @__PURE__ */ new Map();
		this.blockIdsToFetch = /* @__PURE__ */ new Set();
		this.abortedBlockIds = /* @__PURE__ */ new Set();
	}
	get fileSize() {
		return this.source.fileSize;
	}
	/**
	* @param {import("./basesource.js").Slice[]} slices
	* @param {AbortSignal} [signal]
	* @return {Promise<ArrayBuffer[]>}
	*/
	fetch(slices, signal) {
		var _this = this;
		return _asyncToGenerator(function* () {
			const blockRequests = [];
			const missingBlockIds = [];
			const allBlockIds = [];
			_this.evictedBlocks.clear();
			for (const { offset, length } of slices) {
				let top = offset + length;
				const { fileSize } = _this;
				if (fileSize !== null) top = Math.min(top, fileSize);
				const firstBlockOffset = Math.floor(offset / _this.blockSize) * _this.blockSize;
				for (let current = firstBlockOffset; current < top; current += _this.blockSize) {
					const blockId = Math.floor(current / _this.blockSize);
					if (!_this.blockCache.has(blockId) && !_this.blockRequests.has(blockId)) {
						_this.blockIdsToFetch.add(blockId);
						missingBlockIds.push(blockId);
					}
					if (_this.blockRequests.has(blockId)) blockRequests.push(_this.blockRequests.get(blockId));
					allBlockIds.push(blockId);
				}
			}
			yield wait();
			_this.fetchBlocks(signal);
			const missingRequests = [];
			for (const blockId of missingBlockIds) if (_this.blockRequests.has(blockId)) missingRequests.push(_this.blockRequests.get(blockId));
			yield Promise.allSettled(blockRequests);
			yield Promise.allSettled(missingRequests);
			const abortedBlockRequests = [];
			const abortedBlockIds = allBlockIds.filter((id) => _this.abortedBlockIds.has(id) || !_this.blockCache.has(id));
			abortedBlockIds.forEach((id) => _this.blockIdsToFetch.add(id));
			if (abortedBlockIds.length > 0 && signal && !signal.aborted) {
				_this.fetchBlocks();
				for (const blockId of abortedBlockIds) {
					const block = _this.blockRequests.get(blockId);
					if (!block) throw new Error(`Block ${blockId} is not in the block requests`);
					abortedBlockRequests.push(block);
				}
				yield Promise.allSettled(abortedBlockRequests);
			}
			if (signal && signal.aborted) throw new AbortError("Request was aborted");
			const blocks = allBlockIds.map((id) => _this.blockCache.get(id) || _this.evictedBlocks.get(id));
			const failedBlocks = blocks.filter((i) => !i);
			if (failedBlocks.length) throw new AggregateError(failedBlocks, "Request failed");
			const requiredBlocks = new Map(zip(allBlockIds, blocks));
			return _this.readSliceData(slices, requiredBlocks);
		})();
	}
	/**
	* @param {AbortSignal} [signal]
	*/
	fetchBlocks(signal) {
		var _this2 = this;
		if (this.blockIdsToFetch.size > 0) {
			const groups = this.groupBlocks(this.blockIdsToFetch);
			const groupRequests = groups.map(function() {
				var _ref = _asyncToGenerator(function* (group) {
					return _objectSpread2(_objectSpread2({}, group), yield _this2.source.fetchSlice(group, signal));
				});
				return function(_x) {
					return _ref.apply(this, arguments);
				};
			}());
			for (let groupIndex = 0; groupIndex < groups.length; ++groupIndex) {
				const group = groups[groupIndex];
				for (const blockId of group.blockIds) this.blockRequests.set(blockId, _asyncToGenerator(function* () {
					try {
						const response = (yield Promise.all(groupRequests))[groupIndex];
						const blockOffset = blockId * _this2.blockSize;
						const o = blockOffset - response.offset;
						const t = Math.min(o + _this2.blockSize, response.data.byteLength);
						const data = response.data.slice(o, t);
						const block = new Block(blockOffset, data.byteLength, data);
						_this2.blockCache.set(blockId, block);
						_this2.abortedBlockIds.delete(blockId);
					} catch (err) {
						if (err instanceof AbortError && err.name === "AbortError") {
							err.signal = signal;
							_this2.blockCache.delete(blockId);
							_this2.abortedBlockIds.add(blockId);
						} else throw err;
					} finally {
						_this2.blockRequests.delete(blockId);
					}
				})());
			}
			this.blockIdsToFetch.clear();
		}
	}
	/**
	*
	* @param {Set<number>} blockIds
	* @returns {BlockGroup[]}
	*/
	groupBlocks(blockIds) {
		const sortedBlockIds = Array.from(blockIds).sort((a, b) => a - b);
		if (sortedBlockIds.length === 0) return [];
		/** @type {number[]} */
		let current = [];
		let lastBlockId = null;
		const groups = [];
		for (const blockId of sortedBlockIds) if (lastBlockId === null || lastBlockId + 1 === blockId) {
			current.push(blockId);
			lastBlockId = blockId;
		} else {
			groups.push(new BlockGroup(current[0] * this.blockSize, current.length * this.blockSize, current));
			current = [blockId];
			lastBlockId = blockId;
		}
		groups.push(new BlockGroup(current[0] * this.blockSize, current.length * this.blockSize, current));
		return groups;
	}
	/**
	* @param {import("./basesource.js").Slice[]} slices
	* @param {Map<number, Block>} blocks
	* @returns {ArrayBuffer[]}
	*/
	readSliceData(slices, blocks) {
		return slices.map((slice) => {
			let top = slice.offset + slice.length;
			if (this.fileSize !== null) top = Math.min(this.fileSize, top);
			const blockIdLow = Math.floor(slice.offset / this.blockSize);
			const blockIdHigh = Math.floor((top - 1) / this.blockSize);
			const sliceData = new ArrayBuffer(slice.length);
			const sliceView = new Uint8Array(sliceData);
			for (let blockId = blockIdLow; blockId <= blockIdHigh; ++blockId) {
				const block = blocks.get(blockId);
				if (!block) continue;
				const delta = block.offset - slice.offset;
				const topDelta = block.top - top;
				let blockInnerOffset = 0;
				let rangeInnerOffset = 0;
				let usedBlockLength;
				if (delta < 0) blockInnerOffset = -delta;
				else if (delta > 0) rangeInnerOffset = delta;
				if (topDelta < 0) usedBlockLength = block.length - blockInnerOffset;
				else usedBlockLength = top - block.offset - blockInnerOffset;
				const blockView = new Uint8Array(block.data, blockInnerOffset, usedBlockLength);
				sliceView.set(blockView, rangeInnerOffset);
			}
			return sliceData;
		});
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/source/client/base.js
var BaseResponse = class {
	/**
	* Returns whether the response has an ok'ish status code
	*/
	get ok() {
		return this.status >= 200 && this.status <= 299;
	}
	/**
	* Returns the status code of the response
	* @returns {number} the status code
	*/
	get status() {
		throw new Error("not implemented");
	}
	/**
	* Returns the value of the specified header
	* @param {string} _headerName the header name
	* @returns {string|undefined} the header value
	*/
	getHeader(_headerName) {
		throw new Error("not implemented");
	}
	/**
	* @returns {Promise<ArrayBuffer>} the response data of the request
	*/
	getData() {
		return _asyncToGenerator(function* () {
			throw new Error("not implemented");
		})();
	}
};
var BaseClient = class {
	/** @param {string} url */
	constructor(url) {
		this.url = url;
	}
	/**
	* Send a request with the options
	* @param {RequestInit} [_options={}]
	* @returns {Promise<BaseResponse>}
	*/
	request(_options) {
		return _asyncToGenerator(function* () {
			throw new Error("request is not implemented");
		})();
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/source/client/fetch.js
var FetchResponse = class extends BaseResponse {
	/**
	* BaseResponse facade for fetch API Response
	* @param {Response} response
	*/
	constructor(response) {
		super();
		this.response = response;
	}
	get status() {
		return this.response.status;
	}
	/**
	* @param {string} name
	* @returns {string|undefined}
	*/
	getHeader(name) {
		return this.response.headers.get(name) || void 0;
	}
	getData() {
		var _this = this;
		return _asyncToGenerator(function* () {
			return _this.response.arrayBuffer ? yield _this.response.arrayBuffer() : (yield _this.response.buffer()).buffer;
		})();
	}
};
var FetchClient = class extends BaseClient {
	/**
	* @param {string} url
	* @param {RequestCredentials} [credentials]
	*/
	constructor(url, credentials) {
		super(url);
		this.credentials = credentials;
	}
	/**
	* @param {RequestInit} [options={}]
	* @returns {Promise<FetchResponse>}
	*/
	request() {
		var _this2 = this;
		return _asyncToGenerator(function* ({ headers, signal } = {}) {
			return new FetchResponse(yield fetch(_this2.url, {
				headers,
				credentials: _this2.credentials,
				signal
			}));
		}).apply(this, arguments);
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/source/client/xhr.js
var XHRResponse = class extends BaseResponse {
	/**
	* BaseResponse facade for XMLHttpRequest
	* @param {XMLHttpRequest} xhr
	* @param {ArrayBuffer} data
	*/
	constructor(xhr, data) {
		super();
		this.xhr = xhr;
		this.data = data;
	}
	get status() {
		return this.xhr.status;
	}
	/**
	* @param {string} name
	* @returns {string|undefined}
	*/
	getHeader(name) {
		return this.xhr.getResponseHeader(name) || void 0;
	}
	getData() {
		var _this = this;
		return _asyncToGenerator(function* () {
			return _this.data;
		})();
	}
};
var XHRClient = class extends BaseClient {
	/**
	* @param {Object<string, string>} headers
	* @param {AbortSignal} [signal]
	* @returns {Promise<XHRResponse>}
	*/
	constructRequest(headers, signal) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("GET", this.url);
			xhr.responseType = "arraybuffer";
			for (const [key, value] of Object.entries(headers)) xhr.setRequestHeader(key, value);
			xhr.onload = () => {
				const data = xhr.response;
				resolve(new XHRResponse(xhr, data));
			};
			xhr.onerror = reject;
			xhr.onabort = () => reject(new AbortError("Request aborted"));
			xhr.send();
			if (signal) {
				if (signal.aborted) xhr.abort();
				signal.addEventListener("abort", () => xhr.abort());
			}
		});
	}
	request() {
		var _this2 = this;
		return _asyncToGenerator(function* ({ headers = {}, signal = void 0 } = {}) {
			return yield _this2.constructRequest(headers, signal);
		}).apply(this, arguments);
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/source/client/http.js
var import___vite_browser_external = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {};
})))(), 1);
init_objectSpread2();
var HttpResponse = class extends BaseResponse {
	/**
	* BaseResponse facade for node HTTP/HTTPS API Response
	* @param {import('http').IncomingMessage} response
	* @param {Promise<ArrayBuffer>} dataPromise
	*/
	constructor(response, dataPromise) {
		super();
		this.response = response;
		this.dataPromise = dataPromise;
	}
	get status() {
		return this.response.statusCode;
	}
	/**
	* @param {string} name
	* @returns {string|undefined}
	*/
	getHeader(name) {
		const value = this.response.headers[name];
		return Array.isArray(value) ? value.join(", ") : value;
	}
	getData() {
		var _this = this;
		return _asyncToGenerator(function* () {
			return yield _this.dataPromise;
		})();
	}
};
var HttpClient = class extends BaseClient {
	/** @param {string} url */
	constructor(url) {
		super(url);
		this.parsedUrl = import___vite_browser_external.default.parse(this.url);
		this.httpApi = this.parsedUrl.protocol === "http:" ? import___vite_browser_external.default : import___vite_browser_external.default;
	}
	/**
	* @param {Object<string, string>} headers
	* @param {AbortSignal} [signal]
	* @returns {Promise<HttpResponse>}
	*/
	constructRequest(headers, signal) {
		return new Promise((resolve, reject) => {
			const request = this.httpApi.get(_objectSpread2(_objectSpread2({}, this.parsedUrl), {}, { headers }), (response) => {
				resolve(new HttpResponse(response, new Promise((resolveData) => {
					/** @type {Uint8Array[]} */
					const chunks = [];
					response.on("data", (chunk) => {
						chunks.push(chunk);
					});
					response.on("end", () => {
						const data = Buffer.concat(chunks).buffer;
						resolveData(data);
					});
					response.on("error", reject);
				})));
			});
			request.on("error", reject);
			if (signal) {
				if (signal.aborted) request.destroy(new AbortError("Request aborted"));
				signal.addEventListener("abort", () => request.destroy(new AbortError("Request aborted")));
			}
		});
	}
	request() {
		var _this2 = this;
		return _asyncToGenerator(function* ({ headers = {}, signal = void 0 } = {}) {
			return yield _this2.constructRequest(headers, signal);
		}).apply(this, arguments);
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/source/remote.js
init_objectSpread2();
init_objectWithoutProperties();
var _excluded = [
	"headers",
	"credentials",
	"maxRanges",
	"allowFullFile"
], _excluded2 = [
	"headers",
	"maxRanges",
	"allowFullFile"
], _excluded3 = [
	"headers",
	"maxRanges",
	"allowFullFile"
], _excluded4 = [
	"headers",
	"maxRanges",
	"allowFullFile"
], _excluded5 = ["forceXHR"];
/**
* @typedef {Object} RemoteSourceOptions
* @property {Record<string, string>} [headers={}] Additional headers to add to each request
* @property {number} [maxRanges=0] Maximum number of ranges to request in a single HTTP request. 0 means no multi-range requests.
* @property {boolean} [allowFullFile=false] Whether to allow full file responses when requesting ranges
* @property {boolean} [forceXHR=false] When the Fetch API would be used, force using XMLHttpRequest instead.
*/
/**
* @typedef {Object} BlockedSourceOptions
* @property {number} [blockSize] Block size for a BlockedSource. When not set, no blocking will be applied.
* @property {number} [cacheSize=100] The number of blocks to cache.
*/
var RemoteSource = class extends BaseSource {
	/**
	* @param {import("../geotiff.js").BaseClient} client
	* @param {RemoteSourceOptions} options
	*/
	constructor(client, { headers, maxRanges = 0, allowFullFile } = {}) {
		super();
		this.client = client;
		this.headers = headers;
		this.maxRanges = maxRanges;
		this.allowFullFile = allowFullFile;
		this._fileSize = null;
	}
	/**
	* @param {import('./basesource.js').Slice[]} slices
	* @param {AbortSignal} [signal]
	* @returns {Promise<ArrayBufferLike[]>}
	*/
	fetch(slices, signal) {
		var _this = this;
		return _asyncToGenerator(function* () {
			if (_this.maxRanges >= slices.length) return _this.fetchSlices(slices, signal).then((results) => results.map((r) => r.data));
			else if (_this.maxRanges > 0 && slices.length > 1) {}
			return Promise.all(slices.map(function() {
				var _ref = _asyncToGenerator(function* (slice) {
					return (yield _this.fetchSlice(slice, signal)).data;
				});
				return function(_x) {
					return _ref.apply(this, arguments);
				};
			}()));
		})();
	}
	/**
	* @param {Array<import('./basesource.js').Slice>} slices
	* @param {AbortSignal} [signal]
	* @returns {Promise<Array<import('./basesource.js').SliceWithData>>}
	*/
	fetchSlices(slices, signal) {
		var _this2 = this;
		return _asyncToGenerator(function* () {
			const response = yield _this2.client.request({
				headers: _objectSpread2(_objectSpread2({}, _this2.headers), {}, { Range: `bytes=${slices.map(({ offset, length }) => `${offset}-${offset + length - 1}`).join(",")}` }),
				signal
			});
			if (!response.ok) throw new Error("Error fetching data.");
			else if (response.status === 206) {
				const { type, params } = parseContentType(response.getHeader("content-type"));
				if (type === "multipart/byteranges") {
					const byteRanges = parseByteRanges(yield response.getData(), params.boundary);
					_this2._fileSize = byteRanges[0].fileSize || null;
					return byteRanges;
				}
				const data = yield response.getData();
				const { start, end, total } = parseContentRange(response.getHeader("content-range"));
				_this2._fileSize = total || null;
				/** @type {import('./basesource.js').SliceWithData[]} */
				const first = [{
					data,
					offset: start,
					length: end + 1 - start
				}];
				if (slices.length > 1) {
					const others = yield Promise.all(slices.slice(1).map((slice) => _this2.fetchSlice(slice, signal)));
					return first.concat(others);
				}
				return first;
			} else {
				if (!_this2.allowFullFile) throw new Error("Server responded with full file");
				const data = yield response.getData();
				_this2._fileSize = data.byteLength;
				return [{
					data,
					offset: 0,
					length: data.byteLength
				}];
			}
		})();
	}
	/**
	* @param {import('./basesource.js').Slice} slice
	* @param {AbortSignal} [signal]
	* @returns {Promise<import('./basesource.js').SliceWithData>}
	*/
	fetchSlice(slice, signal) {
		var _this3 = this;
		return _asyncToGenerator(function* () {
			const { offset, length } = slice;
			const response = yield _this3.client.request({
				headers: _objectSpread2(_objectSpread2({}, _this3.headers), {}, { Range: `bytes=${offset}-${offset + length - 1}` }),
				signal
			});
			if (!response.ok) throw new Error("Error fetching data.");
			else if (response.status === 206) {
				const data = yield response.getData();
				const { total } = parseContentRange(response.getHeader("content-range"));
				_this3._fileSize = total || null;
				return {
					data,
					offset,
					length
				};
			} else {
				if (!_this3.allowFullFile) throw new Error("Server responded with full file");
				const data = yield response.getData();
				_this3._fileSize = data.byteLength;
				return {
					data,
					offset: 0,
					length: data.byteLength
				};
			}
		})();
	}
	get fileSize() {
		return this._fileSize;
	}
};
/**
* @param {BaseSource} source
* @param {BlockedSourceOptions} blockedSourceOptions
* @returns {BaseSource}
*/
function maybeWrapInBlockedSource(source, { blockSize, cacheSize }) {
	if (blockSize === void 0) return source;
	return new BlockedSource(source, {
		blockSize,
		cacheSize
	});
}
/**
* @param {string} url
* @param {RemoteSourceOptions & BlockedSourceOptions & { credentials?: RequestCredentials}} [param1]
* @returns {BaseSource}
*/
function makeFetchSource(url, _ref2 = {}) {
	let { headers = {}, credentials, maxRanges = 0, allowFullFile = false } = _ref2, blockOptions = _objectWithoutProperties(_ref2, _excluded);
	return maybeWrapInBlockedSource(new RemoteSource(new FetchClient(url, credentials), {
		headers,
		maxRanges,
		allowFullFile
	}), blockOptions);
}
/**
* @param {string} url
* @param {RemoteSourceOptions & BlockedSourceOptions} [param1]
* @returns {BaseSource}
*/
function makeXHRSource(url, _ref3 = {}) {
	let { headers = {}, maxRanges = 0, allowFullFile = false } = _ref3, blockOptions = _objectWithoutProperties(_ref3, _excluded2);
	return maybeWrapInBlockedSource(new RemoteSource(new XHRClient(url), {
		headers,
		maxRanges,
		allowFullFile
	}), blockOptions);
}
/**
* @param {string} url
* @param {RemoteSourceOptions & BlockedSourceOptions} [param1]
* @returns {BaseSource}
*/
function makeHttpSource(url, _ref4 = {}) {
	let { headers = {}, maxRanges = 0, allowFullFile = false } = _ref4, blockOptions = _objectWithoutProperties(_ref4, _excluded3);
	return maybeWrapInBlockedSource(new RemoteSource(new HttpClient(url), {
		headers,
		maxRanges,
		allowFullFile
	}), blockOptions);
}
/**
* @param {import("../geotiff.js").BaseClient} client
* @param {RemoteSourceOptions & BlockedSourceOptions} [param1]
* @returns {BaseSource}
*/
function makeCustomSource(client, _ref5 = {}) {
	let { headers = {}, maxRanges = 0, allowFullFile = false } = _ref5, blockOptions = _objectWithoutProperties(_ref5, _excluded4);
	return maybeWrapInBlockedSource(new RemoteSource(client, {
		headers,
		maxRanges,
		allowFullFile
	}), blockOptions);
}
/**
*
* @param {string} url
* @param {RemoteSourceOptions & BlockedSourceOptions} options
*/
function makeRemoteSource(url, _ref6 = {}) {
	let { forceXHR = false } = _ref6, clientOptions = _objectWithoutProperties(_ref6, _excluded5);
	if (typeof fetch === "function" && !forceXHR) return makeFetchSource(url, clientOptions);
	if (typeof XMLHttpRequest !== "undefined") return makeXHRSource(url, clientOptions);
	return makeHttpSource(url, clientOptions);
}
//#endregion
//#region node_modules/geotiff/dist-module/source/filereader.js
var FileReaderSource = class extends BaseSource {
	/**
	* @param {Blob} file
	*/
	constructor(file) {
		super();
		this.file = file;
	}
	/**
	* @param {import('./basesource.js').Slice} slice
	* @param {AbortSignal} signal
	* @returns {Promise<import('./basesource.js').SliceWithData>}
	*/
	fetchSlice(slice, signal) {
		var _this = this;
		return _asyncToGenerator(function* () {
			return new Promise((resolve, reject) => {
				const blob = _this.file.slice(slice.offset, slice.offset + slice.length);
				const reader = new FileReader();
				reader.onload = () => resolve({
					data: reader.result,
					offset: slice.offset,
					length: slice.length
				});
				reader.onerror = reject;
				reader.onabort = reject;
				reader.readAsArrayBuffer(blob);
				if (signal) signal.addEventListener("abort", () => reader.abort());
			});
		})();
	}
};
/**
* Create a new source from a given file/blob.
* @param {Blob} file The file or blob to read from.
* @returns {FileReaderSource} The constructed source
*/
function makeFileReaderSource(file) {
	return new FileReaderSource(file);
}
//#endregion
//#region node_modules/geotiff/dist-module/imagefiledirectory.js
/**
* Allocates an appropriate TypedArray based on the TIFF field type.
* @param {number} fieldType - TIFF field type constant from fieldTypes
* @param {number} count - Number of elements to allocate
* @returns {import('./geotiff.js').TypedArray|Array<number>} The allocated typed array for the given field type
* @throws {RangeError} If the field type is invalid
*/
function getArrayForSamples(fieldType, count) {
	switch (fieldType) {
		case fieldTypes.BYTE:
		case fieldTypes.ASCII:
		case fieldTypes.UNDEFINED: return new Uint8Array(count);
		case fieldTypes.SBYTE: return new Int8Array(count);
		case fieldTypes.SHORT: return new Uint16Array(count);
		case fieldTypes.SSHORT: return new Int16Array(count);
		case fieldTypes.LONG:
		case fieldTypes.IFD: return new Uint32Array(count);
		case fieldTypes.SLONG: return new Int32Array(count);
		case fieldTypes.LONG8:
		case fieldTypes.IFD8: return new Array(count);
		case fieldTypes.SLONG8: return new Array(count);
		case fieldTypes.RATIONAL: return new Uint32Array(count * 2);
		case fieldTypes.SRATIONAL: return new Int32Array(count * 2);
		case fieldTypes.FLOAT: return new Float32Array(count);
		case fieldTypes.DOUBLE: return new Float64Array(count);
		default: throw new RangeError(`Invalid field type: ${fieldType}`);
	}
}
/**
* Returns the appropriate DataSlice read method for a given field type.
* @param {DataSlice} dataSlice - The DataSlice instance to get the reader from
* @param {number} fieldType - TIFF field type constant from fieldTypes
* @returns {Function} The bound read method (e.g., readUint16, readFloat32)
* @throws {RangeError} If the field type is invalid
*/
function getDataSliceReader(dataSlice, fieldType) {
	switch (fieldType) {
		case fieldTypes.BYTE:
		case fieldTypes.ASCII:
		case fieldTypes.UNDEFINED: return dataSlice.readUint8;
		case fieldTypes.SBYTE: return dataSlice.readInt8;
		case fieldTypes.SHORT: return dataSlice.readUint16;
		case fieldTypes.SSHORT: return dataSlice.readInt16;
		case fieldTypes.LONG:
		case fieldTypes.IFD: return dataSlice.readUint32;
		case fieldTypes.SLONG: return dataSlice.readInt32;
		case fieldTypes.LONG8:
		case fieldTypes.IFD8: return dataSlice.readUint64;
		case fieldTypes.SLONG8: return dataSlice.readInt64;
		case fieldTypes.RATIONAL: return dataSlice.readUint32;
		case fieldTypes.SRATIONAL: return dataSlice.readInt32;
		case fieldTypes.FLOAT: return dataSlice.readFloat32;
		case fieldTypes.DOUBLE: return dataSlice.readFloat64;
		default: throw new RangeError(`Invalid field type: ${fieldType}`);
	}
}
/**
* @overload
* @param {import('./geotiff.js').TypedArray|Array<number>|null} outValues - Optional pre-allocated output array
* @param {Function} readMethod - DataView read method (e.g., getUint16)
* @param {DataSlice} dataSlice - Source data slice
* @param {number} fieldType - TIFF field type constant
* @param {number} count - Number of values to read
* @param {number} offset - Byte offset to start reading
* @param {true} isArray - Whether to always return an array (vs single value)
* @returns {import('./geotiff.js').TypedArray|Array<number>} The decoded value(s)
*/
/**
* @overload
* @param {import('./geotiff.js').TypedArray|Array<number>|null} outValues - Optional pre-allocated output array
* @param {Function} readMethod - DataView read method (e.g., getUint16)
* @param {DataSlice} dataSlice - Source data slice
* @param {number} fieldType - TIFF field type constant
* @param {number} count - Number of values to read
* @param {number} offset - Byte offset to start reading
* @param {boolean} [isArray] - Whether to always return an array (vs single value)
* @returns {import('./geotiff.js').TypedArray|Array<number>|string|number} The decoded value(s)
*/
/**
* Reads field values from a DataSlice.
* @param {import('./geotiff.js').TypedArray|Array<number>|null} outValues - Optional pre-allocated output array
* @param {Function} readMethod - DataView read method (e.g., getUint16)
* @param {DataSlice} dataSlice - Source data slice
* @param {import('./globals.js').FieldType} fieldType - TIFF field type constant
* @param {number} count - Number of values to read
* @param {number} offset - Byte offset to start reading
* @param {boolean} [isArray] - Whether to always return an array (vs single value)
* @returns {import('./geotiff.js').TypedArray|Array<number>|string|number} The decoded value(s)
*/
function getValues$1(outValues = null, readMethod, dataSlice, fieldType, count, offset, isArray = false) {
	const fieldTypeLength = getFieldTypeSize(fieldType);
	const values = outValues || getArrayForSamples(fieldType, count);
	const isRational = fieldType === fieldTypes.RATIONAL || fieldType === fieldTypes.SRATIONAL;
	if (!isRational) for (let i = 0; i < count; ++i) values[i] = readMethod.call(dataSlice, offset + i * fieldTypeLength);
	else for (let i = 0; i < count; i += 2) {
		values[i] = readMethod.call(dataSlice, offset + i * fieldTypeLength);
		values[i + 1] = readMethod.call(dataSlice, offset + (i * fieldTypeLength + 4));
	}
	if (fieldType === fieldTypes.ASCII) return new TextDecoder("utf-8").decode(values);
	if (count === 1 && !isArray && !isRational) return values[0];
	return values;
}
/**
* Lazily-loaded array for large TIFF field values that are fetched on-demand.
* Supports loading individual indices or the entire array. Uses a bitmap to track
* which values have been loaded to avoid redundant fetches.
*/
var DeferredArray = class {
	/**
	* Creates a DeferredArray for lazy-loading of large TIFF field arrays.
	* @param {import("./source/basesource.js").BaseSource} source - Data source for fetching
	* @param {number} arrayOffset - Byte offset where the array data starts
	* @param {boolean} littleEndian - Endianness of the data
	* @param {import('./globals.js').FieldType} fieldType - TIFF field type constant
	* @param {number} length - Number of elements in the array
	*/
	constructor(source, arrayOffset, littleEndian, fieldType, length) {
		this.source = source;
		this.arrayOffset = arrayOffset;
		this.littleEndian = littleEndian;
		this.fieldType = fieldType;
		this.length = length;
		this.data = getArrayForSamples(fieldType, length);
		this.itemSize = getFieldTypeSize(fieldType);
		this.maskBitmap = new Uint8Array(Math.ceil(length / 8));
		this.fetchIndexPromises = /* @__PURE__ */ new Map();
		this.fullFetchPromise = null;
	}
	/**
	* Loads all values in the deferred array at once.
	* Subsequent calls return the same promise to avoid redundant fetches.
	* @returns {Promise<import('./geotiff.js').TypedArray|Array<number>>} Promise resolving to the fully loaded array
	*/
	loadAll() {
		var _this = this;
		return _asyncToGenerator(function* () {
			if (!_this.fullFetchPromise) _this.fullFetchPromise = _this.source.fetch([{
				offset: _this.arrayOffset,
				length: _this.itemSize * _this.length
			}]).then((data) => {
				const dataSlice = new DataSlice(data[0], _this.arrayOffset, true, false);
				const result = getValues$1(_this.data, getDataSliceReader(dataSlice, _this.fieldType), dataSlice, _this.fieldType, _this.length, _this.arrayOffset, true);
				_this.maskBitmap.fill(255);
				_this.fetchIndexPromises.clear();
				return result;
			});
			return _this.fullFetchPromise;
		})();
	}
	/**
	* Loads and returns a single value at the specified index.
	* If the value is already loaded, returns it immediately. Otherwise, fetches it
	* from the source. Multiple calls for the same index reuse the same promise.
	* @param {number} index - Zero-based index of the value to load
	* @returns {Promise<number|bigint>} Promise resolving to the value at the given index
	* @throws {RangeError} If index is out of bounds
	*/
	get(index) {
		var _this2 = this;
		return _asyncToGenerator(function* () {
			if (index < 0 || index >= _this2.data.length) throw new RangeError(`Index ${index} out of bounds for length ${_this2.data.length}`);
			const byteIndex = Math.floor(index / 8);
			const bitMask = 1 << index % 8;
			const offset = _this2.arrayOffset + index * _this2.itemSize;
			if ((_this2.maskBitmap[byteIndex] & bitMask) === 0) {
				if (!_this2.fetchIndexPromises.has(index)) {
					const fetchPromise = _this2.source.fetch([{
						offset,
						length: _this2.itemSize
					}]).then((data) => {
						const dataSlice = new DataSlice(data[0], _this2.arrayOffset + index * _this2.itemSize, true, false);
						const value = getDataSliceReader(dataSlice, _this2.fieldType).call(dataSlice, offset);
						_this2.data[index] = value;
						_this2.maskBitmap[byteIndex] |= bitMask;
						_this2.fetchIndexPromises.delete(index);
						return value;
					});
					_this2.fetchIndexPromises.set(index, fetchPromise);
				}
				return _this2.fetchIndexPromises.get(index);
			}
			return _this2.data[index];
		})();
	}
};
var ImageFileDirectory = class {
	/**
	* Create an ImageFileDirectory.
	* @param {Map<string|number, number|string|Array<number|string>>} actualizedFields the file directory,
	* mapping tag names to values
	* @param {Map<string|number, Function>} deferredFields the deferred fields, mapping tag names to async functions
	* @param {Map<string|number, DeferredArray>} deferredArrays the deferred arrays, mapping tag names to
	* DeferredArray objects
	* @param {number} nextIFDByteOffset the byte offset to the next IFD
	*/
	constructor(actualizedFields, deferredFields, deferredArrays, nextIFDByteOffset) {
		this.actualizedFields = actualizedFields;
		this.deferredFields = deferredFields;
		this.deferredFieldsBeingResolved = /* @__PURE__ */ new Map();
		this.deferredArrays = deferredArrays;
		this.nextIFDByteOffset = nextIFDByteOffset;
	}
	/**
	* @param {import('./globals.js').TagName|number} tagIdentifier The field tag ID or name
	* @returns {boolean} whether the field exists (actualized or deferred)
	*/
	hasTag(tagIdentifier) {
		const tag = resolveTag(tagIdentifier);
		return this.actualizedFields.has(tag) || this.deferredFields.has(tag) || this.deferredArrays.has(tag);
	}
	/**
	* Synchronously retrieves the value for a given tag. If it is deferred, an error is thrown.
	* @template {import('./globals.js').EagerTagName | import('./globals.js').EagerTag} [T=any]
	* @param {T} tagIdentifier The field tag ID or name
	* @returns {T extends import('./globals.js').TagName ? (import('./globals.js').TagValue<T> | undefined) : any}
	* the field value,
	* or undefined if it does not exist
	* @throws {Error} If the tag is deferred and requires asynchronous loading
	*/
	getValue(tagIdentifier) {
		const tag = resolveTag(tagIdentifier);
		if (this.deferredFields.has(tag) || this.deferredArrays.has(tag)) {
			const tagDef = tagDefinitions[tag];
			const tagName = (tagDef === null || tagDef === void 0 ? void 0 : tagDef.name) || `Tag${tag}`;
			throw new Error(`Field '${tagName}' (${tag}) is deferred. Use loadValue() to load it asynchronously.`);
		}
		if (!this.actualizedFields.has(tag)) return;
		return this.actualizedFields.get(tag);
	}
	/**
	* Retrieves the value for a given tag. If it is deferred, it will be loaded first.
	* @template {import('./globals.js').TagName} [T=any]
	* @param {T|number} tagIdentifier The field tag ID or name
	* @returns {Promise<T extends import('./globals.js').TagName ? (import('./globals.js').TagValue<T> | undefined) : any>}
	*   the field value, or undefined if it does not exist
	*/
	loadValue(tagIdentifier) {
		var _this3 = this;
		return _asyncToGenerator(function* () {
			const tag = resolveTag(tagIdentifier);
			if (_this3.actualizedFields.has(tag)) return _this3.actualizedFields.get(tag);
			if (_this3.deferredFieldsBeingResolved.has(tag)) return _this3.deferredFieldsBeingResolved.get(tag);
			const loaderFn = _this3.deferredFields.get(tag);
			if (loaderFn) {
				_this3.deferredFields.delete(tag);
				const valuePromise = _asyncToGenerator(function* () {
					try {
						const value = yield loaderFn();
						_this3.actualizedFields.set(tag, value);
						return value;
					} finally {
						_this3.deferredFieldsBeingResolved.delete(tag);
					}
				})();
				_this3.deferredFieldsBeingResolved.set(tag, valuePromise);
				return valuePromise;
			}
			const deferredArray = _this3.deferredArrays.get(tag);
			if (deferredArray) return deferredArray.loadAll();
		})();
	}
	/**
	* Retrieves the value at a given index for a tag that is an array. If it is deferred, it will be loaded first.
	* @param {number|string} tagIdentifier The field tag ID or name
	* @param {number} index The index within the array
	* @returns {Promise<number|string|bigint|undefined>} the field value at the given index, or undefined if it does not exist
	*/
	loadValueIndexed(tagIdentifier, index) {
		var _this4 = this;
		return _asyncToGenerator(function* () {
			const tag = resolveTag(tagIdentifier);
			if (_this4.actualizedFields.has(tag)) return _this4.actualizedFields.get(tag)[index];
			else if (_this4.deferredArrays.has(tag)) return _this4.deferredArrays.get(tag).get(index);
			else if (_this4.hasTag(tag)) {
				const value = yield _this4.loadValue(tag);
				if (value && typeof value !== "number") return value[index];
			}
		})();
	}
	/**
	* Parses the GeoTIFF GeoKeyDirectory tag into a structured object.
	* The GeoKeyDirectory is a special TIFF tag that contains geographic metadata
	* in a key-value format as defined by the GeoTIFF specification.
	* @returns {Partial<Record<import('./globals.js').GeoKeyName, *>>|null} Parsed geo key directory
	*     mapping key names to values, or null if not present
	* @throws {Error} If a referenced geo key value cannot be retrieved
	*/
	parseGeoKeyDirectory() {
		const rawGeoKeyDirectory = this.getValue("GeoKeyDirectory");
		if (!rawGeoKeyDirectory) return null;
		/** @type {Partial<Record<import('./globals.js').GeoKeyName, *>>} */
		const geoKeyDirectory = {};
		for (let i = 4; i <= rawGeoKeyDirectory[3] * 4; i += 4) {
			const key = geoKeyNames[rawGeoKeyDirectory[i]];
			const location = rawGeoKeyDirectory[i + 1] || null;
			const count = rawGeoKeyDirectory[i + 2];
			const offset = rawGeoKeyDirectory[i + 3];
			let value = null;
			if (!location) value = offset;
			else {
				value = this.getValue(location);
				if (typeof value === "undefined" || value === null) throw new Error(`Could not get value of geoKey '${key}'.`);
				else if (typeof value === "string") value = value.substring(offset, offset + count - 1);
				else if (value.subarray) {
					value = value.subarray(offset, offset + count);
					if (count === 1) value = value[0];
				}
			}
			geoKeyDirectory[key] = value;
		}
		return geoKeyDirectory;
	}
	toObject() {
		/** @type {Record<string, unknown>} */
		const obj = {};
		for (const [tag, value] of this.actualizedFields.entries()) {
			const tagDefinition = typeof tag === "number" ? tagDefinitions[tag] : void 0;
			const tagName = tagDefinition ? tagDefinition.name : `Tag${tag}`;
			obj[tagName] = value;
		}
		return obj;
	}
};
/**
* Parser for Image File Directories (IFDs).
*/
var ImageFileDirectoryParser = class {
	/**
	* @param {import("./source/basesource.js").BaseSource} source the data source to fetch from
	* @param {boolean} littleEndian the endianness of the file
	* @param {boolean} bigTiff whether the file is a BigTIFF
	* @param {boolean} [eager=false] whether to eagerly fetch deferred fields.
	*                                 When false (default), tags are loaded lazily on-demand.
	*                                 When true, all tags are loaded immediately during parsing.
	*/
	constructor(source, littleEndian, bigTiff, eager = false) {
		this.source = source;
		this.littleEndian = littleEndian;
		this.bigTiff = bigTiff;
		this.eager = eager;
	}
	/**
	* Helper function to retrieve a DataSlice from the source.
	* @param {number} offset Byte offset of the slice
	* @param {number} [length] Length of the slice
	* @returns {Promise<DataSlice>}
	*/
	getSlice(offset, length) {
		var _this5 = this;
		return _asyncToGenerator(function* () {
			const fallbackLength = _this5.bigTiff ? 4048 : 1024;
			return new DataSlice((yield _this5.source.fetch([{
				offset,
				length: typeof length !== "undefined" ? length : fallbackLength
			}]))[0], offset, _this5.littleEndian, _this5.bigTiff);
		})();
	}
	/**
	* Instructs to parse an image file directory at the given file offset.
	* As there is no way to ensure that a location is indeed the start of an IFD,
	* this function must be called with caution (e.g only using the IFD offsets from
	* the headers or other IFDs).
	* @param {number} offset the offset to parse the IFD at
	* @returns {Promise<ImageFileDirectory>} the parsed IFD
	*/
	parseFileDirectoryAt(offset) {
		var _this6 = this;
		return _asyncToGenerator(function* () {
			const entrySize = _this6.bigTiff ? 20 : 12;
			const offsetSize = _this6.bigTiff ? 8 : 2;
			let dataSlice = yield _this6.getSlice(offset);
			const numDirEntries = _this6.bigTiff ? dataSlice.readUint64(offset) : dataSlice.readUint16(offset);
			const byteSize = numDirEntries * (entrySize + (_this6.bigTiff ? 16 : 6));
			if (!dataSlice.covers(offset, byteSize)) dataSlice = yield _this6.getSlice(offset, byteSize);
			const actualizedFields = /* @__PURE__ */ new Map();
			const deferredFields = /* @__PURE__ */ new Map();
			const deferredArrays = /* @__PURE__ */ new Map();
			let i = offset + (_this6.bigTiff ? 8 : 2);
			for (let entryCount = 0; entryCount < numDirEntries; i += entrySize, ++entryCount) {
				var _tagDefinitions$field, _tagDefinitions$field2;
				const fieldTag = dataSlice.readUint16(i);
				const fieldType = dataSlice.readUint16(i + 2);
				const typeCount = _this6.bigTiff ? dataSlice.readUint64(i + 4) : dataSlice.readUint32(i + 4);
				let fieldValues = null;
				let deferredFieldValues = null;
				let deferredArray = null;
				const fieldTypeLength = getFieldTypeSize(fieldType);
				const valueOffset = i + (_this6.bigTiff ? 12 : 8);
				const isArray = (_tagDefinitions$field = tagDefinitions[fieldTag]) === null || _tagDefinitions$field === void 0 ? void 0 : _tagDefinitions$field.isArray;
				const eager = ((_tagDefinitions$field2 = tagDefinitions[fieldTag]) === null || _tagDefinitions$field2 === void 0 ? void 0 : _tagDefinitions$field2.eager) || _this6.eager;
				if (fieldTypeLength * typeCount <= (_this6.bigTiff ? 8 : 4)) fieldValues = getValues$1(getArrayForSamples(fieldType, typeCount), getDataSliceReader(dataSlice, fieldType), dataSlice, fieldType, typeCount, valueOffset, isArray);
				else {
					const actualOffset = dataSlice.readOffset(valueOffset);
					const length = getFieldTypeSize(fieldType) * typeCount;
					if (dataSlice.covers(actualOffset, length)) fieldValues = getValues$1(getArrayForSamples(fieldType, typeCount), getDataSliceReader(dataSlice, fieldType), dataSlice, fieldType, typeCount, actualOffset, isArray);
					else if (eager) {
						const fieldDataSlice = yield _this6.getSlice(actualOffset, length);
						fieldValues = getValues$1(getArrayForSamples(fieldType, typeCount), getDataSliceReader(fieldDataSlice, fieldType), fieldDataSlice, fieldType, typeCount, actualOffset, isArray);
					} else if (isArray) deferredArray = new DeferredArray(_this6.source, actualOffset, _this6.littleEndian, fieldType, typeCount);
					else deferredFieldValues = _asyncToGenerator(function* () {
						const fieldDataSlice = yield _this6.getSlice(actualOffset, length);
						return getValues$1(getArrayForSamples(fieldType, typeCount), getDataSliceReader(fieldDataSlice, fieldType), fieldDataSlice, fieldType, typeCount, actualOffset, isArray);
					});
				}
				if (fieldValues !== null) actualizedFields.set(fieldTag, fieldValues);
				else if (deferredFieldValues !== null) deferredFields.set(fieldTag, deferredFieldValues);
				else if (deferredArray !== null) deferredArrays.set(fieldTag, deferredArray);
			}
			return new ImageFileDirectory(actualizedFields, deferredFields, deferredArrays, dataSlice.readOffset(offset + offsetSize + entrySize * numDirEntries));
		})();
	}
};
//#endregion
//#region node_modules/geotiff/dist-module/geotiff.js
/** @module geotiff */
init_objectSpread2();
/**
* @typedef {Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array}
* TypedArray
*/
/**
* @typedef {{ height:number, width: number }} Dimensions
*/
/**
* The autogenerated docs are a little confusing here. The effective type is:
*
* `TypedArray & { height: number; width: number}`
* @typedef {TypedArray & Dimensions} TypedArrayWithDimensions
*/
/**
* The autogenerated docs are a little confusing here. The effective type is:
*
* `TypedArray[] & { height: number; width: number}`
* @typedef {TypedArray[] & Dimensions} TypedArrayArrayWithDimensions
*/
/**
* @typedef {Object} GeotiffWriterMetadata
* @property {number | number[]} [ImageWidth]
* @property {number | number[]} [ImageLength]
* @property {number} [width]
* @property {number} [height]
* @property {number | number[]} [BitsPerSample]
* @property {number | number[]} [Compression]
* @property {number | number[]} [PlanarConfiguration]
* @property {number | number[]} [ExtraSamples]
* @property {number | number[]} [PhotometricInterpretation]
* @property {number | number[]} [SamplesPerPixel]
* @property {number | number[]} [StripByteCounts]
* @property {number[]} [ModelPixelScale]
* @property {number[]} [ModelTransformation]
* @property {number[]} [ModelTiepoint]
* @property {number[]} [GeoKeyDirectory]
* @property {string} [GeoAsciiParams]
* @property {number[]} [GeoDoubleParams]
* @property {number | number[]} [Orientation]
* @property {number | number[]} [ResolutionUnit]
* @property {number | number[]} [XPosition]
* @property {number | number[]} [YPosition]
* @property {number | number[]} [RowsPerStrip]
* @property {number[]} [SampleFormat]
* @property {number | number[]} [TileWidth]
* @property {number | number[]} [TileLength]
* @property {number[]} [TileOffsets]
* @property {number[]} [TileByteCounts]
* @property {string} [GDAL_NODATA]
* @property {number | number[]} [GeographicTypeGeoKey]
* @property {number | number[]} [ProjectedCSTypeGeoKey]
* @property {string} [GeogCitationGeoKey]
* @property {string} [GTCitationGeoKey]
* @property {number | number[]} [GTModelTypeGeoKey]
* @property {number | number[]} [GTRasterTypeGeoKey]
*/
/**
*  The autogenerated docs are a little confusing here. The effective type is:
*
* `(TypedArray | TypedArray[]) & { height: number; width: number}`
* @typedef {TypedArrayWithDimensions | TypedArrayArrayWithDimensions} ReadRasterResult
*/
/**
* @typedef {Object} DecoderWorker
* Use the {@link Pool.bindParameters} method to get a decoder worker for
* a specific compression and its parameters.
*
* @property {(buffer: ArrayBufferLike) => Promise<ArrayBufferLike>} decode
*   A function that takes a compressed buffer and returns a promise resolving to the decoded buffer.
*/
/**
* @typedef {Object} ReadRastersOptions
* @property {Array<number>} [window] the subset to read data from in pixels. Whole window if not specified.
* @property {Array<number>} [samples] the selection of samples to read from. Default is all samples.
*     All samples if not specified.
* @property {Pool|null} [pool=null] The optional decoder pool to use.
* @property {number} [width] The desired width of the output. When the width is not the
*                                 same as the images, resampling will be performed.
* @property {number} [height] The desired height of the output. When the width is not the
*                                  same as the images, resampling will be performed.
* @property {string} [resampleMethod='nearest'] The desired resampling method.
* @property {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
*                                       to be aborted
* @property {number|number[]} [fillValue] The value to use for parts of the image
*     outside of the images extent. When multiple samples are requested and `interleave` is
*     `false`, an array of fill values can be passed.
* @property {boolean|true|false} [interleave] whether the data shall be read
*     in one single array or separate arrays.
*/
/**
* @typedef {Object} ReadRGBOptions
* @property {Array<number>} [window] the subset to read data from in pixels. Whole window if not specified.
* @property {Pool|null} [pool=null] The optional decoder pool to use.
* @property {number} [width] The desired width of the output. When the width is no the
*                                 same as the images, resampling will be performed.
* @property {number} [height] The desired height of the output. When the width is no the
*                                  same as the images, resampling will be performed.
* @property {string} [resampleMethod='nearest'] The desired resampling method.
* @property {boolean} [enableAlpha=false] Enable reading alpha channel if present.
* @property {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
*                                       to be aborted
* @property {boolean|true|false} [interleave] whether the data shall be read
*     in one single array or separate arrays.
*/
/**
* @typedef {Object} SourceOptions
* @property {Record<string, string>} [headers={}] Additional headers to add to each request
* @property {number} [maxRanges=0] Maximum number of ranges to request in a single HTTP request. 0 means no multi-range requests.
* @property {boolean} [allowFullFile=false] Whether to allow full file responses when requesting ranges
* @property {boolean} [forceXHR=false] When the Fetch API would be used, force using XMLHttpRequest instead.
* @property {number} [blockSize=65536] Block size for a BlockedSource. Set to `null` to disable blocking and caching.
* @property {number} [cacheSize=100] The number of blocks to cache.
*/
/**
* @overload
* @param {DataSlice} dataSlice
* @param {0x0002} fieldType
* @param {number} count
* @param {number} offset
* @returns {string}
*/
/**
* @param {DataSlice} dataSlice
* @param {import('./globals.js').FieldType} fieldType
* @param {number} count
* @param {number} offset
* @returns {TypedArray|Array<number>|string}
*/
function getValues(dataSlice, fieldType, count, offset) {
	/** @type {TypedArray|Array<number>|null} */
	let values = null;
	let readMethod = null;
	const fieldTypeLength = getFieldTypeSize(fieldType);
	switch (fieldType) {
		case fieldTypes.BYTE:
		case fieldTypes.ASCII:
		case fieldTypes.UNDEFINED:
			values = new Uint8Array(count);
			readMethod = dataSlice.readUint8;
			break;
		case fieldTypes.SBYTE:
			values = new Int8Array(count);
			readMethod = dataSlice.readInt8;
			break;
		case fieldTypes.SHORT:
			values = new Uint16Array(count);
			readMethod = dataSlice.readUint16;
			break;
		case fieldTypes.SSHORT:
			values = new Int16Array(count);
			readMethod = dataSlice.readInt16;
			break;
		case fieldTypes.LONG:
		case fieldTypes.IFD:
			values = new Uint32Array(count);
			readMethod = dataSlice.readUint32;
			break;
		case fieldTypes.SLONG:
			values = new Int32Array(count);
			readMethod = dataSlice.readInt32;
			break;
		case fieldTypes.LONG8:
		case fieldTypes.IFD8:
			values = new Array(count);
			readMethod = dataSlice.readUint64;
			break;
		case fieldTypes.SLONG8:
			values = new Array(count);
			readMethod = dataSlice.readInt64;
			break;
		case fieldTypes.RATIONAL:
			values = new Uint32Array(count * 2);
			readMethod = dataSlice.readUint32;
			break;
		case fieldTypes.SRATIONAL:
			values = new Int32Array(count * 2);
			readMethod = dataSlice.readInt32;
			break;
		case fieldTypes.FLOAT:
			values = new Float32Array(count);
			readMethod = dataSlice.readFloat32;
			break;
		case fieldTypes.DOUBLE:
			values = new Float64Array(count);
			readMethod = dataSlice.readFloat64;
			break;
		default:
	}
	if (values === null || readMethod === null) throw new RangeError(`Invalid field type: ${fieldType}`);
	if (!(fieldType === fieldTypes.RATIONAL || fieldType === fieldTypes.SRATIONAL)) for (let i = 0; i < count; ++i) values[i] = readMethod.call(dataSlice, offset + i * fieldTypeLength);
	else for (let i = 0; i < count; i += 2) {
		values[i] = readMethod.call(dataSlice, offset + i * fieldTypeLength);
		values[i + 1] = readMethod.call(dataSlice, offset + (i * fieldTypeLength + 4));
	}
	if (fieldType === fieldTypes.ASCII) return new TextDecoder("utf-8").decode(values);
	return values;
}
/**
* Error class for cases when an IFD index was requested, that does not exist
* in the file.
*/
var GeoTIFFImageIndexError = class extends Error {
	/**
	* @param {number} index
	*/
	constructor(index) {
		super(`No image at index ${index}`);
		this.index = index;
	}
};
var GeoTIFFBase = class {
	/**
	* @param {number} [_index=0] the index of the image to return.
	* @returns {Promise<GeoTIFFImage>} the image at the given index
	*/
	getImage(_index = 0) {
		return _asyncToGenerator(function* () {
			throw new Error("Not implemented");
		})();
	}
	/**
	* @returns {Promise<number>} the number of internal subfile images
	*/
	getImageCount() {
		return _asyncToGenerator(function* () {
			throw new Error("Not implemented");
		})();
	}
	/**
	* @typedef {Object} ReadRastersWindowOptions
	* @property {number} [resX] desired Y resolution (world units per pixel)
	* @property {number} [resY] desired X resolution (world units per pixel)
	* @property {Array<number>} [bbox] the subset to read data from in
	*     geographical coordinates. Whole image if not specified.
	*/
	/**
	* (experimental) Reads raster data from the best fitting image. This function uses
	* the image with the lowest resolution that is still a higher resolution than the
	* requested resolution.
	* When specified, the `bbox` option is translated to the `window` option and the
	* `resX` and `resY` to `width` and `height` respectively.
	* Then, the [readRasters]{@link GeoTIFFImage#readRasters} method of the selected
	* image is called and the result returned.
	* @see GeoTIFFImage.readRasters
	* @param {ReadRastersOptions & ReadRastersWindowOptions} options optional parameters
	* @returns {Promise<ReadRasterResult>} the decoded array(s), with `height` and `width`, as a promise
	*/
	readRasters() {
		var _this = this;
		return _asyncToGenerator(function* (options = {}) {
			const { window: imageWindow, width, height } = options;
			let { resX, resY, bbox } = options;
			const firstImage = yield _this.getImage();
			let usedImage = firstImage;
			const imageCount = yield _this.getImageCount();
			const imgBBox = firstImage.getBoundingBox();
			if (imageWindow && bbox) throw new Error("Both \"bbox\" and \"window\" passed.");
			if (width || height) {
				if (imageWindow) {
					const [oX, oY] = firstImage.getOrigin();
					const [rX, rY] = firstImage.getResolution();
					bbox = [
						oX + imageWindow[0] * rX,
						oY + imageWindow[1] * rY,
						oX + imageWindow[2] * rX,
						oY + imageWindow[3] * rY
					];
				}
				const usedBBox = bbox || imgBBox;
				if (width) {
					if (resX) throw new Error("Both width and resX passed");
					resX = (usedBBox[2] - usedBBox[0]) / width;
				}
				if (height) {
					if (resY) throw new Error("Both width and resY passed");
					resY = (usedBBox[3] - usedBBox[1]) / height;
				}
			}
			if (resX || resY) {
				const allImages = [];
				for (let i = 0; i < imageCount; ++i) {
					const image = yield _this.getImage(i);
					const subfileType = image.fileDirectory.getValue("SubfileType");
					const newSubfileType = image.fileDirectory.getValue("NewSubfileType");
					if (i === 0 || subfileType === 2 || (newSubfileType || 0) & 1) allImages.push(image);
				}
				allImages.sort((a, b) => a.getWidth() - b.getWidth());
				for (let i = 0; i < allImages.length; ++i) {
					const image = allImages[i];
					const imgResX = (imgBBox[2] - imgBBox[0]) / image.getWidth();
					const imgResY = (imgBBox[3] - imgBBox[1]) / image.getHeight();
					usedImage = image;
					if (resX && resX > imgResX || resY && resY > imgResY) break;
				}
			}
			let wnd = imageWindow;
			if (bbox) {
				const [oX, oY] = firstImage.getOrigin();
				const [imageResX, imageResY] = usedImage.getResolution(firstImage);
				wnd = [
					Math.round((bbox[0] - oX) / imageResX),
					Math.round((bbox[1] - oY) / imageResY),
					Math.round((bbox[2] - oX) / imageResX),
					Math.round((bbox[3] - oY) / imageResY)
				];
				wnd = [
					Math.min(wnd[0], wnd[2]),
					Math.min(wnd[1], wnd[3]),
					Math.max(wnd[0], wnd[2]),
					Math.max(wnd[1], wnd[3])
				];
			}
			return usedImage.readRasters(_objectSpread2(_objectSpread2({}, options), {}, { window: wnd }));
		}).apply(this, arguments);
	}
};
/**
* @typedef {Object} GeoTIFFOptions
* @property {boolean} [cache=false] whether or not decoded tiles shall be cached.
*/
/**
* The abstraction for a whole GeoTIFF file.
*/
var GeoTIFF = class GeoTIFF extends GeoTIFFBase {
	/**
	* @constructor
	* @param {BaseSource} source The datasource to read from.
	* @param {boolean} littleEndian Whether the image uses little endian.
	* @param {boolean} bigTiff Whether the image uses bigTIFF conventions.
	* @param {number} firstIFDOffset The numeric byte-offset from the start of the image
	*                                to the first IFD.
	* @param {GeoTIFFOptions} [options] further options.
	*/
	constructor(source, littleEndian, bigTiff, firstIFDOffset, options = {}) {
		super();
		this.source = source;
		this.parser = new ImageFileDirectoryParser(source, littleEndian, bigTiff, false);
		this.littleEndian = littleEndian;
		this.bigTiff = bigTiff;
		this.firstIFDOffset = firstIFDOffset;
		this.cache = options.cache || false;
		/** @type {Array<Promise<import('./imagefiledirectory.js').ImageFileDirectory> | undefined>} */
		this.ifdRequests = [];
		/** @type {Record<string, unknown>|null} */
		this.ghostValues = null;
	}
	/**
	* @param {number} offset
	* @param {number} [size]
	* @returns {Promise<DataSlice>}
	*/
	getSlice(offset, size) {
		var _this2 = this;
		return _asyncToGenerator(function* () {
			const fallbackSize = _this2.bigTiff ? 4048 : 1024;
			return new DataSlice((yield _this2.source.fetch([{
				offset,
				length: typeof size !== "undefined" ? size : fallbackSize
			}]))[0], offset, _this2.littleEndian, _this2.bigTiff);
		})();
	}
	/**
	* @param {number} index
	* @return {Promise<import('./imagefiledirectory.js').ImageFileDirectory>}
	*/
	requestIFD(index) {
		var _this3 = this;
		return _asyncToGenerator(function* () {
			if (_this3.ifdRequests[index]) return _this3.ifdRequests[index];
			else if (index === 0) {
				_this3.ifdRequests[index] = _this3.parser.parseFileDirectoryAt(_this3.firstIFDOffset);
				return _this3.ifdRequests[index];
			} else if (!_this3.ifdRequests[index - 1]) try {
				_this3.ifdRequests[index - 1] = _this3.requestIFD(index - 1);
			} catch (e) {
				if (e instanceof GeoTIFFImageIndexError) throw new GeoTIFFImageIndexError(index);
				throw e;
			}
			_this3.ifdRequests[index] = _asyncToGenerator(function* () {
				const previousPromise = _this3.ifdRequests[index - 1];
				if (!previousPromise) throw new Error("Previous IFD request missing");
				const previousIfd = yield previousPromise;
				if (previousIfd.nextIFDByteOffset === 0) throw new GeoTIFFImageIndexError(index);
				return _this3.parser.parseFileDirectoryAt(previousIfd.nextIFDByteOffset);
			})();
			return _this3.ifdRequests[index];
		})();
	}
	/**
	* Get the n-th internal subfile of an image. By default, the first is returned.
	*
	* @param {number} [index=0] the index of the image to return.
	* @returns {Promise<GeoTIFFImage>} the image at the given index
	*/
	getImage(index = 0) {
		var _this4 = this;
		return _asyncToGenerator(function* () {
			return new GeoTIFFImage(yield _this4.requestIFD(index), _this4.littleEndian, _this4.cache, _this4.source);
		})();
	}
	/**
	* Returns the count of the internal subfiles.
	*
	* @returns {Promise<number>} the number of internal subfile images
	*/
	getImageCount() {
		var _this5 = this;
		return _asyncToGenerator(function* () {
			let index = 0;
			let hasNext = true;
			while (hasNext) try {
				yield _this5.requestIFD(index);
				++index;
			} catch (e) {
				if (e instanceof GeoTIFFImageIndexError) hasNext = false;
				else throw e;
			}
			return index;
		})();
	}
	/**
	* Get the values of the COG ghost area as a parsed map.
	* See https://gdal.org/drivers/raster/cog.html#header-ghost-area for reference
	* @returns {Promise<Record<string, unknown>|null>} the parsed ghost area or null, if no such area was found
	*/
	getGhostValues() {
		var _this6 = this;
		return _asyncToGenerator(function* () {
			const offset = _this6.bigTiff ? 16 : 8;
			if (_this6.ghostValues !== null) return _this6.ghostValues;
			const detectionString = "GDAL_STRUCTURAL_METADATA_SIZE=";
			const heuristicAreaSize = 130;
			let slice = yield _this6.getSlice(offset, heuristicAreaSize);
			if (detectionString === getValues(slice, fieldTypes.ASCII, 30, offset)) {
				const firstLine = getValues(slice, fieldTypes.ASCII, heuristicAreaSize, offset).split("\n")[0];
				const metadataSize = Number(firstLine.split("=")[1].split(" ")[0]) + firstLine.length;
				if (metadataSize > heuristicAreaSize) slice = yield _this6.getSlice(offset, metadataSize);
				const fullString = getValues(slice, fieldTypes.ASCII, metadataSize, offset);
				/** @type {Record<string, unknown>} */
				const ghostValues = {};
				fullString.split("\n").filter((line) => line.length > 0).map((line) => line.split("=")).forEach(([key, value]) => {
					ghostValues[key] = value;
				});
				_this6.ghostValues = ghostValues;
			}
			return _this6.ghostValues;
		})();
	}
	/**
	* Parse a (Geo)TIFF file from the given source.
	*
	* @param {BaseSource} source The source of data to parse from.
	* @param {GeoTIFFOptions} [options] Additional options.
	* @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
	*                               to be aborted
	*/
	static fromSource(source, options, signal) {
		return _asyncToGenerator(function* () {
			const headerData = (yield source.fetch([{
				offset: 0,
				length: 1024
			}], signal))[0];
			const dataView = new DataView64(headerData);
			const BOM = dataView.getUint16(0, false);
			let littleEndian;
			if (BOM === 18761) littleEndian = true;
			else if (BOM === 19789) littleEndian = false;
			else throw new TypeError("Invalid byte order value.");
			const magicNumber = dataView.getUint16(2, littleEndian);
			let bigTiff;
			if (magicNumber === 42) bigTiff = false;
			else if (magicNumber === 43) {
				bigTiff = true;
				if (dataView.getUint16(4, littleEndian) !== 8) throw new Error("Unsupported offset byte-size.");
			} else throw new TypeError("Invalid magic number.");
			const firstIFDOffset = bigTiff ? dataView.getUint64(8, littleEndian) : dataView.getUint32(4, littleEndian);
			return new GeoTIFF(source, littleEndian, bigTiff, firstIFDOffset, options);
		})();
	}
	/**
	* Closes the underlying file buffer
	* N.B. After the GeoTIFF has been completely processed it needs
	* to be closed but only if it has been constructed from a file.
	*/
	close() {
		if (typeof this.source.close === "function") return this.source.close();
		return false;
	}
};
/**
* Wrapper for GeoTIFF files that have external overviews.
* @augments GeoTIFFBase
*/
var MultiGeoTIFF = class extends GeoTIFFBase {
	/**
	* Construct a new MultiGeoTIFF from a main and several overview files.
	* @param {GeoTIFF} mainFile The main GeoTIFF file.
	* @param {GeoTIFF[]} overviewFiles An array of overview files.
	*/
	constructor(mainFile, overviewFiles) {
		super();
		this.mainFile = mainFile;
		this.overviewFiles = overviewFiles;
		this.imageFiles = [mainFile].concat(overviewFiles);
		this.fileDirectoriesPerFile = null;
		this.fileDirectoriesPerFileParsing = null;
		this.imageCount = null;
	}
	parseFileDirectoriesPerFile() {
		var _this7 = this;
		return _asyncToGenerator(function* () {
			const requests = [_this7.mainFile.parser.parseFileDirectoryAt(_this7.mainFile.firstIFDOffset)].concat(_this7.overviewFiles.map((file) => file.parser.parseFileDirectoryAt(file.firstIFDOffset)));
			_this7.fileDirectoriesPerFile = yield Promise.all(requests);
			return _this7.fileDirectoriesPerFile;
		})();
	}
	/**
	* Get the n-th internal subfile of an image. By default, the first is returned.
	*
	* @param {number} [index=0] the index of the image to return.
	* @returns {Promise<GeoTIFFImage>} the image at the given index
	*/
	getImage(index = 0) {
		var _this8 = this;
		return _asyncToGenerator(function* () {
			yield _this8.getImageCount();
			if (!_this8.imageCounts) throw new Error("Image counts not available");
			yield _this8.parseFileDirectoriesPerFile();
			let visited = 0;
			let relativeIndex = 0;
			for (let i = 0; i < _this8.imageFiles.length; i++) {
				const imageFile = _this8.imageFiles[i];
				for (let ii = 0; ii < _this8.imageCounts[i]; ii++) {
					if (index === visited) return new GeoTIFFImage(yield imageFile.requestIFD(relativeIndex), imageFile.littleEndian, imageFile.cache, imageFile.source);
					visited++;
					relativeIndex++;
				}
				relativeIndex = 0;
			}
			throw new RangeError("Invalid image index");
		})();
	}
	/**
	* Returns the count of the internal subfiles.
	*
	* @returns {Promise<number>} the number of internal subfile images
	*/
	getImageCount() {
		var _this9 = this;
		return _asyncToGenerator(function* () {
			if (_this9.imageCount !== null) return _this9.imageCount;
			const requests = [_this9.mainFile.getImageCount()].concat(_this9.overviewFiles.map((file) => file.getImageCount()));
			_this9.imageCounts = yield Promise.all(requests);
			_this9.imageCount = _this9.imageCounts.reduce((count, ifds) => count + ifds, 0);
			return _this9.imageCount;
		})();
	}
};
/**
* Creates a new GeoTIFF from a remote URL.
* @param {string} url The URL to access the image from
* @param {SourceOptions} [options] Additional options to pass to the source.
*                           See {@link makeRemoteSource} for details.
* @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
*                               to be aborted
* @returns {Promise<GeoTIFF>} The resulting GeoTIFF file.
*/
function fromUrl(_x) {
	return _fromUrl.apply(this, arguments);
}
function _fromUrl() {
	_fromUrl = _asyncToGenerator(function* (url, options = {}, signal) {
		const remoteOptions = _objectSpread2({ blockSize: 65536 }, options);
		return GeoTIFF.fromSource(makeRemoteSource(url, remoteOptions), void 0, signal);
	});
	return _fromUrl.apply(this, arguments);
}
/**
* Creates a new GeoTIFF from a custom {@link BaseClient}.
* @param {BaseClient} client The client.
* @param {SourceOptions} [options] Additional options to pass to the source.
*                           See {@link makeCustomSource} for details.
* @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
*                               to be aborted
* @returns {Promise<GeoTIFF>} The resulting GeoTIFF file.
*/
function fromCustomClient(_x2) {
	return _fromCustomClient.apply(this, arguments);
}
function _fromCustomClient() {
	_fromCustomClient = _asyncToGenerator(function* (client, options = {}, signal) {
		const customOptions = _objectSpread2({ blockSize: 65536 }, options);
		return GeoTIFF.fromSource(makeCustomSource(client, customOptions), void 0, signal);
	});
	return _fromCustomClient.apply(this, arguments);
}
/**
* Construct a GeoTIFF from an HTML
* [Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob} or
* [File]{@link https://developer.mozilla.org/en-US/docs/Web/API/File}
* object.
* @param {Blob|File} blob The Blob or File object to read from.
* @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
*                               to be aborted
* @returns {Promise<GeoTIFF>} The resulting GeoTIFF file.
*/
function fromBlob(_x7, _x8) {
	return _fromBlob.apply(this, arguments);
}
function _fromBlob() {
	_fromBlob = _asyncToGenerator(function* (blob, signal) {
		return GeoTIFF.fromSource(makeFileReaderSource(blob), void 0, signal);
	});
	return _fromBlob.apply(this, arguments);
}
/**
* Construct a MultiGeoTIFF from the given URLs.
* @param {string} mainUrl The URL for the main file.
* @param {string[]} overviewUrls An array of URLs for the overview images.
* @param {SourceOptions} [options] Additional options to pass to the source.
*                           See [makeRemoteSource]{@link module:source.makeRemoteSource}
*                           for details.
* @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
*                               to be aborted
* @returns {Promise<MultiGeoTIFF>} The resulting MultiGeoTIFF file.
*/
function fromUrls(_x9) {
	return _fromUrls.apply(this, arguments);
}
function _fromUrls() {
	_fromUrls = _asyncToGenerator(function* (mainUrl, overviewUrls = [], options = {}, signal) {
		const remoteOptions = _objectSpread2({ blockSize: 65536 }, options);
		return new MultiGeoTIFF(yield GeoTIFF.fromSource(makeRemoteSource(mainUrl, remoteOptions), void 0, signal), yield Promise.all(overviewUrls.map((url) => GeoTIFF.fromSource(makeRemoteSource(url, remoteOptions), void 0, signal))));
	});
	return _fromUrls.apply(this, arguments);
}
//#endregion
//#region node_modules/ol/source/GeoTIFF.js
/**
* @module ol/source/GeoTIFF
*/
var GeoTIFF_exports = /* @__PURE__ */ __exportAll({ default: () => GeoTIFFSource });
/**
* Determine if an image type is a mask.
* See https://www.awaresystems.be/imaging/tiff/tifftags/newsubfiletype.html
* @param {GeoTIFFImage} image The image.
* @return {boolean} The image is a mask.
*/
function isMask(image) {
	return ((image.fileDirectory.getValue("NewSubfileType") || 0) & 4) === 4;
}
/**
* @param {true|false|'auto'} preference The convertToRGB option.
* @param {GeoTIFFImage} image The image.
* @return {boolean} Use the `image.readRGB()` method.
*/
function readRGB(preference, image) {
	if (!preference) return false;
	if (preference === true) return true;
	if (image.getSamplesPerPixel() !== 3) return false;
	const interpretation = image.fileDirectory.getValue("PhotometricInterpretation");
	const interpretations = photometricInterpretations;
	return interpretation === interpretations.CMYK || interpretation === interpretations.YCbCr || interpretation === interpretations.CIELab || interpretation === interpretations.ICCLab;
}
/**
* @typedef {Object} SourceInfo
* @property {string} [url] URL for the source GeoTIFF.
* @property {function(string, HeadersInit, AbortSignal): Promise<Response>} [loader] Custom loader function for URL based sources.
* Called with the URL, request headers, and an abort signal. Expected to resolve with a `Response`.
* @property {Array<string>} [overviews] List of any overview URLs, only applies if the url parameter is given and no loader is specified.
* @property {Blob} [blob] Blob containing the source GeoTIFF. `blob` and `url` are mutually exclusive.
* @property {number|Array<number|undefined>} [min=0] The minimum source data value.  Rendered values are
* scaled from 0 to 1 based on the configured min and max.  If not provided and raster statistics are available,
* those will be used instead.  If neither are available, the minimum for the data type will be used.  To disable
* this behavior, set the `normalize` option to `false` in the constructor.  If an array is provided, values
* correspond to the bands in the file (not the `bands` option).  Array values can be left `undefined` to trigger
* the default behavior.
* @property {number|Array<number|undefined>} [max] The maximum source data value.  Rendered values are
* scaled from 0 to 1 based on the configured min and max.  If not provided and raster statistics are available,
* those will be used instead.  If neither are available, the maximum for the data type will be used.  To disable
* this behavior, set the `normalize` option to `false` in the constructor.  If an array is provided, values
* correspond to the bands in the file (not the `bands` option).  Array values can be left `undefined` to to trigger
* the default behavior.
* @property {number|Array<number|undefined>} [nodata] Values to discard (overriding any nodata values in the
* metadata).  When provided, an additional alpha band will be added to the data.  Often the GeoTIFF metadata
* will include information about nodata values, so you should only need to set this property if
* you find that it is not already extracted from the metadata.  If an array is provided, values correspond to
* the bands in the file (not the `bands` option).  Array values can be left `undefined` to trigger the default behavior.
* @property {Array<number>} [bands] Band numbers to be read from (where the first band is `1`). If not provided, all bands will
* be read. For example, if a GeoTIFF has blue (1), green (2), red (3), and near-infrared (4) bands, and you only need the
* near-infrared band, configure `bands: [4]`.
*/
/**
* @typedef {Object} GeoKeys
* @property {number} GTModelTypeGeoKey Model type.
* @property {number} GTRasterTypeGeoKey Raster type.
* @property {number} GeogAngularUnitsGeoKey Angular units.
* @property {number} GeogInvFlatteningGeoKey Inverse flattening.
* @property {number} GeogSemiMajorAxisGeoKey Semi-major axis.
* @property {number} GeographicTypeGeoKey Geographic coordinate system code.
* @property {number} ProjLinearUnitsGeoKey Projected linear unit code.
* @property {number} ProjectedCSTypeGeoKey Projected coordinate system code.
*/
/** @import {GeoTIFF, GeoTIFFImage, MultiGeoTIFF} from 'geotiff' */
/**
* @typedef {Object} GDALMetadata
* @property {string} STATISTICS_MINIMUM The minimum value (as a string).
* @property {string} STATISTICS_MAXIMUM The maximum value (as a string).
*/
var STATISTICS_MAXIMUM = "STATISTICS_MAXIMUM";
var STATISTICS_MINIMUM = "STATISTICS_MINIMUM";
var defaultTileSize = 256;
var workerPool;
function getWorkerPool() {
	if (!workerPool) workerPool = new Pool();
	return workerPool;
}
/**
* Get the bounding box of an image.  If the image does not have an affine transform,
* the pixel bounds are returned.
* @param {GeoTIFFImage} image The image.
* @return {Array<number>} The image bounding box.
*/
function getBoundingBox(image) {
	try {
		return image.getBoundingBox(true);
	} catch (_unused) {
		return [
			0,
			0,
			image.getWidth(),
			image.getHeight()
		];
	}
}
/**
* Get the origin of an image.  If the image does not have an affine transform,
* the top-left corner of the pixel bounds is returned.
* @param {GeoTIFFImage} image The image.
* @return {Array<number>} The image origin.
*/
function getOrigin(image) {
	try {
		return image.getOrigin().slice(0, 2);
	} catch (_unused2) {
		return [0, image.getHeight()];
	}
}
/**
* Get the resolution of an image.  If the image does not have an affine transform,
* the width of the image is compared with the reference image.
* @param {GeoTIFFImage} image The image.
* @param {GeoTIFFImage} referenceImage The reference image.
* @return {Array<number>} The map x and y units per pixel.
*/
function getResolutions(image, referenceImage) {
	try {
		return image.getResolution(referenceImage);
	} catch (_unused3) {
		return [referenceImage.getWidth() / image.getWidth(), referenceImage.getHeight() / image.getHeight()];
	}
}
/**
* @param {Object<string, any>} geoKeys Geo keys object.
* @param {string} geoKey The geo key to lookup.
* @param {string} unitKey The unit key to lookup.
* @param {boolean} loadMissingProjection Whether to load missing projections.
* @return {Promise<Projection|null>} The projection.
*/
function getProjectionFromKeys(_x, _x2, _x3, _x4) {
	return _getProjectionFromKeys.apply(this, arguments);
}
function _getProjectionFromKeys() {
	_getProjectionFromKeys = _asyncToGenerator(function* (geoKeys, geoKey, unitKey, loadMissingProjection) {
		const value = geoKeys[geoKey];
		if (value && value !== 32767) {
			const code = "EPSG:" + value;
			let projection = get(code);
			if (!projection && loadMissingProjection) projection = yield fromProjectionCode(code);
			if (!projection) {
				const units = fromCode(geoKeys[unitKey]);
				if (units) projection = new Projection({
					code,
					units
				});
			}
			return projection || null;
		}
	});
	return _getProjectionFromKeys.apply(this, arguments);
}
/**
* @param {GeoTIFFImage} image A GeoTIFF.
* @param {boolean} loadMissingProjection Whether to load missing projections.
* @return {Promise<Projection|null>} The image projection.
*/
function getProjection(_x5, _x6) {
	return _getProjection.apply(this, arguments);
}
function _getProjection() {
	_getProjection = _asyncToGenerator(function* (image, loadMissingProjection) {
		const geoKeys = image.getGeoKeys();
		if (!geoKeys) return null;
		const projection = yield getProjectionFromKeys(geoKeys, "ProjectedCSTypeGeoKey", "ProjLinearUnitsGeoKey", loadMissingProjection);
		if (projection) return projection;
		return yield getProjectionFromKeys(geoKeys, "GeographicTypeGeoKey", "GeogAngularUnitsGeoKey", loadMissingProjection);
	});
	return _getProjection.apply(this, arguments);
}
/**
* @param {GeoTIFF|MultiGeoTIFF} tiff A GeoTIFF.
* @return {Promise<Array<GeoTIFFImage>>} Resolves to a list of images.
*/
function getImagesForTIFF(tiff) {
	return tiff.getImageCount().then(function(count) {
		const requests = new Array(count);
		for (let i = 0; i < count; ++i) requests[i] = tiff.getImage(i);
		return Promise.all(requests);
	});
}
/**
* @param {string} url The URL.
* @param {function(string, HeadersInit, AbortSignal): Promise<Response>} loader The loader function.
* @return {import('geotiff').BaseClient} The custom loader client.
*/
var createCustomClient = (url, loader) => ({
	url,
	request: function() {
		var _ref = _asyncToGenerator(function* (options) {
			const response = Object.assign(yield loader(url, options === null || options === void 0 ? void 0 : options.headers, options === null || options === void 0 ? void 0 : options.signal), {
				getHeader: (name) => response.headers.get(name),
				getData: () => response.arrayBuffer()
			});
			return response;
		});
		return function request(_x7) {
			return _ref.apply(this, arguments);
		};
	}()
});
/**
* @param {SourceInfo} source The GeoTIFF source.
* @param {import('geotiff').RemoteSourceOptions} options Options for the GeoTIFF source.
* @return {Promise<Array<GeoTIFFImage>>} Resolves to a list of images.
*/
function getImagesForSource(source, options) {
	let request;
	if (source.blob) request = fromBlob(source.blob);
	else if (source.loader) {
		if (source.overviews) throw new Error("Source overviews are not supported when using a custom loader");
		request = fromCustomClient(createCustomClient(source.url, source.loader), options);
	} else if (source.overviews) request = fromUrls(source.url, source.overviews, options);
	else request = fromUrl(source.url, options);
	return request.then(getImagesForTIFF).then(function(images) {
		const image = images[0];
		if (source.url && !source.blob && image.getTileWidth() !== image.getTileHeight() && image.getTileHeight() < defaultTileSize) {
			const bytesPerPixel = image.getBytesPerPixel();
			const blockSize = image.getWidth() * bytesPerPixel * defaultTileSize;
			const reopenOptions = Object.assign({}, options, { blockSize });
			let reopened;
			if (source.loader) reopened = fromCustomClient(createCustomClient(source.url, source.loader), reopenOptions);
			else if (source.overviews) reopened = fromUrls(source.url, source.overviews, reopenOptions);
			else reopened = fromUrl(source.url, reopenOptions);
			return reopened.then(getImagesForTIFF);
		}
		return images;
	});
}
/**
* @param {number|Array<number>|Array<Array<number>>} expected Expected value.
* @param {number|Array<number>|Array<Array<number>>} got Actual value.
* @param {number} tolerance Accepted tolerance in fraction of expected between expected and got.
* @param {string} message The error message.
* @param {function(Error):void} rejector A function to be called with any error.
*/
function assertEqual(expected, got, tolerance, message, rejector) {
	if (Array.isArray(expected)) {
		const length = expected.length;
		if (!Array.isArray(got) || length != got.length) {
			const error = new Error(message);
			rejector(error);
			throw error;
		}
		for (let i = 0; i < length; ++i) assertEqual(expected[i], got[i], tolerance, message, rejector);
		return;
	}
	got = got;
	if (Math.abs(expected - got) > tolerance * expected) throw new Error(message);
}
/**
* @param {Array} array The data array.
* @return {number} The minimum value.
*/
function getMinForDataType(array) {
	if (array instanceof Int8Array) return -128;
	if (array instanceof Int16Array) return -32768;
	if (array instanceof Int32Array) return -2147483648;
	if (array instanceof Float32Array) return 12e-39;
	return 0;
}
/**
* @param {Array} array The data array.
* @return {number} The maximum value.
*/
function getMaxForDataType(array) {
	if (array instanceof Int8Array) return 127;
	if (array instanceof Uint8Array) return 255;
	if (array instanceof Uint8ClampedArray) return 255;
	if (array instanceof Int16Array) return 32767;
	if (array instanceof Uint16Array) return 65535;
	if (array instanceof Int32Array) return 2147483647;
	if (array instanceof Uint32Array) return 4294967295;
	if (array instanceof Float32Array) return 34e37;
	return 255;
}
/**
* @typedef {Object} GeoTIFFSourceOptions
* @property {boolean} [forceXHR=false] Whether to force the usage of the browsers XMLHttpRequest API.
* @property {Object<string, string>} [headers] additional key-value pairs of headers to be passed with each request. Key is the header name, value the header value.
* @property {string} [credentials] How credentials shall be handled. See
* https://developer.mozilla.org/en-US/docs/Web/API/fetch for reference and possible values
* @property {number} [maxRanges] The maximum amount of ranges to request in a single multi-range request.
* By default only a single range is used.
* @property {boolean} [allowFullFile=false] Whether or not a full file is accepted when only a portion is
* requested. Only use this when you know the source image to be small enough to fit in memory.
* @property {number} [blockSize=65536] The block size to use.
* @property {number} [cacheSize=100] The number of blocks that shall be held in a LRU cache.
*/
/**
* @typedef {Object} Options
* @property {import("./Source.js").AttributionLike} [attributions] Attributions.
* @property {Array<SourceInfo>} sources List of information about GeoTIFF sources.
* Multiple sources can be combined when their resolution sets are equal after applying a scale.
* The list of sources defines a mapping between input bands as they are read from each GeoTIFF and
* the output bands that are provided by data tiles. To control which bands to read from each GeoTIFF,
* use the {@link import("./GeoTIFF.js").SourceInfo bands} property. If, for example, you specify two
* sources, one with 3 bands and {@link import("./GeoTIFF.js").SourceInfo nodata} configured, and
* another with 1 band, the resulting data tiles will have 5 bands: 3 from the first source, 1 alpha
* band from the first source, and 1 band from the second source.
* @property {GeoTIFFSourceOptions} [sourceOptions] Additional options to be passed to [geotiff.js](https://geotiffjs.github.io/geotiff.js/module-geotiff.html)'s `fromUrl` or `fromUrls` methods.
* @property {true|false|'auto'} [convertToRGB=false] By default, bands from the sources are read as-is. When
* reading GeoTIFFs with the purpose of displaying them as RGB images, setting this to `true` will
* convert other color spaces (YCbCr, CMYK) to RGB.  Setting the option to `'auto'` will make it so CMYK, YCbCr,
* CIELab, and ICCLab images will automatically be converted to RGB.
* @property {boolean} [normalize=true] By default, the source data is normalized to values between
* 0 and 1 with scaling factors based on the raster statistics or `min` and `max` properties of each source.
* If instead you want to work with the raw values in a style expression, set this to `false`.  Setting this option
* to `false` will make it so any `min` and `max` properties on sources are ignored.
* @property {import("../proj.js").ProjectionLike} [projection] Source projection.  If not provided, the GeoTIFF metadata
* will be read for projection information.
* @property {boolean} [loadMissingProjection=false] Whether to attempt to load missing projection definitions.
* Uses the pre-configured projection lookup function, which can be customized with {@link module:ol/proj/proj4.setProjectionCodeLookup}.
* @property {number} [transition=250] Duration of the opacity transition for rendering.
* To disable the opacity transition, pass `transition: 0`.
* @property {boolean} [wrapX=false] Render tiles beyond the tile grid extent.
* @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
* the linear interpolation is used to resample the data.  If false, nearest neighbor is used.
*/
/**
* @classdesc
* A source for working with GeoTIFF data.
* **Note for users of the full build**: The `GeoTIFF` source requires the
* [geotiff.js](https://github.com/geotiffjs/geotiff.js) library to be loaded as well.
*
* @api
*/
var GeoTIFFSource = class extends DataTileSource {
	/**
	* @param {Options} options Data tile options.
	*/
	constructor(options) {
		super({
			attributions: options.attributions,
			state: "loading",
			tileGrid: null,
			projection: options.projection || null,
			transition: options.transition,
			interpolate: options.interpolate !== false,
			wrapX: options.wrapX
		});
		/**
		* @type {Array<SourceInfo>}
		* @private
		*/
		this.sourceInfo_ = options.sources;
		const numSources = this.sourceInfo_.length;
		/**
		* @type {Object}
		* @private
		*/
		this.sourceOptions_ = options.sourceOptions;
		/**
		* @type {Array<Array<GeoTIFFImage>>}
		* @private
		*/
		this.sourceImagery_ = new Array(numSources);
		/**
		* @type {Array<Array<GeoTIFFImage>>}
		* @private
		*/
		this.sourceMasks_ = new Array(numSources);
		/**
		* @type {Array<number>}
		* @private
		*/
		this.resolutionFactors_ = new Array(numSources);
		/**
		* @type {Array<number>}
		* @private
		*/
		this.samplesPerPixel_;
		/**
		* @type {Array<Array<number>>}
		* @private
		*/
		this.nodataValues_;
		/**
		* @type {Array<Array<GDALMetadata>>}
		* @private
		*/
		this.metadata_;
		/**
		* @type {boolean}
		* @private
		*/
		this.normalize_ = options.normalize !== false;
		/**
		* @type {boolean}
		* @private
		*/
		this.addAlpha_ = false;
		/**
		* @type {Error}
		* @private
		*/
		this.error_ = null;
		/**
		* @type {true|false|'auto'}
		* @private
		*/
		this.convertToRGB_ = options.convertToRGB || false;
		/**
		* @type {boolean}
		* @private
		*/
		this.loadMissingProjection_ = options.loadMissingProjection || false;
		this.setKey(this.sourceInfo_.map((source) => source.url).join(","));
		const self = this;
		const requests = new Array(numSources);
		for (let i = 0; i < numSources; ++i) requests[i] = getImagesForSource(this.sourceInfo_[i], this.sourceOptions_);
		Promise.all(requests).then(function(sources) {
			self.configure_(sources);
		}).catch(function(error$1) {
			error(error$1);
			self.error_ = error$1;
			self.setState("error");
		});
	}
	/**
	* @return {Error} A source loading error. When the source state is `error`, use this function
	* to get more information about the error. To debug a faulty configuration, you may want to use
	* a listener like
	* ```js
	* geotiffSource.on('change', () => {
	*   if (geotiffSource.getState() === 'error') {
	*     console.error(geotiffSource.getError());
	*   }
	* });
	* ```
	*/
	getError() {
		return this.error_;
	}
	/**
	* Determine the projection of the images in this GeoTIFF.
	* The default implementation looks at the ProjectedCSTypeGeoKey and the GeographicTypeGeoKey
	* of each image in turn.
	* You can override this method in a subclass to support more projections.
	*
	* @param {Array<Array<GeoTIFFImage>>} sources Each source is a list of images
	* from a single GeoTIFF.
	*/
	determineProjection(sources) {
		var _this = this;
		return _asyncToGenerator(function* () {
			const firstSource = sources[0];
			for (let i = firstSource.length - 1; i >= 0; --i) {
				const image = firstSource[i];
				const projection = yield getProjection(image, _this.loadMissingProjection_);
				if (projection) {
					_this.projection = projection;
					break;
				}
			}
		})();
	}
	/**
	* Determine any transform matrix for the images in this GeoTIFF.
	*
	* @param {Array<Array<GeoTIFFImage>>} sources Each source is a list of images
	* from a single GeoTIFF.
	*/
	determineTransformMatrix(sources) {
		const firstSource = sources[0];
		for (let i = firstSource.length - 1; i >= 0; --i) {
			const modelTransformation = firstSource[i].fileDirectory.getValue("ModelTransformation");
			if (modelTransformation) {
				const [a, b, c, d, e, f, g, h] = modelTransformation;
				const matrix = multiply(multiply([
					1 / Math.sqrt(a * a + e * e),
					0,
					0,
					-1 / Math.sqrt(b * b + f * f),
					d,
					h
				], [
					a,
					e,
					b,
					f,
					0,
					0
				]), [
					1,
					0,
					0,
					1,
					-d,
					-h
				]);
				this.transformMatrix = matrix;
				this.addAlpha_ = true;
				break;
			}
		}
	}
	/**
	* Configure the tile grid based on images within the source GeoTIFFs.  Each GeoTIFF
	* must have the same internal tiled structure.
	* @param {Array<Array<GeoTIFFImage>>} sources Each source is a list of images
	* from a single GeoTIFF.
	* @private
	*/
	configure_(sources) {
		var _this2 = this;
		return _asyncToGenerator(function* () {
			let extent;
			let origin;
			let commonRenderTileSizes;
			let commonSourceTileSizes;
			let resolutions;
			const samplesPerPixel = new Array(sources.length);
			const nodataValues = new Array(sources.length);
			const metadata = new Array(sources.length);
			let minZoom = 0;
			const sourceCount = sources.length;
			for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
				const images = [];
				const masks = [];
				sources[sourceIndex].forEach((item) => {
					if (isMask(item)) masks.push(item);
					else images.push(item);
				});
				const imageCount = images.length;
				if (masks.length > 0 && masks.length !== imageCount) throw new Error(`Expected one mask per image found ${masks.length} masks and ${imageCount} images`);
				let sourceExtent;
				let sourceOrigin;
				const sourceTileSizes = new Array(imageCount);
				const renderTileSizes = new Array(imageCount);
				const sourceResolutions = new Array(imageCount);
				nodataValues[sourceIndex] = new Array(imageCount);
				metadata[sourceIndex] = new Array(imageCount);
				for (let imageIndex = 0; imageIndex < imageCount; ++imageIndex) {
					const image = images[imageIndex];
					const nodataValue = image.getGDALNoData();
					metadata[sourceIndex][imageIndex] = yield image.getGDALMetadata(0);
					nodataValues[sourceIndex][imageIndex] = nodataValue;
					const wantedSamples = _this2.sourceInfo_[sourceIndex].bands;
					samplesPerPixel[sourceIndex] = wantedSamples ? wantedSamples.length : image.getSamplesPerPixel();
					const level = imageCount - (imageIndex + 1);
					if (!sourceExtent) sourceExtent = getBoundingBox(image);
					if (!sourceOrigin) sourceOrigin = getOrigin(image);
					const imageResolutions = getResolutions(image, images[0]);
					sourceResolutions[level] = imageResolutions[0];
					const sourceTileSize = [image.getTileWidth(), image.getTileHeight()];
					if (sourceTileSize[0] !== sourceTileSize[1] && sourceTileSize[1] < defaultTileSize) {
						sourceTileSize[0] = defaultTileSize;
						sourceTileSize[1] = defaultTileSize;
					}
					sourceTileSizes[level] = sourceTileSize;
					const aspectRatio = imageResolutions[0] / Math.abs(imageResolutions[1]);
					renderTileSizes[level] = [sourceTileSize[0], sourceTileSize[1] / aspectRatio];
				}
				if (!extent) extent = sourceExtent;
				else getIntersection(extent, sourceExtent, extent);
				if (!origin) origin = sourceOrigin;
				else {
					const message = `Origin mismatch for source ${sourceIndex}, got [${sourceOrigin}] but expected [${origin}]`;
					assertEqual(origin, sourceOrigin, 0, message, _this2.viewRejector);
				}
				if (!resolutions) {
					resolutions = sourceResolutions;
					_this2.resolutionFactors_[sourceIndex] = 1;
				} else {
					if (resolutions.length - minZoom > sourceResolutions.length) minZoom = resolutions.length - sourceResolutions.length;
					const resolutionFactor = resolutions[resolutions.length - 1] / sourceResolutions[sourceResolutions.length - 1];
					_this2.resolutionFactors_[sourceIndex] = resolutionFactor;
					const scaledSourceResolutions = sourceResolutions.map((resolution) => resolution *= resolutionFactor);
					const message = `Resolution mismatch for source ${sourceIndex}, got [${scaledSourceResolutions}] but expected [${resolutions}]`;
					assertEqual(resolutions.slice(minZoom, resolutions.length), scaledSourceResolutions, .02, message, _this2.viewRejector);
				}
				if (!commonRenderTileSizes) commonRenderTileSizes = renderTileSizes;
				else assertEqual(commonRenderTileSizes.slice(minZoom, commonRenderTileSizes.length), renderTileSizes, .01, `Tile size mismatch for source ${sourceIndex}`, _this2.viewRejector);
				if (!commonSourceTileSizes) commonSourceTileSizes = sourceTileSizes;
				else assertEqual(commonSourceTileSizes.slice(minZoom, commonSourceTileSizes.length), sourceTileSizes, 0, `Tile size mismatch for source ${sourceIndex}`, _this2.viewRejector);
				_this2.sourceImagery_[sourceIndex] = images.reverse();
				_this2.sourceMasks_[sourceIndex] = masks.reverse();
			}
			for (let i = 0, ii = _this2.sourceImagery_.length; i < ii; ++i) {
				const sourceImagery = _this2.sourceImagery_[i];
				while (sourceImagery.length < resolutions.length) sourceImagery.unshift(void 0);
			}
			if (!_this2.getProjection()) yield _this2.determineProjection(sources);
			_this2.determineTransformMatrix(sources);
			_this2.samplesPerPixel_ = samplesPerPixel;
			_this2.nodataValues_ = nodataValues;
			_this2.metadata_ = metadata;
			outer: for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
				const sourceNodata = _this2.sourceInfo_[sourceIndex].nodata;
				if (sourceNodata !== void 0) {
					if (!Array.isArray(sourceNodata) || sourceNodata.some((v) => v !== void 0)) {
						_this2.addAlpha_ = true;
						break;
					}
				}
				if (_this2.sourceMasks_[sourceIndex].length) {
					_this2.addAlpha_ = true;
					break;
				}
				const values = nodataValues[sourceIndex];
				const bands = _this2.sourceInfo_[sourceIndex].bands;
				if (bands) {
					for (let i = 0; i < bands.length; ++i) if (values[bands[i] - 1] !== null) {
						_this2.addAlpha_ = true;
						break outer;
					}
					continue;
				}
				for (let imageIndex = 0; imageIndex < values.length; ++imageIndex) if (values[imageIndex] !== null) {
					_this2.addAlpha_ = true;
					break outer;
				}
			}
			let bandCount = _this2.addAlpha_ ? 1 : 0;
			for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) bandCount += samplesPerPixel[sourceIndex];
			_this2.bandCount = bandCount;
			_this2.tileGrid = new TileGrid({
				extent,
				minZoom,
				origin,
				resolutions,
				tileSizes: commonRenderTileSizes
			});
			_this2.setTileSizes(commonSourceTileSizes);
			_this2.setLoader(_this2.loadTile_.bind(_this2));
			_this2.setState("ready");
			const zoom = 1;
			if (resolutions.length === 2) resolutions = [
				resolutions[0],
				resolutions[1],
				resolutions[1] / 2
			];
			else if (resolutions.length === 1) resolutions = [
				resolutions[0] * 2,
				resolutions[0],
				resolutions[0] / 2
			];
			let viewExtent = extent;
			if (_this2.transformMatrix) {
				const matrix = makeInverse(create$2(), _this2.transformMatrix.slice());
				const transformFn = createTransformFromCoordinateTransform((input) => apply(matrix, input));
				viewExtent = applyTransform(extent, transformFn);
			}
			_this2.viewResolver({
				showFullExtent: true,
				projection: _this2.projection,
				resolutions,
				center: toUserCoordinate(getCenter(viewExtent), _this2.projection),
				extent: toUserExtent(viewExtent, _this2.projection),
				zoom
			});
		})();
	}
	/**
	* @param {number} z The z tile index.
	* @param {number} x The x tile index.
	* @param {number} y The y tile index.
	* @param {import('./DataTile.js').LoaderOptions} options The loader options.
	* @return {Promise} The composed tile data.
	* @private
	*/
	loadTile_(z, x, y, options) {
		const sourceTileSize = this.getTileSize(z);
		const sourceCount = this.sourceImagery_.length;
		const requests = new Array(sourceCount * 2);
		const nodataValues = this.nodataValues_;
		const sourceInfo = this.sourceInfo_;
		const pool = getWorkerPool();
		for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
			const source = sourceInfo[sourceIndex];
			const resolutionFactor = this.resolutionFactors_[sourceIndex];
			const pixelBounds = [
				Math.round(x * (sourceTileSize[0] * resolutionFactor)),
				Math.round(y * (sourceTileSize[1] * resolutionFactor)),
				Math.round((x + 1) * (sourceTileSize[0] * resolutionFactor)),
				Math.round((y + 1) * (sourceTileSize[1] * resolutionFactor))
			];
			const image = this.sourceImagery_[sourceIndex][z];
			let samples;
			if (source.bands) samples = source.bands.map(function(bandNumber) {
				return bandNumber - 1;
			});
			/** @type {number|Array<number>} */
			let fillValue;
			if ("nodata" in source && source.nodata !== null) if (Array.isArray(source.nodata)) if (samples) fillValue = samples.map(function(sampleIndex) {
				const v = source.nodata[sampleIndex];
				return v !== void 0 ? v : nodataValues[sourceIndex][sampleIndex];
			});
			else fillValue = source.nodata.map(function(v, i) {
				return v !== void 0 ? v : nodataValues[sourceIndex][i];
			});
			else fillValue = source.nodata;
			else if (!samples) fillValue = nodataValues[sourceIndex];
			else fillValue = samples.map(function(sampleIndex) {
				return nodataValues[sourceIndex][sampleIndex];
			});
			const readOptions = {
				window: pixelBounds,
				width: sourceTileSize[0],
				height: sourceTileSize[1],
				samples,
				fillValue,
				pool,
				interleave: false,
				signal: options.signal
			};
			if (readRGB(this.convertToRGB_, image)) requests[sourceIndex] = image.readRGB(readOptions);
			else requests[sourceIndex] = image.readRasters(readOptions);
			const maskIndex = sourceCount + sourceIndex;
			const mask = this.sourceMasks_[sourceIndex][z];
			if (!mask) {
				requests[maskIndex] = Promise.resolve(null);
				continue;
			}
			requests[maskIndex] = mask.readRasters({
				window: pixelBounds,
				width: sourceTileSize[0],
				height: sourceTileSize[1],
				samples: [0],
				pool,
				interleave: false
			});
		}
		return Promise.all(requests).then(this.composeTile_.bind(this, sourceTileSize)).catch(function(error$2) {
			error(error$2);
			throw error$2;
		});
	}
	/**
	* @param {import("../size.js").Size} sourceTileSize The source tile size.
	* @param {Array} sourceSamples The source samples.
	* @return {import("../DataTile.js").Data} The composed tile data.
	* @private
	*/
	composeTile_(sourceTileSize, sourceSamples) {
		const metadata = this.metadata_;
		const sourceInfo = this.sourceInfo_;
		const sourceCount = this.sourceImagery_.length;
		const bandCount = this.bandCount;
		const samplesPerPixel = this.samplesPerPixel_;
		const nodataValues = this.nodataValues_;
		const normalize = this.normalize_;
		const addAlpha = this.addAlpha_;
		const pixelCount = sourceTileSize[0] * sourceTileSize[1];
		const dataLength = pixelCount * bandCount;
		/** @type {Uint8Array|Float32Array} */
		let data;
		if (normalize) data = new Uint8Array(dataLength);
		else data = new Float32Array(dataLength);
		const sourceGains = new Array(sourceCount);
		const sourceBiases = new Array(sourceCount);
		const sourceNodatas = new Array(sourceCount);
		for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
			const source = sourceInfo[sourceIndex];
			const numSamples = samplesPerPixel[sourceIndex];
			if (normalize) {
				const gains = new Array(numSamples);
				const biases = new Array(numSamples);
				const stats = metadata[sourceIndex][0];
				for (let sampleIndex = 0; sampleIndex < numSamples; ++sampleIndex) {
					let bandIndex;
					if (source.bands) bandIndex = source.bands[sampleIndex] - 1;
					else bandIndex = sampleIndex;
					let min = Array.isArray(source.min) ? source.min[bandIndex] : source.min;
					let max = Array.isArray(source.max) ? source.max[bandIndex] : source.max;
					if (min === void 0) if (stats && STATISTICS_MINIMUM in stats) min = parseFloat(stats[STATISTICS_MINIMUM]);
					else min = getMinForDataType(sourceSamples[sourceIndex][0]);
					if (max === void 0) if (stats && STATISTICS_MAXIMUM in stats) max = parseFloat(stats[STATISTICS_MAXIMUM]);
					else max = getMaxForDataType(sourceSamples[sourceIndex][0]);
					gains[sampleIndex] = 255 / (max - min);
					biases[sampleIndex] = -min * gains[sampleIndex];
				}
				sourceGains[sourceIndex] = gains;
				sourceBiases[sourceIndex] = biases;
			}
			if (addAlpha) {
				const nodatas = new Array(numSamples);
				for (let sampleIndex = 0; sampleIndex < numSamples; ++sampleIndex) {
					let bandIndex;
					if (source.bands) bandIndex = source.bands[sampleIndex] - 1;
					else bandIndex = sampleIndex;
					if (Array.isArray(source.nodata)) {
						const nd = source.nodata[bandIndex];
						nodatas[sampleIndex] = nd !== void 0 ? nd : nodataValues[sourceIndex][bandIndex];
					} else if (source.nodata !== void 0) nodatas[sampleIndex] = source.nodata;
					else nodatas[sampleIndex] = nodataValues[sourceIndex][bandIndex];
				}
				sourceNodatas[sourceIndex] = nodatas;
			}
		}
		let dataIndex = 0;
		for (let pixelIndex = 0; pixelIndex < pixelCount; ++pixelIndex) {
			let transparent = addAlpha;
			for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
				for (let sampleIndex = 0; sampleIndex < samplesPerPixel[sourceIndex]; ++sampleIndex) {
					const sourceValue = sourceSamples[sourceIndex][sampleIndex][pixelIndex];
					let value;
					if (normalize) value = clamp(sourceGains[sourceIndex][sampleIndex] * sourceValue + sourceBiases[sourceIndex][sampleIndex], 0, 255);
					else value = sourceValue;
					if (!addAlpha) data[dataIndex] = value;
					else {
						const nodata = sourceNodatas[sourceIndex][sampleIndex];
						const nodataIsNaN = isNaN(nodata);
						if (!nodataIsNaN && sourceValue !== nodata || nodataIsNaN && !isNaN(sourceValue)) {
							transparent = false;
							data[dataIndex] = value;
						}
					}
					dataIndex++;
				}
				if (!transparent) {
					const mask = sourceSamples[sourceCount + sourceIndex];
					if (mask && !mask[0][pixelIndex]) transparent = true;
				}
			}
			if (addAlpha) {
				if (!transparent) data[dataIndex] = 255;
				dataIndex++;
			}
		}
		return data;
	}
};
/**
* Get a promise for view properties based on the source.  Use the result of this function
* as the `view` option in a map constructor.
*
*     const source = new GeoTIFF(options);
*
*     const map = new Map({
*       target: 'map',
*       layers: [
*         new TileLayer({
*           source: source,
*         }),
*       ],
*       view: source.getView(),
*     });
*
* @function
* @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
* @api
*
*/
GeoTIFFSource.prototype.getView;
//#endregion
export { TileRange as $, createOrUpdateFromFlatCoordinates as $n, fromLonLat as $t, inAndOut as A, ceil as An, memoizeOne as At, WORKER_OFFSCREEN_CANVAS as B, applyTransform as Bn, EventType_default as Bt, outerWidth as C, rotate$1 as Cn, __vitePreload as Cr, Observable as Ct, replaceNode as D, wrapX$1 as Dn, _defineProperty as Dr, FALSE as Dt, replaceChildren as E, squaredDistanceToSegment as En, init_objectSpread2 as Er, BaseEvent as Et, IMAGE_DECODE as F, round as Fn, equals as Ft, createOrUpdate as G, containsCoordinate as Gn, abstract as Gt, extentFromProjection as H, buffer as Hn, listenOnce as Ht, MAC as I, squaredDistance$1 as In, extend as It, getKeyZXY as J, coordinateRelationship as Jn, init_objectWithoutProperties as Jt, getCacheKey as K, containsExtent as Kn, getUid as Kt, PASSIVE_EVENT_LISTENERS as L, squaredSegmentDistance as Ln, linearFindNearest as Lt, TileState_default as M, floor as Mn, ascending as Mt, CREATE_IMAGE_BITMAP as N, lerp$1 as Nn, binarySearch as Nt, Tile as O, compareVersions as On, init_defineProperty as Or, TRUE as Ot, DEVICE_PIXEL_RATIO as P, modulo as Pn, descending as Pt, toSize as Q, createOrUpdateFromCoordinate as Qn, equivalent$1 as Qt, SAFARI_BUG_237906 as R, toFixed as Rn, reverseSubArray as Rt, outerHeight as S, equals$1 as Sn, warn as Sr, BaseObject as St, removeChildren as T, squaredDistance as Tn, _objectSpread2 as Tr, Target as Tt, getForProjection as U, clone as Un, unlistenByKey as Ut, createXYZ as V, boundingExtent as Vn, listen as Vt, TileGrid as W, closestSquaredDistanceXY as Wn, ObjectEventType_default as Wt, hashZXY as X, createOrUpdate$2 as Xn, createProjection as Xt, hash as Y, createEmpty as Yn, register as Yt, hasArea as Z, createOrUpdateEmpty as Zn, disableCoordinateWarning as Zt, render$1 as _, add$2 as _n, returnOrUpdate as _r, scale$2 as _t, DataTile as a, getUserProjection as an, getBottomLeft as ar, getIntersectionPoint as at, getSharedCanvasContext2D as b, closestOnSegment as bn, wrapX$2 as br, translate$1 as bt, TileEventType_default as c, toUserResolution as cn, getForViewAndSize as cr, apply as ct, Source as d, getArea as dn, getRotatedViewport as dr, equivalent as dt, fromUserCoordinate as en, equals$2 as er, intersectsLineString as et, ERROR_THRESHOLD as f, getDistance as fn, getTopLeft as fr, fromString as ft, canvasPool as g, METERS_PER_UNIT$1 as gn, isEmpty$1 as gr, rotate as gt, calculateSourceResolution as h, Projection as hn, intersects as hr, reset as ht, fromTransform as i, getTransformFromProjections as in, getArea$1 as ir, forEach as it, linear as j, clamp as jn, toPromise as jt, easeOut as k, padNumber as kn, VOID as kt, TileSource as l, transform as ln, getHeight as lr, compose as lt, calculateSourceExtentResolution as m, isEmpty as mn, getWidth as mr, multiply as mt, DataTileSource as n, get as nn, extendCoordinate as nr, intersectsLinearRingArray as nt, asArrayLike as o, toUserCoordinate as on, getBottomRight as or, linearRingsContainsXY as ot, Triangulation as p, clear as pn, getTopRight as pr, makeInverse as pt, getKey as q, containsXY as qn, _objectWithoutProperties as qt, create$1 as r, getTransform as rn, forEachCorner as rr, intersectsLinearRingMultiArray as rt, asImageLike as s, toUserExtent as sn, getCenter as sr, linearRingssContainsXY as st, GeoTIFF_exports as t, fromUserExtent as tn, extend$1 as tr, intersectsLineStringArray as tt, TileSourceEvent as u, transformExtent as un, getIntersection as ur, create$2 as ut, createCanvasContext2D as v, angleBetween as vn, scaleFromCenter as vr, setFromArray as vt, releaseCanvas as w, scale$3 as wn, _asyncToGenerator as wr, unByKey as wt, isCanvas as x, distance as xn, Relationship_default as xr, assert as xt, createMockDiv as y, closestOnCircle as yn, wrapAndSliceX as yr, toString as yt, WEBKIT as z, toRadians as zn, Disposable as zt };

//# sourceMappingURL=geotiff-debug.js.map