# @bull-monitor/hapi

[Hapi](https://github.com/hapijs/hapi) adapter for [bull-monitor](https://github.com/s-r-x/bull-monitor)

## Usage

```sh
npm i @bull-monitor/hapi
```

```typescript
import { BullMonitorHapi } from '@bull-monitor/hapi';
import Hapi from '@hapi/hapi';
import { BullAdapter } from '@bull-monitor/root/dist/bull-adapter';
// for BullMQ users
// import { BullMQAdapter } from "@bull-monitor/root/dist/bullmq-adapter";
import Queue from 'bull';

(async () => {
  const server = new Hapi.server({
    port: 3000,
    host: 'localhost',
  });
  const monitor = new BullMonitorHapi({
    queues: [
      new BullAdapter(new Queue('1', 'REDIS_URI')),
      // readonly queue
      new BullAdapter(new Queue('2', 'REDIS_URI'), { readonly: true }),
    ],
    baseUrl: '/my/url',
    // enables graphql introspection query. false by default if NODE_ENV == production, true otherwise
    gqlIntrospection: true,
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
  await monitor.init();
  await server.register(monitor.plugin);
  await server.start();

  // replace queues
  monitor.setQueues([new BullAdapter(new Queue('3', 'REDIS_URI'))]);
})();
```
