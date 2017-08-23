import * as React from "react";
import { UnitInfo, UnitOfMeasure, UnitName } from "../api/common";

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
    { name: "Degrees", abbreviation: () => <span>&deg;</span>, unitsPerMeter: 0.000009044, metersPerUnit: 111061.75033 },
    { name: "Decimal Degrees", abbreviation: () => <span>&deg;</span>, unitsPerMeter: 0.000009044, metersPerUnit: 111061.75033 },
    { name: "Degrees Minutes Seconds", abbreviation: () => <span>&deg;</span>, unitsPerMeter: 0.000009044, metersPerUnit: 111061.75033 },
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