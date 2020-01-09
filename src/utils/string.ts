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
 * @param {(string | null | undefined)} str
 * @returns {boolean}
 */
export function strIsNullOrEmpty(str: string | null | undefined): str is null | undefined {
    return null == str || "" === str;
}

/**
 * Returns a trimmed version of the given string
 * 
 * @param str The string to trim
 * @since 0.12.5
 */
export function strTrim(str: string): string {
    if (!String.prototype.trim) {
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
    return str.trim();
}