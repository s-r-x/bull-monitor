# @bull-monitor/express

[Express](https://github.com/expressjs/express) adapter for [bull-monitor](https://github.com/s-r-x/bull-monitor)

## Usage

```sh
npm i @bull-monitor/express
```

```typescript
import { BullMonitorExpress } from '@bull-monitor/express';
import { BullAdapter } from '@bull-monitor/root/dist/bull-adapter';
// for BullMQ users
// import { BullMQAdapter } from "@bull-monitor/root/dist/bullmq-adapter";
import Express from 'express';
import Queue from 'bull';

(async () => {
  const app = Express();
  const monitor = new BullMonitorExpress({
    queues: [
      new BullAdapter(new Queue('1', 'REDIS_URI')),
      // readonly queue
      new BullAdapter(new Queue('2', 'REDIS_URI'), { readonly: true }),
    ],
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
  app.use('/my/url', monitor.router);
  app.listen(3000);

  // replace queues
  monitor.setQueues([new BullAdapter(new Queue('3', 'REDIS_URI'))]);
})();
```
