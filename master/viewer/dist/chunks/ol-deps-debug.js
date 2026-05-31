//#region node_modules/quickselect/index.js
/**
* Rearranges items so that all items in the [left, k] are the smallest.
* The k-th element will have the (k - left + 1)-th smallest value in [left, right].
*
* @template T
* @param {T[]} arr the array to partially sort (in place)
* @param {number} k middle index for partial sorting (as defined above)
* @param {number} [left=0] left index of the range to sort
* @param {number} [right=arr.length-1] right index
* @param {(a: T, b: T) => number} [compare = (a, b) => a - b] compare function
*/
function quickselect(arr, k, left = 0, right = arr.length - 1, compare = defaultCompare) {
	while (right > left) {
		if (right - left > 600) {
			const n = right - left + 1;
			const m = k - left + 1;
			const z = Math.log(n);
			const s = .5 * Math.exp(2 * z / 3);
			const sd = .5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
			quickselect(arr, k, Math.max(left, Math.floor(k - m * s / n + sd)), Math.min(right, Math.floor(k + (n - m) * s / n + sd)), compare);
		}
		const t = arr[k];
		let i = left;
		/** @type {number} */
		let j = right;
		swap(arr, left, k);
		if (compare(arr[right], t) > 0) swap(arr, left, right);
		while (i < j) {
			swap(arr, i, j);
			i++;
			j--;
			while (compare(arr[i], t) < 0) i++;
			while (compare(arr[j], t) > 0) j--;
		}
		if (compare(arr[left], t) === 0) swap(arr, left, j);
		else {
			j++;
			swap(arr, j, right);
		}
		if (j <= k) left = j + 1;
		if (k <= j) right = j - 1;
	}
}
/**
* @template T
* @param {T[]} arr
* @param {number} i
* @param {number} j
*/
function swap(arr, i, j) {
	const tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}
