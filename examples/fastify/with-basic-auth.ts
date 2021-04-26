import Fastify from 'fastify';
import { BullMonitorFastify } from '@bull-monitor/fastify';
import basicAuth from 'fastify-basic-auth';

const port = 3000;
const baseUrl = '/some/nested/url';
(async () => {
  const app = Fastify();
  const monitor = new BullMonitorFastify({
    queues: [],
    baseUrl,
  });
  app.register(basicAuth, {
    validate: (name: string, pass: string, _req, reply, done) => {
      if (name === 'admin' && pass === 'pass') {
        done();
      } else {
        reply.status(401);
        throw new Error('unauthorized');
      }
    },
    authenticate: {
      realm: 'bull-monitor',
    },
  });
  await monitor.init();
  app.register((instance, _opts, done) => {
    instance.addHook('preHandler', app.basicAuth);
    instance.register(monitor.plugin);
    done();
  });
  await app.listen(3000);
  console.log(`http://localhost:${port}${baseUrl}`);
})();
