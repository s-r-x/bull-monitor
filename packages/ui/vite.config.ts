import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import { ALIASES, DST, ROOT } from './vite.config.constants';

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    target: 'es2015',
    outDir: DST,
    cssCodeSplit: false,
    brotliSize: false,
    chunkSizeWarningLimit: 100000,
    lib: {
      entry: path.resolve(ROOT, 'index.tsx'),
      formats: ['iife'],
      name: 'BullMonitor',
      fileName: () => 'main.js',
    },
  },
  resolve: {
    alias: ALIASES,
  },
});
