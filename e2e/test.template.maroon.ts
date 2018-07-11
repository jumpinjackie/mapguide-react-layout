import { Selector } from "testcafe";
import { BASE_URL, LAYOUT_ID } from './config';
import { MaroonTemplate } from "./page-models/maroon-template";

fixture("Maroon Template").page(`${BASE_URL}/maroon.html?resource=${LAYOUT_ID}`);

test("Maroon Template", async t => {
    const page = new MaroonTemplate(t);
    await page.assertMapPresent();
    await t.takeScreenshot("template_maroon");
});