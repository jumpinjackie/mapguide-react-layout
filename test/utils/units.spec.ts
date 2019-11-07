import { getUnitOfMeasure, getUnits } from "../../src/utils/units";
import { UnitOfMeasure, UnitName } from "../../src/api/common";

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
    })
});