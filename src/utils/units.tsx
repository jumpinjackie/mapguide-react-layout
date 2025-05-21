import * as React from "react";
import { tr } from "../api/i18n";
import { DEG } from "../constants";
import { UnitInfo, UnitOfMeasure, UnitName, IMapView } from "../api/common";
import { strIsNullOrEmpty, strStartsWith } from "./string";

const mUnits: UnitInfo[] = [
    { name: "Unknown", localizedName: (locale) => tr("UNIT_UNKNOWN", locale), abbreviation: (locale) => tr("UNIT_ABBR_UNKNOWN", locale), unitsPerMeter: 1.0, metersPerUnit: 1.0 },
    { name: "Inches", localizedName: (locale) => tr("UNIT_INCHES", locale), abbreviation: (locale) => tr("UNIT_ABBR_INCHES", locale), unitsPerMeter: 39.370079, metersPerUnit: 0.0254 },
    { name: "Feet", localizedName: (locale) => tr("UNIT_FEET", locale), abbreviation: (locale) => tr("UNIT_ABBR_FEET", locale), unitsPerMeter: 3.2808, metersPerUnit: 0.3048 },
    { name: "Yards", localizedName: (locale) => tr("UNIT_YARDS", locale), abbreviation: (locale) => tr("UNIT_ABBR_YARDS", locale), unitsPerMeter: 1.0936133, metersPerUnit: 0.9144 },
    { name: "Miles", localizedName: (locale) => tr("UNIT_MILES", locale), abbreviation: (locale) => tr("UNIT_ABBR_MILES", locale), unitsPerMeter: 0.00062137, metersPerUnit: 1609.344 },
    { name: "Nautical Miles", localizedName: (locale) => tr("UNIT_NAUT_MILES", locale), abbreviation: (locale) => tr("UNIT_ABBR_NAUT_MILES", locale), unitsPerMeter: 0.000539956803, metersPerUnit: 1852 },
    { name: "Millimeters", localizedName: (locale) => tr("UNIT_MILLIMETERS", locale), abbreviation: (locale) => tr("UNIT_ABBR_MILLIMETERS", locale), unitsPerMeter: 1000.0, metersPerUnit: 0.001 },
    { name: "Centimeters", localizedName: (locale) => tr("UNIT_CENTIMETERS", locale), abbreviation: (locale) => tr("UNIT_ABBR_CENTIMETERS", locale), unitsPerMeter: 100.0, metersPerUnit: 0.01 },
    { name: "Meters", localizedName: (locale) => tr("UNIT_METERS", locale), abbreviation: (locale) => tr("UNIT_ABBR_METERS", locale), unitsPerMeter: 1.0, metersPerUnit: 1.0 },
    { name: "Kilometers", localizedName: (locale) => tr("UNIT_KILOMETERS", locale), abbreviation: (locale) => tr("UNIT_ABBR_KILOMETERS", locale), unitsPerMeter: 0.001, metersPerUnit: 1000.0 },
    { name: "Degrees", localizedName: (locale) => tr("UNIT_DEGREES", locale), abbreviation: (locale) => tr("UNIT_ABBR_DEGREES", locale), unitsPerMeter: 0.000009044, metersPerUnit: 111061.75033 },
    { name: "Decimal Degrees", localizedName: (locale) => tr("UNIT_DEC_DEGREES", locale), abbreviation: (locale) => tr("UNIT_ABBR_DEC_DEGREES", locale), unitsPerMeter: 0.000009044, metersPerUnit: 111061.75033 },
    { name: "Degrees Minutes Seconds", localizedName: (locale) => tr("UNIT_DMS", locale), abbreviation: (locale) => tr("UNIT_ABBR_DMS", locale), unitsPerMeter: 0.000009044, metersPerUnit: 111061.75033 },
    { name: "Pixels", localizedName: (locale) => tr("UNIT_PIXELS", locale), abbreviation: (locale) => tr("UNIT_ABBR_PIXELS", locale), unitsPerMeter: 1.0, metersPerUnit: 1.0 }
];

