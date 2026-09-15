import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.PLAYGROUND_BASE_PATH || "/",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: [
      {
        find: /^@moyarich\/pointer-bubble\/styles\.css(?=\?|$)/,
        replacement: fileURLToPath(
          new URL("../../packages/pointer-bubble/src/styles.css", import.meta.url),
        ),
      },
      {
        find: "@moyarich/pointer-bubble",
        replacement: fileURLToPath(
          new URL("../../packages/pointer-bubble/src/index.ts", import.meta.url),
        ),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
