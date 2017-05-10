import { IItem, IInlineMenu } from "../components/toolbar";

// This is a "band-aid" function to work around bogus TypeScript compiler errors
// when webpack is live-reloading
//
// https://github.com/jumpinjackie/mapguide-react-layout/issues/61

/**
 * @hidden
 */
export function processMenuItems(items: (IItem | IInlineMenu | null)[]): IItem[] {
    const processed = [] as IItem[];
    if (items != null) {
        for (const i of items) {
            if (i != null) {
                processed.push(i);
            }
        }
    }
    return processed;
}