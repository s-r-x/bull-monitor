// @ts-nocheck

export const EnvConfig = {
  dev: import.meta.env.MODE === 'development',
  useMocks: import.meta.env.VITE_ENABLE_MOCKS === 'true',
};
