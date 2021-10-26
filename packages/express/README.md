# @bull-monitor/express

[Express](https://github.com/expressjs/express) adapter for [bull-monitor](https://github.com/s-r-x/bull-monitor)

## Usage

```sh
npm i @bull-monitor/express
```

```typescript
import { BullMonitorExpress } from '@bull-monitor/express';
import Express from 'express';
import Queue from 'bull';

(async () => {
  const queues = [new Queue('1', 'REDIS_URI')];
  const app = Express();
  const monitor = new BullMonitorExpress({
    // enables graphql playground at /my/url/graphql. true by default
    gqlPlayground: true,
    queues,
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
})();
```
