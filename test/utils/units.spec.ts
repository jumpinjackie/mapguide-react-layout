import { Size2, UnitOfMeasure } from "../../src/api/common";
import { getMapSize, getUnitOfMeasure, getUnits, getUnitsOfMeasure } from "../../src/utils/units";

describe("utils/units", () => {
    describe("getUnitOfMeasure", () => {
        it("Returns appropriate unit def for the given enum", () => {
            const pairs = getUnits();
            for (const pair of pairs) {
                expect(getUnitOfMeasure(pair[0]).name).toBe(pair[1]);
            }
        });
        it("Returns unknown unit def for invalid enum values (eg. out of bounds index)", () => {
            expect(getUnitOfMeasure(-1).name).toBe("Unknown");
            expect(getUnitOfMeasure(14).name).toBe("Unknown");
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
});