import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4173,
    strictPort: true, // Prevents the server from using an alternative port
  },
  preview: {
    port: 4173,
  },
  base: './',
});
