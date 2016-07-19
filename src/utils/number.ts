const SHIM_EPSILON = Math.pow(2, -52);

function epsilon(): number {
    const num: any = Number;
    return num.EPSILON || SHIM_EPSILON;
}

export function areNumbersEqual(a: number, b: number): boolean {
    return Math.abs(a - b) < epsilon();
}

export function betweenInclusive(num: number, min: number, max: number): boolean {
    return num >= min && num <= max;
}