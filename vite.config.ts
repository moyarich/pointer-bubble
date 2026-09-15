import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.PLAYGROUND_BASE_PATH || "/",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@moyarich/pointer-bubble/styles.css": fileURLToPath(new URL("./packages/pointer-bubble/src/styles.css", import.meta.url)),
      "@moyarich/pointer-bubble": fileURLToPath(new URL("./packages/pointer-bubble/src/index.ts", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
