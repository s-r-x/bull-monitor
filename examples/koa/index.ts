import { BullMonitorKoa } from '@bull-monitor/koa';
import Koa from 'koa';

const port = 3000;
const baseUrl = '/some/nested/url';
(async () => {
  const app = new Koa();
  const monitor = new BullMonitorKoa({
    queues: [],
    baseUrl,
  });
  await monitor.init();
  app.use(monitor.router.routes());
  app.listen(port, () => console.log(`http://localhost:${port}${baseUrl}`));
})();
