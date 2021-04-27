# @bull-monitor/fastify

[Fastify](https://github.com/fastify/fastify) adapter for [bull-monitor](https://github.com/s-r-x/bull-monitor)

## Usage

```sh
npm i @bull-monitor/fastify fastify bull
```

```typescript
import Fastify from 'fastify';
import { BullMonitorFastify } from '@bull-monitor/fastify';
import Queue from 'bull';

(async () => {
  const queues = [new Queue('1', 'REDIS_URI')];
  const app = Fastify();
  const monitor = new BullMonitorFastify({
    // enables graphql playground at /my/url/graphql. true by default
    gqlPlayground: true,
    queues,
    baseUrl: '/my/url',
  });
  await monitor.init();
  await app.register(monitor.plugin);
  await app.listen(3000);
})();
```
