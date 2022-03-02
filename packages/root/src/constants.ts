import { Config, MetricsConfig } from './typings/config';

export const PROD = process.env.NODE_ENV === 'production';
export const DEV = !PROD;
export const DEFAULT_DATA_SEARCH_SCAN_COUNT = 500;

export const DEFAULT_ROOT_CONFIG: Required<Config> = {
  queues: [],
  baseUrl: '',
  gqlIntrospection: DEV,
  textSearchScanCount: DEFAULT_DATA_SEARCH_SCAN_COUNT,
  metrics: false,
};
export const DEFAULT_METRICS_CONFIG: Required<MetricsConfig> = {
  redisPrefix: 'bull_monitor::metrics::',
  collectInterval: { hours: 1 },
  maxMetrics: 100,
  blacklist: [],
};
