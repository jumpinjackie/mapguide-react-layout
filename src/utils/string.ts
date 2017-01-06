export function strEndsWith(str: string, suffix: string): boolean {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

export const STR_EMPTY = "";

export function strIsNullOrEmpty(str: string | null | undefined): boolean {
    return null === str || "" === str;
}