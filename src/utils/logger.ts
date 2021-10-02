// Console wrappers that are only active in development mode

/**
 * Log an informational message. Does nothing in a production build
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

/**
 * Log a warning message. Does nothing in a production build
 *
 * @export
 * @param {*} [message]
 * @param {...any[]} optionalParams
 */
export function warn(message?: any, ...optionalParams: any[]) {
    if (__DEV__) {
        console.warn(message, optionalParams);
    }
}

/**
 * Log an error message. Does nothing in a production build
 *
 * @export
 * @param {*} [message]
 * @param {...any[]} optionalParams
 */
export function error(message?: any, ...optionalParams: any[]) {
    if (__DEV__) {
        console.error(message, optionalParams);
    }
}

/**
 * Log a debug message. Does nothing in a production build
 *
 * @export
 * @param {*} [message]
 * @param {...any[]} optionalParams
 */
export function debug(message?: any, ...optionalParams: any[]) {
    if (__DEV__) {
        console.debug(message, optionalParams);
    }
}