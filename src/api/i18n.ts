import { STRINGS_EN } from "../strings/en";
import { ILocalizedMessages } from "../strings/msgdef";
import { warn } from '../utils/logger';

export const DEFAULT_LOCALE = "en";

const STRINGS: { [locale: string]: ILocalizedMessages } = {
    "en": STRINGS_EN
};

/**
 * Registers a string bundle for the given locale
 *
 * @param {string} locale
 * @param {ILocalizedMessages} bundle
 */
export function registerStringBundle(locale: string, bundle: ILocalizedMessages) {
    STRINGS[locale] = bundle;
}

/**
 * Formats the specified string and substitutes any placeholders (enclosed in {})
 * with the specified arguments
 *
 * @param {string} format
 * @param {*} [args]
 * @returns {string}
 */
export function fmt(format: string, args?: any): string {
    let str = format;
    if (args != null) {
        for (const p in args) {
            //str = str.replace(new RegExp(`\{${p}\}`, "g"), `${args[p]}`);
            str = str.split(`{${p}}`).join(args[p]);
        }
        return str;
    };
    return str;
}


/**
 * Returns the localized string for the given key
 *
 * @param {keyof ILocalizedMessages} key Any property name of {@link ILocalizedMessages}
 * @param {string} [locale="en"] 
 * @param {*} [args] If a localized string has placeholders, they will be replaced with the values defined here
 * @returns {string} 
 */
export function tr(key: keyof ILocalizedMessages, locale = DEFAULT_LOCALE, args?: any): string {
    const bundle = STRINGS[locale];
    if (!bundle) {
        warn(`No such string bundle for locale: ${locale}`);
        return key;
    } else {
        let str = bundle[key];
        if (!str) {
            warn(`String bundle for locale (${locale}) is missing localized string for key: ${key}`);
            return key;
        } else {
            if (args != null) {
                return fmt(str, args);
            }
            return str;
        }
    }
}