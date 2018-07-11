import { Selector } from "testcafe";
import { BASE_URL, LAYOUT_ID } from './config';
import { SlateTemplate } from "./page-models/slate-template";

fixture("Slate Template").page(`${BASE_URL}/slate.html?resource=${LAYOUT_ID}`);

test("Slate Template", async t => {
    const page = new SlateTemplate(t);
    await page.assertMapPresent();
    await t.takeScreenshot("template_slate");
});