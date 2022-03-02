import Fastify from 'fastify';
import { BullMonitorFastify } from '@bull-monitor/fastify';

const port = 3000;
const baseUrl = '/some/nested/url';
(async () => {
  const app = Fastify();
  const monitor = new BullMonitorFastify({
    queues: [],
    baseUrl,
  });
  await monitor.init({ app });
  await app.register(monitor.plugin);
  await app.listen(3000);
  console.log(`http://localhost:${port}${baseUrl}`);
})();
