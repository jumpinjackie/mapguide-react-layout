/**
 * Checks if a value is a plain object (not null, array, or primitive).
 *
 * @hidden
 * @since 0.15
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Checks if a spec object contains a recognized command key ($merge or $set).
 *
 * @hidden
 * @since 0.15
 */
function isCommandSpec(value: Record<string, unknown>): boolean {
    return "$merge" in value || "$set" in value;
}

/**
 * Applies an immutable update to state given a command spec, supporting only the
 * {@code $merge} and {@code $set} commands (the only ones used by this codebase).
 *
 * @param state - The source state (never mutated)
 * @param spec  - The update specification
 * @returns A new state object with the spec applied
 *
 * @example
 * ```ts
 * // $merge: shallow merge into an existing object
 * const s1 = immutableUpdate({ a: 1, b: 2 }, { "$merge": { b: 3, c: 4 } });
 * // s1 → { a: 1, b: 3, c: 4 }
 *
 * // $set: replace entirely
 * const s2 = immutableUpdate({ a: 1 }, { "$set": { x: 10 } });
 * // s2 → { x: 10 }
 * ```
 *
 * @hidden
 * @since 0.15
 */
export function immutableUpdate(state: any, spec: any): any {
    // If spec is not a plain object, return as-is (defensive)
    if (!isPlainObject(spec)) {
        return state;
    }

    // If spec itself is a command, apply it directly
    if (isCommandSpec(spec as Record<string, unknown>)) {
        if ("$set" in (spec as Record<string, unknown>)) {
            return (spec as Record<string, unknown>).$set;
        }
        if ("$merge" in (spec as Record<string, unknown>)) {
            const mergeVal = (spec as Record<string, unknown>).$merge;
            if (isPlainObject(state)) {
                return { ...state, ...(mergeVal as Record<string, unknown>) };
            }
            return mergeVal;
        }
        return state;
    }

    // Otherwise, walk each key in the spec and recurse
    const keys = Object.keys(spec);
    if (keys.length === 0) {
        return state;
    }

    let result = state;
    for (const key of keys) {
        const subSpec = spec[key];
        if (isPlainObject(subSpec) && isCommandSpec(subSpec as Record<string, unknown>)) {
            // Apply command to result[key]
            const prevValue = result != null ? result[key] : undefined;
            result = {
                ...(result ?? {}),
                [key]: immutableUpdate(prevValue, subSpec)
            };
        } else if (isPlainObject(subSpec)) {
            // Nested keys — recurse into result[key]
            const prevValue = result != null ? result[key] : undefined;
            result = {
                ...(result ?? {}),
                [key]: immutableUpdate(prevValue, subSpec)
            };
        } else {
            // Scalar value — set directly
            result = {
                ...(result ?? {}),
                [key]: subSpec
            };
        }
    }
    return result;
}
