import {
  BullDataSource,
  MetricsDataSource,
  PoliciesDataSource,
} from './gql/data-sources';
import { typeDefs } from './gql/type-defs';
import { resolvers } from './gql/resolvers';
import { UI } from './ui';
import { MetricsCollector } from './metrics-collector';
import { Queue } from './queue';
import { DEFAULT_METRICS_CONFIG, DEFAULT_ROOT_CONFIG } from './constants';
import type {
  ApolloServerBase,
  Config as ApolloConfig,
} from 'apollo-server-core';
import type { Config, MetricsConfig } from './typings/config';

export abstract class BullMonitor<TServer extends ApolloServerBase> {
  private _queues: Queue[] = [];
  private _queuesMap: Map<string, Queue> = new Map();
  private _ui: UI;
  private _metricsCollector?: MetricsCollector;

  constructor(config: Config) {
    this.config = this._normalizeConfig(config);
    this._ui = new UI();
    this._initQueues(this.config.queues);
    if (this.config.metrics) {
      this._initMetricsCollector();
    }
  }
  public get queues(): Queue[] {
    return this._queues;
  }
  public abstract init(...args: any): Promise<any>;
  public setQueues(queues: Config['queues']): void {
    this._initQueues(queues);
    if (this._metricsCollector && this.config.metrics) {
      this._metricsCollector.queues = this._queues;
    }
  }

  protected gqlBasePath = '/graphql';
  protected config: Required<Config>;
  protected server: TServer;
  protected createServer(
    Server: new (config: ApolloConfig) => TServer,
    plugins?: ApolloConfig['plugins']
  ) {
    this.server = new Server({
      persistedQueries: false,
      typeDefs,
      resolvers,
      plugins,
      introspection: this.config.gqlIntrospection,
      dataSources: () => ({
        bull: new BullDataSource(this._queues, this._queuesMap, {
          textSearchScanCount: this.config.textSearchScanCount,
        }),
        metrics: new MetricsDataSource(this._metricsCollector),
        policies: new PoliciesDataSource(this._queuesMap),
      }),
    });
  }
  protected async startServer() {
    return await this.server.start();
  }
  protected renderUi() {
    return this._ui.render();
  }
  protected get baseUrl() {
    return this.config.baseUrl;
  }
  protected get uiEndpoint() {
    return this.baseUrl || '/';
  }
  protected get gqlEndpoint() {
    const base = this.baseUrl;
    if (!base) {
      return this.gqlBasePath;
    } else if (base.endsWith('/')) {
      return base.slice(0, -1) + this.gqlBasePath;
    }
    return base + this.gqlBasePath;
  }

  private _initQueues(rawQueues: Config['queues']) {
    this._queues = this._validateQueues(rawQueues);
    this._queuesMap.clear();
    this._queues.forEach((queue) => {
      this._queuesMap.set(queue.id, queue);
    });
  }
  private _validateQueues(queues: Queue[]): Queue[] {
    let hasInvalid = false;
    const validated = queues.filter((queue) => {
      const isValid = queue instanceof Queue;
      if (!isValid) {
        hasInvalid = true;
      }
      return isValid;
    });
    if (hasInvalid) {
      console.error(
        'Since version 3.0.0 every queue should be wrapped in bull or bullmq adapter. Check out the bull-monitor docs for more info - https://github.com/s-r-x/bull-monitor'
      );
    }
    return validated;
  }
  private _normalizeConfig(config: Config): Required<Config> {
    return {
      ...DEFAULT_ROOT_CONFIG,
      ...config,
      metrics: config.metrics
        ? { ...DEFAULT_METRICS_CONFIG, ...config.metrics }
        : false,
    };
  }
  private _initMetricsCollector() {
    this._metricsCollector = new MetricsCollector(
      this._queues,
      this.config.metrics as Required<MetricsConfig>
    );
    this._metricsCollector.startCollecting();
  }
}
