export class Lazy<T> {
    private _value: T | undefined;
    constructor(private value: () => T) { }
    public getValue() { 
        if (!this._value) {
            this._value = this.value();
        }
        return this._value;
    }
}

export class AsyncLazy<T> {
    private _value: Promise<T> | undefined;
    constructor(private value: () => Promise<T>) { }
    public getValueAsync(): Promise<T> { 
        if (!this._value) {
            this._value = this.value();
        }
        return this._value;
    }
}