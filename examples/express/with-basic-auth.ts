import { BullMonitorExpress } from '@bull-monitor/express';
import Express from 'express';
import basicAuth from 'express-basic-auth';

const port = 3000;
const baseUrl = '/some/nested/url';
(async () => {
  const app = Express();
  const monitor = new BullMonitorExpress({ queues: [] });
  await monitor.init();
  app.use(
    baseUrl,
    basicAuth({
      challenge: true,
      users: {
        admin: 'pass',
      },
    })
  );
  app.use(baseUrl, monitor.router);
  app.listen(port, () => console.log(`http://localhost:${port}${baseUrl}`));
})();
