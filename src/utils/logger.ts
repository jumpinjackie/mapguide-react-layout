/**
 * logger.ts
 *
 * Console wrappers that are only active in development mode
 *
 * @export
 * @param {*} [message]
 * @param {...any[]} optionalParams
 */

export function info(message?: any, ...optionalParams: any[]) {
    if (__DEV__) {
        console.info(message, optionalParams);
    }
}

export function warn(message?: any, ...optionalParams: any[]) {
    if (__DEV__) {
        console.warn(message, optionalParams);
    }
}

export function error(message?: any, ...optionalParams: any[]) {
    if (__DEV__) {
        console.error(message, optionalParams);
    }
}

export function debug(message?: any, ...optionalParams: any[]) {
    if (__DEV__) {
        console.debug(message, optionalParams);
    }
}