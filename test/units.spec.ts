import { getUnitOfMeasure } from "../src/utils/units";
import { UnitOfMeasure, UnitName } from "../src/api/common";

describe("utils/units", () => {
    describe("getUnitOfMeasure", () => {
        it("Returns appropriate unit def for the given enum", () => {
            const pairs: [UnitOfMeasure, UnitName][] = [
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
            for (const pair of pairs) {
                expect(getUnitOfMeasure(pair[0]).name).toBe(pair[1]);
            }
        });
        it("Returns unknown unit def for invalid enum values (eg. out of bounds index)", () => {
            expect(getUnitOfMeasure(-1).name).toBe("Unknown");
            expect(getUnitOfMeasure(14).name).toBe("Unknown");
        });
    })
});