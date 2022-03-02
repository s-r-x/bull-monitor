# @bull-monitor/fastify

[Fastify](https://github.com/fastify/fastify) adapter for [bull-monitor](https://github.com/s-r-x/bull-monitor)

## Usage

```sh
npm i @bull-monitor/fastify
```

```typescript
import Fastify from 'fastify';
import { BullMonitorFastify } from '@bull-monitor/fastify';
import { BullAdapter } from '@bull-monitor/root/dist/bull-adapter';
// for BullMQ users
// import { BullMQAdapter } from "@bull-monitor/root/dist/bullmq-adapter";
import Queue from 'bull';

(async () => {
  const app = Fastify();
  const monitor = new BullMonitorFastify({
    queues: [
      new BullAdapter(new Queue('1', 'REDIS_URI')),
      // readonly queue
      new BullAdapter(new Queue('2', 'REDIS_URI'), { readonly: true }),
    ],
    // enables graphql introspection query. false by default if NODE_ENV == production, true otherwise
    gqlIntrospection: true,
    baseUrl: '/my/url',
    // enable metrics collector. false by default
    // metrics are persisted into redis as a list
    // with keys in format "bull_monitor::metrics::{{queue}}"
    metrics: {
      // collect metrics every X
      // where X is any value supported by https://github.com/kibertoad/toad-scheduler
      collectInterval: { hours: 1 },
      maxMetrics: 100,
      // disable metrics for specific queues
      blacklist: ['1'],
    },
  });
  await monitor.init({ app });
  await app.register(monitor.plugin);
  await app.listen(3000);

  // replace queues
  monitor.setQueues([new BullAdapter(new Queue('3', 'REDIS_URI'))]);
})();
```
