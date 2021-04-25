import { BullMonitor } from '@bull-monitor/root';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';

export class BullMonitorExpress extends BullMonitor<ApolloServer> {
  public router: Express.Router;
  async init() {
    const router = Express.Router();
    router.get('/', (_req, res) => {
      res.type('html');
      res.send(this.renderUi());
    });
    this.createServer(ApolloServer);
    await this.server.start();
    this.server.applyMiddleware({ app: router as Express.Express });
    this.router = router;
  }
}
