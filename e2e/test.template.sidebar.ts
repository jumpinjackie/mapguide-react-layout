import { Selector } from "testcafe";
import { BASE_URL, LAYOUT_ID } from './config';
import { SidebarTemplate } from "./page-models/sidebar-template";

fixture("Sidebar Template").page(`${BASE_URL}/sidebar.html?resource=${LAYOUT_ID}`);

test("Sidebar Template", async t => {
    const page = new SidebarTemplate(t);
    await page.assertMapPresent();
    await t.takeScreenshot("template_sidebar");
});