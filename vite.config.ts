// Vite configuration for building the browser viewer bundle.
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const BROWSER_GLOBAL_NAME = "MapGuide";

const getBuildMetadata = () => ({
   __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
   __VERSION__: JSON.stringify(process.env.APPVEYOR_BUILD_VERSION || ""),
   __COMMITHASH__: JSON.stringify(process.env.APPVEYOR_REPO_COMMIT || ""),
   __BRANCH__: JSON.stringify(process.env.APPVEYOR_REPO_BRANCH || "master"),
   "process.env.BLUEPRINT_NAMESPACE": JSON.stringify("bp3")
});

const getAssetFileName = (assetInfo: { name?: string; originalFileNames?: string[] }, isDebugBuild: boolean) => {
   const originalFileName = assetInfo.originalFileNames?.[0]?.replace(/\\/g, "/") ?? assetInfo.name ?? "";

   if (/\.css$/i.test(originalFileName)) {
      return isDebugBuild ? "viewer-debug.css" : "viewer.css";
   }
   if (originalFileName.includes("/stdassets/images/icons/")) {
      return "stdassets/images/icons/[name][extname]";
   }
   if (originalFileName.includes("/stdassets/images/res/")) {
      return "stdassets/images/res/[name][extname]";
   }
   if (originalFileName.includes("/stdassets/cursors/")) {
      return "stdassets/cursors/[name][extname]";
   }
   if (/\.(woff2?|ttf|eot|svg)$/i.test(originalFileName)) {
      return "stdassets/fonts/[name][extname]";
   }
   return "assets/[name][extname]";
};

export default defineConfig(({ mode }) => {
   const isDebugBuild = process.env.DEBUG_BUILD === "1";
   const isProduction = mode === "production";

   return {
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
         sourcemap: true,
         cssCodeSplit: false,
         emptyOutDir: false,
         outDir: path.resolve(__dirname, "viewer/dist"),
         lib: {
            entry: path.resolve(__dirname, "src/entries/library.tsx"),
            name: BROWSER_GLOBAL_NAME,
            formats: ["iife"],
            fileName: () => (isDebugBuild ? "viewer-debug.js" : "viewer.js")
         },
         rollupOptions: {
            output: {
               assetFileNames: (assetInfo) => getAssetFileName(assetInfo, isDebugBuild)
            }
         }
      }
   };
});
