import { BullMonitorExpress } from '@bull-monitor/express';
import { BullAdapter } from '@bull-monitor/root/bull-adapter';
import { BullMQAdapter } from '@bull-monitor/root/bullmq-adapter';
import express from 'express';
import Queue from 'bull';
import {
  Queue as BullMqQueue,
  Worker as MqWorker,
  QueueScheduler as MqQueueScheduler,
  ConnectionOptions,
} from 'bullmq';

const QUEUES_AMOUNT = 5;
const READONLY_QUEUES_AMOUNT = 2;
const redisUri = process.env.REDIS_URI as string;
const redisHost = 'redis';
const port = process.env.PORT;
const app = express();
const mqConnOptions: ConnectionOptions = {
  host: redisHost,
};

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
const mqQueues = [
  new BullMqQueue('mq-1', {
    connection: mqConnOptions,
  }),
];
new MqQueueScheduler(mqQueues[0].name, {
  connection: mqConnOptions,
});
mqQueues.forEach((queue) => {
  new MqWorker(
    queue.name,
    async (job) => {
      return `some return value from ${job.name}`;
    },
    {
      connection: mqConnOptions,
    }
  );
});

const monitor = new BullMonitorExpress({
  queues: [
    ...mqQueues.map((queue) => new BullMQAdapter(queue as any)),
    ...queues.map((queue) => new BullAdapter(queue as any)),
    ...prefixedQueues.map((queue) => new BullAdapter(queue as any)),
    ...readonlyQueues.map(
      (queue) => new BullAdapter(queue as any, { readonly: true })
    ),
  ],
  gqlIntrospection: true,
  // metrics: {
  //   collectInterval: { seconds: 30 },
  //   maxMetrics: 10,
  // },
});

monitor.init().then(() => {
  app.use('/', monitor.router);
});

app.listen(port, () => {
  console.log(`Bull server fixture listening at http://localhost:${port}`);
});
