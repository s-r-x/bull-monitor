import { BullMonitorExpress } from '@bull-monitor/express';
import { BullQueueAdapter } from '@bull-monitor/root/bull-adapter';
import express from 'express';
import Queue from 'bull';

const QUEUES_AMOUNT = 5;
const READONLY_QUEUES_AMOUNT = 2;
const redisUri = process.env.REDIS_URI as string;
const port = process.env.PORT;
const app = express();

const queues = Array.from(new Array(QUEUES_AMOUNT)).map(
  (_v, idx) => new Queue(`queue:${idx}`, redisUri)
);
const readonlyQueues = Array.from(new Array(READONLY_QUEUES_AMOUNT)).map(
  (_v, idx) => new Queue(`ro-queue:${idx}`, redisUri)
);
const prefixedQueues = Array.from(new Array(QUEUES_AMOUNT)).map(
  (_v, idx) =>
    new Queue(`queue:${idx}`, redisUri, {
      prefix: 'bull2',
    })
);
[queues[0], prefixedQueues[0]].forEach((queue, idx) => {
  queue.process('success', () => {
    return `some return value from ${idx ? 'prefixed queue' : 'normal queue'}`;
  });
  queue.process('fail', () => {
    throw new Error(
      `some error from ${idx ? 'prefixed queue' : 'normal queue'}`
    );
  });
});

const monitor = new BullMonitorExpress({
  queues: [
    ...queues.map((queue) => new BullQueueAdapter(queue as any)),
    ...prefixedQueues.map((queue) => new BullQueueAdapter(queue as any)),
    ...readonlyQueues.map(
      (queue) => [new BullQueueAdapter(queue as any), { readonly: true }] as any
    ),
  ],
  gqlPlayground: true,
  gqlIntrospection: true,
  //metrics: {
  //  collectInterval: { seconds: 30 },
  //  maxMetrics: 10,
  //},
});

monitor.init().then(() => {
  app.use('/', monitor.router);
});

app.listen(port, () => {
  console.log(`Bull server fixture listening at http://localhost:${port}`);
});
