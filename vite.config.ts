import { defineConfig } from "vite";
import solidPlugin from 'vite-plugin-solid';

// https://vite.dev/config/
export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 8080,
    open: true,
  },
  build: {
    target: 'esnext',
  },
});
