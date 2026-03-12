/**
 * i18n-tools.ts
 *
 * A helper tool for managing i18n string bundle translations.
 * Uses the English bundle (src/strings/en.ts) as the authoritative baseline and
 * compares it against locale-specific JSON bundles in viewer/strings/.
 *
 * Usage:
 *   yarn i18n:check                              Check all locale bundles for missing keys
 *   yarn i18n:check -- --locale de              Check only the German bundle
 *   yarn i18n:translate -- --locale de --save   Auto-translate missing keys and save
 *
 * Options:
 *   --locale <code>    Target locale code (e.g. de, fr, ja).
 *                      If omitted, all locale files in viewer/strings/ are checked.
 *   --translate        Auto-translate missing keys using the configured engine.
 *   --engine <name>    Translation engine (default: google).
 *                      Supported engines: google, yandex, libre, deepl
 *   --key <api-key>    API key for the translation engine (required by yandex and deepl).
 *   --libre-url <url>  Base URL for a LibreTranslate instance (required for the libre engine).
 *   --save             Write the auto-translated keys back to the bundle JSON file.
 *   -h, --help         Print this help text.
 *
 * Examples:
 *   # Check all locale bundles for missing keys:
 *   tsx tools/i18n-tools.ts
 *
 *   # Check only the German locale:
 *   tsx tools/i18n-tools.ts --locale de
 *
 *   # Auto-translate missing German keys and save them:
 *   tsx tools/i18n-tools.ts --locale de --translate --save
 *
 *   # Use the DeepL engine with an API key:
 *   tsx tools/i18n-tools.ts --locale de --translate --engine deepl --key YOUR_KEY --save
 *
 *   # Use a self-hosted LibreTranslate instance:
 *   tsx tools/i18n-tools.ts --locale de --translate --engine libre --libre-url http://localhost:5000 --save
 */

import { STRINGS_EN } from "../src/strings/en";
import type { ILocalizedMessages } from "../src/strings/msgdef";
import * as fs from "fs";
import * as path from "path";

const STRINGS_DIR = path.resolve(__dirname, "../viewer/strings");

// ---- CLI argument parsing ----

const args = process.argv.slice(2);

function getArg(name: string): string | undefined {
    const idx = args.indexOf(name);
    return (idx !== -1 && idx + 1 < args.length) ? args[idx + 1] : undefined;
}

function hasFlag(name: string): boolean {
    return args.includes(name);
}

const targetLocale = getArg("--locale");
const shouldTranslate = hasFlag("--translate");
const engine = getArg("--engine") ?? "google";
const apiKey = getArg("--key");
const libreUrl = getArg("--libre-url");
const shouldSave = hasFlag("--save");

// ---- Type definitions ----

type StringBundle = Record<string, string>;

// ---- Helpers ----

function loadTargetBundle(locale: string): StringBundle {
    const filePath = path.join(STRINGS_DIR, `${locale}.json`);
    if (!fs.existsSync(filePath)) {
        return {};
    }
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as StringBundle;
}

function saveBundle(locale: string, bundle: StringBundle): void {
    const filePath = path.join(STRINGS_DIR, `${locale}.json`);
    try {
        fs.writeFileSync(filePath, JSON.stringify(bundle, null, 4) + "\n");
    } catch (err: any) {
        console.error(`  \u2718 Failed to save bundle for '${locale}': ${err?.message ?? err}`);
        throw err;
    }
}

function getAvailableLocales(): string[] {
    if (!fs.existsSync(STRINGS_DIR)) {
        return [];
    }
    return fs.readdirSync(STRINGS_DIR)
        .filter(f => f.endsWith(".json"))
        .map(f => path.basename(f, ".json"))
        .filter(l => l !== "en");
}