/**
* @template T
* @param {T} a
* @param {T} b
* @returns {number}
*/
function defaultCompare(a, b) {
	return a < b ? -1 : a > b ? 1 : 0;
}
//#endregion
//#region node_modules/rbush/index.js
var RBush = class {
	constructor(maxEntries = 9) {
		this._maxEntries = Math.max(4, maxEntries);
		this._minEntries = Math.max(2, Math.ceil(this._maxEntries * .4));
		this.clear();
	}
	all() {
		return this._all(this.data, []);
	}
	search(bbox) {
		let node = this.data;
		const result = [];
		if (!intersects(bbox, node)) return result;
		const toBBox = this.toBBox;
		const nodesToSearch = [];
		while (node) {
			for (let i = 0; i < node.children.length; i++) {
				const child = node.children[i];
				const childBBox = node.leaf ? toBBox(child) : child;
				if (intersects(bbox, childBBox)) if (node.leaf) result.push(child);
				else if (contains(bbox, childBBox)) this._all(child, result);
				else nodesToSearch.push(child);
			}
			node = nodesToSearch.pop();
		}
		return result;
	}
	collides(bbox) {
		let node = this.data;
		if (!intersects(bbox, node)) return false;
		const nodesToSearch = [];
		while (node) {
			for (let i = 0; i < node.children.length; i++) {
				const child = node.children[i];
				const childBBox = node.leaf ? this.toBBox(child) : child;
				if (intersects(bbox, childBBox)) {
					if (node.leaf || contains(bbox, childBBox)) return true;
					nodesToSearch.push(child);
				}
			}
			node = nodesToSearch.pop();
		}
		return false;
	}
	load(data) {
		if (!(data && data.length)) return this;
		if (data.length < this._minEntries) {
			for (let i = 0; i < data.length; i++) this.insert(data[i]);
			return this;
		}
		let node = this._build(data.slice(), 0, data.length - 1, 0);
		if (!this.data.children.length) this.data = node;
		else if (this.data.height === node.height) this._splitRoot(this.data, node);
		else {
			if (this.data.height < node.height) {
				const tmpNode = this.data;
				this.data = node;
				node = tmpNode;
			}
			this._insert(node, this.data.height - node.height - 1, true);
		}
		return this;
	}
	insert(item) {
		if (item) this._insert(item, this.data.height - 1);
		return this;
	}
	clear() {
		this.data = createNode([]);
		return this;
	}
	remove(item, equalsFn) {
		if (!item) return this;
		let node = this.data;
		const bbox = this.toBBox(item);
		const path = [];
		const indexes = [];
		let i, parent, goingUp;
		while (node || path.length) {
			if (!node) {
				node = path.pop();
				parent = path[path.length - 1];
				i = indexes.pop();
				goingUp = true;
			}
			if (node.leaf) {
				const index = findItem(item, node.children, equalsFn);
				if (index !== -1) {
					node.children.splice(index, 1);
					path.push(node);
					this._condense(path);
					return this;
				}
			}
			if (!goingUp && !node.leaf && contains(node, bbox)) {
				path.push(node);
				indexes.push(i);
				i = 0;
				parent = node;
				node = node.children[0];
			} else if (parent) {
				i++;
				node = parent.children[i];
				goingUp = false;
			} else node = null;
		}
		return this;
	}
	toBBox(item) {
		return item;
	}
	compareMinX(a, b) {
		return a.minX - b.minX;
	}
	compareMinY(a, b) {
		return a.minY - b.minY;
	}
	toJSON() {
		return this.data;
	}
	fromJSON(data) {
		this.data = data;
		return this;
	}
	_all(node, result) {
		const nodesToSearch = [];
		while (node) {
			if (node.leaf) result.push(...node.children);
			else nodesToSearch.push(...node.children);
			node = nodesToSearch.pop();
		}
		return result;
	}
	_build(items, left, right, height) {
		const N = right - left + 1;
		let M = this._maxEntries;
		let node;
		if (N <= M) {
			node = createNode(items.slice(left, right + 1));
			calcBBox(node, this.toBBox);
			return node;
		}
		if (!height) {
			height = Math.ceil(Math.log(N) / Math.log(M));
			M = Math.ceil(N / Math.pow(M, height - 1));
		}
		node = createNode([]);
		node.leaf = false;
		node.height = height;
		const N2 = Math.ceil(N / M);
		const N1 = N2 * Math.ceil(Math.sqrt(M));
		multiSelect(items, left, right, N1, this.compareMinX);
		for (let i = left; i <= right; i += N1) {
			const right2 = Math.min(i + N1 - 1, right);
			multiSelect(items, i, right2, N2, this.compareMinY);
			for (let j = i; j <= right2; j += N2) {
				const right3 = Math.min(j + N2 - 1, right2);
				node.children.push(this._build(items, j, right3, height - 1));
			}
		}
		calcBBox(node, this.toBBox);
		return node;
	}
	_chooseSubtree(bbox, node, level, path) {
		while (true) {
			path.push(node);
			if (node.leaf || path.length - 1 === level) break;
			let minArea = Infinity;
			let minEnlargement = Infinity;
			let targetNode;
			for (let i = 0; i < node.children.length; i++) {
				const child = node.children[i];
				const area = bboxArea(child);
				const enlargement = enlargedArea(bbox, child) - area;
				if (enlargement < minEnlargement) {
					minEnlargement = enlargement;
					minArea = area < minArea ? area : minArea;
					targetNode = child;
				} else if (enlargement === minEnlargement) {
					if (area < minArea) {
						minArea = area;
						targetNode = child;
					}
				}
			}
			node = targetNode || node.children[0];
		}
		return node;
	}
	_insert(item, level, isNode) {
		const bbox = isNode ? item : this.toBBox(item);
		const insertPath = [];
		const node = this._chooseSubtree(bbox, this.data, level, insertPath);
		node.children.push(item);
		extend(node, bbox);
		while (level >= 0) if (insertPath[level].children.length > this._maxEntries) {
			this._split(insertPath, level);
			level--;
		} else break;
		this._adjustParentBBoxes(bbox, insertPath, level);
	}
	_split(insertPath, level) {
		const node = insertPath[level];
		const M = node.children.length;
		const m = this._minEntries;
		this._chooseSplitAxis(node, m, M);
		const splitIndex = this._chooseSplitIndex(node, m, M);
		const newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
		newNode.height = node.height;
		newNode.leaf = node.leaf;
		calcBBox(node, this.toBBox);
		calcBBox(newNode, this.toBBox);
		if (level) insertPath[level - 1].children.push(newNode);
		else this._splitRoot(node, newNode);
	}
	_splitRoot(node, newNode) {
		this.data = createNode([node, newNode]);
		this.data.height = node.height + 1;
		this.data.leaf = false;
		calcBBox(this.data, this.toBBox);
	}
	_chooseSplitIndex(node, m, M) {
		let index;
		let minOverlap = Infinity;
		let minArea = Infinity;
		for (let i = m; i <= M - m; i++) {
			const bbox1 = distBBox(node, 0, i, this.toBBox);
			const bbox2 = distBBox(node, i, M, this.toBBox);
			const overlap = intersectionArea(bbox1, bbox2);
			const area = bboxArea(bbox1) + bboxArea(bbox2);
			if (overlap < minOverlap) {
				minOverlap = overlap;
				index = i;
				minArea = area < minArea ? area : minArea;
			} else if (overlap === minOverlap) {
				if (area < minArea) {
					minArea = area;
					index = i;
				}
			}
		}
		return index || M - m;
	}
	_chooseSplitAxis(node, m, M) {
		const compareMinX = node.leaf ? this.compareMinX : compareNodeMinX;
		const compareMinY = node.leaf ? this.compareMinY : compareNodeMinY;
		if (this._allDistMargin(node, m, M, compareMinX) < this._allDistMargin(node, m, M, compareMinY)) node.children.sort(compareMinX);
	}
	_allDistMargin(node, m, M, compare) {
		node.children.sort(compare);
		const toBBox = this.toBBox;
		const leftBBox = distBBox(node, 0, m, toBBox);
		const rightBBox = distBBox(node, M - m, M, toBBox);
		let margin = bboxMargin(leftBBox) + bboxMargin(rightBBox);
		for (let i = m; i < M - m; i++) {
			const child = node.children[i];
			extend(leftBBox, node.leaf ? toBBox(child) : child);
			margin += bboxMargin(leftBBox);
		}
		for (let i = M - m - 1; i >= m; i--) {
			const child = node.children[i];
			extend(rightBBox, node.leaf ? toBBox(child) : child);
			margin += bboxMargin(rightBBox);
		}
		return margin;
	}
	_adjustParentBBoxes(bbox, path, level) {
		for (let i = level; i >= 0; i--) extend(path[i], bbox);
	}
	_condense(path) {
		for (let i = path.length - 1, siblings; i >= 0; i--) if (path[i].children.length === 0) if (i > 0) {
			siblings = path[i - 1].children;
			siblings.splice(siblings.indexOf(path[i]), 1);
		} else this.clear();
		else calcBBox(path[i], this.toBBox);
	}
};
function findItem(item, items, equalsFn) {
	if (!equalsFn) return items.indexOf(item);
	for (let i = 0; i < items.length; i++) if (equalsFn(item, items[i])) return i;
	return -1;
}
function calcBBox(node, toBBox) {
	distBBox(node, 0, node.children.length, toBBox, node);
}
function distBBox(node, k, p, toBBox, destNode) {
	if (!destNode) destNode = createNode(null);
	destNode.minX = Infinity;
	destNode.minY = Infinity;
	destNode.maxX = -Infinity;
	destNode.maxY = -Infinity;
	for (let i = k; i < p; i++) {
		const child = node.children[i];
		extend(destNode, node.leaf ? toBBox(child) : child);
	}
	return destNode;
}
function extend(a, b) {
	a.minX = Math.min(a.minX, b.minX);
	a.minY = Math.min(a.minY, b.minY);
	a.maxX = Math.max(a.maxX, b.maxX);
	a.maxY = Math.max(a.maxY, b.maxY);
	return a;
}
function compareNodeMinX(a, b) {
	return a.minX - b.minX;
}
function compareNodeMinY(a, b) {
	return a.minY - b.minY;
}
function bboxArea(a) {
	return (a.maxX - a.minX) * (a.maxY - a.minY);
}
function bboxMargin(a) {
	return a.maxX - a.minX + (a.maxY - a.minY);
}
function enlargedArea(a, b) {
	return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) * (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
}
function intersectionArea(a, b) {
	const minX = Math.max(a.minX, b.minX);
	const minY = Math.max(a.minY, b.minY);
	const maxX = Math.min(a.maxX, b.maxX);
	const maxY = Math.min(a.maxY, b.maxY);
	return Math.max(0, maxX - minX) * Math.max(0, maxY - minY);
}
function contains(a, b) {
	return a.minX <= b.minX && a.minY <= b.minY && b.maxX <= a.maxX && b.maxY <= a.maxY;
}
function intersects(a, b) {
	return b.minX <= a.maxX && b.minY <= a.maxY && b.maxX >= a.minX && b.maxY >= a.minY;
}
function createNode(children) {
	return {
		children,
		height: 1,
		leaf: true,
		minX: Infinity,
		minY: Infinity,
		maxX: -Infinity,
		maxY: -Infinity
	};
}
function multiSelect(arr, left, right, n, compare) {
	const stack = [left, right];
	while (stack.length) {
		right = stack.pop();
		left = stack.pop();
		if (right - left <= n) continue;
		const mid = left + Math.ceil((right - left) / n / 2) * n;
		quickselect(arr, mid, left, right, compare);
		stack.push(left, mid, mid, right);
	}
}
//#endregion
//#region node_modules/pbf/index.js
var SHIFT_LEFT_32 = 65536 * 65536;
var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
var TEXT_DECODER_MIN_LENGTH = 12;
var utf8TextDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf-8");
var PBF_VARINT = 0;
var PBF_FIXED64 = 1;
var PBF_BYTES = 2;
var PBF_FIXED32 = 5;
var Pbf = class {
	/**
	* @param {Uint8Array | ArrayBuffer} [buf]
	*/
	constructor(buf = new Uint8Array(16)) {
		this.buf = ArrayBuffer.isView(buf) ? buf : new Uint8Array(buf);
		this.dataView = new DataView(this.buf.buffer);
		this.pos = 0;
		this.type = 0;
		this.length = this.buf.length;
	}
	/**
	* @template T
	* @param {(tag: number, result: T, pbf: Pbf) => void} readField
	* @param {T} result
	* @param {number} [end]
	*/
	readFields(readField, result, end = this.length) {
		while (this.pos < end) {
			const val = this.readVarint(), tag = val >> 3, startPos = this.pos;
			this.type = val & 7;
			readField(tag, result, this);
			if (this.pos === startPos) this.skip(val);
		}
		return result;
	}
	/**
	* @template T
	* @param {(tag: number, result: T, pbf: Pbf) => void} readField
	* @param {T} result
	*/
	readMessage(readField, result) {
		return this.readFields(readField, result, this.readVarint() + this.pos);
	}
	readFixed32() {
		const val = this.dataView.getUint32(this.pos, true);
		this.pos += 4;
		return val;
	}
	readSFixed32() {
		const val = this.dataView.getInt32(this.pos, true);
		this.pos += 4;
		return val;
	}
	readFixed64() {
		const val = this.dataView.getUint32(this.pos, true) + this.dataView.getUint32(this.pos + 4, true) * SHIFT_LEFT_32;
		this.pos += 8;
		return val;
	}
	readSFixed64() {
		const val = this.dataView.getUint32(this.pos, true) + this.dataView.getInt32(this.pos + 4, true) * SHIFT_LEFT_32;
		this.pos += 8;
		return val;
	}
	readFloat() {
		const val = this.dataView.getFloat32(this.pos, true);
		this.pos += 4;
		return val;
	}
	readDouble() {
		const val = this.dataView.getFloat64(this.pos, true);
		this.pos += 8;
		return val;
	}
	/**
	* @param {boolean} [isSigned]
	*/
	readVarint(isSigned) {
		const buf = this.buf;
		let val, b;
		b = buf[this.pos++];
		val = b & 127;
		if (b < 128) return val;
		b = buf[this.pos++];
		val |= (b & 127) << 7;
		if (b < 128) return val;
		b = buf[this.pos++];
		val |= (b & 127) << 14;
		if (b < 128) return val;
		b = buf[this.pos++];
		val |= (b & 127) << 21;
		if (b < 128) return val;
		b = buf[this.pos];
		val |= (b & 15) << 28;
		return readVarintRemainder(val, isSigned, this);
	}
	readVarint64() {
		return this.readVarint(true);
	}
	readSVarint() {
		const num = this.readVarint();
		return num % 2 === 1 ? (num + 1) / -2 : num / 2;
	}
	readBoolean() {
		return Boolean(this.readVarint());
	}
	readString() {
		const end = this.readVarint() + this.pos;
		const pos = this.pos;
		this.pos = end;
		if (end - pos >= TEXT_DECODER_MIN_LENGTH && utf8TextDecoder) return utf8TextDecoder.decode(this.buf.subarray(pos, end));
		return readUtf8(this.buf, pos, end);
	}
	readBytes() {
		const end = this.readVarint() + this.pos, buffer = this.buf.subarray(this.pos, end);
		this.pos = end;
		return buffer;
	}
	/**
	* @param {number[]} [arr]
	* @param {boolean} [isSigned]
	*/
	readPackedVarint(arr = [], isSigned) {
		const end = this.readPackedEnd();
		while (this.pos < end) arr.push(this.readVarint(isSigned));
		return arr;
	}
	/** @param {number[]} [arr] */
	readPackedSVarint(arr = []) {
		const end = this.readPackedEnd();
		while (this.pos < end) arr.push(this.readSVarint());
		return arr;
	}
	/** @param {boolean[]} [arr] */
	readPackedBoolean(arr = []) {
		const end = this.readPackedEnd();
		while (this.pos < end) arr.push(this.readBoolean());
		return arr;
	}
	/** @param {number[]} [arr] */
	readPackedFloat(arr = []) {
		const end = this.readPackedEnd();
		while (this.pos < end) arr.push(this.readFloat());
		return arr;
	}
	/** @param {number[]} [arr] */
	readPackedDouble(arr = []) {
		const end = this.readPackedEnd();
		while (this.pos < end) arr.push(this.readDouble());
		return arr;
	}
	/** @param {number[]} [arr] */
	readPackedFixed32(arr = []) {
		const end = this.readPackedEnd();
		while (this.pos < end) arr.push(this.readFixed32());
		return arr;
	}
	/** @param {number[]} [arr] */
	readPackedSFixed32(arr = []) {
		const end = this.readPackedEnd();
		while (this.pos < end) arr.push(this.readSFixed32());
		return arr;
	}
	/** @param {number[]} [arr] */
	readPackedFixed64(arr = []) {
		const end = this.readPackedEnd();
		while (this.pos < end) arr.push(this.readFixed64());
		return arr;
	}
	/** @param {number[]} [arr] */
	readPackedSFixed64(arr = []) {
		const end = this.readPackedEnd();
		while (this.pos < end) arr.push(this.readSFixed64());
		return arr;
	}
	readPackedEnd() {
		return this.type === PBF_BYTES ? this.readVarint() + this.pos : this.pos + 1;
	}
	/** @param {number} val */
	skip(val) {
		const type = val & 7;
		if (type === PBF_VARINT) while (this.buf[this.pos++] > 127);
		else if (type === PBF_BYTES) this.pos = this.readVarint() + this.pos;
		else if (type === PBF_FIXED32) this.pos += 4;
		else if (type === PBF_FIXED64) this.pos += 8;
		else throw new Error(`Unimplemented type: ${type}`);
	}
	/**
	* @param {number} tag
	* @param {number} type
	*/
	writeTag(tag, type) {
		this.writeVarint(tag << 3 | type);
	}
	/** @param {number} min */
	realloc(min) {
		let length = this.length || 16;
		while (length < this.pos + min) length *= 2;
		if (length !== this.length) {
			const buf = new Uint8Array(length);
			buf.set(this.buf);
			this.buf = buf;
			this.dataView = new DataView(buf.buffer);
			this.length = length;
		}
	}
	finish() {
		this.length = this.pos;
		this.pos = 0;
		return this.buf.subarray(0, this.length);
	}
	/** @param {number} val */
	writeFixed32(val) {
		this.realloc(4);
		this.dataView.setInt32(this.pos, val, true);
		this.pos += 4;
	}
	/** @param {number} val */
	writeSFixed32(val) {
		this.realloc(4);
		this.dataView.setInt32(this.pos, val, true);
		this.pos += 4;
	}
	/** @param {number} val */
	writeFixed64(val) {
		this.realloc(8);
		this.dataView.setInt32(this.pos, val & -1, true);
		this.dataView.setInt32(this.pos + 4, Math.floor(val * SHIFT_RIGHT_32), true);
		this.pos += 8;
	}
	/** @param {number} val */
	writeSFixed64(val) {
		this.realloc(8);
		this.dataView.setInt32(this.pos, val & -1, true);
		this.dataView.setInt32(this.pos + 4, Math.floor(val * SHIFT_RIGHT_32), true);
		this.pos += 8;
	}
	/** @param {number} val */
	writeVarint(val) {
		val = +val || 0;
		if (val > 268435455 || val < 0) {
			writeBigVarint(val, this);
			return;
		}
		this.realloc(4);
		this.buf[this.pos++] = val & 127 | (val > 127 ? 128 : 0);
		if (val <= 127) return;
		this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
		if (val <= 127) return;
		this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
		if (val <= 127) return;
		this.buf[this.pos++] = val >>> 7 & 127;
	}
	/** @param {number} val */
	writeSVarint(val) {
		this.writeVarint(val < 0 ? -val * 2 - 1 : val * 2);
	}
	/** @param {boolean} val */
	writeBoolean(val) {
		this.writeVarint(+val);
	}
	/** @param {string} str */
	writeString(str) {
		str = String(str);
		this.realloc(str.length * 4);
		this.pos++;
		const startPos = this.pos;
		this.pos = writeUtf8(this.buf, str, this.pos);
		const len = this.pos - startPos;
		if (len >= 128) makeRoomForExtraLength(startPos, len, this);
		this.pos = startPos - 1;
		this.writeVarint(len);
		this.pos += len;
	}
	/** @param {number} val */
	writeFloat(val) {
		this.realloc(4);
		this.dataView.setFloat32(this.pos, val, true);
		this.pos += 4;
	}
	/** @param {number} val */
	writeDouble(val) {
		this.realloc(8);
		this.dataView.setFloat64(this.pos, val, true);
		this.pos += 8;
	}
	/** @param {Uint8Array} buffer */
	writeBytes(buffer) {
		const len = buffer.length;
		this.writeVarint(len);
		this.realloc(len);
		for (let i = 0; i < len; i++) this.buf[this.pos++] = buffer[i];
	}
	/**
	* @template T
	* @param {(obj: T, pbf: Pbf) => void} fn
	* @param {T} obj
	*/
	writeRawMessage(fn, obj) {
		this.pos++;
		const startPos = this.pos;
		fn(obj, this);
		const len = this.pos - startPos;
		if (len >= 128) makeRoomForExtraLength(startPos, len, this);
		this.pos = startPos - 1;
		this.writeVarint(len);
		this.pos += len;
	}
	/**
	* @template T
	* @param {number} tag
	* @param {(obj: T, pbf: Pbf) => void} fn
	* @param {T} obj
	*/
	writeMessage(tag, fn, obj) {
		this.writeTag(tag, PBF_BYTES);
		this.writeRawMessage(fn, obj);
	}
	/**
	* @param {number} tag
	* @param {number[]} arr
	*/
	writePackedVarint(tag, arr) {
		if (arr.length) this.writeMessage(tag, writePackedVarint, arr);
	}
	/**
	* @param {number} tag
	* @param {number[]} arr
	*/
	writePackedSVarint(tag, arr) {
		if (arr.length) this.writeMessage(tag, writePackedSVarint, arr);
	}
	/**
	* @param {number} tag
	* @param {boolean[]} arr
	*/
	writePackedBoolean(tag, arr) {
		if (arr.length) this.writeMessage(tag, writePackedBoolean, arr);
	}
	/**
	* @param {number} tag
	* @param {number[]} arr
	*/
	writePackedFloat(tag, arr) {
		if (arr.length) this.writeMessage(tag, writePackedFloat, arr);
	}
	/**
	* @param {number} tag
	* @param {number[]} arr
	*/
	writePackedDouble(tag, arr) {
		if (arr.length) this.writeMessage(tag, writePackedDouble, arr);
	}
	/**
	* @param {number} tag
	* @param {number[]} arr
	*/
	writePackedFixed32(tag, arr) {
		if (arr.length) this.writeMessage(tag, writePackedFixed32, arr);
	}
	/**
	* @param {number} tag
	* @param {number[]} arr
	*/
	writePackedSFixed32(tag, arr) {
		if (arr.length) this.writeMessage(tag, writePackedSFixed32, arr);
	}
	/**
	* @param {number} tag
	* @param {number[]} arr
	*/
	writePackedFixed64(tag, arr) {
		if (arr.length) this.writeMessage(tag, writePackedFixed64, arr);
	}
	/**
	* @param {number} tag
	* @param {number[]} arr
	*/
	writePackedSFixed64(tag, arr) {
		if (arr.length) this.writeMessage(tag, writePackedSFixed64, arr);
	}
	/**
	* @param {number} tag
	* @param {Uint8Array} buffer
	*/
	writeBytesField(tag, buffer) {
		this.writeTag(tag, PBF_BYTES);
		this.writeBytes(buffer);
	}
	/**
	* @param {number} tag
	* @param {number} val
	*/
	writeFixed32Field(tag, val) {
		this.writeTag(tag, PBF_FIXED32);
		this.writeFixed32(val);
	}
	/**
	* @param {number} tag
	* @param {number} val
	*/
	writeSFixed32Field(tag, val) {
		this.writeTag(tag, PBF_FIXED32);
		this.writeSFixed32(val);
	}
	/**
	* @param {number} tag
	* @param {number} val
	*/
	writeFixed64Field(tag, val) {
		this.writeTag(tag, PBF_FIXED64);
		this.writeFixed64(val);
	}
	/**
	* @param {number} tag
	* @param {number} val
	*/
	writeSFixed64Field(tag, val) {
		this.writeTag(tag, PBF_FIXED64);
		this.writeSFixed64(val);
	}
	/**
	* @param {number} tag
	* @param {number} val
	*/
	writeVarintField(tag, val) {
		this.writeTag(tag, PBF_VARINT);
		this.writeVarint(val);
	}
	/**
	* @param {number} tag
	* @param {number} val
	*/
	writeSVarintField(tag, val) {
		this.writeTag(tag, PBF_VARINT);
		this.writeSVarint(val);
	}
	/**
	* @param {number} tag
	* @param {string} str
	*/
	writeStringField(tag, str) {
		this.writeTag(tag, PBF_BYTES);
		this.writeString(str);
	}
	/**
	* @param {number} tag
	* @param {number} val
	*/
	writeFloatField(tag, val) {
		this.writeTag(tag, PBF_FIXED32);
		this.writeFloat(val);
	}
	/**
	* @param {number} tag
	* @param {number} val
	*/
	writeDoubleField(tag, val) {
		this.writeTag(tag, PBF_FIXED64);
		this.writeDouble(val);
	}
	/**
	* @param {number} tag
	* @param {boolean} val
	*/
	writeBooleanField(tag, val) {
		this.writeVarintField(tag, +val);
	}
};
/**
* @param {number} l
* @param {boolean | undefined} s
* @param {Pbf} p
*/
function readVarintRemainder(l, s, p) {
	const buf = p.buf;
	let h, b;
	b = buf[p.pos++];
	h = (b & 112) >> 4;
	if (b < 128) return toNum(l, h, s);
	b = buf[p.pos++];
	h |= (b & 127) << 3;
	if (b < 128) return toNum(l, h, s);
	b = buf[p.pos++];
	h |= (b & 127) << 10;
	if (b < 128) return toNum(l, h, s);
	b = buf[p.pos++];
	h |= (b & 127) << 17;
	if (b < 128) return toNum(l, h, s);
	b = buf[p.pos++];
	h |= (b & 127) << 24;
	if (b < 128) return toNum(l, h, s);
	b = buf[p.pos++];
	h |= (b & 1) << 31;
	if (b < 128) return toNum(l, h, s);
	throw new Error("Expected varint not more than 10 bytes");
}
/**
* @param {number} low
* @param {number} high
* @param {boolean} [isSigned]
*/
function toNum(low, high, isSigned) {
	return isSigned ? high * 4294967296 + (low >>> 0) : (high >>> 0) * 4294967296 + (low >>> 0);
}
/**
* @param {number} val
* @param {Pbf} pbf
*/
function writeBigVarint(val, pbf) {
	let low, high;
	if (val >= 0) {
		low = val % 4294967296 | 0;
		high = val / 4294967296 | 0;
	} else {
		low = ~(-val % 4294967296);
		high = ~(-val / 4294967296);
		if (low ^ 4294967295) low = low + 1 | 0;
		else {
			low = 0;
			high = high + 1 | 0;
		}
	}
	if (val >= 0x10000000000000000 || val < -0x10000000000000000) throw new Error("Given varint doesn't fit into 10 bytes");
	pbf.realloc(10);
	writeBigVarintLow(low, high, pbf);
	writeBigVarintHigh(high, pbf);
}
/**
* @param {number} high
* @param {number} low
* @param {Pbf} pbf
*/
function writeBigVarintLow(low, high, pbf) {
	pbf.buf[pbf.pos++] = low & 127 | 128;
	low >>>= 7;
	pbf.buf[pbf.pos++] = low & 127 | 128;
	low >>>= 7;
	pbf.buf[pbf.pos++] = low & 127 | 128;
	low >>>= 7;
	pbf.buf[pbf.pos++] = low & 127 | 128;
	low >>>= 7;
	pbf.buf[pbf.pos] = low & 127;
}
/**
* @param {number} high
* @param {Pbf} pbf
*/
function writeBigVarintHigh(high, pbf) {
	const lsb = (high & 7) << 4;
	pbf.buf[pbf.pos++] |= lsb | ((high >>>= 3) ? 128 : 0);
	if (!high) return;
	pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
	if (!high) return;
	pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
	if (!high) return;
	pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
	if (!high) return;
	pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
	if (!high) return;
	pbf.buf[pbf.pos++] = high & 127;
}
/**
* @param {number} startPos
* @param {number} len
* @param {Pbf} pbf
*/
function makeRoomForExtraLength(startPos, len, pbf) {
	const extraLen = len <= 16383 ? 1 : len <= 2097151 ? 2 : len <= 268435455 ? 3 : Math.floor(Math.log(len) / (Math.LN2 * 7));
	pbf.realloc(extraLen);
	for (let i = pbf.pos - 1; i >= startPos; i--) pbf.buf[i + extraLen] = pbf.buf[i];
}
/**
* @param {number[]} arr
* @param {Pbf} pbf
*/
function writePackedVarint(arr, pbf) {
	for (let i = 0; i < arr.length; i++) pbf.writeVarint(arr[i]);
}
/**
* @param {number[]} arr
* @param {Pbf} pbf
*/
function writePackedSVarint(arr, pbf) {
	for (let i = 0; i < arr.length; i++) pbf.writeSVarint(arr[i]);
}
/**
* @param {number[]} arr
* @param {Pbf} pbf
*/
function writePackedFloat(arr, pbf) {
	for (let i = 0; i < arr.length; i++) pbf.writeFloat(arr[i]);
}
/**
* @param {number[]} arr
* @param {Pbf} pbf
*/
function writePackedDouble(arr, pbf) {
	for (let i = 0; i < arr.length; i++) pbf.writeDouble(arr[i]);
}
/**
* @param {boolean[]} arr
* @param {Pbf} pbf
*/
function writePackedBoolean(arr, pbf) {
	for (let i = 0; i < arr.length; i++) pbf.writeBoolean(arr[i]);
}
/**
* @param {number[]} arr
* @param {Pbf} pbf
*/
function writePackedFixed32(arr, pbf) {
	for (let i = 0; i < arr.length; i++) pbf.writeFixed32(arr[i]);
}
/**
* @param {number[]} arr
* @param {Pbf} pbf
*/
function writePackedSFixed32(arr, pbf) {
	for (let i = 0; i < arr.length; i++) pbf.writeSFixed32(arr[i]);
}
/**
* @param {number[]} arr
* @param {Pbf} pbf
*/
function writePackedFixed64(arr, pbf) {
	for (let i = 0; i < arr.length; i++) pbf.writeFixed64(arr[i]);
}
/**
* @param {number[]} arr
* @param {Pbf} pbf
*/
function writePackedSFixed64(arr, pbf) {
	for (let i = 0; i < arr.length; i++) pbf.writeSFixed64(arr[i]);
}
/**
* @param {Uint8Array} buf
* @param {number} pos
* @param {number} end
*/
function readUtf8(buf, pos, end) {
	let str = "";
	let i = pos;
	while (i < end) {
		const b0 = buf[i];
		let c = null;
		let bytesPerSequence = b0 > 239 ? 4 : b0 > 223 ? 3 : b0 > 191 ? 2 : 1;
		if (i + bytesPerSequence > end) break;
		let b1, b2, b3;
		if (bytesPerSequence === 1) {
			if (b0 < 128) c = b0;
		} else if (bytesPerSequence === 2) {
			b1 = buf[i + 1];
			if ((b1 & 192) === 128) {
				c = (b0 & 31) << 6 | b1 & 63;
				if (c <= 127) c = null;
			}
		} else if (bytesPerSequence === 3) {
			b1 = buf[i + 1];
			b2 = buf[i + 2];
			if ((b1 & 192) === 128 && (b2 & 192) === 128) {
				c = (b0 & 15) << 12 | (b1 & 63) << 6 | b2 & 63;
				if (c <= 2047 || c >= 55296 && c <= 57343) c = null;
			}
		} else if (bytesPerSequence === 4) {
			b1 = buf[i + 1];
			b2 = buf[i + 2];
			b3 = buf[i + 3];
			if ((b1 & 192) === 128 && (b2 & 192) === 128 && (b3 & 192) === 128) {
				c = (b0 & 15) << 18 | (b1 & 63) << 12 | (b2 & 63) << 6 | b3 & 63;
				if (c <= 65535 || c >= 1114112) c = null;
			}
		}
		if (c === null) {
			c = 65533;
			bytesPerSequence = 1;
		} else if (c > 65535) {
			c -= 65536;
			str += String.fromCharCode(c >>> 10 & 1023 | 55296);
			c = 56320 | c & 1023;
		}
		str += String.fromCharCode(c);
		i += bytesPerSequence;
	}
	return str;
}
/**
* @param {Uint8Array} buf
* @param {string} str
* @param {number} pos
*/
function writeUtf8(buf, str, pos) {
	for (let i = 0, c, lead; i < str.length; i++) {
		c = str.charCodeAt(i);
		if (c > 55295 && c < 57344) if (lead) if (c < 56320) {
			buf[pos++] = 239;
			buf[pos++] = 191;
			buf[pos++] = 189;
			lead = c;
			continue;
		} else {
			c = lead - 55296 << 10 | c - 56320 | 65536;
			lead = null;
		}
		else {
			if (c > 56319 || i + 1 === str.length) {
				buf[pos++] = 239;
				buf[pos++] = 191;
				buf[pos++] = 189;
			} else lead = c;
			continue;
		}
		else if (lead) {
			buf[pos++] = 239;
			buf[pos++] = 191;
			buf[pos++] = 189;
			lead = null;
		}
		if (c < 128) buf[pos++] = c;
		else {
			if (c < 2048) buf[pos++] = c >> 6 | 192;
			else {
				if (c < 65536) buf[pos++] = c >> 12 | 224;
				else {
					buf[pos++] = c >> 18 | 240;
					buf[pos++] = c >> 12 & 63 | 128;
				}
				buf[pos++] = c >> 6 & 63 | 128;
			}
			buf[pos++] = c & 63 | 128;
		}
	}
	return pos;
}
//#endregion
//#region node_modules/fflate/esm/browser.js
var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
var fleb = new u8([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]);
var fdeb = new u8([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]);
var clim = new u8([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]);
var freb = function(eb, start) {
	var b = new u16(31);
	for (var i = 0; i < 31; ++i) b[i] = start += 1 << eb[i - 1];
	var r = new i32(b[30]);
	for (var i = 1; i < 30; ++i) for (var j = b[i]; j < b[i + 1]; ++j) r[j] = j - b[i] << 5 | i;
	return {
		b,
		r
	};
};
var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
_b.b;
var revfd = _b.r;
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
	var x = (i & 43690) >> 1 | (i & 21845) << 1;
	x = (x & 52428) >> 2 | (x & 13107) << 2;
	x = (x & 61680) >> 4 | (x & 3855) << 4;
	rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var hMap = (function(cd, mb, r) {
	var s = cd.length;
	var i = 0;
	var l = new u16(mb);
	for (; i < s; ++i) if (cd[i]) ++l[cd[i] - 1];
	var le = new u16(mb);
	for (i = 1; i < mb; ++i) le[i] = le[i - 1] + l[i - 1] << 1;
	var co;
	if (r) {
		co = new u16(1 << mb);
		var rvb = 15 - mb;
		for (i = 0; i < s; ++i) if (cd[i]) {
			var sv = i << 4 | cd[i];
			var r_1 = mb - cd[i];
			var v = le[cd[i] - 1]++ << r_1;
			for (var m = v | (1 << r_1) - 1; v <= m; ++v) co[rev[v] >> rvb] = sv;
		}
	} else {
		co = new u16(s);
		for (i = 0; i < s; ++i) if (cd[i]) co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
	}
	return co;
});
var flt = new u8(288);
for (var i = 0; i < 144; ++i) flt[i] = 8;
for (var i = 144; i < 256; ++i) flt[i] = 9;
for (var i = 256; i < 280; ++i) flt[i] = 7;
for (var i = 280; i < 288; ++i) flt[i] = 8;
var fdt = new u8(32);
for (var i = 0; i < 32; ++i) fdt[i] = 5;
var flm = /* @__PURE__ */ hMap(flt, 9, 0), fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
var shft = function(p) {
	return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
	if (s == null || s < 0) s = 0;
	if (e == null || e > v.length) e = v.length;
	return new u8(v.subarray(s, e));
};
var wbits = function(d, p, v) {
	v <<= p & 7;
	var o = p / 8 | 0;
	d[o] |= v;
	d[o + 1] |= v >> 8;
};
var wbits16 = function(d, p, v) {
	v <<= p & 7;
	var o = p / 8 | 0;
	d[o] |= v;
	d[o + 1] |= v >> 8;
	d[o + 2] |= v >> 16;
};
var hTree = function(d, mb) {
	var t = [];
	for (var i = 0; i < d.length; ++i) if (d[i]) t.push({
		s: i,
		f: d[i]
	});
	var s = t.length;
	var t2 = t.slice();
	if (!s) return {
		t: et,
		l: 0
	};
	if (s == 1) {
		var v = new u8(t[0].s + 1);
		v[t[0].s] = 1;
		return {
			t: v,
			l: 1
		};
	}
	t.sort(function(a, b) {
		return a.f - b.f;
	});
	t.push({
		s: -1,
		f: 25001
	});
	var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
	t[0] = {
		s: -1,
		f: l.f + r.f,
		l,
		r
	};
	while (i1 != s - 1) {
		l = t[t[i0].f < t[i2].f ? i0++ : i2++];
		r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
		t[i1++] = {
			s: -1,
			f: l.f + r.f,
			l,
			r
		};
	}
	var maxSym = t2[0].s;
	for (var i = 1; i < s; ++i) if (t2[i].s > maxSym) maxSym = t2[i].s;
	var tr = new u16(maxSym + 1);
	var mbt = ln(t[i1 - 1], tr, 0);
	if (mbt > mb) {
		var i = 0, dt = 0;
		var lft = mbt - mb, cst = 1 << lft;
		t2.sort(function(a, b) {
			return tr[b.s] - tr[a.s] || a.f - b.f;
		});
		for (; i < s; ++i) {
			var i2_1 = t2[i].s;
			if (tr[i2_1] > mb) {
				dt += cst - (1 << mbt - tr[i2_1]);
				tr[i2_1] = mb;
			} else break;
		}
		dt >>= lft;
		while (dt > 0) {
			var i2_2 = t2[i].s;
			if (tr[i2_2] < mb) dt -= 1 << mb - tr[i2_2]++ - 1;
			else ++i;
		}
		for (; i >= 0 && dt; --i) {
			var i2_3 = t2[i].s;
			if (tr[i2_3] == mb) {
				--tr[i2_3];
				++dt;
			}
		}
		mbt = mb;
	}
	return {
		t: new u8(tr),
		l: mbt
	};
};
var ln = function(n, l, d) {
	return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
	var s = c.length;
	while (s && !c[--s]);
	var cl = new u16(++s);
	var cli = 0, cln = c[0], cls = 1;
	var w = function(v) {
		cl[cli++] = v;
	};
	for (var i = 1; i <= s; ++i) if (c[i] == cln && i != s) ++cls;
	else {
		if (!cln && cls > 2) {
			for (; cls > 138; cls -= 138) w(32754);
			if (cls > 2) {
				w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
				cls = 0;
			}
		} else if (cls > 3) {
			w(cln), --cls;
			for (; cls > 6; cls -= 6) w(8304);
			if (cls > 2) w(cls - 3 << 5 | 8208), cls = 0;
		}
		while (cls--) w(cln);
		cls = 1;
		cln = c[i];
	}
	return {
		c: cl.subarray(0, cli),
		n: s
	};
};
var clen = function(cf, cl) {
	var l = 0;
	for (var i = 0; i < cl.length; ++i) l += cf[i] * cl[i];
	return l;
};
var wfblk = function(out, pos, dat) {
	var s = dat.length;
	var o = shft(pos + 2);
	out[o] = s & 255;
	out[o + 1] = s >> 8;
	out[o + 2] = out[o] ^ 255;
	out[o + 3] = out[o + 1] ^ 255;
	for (var i = 0; i < s; ++i) out[o + i + 4] = dat[i];
	return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
	wbits(out, p++, final);
	++lf[256];
	var _a = hTree(lf, 15), dlt = _a.t, mlb = _a.l;
	var _b = hTree(df, 15), ddt = _b.t, mdb = _b.l;
	var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
	var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
	var lcfreq = new u16(19);
	for (var i = 0; i < lclt.length; ++i) ++lcfreq[lclt[i] & 31];
	for (var i = 0; i < lcdt.length; ++i) ++lcfreq[lcdt[i] & 31];
	var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
	var nlcc = 19;
	for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc);
	var flen = bl + 5 << 3;
	var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
	var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
	if (bs >= 0 && flen <= ftlen && flen <= dtlen) return wfblk(out, p, dat.subarray(bs, bs + bl));
	var lm, ll, dm, dl;
	wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
	if (dtlen < ftlen) {
		lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
		var llm = hMap(lct, mlcb, 0);
		wbits(out, p, nlc - 257);
		wbits(out, p + 5, ndc - 1);
		wbits(out, p + 10, nlcc - 4);
		p += 14;
		for (var i = 0; i < nlcc; ++i) wbits(out, p + 3 * i, lct[clim[i]]);
		p += 3 * nlcc;
		var lcts = [lclt, lcdt];
		for (var it = 0; it < 2; ++it) {
			var clct = lcts[it];
			for (var i = 0; i < clct.length; ++i) {
				var len = clct[i] & 31;
				wbits(out, p, llm[len]), p += lct[len];
				if (len > 15) wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
			}
		}
	} else lm = flm, ll = flt, dm = fdm, dl = fdt;
	for (var i = 0; i < li; ++i) {
		var sym = syms[i];
		if (sym > 255) {
			var len = sym >> 18 & 31;
			wbits16(out, p, lm[len + 257]), p += ll[len + 257];
			if (len > 7) wbits(out, p, sym >> 23 & 31), p += fleb[len];
			var dst = sym & 31;
			wbits16(out, p, dm[dst]), p += dl[dst];
			if (dst > 3) wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
		} else wbits16(out, p, lm[sym]), p += ll[sym];
	}
	wbits16(out, p, lm[256]);
	return p + ll[256];
};
var deo = /* @__PURE__ */ new i32([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]);
var et = /* @__PURE__ */ new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, st) {
	var s = st.z || dat.length;
	var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
	var w = o.subarray(pre, o.length - post);
	var lst = st.l;
	var pos = (st.r || 0) & 7;
	if (lvl) {
		if (pos) w[0] = st.r >> 3;
		var opt = deo[lvl - 1];
		var n = opt >> 13, c = opt & 8191;
		var msk_1 = (1 << plvl) - 1;
		var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
		var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
		var hsh = function(i) {
			return (dat[i] ^ dat[i + 1] << bs1_1 ^ dat[i + 2] << bs2_1) & msk_1;
		};
		var syms = new i32(25e3);
		var lf = new u16(288), df = new u16(32);
		var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
		for (; i + 2 < s; ++i) {
			var hv = hsh(i);
			var imod = i & 32767, pimod = head[hv];
			prev[imod] = pimod;
			head[hv] = imod;
			if (wi <= i) {
				var rem = s - i;
				if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
					pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
					li = lc_1 = eb = 0, bs = i;
					for (var j = 0; j < 286; ++j) lf[j] = 0;
					for (var j = 0; j < 30; ++j) df[j] = 0;
				}
				var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
				if (rem > 2 && hv == hsh(i - dif)) {
					var maxn = Math.min(n, rem) - 1;
					var maxd = Math.min(32767, i);
					var ml = Math.min(258, rem);
					while (dif <= maxd && --ch_1 && imod != pimod) {
						if (dat[i + l] == dat[i + l - dif]) {
							var nl = 0;
							for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl);
							if (nl > l) {
								l = nl, d = dif;
								if (nl > maxn) break;
								var mmd = Math.min(dif, nl - 2);
								var md = 0;
								for (var j = 0; j < mmd; ++j) {
									var ti = i - dif + j & 32767;
									var cd = ti - prev[ti] & 32767;
									if (cd > md) md = cd, pimod = ti;
								}
							}
						}
						imod = pimod, pimod = prev[imod];
						dif += imod - pimod & 32767;
					}
				}
				if (d) {
					syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
					var lin = revfl[l] & 31, din = revfd[d] & 31;
					eb += fleb[lin] + fdeb[din];
					++lf[257 + lin];
					++df[din];
					wi = i + l;
					++lc_1;
				} else {
					syms[li++] = dat[i];
					++lf[dat[i]];
				}
			}
		}
		for (i = Math.max(i, wi); i < s; ++i) {
			syms[li++] = dat[i];
			++lf[dat[i]];
		}
		pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
		if (!lst) {
			st.r = pos & 7 | w[pos / 8 | 0] << 3;
			pos -= 7;
			st.h = head, st.p = prev, st.i = i, st.w = wi;
		}
	} else {
		for (var i = st.w || 0; i < s + lst; i += 65535) {
			var e = i + 65535;
			if (e >= s) {
				w[pos / 8 | 0] = lst;
				e = s;
			}
			pos = wfblk(w, pos + 1, dat.subarray(i, e));
		}
		st.i = s;
	}
	return slc(o, 0, pre + shft(pos) + post);
};
var adler = function() {
	var a = 1, b = 0;
	return {
		p: function(d) {
			var n = a, m = b;
			var l = d.length | 0;
			for (var i = 0; i != l;) {
				var e = Math.min(i + 2655, l);
				for (; i < e; ++i) m += n += d[i];
				n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
			}
			a = n, b = m;
		},
		d: function() {
			a %= 65521, b %= 65521;
			return (a & 255) << 24 | (a & 65280) << 8 | (b & 255) << 8 | b >> 8;
		}
	};
};
var dopt = function(dat, opt, pre, post, st) {
	if (!st) {
		st = { l: 1 };
		if (opt.dictionary) {
			var dict = opt.dictionary.subarray(-32768);
			var newDat = new u8(dict.length + dat.length);
			newDat.set(dict);
			newDat.set(dat, dict.length);
			dat = newDat;
			st.w = dict.length;
		}
	}
	return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
};
var wbytes = function(d, b, v) {
	for (; v; ++b) d[b] = v, v >>>= 8;
};
var zlh = function(c, o) {
	var lv = o.level, fl = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
	c[0] = 120, c[1] = fl << 6 | (o.dictionary && 32);
	c[1] |= 31 - (c[0] << 8 | c[1]) % 31;
	if (o.dictionary) {
		var h = adler();
		h.p(o.dictionary);
		wbytes(c, 2, h.d());
	}
};
/**
* Compress data with Zlib
* @param data The data to compress
* @param opts The compression options
* @returns The zlib-compressed version of the data
*/
function zlibSync(data, opts) {
	if (!opts) opts = {};
	var a = adler();
	a.p(data);
	var d = dopt(data, opts, opts.dictionary ? 6 : 2, 4);
	return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
}
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
try {
	td.decode(et, { stream: true });
} catch (e) {}
//#endregion
export { Pbf as n, RBush as r, zlibSync as t };

//# sourceMappingURL=ol-deps-debug.js.map