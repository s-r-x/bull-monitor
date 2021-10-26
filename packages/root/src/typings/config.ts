import type { Queue } from 'bull';
import { SimpleIntervalSchedule } from 'toad-scheduler';

export type MetricsConfig = {
  redisPrefix?: string;
  collectInterval?: SimpleIntervalSchedule;
  maxMetrics?: number;
  blacklist?: string[];
};
export type QueueConfig = {
  readonly?: boolean;
};
export type QueueConfigTuple = [queue: Queue, config: QueueConfig];
export type Config = {
  queues: (Queue | QueueConfigTuple)[];
  gqlPlayground?: boolean;
  gqlIntrospection?: boolean;
  baseUrl?: string;
  textSearchScanCount?: number;
  metrics?: MetricsConfig | false;
};
