import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: ["es", "lib", "dist"],
      tsconfigPath: resolve(__dirname, "tsconfig.json"),
    }),
    postcss({
      extract: "index.css",
      plugins: [autoprefixer()],
    }),
    copy({
      targets: [{ src: "es/*.css", dest: "dist" }],
      verbose: true,
      hook: "generateBundle",
    }),
    del({
      targets: ["es/*.css", "lib/*.css", "dist/style.css"],
      hook: "closeBundle",
    }),
  ],
  build: {
    rollupOptions: {
      external: ["vue"],
      output: [
        { globals: { vue: "Vue" } },
        {
          format: "es",
          entryFileNames: "[name].mjs",
          preserveModules: true,
          exports: "named",
          dir: "es",
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          exports: "named",
          dir: "lib",
        },
      ],
    },
    minify: false,
    lib: {
      entry: "./src/index.ts",
      name: "kome-ui",
      fileName: "index",
      formats: ["es", "cjs"],
    },
  },
});
