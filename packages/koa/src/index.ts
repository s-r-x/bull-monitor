import { BullMonitor } from '@bull-monitor/root';
import { ApolloServer } from 'apollo-server-koa';
import Router from 'koa-router';

export class BullMonitorKoa extends BullMonitor<ApolloServer> {
  public router: Router;
  async init() {
    const router = new Router();
    this.createServer(ApolloServer);
    await this.server.start();
    const middleware = this.server.getMiddleware({
      path: this.gqlEndpoint,
    });
    router.get(this.gqlEndpoint, middleware);
    router.post(this.gqlEndpoint, middleware);
    router.get(this.uiEndpoint, ctx => {
      ctx.type = 'text/html';
      ctx.body = this.renderUi();
    });
    this.router = router;
  }
}
