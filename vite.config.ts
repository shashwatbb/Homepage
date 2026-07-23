import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  /** Dev: open http://localhost:<port>/pdp.html (port is printed if 5173 is taken). */
  server: {
    port: 5173,
    strictPort: false,
    host: "localhost",
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        pdp: path.resolve(__dirname, "pdp.html"),
        buy: path.resolve(__dirname, "buy.html"),
        srp: path.resolve(__dirname, "srp.html"),
        pdpMobile: path.resolve(__dirname, "pdp-mobile.html"),
        megamenu: path.resolve(__dirname, "buyers-megamenu.html"),
      },
    },
  },
});
