import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"
import { fileURLToPath } from "url";


// Maadaama aan isticmaaleyno ESM, waa inaan u dhisnaa __dirname sidan:
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5000", // Halkan geli Port-ka uu backend-kaagu ku shaqaynayo
    },
  },
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
