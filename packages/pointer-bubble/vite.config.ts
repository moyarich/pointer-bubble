import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

export default defineConfig({
  plugins: [{
    name: "pointer-bubble-styles",
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "styles.css", source: readFileSync(new URL("./src/styles.css", import.meta.url), "utf8") });
    },
  }],
  build: {
    lib: { entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)), formats: ["es", "cjs"], fileName: (format) => format === "es" ? "index.js" : "index.cjs" },
    rollupOptions: { external: ["react", "react/jsx-runtime", "clsx", "tailwind-merge"] },
  },
});
