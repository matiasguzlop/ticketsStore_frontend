import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom"
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "node_modules")
    }
  }
});
