import { BullMonitorHapi } from '@bull-monitor/hapi';
import Hapi from '@hapi/hapi';

const port = 3000;
const baseUrl = '/some/nested/url';
(async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });
  const monitor = new BullMonitorHapi({
    queues: [],
    baseUrl,
  });
  await monitor.init({ hapiServer: server });
  await server.register(monitor.plugin);
  await server.start();
  console.log(`http://localhost:${port}${baseUrl}`);
})();
