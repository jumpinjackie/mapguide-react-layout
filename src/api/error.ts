export class MgError extends Error {
    constructor(public message: string) {
        super(message);
        this.name = "MgError";
        this.message = message;
        this.stack = (<any>new Error()).stack;
    }
}

export function isSessionExpiredError(err: MgError): boolean {
    return err.message.indexOf("MgSessionExpiredException") >= 0;
}