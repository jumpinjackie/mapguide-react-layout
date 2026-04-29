/**
 * test-runner.js
 *
 * Storybook test-runner configuration for visual regression testing.
 *
 * Every story is automatically visited by Playwright and a screenshot of
 * the rendered component (#storybook-root) is captured and compared against
 * the stored baseline in visual-snapshots/.
 *
 * Run modes:
 *   yarn test:visual         - compare against stored baselines (Storybook must be running)
 *   yarn test:visual:ci      - start Storybook in background then run tests (CI-friendly)
 *   yarn test:visual:update  - regenerate all baselines
 *
 * @since 0.15
 */
const { toMatchImageSnapshot } = require("jest-image-snapshot");

/** @type {import('@storybook/test-runner').TestRunnerConfig} */
module.exports = {
   setup() {
      expect.extend({ toMatchImageSnapshot });
   },

   async preVisit(page) {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.setExtraHTTPHeaders({
         "Accept-Language": "en-US,en;q=0.9",
      });
      await page.emulateMedia({
         colorScheme: "light",
         reducedMotion: "reduce",
      });

      // Remove timing-sensitive animation noise for stable pixel output.
      await page.addStyleTag({
         content: "*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }",
      });
   },

   async postVisit(page, context) {
      const root = page.locator("#storybook-root");
      // Wait for the root to be in the DOM before capturing.
      await root.waitFor({ state: "visible", timeout: 10000 });
      // Allow a brief moment for CSS/assets to settle.  We intentionally use a
      // short timeout so polling-heavy stories (e.g. sprite-based icons) don't
      // exhaust the Jest test budget.
      await page.waitForLoadState("networkidle", { timeout: 2000 }).catch(() => {
         // networkidle may time out for stories that keep making requests; proceed anyway.
      });

      // Wait for web fonts and one render tick to reduce CI-local raster differences.
      await page.evaluate(async () => {
         const doc = document;
         if (doc.fonts && doc.fonts.ready) {
            await doc.fonts.ready;
         }
      });
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => resolve(null))));

      const image = await root.screenshot({ animations: "disabled" });

      expect(image).toMatchImageSnapshot({
         customSnapshotsDir: "visual-snapshots",
         customSnapshotIdentifier: context.id,
         failureThreshold: 0.05,
         failureThresholdType: "percent",
      });
   },
};
