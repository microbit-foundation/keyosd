// (c) 2025, Micro:bit Educational Foundation and contributors
//
// SPDX-License-Identifier: MIT

import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

const isStandalone = process.env.BUILD_MODE === "standalone";
const isDemoMode = process.env.BUILD_MODE === "demo";

export default defineConfig({
  base: isDemoMode ? "./" : undefined,
  plugins: isDemoMode
    ? []
    : [dts({ include: ["src"], exclude: ["src/standalone.ts", "src/main.ts"] })],
  build: isDemoMode
    ? {
        outDir: "dist-demo",
        rollupOptions: {
          input: {
            main: resolve(__dirname, "index.html"),
          },
        },
      }
    : {
        outDir: isStandalone ? "dist-standalone" : "dist",
        lib: {
          entry: resolve(
            __dirname,
            isStandalone ? "src/standalone.ts" : "src/index.ts"
          ),
          name: "KeyOSD",
          formats: ["es", "umd"],
          fileName: (format) => {
            const base = isStandalone ? "keyosd.standalone" : "keyosd";
            return `${base}.${format === "es" ? "js" : "umd.cjs"}`;
          },
        },
        rollupOptions: {
          output: {
            assetFileNames: "keyosd.[ext]",
          },
        },
      },
});
