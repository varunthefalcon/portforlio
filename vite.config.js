import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    // semantic-ui-css ships a few invalid selectors; skip them instead of failing
    lightningcss: { errorRecovery: true },
  },
  build: {
    // Netlify publishes this folder (same as the old CRA output)
    outDir: "build",
  },
  server: {
    port: 3000,
  },
});
