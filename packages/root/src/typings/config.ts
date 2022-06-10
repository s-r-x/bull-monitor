import { Context, ContextFunction } from 'apollo-server-core';
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

export type KeycloakConfig = {
  realm: string,
  url: string,
  client: string,
  gqlcontext: Context | ContextFunction<any>
}

export type Config = {
  queues: Queue[];
  gqlIntrospection?: boolean;
  baseUrl?: string;
  textSearchScanCount?: number;
  metrics?: MetricsConfig | false;
  keycloak?: KeycloakConfig | null;
};
