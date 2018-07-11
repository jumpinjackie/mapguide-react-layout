import { Selector } from "testcafe";
import { BASE_URL, LAYOUT_ID } from './config';
import { AquaTemplate } from "./page-models/aqua-template";

fixture("Aqua Template").page(`${BASE_URL}/aqua.html?resource=${LAYOUT_ID}`);

test("Aqua Template", async t => {
    const page = new AquaTemplate(t);
    await page.assertMapPresent();
    await t.takeScreenshot("template_aqua");
});