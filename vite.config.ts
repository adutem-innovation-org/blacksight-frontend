import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isWidget = process.env.BUILD_WIDGET === "true";

  return {
    plugins: [react(), tailwindcss(), isWidget && cssInjectedByJsPlugin()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: isWidget
      ? {
          outDir: "dist/widget",
          lib: {
            entry: "src/widget/WidgetApp.tsx",
            name: "BlacksightWidget",
            fileName: "blacksight-widget",
            formats: ["iife"],
          },
          rollupOptions: {
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
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
      "process.env": {},
    },
  };
});
