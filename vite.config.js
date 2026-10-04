import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Sin scripts ni estilos en línea: así la CSP del archivo public/_headers puede ser estricta.
export default defineConfig({
  plugins: [react()],
  build: { modulePreload: { polyfill: false }, assetsInlineLimit: 0 }
});
