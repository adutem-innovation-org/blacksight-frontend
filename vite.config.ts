import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: 'src/widget/WidgetApp.tsx',
      name: 'BlacksightWidget',
      fileName: 'blacksight-widget', // <--- This sets the output name!
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        entryFileNames: 'blacksight-widget.iife.js', // <--- Ensures the output file is named as you want
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'blacksight-widget.css'; // Always use this name for CSS
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  define: {
    'process.env': {},
  },
});
