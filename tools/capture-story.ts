/**
 * capture-story.ts
 *
 * A standalone Playwright script that navigates to a Storybook story and captures
 * a screenshot of the rendered component (#storybook-root).
 *
 * When run without arguments (or with --mcp), this script starts a minimal
 * MCP (Model Context Protocol) stdio server that exposes a `capture_story` tool.
 * Agents and MCP clients can call this tool to "see" what a component currently
 * looks like without needing to spin up a visual-regression test run.
 *
 * When run with --story, it takes a single screenshot and exits.
 *
 * Usage (standalone):
 *   tsx tools/capture-story.ts --story "Common Elements/Button Variants"
 *   tsx tools/capture-story.ts --story "Common Elements/Button Variants" --url http://localhost:4000
 *   tsx tools/capture-story.ts --story "Common Elements/Button Variants" --out /tmp/my-shot.png
 *
 * Usage (MCP server):
 *   tsx tools/capture-story.ts --mcp
 *
 * @since 0.15
 */
import { chromium } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

// ---------------------------------------------------------------------------
// Story ID helpers
// ---------------------------------------------------------------------------

/**
 * Converts a Storybook story path ("Title/Story Name") to a Storybook story ID.
 *
 * Storybook derives an ID by lowercasing the full path and replacing spaces and
 * forward-slashes with their respective separators: "/" → "--", " " → "-".
 *
 * @example
 * storyPathToId("Common Elements/Button Variants") // "common-elements--button-variants"
 * @since 0.15
 */
function storyPathToId(storyPath: string): string {
   const parts = storyPath.split("/").map((s) => s.trim());
   return parts
      .join("--")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "-");
}

// ---------------------------------------------------------------------------
// Screenshot helper
// ---------------------------------------------------------------------------

interface CaptureOptions {
   storyPath: string;
   storybookUrl?: string;
   outFile?: string;
}

interface CaptureResult {
   /** Absolute path to the saved PNG file. */
   filePath: string;
   /** Base64-encoded PNG content (data URI ready). */
   base64: string;
}

/**
 * Launches a headless Chromium browser, navigates to the Storybook iframe for
 * the specified story, waits for `#storybook-root` to be stable, and captures
 * a screenshot.
 *
 * @since 0.15
 */
async function captureStory(options: CaptureOptions): Promise<CaptureResult> {
   const { storyPath, storybookUrl = "http://localhost:4000", outFile } = options;

   const storyId = storyPathToId(storyPath);
   const iframeUrl = `${storybookUrl}/iframe.html?id=${storyId}&viewMode=story`;

   const browser = await chromium.launch({ headless: true });
   try {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1280, height: 800 });

      await page.goto(iframeUrl, { waitUntil: "networkidle" });

      // Wait for the story root to appear and settle
      const root = page.locator("#storybook-root");
      await root.waitFor({ state: "visible", timeout: 15000 });
      await page.waitForTimeout(500); // allow animations to finish

      const screenshotBuffer = await root.screenshot({ animations: "disabled" });

      const resolvedPath =
         outFile ?? path.join("/tmp", `story-${storyId}.png`);
      fs.writeFileSync(resolvedPath, screenshotBuffer);

      const base64 = screenshotBuffer.toString("base64");
      return { filePath: path.resolve(resolvedPath), base64 };
   } finally {
      await browser.close();
   }
}

// ---------------------------------------------------------------------------
// Standalone CLI mode
// ---------------------------------------------------------------------------

async function runCli(): Promise<void> {
   const args = process.argv.slice(2);
   const storyIdx = args.indexOf("--story");
   const urlIdx = args.indexOf("--url");
   const outIdx = args.indexOf("--out");

   if (storyIdx === -1 || storyIdx + 1 >= args.length) {
      console.error("Usage: tsx tools/capture-story.ts --story \"Title/Story Name\" [--url <url>] [--out <path>]");
      process.exit(1);
   }

   const storyPath = args[storyIdx + 1];
   const storybookUrl = urlIdx !== -1 ? args[urlIdx + 1] : undefined;
   const outFile = outIdx !== -1 ? args[outIdx + 1] : undefined;

   const result = await captureStory({ storyPath, storybookUrl, outFile });
   console.log(result.filePath);
}

