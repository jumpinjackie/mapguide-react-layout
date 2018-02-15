import * as React from "react";
import { DEG } from "../constants";
import { UnitInfo, UnitOfMeasure, UnitName, IMapView } from "../api/common";

const mUnits: UnitInfo[] = [
    { name: "Unknown", abbreviation: () => "unk", unitsPerMeter: 1.0, metersPerUnit: 1.0 },
    { name: "Inches", abbreviation: () => "in", unitsPerMeter: 39.370079, metersPerUnit: 0.0254 },
    { name: "Feet", abbreviation: () => "ft", unitsPerMeter: 3.2808, metersPerUnit: 0.3048 },
    { name: "Yards", abbreviation: () => "yd", unitsPerMeter: 1.0936133, metersPerUnit: 0.9144 },
    { name: "Miles", abbreviation: () => "mi", unitsPerMeter: 0.00062137, metersPerUnit: 1609.344 },
    { name: "Nautical Miles", abbreviation: () => "nm", unitsPerMeter: 0.000539956803, metersPerUnit: 1852 },
    { name: "Millimeters", abbreviation: () => "mm", unitsPerMeter: 1000.0, metersPerUnit: 0.001 },
    { name: "Centimeters", abbreviation: () => "cm", unitsPerMeter: 100.0, metersPerUnit: 0.01 },
    { name: "Meters", abbreviation: () => "m", unitsPerMeter: 1.0, metersPerUnit: 1.0 },
    { name: "Kilometers", abbreviation: () => "km", unitsPerMeter: 0.001, metersPerUnit: 1000.0 },
    { name: "Degrees", abbreviation: () => DEG, unitsPerMeter: 0.000009044, metersPerUnit: 111061.75033 },
    { name: "Decimal Degrees", abbreviation: () => DEG, unitsPerMeter: 0.000009044, metersPerUnit: 111061.75033 },
    { name: "Degrees Minutes Seconds", abbreviation: () => DEG, unitsPerMeter: 0.000009044, metersPerUnit: 111061.75033 },
    { name: "Pixels", abbreviation: () => "px", unitsPerMeter: 1.0, metersPerUnit: 1.0 }
];

export function getUnits(): [UnitOfMeasure, UnitName][] {
    return [
        [UnitOfMeasure.Centimeters, "Centimeters"],
        [UnitOfMeasure.DecimalDegrees, "Decimal Degrees"],
        [UnitOfMeasure.Degrees, "Degrees"],
        [UnitOfMeasure.DMS, "Degrees Minutes Seconds"],
        [UnitOfMeasure.Feet, "Feet"],
        [UnitOfMeasure.Inches, "Inches"],
        [UnitOfMeasure.Kilometers, "Kilometers"],
        [UnitOfMeasure.Meters, "Meters"],
        [UnitOfMeasure.Miles, "Miles"],
        [UnitOfMeasure.Millimeters, "Millimeters"],
        [UnitOfMeasure.NauticalMiles, "Nautical Miles"],
        [UnitOfMeasure.Pixels, "Pixels"],
        [UnitOfMeasure.Unknown, "Unknown"],
        [UnitOfMeasure.Yards, "Yards"]
    ];
}

export function getUnitOfMeasure(unit: UnitOfMeasure): UnitInfo {
    const u =  mUnits[unit];
    return u || mUnits[0]; //The unknown unit
}

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