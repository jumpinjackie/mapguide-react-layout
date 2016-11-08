const SHIM_EPSILON = Math.pow(2, -52);

function epsilon(): number {
    const num: any = Number;
    return num.EPSILON || SHIM_EPSILON;
}

export function areNumbersEqual(a: number, b: number): boolean {
    return Math.abs(a - b) < epsilon();
}

export function scaleRangeBetween(scale: number, minScale: number, maxScale: number): boolean {
    //Note the '<'. This is the same range check used in MapGuide Server
    return scale >= minScale && scale < maxScale;
}