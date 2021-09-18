import TEST_DATA from "../../../test-data/631_appdef";
import MULTIMAP_APPDEF from "../../../test-data/multimap_appdef";
import MULTIMAP_STATELESS_APPDEF from "../../../test-data/multimap_statelesss_appdef";
import RTMAP_SHEBOYGAN from "../../../test-data/rtmap_sheboygan";
import RTMAP_REDDING from "../../../test-data/rtmap_redding";
import RTMAP_MELBOURNE from "../../../test-data/rtmap_melbourne";
import QMF_SHEBOYGAN from "../../../test-data/qmf_sheboygan";
import WL_SHEBOYGAN from "../../../test-data/sheboygan_weblayout";
import TSD_XYZ_SHEBOYGAN from "../../../test-data/tsd_xyz_sheboygan";
import MDF_SHEBOYGAN from "../../../test-data/mdf_sheboygan";
import MDF_MELBOURNE from "../../../test-data/mdf_melbourne";
import MDF_REDDING from "../../../test-data/mdf_redding";
import { deArrayify } from '../../../src/api/builders/deArrayify';
import { isStateless } from "../../../src/actions/init-command";

describe("de-arrayify", () => {
    it("Fixes #631", () => {
        const appDef = deArrayify(TEST_DATA);
    })
    it("MultiMap appdef", () => {
        const appDef = deArrayify(MULTIMAP_APPDEF);
        expect(isStateless(appDef)).toBe(false);
    });
    it("MultiMap stateless appdef", () => {
        const appDef = deArrayify(MULTIMAP_STATELESS_APPDEF);
        expect(isStateless(appDef)).toBe(true);
    });
    it("Sheboygan RuntimeMap", () => {
        const rtMap = deArrayify(RTMAP_SHEBOYGAN);
    });
    it("Redding RuntimeMap", () => {
        const rtMap = deArrayify(RTMAP_REDDING);
    });
    it("Melbourne RuntimeMap", () => {
        const rtMap = deArrayify(RTMAP_MELBOURNE);
    });
    it("QueryMapFeatures Sheboygan", () => {
        const qmf = deArrayify(QMF_SHEBOYGAN);
    });
    it("Sheboygan WebLayout", () => {
        const wl = deArrayify(WL_SHEBOYGAN);
    });
    it("Sheboygan XYZ TileSet", () => {
        const tsd = deArrayify(TSD_XYZ_SHEBOYGAN);
    });
    it("Sheboygan mdf", () => {
        const mdf = deArrayify(MDF_SHEBOYGAN);
    });
    it("Redding mdf", () => {
        const mdf = deArrayify(MDF_REDDING);
    });
    it("Melbourne mdf", () => {
        const mdf = deArrayify(MDF_MELBOURNE);
    });
});