// ---------------------------------------------------------------------------
// MCP stdio server mode
// ---------------------------------------------------------------------------

interface McpRequest {
   jsonrpc: "2.0";
   id: number | string | null;
   method: string;
   params?: Record<string, unknown>;
}

interface McpResponse {
   jsonrpc: "2.0";
   id: number | string | null;
   result?: unknown;
   error?: { code: number; message: string };
}

function send(response: McpResponse): void {
   process.stdout.write(JSON.stringify(response) + "\n");
}

const TOOL_DEFINITION = {
   name: "capture_story",
   description:
      "Captures a screenshot of a Storybook story and returns the image as base64-encoded PNG data. " +
      "Use this tool to 'see' what a component looks like. " +
      "Requires Storybook to be running (default: http://localhost:4000).",
   inputSchema: {
      type: "object",
      properties: {
         story: {
            type: "string",
            description:
               "The Storybook story path in 'Title/Story Name' format, " +
               "e.g. 'Common Elements/Button Variants'.",
         },
         url: {
            type: "string",
            description: "Base URL of the running Storybook (default: http://localhost:4000).",
         },
      },
      required: ["story"],
   },
};

async function handleMcpRequest(req: McpRequest): Promise<void> {
   if (req.method === "initialize") {
      send({
         jsonrpc: "2.0",
         id: req.id,
         result: {
            protocolVersion: "2024-11-05",
            serverInfo: { name: "storybook-screenshot", version: "0.15.0" },
            capabilities: { tools: {} },
         },
      });
      return;
   }

   if (req.method === "tools/list") {
      send({ jsonrpc: "2.0", id: req.id, result: { tools: [TOOL_DEFINITION] } });
      return;
   }

   if (req.method === "tools/call") {
      const params = (req.params ?? {}) as { name?: string; arguments?: Record<string, unknown> };
      if (params.name !== "capture_story") {
         send({ jsonrpc: "2.0", id: req.id, error: { code: -32602, message: `Unknown tool: ${params.name}` } });
         return;
      }

      const toolArgs = (params.arguments ?? {}) as { story?: string; url?: string };
      if (!toolArgs.story) {
         send({ jsonrpc: "2.0", id: req.id, error: { code: -32602, message: "Missing required argument: story" } });
         return;
      }

      try {
         const result = await captureStory({
            storyPath: toolArgs.story,
            storybookUrl: toolArgs.url,
         });

         send({
            jsonrpc: "2.0",
            id: req.id,
            result: {
               content: [
                  {
                     type: "image",
                     data: result.base64,
                     mimeType: "image/png",
                  },
                  {
                     type: "text",
                     text: `Screenshot saved to: ${result.filePath}`,
                  },
               ],
            },
         });
      } catch (err: unknown) {
         const message = err instanceof Error ? err.message : String(err);
         send({ jsonrpc: "2.0", id: req.id, error: { code: -32603, message } });
      }
      return;
   }

   // Notifications (no id) — ignore silently
   if (req.id == null) {
      return;
   }

   send({ jsonrpc: "2.0", id: req.id, error: { code: -32601, message: `Method not found: ${req.method}` } });
}

async function runMcpServer(): Promise<void> {
   const rl = readline.createInterface({ input: process.stdin });

   rl.on("line", async (line: string) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      let req: McpRequest;
      try {
         req = JSON.parse(trimmed) as McpRequest;
      } catch {
         // Malformed JSON — can't send a proper error without an id
         return;
      }

      await handleMcpRequest(req);
   });

   rl.on("close", () => process.exit(0));
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
if (args.includes("--mcp") || (!args.includes("--story") && process.argv.length <= 2)) {
   runMcpServer().catch((err: unknown) => {
      process.stderr.write(String(err) + "\n");
      process.exit(1);
   });
} else {
   runCli().catch((err: unknown) => {
      process.stderr.write(String(err) + "\n");
      process.exit(1);
   });
}
