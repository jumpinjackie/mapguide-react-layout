
/**
 * Returns a unique array of strings from the given array
 * @param items The array of strings to make unique
 * @since 0.13
 */
export function makeUnique(items: string[]): string[] {
    const a = [];
    for (let i = 0, l = items.length; i < l; i++) {
        if (a.indexOf(items[i]) === -1 && items[i] !== '')
            a.push(items[i]);
    }
    return a;
}

/**
 * Indicates if the given arrays are different (content-wise)
 * @param arr 
 * @param other 
 * @since 0.13
 */
export function areArraysDifferent<T>(arr: T[] | undefined, other: T[] | undefined, equalityFn?: (left: T, right: T) => boolean): boolean {
    if (arr && other) {
        if (arr.length != other.length) {
            return true;
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (equalityFn) {
                    if (!equalityFn(arr[i], other[i])) {
                        return true;
                    }
                } else if (arr[i] !== other[i]) {
                    return true;
                }
            }
            return false;
        }
    } else {
        return true;
    }
}