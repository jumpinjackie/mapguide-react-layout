import { Selector } from "testcafe";
import { BASE_URL, LAYOUT_ID } from './config';
import { LimeGoldTemplate } from "./page-models/limegold-template";

fixture("LimeGold Template").page(`${BASE_URL}/limegold.html?resource=${LAYOUT_ID}`);

test("LimeGold Template", async t => {
    const page = new LimeGoldTemplate(t);
    await page.assertMapPresent();
    await t.takeScreenshot("template_limegold");
});