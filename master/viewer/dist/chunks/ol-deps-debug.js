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
export { RBush as n, Pbf as t };

//# sourceMappingURL=ol-deps-debug.js.map