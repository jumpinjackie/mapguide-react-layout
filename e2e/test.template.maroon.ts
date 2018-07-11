import { Selector } from "testcafe";
import { BASE_URL, LAYOUT_ID, DESKTOP_VIEWPORT } from './config';
import { MaroonTemplate } from "./page-models/maroon-template";

fixture("Maroon Template").page(`${BASE_URL}/maroon.html?resource=${LAYOUT_ID}`);

test("Maroon Template", async t => {
    await t.resizeWindow(DESKTOP_VIEWPORT[0], DESKTOP_VIEWPORT[1]);
    const page = new MaroonTemplate(t);
    await page.assertMapPresent();
    await t.takeScreenshot("template_maroon");
});