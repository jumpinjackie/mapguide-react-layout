/**
 * Indicates if the given string ends with the given suffix
 *
 * @param {string} str
 * @param {string} suffix
 * @returns {boolean}
 */
export function strEndsWith(str: string, suffix: string): boolean {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

/**
 * Indicates if the given string starts with the given string
 * 
 * @param {string} str 
 * @param {string} word 
 * @returns {boolean}
 * @since 0.14
 */
export function strStartsWith(str: string, word: string) {
    return str.lastIndexOf(word, 0) === 0;
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

/**
 *
 *
 * @param {string} expr
 * @param {string} delimBegin
 * @param {string} delimEnd
 * @returns
 * @since 0.14
 */
export function extractPlaceholderTokens(expr: string, delimBegin: string, delimEnd: string) {
    const regex = new RegExp(`${delimBegin}(.*?)${delimEnd}`, "g");
    const matches = expr.match(regex);
    return matches?.map(m => m.replace(delimBegin, "").replace(delimEnd, "")) ?? [];
}

/**
 * Gets whether the given string is a resource identifier
 * 
 * @param str The string to test
 * @since 0.14
 */
export function isResourceId(str: string): boolean {
    return strStartsWith(str, "Library://")
}