import type { SimpleIntervalSchedule } from 'toad-scheduler';
import type { Queue } from '../queue';
import { Store } from 'keyv';

export type MetricsConfig = {
  redisPrefix?: string;
  collectInterval?: SimpleIntervalSchedule;
  maxMetrics?: number;
  blacklist?: string[];
};
export type QueueConfig = {
  readonly?: boolean;
};
export type CacheConfig = {
  adapter?: Store<string | undefined> | undefined;
}
export type Config = {
  queues: Queue[];
  gqlIntrospection?: boolean;
  gqlCache?: CacheConfig | false;
  baseUrl?: string;
  textSearchScanCount?: number;
  metrics?: MetricsConfig | false;
};
