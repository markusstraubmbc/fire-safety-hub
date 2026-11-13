import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ordner = path.dirname(fileURLToPath(import.meta.url));

// Eigene Vite-Seite für das Erklärvideo, getrennt von der Webseite.
export default defineConfig({
  root: ordner,
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      // Logo und Favicons der Webseite, ohne sie zu kopieren.
      "@webseite-public": path.resolve(ordner, "../public"),
    },
  },
  css: {
    // Eigene PostCSS-Kette. Ohne sie fände Vite die postcss.config.js der Webseite, und deren Tailwind
    // sucht Klassen nur unter src/ der Webseite, nicht hier.
    postcss: {
      plugins: [tailwindcss({ config: path.resolve(ordner, "tailwind.config.ts") })],
    },
  },
  server: {
    // Der Ordner hat eine eigene package.json; ohne diese Freigabe sperrt der Entwicklungsserver
    // das Logo und die Schriftdateien aus dem Repo darüber.
    fs: { allow: [path.resolve(ordner, "..")] },
  },
  optimizeDeps: {
    include: ["react", "react-dom/client", "lucide-react"],
  },
  build: {
    // Derselbe Schalter wie in scripts/lib/common.mjs: RESQIO_VIDEO_OUT legt den Ausgabeordner um.
    outDir: path.resolve(ordner, process.env.RESQIO_VIDEO_OUT || "out", "web"),
    emptyOutDir: true,
    // Bilder immer als Datei, nie eingebettet: Der Render wartet auf ihr Dekodieren.
    assetsInlineLimit: 0,
  },
});
