import { BullMonitorExpress } from '@bull-monitor/express';
import express from 'express';
import Queue from 'bull';

const QUEUES_AMOUNT = 5;
const redisUri = process.env.REDIS_URI as string;
const port = process.env.PORT;
const app = express();

const queues = Array.from(new Array(QUEUES_AMOUNT)).map(
  (_v, idx) => new Queue(`queue:${idx}`, redisUri)
);
queues[0].process('success', async job => {
  await job.moveToCompleted('some return value here');
});
queues[0].process('fail', () => {
  throw new Error('some error here');
});

const monitor = new BullMonitorExpress({
  queues,
  gqlPlayground: true,
  gqlIntrospection: true,
});

monitor.init().then(() => {
  app.use('/', monitor.router);
});

app.listen(port, () => {
  console.log(`Bull server fixture listening at http://localhost:${port}`);
});
