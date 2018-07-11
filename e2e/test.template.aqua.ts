import { Selector } from "testcafe";
import { BASE_URL, LAYOUT_ID, DESKTOP_VIEWPORT } from './config';
import { AquaTemplate } from "./page-models/aqua-template";

fixture("Aqua Template").page(`${BASE_URL}/aqua.html?resource=${LAYOUT_ID}`);

test("Aqua Template", async t => {
    await t.resizeWindow(DESKTOP_VIEWPORT[0], DESKTOP_VIEWPORT[1]);
    const page = new AquaTemplate(t);
    await page.assertMapPresent();
    await t.takeScreenshot("template_aqua");
});