function reportMissingKeys(
    locale: string,
    enBundle: ILocalizedMessages,
    targetBundle: StringBundle
): string[] {
    const enKeys = Object.keys(enBundle) as (keyof ILocalizedMessages)[];
    const missingKeys = enKeys.filter(k => !(k in targetBundle));
    if (missingKeys.length === 0) {
        console.log(`  \u2705 No missing keys in '${locale}' bundle`);
    } else {
        console.log(`  \u26a0\ufe0f  Found ${missingKeys.length} missing key(s) in '${locale}' bundle:`);
        for (const key of missingKeys) {
            console.log(`     - ${key}: "${enBundle[key]}"`);
        }
    }
    return missingKeys as string[];
}

async function translateMissingKeys(
    locale: string,
    missingKeys: string[],
    enBundle: ILocalizedMessages,
    targetBundle: StringBundle
): Promise<StringBundle> {
    if (missingKeys.length === 0) {
        return targetBundle;
    }

    const translateModule = await import("translate");
    const translate = translateModule.default;

    // The translate package's engine/key/url are runtime configuration properties not
    // declared in its type definitions, so we use type assertions here.
    (translate as any).engine = engine;
    if (apiKey) {
        (translate as any).key = apiKey;
    }
    if (libreUrl) {
        (translate as any).url = libreUrl;
    }

    console.log(`\n  \ud83d\udd04 Translating ${missingKeys.length} key(s) to '${locale}' using '${engine}' engine...`);

    const updatedBundle: StringBundle = { ...targetBundle };
    for (const key of missingKeys) {
        try {
            const sourceText = enBundle[key as keyof ILocalizedMessages];
            const translated: string = await translate(sourceText, { from: "en", to: locale });
            updatedBundle[key] = translated;
            console.log(`     \u2714 ${key}: "${translated}"`);
        } catch (err: any) {
            console.error(`     \u2718 Failed to translate '${key}': ${err?.message ?? err}`);
        }
    }

    return updatedBundle;
}

function printHelp(): void {
    console.log(`
i18n String Bundle Helper Tool

Usage:
  tsx tools/i18n-tools.ts [options]

Options:
  --locale <code>    Target locale code (e.g. de, fr, ja).
                     If omitted, all locale files in viewer/strings/ are checked.
  --translate        Auto-translate missing keys using the configured translation engine.
  --engine <name>    Translation engine to use (default: google).
                     Supported: google, yandex, libre, deepl
  --key <api-key>    API key for the translation engine (required for yandex, deepl).
  --libre-url <url>  Base URL of a LibreTranslate instance (required for the libre engine).
  --save             Write auto-translated keys back to the bundle JSON file.
  -h, --help         Show this help text.

Examples:
  # Check all locale bundles for missing keys:
  tsx tools/i18n-tools.ts

  # Check only the German locale:
  tsx tools/i18n-tools.ts --locale de

  # Auto-translate missing German keys and save:
  tsx tools/i18n-tools.ts --locale de --translate --save

  # Use DeepL engine with an API key:
  tsx tools/i18n-tools.ts --locale de --translate --engine deepl --key YOUR_KEY --save

  # Use a self-hosted LibreTranslate instance:
  tsx tools/i18n-tools.ts --locale de --translate --engine libre --libre-url http://localhost:5000 --save
`);
}

// ---- Main ----

async function main(): Promise<void> {
    if (hasFlag("--help") || hasFlag("-h")) {
        printHelp();
        return;
    }

    const localesToCheck = targetLocale ? [targetLocale] : getAvailableLocales();
    if (localesToCheck.length === 0) {
        console.log("No locale bundles found in viewer/strings/. Nothing to check.");
        return;
    }

    for (const locale of localesToCheck) {
        console.log(`\n\ud83d\udce6 Locale: ${locale}`);
        const targetBundle = loadTargetBundle(locale);
        const missingKeys = reportMissingKeys(locale, STRINGS_EN, targetBundle);

        if (shouldTranslate && missingKeys.length > 0) {
            const updatedBundle = await translateMissingKeys(locale, missingKeys, STRINGS_EN, targetBundle);
            if (shouldSave) {
                saveBundle(locale, updatedBundle);
                console.log(`\n  \ud83d\udcbe Saved updated bundle to viewer/strings/${locale}.json`);
            } else {
                console.log("\n  \u2139\ufe0f  Run with --save to write translations to file.");
            }
        }
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
