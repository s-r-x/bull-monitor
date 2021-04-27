import { BullDataSource } from './gql/data-sources';
import { typeDefs } from './gql/type-defs';
import { resolvers } from './gql/resolvers';
import { Queue } from 'bull';
import type {
  ApolloServerBase,
  Config as ApolloConfig,
} from 'apollo-server-core';
import { UI } from './ui';

export type Config = {
  queues: Queue[];
  gqlPlayground?: boolean;
  baseUrl?: string;
};
export abstract class BullMonitor<TServer extends ApolloServerBase> {
  public abstract init(...args: any): Promise<any>;

  private ui: UI;
  private _defaultConfig: Config = {
    queues: [],
    baseUrl: '',
    gqlPlayground: true,
  };
  protected gqlBasePath = '/graphql';
  protected config: Config;
  protected server: TServer;
  constructor(config: Config) {
    this.config = {
      ...this._defaultConfig,
      ...config,
    };
    this.ui = new UI();
  }
  protected createServer(Server: new (config: ApolloConfig) => TServer) {
    this.server = new Server({
      typeDefs,
      // @ts-ignore
      resolvers,
      playground: this.config.gqlPlayground,
      dataSources: () => ({
        bull: new BullDataSource(this.config.queues),
      }),
    });
  }
  protected async startServer() {
    return await this.server.start();
  }
  protected renderUi() {
    return this.ui.render();
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
}
