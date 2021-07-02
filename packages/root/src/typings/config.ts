import type { Queue } from 'bull';
import { SimpleIntervalSchedule } from 'toad-scheduler';

export type MetricsConfig = {
  redisPrefix?: string;
  collectInterval?: SimpleIntervalSchedule;
  maxMetrics?: number;
  blacklist?: string[];
};
export type Config = {
  queues: Queue[];
  gqlPlayground?: boolean;
  gqlIntrospection?: boolean;
  baseUrl?: string;
  textSearchScanCount?: number;
  metrics?: MetricsConfig | false;
};
