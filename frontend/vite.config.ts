import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: "/",
    build: {
    sourcemap: true
  },
  plugins: [react()],
  resolve: {
    alias: {
      '~@ibm/plex': resolve(__dirname, 'node_modules/@ibm/plex'),
    },
  },
  preview: {
   port: 8080,
   strictPort: true,
  },
  server: {
   port: 8080,
   strictPort: true,
   host: true,
   origin: "http://0.0.0.0:8080",
  },
 });