import { BullMonitor } from '@bull-monitor/root';
import { ApolloServer } from 'apollo-server-koa';
import Router from 'koa-router';
import type { Middleware } from 'koa';

export type InitParams = {
  middleware?: Middleware;
};
export class BullMonitorKoa extends BullMonitor<ApolloServer> {
  public router: Router;
  public async init({ middleware }: InitParams = {}) {
    const router = new Router({
      prefix: this.baseUrl,
    });
    this.createServer(ApolloServer);
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
