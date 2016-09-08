import * as logger from "../utils/logger";

//TODO: Move to separate module
const STRINGS_EN: any = {
    "TT_GO_HOME": "Go home",
    "TT_GO_BACK": "Go back",
    "TT_GO_FORWARD": "Go forward",
    "MENU_TASKS": "Tasks",
    "NO_SELECTED_FEATURES": "No selected features",
    "FMT_SCALE_DISPLAY": "Scale - 1:{scale}",
    "FMT_SELECTION_COUNT": "Selected {total} features in {layerCount} layers"
};

const STRINGS: any = {
    "en": STRINGS_EN
};

export function fmt(format: string, args?: any): string {
    let str = format;
    if (args != null) {
        for (const p in args) {
            str = str.replace(new RegExp(`\{${p}\}`, "g"), `${args[p]}`);
        }
        return str;
    };
    return str;
}

/**
 * Returns the localized string for the given key
 */
export function tr(key: string, locale = "en", args?: any): string {
    const bundle = STRINGS[locale];
    if (!bundle) {
        logger.warn(`No such string bundle for locale: ${locale}`);
        return key;
    } else {
        let str = bundle[key];
        if (!str) {
            logger.warn(`String bundle for locale (${locale}) is missing localized string for key: ${key}`);
            return key;
        } else {
            if (args != null) {
                return fmt(str, args);
            }
            return str;
        }
    }
}