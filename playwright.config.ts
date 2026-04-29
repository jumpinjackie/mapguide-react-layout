/**
 * playwright.config.ts
 *
 * Playwright configuration used by the standalone capture-story.ts tool.
 * Not used directly by @storybook/test-runner (which uses Jest + jest-image-snapshot).
 *
 * @since 0.15
 */
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
   use: {
      ...devices["Desktop Chrome"],
      baseURL: "http://localhost:4000",
   },
   reporter: [["html", { open: "never", outputFolder: "playwright-report" }]],
});
