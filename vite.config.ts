import { defineConfig } from "vite";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  plugins: [externalizeDeps()],
  build: {
    emptyOutDir: false,
    outDir: "dist",
    sourcemap: true,
    lib: {
      formats: ["cjs", "es"],
      entry: {
        config: "./src/config.ts",
        logger: "./src/logger.ts",
      },
    },
  },
});
