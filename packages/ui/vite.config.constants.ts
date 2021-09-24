import path from 'path';

export const ROOT = path.resolve(__dirname, 'src');
export const DST = 'build';
export const ALIASES = {
  '@': path.resolve(ROOT),
};
