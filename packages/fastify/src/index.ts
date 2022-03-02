import { BullMonitor } from '@bull-monitor/root';
import { ApolloServer } from 'apollo-server-fastify';
import type {
  FastifyPluginCallback,
  RegisterOptions,
  FastifyInstance,
} from 'fastify';
import type { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

export type InitParams = {
  app: FastifyInstance;
};

export class BullMonitorFastify extends BullMonitor<ApolloServer> {
  public plugin: FastifyPluginCallback;
  async init({ app }: InitParams) {
    this.createServer(ApolloServer, [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ]);
    await this.server.start();
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
