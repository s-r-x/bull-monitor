import { BullMonitor } from '@bull-monitor/root';
import { ApolloServer } from 'apollo-server-fastify';
import type { FastifyPluginCallback, RegisterOptions } from 'fastify';

// @ts-ignore
export class BullMonitorFastify extends BullMonitor<ApolloServer> {
  public plugin: FastifyPluginCallback;
  async init() {
    this.createServer(ApolloServer);
    this.plugin = (instance, _opts: RegisterOptions, done) => {
      instance.register(
        this.server.createHandler({
          path: this.gqlEndpoint,
        })
      );
      instance.get(this.uiEndpoint, (_req, reply) => {
        reply.type('text/html').send(this.renderUi());
      });
      done();
    };
  }
}
