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

   async postVisit(page, context) {
      const root = page.locator("#storybook-root");
      // Wait for the root to be in the DOM before capturing.
      await root.waitFor({ state: "attached", timeout: 10000 });
      // Allow a brief moment for CSS/assets to settle.  We intentionally use a
      // short timeout so polling-heavy stories (e.g. sprite-based icons) don't
      // exhaust the Jest test budget.
      await page.waitForLoadState("networkidle", { timeout: 2000 }).catch(() => {
         // networkidle may time out for stories that keep making requests; proceed anyway.
      });

      const image = await root.screenshot({ animations: "disabled" });

      expect(image).toMatchImageSnapshot({
         customSnapshotsDir: "visual-snapshots",
         customSnapshotIdentifier: context.id,
         failureThreshold: 0.01,
         failureThresholdType: "percent",
      });
   },
};
