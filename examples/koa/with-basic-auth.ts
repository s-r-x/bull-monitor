import { BullMonitorKoa } from '@bull-monitor/koa';
import Koa from 'koa';
import basicAuth from 'koa-basic-auth';

const port = 3000;
const baseUrl = '/some/nested/url';
(async () => {
  const app = new Koa();
  const monitor = new BullMonitorKoa({
    queues: [],
    baseUrl,
  });
  await monitor.init({
    middleware: basicAuth({
      name: 'admin',
      pass: 'pass',
    }),
  });
  app.use(monitor.router.routes());
  app.listen(port, () => console.log(`http://localhost:${port}${baseUrl}`));
})();
