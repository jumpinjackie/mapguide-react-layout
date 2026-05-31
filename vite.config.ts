// Vite configuration for building the browser viewer bundle.
import path from "path";
import react from "@vitejs/plugin-react";

const visualizerModulePromise = import("rollup-plugin-visualizer");

interface IAssetFileInfo {
   name?: string;
   originalFileNames?: string[];
}

const getBuildMetadata = () => ({
   __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
   __VERSION__: JSON.stringify(process.env.APPVEYOR_BUILD_VERSION || ""),
   __COMMITHASH__: JSON.stringify(process.env.APPVEYOR_REPO_COMMIT || ""),
   __BRANCH__: JSON.stringify(process.env.APPVEYOR_REPO_BRANCH || "master"),
   "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
   "process.env.BLUEPRINT_NAMESPACE": JSON.stringify("bp3")
});

const getAssetFileName = (assetInfo: IAssetFileInfo, isDebugBuild: boolean) => {
   const originalFileNames = assetInfo.originalFileNames?.map(name => name.replace(/\\/g, "/")) ?? [];
   const assetName = assetInfo.name ?? "";
   const lowerAssetName = assetName.toLowerCase();
   const originalFileName = originalFileNames[0] ?? assetName;

   const isCss = /\.css$/i.test(assetName) || /\.css$/i.test(originalFileName) || originalFileNames.some(name => /\.css$/i.test(name));
   if (isCss) {
      // Vendor CSS: from node_modules (path contains /node_modules/), or standalone
      // CSS assets like ol.css that have no original source files tracked.
      const isVendorCss = originalFileNames.some(name => {
            const normalized = name.replace(/\\/g, "/");
            return normalized.includes("/node_modules/");
         })
         || (originalFileNames.length === 0 && !originalFileNames.some(n => n.includes("/src/")))
         || assetName.toLowerCase().includes("vendor");
      if (isVendorCss) {
         return isDebugBuild ? "vendor-debug.css" : "vendor.css";
      }
      return isDebugBuild ? "viewer-debug.css" : "viewer.css";
   }
   if (originalFileName.includes("/stdassets/images/icons/")) {
      return "stdassets/images/icons/[name][extname]";
   }
   if (originalFileName.includes("/stdassets/sprites/") || lowerAssetName === "icons.png") {
      return "stdassets/sprites/[name][extname]";
   }
   if (originalFileName.includes("/stdassets/images/res/")) {
      return "stdassets/images/res/[name][extname]";
   }
   if (originalFileName.includes("/stdassets/cursors/") || /\.(cur)$/i.test(assetName)) {
      return "stdassets/cursors/[name][extname]";
   }
   if (lowerAssetName === "sliderscale.png") {
      return "stdassets/images/res/[name][extname]";
   }
   if (/\.(woff2?|ttf|eot|svg)$/i.test(originalFileName)) {
      return "stdassets/fonts/[name][extname]";
   }
   return "assets/[name][extname]";
};

const getChunkFileName = (chunkName: string, isDebugBuild: boolean) => {
   if (chunkName === "vendor") {
      return isDebugBuild ? "vendor-debug.js" : "vendor.js";
   }
   return isDebugBuild ? "chunks/[name]-debug.js" : "chunks/[name].js";
};

