# @bull-monitor/hapi

[Hapi](https://github.com/hapijs/hapi) adapter for [bull-monitor](https://github.com/s-r-x/bull-monitor)

## Usage

```sh
npm i @hapi/hapi @bull-monitor/hapi bull
```

```typescript
import { BullMonitorHapi } from '@bull-monitor/hapi';
import Hapi from '@hapi/hapi';
import Queue from 'bull';

(async () => {
  const queues = [new Queue('1', 'REDIS_URI')];
  const server = new Hapi.server({
    port: 3000,
    host: 'localhost',
  });
  await server.start();
  const monitor = new BullMonitorHapi({
    queues,
    baseUrl: '/my/url',
    // enables graphql playground at /my/url/graphql. true by default
    gqlPlayground: true,
    queues,
  });
  await monitor.init();
  await server.register(monitor.plugin);
})();
```
