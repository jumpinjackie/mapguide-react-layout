/**
 * Asserts that this function should never be called. The common usage is to call this as the
 * "else" case in a series of if/else blocks or the default case in a switch statement when
 * testing cases of an enum or union type. This is a compile-time way to ensure that your code properly
 * tests for all possible cases of a given enum or union type
 *
 * @export
 * @param {never} value
 */
export function assertNever(value: never) {
    throw new Error("Should never get here");
}