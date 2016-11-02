export function strEndsWith(str: string, suffix: string): boolean {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}