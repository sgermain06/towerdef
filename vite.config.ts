import { defineConfig } from "vite";
import solidPlugin from 'vite-plugin-solid';
import suidPlugin from '@suid/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [suidPlugin(), solidPlugin()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    target: 'esnext',
  },
});
