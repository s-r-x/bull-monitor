import { defineConfig } from 'vite';
import { ALIASES, DST } from './vite.config.constants';

export default defineConfig({
  base: '/bull-monitor/',
  build: {
    target: 'es2015',
    outDir: DST,
    brotliSize: false,
    chunkSizeWarningLimit: 100000,
  },
  resolve: {
    alias: ALIASES,
  },
});
