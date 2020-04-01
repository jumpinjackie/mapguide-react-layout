/**
 * react-use-dimensions
 * 
 * https://github.com/Swizec/useDimensions
 * 
 * Licensed under MIT
 */

import { useState, useCallback, useLayoutEffect } from "react";

export interface DimensionObject {
    width: number;
    height: number;
    top: number;
    left: number;
    x: number;
    y: number;
    right: number;
    bottom: number;
}

export type UseDimensionsHook = [
    (node: HTMLElement | null) => void,
    DimensionObject,
    HTMLElement | null
];

export interface UseDimensionsArgs {
    liveMeasure?: boolean;
}

function getDimensionObject(node: HTMLElement): DimensionObject {
    const rect = node.getBoundingClientRect();

    return {
        width: rect.width,
        height: rect.height,
        top: rect.x ?? rect.top,
        left: rect.y ?? rect.left,
        x: rect.x ?? rect.left,
        y: rect.y ?? rect.top,
        right: rect.right,
        bottom: rect.bottom
    };
}

const INVALID_DIM: DimensionObject = {
    width: -1,
    height: -1,
    top: -1,
    left: -1,
    x: -1,
    y: -1,
    right: -1,
    bottom: -1
}

function useDimensions({
    liveMeasure = true
}: UseDimensionsArgs = {}): UseDimensionsHook {
    const [dimensions, setDimensions] = useState<DimensionObject>(INVALID_DIM);
    const [node, setNode] = useState<HTMLElement | null>(null);

    const ref = useCallback(node => {
        setNode(node);
    }, []);

    useLayoutEffect(() => {
        if (node) {
            const measure = () =>
                window.requestAnimationFrame(() =>
                    setDimensions(getDimensionObject(node))
                );
            measure();

            if (liveMeasure) {
                window.addEventListener("resize", measure);
                window.addEventListener("scroll", measure);

                return () => {
                    window.removeEventListener("resize", measure);
                    window.removeEventListener("scroll", measure);
                };
            }
        }
    }, [node]);

    return [ref, dimensions, node];
}

export default useDimensions;