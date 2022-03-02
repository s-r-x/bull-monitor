import { BullMonitor } from '@bull-monitor/root';
import { ApolloServer } from 'apollo-server-koa';
import Router from 'koa-router';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import type { Middleware } from 'koa';
import type { Server as HttpServer } from 'http';

export type InitParams = {
  middleware?: Middleware;
  httpServer?: HttpServer;
};
export class BullMonitorKoa extends BullMonitor<ApolloServer> {
  public router: Router;
  public async init({ middleware, httpServer }: InitParams = {}) {
    const router = new Router({
      prefix: this.baseUrl,
    });
    this.createServer(
      ApolloServer,
      httpServer && [ApolloServerPluginDrainHttpServer({ httpServer })]
    );
    await this.server.start();
    const apolloMiddleware = this.server.getMiddleware({
      path: this.gqlEndpoint,
    });
    if (middleware) {
      router.use(middleware);
    }
    router.get(this.gqlBasePath, apolloMiddleware);
    router.post(this.gqlBasePath, apolloMiddleware);
    router.get('/', async (ctx, next) => {
      ctx.type = 'text/html';
      ctx.body = this.renderUi();
      await next();
    });
    this.router = router;
  }
}
