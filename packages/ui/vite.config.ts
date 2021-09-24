import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { ALIASES, DST } from './vite.config.constants';

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    target: 'es2015',
    outDir: DST,
    minify: true,
    cssCodeSplit: false,
    brotliSize: false,
    chunkSizeWarningLimit: 100000,
    rollupOptions: {
      output: {
        assetFileNames: 'style.css',
        manualChunks: {},
        entryFileNames: 'main.js',
      },
    },
  },
  resolve: {
    alias: ALIASES,
  },
});
