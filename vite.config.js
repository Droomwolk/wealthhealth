// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // plugin React officiel
    viteCompression(), // compression gzip pour la prod
  ],

  // ✅ Support tests unitaires (Vitest)
  test: {
    environment: "jsdom", // simulateur de DOM (pour React)
    globals: true, // permet d’utiliser "test", "expect" sans import
    css: true, // support des imports SCSS dans les tests
    setupFiles: ["./src/test/setupTests.js"], // fichier de setup global
    coverage: {
      provider: "v8", // moteur de couverture moderne
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
    },
  },
});
