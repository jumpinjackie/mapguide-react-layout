import { Selector } from "testcafe";
import { BASE_URL, LAYOUT_ID, DESKTOP_VIEWPORT, TEMPLATES } from './config';
import { waitForReact } from "testcafe-react-selectors";

for (const tpl of TEMPLATES) {
    const { template, page, pageFactory, testToolbarActions } = tpl;
    fixture(`Template - ${template}`)
        .page(`${BASE_URL}/${page || template}.html?resource=${LAYOUT_ID}`)
        .beforeEach(async t => {
            await t.resizeWindow(DESKTOP_VIEWPORT[0], DESKTOP_VIEWPORT[1]);
            await waitForReact();
        })
        .afterEach(async t => {
            const page = pageFactory(t);
            const id = await page.getSessionId();
            //console.log(`Session ID is: ${id}`); //TODO: We should destroy this session id
        });

    test(`Template - ${template} - baseline`, async t => {
        const page = pageFactory(t);
        await page.assertMapPresent();
        await t.takeScreenshot(`${template}_1_baseline`);
    });

    if (testToolbarActions) {
        test(`Template - ${template} - zoom in`, async t => {
            const page = pageFactory(t);
            await page.assertMapPresent();
            await page.invokeZoomIn();
            await page.invokeZoomIn();
            await page.invokeZoomIn();
            await t.takeScreenshot(`${template}_2_zoomed_in`);
        });

        test(`Template - ${template} - zoom/pan`, async t => {
            const page = pageFactory(t);
            await page.assertMapPresent();
            await page.invokeZoomIn();
            await page.invokeZoomIn();
            await page.dragPan([200, 200], [400, 300]);
            await t.takeScreenshot(`${template}_3_zoom_pan`);
        });

        test(`Template - ${template} - zoom rect`, async t => {
            const page = pageFactory(t);
            await page.assertMapPresent();
            await page.boxZoom([120, 120], [400, 300]);
            await page.boxZoom([120, 120], [200, 100]);
            await t.takeScreenshot(`${template}_4_zoomed_rect`);
        });

        test(`Template - ${template} - box select and clear`, async t => {
            const page = pageFactory(t);
            await page.assertMapPresent();
            //Zoom and pan a bit first
            await page.invokeZoomIn();
            await page.boxZoom([120, 120], [400, 300]);
            await page.dragPan([200, 200], [400, 300]);
            await page.boxZoom([120, 120], [200, 100]);
            await t.wait(800); //Let the map rendering catch up
            await page.boxSelect([120, 120], [400, 300]);
            await t.wait(500); //Let the selection rendering catch up
            await t.takeScreenshot(`${template}_5_box_select`);
            await page.invokeClearSelection();
            await t.wait(300); //Let the selection rendering catch up
            await t.takeScreenshot(`${template}_6_cleared_selection`);
        });
    }
}