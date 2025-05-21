/**
 * @hidden
 */
export class ScopedId {
    constructor(private counter = 0) {}
    public next() { return this.counter++; }
}