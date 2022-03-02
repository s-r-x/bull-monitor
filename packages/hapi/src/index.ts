import { BullMonitor } from '@bull-monitor/root';
import {
  ApolloServer,
  ApolloServerPluginStopHapiServer,
} from 'apollo-server-hapi';
import type { Plugin, Server as HapiServer } from '@hapi/hapi';

export type InitParams = {
  auth?: string;
  hapiServer?: HapiServer;
};
export class BullMonitorHapi extends BullMonitor<ApolloServer> {
  plugin: Plugin<any>;
  async init({ auth, hapiServer }: InitParams = {}) {
    this.createServer(
      ApolloServer,
      hapiServer && [ApolloServerPluginStopHapiServer({ hapiServer })]
    );
    await this.server.start();
    this.plugin = {
      name: 'bull-monitor',
      register: async (app) => {
        app.route({
          method: 'GET',
          options: {
            auth,
          },
          path: this.uiEndpoint,
          handler: (_req, h) => {
            h.response().type('text/html');
            return this.renderUi();
          },
        });
        await this.server.applyMiddleware({
          app,
          path: this.gqlEndpoint,
          route: {
            auth,
          },
        });
      },
    };
  }
}
