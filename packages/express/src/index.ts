import { BullMonitor } from '@bull-monitor/root';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';

const expressVersion = require('express/package.json').version;
const defaultInitParams = {
  disableBodyParser: expressVersion.startsWith('5') ? true : undefined,
};

export type InitParams = {
  disableBodyParser?: boolean;
};

export class BullMonitorExpress extends BullMonitor<ApolloServer> {
  public router: Express.Router;
  async init({ disableBodyParser }: InitParams = defaultInitParams) {
    const router = Express.Router();
    const bodyParserConfig = disableBodyParser ? false : undefined;
    router.get('/', (_req, res) => {
      res.type('html');
      res.send(this.renderUi());
    });
    this.createServer(ApolloServer);
    await this.server.start();
    this.server.applyMiddleware({
      app: router as Express.Express,
      bodyParserConfig,
    });
    this.router = router;
  }
}
