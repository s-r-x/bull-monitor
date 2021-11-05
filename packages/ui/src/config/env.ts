// @ts-nocheck

const useMocks = import.meta.env.VITE_ENABLE_MOCKS === 'true';
export const EnvConfig = {
  dev: import.meta.env.MODE === 'development',
  demo: useMocks,
  useMocks,
};
