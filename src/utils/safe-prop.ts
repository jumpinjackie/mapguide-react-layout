/**
 * Tests if the given property of an object is available, and if so passes the property value to the given
 * callback.
 * 
 * Remarks: A possible bug in TypeScript is that even though we null check the property value before passing it
 * to the callback, if TypeScript deduces the type of the property to be in the domain of null | undefined, that
 * such constraints still flow through to the callback function parameter.
 * 
 * @since 0.11
 * @param obj The object
 * @param name The name of the property
 * @param callback The callback that will receive the property value
 */
export function safePropAccess<T, P extends keyof T>(obj: T, name: P, callback: (value: NonNullable<T[P]>) => void) {
    const v = obj[name];
    if (v) {
        callback(v as any);
    }
}