import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: { external: ["vue"], output: { globals: { vue: "Vue" } } },
    minify: false,
    lib: {
      entry: "./src/index.ts",
      name: "KomeUi",
      fileName: "index",
      formats: ["es", "umd"],
    },
  },
});
