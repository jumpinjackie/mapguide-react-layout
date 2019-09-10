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
 * Replaces all occurrences of the given string with the specified replacement in the target
 * string
 * 
 * @param str 
 * @param find 
 * @param replace 
 * @since 0.12
 */
export function strReplaceAll(str: string, find: string, replace: string): string {
    return str.split(find).join(replace);
}

/**
 * Empty string constant
 */
export const STR_EMPTY = "";

/**
 * Indicates if the given string is null or empty
 *
 * @export
 * @param {(string | undefined)} str
 * @returns {boolean}
 */
export function strIsNullOrEmpty(str: string | undefined): boolean {
    return null === str || "" === str;
}