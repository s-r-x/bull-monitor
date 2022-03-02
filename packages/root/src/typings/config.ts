import type { SimpleIntervalSchedule } from 'toad-scheduler';
import type { Queue } from '../queue';

export type MetricsConfig = {
  redisPrefix?: string;
  collectInterval?: SimpleIntervalSchedule;
  maxMetrics?: number;
  blacklist?: string[];
};
export type QueueConfig = {
  readonly?: boolean;
};
export type Config = {
  queues: Queue[];
  gqlIntrospection?: boolean;
  baseUrl?: string;
  textSearchScanCount?: number;
  metrics?: MetricsConfig | false;
};
