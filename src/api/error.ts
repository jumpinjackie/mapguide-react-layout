/**
 * The base of any viewer-related error
 *
 * @class MgError
 * @extends {Error}
 */
export class MgError extends Error {
    constructor(public message: string) {
        super(message);
        this.name = "MgError";
        this.message = message;
        this.stack = (<any>new Error()).stack;
    }
}

/**
 * Indicates if this error is a session expired error
 *
 * @param {MgError} err
 * @returns {boolean}
 */
export function isSessionExpiredError(err: MgError): boolean {
    return err.message.indexOf("MgSessionExpiredException") >= 0;
}