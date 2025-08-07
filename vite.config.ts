import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const isWidget = process.env.BUILD_WIDGET === "true";

  return {
    plugins: [
      react(),
      tailwindcss(),
      viteCompression({ algorithm: "brotliCompress" }),
      visualizer({ open: true }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: isWidget ? "https://blacksight.co/widget/" : "/",
    build: isWidget
      ? {
        minify: 'esbuild',
        outDir: "dist/widget",
        cssCodeSplit: true,
        esbuild: {
          drop: ["console", "debugger"],
        },
        lib: {
          entry: "src/widget/WidgetApp.tsx",
          name: "BlacksightWidget",
          fileName: "blacksight-widget",
          formats: ["iife"],
        },
        rollupOptions: {
          external: [
            // "react",
            // "react-dom",
            // "@mantine/core",
            // "@mantine/dates",
            // "react-hot-toast",
            // "react-redux",
            // "redux",
          ],
          output: {
            globals: {
              // react: "React",
              // "react-dom": "ReactDOM",
              // "@mantine/core": "mantine.core",
              // "@mantine/dates": "mantine.dates",
              // "react-hot-toast": "ReactHotToast",
              // "react-redux": "ReactRedux",
              // redux: "Redux",
            },
            entryFileNames: "blacksight-widget.iife.js",
            chunkFileNames: "assets/[name]-[hash].js",
            assetFileNames: "assets/[name]-[hash][extname]",
          },
        },
      }
      : {
        outDir: "dist",
        rollupOptions: {
          output: {
            chunkFileNames: "assets/[name]-[hash].js",
            assetFileNames: "assets/[name]-[hash][extname]",
          },
        },
      },
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  };
});
