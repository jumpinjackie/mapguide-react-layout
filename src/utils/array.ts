
/**
 * Returns a unique array of strings from the given array
 * @param items The array of strings to make unique
 * @since 0.13
 */
export function makeUnique(arr: string[]): string[] {
    const a = [];
    for (let i = 0, l = arr.length; i < l; i++) {
        if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
            a.push(arr[i]);
    }
    return a;
}

/**
 * Indicates if the given arrays are different (content-wise)
 * @param arr 
 * @param other 
 * @since 0.13
 */
export function areArraysDifferent<T>(arr: T[] | undefined, other: T[] | undefined): boolean {
    if (arr && other) {
        if (arr.length != other.length) {
            return true;
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] !== other[i]) {
                    return true;
                }
            }
            return false;
        }
    } else {
        return true;
    }
}