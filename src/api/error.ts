export class MgError extends Error {
    constructor(public message?: string) {
        super(message);
        this.name = "MgError";
        this.message = message;
        this.stack = (<any>new Error()).stack;
    }
}