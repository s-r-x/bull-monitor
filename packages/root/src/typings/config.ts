import type { Queue as BullQueue } from 'bull';
import type { Queue as BullMQQueue } from 'bullmq';
import type { BullQueueAdapter, BullMQQueueAdapter } from '../bull-adapters';
import { SimpleIntervalSchedule } from 'toad-scheduler';

type Queue = BullQueue | BullMQQueue | BullQueueAdapter | BullMQQueueAdapter;

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
