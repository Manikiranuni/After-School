
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    vueDevTools()
  ],

  // GitHub Pages deployment
  base: command === "build"
    ? "/After-School/"
    : "/",

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
}));
