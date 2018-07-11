import { Selector } from "testcafe";
import { BASE_URL, LAYOUT_ID, DESKTOP_VIEWPORT } from './config';
import { LimeGoldTemplate } from "./page-models/limegold-template";

fixture("LimeGold Template").page(`${BASE_URL}/limegold.html?resource=${LAYOUT_ID}`);

test("LimeGold Template", async t => {
    await t.resizeWindow(DESKTOP_VIEWPORT[0], DESKTOP_VIEWPORT[1]);
    const page = new LimeGoldTemplate(t);
    await page.assertMapPresent();
    await t.takeScreenshot("template_limegold");
});