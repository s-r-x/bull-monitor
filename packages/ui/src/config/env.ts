export const EnvConfig = {
  dev: import.meta.env.NODE_ENV === 'development',
  useMocks: import.meta.env.SNOWPACK_PUBLIC_ENABLE_MOCKS === 'true',
};