const codeSplitting = {
   groups: [
      {
         /**
          * Codec dependencies that geotiff uses (lerc, pako, zstddec).
          * Highest priority so these modules are captured before geotiff pulls them in.
          */
         name: "geotiff-codecs",
         test: (id: string) => {
            const normalizedId = id.replace(/\\/g, "/");
            return normalizedId.includes("/node_modules/lerc/")
               || normalizedId.includes("/node_modules/pako/")
               || normalizedId.includes("/node_modules/zstddec/");
         },
         priority: 30
      },
      {
         /**
          * Sub-dependencies of OpenLayers (rbush, earcut, pbf, zarrita, numcodecs, fflate).
          * Captured at high priority so the ol chunk cannot pull them in via includeDependenciesRecursively.
          */
         name: "ol-deps",
         test: (id: string) => {
            const normalizedId = id.replace(/\\/g, "/");
            return normalizedId.includes("/node_modules/rbush/")
               || normalizedId.includes("/node_modules/earcut/")
               || normalizedId.includes("/node_modules/pbf/")
               || normalizedId.includes("/node_modules/resolve-protobuf-schema/")
               || normalizedId.includes("/node_modules/protocol-buffers-schema/")
               || normalizedId.includes("/node_modules/zarrita/")
               || normalizedId.includes("/node_modules/@zarrita/storage/")
               || normalizedId.includes("/node_modules/numcodecs/")
               || normalizedId.includes("/node_modules/fflate/");
         },
         priority: 25
      },
      {
         /**
          * Utility dependencies that geotiff uses (float16, parse-headers, quick-lru, web-worker, xml-utils).
          * Second priority, captured before geotiff but after codecs.
          */
         name: "geotiff-deps",
         test: (id: string) => {
            const normalizedId = id.replace(/\\/g, "/");
            return normalizedId.includes("/node_modules/@petamoriken/float16/")
               || normalizedId.includes("/node_modules/parse-headers/")
               || normalizedId.includes("/node_modules/quick-lru/")
               || normalizedId.includes("/node_modules/web-worker/")
               || normalizedId.includes("/node_modules/xml-utils/");
         },
         priority: 20
      },
      {
         /**
          * The geotiff library itself and the OpenLayers GeoTIFF source adapter.
          */
         name: "geotiff",
         test: (id: string) => {
            const normalizedId = id.replace(/\\/g, "/");
            return normalizedId.includes("/node_modules/geotiff/")
               || normalizedId.includes("/node_modules/ol/source/GeoTIFF");
         },
         priority: 10
      },
      {
         /**
          * OpenLayers format readers/writers. Split from the main ol chunk
          * to keep it under the 500 KB limit. Higher priority than ol so
          * format modules are captured before ol pulls them in.
          */
         name: "ol-formats",
         test: (id: string) => {
            const normalizedId = id.replace(/\\/g, "/");
            return normalizedId.includes("/node_modules/ol/format/");
         },
         priority: 9
      },
      {
         /**
          * The OpenLayers mapping library. Note: ol/source/GeoTIFF and ol/format/*
          * are already captured by higher-priority groups, so they will not end up here.
          */
         name: "ol",
         test: (id: string) => {
            const normalizedId = id.replace(/\\/g, "/");
            return normalizedId.includes("/node_modules/ol/");
         },
         priority: 8
      },
      {
         /**
          * OpenLayers format readers/writers. Split from the main ol chunk
          * to keep it under the 500 KB limit.
          */
         name: "ol-formats",
         test: (id: string) => {
            const normalizedId = id.replace(/\\/g, "/");
            return normalizedId.includes("/node_modules/ol/format/");
         },
         priority: 7
      },
      {
         /**
          * React and ReactDOM along with their internal runtime dependencies.
          */
         name: "react-vendor",
         test: (id: string) => {
            const normalizedId = id.replace(/\\/g, "/");
            return normalizedId.includes("/node_modules/react/")
               || normalizedId.includes("/node_modules/react-dom/")
               || normalizedId.includes("/node_modules/scheduler/")
               || normalizedId.includes("/node_modules/react-is/")
               || normalizedId.includes("/node_modules/prop-types/")
               || normalizedId.includes("/node_modules/object-assign/");
         },
         priority: 5
      },
      {
         /**
          * jsPDF core library and its required dependencies (fflate, fast-png, base64-arraybuffer).
          * Split from vendor so it only loads when QuickPlot (client-side mode) is used.
          */
         name: "jspdf",
         test: (id: string) => {
            const normalizedId = id.replace(/\\/g, "/");
            return normalizedId.includes("/node_modules/jspdf/")
               || normalizedId.includes("/node_modules/fflate/")
               || normalizedId.includes("/node_modules/fast-png/")
               || normalizedId.includes("/node_modules/base64-arraybuffer/");
         },
         priority: 4
      },
      {
         /**
          * jsPDF optional plugins (canvg, html2canvas). Used for advanced PDF features
          * like HTML/SVG-to-canvas rendering. Split separately since QuickPlot's basic
          * usage (image + text + shapes) doesn't require them.
          */
         name: "jspdf-plugins",
         test: (id: string) => {
            const normalizedId = id.replace(/\\/g, "/");
            return normalizedId.includes("/node_modules/canvg/")
               || normalizedId.includes("/node_modules/svg2pdf/")
               || normalizedId.includes("/node_modules/html2canvas/");
         },
         priority: 3
      },
      {
         /**
          * Catch-all for remaining node_modules dependencies.
          */
         name: "vendor",
         test: /node_modules[\\/]/
      }
   ]
};

/**
 * Vite configuration for browser viewer bundle builds.
 *
 * @hidden
 * @since 0.15
 */
const config = async ({ mode }: { mode: string }) => {
   const isDebugBuild = process.env.DEBUG_BUILD === "1";
   const isProduction = mode === "production";
   const shouldAnalyze = process.env.ANALYZE === "1";
   const rollupPlugins = [] as any[];

   if (shouldAnalyze) {
      const { visualizer } = await visualizerModulePromise;
      rollupPlugins.push(visualizer({
         filename: path.resolve(__dirname, "viewer/dist/stats.html"),
         gzipSize: true,
         brotliSize: true,
         template: "treemap"
      }));
   }

   return {
      base: "./",
      publicDir: false,
      assetsInclude: ["**/*.cur"],
      plugins: [react()],
      define: {
         ...getBuildMetadata(),
         __DEV__: JSON.stringify(!isProduction)
      },
      resolve: {
         alias: [
            {
               find: /.*\/generated\/iconSvgPaths.*/,
               replacement: path.resolve(__dirname, "stdassets/bp-icons.js")
            }
         ]
      },
      build: {
         target: "es2015",
         minify: isDebugBuild ? false : "esbuild",
         sourcemap: true,
         cssCodeSplit: true,
         emptyOutDir: false,
         outDir: path.resolve(__dirname, "viewer/dist"),
         rollupOptions: {
            input: path.resolve(__dirname, "src/entries/browser-global.ts"),
            plugins: rollupPlugins,
            output: {
               format: "es",
               entryFileNames: isDebugBuild ? "viewer-debug.js" : "viewer.js",
               chunkFileNames: (chunkInfo: { name: string }) => getChunkFileName(chunkInfo.name, isDebugBuild),
               codeSplitting,
               assetFileNames: (assetInfo: IAssetFileInfo) => getAssetFileName(assetInfo, isDebugBuild)
            }
         }
      }
   };
};

export default config;
