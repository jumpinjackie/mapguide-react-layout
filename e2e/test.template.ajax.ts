import { Selector } from "testcafe";
import { BASE_URL, LAYOUT_ID, DESKTOP_VIEWPORT } from './config';
import { AjaxViewerTemplate } from "./page-models/ajax-template";

fixture("AJAX Viewer Template").page(`${BASE_URL}/index.html?resource=${LAYOUT_ID}`);

test("AJAX Viewer Template", async t => {
    await t.resizeWindow(DESKTOP_VIEWPORT[0], DESKTOP_VIEWPORT[1]);
    const page = new AjaxViewerTemplate(t);
    await page.assertMapPresent();
    await t.takeScreenshot("template_ajax");
});