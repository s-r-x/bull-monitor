import { BullMonitor } from '@bull-monitor/root';
import Express from 'express';
import type { Server as HttpServer } from 'http';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const expressVersion = require('express/package.json').version;
const defaultInitParams = {
  disableBodyParser: expressVersion.startsWith('5') ? true : undefined,
};

export type InitParams = {
  disableBodyParser?: boolean;
  httpServer?: HttpServer;
};

export class BullMonitorExpress extends BullMonitor<ApolloServer, any> {
  public router: Express.Router;
  async init({
    disableBodyParser,
    httpServer,
  }: InitParams = defaultInitParams) {
    const router = Express.Router();
    const bodyParserConfig = disableBodyParser ? false : undefined;
    router.get('/', (_req, res) => {
      res.type('html');
      res.send(this.renderUi());
    });
    this.createServer(
      ApolloServer,
      httpServer && [ApolloServerPluginDrainHttpServer({ httpServer })]
    );
    await startStandaloneServer(this.server);

    (router as Express.Express).use('/', expressMiddleware(this.server, {}));

    this.router = router;
  }
}
