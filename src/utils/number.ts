const SHIM_EPSILON = Math.pow(2, -52);

function epsilon(): number {
    const num: any = Number;
    return num.EPSILON || SHIM_EPSILON;
}

/**
 * Restricts the given number to the given range
 * 
 * @export
 * @param {number} val 
 * @param {number} lower 
 * @param {number} upper 
 */
export function restrictToRange(val: number, lower: number, upper: number) {
    return Math.min(Math.max(val, lower), upper);
}

/**
 * Indicates if the given numbers are equal
 *
 * @export
 * @param {number} a
 * @param {number} b
 * @returns {boolean}
 */
export function areNumbersEqual(a: number, b: number): boolean {
    return Math.abs(a - b) < epsilon();
}

/**
 * Indicates if the given scale is within the specified range
 *
 * @export
 * @param {number} scale
 * @param {number} minScale
 * @param {number} maxScale
 * @returns {boolean}
 */
export function scaleRangeBetween(scale: number, minScale: number, maxScale: number): boolean {
    //Note the '<'. This is the same range check used in MapGuide Server
    return scale >= minScale && scale < maxScale;
}

/**
 * Gets the closest scale index for the given scale and scale array pair
 *
 * @export
 * @param {[number, number]} scales
 * @param {number} scale
 * @returns {number}
 */
export function getClosestScaleIndex(scales: [number, number], scale: number): number {
    const d1 = Math.abs(scales[0] - scale);
    const d2 = Math.abs(scales[1] - scale);
    if (d1 < d2)
        return 0;
    else
        return 1;
}

/**
 * Gets the applicable finite scale index for the given scale and finite scale array
 *
 * @export
 * @param {number[]} finiteScaleList
 * @param {number} scale
 * @returns {number}
 */
export function getFiniteScaleIndexForScale(finiteScaleList: number[], scale: number): number {
    for (let i = 0; i < finiteScaleList.length; i++) {
        if (scale >= finiteScaleList[i]) { //Found the lower bound
            if ((i + 1) < finiteScaleList.length) { //There is a possible upper bound
                if (scale <= finiteScaleList[i+1]) { //It is the upper bound
                    const test: [number, number] = [finiteScaleList[i], finiteScaleList[i+1]];
                    //Snap to the scale with lowest difference
                    const testIndex = getClosestScaleIndex(test, scale);
                    if (testIndex == 0) {
                        return i;
                    } else {
                        return i+1;
                    }
                }
            } else { //There is no upper bound (we're at the end), snap to it
                return i;
            }
        } else if (scale <= finiteScaleList[i]) {
            if (i > 0) {
                const test: [number, number] = [finiteScaleList[i-1], finiteScaleList[i]];
                const testIndex = getClosestScaleIndex(test, scale);
                if (testIndex == 0) {
                    return i-1;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }
    }
    return 0;
}

/**
 * Converts the given angle in degrees to radians
 * @param deg The angle in degrees
 */
export function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

/**
 * Computes the sum of the given array
 * 
 * @since 0.11
 * @export
 * @template T 
 * @param {T[]} array 
 * @param {(item: T) => number} numSelector 
 * @returns {number} 
 */
export function sum<T>(array: T[], numSelector: (item: T) => number): number {
    let total = 0;
    for (const item of array) {
        total += numSelector(item);
    }
    return total;
}

/**
 * Rounds the given number to the specified number of decimals
 * 
 * @since 0.11
 * @export
 * @param {number} num 
 * @param {number} [decimals=2] 
 * @returns {number} 
 */
export function roundTo(num: number, decimals: number = 2): number {
    const a = Math.pow(10, decimals);
    return Math.round(num * a) / a;
}