/**
 * Gets all available units of measure
 * @since 0.12.2
 */
export function getUnitsOfMeasure(): UnitOfMeasure[] {
    return [
        UnitOfMeasure.Centimeters,
        UnitOfMeasure.DecimalDegrees,
        UnitOfMeasure.Degrees,
        UnitOfMeasure.DMS,
        UnitOfMeasure.Feet,
        UnitOfMeasure.Inches,
        UnitOfMeasure.Kilometers,
        UnitOfMeasure.Meters,
        UnitOfMeasure.Miles,
        UnitOfMeasure.Millimeters,
        UnitOfMeasure.NauticalMiles,
        UnitOfMeasure.Pixels,
        UnitOfMeasure.Unknown,
        UnitOfMeasure.Yards
    ]
}

/**
 * 
 * @param unit The unit of measure
 * @returns 
 * 
 * @since 0.15 Replaces getUnits function which has been removed
 */
export function getUnitOfMeasure(unit: UnitOfMeasure): UnitInfo {
    const u = mUnits[unit];
    return u || mUnits[0]; //The unknown unit
}

/**
 * Utility function to compute the physical map size based on the given display size and various display settings
 * 
 * @since 0.11
 * @param {[number, number]} displaySize 
 * @param {number} metersPerUnit 
 * @param {UnitOfMeasure} units 
 * @param {number} [resolution] 
 * @param {number} [precision] 
 * @returns {[number, number]} 
 */
export function getMapSize(displaySize: [number, number], metersPerUnit: number, units: UnitOfMeasure, resolution?: number, precision?: number): [number, number] {
    const [width, height] = displaySize;
    let gw = width;
    let gh = height;
    const uom = getUnitOfMeasure(units);
    if (resolution && units != UnitOfMeasure.Pixels) {
        gw = resolution * width;
        gh = resolution * height;
        if (units != UnitOfMeasure.Unknown) {
            gw = uom.unitsPerMeter * gw * metersPerUnit;
            gh = uom.unitsPerMeter * gh * metersPerUnit;
        }
        let prec = precision || 2;
        if (prec >= 0) {
            const factor = Math.pow(10, prec);
            gw = Math.round(gw * factor) / factor;
            gh = Math.round(gh * factor) / factor;
        }
    }
    return [gw, gh];
}

/**
 * Attempts to be parse unit information for the given mentor CS code 
 * 
 * @param csCode 
 * @since 0.14.3
 * @returns 
 */
export function tryParseArbitraryCs(csCode: string | undefined): { code: string, units: UnitOfMeasure } | undefined {
    if (!strIsNullOrEmpty(csCode) && strStartsWith(csCode, "XY-")) {
        // We'll only cover arbitrary CSes that are clearly mappable to our UOM set
        const suffix = csCode.substring(3);
        switch (suffix) {
            case "M":
                return { code: csCode, units: UnitOfMeasure.Meters };
            case "FT":
                return { code: csCode, units: UnitOfMeasure.Feet };
            case "IN":
                return { code: csCode, units: UnitOfMeasure.Inches };
            case "CM":
                return { code: csCode, units: UnitOfMeasure.Centimeters };
            case "KM":
                return { code: csCode, units: UnitOfMeasure.Kilometers };
            case "YD":
                return { code: csCode, units: UnitOfMeasure.Yards };
            case "MM":
                return { code: csCode, units: UnitOfMeasure.Millimeters };
            case "MI":
                return { code: csCode, units: UnitOfMeasure.Miles };
            case "NM":
                return { code: csCode, units: UnitOfMeasure.NauticalMiles };
            case "PX": //Not supported by MapGuide, but our own defn to support static images
                return { code: csCode, units: UnitOfMeasure.Pixels };
        }
    }

    return undefined;
}