import TEST_DATA from "../../../test-data/631_appdef";
import { deArrayify } from '../../../src/api/builders/deArrayify';

describe("de-arrayify", () => {
    it("Fixes #631", () => {
        const appDef = deArrayify(TEST_DATA);
    })
});