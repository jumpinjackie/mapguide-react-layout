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

## Excluding stories from visual regression

Stories that require a live MapGuide backend, WebGL, or external tile servers cannot produce stable baselines in a server-less environment. Tag their default export with `no-visual-regression` to opt them out of all visual regression runs:

```tsx
// src/stories/my-map.stories.tsx
export default {
  title: "My Map Stories",
  tags: ["no-visual-regression"],
  // ...
};
```

The `--excludeTags no-visual-regression` flag is already baked into the `test:visual` and `test:visual:update` scripts, so tagged stories are skipped automatically.

Currently excluded story files:
- `compact-viewer.stories.tsx` — requires a real map tile server
- `map.stories.tsx` — requires WebGL / live MapGuide
- `mapguide.stories.tsx` — requires a live MapGuide backend

---

## MCP / Agent screenshot tool

`tools/capture-story.ts` lets an AI agent — or any developer — visually inspect any Storybook story in real time by capturing a headless screenshot of the rendered component.  It runs in two modes: a one-shot CLI and a persistent [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) stdio server.

### Prerequisites

Storybook must be running before either mode is used:

```bash
yarn storybook          # defaults to http://localhost:6006
# or, to match the visual-regression test port:
storybook dev -p 4000 -c .storybook
```

### CLI mode

```bash
# Basic — story path in "Title/Story Name" format
yarn capture:story --story "Common Elements/Button Variants"
# → prints the absolute path to the saved PNG, e.g.:
#   /tmp/story-common-elements--button-variants.png

# Custom Storybook URL (if not on the default port)
yarn capture:story --story "Common Elements/Button Variants" \
  --url http://localhost:4000

# Custom output path
yarn capture:story --story "Common Elements/Button Variants" \
  --out /tmp/my-screenshot.png
```

#### Story path format

The `--story` value must match the Storybook title path exactly (case-insensitive slashes are fine). Internally, it is converted to a Storybook story ID by:

1. Splitting on `/`
2. Lowercasing each part
3. Replacing spaces with `-`
4. Joining parts with `--`

Examples:

| `--story` value | Story ID used |
|---|---|
| `Common Elements/Button Variants` | `common-elements--button-variants` |
| `Viewer Components/Error` | `viewer-components--error` |
| `Viewer Containers/Modal Launcher/Component Modal` | `viewer-containers-modal-launcher--component-modal` |

### MCP server mode

The MCP server wraps the same screenshot capability in a JSON-RPC stdio interface that any MCP-compatible client (Claude Desktop, VS Code Copilot, custom agents) can call automatically.

#### Starting the server

```bash
yarn mcp:storybook
```

The process listens on stdin/stdout and stays alive until the parent process exits.

#### Registering with an MCP client

Add the following entry to your MCP client's server configuration.

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "storybook-screenshot": {
      "command": "yarn",
      "args": ["mcp:storybook"],
      "cwd": "/absolute/path/to/mapguide-react-layout"
    }
  }
}
```

**VS Code / GitHub Copilot** (`.vscode/mcp.json` in the workspace):

```json
{
  "servers": {
    "storybook-screenshot": {
      "command": "yarn",
      "args": ["mcp:storybook"],
      "cwd": "${workspaceFolder}"
    }
  }
}
```

#### Available tool: `capture_story`

| Parameter | Type | Required | Description |
|---|---|---|---|
| `story` | `string` | ✅ | Story path in `"Title/Story Name"` format |
| `url` | `string` | ❌ | Base URL of the running Storybook (default: `http://localhost:4000`) |

**Response** — two content items are returned:

1. `image` — the screenshot as an inline base64-encoded PNG. MCP clients that support image content (such as Claude) render this directly in the conversation.
2. `text` — the absolute path of the PNG saved to `/tmp/`.

#### Example agent interaction

```
User:  Show me what the "Common Elements/Button Variants" story looks like.

Agent: [calls capture_story with story="Common Elements/Button Variants"]
       [renders the returned PNG inline]
       The story renders three buttons: primary, secondary, and danger variants.
```

### Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| `Error: page.goto: net::ERR_CONNECTION_REFUSED` | Storybook is not running | Start Storybook (`yarn storybook` or `storybook dev -p 4000`) |
| `Timeout waiting for #storybook-root` | Story path is wrong or story throws an error | Check the exact title in Storybook's sidebar; open the iframe URL manually |
| Black / blank screenshot | Story mounts asynchronously | The 500 ms settle delay is usually enough; open an issue if it is not |
| MCP server not found by client | Wrong `cwd` or `command` in client config | Use an absolute path for `cwd`; verify `yarn mcp:storybook` runs in the repo root |
