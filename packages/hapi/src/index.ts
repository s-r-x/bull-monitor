import { BullMonitor } from '@bull-monitor/root';
import { ApolloServer } from 'apollo-server-hapi';
import type { Plugin } from '@hapi/hapi';

export class BullMonitorHapi extends BullMonitor<ApolloServer> {
  plugin: Plugin<any>;
  async init() {
    this.createServer(ApolloServer);
    await this.server.start();
    this.plugin = {
      name: 'bull-monitor',
      register: app => {
        this.server.applyMiddleware({ app, path: this.gqlEndpoint });
        app.route({
          method: 'GET',
          path: this.uiEndpoint,
          handler: (_req, h) => {
            h.response().type('text/html');
            return this.renderUi();
          },
        });
      },
    };
  }
}
