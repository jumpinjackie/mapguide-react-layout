
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