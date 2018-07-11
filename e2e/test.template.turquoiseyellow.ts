import { Selector } from "testcafe";
import { BASE_URL, LAYOUT_ID, DESKTOP_VIEWPORT } from './config';
import { TurquoiseYellowTemplate } from "./page-models/turquoiseyellow-template";

fixture("TurquoiseYellow Template").page(`${BASE_URL}/turquoiseyellow.html?resource=${LAYOUT_ID}`);

test("TurquoiseYellow Template", async t => {
    await t.resizeWindow(DESKTOP_VIEWPORT[0], DESKTOP_VIEWPORT[1]);
    const page = new TurquoiseYellowTemplate(t);
    await page.assertMapPresent();
    await t.takeScreenshot("template_turquoiseyellow");
});