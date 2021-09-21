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
import MDF_WORLD from "../../../test-data/mdf_world";
import { deArrayify, isAppDef, isMapDef, isQueryMapFeaturesResponse, isRuntimeMap, isTileSet, isWebLayout } from '../../../src/api/builders/deArrayify';
import { isStateless } from "../../../src/actions/init-command";
import { convertFlexLayoutUIItems, convertWebLayoutUIItems, parseCommandsInWebLayout, parseWidgetsInAppDef } from "../../../src/api/registry/command-spec";

describe("de-arrayify", () => {
    it("Fixes #631", () => {
        const appDef = deArrayify(TEST_DATA);
        const valid = isAppDef(appDef);
        expect(valid).toBe(true);
        if (valid) {
            const locale = "en";
            const tbConf: any = {};
            const registerCmd = jest.fn();
            const { widgetsByKey } = parseWidgetsInAppDef(appDef, registerCmd);
            for (const widgetSet of appDef.WidgetSet) {
                for (const cont of widgetSet.Container) {
                    let tbName = cont.Name;
                    tbConf[tbName] = { items: convertFlexLayoutUIItems(isStateless(appDef), cont.Item, widgetsByKey, locale) };
                }
            }
        }
    })
    it("MultiMap appdef", () => {
        const appDef = deArrayify(MULTIMAP_APPDEF);
        const valid = isAppDef(appDef);
        expect(valid).toBe(true);
        if (valid) {
            expect(isStateless(appDef)).toBe(false);
            const locale = "en";
            const tbConf: any = {};
            const registerCmd = jest.fn();
            const { widgetsByKey } = parseWidgetsInAppDef(appDef, registerCmd);
            for (const widgetSet of appDef.WidgetSet) {
                for (const cont of widgetSet.Container) {
                    let tbName = cont.Name;
                    tbConf[tbName] = { items: convertFlexLayoutUIItems(isStateless(appDef), cont.Item, widgetsByKey, locale) };
                }
            }
        }
    });
    it("MultiMap stateless appdef", () => {
        const appDef = deArrayify(MULTIMAP_STATELESS_APPDEF);
        const valid = isAppDef(appDef);
        if (valid) {
            expect(isStateless(appDef)).toBe(true);
            const locale = "en";
            const tbConf: any = {};
            const registerCmd = jest.fn();
            const { widgetsByKey } = parseWidgetsInAppDef(appDef, registerCmd);
            for (const widgetSet of appDef.WidgetSet) {
                for (const cont of widgetSet.Container) {
                    let tbName = cont.Name;
                    tbConf[tbName] = { items: convertFlexLayoutUIItems(isStateless(appDef), cont.Item, widgetsByKey, locale) };
                }
            }
        }
    });
    it("Sheboygan RuntimeMap", () => {
        const rtMap = deArrayify(RTMAP_SHEBOYGAN);
        expect(isRuntimeMap(rtMap)).toBe(true);
    });
    it("Redding RuntimeMap", () => {
        const rtMap = deArrayify(RTMAP_REDDING);
        expect(isRuntimeMap(rtMap)).toBe(true);
    });
    it("Melbourne RuntimeMap", () => {
        const rtMap = deArrayify(RTMAP_MELBOURNE);
        expect(isRuntimeMap(rtMap)).toBe(true);
    });
    it("QueryMapFeatures Sheboygan", () => {
        const qmf = deArrayify(QMF_SHEBOYGAN);
        expect(isQueryMapFeaturesResponse(qmf));
    });
    it("Sheboygan WebLayout", () => {
        const webLayout = deArrayify(WL_SHEBOYGAN);
        const valid = isWebLayout(webLayout);
        expect(valid).toBe(true);
        if (valid) {
            const locale = "en";
            const registerCmd = jest.fn();
            const cmdsByKey = parseCommandsInWebLayout(webLayout, registerCmd);
            const mainToolbar = (webLayout.ToolBar.Visible
                ? convertWebLayoutUIItems(webLayout.ToolBar.Button, cmdsByKey, locale)
                : []);
            const taskBar = (webLayout.TaskPane.TaskBar.Visible
                ? convertWebLayoutUIItems(webLayout.TaskPane.TaskBar.MenuButton, cmdsByKey, locale, false)
                : []);
            const contextMenu = (webLayout.ContextMenu.Visible
                ? convertWebLayoutUIItems(webLayout.ContextMenu.MenuItem, cmdsByKey, locale, false)
                : []);
        }
    });
    it("Sheboygan XYZ TileSet", () => {
        const tsd = deArrayify(TSD_XYZ_SHEBOYGAN);
        expect(isTileSet(tsd));
    });
    it("Sheboygan mdf", () => {
        const mdf = deArrayify(MDF_SHEBOYGAN);
        expect(isMapDef(mdf));
    });
    it("Redding mdf", () => {
        const mdf = deArrayify(MDF_REDDING);
        expect(isMapDef(mdf));
    });
    it("Melbourne mdf", () => {
        const mdf = deArrayify(MDF_MELBOURNE);
        expect(isMapDef(mdf));
    });
    it("World mdf", () => {
        const mdf = deArrayify(MDF_WORLD);
        expect(isMapDef(mdf));
    })
});