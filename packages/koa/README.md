# @bull-monitor/koa

[Koa](https://github.com/koajs/koa) adapter for [bull-monitor](https://github.com/s-r-x/bull-monitor)

## Usage

@bull-monitor/koa has a peer dependency of koa-router

```sh
npm i @bull-monitor/koa koa-router
```

```typescript
import { BullMonitorKoa } from '@bull-monitor/koa';
import Koa from 'koa';
import { BullAdapter } from '@bull-monitor/root/dist/bull-adapter';
// for BullMQ users
// import { BullMQAdapter } from "@bull-monitor/root/dist/bullmq-adapter";
import Queue from 'bull';

(async () => {
  const app = new Koa();
  const monitor = new BullMonitorKoa({
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
  await monitor.init({
    // optional middleware that will run before the bull-monitor router
    middleware: async (_ctx, next) => {
      console.log('do something');
      await next();
    },
  });
  app.use(monitor.router.routes());
  app.listen(3000);

  // replace queues
  monitor.setQueues([new BullAdapter(new Queue('3', 'REDIS_URI'))]);
})();
```
