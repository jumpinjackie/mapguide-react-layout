function uncurryThis(target) {
  return (thisArg, ...args) => {
    return ReflectApply(target, thisArg, args);
  };
}
function uncurryThisGetter(target, key) {
  return uncurryThis(
    ReflectGetOwnPropertyDescriptor(
      target,
      key
    ).get
  );
}
const {
  apply: ReflectApply,
  getOwnPropertyDescriptor: ReflectGetOwnPropertyDescriptor,
  getPrototypeOf: ReflectGetPrototypeOf,
  ownKeys: ReflectOwnKeys
} = Reflect;
const {
  iterator: SymbolIterator,
  toStringTag: SymbolToStringTag
} = Symbol;
const NativeObject = Object;
const {
  create: ObjectCreate,
  defineProperty: ObjectDefineProperty
} = NativeObject;
const NativeArray = Array;
const ArrayPrototype = NativeArray.prototype;
const NativeArrayPrototypeSymbolIterator = ArrayPrototype[SymbolIterator];
const ArrayPrototypeSymbolIterator = uncurryThis(NativeArrayPrototypeSymbolIterator);
const NativeArrayBuffer = ArrayBuffer;
const ArrayBufferPrototype = NativeArrayBuffer.prototype;
uncurryThisGetter(ArrayBufferPrototype, "byteLength");
const NativeSharedArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : null;
NativeSharedArrayBuffer && uncurryThisGetter(NativeSharedArrayBuffer.prototype, "byteLength");
const TypedArray = ReflectGetPrototypeOf(Uint8Array);
TypedArray.from;
const TypedArrayPrototype = TypedArray.prototype;
TypedArrayPrototype[SymbolIterator];
uncurryThis(TypedArrayPrototype.keys);
uncurryThis(
  TypedArrayPrototype.values
);
uncurryThis(
  TypedArrayPrototype.entries
);
uncurryThis(TypedArrayPrototype.set);
uncurryThis(
  TypedArrayPrototype.reverse
);
uncurryThis(TypedArrayPrototype.fill);
uncurryThis(
  TypedArrayPrototype.copyWithin
);
uncurryThis(TypedArrayPrototype.sort);
uncurryThis(TypedArrayPrototype.slice);
uncurryThis(
  TypedArrayPrototype.subarray
);
uncurryThisGetter(
  TypedArrayPrototype,
  "buffer"
);
uncurryThisGetter(
  TypedArrayPrototype,
  "byteOffset"
);
uncurryThisGetter(
  TypedArrayPrototype,
  "length"
);
uncurryThisGetter(
  TypedArrayPrototype,
  SymbolToStringTag
);
const NativeUint8Array = Uint8Array;
const NativeUint16Array = Uint16Array;
const NativeUint32Array = Uint32Array;
const NativeFloat32Array = Float32Array;
const ArrayIteratorPrototype = ReflectGetPrototypeOf([][SymbolIterator]());
const ArrayIteratorPrototypeNext = uncurryThis(ArrayIteratorPrototype.next);
const GeneratorPrototypeNext = uncurryThis(function* () {
}().next);
const IteratorPrototype = ReflectGetPrototypeOf(ArrayIteratorPrototype);
const DataViewPrototype = DataView.prototype;
const DataViewPrototypeGetUint16 = uncurryThis(
  DataViewPrototype.getUint16
);
const NativeWeakMap = WeakMap;
const WeakMapPrototype = NativeWeakMap.prototype;
const WeakMapPrototypeGet = uncurryThis(WeakMapPrototype.get);
const WeakMapPrototypeSet = uncurryThis(WeakMapPrototype.set);
const arrayIterators = new NativeWeakMap();
const SafeIteratorPrototype = ObjectCreate(null, {
  next: {
    value: function next() {
      const arrayIterator = WeakMapPrototypeGet(arrayIterators, this);
      return ArrayIteratorPrototypeNext(arrayIterator);
    }
  },
  [SymbolIterator]: {
    value: function values() {
      return this;
    }
  }
});
function safeIfNeeded(array) {
  if (array[SymbolIterator] === NativeArrayPrototypeSymbolIterator && ArrayIteratorPrototype.next === ArrayIteratorPrototypeNext) {
    return array;
  }
  const safe = ObjectCreate(SafeIteratorPrototype);
  WeakMapPrototypeSet(arrayIterators, safe, ArrayPrototypeSymbolIterator(array));
  return safe;
}
const generators = new NativeWeakMap();
const DummyArrayIteratorPrototype = ObjectCreate(IteratorPrototype, {
  next: {
    value: function next2() {
      const generator = WeakMapPrototypeGet(generators, this);
      return GeneratorPrototypeNext(generator);
    },
    writable: true,
    configurable: true
  }
});
for (const key of ReflectOwnKeys(ArrayIteratorPrototype)) {
  if (key === "next") {
    continue;
  }
  ObjectDefineProperty(DummyArrayIteratorPrototype, key, ReflectGetOwnPropertyDescriptor(ArrayIteratorPrototype, key));
}
const buffer = new NativeArrayBuffer(4);
const floatView = new NativeFloat32Array(buffer);
const uint32View = new NativeUint32Array(buffer);
const baseTable = new NativeUint16Array(512);
const shiftTable = new NativeUint8Array(512);
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
const mantissaTable = new NativeUint32Array(2048);
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
for (let i = 1024; i < 2048; ++i) {
  mantissaTable[i] = 939524096 + (i - 1024 << 13);
}
const exponentTable = new NativeUint32Array(64);
for (let i = 1; i < 31; ++i) {
  exponentTable[i] = i << 23;
}
exponentTable[31] = 1199570944;
exponentTable[32] = 2147483648;
for (let i = 33; i < 63; ++i) {
  exponentTable[i] = 2147483648 + (i - 32 << 23);
}
exponentTable[63] = 3347054592;
const offsetTable = new NativeUint16Array(64);
for (let i = 1; i < 64; ++i) {
  if (i !== 32) {
    offsetTable[i] = 1024;
  }
}
function convertToNumber(float16bits) {
  const i = float16bits >> 10;
  uint32View[0] = mantissaTable[offsetTable[i] + (float16bits & 1023)] + exponentTable[i];
  return floatView[0];
}
function getFloat16(dataView, byteOffset, ...opts) {
  return convertToNumber(
    DataViewPrototypeGetUint16(dataView, byteOffset, ...safeIfNeeded(opts))
  );
}
function getAttribute(tag, attributeName, options) {
  const xml = typeof tag === "object" ? tag.outer : tag;
  const opening = xml.slice(0, xml.indexOf(">") + 1);
  const quotechars = ['"', "'"];
  for (let i = 0; i < quotechars.length; i++) {
    const char = quotechars[i];
    const pattern = attributeName + "\\=" + char + "([^" + char + "]*)" + char;
    const re = new RegExp(pattern);
    const match = re.exec(opening);
    if (match) return match[1];
  }
}
function indexOfMatch(xml, pattern, startIndex) {
  const re = new RegExp(pattern);
  const match = re.exec(xml.slice(startIndex));
  if (match) return startIndex + match.index;
  else return -1;
}
function indexOfMatchEnd(xml, pattern, startIndex) {
  const re = new RegExp(pattern);
  const match = re.exec(xml.slice(startIndex));
  if (match) return startIndex + match.index + match[0].length - 1;
  else return -1;
}
function countSubstring(string, substring) {
  const pattern = new RegExp(substring, "g");
  const match = string.match(pattern);
  return match ? match.length : 0;
}
function findTagByName(xml, tagName, options) {
  const debug = options && options.debug || false;
  const nested = !(options && typeof options.nested === false);
  const startIndex = options && options.startIndex || 0;
  if (debug) console.log("[xml-utils] starting findTagByName with", tagName, " and ", options);
  const start = indexOfMatch(xml, `<${tagName}[ 
>/]`, startIndex);
  if (debug) console.log("[xml-utils] start:", start);
  if (start === -1) return void 0;
  const afterStart = xml.slice(start + tagName.length);
  let relativeEnd = indexOfMatchEnd(afterStart, "^[^<]*[ /]>", 0);
  const selfClosing = relativeEnd !== -1 && afterStart[relativeEnd - 1] === "/";
  if (debug) console.log("[xml-utils] selfClosing:", selfClosing);
  if (selfClosing === false) {
    if (nested) {
      let startIndex2 = 0;
      let openings = 1;
      let closings = 0;
      while ((relativeEnd = indexOfMatchEnd(afterStart, "[ /]" + tagName + ">", startIndex2)) !== -1) {
        const clip = afterStart.substring(startIndex2, relativeEnd + 1);
        openings += countSubstring(clip, "<" + tagName + "[ \n	>]");
        closings += countSubstring(clip, "</" + tagName + ">");
        if (closings >= openings) break;
        startIndex2 = relativeEnd;
      }
    } else {
      relativeEnd = indexOfMatchEnd(afterStart, "[ /]" + tagName + ">", 0);
    }
  }
  const end = start + tagName.length + relativeEnd + 1;
  if (debug) console.log("[xml-utils] end:", end);
  if (end === -1) return void 0;
  const outer = xml.slice(start, end);
  let inner;
  if (selfClosing) {
    inner = null;
  } else {
    inner = outer.slice(outer.indexOf(">") + 1, outer.lastIndexOf("<"));
  }
  return { inner, outer, start, end };
}
function findTagsByName(xml, tagName, options) {
  const tags = [];
  const debug = false;
  let startIndex = 0;
  let tag;
  while (tag = findTagByName(xml, tagName, { debug, startIndex })) {
    {
      startIndex = tag.start + 1 + tagName.length;
    }
    tags.push(tag);
  }
  return tags;
}
const Worker$1 = typeof Worker !== "undefined" ? Worker : void 0;
class QuickLRU extends Map {
  constructor(options = {}) {
    super();
    if (!(options.maxSize && options.maxSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }
    if (typeof options.maxAge === "number" && options.maxAge === 0) {
      throw new TypeError("`maxAge` must be a number greater than 0");
    }
    this.maxSize = options.maxSize;
    this.maxAge = options.maxAge || Number.POSITIVE_INFINITY;
    this.onEviction = options.onEviction;
    this.cache = /* @__PURE__ */ new Map();
    this.oldCache = /* @__PURE__ */ new Map();
    this._size = 0;
  }
  // TODO: Use private class methods when targeting Node.js 16.
  _emitEvictions(cache) {
    if (typeof this.onEviction !== "function") {
      return;
    }
    for (const [key, item] of cache) {
      this.onEviction(key, item.value);
    }
  }
  _deleteIfExpired(key, item) {
    if (typeof item.expiry === "number" && item.expiry <= Date.now()) {
      if (typeof this.onEviction === "function") {
        this.onEviction(key, item.value);
      }
      return this.delete(key);
    }
    return false;
  }
  _getOrDeleteIfExpired(key, item) {
    const deleted = this._deleteIfExpired(key, item);
    if (deleted === false) {
      return item.value;
    }
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
        const deleted = this._deleteIfExpired(key, value);
        if (deleted === false) {
          yield item;
        }
      }
    }
    for (const item of this.cache) {
      const [key, value] = item;
      const deleted = this._deleteIfExpired(key, value);
      if (deleted === false) {
        yield item;
      }
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
    if (this.cache.has(key)) {
      this.cache.set(key, {
        value,
        expiry
      });
    } else {
      this._set(key, { value, expiry });
    }
    return this;
  }
  has(key) {
    if (this.cache.has(key)) {
      return !this._deleteIfExpired(key, this.cache.get(key));
    }
    if (this.oldCache.has(key)) {
      return !this._deleteIfExpired(key, this.oldCache.get(key));
    }
    return false;
  }
  peek(key) {
    if (this.cache.has(key)) {
      return this._peek(key, this.cache);
    }
    if (this.oldCache.has(key)) {
      return this._peek(key, this.oldCache);
    }
  }
  delete(key) {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this._size--;
    }
    return this.oldCache.delete(key) || deleted;
  }
  clear() {
    this.cache.clear();
    this.oldCache.clear();
    this._size = 0;
  }
  resize(newSize) {
    if (!(newSize && newSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }
    const items = [...this._entriesAscending()];
    const removeCount = items.length - newSize;
    if (removeCount < 0) {
      this.cache = new Map(items);
      this.oldCache = /* @__PURE__ */ new Map();
      this._size = items.length;
    } else {
      if (removeCount > 0) {
        this._emitEvictions(items.slice(0, removeCount));
      }
      this.oldCache = new Map(items.slice(removeCount));
      this.cache = /* @__PURE__ */ new Map();
      this._size = 0;
    }
    this.maxSize = newSize;
  }
  *keys() {
    for (const [key] of this) {
      yield key;
    }
  }
  *values() {
    for (const [, value] of this) {
      yield value;
    }
  }
  *[Symbol.iterator]() {
    for (const item of this.cache) {
      const [key, value] = item;
      const deleted = this._deleteIfExpired(key, value);
      if (deleted === false) {
        yield [key, value.value];
      }
    }
    for (const item of this.oldCache) {
      const [key, value] = item;
      if (!this.cache.has(key)) {
        const deleted = this._deleteIfExpired(key, value);
        if (deleted === false) {
          yield [key, value.value];
        }
      }
    }
  }
  *entriesDescending() {
    let items = [...this.cache];
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      const [key, value] = item;
      const deleted = this._deleteIfExpired(key, value);
      if (deleted === false) {
        yield [key, value.value];
      }
    }
    items = [...this.oldCache];
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      const [key, value] = item;
      if (!this.cache.has(key)) {
        const deleted = this._deleteIfExpired(key, value);
        if (deleted === false) {
          yield [key, value.value];
        }
      }
    }
  }
  *entriesAscending() {
    for (const [key, value] of this._entriesAscending()) {
      yield [key, value.value];
    }
  }
  get size() {
    if (!this._size) {
      return this.oldCache.size;
    }
    let oldCacheSize = 0;
    for (const key of this.oldCache.keys()) {
      if (!this.cache.has(key)) {
        oldCacheSize++;
      }
    }
    return Math.min(this._size + oldCacheSize, this.maxSize);
  }
  entries() {
    return this.entriesAscending();
  }
  forEach(callbackFunction, thisArgument = this) {
    for (const [key, value] of this.entriesAscending()) {
      callbackFunction.call(thisArgument, value, key, this);
    }
  }
  get [Symbol.toStringTag]() {
    return JSON.stringify([...this.entriesAscending()]);
  }
}
export {
  QuickLRU as Q,
  Worker$1 as W,
  getFloat16 as a,
  findTagsByName as f,
  getAttribute as g
};
//# sourceMappingURL=geotiff-deps-debug.js.map
