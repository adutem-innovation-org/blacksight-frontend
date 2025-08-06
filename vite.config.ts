import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

// export default defineConfig(({ mode }) => {
//   const isWidget = process.env.BUILD_WIDGET === "true";

//   return {
//     plugins: [
//       react(),
//       tailwindcss(),
//       viteCompression({ algorithm: "brotliCompress" }) // compress build
//     ],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./src"),
//       },
//     },
//     build: isWidget
//       ? {
//           outDir: "dist/widget",
//           cssCodeSplit: true, // ✅ keep CSS in separate file
//           lib: {
//             entry: "src/widget/WidgetApp.tsx",
//             name: "BlacksightWidget",
//             fileName: "blacksight-widget",
//             formats: ["iife"],
//           },
//           rollupOptions: {
//             external: [
//               "react",
//               "react-dom",
//               "@mantine/core",
//               "@mantine/dates"
//             ],
//             output: {
//               globals: {
//                 react: "React",
//                 "react-dom": "ReactDOM",
//                 "@mantine/core": "mantine.core",
//                 "@mantine/dates": "mantine.dates"
//               },
//               entryFileNames: "blacksight-widget.iife.js",
//               chunkFileNames: "assets/[name]-[hash].js",
//               assetFileNames: "assets/[name]-[hash][extname]",
//             },
//           },
//         }
//       : {
//           outDir: "dist",
//           rollupOptions: {
//             output: {
//               chunkFileNames: "assets/[name]-[hash].js",
//               assetFileNames: "assets/[name]-[hash][extname]",
//             },
//           },
//         },
//     define: {
//       "process.env": {},
//     },
//   };
// });


export default defineConfig(({ mode }) => {
  const isWidget = process.env.BUILD_WIDGET === "true";

  return {
    plugins: [
      react(),
      tailwindcss(),
      viteCompression({ algorithm: "brotliCompress" }) // compress build
    ],
   resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: isWidget ? "https://blacksight.co/widget/" : "/", // 👈 asset base URL
    build: isWidget
      ? {
          outDir: "dist/widget",
          cssCodeSplit: true,
          lib: {
            entry: "src/widget/WidgetApp.tsx",
            name: "BlacksightWidget",
            fileName: "blacksight-widget",
            formats: ["iife"],
          },
          rollupOptions: {
            output: {
              assetFileNames: "assets/[name]-[hash][extname]",
              chunkFileNames: "assets/[name]-[hash].js",
              entryFileNames: "blacksight-widget.iife.js",
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
