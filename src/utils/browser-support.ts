/**
 * Checks if this browser supports touch events
 * 
 * @returns true if this browser suports touch events
 * @since 0.15
 */
export function supportsTouch() {
    return 'ontouchstart' in document.documentElement;
}

/**
 * 
 * 
 * @param minWidthPx The minimum viewport width in pixels. Default is 767px if not specified
 * @returns true if the viewport is mobile
 * @since 0.15
 */
export function isMobileViewport(minWidthPx = 767) {
    return window.matchMedia(`(max-width: ${minWidthPx}px)`).matches;
}

/**
 * Checks if this browser supports WebGL. Some viewer features require this support to be present.
 * 
 * @since 0.15
 */
export function supportsWebGL() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return gl instanceof WebGLRenderingContext;
}