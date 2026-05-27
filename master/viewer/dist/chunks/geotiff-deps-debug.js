//#endregion
//#region node_modules/@petamoriken/float16/src/_util/primordials.mjs
/** @type {<T extends (...args: any) => any>(target: T) => (thisArg: ThisType<T>, ...args: any[]) => any} */
function uncurryThis(target) {
	return (thisArg, ...args) => {
		return ReflectApply(target, thisArg, args);
	};
}
/** @type {(target: any, key: string | symbol) => (thisArg: any, ...args: any[]) => any} */
function uncurryThisGetter(target, key) {
	return uncurryThis(ReflectGetOwnPropertyDescriptor(target, key).get);
}
var { apply: ReflectApply, construct: ReflectConstruct, defineProperty: ReflectDefineProperty, get: ReflectGet, getOwnPropertyDescriptor: ReflectGetOwnPropertyDescriptor, getPrototypeOf: ReflectGetPrototypeOf, has: ReflectHas, ownKeys: ReflectOwnKeys, set: ReflectSet, setPrototypeOf: ReflectSetPrototypeOf } = Reflect;
var { EPSILON, MAX_SAFE_INTEGER, isFinite: NumberIsFinite, isNaN: NumberIsNaN } = Number;
var { iterator: SymbolIterator, species: SymbolSpecies, toStringTag: SymbolToStringTag, for: SymbolFor } = Symbol;
var NativeObject = Object;
var { create: ObjectCreate, defineProperty: ObjectDefineProperty, freeze: ObjectFreeze, is: ObjectIs } = NativeObject;
var ObjectPrototype = NativeObject.prototype;
ObjectPrototype.__lookupGetter__ && ObjectPrototype.__lookupGetter__;
NativeObject.hasOwn || ObjectPrototype.hasOwnProperty;
var NativeArray = Array;
NativeArray.isArray;
var ArrayPrototype = NativeArray.prototype;
ArrayPrototype.join;
ArrayPrototype.push;
ArrayPrototype.toLocaleString;
var NativeArrayPrototypeSymbolIterator = ArrayPrototype[SymbolIterator];
/** @type {<T>(array: T[]) => IterableIterator<T>} */
var ArrayPrototypeSymbolIterator = uncurryThis(NativeArrayPrototypeSymbolIterator);
var { abs: MathAbs, trunc: MathTrunc } = Math;
var NativeArrayBuffer = ArrayBuffer;
NativeArrayBuffer.isView;
var ArrayBufferPrototype = NativeArrayBuffer.prototype;
ArrayBufferPrototype.slice;
uncurryThisGetter(ArrayBufferPrototype, "byteLength");
var NativeSharedArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : null;
NativeSharedArrayBuffer && uncurryThisGetter(NativeSharedArrayBuffer.prototype, "byteLength");
/** @typedef {Uint8Array|Uint8ClampedArray|Uint16Array|Uint32Array|Int8Array|Int16Array|Int32Array|Float32Array|Float64Array|BigUint64Array|BigInt64Array} TypedArray */
/** @type {any} */
var TypedArray = ReflectGetPrototypeOf(Uint8Array);
TypedArray.from;
var TypedArrayPrototype = TypedArray.prototype;
TypedArrayPrototype[SymbolIterator];
TypedArrayPrototype.keys;
TypedArrayPrototype.values;
TypedArrayPrototype.entries;
TypedArrayPrototype.set;
TypedArrayPrototype.reverse;
TypedArrayPrototype.fill;
TypedArrayPrototype.copyWithin;
TypedArrayPrototype.sort;
TypedArrayPrototype.slice;
TypedArrayPrototype.subarray;
uncurryThisGetter(TypedArrayPrototype, "buffer");
uncurryThisGetter(TypedArrayPrototype, "byteOffset");
uncurryThisGetter(TypedArrayPrototype, "length");
uncurryThisGetter(TypedArrayPrototype, SymbolToStringTag);
var NativeUint8Array = Uint8Array;
var NativeUint16Array = Uint16Array;
var NativeUint32Array = Uint32Array;
var NativeFloat32Array = Float32Array;
/** @type {any} */
var ArrayIteratorPrototype = ReflectGetPrototypeOf([][SymbolIterator]());
/** @type {<T>(arrayIterator: IterableIterator<T>) => IteratorResult<T>} */
var ArrayIteratorPrototypeNext = uncurryThis(ArrayIteratorPrototype.next);
/** @type {<T = unknown, TReturn = any, TNext = unknown>(generator: Generator<T, TReturn, TNext>, value?: TNext) => T} */
var GeneratorPrototypeNext = uncurryThis((function* () {})().next);
var IteratorPrototype = ReflectGetPrototypeOf(ArrayIteratorPrototype);
var DataViewPrototype = DataView.prototype;
/** @type {(dataView: DataView, byteOffset: number, littleEndian?: boolean) => number} */
var DataViewPrototypeGetUint16 = uncurryThis(DataViewPrototype.getUint16);
DataViewPrototype.setUint16;
var WeakSetPrototype = WeakSet.prototype;
WeakSetPrototype.add;
WeakSetPrototype.has;
/**
* Do not construct with arguments to avoid calling the "set" method
* @type {{new <K extends {}, V>(): WeakMap<K, V>}}
*/
var NativeWeakMap = WeakMap;
var WeakMapPrototype = NativeWeakMap.prototype;
/** @type {<K extends {}, V>(weakMap: WeakMap<K, V>, key: K) => V} */
var WeakMapPrototypeGet = uncurryThis(WeakMapPrototype.get);
WeakMapPrototype.has;
/** @type {<K extends {}, V>(weakMap: WeakMap<K, V>, key: K, value: V) => WeakMap} */
var WeakMapPrototypeSet = uncurryThis(WeakMapPrototype.set);
//#endregion
//#region node_modules/@petamoriken/float16/src/_util/arrayIterator.mjs
/** @type {WeakMap<{}, IterableIterator<any>>} */
var arrayIterators = new NativeWeakMap();
var SafeIteratorPrototype = ObjectCreate(null, {
	next: { value: function next() {
		return ArrayIteratorPrototypeNext(WeakMapPrototypeGet(arrayIterators, this));
	} },
	[SymbolIterator]: { value: function values() {
		return this;
	} }
});
/**
* Wrap the Array around the SafeIterator If Array.prototype [@@iterator] has been modified
* @type {<T>(array: T[]) => Iterable<T>}
*/
function safeIfNeeded(array) {
	if (array[SymbolIterator] === NativeArrayPrototypeSymbolIterator && ArrayIteratorPrototype.next === ArrayIteratorPrototypeNext) return array;
	const safe = ObjectCreate(SafeIteratorPrototype);
	WeakMapPrototypeSet(arrayIterators, safe, ArrayPrototypeSymbolIterator(array));
	return safe;
}
/** @type {WeakMap<{}, Generator<any>>} */
var generators = new NativeWeakMap();
/** @see https://tc39.es/ecma262/#sec-%arrayiteratorprototype%-object */
var DummyArrayIteratorPrototype = ObjectCreate(IteratorPrototype, { next: {
	value: function next() {
		return GeneratorPrototypeNext(WeakMapPrototypeGet(generators, this));
	},
	writable: true,
	configurable: true
} });
for (const key of ReflectOwnKeys(ArrayIteratorPrototype)) {
	if (key === "next") continue;
	ObjectDefineProperty(DummyArrayIteratorPrototype, key, ReflectGetOwnPropertyDescriptor(ArrayIteratorPrototype, key));
}
//#endregion
//#region node_modules/@petamoriken/float16/src/_util/converter.mjs
var INVERSE_OF_EPSILON = 1 / EPSILON;
var FLOAT16_MIN_VALUE = 6103515625e-14;
var FLOAT16_EPSILON = .0009765625;
FLOAT16_EPSILON * FLOAT16_MIN_VALUE;
FLOAT16_EPSILON * INVERSE_OF_EPSILON;
var buffer = new NativeArrayBuffer(4);
var floatView = new NativeFloat32Array(buffer);
var uint32View = new NativeUint32Array(buffer);
var baseTable = new NativeUint16Array(512);
var shiftTable = new NativeUint8Array(512);
for (let i = 0; i < 256; ++i) {
	const e = i - 127;
	if (e < -24) {
		baseTable[i] = 0;
		baseTable[i | 256] = 32768;
		shiftTable[i] = 24;
		shiftTable[i | 256] = 24;
	} else if (e < -14) {
		baseTable[i] = 1024 >> -e - 14;
		baseTable[i | 256] = 1024 >> -e - 14 | 32768;
		shiftTable[i] = -e - 1;
		shiftTable[i | 256] = -e - 1;
	} else if (e <= 15) {
		baseTable[i] = e + 15 << 10;
		baseTable[i | 256] = e + 15 << 10 | 32768;
		shiftTable[i] = 13;
		shiftTable[i | 256] = 13;
	} else if (e < 128) {
		baseTable[i] = 31744;
		baseTable[i | 256] = 64512;
		shiftTable[i] = 24;
		shiftTable[i | 256] = 24;
	} else {
		baseTable[i] = 31744;
		baseTable[i | 256] = 64512;
		shiftTable[i] = 13;
		shiftTable[i | 256] = 13;
	}
}
var mantissaTable = new NativeUint32Array(2048);
for (let i = 1; i < 1024; ++i) {
	let m = i << 13;
	let e = 0;
	while ((m & 8388608) === 0) {
		m <<= 1;
		e -= 8388608;
	}
	m &= -8388609;
	e += 947912704;
	mantissaTable[i] = m | e;
}
for (let i = 1024; i < 2048; ++i) mantissaTable[i] = 939524096 + (i - 1024 << 13);
var exponentTable = new NativeUint32Array(64);
for (let i = 1; i < 31; ++i) exponentTable[i] = i << 23;
exponentTable[31] = 1199570944;
exponentTable[32] = 2147483648;
for (let i = 33; i < 63; ++i) exponentTable[i] = 2147483648 + (i - 32 << 23);
exponentTable[63] = 3347054592;
var offsetTable = new NativeUint16Array(64);
for (let i = 1; i < 64; ++i) if (i !== 32) offsetTable[i] = 1024;
/**
* convert a half float number bits to a number
* @param {number} float16bits - half float number bits
* @returns {number} double float
*/
function convertToNumber(float16bits) {
	const i = float16bits >> 10;
	uint32View[0] = mantissaTable[offsetTable[i] + (float16bits & 1023)] + exponentTable[i];
	return floatView[0];
}
//#endregion
//#region node_modules/@petamoriken/float16/src/DataView.mjs
/**
* returns an unsigned 16-bit float at the specified byte offset from the start of the DataView
* @param {DataView} dataView
* @param {number} byteOffset
* @param {[boolean]} opts
* @returns {number}
*/
function getFloat16(dataView, byteOffset, ...opts) {
	return convertToNumber(DataViewPrototypeGetUint16(dataView, byteOffset, ...safeIfNeeded(opts)));
}
//#endregion
//#region node_modules/xml-utils/get-attribute.mjs
function getAttribute(tag, attributeName, options) {
	const debug = options && options.debug || false;
	if (debug) console.log("[xml-utils] getting " + attributeName + " in " + tag);
	const xml = typeof tag === "object" ? tag.outer : tag;
	const opening = xml.slice(0, xml.indexOf(">") + 1);
	const quotechars = ["\"", "'"];
	for (let i = 0; i < quotechars.length; i++) {
		const char = quotechars[i];
		const pattern = attributeName + "\\=" + char + "([^" + char + "]*)" + char;
		if (debug) console.log("[xml-utils] pattern:", pattern);
		const match = new RegExp(pattern).exec(opening);
		if (debug) console.log("[xml-utils] match:", match);
		if (match) return match[1];
	}
}
//#endregion
//#region node_modules/xml-utils/index-of-match.mjs
function indexOfMatch(xml, pattern, startIndex) {
	const match = new RegExp(pattern).exec(xml.slice(startIndex));
	if (match) return startIndex + match.index;
	else return -1;
}
//#endregion
//#region node_modules/xml-utils/index-of-match-end.mjs
function indexOfMatchEnd(xml, pattern, startIndex) {
	const match = new RegExp(pattern).exec(xml.slice(startIndex));
	if (match) return startIndex + match.index + match[0].length - 1;
	else return -1;
}
//#endregion
//#region node_modules/xml-utils/count-substring.mjs
function countSubstring(string, substring) {
	const pattern = new RegExp(substring, "g");
	const match = string.match(pattern);
	return match ? match.length : 0;
}
//#endregion
//#region node_modules/xml-utils/find-tag-by-name.mjs
function findTagByName(xml, tagName, options) {
	const debug = options && options.debug || false;
	const startIndex = options && options.startIndex || 0;
	if (debug) console.log("[xml-utils] starting findTagByName with", tagName, " and ", options);
	const start = indexOfMatch(xml, `\<${tagName}[ \n\>\/]`, startIndex);
	if (debug) console.log("[xml-utils] start:", start);
	if (start === -1) return void 0;
	const afterStart = xml.slice(start + tagName.length);
	let relativeEnd = indexOfMatchEnd(afterStart, "^[^<]*[ /]>", 0);
	const selfClosing = relativeEnd !== -1 && afterStart[relativeEnd - 1] === "/";
	if (debug) console.log("[xml-utils] selfClosing:", selfClosing);
	if (selfClosing === false) {
		let startIndex = 0;
		let openings = 1;
		let closings = 0;
		while ((relativeEnd = indexOfMatchEnd(afterStart, "[ /]" + tagName + ">", startIndex)) !== -1) {
			const clip = afterStart.substring(startIndex, relativeEnd + 1);
			openings += countSubstring(clip, "<" + tagName + "[ \n	>]");
			closings += countSubstring(clip, "</" + tagName + ">");
			if (closings >= openings) break;
			startIndex = relativeEnd;
		}
	}
	const end = start + tagName.length + relativeEnd + 1;
	if (debug) console.log("[xml-utils] end:", end);
	if (end === -1) return void 0;
	const outer = xml.slice(start, end);
	let inner;
	if (selfClosing) inner = null;
	else inner = outer.slice(outer.indexOf(">") + 1, outer.lastIndexOf("<"));
	return {
		inner,
		outer,
		start,
		end
	};
}
//#endregion
//#region node_modules/xml-utils/find-tags-by-name.mjs
function findTagsByName(xml, tagName, options) {
	const tags = [];
	const debug = options && options.debug || false;
	const nested = options && typeof options.nested === "boolean" ? options.nested : true;
	let startIndex = options && options.startIndex || 0;
	let tag;
	while (tag = findTagByName(xml, tagName, {
		debug,
		startIndex
	})) {
		if (nested) startIndex = tag.start + 1 + tagName.length;
		else startIndex = tag.end;
		tags.push(tag);
	}
	if (debug) console.log("findTagsByName found", tags.length, "tags");
	return tags;
}
//#endregion
//#region node_modules/web-worker/src/browser/index.js
/**
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var browser_default = typeof Worker !== "undefined" ? Worker : void 0;
//#endregion
//#region node_modules/quick-lru/index.js
var QuickLRU = class extends Map {
	constructor(options = {}) {
		super();
		if (!(options.maxSize && options.maxSize > 0)) throw new TypeError("`maxSize` must be a number greater than 0");
		if (typeof options.maxAge === "number" && options.maxAge === 0) throw new TypeError("`maxAge` must be a number greater than 0");
		this.maxSize = options.maxSize;
		this.maxAge = options.maxAge || Number.POSITIVE_INFINITY;
		this.onEviction = options.onEviction;
		this.cache = /* @__PURE__ */ new Map();
		this.oldCache = /* @__PURE__ */ new Map();
		this._size = 0;
	}
	_emitEvictions(cache) {
		if (typeof this.onEviction !== "function") return;
		for (const [key, item] of cache) this.onEviction(key, item.value);
	}
	_deleteIfExpired(key, item) {
		if (typeof item.expiry === "number" && item.expiry <= Date.now()) {
			if (typeof this.onEviction === "function") this.onEviction(key, item.value);
			return this.delete(key);
		}
		return false;
	}
	_getOrDeleteIfExpired(key, item) {
		if (this._deleteIfExpired(key, item) === false) return item.value;
	}
	_getItemValue(key, item) {
		return item.expiry ? this._getOrDeleteIfExpired(key, item) : item.value;
	}
	_peek(key, cache) {
		const item = cache.get(key);
		return this._getItemValue(key, item);
	}
	_set(key, value) {
		this.cache.set(key, value);
		this._size++;
		if (this._size >= this.maxSize) {
			this._size = 0;
			this._emitEvictions(this.oldCache);
			this.oldCache = this.cache;
			this.cache = /* @__PURE__ */ new Map();
		}
	}
	_moveToRecent(key, item) {
		this.oldCache.delete(key);
		this._set(key, item);
	}
	*_entriesAscending() {
		for (const item of this.oldCache) {
			const [key, value] = item;
			if (!this.cache.has(key)) {
				if (this._deleteIfExpired(key, value) === false) yield item;
			}
		}
		for (const item of this.cache) {
			const [key, value] = item;
			if (this._deleteIfExpired(key, value) === false) yield item;
		}
	}
	get(key) {
		if (this.cache.has(key)) {
			const item = this.cache.get(key);
			return this._getItemValue(key, item);
		}
		if (this.oldCache.has(key)) {
			const item = this.oldCache.get(key);
			if (this._deleteIfExpired(key, item) === false) {
				this._moveToRecent(key, item);
				return item.value;
			}
		}
	}
	set(key, value, { maxAge = this.maxAge } = {}) {
		const expiry = typeof maxAge === "number" && maxAge !== Number.POSITIVE_INFINITY ? Date.now() + maxAge : void 0;
		if (this.cache.has(key)) this.cache.set(key, {
			value,
			expiry
		});
		else this._set(key, {
			value,
			expiry
		});
		return this;
	}
	has(key) {
		if (this.cache.has(key)) return !this._deleteIfExpired(key, this.cache.get(key));
		if (this.oldCache.has(key)) return !this._deleteIfExpired(key, this.oldCache.get(key));
		return false;
	}
	peek(key) {
		if (this.cache.has(key)) return this._peek(key, this.cache);
		if (this.oldCache.has(key)) return this._peek(key, this.oldCache);
	}
	delete(key) {
		const deleted = this.cache.delete(key);
		if (deleted) this._size--;
		return this.oldCache.delete(key) || deleted;
	}
	clear() {
		this.cache.clear();
		this.oldCache.clear();
		this._size = 0;
	}
	resize(newSize) {
		if (!(newSize && newSize > 0)) throw new TypeError("`maxSize` must be a number greater than 0");
		const items = [...this._entriesAscending()];
		const removeCount = items.length - newSize;
		if (removeCount < 0) {
			this.cache = new Map(items);
			this.oldCache = /* @__PURE__ */ new Map();
			this._size = items.length;
		} else {
			if (removeCount > 0) this._emitEvictions(items.slice(0, removeCount));
			this.oldCache = new Map(items.slice(removeCount));
			this.cache = /* @__PURE__ */ new Map();
			this._size = 0;
		}
		this.maxSize = newSize;
	}
	*keys() {
		for (const [key] of this) yield key;
	}
	*values() {
		for (const [, value] of this) yield value;
	}
	*[Symbol.iterator]() {
		for (const item of this.cache) {
			const [key, value] = item;
			if (this._deleteIfExpired(key, value) === false) yield [key, value.value];
		}
		for (const item of this.oldCache) {
			const [key, value] = item;
			if (!this.cache.has(key)) {
				if (this._deleteIfExpired(key, value) === false) yield [key, value.value];
			}
		}
	}
	*entriesDescending() {
		let items = [...this.cache];
		for (let i = items.length - 1; i >= 0; --i) {
			const [key, value] = items[i];
			if (this._deleteIfExpired(key, value) === false) yield [key, value.value];
		}
		items = [...this.oldCache];
		for (let i = items.length - 1; i >= 0; --i) {
			const [key, value] = items[i];
			if (!this.cache.has(key)) {
				if (this._deleteIfExpired(key, value) === false) yield [key, value.value];
			}
		}
	}
	*entriesAscending() {
		for (const [key, value] of this._entriesAscending()) yield [key, value.value];
	}
	get size() {
		if (!this._size) return this.oldCache.size;
		let oldCacheSize = 0;
		for (const key of this.oldCache.keys()) if (!this.cache.has(key)) oldCacheSize++;
		return Math.min(this._size + oldCacheSize, this.maxSize);
	}
	entries() {
		return this.entriesAscending();
	}
	forEach(callbackFunction, thisArgument = this) {
		for (const [key, value] of this.entriesAscending()) callbackFunction.call(thisArgument, value, key, this);
	}
	get [Symbol.toStringTag]() {
		return JSON.stringify([...this.entriesAscending()]);
	}
};
//#endregion
export { getFloat16 as a, getAttribute as i, browser_default as n, findTagsByName as r, QuickLRU as t };

//# sourceMappingURL=geotiff-deps-debug.js.map