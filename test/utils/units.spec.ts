import { describe, it, expect } from "vitest";
import { Size2, UnitOfMeasure } from "../../src/api/common";
import { getMapSize, getUnitOfMeasure, getUnitsOfMeasure, tryParseArbitraryCs } from "../../src/utils/units";

describe("utils/units", () => {
    describe("getUnitOfMeasure", () => {
        it("Returns unknown unit def for invalid enum values (eg. out of bounds index)", () => {
            expect(getUnitOfMeasure(-1 as any).name).toBe("Unknown");
            expect(getUnitOfMeasure(14 as any).name).toBe("Unknown");
        });
    });
    it("getMapSize", () => {
        const size: Size2 = [640, 480];
        const mpu = 111319.49079327358;
        const res = 12.345;

        const expected = {
            [UnitOfMeasure.Centimeters]: [87951303285.95, 65963477464.46],
            [UnitOfMeasure.DecimalDegrees]: [7954.32, 5965.74],
            [UnitOfMeasure.Degrees]: [7954.32, 5965.74],
            [UnitOfMeasure.DMS]: [7954.32, 5965.74],
            [UnitOfMeasure.Feet]: [2885506358.21, 2164129768.65],
            [UnitOfMeasure.Inches]: [34626497585.21, 25969873188.91],
            [UnitOfMeasure.Kilometers]: [879513.03, 659634.77],
            [UnitOfMeasure.Meters]: [879513032.86, 659634774.64],
            [UnitOfMeasure.Miles]: [546503.01, 409877.26],
            [UnitOfMeasure.Millimeters]: [879513032859.5, 659634774644.62],
            [UnitOfMeasure.NauticalMiles]: [474899.05, 356174.28],
            [UnitOfMeasure.Pixels]: [640, 480],
            [UnitOfMeasure.Unknown]: [7900.8, 5925.6],
            [UnitOfMeasure.Yards]: [961847150.26, 721385362.69]
        }

        const uoms = getUnitsOfMeasure();
        for (const uom of uoms) {
            const msize = getMapSize(size, mpu, uom, res);
            expect(msize[0]).toBe(expected[uom][0]);
            expect(msize[1]).toBe(expected[uom][1]);
        }
    });
    it("tryParseArbitraryCs", () => {
        const arb1 = tryParseArbitraryCs("XY-M");
        expect(arb1).not.toBeUndefined();
        expect(arb1?.code).toBe("XY-M");
        expect(arb1?.units).toBe(UnitOfMeasure.Meters);
        
        const arb2 = tryParseArbitraryCs("XY-FT");
        expect(arb2).not.toBeUndefined();
        expect(arb2?.code).toBe("XY-FT");
        expect(arb2?.units).toBe(UnitOfMeasure.Feet);
        
        const arb3 = tryParseArbitraryCs("XY-IN");
        expect(arb3).not.toBeUndefined();
        expect(arb3?.code).toBe("XY-IN");
        expect(arb3?.units).toBe(UnitOfMeasure.Inches);

        const arb4 = tryParseArbitraryCs("XY-CM");
        expect(arb4).not.toBeUndefined();
        expect(arb4?.code).toBe("XY-CM");
        expect(arb4?.units).toBe(UnitOfMeasure.Centimeters);

        const arb5 = tryParseArbitraryCs("XY-KM");
        expect(arb5).not.toBeUndefined();
        expect(arb5?.code).toBe("XY-KM");
        expect(arb5?.units).toBe(UnitOfMeasure.Kilometers);

        const arb6 = tryParseArbitraryCs("XY-YD");
        expect(arb6).not.toBeUndefined();
        expect(arb6?.code).toBe("XY-YD");
        expect(arb6?.units).toBe(UnitOfMeasure.Yards);

        const arb7 = tryParseArbitraryCs("XY-MM");
        expect(arb7).not.toBeUndefined();
        expect(arb7?.code).toBe("XY-MM");
        expect(arb7?.units).toBe(UnitOfMeasure.Millimeters);

        const arb8 = tryParseArbitraryCs("XY-MI");
        expect(arb8).not.toBeUndefined();
        expect(arb8?.code).toBe("XY-MI");
        expect(arb8?.units).toBe(UnitOfMeasure.Miles);

        const arb9 = tryParseArbitraryCs("XY-NM");
        expect(arb9).not.toBeUndefined();
        expect(arb9?.code).toBe("XY-NM");
        expect(arb9?.units).toBe(UnitOfMeasure.NauticalMiles);

        const arb10 = tryParseArbitraryCs("LL84");
        expect(arb10).toBeUndefined();

        const arb11 = tryParseArbitraryCs("WGS84.PseudoMercator");
        expect(arb11).toBeUndefined();

        const arb12 = tryParseArbitraryCs("AnythingElse");
        expect(arb12).toBeUndefined();

        const arb13 = tryParseArbitraryCs(undefined);
        expect(arb13).toBeUndefined();
    })
});