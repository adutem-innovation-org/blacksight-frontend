import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isWidget = process.env.BUILD_WIDGET === "true";
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    ...(isWidget
      ? {
          build: {
            lib: {
              entry: 'src/widget/WidgetApp.tsx',
              name: 'BlacksightWidget',
              fileName: 'blacksight-widget',
              formats: ['iife'],
            },
            rollupOptions: {
              output: {
                globals: {
                  react: 'React',
                  'react-dom': 'ReactDOM',
                },
                entryFileNames: 'blacksight-widget.iife.js',
                chunkFileNames: "assets/[name]-[hash].js",
                assetFileNames: (assetInfo) => {
                  if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                    return 'blacksight-widget.css';
                  }
                  return "assets/[name]-[hash][extname]";
                },
              },
            },
          },
        }
      : {
          // Default SPA build config (no build.lib)
        }),
    define: {
      'process.env': {},
    },
  };
});
