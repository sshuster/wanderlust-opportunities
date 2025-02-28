
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Note: componentTagger and other newer features removed for compatibility
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Use more compatible build settings
  build: {
    target: 'es2015',
    minify: 'terser',
    cssCodeSplit: true,
  },
  // Disable newer features that might require newer Node.js
  esbuild: {
    target: 'es2015',
  },
});
