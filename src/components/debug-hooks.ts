import { useRef, useEffect } from "react";

/**
 * Debugs which dependencies in a dependency array changed to trigger a useEffect.
 * @param deps An object mapping dependency names to their values.
 * @param effectName Optional label for the effect.
 * 
 * @hidden
 */
export function useDebugDeps<T extends Record<string, any>>(deps: T, effectName?: string) {
    const prevDeps = useRef<T>(deps);

    useEffect(() => {
        Object.keys(deps).forEach((key) => {
            if (prevDeps.current[key] !== deps[key]) {
                // eslint-disable-next-line no-console
                console.log(
                    `[${effectName || "useEffect"}] Dependency "${key}" changed:`,
                    prevDeps.current[key],
                    "→",
                    deps[key]
                );
            }
        });
        prevDeps.current = deps;
        // We want this to run whenever any dep changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, Object.values(deps));
}