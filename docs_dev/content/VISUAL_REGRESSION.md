# Visual Regression Testing

This project uses [`@storybook/test-runner`](https://storybook.js.org/docs/writing-tests/test-runner) with [Playwright](https://playwright.dev/) to capture and compare component screenshots against stored baselines.

---

## How it works

1. Every Storybook story is automatically discovered — no separate list to maintain.
2. On each run, Playwright visits the story iframe, waits for `#storybook-root` to be visible and stable, then takes a screenshot.
3. The screenshot is compared against the PNG baseline stored in `visual-snapshots/`.
4. Any pixel difference fails the test and a side-by-side diff is included in the HTML report.

---

## Commands

| Command | Description |
|---|---|
| `yarn test:visual` | Compare against baselines (Storybook must already be running on port 4000) |
| `yarn test:visual:ci` | Start Storybook in the background, run tests, then stop Storybook |
| `yarn test:visual:update` | **Regenerate all baselines** — run this after intentional visual changes |

---

## Managing baselines

Baselines are PNG files stored in `visual-snapshots/` and are committed to git.

When you make an intentional visual change (e.g. replacing a Blueprint.js component):

```bash
yarn test:visual:update
git add visual-snapshots/
git commit -m "chore: update visual baselines after <description>"
```

To update only a specific story:

```bash
# Find the story ID (lowercase, spaces→hyphens, "/" → "--")
# e.g. "Common Elements/Button Variants" → "common-elements--button-variants"
yarn test:visual:update --testNamePattern "common-elements--button-variants"
```

---

## Viewing failure reports

When a test fails, an HTML report with side-by-side diffs is written to `playwright-report/`. Open it with:

```bash
npx playwright show-report
```

In CI, the report is uploaded as the `playwright-report` artifact and is available from the workflow run's summary page.

---

## MCP / Agent screenshot tool

The `tools/capture-story.ts` script lets an AI agent visually inspect any story in real time by capturing a screenshot of the rendered component.

### Standalone usage

```bash
# Storybook must be running (yarn storybook)
yarn capture:story --story "Common Elements/Button Variants"
# → prints: /tmp/story-common-elements--button-variants.png

# Custom Storybook URL and output path
yarn capture:story --story "Common Elements/Button Variants" \
  --url http://localhost:4000 \
  --out /tmp/my-screenshot.png
```

### MCP server usage

Start the MCP server (keep it running while your MCP client is open):

```bash
yarn mcp:storybook
```

Register it in your MCP client configuration (e.g. Claude Desktop `mcp_servers.json`):

```json
{
  "storybook-screenshot": {
    "command": "yarn",
    "args": ["mcp:storybook"],
    "cwd": "/path/to/mapguide-react-layout"
  }
}
```

The server exposes a single tool, `capture_story`, with this input schema:

```json
{
  "story": "Common Elements/Button Variants",
  "url": "http://localhost:4000"
}
```

The tool returns the screenshot as an inline base64-encoded PNG image, which MCP clients that support image content (such as Claude) will display directly in the conversation.
