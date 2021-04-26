import { BullMonitorHapi } from '@bull-monitor/hapi';
import Hapi from '@hapi/hapi';
import Basic from '@hapi/basic';

const port = 3000;
const baseUrl = '/some/nested/url';
(async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });
  await server.start();
  await server.register(Basic);
  server.auth.strategy('bull-monitor', 'basic', {
    validate: (_req: any, name: string, pass: string) => {
      return { isValid: name === 'admin' && pass === 'pass', credentials: {} };
    },
  });
  const monitor = new BullMonitorHapi({
    queues: [],
    baseUrl,
  });
  await monitor.init({
    auth: 'bull-monitor',
  });
  await server.register(monitor.plugin);
  console.log(`http://localhost:${port}${baseUrl}`);
})();
