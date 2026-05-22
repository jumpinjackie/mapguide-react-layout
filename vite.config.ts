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
      const isVendorCss = originalFileNames.some(name => name.includes("/node_modules/"))
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

const getManualChunkName = (id: string) => {
   const normalizedId = id.replace(/\\/g, "/");
   if (normalizedId.includes("/node_modules/lerc/")
      || normalizedId.includes("/node_modules/pako/")
      || normalizedId.includes("/node_modules/zstddec/")) {
      return "geotiff-codecs";
   }
   if (normalizedId.includes("/node_modules/@petamoriken/float16/")
      || normalizedId.includes("/node_modules/parse-headers/")
      || normalizedId.includes("/node_modules/quick-lru/")
      || normalizedId.includes("/node_modules/web-worker/")
      || normalizedId.includes("/node_modules/xml-utils/")) {
      return "geotiff-deps";
   }
   if (normalizedId.includes("/node_modules/geotiff/") || normalizedId.includes("/node_modules/ol/source/GeoTIFF")) {
      return "geotiff";
   }
   if (normalizedId.includes("/node_modules/")) {
      return "vendor";
   }
   return undefined;
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
               manualChunks: getManualChunkName,
               assetFileNames: (assetInfo: IAssetFileInfo) => getAssetFileName(assetInfo, isDebugBuild)
            }
         }
      }
   };
};

export default config;
