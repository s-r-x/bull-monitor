# bull-monitor

Modern UI and graphql api for [Bull](https://github.com/OptimalBits/bull).

## Usage with Express
```sh
npm i express @bull-monitor/express bull
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
    queues
  });
  await monitor.init();
  app.use('/my/url', monitor.router);
  app.listen(3000);
})();
```

## Usage with Koa

@bull-monitor/koa has a peer dependency of koa-router

```sh
npm i @bull-monitor/koa koa koa-router
```

```typescript
import { BullMonitorKoa } from '@bull-monitor/koa';
import Koa from 'koa';

(async () => {
  const app = new Koa();
  const monitor = new BullMonitorKoa({
    queues: [],
    baseUrl: "/my/url",
  });
  await monitor.init();
  app.use(monitor.router.routes());
  app.listen(3000)
})()
```

## Usage with Hapi

```sh
npm i @hapi/hapi @bull-monitor/hapi
```

```typescript
import { BullMonitorHapi } from '@bull-monitor/hapi';
import Hapi from '@hapi/hapi';

(async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });
  await server.start();
  const monitor = new BullMonitorHapi({
    queues: [],
    baseUrl: "/my/url",
  });
  await monitor.init();
  await server.register(monitor.plugin);
})();
```

## Usage with Fastify

```sh
npm i @bull-monitor/fastify fastify
```

```typescript
import Fastify from 'fastify';
import { BullMonitorFastify } from '@bull-monitor/fastify';

(async () => {
  const app = Fastify();
  const monitor = new BullMonitorFastify({
    queues: [],
    baseUrl: "/my/url",
  });
  await monitor.init();
  await app.register(monitor.plugin);
  await app.listen(3000);
})();

```
