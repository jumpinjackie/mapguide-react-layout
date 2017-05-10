/**
 * Indicates if the given string ends with the given suffix
 *
 * @export
 * @param {string} str
 * @param {string} suffix
 * @returns {boolean}
 */
export function strEndsWith(str: string, suffix: string): boolean {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

/**
 * Empty string constant
 */
export const STR_EMPTY = "";

/**
 * Indicates if the given string is null or empty
 *
 * @export
 * @param {(string | null | undefined)} str
 * @returns {boolean}
 */
export function strIsNullOrEmpty(str: string | null | undefined): boolean {
    return null === str || "" === str;
}